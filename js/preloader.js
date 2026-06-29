/* ============================================
   Preloader Animation
   ÆON Restaurant Website
   ============================================ */

(function () {
  'use strict';

  var preloader = document.getElementById('preloader');
  var progressBar = document.getElementById('preloaderBarFill');
  var logoText = preloader && preloader.querySelector('.preloader-logo');
  var percentage = document.getElementById('preloaderPercent');

  if (!preloader) return;

  var progress = 0;
  var finished = false;

  // Simulate loading progress
  function simulateLoading() {
    var interval = setInterval(function () {
      // Slow down progress as it approaches "completion"
      var increment = Math.random() * (100 - progress) * 0.08 + 1;
      progress = Math.min(progress + increment, 99);

      if (progressBar) progressBar.style.width = progress + '%';
      if (percentage) percentage.textContent = Math.round(progress) + '%';

      if (progress >= 99) {
        clearInterval(interval);
        setTimeout(finishLoading, 300);
      }
    }, 100);
  }

  function finishLoading() {
    if (finished) return;
    finished = true;
    progress = 100;
    if (progressBar) progressBar.style.width = '100%';
    if (percentage) percentage.textContent = '100%';

    // Add loaded class to body immediately
    document.body.classList.add('loaded');

    // Fade preloader with CSS transition (no GSAP dependency)
    preloader.style.transition = 'opacity 0.6s ease';
    preloader.style.opacity = '0';

    // Fade logo if present
    if (logoText) {
      logoText.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      logoText.style.transform = 'translateY(-20px)';
      logoText.style.opacity = '0';
    }

    // Remove preloader from DOM after transition
    setTimeout(function () {
      preloader.style.display = 'none';
      // Trigger initial animations
      try {
        document.dispatchEvent(new Event('siteLoaded'));
      } catch (e) {}
    }, 700);
  }

  // Start simulation once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      simulateLoading();
    });
  } else {
    simulateLoading();
  }

  // Fallback: if load takes too long, force finish after 5 seconds
  setTimeout(function () {
    if (!finished) {
      finishLoading();
    }
  }, 5000);

  // Also listen for window load event for a smoother transition
  window.addEventListener('load', function () {
    if (progress > 70 && !finished) {
      finishLoading();
    }
  });

  // ---- Expose for main.js ----
  window.__preloader = { finishLoading: finishLoading };
})();
