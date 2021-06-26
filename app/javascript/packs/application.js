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
import CodeMirror from 'codemirror/lib/codemirror.js'
import 'codemirror/mode/markdown/markdown.js'

//css
import "animate.css/animate.min.css"
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/solarized.css'
import "@fortawesome/fontawesome-free/css/all.css"
import "chosen-js/chosen.css"
import "chosen-js/chosen-sprite.png"


//import "animate.css/animate.min.css"
//import 'codemirror/lib/codemirror.css'
//import 'codemirror/theme/solarized.css'
//import "@fortawesome/fontawesome-free/css/all"
//import "chosen-js/chosen.css"
//import "@fortawesome/fontawesome-free/css/all"


Rails.start()
ActiveStorage.start()

window.jQuery = $;
window.$ = $;
window.CodeMirror = CodeMirror;
