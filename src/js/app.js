window.$ = window.jQuery = require('jquery');
window.Popper = require('popper.js').default;

import slick from 'slick-carousel';

// import 'bootstrap/js/dist/util';
// import 'bootstrap/js/dist/modal';

let app = {
    questionSlider: function () {
        let sliderImg = $('.js-slider');
        if (sliderImg.length) {
            sliderImg.each(function () {
                let prevArrow = $(this).next().find('.slick-prev');
                let nextArrow = $(this).next().find('.slick-next');

                console.log($(this));
                $(this).slick({
                    slidesToShow: 1,
                    appendDots: $(this).parent().find('.slider-dots'),
                    dotsClass: 'dots-items',
                    customPaging: function(slider, i) {
                        console.log(i);
                        return '<span class="dot"></span>';
                    },
                    arrows: true,
                    appendArrows: $('.slider-arrows'),
                    prevArrow: prevArrow,
                    nextArrow: nextArrow,
                    infinite: true,
                    dots: true,
                    useTransform: false,
                });

            })

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

