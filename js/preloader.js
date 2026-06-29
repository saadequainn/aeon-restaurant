/* ============================================
   Preloader Animation
   ÆON Restaurant Website
   ============================================ */

(function () {
  'use strict';

  const preloader = document.getElementById('preloader');
  const progressBar = document.getElementById('preloaderBarFill');
  const logoText = preloader?.querySelector('.preloader-logo');
  const percentage = document.getElementById('preloaderPercent');

  if (!preloader) return;

  let progress = 0;

  // Simulate loading progress
  function simulateLoading() {
    const interval = setInterval(() => {
      // Slow down progress as it approaches "completion"
      const increment = Math.random() * (100 - progress) * 0.08 + 1;
      progress = Math.min(progress + increment, 99);

      if (progressBar) progressBar.style.width = progress + '%';
      if (percentage) percentage.textContent = Math.round(progress) + '%';

      // Wait for everything to actually be ready
      if (progress >= 30 && document.querySelector('.hero-content')) {
        // Three.js is likely loaded
      }

      if (progress >= 99) {
        clearInterval(interval);
        // Wait a tiny bit for full readiness
        setTimeout(finishLoading, 300);
      }
    }, 100);
  }

  function finishLoading() {
    progress = 100;
    if (progressBar) progressBar.style.width = '100%';
    if (percentage) percentage.textContent = '100%';

    // Animate out preloader
    gsap.to(preloader, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut',
      delay: 0.3,
      onComplete: () => {
        preloader.style.display = 'none';
        document.body.classList.add('loaded');

        // Trigger initial animations
        document.dispatchEvent(new Event('siteLoaded'));
      },
    });

    // Animate logo away
    if (logoText) {
      gsap.to(logoText, {
        y: -20,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
      });
    }
  }

  // Start simulation once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      simulateLoading();
    });
  } else {
    simulateLoading();
  }

  // Fallback: if load takes too long, force finish after 5 seconds
  setTimeout(() => {
    if (progress < 100) {
      finishLoading();
    }
  }, 5000);

  // Also listen for window load event for a smoother transition
  window.addEventListener('load', () => {
    // If still loading and progress is past 70, finish
    if (progress > 70 && progress < 100) {
      finishLoading();
    }
  });

  // ---- Expose for main.js ----
  window.__preloader = { finishLoading };
})();