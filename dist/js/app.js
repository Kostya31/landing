(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
// Native Javascript for Bootstrap 4 v2.0.26 | © dnp_theme | MIT-License
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD support:
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like:
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    var bsn = factory();
    root.Alert = bsn.Alert;
    root.Button = bsn.Button;
    root.Carousel = bsn.Carousel;
    root.Collapse = bsn.Collapse;
    root.Dropdown = bsn.Dropdown;
    root.Modal = bsn.Modal;
    root.Popover = bsn.Popover;
    root.ScrollSpy = bsn.ScrollSpy;
    root.Tab = bsn.Tab;
    root.Toast = bsn.Toast;
    root.Tooltip = bsn.Tooltip;
  }
}(this, function () {
  
  /* Native Javascript for Bootstrap 4 | Internal Utility Functions
  ----------------------------------------------------------------*/
  "use strict";
  
  // globals
  var globalObject = typeof global !== 'undefined' ? global : this||window,
    DOC = document, HTML = DOC.documentElement, body = 'body', // allow the library to be used in <head>
  
    // Native Javascript for Bootstrap Global Object
    BSN = globalObject.BSN = {},
    supports = BSN.supports = [],
  
    // function toggle attributes
    dataToggle    = 'data-toggle',
    dataDismiss   = 'data-dismiss',
    dataSpy       = 'data-spy',
    dataRide      = 'data-ride',
  
    // components
    stringAlert     = 'Alert',
    stringButton    = 'Button',
    stringCarousel  = 'Carousel',
    stringCollapse  = 'Collapse',
    stringDropdown  = 'Dropdown',
    stringModal     = 'Modal',
    stringPopover   = 'Popover',
    stringScrollSpy = 'ScrollSpy',
    stringTab       = 'Tab',
    stringTooltip   = 'Tooltip',
    stringToast     = 'Toast',
  
    // options DATA API
    dataAutohide      = 'data-autohide',
    databackdrop      = 'data-backdrop',
    dataKeyboard      = 'data-keyboard',
    dataTarget        = 'data-target',
    dataInterval      = 'data-interval',
    dataHeight        = 'data-height',
    dataPause         = 'data-pause',
    dataTitle         = 'data-title',
    dataOriginalTitle = 'data-original-title',
    dataDismissible   = 'data-dismissible',
    dataTrigger       = 'data-trigger',
    dataAnimation     = 'data-animation',
    dataContainer     = 'data-container',
    dataPlacement     = 'data-placement',
    dataDelay         = 'data-delay',
  
    // option keys
    backdrop = 'backdrop', keyboard = 'keyboard', delay = 'delay',
    content = 'content', target = 'target', currentTarget = 'currentTarget',
    interval = 'interval', pause = 'pause', animation = 'animation',
    placement = 'placement', container = 'container',
  
    // box model
    offsetTop    = 'offsetTop',      offsetBottom   = 'offsetBottom',
    offsetLeft   = 'offsetLeft',
    scrollTop    = 'scrollTop',      scrollLeft     = 'scrollLeft',
    clientWidth  = 'clientWidth',    clientHeight   = 'clientHeight',
    offsetWidth  = 'offsetWidth',    offsetHeight   = 'offsetHeight',
    innerWidth   = 'innerWidth',     innerHeight    = 'innerHeight',
    scrollHeight = 'scrollHeight',   height         = 'height',
  
    // aria
    ariaExpanded = 'aria-expanded',
    ariaHidden   = 'aria-hidden',
    ariaSelected = 'aria-selected',
  
    // event names
    clickEvent    = 'click',
    hoverEvent    = 'hover',
    keydownEvent  = 'keydown',
    keyupEvent    = 'keyup',
    resizeEvent   = 'resize',
    scrollEvent   = 'scroll',
    // originalEvents
    showEvent     = 'show',
    shownEvent    = 'shown',
    hideEvent     = 'hide',
    hiddenEvent   = 'hidden',
    closeEvent    = 'close',
    closedEvent   = 'closed',
    slidEvent     = 'slid',
    slideEvent    = 'slide',
    changeEvent   = 'change',
  
    // other
    getAttribute           = 'getAttribute',
    setAttribute           = 'setAttribute',
    hasAttribute           = 'hasAttribute',
    createElement          = 'createElement',
    appendChild            = 'appendChild',
    innerHTML              = 'innerHTML',
    getElementsByTagName   = 'getElementsByTagName',
    preventDefault         = 'preventDefault',
    getBoundingClientRect  = 'getBoundingClientRect',
    querySelectorAll       = 'querySelectorAll',
    getElementsByCLASSNAME = 'getElementsByClassName',
    getComputedStyle       = 'getComputedStyle',  
  
    indexOf      = 'indexOf',
    parentNode   = 'parentNode',
    length       = 'length',
    toLowerCase  = 'toLowerCase',
    Transition   = 'Transition',
    Duration     = 'Duration',
    Webkit       = 'Webkit',
    style        = 'style',
    push         = 'push',
    tabindex     = 'tabindex',
    contains     = 'contains',
  
    active     = 'active',
    showClass  = 'show',
    collapsing = 'collapsing',
    disabled   = 'disabled',
    loading    = 'loading',
    left       = 'left',
    right      = 'right',
    top        = 'top',
    bottom     = 'bottom',
  
    // tooltip / popover
    mouseHover = ('onmouseleave' in DOC) ? [ 'mouseenter', 'mouseleave'] : [ 'mouseover', 'mouseout' ],
    tipPositions = /\b(top|bottom|left|right)+/,
  
    // modal
    modalOverlay = 0,
    fixedTop = 'fixed-top',
    fixedBottom = 'fixed-bottom',
  
    // transitionEnd since 2.0.4
    supportTransitions = Webkit+Transition in HTML[style] || Transition[toLowerCase]() in HTML[style],
    transitionEndEvent = Webkit+Transition in HTML[style] ? Webkit[toLowerCase]()+Transition+'End' : Transition[toLowerCase]()+'end',
    transitionDuration = Webkit+Duration in HTML[style] ? Webkit[toLowerCase]()+Transition+Duration : Transition[toLowerCase]()+Duration,
  
    // touch since 2.0.26
    touchEvents = { start: 'touchstart', end: 'touchend', move:'touchmove' },
  
    // set new focus element since 2.0.3
    setFocus = function(element){
      element.focus ? element.focus() : element.setActive();
    },
  
    // class manipulation, since 2.0.0 requires polyfill.js
    addClass = function(element,classNAME) {
      element.classList.add(classNAME);
    },
    removeClass = function(element,classNAME) {
      element.classList.remove(classNAME);
    },
    hasClass = function(element,classNAME){ // since 2.0.0
      return element.classList[contains](classNAME);
    },
  
    // selection methods
    getElementsByClassName = function(element,classNAME) { // returns Array
      return [].slice.call(element[getElementsByCLASSNAME]( classNAME ));
    },
    queryElement = function (selector, parent) {
      var lookUp = parent ? parent : DOC;
      return typeof selector === 'object' ? selector : lookUp.querySelector(selector);
    },
    getClosest = function (element, selector) { //element is the element and selector is for the closest parent element to find
      // source http://gomakethings.com/climbing-up-and-down-the-dom-tree-with-vanilla-javascript/
      var firstChar = selector.charAt(0), selectorSubstring = selector.substr(1);
      if ( firstChar === '.' ) {// If selector is a class
        for ( ; element && element !== DOC; element = element[parentNode] ) { // Get closest match
          if ( queryElement(selector,element[parentNode]) !== null && hasClass(element,selectorSubstring) ) { return element; }
        }
      } else if ( firstChar === '#' ) { // If selector is an ID
        for ( ; element && element !== DOC; element = element[parentNode] ) { // Get closest match
          if ( element.id === selectorSubstring ) { return element; }
        }
      }
      return false;
    },
  
    // event attach jQuery style / trigger  since 1.2.0
    on = function (element, event, handler) {
      element.addEventListener(event, handler, false);
    },
    off = function(element, event, handler) {
      element.removeEventListener(event, handler, false);
    },
    one = function (element, event, handler) { // one since 2.0.4
      on(element, event, function handlerWrapper(e){
        handler(e);
        off(element, event, handlerWrapper);
      });
    },
    getTransitionDurationFromElement = function(element) {
      var duration = supportTransitions ? globalObject[getComputedStyle](element)[transitionDuration] : 0;
      duration = parseFloat(duration);
      duration = typeof duration === 'number' && !isNaN(duration) ? duration * 1000 : 0;
      return duration; // we take a short offset to make sure we fire on the next frame after animation
    },
    emulateTransitionEnd = function(element,handler){ // emulateTransitionEnd since 2.0.4
      var called = 0, duration = getTransitionDurationFromElement(element);
      duration ? one(element, transitionEndEvent, function(e){ !called && handler(e), called = 1; })
               : setTimeout(function() { !called && handler(), called = 1; }, 17);
    },
    bootstrapCustomEvent = function (eventName, componentName, related) {
      var OriginalCustomEvent = new CustomEvent( eventName + '.bs.' + componentName);
      OriginalCustomEvent.relatedTarget = related;
      this.dispatchEvent(OriginalCustomEvent);
    },
  
    // tooltip / popover stuff
    getScroll = function() { // also Affix and ScrollSpy uses it
      return {
        y : globalObject.pageYOffset || HTML[scrollTop],
        x : globalObject.pageXOffset || HTML[scrollLeft]
      }
    },
    styleTip = function(link,element,position,parent) { // both popovers and tooltips (target,tooltip,placement,elementToAppendTo)
      var elementDimensions = { w : element[offsetWidth], h: element[offsetHeight] },
          windowWidth = (HTML[clientWidth] || DOC[body][clientWidth]),
          windowHeight = (HTML[clientHeight] || DOC[body][clientHeight]),
          rect = link[getBoundingClientRect](),
          scroll = parent === DOC[body] ? getScroll() : { x: parent[offsetLeft] + parent[scrollLeft], y: parent[offsetTop] + parent[scrollTop] },
          linkDimensions = { w: rect[right] - rect[left], h: rect[bottom] - rect[top] },
          isPopover = hasClass(element,'popover'),
          topPosition, leftPosition,
  
          arrow = queryElement('.arrow',element),
          arrowTop, arrowLeft, arrowWidth, arrowHeight,
  
          halfTopExceed = rect[top] + linkDimensions.h/2 - elementDimensions.h/2 < 0,
          halfLeftExceed = rect[left] + linkDimensions.w/2 - elementDimensions.w/2 < 0,
          halfRightExceed = rect[left] + elementDimensions.w/2 + linkDimensions.w/2 >= windowWidth,
          halfBottomExceed = rect[top] + elementDimensions.h/2 + linkDimensions.h/2 >= windowHeight,
          topExceed = rect[top] - elementDimensions.h < 0,
          leftExceed = rect[left] - elementDimensions.w < 0,
          bottomExceed = rect[top] + elementDimensions.h + linkDimensions.h >= windowHeight,
          rightExceed = rect[left] + elementDimensions.w + linkDimensions.w >= windowWidth;
  
      // recompute position
      position = (position === left || position === right) && leftExceed && rightExceed ? top : position; // first, when both left and right limits are exceeded, we fall back to top|bottom
      position = position === top && topExceed ? bottom : position;
      position = position === bottom && bottomExceed ? top : position;
      position = position === left && leftExceed ? right : position;
      position = position === right && rightExceed ? left : position;
  
      // update tooltip/popover class
      element.className[indexOf](position) === -1 && (element.className = element.className.replace(tipPositions,position));
  
      // we check the computed width & height and update here
      arrowWidth = arrow[offsetWidth]; arrowHeight = arrow[offsetHeight];
  
      // apply styling to tooltip or popover
      if ( position === left || position === right ) { // secondary|side positions
        if ( position === left ) { // LEFT
          leftPosition = rect[left] + scroll.x - elementDimensions.w - ( isPopover ? arrowWidth : 0 );
        } else { // RIGHT
          leftPosition = rect[left] + scroll.x + linkDimensions.w;
        }
  
        // adjust top and arrow
        if (halfTopExceed) {
          topPosition = rect[top] + scroll.y;
          arrowTop = linkDimensions.h/2 - arrowWidth;
        } else if (halfBottomExceed) {
          topPosition = rect[top] + scroll.y - elementDimensions.h + linkDimensions.h;
          arrowTop = elementDimensions.h - linkDimensions.h/2 - arrowWidth;
        } else {
          topPosition = rect[top] + scroll.y - elementDimensions.h/2 + linkDimensions.h/2;
          arrowTop = elementDimensions.h/2 - (isPopover ? arrowHeight*0.9 : arrowHeight/2);
        }
      } else if ( position === top || position === bottom ) { // primary|vertical positions
        if ( position === top) { // TOP
          topPosition =  rect[top] + scroll.y - elementDimensions.h - ( isPopover ? arrowHeight : 0 );
        } else { // BOTTOM
          topPosition = rect[top] + scroll.y + linkDimensions.h;
        }
        // adjust left | right and also the arrow
        if (halfLeftExceed) {
          leftPosition = 0;
          arrowLeft = rect[left] + linkDimensions.w/2 - arrowWidth;
        } else if (halfRightExceed) {
          leftPosition = windowWidth - elementDimensions.w*1.01;
          arrowLeft = elementDimensions.w - ( windowWidth - rect[left] ) + linkDimensions.w/2 - arrowWidth/2;
        } else {
          leftPosition = rect[left] + scroll.x - elementDimensions.w/2 + linkDimensions.w/2;
          arrowLeft = elementDimensions.w/2 - arrowWidth/2;
        }
      }
  
      // apply style to tooltip/popover and its arrow
      element[style][top] = topPosition + 'px';
      element[style][left] = leftPosition + 'px';
  
      arrowTop && (arrow[style][top] = arrowTop + 'px');
      arrowLeft && (arrow[style][left] = arrowLeft + 'px');
    };
  
  BSN.version = '2.0.26';
  
  /* Native Javascript for Bootstrap 4 | Alert
  -------------------------------------------*/
  
  // ALERT DEFINITION
  // ================
  var Alert = function( element ) {
    
    // initialization element
    element = queryElement(element);
  
    // bind, target alert, duration and stuff
    var self = this, component = 'alert',
      alert = getClosest(element,'.'+component),
      triggerHandler = function(){ hasClass(alert,'fade') ? emulateTransitionEnd(alert,transitionEndHandler) : transitionEndHandler(); },
      // handlers
      clickHandler = function(e){
        alert = getClosest(e[target],'.'+component);
        element = queryElement('['+dataDismiss+'="'+component+'"]',alert);
        element && alert && (element === e[target] || element[contains](e[target])) && self.close();
      },
      transitionEndHandler = function(){
        bootstrapCustomEvent.call(alert, closedEvent, component);
        off(element, clickEvent, clickHandler); // detach it's listener
        alert[parentNode].removeChild(alert);
      };
    
    // public method
    this.close = function() {
      if ( alert && element && hasClass(alert,showClass) ) {
        bootstrapCustomEvent.call(alert, closeEvent, component);
        removeClass(alert,showClass);
        alert && triggerHandler();
      }
    };
  
    // init
    if ( !(stringAlert in element ) ) { // prevent adding event handlers twice
      on(element, clickEvent, clickHandler);
    }
    element[stringAlert] = self;
  };
  
  // ALERT DATA API
  // ==============
  supports[push]([stringAlert, Alert, '['+dataDismiss+'="alert"]']);
  
  
  /* Native Javascript for Bootstrap 4 | Button
  ---------------------------------------------*/
  
  // BUTTON DEFINITION
  // ===================
  var Button = function( element ) {
  
    // initialization element
    element = queryElement(element);
  
    // constant
    var toggled = false, // toggled makes sure to prevent triggering twice the change.bs.button events
  
        // strings
        component = 'button',
        checked = 'checked',
        reset = 'reset',
        LABEL = 'LABEL',
        INPUT = 'INPUT',
  
      // private methods
      keyHandler = function(e){ 
        var key = e.which || e.keyCode;
        key === 32 && e[target] === DOC.activeElement && toggle(e);
      },
      preventScroll = function(e){ 
        var key = e.which || e.keyCode;
        key === 32 && e[preventDefault]();
      },
      toggle = function(e) {
        var label = e[target].tagName === LABEL ? e[target] : e[target][parentNode].tagName === LABEL ? e[target][parentNode] : null; // the .btn label
        
        if ( !label ) return; //react if a label or its immediate child is clicked
  
        var eventTarget = e[target], // the button itself, the target of the handler function
          labels = getElementsByClassName(eventTarget[parentNode],'btn'), // all the button group buttons
          input = label[getElementsByTagName](INPUT)[0];
  
        if ( !input ) return; //return if no input found
  
        // manage the dom manipulation
        if ( input.type === 'checkbox' ) { //checkboxes
          if ( !input[checked] ) {
            addClass(label,active);
            input[getAttribute](checked);
            input[setAttribute](checked,checked);
            input[checked] = true;
          } else {
            removeClass(label,active);
            input[getAttribute](checked);
            input.removeAttribute(checked);
            input[checked] = false;
          }
  
          if (!toggled) { // prevent triggering the event twice
            toggled = true;
            bootstrapCustomEvent.call(input, changeEvent, component); //trigger the change for the input
            bootstrapCustomEvent.call(element, changeEvent, component); //trigger the change for the btn-group
          }
        }
  
        if ( input.type === 'radio' && !toggled ) { // radio buttons
          if ( !input[checked] ) { // don't trigger if already active
            addClass(label,active);
            input[setAttribute](checked,checked);
            input[checked] = true;
            bootstrapCustomEvent.call(input, changeEvent, component); //trigger the change for the input
            bootstrapCustomEvent.call(element, changeEvent, component); //trigger the change for the btn-group
  
            toggled = true;
            for (var i = 0, ll = labels[length]; i<ll; i++) {
              var otherLabel = labels[i], otherInput = otherLabel[getElementsByTagName](INPUT)[0];
              if ( otherLabel !== label && hasClass(otherLabel,active) )  {
                removeClass(otherLabel,active);
                otherInput.removeAttribute(checked);
                otherInput[checked] = false;
                bootstrapCustomEvent.call(otherInput, changeEvent, component); // trigger the change
              }
            }
          }
        }
        setTimeout( function() { toggled = false; }, 50 );
      };
  
    // init
    if ( !( stringButton in element ) ) { // prevent adding event handlers twice
      on( element, clickEvent, toggle );
      queryElement('['+tabindex+']',element) && on( element, keyupEvent, keyHandler ), 
                                                on( element, keydownEvent, preventScroll );    
    }
  
    // activate items on load
    var labelsToACtivate = getElementsByClassName(element, 'btn'), lbll = labelsToACtivate[length];
    for (var i=0; i<lbll; i++) {
      !hasClass(labelsToACtivate[i],active) && queryElement('input:checked',labelsToACtivate[i]) 
                                            && addClass(labelsToACtivate[i],active);
    }
    element[stringButton] = this;
  };
  
  // BUTTON DATA API
  // =================
  supports[push]( [ stringButton, Button, '['+dataToggle+'="buttons"]' ] );
  
  
  /* Native Javascript for Bootstrap 4 | Carousel
  ----------------------------------------------*/
  
  // CAROUSEL DEFINITION
  // ===================
  var Carousel = function( element, options ) {
  
    // initialization element
    element = queryElement( element );
  
    // set options
    options = options || {};
  
    // DATA API
    var intervalAttribute = element[getAttribute](dataInterval),
        intervalOption = options[interval],
        intervalData = intervalAttribute === 'false' ? 0 : parseInt(intervalAttribute),  
        pauseData = element[getAttribute](dataPause) === hoverEvent || false,
        keyboardData = element[getAttribute](dataKeyboard) === 'true' || false,
      
        // strings
        component = 'carousel',
        paused = 'paused',
        direction = 'direction',
        carouselItem = 'carousel-item',
        dataSlideTo = 'data-slide-to'; 
  
    this[keyboard] = options[keyboard] === true || keyboardData;
    this[pause] = (options[pause] === hoverEvent || pauseData) ? hoverEvent : false; // false / hover
  
    this[interval] = typeof intervalOption === 'number' ? intervalOption
                   : intervalOption === false || intervalData === 0 || intervalData === false ? 0
                   : isNaN(intervalData) ? 5000 // bootstrap carousel default interval
                   : intervalData;
  
    // bind, event targets
    var self = this, index = element.index = 0, timer = element.timer = 0, 
      isSliding = false, // isSliding prevents click event handlers when animation is running
      isTouch = false, startXPosition = null, currentXPosition = null, endXPosition = null, // touch and event coordinates
      slides = getElementsByClassName(element,carouselItem), total = slides[length],
      slideDirection = this[direction] = left,
      leftArrow = getElementsByClassName(element,component+'-control-prev')[0], 
      rightArrow = getElementsByClassName(element,component+'-control-next')[0],
      indicator = queryElement( '.'+component+'-indicators', element ),
      indicators = indicator && indicator[getElementsByTagName]( "LI" ) || [];
  
    // invalidate when not enough items
    if (total < 2) { return; }
  
    // handlers
    var pauseHandler = function () {
        if ( self[interval] !==false && !hasClass(element,paused) ) {
          addClass(element,paused);
          !isSliding && ( clearInterval(timer), timer = null );
        }
      },
      resumeHandler = function() {
        if ( self[interval] !== false && hasClass(element,paused) ) {
          removeClass(element,paused);
          !isSliding && ( clearInterval(timer), timer = null );
          !isSliding && self.cycle();
        }
      },
      indicatorHandler = function(e) {
        e[preventDefault]();
        if (isSliding) return;
  
        var eventTarget = e[target]; // event target | the current active item
  
        if ( eventTarget && !hasClass(eventTarget,active) && eventTarget[getAttribute](dataSlideTo) ) {
          index = parseInt( eventTarget[getAttribute](dataSlideTo), 10 );
        } else { return false; }
  
        self.slideTo( index ); //Do the slide
      },
      controlsHandler = function (e) {
        e[preventDefault]();
        if (isSliding) return;
  
        var eventTarget = e.currentTarget || e.srcElement;
  
        if ( eventTarget === rightArrow ) {
          index++;
        } else if ( eventTarget === leftArrow ) {
          index--;
        }
  
        self.slideTo( index ); //Do the slide
      },
      keyHandler = function (e) {
        if (isSliding) return;
        switch (e.which) {
          case 39:
            index++;
            break;
          case 37:
            index--;
            break;
          default: return;
        }
        self.slideTo( index ); //Do the slide
      },
      // touch events
      toggleTouchEvents = function(toggle){
        toggle( element, touchEvents.move, touchMoveHandler );
        toggle( element, touchEvents.end, touchEndHandler );
      },  
      touchDownHandler = function(e) {
        if ( isTouch ) { return; } 
          
        startXPosition = parseInt(e.touches[0].pageX);
  
        if ( element.contains(e[target]) ) {
          isTouch = true;
          toggleTouchEvents(on);
        }
      },
      touchMoveHandler = function(e) {
        if ( !isTouch ) { e.preventDefault(); return; }
  
        currentXPosition = parseInt(e.touches[0].pageX);
        
        //cancel touch if more than one touches detected
        if ( e.type === 'touchmove' && e.touches[length] > 1 ) {
          e.preventDefault();
          return false;
        }
      },
      touchEndHandler = function(e) {
        if ( !isTouch || isSliding ) { return }
        
        endXPosition = currentXPosition || parseInt( e.touches[0].pageX );
  
        if ( isTouch ) {
          if ( (!element.contains(e[target]) || !element.contains(e.relatedTarget) ) && Math.abs(startXPosition - endXPosition) < 75 ) {
            return false;
          } else {
            if ( currentXPosition < startXPosition ) {
              index++;
            } else if ( currentXPosition > startXPosition ) {
              index--;        
            }
            isTouch = false;
            self.slideTo(index);
          }
          toggleTouchEvents(off);            
        }
      },
  
      // private methods
      isElementInScrollRange = function () {
        var rect = element[getBoundingClientRect](),
          viewportHeight = globalObject[innerHeight] || HTML[clientHeight]
        return rect[top] <= viewportHeight && rect[bottom] >= 0; // bottom && top
      },    
      setActivePage = function( pageIndex ) { //indicators
        for ( var i = 0, icl = indicators[length]; i < icl; i++ ) {
          removeClass(indicators[i],active);
        }
        if (indicators[pageIndex]) addClass(indicators[pageIndex], active);
      };
  
  
    // public methods
    this.cycle = function() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
  
      timer = setInterval(function() {
        isElementInScrollRange() && (index++, self.slideTo( index ) );
      }, this[interval]);
    };
    this.slideTo = function( next ) {
      if (isSliding) return; // when controled via methods, make sure to check again      
      
      var activeItem = this.getActiveIndex(), // the current active
          orientation;
      
      // first return if we're on the same item #227
      if ( activeItem === next ) {
        return;
      // or determine slideDirection
      } else if  ( (activeItem < next ) || (activeItem === 0 && next === total -1 ) ) {
        slideDirection = self[direction] = left; // next
      } else if  ( (activeItem > next) || (activeItem === total - 1 && next === 0 ) ) {
        slideDirection = self[direction] = right; // prev
      }
  
      // find the right next index 
      if ( next < 0 ) { next = total - 1; } 
      else if ( next >= total ){ next = 0; }
  
      // update index
      index = next;
  
      orientation = slideDirection === left ? 'next' : 'prev'; //determine type
      bootstrapCustomEvent.call(element, slideEvent, component, slides[next]); // here we go with the slide
  
      isSliding = true;
      clearInterval(timer);
      timer = null;
      setActivePage( next );
  
      if ( supportTransitions && hasClass(element,'slide') ) {
  
        addClass(slides[next],carouselItem +'-'+ orientation);
        slides[next][offsetWidth];
        addClass(slides[next],carouselItem +'-'+ slideDirection);
        addClass(slides[activeItem],carouselItem +'-'+ slideDirection);
  
        emulateTransitionEnd(slides[next], function(e) {
          var timeout = e && e[target] !== slides[next] ? e.elapsedTime*1000+100 : 20;
          
          isSliding && setTimeout(function(){
            isSliding = false;
  
            addClass(slides[next],active);
            removeClass(slides[activeItem],active);
  
            removeClass(slides[next],carouselItem +'-'+ orientation);
            removeClass(slides[next],carouselItem +'-'+ slideDirection);
            removeClass(slides[activeItem],carouselItem +'-'+ slideDirection);
  
            bootstrapCustomEvent.call(element, slidEvent, component, slides[next]);
  
            if ( !DOC.hidden && self[interval] && !hasClass(element,paused) ) {
              self.cycle();
            }
          }, timeout);
        });
  
      } else {
        addClass(slides[next],active);
        slides[next][offsetWidth];
        removeClass(slides[activeItem],active);
        setTimeout(function() {
          isSliding = false;
          if ( self[interval] && !hasClass(element,paused) ) {
            self.cycle();
          }
          bootstrapCustomEvent.call(element, slidEvent, component, slides[next]);
        }, 100 );
      }
    };
    this.getActiveIndex = function () {
      return slides[indexOf](getElementsByClassName(element,carouselItem+' active')[0]) || 0;
    };
  
    // init
    if ( !(stringCarousel in element ) ) { // prevent adding event handlers twice
  
      if ( self[pause] && self[interval] ) {
        on( element, mouseHover[0], pauseHandler );
        on( element, mouseHover[1], resumeHandler );
        on( element, touchEvents.start, pauseHandler );
        on( element, touchEvents.end, resumeHandler );
    }
    
      slides[length] > 1 && on( element, touchEvents.start, touchDownHandler );
  
      rightArrow && on( rightArrow, clickEvent, controlsHandler );
      leftArrow && on( leftArrow, clickEvent, controlsHandler );
    
      indicator && on( indicator, clickEvent, indicatorHandler );
      self[keyboard] === true && on( globalObject, keydownEvent, keyHandler );
    }
    if (self.getActiveIndex()<0) {
      slides[length] && addClass(slides[0],active);
      indicators[length] && setActivePage(0);
    }
  
    if ( self[interval] ){ self.cycle(); }
    element[stringCarousel] = self;
  };
  
  // CAROUSEL DATA API
  // =================
  supports[push]( [ stringCarousel, Carousel, '['+dataRide+'="carousel"]' ] );
  
  
  /* Native Javascript for Bootstrap 4 | Collapse
  -----------------------------------------------*/
  
  // COLLAPSE DEFINITION
  // ===================
  var Collapse = function( element, options ) {
  
    // initialization element
    element = queryElement(element);
  
    // set options
    options = options || {};
  
    // event targets and constants
    var accordion = null, collapse = null, self = this, 
      accordionData = element[getAttribute]('data-parent'),
      activeCollapse, activeElement,
  
      // component strings
      component = 'collapse',
      collapsed = 'collapsed',
      isAnimating = 'isAnimating',
  
      // private methods
      openAction = function(collapseElement,toggle) {
        bootstrapCustomEvent.call(collapseElement, showEvent, component);
        collapseElement[isAnimating] = true;
        addClass(collapseElement,collapsing);
        removeClass(collapseElement,component);
        collapseElement[style][height] = collapseElement[scrollHeight] + 'px';
        
        emulateTransitionEnd(collapseElement, function() {
          collapseElement[isAnimating] = false;
          collapseElement[setAttribute](ariaExpanded,'true');
          toggle[setAttribute](ariaExpanded,'true');
          removeClass(collapseElement,collapsing);
          addClass(collapseElement, component);
          addClass(collapseElement,showClass);
          collapseElement[style][height] = '';
          bootstrapCustomEvent.call(collapseElement, shownEvent, component);
        });
      },
      closeAction = function(collapseElement,toggle) {
        bootstrapCustomEvent.call(collapseElement, hideEvent, component);
        collapseElement[isAnimating] = true;
        collapseElement[style][height] = collapseElement[scrollHeight] + 'px'; // set height first
        removeClass(collapseElement,component);
        removeClass(collapseElement,showClass);
        addClass(collapseElement,collapsing);
        collapseElement[offsetWidth]; // force reflow to enable transition
        collapseElement[style][height] = '0px';
        
        emulateTransitionEnd(collapseElement, function() {
          collapseElement[isAnimating] = false;
          collapseElement[setAttribute](ariaExpanded,'false');
          toggle[setAttribute](ariaExpanded,'false');
          removeClass(collapseElement,collapsing);
          addClass(collapseElement,component);
          collapseElement[style][height] = '';
          bootstrapCustomEvent.call(collapseElement, hiddenEvent, component);
        });
      },
      getTarget = function() {
        var href = element.href && element[getAttribute]('href'),
          parent = element[getAttribute](dataTarget),
          id = href || ( parent && parent.charAt(0) === '#' ) && parent;
        return id && queryElement(id);
      };
    
    // public methods
    this.toggle = function(e) {
      e[preventDefault]();
      if (!hasClass(collapse,showClass)) { self.show(); } 
      else { self.hide(); }
    };
    this.hide = function() {
      if ( collapse[isAnimating] ) return;    
      closeAction(collapse,element);
      addClass(element,collapsed);
    };
    this.show = function() {
      if ( accordion ) {
        activeCollapse = queryElement('.'+component+'.'+showClass,accordion);
        activeElement = activeCollapse && (queryElement('['+dataTarget+'="#'+activeCollapse.id+'"]',accordion)
                      || queryElement('[href="#'+activeCollapse.id+'"]',accordion) );
      }
  
      if ( !collapse[isAnimating] || activeCollapse && !activeCollapse[isAnimating] ) {
        if ( activeElement && activeCollapse !== collapse ) {
          closeAction(activeCollapse,activeElement); 
          addClass(activeElement,collapsed);
        }
        openAction(collapse,element);
        removeClass(element,collapsed);
      }
    };
  
    // init
    if ( !(stringCollapse in element ) ) { // prevent adding event handlers twice
      on(element, clickEvent, self.toggle);
    }
    collapse = getTarget();
    collapse[isAnimating] = false;  // when true it will prevent click handlers  
    accordion = queryElement(options.parent) || accordionData && getClosest(element, accordionData);
    element[stringCollapse] = self;
  };
  
  // COLLAPSE DATA API
  // =================
  supports[push]( [ stringCollapse, Collapse, '['+dataToggle+'="collapse"]' ] );
  
  
  /* Native Javascript for Bootstrap 4 | Dropdown
  ----------------------------------------------*/
  
  // DROPDOWN DEFINITION
  // ===================
  var Dropdown = function( element, option ) {
      
    // initialization element
    element = queryElement(element);
  
    // set option
    this.persist = option === true || element[getAttribute]('data-persist') === 'true' || false;
  
    // constants, event targets, strings
    var self = this, children = 'children',
      parent = element[parentNode],
      component = 'dropdown', open = 'open',
      relatedTarget = null,
      menu = queryElement('.dropdown-menu', parent),
      menuItems = (function(){
        var set = menu[children], newSet = [];
        for ( var i=0; i<set[length]; i++ ){
          set[i][children][length] && (set[i][children][0].tagName === 'A' && newSet[push](set[i][children][0]));
          set[i].tagName === 'A' && newSet[push](set[i]);
        }
        return newSet;
      })(),
  
      // preventDefault on empty anchor links
      preventEmptyAnchor = function(anchor){
        (anchor.href && anchor.href.slice(-1) === '#' || anchor[parentNode] && anchor[parentNode].href 
          && anchor[parentNode].href.slice(-1) === '#') && this[preventDefault]();    
      },
  
      // toggle dismissible events
      toggleDismiss = function(){
        var type = element[open] ? on : off;
        type(DOC, clickEvent, dismissHandler); 
        type(DOC, keydownEvent, preventScroll);
        type(DOC, keyupEvent, keyHandler);
      },
  
      // handlers
      dismissHandler = function(e) {
        var eventTarget = e[target], hasData = eventTarget && (stringDropdown in eventTarget || stringDropdown in eventTarget[parentNode]);
        if ( (eventTarget === menu || menu[contains](eventTarget)) && (self.persist || hasData) ) { return; }
        else {
          relatedTarget = eventTarget === element || element[contains](eventTarget) ? element : null;
          hide();
        }
        preventEmptyAnchor.call(e,eventTarget);
      },
      clickHandler = function(e) {
        relatedTarget = element;
        show();
        preventEmptyAnchor.call(e,e[target]);
      },
      preventScroll = function(e){
        var key = e.which || e.keyCode;
        if( key === 38 || key === 40 ) { e[preventDefault](); }
      },
      keyHandler = function(e){
        var key = e.which || e.keyCode,
          activeItem = DOC.activeElement,
          idx = menuItems[indexOf](activeItem),
          isSameElement = activeItem === element,
          isInsideMenu = menu[contains](activeItem),
          isMenuItem = activeItem[parentNode] === menu || activeItem[parentNode][parentNode] === menu;          
  
        if ( isMenuItem || isSameElement ) { // navigate up | down
          idx = isSameElement ? 0 
                              : key === 38 ? (idx>1?idx-1:0)
                              : key === 40 ? (idx<menuItems[length]-1?idx+1:idx) : idx;
          menuItems[idx] && setFocus(menuItems[idx]);
        }
        if ( (menuItems[length] && isMenuItem // menu has items
              || !menuItems[length] && (isInsideMenu || isSameElement)  // menu might be a form
              || !isInsideMenu ) // or the focused element is not in the menu at all
              && element[open] && key === 27  // menu must be open
        ) {
          self.toggle();
          relatedTarget = null;
        }
      },
  
      // private methods
      show = function() {
        bootstrapCustomEvent.call(parent, showEvent, component, relatedTarget);
        addClass(menu,showClass);
        addClass(parent,showClass);
        element[setAttribute](ariaExpanded,true);
        bootstrapCustomEvent.call(parent, shownEvent, component, relatedTarget);
        element[open] = true;
        off(element, clickEvent, clickHandler);
        setTimeout(function(){
          setFocus( menu[getElementsByTagName]('INPUT')[0] || element ); // focus the first input item | element
          toggleDismiss();
        },1);
      },
      hide = function() {
        bootstrapCustomEvent.call(parent, hideEvent, component, relatedTarget);
        removeClass(menu,showClass);
        removeClass(parent,showClass);
        element[setAttribute](ariaExpanded,false);
        bootstrapCustomEvent.call(parent, hiddenEvent, component, relatedTarget);
        element[open] = false;
        toggleDismiss();
        setFocus(element);
        setTimeout(function(){ on(element, clickEvent, clickHandler); },1);
      };
  
    // set initial state to closed
    element[open] = false;
  
    // public methods
    this.toggle = function() {
      if (hasClass(parent,showClass) && element[open]) { hide(); } 
      else { show(); }
    };
  
    // init
    if ( !(stringDropdown in element) ) { // prevent adding event handlers twice
      !tabindex in menu && menu[setAttribute](tabindex, '0'); // Fix onblur on Chrome | Safari
      on(element, clickEvent, clickHandler);
    }
  
    element[stringDropdown] = self;
  };
  
  // DROPDOWN DATA API
  // =================
  supports[push]( [stringDropdown, Dropdown, '['+dataToggle+'="dropdown"]'] );
  
  
  /* Native Javascript for Bootstrap 4 | Modal
  -------------------------------------------*/
  
  // MODAL DEFINITION
  // ===============
  var Modal = function(element, options) { // element can be the modal/triggering button
  
    // the modal (both JavaScript / DATA API init) / triggering button element (DATA API)
    element = queryElement(element);
  
      // strings
      var component = 'modal',
        staticString = 'static',
        modalTrigger = 'modalTrigger',
        paddingRight = 'paddingRight',
        modalBackdropString = 'modal-backdrop',
        // determine modal, triggering element
        btnCheck = element[getAttribute](dataTarget)||element[getAttribute]('href'),
        checkModal = queryElement( btnCheck ),
        modal = hasClass(element,component) ? element : checkModal;  
    
      if ( hasClass(element, component) ) { element = null; } // modal is now independent of it's triggering element
  
    if ( !modal ) { return; } // invalidate
  
    // set options
    options = options || {};
  
    this[keyboard] = options[keyboard] === false || modal[getAttribute](dataKeyboard) === 'false' ? false : true;
    this[backdrop] = options[backdrop] === staticString || modal[getAttribute](databackdrop) === staticString ? staticString : true;
    this[backdrop] = options[backdrop] === false || modal[getAttribute](databackdrop) === 'false' ? false : this[backdrop];
    this[content]  = options[content]; // JavaScript only
  
    // bind, constants, event targets and other vars
    var self = this, relatedTarget = null,
      bodyIsOverflowing, scrollBarWidth, overlay, overlayDelay,
  
      // also find fixed-top / fixed-bottom items
      fixedItems = getElementsByClassName(HTML,fixedTop).concat(getElementsByClassName(HTML,fixedBottom)),
  
      // private methods
      getWindowWidth = function() {
        var htmlRect = HTML[getBoundingClientRect]();
        return globalObject[innerWidth] || (htmlRect[right] - Math.abs(htmlRect[left]));
      },
      setScrollbar = function () {
        var bodyStyle = globalObject[getComputedStyle](DOC[body]),
            bodyPad = parseInt((bodyStyle[paddingRight]), 10), itemPad;
        if (bodyIsOverflowing) {
          DOC[body][style][paddingRight] = (bodyPad + scrollBarWidth) + 'px';
          modal[style][paddingRight] = scrollBarWidth+'px';
          if (fixedItems[length]){
            for (var i = 0; i < fixedItems[length]; i++) {
              itemPad = globalObject[getComputedStyle](fixedItems[i])[paddingRight];
              fixedItems[i][style][paddingRight] = ( parseInt(itemPad) + scrollBarWidth) + 'px';
            }
          }
        }
      },
      resetScrollbar = function () {
        DOC[body][style][paddingRight] = '';
        modal[style][paddingRight] = '';
        if (fixedItems[length]){
          for (var i = 0; i < fixedItems[length]; i++) {
            fixedItems[i][style][paddingRight] = '';
          }
        }
      },
      measureScrollbar = function () { // thx walsh
        var scrollDiv = DOC[createElement]('div'), widthValue;
        scrollDiv.className = component+'-scrollbar-measure'; // this is here to stay
        DOC[body][appendChild](scrollDiv);
        widthValue = scrollDiv[offsetWidth] - scrollDiv[clientWidth];
        DOC[body].removeChild(scrollDiv);
        return widthValue;
      },
      checkScrollbar = function () {
        bodyIsOverflowing = DOC[body][clientWidth] < getWindowWidth();
        scrollBarWidth = measureScrollbar();
      },
      createOverlay = function() {
        modalOverlay = 1;        
        
        var newOverlay = DOC[createElement]('div');
        overlay = queryElement('.'+modalBackdropString);
  
        if ( overlay === null ) {
          newOverlay[setAttribute]('class',modalBackdropString+' fade');
          overlay = newOverlay;
          DOC[body][appendChild](overlay);
        }
      },
      removeOverlay = function() {
        overlay = queryElement('.'+modalBackdropString);
        if ( overlay && overlay !== null && typeof overlay === 'object' ) {
          modalOverlay = 0;        
          DOC[body].removeChild(overlay); overlay = null;
        }
        bootstrapCustomEvent.call(modal, hiddenEvent, component);      
      },
      keydownHandlerToggle = function() {
        if (hasClass(modal,showClass)) {
          on(DOC, keydownEvent, keyHandler);
        } else {
          off(DOC, keydownEvent, keyHandler);
        }
      },
      resizeHandlerToggle = function() {
        if (hasClass(modal,showClass)) {
          on(globalObject, resizeEvent, self.update);
        } else {
          off(globalObject, resizeEvent, self.update);
        }
      },
      dismissHandlerToggle = function() {
        if (hasClass(modal,showClass)) {
          on(modal, clickEvent, dismissHandler);
        } else {
          off(modal, clickEvent, dismissHandler);
        }
      },
      // triggers
      triggerShow = function() {
        resizeHandlerToggle();
        dismissHandlerToggle();
        keydownHandlerToggle();
        setFocus(modal);
        bootstrapCustomEvent.call(modal, shownEvent, component, relatedTarget);
      },
      triggerHide = function() {
        modal[style].display = '';
        element && (setFocus(element));
        
        (function(){
          if (!getElementsByClassName(DOC,component+' '+showClass)[0]) {
            resetScrollbar();
            removeClass(DOC[body],component+'-open');
            overlay && hasClass(overlay,'fade') ? (removeClass(overlay,showClass), emulateTransitionEnd(overlay,removeOverlay)) 
            : removeOverlay();
  
            resizeHandlerToggle();
            dismissHandlerToggle();
            keydownHandlerToggle();
          }
        }());
      },
      // handlers
      clickHandler = function(e) {
        var clickTarget = e[target];
        clickTarget = clickTarget[hasAttribute](dataTarget) || clickTarget[hasAttribute]('href') ? clickTarget : clickTarget[parentNode];
        if ( clickTarget === element && !hasClass(modal,showClass) ) {
          modal[modalTrigger] = element;
          relatedTarget = element;
          self.show();
          e[preventDefault]();
        }
      },
      keyHandler = function(e) {
        if (self[keyboard] && e.which == 27 && hasClass(modal,showClass)) {
          self.hide();
        }
      },
      dismissHandler = function(e) {
        var clickTarget = e[target];
        if ( hasClass(modal,showClass) && (clickTarget[parentNode][getAttribute](dataDismiss) === component
            || clickTarget[getAttribute](dataDismiss) === component
            || (clickTarget === modal && self[backdrop] !== staticString) ) ) {
          self.hide(); relatedTarget = null;
          e[preventDefault]();
        }
      };
  
    // public methods
    this.toggle = function() {
      if ( hasClass(modal,showClass) ) {this.hide();} else {this.show();}
    };
    this.show = function() {
      bootstrapCustomEvent.call(modal, showEvent, component, relatedTarget);
  
      // we elegantly hide any opened modal
      var currentOpen = getElementsByClassName(DOC,component+' '+showClass)[0];
      if (currentOpen && currentOpen !== modal) {
        modalTrigger in currentOpen && currentOpen[modalTrigger][stringModal].hide();
        stringModal in currentOpen && currentOpen[stringModal].hide();
      }
  
      if ( this[backdrop] ) {
        !modalOverlay && createOverlay();
      }
  
      if ( overlay && modalOverlay && !hasClass(overlay,showClass)) {
        overlay[offsetWidth]; // force reflow to enable trasition
        overlayDelay = getTransitionDurationFromElement(overlay);              
        addClass(overlay, showClass);
      }
  
      setTimeout( function() {
        modal[style].display = 'block';
  
        checkScrollbar();
        setScrollbar();
  
        addClass(DOC[body],component+'-open');
        addClass(modal,showClass);
        modal[setAttribute](ariaHidden, false);
  
        hasClass(modal,'fade') ? emulateTransitionEnd(modal, triggerShow) : triggerShow();
      }, supportTransitions && overlay ? overlayDelay : 0);
    };
    this.hide = function() {
      bootstrapCustomEvent.call(modal, hideEvent, component);
      overlay = queryElement('.'+modalBackdropString);
      overlayDelay = overlay && getTransitionDurationFromElement(overlay);    
  
      removeClass(modal,showClass);
      modal[setAttribute](ariaHidden, true);
  
      setTimeout(function(){
        hasClass(modal,'fade') ? emulateTransitionEnd(modal, triggerHide) : triggerHide();
      }, supportTransitions && overlay ? overlayDelay : 0);
    };
    this.setContent = function( content ) {
      queryElement('.'+component+'-content',modal)[innerHTML] = content;
    };
    this.update = function() {
      if (hasClass(modal,showClass)) {
        checkScrollbar();
        setScrollbar();
      }
    };
  
    // init
    // prevent adding event handlers over and over
    // modal is independent of a triggering element
    if ( !!element && !(stringModal in element) ) {
      on(element, clickEvent, clickHandler);
    }
    if ( !!self[content] ) { self.setContent( self[content] ); }
    if (element) { element[stringModal] = self; modal[modalTrigger] = element; }
    else { modal[stringModal] = self; }
  };
  
  // DATA API
  supports[push]( [ stringModal, Modal, '['+dataToggle+'="modal"]' ] );
  
  /* Native Javascript for Bootstrap 4 | Popover
  ----------------------------------------------*/
  
  // POPOVER DEFINITION
  // ==================
  var Popover = function( element, options ) {
  
    // initialization element
    element = queryElement(element);
  
    // set options
    options = options || {};
  
    // DATA API
    var triggerData = element[getAttribute](dataTrigger), // click / hover / focus
        animationData = element[getAttribute](dataAnimation), // true / false
        placementData = element[getAttribute](dataPlacement),
        dismissibleData = element[getAttribute](dataDismissible),
        delayData = element[getAttribute](dataDelay),
        containerData = element[getAttribute](dataContainer),
  
        // internal strings
        component = 'popover',
        template = 'template',
        trigger = 'trigger',
        classString = 'class',
        div = 'div',
        fade = 'fade',
        dataContent = 'data-content',
        dismissible = 'dismissible',
        closeBtn = '<button type="button" class="close">×</button>',
  
        // check container
        containerElement = queryElement(options[container]),
        containerDataElement = queryElement(containerData),       
        
        // maybe the element is inside a modal
        modal = getClosest(element,'.modal'),
        
        // maybe the element is inside a fixed navbar
        navbarFixedTop = getClosest(element,'.'+fixedTop),
        navbarFixedBottom = getClosest(element,'.'+fixedBottom);
  
    // set instance options
    this[template] = options[template] ? options[template] : null; // JavaScript only
    this[trigger] = options[trigger] ? options[trigger] : triggerData || hoverEvent;
    this[animation] = options[animation] && options[animation] !== fade ? options[animation] : animationData || fade;
    this[placement] = options[placement] ? options[placement] : placementData || top;
    this[delay] = parseInt(options[delay] || delayData) || 200;
    this[dismissible] = options[dismissible] || dismissibleData === 'true' ? true : false;
    this[container] = containerElement ? containerElement 
                    : containerDataElement ? containerDataElement 
                    : navbarFixedTop ? navbarFixedTop
                    : navbarFixedBottom ? navbarFixedBottom
                    : modal ? modal : DOC[body];
    
    // bind, content
    var self = this, 
      titleString = element[getAttribute](dataTitle) || null,
      contentString = element[getAttribute](dataContent) || null;
  
    if ( !contentString && !this[template] ) return; // invalidate
  
    // constants, vars
    var popover = null, timer = 0, placementSetting = this[placement],
      
      // handlers
      dismissibleHandler = function(e) {
        if (popover !== null && e[target] === queryElement('.close',popover)) {
          self.hide();
        }
      },
  
      // private methods
      removePopover = function() {
        self[container].removeChild(popover);
        timer = null; popover = null; 
      },
      createPopover = function() {
        titleString = options.title || element[getAttribute](dataTitle) || null,
        contentString = options.content || element[getAttribute](dataContent) || null;
  
        popover = DOC[createElement](div);
  
        // popover arrow
        var popoverArrow = DOC[createElement](div);
        popoverArrow[setAttribute](classString,'arrow');
        popover[appendChild](popoverArrow);
  
        if ( contentString !== null && self[template] === null ) { //create the popover from data attributes
  
          popover[setAttribute]('role','tooltip');
  
          if (titleString !== null) {
            var popoverTitle = DOC[createElement]('h3');
            popoverTitle[setAttribute](classString,component+'-header');
  
            popoverTitle[innerHTML] = self[dismissible] ? titleString + closeBtn : titleString;
            popover[appendChild](popoverTitle);
          }
  
          //set popover content
          var popoverContent = DOC[createElement](div);
          popoverContent[setAttribute](classString,component+'-body');
          popoverContent[innerHTML] = self[dismissible] && titleString === null ? contentString + closeBtn : contentString;
          popover[appendChild](popoverContent);
  
        } else {  // or create the popover from template
          var popoverTemplate = DOC[createElement](div);
          popoverTemplate[innerHTML] = self[template];
          popover[innerHTML] = popoverTemplate.firstChild[innerHTML];
        }
  
        //append to the container
        self[container][appendChild](popover);
        popover[style].display = 'block';
        popover[setAttribute](classString, component+ ' bs-' + component+'-'+placementSetting + ' ' + self[animation]);
      },
      showPopover = function () {
        !hasClass(popover,showClass) && ( addClass(popover,showClass) );
      },
      updatePopover = function() {
        styleTip(element,popover,placementSetting,self[container]);
      },
  
      // event toggle
      dismissHandlerToggle = function(type){
        if (clickEvent == self[trigger] || 'focus' == self[trigger]) {
          !self[dismissible] && type( element, 'blur', self.hide );
        }
        self[dismissible] && type( DOC, clickEvent, dismissibleHandler );     
        type( globalObject, resizeEvent, self.hide );
      },
  
      // triggers
      showTrigger = function() {
        dismissHandlerToggle(on);
        bootstrapCustomEvent.call(element, shownEvent, component);
      },
      hideTrigger = function() {
        dismissHandlerToggle(off);
        removePopover();
        bootstrapCustomEvent.call(element, hiddenEvent, component);
      };
  
    // public methods / handlers
    this.toggle = function() {
      if (popover === null) { self.show(); } 
      else { self.hide(); }
    };
    this.show = function() {
      clearTimeout(timer);
      timer = setTimeout( function() {
        if (popover === null) {
          placementSetting = self[placement]; // we reset placement in all cases
          createPopover();
          updatePopover();
          showPopover();
          bootstrapCustomEvent.call(element, showEvent, component);
          !!self[animation] ? emulateTransitionEnd(popover, showTrigger) : showTrigger();
        }
      }, 20 );
    };
    this.hide = function() {
      clearTimeout(timer);
      timer = setTimeout( function() {
        if (popover && popover !== null && hasClass(popover,showClass)) {
          bootstrapCustomEvent.call(element, hideEvent, component);
          removeClass(popover,showClass);
          !!self[animation] ? emulateTransitionEnd(popover, hideTrigger) : hideTrigger();
        }
      }, self[delay] );
    };
  
    // init
    if ( !(stringPopover in element) ) { // prevent adding event handlers twice
      if (self[trigger] === hoverEvent) {
        on( element, mouseHover[0], self.show );
        if (!self[dismissible]) { on( element, mouseHover[1], self.hide ); }
      } else if (clickEvent == self[trigger] || 'focus' == self[trigger]) {
        on( element, self[trigger], self.toggle );
      }
    }
    element[stringPopover] = self;
  };
  
  // POPOVER DATA API
  // ================
  supports[push]( [ stringPopover, Popover, '['+dataToggle+'="popover"]' ] );
  
  
  /* Native Javascript for Bootstrap 4 | ScrollSpy
  -----------------------------------------------*/
  
  // SCROLLSPY DEFINITION
  // ====================
  var ScrollSpy = function(element, options) {
  
    // initialization element, the element we spy on
    element = queryElement(element); 
  
    // DATA API
    var targetData = queryElement(element[getAttribute](dataTarget)),
        offsetData = element[getAttribute]('data-offset');
  
    // set options
    options = options || {};
    if ( !options[target] && !targetData ) { return; } // invalidate
  
    // event targets, constants
    var self = this, spyTarget = options[target] && queryElement(options[target]) || targetData,
        links = spyTarget && spyTarget[getElementsByTagName]('A'),
        offset = parseInt(options['offset'] || offsetData) || 10,      
        items = [], targetItems = [], scrollOffset,
        scrollTarget = element[offsetHeight] < element[scrollHeight] ? element : globalObject, // determine which is the real scrollTarget
        isWindow = scrollTarget === globalObject;  
  
    // populate items and targets
    for (var i=0, il=links[length]; i<il; i++) {
      var href = links[i][getAttribute]('href'), 
          targetItem = href && href.charAt(0) === '#' && href.slice(-1) !== '#' && queryElement(href);
      if ( !!targetItem ) {
        items[push](links[i]);
        targetItems[push](targetItem);
      }
    }
  
    // private methods
    var updateItem = function(index) {
        var item = items[index],
          targetItem = targetItems[index], // the menu item targets this element
          dropdown = item[parentNode][parentNode],
          dropdownLink = hasClass(dropdown,'dropdown') && dropdown[getElementsByTagName]('A')[0],
          targetRect = isWindow && targetItem[getBoundingClientRect](),
  
          isActive = hasClass(item,active) || false,
  
          topEdge = (isWindow ? targetRect[top] + scrollOffset : targetItem[offsetTop]) - offset,
          bottomEdge = isWindow ? targetRect[bottom] + scrollOffset - offset : targetItems[index+1] ? targetItems[index+1][offsetTop] - offset : element[scrollHeight],
  
          inside = scrollOffset >= topEdge && bottomEdge > scrollOffset;
  
        if ( !isActive && inside ) {
          if ( !hasClass(item,active) ) {
            addClass(item,active);
            if (dropdownLink && !hasClass(dropdownLink,active) ) {
              addClass(dropdownLink,active);
            }
            bootstrapCustomEvent.call(element, 'activate', 'scrollspy', items[index]);
          }
        } else if ( !inside ) {
          if ( hasClass(item,active) ) {
            removeClass(item,active);
            if (dropdownLink && hasClass(dropdownLink,active) && !getElementsByClassName(item[parentNode],active).length  ) {
              removeClass(dropdownLink,active);
            }
          }
        } else if ( !inside && !isActive || isActive && inside ) {
          return;
        }
      },
      updateItems = function(){
        scrollOffset = isWindow ? getScroll().y : element[scrollTop];
        for (var index=0, itl=items[length]; index<itl; index++) {
          updateItem(index)
        }
      };
  
    // public method
    this.refresh = function () {
      updateItems();
    }
  
    // init
    if ( !(stringScrollSpy in element) ) { // prevent adding event handlers twice
      on( scrollTarget, scrollEvent, self.refresh );
      on( globalObject, resizeEvent, self.refresh ); 
    }
    self.refresh();
    element[stringScrollSpy] = self;
  };
  
  // SCROLLSPY DATA API
  // ==================
  supports[push]( [ stringScrollSpy, ScrollSpy, '['+dataSpy+'="scroll"]' ] );
  
  
  /* Native Javascript for Bootstrap 4 | Tab
  -----------------------------------------*/
  
  // TAB DEFINITION
  // ==============
  var Tab = function( element, options ) {
  
    // initialization element
    element = queryElement(element);
  
    // DATA API
    var heightData = element[getAttribute](dataHeight),
      
        // strings
        component = 'tab', height = 'height', float = 'float', isAnimating = 'isAnimating';
        
    // set options
    options = options || {};
    this[height] = supportTransitions ? (options[height] || heightData === 'true') : false;
  
    // bind, event targets
    var self = this, next,
      tabs = getClosest(element,'.nav'),
      tabsContentContainer = false,
      dropdown = tabs && queryElement('.dropdown-toggle',tabs),
      activeTab, activeContent, nextContent, containerHeight, equalContents, nextHeight,
      
      // trigger
      triggerEnd = function(){
        tabsContentContainer[style][height] = '';
        removeClass(tabsContentContainer,collapsing);
        tabs[isAnimating] = false;
      },
      triggerShow = function() {
        if (tabsContentContainer) { // height animation
          if ( equalContents ) {
            triggerEnd();
          } else {
            setTimeout(function(){ // enables height animation
              tabsContentContainer[style][height] = nextHeight + 'px'; // height animation
              tabsContentContainer[offsetWidth];
              emulateTransitionEnd(tabsContentContainer, triggerEnd);
            },50);
          }
        } else {
          tabs[isAnimating] = false; 
        }
        bootstrapCustomEvent.call(next, shownEvent, component, activeTab);
      },
      triggerHide = function() {
        if (tabsContentContainer) {
          activeContent[style][float] = left;
          nextContent[style][float] = left;        
          containerHeight = activeContent[scrollHeight];
        }
          
        addClass(nextContent,active);
        bootstrapCustomEvent.call(next, showEvent, component, activeTab);
  
        removeClass(activeContent,active);
        bootstrapCustomEvent.call(activeTab, hiddenEvent, component, next);
        
        if (tabsContentContainer) {
          nextHeight = nextContent[scrollHeight];
          equalContents = nextHeight === containerHeight;
          addClass(tabsContentContainer,collapsing);
          tabsContentContainer[style][height] = containerHeight + 'px'; // height animation
          tabsContentContainer[offsetHeight];
          activeContent[style][float] = '';
          nextContent[style][float] = '';
        }
  
        if ( hasClass(nextContent, 'fade') ) {
          setTimeout(function(){
            addClass(nextContent,showClass);
            emulateTransitionEnd(nextContent,triggerShow);
          },20);
        } else { triggerShow(); }        
      };
  
    if (!tabs) return; // invalidate
  
    // set default animation state
    tabs[isAnimating] = false;    
          
    // private methods
    var getActiveTab = function() {
        var activeTabs = getElementsByClassName(tabs,active), activeTab;
        if ( activeTabs[length] === 1 && !hasClass(activeTabs[0][parentNode],'dropdown') ) {
          activeTab = activeTabs[0];
        } else if ( activeTabs[length] > 1 ) {
          activeTab = activeTabs[activeTabs[length]-1];
        }
        return activeTab;
      },
      getActiveContent = function() {
        return queryElement(getActiveTab()[getAttribute]('href'));
      },
      // handler 
      clickHandler = function(e) {
        e[preventDefault]();
        next = e[currentTarget];
        !tabs[isAnimating] && !hasClass(next,active) && self.show();
      };
  
    // public method
    this.show = function() { // the tab we clicked is now the next tab
      next = next || element;
      nextContent = queryElement(next[getAttribute]('href')); //this is the actual object, the next tab content to activate
      activeTab = getActiveTab(); 
      activeContent = getActiveContent();
      
      tabs[isAnimating] = true;
      removeClass(activeTab,active);
      activeTab[setAttribute](ariaSelected,'false');
      addClass(next,active);
      next[setAttribute](ariaSelected,'true');    
  
      if ( dropdown ) {
        if ( !hasClass(element[parentNode],'dropdown-menu') ) {
          if (hasClass(dropdown,active)) removeClass(dropdown,active);
        } else {
          if (!hasClass(dropdown,active)) addClass(dropdown,active);
        }
      }
      
      bootstrapCustomEvent.call(activeTab, hideEvent, component, next);
  
      if (hasClass(activeContent, 'fade')) {
        removeClass(activeContent,showClass);
        emulateTransitionEnd(activeContent, triggerHide);
      } else { triggerHide(); }
    };
  
    // init
    if ( !(stringTab in element) ) { // prevent adding event handlers twice
      on(element, clickEvent, clickHandler);
    }
    if (self[height]) { tabsContentContainer = getActiveContent()[parentNode]; }
    element[stringTab] = self;
  };
  
  // TAB DATA API
  // ============
  supports[push]( [ stringTab, Tab, '['+dataToggle+'="tab"]' ] );
  
  
  /* Native Javascript for Bootstrap 4 | Toast
  ---------------------------------------------*/
  
  // TOAST DEFINITION
  // ==================
  var Toast = function( element,options ) {
  
    // initialization element
    element = queryElement(element);
  
    // set options
    options = options || {};
  
    // DATA API
    var animationData = element[getAttribute](dataAnimation),
        autohideData = element[getAttribute](dataAutohide),
        delayData = element[getAttribute](dataDelay),
        
        // strings
        component = 'toast',
        autohide = 'autohide',
        animation = 'animation',
        showing = 'showing',
        hide = 'hide',
        fade = 'fade';
  
    // set instance options
    this[animation] = options[animation] === false || animationData === 'false' ? 0 : 1; // true by default
    this[autohide] = options[autohide] === false || autohideData === 'false' ? 0 : 1; // true by default
    this[delay] = parseInt(options[delay] || delayData) || 500; // 500ms default
  
    // bind,toast and timer
    var self = this, timer = 0,
        // get the toast element
        toast = getClosest(element,'.toast');
  
    // private methods
    // animation complete
    var showComplete = function() {
        removeClass( toast, showing );
        addClass( toast, showClass );
        bootstrapCustomEvent.call(toast, shownEvent, component);
        if (self[autohide]) { self.hide(); }
      },
      hideComplete = function() {
        addClass( toast, hide );
        bootstrapCustomEvent.call(toast, hiddenEvent, component);
      },
      close = function() {
        removeClass( toast,showClass );
        self[animation] ? emulateTransitionEnd(toast, hideComplete) : hideComplete();
      },
      disposeComplete = function(){
        clearTimeout(timer); timer = null;
        addClass( toast, hide );
        off(element, clickEvent, self.hide);
        element[stringToast] = null;
        element = null;
        toast = null;
      };
  
    // public methods
    this.show = function() {
      if (toast) {
        bootstrapCustomEvent.call(toast, showEvent, component);
        self[animation] && addClass( toast,fade );
        removeClass( toast,hide );
        addClass( toast,showing );
  
        self[animation] ? emulateTransitionEnd(toast, showComplete) : showComplete();
      }
    };
    this.hide = function(noTimer) {
      if (toast && hasClass(toast,showClass)) {
        bootstrapCustomEvent.call(toast, hideEvent, component);
  
        if (noTimer) {
          close();
        } else {
          timer = setTimeout( close, self[delay]);
        }
      }
    };
    this.dispose = function() {
      if ( toast && hasClass(toast,showClass) ) {
        removeClass( toast,showClass );
        self[animation] ? emulateTransitionEnd(toast, disposeComplete) : disposeComplete();
      }
    };
  
    // init
    if ( !(stringToast in element) ) { // prevent adding event handlers twice
      on(element, clickEvent, self.hide);
    }
    element[stringToast] = self;
  };
  
  // TOAST DATA API
  // =================
  supports[push]( [ stringToast, Toast, '['+dataDismiss+'="toast"]' ] );
  
  
  /* Native Javascript for Bootstrap 4 | Tooltip
  ---------------------------------------------*/
  
  // TOOLTIP DEFINITION
  // ==================
  var Tooltip = function( element,options ) {
  
    // initialization element
    element = queryElement(element);
  
    // set options
    options = options || {};
  
    // DATA API
    var animationData = element[getAttribute](dataAnimation),
        placementData = element[getAttribute](dataPlacement),
        delayData = element[getAttribute](dataDelay),
        containerData = element[getAttribute](dataContainer),
        
        // strings
        component = 'tooltip',
        classString = 'class',
        title = 'title',
        fade = 'fade',
        div = 'div',
  
        // check container
        containerElement = queryElement(options[container]),
        containerDataElement = queryElement(containerData),      
  
        // maybe the element is inside a modal
        modal = getClosest(element,'.modal'),
        
        // maybe the element is inside a fixed navbar
        navbarFixedTop = getClosest(element,'.'+fixedTop),
        navbarFixedBottom = getClosest(element,'.'+fixedBottom);
  
    // set instance options
    this[animation] = options[animation] && options[animation] !== fade ? options[animation] : animationData || fade;
    this[placement] = options[placement] ? options[placement] : placementData || top;
    this[delay] = parseInt(options[delay] || delayData) || 200;
    this[container] = containerElement ? containerElement 
                    : containerDataElement ? containerDataElement
                    : navbarFixedTop ? navbarFixedTop
                    : navbarFixedBottom ? navbarFixedBottom
                    : modal ? modal : DOC[body];
  
    // bind, event targets, title and constants
    var self = this, timer = 0, placementSetting = this[placement], tooltip = null,
      titleString = element[getAttribute](title) || element[getAttribute](dataTitle) || element[getAttribute](dataOriginalTitle);
  
    if ( !titleString || titleString == "" ) return; // invalidate
  
    // private methods
    var removeToolTip = function() {
        self[container].removeChild(tooltip);
        tooltip = null; timer = null;
      },
      createToolTip = function() {
        titleString = element[getAttribute](title) || element[getAttribute](dataTitle) || element[getAttribute](dataOriginalTitle); // read the title again
        if ( !titleString || titleString == "" ) return false; // invalidate
        tooltip = DOC[createElement](div);
        tooltip[setAttribute]('role',component);
  
        // tooltip arrow
        var tooltipArrow = DOC[createElement](div);
        tooltipArrow[setAttribute](classString,'arrow');
        tooltip[appendChild](tooltipArrow);
    
        var tooltipInner = DOC[createElement](div);
        tooltipInner[setAttribute](classString,component+'-inner');
        tooltip[appendChild](tooltipInner);
        tooltipInner[innerHTML] = titleString;
  
        self[container][appendChild](tooltip);
        tooltip[setAttribute](classString, component + ' bs-' + component+'-'+placementSetting + ' ' + self[animation]);
      },
      updateTooltip = function () {
        styleTip(element,tooltip,placementSetting,self[container]);
      },
      showTooltip = function () {
        !hasClass(tooltip,showClass) && ( addClass(tooltip,showClass) );
      },
      // triggers
      showTrigger = function() {
        on( globalObject, resizeEvent, self.hide );
        bootstrapCustomEvent.call(element, shownEvent, component);
      },
      hideTrigger = function() {
        off( globalObject, resizeEvent, self.hide );
        removeToolTip();
        bootstrapCustomEvent.call(element, hiddenEvent, component);
      };
  
    // public methods
    this.show = function() {
      clearTimeout(timer);
      timer = setTimeout( function() {
        if (tooltip === null) {
          placementSetting = self[placement]; // we reset placement in all cases
          if(createToolTip() == false) return;
          updateTooltip();
          showTooltip();
          bootstrapCustomEvent.call(element, showEvent, component);
          !!self[animation] ? emulateTransitionEnd(tooltip, showTrigger) : showTrigger();
        }
      }, 20 );
    };
    this.hide = function() {
      clearTimeout(timer);
      timer = setTimeout( function() {
        if (tooltip && hasClass(tooltip,showClass)) {
          bootstrapCustomEvent.call(element, hideEvent, component);
          removeClass(tooltip,showClass);
          !!self[animation] ? emulateTransitionEnd(tooltip, hideTrigger) : hideTrigger();
        }
      }, self[delay]);
    };
    this.toggle = function() {
      if (!tooltip) { self.show(); } 
      else { self.hide(); }
    };
  
    // init
    if ( !(stringTooltip in element) ) { // prevent adding event handlers twice
      element[setAttribute](dataOriginalTitle,titleString);
      element.removeAttribute(title);
      on(element, mouseHover[0], self.show);
      on(element, mouseHover[1], self.hide);
    }
    element[stringTooltip] = self;
  };
  
  // TOOLTIP DATA API
  // =================
  supports[push]( [ stringTooltip, Tooltip, '['+dataToggle+'="tooltip"]' ] );
  
  
  
  /* Native Javascript for Bootstrap | Initialize Data API
  --------------------------------------------------------*/
  var initializeDataAPI = function( constructor, collection ){
      for (var i=0, l=collection[length]; i<l; i++) {
        new constructor(collection[i]);
      }
    },
    initCallback = BSN.initCallback = function(lookUp){
      lookUp = lookUp || DOC;
      for (var i=0, l=supports[length]; i<l; i++) {
        initializeDataAPI( supports[i][1], lookUp[querySelectorAll] (supports[i][2]) );
      }
    };
  
  // bulk initialize all components
  DOC[body] ? initCallback() : on( DOC, 'DOMContentLoaded', function(){ initCallback(); } );
  
  return {
    Alert: Alert,
    Button: Button,
    Carousel: Carousel,
    Collapse: Collapse,
    Dropdown: Dropdown,
    Modal: Modal,
    Popover: Popover,
    ScrollSpy: ScrollSpy,
    Tab: Tab,
    Toast: Toast,
    Tooltip: Tooltip
  };
}));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
/* global define */

(function (root, pluralize) {
  /* istanbul ignore else */
  if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
    // Node.
    module.exports = pluralize();
  } else if (typeof define === 'function' && define.amd) {
    // AMD, registers as an anonymous module.
    define(function () {
      return pluralize();
    });
  } else {
    // Browser global.
    root.pluralize = pluralize();
  }
})(this, function () {
  // Rule storage - pluralize and singularize need to be run sequentially,
  // while other rules can be optimized using an object for instant lookups.
  var pluralRules = [];
  var singularRules = [];
  var uncountables = {};
  var irregularPlurals = {};
  var irregularSingles = {};

  /**
   * Sanitize a pluralization rule to a usable regular expression.
   *
   * @param  {(RegExp|string)} rule
   * @return {RegExp}
   */
  function sanitizeRule (rule) {
    if (typeof rule === 'string') {
      return new RegExp('^' + rule + '$', 'i');
    }

    return rule;
  }

  /**
   * Pass in a word token to produce a function that can replicate the case on
   * another word.
   *
   * @param  {string}   word
   * @param  {string}   token
   * @return {Function}
   */
  function restoreCase (word, token) {
    // Tokens are an exact match.
    if (word === token) return token;

    // Lower cased words. E.g. "hello".
    if (word === word.toLowerCase()) return token.toLowerCase();

    // Upper cased words. E.g. "WHISKY".
    if (word === word.toUpperCase()) return token.toUpperCase();

    // Title cased words. E.g. "Title".
    if (word[0] === word[0].toUpperCase()) {
      return token.charAt(0).toUpperCase() + token.substr(1).toLowerCase();
    }

    // Lower cased words. E.g. "test".
    return token.toLowerCase();
  }

  /**
   * Interpolate a regexp string.
   *
   * @param  {string} str
   * @param  {Array}  args
   * @return {string}
   */
  function interpolate (str, args) {
    return str.replace(/\$(\d{1,2})/g, function (match, index) {
      return args[index] || '';
    });
  }

  /**
   * Replace a word using a rule.
   *
   * @param  {string} word
   * @param  {Array}  rule
   * @return {string}
   */
  function replace (word, rule) {
    return word.replace(rule[0], function (match, index) {
      var result = interpolate(rule[1], arguments);

      if (match === '') {
        return restoreCase(word[index - 1], result);
      }

      return restoreCase(match, result);
    });
  }

  /**
   * Sanitize a word by passing in the word and sanitization rules.
   *
   * @param  {string}   token
   * @param  {string}   word
   * @param  {Array}    rules
   * @return {string}
   */
  function sanitizeWord (token, word, rules) {
    // Empty string or doesn't need fixing.
    if (!token.length || uncountables.hasOwnProperty(token)) {
      return word;
    }

    var len = rules.length;

    // Iterate over the sanitization rules and use the first one to match.
    while (len--) {
      var rule = rules[len];

      if (rule[0].test(word)) return replace(word, rule);
    }

    return word;
  }

  /**
   * Replace a word with the updated word.
   *
   * @param  {Object}   replaceMap
   * @param  {Object}   keepMap
   * @param  {Array}    rules
   * @return {Function}
   */
  function replaceWord (replaceMap, keepMap, rules) {
    return function (word) {
      // Get the correct token and case restoration functions.
      var token = word.toLowerCase();

      // Check against the keep object map.
      if (keepMap.hasOwnProperty(token)) {
        return restoreCase(word, token);
      }

      // Check against the replacement map for a direct word replacement.
      if (replaceMap.hasOwnProperty(token)) {
        return restoreCase(word, replaceMap[token]);
      }

      // Run all the rules against the word.
      return sanitizeWord(token, word, rules);
    };
  }

  /**
   * Check if a word is part of the map.
   */
  function checkWord (replaceMap, keepMap, rules, bool) {
    return function (word) {
      var token = word.toLowerCase();

      if (keepMap.hasOwnProperty(token)) return true;
      if (replaceMap.hasOwnProperty(token)) return false;

      return sanitizeWord(token, token, rules) === token;
    };
  }

  /**
   * Pluralize or singularize a word based on the passed in count.
   *
   * @param  {string}  word      The word to pluralize
   * @param  {number}  count     How many of the word exist
   * @param  {boolean} inclusive Whether to prefix with the number (e.g. 3 ducks)
   * @return {string}
   */
  function pluralize (word, count, inclusive) {
    var pluralized = count === 1
      ? pluralize.singular(word) : pluralize.plural(word);

    return (inclusive ? count + ' ' : '') + pluralized;
  }

  /**
   * Pluralize a word.
   *
   * @type {Function}
   */
  pluralize.plural = replaceWord(
    irregularSingles, irregularPlurals, pluralRules
  );

  /**
   * Check if a word is plural.
   *
   * @type {Function}
   */
  pluralize.isPlural = checkWord(
    irregularSingles, irregularPlurals, pluralRules
  );

  /**
   * Singularize a word.
   *
   * @type {Function}
   */
  pluralize.singular = replaceWord(
    irregularPlurals, irregularSingles, singularRules
  );

  /**
   * Check if a word is singular.
   *
   * @type {Function}
   */
  pluralize.isSingular = checkWord(
    irregularPlurals, irregularSingles, singularRules
  );

  /**
   * Add a pluralization rule to the collection.
   *
   * @param {(string|RegExp)} rule
   * @param {string}          replacement
   */
  pluralize.addPluralRule = function (rule, replacement) {
    pluralRules.push([sanitizeRule(rule), replacement]);
  };

  /**
   * Add a singularization rule to the collection.
   *
   * @param {(string|RegExp)} rule
   * @param {string}          replacement
   */
  pluralize.addSingularRule = function (rule, replacement) {
    singularRules.push([sanitizeRule(rule), replacement]);
  };

  /**
   * Add an uncountable word rule.
   *
   * @param {(string|RegExp)} word
   */
  pluralize.addUncountableRule = function (word) {
    if (typeof word === 'string') {
      uncountables[word.toLowerCase()] = true;
      return;
    }

    // Set singular and plural references for the word.
    pluralize.addPluralRule(word, '$0');
    pluralize.addSingularRule(word, '$0');
  };

  /**
   * Add an irregular word definition.
   *
   * @param {string} single
   * @param {string} plural
   */
  pluralize.addIrregularRule = function (single, plural) {
    plural = plural.toLowerCase();
    single = single.toLowerCase();

    irregularSingles[single] = plural;
    irregularPlurals[plural] = single;
  };

  /**
   * Irregular rules.
   */
  [
    // Pronouns.
    ['I', 'we'],
    ['me', 'us'],
    ['he', 'they'],
    ['she', 'they'],
    ['them', 'them'],
    ['myself', 'ourselves'],
    ['yourself', 'yourselves'],
    ['itself', 'themselves'],
    ['herself', 'themselves'],
    ['himself', 'themselves'],
    ['themself', 'themselves'],
    ['is', 'are'],
    ['was', 'were'],
    ['has', 'have'],
    ['this', 'these'],
    ['that', 'those'],
    // Words ending in with a consonant and `o`.
    ['echo', 'echoes'],
    ['dingo', 'dingoes'],
    ['volcano', 'volcanoes'],
    ['tornado', 'tornadoes'],
    ['torpedo', 'torpedoes'],
    // Ends with `us`.
    ['genus', 'genera'],
    ['viscus', 'viscera'],
    // Ends with `ma`.
    ['stigma', 'stigmata'],
    ['stoma', 'stomata'],
    ['dogma', 'dogmata'],
    ['lemma', 'lemmata'],
    ['schema', 'schemata'],
    ['anathema', 'anathemata'],
    // Other irregular rules.
    ['ox', 'oxen'],
    ['axe', 'axes'],
    ['die', 'dice'],
    ['yes', 'yeses'],
    ['foot', 'feet'],
    ['eave', 'eaves'],
    ['goose', 'geese'],
    ['tooth', 'teeth'],
    ['quiz', 'quizzes'],
    ['human', 'humans'],
    ['proof', 'proofs'],
    ['carve', 'carves'],
    ['valve', 'valves'],
    ['looey', 'looies'],
    ['thief', 'thieves'],
    ['groove', 'grooves'],
    ['pickaxe', 'pickaxes'],
    ['passerby', 'passersby']
  ].forEach(function (rule) {
    return pluralize.addIrregularRule(rule[0], rule[1]);
  });

  /**
   * Pluralization rules.
   */
  [
    [/s?$/i, 's'],
    [/[^\u0000-\u007F]$/i, '$0'],
    [/([^aeiou]ese)$/i, '$1'],
    [/(ax|test)is$/i, '$1es'],
    [/(alias|[^aou]us|t[lm]as|gas|ris)$/i, '$1es'],
    [/(e[mn]u)s?$/i, '$1s'],
    [/([^l]ias|[aeiou]las|[ejzr]as|[iu]am)$/i, '$1'],
    [/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, '$1i'],
    [/(alumn|alg|vertebr)(?:a|ae)$/i, '$1ae'],
    [/(seraph|cherub)(?:im)?$/i, '$1im'],
    [/(her|at|gr)o$/i, '$1oes'],
    [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/i, '$1a'],
    [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)(?:a|on)$/i, '$1a'],
    [/sis$/i, 'ses'],
    [/(?:(kni|wi|li)fe|(ar|l|ea|eo|oa|hoo)f)$/i, '$1$2ves'],
    [/([^aeiouy]|qu)y$/i, '$1ies'],
    [/([^ch][ieo][ln])ey$/i, '$1ies'],
    [/(x|ch|ss|sh|zz)$/i, '$1es'],
    [/(matr|cod|mur|sil|vert|ind|append)(?:ix|ex)$/i, '$1ices'],
    [/\b((?:tit)?m|l)(?:ice|ouse)$/i, '$1ice'],
    [/(pe)(?:rson|ople)$/i, '$1ople'],
    [/(child)(?:ren)?$/i, '$1ren'],
    [/eaux$/i, '$0'],
    [/m[ae]n$/i, 'men'],
    ['thou', 'you']
  ].forEach(function (rule) {
    return pluralize.addPluralRule(rule[0], rule[1]);
  });

  /**
   * Singularization rules.
   */
  [
    [/s$/i, ''],
    [/(ss)$/i, '$1'],
    [/(wi|kni|(?:after|half|high|low|mid|non|night|[^\w]|^)li)ves$/i, '$1fe'],
    [/(ar|(?:wo|[ae])l|[eo][ao])ves$/i, '$1f'],
    [/ies$/i, 'y'],
    [/\b([pl]|zomb|(?:neck|cross)?t|coll|faer|food|gen|goon|group|lass|talk|goal|cut)ies$/i, '$1ie'],
    [/\b(mon|smil)ies$/i, '$1ey'],
    [/\b((?:tit)?m|l)ice$/i, '$1ouse'],
    [/(seraph|cherub)im$/i, '$1'],
    [/(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|t[lm]as|gas|(?:her|at|gr)o|[aeiou]ris)(?:es)?$/i, '$1'],
    [/(analy|diagno|parenthe|progno|synop|the|empha|cri|ne)(?:sis|ses)$/i, '$1sis'],
    [/(movie|twelve|abuse|e[mn]u)s$/i, '$1'],
    [/(test)(?:is|es)$/i, '$1is'],
    [/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, '$1us'],
    [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|quor)a$/i, '$1um'],
    [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)a$/i, '$1on'],
    [/(alumn|alg|vertebr)ae$/i, '$1a'],
    [/(cod|mur|sil|vert|ind)ices$/i, '$1ex'],
    [/(matr|append)ices$/i, '$1ix'],
    [/(pe)(rson|ople)$/i, '$1rson'],
    [/(child)ren$/i, '$1'],
    [/(eau)x?$/i, '$1'],
    [/men$/i, 'man']
  ].forEach(function (rule) {
    return pluralize.addSingularRule(rule[0], rule[1]);
  });

  /**
   * Uncountable rules.
   */
  [
    // Singular words with no plurals.
    'adulthood',
    'advice',
    'agenda',
    'aid',
    'aircraft',
    'alcohol',
    'ammo',
    'analytics',
    'anime',
    'athletics',
    'audio',
    'bison',
    'blood',
    'bream',
    'buffalo',
    'butter',
    'carp',
    'cash',
    'chassis',
    'chess',
    'clothing',
    'cod',
    'commerce',
    'cooperation',
    'corps',
    'debris',
    'diabetes',
    'digestion',
    'elk',
    'energy',
    'equipment',
    'excretion',
    'expertise',
    'firmware',
    'flounder',
    'fun',
    'gallows',
    'garbage',
    'graffiti',
    'hardware',
    'headquarters',
    'health',
    'herpes',
    'highjinks',
    'homework',
    'housework',
    'information',
    'jeans',
    'justice',
    'kudos',
    'labour',
    'literature',
    'machinery',
    'mackerel',
    'mail',
    'media',
    'mews',
    'moose',
    'music',
    'mud',
    'manga',
    'news',
    'only',
    'personnel',
    'pike',
    'plankton',
    'pliers',
    'police',
    'pollution',
    'premises',
    'rain',
    'research',
    'rice',
    'salmon',
    'scissors',
    'series',
    'sewage',
    'shambles',
    'shrimp',
    'software',
    'species',
    'staff',
    'swine',
    'tennis',
    'traffic',
    'transportation',
    'trout',
    'tuna',
    'wealth',
    'welfare',
    'whiting',
    'wildebeest',
    'wildlife',
    'you',
    /pok[eé]mon$/i,
    // Regexes.
    /[^aeiou]ese$/i, // "chinese", "japanese"
    /deer$/i, // "deer", "reindeer"
    /fish$/i, // "fish", "blowfish", "angelfish"
    /measles$/i,
    /o[iu]s$/i, // "carnivorous"
    /pox$/i, // "chickpox", "smallpox"
    /sheep$/i
  ].forEach(pluralize.addUncountableRule);

  return pluralize;
});

},{}],3:[function(require,module,exports){
'use strict';

var _pluralize = require('pluralize');

var _pluralize2 = _interopRequireDefault(_pluralize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { tns } from "./node_modules/tiny-slider/src/tiny-slider"

var bsc = require('bootstrap.native/dist/bootstrap-native-v4');

var app = {

    // tiny-slider initialisation
    offerSlider: function offerSlider() {
        var wrapSliderApart = document.querySelectorAll('.slider-apart, .slider-coworking-room');
        wrapSliderApart.forEach(function (el) {
            var slider = el.querySelector('.js-slider');
            var controlArrow = el.querySelector('.slider-arrows');
            var controlDots = el.querySelector('.slider-dots');

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
                navAsThumbnails: false

            });
            // console.log(slider2.getInfo().navContainer);
            // controlDots.innerHTML = slider2.getInfo().navContainer;
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
                    fixPlaceValue = void 0,
                    periodCount = void 0;
                updateValues();

                function updateValues() {
                    var periodRadio = document.querySelector('.radio-group input[name="booking-type"]:checked');
                    periodVal = periodRadio.value;
                    placeCount = document.querySelector('.form-control-place__number').innerText;
                    fixPlace = document.querySelector('.checkbox-group .form-control').checked;
                    fixPlaceValue = document.querySelector('.checkbox-group .form-control').value;
                    periodCount = document.querySelector('#select-' + periodRadio.getAttribute('data-name') + ' select').value;
                    calculate();
                }

                document.querySelector('.quantity-up').addEventListener('click', function () {
                    var text = 'place';
                    var count = increment(document.querySelector('.form-control-place__number').innerText);
                    if (count >= 2) {
                        document.querySelector('.quantity-down').classList.remove('disabled');
                    }
                    if (count >= 40) {
                        document.querySelector('.quantity-up').classList.add('disabled');
                    }

                    document.getElementById('count-place').setAttribute('value', count);

                    document.querySelector('.form-control-place__number').innerText = count;
                    document.querySelector('.form-control-place__text').innerText = (0, _pluralize2.default)(text, count);
                    updateValues();
                });

                document.querySelector('.quantity-down').addEventListener('click', function () {
                    var text = 'place';
                    var count = decrement(document.querySelector('.form-control-place__number').innerText);
                    if (count === 1) {
                        document.querySelector('.quantity-down').classList.add('disabled');
                    }
                    if (count <= 39) {
                        document.querySelector('.quantity-up').classList.remove('disabled');
                    }
                    document.getElementById('count-place').setAttribute('value', count);
                    document.querySelector('.form-control-place__number').innerText = count;
                    document.querySelector('.form-control-place__text').innerText = (0, _pluralize2.default)(text, count);
                    updateValues();
                });

                function calculate() {
                    var res = periodVal * placeCount * periodCount;

                    if (fixPlace) {
                        res = res + fixPlaceValue * placeCount;
                    }

                    console.log(periodVal, placeCount, periodCount);

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

        var btnOpenModal = document.querySelectorAll('.js-open-modal');

        btnOpenModal.forEach(function (el) {
            el.addEventListener('click', function (e) {
                e.preventDefault();
                console.log('sss');
                var id = this.getAttribute('href').replace('#', '');
                var myModal = document.getElementById(id);
                var myModalInstance = new bsc.Modal(myModal);
                myModalInstance.show();
            });
        });
    },
    percentSvg: function percentSvg() {
        var svgElement = document.querySelectorAll('.circle-box');
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = svgElement[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var el = _step2.value;

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
    },

    maps: function maps() {
        var myMap = new ymaps.Map('map', {
            center: [55.76, 37.64],
            controls: ['geolocationControl'],
            zoom: 10
        });
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

var setTaggedTabActive = function setTaggedTabActive() {

    var tabLinks = document.querySelectorAll('.tabs .tabs__link');
    var tabContent = document.querySelectorAll('.tabs .tabs__item');

    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = tabLinks[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var elem = _step3.value;


            elem.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                var _this = e.currentTarget;
                var tabId = _this.getAttribute('data-tab');

                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                    for (var _iterator4 = tabLinks[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var i = _step4.value;

                        i.classList.remove('active');
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

                _this.classList.add('active');

                var _iteratorNormalCompletion5 = true;
                var _didIteratorError5 = false;
                var _iteratorError5 = undefined;

                try {
                    for (var _iterator5 = tabContent[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                        var item = _step5.value;

                        item.classList.remove('active');
                        if (item.getAttribute('id') === tabId) {
                            item.classList.add('active');
                        }
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

    var thisForm = form;
    var formControl = thisForm.querySelectorAll('.form-control');

    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
        for (var _iterator6 = formControl[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var el = _step6.value;

            if (el.hasAttribute('required')) {
                validFormElement(el);
            }
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
}

function registerRadioEventListener() {
    var btnRadio = document.querySelectorAll('.radio-group .form-control');
    var _iteratorNormalCompletion7 = true;
    var _didIteratorError7 = false;
    var _iteratorError7 = undefined;

    try {
        for (var _iterator7 = btnRadio[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
            var el = _step7.value;

            el.addEventListener('change', function () {
                var name = this.getAttribute('data-name');
                var selectAll = document.querySelectorAll('#jobs .select-period .custom-select');
                var _iteratorNormalCompletion8 = true;
                var _didIteratorError8 = false;
                var _iteratorError8 = undefined;

                try {
                    for (var _iterator8 = selectAll[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                        var _el = _step8.value;

                        _el.style.display = 'none';
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

                document.getElementById('select-' + name).style.display = 'block';
            });
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

},{"bootstrap.native/dist/bootstrap-native-v4":1,"pluralize":2}]},{},[3]);

//# sourceMappingURL=app.js.map
