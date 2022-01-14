!function(){"use strict";function t(){}function n(t){return function(){return t}}function e(t){return t}function o(){return b}function r(t){return t()}function i(t){var n=t;return{get:function(){return n},set:function(t){n=t}}}function a(t,n){for(var e=k(t),o=0,r=e.length;r>o;o++){var i=e[o];n(t[i],i)}}function u(t,n){return j.call(t,n)}function c(){function n(){return o.get().each(e)}var e,o,r=(e=t,o=i(O.none()),{clear:function(){n(),o.set(O.none())},isSet:function(){return o.get().isSome()},get:function(){return o.get()},set:function(t){n(),o.set(O.some(t))}});return C(C({},r),{on:function(t){return r.get().each(t)}})}function l(t,n){return-1!==t.indexOf(n)}function s(t,n,e){function o(){return l.get().getOr([])}function r(){return i.isSet()&&l.isSet()}var i=c(),l=c(),s=t.getParam("emoticons_images_url","https://twemoji.maxcdn.com/v/13.0.1/72x72/","string");return t.on("init",function(){_.load(e,n).then(function(n){var e,o,r,c,f,m=(e=t.getParam("emoticons_append",{},"object"),o=function(t){return C({keywords:[],category:"user"},t)},A(e,function(t,n){return{k:n,v:o(t)}}));r=d(n,m),c={},f=[],a(r,function(t,n){var e,o,r,i,a,l={title:n,keywords:t.keywords,"char":(i=(r=t)["char"]).length>=(a="<img").length&&i.substr(0,0+a.length)===a?r["char"].replace(/src="([^"]+)"/,function(t,n){return'src="'+s+n+'"'}):r["char"],category:u(e=D,o=t.category)?e[o]:o},m=void 0!==c[l.category]?c[l.category]:[];c[l.category]=m.concat([l]),f.push(l)}),i.set(c),l.set(f)},function(t){console.log("Failed to load emoticons: "+t),i.set({}),l.set([])})}),{listCategories:function(){return[P].concat(k(i.get().getOr({})))},hasLoaded:r,waitForLoad:function(){return r()?x.resolve(!0):new x(function(t,e){var o=15,i=T.setInterval(function(){r()?(T.clearInterval(i),t(!0)):--o<0&&(console.log("Could not load emojis from url: "+n),T.clearInterval(i),e(!1))},100)})},listAll:o,listCategory:function(t){return t===P?o():i.get().bind(function(n){return O.from(n[t])}).getOr([])}}}function f(t,n,e){for(var o,r,i=[],a=n.toLowerCase(),u=e.fold(function(){return v},function(t){return function(n){return n>=t}}),c=0;c<t.length&&(0!==n.length&&(o=t[c],r=a,!l(o.title.toLowerCase(),r)&&!function(t){for(var n=0,e=t.length;e>n;n++)if(l(t[n].toLowerCase(),r))return 1}(o.keywords))||(i.push({value:t[c]["char"],text:t[c].title,icon:t[c]["char"]}),!u(i.length)));c++);return i}function m(t,n){function e(){h===a||(clearTimeout(a),a=null)}function o(){return{title:"Emoticons",size:"normal",body:{type:"tabpanel",tabs:function(t){for(var n=t.length,e=new Array(n),o=0;n>o;o++){var r=t[o];e[o]={title:r,name:r,items:[s,m]}}return e}(n.listCategories())},initialData:u,onTabChange:function(t,n){c.set(n.newTabName),l.throttle(t)},onChange:l.throttle,onAction:function(n,e){var o;"results"===e.name&&(o=e.value,t.insertContent(o),n.close())},buttons:[{type:"cancel",text:"Close",primary:!0}]}}var r,a,u={pattern:"",results:f(n.listAll(),"",O.some(300))},c=i(P),l=(r=function(t){var e,o=(e=t).getData(),r=c.get(),i=f(n.listCategory(r),o[S],r===P?O.some(300):O.none());e.setData({results:i})},a=null,{cancel:e,throttle:function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];e(),a=setTimeout(function(){a=null,r.apply(null,t)},200)}}),s={label:"Search",type:"input",name:S},m={type:"collection",name:"results"},g=t.windowManager.open(o());g.focus(S),n.hasLoaded()||(g.block("Loading emoticons..."),n.waitForLoad().then(function(){g.redial(o()),l.throttle(g),g.focus(S),g.unblock()})["catch"](function(t){g.redial({title:"Emoticons",body:{type:"panel",items:[{type:"alertbanner",level:"error",icon:"warning",text:"<p>Could not load emoticons</p>"}]},buttons:[{type:"cancel",text:"Close",primary:!0}],initialData:{pattern:"",results:[]}}),g.focus(S),g.unblock()}))}function g(t){t.on("PreInit",function(){t.parser.addAttributeFilter("data-emoticon",function(t){!function(t){for(var n,e=0,o=t.length;o>e;e++)(n=t[e]).attr("data-mce-resize","false"),n.attr("data-mce-placeholder","1")}(t)})})}function d(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];if(0===t.length)throw new Error("Can't merge zero objects");for(var e={},o=0;o<t.length;o++){var r,i=t[o];for(r in i)u(i,r)&&(e[r]=(e[r],i[r]))}return e}var h,y=tinymce.util.Tools.resolve("tinymce.PluginManager"),v=n(!1),p=n(!(h=null)),b={fold:function(t,n){return t()},isSome:v,isNone:p,getOr:e,getOrThunk:r,getOrDie:function(t){throw new Error(t||"error: getOrDie called on none.")},getOrNull:n(null),getOrUndefined:n(void 0),or:e,orThunk:r,map:o,each:t,bind:o,exists:v,forall:p,filter:function(){return b},toArray:function(){return[]},toString:n("none()")},w=function(t){function e(){return i}function o(n){return n(t)}var r=n(t),i={fold:function(n,e){return e(t)},isSome:p,isNone:v,getOr:r,getOrThunk:r,getOrDie:r,getOrNull:r,getOrUndefined:r,or:e,orThunk:e,map:function(n){return w(n(t))},each:function(n){n(t)},bind:o,exists:o,forall:o,filter:function(n){return n(t)?i:b},toArray:function(){return[t]},toString:function(){return"some("+t+")"}};return i},O={some:w,none:o,from:function(t){return null==t?b:w(t)}},C=function(){return(C=Object.assign||function(t){for(var n,e=1,o=arguments.length;o>e;e++)for(var r in n=arguments[e])Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r]);return t}).apply(this,arguments)},k=Object.keys,j=Object.hasOwnProperty,A=function(t,n){var e={};return a(t,function(t,o){var r=n(t,o);e[r.k]=r.v}),e},_=tinymce.util.Tools.resolve("tinymce.Resource"),T=tinymce.util.Tools.resolve("tinymce.util.Delay"),x=tinymce.util.Tools.resolve("tinymce.util.Promise"),P="All",D={symbols:"Symbols",people:"People",animals_and_nature:"Animals and Nature",food_and_drink:"Food and Drink",activity:"Activity",travel_and_places:"Travel and Places",objects:"Objects",flags:"Flags",user:"User Defined"},S="pattern";y.add("emoticons",function(t,n){function e(){return c.execCommand("mceEmoticons")}var o,r,i,a,u,c,l,d,h=(r=n,i=(o=t).getParam("emoticons_database","emojis","string"),o.getParam("emoticons_database_url",r+"/js/"+i+o.suffix+".js","string")),y=t.getParam("emoticons_database_id","tinymce.plugins.emoticons","string"),v=s(t,h,y);u=v,(a=t).addCommand("mceEmoticons",function(){return m(a,u)}),(c=t).ui.registry.addButton("emoticons",{tooltip:"Emoticons",icon:"emoji",onAction:e}),c.ui.registry.addMenuItem("emoticons",{text:"Emoticons...",icon:"emoji",onAction:e}),d=v,(l=t).ui.registry.addAutocompleter("emoticons",{ch:":",columns:"auto",minChars:2,fetch:function(t,n){return d.waitForLoad().then(function(){return f(d.listAll(),t,O.some(n))})},onAction:function(t,n,e){l.selection.setRng(n),l.insertContent(e),t.hide()}}),g(t)})}();