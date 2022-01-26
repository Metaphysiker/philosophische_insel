import Rails from "@rails/ujs"
import * as ActiveStorage from "@rails/activestorage"
import "channels"
import "bootstrap"
import "jquery"
import "chosen-js/chosen.jquery.min.js"
import * as Chat from "packs/chat"
import "packs/animate_css"
import "font-awesome/scss/font-awesome.scss"
import "bootstrap-icons/font/bootstrap-icons.css"

Rails.start()
ActiveStorage.start()

window.jQuery = $;
window.$ = $;
window.Chat = Chat;
