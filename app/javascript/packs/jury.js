import Rails from "@rails/ujs"
import * as ActiveStorage from "@rails/activestorage"
import "channels"
import "bootstrap"
import "jquery"
import "packs/rating.js"
//import "jquery-ui/ui/widgets/datepicker.js"
//import "jquery-ui/themes/base/all.css"
//import "bootstrap-icons/font/bootstrap-icons.scss"
//import "bootstrap-icons/icons/check-circle-fill.svg"
//import "@fortawesome/fontawesome-free/scss/fontawesome.scss"
//import "@fortawesome/fontawesome-free/js/all.js"


Rails.start()
ActiveStorage.start()

window.jQuery = $;
window.$ = $;
