// Add this to your JavaScript section or a script passage
(function() {
    // Create CSS for animation classes
    if (!document.getElementById('fluffyAnimationCSS')) {
      const css = document.createElement('style');
      css.id = 'fluffyAnimationCSS';
      css.textContent = `
        /* Set transform origins for each leg group */
        #SVGleg1-group {
          transform-origin: 15px 45px; /* Top of leg */
        }
        #SVGleg2-group {
          transform-origin: 37px 45px;
        }
        #SVGleg3-group {
          transform-origin: 79px 45px;
        }
        #SVGleg4-group {
          transform-origin: 100px 45px;
        }
      `;
      document.head.appendChild(css);
    }
    
    // Function to make Fluffies walk
    window.makeFluffyWalk = function() {
      // Find all Fluffy SVGs that are inside a walking span
      const walkingFluffies = document.querySelectorAll('.walking #SVGfluffy-svg');
      
      walkingFluffies.forEach(svg => {
        // Get the main fluffy group - this contains everything
        const fluffyGroup = svg.querySelector('#SVGfluffy');
        
        // Get the legs
        const legGroups = [
          {
            group: svg.querySelector('#SVGleg1-group'),
            phase: 0
          },
          {
            group: svg.querySelector('#SVGleg2-group'),
            phase: Math.PI
          },
          {
            group: svg.querySelector('#SVGleg3-group'),
            phase: Math.PI
          },
          {
            group: svg.querySelector('#SVGleg4-group'),
            phase: 0
          }
        ];
        
        // Get other parts to animate
        const body = svg.querySelector('#SVGfluffbody');
        const belly = svg.querySelector('#SVGbelly');
        const headContainer = svg.querySelector('#SVGhead-container');
        
        // Store original transforms
        const fluffyGroupTransform = fluffyGroup.getAttribute('transform') || '';
        
        // Apply CSS for transform origins
        legGroups.forEach(leg => {
          if (!leg.group) return;
        });
        
        // Animation variables
        let time = 0;
        const walkSpeed = 0.04; // SLOWER: Reduced from 0.05 to 0.03
        
        function animate() {
            time += walkSpeed;
            
            // REDUCED BOUNCE: Less amplitude for sway and bounce
            const bodySway = Math.sin(time * 2) * 1.0; // Reduced from 1.5 to 1.0
            const bodyY = Math.abs(Math.sin(time * 2)) * -1.0; // Reduced from -1.5 to -1.0
            
            // Move the entire fluffy group to the right
            fluffyGroup.setAttribute('transform', `translate(${5 + bodySway}, ${bodyY}) rotate(${bodySway * 0.2})`); // Reduced rotation from 0.3 to 0.2
            
            // Body animation is simplified - no translation needed
            body.removeAttribute('transform');
            
            // Head follows with slight delay and reduced movement
            const headY = Math.abs(Math.sin(time * 2 - 0.1)) * -0.3; // Reduced from -0.5 to -0.3
            const headSway = Math.sin(time * 2 - 0.2) * 0.3; // Reduced from 0.5 to 0.3
            headContainer.setAttribute('transform', `translate(${10 + headSway}, ${17 + headY})`);
            
            // Legs move with subtle rotation only
            legGroups.forEach(leg => {
              if (!leg.group) return;
              // Smaller angle for legs
              const angle = Math.sin(time * 2 + leg.phase) * 6; // Reduced from 6 to 4
              leg.group.style.transform = `rotate(${angle}deg)`;
            });
            
            // Continue animation
            svg.walkFrameId = requestAnimationFrame(animate);
        }
        
        // Start animation if not already running
        if (!svg.walkFrameId) {
          svg.walkFrameId = requestAnimationFrame(animate);
        }
      });
    };
    
    // Function to stop walking
    window.stopFluffyWalk = function() {
      const walkingFluffies = document.querySelectorAll('#SVGfluffy-svg');
      
      walkingFluffies.forEach(svg => {
        if (svg.walkFrameId) {
          cancelAnimationFrame(svg.walkFrameId);
          svg.walkFrameId = null;
          
          // Reset transforms
          const legGroups = svg.querySelectorAll('[id$="-group"]');
          legGroups.forEach(group => {
            group.style.transform = '';
          });
          
          const fluffyGroup = svg.querySelector('#SVGfluffy');
          const body = svg.querySelector('#SVGfluffbody');
          const belly = svg.querySelector('#SVGbelly');
          const headContainer = svg.querySelector('#SVGhead-container');
          
          // Reset the entire fluffy group to original position with slight offset
          fluffyGroup.setAttribute('transform', 'translate(5, 0)');
          body.removeAttribute('transform');
          belly.removeAttribute('transform');
          headContainer.setAttribute('transform', 'translate(10, 17)');
        }
      });
    };
       
    // Setup event listeners for walking
    $(document).on(':passagedisplay', function() {
      // Slight delay to ensure SVG is fully rendered
      setTimeout(function() {
        // Find elements with walking class and start animation
        document.querySelectorAll('.walking').forEach(el => {
          window.makeFluffyWalk();
        });
        
        // Add click handlers to toggle walking for clickable elements
        document.querySelectorAll('.walking-toggle').forEach(el => {
          el.addEventListener('click', function() {
            const target = document.querySelector(this.getAttribute('data-target'));
            if (target) {
              target.classList.toggle('walking');
              if (target.classList.contains('walking')) {
                window.makeFluffyWalk();
              } else {
                window.stopFluffyWalk();
              }
            }
          });
        });
      }, 100);
    });
  })();