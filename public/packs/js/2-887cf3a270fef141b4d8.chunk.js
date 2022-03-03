(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./app/javascript/packs/d3-funky.js":
/*!******************************************!*\
  !*** ./app/javascript/packs/d3-funky.js ***!
  \******************************************/
/*! exports provided: funkyButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "funkyButton", function() { return funkyButton; });
function funkyButton(container_class, data) {
  this.container_class = container_class;
  this.data = data;
  this.empty_container = function () {
    $(this.container_class).empty();
  }, this.draw_chart = function () {
    this.empty_container();
    var margin = {
      top: 50,
      right: 50,
      bottom: 50,
      left: 50
    };
    var width = $(container_class).width() - margin.left - margin.right;
    var height = this.data.length * 100 + 100 - margin.top - margin.bottom; //var height = 500 - margin.top - margin.bottom;
    // append the svg object to the body of the page

    var svg = d3.select(this.container_class).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(".concat(margin.left, ", ").concat(margin.top, ")"));
    svg.append("foreignObject").attr("width", 480).attr("height", 500).append("xhtml:body").style("font", "14px 'Helvetica Neue'").html("<div class=\"text-center\">\n                  <button type=\"button\" class=\"button1\"><%= simple_format(@cta) %></button>\n                </div>\"");
  };
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ })

}]);
//# sourceMappingURL=2-887cf3a270fef141b4d8.chunk.js.map