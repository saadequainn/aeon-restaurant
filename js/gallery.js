/* ============================================
   Gallery Masonry & Lightbox Module
   ÆON Restaurant Website
   ============================================ */

(function () {
  'use strict';

  const galleryGrid = document.querySelector('.gallery-grid');
  if (!galleryGrid) return;

  // ---- Lightbox ----
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImage');
  const lightboxClose = lightbox?.querySelector('.lightbox-close');
  const lightboxCaption = document.getElementById('lightboxCaption');

  function openLightbox(src, caption) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';

    if (lightboxCaption && caption) {
      lightboxCaption.textContent = caption;
    }

    gsap.fromTo(
      lightbox.querySelector('.lightbox-content'),
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }
    );
  }

  function closeLightbox() {
    if (!lightbox) return;
    gsap.to(lightbox.querySelector('.lightbox-content'), {
      opacity: 0,
      scale: 0.9,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
      },
    });
  }

  // Attach click events to gallery items
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const caption = item.dataset.caption || img?.alt || '';
      if (img) openLightbox(img.src, caption);
    });
  });

  // Close lightbox events
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  // ---- Masonry Layout (CSS columns-based) ----
  // The grid uses column-count, naturally reflowing items.
  // We just need to ensure images are loaded before layout
  function layoutMasonry() {
    const imgs = galleryGrid.querySelectorAll('img');
    let loaded = 0;
    const total = imgs.length;

    imgs.forEach((img) => {
      if (img.complete) {
        loaded++;
        if (loaded === total) onReady();
      } else {
        img.addEventListener('load', () => {
          loaded++;
          if (loaded === total) onReady();
        });
        img.addEventListener('error', () => {
          loaded++;
          if (loaded === total) onReady();
        });
      }
    });

    if (total === 0) onReady();
  }

  function onReady() {
    gsap.from('.gallery-item', {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.06,
      ease: 'power2.out',
      delay: 0.2,
    });
  }

  layoutMasonry();

  // ---- Expose ----
  window.__gallery = { openLightbox, closeLightbox };
})();