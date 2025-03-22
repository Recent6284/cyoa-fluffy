// Add this to your JavaScript section or a script passage
(function() {
    // Function to make Fluffies blink
    window.makeFluffyBlink = function() {
      // Only find Fluffy SVGs that are inside a "should-blink" span
      const fluffySvgs = document.querySelectorAll('.blink #SVGfluffy-svg');
      
      fluffySvgs.forEach(svg => {
        // Get eye elements - the white rectangles
        const eyeWhites = svg.querySelectorAll('#SVGeye1 rect:first-child, #SVGeye2 rect:first-child');
        const pupils = svg.querySelectorAll('#SVGpupil1, #SVGpupil2');
        
        // Function to start random blinking
        function startRandomBlinking() {
          // Store original heights
          const originalHeights = Array.from(eyeWhites).map(eye => eye.getAttribute('height'));
          const originalPupilOpacity = "1";
          
          // Function for a single blink
          function blink() {
            // Store original positions for reference
            eyeWhites.forEach((eye, i) => eye.setAttribute('data-original-height', originalHeights[i]));
            
            // Close eyes - scale from top and bottom by setting a new y and height
            eyeWhites.forEach(eye => {
              const originalHeight = parseFloat(eye.getAttribute('data-original-height'));
              const newHeight = originalHeight * 0.1; // Scale to 10%
              const adjustment = (originalHeight - newHeight) / 2;
              
              // Move down a bit and reduce height to create center-closing effect
              eye.setAttribute('y', parseFloat(eye.getAttribute('y')) + adjustment);
              eye.setAttribute('height', newHeight);
            });
            
            // Hide pupils during blink
            pupils.forEach(pupil => pupil.style.opacity = '0');
            
            // Reopen eyes after short time
            setTimeout(() => {
              // Restore original state completely
              eyeWhites.forEach((eye, i) => {
                eye.setAttribute('y', parseFloat(eye.getAttribute('y')) - 
                  (parseFloat(originalHeights[i]) - parseFloat(eye.getAttribute('height'))) / 2);
                eye.setAttribute('height', originalHeights[i]);
              });
              
              // Show pupils again
              pupils.forEach(pupil => pupil.style.opacity = originalPupilOpacity);
              
              // Schedule next blink (random time between 4-12 seconds)
              const nextBlink = 4000 + Math.random() * 8000;
              setTimeout(blink, nextBlink);
            }, 150); // Blink duration
          }
          
          // Start blinking after a random delay (0.5-3 seconds)
          setTimeout(blink, 500 + Math.random() * 2500);
        }
        
        // Start blinking for this Fluffy
        startRandomBlinking();
      });
    };
    
    // Setup an event listener to apply blinking whenever passages change
    $(document).on(':passagedisplay', function() {
      // Slight delay to ensure SVG is fully rendered
      setTimeout(window.makeFluffyBlink, 100);
    });
  })();