/* ============================================================
   GESTION HAMANN — Design system pour le site Hostaway
   Fichier unique à héberger (GitHub + jsDelivr).
   Contient : thème (polices + couleurs), suivi Meta « Lead »,
   et transformation bilingue du héros de l'accueil.
   Chargé par un mini-script dans le Head Script de Hostaway.
   ============================================================ */
(function () {
  "use strict";

  /* ---- Polices Google (substituts du design system) ---- */
  if (!document.getElementById("gh-fonts")) {
    var lf = document.createElement("link");
    lf.id = "gh-fonts"; lf.rel = "stylesheet";
    lf.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Hanken+Grotesk:wght@400;500;600;700&display=swap";
    document.head.appendChild(lf);
  }

  /* ---- Thème global (couleurs + typographie) ---- */
  if (!document.getElementById("gh-theme")) {
    var ts = document.createElement("style"); ts.id = "gh-theme";
    ts.textContent =
      'body{font-family:"Hanken Grotesk",system-ui,-apple-system,sans-serif!important;background:#f4f1ed!important;color:#13231c!important;}' +
      'h1,h2,h3,h4,h5,h6{font-family:"Cormorant Garamond",Georgia,serif!important;color:#13231c!important;letter-spacing:-.01em;}' +
      "h1,h2{font-weight:600!important;}" +
      "header a{color:#13231c!important;}" +
      'footer a[href*="privacy-policy"],footer a[href*="terms-and-conditions"]{font-size:15px!important;}' +
      'footer a[href^="mailto"]{display:none!important;}' +
      ".gh-contact .gh-send,#formContact .bouton-envoyer,#formContact .send-button{background:#a97d5c!important;border-radius:999px!important;}" +
      ".gh-contact .gh-send:hover,#formContact .bouton-envoyer:hover,#formContact .send-button:hover{background:#936a48!important;}";
    document.head.appendChild(ts);
  }

  /* ---- Styles du héros ---- */
  function heroStyle() {
    if (document.getElementById("gh-hero-style")) return;
    var s = document.createElement("style"); s.id = "gh-hero-style";
    s.textContent =
      ".gh-hero-block{align-items:flex-start!important;text-align:left!important;position:relative;z-index:2;}" +
      ".gh-hero-block>h1{text-align:left!important;max-width:640px;line-height:.98!important;text-transform:none!important;}" +
      ".gh-hero-block>h1 .gh-l1{color:#f4f1ed!important;font-style:normal;display:block;text-transform:none!important;}" +
      ".gh-hero-block>h1 .gh-l2{color:#d2b29a!important;font-style:italic;display:block;text-transform:none!important;margin-top:2px;}" +
      ".gh-hero-block>p{text-align:left!important;max-width:520px;color:#f4f1ed!important;}" +
      '.gh-eyebrow{font-family:"Hanken Grotesk",sans-serif!important;text-transform:uppercase;letter-spacing:.22em;font-size:13px;font-weight:600;color:#e5d2c2;margin:0 0 16px;}' +
      ".gh-cta-row{display:flex;gap:14px;flex-wrap:wrap;margin:30px 0 40px;}" +
      '.gh-cta{display:inline-flex;align-items:center;justify-content:center;padding:15px 30px;border-radius:999px;font-family:"Hanken Grotesk",sans-serif!important;font-weight:600;font-size:16px;text-decoration:none;cursor:pointer;}' +
      ".gh-cta-primary{background:#a97d5c;color:#f4f1ed;} .gh-cta-primary:hover{background:#936a48;}" +
      ".gh-cta-light{background:#f4f1ed;color:#13231c;} .gh-cta-light:hover{background:#fff;}" +
      ".gh-hero-scrim{position:absolute;inset:0;pointer-events:none;background:linear-gradient(100deg,rgba(13,24,19,.85) 0%,rgba(13,24,19,.55) 40%,rgba(13,24,19,.12) 72%);z-index:1;}" +
      "@media(max-width:640px){.gh-cta{padding:13px 22px;font-size:15px;}}";
    document.head.appendChild(s);
  }

  /* ---- Suivi Meta « Lead » (déclenché quand le message de succès apparaît) ---- */
  var LEAD_SEL = [".gh-contact .gh-status.gh-success", "#etatSucces", "#statusSuccess"];
  function watchLead(el) {
    if (el.getAttribute("data-lead-watch") === "1") return;
    el.setAttribute("data-lead-watch", "1");
    new MutationObserver(function () {
      if (el.offsetParent !== null && typeof fbq === "function" && !el.__lf) {
        el.__lf = true; fbq("track", "Lead");
        setTimeout(function () { el.__lf = false; }, 3000);
      }
    }).observe(el, { attributes: true, attributeFilter: ["class", "style"] });
  }
  function scanLead() {
    for (var i = 0; i < LEAD_SEL.length; i++) {
      var els = document.querySelectorAll(LEAD_SEL[i]);
      for (var j = 0; j < els.length; j++) watchLead(els[j]);
    }
  }

  /* ---- Transformation du héros (accueil FR « /fr » et EN « / ») ---- */
  function isHome() { return /^\/(fr\/?|en\/?)?$/.test(location.pathname); }
  function unhide() { var f = document.getElementById("gh-fouc"); if (f) f.remove(); }
  function L() {
    var fr = location.pathname.indexOf("/fr") === 0;
    return fr ? {
      eb: "GESTION · PERFORMANCE · EXPÉRIENCES SUR MESURE",
      p: "Des propriétés d'exception, sélectionnées et entretenues comme si elles étaient les nôtres. Et surtout, un service attentionné pour les propriétaires comme pour les voyageurs.",
      c1: "Découvrir les propriétés", c2: "Confier ma propriété", px: "/fr"
    } : {
      eb: "MANAGEMENT · PERFORMANCE · CUSTOM EXPERIENCES",
      p: "Exceptional properties, selected and looked after as if they were our own. Above all, attentive service for owners and guests alike.",
      c1: "Discover the properties", c2: "Entrust my property", px: ""
    };
  }
  function hero() {
    if (!isHome()) { unhide(); return; }
    var h1 = document.querySelector("h1"); if (!h1) return;
    var b = h1.parentElement; if (!b) return;
    var t = L(); heroStyle(); b.classList.add("gh-hero-block");
    if (!h1.querySelector(".gh-l1")) {
      var x = h1.textContent.trim(), i = x.indexOf(". ");
      var a = i > -1 ? x.slice(0, i + 1) : x, c = i > -1 ? x.slice(i + 2) : "";
      h1.innerHTML = '<span class="gh-l1"></span><span class="gh-l2"></span>';
      h1.querySelector(".gh-l1").textContent = a;
      h1.querySelector(".gh-l2").textContent = c;
    }
    var v = document.querySelector("video");
    if (v) { var vp = v.parentElement; if (vp && !vp.querySelector(".gh-hero-scrim")) { if (getComputedStyle(vp).position === "static") vp.style.position = "relative"; var sc = document.createElement("div"); sc.className = "gh-hero-scrim"; vp.appendChild(sc); } }
    if (!b.querySelector(".gh-eyebrow")) { var e = document.createElement("div"); e.className = "gh-eyebrow"; e.textContent = t.eb; b.insertBefore(e, h1); }
    var p = b.querySelector("p"); if (p && p.textContent !== t.p) p.textContent = t.p;
    if (!b.querySelector(".gh-cta-row")) {
      var r = document.createElement("div"); r.className = "gh-cta-row";
      var a1 = document.createElement("a"); a1.className = "gh-cta gh-cta-primary"; a1.href = t.px + "/all-listings"; a1.textContent = t.c1;
      var a2 = document.createElement("a"); a2.className = "gh-cta gh-cta-light"; a2.href = t.px + "/pages/services-aux-propriétaires"; a2.textContent = t.c2;
      r.appendChild(a1); r.appendChild(a2);
      if (p && p.nextSibling) b.insertBefore(r, p.nextSibling); else b.appendChild(r);
    }
    unhide();
  }

  /* ---- Footer : ajoute Instagram + LinkedIn en clonant l'icône Facebook ---- */
  function addSocial(fb, href, key, viewBox, paths) {
    if (document.querySelector('footer a[href*="' + key + '"]')) return;
    var clone = fb.cloneNode(true);
    clone.setAttribute("href", href);
    var svg = clone.querySelector("svg");
    if (svg) { svg.setAttribute("viewBox", viewBox); svg.innerHTML = paths; }
    fb.parentElement.appendChild(clone);
  }
  function footerEnhance() {
    var fb = document.querySelector('footer a[href*="facebook"]');
    if (!fb || !fb.parentElement) return;
    var IG = '<path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.9 4.9 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122s-.01 3.056-.06 4.122c-.05 1.065-.218 1.79-.465 2.428a4.9 4.9 0 0 1-1.153 1.772 4.9 4.9 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06s-3.056-.01-4.122-.06c-1.065-.05-1.79-.218-2.428-.465a4.9 4.9 0 0 1-1.772-1.153 4.9 4.9 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12s.01-3.056.06-4.122c.05-1.066.217-1.79.465-2.428a4.9 4.9 0 0 1 1.153-1.772A4.9 4.9 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2m0 1.8c-2.67 0-2.987.01-4.04.059-.975.045-1.504.207-1.857.344-.467.181-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.054-.058 1.37-.058 4.041s.01 2.987.058 4.04c.045.976.207 1.505.344 1.858.182.466.399.8.748 1.15.35.35.683.566 1.15.747.353.138.882.3 1.857.345 1.053.048 1.37.058 4.04.058s2.988-.01 4.041-.058c.976-.045 1.505-.207 1.858-.345.466-.181.8-.397 1.15-.747.35-.35.566-.684.747-1.15.138-.353.3-.882.345-1.857.048-1.054.058-1.37.058-4.041s-.01-2.987-.058-4.04c-.045-.976-.207-1.505-.345-1.858-.181-.467-.398-.8-.747-1.15-.35-.35-.684-.567-1.15-.748-.353-.137-.882-.3-1.858-.344-1.053-.049-1.37-.059-4.04-.059zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4M17.65 6.7a1.17 1.17 0 1 1 0 2.34 1.17 1.17 0 0 1 0-2.34"/>';
    var LI = '<path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"/>';
    addSocial(fb, "https://instagram.com/gestionhamann", "instagram", "0 0 24 24", IG);
    addSocial(fb, "https://www.linkedin.com/company/gestionhamann/", "linkedin", "0 0 24 24", LI);
  }

  function run() { try { scanLead(); hero(); footerEnhance(); } catch (e) { unhide(); } }
  if (document.readyState !== "loading") run();
  document.addEventListener("DOMContentLoaded", run);
  var n = 0, iv = setInterval(function () { run(); if (++n > 40) clearInterval(iv); }, 250);
  if (window.MutationObserver) {
    var t2; new MutationObserver(function () { clearTimeout(t2); t2 = setTimeout(run, 100); }).observe(document.body, { childList: true, subtree: true });
  }
})();

/* Footer : copyright dynamique (annee auto) + lien HALO */
(function(){function c(){var f=document.querySelector("footer");if(!f)return;var fr=location.pathname.indexOf("/fr")===0;var a=[].filter.call(f.querySelectorAll("div"),function(d){if(d.closest("a"))return false;var o=[].filter.call(d.childNodes,function(n){return n.nodeType===3;}).map(function(n){return n.textContent;}).join("").trim();return o==="Gestion Hamann";});var el=a[a.length-1];if(!el)return;var y=new Date().getFullYear();var t=fr?"Copyright \u00a9 "+y+" Gestion Hamann. Tous droits r\u00e9serv\u00e9s. Par ":"Copyright \u00a9 "+y+" Gestion Hamann. All rights reserved. By ";el.innerHTML=t+'<a href="https://ouihalo.com/" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline">HALO</a>.';}function r(){try{c();}catch(e){}}if(document.readyState!=="loading")r();document.addEventListener("DOMContentLoaded",r);var n=0,iv=setInterval(function(){r();if(++n>40)clearInterval(iv);},250);if(window.MutationObserver){var q;new MutationObserver(function(){clearTimeout(q);q=setTimeout(r,150);}).observe(document.documentElement,{childList:true,subtree:true});}})();

/* Coherence 2026-11 : boutons 3 px, heros lisible, pied de page, casse des libelles */
(function(){
var CSS=
".gh-eyebrow{display:none!important;}"+
".gh-cta{min-height:52px;padding:0 34px!important;border-radius:3px!important;font-weight:500!important;font-size:13px!important;letter-spacing:.12em;text-transform:uppercase;line-height:1;border:1px solid transparent;transition:background-color .2s,border-color .2s,color .2s;}"+
".gh-cta-primary{background:#a97d5c!important;border-color:#a97d5c!important;color:#fff!important;}"+
".gh-cta-primary:hover{background:#8f6a4d!important;border-color:#8f6a4d!important;}"+
".gh-cta-light{background:rgba(244,241,237,.16)!important;border:2px solid #f4f1ed!important;color:#fff!important;font-weight:600!important;-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);}"+
".gh-cta-light:hover{background:#f4f1ed!important;color:#13231c!important;}"+
".gh-hero-block>h1 .gh-l2{color:#a97d5c!important;}"+
".gh-hero-block>p{border-top:0!important;padding-top:0!important;font-weight:500!important;font-size:19px!important;line-height:30px!important;color:#f4f1ed!important;text-shadow:0 1px 12px rgba(0,0,0,.45);}"+
".gh-hero-scrim{background:linear-gradient(90deg,rgba(0,0,0,.5) 0%,rgba(0,0,0,.3) 45%,rgba(0,0,0,.05) 100%)!important;}"+
".gh-contact .gh-send,#formContact .bouton-envoyer,#formContact .send-button{border-radius:3px!important;}"+
".gh-contact .gh-send:hover,#formContact .bouton-envoyer:hover,#formContact .send-button:hover{background:#8f6a4d!important;}"+
".gh-r3{border-radius:3px!important;}"+
"footer img[src*=\"/attachment/\"]{height:96px!important;width:auto!important;max-width:none!important;}"+
"header img[src*=\"/attachment/\"]{height:64px!important;width:auto!important;max-width:none!important;}"+
"@media(max-width:900px){header img[src*=\"/attachment/\"]{height:44px!important;}footer img[src*=\"/attachment/\"]{height:72px!important;}}"+
".gh-social{display:inline-flex!important;align-items:center;justify-content:center;width:44px!important;height:44px!important;border-radius:50%!important;background:transparent!important;border:1px solid rgba(244,241,237,.35)!important;color:#f4f1ed!important;transition:background-color .2s,border-color .2s;}"+
".gh-social:hover{background:#a97d5c!important;border-color:#a97d5c!important;}"+
".gh-social svg{width:18px!important;height:18px!important;fill:#f4f1ed!important;}"+
".gh-nocap{text-transform:none!important;}"+
".gh-nb::before,.gh-na::after{background:transparent!important;}"+
".gh-btn-search{border-radius:3px!important;font-family:\"Hanken Grotesk\",sans-serif!important;font-weight:500!important;font-size:13px!important;letter-spacing:.12em!important;text-transform:uppercase!important;}"+
".gh-btn-search:hover{background:#8f6a4d!important;}";
function style(){if(document.getElementById("gh-coherence"))return;var s=document.createElement("style");s.id="gh-coherence";s.textContent=CSS;document.head.appendChild(s);}
function r3(){
  var els=document.querySelectorAll("button,a,input,select,form,div,label,span,img");
  for(var i=0;i<els.length;i++){var e=els[i];if(e.classList.contains("gh-r3")||e.closest("footer"))continue;
    var w=e.offsetWidth,h=e.offsetHeight;if(!w||!h||Math.abs(w-h)<4)continue;
    var cs3=getComputedStyle(e);var r=Math.max(parseFloat(cs3.borderTopLeftRadius)||0,parseFloat(cs3.borderBottomLeftRadius)||0,parseFloat(cs3.borderTopRightRadius)||0,parseFloat(cs3.borderBottomRightRadius)||0);if(r>=6){e.classList.add("gh-r3");e.style.setProperty("border-radius","3px","important");}}
}
function social(){var a=document.querySelectorAll('footer a[href*="facebook"],footer a[href*="instagram"],footer a[href*="linkedin"]');for(var i=0;i<a.length;i++)a[i].classList.add("gh-social");}
var FIX={"Choisir La Date":"Choisir la date","Add Date":"Add date","Nos meilleures propri\u00e9t\u00e9s":"En vedette","Our top properties":"Featured","Select Dates":"Select dates","S\u00e9lectionnez Les Dates":"S\u00e9lectionnez les dates"};
var FIXEN={"Washing Machine":"Washing machine","Send Inquiry":"Send inquiry","House Rules":"House rules","More Filters":"More filters","Booking management and Revenue optimization":"Booking management and revenue optimization"};
var FIXFR={"Kitchen":"Cuisine","Air conditioning":"Climatisation","Washing Machine":"Machine \u00e0 laver","L'Internet":"Internet","L\u2019Internet":"Internet","Centre ville":"Centre-ville"};
function casse(){
  var all=document.querySelectorAll("body *");for(var m=0;m<all.length;m++){var el=all[m];if(el.childElementCount===0&&!el.classList.contains("gh-nocap")&&getComputedStyle(el).textTransform==="capitalize")el.classList.add("gh-nocap");}
  var dd=document.querySelectorAll("header *,footer *,span,li,div");for(var z=0;z<dd.length;z++){var de=dd[z];if(de.__ghd)continue;de.__ghd=1;var ps=["::before","::after"];for(var y=0;y<2;y++){var cs=getComputedStyle(de,ps[y]);if(cs.content==="none"||cs.content==="normal")continue;var ww=parseFloat(cs.width),hh=parseFloat(cs.height);if(ww>0&&ww<=6&&hh>0&&hh<=6)de.classList.add(y?"gh-na":"gh-nb");}}
  var bs=document.querySelectorAll("button");for(var b=0;b<bs.length;b++){var tx=(bs[b].innerText||"").trim();if(tx==="Rechercher"||tx==="Search")bs[b].classList.add("gh-btn-search");}
  var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null);var n;
  var fr=location.pathname.indexOf("/fr")===0;while((n=w.nextNode())){var t=n.nodeValue.trim();var f=FIX[t]||(fr?FIXFR[t]:FIXEN[t]);if(f)n.nodeValue=n.nodeValue.replace(t,f);else if((t==="\u00b7"||t==="\u2022")&&n.parentElement&&n.parentElement.childElementCount===0)n.parentElement.style.visibility="hidden";}
  var inp=document.querySelectorAll("input[placeholder]");for(var j=0;j<inp.length;j++){var p=inp[j].getAttribute("placeholder");if(FIX[p])inp[j].setAttribute("placeholder",FIX[p]);}
}
/* Avis Villa Montcalm : total public Airbnb (29, 4,97) + Vrbo (5, 10/10), releve le 2026-11-22. A mettre a jour au besoin. */
var AV={fr:{n:"4,97",t:"34 avis v\u00e9rifi\u00e9s sur Airbnb et Vrbo"},en:{n:"4.97",t:"34 verified reviews on Airbnb and Vrbo"}};
function avis(){var L=location.pathname.indexOf("/fr")===0?AV.fr:AV.en;var onM=/\/listings\/502225/.test(location.pathname);var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null);var n;
  while((n=w.nextNode())){var t=n.nodeValue.trim();
    if(t==="4.95"){var ok=onM;var pe=n.parentElement;if(!ok&&pe&&pe.closest('a[href*="/listings/502225"]'))ok=true;var q=pe;for(var i=0;!ok&&i<8&&q;i++){if(q.querySelector&&q.querySelector('a[href*="/listings/502225"]')){ok=!q.querySelector('a[href*="/listings/"]:not([href*="502225"])');break;}q=q.parentElement;}if(ok)n.nodeValue=n.nodeValue.replace("4.95",L.n);}
    else if(onM&&(t==="1 avis"||t==="1 review"||t==="1 Review"))n.nodeValue=n.nodeValue.replace(t,L.t);
    else if(onM&&t==="(1)")n.nodeValue=n.nodeValue.replace("(1)","(34)");
    else if(onM&&t==="1"&&n.parentElement&&/^\s*4[.,]9\d\s*\(1\)\s*$/.test(n.parentElement.textContent))n.nodeValue="34";}
}
function run(){try{style();r3();social();casse();avis();}catch(e){}}
if(document.readyState!=="loading")run();document.addEventListener("DOMContentLoaded",run);
var k=0,iv=setInterval(function(){run();if(++k>40)clearInterval(iv);},250);
if(window.MutationObserver){var q;new MutationObserver(function(){clearTimeout(q);q=setTimeout(run,150);}).observe(document.documentElement,{childList:true,subtree:true});}
})();

/* SEO 2026-11 : titres et descriptions FR/EN, redirections des pages en double, H1 Contact, bouton pause mobile */
(function(){
var SEO={
fr:{
home:["Gestion Hamann | Location court terme haut de gamme","Découvrez la sélection de locations haut de gamme de Gestion Hamann. Des propriétés d'exception, une réservation simple et des séjours mémorables."],
listings:["Nos propriétés | Gestion Hamann","Parcourez toutes nos locations haut de gamme. Filtrez par destination, dates et nombre de voyageurs pour trouver votre séjour avec Gestion Hamann."],
about:["À propos | Gestion Hamann","Découvrez Gestion Hamann, entreprise de location court terme haut de gamme qui offre des séjours d'exception aux voyageurs du monde entier."],
contact:["Contact | Gestion Hamann","Une question ou une demande de réservation? Écrivez à Gestion Hamann. Chaque message reçoit une réponse personnelle."],
owners:["Services aux propriétaires | Gestion Hamann","Résidences secondaires, chalets et condos haut de gamme. Gestion Hamann prend en charge les opérations, l'expérience des voyageurs et la performance de votre propriété."],
privacy:["Politique de confidentialité | Gestion Hamann",null],
terms:["Termes et conditions | Gestion Hamann",null]},
en:{
about:["About Us | Gestion Hamann",null],
listings:["Properties | Gestion Hamann",null],
owners:["Property Owner Services | Gestion Hamann","Second homes, chalets and high-end condos. Gestion Hamann handles operations, the guest experience and the performance of your property."],
contact:["Contact | Gestion Hamann","Have a question or a booking inquiry? Get in touch with Gestion Hamann. We personally respond to every message."],
privacy:["Privacy Policy | Gestion Hamann",null],
terms:["Terms and Conditions | Gestion Hamann",null]}};
function info(){var raw=location.pathname;try{raw=decodeURIComponent(raw);}catch(e){}var fr=raw.indexOf("/fr")===0;var p=raw.replace(/^\/fr/,"").replace(/\/$/,"");return {fr:fr,p:p};}
function redirect(){var i=info(),px=i.fr?"/fr":"";
  if(i.p==="/pages/about-us2"){location.replace(px+"/about-us");return true;}
  if(i.p==="/pages/contact-us"||i.p==="/contact-us"){location.replace(px+"/pages/contact");return true;}
  return false;}
function key(p){if(p==="")return "home";if(p==="/all-listings")return "listings";if(p==="/about-us")return "about";if(p==="/pages/contact")return "contact";if(p.indexOf("/pages/services-aux-propri")===0)return "owners";if(p==="/privacy-policy")return "privacy";if(p==="/terms-and-conditions")return "terms";return null;}
function meta(){var i=info(),k=key(i.p),d=(i.fr?SEO.fr:SEO.en)[k];
  if(d){if(document.title!==d[0])document.title=d[0];
    if(d[1]){var m=document.querySelector('meta[name="description"]');if(!m){m=document.createElement("meta");m.setAttribute("name","description");document.head.appendChild(m);}if(m.getAttribute("content")!==d[1])m.setAttribute("content",d[1]);}}
  else if(document.title.indexOf(" \u2014 ")>-1){document.title=document.title.split(" \u2014 ")[0]+" | Gestion Hamann";}}
function h1(){var i=info();if(i.p!=="/pages/contact"||document.querySelector("h1"))return;var h=document.querySelector("main h2, h2");if(!h)return;var n=document.createElement("h1");n.className=h.className;n.setAttribute("style",h.getAttribute("style")||"");n.innerHTML=h.innerHTML;h.parentNode.replaceChild(n,h);}
function pause(){var v=document.querySelector("video");if(!v)return;var box=v.parentElement;for(var k=0;k<4&&box&&!box.querySelector("button");k++)box=box.parentElement;if(!box)return;var bs=box.querySelectorAll("button");for(var j=0;j<bs.length;j++){var b=bs[j];if(b.getBoundingClientRect().bottom>v.getBoundingClientRect().bottom-140&&Math.abs(b.offsetWidth-b.offsetHeight)<4&&b.offsetWidth>0&&b.offsetWidth<60&&getComputedStyle(b).position==="absolute")b.classList.add("gh-pause");}
  if(!document.getElementById("gh-seo-style")){var s=document.createElement("style");s.id="gh-seo-style";s.textContent="@media(max-width:900px){.gh-pause{top:14px!important;bottom:auto!important;}}";document.head.appendChild(s);}}
function run(){try{if(redirect())return;meta();h1();pause();}catch(e){}}
if(document.readyState!=="loading")run();document.addEventListener("DOMContentLoaded",run);
var k=0,iv=setInterval(function(){run();if(++k>40)clearInterval(iv);},250);
if(window.MutationObserver){var q;new MutationObserver(function(){clearTimeout(q);q=setTimeout(run,200);}).observe(document.documentElement,{childList:true,subtree:true});}
})();

/* Fiches EN 2026-11 : description anglaise des proprietes (la base Hostaway est en francais et synchronisee vers Airbnb/Vrbo ; ne pas la changer) */
(function(){
var DESC_EN={"502225": {"fr": "Plongez dans le luxe de la Villa Montcalm", "en": "Immerse yourself in the luxury of Villa Montcalm and create unforgettable memories in the heart of Quebec City. This property has everything you need for an upscale, comfortable and elegant stay, just steps from everything the renowned Old Quebec has to offer.\n\nBook your stay now and step into a world where historic grandeur meets modern elegance.\n\n#CITQ: 313625\n\nImmerse yourself in Quebec City's iconic elegance and enjoy the luxury of modern living at Villa Montcalm, located at the gates of Old Quebec. This upscale townhouse sits in a sought-after neighbourhood full of attractions, fine dining and tourist experiences.\n\nVilla Montcalm blends historic charm with contemporary living. Carefully maintained, this heritage home features modern amenities and an elegant atmosphere, ideal for families and couples looking for a comfortable stay.\n\nInside, the ground floor offers a warm living space, perfect for intimate gatherings. The central island of the modern kitchen invites lively evenings around gourmet meals, while the electric fireplace in the living room adds a touch of warmth to your evenings of relaxation. A majestic grand piano is also there, to the delight of music lovers.\n\nUpstairs, you will find three bedrooms, one of them with a desk, as well as a full bathroom with two sinks, a shower and a freestanding tub. The primary bedroom, adjoining the bathroom, has a queen bed, a television and storage space. The second bedroom also has a queen bed and a closet.\n\nOn the garden level, enjoy a fourth bedroom with a queen bed and a work area, with a connecting shower room with two sinks. This level also has a family room with a television and a large laundry room.\n\nOutside, discover a private backyard with a covered terrace and an outdoor fireplace, a peaceful retreat perfect for enjoying the summer, a prized feature in this lively part of the city.\n\nWith such a convenient location, a car is optional. However, Villa Montcalm offers two private parking spaces, a rarity in this coveted neighbourhood.\n\nTo elevate your stay, treat yourself by booking our turnkey in-home services ($) offered by our team of professionals. Private drivers, chefs, massage therapists and more will make your experience unique and tailored to you. Contact us for more information.\n\nEnjoy full access to every area of the property, except for some storage spaces not detailed in the description.\n\nStay at the gates of Old Quebec, an iconic neighbourhood steeped in history in the heart of the city.\n\nStroll its cobblestone streets, lined with picturesque buildings and colourful facades. Visit the famous Plains of Abraham, witness to historic battles, and explore the majestic Ch\u00e2teau Frontenac, which dominates the city skyline. Art lovers will appreciate the local art galleries, while food lovers can savour the refined cuisine of renowned restaurants.\n\nWith its charming boutiques, lively street performances and breathtaking views of the St. Lawrence River, Old Quebec offers an unforgettable experience, rich in culture and timeless charm.\n\nBeyond the tourist attractions of nearby Old Quebec, a wealth of cultural experiences (bookstores, theatre, museums, cinema and art galleries) is just steps from the Villa. Epicureans will be delighted by the selection of renowned restaurants nearby, all within walking distance.\n\nThe house is accessible by car, and several restaurants, grocery stores and attractions are within walking distance.\n\nMake getting around easy with our private driver service, available for part or all of your stay ($). Contact us now to personalize your experience.\n\n\u00c0 la carte services available ($):\n- In-home chef;\n- Private driver;\n- In-home massage therapy and beauty treatments;\n\nMust-do activities ($):\n- Whale-watching cruise;\n- Dog sledding;\n- Old Quebec;\n- Private cooking class;\n- And much more.\n\nWe are here to help make your stay unforgettable. Contact us now to personalize your experience."}, "504620": {"fr": "D\u00e9couvrez le charme exclusif de Villa Haute Couture", "en": "Discover the exclusive charm of Villa Haute Couture, a modern property ideally located on the shores of a prestigious lake, on the outskirts of Quebec City. Surrounded by abundant nature, this residence offers a breathtaking view of the water, mature maple trees and distant mountains. Enjoy a peaceful and elegant experience in this haven of tranquillity, where calm and natural beauty come together in harmony.\n\nOn the ground floor, enjoy a vast main living area with a breathtaking view of the lake. This area includes a modern kitchen with a spacious island and high-end appliances. You will also find access to a large four-season terrace with two fireplaces and a barbecue, as well as a welcoming dining room and an inviting living room. The primary suite, with a king bed, walk-in closet, shower room and private balcony, an office, a laundry room and a powder room complete this floor.\n\nThe garden level houses a family room with a home theatre, two bedrooms with 4 double bunk beds, a full bathroom with a lake view, and the property's main entrance, which includes a spacious cloakroom, ideal for storing your belongings. The family room opens onto the spa, a second terrace and the yard, again with an unmatched view of the lake.\n\nEnjoy full access to every area of the property, except for a storage room and the mechanical room, not detailed in the description.\n\nNestled in an enchanting natural setting, this peaceful neighbourhood offers an idyllic getaway just 30 minutes from Quebec City. Surrounded by the splendour of the mountains and the calm waters of the lake, our neighbourhood invites you to explore the surrounding nature. Enjoy relaxing walks, hikes and a wide range of outdoor activities that change with the seasons.\n\nOur prime location ensures quick access to essential amenities. Grocery stores, shops and services are easy to reach, making your stay easier and letting you make the most of every moment.\n\nDiscover Old Quebec, just 45 minutes away!\n\nFall under the spell of Old Quebec, an iconic neighbourhood steeped in history in the heart of the city.\n\nStroll its cobblestone streets, lined with picturesque buildings and colourful facades. Visit the famous Plains of Abraham, witness to historic battles, and explore the majestic Ch\u00e2teau Frontenac, which dominates the city skyline. Art lovers will appreciate the local art galleries, while food lovers can savour the refined cuisine of renowned restaurants.\n\nWith its charming boutiques, lively street performances and breathtaking views of the St. Lawrence River, Old Quebec offers an unforgettable experience, rich in culture and timeless charm.\n\nThe house is accessible by car. Make getting around easy with our private driver service, available for part or all of your stay ($). Contact us now to personalize your experience.\n\n\u00c0 la carte services available ($):\n- In-home chef;\n- Private driver;\n- In-home massage therapy and beauty treatments;\n- In-home yoga, meditation and Pilates.\n\nMust-do activities ($):\n- Whale-watching cruise;\n- Dog sledding;\n- Old Quebec;\n- Private cooking class;\n- And much more.\n\nWe are here to help make your stay unforgettable. Contact us now to personalize your experience."}};
function descEN(){var raw=location.pathname;if(raw.indexOf("/fr")===0)return;var m=raw.match(/\/listings\/(\d+)/);if(!m||!DESC_EN[m[1]])return;var d=DESC_EN[m[1]];
  var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null);var n;while((n=w.nextNode())){var v=n.nodeValue;if(v.indexOf(d.fr)!==0||!n.parentElement||n.parentElement.tagName==="SCRIPT")continue;
    if(v.length>1000){n.nodeValue=d.en;}else{var c=d.en.slice(0,v.length);var sp=c.lastIndexOf(" ");n.nodeValue=sp>200?c.slice(0,sp):c;}}}
function run(){try{descEN();}catch(e){}}
if(document.readyState!=="loading")run();document.addEventListener("DOMContentLoaded",run);
var k=0,iv=setInterval(function(){run();if(++k>40)clearInterval(iv);},250);
if(window.MutationObserver){var q;new MutationObserver(function(){clearTimeout(q);q=setTimeout(run,150);}).observe(document.documentElement,{childList:true,subtree:true});}
})();

/* Chargeur maquette 2026-11 : charge gh-maquette.js (meme version) sur l'accueil et A propos */
(function(){var me=document.currentScript&&document.currentScript.src;if(!me)return;var url=me.replace(/gh-gestionhamann\.js.*$/,"gh-maquette.js");var done=false;
function chk(){if(done)return;var p=location.pathname;try{p=decodeURIComponent(p)}catch(e){}var q=p.replace(/^\/fr/,"").replace(/\/$/,"");if(q!==""&&q!=="/about-us")return;done=true;var s=document.createElement("script");s.src=url;document.head.appendChild(s);}
chk();var k=0,iv=setInterval(function(){chk();if(done||++k>2400)clearInterval(iv);},500);})();

/* Gabarit 2026-11 : en-tete et pied de page de la maquette sur toutes les pages, alignements et uniformisation */
(function(){
var LOGO="https://bookingenginecdn.hostaway.com/account/attachment/116313-nZi6NqzcnnBziQkmVZANben9n8imtsASgYnFG-kg-gk-6ae61ecdae5ec?width=600&quality=80";
var OWN="/pages/services-aux-propri%C3%A9taires";
var L={
 fr:{nav:[["","Accueil"],["/all-listings","Propri\u00e9t\u00e9s"],[OWN,"Services aux propri\u00e9taires"],["/about-us","\u00c0 propos"],["/pages/contact","Contact"]],
     other:"EN",menu:"Menu",close:"Fermer",privacy:["/privacy-policy","Politique de confidentialit\u00e9"],terms:["/terms-and-conditions","Termes et conditions"],
     copy:"Tous droits r\u00e9serv\u00e9s. Par ",sel:"S\u00e9lectionner\u2026"},
 en:{nav:[["","Home"],["/all-listings","Properties"],[OWN,"For property owners"],["/about-us","About us"],["/pages/contact","Contact"]],
     other:"FR",menu:"Menu",close:"Close",privacy:["/privacy-policy","Privacy policy"],terms:["/terms-and-conditions","Terms and conditions"],
     copy:"All rights reserved. By ",sel:"Select\u2026"}};
var SOC=[["https://facebook.com/gestionhamann","Facebook",'<path fill="currentColor" d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1z"/>'],
 ["https://instagram.com/gestionhamann","Instagram",'<rect x="4" y="4" width="16" height="16" rx="4.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="12" cy="12" r="3.6" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="16.8" cy="7.2" r="1" fill="currentColor"/>'],
 ["https://www.linkedin.com/company/gestionhamann/","LinkedIn",'<path fill="currentColor" d="M6.9 8.6H4.2V19h2.7V8.6zM5.55 4.5a1.55 1.55 0 1 0 0 3.1 1.55 1.55 0 0 0 0-3.1zM19.8 13.3c0-2.8-1.5-4.9-4.1-4.9-1.3 0-2.2.7-2.6 1.4V8.6h-2.6V19h2.7v-5.3c0-1.4.5-2.5 1.9-2.5 1.3 0 1.9 1 1.9 2.5V19h2.8v-5.7z"/>']];
var CSS=
".gh-native-off{display:none!important}"+
"main .wrap{max-width:1240px!important}"+
".gh-hd{background:#f4f1ed;border-bottom:1px solid #ddd5ca;position:relative;z-index:60;font-family:'Hanken Grotesk',system-ui,sans-serif}"+
".gh-hd .in{max-width:1240px;margin:0 auto;padding:14px 24px;display:flex;align-items:center;justify-content:space-between;gap:24px}"+
".gh-hd .logo img{height:56px!important;width:auto!important;display:block;border-radius:0!important;margin-left:-10px}"+
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
".gh-ft .logo img{height:88px!important;width:auto!important;display:block;border-radius:0!important;margin-left:-14px}"+
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
"@media(min-width:901px){.gh-noicon svg{display:none!important}.gh-noicon>span{margin-left:0!important}.gh-noicon{height:40px!important;min-height:40px!important;margin-top:12px!important;padding:0 24px!important}}"+
".ghm .founder img{object-fit:cover!important;object-position:50% 20%!important}"+
"body.gh-listing main{padding-bottom:clamp(56px,7vw,96px)!important}"+
"#mikael{padding-bottom:clamp(56px,7vw,96px)!important}"+
".gh-desc{font-family:'Hanken Grotesk',system-ui,sans-serif!important;font-size:17px!important;line-height:1.75!important;font-weight:400!important;color:#2f3b35!important;letter-spacing:0!important}"+
".gh-abouttext p{text-align:left!important}"+
"@media(max-width:900px){.gh-hd .logo img,.gh-ft .logo img{margin-left:0!important}body.gh-listing footer.gh-ft{padding-bottom:120px!important}main .gh-contactpage{padding-top:0!important}}"+
"main .gh-contactpage{margin-top:0!important}"+
".kicker{display:none!important}.n{display:none!important}ol.steps>li::before,ul.steps>li::before,.steps>li::before{display:none!important}"+
"li.gh-nodash::before{display:none!important}li.gh-nodash{padding-left:0!important;display:block!important}.gh-non{display:block!important}section#proprietes h2{text-align:left!important}"+
"main blockquote::before{display:none!important}"+
"main .gh-contact{margin-left:0!important;margin-right:auto!important;max-width:760px!important}"+
".gh-contact .gh-field label,.gh-contact .gh-legende,.gh-contact p,.gh-contact .gh-consent{text-align:left!important}.gh-contact .gh-choice-group,.gh-contact .gh-checks{justify-content:flex-start!important;text-align:left!important}"+
".gh-grid2{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:48px 32px!important;margin-bottom:clamp(56px,7vw,96px)!important}.gh-grid2>*{grid-column:auto!important;width:auto!important;max-width:none!important}@media(max-width:760px){.gh-grid2{grid-template-columns:1fr!important}}"+
".gh-contactpage{background:transparent!important;padding:24px 0 clamp(56px,7vw,96px)!important;text-align:left!important;box-shadow:none!important;border:0!important}.gh-contactpage>h1,.gh-contactpage h1{font-family:'Cormorant Garamond',Georgia,serif!important;font-weight:600!important;font-size:clamp(40px,4.8vw,58px)!important;line-height:1.05!important;text-align:left!important;margin:0 0 24px!important;max-width:18ch!important}.gh-contactpage>p{text-align:left!important;margin-left:0!important;margin-right:0!important;max-width:56ch!important;font-size:17px!important;line-height:1.75!important;color:#2f3b35!important}"+
".gh-hide{display:none!important}"+
".gh-abouth1{text-transform:none!important;font-family:'Cormorant Garamond',Georgia,serif!important;font-weight:600!important;font-size:clamp(44px,4.9vw,70px)!important;letter-spacing:-.01em!important;color:#f4f1ed!important;text-align:left!important;width:100%!important;max-width:1192px!important;margin:0 auto!important;padding:0 24px!important}"+
".gh-abouttext p{font-size:17px!important;line-height:1.75!important;color:#2f3b35!important;max-width:56ch!important;margin:0 0 18px!important}.gh-abouttext p.gh-sig{font:500 11px/1.8 'Hanken Grotesk',sans-serif!important;letter-spacing:.22em!important;text-transform:uppercase!important;color:#13231c!important;margin:0!important}.gh-abouttext p.gh-sig:first-of-type{margin-top:28px!important}"+

"main a.cta,main a.btn.btn-dark{background:#a97d5c!important;border-color:#a97d5c!important;color:#fff!important}"+
"main a.cta:hover,main a.btn.btn-dark:hover{background:#8f6a4d!important;border-color:#8f6a4d!important}"+
"h1,h2,h3,h4,h5,h6,body .ghm h1,body .ghm h2,body .ghm h3,body .gh-listh1,body .gh-abouth1,body .gh-contactpage h1,body .gh-hero-block>h1 span{font-weight:500!important}"+
"h1 em,h2 em,h3 em,body .ghm h2 em,body .ghm .remote h2 em,body .gh-hero-block>h1 .gh-l2{font-weight:400!important}"+
"#ghm-about #formulaire-contact h2 em{font-style:italic;color:#a97d5c}"+
"#ghm-about .ghm-form,#ghm-about .ghm-form .gh-contact{width:100%!important;max-width:none!important;margin-left:0!important;margin-right:0!important}"+
"@media(min-width:900px){#ghm-about .form-wrap{grid-template-columns:minmax(0,5fr) minmax(0,7fr)!important;column-gap:clamp(48px,6vw,96px)!important;max-width:1240px!important;align-items:start!important}#ghm-about .form-aside{max-width:none!important;position:sticky;top:calc(var(--gh-head,0px) + 96px)}}"+
"main .gh-contactpage.gh-cdone{padding-top:clamp(24px,4vw,48px)!important}.gh-cgrid{display:grid;grid-template-columns:1fr;gap:48px;text-align:left}.gh-caside h1{margin:0 0 24px!important}.gh-caside>p:not(.gh-cown){margin:0!important;max-width:56ch;font-size:17px!important;line-height:1.75!important;color:#2f3b35!important;text-align:left!important}.gh-cinfo{list-style:none;margin:36px 0 0!important;padding:0!important;border-top:1px solid rgba(19,35,28,.14)}.gh-cinfo li{display:flex;justify-content:space-between;align-items:baseline;gap:24px;margin:0;padding:16px 0;border-bottom:1px solid rgba(19,35,28,.14);font:400 15px/1.5 'Hanken Grotesk',sans-serif;color:#4a524e}.gh-cinfo li::before{display:none!important}.gh-cinfo a,.gh-cinfo b{font:500 21px/1.2 'Cormorant Garamond',Georgia,serif;color:#13231c!important;text-decoration:none!important;overflow-wrap:anywhere;text-align:right}.gh-cinfo a:hover{color:#8f6a4d!important}.gh-cown{margin:32px 0 0!important;font-size:16px!important;line-height:1.7!important;color:#4a524e!important}.gh-cown a{color:#8a6246!important;font-weight:500;text-decoration:none!important;border-bottom:1px solid currentColor}.gh-cown a:hover{color:#8f6a4d!important}.gh-cform .gh-contact{max-width:none!important;width:100%!important;margin:0!important}@media(min-width:900px){.gh-cgrid{grid-template-columns:minmax(0,5fr) minmax(0,7fr);column-gap:clamp(48px,6vw,96px);align-items:start}.gh-caside{position:sticky;top:calc(var(--gh-head,0px) + 32px)}}"+
"main .wrap,.ghm .wrap,#gh-hd .in,#gh-ft .wrap{max-width:1224px!important;padding-left:16px!important;padding-right:16px!important}"+
"@media(max-width:820px){.ghm .founder{grid-template-columns:minmax(0,1fr)!important}.ghm .founder img{width:100%!important;max-width:440px!important;height:auto!important}}"+
"@media(max-width:860px){.ghm .head.split .lead{margin-top:24px!important}}@media(max-width:760px){.ghm .jump a.cta{display:none!important}}"+
"#ghm-about .form-aside .tarif-clair{display:none!important}#ghm-home h2 em{font-style:italic;color:#a97d5c}"+
"main h1[class*=gh-abouth]{padding-left:0!important}#mikael img,#mikael picture,#mikael :has(>picture){border-radius:3px!important}@media(max-width:1023px){#mikael img{max-width:440px!important;height:auto!important}}"+
"h1,h2,h3,.gh-cinfo a,.gh-cinfo b,.ghm .tarif b{font-variant-numeric:lining-nums;font-feature-settings:'lnum' 1}"+
"body.gh-legal main h1{text-align:left!important;margin:clamp(32px,5vw,64px) 0 32px!important;font-family:'Cormorant Garamond',Georgia,serif!important;font-weight:500!important;font-size:clamp(40px,4.8vw,58px)!important;line-height:1.05!important}body.gh-legal main p,body.gh-legal main li{max-width:72ch}body.gh-legal main a{color:#8a6246!important}body.gh-legal main{padding-bottom:clamp(56px,7vw,96px)!important}";
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
function contactPage(i){
  var c=document.querySelector(".gh-contactpage");if(!c||c.classList.contains("gh-cdone"))return;
  var h=c.querySelector("h1"),f=c.querySelector(".gh-contact");if(!h||!f)return;
  var p=h.nextElementSibling,fr=i.fr,own=null,hl=document.querySelectorAll("#gh-hd a");
  for(var k=0;k<hl.length;k++){if(/services aux|owner/i.test(hl[k].textContent)){own=hl[k].getAttribute("href");break;}}
  var g=document.createElement("div");g.className="gh-cgrid";var a=document.createElement("div");a.className="gh-caside";var fc=document.createElement("div");fc.className="gh-cform";
  c.insertBefore(g,h);a.appendChild(h);if(p&&p.tagName==="P")a.appendChild(p);
  var ul=document.createElement("ul");ul.className="gh-cinfo";
  ul.innerHTML='<li><span>'+(fr?"T\u00e9l\u00e9phone":"Phone")+'</span><a href="tel:+14185708186">418 570-8186</a></li><li><span>'+(fr?"Courriel":"Email")+'</span><a href="mailto:mikael@gestionhamann.com">mikael@gestionhamann.com</a></li><li><span>'+(fr?"Langues":"Languages")+'</span><b>'+(fr?"Fran\u00e7ais et anglais":"English and French")+'</b></li>';
  a.appendChild(ul);
  if(own){var o=document.createElement("p");o.className="gh-cown";o.innerHTML=(fr?"Vous \u00eates propri\u00e9taire?":"Own a property?")+' <a href="'+own+'">'+(fr?"D\u00e9couvrir nos services aux propri\u00e9taires":"Explore our owner services")+'</a>';a.appendChild(o);}
  g.appendChild(a);fc.appendChild(f);g.appendChild(fc);c.classList.add("gh-cdone");
}
function fixes(i){
  var m=document.querySelector("main");if(!m)return;
  if(/^\/(privacy-policy|terms-and-conditions)$/.test(i.p))document.body.classList.add("gh-legal");
  var hh=document.querySelectorAll("#ghm-home h2");for(var x=0;x<hh.length;x++){if(!hh[x].querySelector("em"))hh[x].innerHTML=hh[x].innerHTML.replace(/(fr\u00e9quentes|questions|commencer|started)\./,"<em>$1</em>.");}
  if(i.fr){var lw=document.createTreeWalker(m,NodeFilter.SHOW_TEXT,null),ln;while((ln=lw.nextNode())){var lt=ln.nodeValue.trim();var pe=ln.parentElement;if(lt==="E-mail"&&pe&&pe.closest("label"))ln.nodeValue=ln.nodeValue.replace("E-mail","Courriel");var hm=lt.match(/^(Arriv\u00e9e|D\u00e9part): ?(\d{1,2}) ?(am|pm)$/);if(hm){var hr=+hm[2];if(hm[3]==="pm"&&hr<12)hr+=12;ln.nodeValue=hm[1]+" : "+hr+" h";}}}
  var fh=document.querySelector("#ghm-about #formulaire-contact h2");if(fh&&!fh.querySelector("em")){fh.innerHTML=fh.innerHTML.replace(/(commencer|started)\./,"<em>$1</em>.");}
  var as=m.querySelectorAll("a[href*='/listings/']");for(var k=0;k<as.length;k++){var li=as[k].closest("li"),ul=li&&li.parentElement;if(i.p!=="/search"&&ul&&ul.tagName==="UL"&&!ul.classList.contains("gh-grid")&&!ul.closest(".ghm"))ul.classList.add("gh-grid");}
  var labs=document.querySelectorAll("section label");for(var j=0;j<labs.length;j++){var inp=labs[j].querySelector("input[type=checkbox],input[type=radio]");if(inp&&!labs[j].closest("form")&&labs[j].parentElement)labs[j].parentElement.classList.add("gh-filtres");}

  for(var k2=0;k2<as.length;k2++){var a2=as[k2];if(a2.closest("li")||a2.closest(".ghm"))continue;var gp=a2.parentElement;for(var u=0;u<3&&gp;u++){if(getComputedStyle(gp).display==="grid"){gp.classList.add("gh-grid2");break;}gp=gp.parentElement;}}
  if(i.p==="/pages/contact"){var hc=m.querySelector("h1");if(hc&&hc.parentElement&&!hc.closest(".gh-contactpage")){hc.parentElement.classList.add("gh-contactpage");var pv=hc.previousElementSibling;if(pv&&pv.textContent.trim().length<20)pv.classList.add("gh-hide");}contactPage(i);}
  if(i.p==="/about-us"){var ha=m.querySelector("h1");if(ha)ha.classList.add("gh-abouth1");var ps=m.querySelectorAll("p");for(var w=0;w<ps.length;w++){var tx=ps[w].textContent.trim();if(!ps[w].closest(".ghm")){if(/^(Un s\u00e9jour exceptionnel|An exceptional stay|A great stay)/.test(tx)&&ps[w].parentElement)ps[w].parentElement.classList.add("gh-abouttext");if(tx==="-"||tx==="\u2014")ps[w].classList.add("gh-hide");if(/^Mika[e\u00eb]l Hamann$/.test(tx))ps[w].classList.add("gh-sig");if(/^(Gestionnaire|Short-term|Hospitality|Manager)/.test(tx)&&/ - /.test(tx)){ps[w].innerHTML=ps[w].innerHTML.replace(/ - /g,"<br>");ps[w].classList.add("gh-sig");}else if(/^(Gestionnaire|Hospitality|Founder|Fondateur)/.test(tx)&&tx.length<120)ps[w].classList.add("gh-sig");}}}
  document.body.classList.toggle("gh-listing",/\/listings\//.test(i.p));
  if(/\/listings\//.test(i.p)){var hd=m.querySelectorAll("h2");for(var d2=0;d2<hd.length;d2++){if(hd[d2].textContent.length>150&&!hd[d2].classList.contains("gh-desc")){hd[d2].classList.add("gh-desc");var tn=hd[d2].firstChild;if(tn&&tn.nodeType===3&&!/\s$/.test(tn.nodeValue)){var sp2=tn.nodeValue.lastIndexOf(" ");if(sp2>100)tn.nodeValue=tn.nodeValue.slice(0,sp2);}}}}
  var tw2=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null),nn;while((nn=tw2.nextNode())){var pe2=nn.parentElement;if(!pe2||/^(SCRIPT|STYLE|TEXTAREA|OPTION)$/.test(pe2.tagName))continue;var vv=nn.nodeValue;if(vv.indexOf("\u2014")<0&&vv.indexOf("\u2013")<0)continue;var nv2=vv.replace(/\s+[\u2014\u2013]\s+([^\u2014\u2013\n]{1,160}?)\s+[\u2014\u2013]\s+/g," ($1) ").replace(/\s+[\u2014\u2013]\s+/g,", ");if(nv2!==vv)nn.nodeValue=nv2;}
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
