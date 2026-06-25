
document.querySelectorAll('.top-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.top-nav a').forEach((item) => item.removeAttribute('aria-current'));
    link.setAttribute('aria-current', 'page');
  });
});

document.querySelector('.skip-link')?.addEventListener('click', () => {
  const main = document.querySelector('#main-content');
  window.requestAnimationFrame(() => main?.focus());
});

document.querySelectorAll('.chapter-panel').forEach((panel) => {
  const summary = panel.querySelector('summary');

  summary?.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    panel.open = !panel.open;
  });

  panel.addEventListener('toggle', () => {
    if (panel.open) {
      document.querySelectorAll('.chapter-panel').forEach((other) => {
        if (other !== panel) other.open = false;
      });
    }
  });
});
