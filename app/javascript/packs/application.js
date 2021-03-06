// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import * as ActiveStorage from "@rails/activestorage"
import "channels"
import "bootstrap"
import "jquery"
import "chosen-js/chosen.jquery.min.js"
import "packs/chat"
import "packs/animate_css"
//import "font-awesome/scss/font-awesome.scss"


import CodeMirror from 'codemirror/lib/codemirror.js'
import 'codemirror/mode/markdown/markdown.js'
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
import "chartkick/highcharts"

//import "animate.css/animate.min.css"
//import 'codemirror/lib/codemirror.css'
//import 'codemirror/theme/solarized.css'
//import "@fortawesome/fontawesome-free/css/all"
import "chosen-js/chosen.css"
//import "@fortawesome/fontawesome-free/css/all"

import "d3/dist/d3.js"
import "jquery-ui/ui/widgets/datepicker.js"

import "jquery-ui/themes/base/all.css"
import "bootstrap-icons/font/bootstrap-icons.css"


Rails.start()
ActiveStorage.start()

window.jQuery = $;
window.$ = $;
window.CodeMirror = CodeMirror;

//import * as d3Charts from "packs/d3-charts";
//window.d3Charts = d3Charts;

import("packs/d3-charts").then(d3Charts => {
  window.d3Charts = d3Charts;
})

import("packs/vegan_cockpit").then(veganCockpit => {
  window.veganCockpit = veganCockpit;
})



//window.Lazy = Lazy

//window.d3 = d3

require("jquery-lazy/jquery.lazy.js");

$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};
