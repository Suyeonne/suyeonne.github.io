(() => {
  const toTopBtn = document.getElementById('toTopBtn');
  const copyBtn = document.getElementById('copyBtn');
  const copyHint = document.getElementById('copyHint');

  if (toTopBtn) {
    toTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Active outline item (IntersectionObserver)
  const outlineLinks = Array.from(document.querySelectorAll('.outline__item'));
  const sections = outlineLinks
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  const setCurrent = (id) => {
    outlineLinks.forEach(a => {
      const isCurrent = a.getAttribute('href') === `#${id}`;
      a.setAttribute('aria-current', isCurrent ? 'true' : 'false');
    });
  };

  if ('IntersectionObserver' in window && sections.length) {
    const io = new IntersectionObserver((entries) => {
      // Choose the entry closest to top that is intersecting
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible && visible.target && visible.target.id) setCurrent(visible.target.id);
    }, { rootMargin: '-30% 0px -60% 0px', threshold: [0.12, 0.2, 0.35] });

    sections.forEach(s => io.observe(s));
    // Default
    setCurrent(sections[0].id);
  }

  

  // Hide image blocks if the file is missing
  document.querySelectorAll('img[data-fallback="hide"]').forEach((img) => {
    img.addEventListener('error', () => {
      const media = img.closest('.artist__media');
      if (media) media.style.display = 'none';
    }, { once: true });
  });

})();

  // Hide image blocks if the file is missing
  document.querySelectorAll('img[data-fallback="hide"]').forEach((img) => {
    img.addEventListener('error', () => {
      const media = img.closest('.artist__media');
      if (media) media.style.display = 'none';
    }, { once: true });
  });

})();