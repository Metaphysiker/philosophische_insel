!function(){"use strict";function e(e){var t=e;return{get:function(){return t},set:function(e){t=e}}}function t(e){return e.getParam("fullpage_hide_in_source_view")}function n(e){return e.getParam("fullpage_default_encoding")}function l(e){return e.getParam("fullpage_default_font_family")}function i(e){return e.getParam("fullpage_default_font_size")}function o(e,t){return m({validate:!1,root_name:"#document"},e.schema).parse(t,{format:"xhtml"})}function r(e,t){e.addCommand("mceFullPageProperties",function(){function n(e,t){return e.attr(t)||""}var r,a,c,s,m,p,h,y,v,_;m=r=e,p=(a=t).get(),v=o(m,p),(_={}).fontface=l(m),_.fontsize=i(m),7===(h=v.firstChild).type&&(_.xml_pi=!0,(y=/encoding="([^"]+)"/.exec(h.value))&&(_.docencoding=y[1])),(h=v.getAll("#doctype")[0])&&(_.doctype="<!DOCTYPE"+h.value+">"),(h=v.getAll("title")[0])&&h.firstChild&&(_.title=h.firstChild.value),u.each(v.getAll("meta"),function(e){var t,n=e.attr("name"),l=e.attr("http-equiv");n?_[n.toLowerCase()]=e.attr("content"):"Content-Type"===l&&(t=/charset\s*=\s*(.*)\s*/gi.exec(e.attr("content")))&&(_.docencoding=t[1])}),(h=v.getAll("html")[0])&&(_.langcode=n(h,"lang")||n(h,"xml:lang")),_.stylesheets=[],u.each(v.getAll("link"),function(e){"stylesheet"===e.attr("rel")&&_.stylesheets.push(e.attr("href"))}),(h=v.getAll("body")[0])&&(_.langdir=n(h,"dir"),_.style=n(h,"style"),_.visited_color=n(h,"vlink"),_.link_color=n(h,"link"),_.active_color=n(h,"alink")),c=_,s=d(d({},{title:"",keywords:"",description:"",robots:"",author:"",docencoding:""}),c),r.windowManager.open({title:"Metadata and Document Properties",size:"normal",body:{type:"panel",items:[{name:"title",type:"input",label:"Title"},{name:"keywords",type:"input",label:"Keywords"},{name:"description",type:"input",label:"Description"},{name:"robots",type:"input",label:"Robots"},{name:"author",type:"input",label:"Author"},{name:"docencoding",type:"input",label:"Encoding"}]},buttons:[{type:"cancel",name:"cancel",text:"Cancel"},{type:"submit",name:"save",text:"Save",primary:!0}],initialData:s,onSubmit:function(e){var t=e.getData(),n=function(e,t,n){function l(e,t,n){e.attr(t,n||void 0)}function i(e){d.firstChild?d.insert(e,d.firstChild):d.append(e)}var r,a,c=e.dom,s=o(e,n),d=s.getAll("head")[0];d||(r=s.getAll("html")[0],d=new g("head",1),r.firstChild?r.insert(d,r.firstChild,!0):r.append(d)),r=s.firstChild,t.xml_pi?(a='version="1.0"',t.docencoding&&(a+=' encoding="'+t.docencoding+'"'),7!==r.type&&(r=new g("xml",7),s.insert(r,s.firstChild,!0)),r.value=a):r&&7===r.type&&r.remove(),r=s.getAll("#doctype")[0],t.doctype?(r||(r=new g("#doctype",10),t.xml_pi?s.insert(r,s.firstChild):i(r)),r.value=t.doctype.substring(9,t.doctype.length-1)):r&&r.remove(),r=null,u.each(s.getAll("meta"),function(e){"Content-Type"===e.attr("http-equiv")&&(r=e)}),t.docencoding?(r||((r=new g("meta",1)).attr("http-equiv","Content-Type"),r.shortEnded=!0,i(r)),r.attr("content","text/html; charset="+t.docencoding)):r&&r.remove(),r=s.getAll("title")[0],t.title?(r?r.empty():i(r=new g("title",1)),r.append(new g("#text",3)).value=t.title):r&&r.remove(),u.each("keywords,description,author,copyright,robots".split(","),function(e){for(var n,l=s.getAll("meta"),o=t[e],a=0;a<l.length;a++)if((n=l[a]).attr("name")===e)return void(o?n.attr("content",o):n.remove());o&&((r=new g("meta",1)).attr("name",e),r.attr("content",o),r.shortEnded=!0,i(r))});var m={};u.each(s.getAll("link"),function(e){"stylesheet"===e.attr("rel")&&(m[e.attr("href")]=e)}),u.each(t.stylesheets,function(e){m[e]||((r=new g("link",1)).attr({rel:"stylesheet",text:"text/css",href:e}),r.shortEnded=!0,i(r)),delete m[e]}),u.each(m,function(e){e.remove()}),(r=s.getAll("body")[0])&&(l(r,"dir",t.langdir),l(r,"style",t.style),l(r,"vlink",t.visited_color),l(r,"link",t.link_color),l(r,"alink",t.active_color),c.setAttribs(e.getBody(),{style:t.style,dir:t.dir,vLink:t.visited_color,link:t.link_color,aLink:t.active_color})),(r=s.getAll("html")[0])&&(l(r,"lang",t.langcode),l(r,"xml:lang",t.langcode)),d.firstChild||d.remove();var p=f({validate:!1,indent:!0,indent_before:"head,html,body,meta,title,script,link,style",indent_after:"head,html,body,meta,title,script,link,style"}).serialize(s);return p.substring(0,p.indexOf("</body>"))}(r,u.extend(c,t),a.get());a.set(n),e.close()}})})}function a(e){return e.replace(/<\/?[A-Z]+/g,function(e){return e.toLowerCase()})}function c(e,r,c,s){var d,m,g,f,h,y,v,_,b,x,k,C,A,w="",P=e.dom;s.selection||(f=e.getParam("protect"),h=s.content,u.each(f,function(e){h=h.replace(e,function(e){return"<!--mce:protected "+escape(e)+"-->"})}),g=h,"raw"===s.format&&r.get()||s.source_view&&t(e)||(-1!==(d=(g=(g=0!==g.length||s.source_view?g:u.trim(r.get())+"\n"+u.trim(g)+"\n"+u.trim(c.get())).replace(/<(\/?)BODY/gi,"<$1body")).indexOf("<body"))?(d=g.indexOf(">",d),r.set(a(g.substring(0,d+1))),-1===(m=g.indexOf("</body",d))&&(m=g.length),s.content=u.trim(g.substring(d+1,m)),c.set(a(g.substring(m)))):(r.set((A=C="",(x=e).getParam("fullpage_default_xml_pi")&&(C+='<?xml version="1.0" encoding="'+(n(x)||"ISO-8859-1")+'" ?>\n'),C+=x.getParam("fullpage_default_doctype","<!DOCTYPE html>"),C+="\n<html>\n<head>\n",(k=x.getParam("fullpage_default_title"))&&(C+="<title>"+k+"</title>\n"),(k=n(x))&&(C+='<meta http-equiv="Content-Type" content="text/html; charset='+k+'" />\n'),(k=l(x))&&(A+="font-family: "+k+";"),(k=i(x))&&(A+="font-size: "+k+";"),(k=x.getParam("fullpage_default_text_color"))&&(A+="color: "+k+";"),C+="</head>\n<body"+(A?' style="'+A+'"':"")+">\n")),c.set("\n</body>\n</html>")),y=o(e,r.get()),p(y.getAll("style"),function(e){e.firstChild&&(w+=e.firstChild.value)}),(v=y.getAll("body")[0])&&P.setAttribs(e.getBody(),{style:v.attr("style")||"",dir:v.attr("dir")||"",vLink:v.attr("vlink")||"",link:v.attr("link")||"",aLink:v.attr("alink")||""}),P.remove("fullpage_styles"),_=e.getDoc().getElementsByTagName("head")[0],w&&P.add(_,"style",{id:"fullpage_styles"}).appendChild(document.createTextNode(w)),b={},u.each(_.getElementsByTagName("link"),function(e){"stylesheet"===e.rel&&e.getAttribute("data-mce-fullpage")&&(b[e.href]=e)}),u.each(y.getAll("link"),function(e){var t=e.attr("href");return t?(b[t]||"stylesheet"!==e.attr("rel")||P.add(_,"link",{rel:"stylesheet",text:"text/css",href:t,"data-mce-fullpage":"1"}),void delete b[t]):!0}),u.each(b,function(e){e.parentNode.removeChild(e)})))}var s=tinymce.util.Tools.resolve("tinymce.PluginManager"),d=function(){return(d=Object.assign||function(e){for(var t,n=1,l=arguments.length;l>n;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)},u=tinymce.util.Tools.resolve("tinymce.util.Tools"),m=tinymce.util.Tools.resolve("tinymce.html.DomParser"),g=tinymce.util.Tools.resolve("tinymce.html.Node"),f=tinymce.util.Tools.resolve("tinymce.html.Serializer"),p=u.each;s.add("fullpage",function(n){var l,i,o,a,s=e(""),d=e("");r(n,s),(l=n).ui.registry.addButton("fullpage",{tooltip:"Metadata and document properties",icon:"document-properties",onAction:function(){l.execCommand("mceFullPageProperties")}}),l.ui.registry.addMenuItem("fullpage",{text:"Metadata and document properties",icon:"document-properties",onAction:function(){l.execCommand("mceFullPageProperties")}}),o=s,a=d,(i=n).on("BeforeSetContent",function(e){c(i,o,a,e)}),i.on("GetContent",function(e){var n,l,r,c;n=i,l=o.get(),r=a.get(),"html"!==(c=e).format||c.selection||c.source_view&&t(n)||(c.content=(u.trim(l)+"\n"+u.trim(c.content)+"\n"+u.trim(r)).replace(/<!--mce:protected ([\s\S]*?)-->/g,function(e,t){return unescape(t)}))})})}();