(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chattree"],{

/***/ "./app/javascript/packs/chattree.js":
/*!******************************************!*\
  !*** ./app/javascript/packs/chattree.js ***!
  \******************************************/
/*! exports provided: ChatTree */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatTree", function() { return ChatTree; });
function ChatTree(container) {
  this.container = container, this.container_class = "." + this.container, this.chat_messages_controller = function (id) {
    var self = this;
    self.get_chat_message(id).then(function (data) {
      self.append_message_to_box(data);

      if (data["chatter"] === "computer") {
        self.add_left_chat_message(data);
      } else {
        self.add_buttons(data["siblings"]);
      }
    });
  }, this.append_loading_box_left = function (data) {
    var self = this;
    return new Promise(function (resolve, reject) {
      $(self.container_class).append("\n      <div class=\"chat-section-field\">\n        <div class=\"row\">\n            <div class=\"col-12 d-flex align-items-end\">\n              <div class=\"\" style=\"padding-right: 0.5rem;\">\n                <img src=\"".concat(data.image_url, "\" class=\"rounded-circle border-white white-border-for-rounded-circle bg-white\" width=\"50px\" height=\"50px\">\n              </div>\n              <div class=\"chat-bg-computer chat-text chat-argument-field chat_message_").concat(data.id, "\">\n                <div class=\"lds-ellipsis\"><div></div><div></div><div></div><div></div></div>\n              </div>\n            </div>\n        </div>\n      </div>\n      "));
      resolve(data);
    });
  }, this.append_loading_box_right = function (data) {
    var self = this;
    return new Promise(function (resolve, reject) {
      $(self.container_class).append("\n      <div class=\"chat-section-field\">\n        <div class=\"row\">\n            <div class=\"col-12 d-flex align-items-end justify-content-end\">\n              <div class=\"chat-bg-computer chat-text chat-argument-field chat_message_".concat(data.id, "\">\n                <div class=\"lds-ellipsis\"><div></div><div></div><div></div><div></div></div>\n              </div>\n              <div class=\"\" style=\"padding-left: 0.5rem;\">\n                <img src=\"").concat(data.image_url, "\" class=\"rounded-circle border-white white-border-for-rounded-circle bg-white\" width=\"50px\" height=\"50px\">\n              </div>\n            </div>\n        </div>\n      </div>\n      "));
      resolve(data);
    });
  }, this.append_message_to_box = function (data) {
    var self = this;
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        $(".chat_message_" + data.id).html(data.content);
        resolve(data);
      }, self.calculate_loading_time(data.content));
    });
  }, this.start = function () {
    var self = this;
    self.chat_messages_controller(1);
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

},[["./app/javascript/packs/chattree.js","runtime~chattree","vendors~application~application_old~basic~chat~chattree~d3-charts~d3-funky~google_analytics~old_chat~764f9e49"]]]);
//# sourceMappingURL=chattree-32a6a90bbe8227f92d46.chunk.js.map