/* ============================================
   GSAP Animations & ScrollTriggers
   ÆON Restaurant Website
   ============================================ */

(function () {
  'use strict';

  // ---- Register ScrollTrigger ----
  gsap.registerPlugin(ScrollTrigger);

  // ---- Hero Text Reveal ----
  function heroReveal() {
    const heroLines = document.querySelectorAll('.hero-title .line span');
    if (!heroLines.length) return;

    const tl = gsap.timeline({
      defaults: { ease: 'power4.out', duration: 1.2 },
    });

    tl.from(heroLines, {
      y: 100,
      opacity: 0,
      stagger: 0.2,
      delay: 0.8,
    });

    // After hero animation, ensure three.js is visible behind text
    gsap.to('.hero-overlay', {
      opacity: 1,
      duration: 0.5,
      delay: 0.5,
    });
  }

  // ---- About Horizontal Scroll ----
  function aboutHorizontalScroll() {
    const horizontal = document.getElementById('aboutHorizontal');
    if (!horizontal) return;

    const panels = gsap.utils.toArray('.about-panel');
    const totalWidth = horizontal.scrollWidth - window.innerWidth;

    gsap.to(horizontal, {
      x: () => -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: '.about',
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${totalWidth + 200}`,
        invalidateOnRefresh: true,
      },
    });

    // Animate stats when they appear
    panels.forEach((panel) => {
      const counters = panel.querySelectorAll('.counter');
      counters.forEach((counter) => {
        ScrollTrigger.create({
          trigger: counter,
          start: 'left 80%',
          onEnter: () => animateCounter(counter),
        });
      });
    });
  }

  // ---- Counter Animation ----
  function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'), 10);
    const isK = element.parentElement.textContent.includes('K');

    let start = 0;
    const end = target;
    const duration = 2;

    gsap.to(element, {
      innerHTML: end,
      duration: duration,
      snap: { innerHTML: 1 },
      ease: 'power2.out',
      onUpdate: function () {
        const val = Math.round(parseFloat(element.innerHTML));
        element.textContent = val;
      },
    });
  }

  // ---- Parallax Hero on Scroll ----
  function heroParallax() {
    gsap.to('.hero-content', {
      y: 150,
      opacity: 0.3,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }

  // ---- Counter Init on Scroll (for About stats) ----
  function aboutCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach((counter) => {
      ScrollTrigger.create({
        trigger: counter,
        start: 'top 85%',
        once: true,
        onEnter: () => animateCounter(counter),
      });
    });
  }

  // ---- Chef Stagger Animation (fallback to GSAP if AOS doesn't cover) ----
  function chefAnimation() {
    const chefCards = gsap.utils.toArray('.chef-card');
    chefCards.forEach((card) => {
      gsap.from(card, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });
  }

  // ---- Menu Category Animation ----
  function menuAnimations() {
    const menuCards = gsap.utils.toArray('.menu-item-card');
    menuCards.forEach((card) => {
      gsap.from(card, {
        y: 50,
        opacity: 0,
        scale: 0.95,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });
    });
  }

  // ---- Navbar Scroll Effect ----
  function navScroll() {
    const nav = document.getElementById('nav');
    if (!nav) return;

    ScrollTrigger.create({
      start: 'top -80',
      onUpdate: (self) => {
        if (self.progress > 0) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
      },
    });
  }

  // ---- Back to Top Button ----
  function backToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    ScrollTrigger.create({
      start: 'top -300',
      onEnter: () => btn.classList.add('visible'),
      onLeaveBack: () => btn.classList.remove('visible'),
    });

    btn.addEventListener('click', () => {
      gsap.to(window, {
        scrollTo: { y: 0, autoKill: true },
        duration: 1.2,
        ease: 'power4.inOut',
      });
    });
  }

  // ---- Footer Newsletter Animation ----
  function newsletterAnim() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      if (!input.value) return;

      const btn = form.querySelector('button');
      btn.textContent = '✓ Subscribed';
      btn.style.background = '#4caf50';

      setTimeout(() => {
        btn.textContent = 'Subscribe';
        btn.style.background = '';
        input.value = '';
      }, 3000);
    });
  }

  // ---- Magnetic Button Effect ----
  function magneticButtons() {
    const wrappers = document.querySelectorAll('.magnetic-wrapper');

    wrappers.forEach((wrapper) => {
      const btn = wrapper.querySelector('button');

      wrapper.addEventListener('mousemove', (e) => {
        const rect = wrapper.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.4,
          ease: 'power2.out',
        });
      });

      wrapper.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.4)',
        });
      });
    });
  }

  // ---- Section Reveal Animations (only for elements within, not sections themselves) ----
  function sectionReveals() {
    gsap.utils.toArray('.section-header, .about-panel, .chef-card, .gallery-item').forEach((el) => {
      gsap.from(el, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });
    });
  }

  // ---- Decorative Line Animation ----
  function decoLines() {
    gsap.utils.toArray('.deco-line').forEach((line) => {
      gsap.from(line, {
        width: 0,
        duration: 1,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: line,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });
    });
  }

  // ---- ScrollTo Polyfill for Safari (removed — handled in main.js to avoid conflicts) ----
  // Note: Anchor link smooth scrolling is handled in main.js

  // ---- Init all when DOM is ready ----
  function init() {
    heroReveal();
    heroParallax();
    aboutHorizontalScroll();
    aboutCounters();
    chefAnimation();
    menuAnimations();
    navScroll();
    backToTop();
    newsletterAnim();
    magneticButtons();
    sectionReveals();
    decoLines();
  }

  // Wait for Three.js background to be ready
  if (document.readyState === 'complete') {
    setTimeout(init, 200);
  } else {
    window.addEventListener('load', () => setTimeout(init, 200));
  }
})();