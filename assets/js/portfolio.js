(function () {
    var grid = document.getElementById('portfolio-projects');
    var remaining = document.getElementById('portfolio-remaining');
    var pagination = document.querySelector('.portfolio-pagination');
    var loadMoreButton = pagination.querySelector('button');
    var status = document.querySelector('.portfolio-pagination-status');
    var filters = Array.from(document.querySelectorAll('[data-portfolio-filter]'));
    var pageSize = Number(grid.dataset.portfolioPageSize);
    var projects = Array.from(grid.children);
    var shown = grid.childElementCount;
    var category = 'all';
    var observer;

    if (remaining) projects = projects.concat(Array.from(remaining.content.children));
    var matching = projects;

    function updatePagination() {
        pagination.hidden = shown >= matching.length;
        if (observer) {
            observer.disconnect();
            if (!pagination.hidden) observer.observe(pagination);
        }
    }

    function showNextPage(moveFocus) {
        var next = matching.slice(shown, shown + pageSize);
        grid.append.apply(grid, next);
        shown += next.length;
        if (moveFocus && next.length) next[0].focus();
        status.textContent = status.dataset.message.replace('{shown}', shown).replace('{total}', matching.length);
        updatePagination();
    }

    filters.forEach(function (filter) {
        filter.addEventListener('click', function () {
            var selected = filter.dataset.portfolioFilter;
            if (selected === category) return;

            category = selected;
            filters.forEach(function (item) {
                item.classList.toggle('is-active', item === filter);
                item.setAttribute('aria-pressed', String(item === filter));
            });

            matching = category === 'all' ? projects : projects.filter(function (project) {
                return project.dataset.portfolioCategory === category;
            });
            grid.textContent = '';
            grid.classList.toggle('is-filtered', category !== 'all');
            shown = 0;
            showNextPage(false);
        });
    });

    loadMoreButton.addEventListener('click', function () {
        showNextPage(true);
    });

    if ('IntersectionObserver' in window) {
        observer = new IntersectionObserver(function (entries) {
            if (entries.some(function (entry) { return entry.isIntersecting; }) && shown < matching.length) {
                showNextPage(document.activeElement === loadMoreButton);
            }
        }, { rootMargin: '0px 0px 240px' });
    }

    updatePagination();
})();
