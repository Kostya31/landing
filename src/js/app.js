// import { tns } from "./node_modules/tiny-slider/src/tiny-slider"

const bsc = require('bootstrap.native/dist/bootstrap-native-v4');

import Pluralize from 'pluralize';


let app = {


    // tiny-slider initialisation
    offerSlider: function () {
        let wrapSliderApart = document.querySelectorAll('.slider-apart, .slider-coworking-room');
        wrapSliderApart.forEach(function (el) {
            let slider = el.querySelector('.js-slider');
            let controlArrow = el.querySelector('.slider-arrows');
            let controlDots = el.querySelector('.slider-dots');



            let slider2 = tns({
                container: slider,
                items: 1,
                slideBy: 'page',
                autoplay: false,
                "mouseDrag": true,
                "swipeAngle": false,
                "speed": 400,
                nav: true,
                controlsContainer: controlArrow,
                navAsThumbnails: false,

            });
            // console.log(slider2.getInfo().navContainer);
            // controlDots.innerHTML = slider2.getInfo().navContainer;

        });
    },
    sliderInterior: function () {
        let wrapSliderInterior = document.querySelectorAll('.slider-interior');
        wrapSliderInterior.forEach(function (el) {
            let slider = el.querySelector('.js-slider');
            let controlArrow = el.querySelector('.slider-arrows');

            let slider2 = tns({
                container: slider,
                items: 4,
                slideBy: 'page',
                autoplay: false,
                "mouseDrag": true,
                "swipeAngle": false,
                "speed": 400,
                gutter: 30,
                nav: false,
                controlsContainer: controlArrow,
                navAsThumbnails: false,
                responsive: {
                    1200: {
                        items: 4
                    },
                    992: {
                        items: 3
                    },
                    768: {
                        items: 3
                    },
                    320: {
                        items: 2
                    }
                }
            });
        });
    },


    mobileNav: function () {
        let hamburger = document.querySelector('.hamburger');

        hamburger.addEventListener('click', function (e) {
            e.preventDefault();
            toggleMenu();
            // document.querySelector('.switch-lang').classList.remove('open');
        });

        function toggleMenu() {
            document.querySelector('.hamburger').classList.toggle('is-active');
            document.querySelector('.header-nav').classList.toggle('open');
            document.querySelector('html').classList.toggle('no-scroll');
        }
    },

    switchLang: function () {
        let switchBtn = document.querySelector('.switch-lang');
        switchBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            let $this = e.currentTarget;
            $this.classList.toggle('open');

            document.querySelector('.hamburger').classList.remove('is-active');
            document.querySelector('.header-nav').classList.remove('open');
            document.querySelector('html').classList.remove('no-scroll');
        });
        if (isMobile()) {
            document.querySelector('body').style.cursor = 'pointer'
        }

    },
    tabs: function () {
        setTaggedTabActive();
    },

    formCalculate: function () {
        let form = document.querySelector('#booking-wrap');
        if (form) {
            let jobCalculator = (function () {
                let periodVal,
                    placeCount,
                    fixPlace,
                    fixPlaceValue,
                    periodCount;
                updateValues();

                function updateValues() {
                    let periodRadio = document.querySelector('.radio-group input[name="booking-type"]:checked');
                    periodVal = periodRadio.value;
                    placeCount = document.querySelector('.form-control-place__number').innerText;
                    fixPlace = document.querySelector('.checkbox-group .form-control').checked;
                    fixPlaceValue = document.querySelector('.checkbox-group .form-control').value;
                    periodCount = document.querySelector('#select-' + periodRadio.getAttribute('data-name') + ' select').value;
                    calculate();
                }


                document.querySelector('.quantity-up').addEventListener('click', function () {
                    let text = 'place';
                    let count = increment(document.querySelector('.form-control-place__number').innerText);
                    if (count >= 2) {
                        document.querySelector('.quantity-down').classList.remove('disabled')
                    }
                    if (count >= 40) {
                        document.querySelector('.quantity-up').classList.add('disabled')
                    }

                    document.getElementById('count-place').setAttribute('value', count);

                    document.querySelector('.form-control-place__number').innerText = count;
                    document.querySelector('.form-control-place__text').innerText = Pluralize(text, count);
                    updateValues();
                });

                document.querySelector('.quantity-down').addEventListener('click', function () {
                    let text = 'place';
                    let count = decrement(document.querySelector('.form-control-place__number').innerText);
                    if (count === 1) {
                        document.querySelector('.quantity-down').classList.add('disabled')
                    }
                    if (count <= 39) {
                        document.querySelector('.quantity-up').classList.remove('disabled')
                    }
                    document.getElementById('count-place').setAttribute('value', count);
                    document.querySelector('.form-control-place__number').innerText = count;
                    document.querySelector('.form-control-place__text').innerText = Pluralize(text, count);
                    updateValues();
                });

                function calculate() {
                    let res = periodVal * placeCount * periodCount;

                    if (fixPlace) {
                        res = res + fixPlaceValue * placeCount;
                    }

                    document.querySelector('#jobs .general-price strong span').innerText = res;
                }

                document.querySelector('#jobs').addEventListener('change', updateValues);
                document.addEventListener('click', function (e) {
                    if (e.target.classList.contains('same-as-selected')) {
                        updateValues();
                    }
                });

            })();

            let negotiationCalculator = (function () {
                let periodCount;

                function updateValues() {
                    periodCount = document.querySelector('#negotiation select').value;
                    calculate();
                }

                updateValues();

                function calculate() {
                    let res = periodCount * 400;

                    document.querySelector('#negotiation .general-price strong span').innerText = res;
                }

                document.querySelector('#negotiation').addEventListener('change', updateValues);
                document.addEventListener('click', function (e) {
                    if (e.target.classList.contains('same-as-selected')) {
                        updateValues();
                    }
                });


            })();

            let cabinetCalculator = (function () {
                let periodCount;

                function updateValues() {
                    periodCount = document.querySelector('#cabinets select').value;
                    calculate();
                }

                updateValues();

                function calculate() {
                    let res = periodCount * 30000;

                    document.querySelector('#cabinets .general-price strong span').innerText = res;
                }

                document.querySelector('#cabinets').addEventListener('change', updateValues);

                document.addEventListener('click', function (e) {
                    if (e.target.classList.contains('same-as-selected')) {
                        updateValues();
                    }
                });
            })();


        }
    },

    customSelect: function () {
        if (isMobile() === false) {
            let x, i, j, selElmnt, a, b, c;
            /*look for any elements with the class "custom-select":*/
            x = document.getElementsByClassName("custom-select");


            for (i = 0; i < x.length; i++) {
                selElmnt = x[i].getElementsByTagName("select")[0];
                /*for each element, create a new DIV that will act as the selected item:*/
                a = document.createElement("div");

                a.setAttribute("class", "select-selected");
                a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
                x[i].appendChild(a);
                /*for each element, create a new DIV that will contain the option list:*/

                let test = document.createElement("div");
                b = document.createElement('ul');
                test.setAttribute("class", "select-items select-hide");

                for (j = 1; j < selElmnt.length; j++) {
                    /*for each option in the original select element,
                    create a new DasIV that will act as an option item:*/

                    c = document.createElement("li");
                    c.innerHTML = selElmnt.options[j].innerHTML;

                    c.addEventListener("click", function (e) {
                        /*when an item is clicked, update the original select box,
                        and the selected item:*/
                        let y, i, k, s, h;
                        s = this.parentNode.parentNode.parentNode.getElementsByTagName("select")[0];
                        h = this.parentNode.parentNode.previousSibling;

                        for (i = 0; i < s.length; i++) {
                            if (s.options[i].innerHTML == this.innerHTML) {
                                s.selectedIndex = i;
                                h.innerHTML = this.innerHTML;
                                y = this.parentNode.parentNode.getElementsByClassName("same-as-selected");
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
                test.appendChild(b);
                x[i].appendChild(test);
                a.addEventListener("click", function (e) {
                    /*when the select box is clicked, close any other select boxes,
                    and open/close the current select box:*/
                    e.stopPropagation();
                    closeAllSelect(this);
                    this.nextSibling.classList.toggle("select-hide");
                    this.classList.toggle("select-arrow-active");
                });
            }
        } else {
            let select = document.querySelectorAll('.custom-select select');
            for (let el of select) {
                el.parentElement.classList.add('custom-arrow');
                el.style.display = 'block';
            }
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

        let btnOpenModal = document.querySelectorAll('.js-open-modal');

        btnOpenModal.forEach( function (el) {
            el.addEventListener('click', function (e) {
                e.preventDefault();
                console.log('sss');
                let id = this.getAttribute('href').replace('#','');
                let myModal = document.getElementById(id);
                let myModalInstance = new bsc.Modal(myModal);
                myModalInstance.show();
            })
        });
    },
    percentSvg: function () {
        let svgElement = document.querySelectorAll('.circle-box');
        for (let el of svgElement) {
            let val = el.getAttribute('data-pct');

            if (isNaN(val)) {
                val = 100;
            } else {
                let r = 45;
                let c = Math.PI * (r * 2);

                if (val < 0) {
                    val = 0;
                }
                if (val > 100) {
                    val = 100;
                }
                let pct = ((100 - val) / 100) * c;

                el.querySelector('.circle-color').style.strokeDashoffset = pct;
            }
        }
    },


    maps: function () {
        let myMap = new ymaps.Map('map', {
            center: [55.76, 37.64],
            controls: ['geolocationControl'],
            zoom: 10
        });
    },

    init: function () {
        app.offerSlider();
        app.sliderInterior();
        app.tabs();
        // app.switchLang();
        app.customSelect();
        app.modal();
        app.mobileNav();
        app.formCalculate();
        app.percentSvg();
        // app.maps();
    }
};

document.addEventListener('DOMContentLoaded', function () {
    app.init();

    document.addEventListener('click', function (e) {

        // if (!e.target.closest('.switch-lang')) {
        //     document.querySelector('.switch-lang').classList.remove('open');
        // }

        if (!e.target.closest('.hamburger')) {
            document.querySelector('.hamburger').classList.remove('is-active');
            document.querySelector('.header-nav').classList.remove('open');
            document.querySelector('html').classList.remove('no-scroll');
        }

        // alert('ccc')
    });


});

// function touchHandler(event) {
//     var touches = event.changedTouches,
//         first = touches[0],
//         type = "";
//
//     switch (event.type) {
//         case "touchstart":
//             type = "mousedown";
//             break;
//         case "touchmove":
//             type = "mousemove";
//             break;
//         case "touchend":
//             type = "click";
//             break;
//         default:
//             return;
//     }
//
//     var simulatedEvent = document.createEvent("MouseEvent");
//     simulatedEvent.initMouseEvent(type, true, true, window, 1,
//         first.screenX, first.screenY,
//         first.clientX, first.clientY, false,
//         false, false, false, 0/*left*/, null);
//
//     first.target.dispatchEvent(simulatedEvent);
//     event.preventDefault();
// }
//
// function fire(e) { alert('hi'); }
// function initTouch()
// {
//     document.addEventListener("click", touchHandler, true);
//     document.addEventListener("touchmove", touchHandler, true);
//     document.addEventListener("touchcancel", touchHandler, true);
// }

let setTaggedTabActive = function () {

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


// function pluralizeRus(n, forms) {
//     return n % 10 == 1 && n % 100 != 11
//         ? forms[0]
//         : (n % 10 >= 2 && n % 10 <= 4
//         && (n % 100 < 10
//             || n % 100 >= 20) ? forms[1] : forms[2]);
// }


function increment(value) {
    value++;
    return value;
}

function decrement(value) {
    value--;
    return value;
}


document.addEventListener('touchmove', function (event) {
    event = event.originalEvent || event;
    if (event.scale !== 1) {
        event.preventDefault();
    }
}, false);


function formValidate(form) {

    let thisForm = form;
    let formControl = thisForm.querySelectorAll('.form-control');


    for (let el of formControl) {
        if (el.hasAttribute('required')) {
            validFormElement(el);
        }
    }
}


function registerRadioEventListener() {
    let btnRadio = document.querySelectorAll('.radio-group .form-control');
    for (let el of btnRadio) {
        el.addEventListener('change', function () {
            let name = this.getAttribute('data-name');
            let selectAll = document.querySelectorAll('#jobs .select-period .custom-select');
            for (let el of selectAll) {
                el.style.display = 'none';
            }
            document.getElementById('select-' + name).style.display = 'block';
        })
    }
}

registerRadioEventListener();


function validFormElement(elem) {
    if (elem.value === "") {
        elem.classList.add('is-invalid');
    } else {
        elem.classList.remove('is-invalid');
    }
};


// document.getElementById('sendForm').addEventListener('click', function () {
//
//     formValidate(document.getElementById('contacts-form'));
//
// });


function isMobile() {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
        return true;
    }
    return false;
}
