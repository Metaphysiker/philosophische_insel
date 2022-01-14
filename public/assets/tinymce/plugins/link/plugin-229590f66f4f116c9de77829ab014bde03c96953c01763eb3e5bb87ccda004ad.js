!function(){"use strict";function t(t){return function(n){return r=typeof(e=n),(null===e?"null":"object"==r&&(Array.prototype.isPrototypeOf(e)||e.constructor&&"Array"===e.constructor.name)?"array":"object"==r&&(String.prototype.isPrototypeOf(e)||e.constructor&&"String"===e.constructor.name)?"string":r)===t;var e,r}}function n(t){return function(n){return typeof n===t}}function e(){}function r(t){return function(){return t}}function o(t){return t}function i(t,n){return t===n}function u(){return rt}function a(t){return t()}function l(t,n,e){return function(t){for(var r,o=0,i=t.length;i>o;o++)r=t[o],e=n(e,r,o)}(t),e}function c(t){for(var n=[],e=0,r=t.length;r>e;++e){if(!Q(t[e]))throw new Error("Arr.flatten item "+e+" was not an array, input: "+t);at.apply(n,t[e])}return n}function f(t,n){for(var e=0;e<t.length;e++){var r=n(t[e],e);if(r.isSome())return r}return it.none()}function s(t,n,e){return void 0===e&&(e=i),t.exists(function(t){return e(t,n)})}function m(t,n){return t?it.some(n):it.none()}function g(t){var n=t.getParam("link_assume_external_targets",!1);return Z(n)&&n?1:!$(n)||"http"!==n&&"https"!==n?0:n}function d(t){return t.getParam("default_link_target")}function h(t){return t.getParam("target_list",!0)}function p(t){return t.getParam("rel_list",[],"array")}function v(t){return t.getParam("allow_unsafe_link_target",!1,"boolean")}function y(t){return $(t.value)?t.value:""}function k(t){return void 0===t&&(t=y),function(n){return it.from(n).map(function(n){return ct(n,t)})}}function x(t,n,e,r){return function(t){for(var o=mt(t),i=0,u=o.length;u>i;i++){var a=o[i];!function(t,o){(n(t,o)?e:r)(t,o)}(t[a],a)}}(t),1}function b(t,n){return gt.call(t,n)}function O(t){return t&&"a"===t.nodeName.toLowerCase()}function w(t){return O(t)&&!!pt(t)}function C(t,n){if(t.collapsed)return[];for(var e=t.cloneContents(),r=new dt(e.firstChild,e),o=[],i=e.firstChild;n(i)&&o.push(i),i=r.next(););return o}function N(t){return/^\w+:/i.test(t)}function A(t,n){function e(t){return t.filter(function(t){return-1===lt.inArray(o,t)})}var r,o=["noopener"],i=t?t.split(/\s+/):[],u=n?0<(r=e(r=i)).length?r.concat(o):o:e(i);return 0<u.length?lt.trim(u.sort().join(" ")):""}function T(t,n){return n=n||t.selection.getNode(),vt(n)?t.dom.select("a[href]",n)[0]:t.dom.getParent(n,"a[href]")}function P(t,n){return(n?n.innerText||n.textContent:t.getContent({format:"text"})).replace(/\uFEFF/g,"")}function S(t){return 0<lt.grep(t,w).length}function _(t){var n=t.schema.getTextInlineElements();return 0===C(t.selection.getRng(),function(t){return 1===t.nodeType&&!O(t)&&!b(n,t.nodeName.toLowerCase())}).length}function R(t,n,e){var r,o,i,u,a,c,f,s=t.selection.getNode(),m=T(t,s),y=(o=t,i=l(["title","rel","class","target"],function(t,n){return r[n].each(function(e){t[n]=0<e.length?e:null}),t},{href:(r=e).href}),f=st({},i),0<p(o).length||!1!==v(o)||(u=A(f.rel,"_blank"===f.target),f.rel=u||null),it.from(f.target).isNone()&&!1===h(o)&&(f.target=d(o)),f.href=(a=f.href,"http"!==(c=g(o))&&"https"!==c||N(a)?a:c+"://"+a),f);t.undoManager.transact(function(){var r,o,i,u,a,l,c,f;e.href===n.href&&n.attach(),m?(t.focus(),a=t,l=m,c=e.text,f=y,c.each(function(t){b(l,"innerText")?l.innerText=t:l.textContent=t}),a.dom.setAttribs(l,f),a.selection.select(l)):(r=t,i=e.text,u=y,vt(o=s)?kt(r,o,u):i.fold(function(){r.execCommand("mceInsertLink",!1,u)},function(t){r.insertContent(r.dom.createHTML("a",u,r.dom.encode(t)))}))})}function D(t,n,r){var o,i,u,a,l,c,f,s,m,g,d=(o=t,i=r.href,st(st({},r),{href:ht.isDomSafe(i,"a",o.settings)?i:""}));t.hasPlugin("rtc",!0)?t.execCommand("createlink",!1,(l=d["class"],c=d.href,f=d.rel,s=d.target,m=d.text,g=d.title,x({"class":l.getOrNull(),href:c,rel:f.getOrNull(),target:s.getOrNull(),text:m.getOrNull(),title:g.getOrNull()},function(t,n){return!1===Y(t)},(u=a={},function(t,n){u[n]=t}),e),a)):R(t,n,d)}function L(t){var n;t.hasPlugin("rtc",!0)?t.execCommand("unlink"):(n=t).undoManager.transact(function(){var t,e,r,o,i,u,a,l=n.selection.getNode();vt(l)?yt(n,l):(e=(t=n).dom,o=(r=t.selection).getBookmark(),i=r.getRng().cloneRange(),u=e.getParent(i.startContainer,"a[href]",t.getBody()),a=e.getParent(i.endContainer,"a[href]",t.getBody()),u&&i.setStartBefore(u),a&&i.setEndAfter(a),r.setRng(i),t.execCommand("unlink"),r.moveToBookmark(o)),n.focus()})}function E(t){var n=t.href;return 0<n.indexOf("@")&&-1===n.indexOf("/")&&-1===n.indexOf("mailto:")?it.some({message:"The URL you entered seems to be an email address. Do you want to add the required mailto: prefix?",preprocess:function(t){return st(st({},t),{href:"mailto:"+n})}}):it.none()}function M(t,n,e){var r=t.getAttrib(n,e);return null!==r&&0<r.length?it.some(r):it.none()}function U(t){var n,r=T(n=t);Tt(n,r).then(function(n){var r,o,i,u,a=function(t){function n(t){return it.from(r[t]).filter(function(n){return!s(u.anchor[t],n)})}var r=t.getData();if(!r.url.value)return L(i),void t.close();var o={href:r.url.value,text:n("text"),target:n("target"),rel:n("rel"),"class":n("linkClass"),title:n("title")},a={href:r.url.value,attach:void 0!==r.url.meta&&r.url.meta.attach?r.url.meta.attach:e};Ct(i,o).then(function(t){D(i,a,t)}),t.close()},l=i=t,f=(r=u=n).anchor.text.map(function(){return{name:"text",type:"input",label:"Text to display"}}).toArray(),m=r.flags.titleEnabled?[{name:"title",type:"input",label:"Title"}]:[],g=it.from(d(l)),h=r.anchor,p={url:{value:o=h.url.getOr(""),meta:{original:{value:o}}},text:h.text.getOr(""),title:h.title.getOr(""),anchor:o,link:o,rel:h.rel.getOr(""),target:h.target.or(g).getOr(""),linkClass:h.linkClass.getOr("")},v=r.catalogs,y=bt(p,v);return{title:"Insert/Edit Link",size:"normal",body:{type:"panel",items:c([[{name:"url",type:"urlinput",filetype:"file",label:"URL"}],f,m,function(t){for(var n=[],e=function(t){n.push(t)},r=0;r<t.length;r++)t[r].each(e);return n}([v.anchor.map(ft.createUi("anchor","Anchors")),v.rels.map(ft.createUi("rel","Rel")),v.targets.map(ft.createUi("target","Open link in...")),v.link.map(ft.createUi("link","Link list")),v.classes.map(ft.createUi("linkClass","Class"))])])},buttons:[{type:"cancel",name:"cancel",text:"Cancel"},{type:"submit",name:"save",text:"Save",primary:!0}],initialData:p,onChange:function(t,n){var e=n.name;y.onChange(t.getData,{name:e}).each(function(n){t.setData(n)})},onSubmit:a}}).then(function(n){t.windowManager.open(n)})}function B(t,n){return t.dom.getParent(n,"a[href]")}function I(t){return B(t,t.selection.getStart())}function K(t,n){var e,r;n&&(e=pt(n),/^#/.test(e)?(r=t.$(e)).length&&t.selection.scrollIntoView(r[0],!0):function(t){var n=document.createElement("a");n.target="_blank",n.href=t,n.rel="noreferrer noopener";var e,r,o=document.createEvent("MouseEvents");o.initMouseEvent("click",!0,!0,window,0,0,0,0,0,!1,!1,!1,!1,0,null),e=n,r=o,document.body.appendChild(e),e.dispatchEvent(r),document.body.removeChild(e)}(n.href))}function z(t){return function(){U(t)}}function j(t){return function(){K(t,I(t))}}function V(t,n){return t.on("NodeChange",n),function(){return t.off("NodeChange",n)}}function q(t){return function(n){function e(){return n.setActive(!t.mode.isReadOnly()&&null!==T(t,t.selection.getNode()))}return e(),V(t,e)}}function F(t){return function(n){function e(){return n.setDisabled(null===T(t,t.selection.getNode()))}return e(),V(t,e)}}function W(t){return function(n){function e(n){return S(n)||0<C(t.selection.getRng(),w).length}var r=t.dom.getParents(t.selection.getStart());return n.setDisabled(!e(r)),V(t,function(t){return n.setDisabled(!e(t.parents))})}}function H(t){var n=c(function(t,n){for(var e=t.length,r=new Array(e),o=0;e>o;o++){var i=t[o];r[o]=n(i,o)}return r}(t.dom.select("a:not([href])"),function(t){var n=t.name||t.id;return n?[{text:n,value:"#"+n}]:[]}));return 0<n.length?it.some([{text:"None",value:""}].concat(n)):it.none()}var G,J=tinymce.util.Tools.resolve("tinymce.PluginManager"),X=tinymce.util.Tools.resolve("tinymce.util.VK"),$=t("string"),Q=t("array"),Y=function(t){return G===t},Z=n("boolean"),tt=n("function"),nt=r(!1),et=r(!(G=null)),rt={fold:function(t,n){return t()},isSome:nt,isNone:et,getOr:o,getOrThunk:a,getOrDie:function(t){throw new Error(t||"error: getOrDie called on none.")},getOrNull:r(null),getOrUndefined:r(void 0),or:o,orThunk:a,map:u,each:e,bind:u,exists:nt,forall:et,filter:function(){return rt},toArray:function(){return[]},toString:r("none()")},ot=function(t){function n(){return i}function e(n){return n(t)}var o=r(t),i={fold:function(n,e){return e(t)},isSome:et,isNone:nt,getOr:o,getOrThunk:o,getOrDie:o,getOrNull:o,getOrUndefined:o,or:n,orThunk:n,map:function(n){return ot(n(t))},each:function(n){n(t)},bind:e,exists:e,forall:e,filter:function(n){return n(t)?i:rt},toArray:function(){return[t]},toString:function(){return"some("+t+")"}};return i},it={some:ot,none:u,from:function(t){return null==t?rt:ot(t)}},ut=Array.prototype.indexOf,at=Array.prototype.push,lt=tinymce.util.Tools.resolve("tinymce.util.Tools"),ct=function(t,n){var e=[];return lt.each(t,function(t){var r,o,i,u=$((r=t).text)?r.text:$(r.title)?r.title:"";void 0!==t.menu?(o=ct(t.menu,n),e.push({text:u,items:o})):(i=n(t),e.push({text:u,value:i}))}),e},ft={sanitize:function(t){return k(y)(t)},sanitizeWith:k,createUi:function(t,n){return function(e){return{name:t,type:"listbox",label:n,items:e}}},getValue:y},st=function(){return(st=Object.assign||function(t){for(var n,e=1,r=arguments.length;r>e;e++)for(var o in n=arguments[e])Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o]);return t}).apply(this,arguments)},mt=Object.keys,gt=Object.hasOwnProperty,dt=tinymce.util.Tools.resolve("tinymce.dom.TreeWalker"),ht=tinymce.util.Tools.resolve("tinymce.util.URI"),pt=function(t){return t.getAttribute("data-mce-href")||t.getAttribute("href")},vt=function(t){return t&&"FIGURE"===t.nodeName&&/\bimage\b/i.test(t.className)},yt=function(t,n){var e,r=t.dom.select("img",n)[0];!r||(e=t.dom.getParents(r,"a[href]",n)[0])&&(e.parentNode.insertBefore(r,e),t.dom.remove(e))},kt=function(t,n,e){var r,o=t.dom.select("img",n)[0];o&&(r=t.dom.create("a",e),o.parentNode.insertBefore(r,o),r.appendChild(o))},xt=function(t,n){return f(n,function(n){return b(e=n,"items")&&void 0!==e.items&&null!==e.items?xt(t,n.items):m(n.value===t,n);var e})},bt=function(t,n){function r(t,r){var i,u,a,l,c,f,s=("link"===(i=r.name)?n.link:"anchor"===i?n.anchor:it.none()).getOr([]);return u=o.text,a=r.name,l=s,c=t[a],f=0<u.length,void 0!==c?xt(c,l).map(function(t){return{url:{value:t.value,meta:{text:f?u:t.text,attach:e}},text:f?u:t.text}}):it.none()}var o={text:t.text,title:t.title};return{onChange:function(t,n){var e,i,u,a,l,c,f=n.name;return"url"===f?(i=t(),u=i.url,l=m(o.text.length<=0,it.from(u.meta.text).getOr(u.value)),a=i.url,c=m(o.title.length<=0,it.from(a.meta.title).getOr("")),l.isSome()||c.isSome()?it.some(st(st({},l.map(function(t){return{text:t}}).getOr({})),c.map(function(t){return{title:t}}).getOr({}))):it.none()):(e=["anchor","link"],-1<ut.call(e,f)?r(t(),n):("text"!==f&&"title"!==f||(o[f]=t()[f]),it.none()))}}},Ot=tinymce.util.Tools.resolve("tinymce.util.Delay"),wt=tinymce.util.Tools.resolve("tinymce.util.Promise"),Ct=function(t,n){return f([E,(e=g(t),r=t.getParam("link_default_protocol","http","string"),function(t){var n=t.href;return 1===e&&!N(n)||0===e&&/^\s*www(\.|\d\.)/i.test(n)?it.some({message:"The URL you entered seems to be an external link. Do you want to add the required "+r+":// prefix?",preprocess:function(t){return st(st({},t),{href:r+"://"+n})}}):it.none()})],function(t){return t(n)}).fold(function(){return wt.resolve(n)},function(e){return new wt(function(r){var o=t,i=e.message,u=function(t){r(t?e.preprocess(n):n)},a=o.selection.getRng();Ot.setEditorTimeout(o,function(){o.windowManager.confirm(i,function(t){o.selection.setRng(a),u(t)})})})});var e,r},Nt=tinymce.util.Tools.resolve("tinymce.util.XHR"),At=[{text:"Current window",value:""},{text:"New window",value:"_blank"}],Tt=function(t,n){function e(t){return r.convertURL(t.value||t.url,"href")}return o=(r=t).getParam("link_list"),new wt(function(t){$(o)?Nt.send({url:o,success:function(n){return t(function(t){try{return it.some(JSON.parse(t))}catch(t){return it.none()}}(n))},error:function(n){return t(it.none())}}):tt(o)?o(function(n){return t(it.some(n))}):t(it.from(o))}).then(function(t){return t.bind(ft.sanitizeWith(e)).map(function(t){return 0<t.length?[{text:"None",value:""}].concat(t):t})}).then(function(e){var r,o,i,u,a,l,c,f,m,g,d=(o=n,i=(r=t).dom,u=_(r)?it.some(P(r.selection,o)):it.none(),a=o?it.some(i.getAttrib(o,"href")):it.none(),l=o?it.from(i.getAttrib(o,"target")):it.none(),c=M(i,o,"rel"),f=M(i,o,"class"),{url:a,text:u,title:M(i,o,"title"),target:l,rel:c,linkClass:f});return{anchor:d,catalogs:{targets:(g=h(t),Q(g)?ft.sanitize(g).orThunk(function(){return it.some(At)}):!1===g?it.none():it.some(At)),rels:function(t,n){var e=p(t);if(0<e.length){var r=s(n,"_blank");return(!1===v(t)?ft.sanitizeWith(function(t){return A(ft.getValue(t),r)}):ft.sanitize)(e)}return it.none()}(t,d.target),classes:0<(m=t.getParam("link_class_list",[],"array")).length?ft.sanitize(m):it.none(),anchor:H(t),link:e},optNode:it.from(n),flags:{titleEnabled:t.getParam("link_title",!0,"boolean")}}});var r,o};J.add("link",function(t){function n(t){var n=c.selection.getNode();return t.setDisabled(!T(c,n)),e}var r,o,i,u,a,l,c;(r=t).ui.registry.addToggleButton("link",{icon:"link",tooltip:"Insert/edit link",onAction:z(r),onSetup:q(r)}),r.ui.registry.addButton("openlink",{icon:"new-tab",tooltip:"Open link",onAction:j(r),onSetup:F(r)}),r.ui.registry.addButton("unlink",{icon:"unlink",tooltip:"Remove link",onAction:function(){return L(r)},onSetup:W(r)}),(o=t).ui.registry.addMenuItem("openlink",{text:"Open link",icon:"new-tab",onAction:j(o),onSetup:F(o)}),o.ui.registry.addMenuItem("link",{icon:"link",text:"Link...",shortcut:"Meta+K",onAction:z(o)}),o.ui.registry.addMenuItem("unlink",{icon:"unlink",text:"Remove link",onAction:function(){return L(o)},onSetup:W(o)}),(i=t).ui.registry.addContextMenu("link",{update:function(t){return S(i.dom.getParents(t,"a"))?"link unlink openlink":"link"}}),(c=t).ui.registry.addContextForm("quicklink",{launch:{type:"contextformtogglebutton",icon:"link",tooltip:"Link",onSetup:q(c)},label:"Link",predicate:function(t){return!!T(c,t)&&c.getParam("link_context_toolbar",!1,"boolean")},initValue:function(){var t=T(c);return t?pt(t):""},commands:[{type:"contextformtogglebutton",icon:"link",tooltip:"Link",primary:!0,onSetup:function(t){var n=c.selection.getNode();return t.setActive(!!T(c,n)),q(c)(t)},onAction:function(t){var n=t.getValue(),r=function(t){var n=T(c),e=_(c);if(n||!e)return it.none();var r=P(c.selection,n);return it.some(0<r.length?r:t)}(n);D(c,{href:n,attach:e},{href:n,text:r,title:it.none(),rel:it.none(),target:it.none(),"class":it.none()}),c.selection.collapse(!1),t.hide()}},{type:"contextformbutton",icon:"unlink",tooltip:"Remove link",onSetup:n,onAction:function(t){L(c),t.hide()}},{type:"contextformbutton",icon:"new-tab",tooltip:"Open link",onSetup:n,onAction:function(t){j(c)(),t.hide()}}]}),(l=t).on("click",function(t){var n=B(l,t.target);n&&X.metaKeyPressed(t)&&(t.preventDefault(),K(l,n))}),l.on("keydown",function(t){var n=I(l);n&&13===t.keyCode&&!0===t.altKey&&!1===t.shiftKey&&!1===t.ctrlKey&&!1===t.metaKey&&(t.preventDefault(),K(l,n))}),(u=t).addCommand("mceLink",function(){u.getParam("link_quicklink",!1,"boolean")?u.fire("contexttoolbar-show",{toolbarKey:"quicklink"}):z(u)()}),(a=t).addShortcut("Meta+K","",function(){a.execCommand("mceLink")})})}();