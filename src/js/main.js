// CIB Horizonte - Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', nav.classList.contains('is-open'));
    });

    // Close menu on link click
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scroll animations
  const fadeElements = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  fadeElements.forEach(el => observer.observe(el));

  // Active navigation state
  const currentPath = window.location.pathname;
  document.querySelectorAll('.main-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath.includes(href) && href !== '/' && href !== 'index.html')) {
      link.classList.add('active');
    }
  });

  // Spam-Schutz: Zeitstempel setzen
  const formtime = document.getElementById('formtime');
  if (formtime) {
    formtime.value = Date.now();
  }

  // Contact form handling
  const form = document.getElementById('kontaktForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Wird gesendet...';
      btn.disabled = true;

      try {
        const response = await fetch('/contact.php', {
          method: 'POST',
          body: new FormData(form),
        });
        const data = await response.json();

        if (data.success) {
          form.innerHTML = '<div style="text-align:center;padding:40px 0"><h3 style="color:#1E2F4F;margin-bottom:12px">Vielen Dank!</h3><p>Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns zeitnah bei Ihnen.</p></div>';
        } else {
          alert(data.error || 'Ein Fehler ist aufgetreten.');
          btn.textContent = originalText;
          btn.disabled = false;
        }
      } catch (err) {
        alert('Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.');
        btn.textContent = originalText;
        btn.disabled = false;
      }
    });
  }
});
