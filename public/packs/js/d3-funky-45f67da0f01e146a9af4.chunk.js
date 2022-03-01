(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["d3-funky"],{

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
    svg.append("foreignObject").attr("width", 480).attr("height", 500).append("xhtml:body").style("font", "14px 'Helvetica Neue'").html("<h1>An HTML Foreign Object in SVG</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu enim quam. Quisque nisi risus, sagittis quis tempor nec, aliquam eget neque. Nulla bibendum semper lorem non ullamcorper. Nulla non ligula lorem. Praesent porttitor, tellus nec suscipit aliquam, enim elit posuere lorem, at laoreet enim ligula sed tortor. Ut sodales, urna a aliquam semper, nibh diam gravida sapien, sit amet fermentum purus lacus eget massa. Donec ac arcu vel magna consequat pretium et vel ligula. Donec sit amet erat elit. Vivamus eu metus eget est hendrerit rutrum. Curabitur vitae orci et leo interdum egestas ut sit amet dui. In varius enim ut sem posuere in tristique metus ultrices.<p>Integer mollis massa at orci porta vestibulum. Pellentesque dignissim turpis ut tortor ultricies condimentum et quis nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod lorem vulputate dui pharetra luctus. Sed vulputate, nunc quis porttitor scelerisque, dui est varius ipsum, eu blandit mauris nibh pellentesque tortor. Vivamus ultricies ante eget ipsum pulvinar ac tempor turpis mollis. Morbi tortor orci, euismod vel sagittis ac, lobortis nec est. Quisque euismod venenatis felis at dapibus. Vestibulum dignissim nulla ut nisi tristique porttitor. Proin et nunc id arcu cursus dapibus non quis libero. Nunc ligula mi, bibendum non mattis nec, luctus id neque. Suspendisse ut eros lacus. Praesent eget lacus eget risus congue vestibulum. Morbi tincidunt pulvinar lacus sed faucibus. Phasellus sed vestibulum sapien.");
  };
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ })

},[["./app/javascript/packs/d3-funky.js","runtime~d3-funky","vendors~application~application_old~basic~chat~chattree~d3~d3-charts~d3-funky~google_analytics~old_c~9f4fd069"]]]);
//# sourceMappingURL=d3-funky-45f67da0f01e146a9af4.chunk.js.map