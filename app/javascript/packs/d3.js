import Rails from "@rails/ujs"
import * as ActiveStorage from "@rails/activestorage"
import "channels"
import "bootstrap"
import "jquery"
import "d3/dist/d3.js"
<<<<<<< HEAD
import "packs/animate_css"

=======
>>>>>>> e688089a1583066495ddb6ac049dc8f795bc883c
//import "bootstrap-icons/font/bootstrap-icons.scss"

Rails.start()
ActiveStorage.start()

window.jQuery = $;
window.$ = $;


$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};
<<<<<<< HEAD
=======

import("packs/d3-funky").then(d3Funky => {
  window.d3Funky = d3Funky;
})
>>>>>>> e688089a1583066495ddb6ac049dc8f795bc883c
