/* ============================================
   Custom Cursor Effects
   ÆON Restaurant Website
   ============================================ */

(function () {
  'use strict';

  // Only on desktop
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cursor = document.getElementById('cursorRing');
  const cursorDot = document.getElementById('cursorDot');

  if (!cursor || !cursorDot) return;

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  const speed = 0.15;

  // Track mouse position
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  // Animate cursor ring with smooth follow
  function animateCursor() {
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  // ---- Hover Effects ----
  const hoverTargets = document.querySelectorAll(
    'a, button, .menu-item-card, .gallery-item, .chef-card, .pill-tab, .magnetic-wrapper, input, textarea, select, [data-cursor]'
  );

  hoverTargets.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
    });

    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  });

  // ---- Hide cursor when leaving window ----
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorDot.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorDot.style.opacity = '1';
  });

  // ---- Click effect ----
  document.addEventListener('mousedown', () => {
    cursor.classList.add('click');
    gsap.to(cursor, {
      scale: 0.8,
      duration: 0.15,
      ease: 'power2.out',
    });
  });

  document.addEventListener('mouseup', () => {
    cursor.classList.remove('click');
    gsap.to(cursor, {
      scale: 1,
      duration: 0.3,
      ease: 'elastic.out(1, 0.4)',
    });
  });

  // ---- Custom data-cursor text ----
  const dataCursors = document.querySelectorAll('[data-cursor]');
  dataCursors.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      const text = el.dataset.cursor || '';
      cursor.setAttribute('data-text', text);
      cursor.classList.add('has-text');
    });

    el.addEventListener('mouseleave', () => {
      cursor.removeAttribute('data-text');
      cursor.classList.remove('has-text');
    });
  });
})();