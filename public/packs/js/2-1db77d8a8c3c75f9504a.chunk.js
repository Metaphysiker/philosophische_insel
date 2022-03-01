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
function funkyButton(container_name, data) {
  this.container_name = container_name;
  this.container_class = "." + container_name;
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
    var width = $(this.container_class).width() - margin.left - margin.right; //var height = (this.data.length * 100) + 100 - margin.top - margin.bottom;

    var cta_width = $("#" + this.container_name + "_cta").width();
    var cta_height = $("#" + this.container_name + "_cta").height();
    var pitch_width = $("#" + this.container_name + "_pitch").width();
    var pitch_height = $("#" + this.container_name + "_pitch").height();
    var height = cta_width + pitch_height + margin.top + margin.bottom; // append the svg object to the body of the page

    var svg = d3.select(this.container_class).append("svg").attr("width", width).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(".concat(width / 2, ", ").concat(margin.top, ")"));
    svg.append("foreignObject").attr("x", -(cta_width / 3)).attr("y", margin.top) //.attr("width", $("#funky_button1_cta").width())
    //.attr("height", $("#funky_button1_cta").height())
    .attr("height", cta_height).attr("width", cta_width).append("xhtml:body").html("<div class=\"text-center\">\n                  <button type=\"button\" class=\"button2\">".concat(this.data.cta, "</button>\n                </div>"));
  };
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ })

}]);
//# sourceMappingURL=2-1db77d8a8c3c75f9504a.chunk.js.map