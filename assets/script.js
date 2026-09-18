/* ============================================================
   TOUCA DIGITAL BUSINESS CARD — RENDERER
   You shouldn't need to edit this file to create a new client
   card — edit assets/config.js instead. This file just reads
   that config and draws the page / wires up the buttons.

   BILINGUAL CONTENT: any text field in config.js can be either
   a plain string (used for every language) or an object like
   { en: "Save Contact", fr: "Enregistrer le contact" }.
   ============================================================ */

(function () {
  const cfg = window.CARD_CONFIG;

  // ---- Icon set (inline SVG, no external dependency) ----------
  const ICONS = {
    connect: '<svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-10-9.3C.5 8.4 2.2 5 5.6 5c2 0 3.3 1 4.4 2.4C11.1 6 12.4 5 14.4 5c3.4 0 5.1 3.4 3.6 6.7C15.5 16.4 12 21 12 21z"/></svg>',
    mail: '<svg viewBox="0 0 24 24"><path d="M2 5h20v14H2V5zm2 2v.01L12 13l8-5.99V7l-8 6-8-6zm0 3.2V17h16V10.2l-8 6-8-6z"/></svg>',
    phone: '<svg viewBox="0 0 24 24"><path d="M6.6 10.8c1.3 2.6 3.4 4.7 6 6l2-2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.8c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.3 1l-2.1 2.3z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24"><path d="M17 14.2c-.3-.1-1.6-.8-1.9-.9-.3-.1-.4-.1-.6.1s-.7.9-.8 1-.3.2-.6.1c-1.6-.8-2.6-1.4-3.7-3.2-.3-.5.3-.4.8-1.4.1-.2 0-.4 0-.5-.1-.1-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.9 4.2 2.9 1.1 2.9.7 3.4.7.5 0 1.7-.7 1.9-1.3.2-.6.2-1.2.2-1.3-.1-.1-.2-.2-.5-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z"/></svg>',
    google: '<svg viewBox="0 0 24 24"><path d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.9h5.4c-.2 1.2-1 2.3-2 3v2.5h3.3c1.9-1.8 3-4.4 3-7.4z"/><path d="M12 22c2.7 0 5-.9 6.7-2.4l-3.3-2.5c-.9.6-2 .9-3.4.9-2.6 0-4.8-1.7-5.6-4.1H3v2.6A10 10 0 0 0 12 22z"/><path d="M6.4 13.9a6 6 0 0 1 0-3.8V7.5H3a10 10 0 0 0 0 9l3.4-2.6z"/><path d="M12 6.1c1.5 0 2.8.5 3.8 1.5l2.8-2.8A9.6 9.6 0 0 0 12 2a10 10 0 0 0-9 5.5l3.4 2.6C7.2 7.8 9.4 6.1 12 6.1z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24"><path d="M13.5 21v-7.6h2.6l.4-3h-3V8.4c0-.9.2-1.5 1.5-1.5h1.6V4.2C15.9 4.1 15 4 13.9 4c-2.3 0-3.9 1.4-3.9 4v2.4H7.4v3H10V21h3.5z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24"><path d="M12 2c2.7 0 3 0 4.1.1 1.1 0 1.8.2 2.4.5.7.2 1.2.6 1.7 1.1.5.5.9 1 1.1 1.7.3.6.5 1.3.5 2.4.1 1.1.1 1.4.1 4.1s0 3-.1 4.1c0 1.1-.2 1.8-.5 2.4-.2.7-.6 1.2-1.1 1.7-.5.5-1 .9-1.7 1.1-.6.3-1.3.5-2.4.5-1.1.1-1.4.1-4.1.1s-3 0-4.1-.1c-1.1 0-1.8-.2-2.4-.5-.7-.2-1.2-.6-1.7-1.1-.5-.5-.9-1-1.1-1.7-.3-.6-.5-1.3-.5-2.4C2 15 2 14.7 2 12s0-3 .1-4.1c0-1.1.2-1.8.5-2.4.2-.7.6-1.2 1.1-1.7.5-.5 1-.9 1.7-1.1.6-.3 1.3-.5 2.4-.5C9 2 9.3 2 12 2zm0 1.8c-2.7 0-3 0-4 .1-.9 0-1.4.2-1.7.3-.4.2-.7.3-1 .6-.3.3-.5.6-.6 1-.1.3-.3.8-.3 1.7-.1 1-.1 1.3-.1 4s0 3 .1 4c0 .9.2 1.4.3 1.7.2.4.3.7.6 1 .3.3.6.5 1 .6.3.1.8.3 1.7.3 1 .1 1.3.1 4 .1s3 0 4-.1c.9 0 1.4-.2 1.7-.3.4-.2.7-.3 1-.6.3-.3.5-.6.6-1 .1-.3.3-.8.3-1.7.1-1 .1-1.3.1-4s0-3-.1-4c0-.9-.2-1.4-.3-1.7-.2-.4-.3-.7-.6-1-.3-.3-.6-.5-1-.6-.3-.1-.8-.3-1.7-.3-1-.1-1.3-.1-4-.1zm0 3.5a4.7 4.7 0 1 1 0 9.4 4.7 4.7 0 0 1 0-9.4zm0 1.8a2.9 2.9 0 1 0 0 5.8 2.9 2.9 0 0 0 0-5.8zm5-2a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zm7 0h3.8v1.7h.1c.5-.9 1.8-1.9 3.7-1.9 4 0 4.7 2.6 4.7 6V21H18v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21h-4z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24"><path d="M14 2h3c.1 1.7 1.5 3.2 3.3 3.4V8.4c-1.2 0-2.4-.4-3.3-1v6.9c0 3.3-2.7 5.7-5.8 5.7A5.8 5.8 0 0 1 5.5 13c0-3 2.5-5.6 5.7-5.6.4 0 .7 0 1 .1v3.1c-.3-.1-.6-.2-1-.2-1.4 0-2.6 1.1-2.6 2.6 0 1.4 1.1 2.6 2.6 2.6 1.4 0 2.7-1.1 2.7-2.6V2z"/></svg>',
    twitter: '<svg viewBox="0 0 24 24"><path d="M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.4 4.6a4 4 0 0 0 1.3 5.5c-.6 0-1.3-.2-1.8-.5v.1c0 2 1.4 3.7 3.3 4a4.2 4.2 0 0 1-1.8.1 4.1 4.1 0 0 0 3.9 2.9A8.3 8.3 0 0 1 2 18.4a11.6 11.6 0 0 0 6.3 1.8c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.1z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24"><path d="M22 12s0-3.2-.4-4.7c-.2-.9-.9-1.6-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.5c-.9.2-1.6.9-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.7c.2.9.9 1.6 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.5c.9-.2 1.6-.9 1.8-1.8.4-1.5.4-4.7.4-4.7zM10 15V9l5.2 3-5.2 3z"/></svg>',
    website: '<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.9 8h-3a15 15 0 0 0-1.3-5.1A8 8 0 0 1 18.9 10zM12 4c.8 1 1.7 2.9 2 6h-4c.3-3.1 1.2-5 2-6zM4.3 14a8 8 0 0 1 0-4h3.3a17 17 0 0 0 0 4H4.3zm.8 2h3a15 15 0 0 0 1.3 5.1A8 8 0 0 1 5.1 16zM8.1 8H5.1a8 8 0 0 1 4.3-3.1A15 15 0 0 0 8.1 8zM12 20c-.8-1-1.7-2.9-2-6h4c-.3 3.1-1.2 5-2 6zm2.3-8H9.7a13 13 0 0 1 0-4h4.6a13 13 0 0 1 0 4zm.6 7.1A15 15 0 0 0 16.2 14h3a8 8 0 0 1-4.3 5.1zM16.7 10a17 17 0 0 0 0-4h3.3a8 8 0 0 1 0 4h-3.3z"/></svg>',
    location: '<svg viewBox="0 0 24 24"><path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/></svg>',
    vcard: '<svg viewBox="0 0 24 24"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>',
    share: '<svg viewBox="0 0 24 24"><path d="M18 16.1c-.8 0-1.4.3-2 .7l-6.1-3.6c.1-.3.1-.6 0-.9L16 8.7c.5.4 1.2.7 2 .7a3 3 0 1 0-3-3c0 .3 0 .6.1.9l-6.1 3.6a3 3 0 1 0 0 4.3l6.1 3.6c0 .3-.1.6-.1.9a3 3 0 1 0 3-2.6z"/></svg>',
    qrcode: '<svg viewBox="0 0 24 24"><path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm10 0h2v2h-2zm4 0h2v2h-2zm-4 4h2v2h-2zm4 0h2v2h-2zm-2-2h2v2h-2z"/></svg>',
    link: '<svg viewBox="0 0 24 24"><path d="M3.9 12a4 4 0 0 1 4-4h3v1.6H8a2.4 2.4 0 1 0 0 4.8h3V16H7.9a4 4 0 0 1-4-4zm6-.8h4.2v1.6H9.9v-1.6zM13 8h3a4 4 0 1 1 0 8h-3v-1.6h3a2.4 2.4 0 1 0 0-4.8h-3V8z"/></svg>',
  };

  const iconSvg = (key) => ICONS[key] || ICONS.link;
  const initials = (name) =>
    (name || "").trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() || "").join("");

  // ---- Non-content chrome strings (not set per-card in config.js) ----
  const UI = {
    scanCaption: { en: "Scan to open this card", fr: "Scannez pour ouvrir cette carte" },
    close: { en: "Close", fr: "Fermer" },
  };

  // ============================================================
  // LANGUAGE
  // ============================================================
  const availableLangs = ["en", "fr"];
  let currentLang = (cfg.language && cfg.language.default) || "en";
  try {
    const saved = localStorage.getItem("touca_card_lang");
    if (saved && availableLangs.includes(saved)) currentLang = saved;
  } catch (e) {
    /* private-mode / storage blocked — fall back to config default */
  }

  // Resolves a config value that may be a plain string or {en,fr}.
  function t(value) {
    if (value == null) return "";
    if (typeof value === "string") return value;
    if (typeof value === "object") return value[currentLang] || value.en || Object.values(value)[0] || "";
    return String(value);
  }

  function setLang(lang) {
    if (!availableLangs.includes(lang) || lang === currentLang) return;
    currentLang = lang;
    try {
      localStorage.setItem("touca_card_lang", lang);
    } catch (e) {
      /* ignore — language just won't persist across visits */
    }
    renderContent();
  }

  function renderLangToggle() {
    const wrap = document.getElementById("langToggle");
    if (!cfg.language || cfg.language.showSwitcher === false) {
      wrap.remove();
      return;
    }
    wrap.innerHTML = "";
    availableLangs.forEach((lang) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = lang.toUpperCase();
      if (lang === currentLang) btn.classList.add("is-active");
      btn.addEventListener("click", () => setLang(lang));
      wrap.appendChild(btn);
    });
  }

  // ---- Apply theme colors (one-time) -----------------------------
  document.documentElement.style.setProperty("--accent", cfg.theme.accentColor);
  document.documentElement.style.setProperty("--dark", cfg.theme.darkColor);

  // ---- Cover + avatar (one-time) -----------------------------------
  // Images are loaded off-screen first so a missing/renamed file
  // falls back to the placeholder instead of rendering blank.
  const coverEl = document.getElementById("cover");
  if (cfg.profile.coverImage) {
    const coverImg = new Image();
    coverImg.onload = () => {
      coverEl.style.backgroundImage = `url('${cfg.profile.coverImage}')`;
    };
    coverImg.src = cfg.profile.coverImage;
  }

  const avatarEl = document.getElementById("avatar");
  avatarEl.textContent = initials(cfg.profile.name);
  if (cfg.profile.avatarImage) {
    const avatarImg = new Image();
    avatarImg.onload = () => {
      avatarEl.style.backgroundImage = `url('${cfg.profile.avatarImage}')`;
      avatarEl.style.backgroundColor = "transparent";
      avatarEl.textContent = "";
    };
    avatarImg.src = cfg.profile.avatarImage;
  }

  document.getElementById("shareBtn").innerHTML = iconSvg("share");
  document.getElementById("qrBtn").innerHTML = iconSvg("qrcode");

  // ============================================================
  // SAVE TO PHONE CONTACTS (vCard) — works as a native "Add
  // Contact" flow on iOS Safari and as a rich contact file with
  // photo on Android / desktop.
  // ============================================================
  function isIOS() {
    return (
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
    );
  }

  // vCard 3.0 requires long lines to be "folded" (wrapped with a
  // leading space) — matters most for the base64 PHOTO line.
  function foldVcardLine(line) {
    if (line.length <= 75) return line;
    let out = line.slice(0, 75);
    let rest = line.slice(75);
    while (rest.length > 0) {
      out += "\r\n " + rest.slice(0, 74);
      rest = rest.slice(74);
    }
    return out;
  }

  async function getAvatarPhotoField() {
    if (!cfg.profile.avatarImage) return "";
    try {
      const res = await fetch(cfg.profile.avatarImage);
      if (!res.ok) return "";
      const blob = await res.blob();
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
      const match = /^data:image\/(\w+);base64,(.*)$/.exec(dataUrl || "");
      if (!match) return "";
      const type = match[1].toUpperCase() === "JPG" ? "JPEG" : match[1].toUpperCase();
      return foldVcardLine(`PHOTO;ENCODING=b;TYPE=${type}:${match[2]}`);
    } catch (e) {
      return ""; // no CORS / offline / missing file — just skip the photo
    }
  }

  async function buildVcf() {
    const name = cfg.profile.name || "";
    const [first, ...rest] = name.split(" ");
    const last = rest.join(" ");
    const photoLine = await getAvatarPhotoField();

    const lines = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `N:${last};${first};;;`,
      `FN:${name}`,
      cfg.profile.title ? `TITLE:${t(cfg.profile.title)}` : "",
      cfg.contact?.company ? `ORG:${cfg.contact.company}` : "",
      cfg.contact?.phone ? `TEL;TYPE=CELL,VOICE:${cfg.contact.phone}` : "",
      cfg.contact?.email ? `EMAIL;TYPE=INTERNET:${cfg.contact.email}` : "",
      cfg.website?.url ? `URL:${cfg.website.url}` : "",
      cfg.highlight?.text ? `NOTE:${t(cfg.highlight.text).replace(/\n/g, " ")}` : "",
      photoLine,
      "END:VCARD",
    ].filter(Boolean);

    return lines.join("\r\n");
  }

  async function saveContact() {
    const vcf = await buildVcf();
    const blob = new Blob([vcf], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const filename = `${(cfg.profile.name || "contact").replace(/\s+/g, "_")}.vcf`;

    const a = document.createElement("a");
    a.href = url;

    if (isIOS()) {
      // No `download` attribute: iOS Safari recognizes the vCard
      // mime type and opens its native "Add Contact" preview
      // instead of just saving a file to Files.
      a.target = "_blank";
      a.rel = "noopener";
    } else {
      // Android / desktop: downloads the .vcf; tapping the
      // downloaded file opens it straight into Contacts.
      a.download = filename;
    }

    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  }

  function renderLinkItem(link) {
    const isButton = link.type === "vcard" || !link.url;
    const el = document.createElement(isButton ? "button" : "a");
    el.className = "link-item" + (link.accent ? " is-accent" : "");
    el.innerHTML = `<span class="icon-circle">${iconSvg(link.icon)}</span><span class="label">${t(link.label)}</span>`;
    if (isButton) {
      el.type = "button";
      el.addEventListener("click", saveContact);
    } else {
      el.href = link.url;
      if (/^https?:\/\//.test(link.url)) {
        el.target = "_blank";
        el.rel = "noopener";
      }
    }
    return el;
  }

  // ============================================================
  // CONTENT RENDER — everything language-dependent lives here so
  // it can be redrawn instantly when the visitor switches EN/FR.
  // ============================================================
  function renderContent() {
    renderLangToggle();

    // Identity
    document.getElementById("name").textContent = t(cfg.profile.name);
    document.getElementById("title").textContent = t(cfg.profile.title);

    // Highlight box
    const highlightEl = document.getElementById("highlight");
    if (cfg.highlight) {
      highlightEl.style.display = "";
      highlightEl.innerHTML = `
        <div class="highlight-label"><span>${cfg.highlight.icon || ""}</span><span>${t(cfg.highlight.label)}</span></div>
        <p class="highlight-text">${t(cfg.highlight.text)}</p>`;
    } else {
      highlightEl.style.display = "none";
    }

    // Links grid
    const linksGrid = document.getElementById("linksGrid");
    linksGrid.innerHTML = "";
    (cfg.links || []).forEach((link) => linksGrid.appendChild(renderLinkItem(link)));

    // Website button
    const websiteWrap = document.getElementById("websiteWrap");
    websiteWrap.innerHTML = "";
    if (cfg.website?.show && cfg.website.url) {
      websiteWrap.style.display = "";
      const a = document.createElement("a");
      a.className = "website-btn";
      a.href = cfg.website.url;
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = t(cfg.website.label) || "View website";
      websiteWrap.appendChild(a);
    } else {
      websiteWrap.style.display = "none";
    }

    // About
    const aboutEl = document.getElementById("about");
    if (cfg.about?.show) {
      aboutEl.style.display = "";
      const paras = (cfg.about.paragraphs || []).map((p) => `<p>${t(p)}</p>`).join("");
      aboutEl.innerHTML = `<h2>${t(cfg.about.heading) || "About"}</h2>${paras}`;
    } else {
      aboutEl.style.display = "none";
    }

    // Extra free-form sections
    const extraEl = document.getElementById("extraSections");
    extraEl.innerHTML = "";
    if ((cfg.sections || []).length) {
      extraEl.style.display = "";
      cfg.sections.forEach((section) => {
        const block = document.createElement("div");
        block.className = "section-block";

        if (section.type === "text") {
          const paras = (section.paragraphs || []).map((p) => `<p>${t(p)}</p>`).join("");
          block.innerHTML = `${section.heading ? `<h2>${t(section.heading)}</h2>` : ""}${paras}`;
        } else if (section.type === "image") {
          block.innerHTML = `<figure><img src="${section.src}" alt="${t(section.caption) || ""}" />${
            section.caption ? `<figcaption>${t(section.caption)}</figcaption>` : ""
          }</figure>`;
        } else if (section.type === "links") {
          const grid = document.createElement("div");
          grid.className = "links-grid";
          (section.items || []).forEach((item) => grid.appendChild(renderLinkItem(item)));
          block.innerHTML = section.heading ? `<h2>${t(section.heading)}</h2>` : "";
          block.appendChild(grid);
        } else if (section.type === "button") {
          block.innerHTML = `<a class="section-button" href="${section.url}" target="_blank" rel="noopener">${t(section.label)}</a>`;
        }

        extraEl.appendChild(block);
      });
    } else {
      extraEl.style.display = "none";
    }

    // Powered-by-Touca footer
    const footerEl = document.getElementById("brandFooter");
    if (cfg.brand?.showFooter !== false) {
      footerEl.style.display = "";
      const brandName = cfg.brand?.name || "Touca";
      const tagline = t(cfg.brand?.tagline) || "Tap To Connect";
      const brandUrl = cfg.brand?.url || "https://touca.app";
      const brandIcon = cfg.brand?.icon || "assets/brand/icon.svg";
      footerEl.innerHTML = `<a href="${brandUrl}" target="_blank" rel="noopener"><img src="${brandIcon}" alt="" />${brandName} · ${tagline}</a>`;
    } else {
      footerEl.style.display = "none";
    }

    // Sticky CTA
    const ctaBtn = document.getElementById("ctaBtn");
    ctaBtn.innerHTML = `${iconSvg("vcard")}<span>${t(cfg.cta?.label) || "Save Contact"}</span>`;
  }

  // ---- One-time event wiring ----------------------------------------
  document.getElementById("ctaBtn").addEventListener("click", saveContact);

  document.getElementById("shareBtn").addEventListener("click", async () => {
    const url = cfg.share?.url || window.location.href;
    const text = (t(cfg.share?.text) || "Check out {name}'s Touca digital business card:").replace(
      "{name}",
      t(cfg.profile.name)
    );
    if (navigator.share) {
      try {
        await navigator.share({ title: t(cfg.profile.name), text, url });
      } catch (e) {
        /* user cancelled share — nothing to do */
      }
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`, "_blank");
    }
  });

  const qrModal = document.getElementById("qrModal");
  const qrImage = document.getElementById("qrImage");
  const qrCaption = document.getElementById("qrCaption");

  document.getElementById("qrBtn").addEventListener("click", () => {
    const url = cfg.share?.url || window.location.href;
    qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(url)}`;
    qrCaption.textContent = t(UI.scanCaption);
    qrModal.hidden = false;
  });

  document.getElementById("qrClose").addEventListener("click", () => (qrModal.hidden = true));
  qrModal.addEventListener("click", (e) => {
    if (e.target === qrModal) qrModal.hidden = true;
  });

  renderContent();
})();
