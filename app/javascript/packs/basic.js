import Rails from "@rails/ujs"
import * as ActiveStorage from "@rails/activestorage"
import "channels"
import "font-awesome/scss/font-awesome.scss"
import "font-awesome/css/font-awesome.css"
import "bootstrap"
import "jquery"
import "jquery-ui/ui/widgets/datepicker.js"
import "jquery-ui/themes/base/all.css"
import "bootstrap-icons/font/bootstrap-icons.css"

Rails.start()
ActiveStorage.start()

window.jQuery = $;
window.$ = $;
