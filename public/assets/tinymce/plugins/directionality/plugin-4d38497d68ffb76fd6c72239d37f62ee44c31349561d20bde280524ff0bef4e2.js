!function(){"use strict";function n(n){return function(t){return typeof t===n}}function t(n){return function(){return n}}function r(n){return n}function o(){return A}function e(n){return n()}function u(n,t){for(var r=0,o=n.length;o>r;r++)t(n[r],r)}function i(n,t){var r=n.dom;if(1!==r.nodeType)return!1;var o=r;if(void 0!==o.matches)return o.matches(t);if(void 0!==o.msMatchesSelector)return o.msMatchesSelector(t);if(void 0!==o.webkitMatchesSelector)return o.webkitMatchesSelector(t);if(void 0!==o.mozMatchesSelector)return o.mozMatchesSelector(t);throw new Error("Browser lacks native selectors")}function c(n){if(null==n)throw new Error("Node cannot be null or undefined");return{dom:n}}function f(n){return function(t){return t.dom.nodeType===n}}function l(n,t,r){!function(n,t,r){if(!(D(r)||N(r)||S(r)))throw console.error("Invalid call to Attribute.set. Key ",t,":: Value ",r,":: Element ",n),new Error("Attribute value was not simple");n.setAttribute(t,r+"")}(n.dom,t,r)}function a(n,t){n.dom.removeAttribute(t)}function m(n){return k.fromDom(n.dom.host)}function d(n,t,r){return function(r){for(var o=n.dom,e=T(r)?r:b;o.parentNode;){var o=o.parentNode,u=k.fromDom(o);if(i(u,t))return M.some(u);if(e(u))break}return M.none()}(r)}function s(n){return"rtl"===(r="direction",o=(t=n).dom,""!==(e=window.getComputedStyle(o).getPropertyValue(r))||B(t)?e:H(o,r))?"rtl":"ltr";var t,r,o,e}function g(n,t){return r=function(n){return i(n,t)},function(n,t){for(var r=[],o=0,e=n.length;e>o;o++){var u=n[o];t(u,o)&&r.push(u)}return r}(function(n,t){for(var r=n.length,o=new Array(r),e=0;r>e;e++){var u=n[e];o[e]=t(u,e)}return o}(n.dom.childNodes,k.fromDom),r);var r}function h(n,t){var r=n.selection.getSelectedBlocks();0<r.length&&(u(r,function(n){var r,o=k.fromDom(n),e=p(o),i=(r=o,(e?d(r,"ol,ul"):M.some(r)).getOr(r));M.from(i.dom.parentNode).map(k.fromDom).filter(E).each(function(n){s(n)!==t?l(i,"dir",t):s(i)!==t&&a(i,"dir"),e&&u(g(i,"li[dir]"),function(n){return a(n,"dir"),0})})}),n.nodeChanged())}function v(n,t){return function(r){function o(n){var o=k.fromDom(n.element);r.setActive(s(o)===t)}return n.on("NodeChange",o),function(){return n.off("NodeChange",o)}}}function p(n){return E(n)&&"li"===n.dom.nodeName.toLowerCase()}var y,w=tinymce.util.Tools.resolve("tinymce.PluginManager"),D=function(n){return r=typeof(t=n),(null===t?"null":"object"==r&&(Array.prototype.isPrototypeOf(t)||t.constructor&&"Array"===t.constructor.name)?"array":"object"==r&&(String.prototype.isPrototypeOf(t)||t.constructor&&"String"===t.constructor.name)?"string":r)===y;var t,r},N=n("boolean"),T=n("function"),S=n("number"),b=t(!(y="string")),O=t(!0),A={fold:function(n,t){return n()},isSome:b,isNone:O,getOr:r,getOrThunk:e,getOrDie:function(n){throw new Error(n||"error: getOrDie called on none.")},getOrNull:t(null),getOrUndefined:t(void 0),or:r,orThunk:e,map:o,each:function(){},bind:o,exists:b,forall:O,filter:function(){return A},toArray:function(){return[]},toString:t("none()")},C=function(n){function r(){return u}function o(t){return t(n)}var e=t(n),u={fold:function(t,r){return r(n)},isSome:O,isNone:b,getOr:e,getOrThunk:e,getOrDie:e,getOrNull:e,getOrUndefined:e,or:r,orThunk:r,map:function(t){return C(t(n))},each:function(t){t(n)},bind:o,exists:o,forall:o,filter:function(t){return t(n)?u:A},toArray:function(){return[n]},toString:function(){return"some("+n+")"}};return u},M={some:C,none:o,from:function(n){return null==n?A:C(n)}},k={fromHtml:function(n,t){var r=(t||document).createElement("div");if(r.innerHTML=n,!r.hasChildNodes()||1<r.childNodes.length)throw console.error("HTML does not have a single root node",n),new Error("HTML must have a single root node");return c(r.childNodes[0])},fromTag:function(n,t){var r=(t||document).createElement(n);return c(r)},fromText:function(n,t){var r=(t||document).createTextNode(n);return c(r)},fromDom:c,fromPoint:function(n,t,r){return M.from(n.dom.elementFromPoint(t,r)).map(c)}};"undefined"!=typeof window||Function("return this;")();var E=f(1),L=f(3),P=f(9),R=f(11),x=T(Element.prototype.attachShadow)&&T(Node.prototype.getRootNode)?function(n){return k.fromDom(n.dom.getRootNode())}:function(n){return P(n)?n:k.fromDom(n.dom.ownerDocument)},B=function(n){var t=L(n)?n.dom.parentNode:n.dom;if(null==t||null===t.ownerDocument)return!1;var r,o,e,u,i,c=t.ownerDocument;return e=k.fromDom(t),i=x(e),(R(u=i)&&null!=u.dom.host?M.some(i):M.none()).fold(function(){return c.body.contains(t)},(r=B,o=m,function(n){return r(o(n))}))},H=function(n,t){return void 0!==n.style&&T(n.style.getPropertyValue)?n.style.getPropertyValue(t):""};w.add("directionality",function(n){var t,r;(t=n).addCommand("mceDirectionLTR",function(){h(t,"ltr")}),t.addCommand("mceDirectionRTL",function(){h(t,"rtl")}),(r=n).ui.registry.addToggleButton("ltr",{tooltip:"Left to right",icon:"ltr",onAction:function(){return r.execCommand("mceDirectionLTR")},onSetup:v(r,"ltr")}),r.ui.registry.addToggleButton("rtl",{tooltip:"Right to left",icon:"rtl",onAction:function(){return r.execCommand("mceDirectionRTL")},onSetup:v(r,"rtl")})})}();