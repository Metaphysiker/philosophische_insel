(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~application~application_old~basic~google_analytics~pferdefutter~welcome"],{

/***/ "./node_modules/@popperjs/core/lib/createPopper.js":
/*!*********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/createPopper.js ***!
  \*********************************************************/
/*! exports provided: popperGenerator, createPopper, detectOverflow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "popperGenerator", function() { return popperGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPopper", function() { return createPopper; });
/* harmony import */ var _dom_utils_getCompositeRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom-utils/getCompositeRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js");
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom-utils/getLayoutRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
/* harmony import */ var _dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom-utils/listScrollParents.js */ "./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dom-utils/getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _utils_orderModifiers_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/orderModifiers.js */ "./node_modules/@popperjs/core/lib/utils/orderModifiers.js");
/* harmony import */ var _utils_debounce_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/debounce.js */ "./node_modules/@popperjs/core/lib/utils/debounce.js");
/* harmony import */ var _utils_validateModifiers_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/validateModifiers.js */ "./node_modules/@popperjs/core/lib/utils/validateModifiers.js");
/* harmony import */ var _utils_uniqueBy_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/uniqueBy.js */ "./node_modules/@popperjs/core/lib/utils/uniqueBy.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_mergeByName_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./utils/mergeByName.js */ "./node_modules/@popperjs/core/lib/utils/mergeByName.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "detectOverflow", function() { return _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./enums.js */ "./node_modules/@popperjs/core/lib/enums.js");














var INVALID_ELEMENT_ERROR = 'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.';
var INFINITE_LOOP_ERROR = 'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.';
var DEFAULT_OPTIONS = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
};

function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}

function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }

  var _generatorOptions = generatorOptions,
      _generatorOptions$def = _generatorOptions.defaultModifiers,
      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
      _generatorOptions$def2 = _generatorOptions.defaultOptions,
      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(options) {
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options);
        state.scrollParents = {
          reference: Object(_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_12__["isElement"])(reference) ? Object(_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_2__["default"])(reference) : reference.contextElement ? Object(_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_2__["default"])(reference.contextElement) : [],
          popper: Object(_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_2__["default"])(popper)
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = Object(_utils_orderModifiers_js__WEBPACK_IMPORTED_MODULE_5__["default"])(Object(_utils_mergeByName_js__WEBPACK_IMPORTED_MODULE_10__["default"])([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        }); // Validate the provided modifiers so that the consumer will get warned
        // if one of the modifiers is invalid for any reason

        if (true) {
          var modifiers = Object(_utils_uniqueBy_js__WEBPACK_IMPORTED_MODULE_8__["default"])([].concat(orderedModifiers, state.options.modifiers), function (_ref) {
            var name = _ref.name;
            return name;
          });
          Object(_utils_validateModifiers_js__WEBPACK_IMPORTED_MODULE_7__["default"])(modifiers);

          if (Object(_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_9__["default"])(state.options.placement) === _enums_js__WEBPACK_IMPORTED_MODULE_13__["auto"]) {
            var flipModifier = state.orderedModifiers.find(function (_ref2) {
              var name = _ref2.name;
              return name === 'flip';
            });

            if (!flipModifier) {
              console.error(['Popper: "auto" placements require the "flip" modifier be', 'present and enabled to work.'].join(' '));
            }
          }

          var _getComputedStyle = Object(_dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_4__["default"])(popper),
              marginTop = _getComputedStyle.marginTop,
              marginRight = _getComputedStyle.marginRight,
              marginBottom = _getComputedStyle.marginBottom,
              marginLeft = _getComputedStyle.marginLeft; // We no longer take into account `margins` on the popper, and it can
          // cause bugs with positioning, so we'll warn the consumer


          if ([marginTop, marginRight, marginBottom, marginLeft].some(function (margin) {
            return parseFloat(margin);
          })) {
            console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', 'between the popper and its reference element or boundary.', 'To replicate margin, use the `offset` modifier, as well as', 'the `padding` option in the `preventOverflow` and `flip`', 'modifiers.'].join(' '));
          }
        }

        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }

        var _state$elements = state.elements,
            reference = _state$elements.reference,
            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {
          if (true) {
            console.error(INVALID_ELEMENT_ERROR);
          }

          return;
        } // Store the reference and popper rects to be read by modifiers


        state.rects = {
          reference: Object(_dom_utils_getCompositeRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])(reference, Object(_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_3__["default"])(popper), state.options.strategy === 'fixed'),
          popper: Object(_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_1__["default"])(popper)
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        var __debug_loops__ = 0;

        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (true) {
            __debug_loops__ += 1;

            if (__debug_loops__ > 100) {
              console.error(INFINITE_LOOP_ERROR);
              break;
            }
          }

          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }

          var _state$orderedModifie = state.orderedModifiers[index],
              fn = _state$orderedModifie.fn,
              _state$orderedModifie2 = _state$orderedModifie.options,
              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
              name = _state$orderedModifie.name;

          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Object(_utils_debounce_js__WEBPACK_IMPORTED_MODULE_6__["default"])(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };

    if (!areValidElements(reference, popper)) {
      if (true) {
        console.error(INVALID_ELEMENT_ERROR);
      }

      return instance;
    }

    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref3) {
        var name = _ref3.name,
            _ref3$options = _ref3.options,
            options = _ref3$options === void 0 ? {} : _ref3$options,
            effect = _ref3.effect;

        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options
          });

          var noopFn = function noopFn() {};

          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }

    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }

    return instance;
  };
}
var createPopper = /*#__PURE__*/popperGenerator(); // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/contains.js":
/*!***************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/contains.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return contains; });
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (rootNode && Object(_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__["isShadowRoot"])(rootNode)) {
      var next = child;

      do {
        if (next && parent.isSameNode(next)) {
          return true;
        } // $FlowFixMe[prop-missing]: need a better way to handle this...


        next = next.parentNode || next.host;
      } while (next);
    } // Give up, the result is false


  return false;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getBoundingClientRect; });
function getBoundingClientRect(element) {
  var rect = element.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
    x: rect.left,
    y: rect.top
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getClippingRect; });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _getViewportRect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getViewportRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js");
/* harmony import */ var _getDocumentRect_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getDocumentRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js");
/* harmony import */ var _listScrollParents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./listScrollParents.js */ "./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js");
/* harmony import */ var _getOffsetParent_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _contains_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./contains.js */ "./node_modules/@popperjs/core/lib/dom-utils/contains.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../utils/rectToClientRect.js */ "./node_modules/@popperjs/core/lib/utils/rectToClientRect.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");















function getInnerBoundingClientRect(element) {
  var rect = Object(_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_8__["default"])(element);
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}

function getClientRectFromMixedType(element, clippingParent) {
  return clippingParent === _enums_js__WEBPACK_IMPORTED_MODULE_0__["viewport"] ? Object(_utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_12__["default"])(Object(_getViewportRect_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element)) : Object(_instanceOf_js__WEBPACK_IMPORTED_MODULE_7__["isHTMLElement"])(clippingParent) ? getInnerBoundingClientRect(clippingParent) : Object(_utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_12__["default"])(Object(_getDocumentRect_js__WEBPACK_IMPORTED_MODULE_2__["default"])(Object(_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_5__["default"])(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`


function getClippingParents(element) {
  var clippingParents = Object(_listScrollParents_js__WEBPACK_IMPORTED_MODULE_3__["default"])(Object(_getParentNode_js__WEBPACK_IMPORTED_MODULE_9__["default"])(element));
  var canEscapeClipping = ['absolute', 'fixed'].indexOf(Object(_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_6__["default"])(element).position) >= 0;
  var clipperElement = canEscapeClipping && Object(_instanceOf_js__WEBPACK_IMPORTED_MODULE_7__["isHTMLElement"])(element) ? Object(_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_4__["default"])(element) : element;

  if (!Object(_instanceOf_js__WEBPACK_IMPORTED_MODULE_7__["isElement"])(clipperElement)) {
    return [];
  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


  return clippingParents.filter(function (clippingParent) {
    return Object(_instanceOf_js__WEBPACK_IMPORTED_MODULE_7__["isElement"])(clippingParent) && Object(_contains_js__WEBPACK_IMPORTED_MODULE_10__["default"])(clippingParent, clipperElement) && Object(_getNodeName_js__WEBPACK_IMPORTED_MODULE_11__["default"])(clippingParent) !== 'body';
  });
} // Gets the maximum area that the element is visible in due to any number of
// clipping parents


function getClippingRect(element, boundary, rootBoundary) {
  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents[0];
  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent);
    accRect.top = Object(_utils_math_js__WEBPACK_IMPORTED_MODULE_13__["max"])(rect.top, accRect.top);
    accRect.right = Object(_utils_math_js__WEBPACK_IMPORTED_MODULE_13__["min"])(rect.right, accRect.right);
    accRect.bottom = Object(_utils_math_js__WEBPACK_IMPORTED_MODULE_13__["min"])(rect.bottom, accRect.bottom);
    accRect.left = Object(_utils_math_js__WEBPACK_IMPORTED_MODULE_13__["max"])(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getCompositeRect; });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _getNodeScroll_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getNodeScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./isScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");






 // Returns the composite rect of an element relative to its offsetParent.
// Composite means it takes into account transforms as well as layout.

function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }

  var documentElement = Object(_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_5__["default"])(offsetParent);
  var rect = Object(_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])(elementOrVirtualElement);
  var isOffsetParentAnElement = Object(_instanceOf_js__WEBPACK_IMPORTED_MODULE_3__["isHTMLElement"])(offsetParent);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };

  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (Object(_getNodeName_js__WEBPACK_IMPORTED_MODULE_2__["default"])(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
    Object(_isScrollParent_js__WEBPACK_IMPORTED_MODULE_6__["default"])(documentElement)) {
      scroll = Object(_getNodeScroll_js__WEBPACK_IMPORTED_MODULE_1__["default"])(offsetParent);
    }

    if (Object(_instanceOf_js__WEBPACK_IMPORTED_MODULE_3__["isHTMLElement"])(offsetParent)) {
      offsets = Object(_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])(offsetParent);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = Object(_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_4__["default"])(documentElement);
    }
  }

  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getComputedStyle; });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");

function getComputedStyle(element) {
  return Object(_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element).getComputedStyle(element);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getDocumentElement; });
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

function getDocumentElement(element) {
  // $FlowFixMe[incompatible-return]: assume body is always available
  return ((Object(_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__["isElement"])(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
  element.document) || window.document).documentElement;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getDocumentRect; });
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getWindowScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");




 // Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable

function getDocumentRect(element) {
  var _element$ownerDocumen;

  var html = Object(_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
  var winScroll = Object(_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_3__["default"])(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = Object(_utils_math_js__WEBPACK_IMPORTED_MODULE_4__["max"])(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = Object(_utils_math_js__WEBPACK_IMPORTED_MODULE_4__["max"])(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + Object(_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element);
  var y = -winScroll.scrollTop;

  if (Object(_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(body || html).direction === 'rtl') {
    x += Object(_utils_math_js__WEBPACK_IMPORTED_MODULE_4__["max"])(html.clientWidth, body ? body.clientWidth : 0) - width;
  }

  return {
    width: width,
    height: height,
    x: x,
    y: y
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getHTMLElementScroll; });
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getLayoutRect; });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
 // Returns the layout rect of an element relative to its offsetParent. Layout
// means it doesn't take into account transforms.

function getLayoutRect(element) {
  var clientRect = Object(_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element); // Use the clientRect sizes if it's not been transformed.
  // Fixes https://github.com/popperjs/popper-core/issues/1223

  var width = element.offsetWidth;
  var height = element.offsetHeight;

  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }

  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }

  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: width,
    height: height
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js":
/*!******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getNodeName; });
function getNodeName(element) {
  return element ? (element.nodeName || '').toLowerCase() : null;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getNodeScroll; });
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindowScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _getHTMLElementScroll_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getHTMLElementScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js");




function getNodeScroll(node) {
  if (node === Object(_getWindow_js__WEBPACK_IMPORTED_MODULE_1__["default"])(node) || !Object(_instanceOf_js__WEBPACK_IMPORTED_MODULE_2__["isHTMLElement"])(node)) {
    return Object(_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node);
  } else {
    return Object(_getHTMLElementScroll_js__WEBPACK_IMPORTED_MODULE_3__["default"])(node);
  }
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getOffsetParent; });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _isTableElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./isTableElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js");
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");







function getTrueOffsetParent(element) {
  if (!Object(_instanceOf_js__WEBPACK_IMPORTED_MODULE_3__["isHTMLElement"])(element) || // https://github.com/popperjs/popper-core/issues/837
  Object(_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element).position === 'fixed') {
    return null;
  }

  return element.offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block


function getContainingBlock(element) {
  var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
  var isIE = navigator.userAgent.indexOf('Trident') !== -1;

  if (isIE && Object(_instanceOf_js__WEBPACK_IMPORTED_MODULE_3__["isHTMLElement"])(element)) {
    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
    var elementCss = Object(_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element);

    if (elementCss.position === 'fixed') {
      return null;
    }
  }

  var currentNode = Object(_getParentNode_js__WEBPACK_IMPORTED_MODULE_5__["default"])(element);

  while (Object(_instanceOf_js__WEBPACK_IMPORTED_MODULE_3__["isHTMLElement"])(currentNode) && ['html', 'body'].indexOf(Object(_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__["default"])(currentNode)) < 0) {
    var css = Object(_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_2__["default"])(currentNode); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }

  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.


function getOffsetParent(element) {
  var window = Object(_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
  var offsetParent = getTrueOffsetParent(element);

  while (offsetParent && Object(_isTableElement_js__WEBPACK_IMPORTED_MODULE_4__["default"])(offsetParent) && Object(_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_2__["default"])(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (offsetParent && (Object(_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__["default"])(offsetParent) === 'html' || Object(_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__["default"])(offsetParent) === 'body' && Object(_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_2__["default"])(offsetParent).position === 'static')) {
    return window;
  }

  return offsetParent || getContainingBlock(element) || window;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getParentNode; });
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");



function getParentNode(element) {
  if (Object(_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element) === 'html') {
    return element;
  }

  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || ( // DOM Element detected
    Object(_instanceOf_js__WEBPACK_IMPORTED_MODULE_2__["isShadowRoot"])(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    Object(_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element) // fallback

  );
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getScrollParent; });
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");




function getScrollParent(node) {
  if (['html', 'body', '#document'].indexOf(Object(_getNodeName_js__WEBPACK_IMPORTED_MODULE_2__["default"])(node)) >= 0) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return node.ownerDocument.body;
  }

  if (Object(_instanceOf_js__WEBPACK_IMPORTED_MODULE_3__["isHTMLElement"])(node) && Object(_isScrollParent_js__WEBPACK_IMPORTED_MODULE_1__["default"])(node)) {
    return node;
  }

  return getScrollParent(Object(_getParentNode_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node));
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getViewportRect; });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");



function getViewportRect(element) {
  var win = Object(_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
  var html = Object(_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0; // NB: This isn't supported on iOS <= 12. If the keyboard is open, the popper
  // can be obscured underneath it.
  // Also, `html.clientHeight` adds the bottom bar height in Safari iOS, even
  // if it isn't open, so if this isn't available, the popper will be detected
  // to overflow the bottom of the screen too early.

  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height; // Uses Layout Viewport (like Chrome; Safari does not currently)
    // In Chrome, it returns a value very close to 0 (+/-) but contains rounding
    // errors due to floating point numbers, so we need to check precision.
    // Safari returns a number <= 0, usually < -1 when pinch-zoomed
    // Feature detection fails in mobile emulation mode in Chrome.
    // Math.abs(win.innerWidth / visualViewport.scale - visualViewport.width) <
    // 0.001
    // Fallback here: "Not Safari" userAgent

    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }

  return {
    width: width,
    height: height,
    x: x + Object(_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element),
    y: y
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js":
/*!****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getWindow.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getWindow; });
function getWindow(node) {
  if (node == null) {
    return window;
  }

  if (node.toString() !== '[object Window]') {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }

  return node;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getWindowScroll; });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");

function getWindowScroll(node) {
  var win = Object(_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getWindowScrollBarX; });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindowScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");



function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return Object(_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Object(_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element)).left + Object(_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element).scrollLeft;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js ***!
  \*****************************************************************/
/*! exports provided: isElement, isHTMLElement, isShadowRoot */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isElement", function() { return isElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isHTMLElement", function() { return isHTMLElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isShadowRoot", function() { return isShadowRoot; });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");


function isElement(node) {
  var OwnElement = Object(_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}

function isHTMLElement(node) {
  var OwnElement = Object(_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}

function isShadowRoot(node) {
  // IE 11 has no ShadowRoot
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }

  var OwnElement = Object(_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isScrollParent; });
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");

function isScrollParent(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  var _getComputedStyle = Object(_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element),
      overflow = _getComputedStyle.overflow,
      overflowX = _getComputedStyle.overflowX,
      overflowY = _getComputedStyle.overflowY;

  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isTableElement; });
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");

function isTableElement(element) {
  return ['table', 'td', 'th'].indexOf(Object(_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element)) >= 0;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js":
/*!************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return listScrollParents; });
/* harmony import */ var _getScrollParent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js");
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./isScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");




/*
given a DOM element, return the list of all scroll parents, up the list of ancesors
until we get to the top window object. This list is what we attach scroll listeners
to, because if any of these parent elements scroll, we'll need to re-calculate the
reference element's position.
*/

function listScrollParents(element, list) {
  var _element$ownerDocumen;

  if (list === void 0) {
    list = [];
  }

  var scrollParent = Object(_getScrollParent_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = Object(_getWindow_js__WEBPACK_IMPORTED_MODULE_2__["default"])(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], Object(_isScrollParent_js__WEBPACK_IMPORTED_MODULE_3__["default"])(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
  updatedList.concat(listScrollParents(Object(_getParentNode_js__WEBPACK_IMPORTED_MODULE_1__["default"])(target)));
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/enums.js":
/*!**************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/enums.js ***!
  \**************************************************/
/*! exports provided: top, bottom, right, left, auto, basePlacements, start, end, clippingParents, viewport, popper, reference, variationPlacements, placements, beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite, modifierPhases */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "top", function() { return top; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bottom", function() { return bottom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "right", function() { return right; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "left", function() { return left; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "auto", function() { return auto; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "basePlacements", function() { return basePlacements; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "start", function() { return start; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "end", function() { return end; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clippingParents", function() { return clippingParents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "viewport", function() { return viewport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "popper", function() { return popper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reference", function() { return reference; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "variationPlacements", function() { return variationPlacements; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "placements", function() { return placements; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "beforeRead", function() { return beforeRead; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "read", function() { return read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "afterRead", function() { return afterRead; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "beforeMain", function() { return beforeMain; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "main", function() { return main; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "afterMain", function() { return afterMain; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "beforeWrite", function() { return beforeWrite; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "write", function() { return write; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "afterWrite", function() { return afterWrite; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "modifierPhases", function() { return modifierPhases; });
var top = 'top';
var bottom = 'bottom';
var right = 'right';
var left = 'left';
var auto = 'auto';
var basePlacements = [top, bottom, right, left];
var start = 'start';
var end = 'end';
var clippingParents = 'clippingParents';
var viewport = 'viewport';
var popper = 'popper';
var reference = 'reference';
var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []); // modifiers that need to read the DOM

var beforeRead = 'beforeRead';
var read = 'read';
var afterRead = 'afterRead'; // pure-logic modifiers

var beforeMain = 'beforeMain';
var main = 'main';
var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

var beforeWrite = 'beforeWrite';
var write = 'write';
var afterWrite = 'afterWrite';
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/index.js":
/*!**************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/index.js ***!
  \**************************************************/
/*! exports provided: top, bottom, right, left, auto, basePlacements, start, end, clippingParents, viewport, popper, reference, variationPlacements, placements, beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite, modifierPhases, applyStyles, arrow, computeStyles, eventListeners, flip, hide, offset, popperOffsets, preventOverflow, popperGenerator, detectOverflow, createPopperBase, createPopper, createPopperLite */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "top", function() { return _enums_js__WEBPACK_IMPORTED_MODULE_0__["top"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "bottom", function() { return _enums_js__WEBPACK_IMPORTED_MODULE_0__["bottom"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "right", function() { return _enums_js__WEBPACK_IMPORTED_MODULE_0__["right"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "left", function() { return _enums_js__WEBPACK_IMPORTED_MODULE_0__["left"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "auto", function() { return _enums_js__WEBPACK_IMPORTED_MODULE_0__["auto"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "basePlacements", function() { return _enums_js__WEBPACK_IMPORTED_MODULE_0__["basePlacements"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "start", function() { return _enums_js__WEBPACK_IMPORTED_MODULE_0__["start"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "end", function() { return _enums_js__WEBPACK_IMPORTED_MODULE_0__["end"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "clippingParents", function() { return _enums_js__WEBPACK_IMPORTED_MODULE_0__["clippingParents"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "viewport", function() { return _enums_js__WEBPACK_IMPORTED_MODULE_0__["viewport"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "popper", function() { return _enums_js__WEBPACK_IMPORTED_MODULE_0__["popper"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "reference", function() { return _enums_js__WEBPACK_IMPORTED_MODULE_0__["reference"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "variationPlacements", function() { return _enums_js__WEBPACK_IMPORTED_MODULE_0__["variationPlacements"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "placements", function() { return _enums_js__WEBPACK_IMPORTED_MODULE_0__["placements"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "beforeRead", function() { return _enums_js__WEBPACK_IMPORTED_MODULE_0__["beforeRead"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "read", function() { return _enums_js__WEBPACK_IMPORTED_MODULE_0__["read"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "afterRead", function() { return _enums_js__WEBPACK_IMPORTED_MODULE_0__["afterRead"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "beforeMain", function() { return _enums_js__WEBPACK_IMPORTED_MODULE_0__["beforeMain"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "main", function() { return _enums_js__WEBPACK_IMPORTED_MODULE_0__["main"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "afterMain", function() { return _enums_js__WEBPACK_IMPORTED_MODULE_0__["afterMain"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "beforeWrite", function() { return _enums_js__WEBPACK_IMPORTED_MODULE_0__["beforeWrite"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "write", function() { return _enums_js__WEBPACK_IMPORTED_MODULE_0__["write"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "afterWrite", function() { return _enums_js__WEBPACK_IMPORTED_MODULE_0__["afterWrite"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "modifierPhases", function() { return _enums_js__WEBPACK_IMPORTED_MODULE_0__["modifierPhases"]; });

/* harmony import */ var _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifiers/index.js */ "./node_modules/@popperjs/core/lib/modifiers/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "applyStyles", function() { return _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__["applyStyles"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "arrow", function() { return _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__["arrow"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "computeStyles", function() { return _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__["computeStyles"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "eventListeners", function() { return _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__["eventListeners"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "flip", function() { return _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__["flip"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hide", function() { return _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__["hide"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "offset", function() { return _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__["offset"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "popperOffsets", function() { return _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__["popperOffsets"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "preventOverflow", function() { return _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__["preventOverflow"]; });

/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/createPopper.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "popperGenerator", function() { return _createPopper_js__WEBPACK_IMPORTED_MODULE_2__["popperGenerator"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "detectOverflow", function() { return _createPopper_js__WEBPACK_IMPORTED_MODULE_2__["detectOverflow"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createPopperBase", function() { return _createPopper_js__WEBPACK_IMPORTED_MODULE_2__["createPopper"]; });

/* harmony import */ var _popper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./popper.js */ "./node_modules/@popperjs/core/lib/popper.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createPopper", function() { return _popper_js__WEBPACK_IMPORTED_MODULE_3__["createPopper"]; });

/* harmony import */ var _popper_lite_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./popper-lite.js */ "./node_modules/@popperjs/core/lib/popper-lite.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createPopperLite", function() { return _popper_lite_js__WEBPACK_IMPORTED_MODULE_4__["createPopper"]; });


 // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js":
/*!******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/applyStyles.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom-utils/getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

 // This modifier takes the styles prepared by the `computeStyles` modifier
// and applies them to the HTMLElements such as popper and arrow

function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name]; // arrow is optional + virtual elements

    if (!Object(_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__["isHTMLElement"])(element) || !Object(_dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element)) {
      return;
    } // Flow doesn't support to extend this property, but it's the most
    // effective way to apply styles to an HTMLElement
    // $FlowFixMe[cannot-write]


    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function (name) {
      var value = attributes[name];

      if (value === false) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value === true ? '' : value);
      }
    });
  });
}

function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: '0',
      top: '0',
      margin: '0'
    },
    arrow: {
      position: 'absolute'
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;

  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }

  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

      var style = styleProperties.reduce(function (style, property) {
        style[property] = '';
        return style;
      }, {}); // arrow is optional + virtual elements

      if (!Object(_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__["isHTMLElement"])(element) || !Object(_dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element)) {
        return;
      }

      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'applyStyles',
  enabled: true,
  phase: 'write',
  fn: applyStyles,
  effect: effect,
  requires: ['computeStyles']
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/arrow.js":
/*!************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/arrow.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom-utils/getLayoutRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
/* harmony import */ var _dom_utils_contains_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dom-utils/contains.js */ "./node_modules/@popperjs/core/lib/dom-utils/contains.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/getMainAxisFromPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
/* harmony import */ var _utils_within_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/within.js */ "./node_modules/@popperjs/core/lib/utils/within.js");
/* harmony import */ var _utils_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/mergePaddingObject.js */ "./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js");
/* harmony import */ var _utils_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/expandToHashMap.js */ "./node_modules/@popperjs/core/lib/utils/expandToHashMap.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");









 // eslint-disable-next-line import/no-unused-modules

var toPaddingObject = function toPaddingObject(padding, state) {
  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return Object(_utils_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_6__["default"])(typeof padding !== 'number' ? padding : Object(_utils_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_7__["default"])(padding, _enums_js__WEBPACK_IMPORTED_MODULE_8__["basePlacements"]));
};

function arrow(_ref) {
  var _state$modifiersData$;

  var state = _ref.state,
      name = _ref.name,
      options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets = state.modifiersData.popperOffsets;
  var basePlacement = Object(_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(state.placement);
  var axis = Object(_utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_4__["default"])(basePlacement);
  var isVertical = [_enums_js__WEBPACK_IMPORTED_MODULE_8__["left"], _enums_js__WEBPACK_IMPORTED_MODULE_8__["right"]].indexOf(basePlacement) >= 0;
  var len = isVertical ? 'height' : 'width';

  if (!arrowElement || !popperOffsets) {
    return;
  }

  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = Object(_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arrowElement);
  var minProp = axis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_8__["top"] : _enums_js__WEBPACK_IMPORTED_MODULE_8__["left"];
  var maxProp = axis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_8__["bottom"] : _enums_js__WEBPACK_IMPORTED_MODULE_8__["right"];
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
  var arrowOffsetParent = Object(_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_3__["default"])(arrowElement);
  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
  // outside of the popper bounds

  var min = paddingObject[minProp];
  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset = Object(_utils_within_js__WEBPACK_IMPORTED_MODULE_5__["default"])(min, center, max); // Prevents breaking syntax highlighting...

  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}

function effect(_ref2) {
  var state = _ref2.state,
      options = _ref2.options;
  var _options$element = options.element,
      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

  if (arrowElement == null) {
    return;
  } // CSS selector


  if (typeof arrowElement === 'string') {
    arrowElement = state.elements.popper.querySelector(arrowElement);

    if (!arrowElement) {
      return;
    }
  }

  if (true) {
    if (!Object(_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_9__["isHTMLElement"])(arrowElement)) {
      console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', 'To use an SVG arrow, wrap it in an HTMLElement that will be used as', 'the arrow.'].join(' '));
    }
  }

  if (!Object(_dom_utils_contains_js__WEBPACK_IMPORTED_MODULE_2__["default"])(state.elements.popper, arrowElement)) {
    if (true) {
      console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', 'element.'].join(' '));
    }

    return;
  }

  state.elements.arrow = arrowElement;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'arrow',
  enabled: true,
  phase: 'main',
  fn: arrow,
  effect: effect,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow']
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/computeStyles.js ***!
  \********************************************************************/
/*! exports provided: mapToStyles, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapToStyles", function() { return mapToStyles; });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dom-utils/getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dom-utils/getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dom-utils/getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");






 // eslint-disable-next-line import/no-unused-modules

var unsetSides = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsetsByDPR(_ref) {
  var x = _ref.x,
      y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: Object(_utils_math_js__WEBPACK_IMPORTED_MODULE_6__["round"])(Object(_utils_math_js__WEBPACK_IMPORTED_MODULE_6__["round"])(x * dpr) / dpr) || 0,
    y: Object(_utils_math_js__WEBPACK_IMPORTED_MODULE_6__["round"])(Object(_utils_math_js__WEBPACK_IMPORTED_MODULE_6__["round"])(y * dpr) / dpr) || 0
  };
}

function mapToStyles(_ref2) {
  var _Object$assign2;

  var popper = _ref2.popper,
      popperRect = _ref2.popperRect,
      placement = _ref2.placement,
      offsets = _ref2.offsets,
      position = _ref2.position,
      gpuAcceleration = _ref2.gpuAcceleration,
      adaptive = _ref2.adaptive,
      roundOffsets = _ref2.roundOffsets;

  var _ref3 = roundOffsets === true ? roundOffsetsByDPR(offsets) : typeof roundOffsets === 'function' ? roundOffsets(offsets) : offsets,
      _ref3$x = _ref3.x,
      x = _ref3$x === void 0 ? 0 : _ref3$x,
      _ref3$y = _ref3.y,
      y = _ref3$y === void 0 ? 0 : _ref3$y;

  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = _enums_js__WEBPACK_IMPORTED_MODULE_0__["left"];
  var sideY = _enums_js__WEBPACK_IMPORTED_MODULE_0__["top"];
  var win = window;

  if (adaptive) {
    var offsetParent = Object(_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_1__["default"])(popper);
    var heightProp = 'clientHeight';
    var widthProp = 'clientWidth';

    if (offsetParent === Object(_dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_2__["default"])(popper)) {
      offsetParent = Object(_dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(popper);

      if (Object(_dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_4__["default"])(offsetParent).position !== 'static') {
        heightProp = 'scrollHeight';
        widthProp = 'scrollWidth';
      }
    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


    offsetParent = offsetParent;

    if (placement === _enums_js__WEBPACK_IMPORTED_MODULE_0__["top"]) {
      sideY = _enums_js__WEBPACK_IMPORTED_MODULE_0__["bottom"]; // $FlowFixMe[prop-missing]

      y -= offsetParent[heightProp] - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }

    if (placement === _enums_js__WEBPACK_IMPORTED_MODULE_0__["left"]) {
      sideX = _enums_js__WEBPACK_IMPORTED_MODULE_0__["right"]; // $FlowFixMe[prop-missing]

      x -= offsetParent[widthProp] - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }

  var commonStyles = Object.assign({
    position: position
  }, adaptive && unsetSides);

  if (gpuAcceleration) {
    var _Object$assign;

    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) < 2 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }

  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}

function computeStyles(_ref4) {
  var state = _ref4.state,
      options = _ref4.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
      _options$adaptive = options.adaptive,
      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
      _options$roundOffsets = options.roundOffsets,
      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

  if (true) {
    var transitionProperty = Object(_dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_4__["default"])(state.elements.popper).transitionProperty || '';

    if (adaptive && ['transform', 'top', 'right', 'bottom', 'left'].some(function (property) {
      return transitionProperty.indexOf(property) >= 0;
    })) {
      console.warn(['Popper: Detected CSS transitions on at least one of the following', 'CSS properties: "transform", "top", "right", "bottom", "left".', '\n\n', 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', 'for smooth transitions, or remove these properties from the CSS', 'transition declaration on the popper element if only transitioning', 'opacity or background-color for example.', '\n\n', 'We recommend using the popper element as a wrapper around an inner', 'element that can have any CSS property transitioned for animations.'].join(' '));
    }
  }

  var commonStyles = {
    placement: Object(_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_5__["default"])(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration
  };

  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive,
      roundOffsets: roundOffsets
    })));
  }

  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false,
      roundOffsets: roundOffsets
    })));
  }

  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-placement': state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'computeStyles',
  enabled: true,
  phase: 'beforeWrite',
  fn: computeStyles,
  data: {}
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/eventListeners.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom-utils/getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
 // eslint-disable-next-line import/no-unused-modules

var passive = {
  passive: true
};

function effect(_ref) {
  var state = _ref.state,
      instance = _ref.instance,
      options = _ref.options;
  var _options$scroll = options.scroll,
      scroll = _options$scroll === void 0 ? true : _options$scroll,
      _options$resize = options.resize,
      resize = _options$resize === void 0 ? true : _options$resize;
  var window = Object(_dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', instance.update, passive);
    });
  }

  if (resize) {
    window.addEventListener('resize', instance.update, passive);
  }

  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.removeEventListener('resize', instance.update, passive);
    }
  };
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'eventListeners',
  enabled: true,
  phase: 'write',
  fn: function fn() {},
  effect: effect,
  data: {}
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/flip.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/flip.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/getOppositePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/getOppositeVariationPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _utils_computeAutoPlacement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/computeAutoPlacement.js */ "./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _utils_getVariation_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");






 // eslint-disable-next-line import/no-unused-modules

function getExpandedFallbackPlacements(placement) {
  if (Object(_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_5__["auto"]) {
    return [];
  }

  var oppositePlacement = Object(_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement);
  return [Object(_utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(placement), oppositePlacement, Object(_utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(oppositePlacement)];
}

function flip(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;

  if (state.modifiersData[name]._skip) {
    return;
  }

  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
      specifiedFallbackPlacements = options.fallbackPlacements,
      padding = options.padding,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      _options$flipVariatio = options.flipVariations,
      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
      allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = Object(_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [Object(_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
    return acc.concat(Object(_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_5__["auto"] ? Object(_utils_computeAutoPlacement_js__WEBPACK_IMPORTED_MODULE_4__["default"])(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      flipVariations: flipVariations,
      allowedAutoPlacements: allowedAutoPlacements
    }) : placement);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements[0];

  for (var i = 0; i < placements.length; i++) {
    var placement = placements[i];

    var _basePlacement = Object(_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(placement);

    var isStartVariation = Object(_utils_getVariation_js__WEBPACK_IMPORTED_MODULE_6__["default"])(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_5__["start"];
    var isVertical = [_enums_js__WEBPACK_IMPORTED_MODULE_5__["top"], _enums_js__WEBPACK_IMPORTED_MODULE_5__["bottom"]].indexOf(_basePlacement) >= 0;
    var len = isVertical ? 'width' : 'height';
    var overflow = Object(_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_3__["default"])(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      altBoundary: altBoundary,
      padding: padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? _enums_js__WEBPACK_IMPORTED_MODULE_5__["right"] : _enums_js__WEBPACK_IMPORTED_MODULE_5__["left"] : isStartVariation ? _enums_js__WEBPACK_IMPORTED_MODULE_5__["bottom"] : _enums_js__WEBPACK_IMPORTED_MODULE_5__["top"];

    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = Object(_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(mainVariationSide);
    }

    var altVariationSide = Object(_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(mainVariationSide);
    var checks = [];

    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }

    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }

    if (checks.every(function (check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }

    checksMap.set(placement, checks);
  }

  if (makeFallbackChecks) {
    // `2` may be desired in some cases – research later
    var numberOfChecks = flipVariations ? 3 : 1;

    var _loop = function _loop(_i) {
      var fittingPlacement = placements.find(function (placement) {
        var checks = checksMap.get(placement);

        if (checks) {
          return checks.slice(0, _i).every(function (check) {
            return check;
          });
        }
      });

      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };

    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);

      if (_ret === "break") break;
    }
  }

  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'flip',
  enabled: true,
  phase: 'main',
  fn: flip,
  requiresIfExists: ['offset'],
  data: {
    _skip: false
  }
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/hide.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/hide.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");



function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }

  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}

function isAnySideFullyClipped(overflow) {
  return [_enums_js__WEBPACK_IMPORTED_MODULE_0__["top"], _enums_js__WEBPACK_IMPORTED_MODULE_0__["right"], _enums_js__WEBPACK_IMPORTED_MODULE_0__["bottom"], _enums_js__WEBPACK_IMPORTED_MODULE_0__["left"]].some(function (side) {
    return overflow[side] >= 0;
  });
}

function hide(_ref) {
  var state = _ref.state,
      name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = Object(_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__["default"])(state, {
    elementContext: 'reference'
  });
  var popperAltOverflow = Object(_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__["default"])(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets: referenceClippingOffsets,
    popperEscapeOffsets: popperEscapeOffsets,
    isReferenceHidden: isReferenceHidden,
    hasPopperEscaped: hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-reference-hidden': isReferenceHidden,
    'data-popper-escaped': hasPopperEscaped
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'hide',
  enabled: true,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: hide
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/index.js ***!
  \************************************************************/
/*! exports provided: applyStyles, arrow, computeStyles, eventListeners, flip, hide, offset, popperOffsets, preventOverflow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _applyStyles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./applyStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "applyStyles", function() { return _applyStyles_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _arrow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./arrow.js */ "./node_modules/@popperjs/core/lib/modifiers/arrow.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "arrow", function() { return _arrow_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _computeStyles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./computeStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "computeStyles", function() { return _computeStyles_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _eventListeners_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./eventListeners.js */ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "eventListeners", function() { return _eventListeners_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _flip_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./flip.js */ "./node_modules/@popperjs/core/lib/modifiers/flip.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "flip", function() { return _flip_js__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _hide_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./hide.js */ "./node_modules/@popperjs/core/lib/modifiers/hide.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hide", function() { return _hide_js__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _offset_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./offset.js */ "./node_modules/@popperjs/core/lib/modifiers/offset.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "offset", function() { return _offset_js__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _popperOffsets_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./popperOffsets.js */ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "popperOffsets", function() { return _popperOffsets_js__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _preventOverflow_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./preventOverflow.js */ "./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "preventOverflow", function() { return _preventOverflow_js__WEBPACK_IMPORTED_MODULE_8__["default"]; });











/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/offset.js":
/*!*************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/offset.js ***!
  \*************************************************************/
/*! exports provided: distanceAndSkiddingToXY, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distanceAndSkiddingToXY", function() { return distanceAndSkiddingToXY; });
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");


function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = Object(_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement);
  var invertDistance = [_enums_js__WEBPACK_IMPORTED_MODULE_1__["left"], _enums_js__WEBPACK_IMPORTED_MODULE_1__["top"]].indexOf(basePlacement) >= 0 ? -1 : 1;

  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
    placement: placement
  })) : offset,
      skidding = _ref[0],
      distance = _ref[1];

  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [_enums_js__WEBPACK_IMPORTED_MODULE_1__["left"], _enums_js__WEBPACK_IMPORTED_MODULE_1__["right"]].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}

function offset(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$offset = options.offset,
      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = _enums_js__WEBPACK_IMPORTED_MODULE_1__["placements"].reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement],
      x = _data$state$placement.x,
      y = _data$state$placement.y;

  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'offset',
  enabled: true,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: offset
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_computeOffsets_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/computeOffsets.js */ "./node_modules/@popperjs/core/lib/utils/computeOffsets.js");


function popperOffsets(_ref) {
  var state = _ref.state,
      name = _ref.name; // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step

  state.modifiersData[name] = Object(_utils_computeOffsets_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: 'absolute',
    placement: state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'popperOffsets',
  enabled: true,
  phase: 'read',
  fn: popperOffsets,
  data: {}
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/getMainAxisFromPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
/* harmony import */ var _utils_getAltAxis_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getAltAxis.js */ "./node_modules/@popperjs/core/lib/utils/getAltAxis.js");
/* harmony import */ var _utils_within_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/within.js */ "./node_modules/@popperjs/core/lib/utils/within.js");
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dom-utils/getLayoutRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _utils_getVariation_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _utils_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils/getFreshSideObject.js */ "./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");












function preventOverflow(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;
  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      padding = options.padding,
      _options$tether = options.tether,
      tether = _options$tether === void 0 ? true : _options$tether,
      _options$tetherOffset = options.tetherOffset,
      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = Object(_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_7__["default"])(state, {
    boundary: boundary,
    rootBoundary: rootBoundary,
    padding: padding,
    altBoundary: altBoundary
  });
  var basePlacement = Object(_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(state.placement);
  var variation = Object(_utils_getVariation_js__WEBPACK_IMPORTED_MODULE_8__["default"])(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = Object(_utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(basePlacement);
  var altAxis = Object(_utils_getAltAxis_js__WEBPACK_IMPORTED_MODULE_3__["default"])(mainAxis);
  var popperOffsets = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var data = {
    x: 0,
    y: 0
  };

  if (!popperOffsets) {
    return;
  }

  if (checkMainAxis || checkAltAxis) {
    var mainSide = mainAxis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_0__["top"] : _enums_js__WEBPACK_IMPORTED_MODULE_0__["left"];
    var altSide = mainAxis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_0__["bottom"] : _enums_js__WEBPACK_IMPORTED_MODULE_0__["right"];
    var len = mainAxis === 'y' ? 'height' : 'width';
    var offset = popperOffsets[mainAxis];
    var min = popperOffsets[mainAxis] + overflow[mainSide];
    var max = popperOffsets[mainAxis] - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === _enums_js__WEBPACK_IMPORTED_MODULE_0__["start"] ? referenceRect[len] : popperRect[len];
    var maxLen = variation === _enums_js__WEBPACK_IMPORTED_MODULE_0__["start"] ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
    // outside the reference bounds

    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? Object(_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_5__["default"])(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : Object(_utils_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_9__["default"])();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
    // to include its full size in the calculation. If the reference is small
    // and near the edge of a boundary, the popper can overflow even if the
    // reference is not overflowing as well (e.g. virtual elements with no
    // width or height)

    var arrowLen = Object(_utils_within_js__WEBPACK_IMPORTED_MODULE_4__["default"])(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - tetherOffsetValue : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + tetherOffsetValue : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
    var arrowOffsetParent = state.elements.arrow && Object(_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_6__["default"])(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = state.modifiersData.offset ? state.modifiersData.offset[state.placement][mainAxis] : 0;
    var tetherMin = popperOffsets[mainAxis] + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = popperOffsets[mainAxis] + maxOffset - offsetModifierValue;

    if (checkMainAxis) {
      var preventedOffset = Object(_utils_within_js__WEBPACK_IMPORTED_MODULE_4__["default"])(tether ? Object(_utils_math_js__WEBPACK_IMPORTED_MODULE_10__["min"])(min, tetherMin) : min, offset, tether ? Object(_utils_math_js__WEBPACK_IMPORTED_MODULE_10__["max"])(max, tetherMax) : max);
      popperOffsets[mainAxis] = preventedOffset;
      data[mainAxis] = preventedOffset - offset;
    }

    if (checkAltAxis) {
      var _mainSide = mainAxis === 'x' ? _enums_js__WEBPACK_IMPORTED_MODULE_0__["top"] : _enums_js__WEBPACK_IMPORTED_MODULE_0__["left"];

      var _altSide = mainAxis === 'x' ? _enums_js__WEBPACK_IMPORTED_MODULE_0__["bottom"] : _enums_js__WEBPACK_IMPORTED_MODULE_0__["right"];

      var _offset = popperOffsets[altAxis];

      var _min = _offset + overflow[_mainSide];

      var _max = _offset - overflow[_altSide];

      var _preventedOffset = Object(_utils_within_js__WEBPACK_IMPORTED_MODULE_4__["default"])(tether ? Object(_utils_math_js__WEBPACK_IMPORTED_MODULE_10__["min"])(_min, tetherMin) : _min, _offset, tether ? Object(_utils_math_js__WEBPACK_IMPORTED_MODULE_10__["max"])(_max, tetherMax) : _max);

      popperOffsets[altAxis] = _preventedOffset;
      data[altAxis] = _preventedOffset - _offset;
    }
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'preventOverflow',
  enabled: true,
  phase: 'main',
  fn: preventOverflow,
  requiresIfExists: ['offset']
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/popper-lite.js":
/*!********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/popper-lite.js ***!
  \********************************************************/
/*! exports provided: createPopper, popperGenerator, defaultModifiers, detectOverflow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPopper", function() { return createPopper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultModifiers", function() { return defaultModifiers; });
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/createPopper.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "popperGenerator", function() { return _createPopper_js__WEBPACK_IMPORTED_MODULE_0__["popperGenerator"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "detectOverflow", function() { return _createPopper_js__WEBPACK_IMPORTED_MODULE_0__["detectOverflow"]; });

/* harmony import */ var _modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifiers/eventListeners.js */ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
/* harmony import */ var _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modifiers/popperOffsets.js */ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
/* harmony import */ var _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modifiers/computeStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
/* harmony import */ var _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modifiers/applyStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");





var defaultModifiers = [_modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_1__["default"], _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_2__["default"], _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_3__["default"], _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_4__["default"]];
var createPopper = /*#__PURE__*/Object(_createPopper_js__WEBPACK_IMPORTED_MODULE_0__["popperGenerator"])({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/popper.js":
/*!***************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/popper.js ***!
  \***************************************************/
/*! exports provided: createPopper, popperGenerator, defaultModifiers, detectOverflow, createPopperLite, applyStyles, arrow, computeStyles, eventListeners, flip, hide, offset, popperOffsets, preventOverflow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPopper", function() { return createPopper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultModifiers", function() { return defaultModifiers; });
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/createPopper.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "popperGenerator", function() { return _createPopper_js__WEBPACK_IMPORTED_MODULE_0__["popperGenerator"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "detectOverflow", function() { return _createPopper_js__WEBPACK_IMPORTED_MODULE_0__["detectOverflow"]; });

/* harmony import */ var _modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifiers/eventListeners.js */ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
/* harmony import */ var _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modifiers/popperOffsets.js */ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
/* harmony import */ var _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modifiers/computeStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
/* harmony import */ var _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modifiers/applyStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");
/* harmony import */ var _modifiers_offset_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modifiers/offset.js */ "./node_modules/@popperjs/core/lib/modifiers/offset.js");
/* harmony import */ var _modifiers_flip_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modifiers/flip.js */ "./node_modules/@popperjs/core/lib/modifiers/flip.js");
/* harmony import */ var _modifiers_preventOverflow_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modifiers/preventOverflow.js */ "./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js");
/* harmony import */ var _modifiers_arrow_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modifiers/arrow.js */ "./node_modules/@popperjs/core/lib/modifiers/arrow.js");
/* harmony import */ var _modifiers_hide_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modifiers/hide.js */ "./node_modules/@popperjs/core/lib/modifiers/hide.js");
/* harmony import */ var _popper_lite_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./popper-lite.js */ "./node_modules/@popperjs/core/lib/popper-lite.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createPopperLite", function() { return _popper_lite_js__WEBPACK_IMPORTED_MODULE_10__["createPopper"]; });

/* harmony import */ var _modifiers_index_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./modifiers/index.js */ "./node_modules/@popperjs/core/lib/modifiers/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "applyStyles", function() { return _modifiers_index_js__WEBPACK_IMPORTED_MODULE_11__["applyStyles"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "arrow", function() { return _modifiers_index_js__WEBPACK_IMPORTED_MODULE_11__["arrow"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "computeStyles", function() { return _modifiers_index_js__WEBPACK_IMPORTED_MODULE_11__["computeStyles"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "eventListeners", function() { return _modifiers_index_js__WEBPACK_IMPORTED_MODULE_11__["eventListeners"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "flip", function() { return _modifiers_index_js__WEBPACK_IMPORTED_MODULE_11__["flip"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hide", function() { return _modifiers_index_js__WEBPACK_IMPORTED_MODULE_11__["hide"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "offset", function() { return _modifiers_index_js__WEBPACK_IMPORTED_MODULE_11__["offset"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "popperOffsets", function() { return _modifiers_index_js__WEBPACK_IMPORTED_MODULE_11__["popperOffsets"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "preventOverflow", function() { return _modifiers_index_js__WEBPACK_IMPORTED_MODULE_11__["preventOverflow"]; });











var defaultModifiers = [_modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_1__["default"], _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_2__["default"], _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_3__["default"], _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_4__["default"], _modifiers_offset_js__WEBPACK_IMPORTED_MODULE_5__["default"], _modifiers_flip_js__WEBPACK_IMPORTED_MODULE_6__["default"], _modifiers_preventOverflow_js__WEBPACK_IMPORTED_MODULE_7__["default"], _modifiers_arrow_js__WEBPACK_IMPORTED_MODULE_8__["default"], _modifiers_hide_js__WEBPACK_IMPORTED_MODULE_9__["default"]];
var createPopper = /*#__PURE__*/Object(_createPopper_js__WEBPACK_IMPORTED_MODULE_0__["popperGenerator"])({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return computeAutoPlacement; });
/* harmony import */ var _getVariation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _detectOverflow_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");




function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      placement = _options.placement,
      boundary = _options.boundary,
      rootBoundary = _options.rootBoundary,
      padding = _options.padding,
      flipVariations = _options.flipVariations,
      _options$allowedAutoP = _options.allowedAutoPlacements,
      allowedAutoPlacements = _options$allowedAutoP === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_1__["placements"] : _options$allowedAutoP;
  var variation = Object(_getVariation_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement);
  var placements = variation ? flipVariations ? _enums_js__WEBPACK_IMPORTED_MODULE_1__["variationPlacements"] : _enums_js__WEBPACK_IMPORTED_MODULE_1__["variationPlacements"].filter(function (placement) {
    return Object(_getVariation_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement) === variation;
  }) : _enums_js__WEBPACK_IMPORTED_MODULE_1__["basePlacements"];
  var allowedPlacements = placements.filter(function (placement) {
    return allowedAutoPlacements.indexOf(placement) >= 0;
  });

  if (allowedPlacements.length === 0) {
    allowedPlacements = placements;

    if (true) {
      console.error(['Popper: The `allowedAutoPlacements` option did not allow any', 'placements. Ensure the `placement` option matches the variation', 'of the allowed placements.', 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(' '));
    }
  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


  var overflows = allowedPlacements.reduce(function (acc, placement) {
    acc[placement] = Object(_detectOverflow_js__WEBPACK_IMPORTED_MODULE_2__["default"])(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding
    })[Object(_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(placement)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function (a, b) {
    return overflows[a] - overflows[b];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/computeOffsets.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/computeOffsets.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return computeOffsets; });
/* harmony import */ var _getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _getVariation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getMainAxisFromPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");




function computeOffsets(_ref) {
  var reference = _ref.reference,
      element = _ref.element,
      placement = _ref.placement;
  var basePlacement = placement ? Object(_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement) : null;
  var variation = placement ? Object(_getVariation_js__WEBPACK_IMPORTED_MODULE_1__["default"])(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;

  switch (basePlacement) {
    case _enums_js__WEBPACK_IMPORTED_MODULE_3__["top"]:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_3__["bottom"]:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_3__["right"]:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_3__["left"]:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;

    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }

  var mainAxis = basePlacement ? Object(_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(basePlacement) : null;

  if (mainAxis != null) {
    var len = mainAxis === 'y' ? 'height' : 'width';

    switch (variation) {
      case _enums_js__WEBPACK_IMPORTED_MODULE_3__["start"]:
        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
        break;

      case _enums_js__WEBPACK_IMPORTED_MODULE_3__["end"]:
        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
        break;

      default:
    }
  }

  return offsets;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/debounce.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/debounce.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return debounce; });
function debounce(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }

    return pending;
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/detectOverflow.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return detectOverflow; });
/* harmony import */ var _dom_utils_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom-utils/getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _dom_utils_getClippingRect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom-utils/getClippingRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js");
/* harmony import */ var _dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dom-utils/getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _computeOffsets_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./computeOffsets.js */ "./node_modules/@popperjs/core/lib/utils/computeOffsets.js");
/* harmony import */ var _rectToClientRect_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./rectToClientRect.js */ "./node_modules/@popperjs/core/lib/utils/rectToClientRect.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./mergePaddingObject.js */ "./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js");
/* harmony import */ var _expandToHashMap_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./expandToHashMap.js */ "./node_modules/@popperjs/core/lib/utils/expandToHashMap.js");








 // eslint-disable-next-line import/no-unused-modules

function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$placement = _options.placement,
      placement = _options$placement === void 0 ? state.placement : _options$placement,
      _options$boundary = _options.boundary,
      boundary = _options$boundary === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_5__["clippingParents"] : _options$boundary,
      _options$rootBoundary = _options.rootBoundary,
      rootBoundary = _options$rootBoundary === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_5__["viewport"] : _options$rootBoundary,
      _options$elementConte = _options.elementContext,
      elementContext = _options$elementConte === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_5__["popper"] : _options$elementConte,
      _options$altBoundary = _options.altBoundary,
      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
      _options$padding = _options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = Object(_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_7__["default"])(typeof padding !== 'number' ? padding : Object(_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_8__["default"])(padding, _enums_js__WEBPACK_IMPORTED_MODULE_5__["basePlacements"]));
  var altContext = elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_5__["popper"] ? _enums_js__WEBPACK_IMPORTED_MODULE_5__["reference"] : _enums_js__WEBPACK_IMPORTED_MODULE_5__["popper"];
  var referenceElement = state.elements.reference;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = Object(_dom_utils_getClippingRect_js__WEBPACK_IMPORTED_MODULE_1__["default"])(Object(_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_6__["isElement"])(element) ? element : element.contextElement || Object(_dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(state.elements.popper), boundary, rootBoundary);
  var referenceClientRect = Object(_dom_utils_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])(referenceElement);
  var popperOffsets = Object(_computeOffsets_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
    reference: referenceClientRect,
    element: popperRect,
    strategy: 'absolute',
    placement: placement
  });
  var popperClientRect = Object(_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_4__["default"])(Object.assign({}, popperRect, popperOffsets));
  var elementClientRect = elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_5__["popper"] ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
  // 0 or negative = within the clipping rect

  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

  if (elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_5__["popper"] && offsetData) {
    var offset = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function (key) {
      var multiply = [_enums_js__WEBPACK_IMPORTED_MODULE_5__["right"], _enums_js__WEBPACK_IMPORTED_MODULE_5__["bottom"]].indexOf(key) >= 0 ? 1 : -1;
      var axis = [_enums_js__WEBPACK_IMPORTED_MODULE_5__["top"], _enums_js__WEBPACK_IMPORTED_MODULE_5__["bottom"]].indexOf(key) >= 0 ? 'y' : 'x';
      overflowOffsets[key] += offset[axis] * multiply;
    });
  }

  return overflowOffsets;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/expandToHashMap.js":
/*!******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/expandToHashMap.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return expandToHashMap; });
function expandToHashMap(value, keys) {
  return keys.reduce(function (hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/format.js":
/*!*********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/format.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return format; });
function format(str) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return [].concat(args).reduce(function (p, c) {
    return p.replace(/%s/, c);
  }, str);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getAltAxis.js":
/*!*************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getAltAxis.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getAltAxis; });
function getAltAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getBasePlacement.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getBasePlacement; });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");

function getBasePlacement(placement) {
  return placement.split('-')[0];
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getFreshSideObject; });
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getMainAxisFromPlacement; });
function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getOppositePlacement; });
var hash = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getOppositeVariationPlacement; });
var hash = {
  start: 'end',
  end: 'start'
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function (matched) {
    return hash[matched];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getVariation.js":
/*!***************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getVariation.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getVariation; });
function getVariation(placement) {
  return placement.split('-')[1];
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/math.js":
/*!*******************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/math.js ***!
  \*******************************************************/
/*! exports provided: max, min, round */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "max", function() { return max; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "min", function() { return min; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "round", function() { return round; });
var max = Math.max;
var min = Math.min;
var round = Math.round;

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/mergeByName.js":
/*!**************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/mergeByName.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return mergeByName; });
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return mergePaddingObject; });
/* harmony import */ var _getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getFreshSideObject.js */ "./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js");

function mergePaddingObject(paddingObject) {
  return Object.assign({}, Object(_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(), paddingObject);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/orderModifiers.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/orderModifiers.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return orderModifiers; });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
 // source: https://stackoverflow.com/questions/49875255

function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);

        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }

  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}

function orderModifiers(modifiers) {
  // order based on dependencies
  var orderedModifiers = order(modifiers); // order based on phase

  return _enums_js__WEBPACK_IMPORTED_MODULE_0__["modifierPhases"].reduce(function (acc, phase) {
    return acc.concat(orderedModifiers.filter(function (modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/rectToClientRect.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/rectToClientRect.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return rectToClientRect; });
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/uniqueBy.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/uniqueBy.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return uniqueBy; });
function uniqueBy(arr, fn) {
  var identifiers = new Set();
  return arr.filter(function (item) {
    var identifier = fn(item);

    if (!identifiers.has(identifier)) {
      identifiers.add(identifier);
      return true;
    }
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/validateModifiers.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/validateModifiers.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return validateModifiers; });
/* harmony import */ var _format_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./format.js */ "./node_modules/@popperjs/core/lib/utils/format.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");


var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
var VALID_PROPERTIES = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];
function validateModifiers(modifiers) {
  modifiers.forEach(function (modifier) {
    Object.keys(modifier).forEach(function (key) {
      switch (key) {
        case 'name':
          if (typeof modifier.name !== 'string') {
            console.error(Object(_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', "\"" + String(modifier.name) + "\""));
          }

          break;

        case 'enabled':
          if (typeof modifier.enabled !== 'boolean') {
            console.error(Object(_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', "\"" + String(modifier.enabled) + "\""));
          }

        case 'phase':
          if (_enums_js__WEBPACK_IMPORTED_MODULE_1__["modifierPhases"].indexOf(modifier.phase) < 0) {
            console.error(Object(_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + _enums_js__WEBPACK_IMPORTED_MODULE_1__["modifierPhases"].join(', '), "\"" + String(modifier.phase) + "\""));
          }

          break;

        case 'fn':
          if (typeof modifier.fn !== 'function') {
            console.error(Object(_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'effect':
          if (typeof modifier.effect !== 'function') {
            console.error(Object(_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'requires':
          if (!Array.isArray(modifier.requires)) {
            console.error(Object(_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', "\"" + String(modifier.requires) + "\""));
          }

          break;

        case 'requiresIfExists':
          if (!Array.isArray(modifier.requiresIfExists)) {
            console.error(Object(_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', "\"" + String(modifier.requiresIfExists) + "\""));
          }

          break;

        case 'options':
        case 'data':
          break;

        default:
          console.error("PopperJS: an invalid property has been provided to the \"" + modifier.name + "\" modifier, valid properties are " + VALID_PROPERTIES.map(function (s) {
            return "\"" + s + "\"";
          }).join(', ') + "; but \"" + key + "\" was provided.");
      }

      modifier.requires && modifier.requires.forEach(function (requirement) {
        if (modifiers.find(function (mod) {
          return mod.name === requirement;
        }) == null) {
          console.error(Object(_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
        }
      });
    });
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/within.js":
/*!*********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/within.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return within; });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");

function within(min, value, max) {
  return Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["max"])(min, Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["min"])(value, max));
}

/***/ }),

/***/ "./node_modules/@rails/activestorage/app/assets/javascripts/activestorage.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@rails/activestorage/app/assets/javascripts/activestorage.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (global, factory) {
  ( false ? undefined : _typeof(exports)) === "object" && typeof module !== "undefined" ? factory(exports) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
})(this, function (exports) {
  "use strict";

  function createCommonjsModule(fn, module) {
    return module = {
      exports: {}
    }, fn(module, module.exports), module.exports;
  }

  var sparkMd5 = createCommonjsModule(function (module, exports) {
    (function (factory) {
      {
        module.exports = factory();
      }
    })(function (undefined) {
      var hex_chr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];

      function md5cycle(x, k) {
        var a = x[0],
            b = x[1],
            c = x[2],
            d = x[3];
        a += (b & c | ~b & d) + k[0] - 680876936 | 0;
        a = (a << 7 | a >>> 25) + b | 0;
        d += (a & b | ~a & c) + k[1] - 389564586 | 0;
        d = (d << 12 | d >>> 20) + a | 0;
        c += (d & a | ~d & b) + k[2] + 606105819 | 0;
        c = (c << 17 | c >>> 15) + d | 0;
        b += (c & d | ~c & a) + k[3] - 1044525330 | 0;
        b = (b << 22 | b >>> 10) + c | 0;
        a += (b & c | ~b & d) + k[4] - 176418897 | 0;
        a = (a << 7 | a >>> 25) + b | 0;
        d += (a & b | ~a & c) + k[5] + 1200080426 | 0;
        d = (d << 12 | d >>> 20) + a | 0;
        c += (d & a | ~d & b) + k[6] - 1473231341 | 0;
        c = (c << 17 | c >>> 15) + d | 0;
        b += (c & d | ~c & a) + k[7] - 45705983 | 0;
        b = (b << 22 | b >>> 10) + c | 0;
        a += (b & c | ~b & d) + k[8] + 1770035416 | 0;
        a = (a << 7 | a >>> 25) + b | 0;
        d += (a & b | ~a & c) + k[9] - 1958414417 | 0;
        d = (d << 12 | d >>> 20) + a | 0;
        c += (d & a | ~d & b) + k[10] - 42063 | 0;
        c = (c << 17 | c >>> 15) + d | 0;
        b += (c & d | ~c & a) + k[11] - 1990404162 | 0;
        b = (b << 22 | b >>> 10) + c | 0;
        a += (b & c | ~b & d) + k[12] + 1804603682 | 0;
        a = (a << 7 | a >>> 25) + b | 0;
        d += (a & b | ~a & c) + k[13] - 40341101 | 0;
        d = (d << 12 | d >>> 20) + a | 0;
        c += (d & a | ~d & b) + k[14] - 1502002290 | 0;
        c = (c << 17 | c >>> 15) + d | 0;
        b += (c & d | ~c & a) + k[15] + 1236535329 | 0;
        b = (b << 22 | b >>> 10) + c | 0;
        a += (b & d | c & ~d) + k[1] - 165796510 | 0;
        a = (a << 5 | a >>> 27) + b | 0;
        d += (a & c | b & ~c) + k[6] - 1069501632 | 0;
        d = (d << 9 | d >>> 23) + a | 0;
        c += (d & b | a & ~b) + k[11] + 643717713 | 0;
        c = (c << 14 | c >>> 18) + d | 0;
        b += (c & a | d & ~a) + k[0] - 373897302 | 0;
        b = (b << 20 | b >>> 12) + c | 0;
        a += (b & d | c & ~d) + k[5] - 701558691 | 0;
        a = (a << 5 | a >>> 27) + b | 0;
        d += (a & c | b & ~c) + k[10] + 38016083 | 0;
        d = (d << 9 | d >>> 23) + a | 0;
        c += (d & b | a & ~b) + k[15] - 660478335 | 0;
        c = (c << 14 | c >>> 18) + d | 0;
        b += (c & a | d & ~a) + k[4] - 405537848 | 0;
        b = (b << 20 | b >>> 12) + c | 0;
        a += (b & d | c & ~d) + k[9] + 568446438 | 0;
        a = (a << 5 | a >>> 27) + b | 0;
        d += (a & c | b & ~c) + k[14] - 1019803690 | 0;
        d = (d << 9 | d >>> 23) + a | 0;
        c += (d & b | a & ~b) + k[3] - 187363961 | 0;
        c = (c << 14 | c >>> 18) + d | 0;
        b += (c & a | d & ~a) + k[8] + 1163531501 | 0;
        b = (b << 20 | b >>> 12) + c | 0;
        a += (b & d | c & ~d) + k[13] - 1444681467 | 0;
        a = (a << 5 | a >>> 27) + b | 0;
        d += (a & c | b & ~c) + k[2] - 51403784 | 0;
        d = (d << 9 | d >>> 23) + a | 0;
        c += (d & b | a & ~b) + k[7] + 1735328473 | 0;
        c = (c << 14 | c >>> 18) + d | 0;
        b += (c & a | d & ~a) + k[12] - 1926607734 | 0;
        b = (b << 20 | b >>> 12) + c | 0;
        a += (b ^ c ^ d) + k[5] - 378558 | 0;
        a = (a << 4 | a >>> 28) + b | 0;
        d += (a ^ b ^ c) + k[8] - 2022574463 | 0;
        d = (d << 11 | d >>> 21) + a | 0;
        c += (d ^ a ^ b) + k[11] + 1839030562 | 0;
        c = (c << 16 | c >>> 16) + d | 0;
        b += (c ^ d ^ a) + k[14] - 35309556 | 0;
        b = (b << 23 | b >>> 9) + c | 0;
        a += (b ^ c ^ d) + k[1] - 1530992060 | 0;
        a = (a << 4 | a >>> 28) + b | 0;
        d += (a ^ b ^ c) + k[4] + 1272893353 | 0;
        d = (d << 11 | d >>> 21) + a | 0;
        c += (d ^ a ^ b) + k[7] - 155497632 | 0;
        c = (c << 16 | c >>> 16) + d | 0;
        b += (c ^ d ^ a) + k[10] - 1094730640 | 0;
        b = (b << 23 | b >>> 9) + c | 0;
        a += (b ^ c ^ d) + k[13] + 681279174 | 0;
        a = (a << 4 | a >>> 28) + b | 0;
        d += (a ^ b ^ c) + k[0] - 358537222 | 0;
        d = (d << 11 | d >>> 21) + a | 0;
        c += (d ^ a ^ b) + k[3] - 722521979 | 0;
        c = (c << 16 | c >>> 16) + d | 0;
        b += (c ^ d ^ a) + k[6] + 76029189 | 0;
        b = (b << 23 | b >>> 9) + c | 0;
        a += (b ^ c ^ d) + k[9] - 640364487 | 0;
        a = (a << 4 | a >>> 28) + b | 0;
        d += (a ^ b ^ c) + k[12] - 421815835 | 0;
        d = (d << 11 | d >>> 21) + a | 0;
        c += (d ^ a ^ b) + k[15] + 530742520 | 0;
        c = (c << 16 | c >>> 16) + d | 0;
        b += (c ^ d ^ a) + k[2] - 995338651 | 0;
        b = (b << 23 | b >>> 9) + c | 0;
        a += (c ^ (b | ~d)) + k[0] - 198630844 | 0;
        a = (a << 6 | a >>> 26) + b | 0;
        d += (b ^ (a | ~c)) + k[7] + 1126891415 | 0;
        d = (d << 10 | d >>> 22) + a | 0;
        c += (a ^ (d | ~b)) + k[14] - 1416354905 | 0;
        c = (c << 15 | c >>> 17) + d | 0;
        b += (d ^ (c | ~a)) + k[5] - 57434055 | 0;
        b = (b << 21 | b >>> 11) + c | 0;
        a += (c ^ (b | ~d)) + k[12] + 1700485571 | 0;
        a = (a << 6 | a >>> 26) + b | 0;
        d += (b ^ (a | ~c)) + k[3] - 1894986606 | 0;
        d = (d << 10 | d >>> 22) + a | 0;
        c += (a ^ (d | ~b)) + k[10] - 1051523 | 0;
        c = (c << 15 | c >>> 17) + d | 0;
        b += (d ^ (c | ~a)) + k[1] - 2054922799 | 0;
        b = (b << 21 | b >>> 11) + c | 0;
        a += (c ^ (b | ~d)) + k[8] + 1873313359 | 0;
        a = (a << 6 | a >>> 26) + b | 0;
        d += (b ^ (a | ~c)) + k[15] - 30611744 | 0;
        d = (d << 10 | d >>> 22) + a | 0;
        c += (a ^ (d | ~b)) + k[6] - 1560198380 | 0;
        c = (c << 15 | c >>> 17) + d | 0;
        b += (d ^ (c | ~a)) + k[13] + 1309151649 | 0;
        b = (b << 21 | b >>> 11) + c | 0;
        a += (c ^ (b | ~d)) + k[4] - 145523070 | 0;
        a = (a << 6 | a >>> 26) + b | 0;
        d += (b ^ (a | ~c)) + k[11] - 1120210379 | 0;
        d = (d << 10 | d >>> 22) + a | 0;
        c += (a ^ (d | ~b)) + k[2] + 718787259 | 0;
        c = (c << 15 | c >>> 17) + d | 0;
        b += (d ^ (c | ~a)) + k[9] - 343485551 | 0;
        b = (b << 21 | b >>> 11) + c | 0;
        x[0] = a + x[0] | 0;
        x[1] = b + x[1] | 0;
        x[2] = c + x[2] | 0;
        x[3] = d + x[3] | 0;
      }

      function md5blk(s) {
        var md5blks = [],
            i;

        for (i = 0; i < 64; i += 4) {
          md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
        }

        return md5blks;
      }

      function md5blk_array(a) {
        var md5blks = [],
            i;

        for (i = 0; i < 64; i += 4) {
          md5blks[i >> 2] = a[i] + (a[i + 1] << 8) + (a[i + 2] << 16) + (a[i + 3] << 24);
        }

        return md5blks;
      }

      function md51(s) {
        var n = s.length,
            state = [1732584193, -271733879, -1732584194, 271733878],
            i,
            length,
            tail,
            tmp,
            lo,
            hi;

        for (i = 64; i <= n; i += 64) {
          md5cycle(state, md5blk(s.substring(i - 64, i)));
        }

        s = s.substring(i - 64);
        length = s.length;
        tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        for (i = 0; i < length; i += 1) {
          tail[i >> 2] |= s.charCodeAt(i) << (i % 4 << 3);
        }

        tail[i >> 2] |= 128 << (i % 4 << 3);

        if (i > 55) {
          md5cycle(state, tail);

          for (i = 0; i < 16; i += 1) {
            tail[i] = 0;
          }
        }

        tmp = n * 8;
        tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
        lo = parseInt(tmp[2], 16);
        hi = parseInt(tmp[1], 16) || 0;
        tail[14] = lo;
        tail[15] = hi;
        md5cycle(state, tail);
        return state;
      }

      function md51_array(a) {
        var n = a.length,
            state = [1732584193, -271733879, -1732584194, 271733878],
            i,
            length,
            tail,
            tmp,
            lo,
            hi;

        for (i = 64; i <= n; i += 64) {
          md5cycle(state, md5blk_array(a.subarray(i - 64, i)));
        }

        a = i - 64 < n ? a.subarray(i - 64) : new Uint8Array(0);
        length = a.length;
        tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        for (i = 0; i < length; i += 1) {
          tail[i >> 2] |= a[i] << (i % 4 << 3);
        }

        tail[i >> 2] |= 128 << (i % 4 << 3);

        if (i > 55) {
          md5cycle(state, tail);

          for (i = 0; i < 16; i += 1) {
            tail[i] = 0;
          }
        }

        tmp = n * 8;
        tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
        lo = parseInt(tmp[2], 16);
        hi = parseInt(tmp[1], 16) || 0;
        tail[14] = lo;
        tail[15] = hi;
        md5cycle(state, tail);
        return state;
      }

      function rhex(n) {
        var s = "",
            j;

        for (j = 0; j < 4; j += 1) {
          s += hex_chr[n >> j * 8 + 4 & 15] + hex_chr[n >> j * 8 & 15];
        }

        return s;
      }

      function hex(x) {
        var i;

        for (i = 0; i < x.length; i += 1) {
          x[i] = rhex(x[i]);
        }

        return x.join("");
      }

      if (hex(md51("hello")) !== "5d41402abc4b2a76b9719d911017c592") ;

      if (typeof ArrayBuffer !== "undefined" && !ArrayBuffer.prototype.slice) {
        (function () {
          function clamp(val, length) {
            val = val | 0 || 0;

            if (val < 0) {
              return Math.max(val + length, 0);
            }

            return Math.min(val, length);
          }

          ArrayBuffer.prototype.slice = function (from, to) {
            var length = this.byteLength,
                begin = clamp(from, length),
                end = length,
                num,
                target,
                targetArray,
                sourceArray;

            if (to !== undefined) {
              end = clamp(to, length);
            }

            if (begin > end) {
              return new ArrayBuffer(0);
            }

            num = end - begin;
            target = new ArrayBuffer(num);
            targetArray = new Uint8Array(target);
            sourceArray = new Uint8Array(this, begin, num);
            targetArray.set(sourceArray);
            return target;
          };
        })();
      }

      function toUtf8(str) {
        if (/[\u0080-\uFFFF]/.test(str)) {
          str = unescape(encodeURIComponent(str));
        }

        return str;
      }

      function utf8Str2ArrayBuffer(str, returnUInt8Array) {
        var length = str.length,
            buff = new ArrayBuffer(length),
            arr = new Uint8Array(buff),
            i;

        for (i = 0; i < length; i += 1) {
          arr[i] = str.charCodeAt(i);
        }

        return returnUInt8Array ? arr : buff;
      }

      function arrayBuffer2Utf8Str(buff) {
        return String.fromCharCode.apply(null, new Uint8Array(buff));
      }

      function concatenateArrayBuffers(first, second, returnUInt8Array) {
        var result = new Uint8Array(first.byteLength + second.byteLength);
        result.set(new Uint8Array(first));
        result.set(new Uint8Array(second), first.byteLength);
        return returnUInt8Array ? result : result.buffer;
      }

      function hexToBinaryString(hex) {
        var bytes = [],
            length = hex.length,
            x;

        for (x = 0; x < length - 1; x += 2) {
          bytes.push(parseInt(hex.substr(x, 2), 16));
        }

        return String.fromCharCode.apply(String, bytes);
      }

      function SparkMD5() {
        this.reset();
      }

      SparkMD5.prototype.append = function (str) {
        this.appendBinary(toUtf8(str));
        return this;
      };

      SparkMD5.prototype.appendBinary = function (contents) {
        this._buff += contents;
        this._length += contents.length;
        var length = this._buff.length,
            i;

        for (i = 64; i <= length; i += 64) {
          md5cycle(this._hash, md5blk(this._buff.substring(i - 64, i)));
        }

        this._buff = this._buff.substring(i - 64);
        return this;
      };

      SparkMD5.prototype.end = function (raw) {
        var buff = this._buff,
            length = buff.length,
            i,
            tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ret;

        for (i = 0; i < length; i += 1) {
          tail[i >> 2] |= buff.charCodeAt(i) << (i % 4 << 3);
        }

        this._finish(tail, length);

        ret = hex(this._hash);

        if (raw) {
          ret = hexToBinaryString(ret);
        }

        this.reset();
        return ret;
      };

      SparkMD5.prototype.reset = function () {
        this._buff = "";
        this._length = 0;
        this._hash = [1732584193, -271733879, -1732584194, 271733878];
        return this;
      };

      SparkMD5.prototype.getState = function () {
        return {
          buff: this._buff,
          length: this._length,
          hash: this._hash
        };
      };

      SparkMD5.prototype.setState = function (state) {
        this._buff = state.buff;
        this._length = state.length;
        this._hash = state.hash;
        return this;
      };

      SparkMD5.prototype.destroy = function () {
        delete this._hash;
        delete this._buff;
        delete this._length;
      };

      SparkMD5.prototype._finish = function (tail, length) {
        var i = length,
            tmp,
            lo,
            hi;
        tail[i >> 2] |= 128 << (i % 4 << 3);

        if (i > 55) {
          md5cycle(this._hash, tail);

          for (i = 0; i < 16; i += 1) {
            tail[i] = 0;
          }
        }

        tmp = this._length * 8;
        tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
        lo = parseInt(tmp[2], 16);
        hi = parseInt(tmp[1], 16) || 0;
        tail[14] = lo;
        tail[15] = hi;
        md5cycle(this._hash, tail);
      };

      SparkMD5.hash = function (str, raw) {
        return SparkMD5.hashBinary(toUtf8(str), raw);
      };

      SparkMD5.hashBinary = function (content, raw) {
        var hash = md51(content),
            ret = hex(hash);
        return raw ? hexToBinaryString(ret) : ret;
      };

      SparkMD5.ArrayBuffer = function () {
        this.reset();
      };

      SparkMD5.ArrayBuffer.prototype.append = function (arr) {
        var buff = concatenateArrayBuffers(this._buff.buffer, arr, true),
            length = buff.length,
            i;
        this._length += arr.byteLength;

        for (i = 64; i <= length; i += 64) {
          md5cycle(this._hash, md5blk_array(buff.subarray(i - 64, i)));
        }

        this._buff = i - 64 < length ? new Uint8Array(buff.buffer.slice(i - 64)) : new Uint8Array(0);
        return this;
      };

      SparkMD5.ArrayBuffer.prototype.end = function (raw) {
        var buff = this._buff,
            length = buff.length,
            tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            i,
            ret;

        for (i = 0; i < length; i += 1) {
          tail[i >> 2] |= buff[i] << (i % 4 << 3);
        }

        this._finish(tail, length);

        ret = hex(this._hash);

        if (raw) {
          ret = hexToBinaryString(ret);
        }

        this.reset();
        return ret;
      };

      SparkMD5.ArrayBuffer.prototype.reset = function () {
        this._buff = new Uint8Array(0);
        this._length = 0;
        this._hash = [1732584193, -271733879, -1732584194, 271733878];
        return this;
      };

      SparkMD5.ArrayBuffer.prototype.getState = function () {
        var state = SparkMD5.prototype.getState.call(this);
        state.buff = arrayBuffer2Utf8Str(state.buff);
        return state;
      };

      SparkMD5.ArrayBuffer.prototype.setState = function (state) {
        state.buff = utf8Str2ArrayBuffer(state.buff, true);
        return SparkMD5.prototype.setState.call(this, state);
      };

      SparkMD5.ArrayBuffer.prototype.destroy = SparkMD5.prototype.destroy;
      SparkMD5.ArrayBuffer.prototype._finish = SparkMD5.prototype._finish;

      SparkMD5.ArrayBuffer.hash = function (arr, raw) {
        var hash = md51_array(new Uint8Array(arr)),
            ret = hex(hash);
        return raw ? hexToBinaryString(ret) : ret;
      };

      return SparkMD5;
    });
  });

  var classCallCheck = function classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var fileSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;

  var FileChecksum = function () {
    createClass(FileChecksum, null, [{
      key: "create",
      value: function create(file, callback) {
        var instance = new FileChecksum(file);
        instance.create(callback);
      }
    }]);

    function FileChecksum(file) {
      classCallCheck(this, FileChecksum);
      this.file = file;
      this.chunkSize = 2097152;
      this.chunkCount = Math.ceil(this.file.size / this.chunkSize);
      this.chunkIndex = 0;
    }

    createClass(FileChecksum, [{
      key: "create",
      value: function create(callback) {
        var _this = this;

        this.callback = callback;
        this.md5Buffer = new sparkMd5.ArrayBuffer();
        this.fileReader = new FileReader();
        this.fileReader.addEventListener("load", function (event) {
          return _this.fileReaderDidLoad(event);
        });
        this.fileReader.addEventListener("error", function (event) {
          return _this.fileReaderDidError(event);
        });
        this.readNextChunk();
      }
    }, {
      key: "fileReaderDidLoad",
      value: function fileReaderDidLoad(event) {
        this.md5Buffer.append(event.target.result);

        if (!this.readNextChunk()) {
          var binaryDigest = this.md5Buffer.end(true);
          var base64digest = btoa(binaryDigest);
          this.callback(null, base64digest);
        }
      }
    }, {
      key: "fileReaderDidError",
      value: function fileReaderDidError(event) {
        this.callback("Error reading " + this.file.name);
      }
    }, {
      key: "readNextChunk",
      value: function readNextChunk() {
        if (this.chunkIndex < this.chunkCount || this.chunkIndex == 0 && this.chunkCount == 0) {
          var start = this.chunkIndex * this.chunkSize;
          var end = Math.min(start + this.chunkSize, this.file.size);
          var bytes = fileSlice.call(this.file, start, end);
          this.fileReader.readAsArrayBuffer(bytes);
          this.chunkIndex++;
          return true;
        } else {
          return false;
        }
      }
    }]);
    return FileChecksum;
  }();

  function getMetaValue(name) {
    var element = findElement(document.head, 'meta[name="' + name + '"]');

    if (element) {
      return element.getAttribute("content");
    }
  }

  function findElements(root, selector) {
    if (typeof root == "string") {
      selector = root;
      root = document;
    }

    var elements = root.querySelectorAll(selector);
    return toArray$1(elements);
  }

  function findElement(root, selector) {
    if (typeof root == "string") {
      selector = root;
      root = document;
    }

    return root.querySelector(selector);
  }

  function dispatchEvent(element, type) {
    var eventInit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var disabled = element.disabled;
    var bubbles = eventInit.bubbles,
        cancelable = eventInit.cancelable,
        detail = eventInit.detail;
    var event = document.createEvent("Event");
    event.initEvent(type, bubbles || true, cancelable || true);
    event.detail = detail || {};

    try {
      element.disabled = false;
      element.dispatchEvent(event);
    } finally {
      element.disabled = disabled;
    }

    return event;
  }

  function toArray$1(value) {
    if (Array.isArray(value)) {
      return value;
    } else if (Array.from) {
      return Array.from(value);
    } else {
      return [].slice.call(value);
    }
  }

  var BlobRecord = function () {
    function BlobRecord(file, checksum, url) {
      var _this = this;

      classCallCheck(this, BlobRecord);
      this.file = file;
      this.attributes = {
        filename: file.name,
        content_type: file.type || "application/octet-stream",
        byte_size: file.size,
        checksum: checksum
      };
      this.xhr = new XMLHttpRequest();
      this.xhr.open("POST", url, true);
      this.xhr.responseType = "json";
      this.xhr.setRequestHeader("Content-Type", "application/json");
      this.xhr.setRequestHeader("Accept", "application/json");
      this.xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      var csrfToken = getMetaValue("csrf-token");

      if (csrfToken != undefined) {
        this.xhr.setRequestHeader("X-CSRF-Token", csrfToken);
      }

      this.xhr.addEventListener("load", function (event) {
        return _this.requestDidLoad(event);
      });
      this.xhr.addEventListener("error", function (event) {
        return _this.requestDidError(event);
      });
    }

    createClass(BlobRecord, [{
      key: "create",
      value: function create(callback) {
        this.callback = callback;
        this.xhr.send(JSON.stringify({
          blob: this.attributes
        }));
      }
    }, {
      key: "requestDidLoad",
      value: function requestDidLoad(event) {
        if (this.status >= 200 && this.status < 300) {
          var response = this.response;
          var direct_upload = response.direct_upload;
          delete response.direct_upload;
          this.attributes = response;
          this.directUploadData = direct_upload;
          this.callback(null, this.toJSON());
        } else {
          this.requestDidError(event);
        }
      }
    }, {
      key: "requestDidError",
      value: function requestDidError(event) {
        this.callback('Error creating Blob for "' + this.file.name + '". Status: ' + this.status);
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        var result = {};

        for (var key in this.attributes) {
          result[key] = this.attributes[key];
        }

        return result;
      }
    }, {
      key: "status",
      get: function get$$1() {
        return this.xhr.status;
      }
    }, {
      key: "response",
      get: function get$$1() {
        var _xhr = this.xhr,
            responseType = _xhr.responseType,
            response = _xhr.response;

        if (responseType == "json") {
          return response;
        } else {
          return JSON.parse(response);
        }
      }
    }]);
    return BlobRecord;
  }();

  var BlobUpload = function () {
    function BlobUpload(blob) {
      var _this = this;

      classCallCheck(this, BlobUpload);
      this.blob = blob;
      this.file = blob.file;
      var _blob$directUploadDat = blob.directUploadData,
          url = _blob$directUploadDat.url,
          headers = _blob$directUploadDat.headers;
      this.xhr = new XMLHttpRequest();
      this.xhr.open("PUT", url, true);
      this.xhr.responseType = "text";

      for (var key in headers) {
        this.xhr.setRequestHeader(key, headers[key]);
      }

      this.xhr.addEventListener("load", function (event) {
        return _this.requestDidLoad(event);
      });
      this.xhr.addEventListener("error", function (event) {
        return _this.requestDidError(event);
      });
    }

    createClass(BlobUpload, [{
      key: "create",
      value: function create(callback) {
        this.callback = callback;
        this.xhr.send(this.file.slice());
      }
    }, {
      key: "requestDidLoad",
      value: function requestDidLoad(event) {
        var _xhr = this.xhr,
            status = _xhr.status,
            response = _xhr.response;

        if (status >= 200 && status < 300) {
          this.callback(null, response);
        } else {
          this.requestDidError(event);
        }
      }
    }, {
      key: "requestDidError",
      value: function requestDidError(event) {
        this.callback('Error storing "' + this.file.name + '". Status: ' + this.xhr.status);
      }
    }]);
    return BlobUpload;
  }();

  var id = 0;

  var DirectUpload = function () {
    function DirectUpload(file, url, delegate) {
      classCallCheck(this, DirectUpload);
      this.id = ++id;
      this.file = file;
      this.url = url;
      this.delegate = delegate;
    }

    createClass(DirectUpload, [{
      key: "create",
      value: function create(callback) {
        var _this = this;

        FileChecksum.create(this.file, function (error, checksum) {
          if (error) {
            callback(error);
            return;
          }

          var blob = new BlobRecord(_this.file, checksum, _this.url);
          notify(_this.delegate, "directUploadWillCreateBlobWithXHR", blob.xhr);
          blob.create(function (error) {
            if (error) {
              callback(error);
            } else {
              var upload = new BlobUpload(blob);
              notify(_this.delegate, "directUploadWillStoreFileWithXHR", upload.xhr);
              upload.create(function (error) {
                if (error) {
                  callback(error);
                } else {
                  callback(null, blob.toJSON());
                }
              });
            }
          });
        });
      }
    }]);
    return DirectUpload;
  }();

  function notify(object, methodName) {
    if (object && typeof object[methodName] == "function") {
      for (var _len = arguments.length, messages = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        messages[_key - 2] = arguments[_key];
      }

      return object[methodName].apply(object, messages);
    }
  }

  var DirectUploadController = function () {
    function DirectUploadController(input, file) {
      classCallCheck(this, DirectUploadController);
      this.input = input;
      this.file = file;
      this.directUpload = new DirectUpload(this.file, this.url, this);
      this.dispatch("initialize");
    }

    createClass(DirectUploadController, [{
      key: "start",
      value: function start(callback) {
        var _this = this;

        var hiddenInput = document.createElement("input");
        hiddenInput.type = "hidden";
        hiddenInput.name = this.input.name;
        this.input.insertAdjacentElement("beforebegin", hiddenInput);
        this.dispatch("start");
        this.directUpload.create(function (error, attributes) {
          if (error) {
            hiddenInput.parentNode.removeChild(hiddenInput);

            _this.dispatchError(error);
          } else {
            hiddenInput.value = attributes.signed_id;
          }

          _this.dispatch("end");

          callback(error);
        });
      }
    }, {
      key: "uploadRequestDidProgress",
      value: function uploadRequestDidProgress(event) {
        var progress = event.loaded / event.total * 100;

        if (progress) {
          this.dispatch("progress", {
            progress: progress
          });
        }
      }
    }, {
      key: "dispatch",
      value: function dispatch(name) {
        var detail = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        detail.file = this.file;
        detail.id = this.directUpload.id;
        return dispatchEvent(this.input, "direct-upload:" + name, {
          detail: detail
        });
      }
    }, {
      key: "dispatchError",
      value: function dispatchError(error) {
        var event = this.dispatch("error", {
          error: error
        });

        if (!event.defaultPrevented) {
          alert(error);
        }
      }
    }, {
      key: "directUploadWillCreateBlobWithXHR",
      value: function directUploadWillCreateBlobWithXHR(xhr) {
        this.dispatch("before-blob-request", {
          xhr: xhr
        });
      }
    }, {
      key: "directUploadWillStoreFileWithXHR",
      value: function directUploadWillStoreFileWithXHR(xhr) {
        var _this2 = this;

        this.dispatch("before-storage-request", {
          xhr: xhr
        });
        xhr.upload.addEventListener("progress", function (event) {
          return _this2.uploadRequestDidProgress(event);
        });
      }
    }, {
      key: "url",
      get: function get$$1() {
        return this.input.getAttribute("data-direct-upload-url");
      }
    }]);
    return DirectUploadController;
  }();

  var inputSelector = "input[type=file][data-direct-upload-url]:not([disabled])";

  var DirectUploadsController = function () {
    function DirectUploadsController(form) {
      classCallCheck(this, DirectUploadsController);
      this.form = form;
      this.inputs = findElements(form, inputSelector).filter(function (input) {
        return input.files.length;
      });
    }

    createClass(DirectUploadsController, [{
      key: "start",
      value: function start(callback) {
        var _this = this;

        var controllers = this.createDirectUploadControllers();

        var startNextController = function startNextController() {
          var controller = controllers.shift();

          if (controller) {
            controller.start(function (error) {
              if (error) {
                callback(error);

                _this.dispatch("end");
              } else {
                startNextController();
              }
            });
          } else {
            callback();

            _this.dispatch("end");
          }
        };

        this.dispatch("start");
        startNextController();
      }
    }, {
      key: "createDirectUploadControllers",
      value: function createDirectUploadControllers() {
        var controllers = [];
        this.inputs.forEach(function (input) {
          toArray$1(input.files).forEach(function (file) {
            var controller = new DirectUploadController(input, file);
            controllers.push(controller);
          });
        });
        return controllers;
      }
    }, {
      key: "dispatch",
      value: function dispatch(name) {
        var detail = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return dispatchEvent(this.form, "direct-uploads:" + name, {
          detail: detail
        });
      }
    }]);
    return DirectUploadsController;
  }();

  var processingAttribute = "data-direct-uploads-processing";
  var submitButtonsByForm = new WeakMap();
  var started = false;

  function start() {
    if (!started) {
      started = true;
      document.addEventListener("click", didClick, true);
      document.addEventListener("submit", didSubmitForm);
      document.addEventListener("ajax:before", didSubmitRemoteElement);
    }
  }

  function didClick(event) {
    var target = event.target;

    if ((target.tagName == "INPUT" || target.tagName == "BUTTON") && target.type == "submit" && target.form) {
      submitButtonsByForm.set(target.form, target);
    }
  }

  function didSubmitForm(event) {
    handleFormSubmissionEvent(event);
  }

  function didSubmitRemoteElement(event) {
    if (event.target.tagName == "FORM") {
      handleFormSubmissionEvent(event);
    }
  }

  function handleFormSubmissionEvent(event) {
    var form = event.target;

    if (form.hasAttribute(processingAttribute)) {
      event.preventDefault();
      return;
    }

    var controller = new DirectUploadsController(form);
    var inputs = controller.inputs;

    if (inputs.length) {
      event.preventDefault();
      form.setAttribute(processingAttribute, "");
      inputs.forEach(disable);
      controller.start(function (error) {
        form.removeAttribute(processingAttribute);

        if (error) {
          inputs.forEach(enable);
        } else {
          submitForm(form);
        }
      });
    }
  }

  function submitForm(form) {
    var button = submitButtonsByForm.get(form) || findElement(form, "input[type=submit], button[type=submit]");

    if (button) {
      var _button = button,
          disabled = _button.disabled;
      button.disabled = false;
      button.focus();
      button.click();
      button.disabled = disabled;
    } else {
      button = document.createElement("input");
      button.type = "submit";
      button.style.display = "none";
      form.appendChild(button);
      button.click();
      form.removeChild(button);
    }

    submitButtonsByForm.delete(form);
  }

  function disable(input) {
    input.disabled = true;
  }

  function enable(input) {
    input.disabled = false;
  }

  function autostart() {
    if (window.ActiveStorage) {
      start();
    }
  }

  setTimeout(autostart, 1);
  exports.start = start;
  exports.DirectUpload = DirectUpload;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
});

/***/ }),

/***/ "./node_modules/@rails/ujs/lib/assets/compiled/rails-ujs.js":
/*!******************************************************************!*\
  !*** ./node_modules/@rails/ujs/lib/assets/compiled/rails-ujs.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery, module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
Unobtrusive JavaScript
https://github.com/rails/rails/blob/main/actionview/app/assets/javascripts
Released under the MIT license
 */
;
(function () {
  var context = this;
  (function () {
    (function () {
      this.Rails = {
        linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',
        buttonClickSelector: {
          selector: 'button[data-remote]:not([form]), button[data-confirm]:not([form])',
          exclude: 'form button'
        },
        inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',
        formSubmitSelector: 'form',
        formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',
        formDisableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',
        formEnableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',
        fileInputSelector: 'input[name][type=file]:not([disabled])',
        linkDisableSelector: 'a[data-disable-with], a[data-disable]',
        buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]'
      };
    }).call(this);
  }).call(context);
  var Rails = context.Rails;
  (function () {
    (function () {
      var nonce;
      nonce = null;

      Rails.loadCSPNonce = function () {
        var ref;
        return nonce = (ref = document.querySelector("meta[name=csp-nonce]")) != null ? ref.content : void 0;
      };

      Rails.cspNonce = function () {
        return nonce != null ? nonce : Rails.loadCSPNonce();
      };
    }).call(this);
    (function () {
      var expando, m;
      m = Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector;

      Rails.matches = function (element, selector) {
        if (selector.exclude != null) {
          return m.call(element, selector.selector) && !m.call(element, selector.exclude);
        } else {
          return m.call(element, selector);
        }
      };

      expando = '_ujsData';

      Rails.getData = function (element, key) {
        var ref;
        return (ref = element[expando]) != null ? ref[key] : void 0;
      };

      Rails.setData = function (element, key, value) {
        if (element[expando] == null) {
          element[expando] = {};
        }

        return element[expando][key] = value;
      };

      Rails.$ = function (selector) {
        return Array.prototype.slice.call(document.querySelectorAll(selector));
      };
    }).call(this);
    (function () {
      var $, csrfParam, csrfToken;
      $ = Rails.$;

      csrfToken = Rails.csrfToken = function () {
        var meta;
        meta = document.querySelector('meta[name=csrf-token]');
        return meta && meta.content;
      };

      csrfParam = Rails.csrfParam = function () {
        var meta;
        meta = document.querySelector('meta[name=csrf-param]');
        return meta && meta.content;
      };

      Rails.CSRFProtection = function (xhr) {
        var token;
        token = csrfToken();

        if (token != null) {
          return xhr.setRequestHeader('X-CSRF-Token', token);
        }
      };

      Rails.refreshCSRFTokens = function () {
        var param, token;
        token = csrfToken();
        param = csrfParam();

        if (token != null && param != null) {
          return $('form input[name="' + param + '"]').forEach(function (input) {
            return input.value = token;
          });
        }
      };
    }).call(this);
    (function () {
      var CustomEvent, fire, matches, preventDefault;
      matches = Rails.matches;
      CustomEvent = window.CustomEvent;

      if (typeof CustomEvent !== 'function') {
        CustomEvent = function CustomEvent(event, params) {
          var evt;
          evt = document.createEvent('CustomEvent');
          evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
          return evt;
        };

        CustomEvent.prototype = window.Event.prototype;
        preventDefault = CustomEvent.prototype.preventDefault;

        CustomEvent.prototype.preventDefault = function () {
          var result;
          result = preventDefault.call(this);

          if (this.cancelable && !this.defaultPrevented) {
            Object.defineProperty(this, 'defaultPrevented', {
              get: function get() {
                return true;
              }
            });
          }

          return result;
        };
      }

      fire = Rails.fire = function (obj, name, data) {
        var event;
        event = new CustomEvent(name, {
          bubbles: true,
          cancelable: true,
          detail: data
        });
        obj.dispatchEvent(event);
        return !event.defaultPrevented;
      };

      Rails.stopEverything = function (e) {
        fire(e.target, 'ujs:everythingStopped');
        e.preventDefault();
        e.stopPropagation();
        return e.stopImmediatePropagation();
      };

      Rails.delegate = function (element, selector, eventType, handler) {
        return element.addEventListener(eventType, function (e) {
          var target;
          target = e.target;

          while (!(!(target instanceof Element) || matches(target, selector))) {
            target = target.parentNode;
          }

          if (target instanceof Element && handler.call(target, e) === false) {
            e.preventDefault();
            return e.stopPropagation();
          }
        });
      };
    }).call(this);
    (function () {
      var AcceptHeaders, CSRFProtection, createXHR, cspNonce, fire, prepareOptions, processResponse;
      cspNonce = Rails.cspNonce, CSRFProtection = Rails.CSRFProtection, fire = Rails.fire;
      AcceptHeaders = {
        '*': '*/*',
        text: 'text/plain',
        html: 'text/html',
        xml: 'application/xml, text/xml',
        json: 'application/json, text/javascript',
        script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript'
      };

      Rails.ajax = function (options) {
        var xhr;
        options = prepareOptions(options);
        xhr = createXHR(options, function () {
          var ref, response;
          response = processResponse((ref = xhr.response) != null ? ref : xhr.responseText, xhr.getResponseHeader('Content-Type'));

          if (Math.floor(xhr.status / 100) === 2) {
            if (typeof options.success === "function") {
              options.success(response, xhr.statusText, xhr);
            }
          } else {
            if (typeof options.error === "function") {
              options.error(response, xhr.statusText, xhr);
            }
          }

          return typeof options.complete === "function" ? options.complete(xhr, xhr.statusText) : void 0;
        });

        if (options.beforeSend != null && !options.beforeSend(xhr, options)) {
          return false;
        }

        if (xhr.readyState === XMLHttpRequest.OPENED) {
          return xhr.send(options.data);
        }
      };

      prepareOptions = function prepareOptions(options) {
        options.url = options.url || location.href;
        options.type = options.type.toUpperCase();

        if (options.type === 'GET' && options.data) {
          if (options.url.indexOf('?') < 0) {
            options.url += '?' + options.data;
          } else {
            options.url += '&' + options.data;
          }
        }

        if (AcceptHeaders[options.dataType] == null) {
          options.dataType = '*';
        }

        options.accept = AcceptHeaders[options.dataType];

        if (options.dataType !== '*') {
          options.accept += ', */*; q=0.01';
        }

        return options;
      };

      createXHR = function createXHR(options, done) {
        var xhr;
        xhr = new XMLHttpRequest();
        xhr.open(options.type, options.url, true);
        xhr.setRequestHeader('Accept', options.accept);

        if (typeof options.data === 'string') {
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        }

        if (!options.crossDomain) {
          xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
          CSRFProtection(xhr);
        }

        xhr.withCredentials = !!options.withCredentials;

        xhr.onreadystatechange = function () {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            return done(xhr);
          }
        };

        return xhr;
      };

      processResponse = function processResponse(response, type) {
        var parser, script;

        if (typeof response === 'string' && typeof type === 'string') {
          if (type.match(/\bjson\b/)) {
            try {
              response = JSON.parse(response);
            } catch (error) {}
          } else if (type.match(/\b(?:java|ecma)script\b/)) {
            script = document.createElement('script');
            script.setAttribute('nonce', cspNonce());
            script.text = response;
            document.head.appendChild(script).parentNode.removeChild(script);
          } else if (type.match(/\b(xml|html|svg)\b/)) {
            parser = new DOMParser();
            type = type.replace(/;.+/, '');

            try {
              response = parser.parseFromString(response, type);
            } catch (error) {}
          }
        }

        return response;
      };

      Rails.href = function (element) {
        return element.href;
      };

      Rails.isCrossDomain = function (url) {
        var e, originAnchor, urlAnchor;
        originAnchor = document.createElement('a');
        originAnchor.href = location.href;
        urlAnchor = document.createElement('a');

        try {
          urlAnchor.href = url;
          return !((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host || originAnchor.protocol + '//' + originAnchor.host === urlAnchor.protocol + '//' + urlAnchor.host);
        } catch (error) {
          e = error;
          return true;
        }
      };
    }).call(this);
    (function () {
      var matches, toArray;
      matches = Rails.matches;

      toArray = function toArray(e) {
        return Array.prototype.slice.call(e);
      };

      Rails.serializeElement = function (element, additionalParam) {
        var inputs, params;
        inputs = [element];

        if (matches(element, 'form')) {
          inputs = toArray(element.elements);
        }

        params = [];
        inputs.forEach(function (input) {
          if (!input.name || input.disabled) {
            return;
          }

          if (matches(input, 'fieldset[disabled] *')) {
            return;
          }

          if (matches(input, 'select')) {
            return toArray(input.options).forEach(function (option) {
              if (option.selected) {
                return params.push({
                  name: input.name,
                  value: option.value
                });
              }
            });
          } else if (input.checked || ['radio', 'checkbox', 'submit'].indexOf(input.type) === -1) {
            return params.push({
              name: input.name,
              value: input.value
            });
          }
        });

        if (additionalParam) {
          params.push(additionalParam);
        }

        return params.map(function (param) {
          if (param.name != null) {
            return encodeURIComponent(param.name) + "=" + encodeURIComponent(param.value);
          } else {
            return param;
          }
        }).join('&');
      };

      Rails.formElements = function (form, selector) {
        if (matches(form, 'form')) {
          return toArray(form.elements).filter(function (el) {
            return matches(el, selector);
          });
        } else {
          return toArray(form.querySelectorAll(selector));
        }
      };
    }).call(this);
    (function () {
      var allowAction, fire, stopEverything;
      fire = Rails.fire, stopEverything = Rails.stopEverything;

      Rails.handleConfirm = function (e) {
        if (!allowAction(this)) {
          return stopEverything(e);
        }
      };

      Rails.confirm = function (message, element) {
        return confirm(message);
      };

      allowAction = function allowAction(element) {
        var answer, callback, message;
        message = element.getAttribute('data-confirm');

        if (!message) {
          return true;
        }

        answer = false;

        if (fire(element, 'confirm')) {
          try {
            answer = Rails.confirm(message, element);
          } catch (error) {}

          callback = fire(element, 'confirm:complete', [answer]);
        }

        return answer && callback;
      };
    }).call(this);
    (function () {
      var disableFormElement, disableFormElements, disableLinkElement, enableFormElement, enableFormElements, enableLinkElement, formElements, getData, isXhrRedirect, matches, setData, stopEverything;
      matches = Rails.matches, getData = Rails.getData, setData = Rails.setData, stopEverything = Rails.stopEverything, formElements = Rails.formElements;

      Rails.handleDisabledElement = function (e) {
        var element;
        element = this;

        if (element.disabled) {
          return stopEverything(e);
        }
      };

      Rails.enableElement = function (e) {
        var element;

        if (e instanceof Event) {
          if (isXhrRedirect(e)) {
            return;
          }

          element = e.target;
        } else {
          element = e;
        }

        if (matches(element, Rails.linkDisableSelector)) {
          return enableLinkElement(element);
        } else if (matches(element, Rails.buttonDisableSelector) || matches(element, Rails.formEnableSelector)) {
          return enableFormElement(element);
        } else if (matches(element, Rails.formSubmitSelector)) {
          return enableFormElements(element);
        }
      };

      Rails.disableElement = function (e) {
        var element;
        element = e instanceof Event ? e.target : e;

        if (matches(element, Rails.linkDisableSelector)) {
          return disableLinkElement(element);
        } else if (matches(element, Rails.buttonDisableSelector) || matches(element, Rails.formDisableSelector)) {
          return disableFormElement(element);
        } else if (matches(element, Rails.formSubmitSelector)) {
          return disableFormElements(element);
        }
      };

      disableLinkElement = function disableLinkElement(element) {
        var replacement;

        if (getData(element, 'ujs:disabled')) {
          return;
        }

        replacement = element.getAttribute('data-disable-with');

        if (replacement != null) {
          setData(element, 'ujs:enable-with', element.innerHTML);
          element.innerHTML = replacement;
        }

        element.addEventListener('click', stopEverything);
        return setData(element, 'ujs:disabled', true);
      };

      enableLinkElement = function enableLinkElement(element) {
        var originalText;
        originalText = getData(element, 'ujs:enable-with');

        if (originalText != null) {
          element.innerHTML = originalText;
          setData(element, 'ujs:enable-with', null);
        }

        element.removeEventListener('click', stopEverything);
        return setData(element, 'ujs:disabled', null);
      };

      disableFormElements = function disableFormElements(form) {
        return formElements(form, Rails.formDisableSelector).forEach(disableFormElement);
      };

      disableFormElement = function disableFormElement(element) {
        var replacement;

        if (getData(element, 'ujs:disabled')) {
          return;
        }

        replacement = element.getAttribute('data-disable-with');

        if (replacement != null) {
          if (matches(element, 'button')) {
            setData(element, 'ujs:enable-with', element.innerHTML);
            element.innerHTML = replacement;
          } else {
            setData(element, 'ujs:enable-with', element.value);
            element.value = replacement;
          }
        }

        element.disabled = true;
        return setData(element, 'ujs:disabled', true);
      };

      enableFormElements = function enableFormElements(form) {
        return formElements(form, Rails.formEnableSelector).forEach(enableFormElement);
      };

      enableFormElement = function enableFormElement(element) {
        var originalText;
        originalText = getData(element, 'ujs:enable-with');

        if (originalText != null) {
          if (matches(element, 'button')) {
            element.innerHTML = originalText;
          } else {
            element.value = originalText;
          }

          setData(element, 'ujs:enable-with', null);
        }

        element.disabled = false;
        return setData(element, 'ujs:disabled', null);
      };

      isXhrRedirect = function isXhrRedirect(event) {
        var ref, xhr;
        xhr = (ref = event.detail) != null ? ref[0] : void 0;
        return (xhr != null ? xhr.getResponseHeader("X-Xhr-Redirect") : void 0) != null;
      };
    }).call(this);
    (function () {
      var stopEverything;
      stopEverything = Rails.stopEverything;

      Rails.handleMethod = function (e) {
        var csrfParam, csrfToken, form, formContent, href, link, method;
        link = this;
        method = link.getAttribute('data-method');

        if (!method) {
          return;
        }

        href = Rails.href(link);
        csrfToken = Rails.csrfToken();
        csrfParam = Rails.csrfParam();
        form = document.createElement('form');
        formContent = "<input name='_method' value='" + method + "' type='hidden' />";

        if (csrfParam != null && csrfToken != null && !Rails.isCrossDomain(href)) {
          formContent += "<input name='" + csrfParam + "' value='" + csrfToken + "' type='hidden' />";
        }

        formContent += '<input type="submit" />';
        form.method = 'post';
        form.action = href;
        form.target = link.target;
        form.innerHTML = formContent;
        form.style.display = 'none';
        document.body.appendChild(form);
        form.querySelector('[type="submit"]').click();
        return stopEverything(e);
      };
    }).call(this);
    (function () {
      var ajax,
          fire,
          getData,
          isCrossDomain,
          isRemote,
          matches,
          serializeElement,
          setData,
          stopEverything,
          slice = [].slice;
      matches = Rails.matches, getData = Rails.getData, setData = Rails.setData, fire = Rails.fire, stopEverything = Rails.stopEverything, ajax = Rails.ajax, isCrossDomain = Rails.isCrossDomain, serializeElement = Rails.serializeElement;

      isRemote = function isRemote(element) {
        var value;
        value = element.getAttribute('data-remote');
        return value != null && value !== 'false';
      };

      Rails.handleRemote = function (e) {
        var button, data, dataType, element, method, url, withCredentials;
        element = this;

        if (!isRemote(element)) {
          return true;
        }

        if (!fire(element, 'ajax:before')) {
          fire(element, 'ajax:stopped');
          return false;
        }

        withCredentials = element.getAttribute('data-with-credentials');
        dataType = element.getAttribute('data-type') || 'script';

        if (matches(element, Rails.formSubmitSelector)) {
          button = getData(element, 'ujs:submit-button');
          method = getData(element, 'ujs:submit-button-formmethod') || element.method;
          url = getData(element, 'ujs:submit-button-formaction') || element.getAttribute('action') || location.href;

          if (method.toUpperCase() === 'GET') {
            url = url.replace(/\?.*$/, '');
          }

          if (element.enctype === 'multipart/form-data') {
            data = new FormData(element);

            if (button != null) {
              data.append(button.name, button.value);
            }
          } else {
            data = serializeElement(element, button);
          }

          setData(element, 'ujs:submit-button', null);
          setData(element, 'ujs:submit-button-formmethod', null);
          setData(element, 'ujs:submit-button-formaction', null);
        } else if (matches(element, Rails.buttonClickSelector) || matches(element, Rails.inputChangeSelector)) {
          method = element.getAttribute('data-method');
          url = element.getAttribute('data-url');
          data = serializeElement(element, element.getAttribute('data-params'));
        } else {
          method = element.getAttribute('data-method');
          url = Rails.href(element);
          data = element.getAttribute('data-params');
        }

        ajax({
          type: method || 'GET',
          url: url,
          data: data,
          dataType: dataType,
          beforeSend: function beforeSend(xhr, options) {
            if (fire(element, 'ajax:beforeSend', [xhr, options])) {
              return fire(element, 'ajax:send', [xhr]);
            } else {
              fire(element, 'ajax:stopped');
              return false;
            }
          },
          success: function success() {
            var args;
            args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return fire(element, 'ajax:success', args);
          },
          error: function error() {
            var args;
            args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return fire(element, 'ajax:error', args);
          },
          complete: function complete() {
            var args;
            args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return fire(element, 'ajax:complete', args);
          },
          crossDomain: isCrossDomain(url),
          withCredentials: withCredentials != null && withCredentials !== 'false'
        });
        return stopEverything(e);
      };

      Rails.formSubmitButtonClick = function (e) {
        var button, form;
        button = this;
        form = button.form;

        if (!form) {
          return;
        }

        if (button.name) {
          setData(form, 'ujs:submit-button', {
            name: button.name,
            value: button.value
          });
        }

        setData(form, 'ujs:formnovalidate-button', button.formNoValidate);
        setData(form, 'ujs:submit-button-formaction', button.getAttribute('formaction'));
        return setData(form, 'ujs:submit-button-formmethod', button.getAttribute('formmethod'));
      };

      Rails.preventInsignificantClick = function (e) {
        var data, insignificantMetaClick, link, metaClick, method, nonPrimaryMouseClick;
        link = this;
        method = (link.getAttribute('data-method') || 'GET').toUpperCase();
        data = link.getAttribute('data-params');
        metaClick = e.metaKey || e.ctrlKey;
        insignificantMetaClick = metaClick && method === 'GET' && !data;
        nonPrimaryMouseClick = e.button != null && e.button !== 0;

        if (nonPrimaryMouseClick || insignificantMetaClick) {
          return e.stopImmediatePropagation();
        }
      };
    }).call(this);
    (function () {
      var $, CSRFProtection, delegate, disableElement, enableElement, fire, formSubmitButtonClick, getData, handleConfirm, handleDisabledElement, handleMethod, handleRemote, loadCSPNonce, preventInsignificantClick, refreshCSRFTokens;
      fire = Rails.fire, delegate = Rails.delegate, getData = Rails.getData, $ = Rails.$, refreshCSRFTokens = Rails.refreshCSRFTokens, CSRFProtection = Rails.CSRFProtection, loadCSPNonce = Rails.loadCSPNonce, enableElement = Rails.enableElement, disableElement = Rails.disableElement, handleDisabledElement = Rails.handleDisabledElement, handleConfirm = Rails.handleConfirm, preventInsignificantClick = Rails.preventInsignificantClick, handleRemote = Rails.handleRemote, formSubmitButtonClick = Rails.formSubmitButtonClick, handleMethod = Rails.handleMethod;

      if (typeof jQuery !== "undefined" && jQuery !== null && jQuery.ajax != null) {
        if (jQuery.rails) {
          throw new Error('If you load both jquery_ujs and rails-ujs, use rails-ujs only.');
        }

        jQuery.rails = Rails;
        jQuery.ajaxPrefilter(function (options, originalOptions, xhr) {
          if (!options.crossDomain) {
            return CSRFProtection(xhr);
          }
        });
      }

      Rails.start = function () {
        if (window._rails_loaded) {
          throw new Error('rails-ujs has already been loaded!');
        }

        window.addEventListener('pageshow', function () {
          $(Rails.formEnableSelector).forEach(function (el) {
            if (getData(el, 'ujs:disabled')) {
              return enableElement(el);
            }
          });
          return $(Rails.linkDisableSelector).forEach(function (el) {
            if (getData(el, 'ujs:disabled')) {
              return enableElement(el);
            }
          });
        });
        delegate(document, Rails.linkDisableSelector, 'ajax:complete', enableElement);
        delegate(document, Rails.linkDisableSelector, 'ajax:stopped', enableElement);
        delegate(document, Rails.buttonDisableSelector, 'ajax:complete', enableElement);
        delegate(document, Rails.buttonDisableSelector, 'ajax:stopped', enableElement);
        delegate(document, Rails.linkClickSelector, 'click', preventInsignificantClick);
        delegate(document, Rails.linkClickSelector, 'click', handleDisabledElement);
        delegate(document, Rails.linkClickSelector, 'click', handleConfirm);
        delegate(document, Rails.linkClickSelector, 'click', disableElement);
        delegate(document, Rails.linkClickSelector, 'click', handleRemote);
        delegate(document, Rails.linkClickSelector, 'click', handleMethod);
        delegate(document, Rails.buttonClickSelector, 'click', preventInsignificantClick);
        delegate(document, Rails.buttonClickSelector, 'click', handleDisabledElement);
        delegate(document, Rails.buttonClickSelector, 'click', handleConfirm);
        delegate(document, Rails.buttonClickSelector, 'click', disableElement);
        delegate(document, Rails.buttonClickSelector, 'click', handleRemote);
        delegate(document, Rails.inputChangeSelector, 'change', handleDisabledElement);
        delegate(document, Rails.inputChangeSelector, 'change', handleConfirm);
        delegate(document, Rails.inputChangeSelector, 'change', handleRemote);
        delegate(document, Rails.formSubmitSelector, 'submit', handleDisabledElement);
        delegate(document, Rails.formSubmitSelector, 'submit', handleConfirm);
        delegate(document, Rails.formSubmitSelector, 'submit', handleRemote);
        delegate(document, Rails.formSubmitSelector, 'submit', function (e) {
          return setTimeout(function () {
            return disableElement(e);
          }, 13);
        });
        delegate(document, Rails.formSubmitSelector, 'ajax:send', disableElement);
        delegate(document, Rails.formSubmitSelector, 'ajax:complete', enableElement);
        delegate(document, Rails.formInputClickSelector, 'click', preventInsignificantClick);
        delegate(document, Rails.formInputClickSelector, 'click', handleDisabledElement);
        delegate(document, Rails.formInputClickSelector, 'click', handleConfirm);
        delegate(document, Rails.formInputClickSelector, 'click', formSubmitButtonClick);
        document.addEventListener('DOMContentLoaded', refreshCSRFTokens);
        document.addEventListener('DOMContentLoaded', loadCSPNonce);
        return window._rails_loaded = true;
      };

      if (window.Rails === Rails && fire(document, 'rails:attachBindings')) {
        Rails.start();
      }
    }).call(this);
  }).call(this);

  if (( false ? undefined : _typeof(module)) === "object" && module.exports) {
    module.exports = Rails;
  } else if (true) {
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (Rails),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
}).call(this);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js"), __webpack_require__(/*! ./../../../../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/bootstrap/dist/js/bootstrap.esm.js":
/*!*********************************************************!*\
  !*** ./node_modules/bootstrap/dist/js/bootstrap.esm.js ***!
  \*********************************************************/
/*! exports provided: Alert, Button, Carousel, Collapse, Dropdown, Modal, Offcanvas, Popover, ScrollSpy, Tab, Toast, Tooltip */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Alert", function() { return Alert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Button", function() { return Button; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Carousel", function() { return Carousel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Collapse", function() { return Collapse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Dropdown", function() { return Dropdown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Modal", function() { return Modal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Offcanvas", function() { return Offcanvas; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Popover", function() { return Popover; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScrollSpy", function() { return ScrollSpy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tab", function() { return Tab; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Toast", function() { return Toast; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tooltip", function() { return Tooltip; });
/* harmony import */ var _popperjs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @popperjs/core */ "./node_modules/@popperjs/core/lib/index.js");
var _KEY_TO_DIRECTION;

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/*!
  * Bootstrap v5.0.2 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.2): dom/selector-engine.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

var NODE_TEXT = 3;
var SelectorEngine = {
  find: function find(selector) {
    var _ref;

    var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.documentElement;
    return (_ref = []).concat.apply(_ref, _toConsumableArray(Element.prototype.querySelectorAll.call(element, selector)));
  },
  findOne: function findOne(selector) {
    var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.documentElement;
    return Element.prototype.querySelector.call(element, selector);
  },
  children: function children(element, selector) {
    var _ref2;

    return (_ref2 = []).concat.apply(_ref2, _toConsumableArray(element.children)).filter(function (child) {
      return child.matches(selector);
    });
  },
  parents: function parents(element, selector) {
    var parents = [];
    var ancestor = element.parentNode;

    while (ancestor && ancestor.nodeType === Node.ELEMENT_NODE && ancestor.nodeType !== NODE_TEXT) {
      if (ancestor.matches(selector)) {
        parents.push(ancestor);
      }

      ancestor = ancestor.parentNode;
    }

    return parents;
  },
  prev: function prev(element, selector) {
    var previous = element.previousElementSibling;

    while (previous) {
      if (previous.matches(selector)) {
        return [previous];
      }

      previous = previous.previousElementSibling;
    }

    return [];
  },
  next: function next(element, selector) {
    var next = element.nextElementSibling;

    while (next) {
      if (next.matches(selector)) {
        return [next];
      }

      next = next.nextElementSibling;
    }

    return [];
  }
};
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.2): util/index.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

var MAX_UID = 1000000;
var MILLISECONDS_MULTIPLIER = 1000;
var TRANSITION_END = 'transitionend'; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

var toType = function toType(obj) {
  if (obj === null || obj === undefined) {
    return "".concat(obj);
  }

  return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
};
/**
 * --------------------------------------------------------------------------
 * Public Util Api
 * --------------------------------------------------------------------------
 */


var getUID = function getUID(prefix) {
  do {
    prefix += Math.floor(Math.random() * MAX_UID);
  } while (document.getElementById(prefix));

  return prefix;
};

var getSelector = function getSelector(element) {
  var selector = element.getAttribute('data-bs-target');

  if (!selector || selector === '#') {
    var hrefAttr = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
    // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
    // `document.querySelector` will rightfully complain it is invalid.
    // See https://github.com/twbs/bootstrap/issues/32273

    if (!hrefAttr || !hrefAttr.includes('#') && !hrefAttr.startsWith('.')) {
      return null;
    } // Just in case some CMS puts out a full URL with the anchor appended


    if (hrefAttr.includes('#') && !hrefAttr.startsWith('#')) {
      hrefAttr = "#".concat(hrefAttr.split('#')[1]);
    }

    selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
  }

  return selector;
};

var getSelectorFromElement = function getSelectorFromElement(element) {
  var selector = getSelector(element);

  if (selector) {
    return document.querySelector(selector) ? selector : null;
  }

  return null;
};

var getElementFromSelector = function getElementFromSelector(element) {
  var selector = getSelector(element);
  return selector ? document.querySelector(selector) : null;
};

var getTransitionDurationFromElement = function getTransitionDurationFromElement(element) {
  if (!element) {
    return 0;
  } // Get transition-duration of the element


  var _window$getComputedSt = window.getComputedStyle(element),
      transitionDuration = _window$getComputedSt.transitionDuration,
      transitionDelay = _window$getComputedSt.transitionDelay;

  var floatTransitionDuration = Number.parseFloat(transitionDuration);
  var floatTransitionDelay = Number.parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

  if (!floatTransitionDuration && !floatTransitionDelay) {
    return 0;
  } // If multiple durations are defined, take the first


  transitionDuration = transitionDuration.split(',')[0];
  transitionDelay = transitionDelay.split(',')[0];
  return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
};

var triggerTransitionEnd = function triggerTransitionEnd(element) {
  element.dispatchEvent(new Event(TRANSITION_END));
};

var isElement = function isElement(obj) {
  if (!obj || _typeof(obj) !== 'object') {
    return false;
  }

  if (typeof obj.jquery !== 'undefined') {
    obj = obj[0];
  }

  return typeof obj.nodeType !== 'undefined';
};

var getElement = function getElement(obj) {
  if (isElement(obj)) {
    // it's a jQuery object or a node element
    return obj.jquery ? obj[0] : obj;
  }

  if (typeof obj === 'string' && obj.length > 0) {
    return SelectorEngine.findOne(obj);
  }

  return null;
};

var typeCheckConfig = function typeCheckConfig(componentName, config, configTypes) {
  Object.keys(configTypes).forEach(function (property) {
    var expectedTypes = configTypes[property];
    var value = config[property];
    var valueType = value && isElement(value) ? 'element' : toType(value);

    if (!new RegExp(expectedTypes).test(valueType)) {
      throw new TypeError("".concat(componentName.toUpperCase(), ": Option \"").concat(property, "\" provided type \"").concat(valueType, "\" but expected type \"").concat(expectedTypes, "\"."));
    }
  });
};

var isVisible = function isVisible(element) {
  if (!isElement(element) || element.getClientRects().length === 0) {
    return false;
  }

  return getComputedStyle(element).getPropertyValue('visibility') === 'visible';
};

var isDisabled = function isDisabled(element) {
  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    return true;
  }

  if (element.classList.contains('disabled')) {
    return true;
  }

  if (typeof element.disabled !== 'undefined') {
    return element.disabled;
  }

  return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
};

var findShadowRoot = function findShadowRoot(element) {
  if (!document.documentElement.attachShadow) {
    return null;
  } // Can find the shadow root otherwise it'll return the document


  if (typeof element.getRootNode === 'function') {
    var root = element.getRootNode();
    return root instanceof ShadowRoot ? root : null;
  }

  if (element instanceof ShadowRoot) {
    return element;
  } // when we don't find a shadow root


  if (!element.parentNode) {
    return null;
  }

  return findShadowRoot(element.parentNode);
};

var noop = function noop() {};

var reflow = function reflow(element) {
  return element.offsetHeight;
};

var getjQuery = function getjQuery() {
  var _window = window,
      jQuery = _window.jQuery;

  if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
    return jQuery;
  }

  return null;
};

var DOMContentLoadedCallbacks = [];

var onDOMContentLoaded = function onDOMContentLoaded(callback) {
  if (document.readyState === 'loading') {
    // add listener on the first call when the document is in loading state
    if (!DOMContentLoadedCallbacks.length) {
      document.addEventListener('DOMContentLoaded', function () {
        DOMContentLoadedCallbacks.forEach(function (callback) {
          return callback();
        });
      });
    }

    DOMContentLoadedCallbacks.push(callback);
  } else {
    callback();
  }
};

var isRTL = function isRTL() {
  return document.documentElement.dir === 'rtl';
};

var defineJQueryPlugin = function defineJQueryPlugin(plugin) {
  onDOMContentLoaded(function () {
    var $ = getjQuery();
    /* istanbul ignore if */

    if ($) {
      var name = plugin.NAME;
      var JQUERY_NO_CONFLICT = $.fn[name];
      $.fn[name] = plugin.jQueryInterface;
      $.fn[name].Constructor = plugin;

      $.fn[name].noConflict = function () {
        $.fn[name] = JQUERY_NO_CONFLICT;
        return plugin.jQueryInterface;
      };
    }
  });
};

var execute = function execute(callback) {
  if (typeof callback === 'function') {
    callback();
  }
};

var executeAfterTransition = function executeAfterTransition(callback, transitionElement) {
  var waitForTransition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  if (!waitForTransition) {
    execute(callback);
    return;
  }

  var durationPadding = 5;
  var emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
  var called = false;

  var handler = function handler(_ref3) {
    var target = _ref3.target;

    if (target !== transitionElement) {
      return;
    }

    called = true;
    transitionElement.removeEventListener(TRANSITION_END, handler);
    execute(callback);
  };

  transitionElement.addEventListener(TRANSITION_END, handler);
  setTimeout(function () {
    if (!called) {
      triggerTransitionEnd(transitionElement);
    }
  }, emulatedDuration);
};
/**
 * Return the previous/next element of a list.
 *
 * @param {array} list    The list of elements
 * @param activeElement   The active element
 * @param shouldGetNext   Choose to get next or previous element
 * @param isCycleAllowed
 * @return {Element|elem} The proper element
 */


var getNextActiveElement = function getNextActiveElement(list, activeElement, shouldGetNext, isCycleAllowed) {
  var index = list.indexOf(activeElement); // if the element does not exist in the list return an element depending on the direction and if cycle is allowed

  if (index === -1) {
    return list[!shouldGetNext && isCycleAllowed ? list.length - 1 : 0];
  }

  var listLength = list.length;
  index += shouldGetNext ? 1 : -1;

  if (isCycleAllowed) {
    index = (index + listLength) % listLength;
  }

  return list[Math.max(0, Math.min(index, listLength - 1))];
};
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.2): dom/event-handler.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */


var namespaceRegex = /[^.]*(?=\..*)\.|.*/;
var stripNameRegex = /\..*/;
var stripUidRegex = /::\d+$/;
var eventRegistry = {}; // Events storage

var uidEvent = 1;
var customEvents = {
  mouseenter: 'mouseover',
  mouseleave: 'mouseout'
};
var customEventsRegex = /^(mouseenter|mouseleave)/i;
var nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);
/**
 * ------------------------------------------------------------------------
 * Private methods
 * ------------------------------------------------------------------------
 */

function getUidEvent(element, uid) {
  return uid && "".concat(uid, "::").concat(uidEvent++) || element.uidEvent || uidEvent++;
}

function getEvent(element) {
  var uid = getUidEvent(element);
  element.uidEvent = uid;
  eventRegistry[uid] = eventRegistry[uid] || {};
  return eventRegistry[uid];
}

function bootstrapHandler(element, fn) {
  return function handler(event) {
    event.delegateTarget = element;

    if (handler.oneOff) {
      EventHandler.off(element, event.type, fn);
    }

    return fn.apply(element, [event]);
  };
}

function bootstrapDelegationHandler(element, selector, fn) {
  return function handler(event) {
    var domElements = element.querySelectorAll(selector);

    for (var target = event.target; target && target !== this; target = target.parentNode) {
      for (var i = domElements.length; i--;) {
        if (domElements[i] === target) {
          event.delegateTarget = target;

          if (handler.oneOff) {
            // eslint-disable-next-line unicorn/consistent-destructuring
            EventHandler.off(element, event.type, selector, fn);
          }

          return fn.apply(target, [event]);
        }
      }
    } // To please ESLint


    return null;
  };
}

function findHandler(events, handler) {
  var delegationSelector = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var uidEventList = Object.keys(events);

  for (var i = 0, len = uidEventList.length; i < len; i++) {
    var event = events[uidEventList[i]];

    if (event.originalHandler === handler && event.delegationSelector === delegationSelector) {
      return event;
    }
  }

  return null;
}

function normalizeParams(originalTypeEvent, handler, delegationFn) {
  var delegation = typeof handler === 'string';
  var originalHandler = delegation ? delegationFn : handler;
  var typeEvent = getTypeEvent(originalTypeEvent);
  var isNative = nativeEvents.has(typeEvent);

  if (!isNative) {
    typeEvent = originalTypeEvent;
  }

  return [delegation, originalHandler, typeEvent];
}

function addHandler(element, originalTypeEvent, handler, delegationFn, oneOff) {
  if (typeof originalTypeEvent !== 'string' || !element) {
    return;
  }

  if (!handler) {
    handler = delegationFn;
    delegationFn = null;
  } // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
  // this prevents the handler from being dispatched the same way as mouseover or mouseout does


  if (customEventsRegex.test(originalTypeEvent)) {
    var wrapFn = function wrapFn(fn) {
      return function (event) {
        if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
          return fn.call(this, event);
        }
      };
    };

    if (delegationFn) {
      delegationFn = wrapFn(delegationFn);
    } else {
      handler = wrapFn(handler);
    }
  }

  var _normalizeParams = normalizeParams(originalTypeEvent, handler, delegationFn),
      _normalizeParams2 = _slicedToArray(_normalizeParams, 3),
      delegation = _normalizeParams2[0],
      originalHandler = _normalizeParams2[1],
      typeEvent = _normalizeParams2[2];

  var events = getEvent(element);
  var handlers = events[typeEvent] || (events[typeEvent] = {});
  var previousFn = findHandler(handlers, originalHandler, delegation ? handler : null);

  if (previousFn) {
    previousFn.oneOff = previousFn.oneOff && oneOff;
    return;
  }

  var uid = getUidEvent(originalHandler, originalTypeEvent.replace(namespaceRegex, ''));
  var fn = delegation ? bootstrapDelegationHandler(element, handler, delegationFn) : bootstrapHandler(element, handler);
  fn.delegationSelector = delegation ? handler : null;
  fn.originalHandler = originalHandler;
  fn.oneOff = oneOff;
  fn.uidEvent = uid;
  handlers[uid] = fn;
  element.addEventListener(typeEvent, fn, delegation);
}

function removeHandler(element, events, typeEvent, handler, delegationSelector) {
  var fn = findHandler(events[typeEvent], handler, delegationSelector);

  if (!fn) {
    return;
  }

  element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
  delete events[typeEvent][fn.uidEvent];
}

function removeNamespacedHandlers(element, events, typeEvent, namespace) {
  var storeElementEvent = events[typeEvent] || {};
  Object.keys(storeElementEvent).forEach(function (handlerKey) {
    if (handlerKey.includes(namespace)) {
      var event = storeElementEvent[handlerKey];
      removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
    }
  });
}

function getTypeEvent(event) {
  // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
  event = event.replace(stripNameRegex, '');
  return customEvents[event] || event;
}

var EventHandler = {
  on: function on(element, event, handler, delegationFn) {
    addHandler(element, event, handler, delegationFn, false);
  },
  one: function one(element, event, handler, delegationFn) {
    addHandler(element, event, handler, delegationFn, true);
  },
  off: function off(element, originalTypeEvent, handler, delegationFn) {
    if (typeof originalTypeEvent !== 'string' || !element) {
      return;
    }

    var _normalizeParams3 = normalizeParams(originalTypeEvent, handler, delegationFn),
        _normalizeParams4 = _slicedToArray(_normalizeParams3, 3),
        delegation = _normalizeParams4[0],
        originalHandler = _normalizeParams4[1],
        typeEvent = _normalizeParams4[2];

    var inNamespace = typeEvent !== originalTypeEvent;
    var events = getEvent(element);
    var isNamespace = originalTypeEvent.startsWith('.');

    if (typeof originalHandler !== 'undefined') {
      // Simplest case: handler is passed, remove that listener ONLY.
      if (!events || !events[typeEvent]) {
        return;
      }

      removeHandler(element, events, typeEvent, originalHandler, delegation ? handler : null);
      return;
    }

    if (isNamespace) {
      Object.keys(events).forEach(function (elementEvent) {
        removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
      });
    }

    var storeElementEvent = events[typeEvent] || {};
    Object.keys(storeElementEvent).forEach(function (keyHandlers) {
      var handlerKey = keyHandlers.replace(stripUidRegex, '');

      if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
        var event = storeElementEvent[keyHandlers];
        removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
      }
    });
  },
  trigger: function trigger(element, event, args) {
    if (typeof event !== 'string' || !element) {
      return null;
    }

    var $ = getjQuery();
    var typeEvent = getTypeEvent(event);
    var inNamespace = event !== typeEvent;
    var isNative = nativeEvents.has(typeEvent);
    var jQueryEvent;
    var bubbles = true;
    var nativeDispatch = true;
    var defaultPrevented = false;
    var evt = null;

    if (inNamespace && $) {
      jQueryEvent = $.Event(event, args);
      $(element).trigger(jQueryEvent);
      bubbles = !jQueryEvent.isPropagationStopped();
      nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
      defaultPrevented = jQueryEvent.isDefaultPrevented();
    }

    if (isNative) {
      evt = document.createEvent('HTMLEvents');
      evt.initEvent(typeEvent, bubbles, true);
    } else {
      evt = new CustomEvent(event, {
        bubbles: bubbles,
        cancelable: true
      });
    } // merge custom information in our event


    if (typeof args !== 'undefined') {
      Object.keys(args).forEach(function (key) {
        Object.defineProperty(evt, key, {
          get: function get() {
            return args[key];
          }
        });
      });
    }

    if (defaultPrevented) {
      evt.preventDefault();
    }

    if (nativeDispatch) {
      element.dispatchEvent(evt);
    }

    if (evt.defaultPrevented && typeof jQueryEvent !== 'undefined') {
      jQueryEvent.preventDefault();
    }

    return evt;
  }
};
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.2): dom/data.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

var elementMap = new Map();
var Data = {
  set: function set(element, key, instance) {
    if (!elementMap.has(element)) {
      elementMap.set(element, new Map());
    }

    var instanceMap = elementMap.get(element); // make it clear we only want one instance per element
    // can be removed later when multiple key/instances are fine to be used

    if (!instanceMap.has(key) && instanceMap.size !== 0) {
      // eslint-disable-next-line no-console
      console.error("Bootstrap doesn't allow more than one instance per element. Bound instance: ".concat(Array.from(instanceMap.keys())[0], "."));
      return;
    }

    instanceMap.set(key, instance);
  },
  get: function get(element, key) {
    if (elementMap.has(element)) {
      return elementMap.get(element).get(key) || null;
    }

    return null;
  },
  remove: function remove(element, key) {
    if (!elementMap.has(element)) {
      return;
    }

    var instanceMap = elementMap.get(element);
    instanceMap.delete(key); // free up element references if there are no instances left for an element

    if (instanceMap.size === 0) {
      elementMap.delete(element);
    }
  }
};
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.2): base-component.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

var VERSION = '5.0.2';

var BaseComponent = /*#__PURE__*/function () {
  function BaseComponent(element) {
    _classCallCheck(this, BaseComponent);

    element = getElement(element);

    if (!element) {
      return;
    }

    this._element = element;
    Data.set(this._element, this.constructor.DATA_KEY, this);
  }

  _createClass(BaseComponent, [{
    key: "dispose",
    value: function dispose() {
      var _this = this;

      Data.remove(this._element, this.constructor.DATA_KEY);
      EventHandler.off(this._element, this.constructor.EVENT_KEY);
      Object.getOwnPropertyNames(this).forEach(function (propertyName) {
        _this[propertyName] = null;
      });
    }
  }, {
    key: "_queueCallback",
    value: function _queueCallback(callback, element) {
      var isAnimated = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      executeAfterTransition(callback, element, isAnimated);
    }
    /** Static */

  }], [{
    key: "getInstance",
    value: function getInstance(element) {
      return Data.get(element, this.DATA_KEY);
    }
  }, {
    key: "getOrCreateInstance",
    value: function getOrCreateInstance(element) {
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.getInstance(element) || new this(element, _typeof(config) === 'object' ? config : null);
    }
  }, {
    key: "VERSION",
    get: function get() {
      return VERSION;
    }
  }, {
    key: "NAME",
    get: function get() {
      throw new Error('You have to implement the static method "NAME", for each component!');
    }
  }, {
    key: "DATA_KEY",
    get: function get() {
      return "bs.".concat(this.NAME);
    }
  }, {
    key: "EVENT_KEY",
    get: function get() {
      return ".".concat(this.DATA_KEY);
    }
  }]);

  return BaseComponent;
}();
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.2): alert.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */


var NAME$c = 'alert';
var DATA_KEY$b = 'bs.alert';
var EVENT_KEY$b = ".".concat(DATA_KEY$b);
var DATA_API_KEY$8 = '.data-api';
var SELECTOR_DISMISS = '[data-bs-dismiss="alert"]';
var EVENT_CLOSE = "close".concat(EVENT_KEY$b);
var EVENT_CLOSED = "closed".concat(EVENT_KEY$b);
var EVENT_CLICK_DATA_API$7 = "click".concat(EVENT_KEY$b).concat(DATA_API_KEY$8);
var CLASS_NAME_ALERT = 'alert';
var CLASS_NAME_FADE$6 = 'fade';
var CLASS_NAME_SHOW$9 = 'show';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var Alert = /*#__PURE__*/function (_BaseComponent) {
  _inherits(Alert, _BaseComponent);

  var _super = _createSuper(Alert);

  function Alert() {
    _classCallCheck(this, Alert);

    return _super.apply(this, arguments);
  }

  _createClass(Alert, [{
    key: "close",
    value: // Public
    function close(element) {
      var rootElement = element ? this._getRootElement(element) : this._element;

      var customEvent = this._triggerCloseEvent(rootElement);

      if (customEvent === null || customEvent.defaultPrevented) {
        return;
      }

      this._removeElement(rootElement);
    } // Private

  }, {
    key: "_getRootElement",
    value: function _getRootElement(element) {
      return getElementFromSelector(element) || element.closest(".".concat(CLASS_NAME_ALERT));
    }
  }, {
    key: "_triggerCloseEvent",
    value: function _triggerCloseEvent(element) {
      return EventHandler.trigger(element, EVENT_CLOSE);
    }
  }, {
    key: "_removeElement",
    value: function _removeElement(element) {
      var _this2 = this;

      element.classList.remove(CLASS_NAME_SHOW$9);
      var isAnimated = element.classList.contains(CLASS_NAME_FADE$6);

      this._queueCallback(function () {
        return _this2._destroyElement(element);
      }, element, isAnimated);
    }
  }, {
    key: "_destroyElement",
    value: function _destroyElement(element) {
      element.remove();
      EventHandler.trigger(element, EVENT_CLOSED);
    } // Static

  }], [{
    key: "NAME",
    get: // Getters
    function get() {
      return NAME$c;
    }
  }, {
    key: "jQueryInterface",
    value: function jQueryInterface(config) {
      return this.each(function () {
        var data = Alert.getOrCreateInstance(this);

        if (config === 'close') {
          data[config](this);
        }
      });
    }
  }, {
    key: "handleDismiss",
    value: function handleDismiss(alertInstance) {
      return function (event) {
        if (event) {
          event.preventDefault();
        }

        alertInstance.close(this);
      };
    }
  }]);

  return Alert;
}(BaseComponent);
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


EventHandler.on(document, EVENT_CLICK_DATA_API$7, SELECTOR_DISMISS, Alert.handleDismiss(new Alert()));
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Alert to jQuery only if jQuery is present
 */

defineJQueryPlugin(Alert);
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.2): button.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

var NAME$b = 'button';
var DATA_KEY$a = 'bs.button';
var EVENT_KEY$a = ".".concat(DATA_KEY$a);
var DATA_API_KEY$7 = '.data-api';
var CLASS_NAME_ACTIVE$3 = 'active';
var SELECTOR_DATA_TOGGLE$5 = '[data-bs-toggle="button"]';
var EVENT_CLICK_DATA_API$6 = "click".concat(EVENT_KEY$a).concat(DATA_API_KEY$7);
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var Button = /*#__PURE__*/function (_BaseComponent2) {
  _inherits(Button, _BaseComponent2);

  var _super2 = _createSuper(Button);

  function Button() {
    _classCallCheck(this, Button);

    return _super2.apply(this, arguments);
  }

  _createClass(Button, [{
    key: "toggle",
    value: // Public
    function toggle() {
      // Toggle class and sync the `aria-pressed` attribute with the return value of the `.toggle()` method
      this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE$3));
    } // Static

  }], [{
    key: "NAME",
    get: // Getters
    function get() {
      return NAME$b;
    }
  }, {
    key: "jQueryInterface",
    value: function jQueryInterface(config) {
      return this.each(function () {
        var data = Button.getOrCreateInstance(this);

        if (config === 'toggle') {
          data[config]();
        }
      });
    }
  }]);

  return Button;
}(BaseComponent);
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$5, function (event) {
  event.preventDefault();
  var button = event.target.closest(SELECTOR_DATA_TOGGLE$5);
  var data = Button.getOrCreateInstance(button);
  data.toggle();
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Button to jQuery only if jQuery is present
 */

defineJQueryPlugin(Button);
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.2): dom/manipulator.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

function normalizeData(val) {
  if (val === 'true') {
    return true;
  }

  if (val === 'false') {
    return false;
  }

  if (val === Number(val).toString()) {
    return Number(val);
  }

  if (val === '' || val === 'null') {
    return null;
  }

  return val;
}

function normalizeDataKey(key) {
  return key.replace(/[A-Z]/g, function (chr) {
    return "-".concat(chr.toLowerCase());
  });
}

var Manipulator = {
  setDataAttribute: function setDataAttribute(element, key, value) {
    element.setAttribute("data-bs-".concat(normalizeDataKey(key)), value);
  },
  removeDataAttribute: function removeDataAttribute(element, key) {
    element.removeAttribute("data-bs-".concat(normalizeDataKey(key)));
  },
  getDataAttributes: function getDataAttributes(element) {
    if (!element) {
      return {};
    }

    var attributes = {};
    Object.keys(element.dataset).filter(function (key) {
      return key.startsWith('bs');
    }).forEach(function (key) {
      var pureKey = key.replace(/^bs/, '');
      pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
      attributes[pureKey] = normalizeData(element.dataset[key]);
    });
    return attributes;
  },
  getDataAttribute: function getDataAttribute(element, key) {
    return normalizeData(element.getAttribute("data-bs-".concat(normalizeDataKey(key))));
  },
  offset: function offset(element) {
    var rect = element.getBoundingClientRect();
    return {
      top: rect.top + document.body.scrollTop,
      left: rect.left + document.body.scrollLeft
    };
  },
  position: function position(element) {
    return {
      top: element.offsetTop,
      left: element.offsetLeft
    };
  }
};
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.2): carousel.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

var NAME$a = 'carousel';
var DATA_KEY$9 = 'bs.carousel';
var EVENT_KEY$9 = ".".concat(DATA_KEY$9);
var DATA_API_KEY$6 = '.data-api';
var ARROW_LEFT_KEY = 'ArrowLeft';
var ARROW_RIGHT_KEY = 'ArrowRight';
var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

var SWIPE_THRESHOLD = 40;
var Default$9 = {
  interval: 5000,
  keyboard: true,
  slide: false,
  pause: 'hover',
  wrap: true,
  touch: true
};
var DefaultType$9 = {
  interval: '(number|boolean)',
  keyboard: 'boolean',
  slide: '(boolean|string)',
  pause: '(string|boolean)',
  wrap: 'boolean',
  touch: 'boolean'
};
var ORDER_NEXT = 'next';
var ORDER_PREV = 'prev';
var DIRECTION_LEFT = 'left';
var DIRECTION_RIGHT = 'right';
var KEY_TO_DIRECTION = (_KEY_TO_DIRECTION = {}, _defineProperty(_KEY_TO_DIRECTION, ARROW_LEFT_KEY, DIRECTION_RIGHT), _defineProperty(_KEY_TO_DIRECTION, ARROW_RIGHT_KEY, DIRECTION_LEFT), _KEY_TO_DIRECTION);
var EVENT_SLIDE = "slide".concat(EVENT_KEY$9);
var EVENT_SLID = "slid".concat(EVENT_KEY$9);
var EVENT_KEYDOWN = "keydown".concat(EVENT_KEY$9);
var EVENT_MOUSEENTER = "mouseenter".concat(EVENT_KEY$9);
var EVENT_MOUSELEAVE = "mouseleave".concat(EVENT_KEY$9);
var EVENT_TOUCHSTART = "touchstart".concat(EVENT_KEY$9);
var EVENT_TOUCHMOVE = "touchmove".concat(EVENT_KEY$9);
var EVENT_TOUCHEND = "touchend".concat(EVENT_KEY$9);
var EVENT_POINTERDOWN = "pointerdown".concat(EVENT_KEY$9);
var EVENT_POINTERUP = "pointerup".concat(EVENT_KEY$9);
var EVENT_DRAG_START = "dragstart".concat(EVENT_KEY$9);
var EVENT_LOAD_DATA_API$2 = "load".concat(EVENT_KEY$9).concat(DATA_API_KEY$6);
var EVENT_CLICK_DATA_API$5 = "click".concat(EVENT_KEY$9).concat(DATA_API_KEY$6);
var CLASS_NAME_CAROUSEL = 'carousel';
var CLASS_NAME_ACTIVE$2 = 'active';
var CLASS_NAME_SLIDE = 'slide';
var CLASS_NAME_END = 'carousel-item-end';
var CLASS_NAME_START = 'carousel-item-start';
var CLASS_NAME_NEXT = 'carousel-item-next';
var CLASS_NAME_PREV = 'carousel-item-prev';
var CLASS_NAME_POINTER_EVENT = 'pointer-event';
var SELECTOR_ACTIVE$1 = '.active';
var SELECTOR_ACTIVE_ITEM = '.active.carousel-item';
var SELECTOR_ITEM = '.carousel-item';
var SELECTOR_ITEM_IMG = '.carousel-item img';
var SELECTOR_NEXT_PREV = '.carousel-item-next, .carousel-item-prev';
var SELECTOR_INDICATORS = '.carousel-indicators';
var SELECTOR_INDICATOR = '[data-bs-target]';
var SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]';
var SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
var POINTER_TYPE_TOUCH = 'touch';
var POINTER_TYPE_PEN = 'pen';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var Carousel = /*#__PURE__*/function (_BaseComponent3) {
  _inherits(Carousel, _BaseComponent3);

  var _super3 = _createSuper(Carousel);

  function Carousel(element, config) {
    var _this3;

    _classCallCheck(this, Carousel);

    _this3 = _super3.call(this, element);
    _this3._items = null;
    _this3._interval = null;
    _this3._activeElement = null;
    _this3._isPaused = false;
    _this3._isSliding = false;
    _this3.touchTimeout = null;
    _this3.touchStartX = 0;
    _this3.touchDeltaX = 0;
    _this3._config = _this3._getConfig(config);
    _this3._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, _this3._element);
    _this3._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
    _this3._pointerEvent = Boolean(window.PointerEvent);

    _this3._addEventListeners();

    return _this3;
  } // Getters


  _createClass(Carousel, [{
    key: "next",
    value: // Public
    function next() {
      this._slide(ORDER_NEXT);
    }
  }, {
    key: "nextWhenVisible",
    value: function nextWhenVisible() {
      // Don't call next when the page isn't visible
      // or the carousel or its parent isn't visible
      if (!document.hidden && isVisible(this._element)) {
        this.next();
      }
    }
  }, {
    key: "prev",
    value: function prev() {
      this._slide(ORDER_PREV);
    }
  }, {
    key: "pause",
    value: function pause(event) {
      if (!event) {
        this._isPaused = true;
      }

      if (SelectorEngine.findOne(SELECTOR_NEXT_PREV, this._element)) {
        triggerTransitionEnd(this._element);
        this.cycle(true);
      }

      clearInterval(this._interval);
      this._interval = null;
    }
  }, {
    key: "cycle",
    value: function cycle(event) {
      if (!event) {
        this._isPaused = false;
      }

      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }

      if (this._config && this._config.interval && !this._isPaused) {
        this._updateInterval();

        this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
      }
    }
  }, {
    key: "to",
    value: function to(index) {
      var _this4 = this;

      this._activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);

      var activeIndex = this._getItemIndex(this._activeElement);

      if (index > this._items.length - 1 || index < 0) {
        return;
      }

      if (this._isSliding) {
        EventHandler.one(this._element, EVENT_SLID, function () {
          return _this4.to(index);
        });
        return;
      }

      if (activeIndex === index) {
        this.pause();
        this.cycle();
        return;
      }

      var order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;

      this._slide(order, this._items[index]);
    } // Private

  }, {
    key: "_getConfig",
    value: function _getConfig(config) {
      config = _objectSpread(_objectSpread(_objectSpread({}, Default$9), Manipulator.getDataAttributes(this._element)), _typeof(config) === 'object' ? config : {});
      typeCheckConfig(NAME$a, config, DefaultType$9);
      return config;
    }
  }, {
    key: "_handleSwipe",
    value: function _handleSwipe() {
      var absDeltax = Math.abs(this.touchDeltaX);

      if (absDeltax <= SWIPE_THRESHOLD) {
        return;
      }

      var direction = absDeltax / this.touchDeltaX;
      this.touchDeltaX = 0;

      if (!direction) {
        return;
      }

      this._slide(direction > 0 ? DIRECTION_RIGHT : DIRECTION_LEFT);
    }
  }, {
    key: "_addEventListeners",
    value: function _addEventListeners() {
      var _this5 = this;

      if (this._config.keyboard) {
        EventHandler.on(this._element, EVENT_KEYDOWN, function (event) {
          return _this5._keydown(event);
        });
      }

      if (this._config.pause === 'hover') {
        EventHandler.on(this._element, EVENT_MOUSEENTER, function (event) {
          return _this5.pause(event);
        });
        EventHandler.on(this._element, EVENT_MOUSELEAVE, function (event) {
          return _this5.cycle(event);
        });
      }

      if (this._config.touch && this._touchSupported) {
        this._addTouchEventListeners();
      }
    }
  }, {
    key: "_addTouchEventListeners",
    value: function _addTouchEventListeners() {
      var _this6 = this;

      var start = function start(event) {
        if (_this6._pointerEvent && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH)) {
          _this6.touchStartX = event.clientX;
        } else if (!_this6._pointerEvent) {
          _this6.touchStartX = event.touches[0].clientX;
        }
      };

      var move = function move(event) {
        // ensure swiping with one touch and not pinching
        _this6.touchDeltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - _this6.touchStartX;
      };

      var end = function end(event) {
        if (_this6._pointerEvent && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH)) {
          _this6.touchDeltaX = event.clientX - _this6.touchStartX;
        }

        _this6._handleSwipe();

        if (_this6._config.pause === 'hover') {
          // If it's a touch-enabled device, mouseenter/leave are fired as
          // part of the mouse compatibility events on first tap - the carousel
          // would stop cycling until user tapped out of it;
          // here, we listen for touchend, explicitly pause the carousel
          // (as if it's the second time we tap on it, mouseenter compat event
          // is NOT fired) and after a timeout (to allow for mouse compatibility
          // events to fire) we explicitly restart cycling
          _this6.pause();

          if (_this6.touchTimeout) {
            clearTimeout(_this6.touchTimeout);
          }

          _this6.touchTimeout = setTimeout(function (event) {
            return _this6.cycle(event);
          }, TOUCHEVENT_COMPAT_WAIT + _this6._config.interval);
        }
      };

      SelectorEngine.find(SELECTOR_ITEM_IMG, this._element).forEach(function (itemImg) {
        EventHandler.on(itemImg, EVENT_DRAG_START, function (e) {
          return e.preventDefault();
        });
      });

      if (this._pointerEvent) {
        EventHandler.on(this._element, EVENT_POINTERDOWN, function (event) {
          return start(event);
        });
        EventHandler.on(this._element, EVENT_POINTERUP, function (event) {
          return end(event);
        });

        this._element.classList.add(CLASS_NAME_POINTER_EVENT);
      } else {
        EventHandler.on(this._element, EVENT_TOUCHSTART, function (event) {
          return start(event);
        });
        EventHandler.on(this._element, EVENT_TOUCHMOVE, function (event) {
          return move(event);
        });
        EventHandler.on(this._element, EVENT_TOUCHEND, function (event) {
          return end(event);
        });
      }
    }
  }, {
    key: "_keydown",
    value: function _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }

      var direction = KEY_TO_DIRECTION[event.key];

      if (direction) {
        event.preventDefault();

        this._slide(direction);
      }
    }
  }, {
    key: "_getItemIndex",
    value: function _getItemIndex(element) {
      this._items = element && element.parentNode ? SelectorEngine.find(SELECTOR_ITEM, element.parentNode) : [];
      return this._items.indexOf(element);
    }
  }, {
    key: "_getItemByOrder",
    value: function _getItemByOrder(order, activeElement) {
      var isNext = order === ORDER_NEXT;
      return getNextActiveElement(this._items, activeElement, isNext, this._config.wrap);
    }
  }, {
    key: "_triggerSlideEvent",
    value: function _triggerSlideEvent(relatedTarget, eventDirectionName) {
      var targetIndex = this._getItemIndex(relatedTarget);

      var fromIndex = this._getItemIndex(SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element));

      return EventHandler.trigger(this._element, EVENT_SLIDE, {
        relatedTarget: relatedTarget,
        direction: eventDirectionName,
        from: fromIndex,
        to: targetIndex
      });
    }
  }, {
    key: "_setActiveIndicatorElement",
    value: function _setActiveIndicatorElement(element) {
      if (this._indicatorsElement) {
        var activeIndicator = SelectorEngine.findOne(SELECTOR_ACTIVE$1, this._indicatorsElement);
        activeIndicator.classList.remove(CLASS_NAME_ACTIVE$2);
        activeIndicator.removeAttribute('aria-current');
        var indicators = SelectorEngine.find(SELECTOR_INDICATOR, this._indicatorsElement);

        for (var i = 0; i < indicators.length; i++) {
          if (Number.parseInt(indicators[i].getAttribute('data-bs-slide-to'), 10) === this._getItemIndex(element)) {
            indicators[i].classList.add(CLASS_NAME_ACTIVE$2);
            indicators[i].setAttribute('aria-current', 'true');
            break;
          }
        }
      }
    }
  }, {
    key: "_updateInterval",
    value: function _updateInterval() {
      var element = this._activeElement || SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);

      if (!element) {
        return;
      }

      var elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10);

      if (elementInterval) {
        this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
        this._config.interval = elementInterval;
      } else {
        this._config.interval = this._config.defaultInterval || this._config.interval;
      }
    }
  }, {
    key: "_slide",
    value: function _slide(directionOrOrder, element) {
      var _this7 = this;

      var order = this._directionToOrder(directionOrOrder);

      var activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);

      var activeElementIndex = this._getItemIndex(activeElement);

      var nextElement = element || this._getItemByOrder(order, activeElement);

      var nextElementIndex = this._getItemIndex(nextElement);

      var isCycling = Boolean(this._interval);
      var isNext = order === ORDER_NEXT;
      var directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
      var orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;

      var eventDirectionName = this._orderToDirection(order);

      if (nextElement && nextElement.classList.contains(CLASS_NAME_ACTIVE$2)) {
        this._isSliding = false;
        return;
      }

      if (this._isSliding) {
        return;
      }

      var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

      if (slideEvent.defaultPrevented) {
        return;
      }

      if (!activeElement || !nextElement) {
        // Some weirdness is happening, so we bail
        return;
      }

      this._isSliding = true;

      if (isCycling) {
        this.pause();
      }

      this._setActiveIndicatorElement(nextElement);

      this._activeElement = nextElement;

      var triggerSlidEvent = function triggerSlidEvent() {
        EventHandler.trigger(_this7._element, EVENT_SLID, {
          relatedTarget: nextElement,
          direction: eventDirectionName,
          from: activeElementIndex,
          to: nextElementIndex
        });
      };

      if (this._element.classList.contains(CLASS_NAME_SLIDE)) {
        nextElement.classList.add(orderClassName);
        reflow(nextElement);
        activeElement.classList.add(directionalClassName);
        nextElement.classList.add(directionalClassName);

        var completeCallBack = function completeCallBack() {
          nextElement.classList.remove(directionalClassName, orderClassName);
          nextElement.classList.add(CLASS_NAME_ACTIVE$2);
          activeElement.classList.remove(CLASS_NAME_ACTIVE$2, orderClassName, directionalClassName);
          _this7._isSliding = false;
          setTimeout(triggerSlidEvent, 0);
        };

        this._queueCallback(completeCallBack, activeElement, true);
      } else {
        activeElement.classList.remove(CLASS_NAME_ACTIVE$2);
        nextElement.classList.add(CLASS_NAME_ACTIVE$2);
        this._isSliding = false;
        triggerSlidEvent();
      }

      if (isCycling) {
        this.cycle();
      }
    }
  }, {
    key: "_directionToOrder",
    value: function _directionToOrder(direction) {
      if (![DIRECTION_RIGHT, DIRECTION_LEFT].includes(direction)) {
        return direction;
      }

      if (isRTL()) {
        return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
      }

      return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
    }
  }, {
    key: "_orderToDirection",
    value: function _orderToDirection(order) {
      if (![ORDER_NEXT, ORDER_PREV].includes(order)) {
        return order;
      }

      if (isRTL()) {
        return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
      }

      return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
    } // Static

  }], [{
    key: "Default",
    get: function get() {
      return Default$9;
    }
  }, {
    key: "NAME",
    get: function get() {
      return NAME$a;
    }
  }, {
    key: "carouselInterface",
    value: function carouselInterface(element, config) {
      var data = Carousel.getOrCreateInstance(element, config);
      var _config = data._config;

      if (_typeof(config) === 'object') {
        _config = _objectSpread(_objectSpread({}, _config), config);
      }

      var action = typeof config === 'string' ? config : _config.slide;

      if (typeof config === 'number') {
        data.to(config);
      } else if (typeof action === 'string') {
        if (typeof data[action] === 'undefined') {
          throw new TypeError("No method named \"".concat(action, "\""));
        }

        data[action]();
      } else if (_config.interval && _config.ride) {
        data.pause();
        data.cycle();
      }
    }
  }, {
    key: "jQueryInterface",
    value: function jQueryInterface(config) {
      return this.each(function () {
        Carousel.carouselInterface(this, config);
      });
    }
  }, {
    key: "dataApiClickHandler",
    value: function dataApiClickHandler(event) {
      var target = getElementFromSelector(this);

      if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
        return;
      }

      var config = _objectSpread(_objectSpread({}, Manipulator.getDataAttributes(target)), Manipulator.getDataAttributes(this));

      var slideIndex = this.getAttribute('data-bs-slide-to');

      if (slideIndex) {
        config.interval = false;
      }

      Carousel.carouselInterface(target, config);

      if (slideIndex) {
        Carousel.getInstance(target).to(slideIndex);
      }

      event.preventDefault();
    }
  }]);

  return Carousel;
}(BaseComponent);
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_SLIDE, Carousel.dataApiClickHandler);
EventHandler.on(window, EVENT_LOAD_DATA_API$2, function () {
  var carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);

  for (var i = 0, len = carousels.length; i < len; i++) {
    Carousel.carouselInterface(carousels[i], Carousel.getInstance(carousels[i]));
  }
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Carousel to jQuery only if jQuery is present
 */

defineJQueryPlugin(Carousel);
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.2): collapse.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

var NAME$9 = 'collapse';
var DATA_KEY$8 = 'bs.collapse';
var EVENT_KEY$8 = ".".concat(DATA_KEY$8);
var DATA_API_KEY$5 = '.data-api';
var Default$8 = {
  toggle: true,
  parent: ''
};
var DefaultType$8 = {
  toggle: 'boolean',
  parent: '(string|element)'
};
var EVENT_SHOW$5 = "show".concat(EVENT_KEY$8);
var EVENT_SHOWN$5 = "shown".concat(EVENT_KEY$8);
var EVENT_HIDE$5 = "hide".concat(EVENT_KEY$8);
var EVENT_HIDDEN$5 = "hidden".concat(EVENT_KEY$8);
var EVENT_CLICK_DATA_API$4 = "click".concat(EVENT_KEY$8).concat(DATA_API_KEY$5);
var CLASS_NAME_SHOW$8 = 'show';
var CLASS_NAME_COLLAPSE = 'collapse';
var CLASS_NAME_COLLAPSING = 'collapsing';
var CLASS_NAME_COLLAPSED = 'collapsed';
var WIDTH = 'width';
var HEIGHT = 'height';
var SELECTOR_ACTIVES = '.show, .collapsing';
var SELECTOR_DATA_TOGGLE$4 = '[data-bs-toggle="collapse"]';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var Collapse = /*#__PURE__*/function (_BaseComponent4) {
  _inherits(Collapse, _BaseComponent4);

  var _super4 = _createSuper(Collapse);

  function Collapse(element, config) {
    var _this8;

    _classCallCheck(this, Collapse);

    _this8 = _super4.call(this, element);
    _this8._isTransitioning = false;
    _this8._config = _this8._getConfig(config);
    _this8._triggerArray = SelectorEngine.find("".concat(SELECTOR_DATA_TOGGLE$4, "[href=\"#").concat(_this8._element.id, "\"],") + "".concat(SELECTOR_DATA_TOGGLE$4, "[data-bs-target=\"#").concat(_this8._element.id, "\"]"));
    var toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$4);

    for (var i = 0, len = toggleList.length; i < len; i++) {
      var elem = toggleList[i];
      var selector = getSelectorFromElement(elem);
      var filterElement = SelectorEngine.find(selector).filter(function (foundElem) {
        return foundElem === _this8._element;
      });

      if (selector !== null && filterElement.length) {
        _this8._selector = selector;

        _this8._triggerArray.push(elem);
      }
    }

    _this8._parent = _this8._config.parent ? _this8._getParent() : null;

    if (!_this8._config.parent) {
      _this8._addAriaAndCollapsedClass(_this8._element, _this8._triggerArray);
    }

    if (_this8._config.toggle) {
      _this8.toggle();
    }

    return _this8;
  } // Getters


  _createClass(Collapse, [{
    key: "toggle",
    value: // Public
    function toggle() {
      if (this._element.classList.contains(CLASS_NAME_SHOW$8)) {
        this.hide();
      } else {
        this.show();
      }
    }
  }, {
    key: "show",
    value: function show() {
      var _this9 = this;

      if (this._isTransitioning || this._element.classList.contains(CLASS_NAME_SHOW$8)) {
        return;
      }

      var actives;
      var activesData;

      if (this._parent) {
        actives = SelectorEngine.find(SELECTOR_ACTIVES, this._parent).filter(function (elem) {
          if (typeof _this9._config.parent === 'string') {
            return elem.getAttribute('data-bs-parent') === _this9._config.parent;
          }

          return elem.classList.contains(CLASS_NAME_COLLAPSE);
        });

        if (actives.length === 0) {
          actives = null;
        }
      }

      var container = SelectorEngine.findOne(this._selector);

      if (actives) {
        var tempActiveData = actives.find(function (elem) {
          return container !== elem;
        });
        activesData = tempActiveData ? Collapse.getInstance(tempActiveData) : null;

        if (activesData && activesData._isTransitioning) {
          return;
        }
      }

      var startEvent = EventHandler.trigger(this._element, EVENT_SHOW$5);

      if (startEvent.defaultPrevented) {
        return;
      }

      if (actives) {
        actives.forEach(function (elemActive) {
          if (container !== elemActive) {
            Collapse.collapseInterface(elemActive, 'hide');
          }

          if (!activesData) {
            Data.set(elemActive, DATA_KEY$8, null);
          }
        });
      }

      var dimension = this._getDimension();

      this._element.classList.remove(CLASS_NAME_COLLAPSE);

      this._element.classList.add(CLASS_NAME_COLLAPSING);

      this._element.style[dimension] = 0;

      if (this._triggerArray.length) {
        this._triggerArray.forEach(function (element) {
          element.classList.remove(CLASS_NAME_COLLAPSED);
          element.setAttribute('aria-expanded', true);
        });
      }

      this.setTransitioning(true);

      var complete = function complete() {
        _this9._element.classList.remove(CLASS_NAME_COLLAPSING);

        _this9._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$8);

        _this9._element.style[dimension] = '';

        _this9.setTransitioning(false);

        EventHandler.trigger(_this9._element, EVENT_SHOWN$5);
      };

      var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      var scrollSize = "scroll".concat(capitalizedDimension);

      this._queueCallback(complete, this._element, true);

      this._element.style[dimension] = "".concat(this._element[scrollSize], "px");
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this10 = this;

      if (this._isTransitioning || !this._element.classList.contains(CLASS_NAME_SHOW$8)) {
        return;
      }

      var startEvent = EventHandler.trigger(this._element, EVENT_HIDE$5);

      if (startEvent.defaultPrevented) {
        return;
      }

      var dimension = this._getDimension();

      this._element.style[dimension] = "".concat(this._element.getBoundingClientRect()[dimension], "px");
      reflow(this._element);

      this._element.classList.add(CLASS_NAME_COLLAPSING);

      this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$8);

      var triggerArrayLength = this._triggerArray.length;

      if (triggerArrayLength > 0) {
        for (var i = 0; i < triggerArrayLength; i++) {
          var trigger = this._triggerArray[i];
          var elem = getElementFromSelector(trigger);

          if (elem && !elem.classList.contains(CLASS_NAME_SHOW$8)) {
            trigger.classList.add(CLASS_NAME_COLLAPSED);
            trigger.setAttribute('aria-expanded', false);
          }
        }
      }

      this.setTransitioning(true);

      var complete = function complete() {
        _this10.setTransitioning(false);

        _this10._element.classList.remove(CLASS_NAME_COLLAPSING);

        _this10._element.classList.add(CLASS_NAME_COLLAPSE);

        EventHandler.trigger(_this10._element, EVENT_HIDDEN$5);
      };

      this._element.style[dimension] = '';

      this._queueCallback(complete, this._element, true);
    }
  }, {
    key: "setTransitioning",
    value: function setTransitioning(isTransitioning) {
      this._isTransitioning = isTransitioning;
    } // Private

  }, {
    key: "_getConfig",
    value: function _getConfig(config) {
      config = _objectSpread(_objectSpread({}, Default$8), config);
      config.toggle = Boolean(config.toggle); // Coerce string values

      typeCheckConfig(NAME$9, config, DefaultType$8);
      return config;
    }
  }, {
    key: "_getDimension",
    value: function _getDimension() {
      return this._element.classList.contains(WIDTH) ? WIDTH : HEIGHT;
    }
  }, {
    key: "_getParent",
    value: function _getParent() {
      var _this11 = this;

      var parent = this._config.parent;
      parent = getElement(parent);
      var selector = "".concat(SELECTOR_DATA_TOGGLE$4, "[data-bs-parent=\"").concat(parent, "\"]");
      SelectorEngine.find(selector, parent).forEach(function (element) {
        var selected = getElementFromSelector(element);

        _this11._addAriaAndCollapsedClass(selected, [element]);
      });
      return parent;
    }
  }, {
    key: "_addAriaAndCollapsedClass",
    value: function _addAriaAndCollapsedClass(element, triggerArray) {
      if (!element || !triggerArray.length) {
        return;
      }

      var isOpen = element.classList.contains(CLASS_NAME_SHOW$8);
      triggerArray.forEach(function (elem) {
        if (isOpen) {
          elem.classList.remove(CLASS_NAME_COLLAPSED);
        } else {
          elem.classList.add(CLASS_NAME_COLLAPSED);
        }

        elem.setAttribute('aria-expanded', isOpen);
      });
    } // Static

  }], [{
    key: "Default",
    get: function get() {
      return Default$8;
    }
  }, {
    key: "NAME",
    get: function get() {
      return NAME$9;
    }
  }, {
    key: "collapseInterface",
    value: function collapseInterface(element, config) {
      var data = Collapse.getInstance(element);

      var _config = _objectSpread(_objectSpread(_objectSpread({}, Default$8), Manipulator.getDataAttributes(element)), _typeof(config) === 'object' && config ? config : {});

      if (!data && _config.toggle && typeof config === 'string' && /show|hide/.test(config)) {
        _config.toggle = false;
      }

      if (!data) {
        data = new Collapse(element, _config);
      }

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError("No method named \"".concat(config, "\""));
        }

        data[config]();
      }
    }
  }, {
    key: "jQueryInterface",
    value: function jQueryInterface(config) {
      return this.each(function () {
        Collapse.collapseInterface(this, config);
      });
    }
  }]);

  return Collapse;
}(BaseComponent);
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$4, function (event) {
  // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
  if (event.target.tagName === 'A' || event.delegateTarget && event.delegateTarget.tagName === 'A') {
    event.preventDefault();
  }

  var triggerData = Manipulator.getDataAttributes(this);
  var selector = getSelectorFromElement(this);
  var selectorElements = SelectorEngine.find(selector);
  selectorElements.forEach(function (element) {
    var data = Collapse.getInstance(element);
    var config;

    if (data) {
      // update parent attribute
      if (data._parent === null && typeof triggerData.parent === 'string') {
        data._config.parent = triggerData.parent;
        data._parent = data._getParent();
      }

      config = 'toggle';
    } else {
      config = triggerData;
    }

    Collapse.collapseInterface(element, config);
  });
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Collapse to jQuery only if jQuery is present
 */

defineJQueryPlugin(Collapse);
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.2): dropdown.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

var NAME$8 = 'dropdown';
var DATA_KEY$7 = 'bs.dropdown';
var EVENT_KEY$7 = ".".concat(DATA_KEY$7);
var DATA_API_KEY$4 = '.data-api';
var ESCAPE_KEY$2 = 'Escape';
var SPACE_KEY = 'Space';
var TAB_KEY = 'Tab';
var ARROW_UP_KEY = 'ArrowUp';
var ARROW_DOWN_KEY = 'ArrowDown';
var RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button

var REGEXP_KEYDOWN = new RegExp("".concat(ARROW_UP_KEY, "|").concat(ARROW_DOWN_KEY, "|").concat(ESCAPE_KEY$2));
var EVENT_HIDE$4 = "hide".concat(EVENT_KEY$7);
var EVENT_HIDDEN$4 = "hidden".concat(EVENT_KEY$7);
var EVENT_SHOW$4 = "show".concat(EVENT_KEY$7);
var EVENT_SHOWN$4 = "shown".concat(EVENT_KEY$7);
var EVENT_CLICK = "click".concat(EVENT_KEY$7);
var EVENT_CLICK_DATA_API$3 = "click".concat(EVENT_KEY$7).concat(DATA_API_KEY$4);
var EVENT_KEYDOWN_DATA_API = "keydown".concat(EVENT_KEY$7).concat(DATA_API_KEY$4);
var EVENT_KEYUP_DATA_API = "keyup".concat(EVENT_KEY$7).concat(DATA_API_KEY$4);
var CLASS_NAME_SHOW$7 = 'show';
var CLASS_NAME_DROPUP = 'dropup';
var CLASS_NAME_DROPEND = 'dropend';
var CLASS_NAME_DROPSTART = 'dropstart';
var CLASS_NAME_NAVBAR = 'navbar';
var SELECTOR_DATA_TOGGLE$3 = '[data-bs-toggle="dropdown"]';
var SELECTOR_MENU = '.dropdown-menu';
var SELECTOR_NAVBAR_NAV = '.navbar-nav';
var SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
var PLACEMENT_TOP = isRTL() ? 'top-end' : 'top-start';
var PLACEMENT_TOPEND = isRTL() ? 'top-start' : 'top-end';
var PLACEMENT_BOTTOM = isRTL() ? 'bottom-end' : 'bottom-start';
var PLACEMENT_BOTTOMEND = isRTL() ? 'bottom-start' : 'bottom-end';
var PLACEMENT_RIGHT = isRTL() ? 'left-start' : 'right-start';
var PLACEMENT_LEFT = isRTL() ? 'right-start' : 'left-start';
var Default$7 = {
  offset: [0, 2],
  boundary: 'clippingParents',
  reference: 'toggle',
  display: 'dynamic',
  popperConfig: null,
  autoClose: true
};
var DefaultType$7 = {
  offset: '(array|string|function)',
  boundary: '(string|element)',
  reference: '(string|element|object)',
  display: 'string',
  popperConfig: '(null|object|function)',
  autoClose: '(boolean|string)'
};
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var Dropdown = /*#__PURE__*/function (_BaseComponent5) {
  _inherits(Dropdown, _BaseComponent5);

  var _super5 = _createSuper(Dropdown);

  function Dropdown(element, config) {
    var _this12;

    _classCallCheck(this, Dropdown);

    _this12 = _super5.call(this, element);
    _this12._popper = null;
    _this12._config = _this12._getConfig(config);
    _this12._menu = _this12._getMenuElement();
    _this12._inNavbar = _this12._detectNavbar();

    _this12._addEventListeners();

    return _this12;
  } // Getters


  _createClass(Dropdown, [{
    key: "toggle",
    value: // Public
    function toggle() {
      if (isDisabled(this._element)) {
        return;
      }

      var isActive = this._element.classList.contains(CLASS_NAME_SHOW$7);

      if (isActive) {
        this.hide();
        return;
      }

      this.show();
    }
  }, {
    key: "show",
    value: function show() {
      if (isDisabled(this._element) || this._menu.classList.contains(CLASS_NAME_SHOW$7)) {
        return;
      }

      var parent = Dropdown.getParentFromElement(this._element);
      var relatedTarget = {
        relatedTarget: this._element
      };
      var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4, relatedTarget);

      if (showEvent.defaultPrevented) {
        return;
      } // Totally disable Popper for Dropdowns in Navbar


      if (this._inNavbar) {
        Manipulator.setDataAttribute(this._menu, 'popper', 'none');
      } else {
        if (typeof _popperjs_core__WEBPACK_IMPORTED_MODULE_0__ === 'undefined') {
          throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)');
        }

        var referenceElement = this._element;

        if (this._config.reference === 'parent') {
          referenceElement = parent;
        } else if (isElement(this._config.reference)) {
          referenceElement = getElement(this._config.reference);
        } else if (_typeof(this._config.reference) === 'object') {
          referenceElement = this._config.reference;
        }

        var popperConfig = this._getPopperConfig();

        var isDisplayStatic = popperConfig.modifiers.find(function (modifier) {
          return modifier.name === 'applyStyles' && modifier.enabled === false;
        });
        this._popper = _popperjs_core__WEBPACK_IMPORTED_MODULE_0__["createPopper"](referenceElement, this._menu, popperConfig);

        if (isDisplayStatic) {
          Manipulator.setDataAttribute(this._menu, 'popper', 'static');
        }
      } // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


      if ('ontouchstart' in document.documentElement && !parent.closest(SELECTOR_NAVBAR_NAV)) {
        var _ref4;

        (_ref4 = []).concat.apply(_ref4, _toConsumableArray(document.body.children)).forEach(function (elem) {
          return EventHandler.on(elem, 'mouseover', noop);
        });
      }

      this._element.focus();

      this._element.setAttribute('aria-expanded', true);

      this._menu.classList.toggle(CLASS_NAME_SHOW$7);

      this._element.classList.toggle(CLASS_NAME_SHOW$7);

      EventHandler.trigger(this._element, EVENT_SHOWN$4, relatedTarget);
    }
  }, {
    key: "hide",
    value: function hide() {
      if (isDisabled(this._element) || !this._menu.classList.contains(CLASS_NAME_SHOW$7)) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };

      this._completeHide(relatedTarget);
    }
  }, {
    key: "dispose",
    value: function dispose() {
      if (this._popper) {
        this._popper.destroy();
      }

      _get(_getPrototypeOf(Dropdown.prototype), "dispose", this).call(this);
    }
  }, {
    key: "update",
    value: function update() {
      this._inNavbar = this._detectNavbar();

      if (this._popper) {
        this._popper.update();
      }
    } // Private

  }, {
    key: "_addEventListeners",
    value: function _addEventListeners() {
      var _this13 = this;

      EventHandler.on(this._element, EVENT_CLICK, function (event) {
        event.preventDefault();

        _this13.toggle();
      });
    }
  }, {
    key: "_completeHide",
    value: function _completeHide(relatedTarget) {
      var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4, relatedTarget);

      if (hideEvent.defaultPrevented) {
        return;
      } // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support


      if ('ontouchstart' in document.documentElement) {
        var _ref5;

        (_ref5 = []).concat.apply(_ref5, _toConsumableArray(document.body.children)).forEach(function (elem) {
          return EventHandler.off(elem, 'mouseover', noop);
        });
      }

      if (this._popper) {
        this._popper.destroy();
      }

      this._menu.classList.remove(CLASS_NAME_SHOW$7);

      this._element.classList.remove(CLASS_NAME_SHOW$7);

      this._element.setAttribute('aria-expanded', 'false');

      Manipulator.removeDataAttribute(this._menu, 'popper');
      EventHandler.trigger(this._element, EVENT_HIDDEN$4, relatedTarget);
    }
  }, {
    key: "_getConfig",
    value: function _getConfig(config) {
      config = _objectSpread(_objectSpread(_objectSpread({}, this.constructor.Default), Manipulator.getDataAttributes(this._element)), config);
      typeCheckConfig(NAME$8, config, this.constructor.DefaultType);

      if (_typeof(config.reference) === 'object' && !isElement(config.reference) && typeof config.reference.getBoundingClientRect !== 'function') {
        // Popper virtual elements require a getBoundingClientRect method
        throw new TypeError("".concat(NAME$8.toUpperCase(), ": Option \"reference\" provided type \"object\" without a required \"getBoundingClientRect\" method."));
      }

      return config;
    }
  }, {
    key: "_getMenuElement",
    value: function _getMenuElement() {
      return SelectorEngine.next(this._element, SELECTOR_MENU)[0];
    }
  }, {
    key: "_getPlacement",
    value: function _getPlacement() {
      var parentDropdown = this._element.parentNode;

      if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
        return PLACEMENT_RIGHT;
      }

      if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
        return PLACEMENT_LEFT;
      } // We need to trim the value because custom properties can also include spaces


      var isEnd = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end';

      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
        return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
      }

      return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
    }
  }, {
    key: "_detectNavbar",
    value: function _detectNavbar() {
      return this._element.closest(".".concat(CLASS_NAME_NAVBAR)) !== null;
    }
  }, {
    key: "_getOffset",
    value: function _getOffset() {
      var _this14 = this;

      var offset = this._config.offset;

      if (typeof offset === 'string') {
        return offset.split(',').map(function (val) {
          return Number.parseInt(val, 10);
        });
      }

      if (typeof offset === 'function') {
        return function (popperData) {
          return offset(popperData, _this14._element);
        };
      }

      return offset;
    }
  }, {
    key: "_getPopperConfig",
    value: function _getPopperConfig() {
      var defaultBsPopperConfig = {
        placement: this._getPlacement(),
        modifiers: [{
          name: 'preventOverflow',
          options: {
            boundary: this._config.boundary
          }
        }, {
          name: 'offset',
          options: {
            offset: this._getOffset()
          }
        }]
      }; // Disable Popper if we have a static display

      if (this._config.display === 'static') {
        defaultBsPopperConfig.modifiers = [{
          name: 'applyStyles',
          enabled: false
        }];
      }

      return _objectSpread(_objectSpread({}, defaultBsPopperConfig), typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig);
    }
  }, {
    key: "_selectMenuItem",
    value: function _selectMenuItem(_ref6) {
      var key = _ref6.key,
          target = _ref6.target;
      var items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(isVisible);

      if (!items.length) {
        return;
      } // if target isn't included in items (e.g. when expanding the dropdown)
      // allow cycling to get the last item in case key equals ARROW_UP_KEY


      getNextActiveElement(items, target, key === ARROW_DOWN_KEY, !items.includes(target)).focus();
    } // Static

  }], [{
    key: "Default",
    get: function get() {
      return Default$7;
    }
  }, {
    key: "DefaultType",
    get: function get() {
      return DefaultType$7;
    }
  }, {
    key: "NAME",
    get: function get() {
      return NAME$8;
    }
  }, {
    key: "dropdownInterface",
    value: function dropdownInterface(element, config) {
      var data = Dropdown.getOrCreateInstance(element, config);

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError("No method named \"".concat(config, "\""));
        }

        data[config]();
      }
    }
  }, {
    key: "jQueryInterface",
    value: function jQueryInterface(config) {
      return this.each(function () {
        Dropdown.dropdownInterface(this, config);
      });
    }
  }, {
    key: "clearMenus",
    value: function clearMenus(event) {
      if (event && (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY)) {
        return;
      }

      var toggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE$3);

      for (var i = 0, len = toggles.length; i < len; i++) {
        var context = Dropdown.getInstance(toggles[i]);

        if (!context || context._config.autoClose === false) {
          continue;
        }

        if (!context._element.classList.contains(CLASS_NAME_SHOW$7)) {
          continue;
        }

        var relatedTarget = {
          relatedTarget: context._element
        };

        if (event) {
          var composedPath = event.composedPath();
          var isMenuTarget = composedPath.includes(context._menu);

          if (composedPath.includes(context._element) || context._config.autoClose === 'inside' && !isMenuTarget || context._config.autoClose === 'outside' && isMenuTarget) {
            continue;
          } // Tab navigation through the dropdown menu or events from contained inputs shouldn't close the menu


          if (context._menu.contains(event.target) && (event.type === 'keyup' && event.key === TAB_KEY || /input|select|option|textarea|form/i.test(event.target.tagName))) {
            continue;
          }

          if (event.type === 'click') {
            relatedTarget.clickEvent = event;
          }
        }

        context._completeHide(relatedTarget);
      }
    }
  }, {
    key: "getParentFromElement",
    value: function getParentFromElement(element) {
      return getElementFromSelector(element) || element.parentNode;
    }
  }, {
    key: "dataApiKeydownHandler",
    value: function dataApiKeydownHandler(event) {
      var _this15 = this;

      // If not input/textarea:
      //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
      // If input/textarea:
      //  - If space key => not a dropdown command
      //  - If key is other than escape
      //    - If key is not up or down => not a dropdown command
      //    - If trigger inside the menu => not a dropdown command
      if (/input|textarea/i.test(event.target.tagName) ? event.key === SPACE_KEY || event.key !== ESCAPE_KEY$2 && (event.key !== ARROW_DOWN_KEY && event.key !== ARROW_UP_KEY || event.target.closest(SELECTOR_MENU)) : !REGEXP_KEYDOWN.test(event.key)) {
        return;
      }

      var isActive = this.classList.contains(CLASS_NAME_SHOW$7);

      if (!isActive && event.key === ESCAPE_KEY$2) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (isDisabled(this)) {
        return;
      }

      var getToggleButton = function getToggleButton() {
        return _this15.matches(SELECTOR_DATA_TOGGLE$3) ? _this15 : SelectorEngine.prev(_this15, SELECTOR_DATA_TOGGLE$3)[0];
      };

      if (event.key === ESCAPE_KEY$2) {
        getToggleButton().focus();
        Dropdown.clearMenus();
        return;
      }

      if (event.key === ARROW_UP_KEY || event.key === ARROW_DOWN_KEY) {
        if (!isActive) {
          getToggleButton().click();
        }

        Dropdown.getInstance(getToggleButton())._selectMenuItem(event);

        return;
      }

      if (!isActive || event.key === SPACE_KEY) {
        Dropdown.clearMenus();
      }
    }
  }]);

  return Dropdown;
}(BaseComponent);
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$3, Dropdown.dataApiKeydownHandler);
EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
EventHandler.on(document, EVENT_CLICK_DATA_API$3, Dropdown.clearMenus);
EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$3, function (event) {
  event.preventDefault();
  Dropdown.dropdownInterface(this);
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Dropdown to jQuery only if jQuery is present
 */

defineJQueryPlugin(Dropdown);
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.2): util/scrollBar.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

var SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
var SELECTOR_STICKY_CONTENT = '.sticky-top';

var ScrollBarHelper = /*#__PURE__*/function () {
  function ScrollBarHelper() {
    _classCallCheck(this, ScrollBarHelper);

    this._element = document.body;
  }

  _createClass(ScrollBarHelper, [{
    key: "getWidth",
    value: function getWidth() {
      // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
      var documentWidth = document.documentElement.clientWidth;
      return Math.abs(window.innerWidth - documentWidth);
    }
  }, {
    key: "hide",
    value: function hide() {
      var width = this.getWidth();

      this._disableOverFlow(); // give padding to element to balance the hidden scrollbar width


      this._setElementAttributes(this._element, 'paddingRight', function (calculatedValue) {
        return calculatedValue + width;
      }); // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements to keep showing fullwidth


      this._setElementAttributes(SELECTOR_FIXED_CONTENT, 'paddingRight', function (calculatedValue) {
        return calculatedValue + width;
      });

      this._setElementAttributes(SELECTOR_STICKY_CONTENT, 'marginRight', function (calculatedValue) {
        return calculatedValue - width;
      });
    }
  }, {
    key: "_disableOverFlow",
    value: function _disableOverFlow() {
      this._saveInitialAttribute(this._element, 'overflow');

      this._element.style.overflow = 'hidden';
    }
  }, {
    key: "_setElementAttributes",
    value: function _setElementAttributes(selector, styleProp, callback) {
      var _this16 = this;

      var scrollbarWidth = this.getWidth();

      var manipulationCallBack = function manipulationCallBack(element) {
        if (element !== _this16._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
          return;
        }

        _this16._saveInitialAttribute(element, styleProp);

        var calculatedValue = window.getComputedStyle(element)[styleProp];
        element.style[styleProp] = "".concat(callback(Number.parseFloat(calculatedValue)), "px");
      };

      this._applyManipulationCallback(selector, manipulationCallBack);
    }
  }, {
    key: "reset",
    value: function reset() {
      this._resetElementAttributes(this._element, 'overflow');

      this._resetElementAttributes(this._element, 'paddingRight');

      this._resetElementAttributes(SELECTOR_FIXED_CONTENT, 'paddingRight');

      this._resetElementAttributes(SELECTOR_STICKY_CONTENT, 'marginRight');
    }
  }, {
    key: "_saveInitialAttribute",
    value: function _saveInitialAttribute(element, styleProp) {
      var actualValue = element.style[styleProp];

      if (actualValue) {
        Manipulator.setDataAttribute(element, styleProp, actualValue);
      }
    }
  }, {
    key: "_resetElementAttributes",
    value: function _resetElementAttributes(selector, styleProp) {
      var manipulationCallBack = function manipulationCallBack(element) {
        var value = Manipulator.getDataAttribute(element, styleProp);

        if (typeof value === 'undefined') {
          element.style.removeProperty(styleProp);
        } else {
          Manipulator.removeDataAttribute(element, styleProp);
          element.style[styleProp] = value;
        }
      };

      this._applyManipulationCallback(selector, manipulationCallBack);
    }
  }, {
    key: "_applyManipulationCallback",
    value: function _applyManipulationCallback(selector, callBack) {
      if (isElement(selector)) {
        callBack(selector);
      } else {
        SelectorEngine.find(selector, this._element).forEach(callBack);
      }
    }
  }, {
    key: "isOverflowing",
    value: function isOverflowing() {
      return this.getWidth() > 0;
    }
  }]);

  return ScrollBarHelper;
}();
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.2): util/backdrop.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */


var Default$6 = {
  isVisible: true,
  // if false, we use the backdrop helper without adding any element to the dom
  isAnimated: false,
  rootElement: 'body',
  // give the choice to place backdrop under different elements
  clickCallback: null
};
var DefaultType$6 = {
  isVisible: 'boolean',
  isAnimated: 'boolean',
  rootElement: '(element|string)',
  clickCallback: '(function|null)'
};
var NAME$7 = 'backdrop';
var CLASS_NAME_BACKDROP = 'modal-backdrop';
var CLASS_NAME_FADE$5 = 'fade';
var CLASS_NAME_SHOW$6 = 'show';
var EVENT_MOUSEDOWN = "mousedown.bs.".concat(NAME$7);

var Backdrop = /*#__PURE__*/function () {
  function Backdrop(config) {
    _classCallCheck(this, Backdrop);

    this._config = this._getConfig(config);
    this._isAppended = false;
    this._element = null;
  }

  _createClass(Backdrop, [{
    key: "show",
    value: function show(callback) {
      if (!this._config.isVisible) {
        execute(callback);
        return;
      }

      this._append();

      if (this._config.isAnimated) {
        reflow(this._getElement());
      }

      this._getElement().classList.add(CLASS_NAME_SHOW$6);

      this._emulateAnimation(function () {
        execute(callback);
      });
    }
  }, {
    key: "hide",
    value: function hide(callback) {
      var _this17 = this;

      if (!this._config.isVisible) {
        execute(callback);
        return;
      }

      this._getElement().classList.remove(CLASS_NAME_SHOW$6);

      this._emulateAnimation(function () {
        _this17.dispose();

        execute(callback);
      });
    } // Private

  }, {
    key: "_getElement",
    value: function _getElement() {
      if (!this._element) {
        var backdrop = document.createElement('div');
        backdrop.className = CLASS_NAME_BACKDROP;

        if (this._config.isAnimated) {
          backdrop.classList.add(CLASS_NAME_FADE$5);
        }

        this._element = backdrop;
      }

      return this._element;
    }
  }, {
    key: "_getConfig",
    value: function _getConfig(config) {
      config = _objectSpread(_objectSpread({}, Default$6), _typeof(config) === 'object' ? config : {}); // use getElement() with the default "body" to get a fresh Element on each instantiation

      config.rootElement = getElement(config.rootElement);
      typeCheckConfig(NAME$7, config, DefaultType$6);
      return config;
    }
  }, {
    key: "_append",
    value: function _append() {
      var _this18 = this;

      if (this._isAppended) {
        return;
      }

      this._config.rootElement.appendChild(this._getElement());

      EventHandler.on(this._getElement(), EVENT_MOUSEDOWN, function () {
        execute(_this18._config.clickCallback);
      });
      this._isAppended = true;
    }
  }, {
    key: "dispose",
    value: function dispose() {
      if (!this._isAppended) {
        return;
      }

      EventHandler.off(this._element, EVENT_MOUSEDOWN);

      this._element.remove();

      this._isAppended = false;
    }
  }, {
    key: "_emulateAnimation",
    value: function _emulateAnimation(callback) {
      executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
    }
  }]);

  return Backdrop;
}();
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.2): modal.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */


var NAME$6 = 'modal';
var DATA_KEY$6 = 'bs.modal';
var EVENT_KEY$6 = ".".concat(DATA_KEY$6);
var DATA_API_KEY$3 = '.data-api';
var ESCAPE_KEY$1 = 'Escape';
var Default$5 = {
  backdrop: true,
  keyboard: true,
  focus: true
};
var DefaultType$5 = {
  backdrop: '(boolean|string)',
  keyboard: 'boolean',
  focus: 'boolean'
};
var EVENT_HIDE$3 = "hide".concat(EVENT_KEY$6);
var EVENT_HIDE_PREVENTED = "hidePrevented".concat(EVENT_KEY$6);
var EVENT_HIDDEN$3 = "hidden".concat(EVENT_KEY$6);
var EVENT_SHOW$3 = "show".concat(EVENT_KEY$6);
var EVENT_SHOWN$3 = "shown".concat(EVENT_KEY$6);
var EVENT_FOCUSIN$2 = "focusin".concat(EVENT_KEY$6);
var EVENT_RESIZE = "resize".concat(EVENT_KEY$6);
var EVENT_CLICK_DISMISS$2 = "click.dismiss".concat(EVENT_KEY$6);
var EVENT_KEYDOWN_DISMISS$1 = "keydown.dismiss".concat(EVENT_KEY$6);
var EVENT_MOUSEUP_DISMISS = "mouseup.dismiss".concat(EVENT_KEY$6);
var EVENT_MOUSEDOWN_DISMISS = "mousedown.dismiss".concat(EVENT_KEY$6);
var EVENT_CLICK_DATA_API$2 = "click".concat(EVENT_KEY$6).concat(DATA_API_KEY$3);
var CLASS_NAME_OPEN = 'modal-open';
var CLASS_NAME_FADE$4 = 'fade';
var CLASS_NAME_SHOW$5 = 'show';
var CLASS_NAME_STATIC = 'modal-static';
var SELECTOR_DIALOG = '.modal-dialog';
var SELECTOR_MODAL_BODY = '.modal-body';
var SELECTOR_DATA_TOGGLE$2 = '[data-bs-toggle="modal"]';
var SELECTOR_DATA_DISMISS$2 = '[data-bs-dismiss="modal"]';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var Modal = /*#__PURE__*/function (_BaseComponent6) {
  _inherits(Modal, _BaseComponent6);

  var _super6 = _createSuper(Modal);

  function Modal(element, config) {
    var _this19;

    _classCallCheck(this, Modal);

    _this19 = _super6.call(this, element);
    _this19._config = _this19._getConfig(config);
    _this19._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, _this19._element);
    _this19._backdrop = _this19._initializeBackDrop();
    _this19._isShown = false;
    _this19._ignoreBackdropClick = false;
    _this19._isTransitioning = false;
    _this19._scrollBar = new ScrollBarHelper();
    return _this19;
  } // Getters


  _createClass(Modal, [{
    key: "toggle",
    value: // Public
    function toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    }
  }, {
    key: "show",
    value: function show(relatedTarget) {
      var _this20 = this;

      if (this._isShown || this._isTransitioning) {
        return;
      }

      var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, {
        relatedTarget: relatedTarget
      });

      if (showEvent.defaultPrevented) {
        return;
      }

      this._isShown = true;

      if (this._isAnimated()) {
        this._isTransitioning = true;
      }

      this._scrollBar.hide();

      document.body.classList.add(CLASS_NAME_OPEN);

      this._adjustDialog();

      this._setEscapeEvent();

      this._setResizeEvent();

      EventHandler.on(this._element, EVENT_CLICK_DISMISS$2, SELECTOR_DATA_DISMISS$2, function (event) {
        return _this20.hide(event);
      });
      EventHandler.on(this._dialog, EVENT_MOUSEDOWN_DISMISS, function () {
        EventHandler.one(_this20._element, EVENT_MOUSEUP_DISMISS, function (event) {
          if (event.target === _this20._element) {
            _this20._ignoreBackdropClick = true;
          }
        });
      });

      this._showBackdrop(function () {
        return _this20._showElement(relatedTarget);
      });
    }
  }, {
    key: "hide",
    value: function hide(event) {
      var _this21 = this;

      if (event && ['A', 'AREA'].includes(event.target.tagName)) {
        event.preventDefault();
      }

      if (!this._isShown || this._isTransitioning) {
        return;
      }

      var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$3);

      if (hideEvent.defaultPrevented) {
        return;
      }

      this._isShown = false;

      var isAnimated = this._isAnimated();

      if (isAnimated) {
        this._isTransitioning = true;
      }

      this._setEscapeEvent();

      this._setResizeEvent();

      EventHandler.off(document, EVENT_FOCUSIN$2);

      this._element.classList.remove(CLASS_NAME_SHOW$5);

      EventHandler.off(this._element, EVENT_CLICK_DISMISS$2);
      EventHandler.off(this._dialog, EVENT_MOUSEDOWN_DISMISS);

      this._queueCallback(function () {
        return _this21._hideModal();
      }, this._element, isAnimated);
    }
  }, {
    key: "dispose",
    value: function dispose() {
      [window, this._dialog].forEach(function (htmlElement) {
        return EventHandler.off(htmlElement, EVENT_KEY$6);
      });

      this._backdrop.dispose();

      _get(_getPrototypeOf(Modal.prototype), "dispose", this).call(this);
      /**
       * `document` has 2 events `EVENT_FOCUSIN` and `EVENT_CLICK_DATA_API`
       * Do not move `document` in `htmlElements` array
       * It will remove `EVENT_CLICK_DATA_API` event that should remain
       */


      EventHandler.off(document, EVENT_FOCUSIN$2);
    }
  }, {
    key: "handleUpdate",
    value: function handleUpdate() {
      this._adjustDialog();
    } // Private

  }, {
    key: "_initializeBackDrop",
    value: function _initializeBackDrop() {
      return new Backdrop({
        isVisible: Boolean(this._config.backdrop),
        // 'static' option will be translated to true, and booleans will keep their value
        isAnimated: this._isAnimated()
      });
    }
  }, {
    key: "_getConfig",
    value: function _getConfig(config) {
      config = _objectSpread(_objectSpread(_objectSpread({}, Default$5), Manipulator.getDataAttributes(this._element)), _typeof(config) === 'object' ? config : {});
      typeCheckConfig(NAME$6, config, DefaultType$5);
      return config;
    }
  }, {
    key: "_showElement",
    value: function _showElement(relatedTarget) {
      var _this22 = this;

      var isAnimated = this._isAnimated();

      var modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);

      if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
        // Don't move modal's DOM position
        document.body.appendChild(this._element);
      }

      this._element.style.display = 'block';

      this._element.removeAttribute('aria-hidden');

      this._element.setAttribute('aria-modal', true);

      this._element.setAttribute('role', 'dialog');

      this._element.scrollTop = 0;

      if (modalBody) {
        modalBody.scrollTop = 0;
      }

      if (isAnimated) {
        reflow(this._element);
      }

      this._element.classList.add(CLASS_NAME_SHOW$5);

      if (this._config.focus) {
        this._enforceFocus();
      }

      var transitionComplete = function transitionComplete() {
        if (_this22._config.focus) {
          _this22._element.focus();
        }

        _this22._isTransitioning = false;
        EventHandler.trigger(_this22._element, EVENT_SHOWN$3, {
          relatedTarget: relatedTarget
        });
      };

      this._queueCallback(transitionComplete, this._dialog, isAnimated);
    }
  }, {
    key: "_enforceFocus",
    value: function _enforceFocus() {
      var _this23 = this;

      EventHandler.off(document, EVENT_FOCUSIN$2); // guard against infinite focus loop

      EventHandler.on(document, EVENT_FOCUSIN$2, function (event) {
        if (document !== event.target && _this23._element !== event.target && !_this23._element.contains(event.target)) {
          _this23._element.focus();
        }
      });
    }
  }, {
    key: "_setEscapeEvent",
    value: function _setEscapeEvent() {
      var _this24 = this;

      if (this._isShown) {
        EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS$1, function (event) {
          if (_this24._config.keyboard && event.key === ESCAPE_KEY$1) {
            event.preventDefault();

            _this24.hide();
          } else if (!_this24._config.keyboard && event.key === ESCAPE_KEY$1) {
            _this24._triggerBackdropTransition();
          }
        });
      } else {
        EventHandler.off(this._element, EVENT_KEYDOWN_DISMISS$1);
      }
    }
  }, {
    key: "_setResizeEvent",
    value: function _setResizeEvent() {
      var _this25 = this;

      if (this._isShown) {
        EventHandler.on(window, EVENT_RESIZE, function () {
          return _this25._adjustDialog();
        });
      } else {
        EventHandler.off(window, EVENT_RESIZE);
      }
    }
  }, {
    key: "_hideModal",
    value: function _hideModal() {
      var _this26 = this;

      this._element.style.display = 'none';

      this._element.setAttribute('aria-hidden', true);

      this._element.removeAttribute('aria-modal');

      this._element.removeAttribute('role');

      this._isTransitioning = false;

      this._backdrop.hide(function () {
        document.body.classList.remove(CLASS_NAME_OPEN);

        _this26._resetAdjustments();

        _this26._scrollBar.reset();

        EventHandler.trigger(_this26._element, EVENT_HIDDEN$3);
      });
    }
  }, {
    key: "_showBackdrop",
    value: function _showBackdrop(callback) {
      var _this27 = this;

      EventHandler.on(this._element, EVENT_CLICK_DISMISS$2, function (event) {
        if (_this27._ignoreBackdropClick) {
          _this27._ignoreBackdropClick = false;
          return;
        }

        if (event.target !== event.currentTarget) {
          return;
        }

        if (_this27._config.backdrop === true) {
          _this27.hide();
        } else if (_this27._config.backdrop === 'static') {
          _this27._triggerBackdropTransition();
        }
      });

      this._backdrop.show(callback);
    }
  }, {
    key: "_isAnimated",
    value: function _isAnimated() {
      return this._element.classList.contains(CLASS_NAME_FADE$4);
    }
  }, {
    key: "_triggerBackdropTransition",
    value: function _triggerBackdropTransition() {
      var _this28 = this;

      var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);

      if (hideEvent.defaultPrevented) {
        return;
      }

      var _this$_element = this._element,
          classList = _this$_element.classList,
          scrollHeight = _this$_element.scrollHeight,
          style = _this$_element.style;
      var isModalOverflowing = scrollHeight > document.documentElement.clientHeight; // return if the following background transition hasn't yet completed

      if (!isModalOverflowing && style.overflowY === 'hidden' || classList.contains(CLASS_NAME_STATIC)) {
        return;
      }

      if (!isModalOverflowing) {
        style.overflowY = 'hidden';
      }

      classList.add(CLASS_NAME_STATIC);

      this._queueCallback(function () {
        classList.remove(CLASS_NAME_STATIC);

        if (!isModalOverflowing) {
          _this28._queueCallback(function () {
            style.overflowY = '';
          }, _this28._dialog);
        }
      }, this._dialog);

      this._element.focus();
    } // ----------------------------------------------------------------------
    // the following methods are used to handle overflowing modals
    // ----------------------------------------------------------------------

  }, {
    key: "_adjustDialog",
    value: function _adjustDialog() {
      var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      var scrollbarWidth = this._scrollBar.getWidth();

      var isBodyOverflowing = scrollbarWidth > 0;

      if (!isBodyOverflowing && isModalOverflowing && !isRTL() || isBodyOverflowing && !isModalOverflowing && isRTL()) {
        this._element.style.paddingLeft = "".concat(scrollbarWidth, "px");
      }

      if (isBodyOverflowing && !isModalOverflowing && !isRTL() || !isBodyOverflowing && isModalOverflowing && isRTL()) {
        this._element.style.paddingRight = "".concat(scrollbarWidth, "px");
      }
    }
  }, {
    key: "_resetAdjustments",
    value: function _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    } // Static

  }], [{
    key: "Default",
    get: function get() {
      return Default$5;
    }
  }, {
    key: "NAME",
    get: function get() {
      return NAME$6;
    }
  }, {
    key: "jQueryInterface",
    value: function jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = Modal.getOrCreateInstance(this, config);

        if (typeof config !== 'string') {
          return;
        }

        if (typeof data[config] === 'undefined') {
          throw new TypeError("No method named \"".concat(config, "\""));
        }

        data[config](relatedTarget);
      });
    }
  }]);

  return Modal;
}(BaseComponent);
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_TOGGLE$2, function (event) {
  var _this29 = this;

  var target = getElementFromSelector(this);

  if (['A', 'AREA'].includes(this.tagName)) {
    event.preventDefault();
  }

  EventHandler.one(target, EVENT_SHOW$3, function (showEvent) {
    if (showEvent.defaultPrevented) {
      // only register focus restorer if modal will actually get shown
      return;
    }

    EventHandler.one(target, EVENT_HIDDEN$3, function () {
      if (isVisible(_this29)) {
        _this29.focus();
      }
    });
  });
  var data = Modal.getOrCreateInstance(target);
  data.toggle(this);
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Modal to jQuery only if jQuery is present
 */

defineJQueryPlugin(Modal);
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.2): offcanvas.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

var NAME$5 = 'offcanvas';
var DATA_KEY$5 = 'bs.offcanvas';
var EVENT_KEY$5 = ".".concat(DATA_KEY$5);
var DATA_API_KEY$2 = '.data-api';
var EVENT_LOAD_DATA_API$1 = "load".concat(EVENT_KEY$5).concat(DATA_API_KEY$2);
var ESCAPE_KEY = 'Escape';
var Default$4 = {
  backdrop: true,
  keyboard: true,
  scroll: false
};
var DefaultType$4 = {
  backdrop: 'boolean',
  keyboard: 'boolean',
  scroll: 'boolean'
};
var CLASS_NAME_SHOW$4 = 'show';
var OPEN_SELECTOR = '.offcanvas.show';
var EVENT_SHOW$2 = "show".concat(EVENT_KEY$5);
var EVENT_SHOWN$2 = "shown".concat(EVENT_KEY$5);
var EVENT_HIDE$2 = "hide".concat(EVENT_KEY$5);
var EVENT_HIDDEN$2 = "hidden".concat(EVENT_KEY$5);
var EVENT_FOCUSIN$1 = "focusin".concat(EVENT_KEY$5);
var EVENT_CLICK_DATA_API$1 = "click".concat(EVENT_KEY$5).concat(DATA_API_KEY$2);
var EVENT_CLICK_DISMISS$1 = "click.dismiss".concat(EVENT_KEY$5);
var EVENT_KEYDOWN_DISMISS = "keydown.dismiss".concat(EVENT_KEY$5);
var SELECTOR_DATA_DISMISS$1 = '[data-bs-dismiss="offcanvas"]';
var SELECTOR_DATA_TOGGLE$1 = '[data-bs-toggle="offcanvas"]';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var Offcanvas = /*#__PURE__*/function (_BaseComponent7) {
  _inherits(Offcanvas, _BaseComponent7);

  var _super7 = _createSuper(Offcanvas);

  function Offcanvas(element, config) {
    var _this30;

    _classCallCheck(this, Offcanvas);

    _this30 = _super7.call(this, element);
    _this30._config = _this30._getConfig(config);
    _this30._isShown = false;
    _this30._backdrop = _this30._initializeBackDrop();

    _this30._addEventListeners();

    return _this30;
  } // Getters


  _createClass(Offcanvas, [{
    key: "toggle",
    value: // Public
    function toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    }
  }, {
    key: "show",
    value: function show(relatedTarget) {
      var _this31 = this;

      if (this._isShown) {
        return;
      }

      var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$2, {
        relatedTarget: relatedTarget
      });

      if (showEvent.defaultPrevented) {
        return;
      }

      this._isShown = true;
      this._element.style.visibility = 'visible';

      this._backdrop.show();

      if (!this._config.scroll) {
        new ScrollBarHelper().hide();

        this._enforceFocusOnElement(this._element);
      }

      this._element.removeAttribute('aria-hidden');

      this._element.setAttribute('aria-modal', true);

      this._element.setAttribute('role', 'dialog');

      this._element.classList.add(CLASS_NAME_SHOW$4);

      var completeCallBack = function completeCallBack() {
        EventHandler.trigger(_this31._element, EVENT_SHOWN$2, {
          relatedTarget: relatedTarget
        });
      };

      this._queueCallback(completeCallBack, this._element, true);
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this32 = this;

      if (!this._isShown) {
        return;
      }

      var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$2);

      if (hideEvent.defaultPrevented) {
        return;
      }

      EventHandler.off(document, EVENT_FOCUSIN$1);

      this._element.blur();

      this._isShown = false;

      this._element.classList.remove(CLASS_NAME_SHOW$4);

      this._backdrop.hide();

      var completeCallback = function completeCallback() {
        _this32._element.setAttribute('aria-hidden', true);

        _this32._element.removeAttribute('aria-modal');

        _this32._element.removeAttribute('role');

        _this32._element.style.visibility = 'hidden';

        if (!_this32._config.scroll) {
          new ScrollBarHelper().reset();
        }

        EventHandler.trigger(_this32._element, EVENT_HIDDEN$2);
      };

      this._queueCallback(completeCallback, this._element, true);
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this._backdrop.dispose();

      _get(_getPrototypeOf(Offcanvas.prototype), "dispose", this).call(this);

      EventHandler.off(document, EVENT_FOCUSIN$1);
    } // Private

  }, {
    key: "_getConfig",
    value: function _getConfig(config) {
      config = _objectSpread(_objectSpread(_objectSpread({}, Default$4), Manipulator.getDataAttributes(this._element)), _typeof(config) === 'object' ? config : {});
      typeCheckConfig(NAME$5, config, DefaultType$4);
      return config;
    }
  }, {
    key: "_initializeBackDrop",
    value: function _initializeBackDrop() {
      var _this33 = this;

      return new Backdrop({
        isVisible: this._config.backdrop,
        isAnimated: true,
        rootElement: this._element.parentNode,
        clickCallback: function clickCallback() {
          return _this33.hide();
        }
      });
    }
  }, {
    key: "_enforceFocusOnElement",
    value: function _enforceFocusOnElement(element) {
      EventHandler.off(document, EVENT_FOCUSIN$1); // guard against infinite focus loop

      EventHandler.on(document, EVENT_FOCUSIN$1, function (event) {
        if (document !== event.target && element !== event.target && !element.contains(event.target)) {
          element.focus();
        }
      });
      element.focus();
    }
  }, {
    key: "_addEventListeners",
    value: function _addEventListeners() {
      var _this34 = this;

      EventHandler.on(this._element, EVENT_CLICK_DISMISS$1, SELECTOR_DATA_DISMISS$1, function () {
        return _this34.hide();
      });
      EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, function (event) {
        if (_this34._config.keyboard && event.key === ESCAPE_KEY) {
          _this34.hide();
        }
      });
    } // Static

  }], [{
    key: "NAME",
    get: function get() {
      return NAME$5;
    }
  }, {
    key: "Default",
    get: function get() {
      return Default$4;
    }
  }, {
    key: "jQueryInterface",
    value: function jQueryInterface(config) {
      return this.each(function () {
        var data = Offcanvas.getOrCreateInstance(this, config);

        if (typeof config !== 'string') {
          return;
        }

        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError("No method named \"".concat(config, "\""));
        }

        data[config](this);
      });
    }
  }]);

  return Offcanvas;
}(BaseComponent);
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE$1, function (event) {
  var _this35 = this;

  var target = getElementFromSelector(this);

  if (['A', 'AREA'].includes(this.tagName)) {
    event.preventDefault();
  }

  if (isDisabled(this)) {
    return;
  }

  EventHandler.one(target, EVENT_HIDDEN$2, function () {
    // focus on trigger when it is closed
    if (isVisible(_this35)) {
      _this35.focus();
    }
  }); // avoid conflict when clicking a toggler of an offcanvas, while another is open

  var allReadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);

  if (allReadyOpen && allReadyOpen !== target) {
    Offcanvas.getInstance(allReadyOpen).hide();
  }

  var data = Offcanvas.getOrCreateInstance(target);
  data.toggle(this);
});
EventHandler.on(window, EVENT_LOAD_DATA_API$1, function () {
  return SelectorEngine.find(OPEN_SELECTOR).forEach(function (el) {
    return Offcanvas.getOrCreateInstance(el).show();
  });
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */

defineJQueryPlugin(Offcanvas);
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.2): util/sanitizer.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

var uriAttrs = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']);
var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
/**
 * A pattern that recognizes a commonly useful subset of URLs that are safe.
 *
 * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
 */

var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/i;
/**
 * A pattern that matches safe data URLs. Only matches image, video and audio types.
 *
 * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
 */

var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;

var allowedAttribute = function allowedAttribute(attr, allowedAttributeList) {
  var attrName = attr.nodeName.toLowerCase();

  if (allowedAttributeList.includes(attrName)) {
    if (uriAttrs.has(attrName)) {
      return Boolean(SAFE_URL_PATTERN.test(attr.nodeValue) || DATA_URL_PATTERN.test(attr.nodeValue));
    }

    return true;
  }

  var regExp = allowedAttributeList.filter(function (attrRegex) {
    return attrRegex instanceof RegExp;
  }); // Check if a regular expression validates the attribute.

  for (var i = 0, len = regExp.length; i < len; i++) {
    if (regExp[i].test(attrName)) {
      return true;
    }
  }

  return false;
};

var DefaultAllowlist = {
  // Global attributes allowed on any supplied element below.
  '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
  a: ['target', 'href', 'title', 'rel'],
  area: [],
  b: [],
  br: [],
  col: [],
  code: [],
  div: [],
  em: [],
  hr: [],
  h1: [],
  h2: [],
  h3: [],
  h4: [],
  h5: [],
  h6: [],
  i: [],
  img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
  li: [],
  ol: [],
  p: [],
  pre: [],
  s: [],
  small: [],
  span: [],
  sub: [],
  sup: [],
  strong: [],
  u: [],
  ul: []
};

function sanitizeHtml(unsafeHtml, allowList, sanitizeFn) {
  var _ref7;

  if (!unsafeHtml.length) {
    return unsafeHtml;
  }

  if (sanitizeFn && typeof sanitizeFn === 'function') {
    return sanitizeFn(unsafeHtml);
  }

  var domParser = new window.DOMParser();
  var createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
  var allowlistKeys = Object.keys(allowList);

  var elements = (_ref7 = []).concat.apply(_ref7, _toConsumableArray(createdDocument.body.querySelectorAll('*')));

  var _loop = function _loop(i, len) {
    var _ref8;

    var el = elements[i];
    var elName = el.nodeName.toLowerCase();

    if (!allowlistKeys.includes(elName)) {
      el.remove();
      return "continue";
    }

    var attributeList = (_ref8 = []).concat.apply(_ref8, _toConsumableArray(el.attributes));

    var allowedAttributes = [].concat(allowList['*'] || [], allowList[elName] || []);
    attributeList.forEach(function (attr) {
      if (!allowedAttribute(attr, allowedAttributes)) {
        el.removeAttribute(attr.nodeName);
      }
    });
  };

  for (var i = 0, len = elements.length; i < len; i++) {
    var _ret = _loop(i, len);

    if (_ret === "continue") continue;
  }

  return createdDocument.body.innerHTML;
}
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.2): tooltip.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */


var NAME$4 = 'tooltip';
var DATA_KEY$4 = 'bs.tooltip';
var EVENT_KEY$4 = ".".concat(DATA_KEY$4);
var CLASS_PREFIX$1 = 'bs-tooltip';
var BSCLS_PREFIX_REGEX$1 = new RegExp("(^|\\s)".concat(CLASS_PREFIX$1, "\\S+"), 'g');
var DISALLOWED_ATTRIBUTES = new Set(['sanitize', 'allowList', 'sanitizeFn']);
var DefaultType$3 = {
  animation: 'boolean',
  template: 'string',
  title: '(string|element|function)',
  trigger: 'string',
  delay: '(number|object)',
  html: 'boolean',
  selector: '(string|boolean)',
  placement: '(string|function)',
  offset: '(array|string|function)',
  container: '(string|element|boolean)',
  fallbackPlacements: 'array',
  boundary: '(string|element)',
  customClass: '(string|function)',
  sanitize: 'boolean',
  sanitizeFn: '(null|function)',
  allowList: 'object',
  popperConfig: '(null|object|function)'
};
var AttachmentMap = {
  AUTO: 'auto',
  TOP: 'top',
  RIGHT: isRTL() ? 'left' : 'right',
  BOTTOM: 'bottom',
  LEFT: isRTL() ? 'right' : 'left'
};
var Default$3 = {
  animation: true,
  template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div>' + '</div>',
  trigger: 'hover focus',
  title: '',
  delay: 0,
  html: false,
  selector: false,
  placement: 'top',
  offset: [0, 0],
  container: false,
  fallbackPlacements: ['top', 'right', 'bottom', 'left'],
  boundary: 'clippingParents',
  customClass: '',
  sanitize: true,
  sanitizeFn: null,
  allowList: DefaultAllowlist,
  popperConfig: null
};
var Event$2 = {
  HIDE: "hide".concat(EVENT_KEY$4),
  HIDDEN: "hidden".concat(EVENT_KEY$4),
  SHOW: "show".concat(EVENT_KEY$4),
  SHOWN: "shown".concat(EVENT_KEY$4),
  INSERTED: "inserted".concat(EVENT_KEY$4),
  CLICK: "click".concat(EVENT_KEY$4),
  FOCUSIN: "focusin".concat(EVENT_KEY$4),
  FOCUSOUT: "focusout".concat(EVENT_KEY$4),
  MOUSEENTER: "mouseenter".concat(EVENT_KEY$4),
  MOUSELEAVE: "mouseleave".concat(EVENT_KEY$4)
};
var CLASS_NAME_FADE$3 = 'fade';
var CLASS_NAME_MODAL = 'modal';
var CLASS_NAME_SHOW$3 = 'show';
var HOVER_STATE_SHOW = 'show';
var HOVER_STATE_OUT = 'out';
var SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
var TRIGGER_HOVER = 'hover';
var TRIGGER_FOCUS = 'focus';
var TRIGGER_CLICK = 'click';
var TRIGGER_MANUAL = 'manual';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var Tooltip = /*#__PURE__*/function (_BaseComponent8) {
  _inherits(Tooltip, _BaseComponent8);

  var _super8 = _createSuper(Tooltip);

  function Tooltip(element, config) {
    var _this36;

    _classCallCheck(this, Tooltip);

    if (typeof _popperjs_core__WEBPACK_IMPORTED_MODULE_0__ === 'undefined') {
      throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org)');
    }

    _this36 = _super8.call(this, element); // private

    _this36._isEnabled = true;
    _this36._timeout = 0;
    _this36._hoverState = '';
    _this36._activeTrigger = {};
    _this36._popper = null; // Protected

    _this36._config = _this36._getConfig(config);
    _this36.tip = null;

    _this36._setListeners();

    return _this36;
  } // Getters


  _createClass(Tooltip, [{
    key: "enable",
    value: // Public
    function enable() {
      this._isEnabled = true;
    }
  }, {
    key: "disable",
    value: function disable() {
      this._isEnabled = false;
    }
  }, {
    key: "toggleEnabled",
    value: function toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    }
  }, {
    key: "toggle",
    value: function toggle(event) {
      if (!this._isEnabled) {
        return;
      }

      if (event) {
        var context = this._initializeOnDelegatedTarget(event);

        context._activeTrigger.click = !context._activeTrigger.click;

        if (context._isWithActiveTrigger()) {
          context._enter(null, context);
        } else {
          context._leave(null, context);
        }
      } else {
        if (this.getTipElement().classList.contains(CLASS_NAME_SHOW$3)) {
          this._leave(null, this);

          return;
        }

        this._enter(null, this);
      }
    }
  }, {
    key: "dispose",
    value: function dispose() {
      clearTimeout(this._timeout);
      EventHandler.off(this._element.closest(".".concat(CLASS_NAME_MODAL)), 'hide.bs.modal', this._hideModalHandler);

      if (this.tip) {
        this.tip.remove();
      }

      if (this._popper) {
        this._popper.destroy();
      }

      _get(_getPrototypeOf(Tooltip.prototype), "dispose", this).call(this);
    }
  }, {
    key: "show",
    value: function show() {
      var _this37 = this;

      if (this._element.style.display === 'none') {
        throw new Error('Please use show on visible elements');
      }

      if (!(this.isWithContent() && this._isEnabled)) {
        return;
      }

      var showEvent = EventHandler.trigger(this._element, this.constructor.Event.SHOW);
      var shadowRoot = findShadowRoot(this._element);
      var isInTheDom = shadowRoot === null ? this._element.ownerDocument.documentElement.contains(this._element) : shadowRoot.contains(this._element);

      if (showEvent.defaultPrevented || !isInTheDom) {
        return;
      }

      var tip = this.getTipElement();
      var tipId = getUID(this.constructor.NAME);
      tip.setAttribute('id', tipId);

      this._element.setAttribute('aria-describedby', tipId);

      this.setContent();

      if (this._config.animation) {
        tip.classList.add(CLASS_NAME_FADE$3);
      }

      var placement = typeof this._config.placement === 'function' ? this._config.placement.call(this, tip, this._element) : this._config.placement;

      var attachment = this._getAttachment(placement);

      this._addAttachmentClass(attachment);

      var container = this._config.container;
      Data.set(tip, this.constructor.DATA_KEY, this);

      if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
        container.appendChild(tip);
        EventHandler.trigger(this._element, this.constructor.Event.INSERTED);
      }

      if (this._popper) {
        this._popper.update();
      } else {
        this._popper = _popperjs_core__WEBPACK_IMPORTED_MODULE_0__["createPopper"](this._element, tip, this._getPopperConfig(attachment));
      }

      tip.classList.add(CLASS_NAME_SHOW$3);
      var customClass = typeof this._config.customClass === 'function' ? this._config.customClass() : this._config.customClass;

      if (customClass) {
        var _tip$classList;

        (_tip$classList = tip.classList).add.apply(_tip$classList, _toConsumableArray(customClass.split(' ')));
      } // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


      if ('ontouchstart' in document.documentElement) {
        var _ref9;

        (_ref9 = []).concat.apply(_ref9, _toConsumableArray(document.body.children)).forEach(function (element) {
          EventHandler.on(element, 'mouseover', noop);
        });
      }

      var complete = function complete() {
        var prevHoverState = _this37._hoverState;
        _this37._hoverState = null;
        EventHandler.trigger(_this37._element, _this37.constructor.Event.SHOWN);

        if (prevHoverState === HOVER_STATE_OUT) {
          _this37._leave(null, _this37);
        }
      };

      var isAnimated = this.tip.classList.contains(CLASS_NAME_FADE$3);

      this._queueCallback(complete, this.tip, isAnimated);
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this38 = this;

      if (!this._popper) {
        return;
      }

      var tip = this.getTipElement();

      var complete = function complete() {
        if (_this38._isWithActiveTrigger()) {
          return;
        }

        if (_this38._hoverState !== HOVER_STATE_SHOW) {
          tip.remove();
        }

        _this38._cleanTipClass();

        _this38._element.removeAttribute('aria-describedby');

        EventHandler.trigger(_this38._element, _this38.constructor.Event.HIDDEN);

        if (_this38._popper) {
          _this38._popper.destroy();

          _this38._popper = null;
        }
      };

      var hideEvent = EventHandler.trigger(this._element, this.constructor.Event.HIDE);

      if (hideEvent.defaultPrevented) {
        return;
      }

      tip.classList.remove(CLASS_NAME_SHOW$3); // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support

      if ('ontouchstart' in document.documentElement) {
        var _ref10;

        (_ref10 = []).concat.apply(_ref10, _toConsumableArray(document.body.children)).forEach(function (element) {
          return EventHandler.off(element, 'mouseover', noop);
        });
      }

      this._activeTrigger[TRIGGER_CLICK] = false;
      this._activeTrigger[TRIGGER_FOCUS] = false;
      this._activeTrigger[TRIGGER_HOVER] = false;
      var isAnimated = this.tip.classList.contains(CLASS_NAME_FADE$3);

      this._queueCallback(complete, this.tip, isAnimated);

      this._hoverState = '';
    }
  }, {
    key: "update",
    value: function update() {
      if (this._popper !== null) {
        this._popper.update();
      }
    } // Protected

  }, {
    key: "isWithContent",
    value: function isWithContent() {
      return Boolean(this.getTitle());
    }
  }, {
    key: "getTipElement",
    value: function getTipElement() {
      if (this.tip) {
        return this.tip;
      }

      var element = document.createElement('div');
      element.innerHTML = this._config.template;
      this.tip = element.children[0];
      return this.tip;
    }
  }, {
    key: "setContent",
    value: function setContent() {
      var tip = this.getTipElement();
      this.setElementContent(SelectorEngine.findOne(SELECTOR_TOOLTIP_INNER, tip), this.getTitle());
      tip.classList.remove(CLASS_NAME_FADE$3, CLASS_NAME_SHOW$3);
    }
  }, {
    key: "setElementContent",
    value: function setElementContent(element, content) {
      if (element === null) {
        return;
      }

      if (isElement(content)) {
        content = getElement(content); // content is a DOM node or a jQuery

        if (this._config.html) {
          if (content.parentNode !== element) {
            element.innerHTML = '';
            element.appendChild(content);
          }
        } else {
          element.textContent = content.textContent;
        }

        return;
      }

      if (this._config.html) {
        if (this._config.sanitize) {
          content = sanitizeHtml(content, this._config.allowList, this._config.sanitizeFn);
        }

        element.innerHTML = content;
      } else {
        element.textContent = content;
      }
    }
  }, {
    key: "getTitle",
    value: function getTitle() {
      var title = this._element.getAttribute('data-bs-original-title');

      if (!title) {
        title = typeof this._config.title === 'function' ? this._config.title.call(this._element) : this._config.title;
      }

      return title;
    }
  }, {
    key: "updateAttachment",
    value: function updateAttachment(attachment) {
      if (attachment === 'right') {
        return 'end';
      }

      if (attachment === 'left') {
        return 'start';
      }

      return attachment;
    } // Private

  }, {
    key: "_initializeOnDelegatedTarget",
    value: function _initializeOnDelegatedTarget(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || Data.get(event.delegateTarget, dataKey);

      if (!context) {
        context = new this.constructor(event.delegateTarget, this._getDelegateConfig());
        Data.set(event.delegateTarget, dataKey, context);
      }

      return context;
    }
  }, {
    key: "_getOffset",
    value: function _getOffset() {
      var _this39 = this;

      var offset = this._config.offset;

      if (typeof offset === 'string') {
        return offset.split(',').map(function (val) {
          return Number.parseInt(val, 10);
        });
      }

      if (typeof offset === 'function') {
        return function (popperData) {
          return offset(popperData, _this39._element);
        };
      }

      return offset;
    }
  }, {
    key: "_getPopperConfig",
    value: function _getPopperConfig(attachment) {
      var _this40 = this;

      var defaultBsPopperConfig = {
        placement: attachment,
        modifiers: [{
          name: 'flip',
          options: {
            fallbackPlacements: this._config.fallbackPlacements
          }
        }, {
          name: 'offset',
          options: {
            offset: this._getOffset()
          }
        }, {
          name: 'preventOverflow',
          options: {
            boundary: this._config.boundary
          }
        }, {
          name: 'arrow',
          options: {
            element: ".".concat(this.constructor.NAME, "-arrow")
          }
        }, {
          name: 'onChange',
          enabled: true,
          phase: 'afterWrite',
          fn: function fn(data) {
            return _this40._handlePopperPlacementChange(data);
          }
        }],
        onFirstUpdate: function onFirstUpdate(data) {
          if (data.options.placement !== data.placement) {
            _this40._handlePopperPlacementChange(data);
          }
        }
      };
      return _objectSpread(_objectSpread({}, defaultBsPopperConfig), typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig);
    }
  }, {
    key: "_addAttachmentClass",
    value: function _addAttachmentClass(attachment) {
      this.getTipElement().classList.add("".concat(CLASS_PREFIX$1, "-").concat(this.updateAttachment(attachment)));
    }
  }, {
    key: "_getAttachment",
    value: function _getAttachment(placement) {
      return AttachmentMap[placement.toUpperCase()];
    }
  }, {
    key: "_setListeners",
    value: function _setListeners() {
      var _this41 = this;

      var triggers = this._config.trigger.split(' ');

      triggers.forEach(function (trigger) {
        if (trigger === 'click') {
          EventHandler.on(_this41._element, _this41.constructor.Event.CLICK, _this41._config.selector, function (event) {
            return _this41.toggle(event);
          });
        } else if (trigger !== TRIGGER_MANUAL) {
          var eventIn = trigger === TRIGGER_HOVER ? _this41.constructor.Event.MOUSEENTER : _this41.constructor.Event.FOCUSIN;
          var eventOut = trigger === TRIGGER_HOVER ? _this41.constructor.Event.MOUSELEAVE : _this41.constructor.Event.FOCUSOUT;
          EventHandler.on(_this41._element, eventIn, _this41._config.selector, function (event) {
            return _this41._enter(event);
          });
          EventHandler.on(_this41._element, eventOut, _this41._config.selector, function (event) {
            return _this41._leave(event);
          });
        }
      });

      this._hideModalHandler = function () {
        if (_this41._element) {
          _this41.hide();
        }
      };

      EventHandler.on(this._element.closest(".".concat(CLASS_NAME_MODAL)), 'hide.bs.modal', this._hideModalHandler);

      if (this._config.selector) {
        this._config = _objectSpread(_objectSpread({}, this._config), {}, {
          trigger: 'manual',
          selector: ''
        });
      } else {
        this._fixTitle();
      }
    }
  }, {
    key: "_fixTitle",
    value: function _fixTitle() {
      var title = this._element.getAttribute('title');

      var originalTitleType = _typeof(this._element.getAttribute('data-bs-original-title'));

      if (title || originalTitleType !== 'string') {
        this._element.setAttribute('data-bs-original-title', title || '');

        if (title && !this._element.getAttribute('aria-label') && !this._element.textContent) {
          this._element.setAttribute('aria-label', title);
        }

        this._element.setAttribute('title', '');
      }
    }
  }, {
    key: "_enter",
    value: function _enter(event, context) {
      context = this._initializeOnDelegatedTarget(event, context);

      if (event) {
        context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
      }

      if (context.getTipElement().classList.contains(CLASS_NAME_SHOW$3) || context._hoverState === HOVER_STATE_SHOW) {
        context._hoverState = HOVER_STATE_SHOW;
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HOVER_STATE_SHOW;

      if (!context._config.delay || !context._config.delay.show) {
        context.show();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HOVER_STATE_SHOW) {
          context.show();
        }
      }, context._config.delay.show);
    }
  }, {
    key: "_leave",
    value: function _leave(event, context) {
      context = this._initializeOnDelegatedTarget(event, context);

      if (event) {
        context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);
      }

      if (context._isWithActiveTrigger()) {
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HOVER_STATE_OUT;

      if (!context._config.delay || !context._config.delay.hide) {
        context.hide();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HOVER_STATE_OUT) {
          context.hide();
        }
      }, context._config.delay.hide);
    }
  }, {
    key: "_isWithActiveTrigger",
    value: function _isWithActiveTrigger() {
      for (var trigger in this._activeTrigger) {
        if (this._activeTrigger[trigger]) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: "_getConfig",
    value: function _getConfig(config) {
      var dataAttributes = Manipulator.getDataAttributes(this._element);
      Object.keys(dataAttributes).forEach(function (dataAttr) {
        if (DISALLOWED_ATTRIBUTES.has(dataAttr)) {
          delete dataAttributes[dataAttr];
        }
      });
      config = _objectSpread(_objectSpread(_objectSpread({}, this.constructor.Default), dataAttributes), _typeof(config) === 'object' && config ? config : {});
      config.container = config.container === false ? document.body : getElement(config.container);

      if (typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }

      if (typeof config.title === 'number') {
        config.title = config.title.toString();
      }

      if (typeof config.content === 'number') {
        config.content = config.content.toString();
      }

      typeCheckConfig(NAME$4, config, this.constructor.DefaultType);

      if (config.sanitize) {
        config.template = sanitizeHtml(config.template, config.allowList, config.sanitizeFn);
      }

      return config;
    }
  }, {
    key: "_getDelegateConfig",
    value: function _getDelegateConfig() {
      var config = {};

      if (this._config) {
        for (var key in this._config) {
          if (this.constructor.Default[key] !== this._config[key]) {
            config[key] = this._config[key];
          }
        }
      }

      return config;
    }
  }, {
    key: "_cleanTipClass",
    value: function _cleanTipClass() {
      var tip = this.getTipElement();
      var tabClass = tip.getAttribute('class').match(BSCLS_PREFIX_REGEX$1);

      if (tabClass !== null && tabClass.length > 0) {
        tabClass.map(function (token) {
          return token.trim();
        }).forEach(function (tClass) {
          return tip.classList.remove(tClass);
        });
      }
    }
  }, {
    key: "_handlePopperPlacementChange",
    value: function _handlePopperPlacementChange(popperData) {
      var state = popperData.state;

      if (!state) {
        return;
      }

      this.tip = state.elements.popper;

      this._cleanTipClass();

      this._addAttachmentClass(this._getAttachment(state.placement));
    } // Static

  }], [{
    key: "Default",
    get: function get() {
      return Default$3;
    }
  }, {
    key: "NAME",
    get: function get() {
      return NAME$4;
    }
  }, {
    key: "Event",
    get: function get() {
      return Event$2;
    }
  }, {
    key: "DefaultType",
    get: function get() {
      return DefaultType$3;
    }
  }, {
    key: "jQueryInterface",
    value: function jQueryInterface(config) {
      return this.each(function () {
        var data = Tooltip.getOrCreateInstance(this, config);

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"".concat(config, "\""));
          }

          data[config]();
        }
      });
    }
  }]);

  return Tooltip;
}(BaseComponent);
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Tooltip to jQuery only if jQuery is present
 */


defineJQueryPlugin(Tooltip);
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.2): popover.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

var NAME$3 = 'popover';
var DATA_KEY$3 = 'bs.popover';
var EVENT_KEY$3 = ".".concat(DATA_KEY$3);
var CLASS_PREFIX = 'bs-popover';
var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)".concat(CLASS_PREFIX, "\\S+"), 'g');

var Default$2 = _objectSpread(_objectSpread({}, Tooltip.Default), {}, {
  placement: 'right',
  offset: [0, 8],
  trigger: 'click',
  content: '',
  template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div>' + '</div>'
});

var DefaultType$2 = _objectSpread(_objectSpread({}, Tooltip.DefaultType), {}, {
  content: '(string|element|function)'
});

var Event$1 = {
  HIDE: "hide".concat(EVENT_KEY$3),
  HIDDEN: "hidden".concat(EVENT_KEY$3),
  SHOW: "show".concat(EVENT_KEY$3),
  SHOWN: "shown".concat(EVENT_KEY$3),
  INSERTED: "inserted".concat(EVENT_KEY$3),
  CLICK: "click".concat(EVENT_KEY$3),
  FOCUSIN: "focusin".concat(EVENT_KEY$3),
  FOCUSOUT: "focusout".concat(EVENT_KEY$3),
  MOUSEENTER: "mouseenter".concat(EVENT_KEY$3),
  MOUSELEAVE: "mouseleave".concat(EVENT_KEY$3)
};
var CLASS_NAME_FADE$2 = 'fade';
var CLASS_NAME_SHOW$2 = 'show';
var SELECTOR_TITLE = '.popover-header';
var SELECTOR_CONTENT = '.popover-body';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var Popover = /*#__PURE__*/function (_Tooltip) {
  _inherits(Popover, _Tooltip);

  var _super9 = _createSuper(Popover);

  function Popover() {
    _classCallCheck(this, Popover);

    return _super9.apply(this, arguments);
  }

  _createClass(Popover, [{
    key: "isWithContent",
    value: // Overrides
    function isWithContent() {
      return this.getTitle() || this._getContent();
    }
  }, {
    key: "getTipElement",
    value: function getTipElement() {
      if (this.tip) {
        return this.tip;
      }

      this.tip = _get(_getPrototypeOf(Popover.prototype), "getTipElement", this).call(this);

      if (!this.getTitle()) {
        SelectorEngine.findOne(SELECTOR_TITLE, this.tip).remove();
      }

      if (!this._getContent()) {
        SelectorEngine.findOne(SELECTOR_CONTENT, this.tip).remove();
      }

      return this.tip;
    }
  }, {
    key: "setContent",
    value: function setContent() {
      var tip = this.getTipElement(); // we use append for html objects to maintain js events

      this.setElementContent(SelectorEngine.findOne(SELECTOR_TITLE, tip), this.getTitle());

      var content = this._getContent();

      if (typeof content === 'function') {
        content = content.call(this._element);
      }

      this.setElementContent(SelectorEngine.findOne(SELECTOR_CONTENT, tip), content);
      tip.classList.remove(CLASS_NAME_FADE$2, CLASS_NAME_SHOW$2);
    } // Private

  }, {
    key: "_addAttachmentClass",
    value: function _addAttachmentClass(attachment) {
      this.getTipElement().classList.add("".concat(CLASS_PREFIX, "-").concat(this.updateAttachment(attachment)));
    }
  }, {
    key: "_getContent",
    value: function _getContent() {
      return this._element.getAttribute('data-bs-content') || this._config.content;
    }
  }, {
    key: "_cleanTipClass",
    value: function _cleanTipClass() {
      var tip = this.getTipElement();
      var tabClass = tip.getAttribute('class').match(BSCLS_PREFIX_REGEX);

      if (tabClass !== null && tabClass.length > 0) {
        tabClass.map(function (token) {
          return token.trim();
        }).forEach(function (tClass) {
          return tip.classList.remove(tClass);
        });
      }
    } // Static

  }], [{
    key: "Default",
    get: // Getters
    function get() {
      return Default$2;
    }
  }, {
    key: "NAME",
    get: function get() {
      return NAME$3;
    }
  }, {
    key: "Event",
    get: function get() {
      return Event$1;
    }
  }, {
    key: "DefaultType",
    get: function get() {
      return DefaultType$2;
    }
  }, {
    key: "jQueryInterface",
    value: function jQueryInterface(config) {
      return this.each(function () {
        var data = Popover.getOrCreateInstance(this, config);

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"".concat(config, "\""));
          }

          data[config]();
        }
      });
    }
  }]);

  return Popover;
}(Tooltip);
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Popover to jQuery only if jQuery is present
 */


defineJQueryPlugin(Popover);
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.2): scrollspy.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

var NAME$2 = 'scrollspy';
var DATA_KEY$2 = 'bs.scrollspy';
var EVENT_KEY$2 = ".".concat(DATA_KEY$2);
var DATA_API_KEY$1 = '.data-api';
var Default$1 = {
  offset: 10,
  method: 'auto',
  target: ''
};
var DefaultType$1 = {
  offset: 'number',
  method: 'string',
  target: '(string|element)'
};
var EVENT_ACTIVATE = "activate".concat(EVENT_KEY$2);
var EVENT_SCROLL = "scroll".concat(EVENT_KEY$2);
var EVENT_LOAD_DATA_API = "load".concat(EVENT_KEY$2).concat(DATA_API_KEY$1);
var CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
var CLASS_NAME_ACTIVE$1 = 'active';
var SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
var SELECTOR_NAV_LIST_GROUP$1 = '.nav, .list-group';
var SELECTOR_NAV_LINKS = '.nav-link';
var SELECTOR_NAV_ITEMS = '.nav-item';
var SELECTOR_LIST_ITEMS = '.list-group-item';
var SELECTOR_DROPDOWN$1 = '.dropdown';
var SELECTOR_DROPDOWN_TOGGLE$1 = '.dropdown-toggle';
var METHOD_OFFSET = 'offset';
var METHOD_POSITION = 'position';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var ScrollSpy = /*#__PURE__*/function (_BaseComponent9) {
  _inherits(ScrollSpy, _BaseComponent9);

  var _super10 = _createSuper(ScrollSpy);

  function ScrollSpy(element, config) {
    var _this42;

    _classCallCheck(this, ScrollSpy);

    _this42 = _super10.call(this, element);
    _this42._scrollElement = _this42._element.tagName === 'BODY' ? window : _this42._element;
    _this42._config = _this42._getConfig(config);
    _this42._selector = "".concat(_this42._config.target, " ").concat(SELECTOR_NAV_LINKS, ", ").concat(_this42._config.target, " ").concat(SELECTOR_LIST_ITEMS, ", ").concat(_this42._config.target, " .").concat(CLASS_NAME_DROPDOWN_ITEM);
    _this42._offsets = [];
    _this42._targets = [];
    _this42._activeTarget = null;
    _this42._scrollHeight = 0;
    EventHandler.on(_this42._scrollElement, EVENT_SCROLL, function () {
      return _this42._process();
    });

    _this42.refresh();

    _this42._process();

    return _this42;
  } // Getters


  _createClass(ScrollSpy, [{
    key: "refresh",
    value: // Public
    function refresh() {
      var _this43 = this;

      var autoMethod = this._scrollElement === this._scrollElement.window ? METHOD_OFFSET : METHOD_POSITION;
      var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
      var offsetBase = offsetMethod === METHOD_POSITION ? this._getScrollTop() : 0;
      this._offsets = [];
      this._targets = [];
      this._scrollHeight = this._getScrollHeight();
      var targets = SelectorEngine.find(this._selector);
      targets.map(function (element) {
        var targetSelector = getSelectorFromElement(element);
        var target = targetSelector ? SelectorEngine.findOne(targetSelector) : null;

        if (target) {
          var targetBCR = target.getBoundingClientRect();

          if (targetBCR.width || targetBCR.height) {
            return [Manipulator[offsetMethod](target).top + offsetBase, targetSelector];
          }
        }

        return null;
      }).filter(function (item) {
        return item;
      }).sort(function (a, b) {
        return a[0] - b[0];
      }).forEach(function (item) {
        _this43._offsets.push(item[0]);

        _this43._targets.push(item[1]);
      });
    }
  }, {
    key: "dispose",
    value: function dispose() {
      EventHandler.off(this._scrollElement, EVENT_KEY$2);

      _get(_getPrototypeOf(ScrollSpy.prototype), "dispose", this).call(this);
    } // Private

  }, {
    key: "_getConfig",
    value: function _getConfig(config) {
      config = _objectSpread(_objectSpread(_objectSpread({}, Default$1), Manipulator.getDataAttributes(this._element)), _typeof(config) === 'object' && config ? config : {});

      if (typeof config.target !== 'string' && isElement(config.target)) {
        var id = config.target.id;

        if (!id) {
          id = getUID(NAME$2);
          config.target.id = id;
        }

        config.target = "#".concat(id);
      }

      typeCheckConfig(NAME$2, config, DefaultType$1);
      return config;
    }
  }, {
    key: "_getScrollTop",
    value: function _getScrollTop() {
      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
    }
  }, {
    key: "_getScrollHeight",
    value: function _getScrollHeight() {
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    }
  }, {
    key: "_getOffsetHeight",
    value: function _getOffsetHeight() {
      return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
    }
  }, {
    key: "_process",
    value: function _process() {
      var scrollTop = this._getScrollTop() + this._config.offset;

      var scrollHeight = this._getScrollHeight();

      var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

      if (this._scrollHeight !== scrollHeight) {
        this.refresh();
      }

      if (scrollTop >= maxScroll) {
        var target = this._targets[this._targets.length - 1];

        if (this._activeTarget !== target) {
          this._activate(target);
        }

        return;
      }

      if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
        this._activeTarget = null;

        this._clear();

        return;
      }

      for (var i = this._offsets.length; i--;) {
        var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

        if (isActiveTarget) {
          this._activate(this._targets[i]);
        }
      }
    }
  }, {
    key: "_activate",
    value: function _activate(target) {
      this._activeTarget = target;

      this._clear();

      var queries = this._selector.split(',').map(function (selector) {
        return "".concat(selector, "[data-bs-target=\"").concat(target, "\"],").concat(selector, "[href=\"").concat(target, "\"]");
      });

      var link = SelectorEngine.findOne(queries.join(','));

      if (link.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
        SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE$1, link.closest(SELECTOR_DROPDOWN$1)).classList.add(CLASS_NAME_ACTIVE$1);
        link.classList.add(CLASS_NAME_ACTIVE$1);
      } else {
        // Set triggered link as active
        link.classList.add(CLASS_NAME_ACTIVE$1);
        SelectorEngine.parents(link, SELECTOR_NAV_LIST_GROUP$1).forEach(function (listGroup) {
          // Set triggered links parents as active
          // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
          SelectorEngine.prev(listGroup, "".concat(SELECTOR_NAV_LINKS, ", ").concat(SELECTOR_LIST_ITEMS)).forEach(function (item) {
            return item.classList.add(CLASS_NAME_ACTIVE$1);
          }); // Handle special case when .nav-link is inside .nav-item

          SelectorEngine.prev(listGroup, SELECTOR_NAV_ITEMS).forEach(function (navItem) {
            SelectorEngine.children(navItem, SELECTOR_NAV_LINKS).forEach(function (item) {
              return item.classList.add(CLASS_NAME_ACTIVE$1);
            });
          });
        });
      }

      EventHandler.trigger(this._scrollElement, EVENT_ACTIVATE, {
        relatedTarget: target
      });
    }
  }, {
    key: "_clear",
    value: function _clear() {
      SelectorEngine.find(this._selector).filter(function (node) {
        return node.classList.contains(CLASS_NAME_ACTIVE$1);
      }).forEach(function (node) {
        return node.classList.remove(CLASS_NAME_ACTIVE$1);
      });
    } // Static

  }], [{
    key: "Default",
    get: function get() {
      return Default$1;
    }
  }, {
    key: "NAME",
    get: function get() {
      return NAME$2;
    }
  }, {
    key: "jQueryInterface",
    value: function jQueryInterface(config) {
      return this.each(function () {
        var data = ScrollSpy.getOrCreateInstance(this, config);

        if (typeof config !== 'string') {
          return;
        }

        if (typeof data[config] === 'undefined') {
          throw new TypeError("No method named \"".concat(config, "\""));
        }

        data[config]();
      });
    }
  }]);

  return ScrollSpy;
}(BaseComponent);
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


EventHandler.on(window, EVENT_LOAD_DATA_API, function () {
  SelectorEngine.find(SELECTOR_DATA_SPY).forEach(function (spy) {
    return new ScrollSpy(spy);
  });
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .ScrollSpy to jQuery only if jQuery is present
 */

defineJQueryPlugin(ScrollSpy);
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.2): tab.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

var NAME$1 = 'tab';
var DATA_KEY$1 = 'bs.tab';
var EVENT_KEY$1 = ".".concat(DATA_KEY$1);
var DATA_API_KEY = '.data-api';
var EVENT_HIDE$1 = "hide".concat(EVENT_KEY$1);
var EVENT_HIDDEN$1 = "hidden".concat(EVENT_KEY$1);
var EVENT_SHOW$1 = "show".concat(EVENT_KEY$1);
var EVENT_SHOWN$1 = "shown".concat(EVENT_KEY$1);
var EVENT_CLICK_DATA_API = "click".concat(EVENT_KEY$1).concat(DATA_API_KEY);
var CLASS_NAME_DROPDOWN_MENU = 'dropdown-menu';
var CLASS_NAME_ACTIVE = 'active';
var CLASS_NAME_FADE$1 = 'fade';
var CLASS_NAME_SHOW$1 = 'show';
var SELECTOR_DROPDOWN = '.dropdown';
var SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
var SELECTOR_ACTIVE = '.active';
var SELECTOR_ACTIVE_UL = ':scope > li > .active';
var SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]';
var SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
var SELECTOR_DROPDOWN_ACTIVE_CHILD = ':scope > .dropdown-menu .active';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var Tab = /*#__PURE__*/function (_BaseComponent10) {
  _inherits(Tab, _BaseComponent10);

  var _super11 = _createSuper(Tab);

  function Tab() {
    _classCallCheck(this, Tab);

    return _super11.apply(this, arguments);
  }

  _createClass(Tab, [{
    key: "show",
    value: // Public
    function show() {
      var _this44 = this;

      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && this._element.classList.contains(CLASS_NAME_ACTIVE)) {
        return;
      }

      var previous;
      var target = getElementFromSelector(this._element);

      var listElement = this._element.closest(SELECTOR_NAV_LIST_GROUP);

      if (listElement) {
        var itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? SELECTOR_ACTIVE_UL : SELECTOR_ACTIVE;
        previous = SelectorEngine.find(itemSelector, listElement);
        previous = previous[previous.length - 1];
      }

      var hideEvent = previous ? EventHandler.trigger(previous, EVENT_HIDE$1, {
        relatedTarget: this._element
      }) : null;
      var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$1, {
        relatedTarget: previous
      });

      if (showEvent.defaultPrevented || hideEvent !== null && hideEvent.defaultPrevented) {
        return;
      }

      this._activate(this._element, listElement);

      var complete = function complete() {
        EventHandler.trigger(previous, EVENT_HIDDEN$1, {
          relatedTarget: _this44._element
        });
        EventHandler.trigger(_this44._element, EVENT_SHOWN$1, {
          relatedTarget: previous
        });
      };

      if (target) {
        this._activate(target, target.parentNode, complete);
      } else {
        complete();
      }
    } // Private

  }, {
    key: "_activate",
    value: function _activate(element, container, callback) {
      var _this45 = this;

      var activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? SelectorEngine.find(SELECTOR_ACTIVE_UL, container) : SelectorEngine.children(container, SELECTOR_ACTIVE);
      var active = activeElements[0];
      var isTransitioning = callback && active && active.classList.contains(CLASS_NAME_FADE$1);

      var complete = function complete() {
        return _this45._transitionComplete(element, active, callback);
      };

      if (active && isTransitioning) {
        active.classList.remove(CLASS_NAME_SHOW$1);

        this._queueCallback(complete, element, true);
      } else {
        complete();
      }
    }
  }, {
    key: "_transitionComplete",
    value: function _transitionComplete(element, active, callback) {
      if (active) {
        active.classList.remove(CLASS_NAME_ACTIVE);
        var dropdownChild = SelectorEngine.findOne(SELECTOR_DROPDOWN_ACTIVE_CHILD, active.parentNode);

        if (dropdownChild) {
          dropdownChild.classList.remove(CLASS_NAME_ACTIVE);
        }

        if (active.getAttribute('role') === 'tab') {
          active.setAttribute('aria-selected', false);
        }
      }

      element.classList.add(CLASS_NAME_ACTIVE);

      if (element.getAttribute('role') === 'tab') {
        element.setAttribute('aria-selected', true);
      }

      reflow(element);

      if (element.classList.contains(CLASS_NAME_FADE$1)) {
        element.classList.add(CLASS_NAME_SHOW$1);
      }

      var parent = element.parentNode;

      if (parent && parent.nodeName === 'LI') {
        parent = parent.parentNode;
      }

      if (parent && parent.classList.contains(CLASS_NAME_DROPDOWN_MENU)) {
        var dropdownElement = element.closest(SELECTOR_DROPDOWN);

        if (dropdownElement) {
          SelectorEngine.find(SELECTOR_DROPDOWN_TOGGLE, dropdownElement).forEach(function (dropdown) {
            return dropdown.classList.add(CLASS_NAME_ACTIVE);
          });
        }

        element.setAttribute('aria-expanded', true);
      }

      if (callback) {
        callback();
      }
    } // Static

  }], [{
    key: "NAME",
    get: // Getters
    function get() {
      return NAME$1;
    }
  }, {
    key: "jQueryInterface",
    value: function jQueryInterface(config) {
      return this.each(function () {
        var data = Tab.getOrCreateInstance(this);

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"".concat(config, "\""));
          }

          data[config]();
        }
      });
    }
  }]);

  return Tab;
}(BaseComponent);
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
  if (['A', 'AREA'].includes(this.tagName)) {
    event.preventDefault();
  }

  if (isDisabled(this)) {
    return;
  }

  var data = Tab.getOrCreateInstance(this);
  data.show();
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Tab to jQuery only if jQuery is present
 */

defineJQueryPlugin(Tab);
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.2): toast.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

var NAME = 'toast';
var DATA_KEY = 'bs.toast';
var EVENT_KEY = ".".concat(DATA_KEY);
var EVENT_CLICK_DISMISS = "click.dismiss".concat(EVENT_KEY);
var EVENT_MOUSEOVER = "mouseover".concat(EVENT_KEY);
var EVENT_MOUSEOUT = "mouseout".concat(EVENT_KEY);
var EVENT_FOCUSIN = "focusin".concat(EVENT_KEY);
var EVENT_FOCUSOUT = "focusout".concat(EVENT_KEY);
var EVENT_HIDE = "hide".concat(EVENT_KEY);
var EVENT_HIDDEN = "hidden".concat(EVENT_KEY);
var EVENT_SHOW = "show".concat(EVENT_KEY);
var EVENT_SHOWN = "shown".concat(EVENT_KEY);
var CLASS_NAME_FADE = 'fade';
var CLASS_NAME_HIDE = 'hide';
var CLASS_NAME_SHOW = 'show';
var CLASS_NAME_SHOWING = 'showing';
var DefaultType = {
  animation: 'boolean',
  autohide: 'boolean',
  delay: 'number'
};
var Default = {
  animation: true,
  autohide: true,
  delay: 5000
};
var SELECTOR_DATA_DISMISS = '[data-bs-dismiss="toast"]';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var Toast = /*#__PURE__*/function (_BaseComponent11) {
  _inherits(Toast, _BaseComponent11);

  var _super12 = _createSuper(Toast);

  function Toast(element, config) {
    var _this46;

    _classCallCheck(this, Toast);

    _this46 = _super12.call(this, element);
    _this46._config = _this46._getConfig(config);
    _this46._timeout = null;
    _this46._hasMouseInteraction = false;
    _this46._hasKeyboardInteraction = false;

    _this46._setListeners();

    return _this46;
  } // Getters


  _createClass(Toast, [{
    key: "show",
    value: // Public
    function show() {
      var _this47 = this;

      var showEvent = EventHandler.trigger(this._element, EVENT_SHOW);

      if (showEvent.defaultPrevented) {
        return;
      }

      this._clearTimeout();

      if (this._config.animation) {
        this._element.classList.add(CLASS_NAME_FADE);
      }

      var complete = function complete() {
        _this47._element.classList.remove(CLASS_NAME_SHOWING);

        _this47._element.classList.add(CLASS_NAME_SHOW);

        EventHandler.trigger(_this47._element, EVENT_SHOWN);

        _this47._maybeScheduleHide();
      };

      this._element.classList.remove(CLASS_NAME_HIDE);

      reflow(this._element);

      this._element.classList.add(CLASS_NAME_SHOWING);

      this._queueCallback(complete, this._element, this._config.animation);
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this48 = this;

      if (!this._element.classList.contains(CLASS_NAME_SHOW)) {
        return;
      }

      var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);

      if (hideEvent.defaultPrevented) {
        return;
      }

      var complete = function complete() {
        _this48._element.classList.add(CLASS_NAME_HIDE);

        EventHandler.trigger(_this48._element, EVENT_HIDDEN);
      };

      this._element.classList.remove(CLASS_NAME_SHOW);

      this._queueCallback(complete, this._element, this._config.animation);
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this._clearTimeout();

      if (this._element.classList.contains(CLASS_NAME_SHOW)) {
        this._element.classList.remove(CLASS_NAME_SHOW);
      }

      _get(_getPrototypeOf(Toast.prototype), "dispose", this).call(this);
    } // Private

  }, {
    key: "_getConfig",
    value: function _getConfig(config) {
      config = _objectSpread(_objectSpread(_objectSpread({}, Default), Manipulator.getDataAttributes(this._element)), _typeof(config) === 'object' && config ? config : {});
      typeCheckConfig(NAME, config, this.constructor.DefaultType);
      return config;
    }
  }, {
    key: "_maybeScheduleHide",
    value: function _maybeScheduleHide() {
      var _this49 = this;

      if (!this._config.autohide) {
        return;
      }

      if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
        return;
      }

      this._timeout = setTimeout(function () {
        _this49.hide();
      }, this._config.delay);
    }
  }, {
    key: "_onInteraction",
    value: function _onInteraction(event, isInteracting) {
      switch (event.type) {
        case 'mouseover':
        case 'mouseout':
          this._hasMouseInteraction = isInteracting;
          break;

        case 'focusin':
        case 'focusout':
          this._hasKeyboardInteraction = isInteracting;
          break;
      }

      if (isInteracting) {
        this._clearTimeout();

        return;
      }

      var nextElement = event.relatedTarget;

      if (this._element === nextElement || this._element.contains(nextElement)) {
        return;
      }

      this._maybeScheduleHide();
    }
  }, {
    key: "_setListeners",
    value: function _setListeners() {
      var _this50 = this;

      EventHandler.on(this._element, EVENT_CLICK_DISMISS, SELECTOR_DATA_DISMISS, function () {
        return _this50.hide();
      });
      EventHandler.on(this._element, EVENT_MOUSEOVER, function (event) {
        return _this50._onInteraction(event, true);
      });
      EventHandler.on(this._element, EVENT_MOUSEOUT, function (event) {
        return _this50._onInteraction(event, false);
      });
      EventHandler.on(this._element, EVENT_FOCUSIN, function (event) {
        return _this50._onInteraction(event, true);
      });
      EventHandler.on(this._element, EVENT_FOCUSOUT, function (event) {
        return _this50._onInteraction(event, false);
      });
    }
  }, {
    key: "_clearTimeout",
    value: function _clearTimeout() {
      clearTimeout(this._timeout);
      this._timeout = null;
    } // Static

  }], [{
    key: "DefaultType",
    get: function get() {
      return DefaultType;
    }
  }, {
    key: "Default",
    get: function get() {
      return Default;
    }
  }, {
    key: "NAME",
    get: function get() {
      return NAME;
    }
  }, {
    key: "jQueryInterface",
    value: function jQueryInterface(config) {
      return this.each(function () {
        var data = Toast.getOrCreateInstance(this, config);

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"".concat(config, "\""));
          }

          data[config](this);
        }
      });
    }
  }]);

  return Toast;
}(BaseComponent);
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Toast to jQuery only if jQuery is present
 */


defineJQueryPlugin(Toast);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/font-awesome/scss/font-awesome.scss":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-1!./node_modules/postcss-loader/src??ref--6-2!./node_modules/sass-loader/dist/cjs.js??ref--6-3!./node_modules/font-awesome/scss/font-awesome.scss ***!
  \*******************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_GET_URL_IMPORT___ = __webpack_require__(/*! ../../css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL_IMPORT_0___ = __webpack_require__(/*! ../fonts/fontawesome-webfont.eot?v=4.7.0 */ "./node_modules/font-awesome/fonts/fontawesome-webfont.eot?v=4.7.0");
var ___CSS_LOADER_URL_IMPORT_1___ = __webpack_require__(/*! ../fonts/fontawesome-webfont.eot */ "./node_modules/font-awesome/fonts/fontawesome-webfont.eot");
var ___CSS_LOADER_URL_IMPORT_2___ = __webpack_require__(/*! ../fonts/fontawesome-webfont.woff2?v=4.7.0 */ "./node_modules/font-awesome/fonts/fontawesome-webfont.woff2?v=4.7.0");
var ___CSS_LOADER_URL_IMPORT_3___ = __webpack_require__(/*! ../fonts/fontawesome-webfont.woff?v=4.7.0 */ "./node_modules/font-awesome/fonts/fontawesome-webfont.woff?v=4.7.0");
var ___CSS_LOADER_URL_IMPORT_4___ = __webpack_require__(/*! ../fonts/fontawesome-webfont.ttf?v=4.7.0 */ "./node_modules/font-awesome/fonts/fontawesome-webfont.ttf?v=4.7.0");
var ___CSS_LOADER_URL_IMPORT_5___ = __webpack_require__(/*! ../fonts/fontawesome-webfont.svg?v=4.7.0 */ "./node_modules/font-awesome/fonts/fontawesome-webfont.svg?v=4.7.0");
exports = ___CSS_LOADER_API_IMPORT___(true);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_1___, { hash: "?#iefix&v=4.7.0" });
var ___CSS_LOADER_URL_REPLACEMENT_2___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_3___);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_4___);
var ___CSS_LOADER_URL_REPLACEMENT_5___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_5___, { hash: "#fontawesomeregular" });
// Module
exports.push([module.i, "@charset \"UTF-8\";\n/*!\n *  Font Awesome 4.7.0 by @davegandy - http://fontawesome.io - @fontawesome\n *  License - http://fontawesome.io/license (Font: SIL OFL 1.1, CSS: MIT License)\n */\n/* FONT PATH\n * -------------------------- */\n@font-face {\n  font-family: \"FontAwesome\";\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") format(\"embedded-opentype\"), url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ") format(\"woff2\"), url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ") format(\"woff\"), url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + ") format(\"truetype\"), url(" + ___CSS_LOADER_URL_REPLACEMENT_5___ + ") format(\"svg\");\n  font-weight: normal;\n  font-style: normal;\n}\n.fa {\n  display: inline-block;\n  font: normal normal normal 14px/1 FontAwesome;\n  font-size: inherit;\n  text-rendering: auto;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n/* makes the font 33% larger relative to the icon container */\n.fa-lg {\n  font-size: 1.3333333333em;\n  line-height: 0.75em;\n  vertical-align: -15%;\n}\n.fa-2x {\n  font-size: 2em;\n}\n.fa-3x {\n  font-size: 3em;\n}\n.fa-4x {\n  font-size: 4em;\n}\n.fa-5x {\n  font-size: 5em;\n}\n.fa-fw {\n  width: 1.2857142857em;\n  text-align: center;\n}\n.fa-ul {\n  padding-left: 0;\n  margin-left: 2.1428571429em;\n  list-style-type: none;\n}\n.fa-ul > li {\n  position: relative;\n}\n.fa-li {\n  position: absolute;\n  left: -2.1428571429em;\n  width: 2.1428571429em;\n  top: 0.1428571429em;\n  text-align: center;\n}\n.fa-li.fa-lg {\n  left: -1.8571428571em;\n}\n.fa-border {\n  padding: 0.2em 0.25em 0.15em;\n  border: solid 0.08em #eee;\n  border-radius: 0.1em;\n}\n.fa-pull-left {\n  float: left;\n}\n.fa-pull-right {\n  float: right;\n}\n.fa.fa-pull-left {\n  margin-right: 0.3em;\n}\n.fa.fa-pull-right {\n  margin-left: 0.3em;\n}\n/* Deprecated as of 4.4.0 */\n.pull-right {\n  float: right;\n}\n.pull-left {\n  float: left;\n}\n.fa.pull-left {\n  margin-right: 0.3em;\n}\n.fa.pull-right {\n  margin-left: 0.3em;\n}\n.fa-spin {\n  -webkit-animation: fa-spin 2s infinite linear;\n  animation: fa-spin 2s infinite linear;\n}\n.fa-pulse {\n  -webkit-animation: fa-spin 1s infinite steps(8);\n  animation: fa-spin 1s infinite steps(8);\n}\n@-webkit-keyframes fa-spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(359deg);\n  }\n}\n@keyframes fa-spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(359deg);\n  }\n}\n.fa-rotate-90 {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=1)\";\n  transform: rotate(90deg);\n}\n.fa-rotate-180 {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=2)\";\n  transform: rotate(180deg);\n}\n.fa-rotate-270 {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=3)\";\n  transform: rotate(270deg);\n}\n.fa-flip-horizontal {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)\";\n  transform: scale(-1, 1);\n}\n.fa-flip-vertical {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)\";\n  transform: scale(1, -1);\n}\n:root .fa-rotate-90,\n:root .fa-rotate-180,\n:root .fa-rotate-270,\n:root .fa-flip-horizontal,\n:root .fa-flip-vertical {\n  filter: none;\n}\n.fa-stack {\n  position: relative;\n  display: inline-block;\n  width: 2em;\n  height: 2em;\n  line-height: 2em;\n  vertical-align: middle;\n}\n.fa-stack-1x, .fa-stack-2x {\n  position: absolute;\n  left: 0;\n  width: 100%;\n  text-align: center;\n}\n.fa-stack-1x {\n  line-height: inherit;\n}\n.fa-stack-2x {\n  font-size: 2em;\n}\n.fa-inverse {\n  color: #fff;\n}\n/* Font Awesome uses the Unicode Private Use Area (PUA) to ensure screen\n   readers do not read off random characters that represent icons */\n.fa-glass:before {\n  content: \"\";\n}\n.fa-music:before {\n  content: \"\";\n}\n.fa-search:before {\n  content: \"\";\n}\n.fa-envelope-o:before {\n  content: \"\";\n}\n.fa-heart:before {\n  content: \"\";\n}\n.fa-star:before {\n  content: \"\";\n}\n.fa-star-o:before {\n  content: \"\";\n}\n.fa-user:before {\n  content: \"\";\n}\n.fa-film:before {\n  content: \"\";\n}\n.fa-th-large:before {\n  content: \"\";\n}\n.fa-th:before {\n  content: \"\";\n}\n.fa-th-list:before {\n  content: \"\";\n}\n.fa-check:before {\n  content: \"\";\n}\n.fa-remove:before,\n.fa-close:before,\n.fa-times:before {\n  content: \"\";\n}\n.fa-search-plus:before {\n  content: \"\";\n}\n.fa-search-minus:before {\n  content: \"\";\n}\n.fa-power-off:before {\n  content: \"\";\n}\n.fa-signal:before {\n  content: \"\";\n}\n.fa-gear:before,\n.fa-cog:before {\n  content: \"\";\n}\n.fa-trash-o:before {\n  content: \"\";\n}\n.fa-home:before {\n  content: \"\";\n}\n.fa-file-o:before {\n  content: \"\";\n}\n.fa-clock-o:before {\n  content: \"\";\n}\n.fa-road:before {\n  content: \"\";\n}\n.fa-download:before {\n  content: \"\";\n}\n.fa-arrow-circle-o-down:before {\n  content: \"\";\n}\n.fa-arrow-circle-o-up:before {\n  content: \"\";\n}\n.fa-inbox:before {\n  content: \"\";\n}\n.fa-play-circle-o:before {\n  content: \"\";\n}\n.fa-rotate-right:before,\n.fa-repeat:before {\n  content: \"\";\n}\n.fa-refresh:before {\n  content: \"\";\n}\n.fa-list-alt:before {\n  content: \"\";\n}\n.fa-lock:before {\n  content: \"\";\n}\n.fa-flag:before {\n  content: \"\";\n}\n.fa-headphones:before {\n  content: \"\";\n}\n.fa-volume-off:before {\n  content: \"\";\n}\n.fa-volume-down:before {\n  content: \"\";\n}\n.fa-volume-up:before {\n  content: \"\";\n}\n.fa-qrcode:before {\n  content: \"\";\n}\n.fa-barcode:before {\n  content: \"\";\n}\n.fa-tag:before {\n  content: \"\";\n}\n.fa-tags:before {\n  content: \"\";\n}\n.fa-book:before {\n  content: \"\";\n}\n.fa-bookmark:before {\n  content: \"\";\n}\n.fa-print:before {\n  content: \"\";\n}\n.fa-camera:before {\n  content: \"\";\n}\n.fa-font:before {\n  content: \"\";\n}\n.fa-bold:before {\n  content: \"\";\n}\n.fa-italic:before {\n  content: \"\";\n}\n.fa-text-height:before {\n  content: \"\";\n}\n.fa-text-width:before {\n  content: \"\";\n}\n.fa-align-left:before {\n  content: \"\";\n}\n.fa-align-center:before {\n  content: \"\";\n}\n.fa-align-right:before {\n  content: \"\";\n}\n.fa-align-justify:before {\n  content: \"\";\n}\n.fa-list:before {\n  content: \"\";\n}\n.fa-dedent:before,\n.fa-outdent:before {\n  content: \"\";\n}\n.fa-indent:before {\n  content: \"\";\n}\n.fa-video-camera:before {\n  content: \"\";\n}\n.fa-photo:before,\n.fa-image:before,\n.fa-picture-o:before {\n  content: \"\";\n}\n.fa-pencil:before {\n  content: \"\";\n}\n.fa-map-marker:before {\n  content: \"\";\n}\n.fa-adjust:before {\n  content: \"\";\n}\n.fa-tint:before {\n  content: \"\";\n}\n.fa-edit:before,\n.fa-pencil-square-o:before {\n  content: \"\";\n}\n.fa-share-square-o:before {\n  content: \"\";\n}\n.fa-check-square-o:before {\n  content: \"\";\n}\n.fa-arrows:before {\n  content: \"\";\n}\n.fa-step-backward:before {\n  content: \"\";\n}\n.fa-fast-backward:before {\n  content: \"\";\n}\n.fa-backward:before {\n  content: \"\";\n}\n.fa-play:before {\n  content: \"\";\n}\n.fa-pause:before {\n  content: \"\";\n}\n.fa-stop:before {\n  content: \"\";\n}\n.fa-forward:before {\n  content: \"\";\n}\n.fa-fast-forward:before {\n  content: \"\";\n}\n.fa-step-forward:before {\n  content: \"\";\n}\n.fa-eject:before {\n  content: \"\";\n}\n.fa-chevron-left:before {\n  content: \"\";\n}\n.fa-chevron-right:before {\n  content: \"\";\n}\n.fa-plus-circle:before {\n  content: \"\";\n}\n.fa-minus-circle:before {\n  content: \"\";\n}\n.fa-times-circle:before {\n  content: \"\";\n}\n.fa-check-circle:before {\n  content: \"\";\n}\n.fa-question-circle:before {\n  content: \"\";\n}\n.fa-info-circle:before {\n  content: \"\";\n}\n.fa-crosshairs:before {\n  content: \"\";\n}\n.fa-times-circle-o:before {\n  content: \"\";\n}\n.fa-check-circle-o:before {\n  content: \"\";\n}\n.fa-ban:before {\n  content: \"\";\n}\n.fa-arrow-left:before {\n  content: \"\";\n}\n.fa-arrow-right:before {\n  content: \"\";\n}\n.fa-arrow-up:before {\n  content: \"\";\n}\n.fa-arrow-down:before {\n  content: \"\";\n}\n.fa-mail-forward:before,\n.fa-share:before {\n  content: \"\";\n}\n.fa-expand:before {\n  content: \"\";\n}\n.fa-compress:before {\n  content: \"\";\n}\n.fa-plus:before {\n  content: \"\";\n}\n.fa-minus:before {\n  content: \"\";\n}\n.fa-asterisk:before {\n  content: \"\";\n}\n.fa-exclamation-circle:before {\n  content: \"\";\n}\n.fa-gift:before {\n  content: \"\";\n}\n.fa-leaf:before {\n  content: \"\";\n}\n.fa-fire:before {\n  content: \"\";\n}\n.fa-eye:before {\n  content: \"\";\n}\n.fa-eye-slash:before {\n  content: \"\";\n}\n.fa-warning:before,\n.fa-exclamation-triangle:before {\n  content: \"\";\n}\n.fa-plane:before {\n  content: \"\";\n}\n.fa-calendar:before {\n  content: \"\";\n}\n.fa-random:before {\n  content: \"\";\n}\n.fa-comment:before {\n  content: \"\";\n}\n.fa-magnet:before {\n  content: \"\";\n}\n.fa-chevron-up:before {\n  content: \"\";\n}\n.fa-chevron-down:before {\n  content: \"\";\n}\n.fa-retweet:before {\n  content: \"\";\n}\n.fa-shopping-cart:before {\n  content: \"\";\n}\n.fa-folder:before {\n  content: \"\";\n}\n.fa-folder-open:before {\n  content: \"\";\n}\n.fa-arrows-v:before {\n  content: \"\";\n}\n.fa-arrows-h:before {\n  content: \"\";\n}\n.fa-bar-chart-o:before,\n.fa-bar-chart:before {\n  content: \"\";\n}\n.fa-twitter-square:before {\n  content: \"\";\n}\n.fa-facebook-square:before {\n  content: \"\";\n}\n.fa-camera-retro:before {\n  content: \"\";\n}\n.fa-key:before {\n  content: \"\";\n}\n.fa-gears:before,\n.fa-cogs:before {\n  content: \"\";\n}\n.fa-comments:before {\n  content: \"\";\n}\n.fa-thumbs-o-up:before {\n  content: \"\";\n}\n.fa-thumbs-o-down:before {\n  content: \"\";\n}\n.fa-star-half:before {\n  content: \"\";\n}\n.fa-heart-o:before {\n  content: \"\";\n}\n.fa-sign-out:before {\n  content: \"\";\n}\n.fa-linkedin-square:before {\n  content: \"\";\n}\n.fa-thumb-tack:before {\n  content: \"\";\n}\n.fa-external-link:before {\n  content: \"\";\n}\n.fa-sign-in:before {\n  content: \"\";\n}\n.fa-trophy:before {\n  content: \"\";\n}\n.fa-github-square:before {\n  content: \"\";\n}\n.fa-upload:before {\n  content: \"\";\n}\n.fa-lemon-o:before {\n  content: \"\";\n}\n.fa-phone:before {\n  content: \"\";\n}\n.fa-square-o:before {\n  content: \"\";\n}\n.fa-bookmark-o:before {\n  content: \"\";\n}\n.fa-phone-square:before {\n  content: \"\";\n}\n.fa-twitter:before {\n  content: \"\";\n}\n.fa-facebook-f:before,\n.fa-facebook:before {\n  content: \"\";\n}\n.fa-github:before {\n  content: \"\";\n}\n.fa-unlock:before {\n  content: \"\";\n}\n.fa-credit-card:before {\n  content: \"\";\n}\n.fa-feed:before,\n.fa-rss:before {\n  content: \"\";\n}\n.fa-hdd-o:before {\n  content: \"\";\n}\n.fa-bullhorn:before {\n  content: \"\";\n}\n.fa-bell:before {\n  content: \"\";\n}\n.fa-certificate:before {\n  content: \"\";\n}\n.fa-hand-o-right:before {\n  content: \"\";\n}\n.fa-hand-o-left:before {\n  content: \"\";\n}\n.fa-hand-o-up:before {\n  content: \"\";\n}\n.fa-hand-o-down:before {\n  content: \"\";\n}\n.fa-arrow-circle-left:before {\n  content: \"\";\n}\n.fa-arrow-circle-right:before {\n  content: \"\";\n}\n.fa-arrow-circle-up:before {\n  content: \"\";\n}\n.fa-arrow-circle-down:before {\n  content: \"\";\n}\n.fa-globe:before {\n  content: \"\";\n}\n.fa-wrench:before {\n  content: \"\";\n}\n.fa-tasks:before {\n  content: \"\";\n}\n.fa-filter:before {\n  content: \"\";\n}\n.fa-briefcase:before {\n  content: \"\";\n}\n.fa-arrows-alt:before {\n  content: \"\";\n}\n.fa-group:before,\n.fa-users:before {\n  content: \"\";\n}\n.fa-chain:before,\n.fa-link:before {\n  content: \"\";\n}\n.fa-cloud:before {\n  content: \"\";\n}\n.fa-flask:before {\n  content: \"\";\n}\n.fa-cut:before,\n.fa-scissors:before {\n  content: \"\";\n}\n.fa-copy:before,\n.fa-files-o:before {\n  content: \"\";\n}\n.fa-paperclip:before {\n  content: \"\";\n}\n.fa-save:before,\n.fa-floppy-o:before {\n  content: \"\";\n}\n.fa-square:before {\n  content: \"\";\n}\n.fa-navicon:before,\n.fa-reorder:before,\n.fa-bars:before {\n  content: \"\";\n}\n.fa-list-ul:before {\n  content: \"\";\n}\n.fa-list-ol:before {\n  content: \"\";\n}\n.fa-strikethrough:before {\n  content: \"\";\n}\n.fa-underline:before {\n  content: \"\";\n}\n.fa-table:before {\n  content: \"\";\n}\n.fa-magic:before {\n  content: \"\";\n}\n.fa-truck:before {\n  content: \"\";\n}\n.fa-pinterest:before {\n  content: \"\";\n}\n.fa-pinterest-square:before {\n  content: \"\";\n}\n.fa-google-plus-square:before {\n  content: \"\";\n}\n.fa-google-plus:before {\n  content: \"\";\n}\n.fa-money:before {\n  content: \"\";\n}\n.fa-caret-down:before {\n  content: \"\";\n}\n.fa-caret-up:before {\n  content: \"\";\n}\n.fa-caret-left:before {\n  content: \"\";\n}\n.fa-caret-right:before {\n  content: \"\";\n}\n.fa-columns:before {\n  content: \"\";\n}\n.fa-unsorted:before,\n.fa-sort:before {\n  content: \"\";\n}\n.fa-sort-down:before,\n.fa-sort-desc:before {\n  content: \"\";\n}\n.fa-sort-up:before,\n.fa-sort-asc:before {\n  content: \"\";\n}\n.fa-envelope:before {\n  content: \"\";\n}\n.fa-linkedin:before {\n  content: \"\";\n}\n.fa-rotate-left:before,\n.fa-undo:before {\n  content: \"\";\n}\n.fa-legal:before,\n.fa-gavel:before {\n  content: \"\";\n}\n.fa-dashboard:before,\n.fa-tachometer:before {\n  content: \"\";\n}\n.fa-comment-o:before {\n  content: \"\";\n}\n.fa-comments-o:before {\n  content: \"\";\n}\n.fa-flash:before,\n.fa-bolt:before {\n  content: \"\";\n}\n.fa-sitemap:before {\n  content: \"\";\n}\n.fa-umbrella:before {\n  content: \"\";\n}\n.fa-paste:before,\n.fa-clipboard:before {\n  content: \"\";\n}\n.fa-lightbulb-o:before {\n  content: \"\";\n}\n.fa-exchange:before {\n  content: \"\";\n}\n.fa-cloud-download:before {\n  content: \"\";\n}\n.fa-cloud-upload:before {\n  content: \"\";\n}\n.fa-user-md:before {\n  content: \"\";\n}\n.fa-stethoscope:before {\n  content: \"\";\n}\n.fa-suitcase:before {\n  content: \"\";\n}\n.fa-bell-o:before {\n  content: \"\";\n}\n.fa-coffee:before {\n  content: \"\";\n}\n.fa-cutlery:before {\n  content: \"\";\n}\n.fa-file-text-o:before {\n  content: \"\";\n}\n.fa-building-o:before {\n  content: \"\";\n}\n.fa-hospital-o:before {\n  content: \"\";\n}\n.fa-ambulance:before {\n  content: \"\";\n}\n.fa-medkit:before {\n  content: \"\";\n}\n.fa-fighter-jet:before {\n  content: \"\";\n}\n.fa-beer:before {\n  content: \"\";\n}\n.fa-h-square:before {\n  content: \"\";\n}\n.fa-plus-square:before {\n  content: \"\";\n}\n.fa-angle-double-left:before {\n  content: \"\";\n}\n.fa-angle-double-right:before {\n  content: \"\";\n}\n.fa-angle-double-up:before {\n  content: \"\";\n}\n.fa-angle-double-down:before {\n  content: \"\";\n}\n.fa-angle-left:before {\n  content: \"\";\n}\n.fa-angle-right:before {\n  content: \"\";\n}\n.fa-angle-up:before {\n  content: \"\";\n}\n.fa-angle-down:before {\n  content: \"\";\n}\n.fa-desktop:before {\n  content: \"\";\n}\n.fa-laptop:before {\n  content: \"\";\n}\n.fa-tablet:before {\n  content: \"\";\n}\n.fa-mobile-phone:before,\n.fa-mobile:before {\n  content: \"\";\n}\n.fa-circle-o:before {\n  content: \"\";\n}\n.fa-quote-left:before {\n  content: \"\";\n}\n.fa-quote-right:before {\n  content: \"\";\n}\n.fa-spinner:before {\n  content: \"\";\n}\n.fa-circle:before {\n  content: \"\";\n}\n.fa-mail-reply:before,\n.fa-reply:before {\n  content: \"\";\n}\n.fa-github-alt:before {\n  content: \"\";\n}\n.fa-folder-o:before {\n  content: \"\";\n}\n.fa-folder-open-o:before {\n  content: \"\";\n}\n.fa-smile-o:before {\n  content: \"\";\n}\n.fa-frown-o:before {\n  content: \"\";\n}\n.fa-meh-o:before {\n  content: \"\";\n}\n.fa-gamepad:before {\n  content: \"\";\n}\n.fa-keyboard-o:before {\n  content: \"\";\n}\n.fa-flag-o:before {\n  content: \"\";\n}\n.fa-flag-checkered:before {\n  content: \"\";\n}\n.fa-terminal:before {\n  content: \"\";\n}\n.fa-code:before {\n  content: \"\";\n}\n.fa-mail-reply-all:before,\n.fa-reply-all:before {\n  content: \"\";\n}\n.fa-star-half-empty:before,\n.fa-star-half-full:before,\n.fa-star-half-o:before {\n  content: \"\";\n}\n.fa-location-arrow:before {\n  content: \"\";\n}\n.fa-crop:before {\n  content: \"\";\n}\n.fa-code-fork:before {\n  content: \"\";\n}\n.fa-unlink:before,\n.fa-chain-broken:before {\n  content: \"\";\n}\n.fa-question:before {\n  content: \"\";\n}\n.fa-info:before {\n  content: \"\";\n}\n.fa-exclamation:before {\n  content: \"\";\n}\n.fa-superscript:before {\n  content: \"\";\n}\n.fa-subscript:before {\n  content: \"\";\n}\n.fa-eraser:before {\n  content: \"\";\n}\n.fa-puzzle-piece:before {\n  content: \"\";\n}\n.fa-microphone:before {\n  content: \"\";\n}\n.fa-microphone-slash:before {\n  content: \"\";\n}\n.fa-shield:before {\n  content: \"\";\n}\n.fa-calendar-o:before {\n  content: \"\";\n}\n.fa-fire-extinguisher:before {\n  content: \"\";\n}\n.fa-rocket:before {\n  content: \"\";\n}\n.fa-maxcdn:before {\n  content: \"\";\n}\n.fa-chevron-circle-left:before {\n  content: \"\";\n}\n.fa-chevron-circle-right:before {\n  content: \"\";\n}\n.fa-chevron-circle-up:before {\n  content: \"\";\n}\n.fa-chevron-circle-down:before {\n  content: \"\";\n}\n.fa-html5:before {\n  content: \"\";\n}\n.fa-css3:before {\n  content: \"\";\n}\n.fa-anchor:before {\n  content: \"\";\n}\n.fa-unlock-alt:before {\n  content: \"\";\n}\n.fa-bullseye:before {\n  content: \"\";\n}\n.fa-ellipsis-h:before {\n  content: \"\";\n}\n.fa-ellipsis-v:before {\n  content: \"\";\n}\n.fa-rss-square:before {\n  content: \"\";\n}\n.fa-play-circle:before {\n  content: \"\";\n}\n.fa-ticket:before {\n  content: \"\";\n}\n.fa-minus-square:before {\n  content: \"\";\n}\n.fa-minus-square-o:before {\n  content: \"\";\n}\n.fa-level-up:before {\n  content: \"\";\n}\n.fa-level-down:before {\n  content: \"\";\n}\n.fa-check-square:before {\n  content: \"\";\n}\n.fa-pencil-square:before {\n  content: \"\";\n}\n.fa-external-link-square:before {\n  content: \"\";\n}\n.fa-share-square:before {\n  content: \"\";\n}\n.fa-compass:before {\n  content: \"\";\n}\n.fa-toggle-down:before,\n.fa-caret-square-o-down:before {\n  content: \"\";\n}\n.fa-toggle-up:before,\n.fa-caret-square-o-up:before {\n  content: \"\";\n}\n.fa-toggle-right:before,\n.fa-caret-square-o-right:before {\n  content: \"\";\n}\n.fa-euro:before,\n.fa-eur:before {\n  content: \"\";\n}\n.fa-gbp:before {\n  content: \"\";\n}\n.fa-dollar:before,\n.fa-usd:before {\n  content: \"\";\n}\n.fa-rupee:before,\n.fa-inr:before {\n  content: \"\";\n}\n.fa-cny:before,\n.fa-rmb:before,\n.fa-yen:before,\n.fa-jpy:before {\n  content: \"\";\n}\n.fa-ruble:before,\n.fa-rouble:before,\n.fa-rub:before {\n  content: \"\";\n}\n.fa-won:before,\n.fa-krw:before {\n  content: \"\";\n}\n.fa-bitcoin:before,\n.fa-btc:before {\n  content: \"\";\n}\n.fa-file:before {\n  content: \"\";\n}\n.fa-file-text:before {\n  content: \"\";\n}\n.fa-sort-alpha-asc:before {\n  content: \"\";\n}\n.fa-sort-alpha-desc:before {\n  content: \"\";\n}\n.fa-sort-amount-asc:before {\n  content: \"\";\n}\n.fa-sort-amount-desc:before {\n  content: \"\";\n}\n.fa-sort-numeric-asc:before {\n  content: \"\";\n}\n.fa-sort-numeric-desc:before {\n  content: \"\";\n}\n.fa-thumbs-up:before {\n  content: \"\";\n}\n.fa-thumbs-down:before {\n  content: \"\";\n}\n.fa-youtube-square:before {\n  content: \"\";\n}\n.fa-youtube:before {\n  content: \"\";\n}\n.fa-xing:before {\n  content: \"\";\n}\n.fa-xing-square:before {\n  content: \"\";\n}\n.fa-youtube-play:before {\n  content: \"\";\n}\n.fa-dropbox:before {\n  content: \"\";\n}\n.fa-stack-overflow:before {\n  content: \"\";\n}\n.fa-instagram:before {\n  content: \"\";\n}\n.fa-flickr:before {\n  content: \"\";\n}\n.fa-adn:before {\n  content: \"\";\n}\n.fa-bitbucket:before {\n  content: \"\";\n}\n.fa-bitbucket-square:before {\n  content: \"\";\n}\n.fa-tumblr:before {\n  content: \"\";\n}\n.fa-tumblr-square:before {\n  content: \"\";\n}\n.fa-long-arrow-down:before {\n  content: \"\";\n}\n.fa-long-arrow-up:before {\n  content: \"\";\n}\n.fa-long-arrow-left:before {\n  content: \"\";\n}\n.fa-long-arrow-right:before {\n  content: \"\";\n}\n.fa-apple:before {\n  content: \"\";\n}\n.fa-windows:before {\n  content: \"\";\n}\n.fa-android:before {\n  content: \"\";\n}\n.fa-linux:before {\n  content: \"\";\n}\n.fa-dribbble:before {\n  content: \"\";\n}\n.fa-skype:before {\n  content: \"\";\n}\n.fa-foursquare:before {\n  content: \"\";\n}\n.fa-trello:before {\n  content: \"\";\n}\n.fa-female:before {\n  content: \"\";\n}\n.fa-male:before {\n  content: \"\";\n}\n.fa-gittip:before,\n.fa-gratipay:before {\n  content: \"\";\n}\n.fa-sun-o:before {\n  content: \"\";\n}\n.fa-moon-o:before {\n  content: \"\";\n}\n.fa-archive:before {\n  content: \"\";\n}\n.fa-bug:before {\n  content: \"\";\n}\n.fa-vk:before {\n  content: \"\";\n}\n.fa-weibo:before {\n  content: \"\";\n}\n.fa-renren:before {\n  content: \"\";\n}\n.fa-pagelines:before {\n  content: \"\";\n}\n.fa-stack-exchange:before {\n  content: \"\";\n}\n.fa-arrow-circle-o-right:before {\n  content: \"\";\n}\n.fa-arrow-circle-o-left:before {\n  content: \"\";\n}\n.fa-toggle-left:before,\n.fa-caret-square-o-left:before {\n  content: \"\";\n}\n.fa-dot-circle-o:before {\n  content: \"\";\n}\n.fa-wheelchair:before {\n  content: \"\";\n}\n.fa-vimeo-square:before {\n  content: \"\";\n}\n.fa-turkish-lira:before,\n.fa-try:before {\n  content: \"\";\n}\n.fa-plus-square-o:before {\n  content: \"\";\n}\n.fa-space-shuttle:before {\n  content: \"\";\n}\n.fa-slack:before {\n  content: \"\";\n}\n.fa-envelope-square:before {\n  content: \"\";\n}\n.fa-wordpress:before {\n  content: \"\";\n}\n.fa-openid:before {\n  content: \"\";\n}\n.fa-institution:before,\n.fa-bank:before,\n.fa-university:before {\n  content: \"\";\n}\n.fa-mortar-board:before,\n.fa-graduation-cap:before {\n  content: \"\";\n}\n.fa-yahoo:before {\n  content: \"\";\n}\n.fa-google:before {\n  content: \"\";\n}\n.fa-reddit:before {\n  content: \"\";\n}\n.fa-reddit-square:before {\n  content: \"\";\n}\n.fa-stumbleupon-circle:before {\n  content: \"\";\n}\n.fa-stumbleupon:before {\n  content: \"\";\n}\n.fa-delicious:before {\n  content: \"\";\n}\n.fa-digg:before {\n  content: \"\";\n}\n.fa-pied-piper-pp:before {\n  content: \"\";\n}\n.fa-pied-piper-alt:before {\n  content: \"\";\n}\n.fa-drupal:before {\n  content: \"\";\n}\n.fa-joomla:before {\n  content: \"\";\n}\n.fa-language:before {\n  content: \"\";\n}\n.fa-fax:before {\n  content: \"\";\n}\n.fa-building:before {\n  content: \"\";\n}\n.fa-child:before {\n  content: \"\";\n}\n.fa-paw:before {\n  content: \"\";\n}\n.fa-spoon:before {\n  content: \"\";\n}\n.fa-cube:before {\n  content: \"\";\n}\n.fa-cubes:before {\n  content: \"\";\n}\n.fa-behance:before {\n  content: \"\";\n}\n.fa-behance-square:before {\n  content: \"\";\n}\n.fa-steam:before {\n  content: \"\";\n}\n.fa-steam-square:before {\n  content: \"\";\n}\n.fa-recycle:before {\n  content: \"\";\n}\n.fa-automobile:before,\n.fa-car:before {\n  content: \"\";\n}\n.fa-cab:before,\n.fa-taxi:before {\n  content: \"\";\n}\n.fa-tree:before {\n  content: \"\";\n}\n.fa-spotify:before {\n  content: \"\";\n}\n.fa-deviantart:before {\n  content: \"\";\n}\n.fa-soundcloud:before {\n  content: \"\";\n}\n.fa-database:before {\n  content: \"\";\n}\n.fa-file-pdf-o:before {\n  content: \"\";\n}\n.fa-file-word-o:before {\n  content: \"\";\n}\n.fa-file-excel-o:before {\n  content: \"\";\n}\n.fa-file-powerpoint-o:before {\n  content: \"\";\n}\n.fa-file-photo-o:before,\n.fa-file-picture-o:before,\n.fa-file-image-o:before {\n  content: \"\";\n}\n.fa-file-zip-o:before,\n.fa-file-archive-o:before {\n  content: \"\";\n}\n.fa-file-sound-o:before,\n.fa-file-audio-o:before {\n  content: \"\";\n}\n.fa-file-movie-o:before,\n.fa-file-video-o:before {\n  content: \"\";\n}\n.fa-file-code-o:before {\n  content: \"\";\n}\n.fa-vine:before {\n  content: \"\";\n}\n.fa-codepen:before {\n  content: \"\";\n}\n.fa-jsfiddle:before {\n  content: \"\";\n}\n.fa-life-bouy:before,\n.fa-life-buoy:before,\n.fa-life-saver:before,\n.fa-support:before,\n.fa-life-ring:before {\n  content: \"\";\n}\n.fa-circle-o-notch:before {\n  content: \"\";\n}\n.fa-ra:before,\n.fa-resistance:before,\n.fa-rebel:before {\n  content: \"\";\n}\n.fa-ge:before,\n.fa-empire:before {\n  content: \"\";\n}\n.fa-git-square:before {\n  content: \"\";\n}\n.fa-git:before {\n  content: \"\";\n}\n.fa-y-combinator-square:before,\n.fa-yc-square:before,\n.fa-hacker-news:before {\n  content: \"\";\n}\n.fa-tencent-weibo:before {\n  content: \"\";\n}\n.fa-qq:before {\n  content: \"\";\n}\n.fa-wechat:before,\n.fa-weixin:before {\n  content: \"\";\n}\n.fa-send:before,\n.fa-paper-plane:before {\n  content: \"\";\n}\n.fa-send-o:before,\n.fa-paper-plane-o:before {\n  content: \"\";\n}\n.fa-history:before {\n  content: \"\";\n}\n.fa-circle-thin:before {\n  content: \"\";\n}\n.fa-header:before {\n  content: \"\";\n}\n.fa-paragraph:before {\n  content: \"\";\n}\n.fa-sliders:before {\n  content: \"\";\n}\n.fa-share-alt:before {\n  content: \"\";\n}\n.fa-share-alt-square:before {\n  content: \"\";\n}\n.fa-bomb:before {\n  content: \"\";\n}\n.fa-soccer-ball-o:before,\n.fa-futbol-o:before {\n  content: \"\";\n}\n.fa-tty:before {\n  content: \"\";\n}\n.fa-binoculars:before {\n  content: \"\";\n}\n.fa-plug:before {\n  content: \"\";\n}\n.fa-slideshare:before {\n  content: \"\";\n}\n.fa-twitch:before {\n  content: \"\";\n}\n.fa-yelp:before {\n  content: \"\";\n}\n.fa-newspaper-o:before {\n  content: \"\";\n}\n.fa-wifi:before {\n  content: \"\";\n}\n.fa-calculator:before {\n  content: \"\";\n}\n.fa-paypal:before {\n  content: \"\";\n}\n.fa-google-wallet:before {\n  content: \"\";\n}\n.fa-cc-visa:before {\n  content: \"\";\n}\n.fa-cc-mastercard:before {\n  content: \"\";\n}\n.fa-cc-discover:before {\n  content: \"\";\n}\n.fa-cc-amex:before {\n  content: \"\";\n}\n.fa-cc-paypal:before {\n  content: \"\";\n}\n.fa-cc-stripe:before {\n  content: \"\";\n}\n.fa-bell-slash:before {\n  content: \"\";\n}\n.fa-bell-slash-o:before {\n  content: \"\";\n}\n.fa-trash:before {\n  content: \"\";\n}\n.fa-copyright:before {\n  content: \"\";\n}\n.fa-at:before {\n  content: \"\";\n}\n.fa-eyedropper:before {\n  content: \"\";\n}\n.fa-paint-brush:before {\n  content: \"\";\n}\n.fa-birthday-cake:before {\n  content: \"\";\n}\n.fa-area-chart:before {\n  content: \"\";\n}\n.fa-pie-chart:before {\n  content: \"\";\n}\n.fa-line-chart:before {\n  content: \"\";\n}\n.fa-lastfm:before {\n  content: \"\";\n}\n.fa-lastfm-square:before {\n  content: \"\";\n}\n.fa-toggle-off:before {\n  content: \"\";\n}\n.fa-toggle-on:before {\n  content: \"\";\n}\n.fa-bicycle:before {\n  content: \"\";\n}\n.fa-bus:before {\n  content: \"\";\n}\n.fa-ioxhost:before {\n  content: \"\";\n}\n.fa-angellist:before {\n  content: \"\";\n}\n.fa-cc:before {\n  content: \"\";\n}\n.fa-shekel:before,\n.fa-sheqel:before,\n.fa-ils:before {\n  content: \"\";\n}\n.fa-meanpath:before {\n  content: \"\";\n}\n.fa-buysellads:before {\n  content: \"\";\n}\n.fa-connectdevelop:before {\n  content: \"\";\n}\n.fa-dashcube:before {\n  content: \"\";\n}\n.fa-forumbee:before {\n  content: \"\";\n}\n.fa-leanpub:before {\n  content: \"\";\n}\n.fa-sellsy:before {\n  content: \"\";\n}\n.fa-shirtsinbulk:before {\n  content: \"\";\n}\n.fa-simplybuilt:before {\n  content: \"\";\n}\n.fa-skyatlas:before {\n  content: \"\";\n}\n.fa-cart-plus:before {\n  content: \"\";\n}\n.fa-cart-arrow-down:before {\n  content: \"\";\n}\n.fa-diamond:before {\n  content: \"\";\n}\n.fa-ship:before {\n  content: \"\";\n}\n.fa-user-secret:before {\n  content: \"\";\n}\n.fa-motorcycle:before {\n  content: \"\";\n}\n.fa-street-view:before {\n  content: \"\";\n}\n.fa-heartbeat:before {\n  content: \"\";\n}\n.fa-venus:before {\n  content: \"\";\n}\n.fa-mars:before {\n  content: \"\";\n}\n.fa-mercury:before {\n  content: \"\";\n}\n.fa-intersex:before,\n.fa-transgender:before {\n  content: \"\";\n}\n.fa-transgender-alt:before {\n  content: \"\";\n}\n.fa-venus-double:before {\n  content: \"\";\n}\n.fa-mars-double:before {\n  content: \"\";\n}\n.fa-venus-mars:before {\n  content: \"\";\n}\n.fa-mars-stroke:before {\n  content: \"\";\n}\n.fa-mars-stroke-v:before {\n  content: \"\";\n}\n.fa-mars-stroke-h:before {\n  content: \"\";\n}\n.fa-neuter:before {\n  content: \"\";\n}\n.fa-genderless:before {\n  content: \"\";\n}\n.fa-facebook-official:before {\n  content: \"\";\n}\n.fa-pinterest-p:before {\n  content: \"\";\n}\n.fa-whatsapp:before {\n  content: \"\";\n}\n.fa-server:before {\n  content: \"\";\n}\n.fa-user-plus:before {\n  content: \"\";\n}\n.fa-user-times:before {\n  content: \"\";\n}\n.fa-hotel:before,\n.fa-bed:before {\n  content: \"\";\n}\n.fa-viacoin:before {\n  content: \"\";\n}\n.fa-train:before {\n  content: \"\";\n}\n.fa-subway:before {\n  content: \"\";\n}\n.fa-medium:before {\n  content: \"\";\n}\n.fa-yc:before,\n.fa-y-combinator:before {\n  content: \"\";\n}\n.fa-optin-monster:before {\n  content: \"\";\n}\n.fa-opencart:before {\n  content: \"\";\n}\n.fa-expeditedssl:before {\n  content: \"\";\n}\n.fa-battery-4:before,\n.fa-battery:before,\n.fa-battery-full:before {\n  content: \"\";\n}\n.fa-battery-3:before,\n.fa-battery-three-quarters:before {\n  content: \"\";\n}\n.fa-battery-2:before,\n.fa-battery-half:before {\n  content: \"\";\n}\n.fa-battery-1:before,\n.fa-battery-quarter:before {\n  content: \"\";\n}\n.fa-battery-0:before,\n.fa-battery-empty:before {\n  content: \"\";\n}\n.fa-mouse-pointer:before {\n  content: \"\";\n}\n.fa-i-cursor:before {\n  content: \"\";\n}\n.fa-object-group:before {\n  content: \"\";\n}\n.fa-object-ungroup:before {\n  content: \"\";\n}\n.fa-sticky-note:before {\n  content: \"\";\n}\n.fa-sticky-note-o:before {\n  content: \"\";\n}\n.fa-cc-jcb:before {\n  content: \"\";\n}\n.fa-cc-diners-club:before {\n  content: \"\";\n}\n.fa-clone:before {\n  content: \"\";\n}\n.fa-balance-scale:before {\n  content: \"\";\n}\n.fa-hourglass-o:before {\n  content: \"\";\n}\n.fa-hourglass-1:before,\n.fa-hourglass-start:before {\n  content: \"\";\n}\n.fa-hourglass-2:before,\n.fa-hourglass-half:before {\n  content: \"\";\n}\n.fa-hourglass-3:before,\n.fa-hourglass-end:before {\n  content: \"\";\n}\n.fa-hourglass:before {\n  content: \"\";\n}\n.fa-hand-grab-o:before,\n.fa-hand-rock-o:before {\n  content: \"\";\n}\n.fa-hand-stop-o:before,\n.fa-hand-paper-o:before {\n  content: \"\";\n}\n.fa-hand-scissors-o:before {\n  content: \"\";\n}\n.fa-hand-lizard-o:before {\n  content: \"\";\n}\n.fa-hand-spock-o:before {\n  content: \"\";\n}\n.fa-hand-pointer-o:before {\n  content: \"\";\n}\n.fa-hand-peace-o:before {\n  content: \"\";\n}\n.fa-trademark:before {\n  content: \"\";\n}\n.fa-registered:before {\n  content: \"\";\n}\n.fa-creative-commons:before {\n  content: \"\";\n}\n.fa-gg:before {\n  content: \"\";\n}\n.fa-gg-circle:before {\n  content: \"\";\n}\n.fa-tripadvisor:before {\n  content: \"\";\n}\n.fa-odnoklassniki:before {\n  content: \"\";\n}\n.fa-odnoklassniki-square:before {\n  content: \"\";\n}\n.fa-get-pocket:before {\n  content: \"\";\n}\n.fa-wikipedia-w:before {\n  content: \"\";\n}\n.fa-safari:before {\n  content: \"\";\n}\n.fa-chrome:before {\n  content: \"\";\n}\n.fa-firefox:before {\n  content: \"\";\n}\n.fa-opera:before {\n  content: \"\";\n}\n.fa-internet-explorer:before {\n  content: \"\";\n}\n.fa-tv:before,\n.fa-television:before {\n  content: \"\";\n}\n.fa-contao:before {\n  content: \"\";\n}\n.fa-500px:before {\n  content: \"\";\n}\n.fa-amazon:before {\n  content: \"\";\n}\n.fa-calendar-plus-o:before {\n  content: \"\";\n}\n.fa-calendar-minus-o:before {\n  content: \"\";\n}\n.fa-calendar-times-o:before {\n  content: \"\";\n}\n.fa-calendar-check-o:before {\n  content: \"\";\n}\n.fa-industry:before {\n  content: \"\";\n}\n.fa-map-pin:before {\n  content: \"\";\n}\n.fa-map-signs:before {\n  content: \"\";\n}\n.fa-map-o:before {\n  content: \"\";\n}\n.fa-map:before {\n  content: \"\";\n}\n.fa-commenting:before {\n  content: \"\";\n}\n.fa-commenting-o:before {\n  content: \"\";\n}\n.fa-houzz:before {\n  content: \"\";\n}\n.fa-vimeo:before {\n  content: \"\";\n}\n.fa-black-tie:before {\n  content: \"\";\n}\n.fa-fonticons:before {\n  content: \"\";\n}\n.fa-reddit-alien:before {\n  content: \"\";\n}\n.fa-edge:before {\n  content: \"\";\n}\n.fa-credit-card-alt:before {\n  content: \"\";\n}\n.fa-codiepie:before {\n  content: \"\";\n}\n.fa-modx:before {\n  content: \"\";\n}\n.fa-fort-awesome:before {\n  content: \"\";\n}\n.fa-usb:before {\n  content: \"\";\n}\n.fa-product-hunt:before {\n  content: \"\";\n}\n.fa-mixcloud:before {\n  content: \"\";\n}\n.fa-scribd:before {\n  content: \"\";\n}\n.fa-pause-circle:before {\n  content: \"\";\n}\n.fa-pause-circle-o:before {\n  content: \"\";\n}\n.fa-stop-circle:before {\n  content: \"\";\n}\n.fa-stop-circle-o:before {\n  content: \"\";\n}\n.fa-shopping-bag:before {\n  content: \"\";\n}\n.fa-shopping-basket:before {\n  content: \"\";\n}\n.fa-hashtag:before {\n  content: \"\";\n}\n.fa-bluetooth:before {\n  content: \"\";\n}\n.fa-bluetooth-b:before {\n  content: \"\";\n}\n.fa-percent:before {\n  content: \"\";\n}\n.fa-gitlab:before {\n  content: \"\";\n}\n.fa-wpbeginner:before {\n  content: \"\";\n}\n.fa-wpforms:before {\n  content: \"\";\n}\n.fa-envira:before {\n  content: \"\";\n}\n.fa-universal-access:before {\n  content: \"\";\n}\n.fa-wheelchair-alt:before {\n  content: \"\";\n}\n.fa-question-circle-o:before {\n  content: \"\";\n}\n.fa-blind:before {\n  content: \"\";\n}\n.fa-audio-description:before {\n  content: \"\";\n}\n.fa-volume-control-phone:before {\n  content: \"\";\n}\n.fa-braille:before {\n  content: \"\";\n}\n.fa-assistive-listening-systems:before {\n  content: \"\";\n}\n.fa-asl-interpreting:before,\n.fa-american-sign-language-interpreting:before {\n  content: \"\";\n}\n.fa-deafness:before,\n.fa-hard-of-hearing:before,\n.fa-deaf:before {\n  content: \"\";\n}\n.fa-glide:before {\n  content: \"\";\n}\n.fa-glide-g:before {\n  content: \"\";\n}\n.fa-signing:before,\n.fa-sign-language:before {\n  content: \"\";\n}\n.fa-low-vision:before {\n  content: \"\";\n}\n.fa-viadeo:before {\n  content: \"\";\n}\n.fa-viadeo-square:before {\n  content: \"\";\n}\n.fa-snapchat:before {\n  content: \"\";\n}\n.fa-snapchat-ghost:before {\n  content: \"\";\n}\n.fa-snapchat-square:before {\n  content: \"\";\n}\n.fa-pied-piper:before {\n  content: \"\";\n}\n.fa-first-order:before {\n  content: \"\";\n}\n.fa-yoast:before {\n  content: \"\";\n}\n.fa-themeisle:before {\n  content: \"\";\n}\n.fa-google-plus-circle:before,\n.fa-google-plus-official:before {\n  content: \"\";\n}\n.fa-fa:before,\n.fa-font-awesome:before {\n  content: \"\";\n}\n.fa-handshake-o:before {\n  content: \"\";\n}\n.fa-envelope-open:before {\n  content: \"\";\n}\n.fa-envelope-open-o:before {\n  content: \"\";\n}\n.fa-linode:before {\n  content: \"\";\n}\n.fa-address-book:before {\n  content: \"\";\n}\n.fa-address-book-o:before {\n  content: \"\";\n}\n.fa-vcard:before,\n.fa-address-card:before {\n  content: \"\";\n}\n.fa-vcard-o:before,\n.fa-address-card-o:before {\n  content: \"\";\n}\n.fa-user-circle:before {\n  content: \"\";\n}\n.fa-user-circle-o:before {\n  content: \"\";\n}\n.fa-user-o:before {\n  content: \"\";\n}\n.fa-id-badge:before {\n  content: \"\";\n}\n.fa-drivers-license:before,\n.fa-id-card:before {\n  content: \"\";\n}\n.fa-drivers-license-o:before,\n.fa-id-card-o:before {\n  content: \"\";\n}\n.fa-quora:before {\n  content: \"\";\n}\n.fa-free-code-camp:before {\n  content: \"\";\n}\n.fa-telegram:before {\n  content: \"\";\n}\n.fa-thermometer-4:before,\n.fa-thermometer:before,\n.fa-thermometer-full:before {\n  content: \"\";\n}\n.fa-thermometer-3:before,\n.fa-thermometer-three-quarters:before {\n  content: \"\";\n}\n.fa-thermometer-2:before,\n.fa-thermometer-half:before {\n  content: \"\";\n}\n.fa-thermometer-1:before,\n.fa-thermometer-quarter:before {\n  content: \"\";\n}\n.fa-thermometer-0:before,\n.fa-thermometer-empty:before {\n  content: \"\";\n}\n.fa-shower:before {\n  content: \"\";\n}\n.fa-bathtub:before,\n.fa-s15:before,\n.fa-bath:before {\n  content: \"\";\n}\n.fa-podcast:before {\n  content: \"\";\n}\n.fa-window-maximize:before {\n  content: \"\";\n}\n.fa-window-minimize:before {\n  content: \"\";\n}\n.fa-window-restore:before {\n  content: \"\";\n}\n.fa-times-rectangle:before,\n.fa-window-close:before {\n  content: \"\";\n}\n.fa-times-rectangle-o:before,\n.fa-window-close-o:before {\n  content: \"\";\n}\n.fa-bandcamp:before {\n  content: \"\";\n}\n.fa-grav:before {\n  content: \"\";\n}\n.fa-etsy:before {\n  content: \"\";\n}\n.fa-imdb:before {\n  content: \"\";\n}\n.fa-ravelry:before {\n  content: \"\";\n}\n.fa-eercast:before {\n  content: \"\";\n}\n.fa-microchip:before {\n  content: \"\";\n}\n.fa-snowflake-o:before {\n  content: \"\";\n}\n.fa-superpowers:before {\n  content: \"\";\n}\n.fa-wpexplorer:before {\n  content: \"\";\n}\n.fa-meetup:before {\n  content: \"\";\n}\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0;\n}\n.sr-only-focusable:active, .sr-only-focusable:focus {\n  position: static;\n  width: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  clip: auto;\n}", "",{"version":3,"sources":["font-awesome.scss","/home/sandro/workspace/philosophische_insel/node_modules/font-awesome/scss/font-awesome.scss","/home/sandro/workspace/philosophische_insel/node_modules/font-awesome/scss/_path.scss","/home/sandro/workspace/philosophische_insel/node_modules/font-awesome/scss/_core.scss","/home/sandro/workspace/philosophische_insel/node_modules/font-awesome/scss/_larger.scss","/home/sandro/workspace/philosophische_insel/node_modules/font-awesome/scss/_fixed-width.scss","/home/sandro/workspace/philosophische_insel/node_modules/font-awesome/scss/_list.scss","/home/sandro/workspace/philosophische_insel/node_modules/font-awesome/scss/_variables.scss","/home/sandro/workspace/philosophische_insel/node_modules/font-awesome/scss/_bordered-pulled.scss","/home/sandro/workspace/philosophische_insel/node_modules/font-awesome/scss/_animated.scss","/home/sandro/workspace/philosophische_insel/node_modules/font-awesome/scss/_rotated-flipped.scss","/home/sandro/workspace/philosophische_insel/node_modules/font-awesome/scss/_mixins.scss","/home/sandro/workspace/philosophische_insel/node_modules/font-awesome/scss/_stacked.scss","/home/sandro/workspace/philosophische_insel/node_modules/font-awesome/scss/_icons.scss","/home/sandro/workspace/philosophische_insel/node_modules/font-awesome/scss/_screen-reader.scss"],"names":[],"mappings":"AAAA,gBAAgB;ACAhB;;;EAAA;ACAA;+BAAA;AAGA;EACE,0BAAA;EACA,4CAAA;EACA,4SAAA;EAMA,mBAAA;EACA,kBAAA;AFAF;AGVA;EACE,qBAAA;EACA,6CAAA;EACA,kBAAA;EACA,oBAAA;EACA,mCAAA;EACA,kCAAA;AHYF;AIlBA,6DAAA;AACA;EACE,yBAAA;EACA,mBAAA;EACA,oBAAA;AJqBF;AInBA;EAAwB,cAAA;AJuBxB;AItBA;EAAwB,cAAA;AJ0BxB;AIzBA;EAAwB,cAAA;AJ6BxB;AI5BA;EAAwB,cAAA;AJgCxB;AK1CA;EACE,qBAAA;EACA,kBAAA;AL6CF;AM9CA;EACE,eAAA;EACA,2BCMoB;EDLpB,qBAAA;ANiDF;AMhDE;EAAO,kBAAA;ANmDT;AMjDA;EACE,kBAAA;EACA,qBAAA;EACA,qBCDoB;EDEpB,mBAAA;EACA,kBAAA;ANoDF;AMnDE;EACE,qBAAA;ANqDJ;AQlEA;EACE,4BAAA;EACA,yBAAA;EACA,oBAAA;ARqEF;AQlEA;EAA+B,WAAA;ARsE/B;AQrEA;EAAgC,YAAA;ARyEhC;AQtEE;EAAgC,mBAAA;AR0ElC;AQzEE;EAAiC,kBAAA;AR4EnC;AQzEA,2BAAA;AACA;EAAc,YAAA;AR6Ed;AQ5EA;EAAa,WAAA;ARgFb;AQ7EE;EAAc,mBAAA;ARiFhB;AQhFE;EAAe,kBAAA;ARmFjB;ASvGA;EACE,6CAAA;EACQ,qCAAA;AT0GV;ASvGA;EACE,+CAAA;EACQ,uCAAA;AT0GV;ASvGA;EACE;IAEU,uBAAA;ET0GV;ESxGA;IAEU,yBAAA;ET0GV;AACF;ASvGA;EACE;IAEU,uBAAA;ETyGV;ESvGA;IAEU,yBAAA;ETyGV;AACF;AUtIA;ECWE,sEAAA;EAGQ,wBAAA;AX8HV;AU3IA;ECUE,sEAAA;EAGQ,yBAAA;AXqIV;AUjJA;ECSE,sEAAA;EAGQ,yBAAA;AX4IV;AUtJA;ECcE,gFAAA;EAGQ,uBAAA;AX4IV;AU5JA;ECaE,gFAAA;EAGQ,uBAAA;AXmJV;AU9JA;;;;;EAKE,YAAA;AViKF;AYhLA;EACE,kBAAA;EACA,qBAAA;EACA,UAAA;EACA,WAAA;EACA,gBAAA;EACA,sBAAA;AZmLF;AYjLA;EACE,kBAAA;EACA,OAAA;EACA,WAAA;EACA,kBAAA;AZoLF;AYlLA;EAA8B,oBAAA;AZsL9B;AYrLA;EAA8B,cAAA;AZyL9B;AYxLA;EAA6B,WLTP;APqMtB;Aa/MA;mEAAA;AAGA;EAAkC,YNwUnB;APtHf;AajNA;EAAkC,YN2dnB;APtQf;AapNA;EAAmC,YN0jBnB;APlWhB;AavNA;EAAuC,YNsOnB;APXpB;Aa1NA;EAAkC,YNuWnB;APzIf;Aa7NA;EAAiC,YNknBnB;APjZd;AahOA;EAAmC,YNsnBnB;APlZhB;AanOA;EAAiC,YNytBnB;APlfd;AatOA;EAAiC,YNmRnB;APzCd;AazOA;EAAqC,YNupBnB;AP1alB;Aa5OA;EAA+B,YNqpBnB;APraZ;Aa/OA;EAAoC,YNspBnB;APnajB;AalPA;EAAkC,YNyInB;AP6Gf;AarPA;;;EAEkC,YNqqBnB;AP5af;AaxPA;EAAwC,YN8iBnB;APlTrB;Aa3PA;EAAyC,YN4iBnB;AP7StB;Aa9PA;EAAsC,YN4fnB;AP1PnB;AajQA;EAAmC,YNikBnB;AP5ThB;AapQA;;EACgC,YNgKnB;APwGb;AavQA;EAAoC,YN+qBnB;APpajB;Aa1QA;EAAiC,YNwVnB;AP1Ed;Aa7QA;EAAmC,YNuPnB;AP0BhB;AahRA;EAAoC,YNgJnB;APoIjB;AanRA;EAAiC,YNmhBnB;AP5Pd;AatRA;EAAqC,YNgMnB;AP0FlB;AazRA;EAAgD,YNYnB;APiR7B;Aa5RA;EAA8C,YNcnB;APkR3B;Aa/RA;EAAkC,YNqWnB;APlEf;AalSA;EAA0C,YNwenB;APlMvB;AarSA;;EACmC,YNsgBnB;AP7NhB;AaxSA;EAAoC,YNggBnB;APpNjB;Aa3SA;EAAqC,YNwYnB;APzFlB;Aa9SA;EAAiC,YN2YnB;APzFd;AajTA;EAAiC,YN4PnB;APyDd;AapTA;EAAuC,YNoUnB;APZpB;AavTA;EAAuC,YNitBnB;APtZpB;Aa1TA;EAAwC,YN+sBnB;APjZrB;Aa7TA;EAAsC,YNgtBnB;AP/YnB;AahUA;EAAmC,YNyenB;APrKhB;AanUA;EAAoC,YNwBnB;AP+SjB;AatUA;EAAgC,YNymBnB;AP/Rb;AazUA;EAAiC,YNymBnB;AP5Rd;Aa5UA;EAAiC,YNyDnB;APuRd;Aa/UA;EAAqC,YNyDnB;AP0RlB;AalVA;EAAkC,YN+dnB;APzIf;AarVA;EAAmC,YN2EnB;AP8QhB;AaxVA;EAAiC,YN0PnB;APkGd;Aa3VA;EAAiC,YNiDnB;AP8Sd;Aa9VA;EAAmC,YN0VnB;APQhB;AajWA;EAAwC,YNwmBnB;APnQrB;AapWA;EAAuC,YNwmBnB;APhQpB;AavWA;EAAuC,YNpCnB;AP+YpB;Aa1WA;EAAyC,YNvCnB;APqZtB;Aa7WA;EAAwC,YNrCnB;APsZrB;AahXA;EAA0C,YNxCnB;AP4ZvB;AanXA;EAAiC,YN+WnB;APQd;AatXA;;EACoC,YN2anB;APjDjB;AazXA;EAAmC,YNsUnB;APuDhB;Aa5XA;EAAyC,YNkrBnB;APlTtB;Aa/XA;;;EAEsC,YN0bnB;APvDnB;AalYA;EAAmC,YNkbnB;AP5ChB;AarYA;EAAuC,YNwXnB;APiBpB;AaxYA;EAAmC,YNtDnB;APkchB;Aa3YA;EAAiC,YNmnBnB;APpOd;Aa9YA;;EAC4C,YN+anB;AP7BzB;AajZA;EAA2C,YN8fnB;APzGxB;AapZA;EAA2C,YN+EnB;APyUxB;AavZA;EAAmC,YNzBnB;APobhB;Aa1ZA;EAA0C,YNmjBnB;APrJvB;Aa7ZA;EAA0C,YNqLnB;AP4OvB;AahaA;EAAqC,YNlBnB;APsblB;AanaA;EAAiC,YNsbnB;APfd;AataA;EAAkC,YNganB;APUf;AazaA;EAAiC,YNmjBnB;APtId;Aa5aA;EAAoC,YN+NnB;APiNjB;Aa/aA;EAAyC,YNgLnB;APmQtB;AalbA;EAAyC,YN4iBnB;APtHtB;AarbA;EAAkC,YN+InB;AP0Sf;AaxbA;EAAyC,YNyEnB;APmXtB;Aa3bA;EAA0C,YNyEnB;APsXvB;Aa9bA;EAAwC,YNkbnB;APgBrB;AajcA;EAAyC,YNuXnB;AP8EtB;AapcA;EAAyC,YN2lBnB;APnJtB;AavcA;EAAyC,YN2DnB;APgZtB;Aa1cA;EAA4C,YNybnB;APqBzB;Aa7cA;EAAwC,YN0SnB;APuKrB;AahdA;EAAuC,YN0GnB;AP0WpB;AandA;EAA2C,YNulBnB;APhIxB;AatdA;EAA2C,YNuDnB;APmaxB;AazdA;EAAgC,YNnCnB;APggBb;Aa5dA;EAAuC,YNnDnB;APmhBpB;Aa/dA;EAAwC,YNnDnB;APshBrB;AaleA;EAAqC,YNnDnB;APyhBlB;AareA;EAAuC,YNvDnB;APgiBpB;AaxeA;;EACkC,YN4dnB;APgBf;Aa3eA;EAAmC,YN8InB;APiWhB;Aa9eA;EAAqC,YNsFnB;AP4ZlB;AajfA;EAAiC,YN+ZnB;APsFd;AapfA;EAAkC,YNoWnB;APoJf;AavfA;EAAqC,YNpDnB;AP+iBlB;Aa1fA;EAA+C,YNuInB;APuX5B;Aa7fA;EAAiC,YNkNnB;AP+Sd;AahgBA;EAAiC,YN0SnB;AP0Nd;AangBA;EAAiC,YN6KnB;AP0Vd;AatgBA;EAAgC,YNyInB;APiYb;AazgBA;EAAsC,YNyInB;APoYnB;Aa5gBA;;EACiD,YNiInB;AP+Y9B;Aa/gBA;EAAkC,YN+YnB;APoIf;AalhBA;EAAqC,YAAA;AbshBrC;AarhBA;EAAmC,YNoanB;APqHhB;AaxhBA;EAAoC,YNgEnB;AP4djB;Aa3hBA;EAAmC,YN6TnB;APkOhB;Aa9hBA;EAAuC,YNuCnB;AP2fpB;AajiBA;EAAyC,YNmCnB;APkgBtB;AapiBA;EAAoC,YN+anB;APyHjB;AaviBA;EAA0C,YNkdnB;APyFvB;Aa1iBA;EAAmC,YN0KnB;APoYhB;Aa7iBA;EAAwC,YN2KnB;APsYrB;AahjBA;EAAqC,YN3EnB;AP+nBlB;AanjBA;EAAqC,YN7EnB;APooBlB;AatjBA;;EACsC,YNlEnB;AP4nBnB;AazjBA;EAA2C,YN+kBnB;APlBxB;Aa5jBA;EAA4C,YN4HnB;APoczB;Aa/jBA;EAAyC,YNTnB;AP4kBtB;AalkBA;EAAgC,YN2QnB;AP2Tb;AarkBA;;EACiC,YN6CnB;AP4hBd;AaxkBA;EAAqC,YNkDnB;AP0hBlB;Aa3kBA;EAAwC,YNsiBnB;APyCrB;Aa9kBA;EAA0C,YNoiBnB;AP8CvB;AajlBA;EAAsC,YN2enB;AP0GnB;AaplBA;EAAoC,YN8NnB;AP0XjB;AavlBA;EAAqC,YNocnB;APuJlB;Aa1lBA;EAA4C,YNuRnB;APuUzB;Aa7lBA;EAAuC,YN6hBnB;APoEpB;AahmBA;EAA0C,YNsGnB;AP8fvB;AanmBA;EAAoC,YN8bnB;APyKjB;AatmBA;EAAmC,YNqjBnB;APqDhB;AazmBA;EAA0C,YNgLnB;AP6bvB;Aa5mBA;EAAmC,YNukBnB;APyChB;Aa/mBA;EAAoC,YNqQnB;AP8WjB;AalnBA;EAAkC,YNiWnB;APqRf;AarnBA;EAAqC,YN2dnB;AP8JlB;AaxnBA;EAAuC,YNjDnB;AP6qBpB;Aa3nBA;EAAyC,YN+VnB;APgStB;Aa9nBA;EAAoC,YNsjBnB;AP4EjB;AajoBA;;EACqC,YNgGnB;APqiBlB;AapoBA;EAAmC,YNoKnB;APoehB;AavoBA;EAAmC,YN0jBnB;APiFhB;Aa1oBA;EAAwC,YNoCnB;AP0mBrB;Aa7oBA;;EACgC,YN+YnB;APkQb;AahpBA;EAAkC,YNoMnB;APgdf;AanpBA;EAAqC,YNrDnB;AP4sBlB;AatpBA;EAAiC,YNhFnB;AP0uBd;AazpBA;EAAwC,YNrBnB;APkrBrB;Aa5pBA;EAAyC,YNoLnB;AP4etB;Aa/pBA;EAAwC,YNkLnB;APifrB;AalqBA;EAAsC,YNmLnB;APmfnB;AarqBA;EAAwC,YN+KnB;AP0frB;AaxqBA;EAA8C,YNrInB;APizB3B;Aa3qBA;EAA+C,YNjInB;APgzB5B;Aa9qBA;EAA4C,YNjInB;APmzBzB;AajrBA;EAA8C,YNzInB;AP8zB3B;AaprBA;EAAkC,YN2JnB;AP6hBf;AavrBA;EAAmC,YN6lBnB;AP8FhB;Aa1rBA;EAAkC,YNqenB;APyNf;Aa7rBA;EAAmC,YNyGnB;APwlBhB;AahsBA;EAAsC,YNzEnB;AP6wBnB;AansBA;EAAuC,YNlInB;APy0BpB;AatsBA;;EACkC,YNijBnB;APyJf;AazsBA;;EACiC,YN4OnB;APied;Aa5sBA;EAAkC,YNdnB;AP8tBf;Aa/sBA;EAAkC,YN0GnB;APymBf;AaltBA;;EACqC,YN6XnB;APyVlB;AartBA;;EACoC,YN2FnB;AP8nBjB;AaxtBA;EAAsC,YN6SnB;AP+anB;Aa3tBA;;EACqC,YNqGnB;AP0nBlB;Aa9tBA;EAAmC,YNgbnB;APkThB;AajuBA;;;EAEiC,YNlInB;APu2Bd;AapuBA;EAAoC,YNsOnB;APkgBjB;AavuBA;EAAoC,YNoOnB;APugBjB;Aa1uBA;EAA0C,YN+bnB;AP+SvB;Aa7uBA;EAAsC,YN2gBnB;APsOnB;AahvBA;EAAkC,YNucnB;AP6Sf;AanvBA;EAAkC,YNyOnB;AP8gBf;AatvBA;EAAkC,YN6fnB;AP6Pf;AazvBA;EAAsC,YNmTnB;AP0cnB;Aa5vBA;EAA6C,YNoTnB;AP4c1B;Aa/vBA;EAA+C,YNgInB;APmoB5B;AalwBA;EAAwC,YN4HnB;AP0oBrB;AarwBA;EAAkC,YNqQnB;APogBf;AaxwBA;EAAuC,YNpFnB;APg2BpB;Aa3wBA;EAAqC,YN9EnB;AP61BlB;Aa9wBA;EAAuC,YNrFnB;APu2BpB;AajxBA;EAAwC,YNrFnB;AP02BrB;AapxBA;EAAoC,YNhCnB;APwzBjB;AavxBA;;EACiC,YN0YnB;APiZd;Aa1xBA;;EACsC,YN8YnB;APgZnB;Aa7xBA;;EACqC,YN2YnB;APsZlB;AahyBA;EAAqC,YNUnB;AP0xBlB;AanyBA;EAAqC,YNuMnB;APgmBlB;AatyBA;;EACiC,YNqfnB;APqTd;AazyBA;;EACkC,YNoFnB;APytBf;Aa5yBA;;EACuC,YN+anB;APiYpB;Aa/yBA;EAAsC,YN7CnB;APg2BnB;AalzBA;EAAuC,YN1CnB;APg2BpB;AarzBA;;EACiC,YNpInB;AP67Bd;AaxzBA;EAAoC,YN6WnB;AP+cjB;Aa3zBA;EAAqC,YNyenB;APsVlB;Aa9zBA;;EACsC,YNrEnB;APu4BnB;Aaj0BA;EAAwC,YNqLnB;APgpBrB;Aap0BA;EAAqC,YNGnB;APq0BlB;Aav0BA;EAA2C,YNnEnB;AP84BxB;Aa10BA;EAAyC,YNnEnB;APi5BtB;Aa70BA;EAAoC,YNifnB;APgWjB;Aah1BA;EAAwC,YN8YnB;APscrB;Aan1BA;EAAqC,YNyZnB;AP8blB;Aat1BA;EAAmC,YN9JnB;APw/BhB;Aaz1BA;EAAmC,YNlEnB;AP+5BhB;Aa51BA;EAAoC,YN1CnB;AP04BjB;Aa/1BA;EAAwC,YN8BnB;APq0BrB;Aal2BA;EAAuC,YN1InB;APg/BpB;Aar2BA;EAAuC,YNsHnB;APmvBpB;Aax2BA;EAAsC,YNrOnB;APilCnB;Aa32BA;EAAmC,YN4MnB;APmqBhB;Aa92BA;EAAwC,YNUnB;APw2BrB;Aaj3BA;EAAiC,YN3KnB;APgiCd;Aap3BA;EAAqC,YNuFnB;APiyBlB;Aav3BA;EAAwC,YN2QnB;APgnBrB;Aa13BA;EAA8C,YNrOnB;APmmC3B;Aa73BA;EAA+C,YNrOnB;APsmC5B;Aah4BA;EAA4C,YNrOnB;APymCzB;Aan4BA;EAA8C,YNzOnB;APgnC3B;Aat4BA;EAAuC,YNrOnB;AP+mCpB;Aaz4BA;EAAwC,YNrOnB;APknCrB;Aa54BA;EAAqC,YNrOnB;APqnClB;Aa/4BA;EAAuC,YNzOnB;AP4nCpB;Aal5BA;EAAoC,YNpDnB;AP08BjB;Aar5BA;EAAmC,YN4InB;AP6wBhB;Aax5BA;EAAmC,YNwYnB;APohBhB;Aa35BA;;EACmC,YNuMnB;APwtBhB;Aa95BA;EAAqC,YNzGnB;AP2gClB;Aaj6BA;EAAuC,YNyQnB;AP4pBpB;Aap6BA;EAAwC,YNyQnB;AP+pBrB;Aav6BA;EAAoC,YN+VnB;AP4kBjB;Aa16BA;EAAmC,YN9GnB;AP4hChB;Aa76BA;;EACkC,YNoRnB;AP6pBf;Aah7BA;EAAuC,YN+CnB;APq4BpB;Aan7BA;EAAqC,YNmBnB;APo6BlB;Aat7BA;EAA0C,YNoBnB;APs6BvB;Aaz7BA;EAAoC,YNqUnB;APwnBjB;Aa57BA;EAAoC,YN2BnB;APq6BjB;Aa/7BA;EAAkC,YNgLnB;APmxBf;Aal8BA;EAAoC,YN2BnB;AP26BjB;Aar8BA;EAAuC,YNuHnB;APk1BpB;Aax8BA;EAAmC,YNMnB;APs8BhB;Aa38BA;EAA2C,YNInB;AP28BxB;Aa98BA;EAAqC,YN6XnB;APqlBlB;Aaj9BA;EAAiC,YNhHnB;APqkCd;Aap9BA;;EACsC,YNuQnB;APitBnB;Aav9BA;;;EAEwC,YNsVnB;APqoBrB;Aa19BA;EAA2C,YNwInB;APs1BxB;Aa79BA;EAAiC,YNhGnB;APikCd;Aah+BA;EAAsC,YNvHnB;AP2lCnB;Aan+BA;;EACyC,YNtJnB;AP6nCtB;Aat+BA;EAAqC,YNyOnB;APiwBlB;Aaz+BA;EAAiC,YN0FnB;APm5Bd;Aa5+BA;EAAwC,YN1DnB;AP0iCrB;Aa/+BA;EAAwC,YNkWnB;APipBrB;Aal/BA;EAAsC,YN4VnB;AP0pBnB;Aar/BA;EAAmC,YNlEnB;AP2jChB;Aax/BA;EAAyC,YNgOnB;AP4xBtB;Aa3/BA;EAAuC,YN2JnB;APo2BpB;Aa9/BA;EAA6C,YN2JnB;APu2B1B;AajgCA;EAAmC,YNsRnB;AP+uBhB;AapgCA;EAAuC,YN5LnB;APosCpB;AavgCA;EAA8C,YNxBnB;APmiC3B;Aa1gCA;EAAmC,YNuPnB;APuxBhB;Aa7gCA;EAAmC,YN6InB;APo4BhB;AahhCA;EAAgD,YN9JnB;APkrC7B;AanhCA;EAAiD,YN9JnB;APqrC9B;AathCA;EAA8C,YN9JnB;APwrC3B;AazhCA;EAAgD,YNlKnB;AP+rC7B;Aa5hCA;EAAkC,YN8DnB;APk+Bf;Aa/hCA;EAAiC,YNrHnB;APwpCd;AaliCA;EAAmC,YNvSnB;AP60ChB;AariCA;EAAuC,YN2ZnB;AP8oBpB;AaxiCA;EAAqC,YNhNnB;AP4vClB;Aa3iCA;EAAuC,YN7FnB;AP4oCpB;Aa9iCA;EAAuC,YN7FnB;AP+oCpB;AajjCA;EAAuC,YN+OnB;APs0BpB;AapjCA;EAAwC,YNiMnB;APu3BrB;AavjCA;EAAmC,YN6WnB;AP8sBhB;Aa1jCA;EAAyC,YN0InB;APo7BtB;Aa7jCA;EAA2C,YN0InB;APu7BxB;AahkCA;EAAqC,YNqFnB;AP++BlB;AankCA;EAAuC,YNmFnB;APo/BpB;AatkCA;EAAyC,YNnLnB;AP6vCtB;AazkCA;EAA0C,YN0KnB;APm6BvB;Aa5kCA;EAAiD,YNpFnB;APoqC9B;Aa/kCA;EAAyC,YNwPnB;AP21BtB;AallCA;EAAoC,YNjJnB;APuuCjB;AarlCA;;EACgD,YN/MnB;APwyC7B;AaxlCA;;EAC8C,YN9MnB;AP0yC3B;Aa3lCA;;EACiD,YNjNnB;APgzC9B;Aa9lCA;;EACgC,YNvGnB;APysCb;AajmCA;EAAgC,YNhCnB;APqoCb;AapmCA;;EACgC,YNqYnB;APmuBb;AavmCA;;EACgC,YN4CnB;AP+jCb;Aa1mCA;;;;EAGgC,YNgDnB;AP8jCb;Aa7mCA;;;EAEgC,YNiNnB;APg6Bb;AahnCA;;EACgC,YN+CnB;APqkCb;AannCA;;EACgC,YN3PnB;APk3Cb;AatnCA;EAAiC,YNhGnB;AP0tCd;AaznCA;EAAsC,YNpFnB;APitCnB;Aa5nCA;EAA2C,YN0PnB;APs4BxB;Aa/nCA;EAA4C,YN0PnB;APy4BzB;AaloCA;EAA4C,YN0PnB;AP44BzB;AaroCA;EAA6C,YN0PnB;AP+4B1B;AaxoCA;EAA6C,YN6PnB;AP+4B1B;Aa3oCA;EAA8C,YN6PnB;APk5B3B;Aa9oCA;EAAsC,YNkUnB;APg1BnB;AajpCA;EAAwC,YN8TnB;APu1BrB;AappCA;EAA2C,YNyanB;AP+uBxB;AavpCA;EAAoC,YNsanB;APqvBjB;Aa1pCA;EAAiC,YN2ZnB;APmwBd;Aa7pCA;EAAwC,YN2ZnB;APswBrB;AahqCA;EAAyC,YNoanB;APgwBtB;AanqCA;EAAoC,YNxJnB;AP+zCjB;AatqCA;EAA2C,YN8PnB;AP46BxB;AazqCA;EAAsC,YNgBnB;AP6pCnB;Aa5qCA;EAAmC,YNpFnB;APowChB;Aa/qCA;EAAgC,YN3WnB;AP8hDb;AalrCA;EAAsC,YN/RnB;APq9CnB;AarrCA;EAA6C,YN/RnB;APw9C1B;AaxrCA;EAAmC,YN+UnB;AP62BhB;Aa3rCA;EAA0C,YN+UnB;APg3BvB;Aa9rCA;EAA4C,YNgDnB;APkpCzB;AajsCA;EAA0C,YNkDnB;APmpCvB;AapsCA;EAA4C,YN+CnB;APypCzB;AavsCA;EAA6C,YN+CnB;AP4pC1B;Aa1sCA;EAAkC,YNjWnB;AP+iDf;Aa7sCA;EAAoC,YNmYnB;AP80BjB;AahtCA;EAAoC,YN7WnB;APikDjB;AantCA;EAAkC,YNkCnB;APqrCf;AattCA;EAAqC,YN5KnB;APs4ClB;AaztCA;EAAkC,YNgNnB;AP6gCf;Aa5tCA;EAAuC,YNxFnB;APwzCpB;Aa/tCA;EAAmC,YN4TnB;APu6BhB;AaluCA;EAAmC,YNtInB;AP42ChB;AaruCA;EAAiC,YN6CnB;AP4rCd;AaxuCA;;EACqC,YN5DnB;APwyClB;Aa3uCA;EAAkC,YN8PnB;APi/Bf;Aa9uCA;EAAmC,YNuEnB;AP2qChB;AajvCA;EAAoC,YN9WnB;APmmDjB;AapvCA;EAAgC,YNtSnB;AP8hDb;AavvCA;EAA+B,YNiWnB;AP05BZ;Aa1vCA;EAAkC,YNuWnB;APu5Bf;Aa7vCA;EAAmC,YN+InB;APknChB;AahwCA;EAAsC,YNkFnB;APkrCnB;AanwCA;EAA2C,YN6NnB;AP0iCxB;AatwCA;EAAiD,YN/WnB;APynD9B;AazwCA;EAAgD,YNjXnB;AP8nD7B;Aa5wCA;;EACgD,YNzRnB;APyiD7B;Aa/wCA;EAAyC,YNnMnB;APs9CtB;AalxCA;EAAuC,YNiWnB;APq7BpB;AarxCA;EAAyC,YNoVnB;APq8BtB;AaxxCA;;EACgC,YN0SnB;APk/Bb;Aa3xCA;EAA0C,YN0GnB;APqrCvB;Aa9xCA;EAA0C,YN4MnB;APslCvB;AajyCA;EAAkC,YNsLnB;AP+mCf;AapyCA;EAA4C,YNzLnB;APi+CzB;AavyCA;EAAsC,YNoWnB;APu8BnB;Aa1yCA;EAAmC,YN8DnB;APgvChB;Aa7yCA;;;EAEuC,YN8SnB;APmgCpB;AahzCA;;EAC2C,YN1FnB;AP84CxB;AanzCA;EAAkC,YNsWnB;APi9Bf;AatzCA;EAAmC,YNlGnB;AP45ChB;AazzCA;EAAmC,YNgHnB;AP6sChB;Aa5zCA;EAA0C,YNiHnB;AP+sCvB;Aa/zCA;EAA+C,YNyNnB;AP0mC5B;Aal0CA;EAAwC,YNuNnB;AP+mCrB;Aar0CA;EAAsC,YN/NnB;APwiDnB;Aax0CA;EAAiC,YN5NnB;APwiDd;Aa30CA;EAA0C,YN2EnB;APowCvB;Aa90CA;EAA2C,YNyEnB;APywCxB;Aaj1CA;EAAmC,YNvNnB;AP4iDhB;Aap1CA;EAAmC,YNzCnB;APi4ChB;Aav1CA;EAAqC,YNpCnB;AP+3ClB;Aa11CA;EAAgC,YNtLnB;APohDb;Aa71CA;EAAqC,YN7UnB;AP8qDlB;Aah2CA;EAAkC,YN1RnB;AP8nDf;Aan2CA;EAAgC,YNsDnB;APizCb;Aat2CA;EAAkC,YNmLnB;APurCf;Aaz2CA;EAAiC,YNrPnB;APkmDd;Aa52CA;EAAkC,YNrPnB;APqmDf;Aa/2CA;EAAoC,YN7WnB;APguDjB;Aal3CA;EAA2C,YN7WnB;APmuDxB;Aar3CA;EAAkC,YN0LnB;AP+rCf;Aax3CA;EAAyC,YN0LnB;APksCtB;Aa33CA;EAAoC,YNyFnB;APsyCjB;Aa93CA;;EACgC,YNzUnB;AP2sDb;Aaj4CA;;EACiC,YN+MnB;APsrCd;Aap4CA;EAAiC,YN4PnB;AP4oCd;Aav4CA;EAAoC,YNuKnB;APouCjB;Aa14CA;EAAuC,YNtPnB;APooDpB;Aa74CA;EAAuC,YNiKnB;APgvCpB;Aah5CA;EAAqC,YN9PnB;APkpDlB;Aan5CA;EAAuC,YN/LnB;APslDpB;Aat5CA;EAAwC,YNxLnB;APklDrB;Aaz5CA;EAAyC,YNrMnB;APkmDtB;Aa55CA;EAA8C,YN/LnB;AP+lD3B;Aa/5CA;;;EAEyC,YNxMnB;AP2mDtB;Aal6CA;;EAC2C,YN9MnB;APonDxB;Aar6CA;;EACyC,YN/MnB;APwnDtB;Aax6CA;;EACyC,YNpMnB;APgnDtB;Aa36CA;EAAwC,YNjNnB;APgoDrB;Aa96CA;EAAiC,YNuRnB;AP2pCd;Aaj7CA;EAAoC,YN5SnB;APiuDjB;Aap7CA;EAAqC,YN9EnB;APsgDlB;Aav7CA;;;;;EAIsC,YNnEnB;AP8/CnB;Aa17CA;EAA2C,YN/TnB;AP6vDxB;Aa77CA;;;EAEkC,YNqDnB;AP44Cf;Aah8CA;;EACmC,YNnQnB;APusDhB;Aan8CA;EAAuC,YNzKnB;APgnDpB;Aat8CA;EAAgC,YN3KnB;APqnDb;Aaz8CA;;;EAEwC,YNxJnB;APqmDrB;Aa58CA;EAA0C,YN2KnB;APqyCvB;Aa/8CA;EAA+B,YNiCnB;APk7CZ;Aal9CA;;EACmC,YN0QnB;AP4sChB;Aar9CA;;EACwC,YNVnB;APm+CrB;Aax9CA;;EAC0C,YNXnB;APu+CvB;Aa39CA;EAAoC,YN1InB;APymDjB;Aa99CA;EAAwC,YNlVnB;APozDrB;Aaj+CA;EAAmC,YNjJnB;APsnDhB;Aap+CA;EAAsC,YNbnB;APq/CnB;Aav+CA;EAAoC,YN+FnB;AP44CjB;Aa1+CA;EAAsC,YNuEnB;APu6CnB;Aa7+CA;EAA6C,YNuEnB;AP06C1B;Aah/CA;EAAiC,YNzZnB;AP64Dd;Aan/CA;;EACqC,YN5MnB;APmsDlB;Aat/CA;EAAgC,YN0MnB;APgzCb;Aaz/CA;EAAuC,YNxanB;APq6DpB;Aa5/CA;EAAiC,YNInB;AP4/Cd;Aa//CA;EAAuC,YNuFnB;AP46CpB;AalgDA;EAAmC,YN2MnB;AP2zChB;AargDA;EAAiC,YN+QnB;AP0vCd;AaxgDA;EAAwC,YNzCnB;APqjDrB;Aa3gDA;EAAiC,YNwPnB;APuxCd;Aa9gDA;EAAuC,YNrZnB;APu6DpB;AajhDA;EAAmC,YNvBnB;AP4iDhB;AaphDA;EAA0C,YN3LnB;APmtDvB;AavhDA;EAAoC,YN5XnB;APu5DjB;Aa1hDA;EAA0C,YNhYnB;AP85DvB;Aa7hDA;EAAwC,YNnYnB;APo6DrB;AahiDA;EAAoC,YNtYnB;AP06DjB;AaniDA;EAAsC,YNlYnB;APy6DnB;AatiDA;EAAsC,YNlYnB;AP46DnB;AaziDA;EAAuC,YN3bnB;APw+DpB;Aa5iDA;EAAyC,YN3bnB;AP2+DtB;Aa/iDA;EAAkC,YN+KnB;APo4Cf;AaljDA;EAAsC,YNnVnB;APy4DnB;AarjDA;EAA+B,YN9dnB;APuhEZ;AaxjDA;EAAuC,YN5RnB;APw1DpB;Aa3jDA;EAAwC,YN/CnB;AP8mDrB;Aa9jDA;EAA0C,YN9bnB;APggEvB;AajkDA;EAAuC,YNtfnB;AP2jEpB;AapkDA;EAAsC,YN/BnB;APumDnB;AavkDA;EAAuC,YNzHnB;APosDpB;Aa1kDA;EAAmC,YNvInB;APqtDhB;Aa7kDA;EAA0C,YNvInB;APwtDvB;AahlDA;EAAuC,YN4JnB;APw7CpB;AanlDA;EAAsC,YN4JnB;AP27CnB;AatlDA;EAAoC,YNxcnB;APkiEjB;AazlDA;EAAgC,YNjbnB;AP8gEb;Aa5lDA;EAAoC,YNvJnB;APuvDjB;Aa/lDA;EAAsC,YN3gBnB;AP8mEnB;AalmDA;EAA+B,YN7ZnB;APmgEZ;AarmDA;;;EAEgC,YNzKnB;APkxDb;AaxmDA;EAAqC,YNpGnB;APgtDlB;Aa3mDA;EAAuC,YNxbnB;APuiEpB;Aa9mDA;EAA2C,YN5WnB;AP89DxB;AajnDA;EAAqC,YN9VnB;APm9DlB;AapnDA;EAAqC,YN9PnB;APs3DlB;AavnDA;EAAoC,YNrJnB;APgxDjB;Aa1nDA;EAAmC,YNenB;AP+mDhB;Aa7nDA;EAAyC,YN2BnB;APsmDtB;AahoDA;EAAwC,YNoCnB;APgmDrB;AanoDA;EAAqC,YNqCnB;APkmDlB;AatoDA;EAAsC,YN5anB;APsjEnB;AazoDA;EAA4C,YN9anB;AP2jEzB;Aa5oDA;EAAoC,YN/VnB;AP++DjB;Aa/oDA;EAAiC,YNoBnB;AP+nDd;AalpDA;EAAwC,YN8KnB;APw+CrB;AarpDA;EAAuC,YN/FnB;APwvDpB;AaxpDA;EAAwC,YN6EnB;AP+kDrB;Aa3pDA;EAAsC,YN9MnB;AP62DnB;Aa9pDA;EAAkC,YN+KnB;APm/Cf;AajqDA;EAAiC,YN7HnB;APkyDd;AapqDA;EAAoC,YNnHnB;AP2xDjB;AavqDA;;EACwC,YNkInB;APyiDrB;Aa1qDA;EAA4C,YNkInB;AP4iDzB;Aa7qDA;EAAyC,YN0KnB;APugDtB;AahrDA;EAAwC,YNlInB;APszDrB;AanrDA;EAAuC,YNyKnB;AP8gDpB;AatrDA;EAAwC,YNnInB;AP6zDrB;AazrDA;EAA0C,YNlInB;AP+zDvB;Aa5rDA;EAA0C,YNpInB;APo0DvB;Aa/rDA;EAAmC,YN1GnB;AP6yDhB;AalsDA;EAAuC,YN7QnB;APm9DpB;AarsDA;EAA8C,YN1UnB;APmhE3B;AaxsDA;EAAwC,YNzEnB;APqxDrB;Aa3sDA;EAAqC,YNkLnB;AP6hDlB;Aa9sDA;EAAmC,YNXnB;AP6tDhB;AajtDA;EAAsC,YNuJnB;AP8jDnB;AaptDA;EAAuC,YNwJnB;APgkDpB;AavtDA;;EACgC,YN/fnB;AP0tEb;Aa1tDA;EAAoC,YN4JnB;APkkDjB;Aa7tDA;EAAkC,YN8GnB;APmnDf;AahuDA;EAAmC,YNwDnB;AP4qDhB;AanuDA;EAAmC,YN9InB;APq3DhB;AatuDA;;EACyC,YN0LnB;APgjDtB;AazuDA;EAA0C,YNjHnB;AP81DvB;Aa5uDA;EAAqC,YNrHnB;APq2DlB;Aa/uDA;EAAyC,YNnWnB;APslEtB;AalvDA;;;EAEyC,YN/gBnB;APqwEtB;AarvDA;;EACmD,YN9gBnB;APuwEhC;AaxvDA;;EACyC,YNlhBnB;AP8wEtB;Aa3vDA;;EAC4C,YNnhBnB;APkxEzB;Aa9vDA;;EAC0C,YNxhBnB;AP0xEvB;AajwDA;EAA0C,YN3InB;APg5DvB;AapwDA;EAAqC,YN3OnB;APm/DlB;AavwDA;EAAyC,YNxInB;APm5DtB;Aa1wDA;EAA2C,YNxInB;APs5DxB;Aa7wDA;EAAwC,YNwBnB;APyvDrB;AahxDA;EAA0C,YNwBnB;AP4vDvB;AanxDA;EAAmC,YN/dnB;APsvEhB;AatxDA;EAA2C,YNlenB;AP4vExB;AazxDA;EAAkC,YNpcnB;APiuEf;Aa5xDA;EAA0C,YNljBnB;APk1EvB;Aa/xDA;EAAwC,YNxPnB;AP2hErB;AalyDA;;EAC4C,YNzPnB;AP+hEzB;AaryDA;;EAC2C,YN7PnB;APsiExB;AaxyDA;;EAC0C,YNhQnB;AP4iEvB;Aa3yDA;EAAsC,YNrQnB;APojEnB;Aa9yDA;;EACwC,YNxRnB;AP0kErB;AajzDA;;EACyC,YN7RnB;APklEtB;AapzDA;EAA4C,YN1RnB;APklEzB;AavzDA;EAA0C,YNpSnB;AP+lEvB;Aa1zDA;EAAyC,YN3RnB;APylEtB;Aa7zDA;EAA2C,YN/RnB;APgmExB;Aah0DA;EAAyC,YNjSnB;APqmEtB;Aan0DA;EAAsC,YN+DnB;APwwDnB;Aat0DA;EAAuC,YN/FnB;APy6DpB;Aaz0DA;EAA6C,YN/bnB;AP4wE1B;Aa50DA;EAA+B,YNtUnB;APspEZ;Aa/0DA;EAAsC,YNtUnB;APypEnB;Aal1DA;EAAwC,YNkEnB;APoxDrB;Aar1DA;EAA0C,YNrKnB;AP8/DvB;Aax1DA;EAAiD,YNrKnB;APigE9B;Aa31DA;EAAuC,YN5UnB;AP2qEpB;Aa91DA;EAAwC,YNwHnB;AP0uDrB;Aaj2DA;EAAmC,YNnFnB;APw7DhB;Aap2DA;EAAmC,YNzenB;APi1EhB;Aav2DA;EAAoC,YN9WnB;APytEjB;Aa12DA;EAAkC,YNxKnB;APshEf;Aa72DA;EAA8C,YNpQnB;APqnE3B;Aah3DA;;EACuC,YNSnB;AP22DpB;Aan3DA;EAAmC,YNjdnB;APw0EhB;Aat3DA;EAAkC,YNzoBnB;APmgFf;Aaz3DA;EAAmC,YN/nBnB;AP4/EhB;Aa53DA;EAA4C,YN3hBnB;AP25EzB;Aa/3DA;EAA6C,YN9hBnB;APi6E1B;Aal4DA;EAA6C,YN5hBnB;APk6E1B;Aar4DA;EAA6C,YNjiBnB;AP06E1B;Aax4DA;EAAqC,YNpRnB;APgqElB;Aa34DA;EAAoC,YN5NnB;AP2mEjB;Aa94DA;EAAsC,YN5NnB;AP8mEnB;Aaj5DA;EAAkC,YN/NnB;APonEf;Aap5DA;EAAgC,YNlOnB;AP0nEb;Aav5DA;EAAuC,YNpenB;AP+3EpB;Aa15DA;EAAyC,YNpenB;APk4EtB;Aa75DA;EAAkC,YNtSnB;APusEf;Aah6DA;EAAkC,YNiFnB;APm1Df;Aan6DA;EAAsC,YNlkBnB;APy+EnB;Aat6DA;EAAsC,YNrXnB;AP+xEnB;Aaz6DA;EAAyC,YNpInB;APijEtB;Aa56DA;EAAiC,YNpcnB;APo3Ed;Aa/6DA;EAA4C,YNhenB;APm5EzB;Aal7DA;EAAqC,YNpfnB;AP06ElB;Aar7DA;EAAiC,YNlNnB;AP2oEd;Aax7DA;EAAyC,YN1XnB;APszEtB;Aa37DA;EAAgC,YNoDnB;AP24Db;Aa97DA;EAAyC,YN3JnB;AP6lEtB;Aaj8DA;EAAqC,YNzNnB;AP8pElB;Aap8DA;EAAmC,YNlHnB;AP0jEhB;Aav8DA;EAAyC,YN7LnB;APwoEtB;Aa18DA;EAA2C,YN7LnB;AP2oExB;Aa78DA;EAAwC,YN3CnB;AP4/DrB;Aah9DA;EAA0C,YN3CnB;AP+/DvB;Aan9DA;EAAyC,YNrGnB;AP4jEtB;Aat9DA;EAA4C,YNrGnB;AP+jEzB;Aaz9DA;EAAoC,YN7UnB;AP0yEjB;Aa59DA;EAAsC,YNnlBnB;APmjFnB;Aa/9DA;EAAwC,YNnlBnB;APsjFrB;Aal+DA;EAAoC,YN/LnB;APqqEjB;Aar+DA;EAAmC,YNlXnB;AP21EhB;Aax+DA;EAAuC,YNkFnB;AP05DpB;Aa3+DA;EAAoC,YNmFnB;AP45DjB;Aa9+DA;EAAmC,YN9cnB;APg8EhB;Aaj/DA;EAA6C,YN2BnB;AP09D1B;Aap/DA;EAA2C,YNmEnB;APq7DxB;Aav/DA;EAA8C,YNxKnB;APmqE3B;Aa1/DA;EAAkC,YN9lBnB;AP4lFf;Aa7/DA;EAA8C,YNtoBnB;APuoF3B;AahgEA;EAAiD,YNqDnB;AP+8D9B;AangEA;EAAoC,YNxlBnB;AP+lFjB;AatgEA;EAAwD,YN5oBnB;APspFrC;AazgEA;;EACgE,YN9qBnB;AP2rF7C;Aa5gEA;;;EAEiC,YNvfnB;APugFd;Aa/gEA;EAAkC,YNhYnB;APm5Ef;AalhEA;EAAoC,YNhYnB;APs5EjB;AarhEA;;EAC0C,YN1HnB;APmpEvB;AaxhEA;EAAuC,YNzRnB;APqzEpB;Aa3hEA;EAAmC,YNiCnB;AP8/DhB;Aa9hEA;EAA0C,YNiCnB;APigEvB;AajiEA;EAAqC,YNlHnB;APupElB;AapiEA;EAA2C,YNlHnB;AP0pExB;AaviEA;EAA4C,YNlHnB;AP6pEzB;Aa1iEA;EAAuC,YNrNnB;APmwEpB;Aa7iEA;EAAwC,YNpbnB;APq+ErB;AahjEA;EAAkC,YNmEnB;APi/Df;AanjEA;EAAsC,YNpDnB;AP2mEnB;AatjEA;;EACiD,YNzYnB;APm8E9B;AazjEA;;EACyC,YN7anB;AP0+EtB;Aa5jEA;EAAwC,YNtXnB;APs7ErB;Aa/jEA;EAA0C,YNlfnB;APqjFvB;AalkEA;EAA4C,YNlfnB;APwjFzB;AarkEA;EAAmC,YNtTnB;AP+3EhB;AaxkEA;EAAyC,YNptBnB;APgyFtB;Aa3kEA;EAA2C,YNptBnB;APmyFxB;Aa9kEA;;EACyC,YNrtBnB;APuyFtB;AajlEA;;EAC2C,YNttBnB;AP2yFxB;AaplEA;EAAwC,YNJnB;AP4lErB;AavlEA;EAA0C,YNJnB;AP+lEvB;Aa1lEA;EAAmC,YNHnB;APimEhB;Aa7lEA;EAAqC,YN3WnB;AP48ElB;AahmEA;;EACoC,YN5WnB;APg9EjB;AanmEA;;EACsC,YN7WnB;APo9EnB;AatmEA;EAAkC,YNtNnB;APg0Ef;AazmEA;EAA2C,YN3bnB;APwiFxB;Aa5mEA;EAAqC,YNtFnB;APssElB;Aa/mEA;;;EAE6C,YNxEnB;AP2rE1B;AalnEA;;EACuD,YNvEnB;AP6rEpC;AarnEA;;EAC6C,YN3EnB;APosE1B;AaxnEA;;EACgD,YN5EnB;APwsE7B;Aa3nEA;;EAC8C,YNjFnB;APgtE3B;Aa9nEA;EAAmC,YN3KnB;AP6yEhB;AajoEA;;;EAEiC,YNzrBnB;AP8zFd;AapoEA;EAAoC,YNlPnB;AP03EjB;AavoEA;EAA4C,YNKnB;APsoEzB;Aa1oEA;EAA4C,YNKnB;APyoEzB;Aa7oEA;EAA2C,YNKnB;AP4oExB;AahpEA;;EACyC,YNDnB;APqpEtB;AanpEA;;EAC2C,YNFnB;APypExB;AatpEA;EAAqC,YNxsBnB;APk2FlB;AazpEA;EAAiC,YNpbnB;APilFd;Aa5pEA;EAAiC,YN1hBnB;AP0rFd;Aa/pEA;EAAiC,YNxYnB;AP2iFd;AalqEA;EAAoC,YN/OnB;APq5EjB;AarqEA;EAAoC,YNziBnB;APktFjB;AaxqEA;EAAsC,YNjUnB;AP6+EnB;Aa3qEA;EAAwC,YN7KnB;AP41ErB;Aa9qEA;EAAwC,YNhInB;APkzErB;AajrEA;EAAuC,YNJnB;APyrEpB;AaprEA;EAAmC,YNxUnB;APggFhB;Acz8FA;EH8BE,kBAAA;EACA,UAAA;EACA,WAAA;EACA,UAAA;EACA,YAAA;EACA,gBAAA;EACA,sBAAA;EACA,SAAA;AX+6FF;AWr6FE;EAEE,gBAAA;EACA,WAAA;EACA,YAAA;EACA,SAAA;EACA,iBAAA;EACA,UAAA;AXu6FJ","file":"font-awesome.scss","sourcesContent":["@charset \"UTF-8\";\n/*!\n *  Font Awesome 4.7.0 by @davegandy - http://fontawesome.io - @fontawesome\n *  License - http://fontawesome.io/license (Font: SIL OFL 1.1, CSS: MIT License)\n */\n/* FONT PATH\n * -------------------------- */\n@font-face {\n  font-family: \"FontAwesome\";\n  src: url(\"../fonts/fontawesome-webfont.eot?v=4.7.0\");\n  src: url(\"../fonts/fontawesome-webfont.eot?#iefix&v=4.7.0\") format(\"embedded-opentype\"), url(\"../fonts/fontawesome-webfont.woff2?v=4.7.0\") format(\"woff2\"), url(\"../fonts/fontawesome-webfont.woff?v=4.7.0\") format(\"woff\"), url(\"../fonts/fontawesome-webfont.ttf?v=4.7.0\") format(\"truetype\"), url(\"../fonts/fontawesome-webfont.svg?v=4.7.0#fontawesomeregular\") format(\"svg\");\n  font-weight: normal;\n  font-style: normal;\n}\n.fa {\n  display: inline-block;\n  font: normal normal normal 14px/1 FontAwesome;\n  font-size: inherit;\n  text-rendering: auto;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n/* makes the font 33% larger relative to the icon container */\n.fa-lg {\n  font-size: 1.3333333333em;\n  line-height: 0.75em;\n  vertical-align: -15%;\n}\n\n.fa-2x {\n  font-size: 2em;\n}\n\n.fa-3x {\n  font-size: 3em;\n}\n\n.fa-4x {\n  font-size: 4em;\n}\n\n.fa-5x {\n  font-size: 5em;\n}\n\n.fa-fw {\n  width: 1.2857142857em;\n  text-align: center;\n}\n\n.fa-ul {\n  padding-left: 0;\n  margin-left: 2.1428571429em;\n  list-style-type: none;\n}\n.fa-ul > li {\n  position: relative;\n}\n\n.fa-li {\n  position: absolute;\n  left: -2.1428571429em;\n  width: 2.1428571429em;\n  top: 0.1428571429em;\n  text-align: center;\n}\n.fa-li.fa-lg {\n  left: -1.8571428571em;\n}\n\n.fa-border {\n  padding: 0.2em 0.25em 0.15em;\n  border: solid 0.08em #eee;\n  border-radius: 0.1em;\n}\n\n.fa-pull-left {\n  float: left;\n}\n\n.fa-pull-right {\n  float: right;\n}\n\n.fa.fa-pull-left {\n  margin-right: 0.3em;\n}\n.fa.fa-pull-right {\n  margin-left: 0.3em;\n}\n\n/* Deprecated as of 4.4.0 */\n.pull-right {\n  float: right;\n}\n\n.pull-left {\n  float: left;\n}\n\n.fa.pull-left {\n  margin-right: 0.3em;\n}\n.fa.pull-right {\n  margin-left: 0.3em;\n}\n\n.fa-spin {\n  -webkit-animation: fa-spin 2s infinite linear;\n  animation: fa-spin 2s infinite linear;\n}\n\n.fa-pulse {\n  -webkit-animation: fa-spin 1s infinite steps(8);\n  animation: fa-spin 1s infinite steps(8);\n}\n\n@-webkit-keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(359deg);\n    transform: rotate(359deg);\n  }\n}\n@keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(359deg);\n    transform: rotate(359deg);\n  }\n}\n.fa-rotate-90 {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=1)\";\n  -webkit-transform: rotate(90deg);\n  -ms-transform: rotate(90deg);\n  transform: rotate(90deg);\n}\n\n.fa-rotate-180 {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=2)\";\n  -webkit-transform: rotate(180deg);\n  -ms-transform: rotate(180deg);\n  transform: rotate(180deg);\n}\n\n.fa-rotate-270 {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=3)\";\n  -webkit-transform: rotate(270deg);\n  -ms-transform: rotate(270deg);\n  transform: rotate(270deg);\n}\n\n.fa-flip-horizontal {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)\";\n  -webkit-transform: scale(-1, 1);\n  -ms-transform: scale(-1, 1);\n  transform: scale(-1, 1);\n}\n\n.fa-flip-vertical {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)\";\n  -webkit-transform: scale(1, -1);\n  -ms-transform: scale(1, -1);\n  transform: scale(1, -1);\n}\n\n:root .fa-rotate-90,\n:root .fa-rotate-180,\n:root .fa-rotate-270,\n:root .fa-flip-horizontal,\n:root .fa-flip-vertical {\n  filter: none;\n}\n\n.fa-stack {\n  position: relative;\n  display: inline-block;\n  width: 2em;\n  height: 2em;\n  line-height: 2em;\n  vertical-align: middle;\n}\n\n.fa-stack-1x, .fa-stack-2x {\n  position: absolute;\n  left: 0;\n  width: 100%;\n  text-align: center;\n}\n\n.fa-stack-1x {\n  line-height: inherit;\n}\n\n.fa-stack-2x {\n  font-size: 2em;\n}\n\n.fa-inverse {\n  color: #fff;\n}\n\n/* Font Awesome uses the Unicode Private Use Area (PUA) to ensure screen\n   readers do not read off random characters that represent icons */\n.fa-glass:before {\n  content: \"\";\n}\n\n.fa-music:before {\n  content: \"\";\n}\n\n.fa-search:before {\n  content: \"\";\n}\n\n.fa-envelope-o:before {\n  content: \"\";\n}\n\n.fa-heart:before {\n  content: \"\";\n}\n\n.fa-star:before {\n  content: \"\";\n}\n\n.fa-star-o:before {\n  content: \"\";\n}\n\n.fa-user:before {\n  content: \"\";\n}\n\n.fa-film:before {\n  content: \"\";\n}\n\n.fa-th-large:before {\n  content: \"\";\n}\n\n.fa-th:before {\n  content: \"\";\n}\n\n.fa-th-list:before {\n  content: \"\";\n}\n\n.fa-check:before {\n  content: \"\";\n}\n\n.fa-remove:before,\n.fa-close:before,\n.fa-times:before {\n  content: \"\";\n}\n\n.fa-search-plus:before {\n  content: \"\";\n}\n\n.fa-search-minus:before {\n  content: \"\";\n}\n\n.fa-power-off:before {\n  content: \"\";\n}\n\n.fa-signal:before {\n  content: \"\";\n}\n\n.fa-gear:before,\n.fa-cog:before {\n  content: \"\";\n}\n\n.fa-trash-o:before {\n  content: \"\";\n}\n\n.fa-home:before {\n  content: \"\";\n}\n\n.fa-file-o:before {\n  content: \"\";\n}\n\n.fa-clock-o:before {\n  content: \"\";\n}\n\n.fa-road:before {\n  content: \"\";\n}\n\n.fa-download:before {\n  content: \"\";\n}\n\n.fa-arrow-circle-o-down:before {\n  content: \"\";\n}\n\n.fa-arrow-circle-o-up:before {\n  content: \"\";\n}\n\n.fa-inbox:before {\n  content: \"\";\n}\n\n.fa-play-circle-o:before {\n  content: \"\";\n}\n\n.fa-rotate-right:before,\n.fa-repeat:before {\n  content: \"\";\n}\n\n.fa-refresh:before {\n  content: \"\";\n}\n\n.fa-list-alt:before {\n  content: \"\";\n}\n\n.fa-lock:before {\n  content: \"\";\n}\n\n.fa-flag:before {\n  content: \"\";\n}\n\n.fa-headphones:before {\n  content: \"\";\n}\n\n.fa-volume-off:before {\n  content: \"\";\n}\n\n.fa-volume-down:before {\n  content: \"\";\n}\n\n.fa-volume-up:before {\n  content: \"\";\n}\n\n.fa-qrcode:before {\n  content: \"\";\n}\n\n.fa-barcode:before {\n  content: \"\";\n}\n\n.fa-tag:before {\n  content: \"\";\n}\n\n.fa-tags:before {\n  content: \"\";\n}\n\n.fa-book:before {\n  content: \"\";\n}\n\n.fa-bookmark:before {\n  content: \"\";\n}\n\n.fa-print:before {\n  content: \"\";\n}\n\n.fa-camera:before {\n  content: \"\";\n}\n\n.fa-font:before {\n  content: \"\";\n}\n\n.fa-bold:before {\n  content: \"\";\n}\n\n.fa-italic:before {\n  content: \"\";\n}\n\n.fa-text-height:before {\n  content: \"\";\n}\n\n.fa-text-width:before {\n  content: \"\";\n}\n\n.fa-align-left:before {\n  content: \"\";\n}\n\n.fa-align-center:before {\n  content: \"\";\n}\n\n.fa-align-right:before {\n  content: \"\";\n}\n\n.fa-align-justify:before {\n  content: \"\";\n}\n\n.fa-list:before {\n  content: \"\";\n}\n\n.fa-dedent:before,\n.fa-outdent:before {\n  content: \"\";\n}\n\n.fa-indent:before {\n  content: \"\";\n}\n\n.fa-video-camera:before {\n  content: \"\";\n}\n\n.fa-photo:before,\n.fa-image:before,\n.fa-picture-o:before {\n  content: \"\";\n}\n\n.fa-pencil:before {\n  content: \"\";\n}\n\n.fa-map-marker:before {\n  content: \"\";\n}\n\n.fa-adjust:before {\n  content: \"\";\n}\n\n.fa-tint:before {\n  content: \"\";\n}\n\n.fa-edit:before,\n.fa-pencil-square-o:before {\n  content: \"\";\n}\n\n.fa-share-square-o:before {\n  content: \"\";\n}\n\n.fa-check-square-o:before {\n  content: \"\";\n}\n\n.fa-arrows:before {\n  content: \"\";\n}\n\n.fa-step-backward:before {\n  content: \"\";\n}\n\n.fa-fast-backward:before {\n  content: \"\";\n}\n\n.fa-backward:before {\n  content: \"\";\n}\n\n.fa-play:before {\n  content: \"\";\n}\n\n.fa-pause:before {\n  content: \"\";\n}\n\n.fa-stop:before {\n  content: \"\";\n}\n\n.fa-forward:before {\n  content: \"\";\n}\n\n.fa-fast-forward:before {\n  content: \"\";\n}\n\n.fa-step-forward:before {\n  content: \"\";\n}\n\n.fa-eject:before {\n  content: \"\";\n}\n\n.fa-chevron-left:before {\n  content: \"\";\n}\n\n.fa-chevron-right:before {\n  content: \"\";\n}\n\n.fa-plus-circle:before {\n  content: \"\";\n}\n\n.fa-minus-circle:before {\n  content: \"\";\n}\n\n.fa-times-circle:before {\n  content: \"\";\n}\n\n.fa-check-circle:before {\n  content: \"\";\n}\n\n.fa-question-circle:before {\n  content: \"\";\n}\n\n.fa-info-circle:before {\n  content: \"\";\n}\n\n.fa-crosshairs:before {\n  content: \"\";\n}\n\n.fa-times-circle-o:before {\n  content: \"\";\n}\n\n.fa-check-circle-o:before {\n  content: \"\";\n}\n\n.fa-ban:before {\n  content: \"\";\n}\n\n.fa-arrow-left:before {\n  content: \"\";\n}\n\n.fa-arrow-right:before {\n  content: \"\";\n}\n\n.fa-arrow-up:before {\n  content: \"\";\n}\n\n.fa-arrow-down:before {\n  content: \"\";\n}\n\n.fa-mail-forward:before,\n.fa-share:before {\n  content: \"\";\n}\n\n.fa-expand:before {\n  content: \"\";\n}\n\n.fa-compress:before {\n  content: \"\";\n}\n\n.fa-plus:before {\n  content: \"\";\n}\n\n.fa-minus:before {\n  content: \"\";\n}\n\n.fa-asterisk:before {\n  content: \"\";\n}\n\n.fa-exclamation-circle:before {\n  content: \"\";\n}\n\n.fa-gift:before {\n  content: \"\";\n}\n\n.fa-leaf:before {\n  content: \"\";\n}\n\n.fa-fire:before {\n  content: \"\";\n}\n\n.fa-eye:before {\n  content: \"\";\n}\n\n.fa-eye-slash:before {\n  content: \"\";\n}\n\n.fa-warning:before,\n.fa-exclamation-triangle:before {\n  content: \"\";\n}\n\n.fa-plane:before {\n  content: \"\";\n}\n\n.fa-calendar:before {\n  content: \"\";\n}\n\n.fa-random:before {\n  content: \"\";\n}\n\n.fa-comment:before {\n  content: \"\";\n}\n\n.fa-magnet:before {\n  content: \"\";\n}\n\n.fa-chevron-up:before {\n  content: \"\";\n}\n\n.fa-chevron-down:before {\n  content: \"\";\n}\n\n.fa-retweet:before {\n  content: \"\";\n}\n\n.fa-shopping-cart:before {\n  content: \"\";\n}\n\n.fa-folder:before {\n  content: \"\";\n}\n\n.fa-folder-open:before {\n  content: \"\";\n}\n\n.fa-arrows-v:before {\n  content: \"\";\n}\n\n.fa-arrows-h:before {\n  content: \"\";\n}\n\n.fa-bar-chart-o:before,\n.fa-bar-chart:before {\n  content: \"\";\n}\n\n.fa-twitter-square:before {\n  content: \"\";\n}\n\n.fa-facebook-square:before {\n  content: \"\";\n}\n\n.fa-camera-retro:before {\n  content: \"\";\n}\n\n.fa-key:before {\n  content: \"\";\n}\n\n.fa-gears:before,\n.fa-cogs:before {\n  content: \"\";\n}\n\n.fa-comments:before {\n  content: \"\";\n}\n\n.fa-thumbs-o-up:before {\n  content: \"\";\n}\n\n.fa-thumbs-o-down:before {\n  content: \"\";\n}\n\n.fa-star-half:before {\n  content: \"\";\n}\n\n.fa-heart-o:before {\n  content: \"\";\n}\n\n.fa-sign-out:before {\n  content: \"\";\n}\n\n.fa-linkedin-square:before {\n  content: \"\";\n}\n\n.fa-thumb-tack:before {\n  content: \"\";\n}\n\n.fa-external-link:before {\n  content: \"\";\n}\n\n.fa-sign-in:before {\n  content: \"\";\n}\n\n.fa-trophy:before {\n  content: \"\";\n}\n\n.fa-github-square:before {\n  content: \"\";\n}\n\n.fa-upload:before {\n  content: \"\";\n}\n\n.fa-lemon-o:before {\n  content: \"\";\n}\n\n.fa-phone:before {\n  content: \"\";\n}\n\n.fa-square-o:before {\n  content: \"\";\n}\n\n.fa-bookmark-o:before {\n  content: \"\";\n}\n\n.fa-phone-square:before {\n  content: \"\";\n}\n\n.fa-twitter:before {\n  content: \"\";\n}\n\n.fa-facebook-f:before,\n.fa-facebook:before {\n  content: \"\";\n}\n\n.fa-github:before {\n  content: \"\";\n}\n\n.fa-unlock:before {\n  content: \"\";\n}\n\n.fa-credit-card:before {\n  content: \"\";\n}\n\n.fa-feed:before,\n.fa-rss:before {\n  content: \"\";\n}\n\n.fa-hdd-o:before {\n  content: \"\";\n}\n\n.fa-bullhorn:before {\n  content: \"\";\n}\n\n.fa-bell:before {\n  content: \"\";\n}\n\n.fa-certificate:before {\n  content: \"\";\n}\n\n.fa-hand-o-right:before {\n  content: \"\";\n}\n\n.fa-hand-o-left:before {\n  content: \"\";\n}\n\n.fa-hand-o-up:before {\n  content: \"\";\n}\n\n.fa-hand-o-down:before {\n  content: \"\";\n}\n\n.fa-arrow-circle-left:before {\n  content: \"\";\n}\n\n.fa-arrow-circle-right:before {\n  content: \"\";\n}\n\n.fa-arrow-circle-up:before {\n  content: \"\";\n}\n\n.fa-arrow-circle-down:before {\n  content: \"\";\n}\n\n.fa-globe:before {\n  content: \"\";\n}\n\n.fa-wrench:before {\n  content: \"\";\n}\n\n.fa-tasks:before {\n  content: \"\";\n}\n\n.fa-filter:before {\n  content: \"\";\n}\n\n.fa-briefcase:before {\n  content: \"\";\n}\n\n.fa-arrows-alt:before {\n  content: \"\";\n}\n\n.fa-group:before,\n.fa-users:before {\n  content: \"\";\n}\n\n.fa-chain:before,\n.fa-link:before {\n  content: \"\";\n}\n\n.fa-cloud:before {\n  content: \"\";\n}\n\n.fa-flask:before {\n  content: \"\";\n}\n\n.fa-cut:before,\n.fa-scissors:before {\n  content: \"\";\n}\n\n.fa-copy:before,\n.fa-files-o:before {\n  content: \"\";\n}\n\n.fa-paperclip:before {\n  content: \"\";\n}\n\n.fa-save:before,\n.fa-floppy-o:before {\n  content: \"\";\n}\n\n.fa-square:before {\n  content: \"\";\n}\n\n.fa-navicon:before,\n.fa-reorder:before,\n.fa-bars:before {\n  content: \"\";\n}\n\n.fa-list-ul:before {\n  content: \"\";\n}\n\n.fa-list-ol:before {\n  content: \"\";\n}\n\n.fa-strikethrough:before {\n  content: \"\";\n}\n\n.fa-underline:before {\n  content: \"\";\n}\n\n.fa-table:before {\n  content: \"\";\n}\n\n.fa-magic:before {\n  content: \"\";\n}\n\n.fa-truck:before {\n  content: \"\";\n}\n\n.fa-pinterest:before {\n  content: \"\";\n}\n\n.fa-pinterest-square:before {\n  content: \"\";\n}\n\n.fa-google-plus-square:before {\n  content: \"\";\n}\n\n.fa-google-plus:before {\n  content: \"\";\n}\n\n.fa-money:before {\n  content: \"\";\n}\n\n.fa-caret-down:before {\n  content: \"\";\n}\n\n.fa-caret-up:before {\n  content: \"\";\n}\n\n.fa-caret-left:before {\n  content: \"\";\n}\n\n.fa-caret-right:before {\n  content: \"\";\n}\n\n.fa-columns:before {\n  content: \"\";\n}\n\n.fa-unsorted:before,\n.fa-sort:before {\n  content: \"\";\n}\n\n.fa-sort-down:before,\n.fa-sort-desc:before {\n  content: \"\";\n}\n\n.fa-sort-up:before,\n.fa-sort-asc:before {\n  content: \"\";\n}\n\n.fa-envelope:before {\n  content: \"\";\n}\n\n.fa-linkedin:before {\n  content: \"\";\n}\n\n.fa-rotate-left:before,\n.fa-undo:before {\n  content: \"\";\n}\n\n.fa-legal:before,\n.fa-gavel:before {\n  content: \"\";\n}\n\n.fa-dashboard:before,\n.fa-tachometer:before {\n  content: \"\";\n}\n\n.fa-comment-o:before {\n  content: \"\";\n}\n\n.fa-comments-o:before {\n  content: \"\";\n}\n\n.fa-flash:before,\n.fa-bolt:before {\n  content: \"\";\n}\n\n.fa-sitemap:before {\n  content: \"\";\n}\n\n.fa-umbrella:before {\n  content: \"\";\n}\n\n.fa-paste:before,\n.fa-clipboard:before {\n  content: \"\";\n}\n\n.fa-lightbulb-o:before {\n  content: \"\";\n}\n\n.fa-exchange:before {\n  content: \"\";\n}\n\n.fa-cloud-download:before {\n  content: \"\";\n}\n\n.fa-cloud-upload:before {\n  content: \"\";\n}\n\n.fa-user-md:before {\n  content: \"\";\n}\n\n.fa-stethoscope:before {\n  content: \"\";\n}\n\n.fa-suitcase:before {\n  content: \"\";\n}\n\n.fa-bell-o:before {\n  content: \"\";\n}\n\n.fa-coffee:before {\n  content: \"\";\n}\n\n.fa-cutlery:before {\n  content: \"\";\n}\n\n.fa-file-text-o:before {\n  content: \"\";\n}\n\n.fa-building-o:before {\n  content: \"\";\n}\n\n.fa-hospital-o:before {\n  content: \"\";\n}\n\n.fa-ambulance:before {\n  content: \"\";\n}\n\n.fa-medkit:before {\n  content: \"\";\n}\n\n.fa-fighter-jet:before {\n  content: \"\";\n}\n\n.fa-beer:before {\n  content: \"\";\n}\n\n.fa-h-square:before {\n  content: \"\";\n}\n\n.fa-plus-square:before {\n  content: \"\";\n}\n\n.fa-angle-double-left:before {\n  content: \"\";\n}\n\n.fa-angle-double-right:before {\n  content: \"\";\n}\n\n.fa-angle-double-up:before {\n  content: \"\";\n}\n\n.fa-angle-double-down:before {\n  content: \"\";\n}\n\n.fa-angle-left:before {\n  content: \"\";\n}\n\n.fa-angle-right:before {\n  content: \"\";\n}\n\n.fa-angle-up:before {\n  content: \"\";\n}\n\n.fa-angle-down:before {\n  content: \"\";\n}\n\n.fa-desktop:before {\n  content: \"\";\n}\n\n.fa-laptop:before {\n  content: \"\";\n}\n\n.fa-tablet:before {\n  content: \"\";\n}\n\n.fa-mobile-phone:before,\n.fa-mobile:before {\n  content: \"\";\n}\n\n.fa-circle-o:before {\n  content: \"\";\n}\n\n.fa-quote-left:before {\n  content: \"\";\n}\n\n.fa-quote-right:before {\n  content: \"\";\n}\n\n.fa-spinner:before {\n  content: \"\";\n}\n\n.fa-circle:before {\n  content: \"\";\n}\n\n.fa-mail-reply:before,\n.fa-reply:before {\n  content: \"\";\n}\n\n.fa-github-alt:before {\n  content: \"\";\n}\n\n.fa-folder-o:before {\n  content: \"\";\n}\n\n.fa-folder-open-o:before {\n  content: \"\";\n}\n\n.fa-smile-o:before {\n  content: \"\";\n}\n\n.fa-frown-o:before {\n  content: \"\";\n}\n\n.fa-meh-o:before {\n  content: \"\";\n}\n\n.fa-gamepad:before {\n  content: \"\";\n}\n\n.fa-keyboard-o:before {\n  content: \"\";\n}\n\n.fa-flag-o:before {\n  content: \"\";\n}\n\n.fa-flag-checkered:before {\n  content: \"\";\n}\n\n.fa-terminal:before {\n  content: \"\";\n}\n\n.fa-code:before {\n  content: \"\";\n}\n\n.fa-mail-reply-all:before,\n.fa-reply-all:before {\n  content: \"\";\n}\n\n.fa-star-half-empty:before,\n.fa-star-half-full:before,\n.fa-star-half-o:before {\n  content: \"\";\n}\n\n.fa-location-arrow:before {\n  content: \"\";\n}\n\n.fa-crop:before {\n  content: \"\";\n}\n\n.fa-code-fork:before {\n  content: \"\";\n}\n\n.fa-unlink:before,\n.fa-chain-broken:before {\n  content: \"\";\n}\n\n.fa-question:before {\n  content: \"\";\n}\n\n.fa-info:before {\n  content: \"\";\n}\n\n.fa-exclamation:before {\n  content: \"\";\n}\n\n.fa-superscript:before {\n  content: \"\";\n}\n\n.fa-subscript:before {\n  content: \"\";\n}\n\n.fa-eraser:before {\n  content: \"\";\n}\n\n.fa-puzzle-piece:before {\n  content: \"\";\n}\n\n.fa-microphone:before {\n  content: \"\";\n}\n\n.fa-microphone-slash:before {\n  content: \"\";\n}\n\n.fa-shield:before {\n  content: \"\";\n}\n\n.fa-calendar-o:before {\n  content: \"\";\n}\n\n.fa-fire-extinguisher:before {\n  content: \"\";\n}\n\n.fa-rocket:before {\n  content: \"\";\n}\n\n.fa-maxcdn:before {\n  content: \"\";\n}\n\n.fa-chevron-circle-left:before {\n  content: \"\";\n}\n\n.fa-chevron-circle-right:before {\n  content: \"\";\n}\n\n.fa-chevron-circle-up:before {\n  content: \"\";\n}\n\n.fa-chevron-circle-down:before {\n  content: \"\";\n}\n\n.fa-html5:before {\n  content: \"\";\n}\n\n.fa-css3:before {\n  content: \"\";\n}\n\n.fa-anchor:before {\n  content: \"\";\n}\n\n.fa-unlock-alt:before {\n  content: \"\";\n}\n\n.fa-bullseye:before {\n  content: \"\";\n}\n\n.fa-ellipsis-h:before {\n  content: \"\";\n}\n\n.fa-ellipsis-v:before {\n  content: \"\";\n}\n\n.fa-rss-square:before {\n  content: \"\";\n}\n\n.fa-play-circle:before {\n  content: \"\";\n}\n\n.fa-ticket:before {\n  content: \"\";\n}\n\n.fa-minus-square:before {\n  content: \"\";\n}\n\n.fa-minus-square-o:before {\n  content: \"\";\n}\n\n.fa-level-up:before {\n  content: \"\";\n}\n\n.fa-level-down:before {\n  content: \"\";\n}\n\n.fa-check-square:before {\n  content: \"\";\n}\n\n.fa-pencil-square:before {\n  content: \"\";\n}\n\n.fa-external-link-square:before {\n  content: \"\";\n}\n\n.fa-share-square:before {\n  content: \"\";\n}\n\n.fa-compass:before {\n  content: \"\";\n}\n\n.fa-toggle-down:before,\n.fa-caret-square-o-down:before {\n  content: \"\";\n}\n\n.fa-toggle-up:before,\n.fa-caret-square-o-up:before {\n  content: \"\";\n}\n\n.fa-toggle-right:before,\n.fa-caret-square-o-right:before {\n  content: \"\";\n}\n\n.fa-euro:before,\n.fa-eur:before {\n  content: \"\";\n}\n\n.fa-gbp:before {\n  content: \"\";\n}\n\n.fa-dollar:before,\n.fa-usd:before {\n  content: \"\";\n}\n\n.fa-rupee:before,\n.fa-inr:before {\n  content: \"\";\n}\n\n.fa-cny:before,\n.fa-rmb:before,\n.fa-yen:before,\n.fa-jpy:before {\n  content: \"\";\n}\n\n.fa-ruble:before,\n.fa-rouble:before,\n.fa-rub:before {\n  content: \"\";\n}\n\n.fa-won:before,\n.fa-krw:before {\n  content: \"\";\n}\n\n.fa-bitcoin:before,\n.fa-btc:before {\n  content: \"\";\n}\n\n.fa-file:before {\n  content: \"\";\n}\n\n.fa-file-text:before {\n  content: \"\";\n}\n\n.fa-sort-alpha-asc:before {\n  content: \"\";\n}\n\n.fa-sort-alpha-desc:before {\n  content: \"\";\n}\n\n.fa-sort-amount-asc:before {\n  content: \"\";\n}\n\n.fa-sort-amount-desc:before {\n  content: \"\";\n}\n\n.fa-sort-numeric-asc:before {\n  content: \"\";\n}\n\n.fa-sort-numeric-desc:before {\n  content: \"\";\n}\n\n.fa-thumbs-up:before {\n  content: \"\";\n}\n\n.fa-thumbs-down:before {\n  content: \"\";\n}\n\n.fa-youtube-square:before {\n  content: \"\";\n}\n\n.fa-youtube:before {\n  content: \"\";\n}\n\n.fa-xing:before {\n  content: \"\";\n}\n\n.fa-xing-square:before {\n  content: \"\";\n}\n\n.fa-youtube-play:before {\n  content: \"\";\n}\n\n.fa-dropbox:before {\n  content: \"\";\n}\n\n.fa-stack-overflow:before {\n  content: \"\";\n}\n\n.fa-instagram:before {\n  content: \"\";\n}\n\n.fa-flickr:before {\n  content: \"\";\n}\n\n.fa-adn:before {\n  content: \"\";\n}\n\n.fa-bitbucket:before {\n  content: \"\";\n}\n\n.fa-bitbucket-square:before {\n  content: \"\";\n}\n\n.fa-tumblr:before {\n  content: \"\";\n}\n\n.fa-tumblr-square:before {\n  content: \"\";\n}\n\n.fa-long-arrow-down:before {\n  content: \"\";\n}\n\n.fa-long-arrow-up:before {\n  content: \"\";\n}\n\n.fa-long-arrow-left:before {\n  content: \"\";\n}\n\n.fa-long-arrow-right:before {\n  content: \"\";\n}\n\n.fa-apple:before {\n  content: \"\";\n}\n\n.fa-windows:before {\n  content: \"\";\n}\n\n.fa-android:before {\n  content: \"\";\n}\n\n.fa-linux:before {\n  content: \"\";\n}\n\n.fa-dribbble:before {\n  content: \"\";\n}\n\n.fa-skype:before {\n  content: \"\";\n}\n\n.fa-foursquare:before {\n  content: \"\";\n}\n\n.fa-trello:before {\n  content: \"\";\n}\n\n.fa-female:before {\n  content: \"\";\n}\n\n.fa-male:before {\n  content: \"\";\n}\n\n.fa-gittip:before,\n.fa-gratipay:before {\n  content: \"\";\n}\n\n.fa-sun-o:before {\n  content: \"\";\n}\n\n.fa-moon-o:before {\n  content: \"\";\n}\n\n.fa-archive:before {\n  content: \"\";\n}\n\n.fa-bug:before {\n  content: \"\";\n}\n\n.fa-vk:before {\n  content: \"\";\n}\n\n.fa-weibo:before {\n  content: \"\";\n}\n\n.fa-renren:before {\n  content: \"\";\n}\n\n.fa-pagelines:before {\n  content: \"\";\n}\n\n.fa-stack-exchange:before {\n  content: \"\";\n}\n\n.fa-arrow-circle-o-right:before {\n  content: \"\";\n}\n\n.fa-arrow-circle-o-left:before {\n  content: \"\";\n}\n\n.fa-toggle-left:before,\n.fa-caret-square-o-left:before {\n  content: \"\";\n}\n\n.fa-dot-circle-o:before {\n  content: \"\";\n}\n\n.fa-wheelchair:before {\n  content: \"\";\n}\n\n.fa-vimeo-square:before {\n  content: \"\";\n}\n\n.fa-turkish-lira:before,\n.fa-try:before {\n  content: \"\";\n}\n\n.fa-plus-square-o:before {\n  content: \"\";\n}\n\n.fa-space-shuttle:before {\n  content: \"\";\n}\n\n.fa-slack:before {\n  content: \"\";\n}\n\n.fa-envelope-square:before {\n  content: \"\";\n}\n\n.fa-wordpress:before {\n  content: \"\";\n}\n\n.fa-openid:before {\n  content: \"\";\n}\n\n.fa-institution:before,\n.fa-bank:before,\n.fa-university:before {\n  content: \"\";\n}\n\n.fa-mortar-board:before,\n.fa-graduation-cap:before {\n  content: \"\";\n}\n\n.fa-yahoo:before {\n  content: \"\";\n}\n\n.fa-google:before {\n  content: \"\";\n}\n\n.fa-reddit:before {\n  content: \"\";\n}\n\n.fa-reddit-square:before {\n  content: \"\";\n}\n\n.fa-stumbleupon-circle:before {\n  content: \"\";\n}\n\n.fa-stumbleupon:before {\n  content: \"\";\n}\n\n.fa-delicious:before {\n  content: \"\";\n}\n\n.fa-digg:before {\n  content: \"\";\n}\n\n.fa-pied-piper-pp:before {\n  content: \"\";\n}\n\n.fa-pied-piper-alt:before {\n  content: \"\";\n}\n\n.fa-drupal:before {\n  content: \"\";\n}\n\n.fa-joomla:before {\n  content: \"\";\n}\n\n.fa-language:before {\n  content: \"\";\n}\n\n.fa-fax:before {\n  content: \"\";\n}\n\n.fa-building:before {\n  content: \"\";\n}\n\n.fa-child:before {\n  content: \"\";\n}\n\n.fa-paw:before {\n  content: \"\";\n}\n\n.fa-spoon:before {\n  content: \"\";\n}\n\n.fa-cube:before {\n  content: \"\";\n}\n\n.fa-cubes:before {\n  content: \"\";\n}\n\n.fa-behance:before {\n  content: \"\";\n}\n\n.fa-behance-square:before {\n  content: \"\";\n}\n\n.fa-steam:before {\n  content: \"\";\n}\n\n.fa-steam-square:before {\n  content: \"\";\n}\n\n.fa-recycle:before {\n  content: \"\";\n}\n\n.fa-automobile:before,\n.fa-car:before {\n  content: \"\";\n}\n\n.fa-cab:before,\n.fa-taxi:before {\n  content: \"\";\n}\n\n.fa-tree:before {\n  content: \"\";\n}\n\n.fa-spotify:before {\n  content: \"\";\n}\n\n.fa-deviantart:before {\n  content: \"\";\n}\n\n.fa-soundcloud:before {\n  content: \"\";\n}\n\n.fa-database:before {\n  content: \"\";\n}\n\n.fa-file-pdf-o:before {\n  content: \"\";\n}\n\n.fa-file-word-o:before {\n  content: \"\";\n}\n\n.fa-file-excel-o:before {\n  content: \"\";\n}\n\n.fa-file-powerpoint-o:before {\n  content: \"\";\n}\n\n.fa-file-photo-o:before,\n.fa-file-picture-o:before,\n.fa-file-image-o:before {\n  content: \"\";\n}\n\n.fa-file-zip-o:before,\n.fa-file-archive-o:before {\n  content: \"\";\n}\n\n.fa-file-sound-o:before,\n.fa-file-audio-o:before {\n  content: \"\";\n}\n\n.fa-file-movie-o:before,\n.fa-file-video-o:before {\n  content: \"\";\n}\n\n.fa-file-code-o:before {\n  content: \"\";\n}\n\n.fa-vine:before {\n  content: \"\";\n}\n\n.fa-codepen:before {\n  content: \"\";\n}\n\n.fa-jsfiddle:before {\n  content: \"\";\n}\n\n.fa-life-bouy:before,\n.fa-life-buoy:before,\n.fa-life-saver:before,\n.fa-support:before,\n.fa-life-ring:before {\n  content: \"\";\n}\n\n.fa-circle-o-notch:before {\n  content: \"\";\n}\n\n.fa-ra:before,\n.fa-resistance:before,\n.fa-rebel:before {\n  content: \"\";\n}\n\n.fa-ge:before,\n.fa-empire:before {\n  content: \"\";\n}\n\n.fa-git-square:before {\n  content: \"\";\n}\n\n.fa-git:before {\n  content: \"\";\n}\n\n.fa-y-combinator-square:before,\n.fa-yc-square:before,\n.fa-hacker-news:before {\n  content: \"\";\n}\n\n.fa-tencent-weibo:before {\n  content: \"\";\n}\n\n.fa-qq:before {\n  content: \"\";\n}\n\n.fa-wechat:before,\n.fa-weixin:before {\n  content: \"\";\n}\n\n.fa-send:before,\n.fa-paper-plane:before {\n  content: \"\";\n}\n\n.fa-send-o:before,\n.fa-paper-plane-o:before {\n  content: \"\";\n}\n\n.fa-history:before {\n  content: \"\";\n}\n\n.fa-circle-thin:before {\n  content: \"\";\n}\n\n.fa-header:before {\n  content: \"\";\n}\n\n.fa-paragraph:before {\n  content: \"\";\n}\n\n.fa-sliders:before {\n  content: \"\";\n}\n\n.fa-share-alt:before {\n  content: \"\";\n}\n\n.fa-share-alt-square:before {\n  content: \"\";\n}\n\n.fa-bomb:before {\n  content: \"\";\n}\n\n.fa-soccer-ball-o:before,\n.fa-futbol-o:before {\n  content: \"\";\n}\n\n.fa-tty:before {\n  content: \"\";\n}\n\n.fa-binoculars:before {\n  content: \"\";\n}\n\n.fa-plug:before {\n  content: \"\";\n}\n\n.fa-slideshare:before {\n  content: \"\";\n}\n\n.fa-twitch:before {\n  content: \"\";\n}\n\n.fa-yelp:before {\n  content: \"\";\n}\n\n.fa-newspaper-o:before {\n  content: \"\";\n}\n\n.fa-wifi:before {\n  content: \"\";\n}\n\n.fa-calculator:before {\n  content: \"\";\n}\n\n.fa-paypal:before {\n  content: \"\";\n}\n\n.fa-google-wallet:before {\n  content: \"\";\n}\n\n.fa-cc-visa:before {\n  content: \"\";\n}\n\n.fa-cc-mastercard:before {\n  content: \"\";\n}\n\n.fa-cc-discover:before {\n  content: \"\";\n}\n\n.fa-cc-amex:before {\n  content: \"\";\n}\n\n.fa-cc-paypal:before {\n  content: \"\";\n}\n\n.fa-cc-stripe:before {\n  content: \"\";\n}\n\n.fa-bell-slash:before {\n  content: \"\";\n}\n\n.fa-bell-slash-o:before {\n  content: \"\";\n}\n\n.fa-trash:before {\n  content: \"\";\n}\n\n.fa-copyright:before {\n  content: \"\";\n}\n\n.fa-at:before {\n  content: \"\";\n}\n\n.fa-eyedropper:before {\n  content: \"\";\n}\n\n.fa-paint-brush:before {\n  content: \"\";\n}\n\n.fa-birthday-cake:before {\n  content: \"\";\n}\n\n.fa-area-chart:before {\n  content: \"\";\n}\n\n.fa-pie-chart:before {\n  content: \"\";\n}\n\n.fa-line-chart:before {\n  content: \"\";\n}\n\n.fa-lastfm:before {\n  content: \"\";\n}\n\n.fa-lastfm-square:before {\n  content: \"\";\n}\n\n.fa-toggle-off:before {\n  content: \"\";\n}\n\n.fa-toggle-on:before {\n  content: \"\";\n}\n\n.fa-bicycle:before {\n  content: \"\";\n}\n\n.fa-bus:before {\n  content: \"\";\n}\n\n.fa-ioxhost:before {\n  content: \"\";\n}\n\n.fa-angellist:before {\n  content: \"\";\n}\n\n.fa-cc:before {\n  content: \"\";\n}\n\n.fa-shekel:before,\n.fa-sheqel:before,\n.fa-ils:before {\n  content: \"\";\n}\n\n.fa-meanpath:before {\n  content: \"\";\n}\n\n.fa-buysellads:before {\n  content: \"\";\n}\n\n.fa-connectdevelop:before {\n  content: \"\";\n}\n\n.fa-dashcube:before {\n  content: \"\";\n}\n\n.fa-forumbee:before {\n  content: \"\";\n}\n\n.fa-leanpub:before {\n  content: \"\";\n}\n\n.fa-sellsy:before {\n  content: \"\";\n}\n\n.fa-shirtsinbulk:before {\n  content: \"\";\n}\n\n.fa-simplybuilt:before {\n  content: \"\";\n}\n\n.fa-skyatlas:before {\n  content: \"\";\n}\n\n.fa-cart-plus:before {\n  content: \"\";\n}\n\n.fa-cart-arrow-down:before {\n  content: \"\";\n}\n\n.fa-diamond:before {\n  content: \"\";\n}\n\n.fa-ship:before {\n  content: \"\";\n}\n\n.fa-user-secret:before {\n  content: \"\";\n}\n\n.fa-motorcycle:before {\n  content: \"\";\n}\n\n.fa-street-view:before {\n  content: \"\";\n}\n\n.fa-heartbeat:before {\n  content: \"\";\n}\n\n.fa-venus:before {\n  content: \"\";\n}\n\n.fa-mars:before {\n  content: \"\";\n}\n\n.fa-mercury:before {\n  content: \"\";\n}\n\n.fa-intersex:before,\n.fa-transgender:before {\n  content: \"\";\n}\n\n.fa-transgender-alt:before {\n  content: \"\";\n}\n\n.fa-venus-double:before {\n  content: \"\";\n}\n\n.fa-mars-double:before {\n  content: \"\";\n}\n\n.fa-venus-mars:before {\n  content: \"\";\n}\n\n.fa-mars-stroke:before {\n  content: \"\";\n}\n\n.fa-mars-stroke-v:before {\n  content: \"\";\n}\n\n.fa-mars-stroke-h:before {\n  content: \"\";\n}\n\n.fa-neuter:before {\n  content: \"\";\n}\n\n.fa-genderless:before {\n  content: \"\";\n}\n\n.fa-facebook-official:before {\n  content: \"\";\n}\n\n.fa-pinterest-p:before {\n  content: \"\";\n}\n\n.fa-whatsapp:before {\n  content: \"\";\n}\n\n.fa-server:before {\n  content: \"\";\n}\n\n.fa-user-plus:before {\n  content: \"\";\n}\n\n.fa-user-times:before {\n  content: \"\";\n}\n\n.fa-hotel:before,\n.fa-bed:before {\n  content: \"\";\n}\n\n.fa-viacoin:before {\n  content: \"\";\n}\n\n.fa-train:before {\n  content: \"\";\n}\n\n.fa-subway:before {\n  content: \"\";\n}\n\n.fa-medium:before {\n  content: \"\";\n}\n\n.fa-yc:before,\n.fa-y-combinator:before {\n  content: \"\";\n}\n\n.fa-optin-monster:before {\n  content: \"\";\n}\n\n.fa-opencart:before {\n  content: \"\";\n}\n\n.fa-expeditedssl:before {\n  content: \"\";\n}\n\n.fa-battery-4:before,\n.fa-battery:before,\n.fa-battery-full:before {\n  content: \"\";\n}\n\n.fa-battery-3:before,\n.fa-battery-three-quarters:before {\n  content: \"\";\n}\n\n.fa-battery-2:before,\n.fa-battery-half:before {\n  content: \"\";\n}\n\n.fa-battery-1:before,\n.fa-battery-quarter:before {\n  content: \"\";\n}\n\n.fa-battery-0:before,\n.fa-battery-empty:before {\n  content: \"\";\n}\n\n.fa-mouse-pointer:before {\n  content: \"\";\n}\n\n.fa-i-cursor:before {\n  content: \"\";\n}\n\n.fa-object-group:before {\n  content: \"\";\n}\n\n.fa-object-ungroup:before {\n  content: \"\";\n}\n\n.fa-sticky-note:before {\n  content: \"\";\n}\n\n.fa-sticky-note-o:before {\n  content: \"\";\n}\n\n.fa-cc-jcb:before {\n  content: \"\";\n}\n\n.fa-cc-diners-club:before {\n  content: \"\";\n}\n\n.fa-clone:before {\n  content: \"\";\n}\n\n.fa-balance-scale:before {\n  content: \"\";\n}\n\n.fa-hourglass-o:before {\n  content: \"\";\n}\n\n.fa-hourglass-1:before,\n.fa-hourglass-start:before {\n  content: \"\";\n}\n\n.fa-hourglass-2:before,\n.fa-hourglass-half:before {\n  content: \"\";\n}\n\n.fa-hourglass-3:before,\n.fa-hourglass-end:before {\n  content: \"\";\n}\n\n.fa-hourglass:before {\n  content: \"\";\n}\n\n.fa-hand-grab-o:before,\n.fa-hand-rock-o:before {\n  content: \"\";\n}\n\n.fa-hand-stop-o:before,\n.fa-hand-paper-o:before {\n  content: \"\";\n}\n\n.fa-hand-scissors-o:before {\n  content: \"\";\n}\n\n.fa-hand-lizard-o:before {\n  content: \"\";\n}\n\n.fa-hand-spock-o:before {\n  content: \"\";\n}\n\n.fa-hand-pointer-o:before {\n  content: \"\";\n}\n\n.fa-hand-peace-o:before {\n  content: \"\";\n}\n\n.fa-trademark:before {\n  content: \"\";\n}\n\n.fa-registered:before {\n  content: \"\";\n}\n\n.fa-creative-commons:before {\n  content: \"\";\n}\n\n.fa-gg:before {\n  content: \"\";\n}\n\n.fa-gg-circle:before {\n  content: \"\";\n}\n\n.fa-tripadvisor:before {\n  content: \"\";\n}\n\n.fa-odnoklassniki:before {\n  content: \"\";\n}\n\n.fa-odnoklassniki-square:before {\n  content: \"\";\n}\n\n.fa-get-pocket:before {\n  content: \"\";\n}\n\n.fa-wikipedia-w:before {\n  content: \"\";\n}\n\n.fa-safari:before {\n  content: \"\";\n}\n\n.fa-chrome:before {\n  content: \"\";\n}\n\n.fa-firefox:before {\n  content: \"\";\n}\n\n.fa-opera:before {\n  content: \"\";\n}\n\n.fa-internet-explorer:before {\n  content: \"\";\n}\n\n.fa-tv:before,\n.fa-television:before {\n  content: \"\";\n}\n\n.fa-contao:before {\n  content: \"\";\n}\n\n.fa-500px:before {\n  content: \"\";\n}\n\n.fa-amazon:before {\n  content: \"\";\n}\n\n.fa-calendar-plus-o:before {\n  content: \"\";\n}\n\n.fa-calendar-minus-o:before {\n  content: \"\";\n}\n\n.fa-calendar-times-o:before {\n  content: \"\";\n}\n\n.fa-calendar-check-o:before {\n  content: \"\";\n}\n\n.fa-industry:before {\n  content: \"\";\n}\n\n.fa-map-pin:before {\n  content: \"\";\n}\n\n.fa-map-signs:before {\n  content: \"\";\n}\n\n.fa-map-o:before {\n  content: \"\";\n}\n\n.fa-map:before {\n  content: \"\";\n}\n\n.fa-commenting:before {\n  content: \"\";\n}\n\n.fa-commenting-o:before {\n  content: \"\";\n}\n\n.fa-houzz:before {\n  content: \"\";\n}\n\n.fa-vimeo:before {\n  content: \"\";\n}\n\n.fa-black-tie:before {\n  content: \"\";\n}\n\n.fa-fonticons:before {\n  content: \"\";\n}\n\n.fa-reddit-alien:before {\n  content: \"\";\n}\n\n.fa-edge:before {\n  content: \"\";\n}\n\n.fa-credit-card-alt:before {\n  content: \"\";\n}\n\n.fa-codiepie:before {\n  content: \"\";\n}\n\n.fa-modx:before {\n  content: \"\";\n}\n\n.fa-fort-awesome:before {\n  content: \"\";\n}\n\n.fa-usb:before {\n  content: \"\";\n}\n\n.fa-product-hunt:before {\n  content: \"\";\n}\n\n.fa-mixcloud:before {\n  content: \"\";\n}\n\n.fa-scribd:before {\n  content: \"\";\n}\n\n.fa-pause-circle:before {\n  content: \"\";\n}\n\n.fa-pause-circle-o:before {\n  content: \"\";\n}\n\n.fa-stop-circle:before {\n  content: \"\";\n}\n\n.fa-stop-circle-o:before {\n  content: \"\";\n}\n\n.fa-shopping-bag:before {\n  content: \"\";\n}\n\n.fa-shopping-basket:before {\n  content: \"\";\n}\n\n.fa-hashtag:before {\n  content: \"\";\n}\n\n.fa-bluetooth:before {\n  content: \"\";\n}\n\n.fa-bluetooth-b:before {\n  content: \"\";\n}\n\n.fa-percent:before {\n  content: \"\";\n}\n\n.fa-gitlab:before {\n  content: \"\";\n}\n\n.fa-wpbeginner:before {\n  content: \"\";\n}\n\n.fa-wpforms:before {\n  content: \"\";\n}\n\n.fa-envira:before {\n  content: \"\";\n}\n\n.fa-universal-access:before {\n  content: \"\";\n}\n\n.fa-wheelchair-alt:before {\n  content: \"\";\n}\n\n.fa-question-circle-o:before {\n  content: \"\";\n}\n\n.fa-blind:before {\n  content: \"\";\n}\n\n.fa-audio-description:before {\n  content: \"\";\n}\n\n.fa-volume-control-phone:before {\n  content: \"\";\n}\n\n.fa-braille:before {\n  content: \"\";\n}\n\n.fa-assistive-listening-systems:before {\n  content: \"\";\n}\n\n.fa-asl-interpreting:before,\n.fa-american-sign-language-interpreting:before {\n  content: \"\";\n}\n\n.fa-deafness:before,\n.fa-hard-of-hearing:before,\n.fa-deaf:before {\n  content: \"\";\n}\n\n.fa-glide:before {\n  content: \"\";\n}\n\n.fa-glide-g:before {\n  content: \"\";\n}\n\n.fa-signing:before,\n.fa-sign-language:before {\n  content: \"\";\n}\n\n.fa-low-vision:before {\n  content: \"\";\n}\n\n.fa-viadeo:before {\n  content: \"\";\n}\n\n.fa-viadeo-square:before {\n  content: \"\";\n}\n\n.fa-snapchat:before {\n  content: \"\";\n}\n\n.fa-snapchat-ghost:before {\n  content: \"\";\n}\n\n.fa-snapchat-square:before {\n  content: \"\";\n}\n\n.fa-pied-piper:before {\n  content: \"\";\n}\n\n.fa-first-order:before {\n  content: \"\";\n}\n\n.fa-yoast:before {\n  content: \"\";\n}\n\n.fa-themeisle:before {\n  content: \"\";\n}\n\n.fa-google-plus-circle:before,\n.fa-google-plus-official:before {\n  content: \"\";\n}\n\n.fa-fa:before,\n.fa-font-awesome:before {\n  content: \"\";\n}\n\n.fa-handshake-o:before {\n  content: \"\";\n}\n\n.fa-envelope-open:before {\n  content: \"\";\n}\n\n.fa-envelope-open-o:before {\n  content: \"\";\n}\n\n.fa-linode:before {\n  content: \"\";\n}\n\n.fa-address-book:before {\n  content: \"\";\n}\n\n.fa-address-book-o:before {\n  content: \"\";\n}\n\n.fa-vcard:before,\n.fa-address-card:before {\n  content: \"\";\n}\n\n.fa-vcard-o:before,\n.fa-address-card-o:before {\n  content: \"\";\n}\n\n.fa-user-circle:before {\n  content: \"\";\n}\n\n.fa-user-circle-o:before {\n  content: \"\";\n}\n\n.fa-user-o:before {\n  content: \"\";\n}\n\n.fa-id-badge:before {\n  content: \"\";\n}\n\n.fa-drivers-license:before,\n.fa-id-card:before {\n  content: \"\";\n}\n\n.fa-drivers-license-o:before,\n.fa-id-card-o:before {\n  content: \"\";\n}\n\n.fa-quora:before {\n  content: \"\";\n}\n\n.fa-free-code-camp:before {\n  content: \"\";\n}\n\n.fa-telegram:before {\n  content: \"\";\n}\n\n.fa-thermometer-4:before,\n.fa-thermometer:before,\n.fa-thermometer-full:before {\n  content: \"\";\n}\n\n.fa-thermometer-3:before,\n.fa-thermometer-three-quarters:before {\n  content: \"\";\n}\n\n.fa-thermometer-2:before,\n.fa-thermometer-half:before {\n  content: \"\";\n}\n\n.fa-thermometer-1:before,\n.fa-thermometer-quarter:before {\n  content: \"\";\n}\n\n.fa-thermometer-0:before,\n.fa-thermometer-empty:before {\n  content: \"\";\n}\n\n.fa-shower:before {\n  content: \"\";\n}\n\n.fa-bathtub:before,\n.fa-s15:before,\n.fa-bath:before {\n  content: \"\";\n}\n\n.fa-podcast:before {\n  content: \"\";\n}\n\n.fa-window-maximize:before {\n  content: \"\";\n}\n\n.fa-window-minimize:before {\n  content: \"\";\n}\n\n.fa-window-restore:before {\n  content: \"\";\n}\n\n.fa-times-rectangle:before,\n.fa-window-close:before {\n  content: \"\";\n}\n\n.fa-times-rectangle-o:before,\n.fa-window-close-o:before {\n  content: \"\";\n}\n\n.fa-bandcamp:before {\n  content: \"\";\n}\n\n.fa-grav:before {\n  content: \"\";\n}\n\n.fa-etsy:before {\n  content: \"\";\n}\n\n.fa-imdb:before {\n  content: \"\";\n}\n\n.fa-ravelry:before {\n  content: \"\";\n}\n\n.fa-eercast:before {\n  content: \"\";\n}\n\n.fa-microchip:before {\n  content: \"\";\n}\n\n.fa-snowflake-o:before {\n  content: \"\";\n}\n\n.fa-superpowers:before {\n  content: \"\";\n}\n\n.fa-wpexplorer:before {\n  content: \"\";\n}\n\n.fa-meetup:before {\n  content: \"\";\n}\n\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0;\n}\n\n.sr-only-focusable:active, .sr-only-focusable:focus {\n  position: static;\n  width: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  clip: auto;\n}","/*!\n *  Font Awesome 4.7.0 by @davegandy - http://fontawesome.io - @fontawesome\n *  License - http://fontawesome.io/license (Font: SIL OFL 1.1, CSS: MIT License)\n */\n\n@import \"variables\";\n@import \"mixins\";\n@import \"path\";\n@import \"core\";\n@import \"larger\";\n@import \"fixed-width\";\n@import \"list\";\n@import \"bordered-pulled\";\n@import \"animated\";\n@import \"rotated-flipped\";\n@import \"stacked\";\n@import \"icons\";\n@import \"screen-reader\";\n","/* FONT PATH\n * -------------------------- */\n\n@font-face {\n  font-family: 'FontAwesome';\n  src: url('#{$fa-font-path}/fontawesome-webfont.eot?v=#{$fa-version}');\n  src: url('#{$fa-font-path}/fontawesome-webfont.eot?#iefix&v=#{$fa-version}') format('embedded-opentype'),\n    url('#{$fa-font-path}/fontawesome-webfont.woff2?v=#{$fa-version}') format('woff2'),\n    url('#{$fa-font-path}/fontawesome-webfont.woff?v=#{$fa-version}') format('woff'),\n    url('#{$fa-font-path}/fontawesome-webfont.ttf?v=#{$fa-version}') format('truetype'),\n    url('#{$fa-font-path}/fontawesome-webfont.svg?v=#{$fa-version}#fontawesomeregular') format('svg');\n//  src: url('#{$fa-font-path}/FontAwesome.otf') format('opentype'); // used when developing fonts\n  font-weight: normal;\n  font-style: normal;\n}\n","// Base Class Definition\n// -------------------------\n\n.#{$fa-css-prefix} {\n  display: inline-block;\n  font: normal normal normal #{$fa-font-size-base}/#{$fa-line-height-base} FontAwesome; // shortening font declaration\n  font-size: inherit; // can't have font-size inherit on line above, so need to override\n  text-rendering: auto; // optimizelegibility throws things off #1094\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n\n}\n","// Icon Sizes\n// -------------------------\n\n/* makes the font 33% larger relative to the icon container */\n.#{$fa-css-prefix}-lg {\n  font-size: (4em / 3);\n  line-height: (3em / 4);\n  vertical-align: -15%;\n}\n.#{$fa-css-prefix}-2x { font-size: 2em; }\n.#{$fa-css-prefix}-3x { font-size: 3em; }\n.#{$fa-css-prefix}-4x { font-size: 4em; }\n.#{$fa-css-prefix}-5x { font-size: 5em; }\n","// Fixed Width Icons\n// -------------------------\n.#{$fa-css-prefix}-fw {\n  width: (18em / 14);\n  text-align: center;\n}\n","// List Icons\n// -------------------------\n\n.#{$fa-css-prefix}-ul {\n  padding-left: 0;\n  margin-left: $fa-li-width;\n  list-style-type: none;\n  > li { position: relative; }\n}\n.#{$fa-css-prefix}-li {\n  position: absolute;\n  left: -$fa-li-width;\n  width: $fa-li-width;\n  top: (2em / 14);\n  text-align: center;\n  &.#{$fa-css-prefix}-lg {\n    left: -$fa-li-width + (4em / 14);\n  }\n}\n","// Variables\n// --------------------------\n\n$fa-font-path:        \"../fonts\" !default;\n$fa-font-size-base:   14px !default;\n$fa-line-height-base: 1 !default;\n//$fa-font-path:        \"//netdna.bootstrapcdn.com/font-awesome/4.7.0/fonts\" !default; // for referencing Bootstrap CDN font files directly\n$fa-css-prefix:       fa !default;\n$fa-version:          \"4.7.0\" !default;\n$fa-border-color:     #eee !default;\n$fa-inverse:          #fff !default;\n$fa-li-width:         (30em / 14) !default;\n\n$fa-var-500px: \"\\f26e\";\n$fa-var-address-book: \"\\f2b9\";\n$fa-var-address-book-o: \"\\f2ba\";\n$fa-var-address-card: \"\\f2bb\";\n$fa-var-address-card-o: \"\\f2bc\";\n$fa-var-adjust: \"\\f042\";\n$fa-var-adn: \"\\f170\";\n$fa-var-align-center: \"\\f037\";\n$fa-var-align-justify: \"\\f039\";\n$fa-var-align-left: \"\\f036\";\n$fa-var-align-right: \"\\f038\";\n$fa-var-amazon: \"\\f270\";\n$fa-var-ambulance: \"\\f0f9\";\n$fa-var-american-sign-language-interpreting: \"\\f2a3\";\n$fa-var-anchor: \"\\f13d\";\n$fa-var-android: \"\\f17b\";\n$fa-var-angellist: \"\\f209\";\n$fa-var-angle-double-down: \"\\f103\";\n$fa-var-angle-double-left: \"\\f100\";\n$fa-var-angle-double-right: \"\\f101\";\n$fa-var-angle-double-up: \"\\f102\";\n$fa-var-angle-down: \"\\f107\";\n$fa-var-angle-left: \"\\f104\";\n$fa-var-angle-right: \"\\f105\";\n$fa-var-angle-up: \"\\f106\";\n$fa-var-apple: \"\\f179\";\n$fa-var-archive: \"\\f187\";\n$fa-var-area-chart: \"\\f1fe\";\n$fa-var-arrow-circle-down: \"\\f0ab\";\n$fa-var-arrow-circle-left: \"\\f0a8\";\n$fa-var-arrow-circle-o-down: \"\\f01a\";\n$fa-var-arrow-circle-o-left: \"\\f190\";\n$fa-var-arrow-circle-o-right: \"\\f18e\";\n$fa-var-arrow-circle-o-up: \"\\f01b\";\n$fa-var-arrow-circle-right: \"\\f0a9\";\n$fa-var-arrow-circle-up: \"\\f0aa\";\n$fa-var-arrow-down: \"\\f063\";\n$fa-var-arrow-left: \"\\f060\";\n$fa-var-arrow-right: \"\\f061\";\n$fa-var-arrow-up: \"\\f062\";\n$fa-var-arrows: \"\\f047\";\n$fa-var-arrows-alt: \"\\f0b2\";\n$fa-var-arrows-h: \"\\f07e\";\n$fa-var-arrows-v: \"\\f07d\";\n$fa-var-asl-interpreting: \"\\f2a3\";\n$fa-var-assistive-listening-systems: \"\\f2a2\";\n$fa-var-asterisk: \"\\f069\";\n$fa-var-at: \"\\f1fa\";\n$fa-var-audio-description: \"\\f29e\";\n$fa-var-automobile: \"\\f1b9\";\n$fa-var-backward: \"\\f04a\";\n$fa-var-balance-scale: \"\\f24e\";\n$fa-var-ban: \"\\f05e\";\n$fa-var-bandcamp: \"\\f2d5\";\n$fa-var-bank: \"\\f19c\";\n$fa-var-bar-chart: \"\\f080\";\n$fa-var-bar-chart-o: \"\\f080\";\n$fa-var-barcode: \"\\f02a\";\n$fa-var-bars: \"\\f0c9\";\n$fa-var-bath: \"\\f2cd\";\n$fa-var-bathtub: \"\\f2cd\";\n$fa-var-battery: \"\\f240\";\n$fa-var-battery-0: \"\\f244\";\n$fa-var-battery-1: \"\\f243\";\n$fa-var-battery-2: \"\\f242\";\n$fa-var-battery-3: \"\\f241\";\n$fa-var-battery-4: \"\\f240\";\n$fa-var-battery-empty: \"\\f244\";\n$fa-var-battery-full: \"\\f240\";\n$fa-var-battery-half: \"\\f242\";\n$fa-var-battery-quarter: \"\\f243\";\n$fa-var-battery-three-quarters: \"\\f241\";\n$fa-var-bed: \"\\f236\";\n$fa-var-beer: \"\\f0fc\";\n$fa-var-behance: \"\\f1b4\";\n$fa-var-behance-square: \"\\f1b5\";\n$fa-var-bell: \"\\f0f3\";\n$fa-var-bell-o: \"\\f0a2\";\n$fa-var-bell-slash: \"\\f1f6\";\n$fa-var-bell-slash-o: \"\\f1f7\";\n$fa-var-bicycle: \"\\f206\";\n$fa-var-binoculars: \"\\f1e5\";\n$fa-var-birthday-cake: \"\\f1fd\";\n$fa-var-bitbucket: \"\\f171\";\n$fa-var-bitbucket-square: \"\\f172\";\n$fa-var-bitcoin: \"\\f15a\";\n$fa-var-black-tie: \"\\f27e\";\n$fa-var-blind: \"\\f29d\";\n$fa-var-bluetooth: \"\\f293\";\n$fa-var-bluetooth-b: \"\\f294\";\n$fa-var-bold: \"\\f032\";\n$fa-var-bolt: \"\\f0e7\";\n$fa-var-bomb: \"\\f1e2\";\n$fa-var-book: \"\\f02d\";\n$fa-var-bookmark: \"\\f02e\";\n$fa-var-bookmark-o: \"\\f097\";\n$fa-var-braille: \"\\f2a1\";\n$fa-var-briefcase: \"\\f0b1\";\n$fa-var-btc: \"\\f15a\";\n$fa-var-bug: \"\\f188\";\n$fa-var-building: \"\\f1ad\";\n$fa-var-building-o: \"\\f0f7\";\n$fa-var-bullhorn: \"\\f0a1\";\n$fa-var-bullseye: \"\\f140\";\n$fa-var-bus: \"\\f207\";\n$fa-var-buysellads: \"\\f20d\";\n$fa-var-cab: \"\\f1ba\";\n$fa-var-calculator: \"\\f1ec\";\n$fa-var-calendar: \"\\f073\";\n$fa-var-calendar-check-o: \"\\f274\";\n$fa-var-calendar-minus-o: \"\\f272\";\n$fa-var-calendar-o: \"\\f133\";\n$fa-var-calendar-plus-o: \"\\f271\";\n$fa-var-calendar-times-o: \"\\f273\";\n$fa-var-camera: \"\\f030\";\n$fa-var-camera-retro: \"\\f083\";\n$fa-var-car: \"\\f1b9\";\n$fa-var-caret-down: \"\\f0d7\";\n$fa-var-caret-left: \"\\f0d9\";\n$fa-var-caret-right: \"\\f0da\";\n$fa-var-caret-square-o-down: \"\\f150\";\n$fa-var-caret-square-o-left: \"\\f191\";\n$fa-var-caret-square-o-right: \"\\f152\";\n$fa-var-caret-square-o-up: \"\\f151\";\n$fa-var-caret-up: \"\\f0d8\";\n$fa-var-cart-arrow-down: \"\\f218\";\n$fa-var-cart-plus: \"\\f217\";\n$fa-var-cc: \"\\f20a\";\n$fa-var-cc-amex: \"\\f1f3\";\n$fa-var-cc-diners-club: \"\\f24c\";\n$fa-var-cc-discover: \"\\f1f2\";\n$fa-var-cc-jcb: \"\\f24b\";\n$fa-var-cc-mastercard: \"\\f1f1\";\n$fa-var-cc-paypal: \"\\f1f4\";\n$fa-var-cc-stripe: \"\\f1f5\";\n$fa-var-cc-visa: \"\\f1f0\";\n$fa-var-certificate: \"\\f0a3\";\n$fa-var-chain: \"\\f0c1\";\n$fa-var-chain-broken: \"\\f127\";\n$fa-var-check: \"\\f00c\";\n$fa-var-check-circle: \"\\f058\";\n$fa-var-check-circle-o: \"\\f05d\";\n$fa-var-check-square: \"\\f14a\";\n$fa-var-check-square-o: \"\\f046\";\n$fa-var-chevron-circle-down: \"\\f13a\";\n$fa-var-chevron-circle-left: \"\\f137\";\n$fa-var-chevron-circle-right: \"\\f138\";\n$fa-var-chevron-circle-up: \"\\f139\";\n$fa-var-chevron-down: \"\\f078\";\n$fa-var-chevron-left: \"\\f053\";\n$fa-var-chevron-right: \"\\f054\";\n$fa-var-chevron-up: \"\\f077\";\n$fa-var-child: \"\\f1ae\";\n$fa-var-chrome: \"\\f268\";\n$fa-var-circle: \"\\f111\";\n$fa-var-circle-o: \"\\f10c\";\n$fa-var-circle-o-notch: \"\\f1ce\";\n$fa-var-circle-thin: \"\\f1db\";\n$fa-var-clipboard: \"\\f0ea\";\n$fa-var-clock-o: \"\\f017\";\n$fa-var-clone: \"\\f24d\";\n$fa-var-close: \"\\f00d\";\n$fa-var-cloud: \"\\f0c2\";\n$fa-var-cloud-download: \"\\f0ed\";\n$fa-var-cloud-upload: \"\\f0ee\";\n$fa-var-cny: \"\\f157\";\n$fa-var-code: \"\\f121\";\n$fa-var-code-fork: \"\\f126\";\n$fa-var-codepen: \"\\f1cb\";\n$fa-var-codiepie: \"\\f284\";\n$fa-var-coffee: \"\\f0f4\";\n$fa-var-cog: \"\\f013\";\n$fa-var-cogs: \"\\f085\";\n$fa-var-columns: \"\\f0db\";\n$fa-var-comment: \"\\f075\";\n$fa-var-comment-o: \"\\f0e5\";\n$fa-var-commenting: \"\\f27a\";\n$fa-var-commenting-o: \"\\f27b\";\n$fa-var-comments: \"\\f086\";\n$fa-var-comments-o: \"\\f0e6\";\n$fa-var-compass: \"\\f14e\";\n$fa-var-compress: \"\\f066\";\n$fa-var-connectdevelop: \"\\f20e\";\n$fa-var-contao: \"\\f26d\";\n$fa-var-copy: \"\\f0c5\";\n$fa-var-copyright: \"\\f1f9\";\n$fa-var-creative-commons: \"\\f25e\";\n$fa-var-credit-card: \"\\f09d\";\n$fa-var-credit-card-alt: \"\\f283\";\n$fa-var-crop: \"\\f125\";\n$fa-var-crosshairs: \"\\f05b\";\n$fa-var-css3: \"\\f13c\";\n$fa-var-cube: \"\\f1b2\";\n$fa-var-cubes: \"\\f1b3\";\n$fa-var-cut: \"\\f0c4\";\n$fa-var-cutlery: \"\\f0f5\";\n$fa-var-dashboard: \"\\f0e4\";\n$fa-var-dashcube: \"\\f210\";\n$fa-var-database: \"\\f1c0\";\n$fa-var-deaf: \"\\f2a4\";\n$fa-var-deafness: \"\\f2a4\";\n$fa-var-dedent: \"\\f03b\";\n$fa-var-delicious: \"\\f1a5\";\n$fa-var-desktop: \"\\f108\";\n$fa-var-deviantart: \"\\f1bd\";\n$fa-var-diamond: \"\\f219\";\n$fa-var-digg: \"\\f1a6\";\n$fa-var-dollar: \"\\f155\";\n$fa-var-dot-circle-o: \"\\f192\";\n$fa-var-download: \"\\f019\";\n$fa-var-dribbble: \"\\f17d\";\n$fa-var-drivers-license: \"\\f2c2\";\n$fa-var-drivers-license-o: \"\\f2c3\";\n$fa-var-dropbox: \"\\f16b\";\n$fa-var-drupal: \"\\f1a9\";\n$fa-var-edge: \"\\f282\";\n$fa-var-edit: \"\\f044\";\n$fa-var-eercast: \"\\f2da\";\n$fa-var-eject: \"\\f052\";\n$fa-var-ellipsis-h: \"\\f141\";\n$fa-var-ellipsis-v: \"\\f142\";\n$fa-var-empire: \"\\f1d1\";\n$fa-var-envelope: \"\\f0e0\";\n$fa-var-envelope-o: \"\\f003\";\n$fa-var-envelope-open: \"\\f2b6\";\n$fa-var-envelope-open-o: \"\\f2b7\";\n$fa-var-envelope-square: \"\\f199\";\n$fa-var-envira: \"\\f299\";\n$fa-var-eraser: \"\\f12d\";\n$fa-var-etsy: \"\\f2d7\";\n$fa-var-eur: \"\\f153\";\n$fa-var-euro: \"\\f153\";\n$fa-var-exchange: \"\\f0ec\";\n$fa-var-exclamation: \"\\f12a\";\n$fa-var-exclamation-circle: \"\\f06a\";\n$fa-var-exclamation-triangle: \"\\f071\";\n$fa-var-expand: \"\\f065\";\n$fa-var-expeditedssl: \"\\f23e\";\n$fa-var-external-link: \"\\f08e\";\n$fa-var-external-link-square: \"\\f14c\";\n$fa-var-eye: \"\\f06e\";\n$fa-var-eye-slash: \"\\f070\";\n$fa-var-eyedropper: \"\\f1fb\";\n$fa-var-fa: \"\\f2b4\";\n$fa-var-facebook: \"\\f09a\";\n$fa-var-facebook-f: \"\\f09a\";\n$fa-var-facebook-official: \"\\f230\";\n$fa-var-facebook-square: \"\\f082\";\n$fa-var-fast-backward: \"\\f049\";\n$fa-var-fast-forward: \"\\f050\";\n$fa-var-fax: \"\\f1ac\";\n$fa-var-feed: \"\\f09e\";\n$fa-var-female: \"\\f182\";\n$fa-var-fighter-jet: \"\\f0fb\";\n$fa-var-file: \"\\f15b\";\n$fa-var-file-archive-o: \"\\f1c6\";\n$fa-var-file-audio-o: \"\\f1c7\";\n$fa-var-file-code-o: \"\\f1c9\";\n$fa-var-file-excel-o: \"\\f1c3\";\n$fa-var-file-image-o: \"\\f1c5\";\n$fa-var-file-movie-o: \"\\f1c8\";\n$fa-var-file-o: \"\\f016\";\n$fa-var-file-pdf-o: \"\\f1c1\";\n$fa-var-file-photo-o: \"\\f1c5\";\n$fa-var-file-picture-o: \"\\f1c5\";\n$fa-var-file-powerpoint-o: \"\\f1c4\";\n$fa-var-file-sound-o: \"\\f1c7\";\n$fa-var-file-text: \"\\f15c\";\n$fa-var-file-text-o: \"\\f0f6\";\n$fa-var-file-video-o: \"\\f1c8\";\n$fa-var-file-word-o: \"\\f1c2\";\n$fa-var-file-zip-o: \"\\f1c6\";\n$fa-var-files-o: \"\\f0c5\";\n$fa-var-film: \"\\f008\";\n$fa-var-filter: \"\\f0b0\";\n$fa-var-fire: \"\\f06d\";\n$fa-var-fire-extinguisher: \"\\f134\";\n$fa-var-firefox: \"\\f269\";\n$fa-var-first-order: \"\\f2b0\";\n$fa-var-flag: \"\\f024\";\n$fa-var-flag-checkered: \"\\f11e\";\n$fa-var-flag-o: \"\\f11d\";\n$fa-var-flash: \"\\f0e7\";\n$fa-var-flask: \"\\f0c3\";\n$fa-var-flickr: \"\\f16e\";\n$fa-var-floppy-o: \"\\f0c7\";\n$fa-var-folder: \"\\f07b\";\n$fa-var-folder-o: \"\\f114\";\n$fa-var-folder-open: \"\\f07c\";\n$fa-var-folder-open-o: \"\\f115\";\n$fa-var-font: \"\\f031\";\n$fa-var-font-awesome: \"\\f2b4\";\n$fa-var-fonticons: \"\\f280\";\n$fa-var-fort-awesome: \"\\f286\";\n$fa-var-forumbee: \"\\f211\";\n$fa-var-forward: \"\\f04e\";\n$fa-var-foursquare: \"\\f180\";\n$fa-var-free-code-camp: \"\\f2c5\";\n$fa-var-frown-o: \"\\f119\";\n$fa-var-futbol-o: \"\\f1e3\";\n$fa-var-gamepad: \"\\f11b\";\n$fa-var-gavel: \"\\f0e3\";\n$fa-var-gbp: \"\\f154\";\n$fa-var-ge: \"\\f1d1\";\n$fa-var-gear: \"\\f013\";\n$fa-var-gears: \"\\f085\";\n$fa-var-genderless: \"\\f22d\";\n$fa-var-get-pocket: \"\\f265\";\n$fa-var-gg: \"\\f260\";\n$fa-var-gg-circle: \"\\f261\";\n$fa-var-gift: \"\\f06b\";\n$fa-var-git: \"\\f1d3\";\n$fa-var-git-square: \"\\f1d2\";\n$fa-var-github: \"\\f09b\";\n$fa-var-github-alt: \"\\f113\";\n$fa-var-github-square: \"\\f092\";\n$fa-var-gitlab: \"\\f296\";\n$fa-var-gittip: \"\\f184\";\n$fa-var-glass: \"\\f000\";\n$fa-var-glide: \"\\f2a5\";\n$fa-var-glide-g: \"\\f2a6\";\n$fa-var-globe: \"\\f0ac\";\n$fa-var-google: \"\\f1a0\";\n$fa-var-google-plus: \"\\f0d5\";\n$fa-var-google-plus-circle: \"\\f2b3\";\n$fa-var-google-plus-official: \"\\f2b3\";\n$fa-var-google-plus-square: \"\\f0d4\";\n$fa-var-google-wallet: \"\\f1ee\";\n$fa-var-graduation-cap: \"\\f19d\";\n$fa-var-gratipay: \"\\f184\";\n$fa-var-grav: \"\\f2d6\";\n$fa-var-group: \"\\f0c0\";\n$fa-var-h-square: \"\\f0fd\";\n$fa-var-hacker-news: \"\\f1d4\";\n$fa-var-hand-grab-o: \"\\f255\";\n$fa-var-hand-lizard-o: \"\\f258\";\n$fa-var-hand-o-down: \"\\f0a7\";\n$fa-var-hand-o-left: \"\\f0a5\";\n$fa-var-hand-o-right: \"\\f0a4\";\n$fa-var-hand-o-up: \"\\f0a6\";\n$fa-var-hand-paper-o: \"\\f256\";\n$fa-var-hand-peace-o: \"\\f25b\";\n$fa-var-hand-pointer-o: \"\\f25a\";\n$fa-var-hand-rock-o: \"\\f255\";\n$fa-var-hand-scissors-o: \"\\f257\";\n$fa-var-hand-spock-o: \"\\f259\";\n$fa-var-hand-stop-o: \"\\f256\";\n$fa-var-handshake-o: \"\\f2b5\";\n$fa-var-hard-of-hearing: \"\\f2a4\";\n$fa-var-hashtag: \"\\f292\";\n$fa-var-hdd-o: \"\\f0a0\";\n$fa-var-header: \"\\f1dc\";\n$fa-var-headphones: \"\\f025\";\n$fa-var-heart: \"\\f004\";\n$fa-var-heart-o: \"\\f08a\";\n$fa-var-heartbeat: \"\\f21e\";\n$fa-var-history: \"\\f1da\";\n$fa-var-home: \"\\f015\";\n$fa-var-hospital-o: \"\\f0f8\";\n$fa-var-hotel: \"\\f236\";\n$fa-var-hourglass: \"\\f254\";\n$fa-var-hourglass-1: \"\\f251\";\n$fa-var-hourglass-2: \"\\f252\";\n$fa-var-hourglass-3: \"\\f253\";\n$fa-var-hourglass-end: \"\\f253\";\n$fa-var-hourglass-half: \"\\f252\";\n$fa-var-hourglass-o: \"\\f250\";\n$fa-var-hourglass-start: \"\\f251\";\n$fa-var-houzz: \"\\f27c\";\n$fa-var-html5: \"\\f13b\";\n$fa-var-i-cursor: \"\\f246\";\n$fa-var-id-badge: \"\\f2c1\";\n$fa-var-id-card: \"\\f2c2\";\n$fa-var-id-card-o: \"\\f2c3\";\n$fa-var-ils: \"\\f20b\";\n$fa-var-image: \"\\f03e\";\n$fa-var-imdb: \"\\f2d8\";\n$fa-var-inbox: \"\\f01c\";\n$fa-var-indent: \"\\f03c\";\n$fa-var-industry: \"\\f275\";\n$fa-var-info: \"\\f129\";\n$fa-var-info-circle: \"\\f05a\";\n$fa-var-inr: \"\\f156\";\n$fa-var-instagram: \"\\f16d\";\n$fa-var-institution: \"\\f19c\";\n$fa-var-internet-explorer: \"\\f26b\";\n$fa-var-intersex: \"\\f224\";\n$fa-var-ioxhost: \"\\f208\";\n$fa-var-italic: \"\\f033\";\n$fa-var-joomla: \"\\f1aa\";\n$fa-var-jpy: \"\\f157\";\n$fa-var-jsfiddle: \"\\f1cc\";\n$fa-var-key: \"\\f084\";\n$fa-var-keyboard-o: \"\\f11c\";\n$fa-var-krw: \"\\f159\";\n$fa-var-language: \"\\f1ab\";\n$fa-var-laptop: \"\\f109\";\n$fa-var-lastfm: \"\\f202\";\n$fa-var-lastfm-square: \"\\f203\";\n$fa-var-leaf: \"\\f06c\";\n$fa-var-leanpub: \"\\f212\";\n$fa-var-legal: \"\\f0e3\";\n$fa-var-lemon-o: \"\\f094\";\n$fa-var-level-down: \"\\f149\";\n$fa-var-level-up: \"\\f148\";\n$fa-var-life-bouy: \"\\f1cd\";\n$fa-var-life-buoy: \"\\f1cd\";\n$fa-var-life-ring: \"\\f1cd\";\n$fa-var-life-saver: \"\\f1cd\";\n$fa-var-lightbulb-o: \"\\f0eb\";\n$fa-var-line-chart: \"\\f201\";\n$fa-var-link: \"\\f0c1\";\n$fa-var-linkedin: \"\\f0e1\";\n$fa-var-linkedin-square: \"\\f08c\";\n$fa-var-linode: \"\\f2b8\";\n$fa-var-linux: \"\\f17c\";\n$fa-var-list: \"\\f03a\";\n$fa-var-list-alt: \"\\f022\";\n$fa-var-list-ol: \"\\f0cb\";\n$fa-var-list-ul: \"\\f0ca\";\n$fa-var-location-arrow: \"\\f124\";\n$fa-var-lock: \"\\f023\";\n$fa-var-long-arrow-down: \"\\f175\";\n$fa-var-long-arrow-left: \"\\f177\";\n$fa-var-long-arrow-right: \"\\f178\";\n$fa-var-long-arrow-up: \"\\f176\";\n$fa-var-low-vision: \"\\f2a8\";\n$fa-var-magic: \"\\f0d0\";\n$fa-var-magnet: \"\\f076\";\n$fa-var-mail-forward: \"\\f064\";\n$fa-var-mail-reply: \"\\f112\";\n$fa-var-mail-reply-all: \"\\f122\";\n$fa-var-male: \"\\f183\";\n$fa-var-map: \"\\f279\";\n$fa-var-map-marker: \"\\f041\";\n$fa-var-map-o: \"\\f278\";\n$fa-var-map-pin: \"\\f276\";\n$fa-var-map-signs: \"\\f277\";\n$fa-var-mars: \"\\f222\";\n$fa-var-mars-double: \"\\f227\";\n$fa-var-mars-stroke: \"\\f229\";\n$fa-var-mars-stroke-h: \"\\f22b\";\n$fa-var-mars-stroke-v: \"\\f22a\";\n$fa-var-maxcdn: \"\\f136\";\n$fa-var-meanpath: \"\\f20c\";\n$fa-var-medium: \"\\f23a\";\n$fa-var-medkit: \"\\f0fa\";\n$fa-var-meetup: \"\\f2e0\";\n$fa-var-meh-o: \"\\f11a\";\n$fa-var-mercury: \"\\f223\";\n$fa-var-microchip: \"\\f2db\";\n$fa-var-microphone: \"\\f130\";\n$fa-var-microphone-slash: \"\\f131\";\n$fa-var-minus: \"\\f068\";\n$fa-var-minus-circle: \"\\f056\";\n$fa-var-minus-square: \"\\f146\";\n$fa-var-minus-square-o: \"\\f147\";\n$fa-var-mixcloud: \"\\f289\";\n$fa-var-mobile: \"\\f10b\";\n$fa-var-mobile-phone: \"\\f10b\";\n$fa-var-modx: \"\\f285\";\n$fa-var-money: \"\\f0d6\";\n$fa-var-moon-o: \"\\f186\";\n$fa-var-mortar-board: \"\\f19d\";\n$fa-var-motorcycle: \"\\f21c\";\n$fa-var-mouse-pointer: \"\\f245\";\n$fa-var-music: \"\\f001\";\n$fa-var-navicon: \"\\f0c9\";\n$fa-var-neuter: \"\\f22c\";\n$fa-var-newspaper-o: \"\\f1ea\";\n$fa-var-object-group: \"\\f247\";\n$fa-var-object-ungroup: \"\\f248\";\n$fa-var-odnoklassniki: \"\\f263\";\n$fa-var-odnoklassniki-square: \"\\f264\";\n$fa-var-opencart: \"\\f23d\";\n$fa-var-openid: \"\\f19b\";\n$fa-var-opera: \"\\f26a\";\n$fa-var-optin-monster: \"\\f23c\";\n$fa-var-outdent: \"\\f03b\";\n$fa-var-pagelines: \"\\f18c\";\n$fa-var-paint-brush: \"\\f1fc\";\n$fa-var-paper-plane: \"\\f1d8\";\n$fa-var-paper-plane-o: \"\\f1d9\";\n$fa-var-paperclip: \"\\f0c6\";\n$fa-var-paragraph: \"\\f1dd\";\n$fa-var-paste: \"\\f0ea\";\n$fa-var-pause: \"\\f04c\";\n$fa-var-pause-circle: \"\\f28b\";\n$fa-var-pause-circle-o: \"\\f28c\";\n$fa-var-paw: \"\\f1b0\";\n$fa-var-paypal: \"\\f1ed\";\n$fa-var-pencil: \"\\f040\";\n$fa-var-pencil-square: \"\\f14b\";\n$fa-var-pencil-square-o: \"\\f044\";\n$fa-var-percent: \"\\f295\";\n$fa-var-phone: \"\\f095\";\n$fa-var-phone-square: \"\\f098\";\n$fa-var-photo: \"\\f03e\";\n$fa-var-picture-o: \"\\f03e\";\n$fa-var-pie-chart: \"\\f200\";\n$fa-var-pied-piper: \"\\f2ae\";\n$fa-var-pied-piper-alt: \"\\f1a8\";\n$fa-var-pied-piper-pp: \"\\f1a7\";\n$fa-var-pinterest: \"\\f0d2\";\n$fa-var-pinterest-p: \"\\f231\";\n$fa-var-pinterest-square: \"\\f0d3\";\n$fa-var-plane: \"\\f072\";\n$fa-var-play: \"\\f04b\";\n$fa-var-play-circle: \"\\f144\";\n$fa-var-play-circle-o: \"\\f01d\";\n$fa-var-plug: \"\\f1e6\";\n$fa-var-plus: \"\\f067\";\n$fa-var-plus-circle: \"\\f055\";\n$fa-var-plus-square: \"\\f0fe\";\n$fa-var-plus-square-o: \"\\f196\";\n$fa-var-podcast: \"\\f2ce\";\n$fa-var-power-off: \"\\f011\";\n$fa-var-print: \"\\f02f\";\n$fa-var-product-hunt: \"\\f288\";\n$fa-var-puzzle-piece: \"\\f12e\";\n$fa-var-qq: \"\\f1d6\";\n$fa-var-qrcode: \"\\f029\";\n$fa-var-question: \"\\f128\";\n$fa-var-question-circle: \"\\f059\";\n$fa-var-question-circle-o: \"\\f29c\";\n$fa-var-quora: \"\\f2c4\";\n$fa-var-quote-left: \"\\f10d\";\n$fa-var-quote-right: \"\\f10e\";\n$fa-var-ra: \"\\f1d0\";\n$fa-var-random: \"\\f074\";\n$fa-var-ravelry: \"\\f2d9\";\n$fa-var-rebel: \"\\f1d0\";\n$fa-var-recycle: \"\\f1b8\";\n$fa-var-reddit: \"\\f1a1\";\n$fa-var-reddit-alien: \"\\f281\";\n$fa-var-reddit-square: \"\\f1a2\";\n$fa-var-refresh: \"\\f021\";\n$fa-var-registered: \"\\f25d\";\n$fa-var-remove: \"\\f00d\";\n$fa-var-renren: \"\\f18b\";\n$fa-var-reorder: \"\\f0c9\";\n$fa-var-repeat: \"\\f01e\";\n$fa-var-reply: \"\\f112\";\n$fa-var-reply-all: \"\\f122\";\n$fa-var-resistance: \"\\f1d0\";\n$fa-var-retweet: \"\\f079\";\n$fa-var-rmb: \"\\f157\";\n$fa-var-road: \"\\f018\";\n$fa-var-rocket: \"\\f135\";\n$fa-var-rotate-left: \"\\f0e2\";\n$fa-var-rotate-right: \"\\f01e\";\n$fa-var-rouble: \"\\f158\";\n$fa-var-rss: \"\\f09e\";\n$fa-var-rss-square: \"\\f143\";\n$fa-var-rub: \"\\f158\";\n$fa-var-ruble: \"\\f158\";\n$fa-var-rupee: \"\\f156\";\n$fa-var-s15: \"\\f2cd\";\n$fa-var-safari: \"\\f267\";\n$fa-var-save: \"\\f0c7\";\n$fa-var-scissors: \"\\f0c4\";\n$fa-var-scribd: \"\\f28a\";\n$fa-var-search: \"\\f002\";\n$fa-var-search-minus: \"\\f010\";\n$fa-var-search-plus: \"\\f00e\";\n$fa-var-sellsy: \"\\f213\";\n$fa-var-send: \"\\f1d8\";\n$fa-var-send-o: \"\\f1d9\";\n$fa-var-server: \"\\f233\";\n$fa-var-share: \"\\f064\";\n$fa-var-share-alt: \"\\f1e0\";\n$fa-var-share-alt-square: \"\\f1e1\";\n$fa-var-share-square: \"\\f14d\";\n$fa-var-share-square-o: \"\\f045\";\n$fa-var-shekel: \"\\f20b\";\n$fa-var-sheqel: \"\\f20b\";\n$fa-var-shield: \"\\f132\";\n$fa-var-ship: \"\\f21a\";\n$fa-var-shirtsinbulk: \"\\f214\";\n$fa-var-shopping-bag: \"\\f290\";\n$fa-var-shopping-basket: \"\\f291\";\n$fa-var-shopping-cart: \"\\f07a\";\n$fa-var-shower: \"\\f2cc\";\n$fa-var-sign-in: \"\\f090\";\n$fa-var-sign-language: \"\\f2a7\";\n$fa-var-sign-out: \"\\f08b\";\n$fa-var-signal: \"\\f012\";\n$fa-var-signing: \"\\f2a7\";\n$fa-var-simplybuilt: \"\\f215\";\n$fa-var-sitemap: \"\\f0e8\";\n$fa-var-skyatlas: \"\\f216\";\n$fa-var-skype: \"\\f17e\";\n$fa-var-slack: \"\\f198\";\n$fa-var-sliders: \"\\f1de\";\n$fa-var-slideshare: \"\\f1e7\";\n$fa-var-smile-o: \"\\f118\";\n$fa-var-snapchat: \"\\f2ab\";\n$fa-var-snapchat-ghost: \"\\f2ac\";\n$fa-var-snapchat-square: \"\\f2ad\";\n$fa-var-snowflake-o: \"\\f2dc\";\n$fa-var-soccer-ball-o: \"\\f1e3\";\n$fa-var-sort: \"\\f0dc\";\n$fa-var-sort-alpha-asc: \"\\f15d\";\n$fa-var-sort-alpha-desc: \"\\f15e\";\n$fa-var-sort-amount-asc: \"\\f160\";\n$fa-var-sort-amount-desc: \"\\f161\";\n$fa-var-sort-asc: \"\\f0de\";\n$fa-var-sort-desc: \"\\f0dd\";\n$fa-var-sort-down: \"\\f0dd\";\n$fa-var-sort-numeric-asc: \"\\f162\";\n$fa-var-sort-numeric-desc: \"\\f163\";\n$fa-var-sort-up: \"\\f0de\";\n$fa-var-soundcloud: \"\\f1be\";\n$fa-var-space-shuttle: \"\\f197\";\n$fa-var-spinner: \"\\f110\";\n$fa-var-spoon: \"\\f1b1\";\n$fa-var-spotify: \"\\f1bc\";\n$fa-var-square: \"\\f0c8\";\n$fa-var-square-o: \"\\f096\";\n$fa-var-stack-exchange: \"\\f18d\";\n$fa-var-stack-overflow: \"\\f16c\";\n$fa-var-star: \"\\f005\";\n$fa-var-star-half: \"\\f089\";\n$fa-var-star-half-empty: \"\\f123\";\n$fa-var-star-half-full: \"\\f123\";\n$fa-var-star-half-o: \"\\f123\";\n$fa-var-star-o: \"\\f006\";\n$fa-var-steam: \"\\f1b6\";\n$fa-var-steam-square: \"\\f1b7\";\n$fa-var-step-backward: \"\\f048\";\n$fa-var-step-forward: \"\\f051\";\n$fa-var-stethoscope: \"\\f0f1\";\n$fa-var-sticky-note: \"\\f249\";\n$fa-var-sticky-note-o: \"\\f24a\";\n$fa-var-stop: \"\\f04d\";\n$fa-var-stop-circle: \"\\f28d\";\n$fa-var-stop-circle-o: \"\\f28e\";\n$fa-var-street-view: \"\\f21d\";\n$fa-var-strikethrough: \"\\f0cc\";\n$fa-var-stumbleupon: \"\\f1a4\";\n$fa-var-stumbleupon-circle: \"\\f1a3\";\n$fa-var-subscript: \"\\f12c\";\n$fa-var-subway: \"\\f239\";\n$fa-var-suitcase: \"\\f0f2\";\n$fa-var-sun-o: \"\\f185\";\n$fa-var-superpowers: \"\\f2dd\";\n$fa-var-superscript: \"\\f12b\";\n$fa-var-support: \"\\f1cd\";\n$fa-var-table: \"\\f0ce\";\n$fa-var-tablet: \"\\f10a\";\n$fa-var-tachometer: \"\\f0e4\";\n$fa-var-tag: \"\\f02b\";\n$fa-var-tags: \"\\f02c\";\n$fa-var-tasks: \"\\f0ae\";\n$fa-var-taxi: \"\\f1ba\";\n$fa-var-telegram: \"\\f2c6\";\n$fa-var-television: \"\\f26c\";\n$fa-var-tencent-weibo: \"\\f1d5\";\n$fa-var-terminal: \"\\f120\";\n$fa-var-text-height: \"\\f034\";\n$fa-var-text-width: \"\\f035\";\n$fa-var-th: \"\\f00a\";\n$fa-var-th-large: \"\\f009\";\n$fa-var-th-list: \"\\f00b\";\n$fa-var-themeisle: \"\\f2b2\";\n$fa-var-thermometer: \"\\f2c7\";\n$fa-var-thermometer-0: \"\\f2cb\";\n$fa-var-thermometer-1: \"\\f2ca\";\n$fa-var-thermometer-2: \"\\f2c9\";\n$fa-var-thermometer-3: \"\\f2c8\";\n$fa-var-thermometer-4: \"\\f2c7\";\n$fa-var-thermometer-empty: \"\\f2cb\";\n$fa-var-thermometer-full: \"\\f2c7\";\n$fa-var-thermometer-half: \"\\f2c9\";\n$fa-var-thermometer-quarter: \"\\f2ca\";\n$fa-var-thermometer-three-quarters: \"\\f2c8\";\n$fa-var-thumb-tack: \"\\f08d\";\n$fa-var-thumbs-down: \"\\f165\";\n$fa-var-thumbs-o-down: \"\\f088\";\n$fa-var-thumbs-o-up: \"\\f087\";\n$fa-var-thumbs-up: \"\\f164\";\n$fa-var-ticket: \"\\f145\";\n$fa-var-times: \"\\f00d\";\n$fa-var-times-circle: \"\\f057\";\n$fa-var-times-circle-o: \"\\f05c\";\n$fa-var-times-rectangle: \"\\f2d3\";\n$fa-var-times-rectangle-o: \"\\f2d4\";\n$fa-var-tint: \"\\f043\";\n$fa-var-toggle-down: \"\\f150\";\n$fa-var-toggle-left: \"\\f191\";\n$fa-var-toggle-off: \"\\f204\";\n$fa-var-toggle-on: \"\\f205\";\n$fa-var-toggle-right: \"\\f152\";\n$fa-var-toggle-up: \"\\f151\";\n$fa-var-trademark: \"\\f25c\";\n$fa-var-train: \"\\f238\";\n$fa-var-transgender: \"\\f224\";\n$fa-var-transgender-alt: \"\\f225\";\n$fa-var-trash: \"\\f1f8\";\n$fa-var-trash-o: \"\\f014\";\n$fa-var-tree: \"\\f1bb\";\n$fa-var-trello: \"\\f181\";\n$fa-var-tripadvisor: \"\\f262\";\n$fa-var-trophy: \"\\f091\";\n$fa-var-truck: \"\\f0d1\";\n$fa-var-try: \"\\f195\";\n$fa-var-tty: \"\\f1e4\";\n$fa-var-tumblr: \"\\f173\";\n$fa-var-tumblr-square: \"\\f174\";\n$fa-var-turkish-lira: \"\\f195\";\n$fa-var-tv: \"\\f26c\";\n$fa-var-twitch: \"\\f1e8\";\n$fa-var-twitter: \"\\f099\";\n$fa-var-twitter-square: \"\\f081\";\n$fa-var-umbrella: \"\\f0e9\";\n$fa-var-underline: \"\\f0cd\";\n$fa-var-undo: \"\\f0e2\";\n$fa-var-universal-access: \"\\f29a\";\n$fa-var-university: \"\\f19c\";\n$fa-var-unlink: \"\\f127\";\n$fa-var-unlock: \"\\f09c\";\n$fa-var-unlock-alt: \"\\f13e\";\n$fa-var-unsorted: \"\\f0dc\";\n$fa-var-upload: \"\\f093\";\n$fa-var-usb: \"\\f287\";\n$fa-var-usd: \"\\f155\";\n$fa-var-user: \"\\f007\";\n$fa-var-user-circle: \"\\f2bd\";\n$fa-var-user-circle-o: \"\\f2be\";\n$fa-var-user-md: \"\\f0f0\";\n$fa-var-user-o: \"\\f2c0\";\n$fa-var-user-plus: \"\\f234\";\n$fa-var-user-secret: \"\\f21b\";\n$fa-var-user-times: \"\\f235\";\n$fa-var-users: \"\\f0c0\";\n$fa-var-vcard: \"\\f2bb\";\n$fa-var-vcard-o: \"\\f2bc\";\n$fa-var-venus: \"\\f221\";\n$fa-var-venus-double: \"\\f226\";\n$fa-var-venus-mars: \"\\f228\";\n$fa-var-viacoin: \"\\f237\";\n$fa-var-viadeo: \"\\f2a9\";\n$fa-var-viadeo-square: \"\\f2aa\";\n$fa-var-video-camera: \"\\f03d\";\n$fa-var-vimeo: \"\\f27d\";\n$fa-var-vimeo-square: \"\\f194\";\n$fa-var-vine: \"\\f1ca\";\n$fa-var-vk: \"\\f189\";\n$fa-var-volume-control-phone: \"\\f2a0\";\n$fa-var-volume-down: \"\\f027\";\n$fa-var-volume-off: \"\\f026\";\n$fa-var-volume-up: \"\\f028\";\n$fa-var-warning: \"\\f071\";\n$fa-var-wechat: \"\\f1d7\";\n$fa-var-weibo: \"\\f18a\";\n$fa-var-weixin: \"\\f1d7\";\n$fa-var-whatsapp: \"\\f232\";\n$fa-var-wheelchair: \"\\f193\";\n$fa-var-wheelchair-alt: \"\\f29b\";\n$fa-var-wifi: \"\\f1eb\";\n$fa-var-wikipedia-w: \"\\f266\";\n$fa-var-window-close: \"\\f2d3\";\n$fa-var-window-close-o: \"\\f2d4\";\n$fa-var-window-maximize: \"\\f2d0\";\n$fa-var-window-minimize: \"\\f2d1\";\n$fa-var-window-restore: \"\\f2d2\";\n$fa-var-windows: \"\\f17a\";\n$fa-var-won: \"\\f159\";\n$fa-var-wordpress: \"\\f19a\";\n$fa-var-wpbeginner: \"\\f297\";\n$fa-var-wpexplorer: \"\\f2de\";\n$fa-var-wpforms: \"\\f298\";\n$fa-var-wrench: \"\\f0ad\";\n$fa-var-xing: \"\\f168\";\n$fa-var-xing-square: \"\\f169\";\n$fa-var-y-combinator: \"\\f23b\";\n$fa-var-y-combinator-square: \"\\f1d4\";\n$fa-var-yahoo: \"\\f19e\";\n$fa-var-yc: \"\\f23b\";\n$fa-var-yc-square: \"\\f1d4\";\n$fa-var-yelp: \"\\f1e9\";\n$fa-var-yen: \"\\f157\";\n$fa-var-yoast: \"\\f2b1\";\n$fa-var-youtube: \"\\f167\";\n$fa-var-youtube-play: \"\\f16a\";\n$fa-var-youtube-square: \"\\f166\";\n\n","// Bordered & Pulled\n// -------------------------\n\n.#{$fa-css-prefix}-border {\n  padding: .2em .25em .15em;\n  border: solid .08em $fa-border-color;\n  border-radius: .1em;\n}\n\n.#{$fa-css-prefix}-pull-left { float: left; }\n.#{$fa-css-prefix}-pull-right { float: right; }\n\n.#{$fa-css-prefix} {\n  &.#{$fa-css-prefix}-pull-left { margin-right: .3em; }\n  &.#{$fa-css-prefix}-pull-right { margin-left: .3em; }\n}\n\n/* Deprecated as of 4.4.0 */\n.pull-right { float: right; }\n.pull-left { float: left; }\n\n.#{$fa-css-prefix} {\n  &.pull-left { margin-right: .3em; }\n  &.pull-right { margin-left: .3em; }\n}\n","// Spinning Icons\n// --------------------------\n\n.#{$fa-css-prefix}-spin {\n  -webkit-animation: fa-spin 2s infinite linear;\n          animation: fa-spin 2s infinite linear;\n}\n\n.#{$fa-css-prefix}-pulse {\n  -webkit-animation: fa-spin 1s infinite steps(8);\n          animation: fa-spin 1s infinite steps(8);\n}\n\n@-webkit-keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(359deg);\n            transform: rotate(359deg);\n  }\n}\n\n@keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(359deg);\n            transform: rotate(359deg);\n  }\n}\n","// Rotated & Flipped Icons\n// -------------------------\n\n.#{$fa-css-prefix}-rotate-90  { @include fa-icon-rotate(90deg, 1);  }\n.#{$fa-css-prefix}-rotate-180 { @include fa-icon-rotate(180deg, 2); }\n.#{$fa-css-prefix}-rotate-270 { @include fa-icon-rotate(270deg, 3); }\n\n.#{$fa-css-prefix}-flip-horizontal { @include fa-icon-flip(-1, 1, 0); }\n.#{$fa-css-prefix}-flip-vertical   { @include fa-icon-flip(1, -1, 2); }\n\n// Hook for IE8-9\n// -------------------------\n\n:root .#{$fa-css-prefix}-rotate-90,\n:root .#{$fa-css-prefix}-rotate-180,\n:root .#{$fa-css-prefix}-rotate-270,\n:root .#{$fa-css-prefix}-flip-horizontal,\n:root .#{$fa-css-prefix}-flip-vertical {\n  filter: none;\n}\n","// Mixins\n// --------------------------\n\n@mixin fa-icon() {\n  display: inline-block;\n  font: normal normal normal #{$fa-font-size-base}/#{$fa-line-height-base} FontAwesome; // shortening font declaration\n  font-size: inherit; // can't have font-size inherit on line above, so need to override\n  text-rendering: auto; // optimizelegibility throws things off #1094\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n\n}\n\n@mixin fa-icon-rotate($degrees, $rotation) {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=#{$rotation})\";\n  -webkit-transform: rotate($degrees);\n      -ms-transform: rotate($degrees);\n          transform: rotate($degrees);\n}\n\n@mixin fa-icon-flip($horiz, $vert, $rotation) {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=#{$rotation}, mirror=1)\";\n  -webkit-transform: scale($horiz, $vert);\n      -ms-transform: scale($horiz, $vert);\n          transform: scale($horiz, $vert);\n}\n\n\n// Only display content to screen readers. A la Bootstrap 4.\n//\n// See: http://a11yproject.com/posts/how-to-hide-content/\n\n@mixin sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0,0,0,0);\n  border: 0;\n}\n\n// Use in conjunction with .sr-only to only display content when it's focused.\n//\n// Useful for \"Skip to main content\" links; see http://www.w3.org/TR/2013/NOTE-WCAG20-TECHS-20130905/G1\n//\n// Credit: HTML5 Boilerplate\n\n@mixin sr-only-focusable {\n  &:active,\n  &:focus {\n    position: static;\n    width: auto;\n    height: auto;\n    margin: 0;\n    overflow: visible;\n    clip: auto;\n  }\n}\n","// Stacked Icons\n// -------------------------\n\n.#{$fa-css-prefix}-stack {\n  position: relative;\n  display: inline-block;\n  width: 2em;\n  height: 2em;\n  line-height: 2em;\n  vertical-align: middle;\n}\n.#{$fa-css-prefix}-stack-1x, .#{$fa-css-prefix}-stack-2x {\n  position: absolute;\n  left: 0;\n  width: 100%;\n  text-align: center;\n}\n.#{$fa-css-prefix}-stack-1x { line-height: inherit; }\n.#{$fa-css-prefix}-stack-2x { font-size: 2em; }\n.#{$fa-css-prefix}-inverse { color: $fa-inverse; }\n","/* Font Awesome uses the Unicode Private Use Area (PUA) to ensure screen\n   readers do not read off random characters that represent icons */\n\n.#{$fa-css-prefix}-glass:before { content: $fa-var-glass; }\n.#{$fa-css-prefix}-music:before { content: $fa-var-music; }\n.#{$fa-css-prefix}-search:before { content: $fa-var-search; }\n.#{$fa-css-prefix}-envelope-o:before { content: $fa-var-envelope-o; }\n.#{$fa-css-prefix}-heart:before { content: $fa-var-heart; }\n.#{$fa-css-prefix}-star:before { content: $fa-var-star; }\n.#{$fa-css-prefix}-star-o:before { content: $fa-var-star-o; }\n.#{$fa-css-prefix}-user:before { content: $fa-var-user; }\n.#{$fa-css-prefix}-film:before { content: $fa-var-film; }\n.#{$fa-css-prefix}-th-large:before { content: $fa-var-th-large; }\n.#{$fa-css-prefix}-th:before { content: $fa-var-th; }\n.#{$fa-css-prefix}-th-list:before { content: $fa-var-th-list; }\n.#{$fa-css-prefix}-check:before { content: $fa-var-check; }\n.#{$fa-css-prefix}-remove:before,\n.#{$fa-css-prefix}-close:before,\n.#{$fa-css-prefix}-times:before { content: $fa-var-times; }\n.#{$fa-css-prefix}-search-plus:before { content: $fa-var-search-plus; }\n.#{$fa-css-prefix}-search-minus:before { content: $fa-var-search-minus; }\n.#{$fa-css-prefix}-power-off:before { content: $fa-var-power-off; }\n.#{$fa-css-prefix}-signal:before { content: $fa-var-signal; }\n.#{$fa-css-prefix}-gear:before,\n.#{$fa-css-prefix}-cog:before { content: $fa-var-cog; }\n.#{$fa-css-prefix}-trash-o:before { content: $fa-var-trash-o; }\n.#{$fa-css-prefix}-home:before { content: $fa-var-home; }\n.#{$fa-css-prefix}-file-o:before { content: $fa-var-file-o; }\n.#{$fa-css-prefix}-clock-o:before { content: $fa-var-clock-o; }\n.#{$fa-css-prefix}-road:before { content: $fa-var-road; }\n.#{$fa-css-prefix}-download:before { content: $fa-var-download; }\n.#{$fa-css-prefix}-arrow-circle-o-down:before { content: $fa-var-arrow-circle-o-down; }\n.#{$fa-css-prefix}-arrow-circle-o-up:before { content: $fa-var-arrow-circle-o-up; }\n.#{$fa-css-prefix}-inbox:before { content: $fa-var-inbox; }\n.#{$fa-css-prefix}-play-circle-o:before { content: $fa-var-play-circle-o; }\n.#{$fa-css-prefix}-rotate-right:before,\n.#{$fa-css-prefix}-repeat:before { content: $fa-var-repeat; }\n.#{$fa-css-prefix}-refresh:before { content: $fa-var-refresh; }\n.#{$fa-css-prefix}-list-alt:before { content: $fa-var-list-alt; }\n.#{$fa-css-prefix}-lock:before { content: $fa-var-lock; }\n.#{$fa-css-prefix}-flag:before { content: $fa-var-flag; }\n.#{$fa-css-prefix}-headphones:before { content: $fa-var-headphones; }\n.#{$fa-css-prefix}-volume-off:before { content: $fa-var-volume-off; }\n.#{$fa-css-prefix}-volume-down:before { content: $fa-var-volume-down; }\n.#{$fa-css-prefix}-volume-up:before { content: $fa-var-volume-up; }\n.#{$fa-css-prefix}-qrcode:before { content: $fa-var-qrcode; }\n.#{$fa-css-prefix}-barcode:before { content: $fa-var-barcode; }\n.#{$fa-css-prefix}-tag:before { content: $fa-var-tag; }\n.#{$fa-css-prefix}-tags:before { content: $fa-var-tags; }\n.#{$fa-css-prefix}-book:before { content: $fa-var-book; }\n.#{$fa-css-prefix}-bookmark:before { content: $fa-var-bookmark; }\n.#{$fa-css-prefix}-print:before { content: $fa-var-print; }\n.#{$fa-css-prefix}-camera:before { content: $fa-var-camera; }\n.#{$fa-css-prefix}-font:before { content: $fa-var-font; }\n.#{$fa-css-prefix}-bold:before { content: $fa-var-bold; }\n.#{$fa-css-prefix}-italic:before { content: $fa-var-italic; }\n.#{$fa-css-prefix}-text-height:before { content: $fa-var-text-height; }\n.#{$fa-css-prefix}-text-width:before { content: $fa-var-text-width; }\n.#{$fa-css-prefix}-align-left:before { content: $fa-var-align-left; }\n.#{$fa-css-prefix}-align-center:before { content: $fa-var-align-center; }\n.#{$fa-css-prefix}-align-right:before { content: $fa-var-align-right; }\n.#{$fa-css-prefix}-align-justify:before { content: $fa-var-align-justify; }\n.#{$fa-css-prefix}-list:before { content: $fa-var-list; }\n.#{$fa-css-prefix}-dedent:before,\n.#{$fa-css-prefix}-outdent:before { content: $fa-var-outdent; }\n.#{$fa-css-prefix}-indent:before { content: $fa-var-indent; }\n.#{$fa-css-prefix}-video-camera:before { content: $fa-var-video-camera; }\n.#{$fa-css-prefix}-photo:before,\n.#{$fa-css-prefix}-image:before,\n.#{$fa-css-prefix}-picture-o:before { content: $fa-var-picture-o; }\n.#{$fa-css-prefix}-pencil:before { content: $fa-var-pencil; }\n.#{$fa-css-prefix}-map-marker:before { content: $fa-var-map-marker; }\n.#{$fa-css-prefix}-adjust:before { content: $fa-var-adjust; }\n.#{$fa-css-prefix}-tint:before { content: $fa-var-tint; }\n.#{$fa-css-prefix}-edit:before,\n.#{$fa-css-prefix}-pencil-square-o:before { content: $fa-var-pencil-square-o; }\n.#{$fa-css-prefix}-share-square-o:before { content: $fa-var-share-square-o; }\n.#{$fa-css-prefix}-check-square-o:before { content: $fa-var-check-square-o; }\n.#{$fa-css-prefix}-arrows:before { content: $fa-var-arrows; }\n.#{$fa-css-prefix}-step-backward:before { content: $fa-var-step-backward; }\n.#{$fa-css-prefix}-fast-backward:before { content: $fa-var-fast-backward; }\n.#{$fa-css-prefix}-backward:before { content: $fa-var-backward; }\n.#{$fa-css-prefix}-play:before { content: $fa-var-play; }\n.#{$fa-css-prefix}-pause:before { content: $fa-var-pause; }\n.#{$fa-css-prefix}-stop:before { content: $fa-var-stop; }\n.#{$fa-css-prefix}-forward:before { content: $fa-var-forward; }\n.#{$fa-css-prefix}-fast-forward:before { content: $fa-var-fast-forward; }\n.#{$fa-css-prefix}-step-forward:before { content: $fa-var-step-forward; }\n.#{$fa-css-prefix}-eject:before { content: $fa-var-eject; }\n.#{$fa-css-prefix}-chevron-left:before { content: $fa-var-chevron-left; }\n.#{$fa-css-prefix}-chevron-right:before { content: $fa-var-chevron-right; }\n.#{$fa-css-prefix}-plus-circle:before { content: $fa-var-plus-circle; }\n.#{$fa-css-prefix}-minus-circle:before { content: $fa-var-minus-circle; }\n.#{$fa-css-prefix}-times-circle:before { content: $fa-var-times-circle; }\n.#{$fa-css-prefix}-check-circle:before { content: $fa-var-check-circle; }\n.#{$fa-css-prefix}-question-circle:before { content: $fa-var-question-circle; }\n.#{$fa-css-prefix}-info-circle:before { content: $fa-var-info-circle; }\n.#{$fa-css-prefix}-crosshairs:before { content: $fa-var-crosshairs; }\n.#{$fa-css-prefix}-times-circle-o:before { content: $fa-var-times-circle-o; }\n.#{$fa-css-prefix}-check-circle-o:before { content: $fa-var-check-circle-o; }\n.#{$fa-css-prefix}-ban:before { content: $fa-var-ban; }\n.#{$fa-css-prefix}-arrow-left:before { content: $fa-var-arrow-left; }\n.#{$fa-css-prefix}-arrow-right:before { content: $fa-var-arrow-right; }\n.#{$fa-css-prefix}-arrow-up:before { content: $fa-var-arrow-up; }\n.#{$fa-css-prefix}-arrow-down:before { content: $fa-var-arrow-down; }\n.#{$fa-css-prefix}-mail-forward:before,\n.#{$fa-css-prefix}-share:before { content: $fa-var-share; }\n.#{$fa-css-prefix}-expand:before { content: $fa-var-expand; }\n.#{$fa-css-prefix}-compress:before { content: $fa-var-compress; }\n.#{$fa-css-prefix}-plus:before { content: $fa-var-plus; }\n.#{$fa-css-prefix}-minus:before { content: $fa-var-minus; }\n.#{$fa-css-prefix}-asterisk:before { content: $fa-var-asterisk; }\n.#{$fa-css-prefix}-exclamation-circle:before { content: $fa-var-exclamation-circle; }\n.#{$fa-css-prefix}-gift:before { content: $fa-var-gift; }\n.#{$fa-css-prefix}-leaf:before { content: $fa-var-leaf; }\n.#{$fa-css-prefix}-fire:before { content: $fa-var-fire; }\n.#{$fa-css-prefix}-eye:before { content: $fa-var-eye; }\n.#{$fa-css-prefix}-eye-slash:before { content: $fa-var-eye-slash; }\n.#{$fa-css-prefix}-warning:before,\n.#{$fa-css-prefix}-exclamation-triangle:before { content: $fa-var-exclamation-triangle; }\n.#{$fa-css-prefix}-plane:before { content: $fa-var-plane; }\n.#{$fa-css-prefix}-calendar:before { content: $fa-var-calendar; }\n.#{$fa-css-prefix}-random:before { content: $fa-var-random; }\n.#{$fa-css-prefix}-comment:before { content: $fa-var-comment; }\n.#{$fa-css-prefix}-magnet:before { content: $fa-var-magnet; }\n.#{$fa-css-prefix}-chevron-up:before { content: $fa-var-chevron-up; }\n.#{$fa-css-prefix}-chevron-down:before { content: $fa-var-chevron-down; }\n.#{$fa-css-prefix}-retweet:before { content: $fa-var-retweet; }\n.#{$fa-css-prefix}-shopping-cart:before { content: $fa-var-shopping-cart; }\n.#{$fa-css-prefix}-folder:before { content: $fa-var-folder; }\n.#{$fa-css-prefix}-folder-open:before { content: $fa-var-folder-open; }\n.#{$fa-css-prefix}-arrows-v:before { content: $fa-var-arrows-v; }\n.#{$fa-css-prefix}-arrows-h:before { content: $fa-var-arrows-h; }\n.#{$fa-css-prefix}-bar-chart-o:before,\n.#{$fa-css-prefix}-bar-chart:before { content: $fa-var-bar-chart; }\n.#{$fa-css-prefix}-twitter-square:before { content: $fa-var-twitter-square; }\n.#{$fa-css-prefix}-facebook-square:before { content: $fa-var-facebook-square; }\n.#{$fa-css-prefix}-camera-retro:before { content: $fa-var-camera-retro; }\n.#{$fa-css-prefix}-key:before { content: $fa-var-key; }\n.#{$fa-css-prefix}-gears:before,\n.#{$fa-css-prefix}-cogs:before { content: $fa-var-cogs; }\n.#{$fa-css-prefix}-comments:before { content: $fa-var-comments; }\n.#{$fa-css-prefix}-thumbs-o-up:before { content: $fa-var-thumbs-o-up; }\n.#{$fa-css-prefix}-thumbs-o-down:before { content: $fa-var-thumbs-o-down; }\n.#{$fa-css-prefix}-star-half:before { content: $fa-var-star-half; }\n.#{$fa-css-prefix}-heart-o:before { content: $fa-var-heart-o; }\n.#{$fa-css-prefix}-sign-out:before { content: $fa-var-sign-out; }\n.#{$fa-css-prefix}-linkedin-square:before { content: $fa-var-linkedin-square; }\n.#{$fa-css-prefix}-thumb-tack:before { content: $fa-var-thumb-tack; }\n.#{$fa-css-prefix}-external-link:before { content: $fa-var-external-link; }\n.#{$fa-css-prefix}-sign-in:before { content: $fa-var-sign-in; }\n.#{$fa-css-prefix}-trophy:before { content: $fa-var-trophy; }\n.#{$fa-css-prefix}-github-square:before { content: $fa-var-github-square; }\n.#{$fa-css-prefix}-upload:before { content: $fa-var-upload; }\n.#{$fa-css-prefix}-lemon-o:before { content: $fa-var-lemon-o; }\n.#{$fa-css-prefix}-phone:before { content: $fa-var-phone; }\n.#{$fa-css-prefix}-square-o:before { content: $fa-var-square-o; }\n.#{$fa-css-prefix}-bookmark-o:before { content: $fa-var-bookmark-o; }\n.#{$fa-css-prefix}-phone-square:before { content: $fa-var-phone-square; }\n.#{$fa-css-prefix}-twitter:before { content: $fa-var-twitter; }\n.#{$fa-css-prefix}-facebook-f:before,\n.#{$fa-css-prefix}-facebook:before { content: $fa-var-facebook; }\n.#{$fa-css-prefix}-github:before { content: $fa-var-github; }\n.#{$fa-css-prefix}-unlock:before { content: $fa-var-unlock; }\n.#{$fa-css-prefix}-credit-card:before { content: $fa-var-credit-card; }\n.#{$fa-css-prefix}-feed:before,\n.#{$fa-css-prefix}-rss:before { content: $fa-var-rss; }\n.#{$fa-css-prefix}-hdd-o:before { content: $fa-var-hdd-o; }\n.#{$fa-css-prefix}-bullhorn:before { content: $fa-var-bullhorn; }\n.#{$fa-css-prefix}-bell:before { content: $fa-var-bell; }\n.#{$fa-css-prefix}-certificate:before { content: $fa-var-certificate; }\n.#{$fa-css-prefix}-hand-o-right:before { content: $fa-var-hand-o-right; }\n.#{$fa-css-prefix}-hand-o-left:before { content: $fa-var-hand-o-left; }\n.#{$fa-css-prefix}-hand-o-up:before { content: $fa-var-hand-o-up; }\n.#{$fa-css-prefix}-hand-o-down:before { content: $fa-var-hand-o-down; }\n.#{$fa-css-prefix}-arrow-circle-left:before { content: $fa-var-arrow-circle-left; }\n.#{$fa-css-prefix}-arrow-circle-right:before { content: $fa-var-arrow-circle-right; }\n.#{$fa-css-prefix}-arrow-circle-up:before { content: $fa-var-arrow-circle-up; }\n.#{$fa-css-prefix}-arrow-circle-down:before { content: $fa-var-arrow-circle-down; }\n.#{$fa-css-prefix}-globe:before { content: $fa-var-globe; }\n.#{$fa-css-prefix}-wrench:before { content: $fa-var-wrench; }\n.#{$fa-css-prefix}-tasks:before { content: $fa-var-tasks; }\n.#{$fa-css-prefix}-filter:before { content: $fa-var-filter; }\n.#{$fa-css-prefix}-briefcase:before { content: $fa-var-briefcase; }\n.#{$fa-css-prefix}-arrows-alt:before { content: $fa-var-arrows-alt; }\n.#{$fa-css-prefix}-group:before,\n.#{$fa-css-prefix}-users:before { content: $fa-var-users; }\n.#{$fa-css-prefix}-chain:before,\n.#{$fa-css-prefix}-link:before { content: $fa-var-link; }\n.#{$fa-css-prefix}-cloud:before { content: $fa-var-cloud; }\n.#{$fa-css-prefix}-flask:before { content: $fa-var-flask; }\n.#{$fa-css-prefix}-cut:before,\n.#{$fa-css-prefix}-scissors:before { content: $fa-var-scissors; }\n.#{$fa-css-prefix}-copy:before,\n.#{$fa-css-prefix}-files-o:before { content: $fa-var-files-o; }\n.#{$fa-css-prefix}-paperclip:before { content: $fa-var-paperclip; }\n.#{$fa-css-prefix}-save:before,\n.#{$fa-css-prefix}-floppy-o:before { content: $fa-var-floppy-o; }\n.#{$fa-css-prefix}-square:before { content: $fa-var-square; }\n.#{$fa-css-prefix}-navicon:before,\n.#{$fa-css-prefix}-reorder:before,\n.#{$fa-css-prefix}-bars:before { content: $fa-var-bars; }\n.#{$fa-css-prefix}-list-ul:before { content: $fa-var-list-ul; }\n.#{$fa-css-prefix}-list-ol:before { content: $fa-var-list-ol; }\n.#{$fa-css-prefix}-strikethrough:before { content: $fa-var-strikethrough; }\n.#{$fa-css-prefix}-underline:before { content: $fa-var-underline; }\n.#{$fa-css-prefix}-table:before { content: $fa-var-table; }\n.#{$fa-css-prefix}-magic:before { content: $fa-var-magic; }\n.#{$fa-css-prefix}-truck:before { content: $fa-var-truck; }\n.#{$fa-css-prefix}-pinterest:before { content: $fa-var-pinterest; }\n.#{$fa-css-prefix}-pinterest-square:before { content: $fa-var-pinterest-square; }\n.#{$fa-css-prefix}-google-plus-square:before { content: $fa-var-google-plus-square; }\n.#{$fa-css-prefix}-google-plus:before { content: $fa-var-google-plus; }\n.#{$fa-css-prefix}-money:before { content: $fa-var-money; }\n.#{$fa-css-prefix}-caret-down:before { content: $fa-var-caret-down; }\n.#{$fa-css-prefix}-caret-up:before { content: $fa-var-caret-up; }\n.#{$fa-css-prefix}-caret-left:before { content: $fa-var-caret-left; }\n.#{$fa-css-prefix}-caret-right:before { content: $fa-var-caret-right; }\n.#{$fa-css-prefix}-columns:before { content: $fa-var-columns; }\n.#{$fa-css-prefix}-unsorted:before,\n.#{$fa-css-prefix}-sort:before { content: $fa-var-sort; }\n.#{$fa-css-prefix}-sort-down:before,\n.#{$fa-css-prefix}-sort-desc:before { content: $fa-var-sort-desc; }\n.#{$fa-css-prefix}-sort-up:before,\n.#{$fa-css-prefix}-sort-asc:before { content: $fa-var-sort-asc; }\n.#{$fa-css-prefix}-envelope:before { content: $fa-var-envelope; }\n.#{$fa-css-prefix}-linkedin:before { content: $fa-var-linkedin; }\n.#{$fa-css-prefix}-rotate-left:before,\n.#{$fa-css-prefix}-undo:before { content: $fa-var-undo; }\n.#{$fa-css-prefix}-legal:before,\n.#{$fa-css-prefix}-gavel:before { content: $fa-var-gavel; }\n.#{$fa-css-prefix}-dashboard:before,\n.#{$fa-css-prefix}-tachometer:before { content: $fa-var-tachometer; }\n.#{$fa-css-prefix}-comment-o:before { content: $fa-var-comment-o; }\n.#{$fa-css-prefix}-comments-o:before { content: $fa-var-comments-o; }\n.#{$fa-css-prefix}-flash:before,\n.#{$fa-css-prefix}-bolt:before { content: $fa-var-bolt; }\n.#{$fa-css-prefix}-sitemap:before { content: $fa-var-sitemap; }\n.#{$fa-css-prefix}-umbrella:before { content: $fa-var-umbrella; }\n.#{$fa-css-prefix}-paste:before,\n.#{$fa-css-prefix}-clipboard:before { content: $fa-var-clipboard; }\n.#{$fa-css-prefix}-lightbulb-o:before { content: $fa-var-lightbulb-o; }\n.#{$fa-css-prefix}-exchange:before { content: $fa-var-exchange; }\n.#{$fa-css-prefix}-cloud-download:before { content: $fa-var-cloud-download; }\n.#{$fa-css-prefix}-cloud-upload:before { content: $fa-var-cloud-upload; }\n.#{$fa-css-prefix}-user-md:before { content: $fa-var-user-md; }\n.#{$fa-css-prefix}-stethoscope:before { content: $fa-var-stethoscope; }\n.#{$fa-css-prefix}-suitcase:before { content: $fa-var-suitcase; }\n.#{$fa-css-prefix}-bell-o:before { content: $fa-var-bell-o; }\n.#{$fa-css-prefix}-coffee:before { content: $fa-var-coffee; }\n.#{$fa-css-prefix}-cutlery:before { content: $fa-var-cutlery; }\n.#{$fa-css-prefix}-file-text-o:before { content: $fa-var-file-text-o; }\n.#{$fa-css-prefix}-building-o:before { content: $fa-var-building-o; }\n.#{$fa-css-prefix}-hospital-o:before { content: $fa-var-hospital-o; }\n.#{$fa-css-prefix}-ambulance:before { content: $fa-var-ambulance; }\n.#{$fa-css-prefix}-medkit:before { content: $fa-var-medkit; }\n.#{$fa-css-prefix}-fighter-jet:before { content: $fa-var-fighter-jet; }\n.#{$fa-css-prefix}-beer:before { content: $fa-var-beer; }\n.#{$fa-css-prefix}-h-square:before { content: $fa-var-h-square; }\n.#{$fa-css-prefix}-plus-square:before { content: $fa-var-plus-square; }\n.#{$fa-css-prefix}-angle-double-left:before { content: $fa-var-angle-double-left; }\n.#{$fa-css-prefix}-angle-double-right:before { content: $fa-var-angle-double-right; }\n.#{$fa-css-prefix}-angle-double-up:before { content: $fa-var-angle-double-up; }\n.#{$fa-css-prefix}-angle-double-down:before { content: $fa-var-angle-double-down; }\n.#{$fa-css-prefix}-angle-left:before { content: $fa-var-angle-left; }\n.#{$fa-css-prefix}-angle-right:before { content: $fa-var-angle-right; }\n.#{$fa-css-prefix}-angle-up:before { content: $fa-var-angle-up; }\n.#{$fa-css-prefix}-angle-down:before { content: $fa-var-angle-down; }\n.#{$fa-css-prefix}-desktop:before { content: $fa-var-desktop; }\n.#{$fa-css-prefix}-laptop:before { content: $fa-var-laptop; }\n.#{$fa-css-prefix}-tablet:before { content: $fa-var-tablet; }\n.#{$fa-css-prefix}-mobile-phone:before,\n.#{$fa-css-prefix}-mobile:before { content: $fa-var-mobile; }\n.#{$fa-css-prefix}-circle-o:before { content: $fa-var-circle-o; }\n.#{$fa-css-prefix}-quote-left:before { content: $fa-var-quote-left; }\n.#{$fa-css-prefix}-quote-right:before { content: $fa-var-quote-right; }\n.#{$fa-css-prefix}-spinner:before { content: $fa-var-spinner; }\n.#{$fa-css-prefix}-circle:before { content: $fa-var-circle; }\n.#{$fa-css-prefix}-mail-reply:before,\n.#{$fa-css-prefix}-reply:before { content: $fa-var-reply; }\n.#{$fa-css-prefix}-github-alt:before { content: $fa-var-github-alt; }\n.#{$fa-css-prefix}-folder-o:before { content: $fa-var-folder-o; }\n.#{$fa-css-prefix}-folder-open-o:before { content: $fa-var-folder-open-o; }\n.#{$fa-css-prefix}-smile-o:before { content: $fa-var-smile-o; }\n.#{$fa-css-prefix}-frown-o:before { content: $fa-var-frown-o; }\n.#{$fa-css-prefix}-meh-o:before { content: $fa-var-meh-o; }\n.#{$fa-css-prefix}-gamepad:before { content: $fa-var-gamepad; }\n.#{$fa-css-prefix}-keyboard-o:before { content: $fa-var-keyboard-o; }\n.#{$fa-css-prefix}-flag-o:before { content: $fa-var-flag-o; }\n.#{$fa-css-prefix}-flag-checkered:before { content: $fa-var-flag-checkered; }\n.#{$fa-css-prefix}-terminal:before { content: $fa-var-terminal; }\n.#{$fa-css-prefix}-code:before { content: $fa-var-code; }\n.#{$fa-css-prefix}-mail-reply-all:before,\n.#{$fa-css-prefix}-reply-all:before { content: $fa-var-reply-all; }\n.#{$fa-css-prefix}-star-half-empty:before,\n.#{$fa-css-prefix}-star-half-full:before,\n.#{$fa-css-prefix}-star-half-o:before { content: $fa-var-star-half-o; }\n.#{$fa-css-prefix}-location-arrow:before { content: $fa-var-location-arrow; }\n.#{$fa-css-prefix}-crop:before { content: $fa-var-crop; }\n.#{$fa-css-prefix}-code-fork:before { content: $fa-var-code-fork; }\n.#{$fa-css-prefix}-unlink:before,\n.#{$fa-css-prefix}-chain-broken:before { content: $fa-var-chain-broken; }\n.#{$fa-css-prefix}-question:before { content: $fa-var-question; }\n.#{$fa-css-prefix}-info:before { content: $fa-var-info; }\n.#{$fa-css-prefix}-exclamation:before { content: $fa-var-exclamation; }\n.#{$fa-css-prefix}-superscript:before { content: $fa-var-superscript; }\n.#{$fa-css-prefix}-subscript:before { content: $fa-var-subscript; }\n.#{$fa-css-prefix}-eraser:before { content: $fa-var-eraser; }\n.#{$fa-css-prefix}-puzzle-piece:before { content: $fa-var-puzzle-piece; }\n.#{$fa-css-prefix}-microphone:before { content: $fa-var-microphone; }\n.#{$fa-css-prefix}-microphone-slash:before { content: $fa-var-microphone-slash; }\n.#{$fa-css-prefix}-shield:before { content: $fa-var-shield; }\n.#{$fa-css-prefix}-calendar-o:before { content: $fa-var-calendar-o; }\n.#{$fa-css-prefix}-fire-extinguisher:before { content: $fa-var-fire-extinguisher; }\n.#{$fa-css-prefix}-rocket:before { content: $fa-var-rocket; }\n.#{$fa-css-prefix}-maxcdn:before { content: $fa-var-maxcdn; }\n.#{$fa-css-prefix}-chevron-circle-left:before { content: $fa-var-chevron-circle-left; }\n.#{$fa-css-prefix}-chevron-circle-right:before { content: $fa-var-chevron-circle-right; }\n.#{$fa-css-prefix}-chevron-circle-up:before { content: $fa-var-chevron-circle-up; }\n.#{$fa-css-prefix}-chevron-circle-down:before { content: $fa-var-chevron-circle-down; }\n.#{$fa-css-prefix}-html5:before { content: $fa-var-html5; }\n.#{$fa-css-prefix}-css3:before { content: $fa-var-css3; }\n.#{$fa-css-prefix}-anchor:before { content: $fa-var-anchor; }\n.#{$fa-css-prefix}-unlock-alt:before { content: $fa-var-unlock-alt; }\n.#{$fa-css-prefix}-bullseye:before { content: $fa-var-bullseye; }\n.#{$fa-css-prefix}-ellipsis-h:before { content: $fa-var-ellipsis-h; }\n.#{$fa-css-prefix}-ellipsis-v:before { content: $fa-var-ellipsis-v; }\n.#{$fa-css-prefix}-rss-square:before { content: $fa-var-rss-square; }\n.#{$fa-css-prefix}-play-circle:before { content: $fa-var-play-circle; }\n.#{$fa-css-prefix}-ticket:before { content: $fa-var-ticket; }\n.#{$fa-css-prefix}-minus-square:before { content: $fa-var-minus-square; }\n.#{$fa-css-prefix}-minus-square-o:before { content: $fa-var-minus-square-o; }\n.#{$fa-css-prefix}-level-up:before { content: $fa-var-level-up; }\n.#{$fa-css-prefix}-level-down:before { content: $fa-var-level-down; }\n.#{$fa-css-prefix}-check-square:before { content: $fa-var-check-square; }\n.#{$fa-css-prefix}-pencil-square:before { content: $fa-var-pencil-square; }\n.#{$fa-css-prefix}-external-link-square:before { content: $fa-var-external-link-square; }\n.#{$fa-css-prefix}-share-square:before { content: $fa-var-share-square; }\n.#{$fa-css-prefix}-compass:before { content: $fa-var-compass; }\n.#{$fa-css-prefix}-toggle-down:before,\n.#{$fa-css-prefix}-caret-square-o-down:before { content: $fa-var-caret-square-o-down; }\n.#{$fa-css-prefix}-toggle-up:before,\n.#{$fa-css-prefix}-caret-square-o-up:before { content: $fa-var-caret-square-o-up; }\n.#{$fa-css-prefix}-toggle-right:before,\n.#{$fa-css-prefix}-caret-square-o-right:before { content: $fa-var-caret-square-o-right; }\n.#{$fa-css-prefix}-euro:before,\n.#{$fa-css-prefix}-eur:before { content: $fa-var-eur; }\n.#{$fa-css-prefix}-gbp:before { content: $fa-var-gbp; }\n.#{$fa-css-prefix}-dollar:before,\n.#{$fa-css-prefix}-usd:before { content: $fa-var-usd; }\n.#{$fa-css-prefix}-rupee:before,\n.#{$fa-css-prefix}-inr:before { content: $fa-var-inr; }\n.#{$fa-css-prefix}-cny:before,\n.#{$fa-css-prefix}-rmb:before,\n.#{$fa-css-prefix}-yen:before,\n.#{$fa-css-prefix}-jpy:before { content: $fa-var-jpy; }\n.#{$fa-css-prefix}-ruble:before,\n.#{$fa-css-prefix}-rouble:before,\n.#{$fa-css-prefix}-rub:before { content: $fa-var-rub; }\n.#{$fa-css-prefix}-won:before,\n.#{$fa-css-prefix}-krw:before { content: $fa-var-krw; }\n.#{$fa-css-prefix}-bitcoin:before,\n.#{$fa-css-prefix}-btc:before { content: $fa-var-btc; }\n.#{$fa-css-prefix}-file:before { content: $fa-var-file; }\n.#{$fa-css-prefix}-file-text:before { content: $fa-var-file-text; }\n.#{$fa-css-prefix}-sort-alpha-asc:before { content: $fa-var-sort-alpha-asc; }\n.#{$fa-css-prefix}-sort-alpha-desc:before { content: $fa-var-sort-alpha-desc; }\n.#{$fa-css-prefix}-sort-amount-asc:before { content: $fa-var-sort-amount-asc; }\n.#{$fa-css-prefix}-sort-amount-desc:before { content: $fa-var-sort-amount-desc; }\n.#{$fa-css-prefix}-sort-numeric-asc:before { content: $fa-var-sort-numeric-asc; }\n.#{$fa-css-prefix}-sort-numeric-desc:before { content: $fa-var-sort-numeric-desc; }\n.#{$fa-css-prefix}-thumbs-up:before { content: $fa-var-thumbs-up; }\n.#{$fa-css-prefix}-thumbs-down:before { content: $fa-var-thumbs-down; }\n.#{$fa-css-prefix}-youtube-square:before { content: $fa-var-youtube-square; }\n.#{$fa-css-prefix}-youtube:before { content: $fa-var-youtube; }\n.#{$fa-css-prefix}-xing:before { content: $fa-var-xing; }\n.#{$fa-css-prefix}-xing-square:before { content: $fa-var-xing-square; }\n.#{$fa-css-prefix}-youtube-play:before { content: $fa-var-youtube-play; }\n.#{$fa-css-prefix}-dropbox:before { content: $fa-var-dropbox; }\n.#{$fa-css-prefix}-stack-overflow:before { content: $fa-var-stack-overflow; }\n.#{$fa-css-prefix}-instagram:before { content: $fa-var-instagram; }\n.#{$fa-css-prefix}-flickr:before { content: $fa-var-flickr; }\n.#{$fa-css-prefix}-adn:before { content: $fa-var-adn; }\n.#{$fa-css-prefix}-bitbucket:before { content: $fa-var-bitbucket; }\n.#{$fa-css-prefix}-bitbucket-square:before { content: $fa-var-bitbucket-square; }\n.#{$fa-css-prefix}-tumblr:before { content: $fa-var-tumblr; }\n.#{$fa-css-prefix}-tumblr-square:before { content: $fa-var-tumblr-square; }\n.#{$fa-css-prefix}-long-arrow-down:before { content: $fa-var-long-arrow-down; }\n.#{$fa-css-prefix}-long-arrow-up:before { content: $fa-var-long-arrow-up; }\n.#{$fa-css-prefix}-long-arrow-left:before { content: $fa-var-long-arrow-left; }\n.#{$fa-css-prefix}-long-arrow-right:before { content: $fa-var-long-arrow-right; }\n.#{$fa-css-prefix}-apple:before { content: $fa-var-apple; }\n.#{$fa-css-prefix}-windows:before { content: $fa-var-windows; }\n.#{$fa-css-prefix}-android:before { content: $fa-var-android; }\n.#{$fa-css-prefix}-linux:before { content: $fa-var-linux; }\n.#{$fa-css-prefix}-dribbble:before { content: $fa-var-dribbble; }\n.#{$fa-css-prefix}-skype:before { content: $fa-var-skype; }\n.#{$fa-css-prefix}-foursquare:before { content: $fa-var-foursquare; }\n.#{$fa-css-prefix}-trello:before { content: $fa-var-trello; }\n.#{$fa-css-prefix}-female:before { content: $fa-var-female; }\n.#{$fa-css-prefix}-male:before { content: $fa-var-male; }\n.#{$fa-css-prefix}-gittip:before,\n.#{$fa-css-prefix}-gratipay:before { content: $fa-var-gratipay; }\n.#{$fa-css-prefix}-sun-o:before { content: $fa-var-sun-o; }\n.#{$fa-css-prefix}-moon-o:before { content: $fa-var-moon-o; }\n.#{$fa-css-prefix}-archive:before { content: $fa-var-archive; }\n.#{$fa-css-prefix}-bug:before { content: $fa-var-bug; }\n.#{$fa-css-prefix}-vk:before { content: $fa-var-vk; }\n.#{$fa-css-prefix}-weibo:before { content: $fa-var-weibo; }\n.#{$fa-css-prefix}-renren:before { content: $fa-var-renren; }\n.#{$fa-css-prefix}-pagelines:before { content: $fa-var-pagelines; }\n.#{$fa-css-prefix}-stack-exchange:before { content: $fa-var-stack-exchange; }\n.#{$fa-css-prefix}-arrow-circle-o-right:before { content: $fa-var-arrow-circle-o-right; }\n.#{$fa-css-prefix}-arrow-circle-o-left:before { content: $fa-var-arrow-circle-o-left; }\n.#{$fa-css-prefix}-toggle-left:before,\n.#{$fa-css-prefix}-caret-square-o-left:before { content: $fa-var-caret-square-o-left; }\n.#{$fa-css-prefix}-dot-circle-o:before { content: $fa-var-dot-circle-o; }\n.#{$fa-css-prefix}-wheelchair:before { content: $fa-var-wheelchair; }\n.#{$fa-css-prefix}-vimeo-square:before { content: $fa-var-vimeo-square; }\n.#{$fa-css-prefix}-turkish-lira:before,\n.#{$fa-css-prefix}-try:before { content: $fa-var-try; }\n.#{$fa-css-prefix}-plus-square-o:before { content: $fa-var-plus-square-o; }\n.#{$fa-css-prefix}-space-shuttle:before { content: $fa-var-space-shuttle; }\n.#{$fa-css-prefix}-slack:before { content: $fa-var-slack; }\n.#{$fa-css-prefix}-envelope-square:before { content: $fa-var-envelope-square; }\n.#{$fa-css-prefix}-wordpress:before { content: $fa-var-wordpress; }\n.#{$fa-css-prefix}-openid:before { content: $fa-var-openid; }\n.#{$fa-css-prefix}-institution:before,\n.#{$fa-css-prefix}-bank:before,\n.#{$fa-css-prefix}-university:before { content: $fa-var-university; }\n.#{$fa-css-prefix}-mortar-board:before,\n.#{$fa-css-prefix}-graduation-cap:before { content: $fa-var-graduation-cap; }\n.#{$fa-css-prefix}-yahoo:before { content: $fa-var-yahoo; }\n.#{$fa-css-prefix}-google:before { content: $fa-var-google; }\n.#{$fa-css-prefix}-reddit:before { content: $fa-var-reddit; }\n.#{$fa-css-prefix}-reddit-square:before { content: $fa-var-reddit-square; }\n.#{$fa-css-prefix}-stumbleupon-circle:before { content: $fa-var-stumbleupon-circle; }\n.#{$fa-css-prefix}-stumbleupon:before { content: $fa-var-stumbleupon; }\n.#{$fa-css-prefix}-delicious:before { content: $fa-var-delicious; }\n.#{$fa-css-prefix}-digg:before { content: $fa-var-digg; }\n.#{$fa-css-prefix}-pied-piper-pp:before { content: $fa-var-pied-piper-pp; }\n.#{$fa-css-prefix}-pied-piper-alt:before { content: $fa-var-pied-piper-alt; }\n.#{$fa-css-prefix}-drupal:before { content: $fa-var-drupal; }\n.#{$fa-css-prefix}-joomla:before { content: $fa-var-joomla; }\n.#{$fa-css-prefix}-language:before { content: $fa-var-language; }\n.#{$fa-css-prefix}-fax:before { content: $fa-var-fax; }\n.#{$fa-css-prefix}-building:before { content: $fa-var-building; }\n.#{$fa-css-prefix}-child:before { content: $fa-var-child; }\n.#{$fa-css-prefix}-paw:before { content: $fa-var-paw; }\n.#{$fa-css-prefix}-spoon:before { content: $fa-var-spoon; }\n.#{$fa-css-prefix}-cube:before { content: $fa-var-cube; }\n.#{$fa-css-prefix}-cubes:before { content: $fa-var-cubes; }\n.#{$fa-css-prefix}-behance:before { content: $fa-var-behance; }\n.#{$fa-css-prefix}-behance-square:before { content: $fa-var-behance-square; }\n.#{$fa-css-prefix}-steam:before { content: $fa-var-steam; }\n.#{$fa-css-prefix}-steam-square:before { content: $fa-var-steam-square; }\n.#{$fa-css-prefix}-recycle:before { content: $fa-var-recycle; }\n.#{$fa-css-prefix}-automobile:before,\n.#{$fa-css-prefix}-car:before { content: $fa-var-car; }\n.#{$fa-css-prefix}-cab:before,\n.#{$fa-css-prefix}-taxi:before { content: $fa-var-taxi; }\n.#{$fa-css-prefix}-tree:before { content: $fa-var-tree; }\n.#{$fa-css-prefix}-spotify:before { content: $fa-var-spotify; }\n.#{$fa-css-prefix}-deviantart:before { content: $fa-var-deviantart; }\n.#{$fa-css-prefix}-soundcloud:before { content: $fa-var-soundcloud; }\n.#{$fa-css-prefix}-database:before { content: $fa-var-database; }\n.#{$fa-css-prefix}-file-pdf-o:before { content: $fa-var-file-pdf-o; }\n.#{$fa-css-prefix}-file-word-o:before { content: $fa-var-file-word-o; }\n.#{$fa-css-prefix}-file-excel-o:before { content: $fa-var-file-excel-o; }\n.#{$fa-css-prefix}-file-powerpoint-o:before { content: $fa-var-file-powerpoint-o; }\n.#{$fa-css-prefix}-file-photo-o:before,\n.#{$fa-css-prefix}-file-picture-o:before,\n.#{$fa-css-prefix}-file-image-o:before { content: $fa-var-file-image-o; }\n.#{$fa-css-prefix}-file-zip-o:before,\n.#{$fa-css-prefix}-file-archive-o:before { content: $fa-var-file-archive-o; }\n.#{$fa-css-prefix}-file-sound-o:before,\n.#{$fa-css-prefix}-file-audio-o:before { content: $fa-var-file-audio-o; }\n.#{$fa-css-prefix}-file-movie-o:before,\n.#{$fa-css-prefix}-file-video-o:before { content: $fa-var-file-video-o; }\n.#{$fa-css-prefix}-file-code-o:before { content: $fa-var-file-code-o; }\n.#{$fa-css-prefix}-vine:before { content: $fa-var-vine; }\n.#{$fa-css-prefix}-codepen:before { content: $fa-var-codepen; }\n.#{$fa-css-prefix}-jsfiddle:before { content: $fa-var-jsfiddle; }\n.#{$fa-css-prefix}-life-bouy:before,\n.#{$fa-css-prefix}-life-buoy:before,\n.#{$fa-css-prefix}-life-saver:before,\n.#{$fa-css-prefix}-support:before,\n.#{$fa-css-prefix}-life-ring:before { content: $fa-var-life-ring; }\n.#{$fa-css-prefix}-circle-o-notch:before { content: $fa-var-circle-o-notch; }\n.#{$fa-css-prefix}-ra:before,\n.#{$fa-css-prefix}-resistance:before,\n.#{$fa-css-prefix}-rebel:before { content: $fa-var-rebel; }\n.#{$fa-css-prefix}-ge:before,\n.#{$fa-css-prefix}-empire:before { content: $fa-var-empire; }\n.#{$fa-css-prefix}-git-square:before { content: $fa-var-git-square; }\n.#{$fa-css-prefix}-git:before { content: $fa-var-git; }\n.#{$fa-css-prefix}-y-combinator-square:before,\n.#{$fa-css-prefix}-yc-square:before,\n.#{$fa-css-prefix}-hacker-news:before { content: $fa-var-hacker-news; }\n.#{$fa-css-prefix}-tencent-weibo:before { content: $fa-var-tencent-weibo; }\n.#{$fa-css-prefix}-qq:before { content: $fa-var-qq; }\n.#{$fa-css-prefix}-wechat:before,\n.#{$fa-css-prefix}-weixin:before { content: $fa-var-weixin; }\n.#{$fa-css-prefix}-send:before,\n.#{$fa-css-prefix}-paper-plane:before { content: $fa-var-paper-plane; }\n.#{$fa-css-prefix}-send-o:before,\n.#{$fa-css-prefix}-paper-plane-o:before { content: $fa-var-paper-plane-o; }\n.#{$fa-css-prefix}-history:before { content: $fa-var-history; }\n.#{$fa-css-prefix}-circle-thin:before { content: $fa-var-circle-thin; }\n.#{$fa-css-prefix}-header:before { content: $fa-var-header; }\n.#{$fa-css-prefix}-paragraph:before { content: $fa-var-paragraph; }\n.#{$fa-css-prefix}-sliders:before { content: $fa-var-sliders; }\n.#{$fa-css-prefix}-share-alt:before { content: $fa-var-share-alt; }\n.#{$fa-css-prefix}-share-alt-square:before { content: $fa-var-share-alt-square; }\n.#{$fa-css-prefix}-bomb:before { content: $fa-var-bomb; }\n.#{$fa-css-prefix}-soccer-ball-o:before,\n.#{$fa-css-prefix}-futbol-o:before { content: $fa-var-futbol-o; }\n.#{$fa-css-prefix}-tty:before { content: $fa-var-tty; }\n.#{$fa-css-prefix}-binoculars:before { content: $fa-var-binoculars; }\n.#{$fa-css-prefix}-plug:before { content: $fa-var-plug; }\n.#{$fa-css-prefix}-slideshare:before { content: $fa-var-slideshare; }\n.#{$fa-css-prefix}-twitch:before { content: $fa-var-twitch; }\n.#{$fa-css-prefix}-yelp:before { content: $fa-var-yelp; }\n.#{$fa-css-prefix}-newspaper-o:before { content: $fa-var-newspaper-o; }\n.#{$fa-css-prefix}-wifi:before { content: $fa-var-wifi; }\n.#{$fa-css-prefix}-calculator:before { content: $fa-var-calculator; }\n.#{$fa-css-prefix}-paypal:before { content: $fa-var-paypal; }\n.#{$fa-css-prefix}-google-wallet:before { content: $fa-var-google-wallet; }\n.#{$fa-css-prefix}-cc-visa:before { content: $fa-var-cc-visa; }\n.#{$fa-css-prefix}-cc-mastercard:before { content: $fa-var-cc-mastercard; }\n.#{$fa-css-prefix}-cc-discover:before { content: $fa-var-cc-discover; }\n.#{$fa-css-prefix}-cc-amex:before { content: $fa-var-cc-amex; }\n.#{$fa-css-prefix}-cc-paypal:before { content: $fa-var-cc-paypal; }\n.#{$fa-css-prefix}-cc-stripe:before { content: $fa-var-cc-stripe; }\n.#{$fa-css-prefix}-bell-slash:before { content: $fa-var-bell-slash; }\n.#{$fa-css-prefix}-bell-slash-o:before { content: $fa-var-bell-slash-o; }\n.#{$fa-css-prefix}-trash:before { content: $fa-var-trash; }\n.#{$fa-css-prefix}-copyright:before { content: $fa-var-copyright; }\n.#{$fa-css-prefix}-at:before { content: $fa-var-at; }\n.#{$fa-css-prefix}-eyedropper:before { content: $fa-var-eyedropper; }\n.#{$fa-css-prefix}-paint-brush:before { content: $fa-var-paint-brush; }\n.#{$fa-css-prefix}-birthday-cake:before { content: $fa-var-birthday-cake; }\n.#{$fa-css-prefix}-area-chart:before { content: $fa-var-area-chart; }\n.#{$fa-css-prefix}-pie-chart:before { content: $fa-var-pie-chart; }\n.#{$fa-css-prefix}-line-chart:before { content: $fa-var-line-chart; }\n.#{$fa-css-prefix}-lastfm:before { content: $fa-var-lastfm; }\n.#{$fa-css-prefix}-lastfm-square:before { content: $fa-var-lastfm-square; }\n.#{$fa-css-prefix}-toggle-off:before { content: $fa-var-toggle-off; }\n.#{$fa-css-prefix}-toggle-on:before { content: $fa-var-toggle-on; }\n.#{$fa-css-prefix}-bicycle:before { content: $fa-var-bicycle; }\n.#{$fa-css-prefix}-bus:before { content: $fa-var-bus; }\n.#{$fa-css-prefix}-ioxhost:before { content: $fa-var-ioxhost; }\n.#{$fa-css-prefix}-angellist:before { content: $fa-var-angellist; }\n.#{$fa-css-prefix}-cc:before { content: $fa-var-cc; }\n.#{$fa-css-prefix}-shekel:before,\n.#{$fa-css-prefix}-sheqel:before,\n.#{$fa-css-prefix}-ils:before { content: $fa-var-ils; }\n.#{$fa-css-prefix}-meanpath:before { content: $fa-var-meanpath; }\n.#{$fa-css-prefix}-buysellads:before { content: $fa-var-buysellads; }\n.#{$fa-css-prefix}-connectdevelop:before { content: $fa-var-connectdevelop; }\n.#{$fa-css-prefix}-dashcube:before { content: $fa-var-dashcube; }\n.#{$fa-css-prefix}-forumbee:before { content: $fa-var-forumbee; }\n.#{$fa-css-prefix}-leanpub:before { content: $fa-var-leanpub; }\n.#{$fa-css-prefix}-sellsy:before { content: $fa-var-sellsy; }\n.#{$fa-css-prefix}-shirtsinbulk:before { content: $fa-var-shirtsinbulk; }\n.#{$fa-css-prefix}-simplybuilt:before { content: $fa-var-simplybuilt; }\n.#{$fa-css-prefix}-skyatlas:before { content: $fa-var-skyatlas; }\n.#{$fa-css-prefix}-cart-plus:before { content: $fa-var-cart-plus; }\n.#{$fa-css-prefix}-cart-arrow-down:before { content: $fa-var-cart-arrow-down; }\n.#{$fa-css-prefix}-diamond:before { content: $fa-var-diamond; }\n.#{$fa-css-prefix}-ship:before { content: $fa-var-ship; }\n.#{$fa-css-prefix}-user-secret:before { content: $fa-var-user-secret; }\n.#{$fa-css-prefix}-motorcycle:before { content: $fa-var-motorcycle; }\n.#{$fa-css-prefix}-street-view:before { content: $fa-var-street-view; }\n.#{$fa-css-prefix}-heartbeat:before { content: $fa-var-heartbeat; }\n.#{$fa-css-prefix}-venus:before { content: $fa-var-venus; }\n.#{$fa-css-prefix}-mars:before { content: $fa-var-mars; }\n.#{$fa-css-prefix}-mercury:before { content: $fa-var-mercury; }\n.#{$fa-css-prefix}-intersex:before,\n.#{$fa-css-prefix}-transgender:before { content: $fa-var-transgender; }\n.#{$fa-css-prefix}-transgender-alt:before { content: $fa-var-transgender-alt; }\n.#{$fa-css-prefix}-venus-double:before { content: $fa-var-venus-double; }\n.#{$fa-css-prefix}-mars-double:before { content: $fa-var-mars-double; }\n.#{$fa-css-prefix}-venus-mars:before { content: $fa-var-venus-mars; }\n.#{$fa-css-prefix}-mars-stroke:before { content: $fa-var-mars-stroke; }\n.#{$fa-css-prefix}-mars-stroke-v:before { content: $fa-var-mars-stroke-v; }\n.#{$fa-css-prefix}-mars-stroke-h:before { content: $fa-var-mars-stroke-h; }\n.#{$fa-css-prefix}-neuter:before { content: $fa-var-neuter; }\n.#{$fa-css-prefix}-genderless:before { content: $fa-var-genderless; }\n.#{$fa-css-prefix}-facebook-official:before { content: $fa-var-facebook-official; }\n.#{$fa-css-prefix}-pinterest-p:before { content: $fa-var-pinterest-p; }\n.#{$fa-css-prefix}-whatsapp:before { content: $fa-var-whatsapp; }\n.#{$fa-css-prefix}-server:before { content: $fa-var-server; }\n.#{$fa-css-prefix}-user-plus:before { content: $fa-var-user-plus; }\n.#{$fa-css-prefix}-user-times:before { content: $fa-var-user-times; }\n.#{$fa-css-prefix}-hotel:before,\n.#{$fa-css-prefix}-bed:before { content: $fa-var-bed; }\n.#{$fa-css-prefix}-viacoin:before { content: $fa-var-viacoin; }\n.#{$fa-css-prefix}-train:before { content: $fa-var-train; }\n.#{$fa-css-prefix}-subway:before { content: $fa-var-subway; }\n.#{$fa-css-prefix}-medium:before { content: $fa-var-medium; }\n.#{$fa-css-prefix}-yc:before,\n.#{$fa-css-prefix}-y-combinator:before { content: $fa-var-y-combinator; }\n.#{$fa-css-prefix}-optin-monster:before { content: $fa-var-optin-monster; }\n.#{$fa-css-prefix}-opencart:before { content: $fa-var-opencart; }\n.#{$fa-css-prefix}-expeditedssl:before { content: $fa-var-expeditedssl; }\n.#{$fa-css-prefix}-battery-4:before,\n.#{$fa-css-prefix}-battery:before,\n.#{$fa-css-prefix}-battery-full:before { content: $fa-var-battery-full; }\n.#{$fa-css-prefix}-battery-3:before,\n.#{$fa-css-prefix}-battery-three-quarters:before { content: $fa-var-battery-three-quarters; }\n.#{$fa-css-prefix}-battery-2:before,\n.#{$fa-css-prefix}-battery-half:before { content: $fa-var-battery-half; }\n.#{$fa-css-prefix}-battery-1:before,\n.#{$fa-css-prefix}-battery-quarter:before { content: $fa-var-battery-quarter; }\n.#{$fa-css-prefix}-battery-0:before,\n.#{$fa-css-prefix}-battery-empty:before { content: $fa-var-battery-empty; }\n.#{$fa-css-prefix}-mouse-pointer:before { content: $fa-var-mouse-pointer; }\n.#{$fa-css-prefix}-i-cursor:before { content: $fa-var-i-cursor; }\n.#{$fa-css-prefix}-object-group:before { content: $fa-var-object-group; }\n.#{$fa-css-prefix}-object-ungroup:before { content: $fa-var-object-ungroup; }\n.#{$fa-css-prefix}-sticky-note:before { content: $fa-var-sticky-note; }\n.#{$fa-css-prefix}-sticky-note-o:before { content: $fa-var-sticky-note-o; }\n.#{$fa-css-prefix}-cc-jcb:before { content: $fa-var-cc-jcb; }\n.#{$fa-css-prefix}-cc-diners-club:before { content: $fa-var-cc-diners-club; }\n.#{$fa-css-prefix}-clone:before { content: $fa-var-clone; }\n.#{$fa-css-prefix}-balance-scale:before { content: $fa-var-balance-scale; }\n.#{$fa-css-prefix}-hourglass-o:before { content: $fa-var-hourglass-o; }\n.#{$fa-css-prefix}-hourglass-1:before,\n.#{$fa-css-prefix}-hourglass-start:before { content: $fa-var-hourglass-start; }\n.#{$fa-css-prefix}-hourglass-2:before,\n.#{$fa-css-prefix}-hourglass-half:before { content: $fa-var-hourglass-half; }\n.#{$fa-css-prefix}-hourglass-3:before,\n.#{$fa-css-prefix}-hourglass-end:before { content: $fa-var-hourglass-end; }\n.#{$fa-css-prefix}-hourglass:before { content: $fa-var-hourglass; }\n.#{$fa-css-prefix}-hand-grab-o:before,\n.#{$fa-css-prefix}-hand-rock-o:before { content: $fa-var-hand-rock-o; }\n.#{$fa-css-prefix}-hand-stop-o:before,\n.#{$fa-css-prefix}-hand-paper-o:before { content: $fa-var-hand-paper-o; }\n.#{$fa-css-prefix}-hand-scissors-o:before { content: $fa-var-hand-scissors-o; }\n.#{$fa-css-prefix}-hand-lizard-o:before { content: $fa-var-hand-lizard-o; }\n.#{$fa-css-prefix}-hand-spock-o:before { content: $fa-var-hand-spock-o; }\n.#{$fa-css-prefix}-hand-pointer-o:before { content: $fa-var-hand-pointer-o; }\n.#{$fa-css-prefix}-hand-peace-o:before { content: $fa-var-hand-peace-o; }\n.#{$fa-css-prefix}-trademark:before { content: $fa-var-trademark; }\n.#{$fa-css-prefix}-registered:before { content: $fa-var-registered; }\n.#{$fa-css-prefix}-creative-commons:before { content: $fa-var-creative-commons; }\n.#{$fa-css-prefix}-gg:before { content: $fa-var-gg; }\n.#{$fa-css-prefix}-gg-circle:before { content: $fa-var-gg-circle; }\n.#{$fa-css-prefix}-tripadvisor:before { content: $fa-var-tripadvisor; }\n.#{$fa-css-prefix}-odnoklassniki:before { content: $fa-var-odnoklassniki; }\n.#{$fa-css-prefix}-odnoklassniki-square:before { content: $fa-var-odnoklassniki-square; }\n.#{$fa-css-prefix}-get-pocket:before { content: $fa-var-get-pocket; }\n.#{$fa-css-prefix}-wikipedia-w:before { content: $fa-var-wikipedia-w; }\n.#{$fa-css-prefix}-safari:before { content: $fa-var-safari; }\n.#{$fa-css-prefix}-chrome:before { content: $fa-var-chrome; }\n.#{$fa-css-prefix}-firefox:before { content: $fa-var-firefox; }\n.#{$fa-css-prefix}-opera:before { content: $fa-var-opera; }\n.#{$fa-css-prefix}-internet-explorer:before { content: $fa-var-internet-explorer; }\n.#{$fa-css-prefix}-tv:before,\n.#{$fa-css-prefix}-television:before { content: $fa-var-television; }\n.#{$fa-css-prefix}-contao:before { content: $fa-var-contao; }\n.#{$fa-css-prefix}-500px:before { content: $fa-var-500px; }\n.#{$fa-css-prefix}-amazon:before { content: $fa-var-amazon; }\n.#{$fa-css-prefix}-calendar-plus-o:before { content: $fa-var-calendar-plus-o; }\n.#{$fa-css-prefix}-calendar-minus-o:before { content: $fa-var-calendar-minus-o; }\n.#{$fa-css-prefix}-calendar-times-o:before { content: $fa-var-calendar-times-o; }\n.#{$fa-css-prefix}-calendar-check-o:before { content: $fa-var-calendar-check-o; }\n.#{$fa-css-prefix}-industry:before { content: $fa-var-industry; }\n.#{$fa-css-prefix}-map-pin:before { content: $fa-var-map-pin; }\n.#{$fa-css-prefix}-map-signs:before { content: $fa-var-map-signs; }\n.#{$fa-css-prefix}-map-o:before { content: $fa-var-map-o; }\n.#{$fa-css-prefix}-map:before { content: $fa-var-map; }\n.#{$fa-css-prefix}-commenting:before { content: $fa-var-commenting; }\n.#{$fa-css-prefix}-commenting-o:before { content: $fa-var-commenting-o; }\n.#{$fa-css-prefix}-houzz:before { content: $fa-var-houzz; }\n.#{$fa-css-prefix}-vimeo:before { content: $fa-var-vimeo; }\n.#{$fa-css-prefix}-black-tie:before { content: $fa-var-black-tie; }\n.#{$fa-css-prefix}-fonticons:before { content: $fa-var-fonticons; }\n.#{$fa-css-prefix}-reddit-alien:before { content: $fa-var-reddit-alien; }\n.#{$fa-css-prefix}-edge:before { content: $fa-var-edge; }\n.#{$fa-css-prefix}-credit-card-alt:before { content: $fa-var-credit-card-alt; }\n.#{$fa-css-prefix}-codiepie:before { content: $fa-var-codiepie; }\n.#{$fa-css-prefix}-modx:before { content: $fa-var-modx; }\n.#{$fa-css-prefix}-fort-awesome:before { content: $fa-var-fort-awesome; }\n.#{$fa-css-prefix}-usb:before { content: $fa-var-usb; }\n.#{$fa-css-prefix}-product-hunt:before { content: $fa-var-product-hunt; }\n.#{$fa-css-prefix}-mixcloud:before { content: $fa-var-mixcloud; }\n.#{$fa-css-prefix}-scribd:before { content: $fa-var-scribd; }\n.#{$fa-css-prefix}-pause-circle:before { content: $fa-var-pause-circle; }\n.#{$fa-css-prefix}-pause-circle-o:before { content: $fa-var-pause-circle-o; }\n.#{$fa-css-prefix}-stop-circle:before { content: $fa-var-stop-circle; }\n.#{$fa-css-prefix}-stop-circle-o:before { content: $fa-var-stop-circle-o; }\n.#{$fa-css-prefix}-shopping-bag:before { content: $fa-var-shopping-bag; }\n.#{$fa-css-prefix}-shopping-basket:before { content: $fa-var-shopping-basket; }\n.#{$fa-css-prefix}-hashtag:before { content: $fa-var-hashtag; }\n.#{$fa-css-prefix}-bluetooth:before { content: $fa-var-bluetooth; }\n.#{$fa-css-prefix}-bluetooth-b:before { content: $fa-var-bluetooth-b; }\n.#{$fa-css-prefix}-percent:before { content: $fa-var-percent; }\n.#{$fa-css-prefix}-gitlab:before { content: $fa-var-gitlab; }\n.#{$fa-css-prefix}-wpbeginner:before { content: $fa-var-wpbeginner; }\n.#{$fa-css-prefix}-wpforms:before { content: $fa-var-wpforms; }\n.#{$fa-css-prefix}-envira:before { content: $fa-var-envira; }\n.#{$fa-css-prefix}-universal-access:before { content: $fa-var-universal-access; }\n.#{$fa-css-prefix}-wheelchair-alt:before { content: $fa-var-wheelchair-alt; }\n.#{$fa-css-prefix}-question-circle-o:before { content: $fa-var-question-circle-o; }\n.#{$fa-css-prefix}-blind:before { content: $fa-var-blind; }\n.#{$fa-css-prefix}-audio-description:before { content: $fa-var-audio-description; }\n.#{$fa-css-prefix}-volume-control-phone:before { content: $fa-var-volume-control-phone; }\n.#{$fa-css-prefix}-braille:before { content: $fa-var-braille; }\n.#{$fa-css-prefix}-assistive-listening-systems:before { content: $fa-var-assistive-listening-systems; }\n.#{$fa-css-prefix}-asl-interpreting:before,\n.#{$fa-css-prefix}-american-sign-language-interpreting:before { content: $fa-var-american-sign-language-interpreting; }\n.#{$fa-css-prefix}-deafness:before,\n.#{$fa-css-prefix}-hard-of-hearing:before,\n.#{$fa-css-prefix}-deaf:before { content: $fa-var-deaf; }\n.#{$fa-css-prefix}-glide:before { content: $fa-var-glide; }\n.#{$fa-css-prefix}-glide-g:before { content: $fa-var-glide-g; }\n.#{$fa-css-prefix}-signing:before,\n.#{$fa-css-prefix}-sign-language:before { content: $fa-var-sign-language; }\n.#{$fa-css-prefix}-low-vision:before { content: $fa-var-low-vision; }\n.#{$fa-css-prefix}-viadeo:before { content: $fa-var-viadeo; }\n.#{$fa-css-prefix}-viadeo-square:before { content: $fa-var-viadeo-square; }\n.#{$fa-css-prefix}-snapchat:before { content: $fa-var-snapchat; }\n.#{$fa-css-prefix}-snapchat-ghost:before { content: $fa-var-snapchat-ghost; }\n.#{$fa-css-prefix}-snapchat-square:before { content: $fa-var-snapchat-square; }\n.#{$fa-css-prefix}-pied-piper:before { content: $fa-var-pied-piper; }\n.#{$fa-css-prefix}-first-order:before { content: $fa-var-first-order; }\n.#{$fa-css-prefix}-yoast:before { content: $fa-var-yoast; }\n.#{$fa-css-prefix}-themeisle:before { content: $fa-var-themeisle; }\n.#{$fa-css-prefix}-google-plus-circle:before,\n.#{$fa-css-prefix}-google-plus-official:before { content: $fa-var-google-plus-official; }\n.#{$fa-css-prefix}-fa:before,\n.#{$fa-css-prefix}-font-awesome:before { content: $fa-var-font-awesome; }\n.#{$fa-css-prefix}-handshake-o:before { content: $fa-var-handshake-o; }\n.#{$fa-css-prefix}-envelope-open:before { content: $fa-var-envelope-open; }\n.#{$fa-css-prefix}-envelope-open-o:before { content: $fa-var-envelope-open-o; }\n.#{$fa-css-prefix}-linode:before { content: $fa-var-linode; }\n.#{$fa-css-prefix}-address-book:before { content: $fa-var-address-book; }\n.#{$fa-css-prefix}-address-book-o:before { content: $fa-var-address-book-o; }\n.#{$fa-css-prefix}-vcard:before,\n.#{$fa-css-prefix}-address-card:before { content: $fa-var-address-card; }\n.#{$fa-css-prefix}-vcard-o:before,\n.#{$fa-css-prefix}-address-card-o:before { content: $fa-var-address-card-o; }\n.#{$fa-css-prefix}-user-circle:before { content: $fa-var-user-circle; }\n.#{$fa-css-prefix}-user-circle-o:before { content: $fa-var-user-circle-o; }\n.#{$fa-css-prefix}-user-o:before { content: $fa-var-user-o; }\n.#{$fa-css-prefix}-id-badge:before { content: $fa-var-id-badge; }\n.#{$fa-css-prefix}-drivers-license:before,\n.#{$fa-css-prefix}-id-card:before { content: $fa-var-id-card; }\n.#{$fa-css-prefix}-drivers-license-o:before,\n.#{$fa-css-prefix}-id-card-o:before { content: $fa-var-id-card-o; }\n.#{$fa-css-prefix}-quora:before { content: $fa-var-quora; }\n.#{$fa-css-prefix}-free-code-camp:before { content: $fa-var-free-code-camp; }\n.#{$fa-css-prefix}-telegram:before { content: $fa-var-telegram; }\n.#{$fa-css-prefix}-thermometer-4:before,\n.#{$fa-css-prefix}-thermometer:before,\n.#{$fa-css-prefix}-thermometer-full:before { content: $fa-var-thermometer-full; }\n.#{$fa-css-prefix}-thermometer-3:before,\n.#{$fa-css-prefix}-thermometer-three-quarters:before { content: $fa-var-thermometer-three-quarters; }\n.#{$fa-css-prefix}-thermometer-2:before,\n.#{$fa-css-prefix}-thermometer-half:before { content: $fa-var-thermometer-half; }\n.#{$fa-css-prefix}-thermometer-1:before,\n.#{$fa-css-prefix}-thermometer-quarter:before { content: $fa-var-thermometer-quarter; }\n.#{$fa-css-prefix}-thermometer-0:before,\n.#{$fa-css-prefix}-thermometer-empty:before { content: $fa-var-thermometer-empty; }\n.#{$fa-css-prefix}-shower:before { content: $fa-var-shower; }\n.#{$fa-css-prefix}-bathtub:before,\n.#{$fa-css-prefix}-s15:before,\n.#{$fa-css-prefix}-bath:before { content: $fa-var-bath; }\n.#{$fa-css-prefix}-podcast:before { content: $fa-var-podcast; }\n.#{$fa-css-prefix}-window-maximize:before { content: $fa-var-window-maximize; }\n.#{$fa-css-prefix}-window-minimize:before { content: $fa-var-window-minimize; }\n.#{$fa-css-prefix}-window-restore:before { content: $fa-var-window-restore; }\n.#{$fa-css-prefix}-times-rectangle:before,\n.#{$fa-css-prefix}-window-close:before { content: $fa-var-window-close; }\n.#{$fa-css-prefix}-times-rectangle-o:before,\n.#{$fa-css-prefix}-window-close-o:before { content: $fa-var-window-close-o; }\n.#{$fa-css-prefix}-bandcamp:before { content: $fa-var-bandcamp; }\n.#{$fa-css-prefix}-grav:before { content: $fa-var-grav; }\n.#{$fa-css-prefix}-etsy:before { content: $fa-var-etsy; }\n.#{$fa-css-prefix}-imdb:before { content: $fa-var-imdb; }\n.#{$fa-css-prefix}-ravelry:before { content: $fa-var-ravelry; }\n.#{$fa-css-prefix}-eercast:before { content: $fa-var-eercast; }\n.#{$fa-css-prefix}-microchip:before { content: $fa-var-microchip; }\n.#{$fa-css-prefix}-snowflake-o:before { content: $fa-var-snowflake-o; }\n.#{$fa-css-prefix}-superpowers:before { content: $fa-var-superpowers; }\n.#{$fa-css-prefix}-wpexplorer:before { content: $fa-var-wpexplorer; }\n.#{$fa-css-prefix}-meetup:before { content: $fa-var-meetup; }\n","// Screen Readers\n// -------------------------\n\n.sr-only { @include sr-only(); }\n.sr-only-focusable { @include sr-only-focusable(); }\n"]}]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names

module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== 'string') {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, '\\n'), "\"");
  }

  return url;
};

/***/ }),

/***/ "./node_modules/font-awesome/fonts/fontawesome-webfont.eot":
/*!*****************************************************************!*\
  !*** ./node_modules/font-awesome/fonts/fontawesome-webfont.eot ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "media/fonts/fontawesome-webfont-8b43027f.eot";

/***/ }),

/***/ "./node_modules/font-awesome/fonts/fontawesome-webfont.eot?v=4.7.0":
/*!*************************************************************************!*\
  !*** ./node_modules/font-awesome/fonts/fontawesome-webfont.eot?v=4.7.0 ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "media/fonts/fontawesome-webfont-8b43027f.eot";

/***/ }),

/***/ "./node_modules/font-awesome/fonts/fontawesome-webfont.svg?v=4.7.0":
/*!*************************************************************************!*\
  !*** ./node_modules/font-awesome/fonts/fontawesome-webfont.svg?v=4.7.0 ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "media/fonts/fontawesome-webfont-c1e38fd9.svg";

/***/ }),

/***/ "./node_modules/font-awesome/fonts/fontawesome-webfont.ttf?v=4.7.0":
/*!*************************************************************************!*\
  !*** ./node_modules/font-awesome/fonts/fontawesome-webfont.ttf?v=4.7.0 ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "media/fonts/fontawesome-webfont-1e59d233.ttf";

/***/ }),

/***/ "./node_modules/font-awesome/fonts/fontawesome-webfont.woff2?v=4.7.0":
/*!***************************************************************************!*\
  !*** ./node_modules/font-awesome/fonts/fontawesome-webfont.woff2?v=4.7.0 ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "media/fonts/fontawesome-webfont-20fd1704.woff2";

/***/ }),

/***/ "./node_modules/font-awesome/fonts/fontawesome-webfont.woff?v=4.7.0":
/*!**************************************************************************!*\
  !*** ./node_modules/font-awesome/fonts/fontawesome-webfont.woff?v=4.7.0 ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "media/fonts/fontawesome-webfont-f691f37e.woff";

/***/ }),

/***/ "./node_modules/font-awesome/scss/font-awesome.scss":
/*!**********************************************************!*\
  !*** ./node_modules/font-awesome/scss/font-awesome.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../css-loader/dist/cjs.js??ref--6-1!../../postcss-loader/src??ref--6-2!../../sass-loader/dist/cjs.js??ref--6-3!./font-awesome.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/font-awesome/scss/font-awesome.scss");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ })

}]);
//# sourceMappingURL=vendors~application~application_old~basic~google_analytics~pferdefutter~welcome-e1c15f92a4911b703673.chunk.js.map