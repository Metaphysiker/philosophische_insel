/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 *
 * Version: 5.8.0 (2021-05-06)
 */
!function(){"use strict";var n,t,e,r,o=tinymce.util.Tools.resolve("tinymce.PluginManager"),i=tinymce.util.Tools.resolve("tinymce.util.VK"),u=function(r){return function(t){return e=typeof(n=t),(null===n?"null":"object"==e&&(Array.prototype.isPrototypeOf(n)||n.constructor&&"Array"===n.constructor.name)?"array":"object"==e&&(String.prototype.isPrototypeOf(n)||n.constructor&&"String"===n.constructor.name)?"string":e)===r;var n,e}},a=function(n){return function(t){return typeof t===n}},l=u("string"),c=u("array"),f=function(t){return n===t},s=a("boolean"),m=a("function"),g=function(t){var n=t.getParam("link_assume_external_targets",!1);return s(n)&&n?1:!l(n)||"http"!==n&&"https"!==n?0:n},p=function(t){return t.getParam("default_link_target")},d=function(t){return t.getParam("target_list",!0)},h=function(t){return t.getParam("rel_list",[],"array")},v=function(t){return t.getParam("allow_unsafe_link_target",!1,"boolean")},y=function(){},k=function(t){return function(){return t}},x=k(!1),b=k(!(n=null)),O=function(){return w},w=(t=function(t){return t.isNone()},{fold:function(t,n){return t()},is:x,isSome:x,isNone:b,getOr:r=function(t){return t},getOrThunk:e=function(t){return t()},getOrDie:function(t){throw new Error(t||"error: getOrDie called on none.")},getOrNull:k(null),getOrUndefined:k(undefined),or:r,orThunk:e,map:O,each:y,bind:O,exists:x,forall:b,filter:O,equals:t,equals_:t,toArray:function(){return[]},toString:k("none()")}),C=function(e){var t=k(e),n=function(){return o},r=function(t){return t(e)},o={fold:function(t,n){return n(e)},is:function(t){return e===t},isSome:b,isNone:x,getOr:t,getOrThunk:t,getOrDie:t,getOrNull:t,getOrUndefined:t,or:n,orThunk:n,map:function(t){return C(t(e))},each:function(t){t(e)},bind:r,exists:r,forall:r,filter:function(t){return t(e)?o:w},toArray:function(){return[e]},toString:function(){return"some("+e+")"},equals:function(t){return t.is(e)},equals_:function(t,n){return t.fold(x,function(t){return n(e,t)})}};return o},N={some:C,none:O,from:function(t){return null===t||t===undefined?w:C(t)}},A=Array.prototype.indexOf,P=Array.prototype.push,T=function(t,n){return e=t,r=n,-1<A.call(e,r);var e,r},S=function(t){for(var n=[],e=0,r=t.length;e<r;++e){if(!c(t[e]))throw new Error("Arr.flatten item "+e+" was not an array, input: "+t);P.apply(n,t[e])}return n},_=function(t,n){return S(function(t,n){for(var e=t.length,r=new Array(e),o=0;o<e;o++){var i=t[o];r[o]=n(i,o)}return r}(t,n))},R=function(t,n){for(var e=0;e<t.length;e++){var r=n(t[e],e);if(r.isSome())return r}return N.none()},D=function(t,n){return t?N.some(n):N.none()},L=tinymce.util.Tools.resolve("tinymce.util.Tools"),E=function(t){return l(t.value)?t.value:""},M=function(t,i){var u=[];return L.each(t,function(t){var n,e,r,o=l((n=t).text)?n.text:l(n.title)?n.title:"";t.menu!==undefined?(e=M(t.menu,i),u.push({text:o,items:e})):(r=i(t),u.push({text:o,value:r}))}),u},U=function(n){return void 0===n&&(n=E),function(t){return N.from(t).map(function(t){return M(t,n)})}},B={sanitize:function(t){return U(E)(t)},sanitizeWith:U,createUi:function(n,e){return function(t){return{name:n,type:"listbox",label:e,items:t}}},getValue:E},q=function(){return(q=Object.assign||function(t){for(var n,e=1,r=arguments.length;e<r;e++)for(var o in n=arguments[e])Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o]);return t}).apply(this,arguments)},I=Object.keys,K=Object.hasOwnProperty,z=function(t,e,r,o){return function(t,n){for(var e=I(t),r=0,o=e.length;r<o;r++){var i=e[r];n(t[i],i)}}(t,function(t,n){(e(t,n)?r:o)(t,n)}),{}},j=function(t,n){var e,r={};return z(t,n,(e=r,function(t,n){e[n]=t}),y),r},V=function(t,n){return K.call(t,n)},F=tinymce.util.Tools.resolve("tinymce.dom.TreeWalker"),W=function(t){return t&&"a"===t.nodeName.toLowerCase()},H=function(t){return W(t)&&!!X(t)},G=function(t,n){if(t.collapsed)return[];for(var e=t.cloneContents(),r=new F(e.firstChild,e),o=[],i=e.firstChild;n(i)&&o.push(i),i=r.next(););return o},J=function(t){return/^\w+:/i.test(t)},X=function(t){var n=t.getAttribute("data-mce-href");return n||t.getAttribute("href")},$=function(t,n){var e,r,o=["noopener"],i=t?t.split(/\s+/):[],u=function(t){return t.filter(function(t){return-1===L.inArray(o,t)})},a=n?0<(e=u(e=i)).length?e.concat(o):o:u(i);return 0<a.length?(r=a,L.trim(r.sort().join(" "))):""},Q=function(t,n){return n=n||t.selection.getNode(),nt(n)?t.dom.select("a[href]",n)[0]:t.dom.getParent(n,"a[href]")},Y=function(t,n){var e=n?n.innerText||n.textContent:t.getContent({format:"text"});return e.replace(/\uFEFF/g,"")},Z=function(t){return 0<L.grep(t,H).length},tt=function(t){var n=t.schema.getTextInlineElements();return 0===G(t.selection.getRng(),function(t){return 1===t.nodeType&&!W(t)&&!V(n,t.nodeName.toLowerCase())}).length},nt=function(t){return t&&"FIGURE"===t.nodeName&&/\bimage\b/i.test(t.className)},et=function(t){return n=["title","rel","class","target"],e=function(n,e){return t[e].each(function(t){n[e]=0<t.length?t:null}),n},r={href:t.href},function(t,n){for(var e=0,r=t.length;e<r;e++)n(t[e],e)}(n,function(t){r=e(r,t)}),r;var n,e,r},rt=function(t,n){var e,r,o,i=q({},n);return 0<h(t).length||!1!==v(t)||(e=$(i.rel,"_blank"===i.target),i.rel=e||null),N.from(i.target).isNone()&&!1===d(t)&&(i.target=p(t)),i.href=(r=i.href,"http"!==(o=g(t))&&"https"!==o||J(r)?r:o+"://"+r),i},ot=function(l,c,f){var s=l.selection.getNode(),m=Q(l,s),g=rt(l,et(f));l.undoManager.transact(function(){var n,t,e,r,o,i,u,a;f.href===c.href&&c.attach(),m?(l.focus(),o=l,i=m,u=f.text,a=g,u.each(function(t){i.hasOwnProperty("innerText")?i.innerText=t:i.textContent=t}),o.dom.setAttribs(i,a),o.selection.select(i)):(n=l,t=s,e=f.text,r=g,nt(t)?ct(n,t,r):e.fold(function(){n.execCommand("mceInsertLink",!1,r)},function(t){n.insertContent(n.dom.createHTML("a",r,n.dom.encode(t)))}))})},it=function(l){l.undoManager.transact(function(){var t,n,e,r,o,i,u,a=l.selection.getNode();nt(a)?lt(l,a):(n=(t=l).dom,e=t.selection,r=e.getBookmark(),o=e.getRng().cloneRange(),i=n.getParent(o.startContainer,"a[href]",t.getBody()),u=n.getParent(o.endContainer,"a[href]",t.getBody()),i&&o.setStartBefore(i),u&&o.setEndAfter(u),e.setRng(o),t.execCommand("unlink"),e.moveToBookmark(r)),l.focus()})},ut=function(t,n,e){var r,o,i,u,a,l,c;t.hasPlugin("rtc",!0)?t.execCommand("createlink",!1,(o=(r=e)["class"],i=r.href,u=r.rel,a=r.target,l=r.text,c=r.title,j({"class":o.getOrNull(),href:i,rel:u.getOrNull(),target:a.getOrNull(),text:l.getOrNull(),title:c.getOrNull()},function(t,n){return!1===f(t)}))):ot(t,n,e)},at=function(t){t.hasPlugin("rtc",!0)?t.execCommand("unlink"):it(t)},lt=function(t,n){var e,r=t.dom.select("img",n)[0];!r||(e=t.dom.getParents(r,"a[href]",n)[0])&&(e.parentNode.insertBefore(r,e),t.dom.remove(e))},ct=function(t,n,e){var r,o=t.dom.select("img",n)[0];o&&(r=t.dom.create("a",e),o.parentNode.insertBefore(r,o),r.appendChild(o))},ft=function(t){return V(n=t,e="items")&&n[e]!==undefined&&null!==n[e];var n,e},st=function(n,t){return R(t,function(t){return ft(t)?st(n,t.items):D(t.value===n,t)})},mt=function(n,t,e,r){var o=r[t],i=0<n.length;return o!==undefined?st(o,e).map(function(t){return{url:{value:t.value,meta:{text:i?n:t.text,attach:y}},text:i?n:t.text}}):N.none()},gt=function(t,i){var u={text:t.text,title:t.title},r=function(t){var n,e,r=(n=t.url,D(u.text.length<=0,N.from(n.meta.text).getOr(n.value))),o=(e=t.url,D(u.title.length<=0,N.from(e.meta.title).getOr("")));return r.isSome()||o.isSome()?N.some(q(q({},r.map(function(t){return{text:t}}).getOr({})),o.map(function(t){return{title:t}}).getOr({}))):N.none()},o=function(t,n){var e,r,o=(e=i,("link"===(r=n.name)?e.link:"anchor"===r?e.anchor:N.none()).getOr([]));return mt(u.text,n.name,o,t)};return{onChange:function(t,n){var e=n.name;return"url"===e?r(t()):T(["anchor","link"],e)?o(t(),n):(("text"===e||"title"===e)&&(u[e]=t()[e]),N.none())}}},dt=tinymce.util.Tools.resolve("tinymce.util.Delay"),ht=tinymce.util.Tools.resolve("tinymce.util.Promise"),pt=function(t){var n=t.href;return 0<n.indexOf("@")&&-1===n.indexOf("/")&&-1===n.indexOf("mailto:")?N.some({message:"The URL you entered seems to be an email address. Do you want to add the required mailto: prefix?",preprocess:function(t){return q(q({},t),{href:"mailto:"+n})}}):N.none()},vt=function(u,a){return R([pt,(e=g(u),r=u.getParam("link_default_protocol","http","string"),function(t){var n=t.href;return 1===e&&!J(n)||0===e&&/^\s*www(\.|\d\.)/i.test(n)?N.some({message:"The URL you entered seems to be an external link. Do you want to add the required "+r+":// prefix?",preprocess:function(t){return q(q({},t),{href:r+"://"+n})}}):N.none()})],function(t){return t(a)}).fold(function(){return ht.resolve(a)},function(i){return new ht(function(n){var e,t,r,o;e=u,t=i.message,r=function(t){n(t?i.preprocess(a):a)},o=e.selection.getRng(),dt.setEditorTimeout(e,function(){e.windowManager.confirm(t,function(t){e.selection.setRng(o),r(t)})})})});var e,r},yt=function(t){var n=t.dom.select("a:not([href])"),e=_(n,function(t){var n=t.name||t.id;return n?[{text:n,value:"#"+n}]:[]});return 0<e.length?N.some([{text:"None",value:""}].concat(e)):N.none()},kt=function(t){var n=t.getParam("link_class_list",[],"array");return 0<n.length?B.sanitize(n):N.none()},xt=tinymce.util.Tools.resolve("tinymce.util.XHR"),bt=function(n){var e=function(t){return n.convertURL(t.value||t.url,"href")},t=n.getParam("link_list");return new ht(function(n){l(t)?xt.send({url:t,success:function(t){return n(function(t){try{return N.some(JSON.parse(t))}catch(n){return N.none()}}(t))},error:function(t){return n(N.none())}}):m(t)?t(function(t){return n(N.some(t))}):n(N.from(t))}).then(function(t){return t.bind(B.sanitizeWith(e)).map(function(t){if(0<t.length){return[{text:"None",value:""}].concat(t)}return t})})},Ot=function(t,n){var e=h(t);if(0<e.length){var r=n.is("_blank");return(!1===v(t)?B.sanitizeWith(function(t){return $(B.getValue(t),r)}):B.sanitize)(e)}return N.none()},wt=[{text:"Current window",value:""},{text:"New window",value:"_blank"}],Ct=function(t){var n=d(t);return c(n)?B.sanitize(n).orThunk(function(){return N.some(wt)}):!1===n?N.none():N.some(wt)},Nt=function(t,n,e){var r=t.getAttrib(n,e);return null!==r&&0<r.length?N.some(r):N.none()},At=function(f,s){return bt(f).then(function(t){var n,e,r,o,i,u,a,l,c=(e=s,r=(n=f).dom,o=tt(n)?N.some(Y(n.selection,e)):N.none(),i=e?N.some(r.getAttrib(e,"href")):N.none(),u=e?N.from(r.getAttrib(e,"target")):N.none(),a=Nt(r,e,"rel"),l=Nt(r,e,"class"),{url:i,text:o,title:Nt(r,e,"title"),target:u,rel:a,linkClass:l});return{anchor:c,catalogs:{targets:Ct(f),rels:Ot(f,c.target),classes:kt(f),anchor:yt(f),link:t},optNode:N.from(s),flags:{titleEnabled:f.getParam("link_title",!0,"boolean")}}})},Pt=function(h){var t,n;(n=Q(t=h),At(t,n)).then(function(t){var i,u,n,e,r,o,a,l,c,f,s,m,g,d;return e=function(t){var e=t.getData();if(!e.url.value)return at(i),void t.close();var n=function(n){return N.from(e[n]).filter(function(t){return!u.anchor[n].is(t)})},r={href:e.url.value,text:n("text"),target:n("target"),rel:n("rel"),"class":n("linkClass"),title:n("title")},o={href:e.url.value,attach:e.url.meta!==undefined&&e.url.meta.attach?e.url.meta.attach:y};vt(i,r).then(function(t){ut(i,o,t)}),t.close()},r=i=h,c=(n=u=t).anchor.text.map(function(){return{name:"text",type:"input",label:"Text to display"}}).toArray(),f=n.flags.titleEnabled?[{name:"title",type:"input",label:"Title"}]:[],s=N.from(p(r)),o=s,a=n.anchor,m={url:{value:l=a.url.getOr(""),meta:{original:{value:l}}},text:a.text.getOr(""),title:a.title.getOr(""),anchor:l,link:l,rel:a.rel.getOr(""),target:a.target.or(o).getOr(""),linkClass:a.linkClass.getOr("")},g=n.catalogs,d=gt(m,g),{title:"Insert/Edit Link",size:"normal",body:{type:"panel",items:S([[{name:"url",type:"urlinput",filetype:"file",label:"URL"}],c,f,function(t){for(var n=[],e=function(t){n.push(t)},r=0;r<t.length;r++)t[r].each(e);return n}([g.anchor.map(B.createUi("anchor","Anchors")),g.rels.map(B.createUi("rel","Rel")),g.targets.map(B.createUi("target","Open link in...")),g.link.map(B.createUi("link","Link list")),g.classes.map(B.createUi("linkClass","Class"))])])},buttons:[{type:"cancel",name:"cancel",text:"Cancel"},{type:"submit",name:"save",text:"Save",primary:!0}],initialData:m,onChange:function(n,t){var e=t.name;d.onChange(n.getData,{name:e}).each(function(t){n.setData(t)})},onSubmit:e}}).then(function(t){h.windowManager.open(t)})},Tt=function(t){var n=document.createElement("a");n.target="_blank",n.href=t,n.rel="noreferrer noopener";var e,r,o=document.createEvent("MouseEvents");o.initMouseEvent("click",!0,!0,window,0,0,0,0,0,!1,!1,!1,!1,0,null),e=n,r=o,document.body.appendChild(e),e.dispatchEvent(r),document.body.removeChild(e)},St=function(t,n){return t.dom.getParent(n,"a[href]")},_t=function(t){return St(t,t.selection.getStart())},Rt=function(t,n){var e,r;n&&(e=X(n),/^#/.test(e)?(r=t.$(e)).length&&t.selection.scrollIntoView(r[0],!0):Tt(n.href))},Dt=function(t){return function(){Pt(t)}},Lt=function(t){return function(){Rt(t,_t(t))}},Et=function(r){r.on("click",function(t){var n=St(r,t.target);n&&i.metaKeyPressed(t)&&(t.preventDefault(),Rt(r,n))}),r.on("keydown",function(t){var n,e=_t(r);e&&13===t.keyCode&&(!0===(n=t).altKey&&!1===n.shiftKey&&!1===n.ctrlKey&&!1===n.metaKey)&&(t.preventDefault(),Rt(r,e))})},Mt=function(t,n){return t.on("NodeChange",n),function(){return t.off("NodeChange",n)}},Ut=function(n){return function(t){return Mt(n,function(){t.setActive(!n.mode.isReadOnly()&&null!==Q(n,n.selection.getNode()))})}},Bt=function(e){return function(t){var n=function(){return t.setDisabled(null===Q(e,e.selection.getNode()))};return n(),Mt(e,n)}},qt=function(r){return function(n){var e=function(t){return Z(t)||(n=r.selection.getRng(),0<G(n,H).length);var n},t=r.dom.getParents(r.selection.getStart());return n.setDisabled(!e(t)),Mt(r,function(t){return n.setDisabled(!e(t.parents))})}};o.add("link",function(t){var n,e,r,i,o,u,a;(n=t).ui.registry.addToggleButton("link",{icon:"link",tooltip:"Insert/edit link",onAction:Dt(n),onSetup:Ut(n)}),n.ui.registry.addButton("openlink",{icon:"new-tab",tooltip:"Open link",onAction:Lt(n),onSetup:Bt(n)}),n.ui.registry.addButton("unlink",{icon:"unlink",tooltip:"Remove link",onAction:function(){return at(n)},onSetup:qt(n)}),(e=t).ui.registry.addMenuItem("openlink",{text:"Open link",icon:"new-tab",onAction:Lt(e),onSetup:Bt(e)}),e.ui.registry.addMenuItem("link",{icon:"link",text:"Link...",shortcut:"Meta+K",onAction:Dt(e)}),e.ui.registry.addMenuItem("unlink",{icon:"unlink",text:"Remove link",onAction:function(){return at(e)},onSetup:qt(e)}),(r=t).ui.registry.addContextMenu("link",{update:function(t){return Z(r.dom.getParents(t,"a"))?"link unlink openlink":"link"}}),o=function(t){var n=i.selection.getNode();return t.setDisabled(!Q(i,n)),y},(i=t).ui.registry.addContextForm("quicklink",{launch:{type:"contextformtogglebutton",icon:"link",tooltip:"Link",onSetup:Ut(i)},label:"Link",predicate:function(t){return!!Q(i,t)&&i.getParam("link_context_toolbar",!1,"boolean")},initValue:function(){var t=Q(i);return t?X(t):""},commands:[{type:"contextformtogglebutton",icon:"link",tooltip:"Link",primary:!0,onSetup:function(t){var n=i.selection.getNode();return t.setActive(!!Q(i,n)),Ut(i)(t)},onAction:function(t){var n,e,r=Q(i),o=t.getValue();r?i.undoManager.transact(function(){i.dom.setAttrib(r,"href",o),i.selection.collapse(!1),t.hide()}):(n={href:o,attach:y},e=tt(i)?N.some(Y(i.selection,r)).filter(function(t){return 0<t.length}).or(N.from(o)):N.none(),ut(i,n,{href:o,text:e,title:N.none(),rel:N.none(),target:N.none(),"class":N.none()}),t.hide())}},{type:"contextformbutton",icon:"unlink",tooltip:"Remove link",onSetup:o,onAction:function(t){at(i),t.hide()}},{type:"contextformbutton",icon:"new-tab",tooltip:"Open link",onSetup:o,onAction:function(t){Lt(i)(),t.hide()}}]}),Et(t),(u=t).addCommand("mceLink",function(){u.getParam("link_quicklink",!1,"boolean")?u.fire("contexttoolbar-show",{toolbarKey:"quicklink"}):Dt(u)()}),(a=t).addShortcut("Meta+K","",function(){a.execCommand("mceLink")})})}();
