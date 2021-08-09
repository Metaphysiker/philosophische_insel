/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 *
 * Version: 5.8.0 (2021-05-06)
 */
!function(){"use strict";var e=tinymce.util.Tools.resolve("tinymce.PluginManager"),h=tinymce.util.Tools.resolve("tinymce.Env"),r=tinymce.util.Tools.resolve("tinymce.util.Delay"),y=function(e){return e.getParam("min_height",e.getElement().offsetHeight,"number")},a=function(e,t,n,i,o){r.setEditorTimeout(e,function(){b(e,t),n--?a(e,t,n,i,o):o&&o()},i)},p=function(e,t){var n=e.getBody();n&&(n.style.overflowY=t?"":"hidden",t||(n.scrollTop=0))},v=function(e,t,n,i){var o=parseInt(e.getStyle(t,n,i),10);return isNaN(o)?0:o},b=function(e,t){var n,i,o,r,s,a,g,u,l,c,m,f=e.dom,d=e.getDoc();d&&((n=e).plugins.fullscreen&&n.plugins.fullscreen.isFullscreen()?p(e,!0):(i=d.documentElement,o=e.getParam("autoresize_bottom_margin",50,"number"),r=y(e),s=v(f,i,"margin-top",!0),a=v(f,i,"margin-bottom",!0),(g=i.offsetHeight+s+a+o)<0&&(g=0),g+(u=e.getContainer().offsetHeight-e.getContentAreaContainer().offsetHeight)>y(e)&&(r=g+u),(l=e.getParam("max_height",0,"number"))&&l<r?(r=l,p(e,!0)):p(e,!1),r!==t.get()&&(c=r-t.get(),f.setStyle(e.getContainer(),"height",r+"px"),t.set(r),e.fire("ResizeEditor"),h.browser.isSafari()&&h.mac&&(m=e.getWin()).scrollTo(m.pageXOffset,m.pageYOffset),e.hasFocus()&&e.selection.scrollIntoView(e.selection.getNode()),h.webkit&&c<0&&b(e,t))))};e.add("autoresize",function(e){var t,n,i,o,r,s;e.settings.hasOwnProperty("resize")||(e.settings.resize=!1),e.inline||(s=0,r=t={get:function(){return s},set:function(e){s=e}},(o=e).addCommand("mceAutoResize",function(){b(o,r)}),i=t,(n=e).on("init",function(){var e=n.getParam("autoresize_overflow_padding",1,"number"),t=n.dom;t.setStyles(n.getDoc().documentElement,{height:"auto"}),t.setStyles(n.getBody(),{paddingLeft:e,paddingRight:e,"min-height":0})}),n.on("NodeChange SetContent keyup FullscreenStateChanged ResizeContent",function(){b(n,i)}),n.getParam("autoresize_on_init",!0,"boolean")&&n.on("init",function(){a(n,i,20,100,function(){a(n,i,5,1e3)})}))})}();
