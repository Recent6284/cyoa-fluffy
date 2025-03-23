// Add this to your JavaScript section or a script passage
(function() {
    // Create CSS for animation classes if it doesn't exist
    if (!document.getElementById('fluffyTankAnimationCSS')) {
      const css = document.createElement('style');
      css.id = 'fluffyTankAnimationCSS';
      css.textContent = `
        /* Animation class for moving fluffy body */
        .moving-tank .fluffy {
          animation: moveTankFluffy 20s infinite;
        }
        
        @keyframes moveTankFluffy {
          /* Start with a pause at left side */
          0%, 10% { transform: translateX(-25%) scaleX(-1); }
          
          /* Walk right */
          15% { transform: translateX(-15%) scaleX(-1); }
          20% { transform: translateX(-5%) scaleX(-1); }
          25% { transform: translateX(5%) scaleX(-1); }
          30% { transform: translateX(15%) scaleX(-1); }
          35% { transform: translateX(25%) scaleX(-1); }
          
          /* Pause at right side */
          40%, 50% { transform: translateX(25%) scaleX(-1); }
          
          /* Turn around */
          55% { transform: translateX(25%) scaleX(1); }
          
          /* Walk left */
          60% { transform: translateX(15%) scaleX(1); }
          65% { transform: translateX(5%) scaleX(1); }
          70% { transform: translateX(-5%) scaleX(1); }
          75% { transform: translateX(-15%) scaleX(1); }
          80% { transform: translateX(-25%) scaleX(1); }
          
          /* Pause at left side again */
          85%, 95% { transform: translateX(-25%) scaleX(1); }
          
          /* Turn to face right for next cycle */
          100% { transform: translateX(-25%) scaleX(-1); }
        }
      `;
      document.head.appendChild(css);
    }
    
    // Function to make tank Fluffies move
    window.makeTankFluffyMove = function() {
      // Find all Fluffy elements in tanks with moving-tank class
      const tankFluffies = document.querySelectorAll('.moving-tank .fluffy');
      
      tankFluffies.forEach(fluffy => {
        // Add the moving class to activate the position animation
        fluffy.classList.add('moving');
        
        // Animation function for legs - using class selectors for CSS fluffy
        const animate = () => {
          // Calculate animation progress
          const now = Date.now();
          const animationDuration = 20000; // 20 seconds, matching CSS
          const cycleProgress = (now % animationDuration) / animationDuration * 100;
          
          // Determine if in walking phase
          const isWalking = 
            (cycleProgress > 10 && cycleProgress < 40) || // Walking right
            (cycleProgress > 55 && cycleProgress < 85);   // Walking left
          
          if (isWalking) {
            // Animate legs during walking
            const walkTime = now / 250; // Controls leg animation speed
            
            // Find all leg elements by class
            const leg1 = fluffy.querySelector('.leg.leg1');
            const leg2 = fluffy.querySelector('.leg.leg2');
            const leg3 = fluffy.querySelector('.leg.leg3');
            const leg4 = fluffy.querySelector('.leg.leg4');
            
            // Log to debug - remove in production
            console.log("Found legs:", leg1, leg2, leg3, leg4);
            
            // Front and back right legs
            if (leg1) {
              leg1.style.transform = `rotate(${Math.sin(walkTime) * 8}deg)`;
              leg1.style.transformOrigin = 'top center';
            }
            
            if (leg4) {
              leg4.style.transform = `rotate(${Math.sin(walkTime) * 8}deg)`;
              leg4.style.transformOrigin = 'top center';
            }
            
            // Front and back left legs (opposite phase)
            if (leg2) {
              leg2.style.transform = `rotate(${Math.sin(walkTime + Math.PI) * 8}deg)`;
              leg2.style.transformOrigin = 'top center';
            }
            
            if (leg3) {
              leg3.style.transform = `rotate(${Math.sin(walkTime + Math.PI) * 8}deg)`;
              leg3.style.transformOrigin = 'top center';
            }
          } else {
            // Reset legs during pauses
            const legs = fluffy.querySelectorAll('.leg');
            legs.forEach(leg => {
              if (leg) leg.style.transform = '';
            });
          }
          
          // Continue animation
          fluffy.animationFrameId = requestAnimationFrame(animate);
        };
        
        // Start animation
        fluffy.animationFrameId = requestAnimationFrame(animate);
      });
    };
    
    // Function to stop movement
    window.stopTankFluffyMove = function() {
      const tankFluffies = document.querySelectorAll('.tank .fluffy');
      
      tankFluffies.forEach(fluffy => {
        // Remove the moving class
        fluffy.classList.remove('moving');
        
        // Cancel animation frame
        if (fluffy.animationFrameId) {
          cancelAnimationFrame(fluffy.animationFrameId);
          fluffy.animationFrameId = null;
        }
        
        // Reset transform and leg positions
        fluffy.style.transform = "";
        const legs = fluffy.querySelectorAll('.leg');
        legs.forEach(leg => {
          leg.style.transform = "";
        });
      });
    };
    
    // Setup event listeners
    $(document).on(':passagedisplay', function() {
      setTimeout(function() {
        // Start movement for tank fluffies with the moving-tank class
        document.querySelectorAll('.moving-tank').forEach(el => {
          window.makeTankFluffyMove();
        });
        
        // Add click handlers to toggle movement
        document.querySelectorAll('.move-toggle').forEach(el => {
          el.addEventListener('click', function() {
            const target = document.querySelector(this.getAttribute('data-target'));
            if (target) {
              target.classList.toggle('moving-tank');
              if (target.classList.contains('moving-tank')) {
                window.makeTankFluffyMove();
              } else {
                window.stopTankFluffyMove();
              }
            }
          });
        });
      }, 100);
    });
  })();