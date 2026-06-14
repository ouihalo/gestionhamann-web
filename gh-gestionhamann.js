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
      p: "Des propriétés d'exception, sélectionnées avec exigence et entretenues comme si elles étaient les nôtres. On s'occupe de tout.",
      c1: "Découvrir les propriétés", c2: "Confier ma propriété", px: "/fr"
    } : {
      eb: "MANAGEMENT · PERFORMANCE · CUSTOM EXPERIENCES",
      p: "Exceptional properties, selected with care and looked after as if they were our own. We handle everything.",
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

  function run() { try { scanLead(); hero(); } catch (e) { unhide(); } }
  if (document.readyState !== "loading") run();
  document.addEventListener("DOMContentLoaded", run);
  var n = 0, iv = setInterval(function () { run(); if (++n > 40) clearInterval(iv); }, 250);
  if (window.MutationObserver) {
    var t2; new MutationObserver(function () { clearTimeout(t2); t2 = setTimeout(run, 100); }).observe(document.body, { childList: true, subtree: true });
  }
})();
