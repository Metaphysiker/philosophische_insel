/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 *
 * Version: 5.8.0 (2021-05-06)
 */
!function(){"use strict";var e=tinymce.util.Tools.resolve("tinymce.PluginManager"),t=tinymce.util.Tools.resolve("tinymce.dom.DOMUtils"),c=tinymce.util.Tools.resolve("tinymce.EditorManager"),a=tinymce.util.Tools.resolve("tinymce.Env"),y=tinymce.util.Tools.resolve("tinymce.util.Delay"),d=tinymce.util.Tools.resolve("tinymce.util.Tools"),f=tinymce.util.Tools.resolve("tinymce.util.VK"),m=t.DOM,n=function(e){e.keyCode!==f.TAB||e.ctrlKey||e.altKey||e.metaKey||e.preventDefault()},i=function(s){var e=function(o){var l,r,e,t,n,i,u;o.keyCode!==f.TAB||o.ctrlKey||o.altKey||o.metaKey||o.isDefaultPrevented()||(e=function(e){var t=m.select(":input:enabled,*[tabindex]:not(iframe)"),n=function(e){return"BODY"===e.nodeName||"hidden"!==e.type&&"none"!==e.style.display&&"hidden"!==e.style.visibility&&n(e.parentNode)},i=function(e){return/INPUT|TEXTAREA|BUTTON/.test(e.tagName)&&c.get(o.id)&&-1!==e.tabIndex&&n(e)};if(d.each(t,function(e,t){if(e.id===s.id)return l=t,!1}),0<e){for(r=l+1;r<t.length;r++)if(i(t[r]))return t[r]}else for(r=l-1;0<=r;r--)if(i(t[r]))return t[r];return null},1===(t=d.explode((n=s).getParam("tab_focus",n.getParam("tabfocus_elements",":prev,:next")))).length&&(t[1]=t[0],t[0]=":prev"),(i=o.shiftKey?":prev"===t[0]?e(-1):m.get(t[0]):":next"===t[1]?e(1):m.get(t[1]))&&(u=c.get(i.id||i.name),i.id&&u?u.focus():y.setTimeout(function(){a.webkit||window.focus(),i.focus()},10),o.preventDefault()))};s.on("init",function(){s.inline&&m.setAttrib(s.getBody(),"tabIndex",null),s.on("keyup",n),a.gecko?s.on("keypress keydown",e):s.on("keydown",e)})};e.add("tabfocus",function(e){i(e)})}();
