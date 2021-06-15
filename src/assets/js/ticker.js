/* eslint-disable no-unused-vars */
import Flickity from 'flickity';

/* var scrollbar = window.innerWidth - $(window).width()
$('.ticker__wrapper--reverse-color .ticker__list:not(.lead__ticker .ticker__list)').width(`100vw`).width(`-=${scrollbar}px`);
 */
const speed = 1;

document.querySelectorAll('.slogan-ticker__ticker:not(.slogan-ticker__ticker--reverse)').forEach((el) => {
    // Initialize the slider
    var mainTicker = new Flickity(el, {
        accessibility: true,
        resize: true,
        wrapAround: true,
        prevNextButtons: false,
        pageDots: false,
        percentPosition: true,
        setGallerySize: true,
        draggable: false,
    });

    // Set initial position to be 0
    mainTicker.x = 0;

    // Start the marquee animation
    play();

    // Main function that 'plays' the marquee.
    function play() {
        // Set the decrement of position x
        mainTicker.x -= speed;

        // Settle position into the slider
        mainTicker.settle(mainTicker.x);

        // Set the requestId to the local variable
        window.requestAnimationFrame(play);
    }
});

document.querySelectorAll('.slogan-ticker__ticker--reverse').forEach((el) => {
    var mainTicker = new Flickity(el, {
        accessibility: true,
        resize: true,
        wrapAround: true,
        prevNextButtons: false,
        pageDots: false,
        percentPosition: true,
        setGallerySize: true,
        rightToLeft: true,
        draggable: false,
    });

    mainTicker.x = 0;

    // Start the marquee animation
    play();

    // Main function that 'plays' the marquee.
    function play() {
        // Set the decrement of position x
        mainTicker.x -= speed;

        // Settle position into the slider
        mainTicker.settle(mainTicker.x);

        // Set the requestId to the local variable
        window.requestAnimationFrame(play);
    }
});
