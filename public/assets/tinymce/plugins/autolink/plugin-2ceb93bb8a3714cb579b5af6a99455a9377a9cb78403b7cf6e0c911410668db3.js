!function(){"use strict";function e(e){return/^[(\[{ \u00a0]$/.test(e)}function t(e){return 3===e.nodeType}function n(e){return 1===e.nodeType}function o(e,n){var o;return 0>n&&(n=0),!t(e)||(o=e.data.length)<n&&(n=o),n}function i(e,t,i){!n(t)||t.hasChildNodes()?e.setStart(t,o(t,i)):e.setStartBefore(t)}function r(e,t,i){!n(t)||t.hasChildNodes()?e.setEnd(t,o(t,i)):e.setEndAfter(t)}function a(n,o){var a,d,s,l,u,c=n.getParam("autolink_pattern",f),g=n.getParam("default_link_target",!1);if(null===n.dom.getParent(n.selection.getNode(),"a[href]")){var h=n.selection.getRng().cloneRange();if(h.startOffset<5){if(!(l=h.endContainer.previousSibling)){if(!h.endContainer.firstChild||!h.endContainer.firstChild.nextSibling)return;l=h.endContainer.firstChild.nextSibling}if(i(h,l,u=l.length),r(h,l,u),h.endOffset<5)return;a=h.endOffset,d=l}else{if(!t(d=h.endContainer)&&d.firstChild){for(;!t(d)&&d.firstChild;)d=d.firstChild;t(d)&&(i(h,d,0),r(h,d,d.nodeValue.length))}a=1===h.endOffset?2:h.endOffset-1-o}for(var C=a;i(h,d,a>=2?a-2:0),r(h,d,a>=1?a-1:0),--a,!e(h.toString())&&a-2>=0;);e(h.toString())?(i(h,d,a),r(h,d,C),a+=1):(0===h.startOffset?i(h,d,0):i(h,d,a),r(h,d,C)),m=h.toString(),/[?!,.;:]/.test(m.charAt(m.length-1))&&r(h,d,C-1);var m,k,v,w,y=(m=h.toString().trim()).match(c),A=n.getParam("link_default_protocol","http","string");y&&((v=k=y[0]).length>=(w="www.").length&&v.substr(0,0+w.length)===w?k=A+"://"+k:-1===k.indexOf("@")||/^([A-Za-z][A-Za-z\d.+-]*:\/\/)|mailto:/.test(k)||(k="mailto:"+k),s=n.selection.getBookmark(),n.selection.setRng(h),n.execCommand("createlink",!1,k),!1!==g&&n.dom.setAttrib(n.selection.getNode(),"target",g),n.selection.moveToBookmark(s),n.nodeChanged())}}var d=tinymce.util.Tools.resolve("tinymce.PluginManager"),s=tinymce.util.Tools.resolve("tinymce.Env"),f=new RegExp("^"+/(?:[A-Za-z][A-Za-z\d.+-]{0,14}:\/\/(?:[-.~*+=!&;:'%@?^${}(),\w]+@)?|www\.|[-;:&=+$,.\w]+@)[A-Za-z\d-]+(?:\.[A-Za-z\d-]+)*(?::\d+)?(?:\/(?:[-+~=.,%()\/\w]*[-+~=%()\/\w])?)?(?:\?(?:[-.~*+=!&;:'%@?^${}(),\/\w]+))?(?:#(?:[-.~*+=!&;:'%@?^${}(),\/\w]+))?/g.source+"$","i");d.add("autolink",function(e){var t,n;(t=e).on("keydown",function(e){return 13===e.keyCode?a(t,-1):void 0}),s.browser.isIE()?t.on("focus",function(){if(!n){n=!0;try{t.execCommand("AutoUrlDetect",!1,!0)}catch(e){}}}):(t.on("keypress",function(e){return 41===e.keyCode||93===e.keyCode||125===e.keyCode?a(t,-1):void 0}),t.on("keyup",function(e){return 32===e.keyCode?a(t,0):void 0}))})}();