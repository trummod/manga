$("img").each(function(){$(this).attr("data-src",$(this).attr("src"));$(this).removeAttr("src")});$("img").each(function(){$(this).attr("data-srcset",$(this).attr("srcset"));$(this).removeAttr("srcset")});    
document.addEventListener('touchstart', onTouchStart, {passive: true});
var lazyload=document.querySelectorAll("img");for(var i=0;i<lazyload.length;i++){lazyload[i].setAttribute("class","lazyload")};
function chapter(e){for(var t=0;t<e.feed.entry.length;t++){for(var r=e.feed.entry[t].title.$t,n=0;n<e.feed.entry[t].link.length;n++)if("alternate"==e.feed.entry[t].link[n].rel){posturl=e.feed.entry[t].link[n].href;break}var l='<a class="post-title m-0 fs-12 iconifychapter" href="'+posturl+'">'+r+"</a>";document.write(l)}}
