import $ from 'jquery';

window.jQuery = $;
window.$ = $;

// require('bootstrap/js/src/util');
// require('bootstrap/js/src/modal');


import slick from 'slick-carousel';


let app = {
    questionSlider: function () {
        let sliderImg = $('.js-slider');
        if (sliderImg.length) {
            sliderImg.each(function () {
                let prevArrow = $(this).next().find('.slick-prev');
                let nextArrow = $(this).next().find('.slick-next');
                $(this).slick({
                    slidesToShow: 1,
                    appendDots: $(this).parent().find('.slider-dots'),
                    dotsClass: 'dots-items',
                    customPaging: function (slider, i) {
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

    mobileNav: function () {
        let hamburger = document.querySelector('.hamburger');

        hamburger.addEventListener('click', toggleButton)

    },

    switchLang: function () {
        let switchBtn = document.querySelector('.switch-lang');
        switchBtn.addEventListener('click', function (e) {
            console.log('ee');
            e.currentTarget.classList.toggle('open');
        })
    },
    tabs: function () {
        setTaggedTabActive();
    },

    modal: function () {
        let openBtn = document.querySelector('.js-open-modal');
        let closeBtn = document.querySelector('.js-close-modal');

        openBtn.addEventListener('click', function (e) {
            e.preventDefault();
            openModal();
        });

        closeBtn.addEventListener('click', function (e) {
            e.preventDefault();
            closeModal(e);
        })
    },

    init: function () {
        app.questionSlider();
        app.tabs();
        app.switchLang();
        // app.modal();
        app.mobileNav();
    }
};

document.addEventListener('DOMContentLoaded', function () {
    app.init();
});

let setTaggedTabActive = () => {

    let tabLinks = document.querySelectorAll('.tabs .tabs__link');
    let tabContent = document.querySelectorAll('.tabs .tabs__item');

    for (let elem of tabLinks) {

        elem.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            let _this = e.currentTarget;
            let tabId = _this.getAttribute('data-tab');

            for (let i of tabLinks) {
                i.classList.remove('active');
            }
            _this.classList.add('active');

            for (let item of tabContent) {
                item.classList.remove('active');
                if (item.getAttribute('id') === tabId) {
                    item.classList.add('active')
                }
            }
        })
    }
};


// function openModal() {
//     document.querySelector('.modal').classList.add('show');
//     document.querySelector('body').classList.add('modal-open');
// }
//
// function closeModal(e) {
//
//     console.log(e);
//     document.querySelector('.modal').classList.remove('show');
//     document.querySelector('body').classList.remove('modal-open');
// }

function toggleButton() {
    document.querySelector('.hamburger').classList.toggle('is-active');
    document.querySelector('.header-nav').classList.toggle('open');
    document.querySelector('html').classList.toggle('no-scroll');
}


