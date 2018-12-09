window.$ = window.jQuery = require('jquery');
window.Popper = require('popper.js').default;

import slick from 'slick-carousel';
require('bootstrap/js/dist/util');
require('bootstrap/js/dist/tab');
require('bootstrap/js/dist/modal');

let app = {
    questionSlider: function () {
        let sliderCoworking = $('.js-slider');
        if (sliderCoworking.length) {
            sliderCoworking.slick({
                slidesToShow: 1,
                appendDots: $('.slider-dots'),
                dotsClass: 'dots-items',
                customPaging: function(slider, i) {
                    return '<span class="dot"></span>';
                },
                arrows: false,
                infinite: true,
                dots: true,
                useTransform: false,
            });
        }
    },
    tabs: function () {
        setTaggedTabActive();
    },

    init: function () {
        app.questionSlider();
        app.tabs();
    }
};

document.addEventListener('DOMContentLoaded', function() {
   app.init();
});

let setTaggedTabActive = () => {

    let tabLinks = document.querySelectorAll('.tabs .tabs__link');
    let tabContent = document.querySelectorAll('.tabs .tabs__item');

    for (let elem of tabLinks) {

        elem.addEventListener('click', function (e) {
            e.preventDefault();
            let _this = e.currentTarget;
            let tabId = _this.getAttribute('data-tab');

            for (let i of tabLinks){
                i.classList.remove('active');
            }
            _this.classList.add('active');

            for (let item of tabContent) {
                item.classList.remove('active');
                if( item.getAttribute('id') === tabId){
                    item.classList.add('active')
                }
            }
        })
    }
};


