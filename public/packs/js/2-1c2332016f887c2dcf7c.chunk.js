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

    var height = 500 - margin.top - margin.bottom;
    var cta_width = $("#funky_button1_cta").width();
    var cta_height = $("#funky_button1_cta").height(); // append the svg object to the body of the page

    var svg = d3.select(this.container_class).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(".concat(width / 2, ", ").concat(margin.top, ")"));
    svg.append("foreignObject").attr("x", -(cta_width / 2)).attr("y", 0) //.attr("width", $("#funky_button1_cta").width())
    //.attr("height", $("#funky_button1_cta").height())
    .attr("height", cta_height).attr("width", cta_width).append("xhtml:body").html("<div class=\"text-center\">\n                  <button type=\"button\" class=\"button2\">".concat(this.data.cta, "</button>\n                </div>"));
  };
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ })

}]);
//# sourceMappingURL=2-1c2332016f887c2dcf7c.chunk.js.map