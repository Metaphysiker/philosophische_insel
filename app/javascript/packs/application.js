// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import * as ActiveStorage from "@rails/activestorage"
import "channels"
import "bootstrap"
import "jquery"
import "@fortawesome/fontawesome-free/css/all"
import "chosen-js/chosen.css"
import "chosen-js/chosen.jquery.min.js"
import "packs/animate_css"
import "animate.css/animate.css"

Rails.start()
ActiveStorage.start()

window.jQuery = $;
window.$ = $;
