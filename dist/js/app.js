(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

// import { tns } from "./node_modules/tiny-slider/src/tiny-slider"

var app = {

    // tiny-slider initialisation
    offerSlider: function offerSlider() {
        var wrapSliderApart = document.querySelectorAll('.slider-apart, .slider-coworking-room');
        wrapSliderApart.forEach(function (el) {
            var slider = el.querySelector('.js-slider');
            var controlArrow = el.querySelector('.slider-arrows');

            var slider2 = tns({
                container: slider,
                items: 1,
                slideBy: 'page',
                autoplay: false,
                "mouseDrag": true,
                "swipeAngle": false,
                "speed": 400,
                nav: true,
                controlsContainer: controlArrow,
                navAsThumbnails: true
            });
        });
    },
    sliderInterior: function sliderInterior() {
        var wrapSliderInterior = document.querySelectorAll('.slider-interior');
        wrapSliderInterior.forEach(function (el) {
            var slider = el.querySelector('.js-slider');
            var controlArrow = el.querySelector('.slider-arrows');

            var slider2 = tns({
                container: slider,
                items: 4,
                slideBy: 'page',
                autoplay: false,
                "mouseDrag": true,
                "swipeAngle": false,
                "speed": 400,
                gutter: 30,
                nav: true,
                controlsContainer: controlArrow,
                navAsThumbnails: false
            });
        });
    },

    mobileNav: function mobileNav() {
        var hamburger = document.querySelector('.hamburger');

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

    switchLang: function switchLang() {
        var switchBtn = document.querySelector('.switch-lang');
        switchBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            var $this = e.currentTarget;
            $this.classList.toggle('open');

            document.querySelector('.hamburger').classList.remove('is-active');
            document.querySelector('.header-nav').classList.remove('open');
            document.querySelector('html').classList.remove('no-scroll');
        });
        if (isMobile()) {
            document.querySelector('body').style.cursor = 'pointer';
        }
    },
    tabs: function tabs() {
        setTaggedTabActive();
    },

    formCalculate: function formCalculate() {
        var form = document.querySelector('#booking-wrap');
        if (form) {
            var jobCalculator = function () {
                var periodVal = void 0,
                    placeCount = void 0,
                    fixPlace = void 0,
                    periodCount = void 0;
                updateValues();

                function updateValues() {
                    var periodRadio = document.querySelector('.radio-group input[name="booking-type"]:checked');
                    periodVal = periodRadio.value;
                    placeCount = document.querySelector('.form-control-place__number').innerText;
                    fixPlace = document.querySelector('.checkbox-group .form-control').checked;
                    periodCount = document.querySelector('#select-' + periodRadio.getAttribute('data-name') + ' select').value;
                    calculate();
                }

                document.querySelector('.quantity-up').addEventListener('click', function () {
                    var text = 'мест';
                    var count = increment(document.querySelector('.form-control-place__number').innerText);
                    if (count >= 2) {
                        document.querySelector('.quantity-down').classList.remove('disabled');
                    }
                    if (count >= 40) {
                        document.querySelector('.quantity-up').classList.add('disabled');
                    }

                    document.getElementById('count-place').setAttribute('value', count);

                    document.querySelector('.form-control-place__number').innerText = count;
                    document.querySelector('.form-control-place__text').innerText = text + pluralizeRus(count, ['о', 'а', '']);
                    updateValues();
                });

                document.querySelector('.quantity-down').addEventListener('click', function () {
                    var text = 'мест';
                    var count = decrement(document.querySelector('.form-control-place__number').innerText);
                    if (count == 1) {
                        document.querySelector('.quantity-down').classList.add('disabled');
                    }
                    if (count <= 39) {
                        document.querySelector('.quantity-up').classList.remove('disabled');
                    }
                    document.getElementById('count-place').setAttribute('value', count);
                    document.querySelector('.form-control-place__number').innerText = count;
                    document.querySelector('.form-control-place__text').innerText = text + pluralizeRus(count, ['о', 'а', '']);
                    updateValues();
                });

                function calculate() {
                    var res = periodVal * placeCount * periodCount;
                    if (fixPlace) {
                        res = res + 500 * placeCount;
                    }
                    console.log(res);
                    document.querySelector('#jobs .general-price strong span').innerText = res;
                }

                document.querySelector('#jobs').addEventListener('change', updateValues);
                document.addEventListener('click', function (e) {
                    if (e.target.classList.contains('same-as-selected')) {
                        updateValues();
                    }
                });
            }();

            var negotiationCalculator = function () {
                var periodCount = void 0;

                function updateValues() {
                    periodCount = document.querySelector('#negotiation select').value;
                    calculate();
                }

                updateValues();

                function calculate() {
                    var res = periodCount * 400;

                    document.querySelector('#negotiation .general-price strong span').innerText = res;
                }

                document.querySelector('#negotiation').addEventListener('change', updateValues);
                document.addEventListener('click', function (e) {
                    if (e.target.classList.contains('same-as-selected')) {
                        updateValues();
                    }
                });
            }();

            var cabinetCalculator = function () {
                var periodCount = void 0;

                function updateValues() {
                    periodCount = document.querySelector('#cabinets select').value;
                    calculate();
                }

                updateValues();

                function calculate() {
                    var res = periodCount * 30000;

                    document.querySelector('#cabinets .general-price strong span').innerText = res;
                }

                document.querySelector('#cabinets').addEventListener('change', updateValues);

                document.addEventListener('click', function (e) {
                    if (e.target.classList.contains('same-as-selected')) {
                        updateValues();
                    }
                });
            }();
        }
    },

    customSelect: function customSelect() {
        if (isMobile() === false) {
            var x = void 0,
                i = void 0,
                j = void 0,
                selElmnt = void 0,
                a = void 0,
                b = void 0,
                c = void 0;
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

                var test = document.createElement("div");
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
                        var y = void 0,
                            i = void 0,
                            k = void 0,
                            s = void 0,
                            h = void 0;
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
            var select = document.querySelectorAll('.custom-select select');
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = select[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var el = _step.value;

                    el.parentElement.classList.add('custom-arrow');
                    el.style.display = 'block';
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }

        function closeAllSelect(elmnt) {
            /*a function that will close all select boxes in the document,
            except the current select box:*/
            var x = void 0,
                y = void 0,
                i = void 0,
                arrNo = [];
            x = document.getElementsByClassName("select-items");
            y = document.getElementsByClassName("select-selected");
            for (i = 0; i < y.length; i++) {
                if (elmnt == y[i]) {
                    arrNo.push(i);
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
    modal: function modal() {
        var openModal = document.querySelectorAll('.js-open-modal');
        var closeModal = Array.from(document.querySelectorAll('.js-close-modal'));
        var overlay = '<div class="modal-backdrop fade show js-close-modal"></div>';

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            var _loop = function _loop() {
                var elem = _step2.value;

                if (elem.addEventListener) {
                    elem.addEventListener('click', function (e) {
                        console.log(elem);
                        e.preventDefault();
                        e.stopPropagation();
                        showModal(e);
                    });
                } else if (elem.attachEvent) {
                    elem.attachEvent('onclick', function (e) {
                        e.preventDefault();
                        showModal(e);
                    });
                }
            };

            for (var _iterator2 = openModal[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                _loop();
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = closeModal[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var _elem = _step3.value;

                _elem.addEventListener('click', function (e) {
                    hideModal(e);
                });
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }

        function showModal(e) {
            var targetElem = e.currentTarget;

            var currentId = targetElem.getAttribute('data-target');

            document.body.classList.add('modal-open');
            document.body.insertAdjacentHTML("beforeEnd", overlay);
            document.getElementById(currentId).classList.add('show');

            document.querySelector('.modal.show').addEventListener('click', function (e) {
                if (e.target.classList.contains('modal')) {
                    hideModal(e);
                }
            });
        }

        function hideModal(e) {
            e.preventDefault();
            document.body.classList.remove('modal-open');
            document.querySelector('.modal-backdrop').remove();

            e.target.closest('.modal').classList.remove('show');
        }
    },
    percentSvg: function percentSvg() {
        var svgElement = document.querySelectorAll('.circle-box');
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
            for (var _iterator4 = svgElement[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var el = _step4.value;

                var val = el.getAttribute('data-pct');

                if (isNaN(val)) {
                    val = 100;
                } else {
                    var r = 45;
                    var c = Math.PI * (r * 2);

                    if (val < 0) {
                        val = 0;
                    }
                    if (val > 100) {
                        val = 100;
                    }
                    var pct = (100 - val) / 100 * c;

                    el.querySelector('.circle-color').style.strokeDashoffset = pct;
                }
            }
        } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                    _iterator4.return();
                }
            } finally {
                if (_didIteratorError4) {
                    throw _iteratorError4;
                }
            }
        }
    },

    init: function init() {
        app.offerSlider();
        app.sliderInterior();
        app.tabs();
        // app.switchLang();
        app.customSelect();
        app.modal();
        app.mobileNav();
        app.formCalculate();
        app.percentSvg();
    }
};

document.addEventListener('DOMContentLoaded', function () {
    app.init();

    document.addEventListener('click', function (e) {

        // if (!e.target.closest('.switch-lang')) {
        //     document.querySelector('.switch-lang').classList.remove('open');
        // }

        if (!e.target.closest('.hamburger')) {
            console.log('ssssssss');
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

var setTaggedTabActive = function setTaggedTabActive() {

    var tabLinks = document.querySelectorAll('.tabs .tabs__link');
    var tabContent = document.querySelectorAll('.tabs .tabs__item');

    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
        for (var _iterator5 = tabLinks[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var _elem2 = _step5.value;


            _elem2.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                var _this = e.currentTarget;
                var tabId = _this.getAttribute('data-tab');

                var _iteratorNormalCompletion6 = true;
                var _didIteratorError6 = false;
                var _iteratorError6 = undefined;

                try {
                    for (var _iterator6 = tabLinks[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                        var i = _step6.value;

                        i.classList.remove('active');
                    }
                } catch (err) {
                    _didIteratorError6 = true;
                    _iteratorError6 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion6 && _iterator6.return) {
                            _iterator6.return();
                        }
                    } finally {
                        if (_didIteratorError6) {
                            throw _iteratorError6;
                        }
                    }
                }

                _this.classList.add('active');

                var _iteratorNormalCompletion7 = true;
                var _didIteratorError7 = false;
                var _iteratorError7 = undefined;

                try {
                    for (var _iterator7 = tabContent[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                        var item = _step7.value;

                        item.classList.remove('active');
                        if (item.getAttribute('id') === tabId) {
                            item.classList.add('active');
                        }
                    }
                } catch (err) {
                    _didIteratorError7 = true;
                    _iteratorError7 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion7 && _iterator7.return) {
                            _iterator7.return();
                        }
                    } finally {
                        if (_didIteratorError7) {
                            throw _iteratorError7;
                        }
                    }
                }
            });
        }
    } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion5 && _iterator5.return) {
                _iterator5.return();
            }
        } finally {
            if (_didIteratorError5) {
                throw _iteratorError5;
            }
        }
    }
};

function pluralizeRus(n, forms) {
    return n % 10 == 1 && n % 100 != 11 ? forms[0] : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? forms[1] : forms[2];
}

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

    var thisForm = form;
    var formControl = thisForm.querySelectorAll('.form-control');

    var _iteratorNormalCompletion8 = true;
    var _didIteratorError8 = false;
    var _iteratorError8 = undefined;

    try {
        for (var _iterator8 = formControl[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
            var el = _step8.value;

            if (el.hasAttribute('required')) {
                validFormElement(el);
            }
        }
    } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion8 && _iterator8.return) {
                _iterator8.return();
            }
        } finally {
            if (_didIteratorError8) {
                throw _iteratorError8;
            }
        }
    }
}

function registerRadioEventListener() {
    var btnRadio = document.querySelectorAll('.radio-group .form-control');
    var _iteratorNormalCompletion9 = true;
    var _didIteratorError9 = false;
    var _iteratorError9 = undefined;

    try {
        for (var _iterator9 = btnRadio[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
            var el = _step9.value;

            el.addEventListener('change', function () {
                var name = this.getAttribute('data-name');
                var selectAll = document.querySelectorAll('#jobs .select-period .custom-select');
                var _iteratorNormalCompletion10 = true;
                var _didIteratorError10 = false;
                var _iteratorError10 = undefined;

                try {
                    for (var _iterator10 = selectAll[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                        var _el = _step10.value;

                        _el.style.display = 'none';
                    }
                } catch (err) {
                    _didIteratorError10 = true;
                    _iteratorError10 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion10 && _iterator10.return) {
                            _iterator10.return();
                        }
                    } finally {
                        if (_didIteratorError10) {
                            throw _iteratorError10;
                        }
                    }
                }

                document.getElementById('select-' + name).style.display = 'block';
            });
        }
    } catch (err) {
        _didIteratorError9 = true;
        _iteratorError9 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion9 && _iterator9.return) {
                _iterator9.return();
            }
        } finally {
            if (_didIteratorError9) {
                throw _iteratorError9;
            }
        }
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
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
        return true;
    }
    return false;
}

},{}]},{},[1]);

//# sourceMappingURL=app.js.map
