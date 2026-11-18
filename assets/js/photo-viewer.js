(function () {
    const viewer = document.getElementById('photo-viewer');
    if (typeof viewer.showModal !== 'function') return;

    const image = viewer.querySelector('img');
    const caption = viewer.querySelector('figcaption');
    const arrows = viewer.querySelectorAll('[data-step]');
    let opener;
    let gallery = [];
    let current = 0;

    function showPhoto() {
        const link = gallery[current];
        image.alt = link.querySelector('img')?.alt ?? '';
        caption.textContent = link.dataset.title ?? '';
        image.src = link.href;
    }

    function move(step) {
        current = (current + step + gallery.length) % gallery.length;
        showPhoto();
    }

    document.addEventListener('click', function (event) {
        const link = event.target.closest('a[data-lightbox]');
        if (!link || event.defaultPrevented || event.button !== 0 ||
            event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

        gallery = Array.from(document.querySelectorAll('a[data-lightbox]')).filter(function (item) {
            return item.dataset.lightbox === link.dataset.lightbox && item.getClientRects().length > 0;
        });
        current = gallery.indexOf(link);
        if (current === -1) return;

        event.preventDefault();
        opener = link;
        arrows.forEach(button => { button.hidden = gallery.length === 1; });
        showPhoto();
        viewer.showModal();
    });

    arrows.forEach(button => {
        button.addEventListener('click', () => move(Number(button.dataset.step)));
    });
    viewer.querySelector('[data-close]').addEventListener('click', () => viewer.close());
    viewer.addEventListener('click', event => { if (event.target === viewer) viewer.close(); });
    viewer.addEventListener('close', function () {
        image.removeAttribute('src');
        if (opener?.isConnected) opener.focus({ preventScroll: true });
    });
    viewer.addEventListener('keydown', function (event) {
        if (gallery.length < 2 || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
        event.preventDefault();
        move(event.key === 'ArrowRight' ? 1 : -1);
    });
})();
