// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== BURGER MENU =====
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
if (burger) {
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// ===== MODAL =====
function openModal() {
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('click', (e) => {
  const modal = document.getElementById('modal');
  if (modal && e.target === modal) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ===== SUBMIT REQUEST =====
async function submitRequest() {
  const name = document.getElementById('fname')?.value.trim();
  const phone = document.getElementById('fphone')?.value.trim();
  const desc = document.getElementById('fdesc')?.value.trim();
  const msgEl = document.getElementById('formMsg');
  const btn = document.getElementById('submitBtn');

  if (!name || !phone) {
    msgEl.textContent = "Будь ласка, заповніть ім'я та телефон.";
    msgEl.className = 'form-msg form-msg--error';
    return;
  }

  btn.textContent = 'Надсилаємо...';
  btn.disabled = true;

  try {
    const res = await fetch('/api/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, desc })
    });
    const data = await res.json();
    msgEl.textContent = '✅ ' + data.message;
    msgEl.className = 'form-msg form-msg--success';
    document.getElementById('fname').value = '';
    document.getElementById('fphone').value = '';
    if (document.getElementById('fdesc')) document.getElementById('fdesc').value = '';
    setTimeout(closeModal, 3000);
  } catch {
    msgEl.textContent = '❌ Помилка. Зателефонуйте нам напряму.';
    msgEl.className = 'form-msg form-msg--error';
  } finally {
    btn.textContent = 'Надіслати заявку';
    btn.disabled = false;
  }
}

// ===== COUNTER ANIMATION =====
function animateCounters() {
  const counters = document.querySelectorAll('.stat-num[data-target]');
  counters.forEach(el => {
    const target = parseInt(el.dataset.target);
    const duration = 1800;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target).toLocaleString('uk');
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

// Trigger counters when in viewport
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateCounters();
      obs.disconnect();
    }
  }, { threshold: 0.4 });
  obs.observe(heroStats);
}

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.why-card, .review-card, .team-card, .service-card, .cert-card, .step');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => {
  if (!el.classList.contains('service-card')) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  }
  revealObs.observe(el);
});

// ===== PHONE MASK =====
document.querySelectorAll('input[type="tel"]').forEach(input => {
  input.addEventListener('input', function () {
    let v = this.value.replace(/\D/g, '');
    if (v.startsWith('380')) v = '+' + v;
    else if (v.startsWith('38')) v = '+' + v;
    else if (v.startsWith('0') && v.length <= 10) {
      // keep as is
    }
    this.value = v;
  });
});
