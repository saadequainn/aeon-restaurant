/* ============================================
   Menu Filter & Card Flip Module
   ÆON Restaurant Website
   ============================================ */

(function () {
  'use strict';

  const tabs = document.querySelectorAll('.pill-tab');
  const categories = document.querySelectorAll('.menu-category');

  if (!tabs.length || !categories.length) return;

  let activeCategory = 'starters';

  // ---- Filter Tabs ----
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const category = tab.dataset.category;
      if (category === activeCategory) return;

      // Update active tab
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      // Switch category
      switchCategory(category);
    });
  });

  function switchCategory(category) {
    const currentActive = document.querySelector('.menu-category.active');
    const nextActive = document.querySelector(`.menu-category[data-category="${category}"]`);

    if (!nextActive) return;

    // Animate out current
    if (currentActive) {
      const currentCards = currentActive.querySelectorAll('.menu-item-card');
      gsap.to(currentCards, {
        y: 30,
        opacity: 0,
        scale: 0.95,
        duration: 0.3,
        stagger: 0.05,
        ease: 'power2.in',
        onComplete: () => {
          currentActive.classList.remove('active');

          // Animate in next
          nextActive.classList.add('active');
          const nextCards = nextActive.querySelectorAll('.menu-item-card');

          gsap.set(nextCards, {
            y: 30,
            opacity: 0,
            scale: 0.95,
          });

          gsap.to(nextCards, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power2.out',
          });
        },
      });
    } else {
      nextActive.classList.add('active');
      const nextCards = nextActive.querySelectorAll('.menu-item-card');
      gsap.from(nextCards, {
        y: 30,
        opacity: 0,
        scale: 0.95,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
      });
    }

    activeCategory = category;
  }

  // ---- Card 3D Tilt Effect ----
  const cards = document.querySelectorAll('.menu-item-card');

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      const inner = card.querySelector('.menu-item-inner');
      if (inner) {
        gsap.to(inner, {
          rotateX: rotateX,
          rotateY: rotateY,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    });

    card.addEventListener('mouseleave', () => {
      const inner = card.querySelector('.menu-item-inner');
      if (inner) {
        gsap.to(inner, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.4)',
        });
      }
    });
  });

  // ---- Expose for main.js ----
  window.__menu = {
    switchCategory,
  };
})();