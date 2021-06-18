/* eslint-disable curly */
/* eslint-disable no-console */
import Flickity from 'flickity';
import 'fullpage.js/vendors/scrolloverflow.min.js';
import Fullpage from 'fullpage.js';
import './ticker';

jQuery(($) => {
    var carousel;
    // eslint-disable-next-line no-new
    new Fullpage('#frontpage', {
        autoScrolling: true,
        verticalCentered: true,
        scrollOverflow: true,
        scrollOverflowOptions: {
            scrollbars: false,
            freeScroll: true,
        },
        onLeave: function (origin, destination) {
            var originVideo = origin.item.querySelector('.advantage-block__video');
            var originInfo = origin.item.querySelector('.advantage-block__info');
            var destVideo = destination.item.querySelector('.advantage-block__video');
            var destInfo = destination.item.querySelector('.advantage-block__info');
            var color = destination.item.getAttribute('data-color');
            var rotation = destination.item.getAttribute('data-rotation');
            var icon = destination.item.getAttribute('data-icon');

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

            if (destination.index === 3) {
                document.querySelector('.frontpage__advantage-block-circle').classList.remove('frontpage__advantage-block-circle--full-circle');
                document.querySelector('.frontpage__advantage-block-circle').classList.add('frontpage__advantage-block-circle--half-circle');
            } else {
                document.querySelector('.frontpage__advantage-block-circle').classList.remove('frontpage__advantage-block-circle--half-circle');
                document.querySelector('.frontpage__advantage-block-circle').classList.add('frontpage__advantage-block-circle--full-circle');
            }

            if (color) document.querySelector('.frontpage__wrap').style.backgroundColor = color;
            else document.querySelector('.frontpage__wrap').style.backgroundColor = '#03070E';

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

    carousel = new Flickity('.use-cases__carousel-wrap', {
        cellAlign: 'center',
        prevNextButtons: false,
        wrapAround: true,
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

    $(document).on('click', '.faq-item__toggler', function (e) {
        e.preventDefault();
        $(this).toggleClass('faq-item__toggler--expanded');
        $(this).parents('.faq__item').find('.faq-item__content').slideToggle();
    });
});
