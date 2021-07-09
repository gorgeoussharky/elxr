/* eslint-disable curly */
/* eslint-disable no-console */
import Flickity from 'flickity';
import 'fullpage.js/vendors/scrolloverflow.min.js';
import Fullpage from 'fullpage.js';
import 'bootstrap';
import './ticker';
import './tabs';

jQuery(($) => {
    var carousel;
    var fullpage;

    if (document.querySelector('#frontpage')) {
        if (window.matchMedia('(min-width: 991px)').matches) {
            document.querySelector('.footer').classList.add('fp-noscroll');
        }

        fullpage = new Fullpage('#frontpage', {
            autoScrolling: true,
            anchors: ['hero', 'use-cases', 'slogan-ticker', 'advantage-block1', 'advantage-block2', 'advantage-block3', 'shops', 'faq'],
            fitToSection: true,
            verticalCentered: true,
            touchSensitivity: 12,
            scrollOverflow: true,
            bigSectionsDestination: 'top',
            scrollOverflowOptions: {
                scrollbars: false,
                freeScroll: true,
            },
            afterRender: () => {
                document.body.style.backgroundColor = '#e4569e';
            },
            onLeave: function (origin, destination) {
                var originVideo = origin.item.querySelector('.advantage-block__video');
                var originInfo = origin.item.querySelector('.advantage-block__info');
                var destVideo = destination.item.querySelector('.advantage-block__video');
                var destInfo = destination.item.querySelector('.advantage-block__info');
                var color = destination.item.getAttribute('data-color');
                var rotation = destination.item.getAttribute('data-rotation');
                var icon = destination.item.getAttribute('data-icon');

                var ticker = destination.item.querySelector('.slogan-ticker__ticker');
                if (ticker) {
                    Flickity.data(ticker).resize();
                }

                if (originVideo) {
                    originVideo.classList.add('advantage-block__video--hidden');
                    originInfo.classList.add('advantage-block__info--hidden');
                    originVideo.pause();
                }
                if (destVideo) {
                    setTimeout(() => {
                        destVideo.classList.remove('advantage-block__video--hidden');
                        destInfo.classList.remove('advantage-block__info--hidden');
                        destVideo.play();
                    }, 400);
                }

                if (window.matchMedia('(max-width: 768px)').matches) {
                    if (icon) {
                        document.querySelector('.frontpage__advantage-block-circle img').style.opacity = 1;
                        document.querySelector('.frontpage__advantage-block-circle img').setAttribute('src', icon);
                    } else {
                        document.querySelector('.frontpage__advantage-block-circle img').style.opacity = 0;
                    }
                }

                if (destination.index < 4) {
                    document.querySelector('.frontpage__advantage-block-circle').classList.remove('frontpage__advantage-block-circle--full-circle');
                    document.querySelector('.frontpage__advantage-block-circle').classList.remove('frontpage__advantage-block-circle--half-circle');
                } else if (destination.index === 4) {
                    document.querySelector('.frontpage__advantage-block-circle').classList.remove('frontpage__advantage-block-circle--full-circle');
                    document.querySelector('.frontpage__advantage-block-circle').classList.add('frontpage__advantage-block-circle--half-circle');
                } else if (destination.index > 4) {
                    document.querySelector('.frontpage__advantage-block-circle').classList.remove('frontpage__advantage-block-circle--half-circle');
                    document.querySelector('.frontpage__advantage-block-circle').classList.add('frontpage__advantage-block-circle--full-circle');
                }

                if (color) document.documentElement.style.setProperty('--bg-color', color);
                else document.documentElement.style.setProperty('--bg-color', '#03070E');

                if (destination.index >= 6) {
                    document.querySelector('.frontpage__gradient').classList.add('frontpage__gradient--animation');
                } else {
                    document.querySelector('.frontpage__gradient').classList.remove('frontpage__gradient--animation');
                }

                if (destination.index >= 3 && destination.index < 6) {
                    document.querySelector('.hero__stars-wrap').style.opacity = 0;
                    if (window.matchMedia('(min-width: 768px)').matches) {
                        document.querySelector('.frontpage__advantage-block-circle').style.transform = `rotate(${rotation}deg)`;
                    }
                    setTimeout(() => {
                        document.querySelector('.frontpage__advantage-block-circle').style.opacity = 1;
                    }, 300);
                } else {
                    document.querySelector('.hero__stars-wrap').style.opacity = 1;
                    document.querySelector('.frontpage__advantage-block-circle').style.opacity = 0;
                }
            },
        });
    }

    if (document.querySelector('[data-click="order"]')) {
        document.querySelector('[data-click="order"]').addEventListener('click', () => {
            fullpage.moveTo('shops');
        });
    }

    if (document.querySelector('.hero__helper-arrow')) {
        document.querySelector('.hero__helper-arrow').addEventListener('click', () => {
            fullpage.moveTo(2);
        });
    }

    document.querySelectorAll('.modal').forEach((el) => {
        el.addEventListener('show.bs.modal', (e) => {
            var tabTarget = e.relatedTarget.getAttribute('data-tab');
            document.documentElement.classList.add('locked');
            if (fullpage) {
                fullpage.setAllowScrolling(false);
                fullpage.setKeyboardScrolling(false);
            }

            if (tabTarget) document.querySelector(`.tabs__nav-link[href="${tabTarget}"]`).click();
        });

        el.addEventListener('hide.bs.modal', () => {
            document.documentElement.classList.remove('locked');
            if (fullpage) {
                fullpage.setAllowScrolling(true);
                fullpage.setKeyboardScrolling(true);
            }
        });
    });

    document.querySelectorAll('[data-lazy]').forEach((el) => {
        var img;
        var element = el;
        if (window.matchMedia('(max-width: 600px').matches) {
            img = element.getAttribute('data-lazy-sm');
            element.parentElement.querySelector('.sm').srcset = img;
        } else {
            img = element.getAttribute('data-lazy-xl');
            element.parentElement.querySelector('.xl').srcset = img;
        }
    });

    document.querySelector('.header__toggler').addEventListener('click', function (e) {
        const menu = document.querySelector('.header__header-menu');
        e.preventDefault();
        if (!this.classList.contains('header__toggler--active')) {
            menu.style.display = 'flex';
            setTimeout(() => {
                menu.classList.add('header__header-menu--active');
            });
            if (fullpage) {
                fullpage.setAllowScrolling(false);
                fullpage.setKeyboardScrolling(false);
            }
            document.documentElement.classList.add('locked');
        } else {
            menu.classList.remove('header__header-menu--active');
            if (fullpage) {
                fullpage.setAllowScrolling(true);
                fullpage.setKeyboardScrolling(true);
            }
            document.documentElement.classList.remove('locked');
            setTimeout(() => {
                menu.style.display = 'none';
            }, 500);
        }
        this.classList.toggle('header__toggler--active');
    });

    document.querySelectorAll('.header-menu__link').forEach((el) => {
        const menu = document.querySelector('.header__header-menu');
        el.addEventListener('click', function () {
            if (this.hash !== '') {
                document.querySelector('.header__toggler').classList.remove('header__toggler--active');
                menu.classList.remove('header__header-menu--active');
                if (fullpage) {
                    fullpage.setAllowScrolling(true);
                    fullpage.setKeyboardScrolling(true);
                }
                document.documentElement.classList.remove('locked');
                setTimeout(() => {
                    menu.style.display = 'none';
                }, 500);
            }
        });
    });

    if (document.querySelector('.use-cases__carousel-wrap')) {
        carousel = new Flickity('.use-cases__carousel-wrap', {
            cellAlign: 'center',
            prevNextButtons: false,
            wrapAround: true,
            autoPlay: 5000,
            adaptiveHeight: true,
            autoplay: true,
        });

        document.querySelector('.use-cases__carousel-control--prev').addEventListener('click', (e) => {
            e.preventDefault();
            carousel.previous(false, false);
        });

        document.querySelector('.use-cases__carousel-control--next').addEventListener('click', (e) => {
            e.preventDefault();
            carousel.next(false, false);
        });
    }

    $(document).on('click', '.faq-item__toggler', function (e) {
        e.preventDefault();
        $(this).toggleClass('faq-item__toggler--expanded');
        $(this).parents('.faq__item').find('.faq-item__content').slideToggle();
        setTimeout(() => {
            fullpage.reBuild();
        }, 500);
    });
});
