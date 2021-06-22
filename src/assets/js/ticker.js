import Flickity from 'flickity';

const speed = 1;
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
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

        document.querySelectorAll('.use-cases__clouds-wrap').forEach((el) => {
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
    }, 500);
});
