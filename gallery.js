(function () {
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML = `
    <button class="lightbox-close" aria-label="Schließen">
      <svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
    </button>
    <img src="" alt="">
  `;
  document.body.appendChild(lb);

  const lbImg = lb.querySelector('img');

  function open(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt || '';
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { lbImg.src = ''; }, 300);
  }

  document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', () => open(img.src, img.alt));
  });

  lb.querySelector('.lightbox-close').addEventListener('click', close);
  lb.addEventListener('click', e => { if (e.target === lb) close(); });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lb.classList.contains('open')) { close(); return; }
    if (lb.classList.contains('open')) return;
    if (e.key === 'ArrowLeft') {
      const prev = document.querySelector('.proj-pagination-link:not(.next)');
      if (prev) window.location.href = prev.href;
    }
    if (e.key === 'ArrowRight') {
      const next = document.querySelector('.proj-pagination-link.next');
      if (next) window.location.href = next.href;
    }
  });
})();
