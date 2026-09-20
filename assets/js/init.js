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

    var serviceLayer = document.querySelector('.service-drawer-layer');
    if (serviceLayer) {
        var serviceDrawer = serviceLayer.querySelector('.service-drawer');
        var serviceTriggers = Array.prototype.slice.call(document.querySelectorAll('.service-drawer-trigger'));
        var servicePanels = Array.prototype.slice.call(serviceLayer.querySelectorAll('.service-drawer-panel'));
        var serviceClose = serviceLayer.querySelector('.service-drawer-close');
        var serviceBackdrop = serviceLayer.querySelector('.service-drawer-backdrop');
        var serviceProgress = serviceLayer.querySelector('.service-drawer-progress span');
        var servicePrev = serviceLayer.querySelector('.service-drawer-prev');
        var serviceNext = serviceLayer.querySelector('.service-drawer-next');
        var serviceCtas = Array.prototype.slice.call(serviceLayer.querySelectorAll('.service-drawer-cta'));
        var lastServiceTrigger = null;
        var activeServiceIndex = 0;

        function activateService(index) {
            index = (index + servicePanels.length) % servicePanels.length;
            activeServiceIndex = index;

            servicePanels.forEach(function(panel, panelIndex) {
                var isActive = panelIndex === index;
                panel.hidden = !isActive;
                panel.classList.toggle('is-active', isActive);
            });

            if (serviceProgress) serviceProgress.textContent = '0' + (index + 1);
            servicePrev.querySelector('strong').textContent = servicePanels[(index - 1 + servicePanels.length) % servicePanels.length].querySelector('h2').textContent;
            serviceNext.querySelector('strong').textContent = servicePanels[(index + 1) % servicePanels.length].querySelector('h2').textContent;
            serviceLayer.querySelector('.service-drawer-content').scrollTop = 0;
        }

        function openServiceDrawer(index, trigger) {
            lastServiceTrigger = trigger || document.activeElement;
            activateService(index);
            serviceLayer.classList.add('is-open');
            serviceLayer.setAttribute('aria-hidden', 'false');
            document.body.classList.add('service-drawer-open');
            window.requestAnimationFrame(function() { serviceClose.focus(); });
        }

        function closeServiceDrawer(restoreFocus) {
            serviceLayer.classList.remove('is-open');
            serviceLayer.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('service-drawer-open');
            if (restoreFocus !== false && lastServiceTrigger) lastServiceTrigger.focus();
        }

        serviceTriggers.forEach(function(trigger) {
            trigger.addEventListener('click', function(event) {
                event.preventDefault();
                openServiceDrawer(Number(trigger.getAttribute('data-service-index')) || 0, trigger);
            });
        });

        servicePrev.addEventListener('click', function() { activateService(activeServiceIndex - 1); });
        serviceNext.addEventListener('click', function() { activateService(activeServiceIndex + 1); });

        serviceClose.addEventListener('click', function() { closeServiceDrawer(true); });
        serviceBackdrop.addEventListener('click', function() { closeServiceDrawer(true); });

        serviceCtas.forEach(function(cta) {
            cta.addEventListener('click', function(event) {
                event.preventDefault();
                closeServiceDrawer(false);
                window.setTimeout(function() {
                    var contactModal = document.querySelector('#contactos');
                    var contactInstance = contactModal && M.Modal.getInstance(contactModal);
                    if (contactInstance) contactInstance.open();
                }, 440);
            });
        });

        document.addEventListener('keydown', function(event) {
            if (!serviceLayer.classList.contains('is-open')) return;
            if (event.key === 'Escape') {
                event.preventDefault();
                closeServiceDrawer(true);
                return;
            }

            if (event.key === 'Tab') {
                var focusable = Array.prototype.slice.call(serviceDrawer.querySelectorAll('button:not([disabled]), a[href]')).filter(function(element) {
                    return !element.closest('[hidden]');
                });
                if (!focusable.length) return;
                var first = focusable[0];
                var last = focusable[focusable.length - 1];
                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first.focus();
                }
            }
        });
    }

    function alignHashSection() {
        if (!window.location.hash) return;
        var target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
        if (!target || !target.classList.contains('scrollspy')) return;

        var navigation = document.querySelector('.site-nav');
        var navigationHeight = navigation ? navigation.getBoundingClientRect().height : 0;
        var targetTop = target.getBoundingClientRect().top + window.pageYOffset - navigationHeight;
        window.scrollTo(0, Math.max(0, targetTop));
    }

    window.addEventListener('hashchange', function() {
        window.setTimeout(alignHashSection, 30);
    });

    if (window.location.hash) {
        window.setTimeout(alignHashSection, 30);
        window.setTimeout(alignHashSection, 650);
    }
});
