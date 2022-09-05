$("img").each(function(){$(this).attr("data-src",$(this).attr("src"));$(this).removeAttr("src")});$("img").each(function(){$(this).attr("data-srcset",$(this).attr("srcset"));$(this).removeAttr("srcset")});    
document.addEventListener('touchstart', onTouchStart, {passive: true});
var lazyload=document.querySelectorAll("img");for(var i=0;i<lazyload.length;i++){lazyload[i].setAttribute("class","lazyload")};
