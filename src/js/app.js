window.$ = window.jQuery = require('jquery');
window.Popper = require('popper.js').default;

import slick from 'slick-carousel';

let app = {
    questionSlider: function () {
        let sliderCoworking = $('.js-slider');
        if (sliderCoworking.length) {
            sliderCoworking.slick({
                slidesToShow: 1,
                arrows: false,
                infinite: true,
                dots: true,
                useTransform: false,
            });
        }
    },

    init: function () {

        app.questionSlider();

    }
};

document.addEventListener('DOMContentLoaded', function() {
   app.init();
});