/* ============================================
   Main Application Init
   ÆON Restaurant Website
   ============================================ */

(function () {
  'use strict';

  // ---- AOS Initialization ----
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 100,
    disable: 'mobile',
  });

  // ---- Smooth Scrolling for Anchor Links ----
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
          top: top,
          behavior: 'smooth',
        });
      }
    });
  });

  // ---- Lazy Loading for Images (native) ----
  document.querySelectorAll('img[data-src]').forEach((img) => {
    img.src = img.dataset.src;
    img.addEventListener('load', () => {
      img.classList.add('loaded');
    });
  });

  // ---- Section-Specific Class for Styling ----
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.section').forEach((section) => {
    observer.observe(section);
  });

  // ---- Handle Resize Events for Horizontal Scroll ----
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);
  });

  // ---- Navbar Menu Toggle (Mobile) ----
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      document.body.classList.toggle('menu-open');
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.classList.remove('menu-open');
      });
    });
  }

  // ---- Video Background Play/Pause ----
  const video = document.getElementById('aboutVideo');
  if (video) {
    const observerVideo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play();
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.3 }
    );
    observerVideo.observe(video);
  }

  // ---- Console Branding ----
  console.log(
    '%c ÆON ',
    'background: #0a0a0a; color: #d4a574; font-size: 24px; font-weight: bold; padding: 10px 20px; border-radius: 4px; border: 1px solid #d4a574;'
  );
  console.log('%c Where culinary art meets the cosmos.', 'color: #f5e6d3; font-size: 14px; font-style: italic;');

  console.log('🚀 Built with passion | ÆON Restaurant');

  // ---- Log that everything loaded ----
  console.log('✨ ÆON website initialized successfully');
})();