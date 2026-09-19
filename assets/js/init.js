$(document).ready(function(){
    $('.sidenav').sidenav();
    $('.scrollspy').scrollSpy();
    $('.fixed-action-btn').floatingActionButton();
    $('.modal').modal();
    $('.materialboxed').materialbox();

    var aboutTabs = Array.prototype.slice.call(document.querySelectorAll('.about-topics [role="tab"]'));
    var aboutPanels = Array.prototype.slice.call(document.querySelectorAll('.about-principle-panel'));

    function activateAboutTab(tab, moveFocus) {
        aboutTabs.forEach(function(item) {
            var isSelected = item === tab;
            item.classList.toggle('is-active', isSelected);
            item.setAttribute('aria-selected', isSelected ? 'true' : 'false');
            item.tabIndex = isSelected ? 0 : -1;
        });

        aboutPanels.forEach(function(panel) {
            var isSelected = panel.id === tab.getAttribute('data-about-panel');
            panel.hidden = !isSelected;
            panel.classList.toggle('is-active', isSelected);
        });

        if (moveFocus) tab.focus();
    }

    aboutTabs.forEach(function(tab, index) {
        tab.addEventListener('click', function() {
            activateAboutTab(tab, false);
        });

        tab.addEventListener('keydown', function(event) {
            var nextIndex;
            if (event.key === 'ArrowRight') nextIndex = (index + 1) % aboutTabs.length;
            if (event.key === 'ArrowLeft') nextIndex = (index - 1 + aboutTabs.length) % aboutTabs.length;
            if (event.key === 'Home') nextIndex = 0;
            if (event.key === 'End') nextIndex = aboutTabs.length - 1;
            if (typeof nextIndex === 'number') {
                event.preventDefault();
                activateAboutTab(aboutTabs[nextIndex], true);
            }
        });
    });
});
