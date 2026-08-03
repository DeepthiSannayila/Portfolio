// Mobile menu toggle
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  });
});

// Scroll reveal for sections (respects reduced-motion)
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  const revealTargets = document.querySelectorAll(
    '.about, .education, .experience .job, .awards, .products .product, .skills, .achievements, .why, .contact'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach(el => observer.observe(el));
}

// Mark award photos with no real image yet (placeholder src) as missing,
// so the CSS fallback pattern shows instead of a broken image icon.
document.querySelectorAll('.award-photo img').forEach(img => {
  if (img.complete && img.naturalWidth === 0) {
    img.closest('.award-photo').classList.add('img-missing');
  }
});