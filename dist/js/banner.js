"use strict";var setBanner=function(o,c,e,r,t,n,l){document.write("<script language=javascript src='./js/tool.js'><\/script>");var u,i,a,s,d,f,v,m,p,y,g,h,b,x,w,S=1;function E(e,t){var n=document.querySelectorAll("#"+e+" li");if(n.forEach(function(e){e.classList.remove("active")}),S>=t.length+1)var l=1;else l=S<1?5:S;n[l-1].classList.add("active")}function q(e,t,n,l,i){clearInterval(u),u=setInterval(function(){S++,E(c,o),move(e,"left",-S*t,n,function(){S==i.length+1&&(S=1,e.style.left=-r+"px")})},l)}function A(e,t,n){e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent("on"+t,function(){n.call(e)})}a=e,s=(i=o)[0].cloneNode(!0),d=i[i.length-1].cloneNode(!0),a.insertBefore(d,i[0]),a.appendChild(s),function(e,t){for(var n=0;n<e.length;n++){var l=document.getElementById(t),i=document.createElement("li");l.appendChild(i)}document.querySelectorAll("#"+t+" li")[S-1].classList.add("active")}(o,c),f=r,e.style.left=-f+"px",v=c,m=r,p=e,document.querySelectorAll("#"+v+" li").forEach(function(e,t){e.onclick=function(){S=t+1,p.style.left=-S*m+"px",E(c,o)}}),q(e,r,t,l,o),g=e,h=o,b=r,x=t,(y=n)[0].onclick=function(){--S<=0&&(S=0),E(c,o),move(g,"left",-S*b,x,function(){S>=h.length+1&&(S=1,g.style.left=-S*b+"px"),S<=0&&(S=5,g.style.left=-S*b+"px")})},y[1].onclick=function(){++S>=h.length+1&&(S=6),E(c,o),move(g,"left",-S*b,x,function(){S==h.length+1&&(S=1,g.style.left=-S*b+"px"),0==S&&(S=5,g.style.left=-S*b+"px")})},A((w=e).parentNode,"mouseover",function(){clearInterval(u)}),A(w.parentNode,"mouseout",function(){q(e,r,t,l,o)}),A(document,"visibilitychange",function(){"hidden"==document.visibilityState?clearInterval(u):"visible"==document.visibilityState&&q(e,r,t,l,o)})},imglist=document.querySelectorAll(".banner-img li"),swiperid="swiper",ulbox=document.querySelector(".banner-img"),liw=ulbox.clientWidth,speed=30,updownlist=document.querySelectorAll(".updown-btn"),timeinterval=4e3;setBanner(imglist,swiperid,ulbox,liw,speed,updownlist,timeinterval);