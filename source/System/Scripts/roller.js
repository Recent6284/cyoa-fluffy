(function () {
    // Define the widget to be used with <<do>> and <<redo>>
    Macro.add('animatedroll', {
        handler: function () {
            // Parse arguments
            if (this.args.length < 2) {
                return this.error('The <<animatedroll>> macro requires at least 2 arguments: stat name and dice type (e.g. <<animatedroll "Strength" "d20">>)');
            }
            
            const statName = this.args[0];
            const diceType = this.args[1];
            const statValue = this.args[2] || 0; // Optional initial stat value
            const goal = this.args[3] || null; // Optional target value for success/failure
            const bonus = this.args[4] || 0; // Optional bonus to add to roll
            const duration = parseInt(this.args[5] || 2000); // Optional animation duration in ms
            
            // Generate a unique ID for this widget
            const widgetId = 'dice-roll-' + Math.floor(Math.random() * 10000000);
            
            // Create HTML structure
            const $wrapper = $(document.createElement('span'));
            $wrapper.addClass('animated-roll-stat');
            $wrapper.attr('id', widgetId);
            $wrapper.attr('data-dice', diceType);
            $wrapper.attr('data-goal', goal);
            $wrapper.attr('data-bonus', bonus);
            $wrapper.attr('data-duration', duration); // Store as number
            $wrapper.attr('data-type', 'basic');
            
            const $statLabel = $(document.createElement('span'));
            $statLabel.addClass('stat-name');
            $statLabel.text(`${statName}: `);
            
            const $statValueEl = $(document.createElement('span'));
            $statValueEl.addClass('stat-value');
            $statValueEl.text(statValue);
            
            // Assemble the widget
            $wrapper.append($statLabel, $statValueEl);
            
            // Attach to output
            $(this.output).append($wrapper);
        }
    });
    
    // Define a more customizable version
    Macro.add('diceroll', {
        handler: function () {
            // Parse arguments with named parameters
            const args = {};
            
            for (let i = 0; i < this.args.length; i++) {
                if (typeof this.args[i] === 'string' && this.args[i].includes(':')) {
                    const parts = this.args[i].split(':');
                    if (parts.length === 2) {
                        const key = parts[0].trim();
                        const value = parts[1].trim();
                        args[key] = value;
                    }
                }
            }
            
            // Set defaults for missing parameters
            args.name = args.name || 'Stat';
            args.dice = args.dice || 'd6';
            args.value = args.value || 0;
            args.bonus = args.bonus || 0;
            args.goal = args.goal || null;
            args.add = args.add || 'false';
            args.duration = parseInt(args.duration || 2000);
            args.steps = args.steps || 30;
            args.showname = args.showname || 'true';
            
            // Generate a unique ID for this widget
            const widgetId = 'dice-roll-' + Math.floor(Math.random() * 10000000);
            
            // Create HTML structure
            const $wrapper = $(document.createElement('span'));
            $wrapper.addClass('dice-roll-stat');
            $wrapper.attr('id', widgetId);
            $wrapper.attr('data-type', 'advanced');
            
            // Store all parameters as data attributes for use when <<redo>> is called
            $wrapper.attr('data-args', JSON.stringify(args));
            
            // Only add the stat name if showname is true
            if (args.showname === 'true') {
                const $statLabel = $(document.createElement('span'));
                $statLabel.addClass('stat-name');
                $statLabel.text(`${args.name}: `);
                $wrapper.append($statLabel);
            }
            
            const $statValueEl = $(document.createElement('span'));
            $statValueEl.addClass('stat-value');
            $statValueEl.text(args.value);
            $wrapper.append($statValueEl);
            
            // Attach to output
            $(this.output).append($wrapper);
        }
    });
    
    // Add a macro specifically to roll the dice
    Macro.add('rollwidgets', {
        handler: function() {
            rollAllWidgets();
        }
    });
    
    // Function to roll all widgets - will be called by the <<redo>> handler
    function rollAllWidgets() {
        // Find all dice roll widgets in the current passage
        $('.animated-roll-stat, .dice-roll-stat').each(function() {
            const $widget = $(this);
            const widgetType = $widget.attr('data-type');
            
            // If this is the advanced version
            if (widgetType === 'advanced') {
                // Get the stored parameters
                const args = JSON.parse($widget.attr('data-args'));
                const $statValueEl = $widget.find('.stat-value');
                
                // Parse dice type
                const diceMax = parseInt(args.dice.substring(1));
                if (isNaN(diceMax)) {
                    $statValueEl.text('Invalid dice type!');
                    return;
                }
                
                // Generate result
                const rollResult = Math.floor(Math.random() * diceMax) + 1;
                const bonus = parseInt(args.bonus);
                const finalResult = rollResult + bonus;
                const animDuration = parseInt(args.duration);
                
                // Store values for use in SugarCube
                State.variables._lastRoll = rollResult;
                State.variables._lastBonus = bonus;
                State.variables._lastTotal = finalResult;
                
                // Start animation
                $statValueEl.removeClass('success failure');
                $statValueEl.addClass('animating');
                
                // Animation timing tracking
                let startTime = null;
                
                // Create animation sequence
                const animationSequence = [];
                const totalFrames = 50;
                
                // Fill sequence with values
                for (let i = 0; i < totalFrames; i++) {
                    const progress = i / totalFrames;
                    
                    if (progress < 0.90) {
                        // First 60%: Random values
                        animationSequence.push(Math.floor(Math.random() * diceMax) + 1);
                    } else if (progress < 0.99) {
                        // 60-90%: More frequent appearances of the final value
                        const showFinal = Math.random() < (progress - 0.6) / 0.3;
                        if (showFinal) {
                            animationSequence.push(rollResult);
                        } else {
                            animationSequence.push(Math.floor(Math.random() * diceMax) + 1);
                        }
                    } else {
                        // Last 10%: Mostly final value
                        const showFinal = Math.random() < 0.6;
                        if (showFinal) {
                            animationSequence.push(rollResult);
                        } else {
                            animationSequence.push(Math.floor(Math.random() * diceMax) + 1);
                        }
                    }
                }
                
                // Force last frame to be final value
                animationSequence.push(rollResult);
                
                function runAnimation(timestamp) {
                    // Initialize start time on first frame
                    if (startTime === null) {
                        startTime = timestamp;
                    }
                    
                    // Calculate progress (0-1)
                    const elapsed = timestamp - startTime;
                    const fullProgress = Math.min(1.0, elapsed / animDuration);
                    
                    // Easing function (cubic) for slot machine slowing effect
                    // Makes animation start fast and end slow
                    const easedProgress = 1 - Math.pow(1 - fullProgress, 1.1);
                    
                    // Get current frame from sequence
                    const frameIndex = Math.min(
                        animationSequence.length - 1,
                        Math.floor(easedProgress * animationSequence.length)
                    );
                    
                    // Update display
                    $statValueEl.text(animationSequence[frameIndex]);
                    
                    // Continue animation or finish
                    if (fullProgress < 1.0) {
                        requestAnimationFrame(runAnimation);
                    } else {
                        // Animation complete
                        // Update the value based on parameters
                        let displayValue = finalResult;
                        if (args.add === 'true') {
                            displayValue = parseInt(args.value) + finalResult;
                        }
                        
                        $statValueEl.text(displayValue);
                        $statValueEl.removeClass('animating');
                        
                        // Check against goal if provided
                        if (args.goal !== null) {
                            $statValueEl.removeClass('success failure');
                            if (finalResult >= parseInt(args.goal)) {
                                $statValueEl.addClass('success');
                            } else {
                                $statValueEl.addClass('failure');
                            }
                        }
                        
                        // If variable parameter was passed, set SugarCube variable
                        if (args.variable) {
                            State.variables[args.variable] = rollResult;
                        }
                        
                        // If total parameter was passed, set SugarCube variable for the total
                        if (args.total) {
                            State.variables[args.total] = finalResult;
                        }
                    }
                }
                
                // Start the animation
                requestAnimationFrame(runAnimation);
            }
            // If this is the basic version
            else if (widgetType === 'basic') {
                const $statValueEl = $widget.find('.stat-value');
                
                // Get parameters from data attributes
                const diceType = $widget.attr('data-dice');
                const goal = $widget.attr('data-goal');
                const bonus = parseInt($widget.attr('data-bonus') || 0);
                const duration = parseInt($widget.attr('data-duration') || 2000);
                
                // Parse dice type to get max value
                const diceMax = parseInt(diceType.substring(1));
                if (isNaN(diceMax)) {
                    $statValueEl.text('Invalid dice type!');
                    return;
                }
                
                // Get final result (1 to max)
                const rollResult = Math.floor(Math.random() * diceMax) + 1;
                const finalResult = rollResult + bonus;
                
                // Store values for use in SugarCube
                State.variables._lastRoll = rollResult;
                State.variables._lastBonus = bonus;
                State.variables._lastTotal = finalResult;
                
                // Start animation
                $statValueEl.removeClass('success failure');
                $statValueEl.addClass('animating');
                
                // Animation timing tracking
                let startTime = null;
                
                // Create animation sequence
                const animationSequence = [];
                const totalFrames = 50;
                
                // Fill sequence with values
                for (let i = 0; i < totalFrames; i++) {
                    const progress = i / totalFrames;
                    
                    if (progress < 0.6) {
                        // First 60%: Random values
                        animationSequence.push(Math.floor(Math.random() * diceMax) + 1);
                    } else if (progress < 0.9) {
                        // 60-90%: More frequent appearances of the final value
                        const showFinal = Math.random() < (progress - 0.6) / 0.3;
                        if (showFinal) {
                            animationSequence.push(rollResult);
                        } else {
                            animationSequence.push(Math.floor(Math.random() * diceMax) + 1);
                        }
                    } else {
                        // Last 10%: Mostly final value
                        const showFinal = Math.random() < 0.8;
                        if (showFinal) {
                            animationSequence.push(rollResult);
                        } else {
                            animationSequence.push(Math.floor(Math.random() * diceMax) + 1);
                        }
                    }
                }
                
                // Force last frame to be final value
                animationSequence.push(rollResult);
                
                function runAnimation(timestamp) {
                    // Initialize start time on first frame
                    if (startTime === null) {
                        startTime = timestamp;
                    }
                    
                    // Calculate progress (0-1)
                    const elapsed = timestamp - startTime;
                    const fullProgress = Math.min(1.0, elapsed / duration);
                    
                    // Easing function (cubic) for slot machine slowing effect
                    // Makes animation start fast and end slow
                    const easedProgress = 1 - Math.pow(1 - fullProgress, 1.1);
                    
                    // Get current frame from sequence
                    const frameIndex = Math.min(
                        animationSequence.length - 1,
                        Math.floor(easedProgress * animationSequence.length)
                    );
                    
                    // Update display
                    $statValueEl.text(animationSequence[frameIndex]);
                    
                    // Continue animation or finish
                    if (fullProgress < 1.0) {
                        requestAnimationFrame(runAnimation);
                    } else {
                        // Animation complete, show final result
                        $statValueEl.text(finalResult);
                        $statValueEl.removeClass('animating');
                        
                        // Check against goal if provided
                        if (goal !== null) {
                            $statValueEl.removeClass('success failure');
                            if (finalResult >= parseInt(goal)) {
                                $statValueEl.addClass('success');
                            } else {
                                $statValueEl.addClass('failure');
                            }
                        }
                    }
                }
                
                // Start the animation
                requestAnimationFrame(runAnimation);
            }
        });
    }
    
    // Hook into SugarCube's postdisplay event to make our redo handler work
    $(document).on(':passagerender', function() {
        // For Sugarcube 2, we need to directly hook into the State.variables._redo API
        const originalRedo = State.variables._redo;
        
        // Override _redo to call our function and then the original
        State.variables._redo = function() {
            // Call our roll function
            rollAllWidgets();
            
            // Call the original _redo function if it exists
            if (typeof originalRedo === 'function') {
                originalRedo();
            }
        };
    });
})();