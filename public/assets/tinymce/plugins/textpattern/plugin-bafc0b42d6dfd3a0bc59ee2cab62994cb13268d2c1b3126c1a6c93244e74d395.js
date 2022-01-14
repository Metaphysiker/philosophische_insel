/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 *
 * Version: 5.10.1 (2021-11-03)
 */
!function(){"use strict";var t=tinymce.util.Tools.resolve("tinymce.PluginManager"),u=function(){return(u=Object.assign||function(t){for(var n,r=1,e=arguments.length;r<e;r++)for(var o in n=arguments[r])Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o]);return t}).apply(this,arguments)};function a(t,n,r){if(r||2===arguments.length)for(var e,o=0,a=n.length;o<a;o++)!e&&o in n||((e=e||Array.prototype.slice.call(n,0,o))[o]=n[o]);return t.concat(e||Array.prototype.slice.call(n))}function n(e){return function(t){return r=typeof(n=t),(null===n?"null":"object"==r&&(Array.prototype.isPrototypeOf(n)||n.constructor&&"Array"===n.constructor.name)?"array":"object"==r&&(String.prototype.isPrototypeOf(n)||n.constructor&&"String"===n.constructor.name)?"string":r)===e;var n,r}}function e(){}function i(t){return function(){return t}}function o(t){return t}function r(){return m}var f=n("string"),c=n("object"),s=n("array"),l=i(!1),d=i(!0),m={fold:function(t,n){return t()},isSome:l,isNone:d,getOr:o,getOrThunk:g,getOrDie:function(t){throw new Error(t||"error: getOrDie called on none.")},getOrNull:i(null),getOrUndefined:i(void 0),or:o,orThunk:g,map:r,each:e,bind:r,exists:l,forall:d,filter:function(){return m},toArray:function(){return[]},toString:i("none()")};function g(t){return t()}function p(t,n){return-1<E.call(t,n)}function h(t,n){for(var r=t.length,e=new Array(r),o=0;o<r;o++){var a=t[o];e[o]=n(a,o)}return e}function v(t,n){for(var r=0,e=t.length;r<e;r++)n(t[r],r)}function y(t,n){for(var r=[],e=0,o=t.length;e<o;e++){var a=t[e];n(a,e)&&r.push(a)}return r}function b(t,e,o){return function(t){for(var n,r=t.length-1;0<=r;r--)n=t[r],o=e(o,n,r)}(t),o}function k(t,n){for(var r=0,e=t.length;r<e;++r)if(!0!==n(t[r],r))return;return 1}var O=function(r){function t(){return o}function n(t){return t(r)}var e=i(r),o={fold:function(t,n){return n(r)},isSome:d,isNone:l,getOr:e,getOrThunk:e,getOrDie:e,getOrNull:e,getOrUndefined:e,or:t,orThunk:t,map:function(t){return O(t(r))},each:function(t){t(r)},bind:n,exists:n,forall:n,filter:function(t){return t(r)?o:m},toArray:function(){return[r]},toString:function(){return"some("+r+")"}};return o},w={some:O,none:r,from:function(t){return null==t?m:O(t)}},C=Array.prototype.slice,E=Array.prototype.indexOf,x=Object.keys,R=Object.hasOwnProperty;function T(t){var n=[],r=[];return v(t,function(t){t.fold(function(t){n.push(t)},function(t){r.push(t)})}),{errors:n,values:r}}function P(t){return"inline-command"===t.type||"inline-format"===t.type}function N(t){return"block-command"===t.type||"block-format"===t.type}function S(o){function a(t){return ut.error({message:t,pattern:o})}function t(t,n,r){if(void 0===o.format)return void 0!==o.cmd?f(o.cmd)?ut.value(r(o.cmd,o.value)):a(t+" pattern has non-string `cmd` parameter"):a(t+" pattern is missing both `format` and `cmd` parameters");var e=void 0;if(s(o.format)){if(!k(o.format,f))return a(t+" pattern has non-string items in the `format` array");e=o.format}else{if(!f(o.format))return a(t+" pattern has non-string `format` parameter");e=[o.format]}return ut.value(n(e))}if(!c(o))return a("Raw pattern is not an object");if(!f(o.start))return a("Raw pattern is missing `start` parameter");if(void 0===o.end)return void 0!==o.replacement?f(o.replacement)?0===o.start.length?a("Replacement pattern has empty `start` parameter"):ut.value({type:"inline-command",start:"",end:o.start,cmd:"mceInsertContent",value:o.replacement}):a("Replacement pattern has non-string `replacement` parameter"):0===o.start.length?a("Block pattern has empty `start` parameter"):t("Block",function(t){return{type:"block-format",start:o.start,format:t[0]}},function(t,n){return{type:"block-command",start:o.start,cmd:t,value:n}});if(!f(o.end))return a("Inline pattern has non-string `end` parameter");if(0===o.start.length&&0===o.end.length)return a("Inline pattern has empty `start` and `end` parameters");var r=o.start,e=o.end;return 0===e.length&&(e=r,r=""),t("Inline",function(t){return{type:"inline-format",start:r,end:e,format:t}},function(t,n){return{type:"inline-command",start:r,end:e,cmd:t,value:n}})}function M(t){return"block-command"===t.type?{start:t.start,cmd:t.cmd,value:t.value}:"block-format"===t.type?{start:t.start,format:t.format}:"inline-command"===t.type?"mceInsertContent"===t.cmd&&""===t.start?{start:t.end,replacement:t.value}:{start:t.start,end:t.end,cmd:t.cmd,value:t.value}:"inline-format"===t.type?{start:t.start,end:t.end,format:1===t.format.length?t.format[0]:t.format}:void 0}function A(t){return{inlinePatterns:y(t,P),blockPatterns:(n=y(t,N),r=function(t,n){return t.start.length===n.start.length?0:t.start.length>n.start.length?-1:1},(e=C.call(n,0)).sort(r),e)};var n,r,e}function B(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];var r=ft.console;r&&(r.error||r.log).apply(r,t)}function D(t){var n=t.getParam("forced_root_block","p");return!1===n?"":!0===n?"p":n}function I(t,n){return{container:t,offset:n}}function j(t){return t.nodeType===Node.TEXT_NODE}function _(t,n,r,e){void 0===e&&(e=!0);var o=n.startContainer.parentNode,a=n.endContainer.parentNode;n.deleteContents(),e&&!r(n.startContainer)&&(j(n.startContainer)&&0===n.startContainer.data.length&&t.remove(n.startContainer),j(n.endContainer)&&0===n.endContainer.data.length&&t.remove(n.endContainer),pt(t,o,r),o!==a&&pt(t,a,r))}function U(t,n){var r,e=n.get(t);return s(e)&&(0<(r=e).length?w.some(r[0]):w.none()).exists(function(t){return R.call(t,"block")})}function L(t){return 0===t.start.length}function V(t,n){var r=w.from(t.dom.getParent(n.startContainer,t.dom.isBlock));return""===D(t)?r.orThunk(function(){return w.some(t.getBody())}):r}function W(n){return function(t){return n===t?-1:0}}function q(t,n,r){if(j(t)&&0<=n)return w.some(I(t,n));var e=gt(ht);return w.from(e.backwards(t,n,W(t),r)).map(function(t){return I(t.container,t.container.data.length)})}function F(t,n,r){if(j(n)&&(r<0||r>n.data.length))return[];for(var e=[r],o=n;o!==t&&o.parentNode;){for(var a=o.parentNode,i=0;i<a.childNodes.length;i++)if(a.childNodes[i]===o){e.push(i);break}o=a}return o===t?e.reverse():[]}function G(t,n,r,e,o){return{start:F(t,n,r),end:F(t,e,o)}}function H(t,n){var r=n.slice(),e=r.pop(),o=r,a=function(t,n){return t.bind(function(t){return w.from(t.childNodes[n])})},i=w.some(t);return v(o,function(t,n){i=a(i,t)}),i.bind(function(t){return j(t)&&(e<0||e>t.data.length)?w.none():w.some({node:t,offset:e})})}function J(n,r){return H(n,r.start).bind(function(t){var o=t.node,a=t.offset;return H(n,r.end).map(function(t){var n=t.node,r=t.offset,e=document.createRange();return e.setStart(o,a),e.setEnd(n,r),e})})}function K(e,o,n){!function(t,n){if(j(t)&&t.length<=0)return w.some(I(t,0));var r=gt(ht);return w.from(r.forwards(t,0,W(t),n)).map(function(t){return I(t.container,0)})}(o,o).each(function(t){var r=t.container;yt(r,n.start.length,o).each(function(t){var n=e.createRng();n.setStart(r,0),n.setEnd(t.container,t.offset),_(e,n,function(t){return t===o})})})}function X(e,a){var i=e.dom,t=e.selection.getRng();return V(e,t).filter(function(t){var n=D(e),r=""===n&&i.is(t,"body")||i.is(t,n);return null!==t&&r}).bind(function(n){var r,e=n.textContent,t=a,o=(r=e).replace("\xa0"," ");return function(t,n,r){for(var e=0,o=t.length;e<o;e++){var a=t[e];if(n(a,e))return w.some(a);if(r(a,e))break}return w.none()}(t,function(t){return 0===r.indexOf(t.start)||0===o.indexOf(t.start)},l).map(function(t){return dt.trim(e).length===t.start.length?[]:[{pattern:t,range:G(i.getRoot(),n,0,n,0)}]})}).getOr([])}function z(t,n){return t.create("span",{"data-mce-type":"bookmark",id:n})}function Q(t,n){var r=t.createRng();return r.setStartAfter(n.start),r.setEndBefore(n.end),r}function Y(t,n,r){var e=J(t.getRoot(),r).getOrDie("Unable to resolve path range"),o=e.startContainer,a=e.endContainer,i=0===e.endOffset?a:a.splitText(e.endOffset),u=0===e.startOffset?o:o.splitText(e.startOffset);return{prefix:n,end:i.parentNode.insertBefore(z(t,n+"-end"),i),start:u.parentNode.insertBefore(z(t,n+"-start"),u)}}function Z(t,n,r){pt(t,t.get(n.prefix+"-end"),r),pt(t,t.get(n.prefix+"-start"),r)}function $(n,t,r){n.selection.setRng(r),"inline-format"===t.type?v(t.format,function(t){n.formatter.apply(t)}):n.execCommand(t.cmd,!1,t.value)}function tt(r,e,o){var a=r.selection.getRng();return!1===a.collapsed?[]:V(r,a).bind(function(t){var n=a.startOffset-(o?1:0);return Ot(r,e,a.startContainer,n,t)}).fold(function(){return[]},function(t){return t.matches})}function nt(p,t){var h,n,o,r,e,a,i;0!==t.length&&(h=p.dom,n=p.selection.getBookmark(),o=h,r=t,e=(new Date).getTime(),a="mce_textpattern_"+Math.floor(1e9*Math.random())+ ++bt+String(e),i=b(r,function(t,n){var r=Y(o,a+"_end"+t.length,n.endRng);return t.concat([u(u({},n),{endMarker:r})])},[]),v(b(i,function(t,n){var r=i.length-t.length-1,e=L(n.pattern)?n.endMarker:Y(o,a+"_start"+r,n.startRng);return t.concat([u(u({},n),{startMarker:e})])},[]),function(t){function n(t){return t===g}var r,e,o,a,i,u,f,c,s,l,d,m,g=h.getParent(t.startMarker.start,h.isBlock);L(t.pattern)?(e=t.pattern,o=t.endMarker,a=n,i=Q((r=p).dom,o),_(r.dom,i,a),$(r,e,i)):(u=p,f=t.pattern,c=t.startMarker,s=t.endMarker,l=n,d=u.dom,m=Q(d,s),_(d,Q(d,c),l),_(d,m,l),$(u,f,Q(d,{prefix:c.prefix,start:c.end,end:s.start}))),Z(h,t.endMarker,n),Z(h,t.startMarker,n)}),p.selection.moveToBookmark(n))}function rt(t,n){var r=tt(t,n.inlinePatterns,!0);0<r.length&&t.undoManager.transact(function(){nt(t,r)})}function et(t,n,r){for(var e=0;e<t.length;e++)if(r(t[e],n))return 1}function ot(n,r){var e=[",",".",";",":","!","?"],o=[32];n.on("keydown",function(t){13!==t.keyCode||lt.modifierPressed(t)||!function(o,t){if(o.selection.isCollapsed()){var a=tt(o,t.inlinePatterns,!1),u=X(o,t.blockPatterns);return(0<u.length||0<a.length)&&(o.undoManager.add(),o.undoManager.extra(function(){o.execCommand("mceInsertNewLine")},function(){var i,t,n;o.insertContent("\ufeff"),nt(o,a),i=o,0!==(t=u).length&&(n=i.selection.getBookmark(),v(t,function(t){return e=(n=i).dom,o=(r=t).pattern,a=J(e.getRoot(),r.range).getOrDie("Unable to resolve path range"),V(n,a).each(function(t){"block-format"===o.type?U(o.format,n.formatter)&&n.undoManager.transact(function(){K(n.dom,t,o),n.formatter.apply(o.format)}):"block-command"===o.type&&n.undoManager.transact(function(){K(n.dom,t,o),n.execCommand(o.cmd,!1,o.value)})}),1;var n,r,e,o,a}),i.selection.moveToBookmark(n));var r=o.selection.getRng(),e=q(r.startContainer,r.startOffset,o.dom.getRoot());o.execCommand("mceInsertNewLine"),e.each(function(t){var n=t.container;"\ufeff"===n.data.charAt(t.offset-1)&&(n.deleteData(t.offset-1,1),pt(o.dom,n.parentNode,function(t){return t===o.dom.getRoot()}))})}),1)}}(n,r.get())||t.preventDefault()},!0),n.on("keyup",function(t){et(o,t,function(t,n){return t===n.keyCode&&!1===lt.modifierPressed(n)})&&rt(n,r.get())}),n.on("keypress",function(t){et(e,t,function(t,n){return t.charCodeAt(0)===n.charCode})&&st.setEditorTimeout(n,function(){rt(n,r.get())})})}!function(i){if(!s(i))throw new Error("cases must be an array");if(0===i.length)throw new Error("there must be at least one case");var u=[],r={};v(i,function(t,e){var n=x(t);if(1!==n.length)throw new Error("one and only one name per case");var o=n[0],a=t[o];if(void 0!==r[o])throw new Error("duplicate key detected:"+o);if("cata"===o)throw new Error("cannot have a case named cata (sorry)");if(!s(a))throw new Error("case arguments must be an array");u.push(o),r[o]=function(){for(var r=[],t=0;t<arguments.length;t++)r[t]=arguments[t];var n=r.length;if(n!==a.length)throw new Error("Wrong number of arguments to case "+o+". Expected "+a.length+" ("+a+"), got "+n);return{fold:function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];if(t.length!==i.length)throw new Error("Wrong number of arguments to fold. Expected "+i.length+", got "+t.length);return t[e].apply(null,r)},match:function(t){var n=x(t);if(u.length!==n.length)throw new Error("Wrong number of arguments to match. Expected: "+u.join(",")+"\nActual: "+n.join(","));if(!k(u,function(t){return p(n,t)}))throw new Error("Not all branches were specified when using match. Specified: "+n.join(", ")+"\nRequired: "+u.join(", "));return t[o].apply(null,r)},log:function(t){console.log(t,{constructors:u,constructor:o,params:r})}}}})}([{bothErrors:["error1","error2"]},{firstError:["error1","value2"]},{secondError:["value1","error2"]},{bothValues:["value1","value2"]}]);var at=function(r){return{isValue:d,isError:l,getOr:i(r),getOrThunk:i(r),getOrDie:i(r),or:function(t){return at(r)},orThunk:function(t){return at(r)},fold:function(t,n){return n(r)},map:function(t){return at(t(r))},mapError:function(t){return at(r)},each:function(t){t(r)},bind:function(t){return t(r)},exists:function(t){return t(r)},forall:function(t){return t(r)},toOptional:function(){return w.some(r)}}},it=function(r){return{isValue:l,isError:d,getOr:o,getOrThunk:function(t){return t()},getOrDie:function(){return t=String(r),function(){throw new Error(t)}();var t},or:o,orThunk:function(t){return t()},fold:function(t,n){return t(r)},map:function(t){return it(r)},mapError:function(t){return it(t(r))},each:e,bind:function(t){return it(r)},exists:l,forall:d,toOptional:w.none}},ut={value:at,error:it,fromOption:function(t,n){return t.fold(function(){return it(n)},at)}},ft="undefined"!=typeof window?window:Function("return this;")(),ct=[{start:"*",end:"*",format:"italic"},{start:"**",end:"**",format:"bold"},{start:"#",format:"h1"},{start:"##",format:"h2"},{start:"###",format:"h3"},{start:"####",format:"h4"},{start:"#####",format:"h5"},{start:"######",format:"h6"},{start:"1. ",cmd:"InsertOrderedList"},{start:"* ",cmd:"InsertUnorderedList"},{start:"- ",cmd:"InsertUnorderedList"}],st=tinymce.util.Tools.resolve("tinymce.util.Delay"),lt=tinymce.util.Tools.resolve("tinymce.util.VK"),dt=tinymce.util.Tools.resolve("tinymce.util.Tools"),mt=tinymce.util.Tools.resolve("tinymce.dom.DOMUtils"),gt=tinymce.util.Tools.resolve("tinymce.dom.TextSeeker"),pt=function(t,n,r){var e;n&&t.isEmpty(n)&&!r(n)&&(e=n.parentNode,t.remove(n),pt(t,e,r))},ht=mt.DOM,vt=function(t,r,e){if(!j(t))return w.none();var n=t.textContent;if(0<=r&&r<=n.length)return w.some(I(t,r));var o=gt(ht);return w.from(o.backwards(t,r,W(t),e)).bind(function(t){var n=t.container.data;return vt(t.container,r+n.length,e)})},yt=function(t,n,r){if(!j(t))return w.none();var e=t.textContent;if(n<=e.length)return w.some(I(t,n));var o=gt(ht);return w.from(o.forwards(t,n,W(t),r)).bind(function(t){return yt(t.container,n-e.length,r)})},bt=0,kt=function(e,o,a,t){var i,n,r,u,f,c,s,l=o.start;return n=t.container,r=t.offset,i=l,u=function(t,n){var r=t.data.substring(0,n),e=r.lastIndexOf(i.charAt(i.length-1)),o=r.lastIndexOf(i);return-1!==o?o+i.length:-1!==e?e+1:-1},f=a,s=gt(e,(c=e,function(t){return c.isBlock(t)||p(["BR","IMG","HR","INPUT"],t.nodeName)||"false"===c.getContentEditable(t)})),w.from(s.backwards(n,r,u,f)).bind(function(r){if(r.offset>=l.length){var t=e.createRng();return t.setStart(r.container,r.offset-l.length),t.setEnd(r.container,r.offset),w.some(t)}var n=r.offset-l.length;return vt(r.container,n,a).map(function(t){var n=e.createRng();return n.setStart(t.container,t.offset),n.setEnd(r.container,r.offset),n}).filter(function(t){return t.toString()===l}).orThunk(function(){return kt(e,o,a,I(r.container,0))})})},Ot=function(l,d,m,g,p){var h=l.dom;return q(m,g,h.getRoot()).bind(function(t){var n=h.createRng();n.setStart(p,0),n.setEnd(m,g);for(var r,e=n.toString(),o=0;o<d.length;o++){var a,i,u=d[o],f=u.end;i=r=void 0;if(a=(r=e).length-f.length,""===(i=f)||r.length>=i.length&&r.substr(a,a+i.length)===i){var c=d.slice();c.splice(o,1);var s=function(a,i,u){var f=a.dom,c=f.getRoot(),s=u.pattern,l=u.position.container,d=u.position.offset;return vt(l,d-u.pattern.end.length,i).bind(function(t){var r=G(c,t.container,t.offset,l,d);if(L(s))return w.some({matches:[{pattern:s,startRng:r,endRng:r}],position:t});var n=Ot(a,u.remainingPatterns,t.container,t.offset,i),e=n.getOr({matches:[],position:t}),o=e.position;return function(t,r,n,e,o,a){if(void 0===a&&(a=!1),0!==r.start.length||a)return q(n,e,o).bind(function(n){return kt(t,r,o,n).bind(function(t){if(a){if(t.endContainer===n.container&&t.endOffset===n.offset)return w.none();if(0===n.offset&&t.endContainer.textContent.length===t.endOffset)return w.none()}return w.some(t)})});var i=t.createRng();return i.setStart(n,e),i.setEnd(n,e),w.some(i)}(f,s,o.container,o.offset,i,n.isNone()).map(function(t){var n=G(c,t.startContainer,t.startOffset,t.endContainer,t.endOffset);return{matches:e.matches.concat([{pattern:s,startRng:n,endRng:r}]),position:I(t.startContainer,t.startOffset)}})})}(l,p,{pattern:u,remainingPatterns:c,position:t});if(s.isSome())return s}}return w.none()})};t.add("textpattern",function(r){var t,n,e,o=(t=function(){var t=r.getParam("textpattern_patterns",ct,"array");if(!s(t))return B("The setting textpattern_patterns should be an array"),{inlinePatterns:[],blockPatterns:[]};var n=T(h(t,S));return v(n.errors,function(t){return B(t.message,t.pattern),0}),A(n.values)}(),n=t,{get:function(){return n},set:function(t){n=t}});return ot(r,o),e=o,{setPatterns:function(t){var n=T(h(t,S));if(0<n.errors.length){var r=n.errors[0];throw new Error(r.message+":\n"+JSON.stringify(r.pattern,null,2))}e.set(A(n.values))},getPatterns:function(){return a(a([],h(e.get().inlinePatterns,M),!0),h(e.get().blockPatterns,M),!0)}}})}();
