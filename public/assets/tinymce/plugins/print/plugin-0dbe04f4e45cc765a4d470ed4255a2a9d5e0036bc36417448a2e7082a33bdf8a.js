!function(){"use strict";var n=tinymce.util.Tools.resolve("tinymce.PluginManager"),t=tinymce.util.Tools.resolve("tinymce.Env");n.add("print",function(n){function i(){return r.execCommand("mcePrint")}var e,r;(e=n).addCommand("mcePrint",function(){t.browser.isIE()?e.getDoc().execCommand("print",!1,null):e.getWin().print()}),(r=n).ui.registry.addButton("print",{icon:"print",tooltip:"Print",onAction:i}),r.ui.registry.addMenuItem("print",{text:"Print...",icon:"print",onAction:i}),n.addShortcut("Meta+P","","mcePrint")})}();