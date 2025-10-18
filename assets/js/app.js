// Simple utilities: reveal on scroll, odometer-like counters, mobile nav.

const inView = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => {
    if (e.isIntersecting){
      e.target.classList.add('in');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.18 });

document.querySelectorAll('.reveal').forEach(el => inView.observe(el));

// Count up for .stat-num
const countView = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = parseFloat(el.dataset.count || '0');
    const dur = 1200;
    const start = performance.now();

    function tick(t){
      const p = Math.min((t - start) / dur, 1);
      const val = (target * p).toFixed(target % 1 ? 1 : 0);
      el.textContent = val;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    obs.unobserve(el);
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => countView.observe(el));

// Mobile menu
const burger = document.querySelector('.burger');
const header = document.querySelector('.site-header');
if (burger){
  burger.addEventListener('click', () => {
    const open = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!open));
    header.classList.toggle('menu-open');
    document.querySelector('.menu')?.classList.toggle('open');
  });
}

// Progressive enhancement for forms (prevent empty submissions)
document.querySelectorAll('form[data-enhance="true"]').forEach(form => {
  form.addEventListener('submit', (e) => {
    // TODO: replace with your Formspree/Azure endpoint, then remove preventDefault.
    e.preventDefault();
    alert('Thanks! We will get back within 48 hours.');
    form.reset();
  });
});