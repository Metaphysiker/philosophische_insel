(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chat"],{

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
  this.container = container, this.container_class = "." + container, this.start = function () {
    $(this.container_class).append("start");
  }, this.append_message_left = function () {
    $(this.container_class).append("\n      <p class=\"text-center\">\n        Epicness!\n      </p>\n      ");
  };
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ })

},[["./app/javascript/packs/chat.js","runtime~chat","vendors~application~application_old~basic~chat~d3-charts~google_analytics~old_chat~pferdefutter~vega~6725d034"]]]);
//# sourceMappingURL=chat-a60b4d24f6d3b91f05bf.chunk.js.map