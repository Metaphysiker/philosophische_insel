/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 *
 * Version: 5.10.1 (2021-11-03)
 */
!function(){"use strict";function e(n){return function(e){return r=typeof(t=e),(null===t?"null":"object"==r&&(Array.prototype.isPrototypeOf(t)||t.constructor&&"Array"===t.constructor.name)?"array":"object"==r&&(String.prototype.isPrototypeOf(t)||t.constructor&&"String"===t.constructor.name)?"string":r)===n;var t,r}}function s(e){return null!=e}function o(e){return function(){return e}}function t(e){return e}function r(){return d}var n=tinymce.util.Tools.resolve("tinymce.PluginManager"),p=function(){return(p=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var a in t=arguments[r])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},i=e("string"),u=e("object"),l=e("array"),c=o(!1),m=o(!0),d={fold:function(e,t){return e()},isSome:c,isNone:m,getOr:t,getOrThunk:a,getOrDie:function(e){throw new Error(e||"error: getOrDie called on none.")},getOrNull:o(null),getOrUndefined:o(void 0),or:t,orThunk:a,map:r,each:function(){},bind:r,exists:c,forall:m,filter:function(){return d},toArray:function(){return[]},toString:o("none()")};function a(e){return e()}function h(e,t){for(var r=0,n=e.length;r<n;r++)t(e[r],r)}function f(e){var t=e;return{get:function(){return t},set:function(e){t=e}}}function g(e,t){return J(e,t)?W.from(e[t]):W.none()}function v(e){return e.getParam("media_scripts")}function b(e,t){if(e)for(var r=0;r<e.length;r++)if(-1!==t.indexOf(e[r].filter))return e[r]}function w(e){return e.replace(/px$/,"")}function y(i,e){var c=f(!1),s={};return V({validate:!1,allow_conditional_comments:!0,start:function(e,t){if(!c.get())if(J(t.map,"data-ephox-embed-iri"))c.set(!0),o=(a=(n=t).map.style)?X.parseStyle(a):{},s={type:"ephox-embed-iri",source:n.map["data-ephox-embed-iri"],altsource:"",poster:"",width:g(o,"max-width").map(w).getOr(""),height:g(o,"max-height").map(w).getOr("")};else{if(s.source||"param"!==e||(s.source=t.map.movie),"iframe"!==e&&"object"!==e&&"embed"!==e&&"video"!==e&&"audio"!==e||(s.type||(s.type=e),s=K.extend(t.map,s)),"script"===e){var r=b(i,t.map.src);if(!r)return;s={type:"script",source:t.map.src,width:String(r.width),height:String(r.height)}}"source"===e&&(s.source?s.altsource||(s.altsource=t.map.src):s.source=t.map.src),"img"!==e||s.poster||(s.poster=t.map.src)}var n,a,o}}).parse(e),s.source=s.source||s.src||s.data,s.altsource=s.altsource||"",s.poster=s.poster||"",s}function x(e){return{mp3:"audio/mpeg",m4a:"audio/x-m4a",wav:"audio/wav",mp4:"video/mp4",webm:"video/webm",ogg:"video/ogg",swf:"application/x-shockwave-flash"}[e.toLowerCase().split(".").pop()]||""}function j(e){return/^[0-9.]+$/.test(e)?e+"px":e}function O(o,e){!function(e){for(var t=q(e),r=0,n=t.length;r<n;r++){var a=t[r];!function(e,t){var r=""+e;if(o.map[t])for(var n=o.length;n--;){var a=o[n];a.name===t&&(r?(o.map[t]=r,a.value=r):(delete o.map[t],o.splice(n,1)))}else r&&(o.push({name:t,value:r}),o.map[t]=r)}(e[a],a)}}(e)}function S(e,c,s){var u,l=Z(),m=f(!1),d=0;return V({validate:!1,allow_conditional_comments:!0,comment:function(e){l.comment(e)},cdata:function(e){l.cdata(e)},text:function(e,t){l.text(e,t)},start:function(e,t,r){if(!m.get())if(J(t.map,"data-ephox-embed-iri"))m.set(!0),n=c,(i=(o=(a=t).map.style)?ee.parseStyle(o):{})["max-width"]=j(n.width),i["max-height"]=j(n.height),O(a,{style:ee.serializeStyle(i)});else{switch(e){case"video":case"object":case"embed":case"img":case"iframe":void 0!==c.height&&void 0!==c.width&&O(t,{width:c.width,height:c.height})}if(s)switch(e){case"video":O(t,{poster:c.poster,src:""}),c.altsource&&O(t,{src:""});break;case"iframe":O(t,{src:c.source});break;case"source":if(d<2&&(O(t,{src:c[te[d]],type:c[te[d]+"mime"]}),!c[te[d]]))return;d++;break;case"img":if(!c.poster)return;u=!0}}var n,a,o,i;l.start(e,t,r)},end:function(e){if(!m.get()){if("video"===e&&s)for(var t,r=0;r<2;r++)c[te[r]]&&((t=[]).map={},d<=r&&(O(t,{src:c[te[r]],type:c[te[r]+"mime"]}),l.start("source",t,!0)));var n;c.poster&&"object"===e&&s&&!u&&((n=[]).map={},O(n,{src:c.poster,width:c.width,height:c.height}),l.start("img",n,!0))}l.end(e)}},Y({})).parse(e),l.getContent()}function _(e,t){for(var r,n=(r=t.match(/^(https?:\/\/|www\.)(.+)$/i))&&1<r.length&&"www."!==r[1]?r[1]:"https://",a=e.regex.exec(t),o=n+e.url,i=0;i<a.length;i++)!function(e){o=o.replace("$"+e,function(){return a[e]||""})}(i);return o.replace(/\?$/,"")}function k(r,e){var n=K.extend({},e);if(!n.source&&(K.extend(n,y(v(r),n.embed)),!n.source))return"";n.altsource||(n.altsource=""),n.poster||(n.poster=""),n.source=r.convertURL(n.source,"source"),n.altsource=r.convertURL(n.altsource,"source"),n.sourcemime=x(n.source),n.altsourcemime=x(n.altsource),n.poster=r.convertURL(n.poster,"poster");var t,a,o=(t=n.source,0<(a=re.filter(function(e){return e.regex.test(t)})).length?K.extend({},a[0],{url:_(a[0],t)}):null);if(o&&(n.source=o.url,n.type=o.type,n.allowfullscreen=o.allowFullscreen,n.width=n.width||String(o.w),n.height=n.height||String(o.h)),n.embed)return S(n.embed,n,!0);var i=b(v(r),n.source);i&&(n.type="script",n.width=String(i.width),n.height=String(i.height));var c,s,u,l,m=r.getParam("audio_template_callback"),d=r.getParam("video_template_callback");return n.width=n.width||"300",n.height=n.height||"150",K.each(n,function(e,t){n[t]=r.dom.encode(""+e)}),"iframe"===n.type?(l=n.allowfullscreen?' allowFullscreen="1"':"",'<iframe src="'+n.source+'" width="'+n.width+'" height="'+n.height+'"'+l+"></iframe>"):"application/x-shockwave-flash"===n.sourcemime?(u='<object data="'+n.source+'" width="'+n.width+'" height="'+n.height+'" type="application/x-shockwave-flash">',n.poster&&(u+='<img src="'+n.poster+'" width="'+n.width+'" height="'+n.height+'" />'),u+"</object>"):-1!==n.sourcemime.indexOf("audio")?(s=n,m?m(s):'<audio controls="controls" src="'+s.source+'">'+(s.altsource?'\n<source src="'+s.altsource+'"'+(s.altsourcemime?' type="'+s.altsourcemime+'"':"")+" />\n":"")+"</audio>"):"script"===n.type?'<script src="'+n.source+'"><\/script>':(c=n,d?d(c):'<video width="'+c.width+'" height="'+c.height+'"'+(c.poster?' poster="'+c.poster+'"':"")+' controls="controls">\n<source src="'+c.source+'"'+(c.sourcemime?' type="'+c.sourcemime+'"':"")+" />\n"+(c.altsource?'<source src="'+c.altsource+'"'+(c.altsourcemime?' type="'+c.altsourcemime+'"':"")+" />\n":"")+"</video>")}function A(e){return e.hasAttribute("data-mce-object")||e.hasAttribute("data-ephox-embed-iri")}function T(t){return function(e){return k(t,e)}}function C(e,t){var r,n,a,o,i,c=e.getParam("media_url_resolver");return c?(a=t,o=T(e),i=c,new ne(function(t,e){function r(e){return e.html&&(ae[a.source]=e),t({url:a.source,html:e.html||o(a)})}ae[a.source]?r(ae[a.source]):i({url:a.source},r,e)})):(n=T(e),ne.resolve({html:n(r=t),url:r.source}))}function D(e,t){var r,n,o,i,c,a=t?g(e,t).bind(function(e){return g(e,"meta")}).getOr({}):{},s=(o=e,i=a,c=t,function(e){function t(){return g(o,e)}function r(){return g(i,e)}function n(e){return g(e,"value").bind(function(e){return 0<e.length?W.some(e):W.none()})}var a={};return a[e]=(e===c?t().bind(function(e){return u(e)?n(e).orThunk(r):r().orThunk(function(){return W.from(e)})}):r().orThunk(function(){return t().bind(function(e){return u(e)?n(e):W.from(e)})})).getOr(""),a});return p(p(p(p(p({},s("source")),s("altsource")),s("poster")),s("embed")),(r=a,n={},g(e,"dimensions").each(function(e){h(["width","height"],function(t){g(r,t).orThunk(function(){return g(e,t)}).each(function(e){return n[t]=e})})}),n))}function P(e){var n=p(p({},e),{source:{value:g(e,"source").getOr("")},altsource:{value:g(e,"altsource").getOr("")},poster:{value:g(e,"poster").getOr("")}});return h(["width","height"],function(r){g(e,r).each(function(e){var t=n.dimensions||{};t[r]=e,n.dimensions=t})}),n}function $(r){return function(e){var t=e&&e.msg?"Media embed handler error: "+e.msg:"Media embed handler threw unknown error.";r.notificationManager.open({type:"error",text:t})}}function M(e,t){return y(v(e),t)}function F(a,o){return function(e){var t,r,n;i(e.url)&&0<e.url.trim().length&&(t=e.html,r=M(o,t),n=p(p({},r),{source:e.url,embed:t}),a.setData(P(n)))}}function z(e,t){var r=e.dom.select("*[data-mce-object]");e.insertContent(t),function(e,t){for(var r=e.dom.select("*[data-mce-object]"),n=0;n<t.length;n++)for(var a=r.length-1;0<=a;a--)t[n]===r[a]&&r.splice(a,1);e.selection.select(r[0])}(e,r),e.nodeChanged()}function N(m){var e,t,r,n=(r=A(t=(e=m).selection.getNode())?e.serializer.serialize(t,{selection:!0}):"",p({embed:r},y(v(e),r))),d=f(n),a=P(n),o={title:"General",name:"general",items:function(e){for(var t=[],r=0,n=e.length;r<n;++r){if(!l(e[r]))throw new Error("Arr.flatten item "+r+" was not an array, input: "+e);G.apply(t,e[r])}return t}([[{name:"source",type:"urlinput",filetype:"media",label:"Source"}],m.getParam("media_dimensions",!0)?[{type:"sizeinput",name:"dimensions",label:"Constrain proportions",constrain:!0}]:[]])},i=[];m.getParam("media_alt_source",!0)&&i.push({name:"altsource",type:"urlinput",filetype:"media",label:"Alternative source URL"}),m.getParam("media_poster",!0)&&i.push({name:"poster",type:"urlinput",filetype:"image",label:"Media poster (Image URL)"});var c=[o,{title:"Embed",items:[{type:"textarea",name:"embed",label:"Paste your embed code below:"}]}];0<i.length&&c.push({title:"Advanced",name:"advanced",items:i});var h=m.windowManager.open({title:"Insert/Edit Media",size:"normal",body:{type:"tabpanel",tabs:c},buttons:[{type:"cancel",name:"cancel",text:"Cancel"},{type:"submit",name:"save",text:"Save",primary:!0}],onSubmit:function(e){var t,r,n,a,o=D(e.getData());t=d.get(),n=m,(r=o).embed=S(r.embed,r),r.embed&&(t.source===r.source||(a=r.source,J(ae,a)))?z(n,r.embed):C(n,r).then(function(e){z(n,e.html)}).catch($(n)),e.close()},onChange:function(e,t){switch(t.name){case"source":u=d.get(),l=D(e.getData(),"source"),u.source!==l.source&&(F(h,m)({url:l.source,html:""}),C(m,l).then(F(h,m)).catch($(m)));break;case"embed":c=D((i=e).getData()),s=M(m,c.embed),i.setData(P(s));break;case"dimensions":case"altsource":case"poster":n=t.name,a=D((r=e).getData(),n),o=k(m,a),r.setData(P(p(p({},a),{embed:o})))}var r,n,a,o,i,c,s,u,l;d.set(D(e.getData()))},initialData:a})}function U(o,e){if(!1===o.getParam("media_filter_html",!0))return e;var i,c=Z();return V({validate:!1,allow_conditional_comments:!1,comment:function(e){i||c.comment(e)},cdata:function(e){i||c.cdata(e)},text:function(e,t){i||c.text(e,t)},start:function(e,t,r){if(i=!0,"script"!==e&&"noscript"!==e&&"svg"!==e){for(var n=t.length-1;0<=n;n--){var a=t[n].name;0===a.indexOf("on")&&(delete t.map[a],t.splice(n,1)),"style"===a&&(t[n].value=o.dom.serializeStyle(o.dom.parseStyle(t[n].value),e))}c.start(e,t,r),i=!1}},end:function(e){i||c.end(e)}},Y({})).parse(e),c.getContent()}function E(e,t,r,n){void 0===n&&(n=null);var a=e.attr(r);return s(a)?a:J(t,r)?null:n}function R(e,t,r){var n="img"===t.name||"video"===e.name,a="audio"===e.name?"30":"150",o=n?a:null;t.attr({width:E(e,r,"width",n?"300":null),height:E(e,r,"height",o)})}function L(e,t){var r=t.name,n=new oe("span",1);n.attr({contentEditable:"false",style:t.attr("style"),"data-mce-object":r,class:"mce-preview-object mce-object-"+r}),se(e,t,n);var a,o=e.dom.parseStyle(t.attr("style")),i=new oe(r,1);R(t,i,o),i.attr({src:t.attr("src"),style:t.attr("style"),class:t.attr("class")}),"iframe"===r?i.attr({allowfullscreen:t.attr("allowfullscreen"),frameborder:"0"}):(h(["controls","crossorigin","currentTime","loop","muted","poster","preload"],function(e){i.attr(e,t.attr(e))}),s(a=n.attr("data-mce-html"))&&function(e,t,r,n){for(var a=ce({forced_root_block:!1,validate:!1},e.schema).parse(n,{context:t});a.firstChild;)r.append(a.firstChild)}(e,r,i,unescape(a)));var c=new oe("span",1);return c.attr("class","mce-shim"),n.append(i),n.append(c),n}function I(e){for(;e=e.parent;)if(e.attr("data-ephox-embed-iri")||(t=e.attr("class"))&&/\btiny-pageembed\b/.test(t))return 1;var t}var B=function(r){function e(){return a}function t(e){return e(r)}var n=o(r),a={fold:function(e,t){return t(r)},isSome:m,isNone:c,getOr:n,getOrThunk:n,getOrDie:n,getOrNull:n,getOrUndefined:n,or:e,orThunk:e,map:function(e){return B(e(r))},each:function(e){e(r)},bind:t,exists:t,forall:t,filter:function(e){return e(r)?a:d},toArray:function(){return[r]},toString:function(){return"some("+r+")"}};return a},W={some:B,none:r,from:function(e){return null==e?d:B(e)}},G=Array.prototype.push,q=Object.keys,H=Object.hasOwnProperty,J=function(e,t){return H.call(e,t)},K=tinymce.util.Tools.resolve("tinymce.util.Tools"),Q=tinymce.util.Tools.resolve("tinymce.dom.DOMUtils"),V=tinymce.util.Tools.resolve("tinymce.html.SaxParser"),X=Q.DOM,Y=tinymce.util.Tools.resolve("tinymce.html.Schema"),Z=tinymce.util.Tools.resolve("tinymce.html.Writer"),ee=Q.DOM,te=["source","altsource"],re=[{regex:/youtu\.be\/([\w\-_\?&=.]+)/i,type:"iframe",w:560,h:314,url:"www.youtube.com/embed/$1",allowFullscreen:!0},{regex:/youtube\.com(.+)v=([^&]+)(&([a-z0-9&=\-_]+))?/i,type:"iframe",w:560,h:314,url:"www.youtube.com/embed/$2?$4",allowFullscreen:!0},{regex:/youtube.com\/embed\/([a-z0-9\?&=\-_]+)/i,type:"iframe",w:560,h:314,url:"www.youtube.com/embed/$1",allowFullscreen:!0},{regex:/vimeo\.com\/([0-9]+)/,type:"iframe",w:425,h:350,url:"player.vimeo.com/video/$1?title=0&byline=0&portrait=0&color=8dc7dc",allowFullscreen:!0},{regex:/vimeo\.com\/(.*)\/([0-9]+)/,type:"iframe",w:425,h:350,url:"player.vimeo.com/video/$2?title=0&amp;byline=0",allowFullscreen:!0},{regex:/maps\.google\.([a-z]{2,3})\/maps\/(.+)msid=(.+)/,type:"iframe",w:425,h:350,url:'maps.google.com/maps/ms?msid=$2&output=embed"',allowFullscreen:!1},{regex:/dailymotion\.com\/video\/([^_]+)/,type:"iframe",w:480,h:270,url:"www.dailymotion.com/embed/video/$1",allowFullscreen:!0},{regex:/dai\.ly\/([^_]+)/,type:"iframe",w:480,h:270,url:"www.dailymotion.com/embed/video/$1",allowFullscreen:!0}],ne=tinymce.util.Tools.resolve("tinymce.util.Promise"),ae={},oe=tinymce.util.Tools.resolve("tinymce.html.Node"),ie=tinymce.util.Tools.resolve("tinymce.Env"),ce=tinymce.util.Tools.resolve("tinymce.html.DomParser"),se=function(e,t,r){for(var n=t.attributes,a=n.length;a--;){var o=n[a].name,i=n[a].value;"width"!==o&&"height"!==o&&"style"!==o&&("data"!==o&&"src"!==o||(i=e.convertURL(i,o)),r.attr("data-mce-p-"+o,i))}var c=t.firstChild&&t.firstChild.value;c&&(r.attr("data-mce-html",escape(U(e,c))),r.firstChild=null)};n.add("media",function(e){var t,r,d,n,a;function o(){return r.execCommand("mceMedia")}return(t=e).addCommand("mceMedia",function(){N(t)}),(r=e).ui.registry.addToggleButton("media",{tooltip:"Insert/edit media",icon:"embed",onAction:o,onSetup:function(e){var t=r.selection;return e.setActive(A(t.getNode())),t.selectorChangedWithUnbind("img[data-mce-object],span[data-mce-object],div[data-ephox-embed-iri]",e.setActive).unbind}}),r.ui.registry.addMenuItem("media",{icon:"embed",text:"Media...",onAction:o}),e.on("ResolveName",function(e){var t;1===e.target.nodeType&&(t=e.target.getAttribute("data-mce-object"))&&(e.name=t)}),(d=e).on("preInit",function(){var t=d.schema.getSpecialElements();K.each("video audio iframe object".split(" "),function(e){t[e]=new RegExp("</"+e+"[^>]*>","gi")});var u,r=d.schema.getBoolAttrs();K.each("webkitallowfullscreen mozallowfullscreen allowfullscreen".split(" "),function(e){r[e]={}}),d.parser.addNodeFilter("iframe,video,audio,object,embed,script",(u=d,function(e){for(var t,r,n,a,o,i,c,s=e.length;s--;)(t=e[s]).parent&&(t.parent.attr("data-mce-object")||"script"===t.name&&!(r=b(v(u),t.attr("src")))||(r&&(r.width&&t.attr("width",r.width.toString()),r.height&&t.attr("height",r.height.toString())),("iframe"===(c=t.name)||"video"===c||"audio"===c)&&u.getParam("media_live_embeds",!0)&&ie.ceFalse?I(t)||t.replace(L(u,t)):I(t)||t.replace((n=u,i=void 0,o=(a=t).name,(i=new oe("img",1)).shortEnded=!0,se(n,a,i),R(a,i,{}),i.attr({style:a.attr("style"),src:ie.transparentSrc,"data-mce-object":o,class:"mce-object mce-object-"+o}),i))))})),d.serializer.addAttributeFilter("data-mce-object",function(e,t){for(var r,n,a,o,i,c,s,u,l=e.length;l--;)if((r=e[l]).parent){for(s=r.attr(t),n=new oe(s,1),"audio"!==s&&"script"!==s&&((u=r.attr("class"))&&-1!==u.indexOf("mce-preview-object")?n.attr({width:r.firstChild.attr("width"),height:r.firstChild.attr("height")}):n.attr({width:r.attr("width"),height:r.attr("height")})),n.attr({style:r.attr("style")}),a=(o=r.attributes).length;a--;){var m=o[a].name;0===m.indexOf("data-mce-p-")&&n.attr(m.substr(11),o[a].value)}"script"===s&&n.attr("type","text/javascript"),(i=r.attr("data-mce-html"))&&((c=new oe("#text",3)).raw=!0,c.value=U(d,unescape(i)),n.append(c)),r.replace(n)}})}),d.on("SetContent",function(){d.$("span.mce-preview-object").each(function(e,t){var r=d.$(t);0===r.find("span.mce-shim").length&&r.append('<span class="mce-shim"></span>')})}),(n=e).on("click keyup touchend",function(){var e=n.selection.getNode();e&&n.dom.hasClass(e,"mce-preview-object")&&n.dom.getAttrib(e,"data-mce-selected")&&e.setAttribute("data-mce-selected","2")}),n.on("ObjectSelected",function(e){"script"===e.target.getAttribute("data-mce-object")&&e.preventDefault()}),n.on("ObjectResized",function(e){var t,r=e.target;!r.getAttribute("data-mce-object")||(t=r.getAttribute("data-mce-html"))&&(t=unescape(t),r.setAttribute("data-mce-html",escape(S(t,{width:String(e.width),height:String(e.height)}))))}),a=e,{showDialog:function(){N(a)}}})}();