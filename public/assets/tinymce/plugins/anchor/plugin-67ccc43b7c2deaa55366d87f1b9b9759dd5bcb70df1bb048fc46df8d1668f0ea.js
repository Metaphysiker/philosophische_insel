!function(){"use strict";function e(e){return e.getAttribute("id")||e.getAttribute("name")||""}function t(t){return t&&"a"===t.nodeName.toLowerCase()&&!t.getAttribute("href")&&""!==e(t)}function n(e){return e.dom.getParent(e.selection.getStart(),c)}function o(e,o){var a,r,c,d,u,s=n(e);s?(c=e,d=o,(u=s).removeAttribute("name"),u.id=d,c.addVisual(),c.undoManager.add()):(r=o,(a=e).undoManager.transact((function(){var e,n;a.getParam("allow_html_in_named_anchor",!1,"boolean")||a.selection.collapse(!0),a.selection.isCollapsed()?a.insertContent(a.dom.createHTML("a",{id:r})):(n=(e=a).dom,i(n).walk(e.selection.getRng(),(function(e){l.each(e,(function(e){var o;t(o=e)&&!o.firstChild&&n.remove(e,!1)}))})),a.formatter.remove("namedAnchor",null,null,!0),a.formatter.apply("namedAnchor",{value:r}),a.addVisual())}))),e.focus()}function a(e){return function(t){for(var n,o=0;o<t.length;o++){var a=t[o],r=void 0;!(r=n=a)||r.attr("href")||!r.attr("id")&&!r.attr("name")||n.firstChild||a.attr("contenteditable",e)}}}var r=tinymce.util.Tools.resolve("tinymce.PluginManager"),i=tinymce.util.Tools.resolve("tinymce.dom.RangeUtils"),l=tinymce.util.Tools.resolve("tinymce.util.Tools"),c="a:not([href])";r.add("anchor",(function(r){var i,l,d;(i=r).on("PreInit",(function(){i.parser.addNodeFilter("a",a("false")),i.serializer.addNodeFilter("a",a(null))})),(l=r).addCommand("mceAnchor",(function(){var t,a,r;r=(a=n(t=l))?e(a):"",t.windowManager.open({title:"Anchor",size:"normal",body:{type:"panel",items:[{name:"id",type:"input",label:"ID",placeholder:"example"}]},buttons:[{type:"cancel",name:"cancel",text:"Cancel"},{type:"submit",name:"save",text:"Save",primary:!0}],initialData:{id:r},onSubmit:function(e){var n=t,a=e.getData().id;(/^[A-Za-z][A-Za-z0-9\-:._]*$/.test(a)?(o(n,a),0):(n.windowManager.alert("Id should start with a letter, followed only by letters, numbers, dashes, dots, colons or underscores."),1))||e.close()}})})),(d=r).ui.registry.addToggleButton("anchor",{icon:"bookmark",tooltip:"Anchor",onAction:function(){return d.execCommand("mceAnchor")},onSetup:function(e){return d.selection.selectorChangedWithUnbind("a:not([href])",e.setActive).unbind}}),d.ui.registry.addMenuItem("anchor",{icon:"bookmark",text:"Anchor...",onAction:function(){return d.execCommand("mceAnchor")}}),r.on("PreInit",(function(){r.formatter.register("namedAnchor",{inline:"a",selector:c,remove:"all",split:!0,deep:!0,attributes:{id:"%value"},onmatch:t})}))}))}();