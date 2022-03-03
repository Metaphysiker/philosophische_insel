(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["old_chat"],{

/***/ "./app/javascript/packs/old_chat.js":
/*!******************************************!*\
  !*** ./app/javascript/packs/old_chat.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {window.CHAT = function () {
  var my_var = 10; //shared variable available only inside your module

  var _animateCSS = function animateCSS(element, animation) {
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

  function bar() {
    // this function not available outside your module
    alert(my_var); // this function can access my_var
  }

  return {
    get_button_with_ajax: function get_button_with_ajax(id) {
      $.ajax({
        url: "/vegan_chat/get_button/" + id,
        method: 'POST',
        headers: {
          'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
        }
      });
    },
    get_message_with_ajax: function get_message_with_ajax(id) {
      $.ajax({
        url: "/vegan_chat/get_message/" + id,
        method: 'POST',
        headers: {
          'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
        }
      });
    },
    get_video_with_ajax: function get_video_with_ajax(id) {
      $.ajax({
        url: "/vegan_chat/get_video/" + id,
        method: 'POST',
        headers: {
          'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
        }
      });
    },
    remove_button: function remove_button(element) {
      //var element = ".chat-select-button-" + id;
      _animateCSS(element, 'bounceOut').then(function (message) {
        $(element).remove(); //$(element).empty();
      });
    },
    loading_time_for_chat_message: 600,
    animateCSS: function animateCSS(element, animation) {
      _animateCSS(element, animation);
    }
  };
}();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ })

},[["./app/javascript/packs/old_chat.js","runtime~old_chat","vendors~application~application_old~basic~chat~chattree~d3~d3-charts~google_analytics~old_chat~pferd~ae13cc83"]]]);
//# sourceMappingURL=old_chat-e1af8687598c48389454.chunk.js.map