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
  this.container = container, this.container_class = "." + this.container, this.loading_box = this.container + "_loading_box", this.loading_box_class = "." + this.loading_box, this.waiting_time_for_next_message = 1000, this.loading_time = 1000, this.calculate_reading_time = function (string) {
    return 2000 + string.length * 50;
  }, this.calculate_loading_time = function (string) {
    return 1000; //+ string.length * 25
  }, this.add_left_chat_message = function (data) {
    var self = this;
    self.append_loading_box_left(data).then(function (data) {
      return self.append_message_to_box(data);
    }).then(function (data) {
      return setTimeout(function () {
        self.chat_messages_controller(data.children[0].id);
      }, self.calculate_reading_time(data.content));
    });
  }, this.add_left_chat_message = function (data) {
    var self = this;
    self.append_loading_box_right(data).then(function (data) {
      return self.append_message_to_box(data);
    }).then(function (data) {
      return setTimeout(function () {
        self.chat_messages_controller(data.children[0].id);
      }, self.calculate_reading_time(data.content));
    });
  }, this.chat_messages_controller = function (id) {
    var self = this;
    self.get_chat_message(id).then(function (data) {
      self.append_message_to_box(data);

      if (data["chatter"] === "computer") {
        self.add_left_chat_message(data);
      } else {
        self.add_buttons(data["siblings"]);
      }
    });
  }, this.log = function () {
    console.log("OOOOGOGOGIJAOGAG");
  }, this.remove_buttons = function () {
    return new Promise(function (resolve, reject) {
      $(".chat-buttons-parent").empty();
      resolve();
    });
  }, this.add_buttons = function (children) {
    var self = this;
    var html_buttons = "";

    for (var i = 0; i < children.length; i++) {
      html_buttons += "<button class=\"btn btn-light chat-buttons\" data-chat-message-id=\"".concat(children[i].id, "\" type=\"button\">").concat(children[i].content, "</button>");
    }

    return new Promise(function (resolve, reject) {
      $(self.container_class).append("\n      <div class=\"d-grid gap-4 col-6 mx-auto chat-buttons-parent\">\n        ".concat(html_buttons, "\n      </div>\n      "));
      $(".chat-buttons").click(function () {
        var _this = this;

        console.log($(this).data("chat-message-id"));
        self.remove_buttons().then(function (data) {
          return self.add_right_chat_message($(_this).data("chat-message-id"));
        });
      });
      resolve(children);
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

},[["./app/javascript/packs/chat.js","runtime~chat","vendors~application~application_old~basic~chat~d3-charts~google_analytics~old_chat~pferdefutter~vega~6725d034"]]]);
//# sourceMappingURL=chat-58b4214ec81db8061604.chunk.js.map