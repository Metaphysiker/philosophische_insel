import Rails from "@rails/ujs"
import * as ActiveStorage from "@rails/activestorage"
import "channels"
import "bootstrap"
import "font-awesome/scss/font-awesome.scss"

Rails.start()
ActiveStorage.start()

window.jQuery = $;
window.$ = $;
