!function(){"use strict";function e(e){var t=e;return{get:function(){return t},set:function(e){t=e}}}function t(e){return function(t){return r=typeof(n=t),(null===n?"null":"object"==r&&(Array.prototype.isPrototypeOf(n)||n.constructor&&"Array"===n.constructor.name)?"array":"object"==r&&(String.prototype.isPrototypeOf(n)||n.constructor&&"String"===n.constructor.name)?"string":r)===e;var n,r}}function n(e){return function(t){return typeof t===e}}function r(){}function o(e){return function(){return e}}function i(e){return e}function a(){return ee}function c(e){return e()}function u(e,t){for(var n=e.length,r=new Array(n),o=0;n>o;o++){var i=e[o];r[o]=t(i,o)}return r}function l(e,t){for(var n=0,r=e.length;r>n;n++)t(e[n],n)}function s(e,t){for(var n=e.length-1;n>=0;n--)t(e[n],n)}function f(e,t){return function(e){for(var t=[],n=0,r=e.length;r>n;++n){if(!K(e[n]))throw new Error("Arr.flatten item "+n+" was not an array, input: "+e);ce.apply(t,e[n])}return t}(u(e,t))}function d(e,t){return ue.call(e,t)}function m(e,t,n){!function(e,t,n){if(!(G(n)||J(n)||Q(n)))throw console.error("Invalid call to Attribute.set. Key ",t,":: Value ",n,":: Element ",e),new Error("Attribute value was not simple");e.setAttribute(t,n+"")}(e.dom,t,n)}function h(e,t){return{element:e,offset:t}}function g(e,t){var n,r;n=e,r=t,ne.from(n.dom.parentNode).map(fe.fromDom).each(function(e){e.dom.insertBefore(r.dom,n.dom)}),t.dom.appendChild(e.dom)}function p(e){return de.get(e)}function v(e,t){return e.isBlock(t)||d(e.schema.getShortEndedElements(),t.nodeName)}function y(e,t){return"false"===e.getContentEditable(t)}function x(e,t){return!e.isBlock(t)&&d(e.schema.getWhiteSpaceElements(),t.nodeName)}function b(){return{sOffset:0,fOffset:0,elements:[]}}function w(e,t){return n=fe.fromDom(e),r=t,0<(o=u(n.dom.childNodes,fe.fromDom)).length&&r<o.length?h(o[r],0):h(n,r);var n,r,o}function O(e,t,n,r,o,i){for(var a=(i=void 0===i||i)?t(!1):n;a;){var c=y(e,a);if(c||x(e,a)){if(c?r.cef(a):r.boundary(a))break;a=t(!0)}else{if(v(e,a)){if(r.boundary(a))break}else 3===a.nodeType&&r.text(a);if(a===o)break;a=t(!1)}}}function C(e,t,n,r,o){var i,a,c,u,l,s;v(i=e,a=n)||y(i,a)||x(i,a)||"true"===(c=i).getContentEditable(u=a)&&"false"===c.getContentEditableParent(u.parentNode)||(l=e.getParent(r,e.isBlock),s=new me(n,l),O(e,(o?s.next:s.prev).bind(s),n,{boundary:Y,cef:Y,text:function(e){o?t.fOffset+=e.length:t.sOffset+=e.length,t.elements.push(fe.fromDom(e))}}))}function T(e,t,n,r,o,i){function a(){return 0<l.elements.length&&(u.push(l),l=b()),!1}void 0===i&&(i=!0);var c=new me(n,t),u=[],l=b();return C(e,l,n,t,!1),O(e,c.next.bind(c),n,{boundary:a,cef:function(e){return a(),o&&u.push.apply(u,o.cef(e)),!1},text:function(e){l.elements.push(fe.fromDom(e)),o&&o.text(e,l)}},r,i),r&&C(e,l,r,t,!0),a(),u}function E(e,t){var n=w(t.startContainer,t.startOffset),r=n.element.dom,o=w(t.endContainer,t.endOffset),i=o.element.dom;return T(e,t.commonAncestorContainer,r,i,{text:function(e,t){e===i?t.fOffset+=e.length-o.offset:e===r&&(t.sOffset+=n.offset)},cef:function(t){var n,r,o,i,a,c=f((r=fe.fromDom(t),o="*[contenteditable=true]",1!==(i=a=void 0===r?document:r.dom).nodeType&&9!==i.nodeType&&11!==i.nodeType||0===i.childElementCount?[]:u(a.querySelectorAll(o),fe.fromDom)),function(t){var n=t.dom;return T(e,n,n)}),l=function(e,t){return n=e.elements[0].dom,r=t.elements[0].dom,o=Node.DOCUMENT_POSITION_PRECEDING,0!=(n.compareDocumentPosition(r)&o)?1:-1;var n,r,o};return(n=ae.call(c,0)).sort(l),n}},!1)}function N(e,t){return t.collapsed?[]:E(e,t)}function k(e,t){var n=e.createRng();return n.selectNode(t),N(e,n)}function S(e,t){return f(t,function(t){var n,r,o,i=t.elements,a=u(i,p).join(""),c=function(e,t,n,r){void 0===r&&(r=e.length);var o=t.regex;o.lastIndex=n=void 0===n?0:n;for(var i,a=[];i=o.exec(e);){var c=i[t.matchIndex],u=i.index+i[0].indexOf(c),l=u+c.length;if(l>r)break;a.push({start:u,finish:l}),o.lastIndex=l}return a}(a,e,t.sOffset,a.length-t.fOffset);return n=c,function(e,t){if(0===e.length)return[];for(var n=t(e[0]),r=[],o=[],i=0,a=e.length;a>i;i++){var c=e[i],u=t(c);u!==n&&(r.push(o),o=[]),n=u,o.push(c)}return 0!==o.length&&r.push(o),r}((r=function(e,t){var r=p(t),o=e.last,i=o+r.length,a=f(n,function(e,n){return e.start<i&&e.finish>o?[{element:t,start:Math.max(o,e.start)-o,finish:Math.min(i,e.finish)-o,matchId:n}]:[]});return{results:e.results.concat(a),last:i}},o={results:[],last:0},l(i,function(e,t){o=r(o,e)}),o.results),function(e){return e.matchId})})}function A(e,t){s(e,function(e,n){s(e,function(e){var r=fe.fromDom(t.cloneNode(!1));m(r,"data-mce-index",n);var o,i=e.element.dom;i.length===e.finish&&0===e.start?g(e.element,r):(i.length!==e.finish&&i.splitText(e.finish),o=i.splitText(e.start),g(fe.fromDom(o),r))})})}function D(e){var t=e.getAttribute("data-mce-index");return"number"==typeof t?""+t:t}function M(e,t,n,r){var o=e.dom.create("span",{"data-mce-bogus":1});o.className="mce-match-marker";var i,a,c,u,l,s,d,m,h,g,p=e.getBody();return he(e,t,!1),r?(c=e.dom,u=n,l=e.selection,s=o,m=l.getBookmark(),h=c.select("td[data-mce-selected],th[data-mce-selected]"),A(g=S(u,0<h.length?(d=c,f(h,function(e){return k(d,e)})):N(c,l.getRng())),s),l.moveToBookmark(m),g.length):(i=o,A(a=S(n,k(e.dom,p)),i),a.length)}function B(e){var t=e.parentNode;e.firstChild&&t.insertBefore(e.firstChild,e),e.parentNode.removeChild(e)}function F(e,t){var n=[],r=ie.toArray(e.getBody().getElementsByTagName("span"));if(r.length)for(var o=0;o<r.length;o++){var i=D(r[o]);null!==i&&i.length&&i===t.toString()&&n.push(r[o])}return n}function I(e,t,n){var r=t.get(),o=r.index,i=e.dom;(n=!1!==n)?o+1===r.count?o=0:o++:o-1==-1?o=r.count-1:o--,i.removeClass(F(e,r.index),"mce-match-marker-selected");var a=F(e,o);return a.length?(i.addClass(F(e,o),"mce-match-marker-selected"),e.selection.scrollIntoView(a[0]),o):-1}function P(e,t){var n=t.parentNode;e.remove(t),e.isEmpty(n)&&e.remove(n)}function R(e,t,n,r,o,i){var a,c,u,l=e.selection,s=(a=o,c="("+n.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&").replace(/\s/g,"[^\\S\\r\\n\\uFEFF]")+")",a?"(?:^|\\s|"+re()+")"+c+"(?=$|\\s|"+re()+")":c),f=l.isForward(),d=M(e,t,{regex:new RegExp(s,r?"g":"gi"),matchIndex:1},i);return oe.browser.isSafari()&&l.setRng(l.getRng(),f),d&&(u=I(e,t,!0),t.set({index:u,count:d,text:n,matchCase:r,wholeWord:o,inSelection:i})),d}function W(e,t){var n=I(e,t,!0);t.set(q(q({},t.get()),{index:n}))}function j(e,t){var n=I(e,t,!1);t.set(q(q({},t.get()),{index:n}))}function V(e){var t=D(e);return null!==t&&0<t.length}function H(e,t,n,r,o){var i,a=t.get(),c=a.index,u=c;r=!1!==r;for(var l=e.getBody(),s=ie.grep(ie.toArray(l.getElementsByTagName("span")),V),f=0;f<s.length;f++){var d=D(s[f]),m=i=parseInt(d,10);if(o||m===a.index){for(n.length?(s[f].firstChild.nodeValue=n,B(s[f])):P(e.dom,s[f]);s[++f];){if((m=parseInt(D(s[f]),10))!==i){f--;break}P(e.dom,s[f])}r&&u--}else i>c&&s[f].setAttribute("data-mce-index",String(i-1))}return t.set(q(q({},a),{count:o?0:a.count-1,index:u})),(r?W:j)(e,t),!o&&0<t.get().count}function L(t,n){function o(){return d.get().each(f)}function i(e){(1<n.get().count?e.enable:e.disable)("next"),(1<n.get().count?e.enable:e.disable)("prev")}function a(e,t){l(["replace","replaceall","prev","next"],t?e.disable:e.enable)}function c(e,t){oe.browser.isSafari()&&oe.deviceType.isTouch()&&("find"===t||"replace"===t||"replaceall"===t)&&e.focus(t)}function u(e){he(t,n,!1),a(e,!0),i(e)}function s(e){var r,o,c=e.getData(),l=n.get();c.findtext.length?(l.text===c.findtext&&l.matchCase===c.matchcase&&l.wholeWord===c.wholewords?W(t,n):((r=R(t,n,c.findtext,c.matchcase,c.wholewords,c.inselection))<=0&&(o=e,t.windowManager.alert("Could not find the specified string.",function(){o.focus("findtext")})),a(e,0===r)),i(e)):u(e)}var f,d,m,h=(f=r,d=e(ne.none()),q(q({},m={clear:function(){o(),d.set(ne.none())},isSet:function(){return d.get().isSome()},get:function(){return d.get()},set:function(e){o(),d.set(ne.some(e))}}),{on:function(e){return m.get().each(e)}}));t.undoManager.add();var g=ie.trim(t.selection.getContent({format:"text"})),p=n.get(),v={title:"Find and Replace",size:"normal",body:{type:"panel",items:[{type:"bar",items:[{type:"input",name:"findtext",placeholder:"Find",maximized:!0,inputMode:"search"},{type:"button",name:"prev",text:"Previous",icon:"action-prev",disabled:!0,borderless:!0},{type:"button",name:"next",text:"Next",icon:"action-next",disabled:!0,borderless:!0}]},{type:"input",name:"replacetext",placeholder:"Replace with",inputMode:"search"}]},buttons:[{type:"menu",name:"options",icon:"preferences",tooltip:"Preferences",align:"start",items:[{type:"togglemenuitem",name:"matchcase",text:"Match case"},{type:"togglemenuitem",name:"wholewords",text:"Find whole words only"},{type:"togglemenuitem",name:"inselection",text:"Find in selection"}]},{type:"custom",name:"find",text:"Find",primary:!0},{type:"custom",name:"replace",text:"Replace",disabled:!0},{type:"custom",name:"replaceall",text:"Replace all",disabled:!0}],initialData:{findtext:g,replacetext:"",wholewords:p.wholeWord,matchcase:p.matchCase,inselection:p.inSelection},onChange:function(e,t){"findtext"===t.name&&0<n.get().count&&u(e)},onAction:function(e,r){var o,a,l=e.getData();switch(r.name){case"find":s(e);break;case"replace":(H(t,n,l.replacetext)?i:u)(e);break;case"replaceall":H(t,n,l.replacetext,!0,!0),u(e);break;case"prev":j(t,n),i(e);break;case"next":W(t,n),i(e);break;case"matchcase":case"wholewords":case"inselection":o=e.getData(),a=n.get(),n.set(q(q({},a),{matchCase:o.matchcase,wholeWord:o.wholewords,inSelection:o.inselection})),u(e)}c(e,r.name)},onSubmit:function(e){s(e),c(e,"find")},onClose:function(){t.focus(),he(t,n),t.undoManager.add()}};h.set(t.windowManager.open(v,{inline:"toolbar"}))}function U(e,t){return function(){L(e,t)}}function $(e){return 3===e.dom.nodeType}function _(e){if(null==e)throw new Error("Node cannot be null or undefined");return{dom:e}}var z=tinymce.util.Tools.resolve("tinymce.PluginManager"),q=function(){return(q=Object.assign||function(e){for(var t,n=1,r=arguments.length;r>n;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},G=t("string"),K=t("array"),J=n("boolean"),Q=n("number"),X=o(!1),Y=o(!0),Z=o("[!-#%-*,-\\/:;?@\\[-\\]_{}\xa1\xab\xb7\xbb\xbf;\xb7\u055a-\u055f\u0589\u058a\u05be\u05c0\u05c3\u05c6\u05f3\u05f4\u0609\u060a\u060c\u060d\u061b\u061e\u061f\u066a-\u066d\u06d4\u0700-\u070d\u07f7-\u07f9\u0830-\u083e\u085e\u0964\u0965\u0970\u0df4\u0e4f\u0e5a\u0e5b\u0f04-\u0f12\u0f3a-\u0f3d\u0f85\u0fd0-\u0fd4\u0fd9\u0fda\u104a-\u104f\u10fb\u1361-\u1368\u1400\u166d\u166e\u169b\u169c\u16eb-\u16ed\u1735\u1736\u17d4-\u17d6\u17d8-\u17da\u1800-\u180a\u1944\u1945\u1a1e\u1a1f\u1aa0-\u1aa6\u1aa8-\u1aad\u1b5a-\u1b60\u1bfc-\u1bff\u1c3b-\u1c3f\u1c7e\u1c7f\u1cd3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205e\u207d\u207e\u208d\u208e\u3008\u3009\u2768-\u2775\u27c5\u27c6\u27e6-\u27ef\u2983-\u2998\u29d8-\u29db\u29fc\u29fd\u2cf9-\u2cfc\u2cfe\u2cff\u2d70\u2e00-\u2e2e\u2e30\u2e31\u3001-\u3003\u3008-\u3011\u3014-\u301f\u3030\u303d\u30a0\u30fb\ua4fe\ua4ff\ua60d-\ua60f\ua673\ua67e\ua6f2-\ua6f7\ua874-\ua877\ua8ce\ua8cf\ua8f8-\ua8fa\ua92e\ua92f\ua95f\ua9c1-\ua9cd\ua9de\ua9df\uaa5c-\uaa5f\uaade\uaadf\uabeb\ufd3e\ufd3f\ufe10-\ufe19\ufe30-\ufe52\ufe54-\ufe61\ufe63\ufe68\ufe6a\ufe6b\uff01-\uff03\uff05-\uff0a\uff0c-\uff0f\uff1a\uff1b\uff1f\uff20\uff3b-\uff3d\uff3f\uff5b\uff5d\uff5f-\uff65]"),ee={fold:function(e,t){return e()},isSome:X,isNone:Y,getOr:i,getOrThunk:c,getOrDie:function(e){throw new Error(e||"error: getOrDie called on none.")},getOrNull:o(null),getOrUndefined:o(void 0),or:i,orThunk:c,map:a,each:r,bind:a,exists:X,forall:Y,filter:function(){return ee},toArray:function(){return[]},toString:o("none()")},te=function(e){function t(){return i}function n(t){return t(e)}var r=o(e),i={fold:function(t,n){return n(e)},isSome:Y,isNone:X,getOr:r,getOrThunk:r,getOrDie:r,getOrNull:r,getOrUndefined:r,or:t,orThunk:t,map:function(t){return te(t(e))},each:function(t){t(e)},bind:n,exists:n,forall:n,filter:function(t){return t(e)?i:ee},toArray:function(){return[e]},toString:function(){return"some("+e+")"}};return i},ne={some:te,none:a,from:function(e){return null==e?ee:te(e)}},re=Z,oe=tinymce.util.Tools.resolve("tinymce.Env"),ie=tinymce.util.Tools.resolve("tinymce.util.Tools"),ae=Array.prototype.slice,ce=Array.prototype.push,ue=Object.hasOwnProperty;"undefined"!=typeof window||Function("return this;")();var le,se,fe={fromHtml:function(e,t){var n=(t||document).createElement("div");if(n.innerHTML=e,!n.hasChildNodes()||1<n.childNodes.length)throw console.error("HTML does not have a single root node",e),new Error("HTML must have a single root node");return _(n.childNodes[0])},fromTag:function(e,t){var n=(t||document).createElement(e);return _(n)},fromText:function(e,t){var n=(t||document).createTextNode(e);return _(n)},fromDom:_,fromPoint:function(e,t,n){return ne.from(e.dom.elementFromPoint(t,n)).map(_)}},de=(le=$,{get:function(e){if(!le(e))throw new Error("Can only get text value of a text node");return se(e).getOr("")},getOption:se=function(e){return le(e)?ne.from(e.dom.nodeValue):ne.none()},set:function(e,t){if(!le(e))throw new Error("Can only set raw text value of a text node");e.dom.nodeValue=t}}),me=tinymce.util.Tools.resolve("tinymce.dom.TreeWalker"),he=function(e,t,n){for(var r,o,i=t.get(),a=ie.toArray(e.getBody().getElementsByTagName("span")),c=0;c<a.length;c++){var u=D(a[c]);null!==u&&u.length&&(u===i.index.toString()&&(r=r||a[c].firstChild,o=a[c].firstChild),B(a[c]))}if(t.set(q(q({},i),{index:-1,count:0,text:""})),r&&o){var l=e.dom.createRng();return l.setStart(r,0),l.setEnd(o,o.data.length),!1!==n&&e.selection.setRng(l),l}};z.add("searchreplace",function(t){var n,r,o,i,a,c=e({index:-1,count:0,text:"",matchCase:!1,wholeWord:!1,inSelection:!1}),u=c;return(n=t).addCommand("SearchReplace",function(){L(n,u)}),(r=t).ui.registry.addMenuItem("searchreplace",{text:"Find and replace...",shortcut:"Meta+F",onAction:U(r,o=c),icon:"search"}),r.ui.registry.addButton("searchreplace",{tooltip:"Find and replace",onAction:U(r,o),icon:"search"}),r.shortcuts.add("Meta+F","",U(r,o)),i=t,a=c,{done:function(e){return he(i,a,e)},find:function(e,t,n,r){return R(i,a,e,t,n,r=void 0!==r&&r)},next:function(){return W(i,a)},prev:function(){return j(i,a)},replace:function(e,t,n){return H(i,a,e,t,n)}}})}();