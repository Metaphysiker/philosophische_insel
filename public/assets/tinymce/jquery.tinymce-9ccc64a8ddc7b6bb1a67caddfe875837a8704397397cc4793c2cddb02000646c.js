!function(){function e(){return a.tinymce}var t,n,i,r=[],a="undefined"!=typeof global?global:window,c=a.jQuery;c.fn.tinymce=function(t){function u(){var n=[],r=0;i||(o(),i=!0),d.each(function(i,a){var c,o=a.id,u=t.oninit;o||(a.id=o=e().DOM.uniqueId()),e().get(o)||(c=e().createEditor(o,t),n.push(c),c.on("init",function(){var t,i=u;d.css("visibility",""),u&&++r==n.length&&("string"==typeof i&&(t=-1===i.indexOf(".")?null:e().resolve(i.replace(/\.\w+$/,"")),i=e().resolve(i)),i.apply(t||e(),n))}))}),c.each(n,function(e,t){t.render()})}var l,s,f,p,d=this,m="";return d.length?t?(d.css("visibility","hidden"),a.tinymce||n||!(l=t.script_url)?1===n?r.push(u):u():(n=1,s=l.substring(0,l.lastIndexOf("/")),-1!=l.indexOf(".min")&&(m=".min"),a.tinymce=a.tinyMCEPreInit||{base:s,suffix:m},-1!=l.indexOf("gzip")&&(f=t.language||"en",l=l+(/\?/.test(l)?"&":"?")+"js=true&core=true&suffix="+escape(m)+"&themes="+escape(t.theme||"modern")+"&plugins="+escape(t.plugins||"")+"&languages="+(f||""),a.tinyMCE_GZ||(a.tinyMCE_GZ={start:function(){function n(t){e().ScriptLoader.markDone(e().baseURI.toAbsolute(t))}n("langs/"+f+".js"),n("themes/"+t.theme+"/theme"+m+".js"),n("themes/"+t.theme+"/langs/"+f+".js"),c.each(t.plugins.split(","),function(e,t){t&&(n("plugins/"+t+"/plugin"+m+".js"),n("plugins/"+t+"/langs/"+f+".js"))})},end:function(){}})),(p=document.createElement("script")).type="text/javascript",p.onload=p.onreadystatechange=function(i){i=i||window.event,2===n||"load"!=i.type&&!/complete|loaded/.test(p.readyState)||(e().dom.Event.domLoaded=1,n=2,t.script_loaded&&t.script_loaded(),u(),c.each(r,function(e,t){t()}))},p.src=l,document.body.appendChild(p)),d):e()?e().get(d[0].id):null:d},c.extend(c.expr[":"],{tinymce:function(t){var n;return!!(t.id&&"tinymce"in a&&(n=e().get(t.id))&&n.editorManager===e())}});var o=function(){function n(t){"remove"===t&&this.each(function(e,t){var n=o(t);n&&n.remove()}),this.find("span.mceEditor,div.mceEditor").each(function(t,n){var i=e().get(n.id.replace(/_parent$/,""));i&&i.remove()})}function i(t){var i,r=this;if(null!=t)n.call(r),r.each(function(n,i){var r;(r=e().get(i.id))&&r.setContent(t)});else if(0<r.length&&(i=e().get(r[0].id)))return i.getContent()}function r(e){return e&&e.length&&a.tinymce&&e.is(":tinymce")}var o=function(t){var n=null;return t&&t.id&&a.tinymce?e().get(t.id):n},u={};c.each(["text","html","val"],function(e,n){var a=u[n]=c.fn[n],l="text"===n;c.fn[n]=function(e){var n=this;if(!r(n))return a.apply(n,arguments);if(e!==t)return i.call(n.filter(":tinymce"),e),a.apply(n.not(":tinymce"),arguments),n;var u="",s=arguments;return(l?n:n.eq(0)).each(function(e,t){var n=o(t);u+=n?l?n.getContent().replace(/<(?:"[^"]*"|'[^']*'|[^'">])*>/g,""):n.getContent({save:!0}):a.apply(c(t),s)}),u}}),c.each(["append","prepend"],function(e,n){var i=u[n]=c.fn[n],a="prepend"===n;c.fn[n]=function(e){var n=this;return r(n)?e!==t?("string"==typeof e&&n.filter(":tinymce").each(function(t,n){var i=o(n);i&&i.setContent(a?e+i.getContent():i.getContent()+e)}),i.apply(n.not(":tinymce"),arguments),n):void 0:i.apply(n,arguments)}}),c.each(["remove","replaceWith","replaceAll","empty"],function(e,t){var i=u[t]=c.fn[t];c.fn[t]=function(){return n.call(this,t),i.apply(this,arguments)}}),u.attr=c.fn.attr,c.fn.attr=function(e,n){var a=this,l=arguments;if(!e||"value"!==e||!r(a))return u.attr.apply(a,l);if(n!==t)return i.call(a.filter(":tinymce"),n),u.attr.apply(a.not(":tinymce"),l),a;var s=a[0],f=o(s);return f?f.getContent({save:!0}):u.attr.apply(c(s),l)}}}();