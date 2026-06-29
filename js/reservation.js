/* ============================================
   Reservation Form Module
   ÆON Restaurant Website
   ============================================ */

(function () {
  'use strict';

  const form = document.getElementById('reservationForm');
  if (!form) return;

  const submitBtn = form.querySelector('.btn-submit');
  const formCard = form.closest('.reservation-card');

  // ---- Floating Labels ----
  const inputs = form.querySelectorAll('.input-field');
  inputs.forEach((input) => {
    // Check initial state
    if (input.value.trim() !== '') {
      input.classList.add('has-value');
    }

    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
      input.parentElement.classList.remove('focused');
      if (input.value.trim() !== '') {
        input.classList.add('has-value');
      } else {
        input.classList.remove('has-value');
      }
    });

    input.addEventListener('input', () => {
      if (input.value.trim() !== '') {
        input.classList.add('has-value');
      } else {
        input.classList.remove('has-value');
      }
    });
  });

  // ---- Date Picker: Set min date to today ----
  const dateInput = form.querySelector('input[type="date"]');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  // ---- Submit Handler ----
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all required fields
    let valid = true;
    const required = form.querySelectorAll('[required]');
    required.forEach((field) => {
      if (!field.value.trim()) {
        field.style.borderColor = '#ff4444';
        valid = false;
      } else {
        field.style.borderColor = '';
      }
    });

    if (!valid) {
      // Shake the form
      gsap.fromTo(
        formCard,
        { x: 0 },
        {
          x: 10,
          duration: 0.1,
          repeat: 3,
          yoyo: true,
          ease: 'power2.inOut',
          onComplete: () => {
            gsap.set(formCard, { x: 0 });
          },
        }
      );
      return;
    }

    // Disable button
    submitBtn.disabled = true;
    submitBtn.textContent = 'Reserving...';

    // Simulate submission
    gsap.to(submitBtn, {
      scale: 0.95,
      duration: 0.2,
      onComplete: () => {
        // Show success animation
        showSuccess(form);
      },
    });
  });

  function showSuccess(form) {
    // Create success overlay
    const existing = form.querySelector('.success-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.className = 'success-overlay';
    overlay.innerHTML = `
      <div class="success-icon">
        <svg viewBox="0 0 100 100" width="80" height="80">
          <circle class="success-circle" cx="50" cy="50" r="45" fill="none" stroke="#d4a574" stroke-width="4"
            stroke-dasharray="283" stroke-dashoffset="283" data-draw="283" />
          <polyline class="success-check" points="30,50 45,65 70,35" fill="none" stroke="#d4a574" stroke-width="5"
            stroke-linecap="round" stroke-linejoin="round"
            stroke-dasharray="60" stroke-dashoffset="60" data-draw="60" />
        </svg>
      </div>
      <h3 class="success-title">Reservation Confirmed</h3>
      <p class="success-text">A confirmation email will be sent to you shortly.</p>
    `;

    form.style.position = 'relative';
    form.appendChild(overlay);

    gsap.set(overlay, { opacity: 0 });
    gsap.to(overlay, {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out',
    });

    // Animate checkmark
    const circle = overlay.querySelector('.success-circle');
    const check = overlay.querySelector('.success-check');

    gsap.to(circle, {
      strokeDashoffset: 0,
      duration: 0.6,
      ease: 'power2.out',
      delay: 0.2,
    });

    gsap.to(check, {
      strokeDashoffset: 0,
      duration: 0.4,
      ease: 'power2.out',
      delay: 0.6,
    });

    // Reset form after delay
    setTimeout(() => {
      form.reset();
      // Remove success overlay
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.4,
        delay: 0.2,
        onComplete: () => overlay.remove(),
      });

      submitBtn.disabled = false;
      submitBtn.textContent = 'Confirm Reservation';

      // Reset floating labels
      inputs.forEach((input) => {
        input.classList.remove('has-value');
      });
    }, 3500);
  }

  // ---- Expose ----
  window.__reservation = { showSuccess };
})();