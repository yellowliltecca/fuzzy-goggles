(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      nav.classList.toggle('is-open', !isOpen);
      menuButton.textContent = isOpen ? 'Меню' : 'Закрыть';
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.textContent = 'Меню';
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        nav.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.textContent = 'Меню';
      }
    });
  }

  const filters = [...document.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('.inspiration-card')];

  filters.forEach((filter) => {
    filter.addEventListener('click', () => {
      const value = filter.dataset.filter;
      filters.forEach((item) => {
        const active = item === filter;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      cards.forEach((card) => {
        card.hidden = value !== 'all' && card.dataset.category !== value;
      });
    });
  });

  const lightbox = document.querySelector('.lightbox');
  const lightboxImage = lightbox?.querySelector('img');
  const lightboxCaption = lightbox?.querySelector('.lightbox-caption');
  const closeButton = lightbox?.querySelector('.lightbox-close');

  if (lightbox && lightboxImage && lightboxCaption && closeButton) {
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        const image = card.dataset.image;
        if (!image) return;
        lightboxImage.src = image;
        lightboxImage.alt = card.querySelector('img')?.alt || card.dataset.title || '';
        lightboxCaption.textContent = card.dataset.title || '';
        lightbox.showModal();
      });
    });

    closeButton.addEventListener('click', () => lightbox.close());
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) lightbox.close();
    });
    lightbox.addEventListener('close', () => {
      lightboxImage.removeAttribute('src');
      lightboxCaption.textContent = '';
    });
  }

  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
