(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["application_old"],{

/***/ "./app/javascript/channels sync recursive _channel\\.js$":
/*!****************************************************!*\
  !*** ./app/javascript/channels sync _channel\.js$ ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "./app/javascript/channels sync recursive _channel\\.js$";

/***/ }),

/***/ "./app/javascript/channels/index.js":
/*!******************************************!*\
  !*** ./app/javascript/channels/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Load all the channels within this directory and all subdirectories.
// Channel files must be named *_channel.js.
var channels = __webpack_require__("./app/javascript/channels sync recursive _channel\\.js$");

channels.keys().forEach(channels);

/***/ }),

/***/ "./app/javascript/packs/animate_css.js":
/*!*********************************************!*\
  !*** ./app/javascript/packs/animate_css.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var animateCSS = function animateCSS(element, animation) {
  var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'animate__';
  return (// We create a Promise and return it
    new Promise(function (resolve, reject) {
      var animationName = "".concat(prefix).concat(animation);
      var node = document.querySelector(element);
      node.classList.add("".concat(prefix, "animated"), animationName); // When the animation ends, we clean the classes and resolve the Promise

      function handleAnimationEnd() {
        node.classList.remove("".concat(prefix, "animated"), animationName);
        node.removeEventListener('animationend', handleAnimationEnd);
        resolve('Animation ended');
      }

      node.addEventListener('animationend', handleAnimationEnd);
    })
  );
};

window.ANIMATECSS = animateCSS;

/***/ }),

/***/ "./app/javascript/packs/application_old.js":
/*!*************************************************!*\
  !*** ./app/javascript/packs/application_old.js ***!
  \*************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var _rails_ujs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rails/ujs */ "./node_modules/@rails/ujs/lib/assets/compiled/rails-ujs.js");
/* harmony import */ var _rails_ujs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rails_ujs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rails_activestorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @rails/activestorage */ "./node_modules/@rails/activestorage/app/assets/javascripts/activestorage.js");
/* harmony import */ var _rails_activestorage__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_rails_activestorage__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var channels__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! channels */ "./app/javascript/channels/index.js");
/* harmony import */ var channels__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(channels__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.esm.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var chosen_js_chosen_jquery_min_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! chosen-js/chosen.jquery.min.js */ "./node_modules/chosen-js/chosen.jquery.min.js");
/* harmony import */ var chosen_js_chosen_jquery_min_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(chosen_js_chosen_jquery_min_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var packs_chat__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! packs/chat */ "./app/javascript/packs/chat.js");
/* harmony import */ var packs_animate_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! packs/animate_css */ "./app/javascript/packs/animate_css.js");
/* harmony import */ var packs_animate_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(packs_animate_css__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var font_awesome_scss_font_awesome_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! font-awesome/scss/font-awesome.scss */ "./node_modules/font-awesome/scss/font-awesome.scss");
/* harmony import */ var font_awesome_scss_font_awesome_scss__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(font_awesome_scss_font_awesome_scss__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var codemirror_lib_codemirror_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! codemirror/lib/codemirror.js */ "./node_modules/codemirror/lib/codemirror.js");
/* harmony import */ var codemirror_lib_codemirror_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(codemirror_lib_codemirror_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var codemirror_mode_markdown_markdown_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! codemirror/mode/markdown/markdown.js */ "./node_modules/codemirror/mode/markdown/markdown.js");
/* harmony import */ var codemirror_mode_markdown_markdown_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(codemirror_mode_markdown_markdown_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var chartkick_highcharts__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! chartkick/highcharts */ "./node_modules/chartkick/highcharts/highcharts.esm.js");
/* harmony import */ var chosen_js_chosen_css__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! chosen-js/chosen.css */ "./node_modules/chosen-js/chosen.css");
/* harmony import */ var chosen_js_chosen_css__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(chosen_js_chosen_css__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var d3_dist_d3_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! d3/dist/d3.js */ "./node_modules/d3/dist/d3.js");
/* harmony import */ var jquery_ui_ui_widgets_datepicker_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! jquery-ui/ui/widgets/datepicker.js */ "./node_modules/jquery-ui/ui/widgets/datepicker.js");
/* harmony import */ var jquery_ui_ui_widgets_datepicker_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(jquery_ui_ui_widgets_datepicker_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var jquery_ui_themes_base_all_css__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! jquery-ui/themes/base/all.css */ "./node_modules/jquery-ui/themes/base/all.css");
/* harmony import */ var jquery_ui_themes_base_all_css__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(jquery_ui_themes_base_all_css__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var bootstrap_icons_font_bootstrap_icons_css__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! bootstrap-icons/font/bootstrap-icons.css */ "./node_modules/bootstrap-icons/font/bootstrap-icons.css");
/* harmony import */ var bootstrap_icons_font_bootstrap_icons_css__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(bootstrap_icons_font_bootstrap_icons_css__WEBPACK_IMPORTED_MODULE_16__);
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.







 //import "font-awesome/css/font-awesome.min.css"

 //import { Personyxz } from "packs/d3_objects"


 //import "@fortawesome/fontawesome-free/css/all"
//import * as d3 from "d3/dist/d3.js"
//css
//import "animate.css/animate.min.css"
//import 'codemirror/lib/codemirror.css'
//import 'codemirror/theme/solarized.css'
//import "@fortawesome/fontawesome-free/css/all.css"
//import "chosen-js/chosen.css"
//import "chosen-js/chosen-sprite.png"
//import "chartkick/chart.js"

 //import "animate.css/animate.min.css"
//import 'codemirror/lib/codemirror.css'
//import 'codemirror/theme/solarized.css'
//import "@fortawesome/fontawesome-free/css/all"

 //import "@fortawesome/fontawesome-free/css/all"





_rails_ujs__WEBPACK_IMPORTED_MODULE_0___default.a.start();
_rails_activestorage__WEBPACK_IMPORTED_MODULE_1__["start"]();
window.jQuery = $;
window.$ = $;
window.CodeMirror = codemirror_lib_codemirror_js__WEBPACK_IMPORTED_MODULE_9___default.a; //import * as d3Charts from "packs/d3-charts";
//window.d3Charts = d3Charts;

__webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! packs/d3-charts */ "./app/javascript/packs/d3-charts.js")).then(function (d3Charts) {
  window.d3Charts = d3Charts;
});
__webpack_require__.e(/*! import() */ 1).then(__webpack_require__.bind(null, /*! packs/vegan_cockpit */ "./app/javascript/packs/vegan_cockpit.js")).then(function (veganCockpit) {
  window.veganCockpit = veganCockpit;
}); //window.Lazy = Lazy
//window.d3 = d3

__webpack_require__(/*! jquery-lazy/jquery.lazy.js */ "./node_modules/jquery-lazy/jquery.lazy.js");

$.fn.isInViewport = function () {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();
  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();
  return elementBottom > viewportTop && elementTop < viewportBottom;
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./app/javascript/packs/chat.js":
/*!**************************************!*\
  !*** ./app/javascript/packs/chat.js ***!
  \**************************************/
/*! exports provided: Chat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Chat", function() { return Chat; });
function Chat(container) {
  this.container = container, this.container_class = "." + this.container, this.loading_box = this.container + "_loading_box", this.loading_box_class = "." + this.loading_box, this.waiting_time_for_next_message = 1000, this.start = function () {
    var self = this;
    this.get_chat_message(1).then(function (data) {
      return self.append_message_left(data);
    }).then(function (data) {
      return $(".chat_message_" + data.id).html(data.content);
    });
  }, this.get_chat_message = function (id) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        method: "GET",
        url: "/chat_messages/" + id + "/json"
      }).done(function (data) {
        resolve(data);
      });
    });
  }, this.append_loading_box = function () {
    $(this.container_class).append("\n      <div class=\"".concat(this.loading_box, " chat-bg-computer chat-text chat-argument-field\">\n        <div class=\"lds-ellipsis\"><div></div><div></div><div></div><div></div></div>\n      </div>\n    "));
  }, this.remove_loading_box = function () {
    $(this.loading_box_class).remove();
  }, this.append_message_left = function (data) {
    var self = this;
    return new Promise(function (resolve, reject) {
      $(self.container_class).append("\n      <div class=\"chat-section-field\">\n        <div class=\"row\">\n            <div class=\"col-12 d-flex align-items-end\">\n              <div class=\"\" style=\"padding-right: 0.5rem;\">\n                <img src=\"".concat(data.image_url, "\" class=\"rounded-circle border-white white-border-for-rounded-circle bg-white\" width=\"50px\" height=\"50px\">\n              </div>\n              <div class=\"chat-bg-computer chat-text chat-argument-field chat_message_").concat(data.id, "\">\n                <div class=\"lds-ellipsis\"><div></div><div></div><div></div><div></div></div>\n              </div>\n            </div>\n        </div>\n      </div>\n      "));
      resolve(data);
    });
  };
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ })

},[["./app/javascript/packs/application_old.js","runtime~application_old","vendors~application~application_old~basic~chat~d3-charts~google_analytics~old_chat~pferdefutter~vega~6725d034","vendors~application~application_old~basic~google_analytics~pferdefutter~vegan_chat~welcome","vendors~application~application_old~basic~google_analytics~pferdefutter~vegan_chat","vendors~application~application_old~google_analytics~pferdefutter","vendors~application~application_old~basic~google_analytics","vendors~application~application_old~visits","vendors~application~application_old~vegan_chat","vendors~application~application_old~google_analytics","vendors~application~application_old"]]]);
//# sourceMappingURL=application_old-58a0f1f984a6b5684bc5.chunk.js.map