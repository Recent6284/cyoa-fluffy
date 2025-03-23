// Tank animation for Fluffy creatures
(function() {
  // Create CSS for animation classes if it doesn't exist
  if (!document.getElementById('fluffyTankAnimationCSS')) {
    const css = document.createElement('style');
    css.id = 'fluffyTankAnimationCSS';
    css.textContent = `
      /* Animation for moving fluffy across tank */
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
      
      /* Simple, subtle leg swinging animation */
      .moving-tank .fluffy #SVGleg1-group, 
      .moving-tank .fluffy #SVGleg4-group {
        animation: subtleLegSwing 20s infinite;
        transform-origin: top center;
      }
      
      .moving-tank .fluffy #SVGleg2-group, 
      .moving-tank .fluffy #SVGleg3-group {
        animation: subtleLegSwingAlt 20s infinite;
        transform-origin: top center;
      }
      
      /* Subtle leg swing animation */
      @keyframes subtleLegSwing {
        /* No swing during pauses */
        0%, 10%, 40%, 50%, 55%, 85%, 95%, 100% { transform: rotate(0deg); }
        
        /* Very subtle swing while moving right */
        15%, 25%, 35% { transform: rotate(2deg); }
        20%, 30% { transform: rotate(-2deg); }
        
        /* Very subtle swing while moving left */
        60%, 70%, 80% { transform: rotate(2deg); }
        65%, 75% { transform: rotate(-2deg); }
      }
      
      /* Alternate leg swing (opposite timing) */
      @keyframes subtleLegSwingAlt {
        /* No swing during pauses */
        0%, 10%, 40%, 50%, 55%, 85%, 95%, 100% { transform: rotate(0deg); }
        
        /* Very subtle swing (opposite phase) while moving right */
        15%, 25%, 35% { transform: rotate(-2deg); }
        20%, 30% { transform: rotate(2deg); }
        
        /* Very subtle swing (opposite phase) while moving left */
        60%, 70%, 80% { transform: rotate(-2deg); }
        65%, 75% { transform: rotate(2deg); }
      }
    `;
    document.head.appendChild(css);
  }
  
  // Function to make tank Fluffies move
  window.makeTankFluffyMove = function() {
    // Find all tank containers with moving-tank class
    const movingTanks = document.querySelectorAll('.moving-tank');
    
    movingTanks.forEach(tank => {
      // Make sure the animation is applied
      const fluffy = tank.querySelector('.fluffy');
      if (fluffy) {
        fluffy.style.animationPlayState = 'running';
      }
    });
  };
  
  // Function to stop movement with more thorough cleanup
  window.stopTankFluffyMove = function() {
    const tankFluffies = document.querySelectorAll('.tank .fluffy');
    
    tankFluffies.forEach(fluffy => {
      // Clear all inline styles completely to prevent style stacking
      fluffy.removeAttribute('style');
      
      // Reset leg animations by removing inline styles
      const legGroups = fluffy.querySelectorAll('#SVGleg1-group, #SVGleg2-group, #SVGleg3-group, #SVGleg4-group');
      legGroups.forEach(legGroup => {
        legGroup.removeAttribute('style');
      });
      
      // Force reflow to ensure changes take effect
      void fluffy.offsetWidth;
    });
  };
  
  // Setup event listeners for both initial display and widget redos
  $(document).on(':passagedisplay :redodisplay', function(ev) {
    // First stop all animations to prevent position issues on redraw
    window.stopTankFluffyMove();
    
    // Short delay to allow DOM to update
    setTimeout(function() {
      // Start movement for tank fluffies with moving-tank class
      window.makeTankFluffyMove();
      
      // Add click handlers to toggle movement
      document.querySelectorAll('.move-toggle').forEach(el => {
        el.addEventListener('click', function() {
          const targetSelector = this.getAttribute('data-target');
          const target = document.querySelector(targetSelector);
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