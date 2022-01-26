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
  this.container = container, this.container_class = "." + this.container, this.loading_box = this.container + "_loading_box", this.loading_box_class = "." + this.loading_box, this.waiting_time_for_next_message = 1000, this.start = function () {
    $(this.container_class).append("start");
  }, this.append_loading_box = function () {
    $(this.container_class).append("\n      <div class=\"".concat(this.loading_box, " chat-bg-computer chat-text chat-argument-field\">\n        <div class=\"lds-ellipsis\"><div></div><div></div><div></div><div></div></div>\n      </div>\n    "));
  }, this.remove_loading_box = function () {
    setTimeout(function () {
      console.log(this.loading_box_class);
      $(this.loading_box_class).remove();
    }, 5000);
  }, this.append_message_left = function () {
    $(this.container_class).append("\n      <div class=\"chat-section-field\">\n        <div class=\"row\">\n            <div class=\"col-12 d-flex align-items-end\">\n              <div class=\"\" style=\"padding-right: 0.5rem;\">\n                <%= image_tag \"portrait_frau.png\", class: \"rounded-circle border-white white-border-for-rounded-circle bg-white\", width: \"50px\", height: \"50px\" %>\n              </div>\n              <div class=\"chat-bg-computer chat-text chat-argument-field <%= dom_id(chat_message) %>\">\n                <div class=\"lds-ellipsis\"><div></div><div></div><div></div><div></div></div>\n              </div>\n            </div>\n        </div>\n      </div>\n      ");
  };
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ })

},[["./app/javascript/packs/chat.js","runtime~chat","vendors~application~application_old~basic~chat~d3-charts~google_analytics~old_chat~pferdefutter~vega~6725d034"]]]);
//# sourceMappingURL=chat-e18add8fe57202437de7.chunk.js.map