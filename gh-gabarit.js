/* Gabarit 2026-11 : en-tete et pied de page de la maquette sur toutes les pages, alignements et uniformisation */
(function(){
var LOGO="https://bookingenginecdn.hostaway.com/account/attachment/116313-nZi6NqzcnnBziQkmVZANben9n8imtsASgYnFG-kg-gk-6ae61ecdae5ec?width=600&quality=80";
var OWN="/pages/services-aux-propri%C3%A9taires";
var L={
 fr:{nav:[["","Accueil"],["/all-listings","Propri\u00e9t\u00e9s"],[OWN,"Services aux propri\u00e9taires"],["/about-us","\u00c0 propos"],["/pages/contact","Contact"]],
     other:"EN",menu:"Menu",close:"Fermer",privacy:["/privacy-policy","Politique de confidentialit\u00e9"],terms:["/terms-and-conditions","Termes et conditions"],
     copy:"Tous droits r\u00e9serv\u00e9s. Par ",sel:"S\u00e9lectionner\u2026"},
 en:{nav:[["","Home"],["/all-listings","Properties"],[OWN,"For Property Owners"],["/about-us","About Us"],["/pages/contact","Contact"]],
     other:"FR",menu:"Menu",close:"Close",privacy:["/privacy-policy","Privacy Policy"],terms:["/terms-and-conditions","Terms and Conditions"],
     copy:"All rights reserved. By ",sel:"Select\u2026"}};
var SOC=[["https://facebook.com/gestionhamann","Facebook",'<path fill="currentColor" d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1z"/>'],
 ["https://instagram.com/gestionhamann","Instagram",'<rect x="4" y="4" width="16" height="16" rx="4.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="12" cy="12" r="3.6" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="16.8" cy="7.2" r="1" fill="currentColor"/>'],
 ["https://www.linkedin.com/company/gestionhamann/","LinkedIn",'<path fill="currentColor" d="M6.9 8.6H4.2V19h2.7V8.6zM5.55 4.5a1.55 1.55 0 1 0 0 3.1 1.55 1.55 0 0 0 0-3.1zM19.8 13.3c0-2.8-1.5-4.9-4.1-4.9-1.3 0-2.2.7-2.6 1.4V8.6h-2.6V19h2.7v-5.3c0-1.4.5-2.5 1.9-2.5 1.3 0 1.9 1 1.9 2.5V19h2.8v-5.7z"/>']];
var CSS=
".gh-native-off{display:none!important}"+
"main .wrap{max-width:1240px!important}"+
".gh-hd{background:#f4f1ed;border-bottom:1px solid #ddd5ca;position:relative;z-index:60;font-family:'Hanken Grotesk',system-ui,sans-serif}"+
".gh-hd .in{max-width:1240px;margin:0 auto;padding:14px 24px;display:flex;align-items:center;justify-content:space-between;gap:24px}"+
".gh-hd .logo img{height:56px!important;width:auto!important;display:block;border-radius:0!important}"+
".gh-hd nav{display:flex;align-items:center;gap:32px}"+
".gh-hd nav a{font:400 15px/1.2 'Hanken Grotesk',system-ui,sans-serif;color:#13231c!important;text-decoration:none;padding:6px 0;border-bottom:1px solid transparent;letter-spacing:.01em}"+
".gh-hd nav a:hover{border-bottom-color:#a97d5c}"+
".gh-hd nav a.on{color:#8a6246!important;border-bottom-color:#a97d5c}"+
".gh-hd nav a.lang{font-size:13px;letter-spacing:.14em;color:#8a6246!important;padding-left:24px;border-left:1px solid #ddd5ca;border-bottom:0}"+
".gh-hd .tog{display:none;background:none;border:1px solid #13231c;border-radius:3px;padding:10px 16px;font:500 12px/1 'Hanken Grotesk',sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#13231c;cursor:pointer}"+
"@media(max-width:900px){.gh-hd .in{padding:10px 20px}.gh-hd .logo img{height:44px!important}.gh-hd .tog{display:inline-block}"+
".gh-hd nav{display:none;position:absolute;left:0;right:0;top:100%;background:#f4f1ed;border-bottom:1px solid #ddd5ca;flex-direction:column;align-items:stretch;gap:0;padding:8px 0 16px}"+
".gh-hd.open nav{display:flex}.gh-hd nav a{padding:14px 20px;font-size:17px;border-bottom:0}.gh-hd nav a.lang{border-left:0;padding:14px 20px}}"+
"footer.gh-ft{background:#13231c!important;color:rgba(255,255,255,.72);padding:72px 0 40px;margin:0;font-family:'Hanken Grotesk',system-ui,sans-serif;font-size:15px}"+
".gh-ft .wrap{max-width:1240px;margin:0 auto;padding:0 24px;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:32px}"+
".gh-ft .logo img{height:88px!important;width:auto!important;display:block;border-radius:0!important}"+
".gh-ft nav{display:grid;gap:10px}.gh-ft a{color:#fff!important;text-decoration:none}.gh-ft nav a:hover{color:#d2b29a!important}"+
".gh-ft .soc{display:flex;gap:14px}.gh-ft .soc a{display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;border:1px solid rgba(244,241,237,.35);border-radius:50%!important;color:#f4f1ed!important;transition:background-color .2s,border-color .2s}"+
".gh-ft .soc a:hover{background:#a97d5c;border-color:#a97d5c}.gh-ft .soc svg{width:18px;height:18px}"+
".gh-ft .bas{flex-basis:100%;border-top:1px solid rgba(255,255,255,.14);padding-top:22px;margin-top:16px;font-size:13px;color:rgba(255,255,255,.6)}.gh-ft .bas a{text-decoration:underline}"+
"@media(max-width:900px){.gh-ft{padding:56px 0 32px}.gh-ft .wrap{flex-direction:column;align-items:flex-start}.gh-ft .logo img{height:72px!important}}"+
"main a[href*='/listings/']>div:nth-child(2){padding-left:0!important;padding-right:0!important}"+
"ul.gh-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:40px 32px!important;max-width:none!important;margin:0!important;padding:0!important;width:100%!important}"+
"ul.gh-grid>li{width:auto!important;max-width:none!important;margin:0!important;flex:none!important}"+
"@media(max-width:760px){ul.gh-grid{grid-template-columns:1fr!important}}"+
"section#proprietes{padding-bottom:clamp(56px,7vw,96px)!important;margin-top:clamp(56px,7vw,96px)!important}"+
".gh-filtres{justify-content:flex-start!important;gap:12px!important}.gh-filtres>label{margin:0!important}"+
".gh-listh1{font-family:'Cormorant Garamond',Georgia,serif!important;font-weight:600!important;font-size:clamp(36px,4vw,52px)!important;line-height:1.05!important;margin:24px 0 8px!important}"+
".gh-noicon svg{display:none!important}"+
".kicker{display:none!important}.n{display:none!important}ol.steps>li::before,ul.steps>li::before,.steps>li::before{display:none!important}"+
"li.gh-nodash::before{display:none!important}li.gh-nodash{padding-left:0!important;display:block!important}.gh-non{display:block!important}section#proprietes h2{text-align:left!important}"+
"main blockquote::before{display:none!important}"+
"main .gh-contact{margin-left:0!important;margin-right:auto!important;max-width:760px!important}"+
".gh-contact .gh-field label,.gh-contact .gh-legende,.gh-contact p,.gh-contact .gh-consent{text-align:left!important}.gh-contact .gh-choice-group,.gh-contact .gh-checks{justify-content:flex-start!important;text-align:left!important}"+
".gh-grid2{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:48px 32px!important;margin-bottom:clamp(56px,7vw,96px)!important}.gh-grid2>*{grid-column:auto!important;width:auto!important;max-width:none!important}@media(max-width:760px){.gh-grid2{grid-template-columns:1fr!important}}"+
".gh-contactpage{background:transparent!important;padding:clamp(56px,7vw,96px) 0!important;text-align:left!important;box-shadow:none!important;border:0!important}.gh-contactpage>h1,.gh-contactpage h1{font-family:'Cormorant Garamond',Georgia,serif!important;font-weight:600!important;font-size:clamp(40px,4.8vw,58px)!important;line-height:1.05!important;text-align:left!important;margin:0 0 24px!important;max-width:18ch!important}.gh-contactpage>p{text-align:left!important;margin-left:0!important;margin-right:0!important;max-width:56ch!important;font-size:17px!important;line-height:1.75!important;color:#2f3b35!important}"+
".gh-hide{display:none!important}"+
".gh-abouth1{text-transform:none!important;font-family:'Cormorant Garamond',Georgia,serif!important;font-weight:600!important;font-size:clamp(44px,4.9vw,70px)!important;letter-spacing:-.01em!important;color:#f4f1ed!important;text-align:left!important;width:100%!important;max-width:1192px!important;margin:0 auto!important;padding:0 24px!important}"+
".gh-abouttext p{font-size:17px!important;line-height:1.75!important;color:#2f3b35!important;max-width:56ch!important;margin:0 0 18px!important}.gh-abouttext p.gh-sig{font:500 11px/1.8 'Hanken Grotesk',sans-serif!important;letter-spacing:.22em!important;text-transform:uppercase!important;color:#13231c!important;margin:0!important}.gh-abouttext p.gh-sig:first-of-type{margin-top:28px!important}"+

"main a.cta,main a.btn.btn-dark{background:#a97d5c!important;border-color:#a97d5c!important;color:#fff!important}"+
"main a.cta:hover,main a.btn.btn-dark:hover{background:#8f6a4d!important;border-color:#8f6a4d!important}";
function info(){var raw=location.pathname;try{raw=decodeURIComponent(raw);}catch(e){}var fr=raw.indexOf("/fr")===0;var p=raw.replace(/^\/fr/,"").replace(/\/$/,"");return {fr:fr,p:p,t:fr?L.fr:L.en,px:fr?"/fr":""};}
function style(){if(document.getElementById("gh-gabarit"))return;var s=document.createElement("style");s.id="gh-gabarit";s.textContent=CSS;document.head.appendChild(s);}
function header(i){
  var nat=null,hs=document.querySelectorAll("header");for(var k=0;k<hs.length;k++){if(!hs[k].classList.contains("gh-hd")){nat=hs[k];break;}}
  if(nat&&!nat.classList.contains("gh-native-off"))nat.classList.add("gh-native-off");
  if(document.getElementById("gh-hd")||!nat)return;
  var cur=i.p,h=document.createElement("header");h.id="gh-hd";h.className="gh-hd";
  var links=i.t.nav.map(function(n){var on=(n[0]===""?cur==="":cur.indexOf(decodeURIComponent(n[0]))===0);return '<a href="'+i.px+(n[0]||(i.fr?"":"/"))+'"'+(on?' class="on" aria-current="page"':'')+'>'+n[1]+'</a>';}).join("");
  var otherPx=i.fr?"/en":"/fr";var lang='<a class="lang" href="'+otherPx+(location.pathname.replace(/^\/(fr|en)(?=\/|$)/,"")||"/")+'" hreflang="'+(i.fr?"en":"fr")+'">'+i.t.other+'</a>';
  h.innerHTML='<div class="in"><a class="logo" href="'+(i.fr?"/fr":"/")+'"><img src="'+LOGO+'" alt="Gestion Hamann"></a><button type="button" class="tog" aria-expanded="false">'+i.t.menu+'</button><nav aria-label="Navigation">'+links+lang+'</nav></div>';
  nat.parentNode.insertBefore(h,nat);
  var b=h.querySelector(".tog");b.addEventListener("click",function(){var o=h.classList.toggle("open");b.setAttribute("aria-expanded",o?"true":"false");b.textContent=o?i.t.close:i.t.menu;});
}
function footer(i){
  var nat=null,fs=document.querySelectorAll("footer");for(var k=0;k<fs.length;k++){if(!fs[k].classList.contains("gh-ft")){nat=fs[k];break;}}
  if(nat&&!nat.classList.contains("gh-native-off"))nat.classList.add("gh-native-off");
  if(document.getElementById("gh-ft")||!nat)return;
  var f=document.createElement("footer");f.id="gh-ft";f.className="gh-ft";
  var soc=SOC.map(function(s){return '<a href="'+s[0]+'" target="_blank" rel="noopener" aria-label="'+s[1]+'"><svg viewBox="0 0 24 24" aria-hidden="true">'+s[2]+'</svg></a>';}).join("");
  f.innerHTML='<div class="wrap"><a class="logo" href="'+(i.fr?"/fr":"/")+'"><img src="'+LOGO+'" alt="Gestion Hamann"></a><nav aria-label="Liens"><a href="'+i.px+i.t.privacy[0]+'">'+i.t.privacy[1]+'</a><a href="'+i.px+i.t.terms[0]+'">'+i.t.terms[1]+'</a></nav><div class="soc">'+soc+'</div><p class="bas">Copyright \u00a9 '+new Date().getFullYear()+' Gestion Hamann. '+i.t.copy+'<a href="https://ouihalo.com/" target="_blank" rel="noopener">HALO</a>.</p></div>';
  nat.parentNode.insertBefore(f,nat.nextSibling);
}
function fixes(i){
  var m=document.querySelector("main");if(!m)return;
  var as=m.querySelectorAll("a[href*='/listings/']");for(var k=0;k<as.length;k++){var li=as[k].closest("li"),ul=li&&li.parentElement;if(ul&&ul.tagName==="UL"&&!ul.classList.contains("gh-grid")&&!ul.closest(".ghm"))ul.classList.add("gh-grid");}
  var labs=document.querySelectorAll("section label");for(var j=0;j<labs.length;j++){var inp=labs[j].querySelector("input[type=checkbox],input[type=radio]");if(inp&&!labs[j].closest("form")&&labs[j].parentElement)labs[j].parentElement.classList.add("gh-filtres");}

  for(var k2=0;k2<as.length;k2++){var a2=as[k2];if(a2.closest("li")||a2.closest(".ghm"))continue;var gp=a2.parentElement;for(var u=0;u<3&&gp;u++){if(getComputedStyle(gp).display==="grid"){gp.classList.add("gh-grid2");break;}gp=gp.parentElement;}}
  if(i.p==="/pages/contact"){var hc=m.querySelector("h1");if(hc&&hc.parentElement&&!hc.parentElement.classList.contains("gh-contactpage")){hc.parentElement.classList.add("gh-contactpage");var pv=hc.previousElementSibling;if(pv&&pv.textContent.trim().length<20)pv.classList.add("gh-hide");}}
  if(i.p==="/about-us"){var ha=m.querySelector("h1");if(ha)ha.classList.add("gh-abouth1");var ps=m.querySelectorAll("p");for(var w=0;w<ps.length;w++){var tx=ps[w].textContent.trim();if(!ps[w].closest(".ghm")){if(/^(Un s\u00e9jour exceptionnel|An exceptional stay)/.test(tx)&&ps[w].parentElement)ps[w].parentElement.classList.add("gh-abouttext");if(tx==="-"||tx==="\u2014")ps[w].classList.add("gh-hide");if(/^Mika[e\u00eb]l Hamann$/.test(tx))ps[w].classList.add("gh-sig");if(/^(Gestionnaire|Short-term|Hospitality|Manager)/.test(tx)&&/ - /.test(tx)){ps[w].innerHTML=ps[w].innerHTML.replace(/ - /g,"<br>");ps[w].classList.add("gh-sig");}else if(/^(Gestionnaire|Hospitality)/.test(tx)&&tx.length<120)ps[w].classList.add("gh-sig");}}}
  if(i.p==="/all-listings"){var h=m.querySelector("h1");if(h)h.classList.add("gh-listh1");}
  var bs=m.querySelectorAll("button");for(var b=0;b<bs.length;b++){if(/carte|map/i.test(bs[b].textContent)&&bs[b].querySelector("svg"))bs[b].classList.add("gh-noicon");}
  var lis=m.querySelectorAll("li:not(.gh-nodash)");for(var q=0;q<lis.length;q++){var cs=getComputedStyle(lis[q],"::before");if(cs.content!=="none"&&cs.content!=="normal"&&parseFloat(cs.height)<=2&&parseFloat(cs.width)>=8&&parseFloat(cs.width)<=24)lis[q].classList.add("gh-nodash");}
  var ns=m.querySelectorAll(".n");for(var z=0;z<ns.length;z++){if(ns[z].parentElement)ns[z].parentElement.classList.add("gh-non");}
  var cites=m.querySelectorAll("cite");for(var c=0;c<cites.length;c++){if(cites[c].innerHTML.indexOf("\u00b7")>-1)cites[c].innerHTML=cites[c].innerHTML.replace(/\s*\u00b7\s*/g,"<br>");}
  var ops=document.querySelectorAll("option");for(var o=0;o<ops.length;o++){if(ops[o].textContent.trim()==="\u2014")ops[o].textContent=i.t.sel;}
}
function run(){try{var i=info();style();header(i);footer(i);fixes(i);}catch(e){}}
if(document.readyState!=="loading")run();document.addEventListener("DOMContentLoaded",run);
var k=0,iv=setInterval(function(){run();if(++k>60)clearInterval(iv);},250);
if(window.MutationObserver){var q;new MutationObserver(function(){clearTimeout(q);q=setTimeout(run,150);}).observe(document.documentElement,{childList:true,subtree:true});}
})();
