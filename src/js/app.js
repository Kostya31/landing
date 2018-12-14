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

        hamburger.addEventListener('click', toggleButton);

        let navLink = document.querySelectorAll('.header-nav a');

        for (let el of navLink) {
            el.addEventListener('click', function (e) {
                document.querySelector('.hamburger').classList.remove('is-active');
                document.querySelector('.header-nav').classList.remove('open');
                document.querySelector('html').classList.remove('no-scroll');
            })
        }
    },

    switchLang: function () {
        let switchBtn = document.querySelector('.switch-lang');
        switchBtn.addEventListener('click', function (e) {
            let _this = e.currentTarget;
            _this.classList.toggle('open');
        })
    },
    tabs: function () {
        setTaggedTabActive();
    },


    customSelect: function () {

        let x, i, j, selElmnt, a, b, c;
        /*look for any elements with the class "custom-select":*/
        x = document.getElementsByClassName("custom-select");
        for (i = 0; i < x.length; i++) {
            selElmnt = x[i].getElementsByTagName("select")[0];
            /*for each element, create a new DIV that will act as the selected item:*/
            a = document.createElement("DIV");
            a.setAttribute("class", "select-selected");
            a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
            x[i].appendChild(a);
            /*for each element, create a new DIV that will contain the option list:*/
            b = document.createElement("DIV");
            b.setAttribute("class", "select-items select-hide");
            for (j = 1; j < selElmnt.length; j++) {
                /*for each option in the original select element,
                create a new DIV that will act as an option item:*/
                c = document.createElement("DIV");
                c.innerHTML = selElmnt.options[j].innerHTML;
                c.addEventListener("click", function (e) {
                    /*when an item is clicked, update the original select box,
                    and the selected item:*/
                    let y, i, k, s, h;
                    s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                    h = this.parentNode.previousSibling;
                    for (i = 0; i < s.length; i++) {
                        if (s.options[i].innerHTML == this.innerHTML) {
                            s.selectedIndex = i;
                            h.innerHTML = this.innerHTML;
                            y = this.parentNode.getElementsByClassName("same-as-selected");
                            for (k = 0; k < y.length; k++) {
                                y[k].removeAttribute("class");
                            }
                            this.setAttribute("class", "same-as-selected");
                            break;
                        }
                    }
                    h.click();
                });
                b.appendChild(c);
            }
            x[i].appendChild(b);
            a.addEventListener("click", function (e) {
                /*when the select box is clicked, close any other select boxes,
                and open/close the current select box:*/
                e.stopPropagation();
                closeAllSelect(this);
                this.nextSibling.classList.toggle("select-hide");
                this.classList.toggle("select-arrow-active");
            });
        }

        function closeAllSelect(elmnt) {
            /*a function that will close all select boxes in the document,
            except the current select box:*/
            let x, y, i, arrNo = [];
            x = document.getElementsByClassName("select-items");
            y = document.getElementsByClassName("select-selected");
            for (i = 0; i < y.length; i++) {
                if (elmnt == y[i]) {
                    arrNo.push(i)
                } else {
                    y[i].classList.remove("select-arrow-active");
                }
            }
            for (i = 0; i < x.length; i++) {
                if (arrNo.indexOf(i)) {
                    x[i].classList.add("select-hide");
                }
            }
        }

        /*if the user clicks anywhere outside the select box,
        then close all select boxes:*/
        document.addEventListener("click", closeAllSelect);

    },
    modal: function () {
        let openModal = document.querySelectorAll('.js-open-modal');
        let closeModal = document.querySelectorAll('.js-close-modal');
        let overlay = '<div class="modal-backdrop fade show"></div>';



        for (let elem of openModal) {
            if (elem.addEventListener) {
                elem.addEventListener('click', function (e) {
                    showModal(e)
                });
            } else if (elem.attachEvent) {
                console.log('true');
                elem.attachEvent('onclick', function (e) {
                    showModal(e)
                });
            }
        }

        for (let elem of closeModal) {
            elem.addEventListener('click', function (e) {
                hideModal(e)
            });
        }

        function showModal(e) {
            e.preventDefault();
            let targetElem = e.currentTarget;

            let currentId = targetElem.getAttribute('data-target');

            document.body.classList.add('modal-open');
            document.body.insertAdjacentHTML("beforeEnd", overlay);
            document.getElementById(currentId).classList.add('show');

        }

        function hideModal(e) {
            e.preventDefault();
            document.body.classList.remove('modal-open');
            document.querySelector('.modal-backdrop').remove();

            e.target.closest('.modal').classList.remove('show');


        }
    },

    init: function () {
        app.questionSlider();
        app.tabs();
        app.switchLang();
        app.customSelect();
        app.modal();
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


// let num = document.querySelector('.form-control-place__number').innerText = 10;
// console.log('--------',num);

document.querySelector('.quantity-up').addEventListener('click',function () {
    let text = 'мест';
    let count = increment(document.querySelector('.form-control-place__number').innerText);
    if(count >= 2 ) {
        document.querySelector('.quantity-down').classList.remove('disabled')
    }
    if (count >= 40) {
        document.querySelector('.quantity-up').classList.add('disabled')
    }

    document.getElementById('count-place').setAttribute('value', count);

    document.querySelector('.form-control-place__number').innerText = count;
    document.querySelector('.form-control-place__text').innerText = text + pluralizeRus(count, ['о', 'а', '']);
});

document.querySelector('.quantity-down').addEventListener('click',function () {
    let text = 'мест';
    let count = decrement(document.querySelector('.form-control-place__number').innerText);
    if (count == 1 ) {
        document.querySelector('.quantity-down').classList.add('disabled')
    }
    if (count <= 39 ) {
        document.querySelector('.quantity-up').classList.remove('disabled')
    }
    document.getElementById('count-place').setAttribute('value', count);
    document.querySelector('.form-control-place__number').innerText = count;
    document.querySelector('.form-control-place__text').innerText = text + pluralizeRus(count, ['о', 'а', '']);
});


function pluralizeRus(n, forms) {
    return n % 10 == 1 && n % 100 != 11
        ? forms[0]
        : (n % 10 >= 2 && n % 10 <= 4
        && (n % 100 < 10
            || n % 100 >= 20) ? forms[1] : forms[2]);
}

function increment(value){
    value++;
    return value;
}
function decrement(value){
    value--;
    return value;
}


function toggleButton(e) {
    e.preventDefault();
    document.querySelector('.hamburger').classList.toggle('is-active');
    document.querySelector('.header-nav').classList.toggle('open');
    document.querySelector('html').classList.toggle('no-scroll');
}

document.addEventListener('touchmove', function(event) {
    event = event.originalEvent || event;
    if(event.scale > 1) {
        event.preventDefault();
    }
}, false);



let justValidate = false;

function submitForm(){
    console.log('leleka');
}

function formValidate(form){

    let thisForm = form;
    let formControl = thisForm.querySelectorAll('.form-control');




    for (let el of formControl) {
        if (el.hasAttribute('required')){
            validFormElement(el);
        }
    }

}

function validFormElement (elem) {
    console.log(elem);
    if(elem.value === ""){
        elem.classList.add('is-invalid');
    } else {
        elem.classList.remove('is-invalid');
    }
};


document.getElementById('sendForm').addEventListener('click', function () {

   formValidate(document.getElementById('contacts-form'));

});

