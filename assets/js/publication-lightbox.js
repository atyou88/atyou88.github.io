/* Enlarge publication figures without navigating away from the page. */
(() => {
  const dialog = document.querySelector('.publication-lightbox');
  if (!dialog || typeof dialog.showModal !== 'function') return;

  const image = dialog.querySelector('.publication-lightbox__image');
  const closeButton = dialog.querySelector('.publication-lightbox__close');
  let opener;
  let scrollPosition;

  document.querySelectorAll('.publication__figure').forEach((link) => {
    link.setAttribute('aria-haspopup', 'dialog');
    link.addEventListener('click', (event) => {
      // Preserve the usual new-tab behavior for modified clicks.
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      scrollPosition = { top: window.scrollY, left: window.scrollX, behavior: 'instant' };
      image.src = link.href;
      image.alt = link.querySelector('img').alt;
      dialog.showModal();
      document.documentElement.classList.add('publication-lightbox-open');
      window.scrollTo(scrollPosition);
    });
  });

  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  // Native dialog provides Escape handling, focus trapping and an inert background.
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('publication-lightbox-open');
    image.removeAttribute('src');
    if (opener) opener.focus({ preventScroll: true });
    window.scrollTo(scrollPosition);
  });
})();
