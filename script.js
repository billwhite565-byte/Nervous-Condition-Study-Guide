
document.addEventListener('DOMContentLoaded', () => {
  const navOrder = [
    ['index.html', 'Home'],
    ['author.html', 'Author'],
    ['setting.html', 'Setting'],
    ['themes.html', 'Themes'],
    ['characters.html', 'Characters'],
    ['chapter-study.html', 'Reading Guide'],
    ['glossary.html', 'Glossary'],
  ];

  document.querySelectorAll('.top-nav').forEach((nav) => {
    const currentLink = nav.querySelector('[aria-current="page"]');
    const currentHref = currentLink?.getAttribute('href') || 'index.html';
    nav.replaceChildren(
      ...navOrder.map(([href, label]) => {
        const link = document.createElement('a');
        link.href = href;
        link.textContent = label;
        if (href === currentHref) link.setAttribute('aria-current', 'page');
        return link;
      })
    );
  });

  if (location.pathname.endsWith('/chapter-study.html')) {
    document.title = 'Reading Guide | Nervous Conditions Study Guide';
    const heading = document.querySelector('#chapters-title');
    if (heading) heading.textContent = 'Reading Guide';
  }

  document.querySelectorAll('a[href="chapter-study.html"] span').forEach((span) => {
    if (span.textContent.trim() === 'Chapter Study') span.textContent = 'Reading Guide';
  });

  const homeGrid = document.querySelector('.home-link-grid');
  const readingCard = homeGrid?.querySelector('a[href="chapter-study.html"]');
  const glossaryCard = homeGrid?.querySelector('a[href="glossary.html"]');
  if (homeGrid && readingCard && glossaryCard && readingCard.compareDocumentPosition(glossaryCard) & Node.DOCUMENT_POSITION_PRECEDING) {
    homeGrid.insertBefore(readingCard, glossaryCard);
  }

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
});
