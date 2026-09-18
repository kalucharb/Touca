/* ============================================================
   TOUCA DIGITAL BUSINESS CARD — CONFIG
   ============================================================
   This is the ONLY file you need to edit to create a new card
   for a client. Do not touch index.html / style.css / script.js
   unless you want to change the actual design.

   HOW TO REUSE THIS TEMPLATE FOR A NEW CLIENT
   1. Duplicate this whole project folder, one copy per client.
   2. Change the text fields below (name, title, about, etc).
   3. Replace the images in assets/images/ (or point coverImage /
      avatarImage at your own image URLs) and update the paths.
   4. Edit the "links" array to rename, add, or delete buttons —
      each object is one round icon button. Copy/paste an object
      to add a new one, delete an object to remove one.
   5. Optional: add extra free-form blocks (a gallery image, a
      paragraph, another row of buttons) in the "sections" array
      at the bottom — add or delete objects there too.
   6. Optional: change theme.accentColor / theme.darkColor to
      re-skin the whole card in the client's own brand colors
      instead of Touca green.

   BILINGUAL TEXT (English / French)
   Any text field below can be either a plain string (shown in
   every language) or an object with both languages, e.g.:
       label: { en: "Save Contact", fr: "Enregistrer le contact" }
   A small EN / FR switcher appears on the card automatically
   whenever "language" below is present.

   AVAILABLE ICON KEYS for any "icon" field below:
   connect, mail, phone, whatsapp, google, facebook, instagram,
   linkedin, tiktok, twitter, youtube, website, location, vcard,
   share, qrcode, link (generic fallback used for unknown keys)
   ============================================================ */

window.CARD_CONFIG = {

  // ---- Language switcher --------------------------------------
  language: {
    default: "en",       // "en" or "fr" — language shown on first visit
    showSwitcher: true,  // set to false to hide the EN/FR toggle
  },

  // ---- Brand colors -----------------------------------------
  // Defaults are Touca's own palette (green / deep green).
  // Change these two values to re-skin a card for a client's brand.
  theme: {
    accentColor: "#2cb45f",   // buttons, links, title color — Touca green
    darkColor:   "#004d3d",   // icon circles, sticky CTA bar — Touca deep green
  },

  // ---- Photo + name + job title -------------------------------
  profile: {
    name: "Client Name",
    title: { en: "Job Title, Company", fr: "Poste, Entreprise" },

    // Leave either path empty ("") to fall back to a clean
    // placeholder (initials avatar / plain gradient cover) instead
    // of a broken image. Drop client photos into assets/images/.
    coverImage:  "assets/images/cover.jpg",
    avatarImage: "assets/images/avatar.jpg",
  },

  // ---- Small callout box under the name (icon + label + text) --
  highlight: {
    icon: "💼",
    label: { en: "Experience", fr: "Expérience" },
    text: "A short one- or two-line tagline about the client or their business goes here.",
  },

  // ---- Used by the Save Contact button (also embedded in the vCard) ----
  contact: {
    phone: "+27 00 000 0000",
    email: "client@example.com",
    company: "Client Company",              // optional, appears as ORG in the saved contact
    whatsapp: "https://wa.me/270000000000", // digits only, no +/spaces after wa.me/
  },

  // ---- Round icon buttons grid -----------------------------------
  // Add a new button: copy an object below and paste it in the array.
  // Delete a button: delete its object from the array.
  // type "vcard" triggers the built-in Save Contact action instead of a url.
  // Tapping it saves a real contact card to the phone — a native
  // "Add Contact" prompt on iOS, a contact file that opens straight
  // into Contacts on Android — including photo, phone, email,
  // company and website, so it feels like Touca "installed" a
  // contact rather than just downloading a file.
  links: [
    { icon: "connect",   label: { en: "Connect", fr: "Connecter" }, type: "vcard" },
    { icon: "mail",      label: { en: "Email", fr: "E-mail" },      url: "mailto:client@example.com" },
    { icon: "phone",     label: { en: "Call", fr: "Appeler" },      url: "tel:+270000000000" },
    { icon: "google",    label: "Google",    url: "https://google.com" },
    { icon: "facebook",  label: "Facebook",  url: "https://facebook.com/yourpage" },
    { icon: "instagram", label: "Instagram", url: "https://instagram.com/yourpage" },
    { icon: "linkedin",  label: "LinkedIn",  url: "https://linkedin.com/in/yourprofile" },
    { icon: "whatsapp",  label: "WhatsApp",  url: "https://wa.me/270000000000" },
  ],

  // ---- Optional single "View website" button ----------------------
  website: {
    show: true,
    label: { en: "View website", fr: "Voir le site" },
    url: "https://example.com",
  },

  // ---- About section ------------------------------------------------
  about: {
    show: true,
    heading: { en: "About", fr: "À propos" },
    paragraphs: [
      { en: "First paragraph — who the client is, what they do.", fr: "Premier paragraphe — qui est le client, ce qu'il fait." },
      { en: "Second paragraph — achievements, awards, extra detail.", fr: "Deuxième paragraphe — réalisations, distinctions, détails supplémentaires." },
    ],
  },

  // ---- Extra free-form sections (optional) ---------------------------
  // Add or delete objects to add/remove whole blocks of content.
  // Supported "type" values:
  //   "text"   -> { type:"text", heading, paragraphs:[...] }
  //   "image"  -> { type:"image", src, caption }
  //   "links"  -> { type:"links", heading, items:[{icon,label,url}] }
  //   "button" -> { type:"button", label, url }
  sections: [
    // Example (uncomment and edit to use):
    // { type: "text", heading: "Services", paragraphs: ["Describe a service here."] },
    // { type: "image", src: "assets/images/gallery1.jpg", caption: "Our team" },
    // { type: "links", heading: "More", items: [
    //     { icon: "youtube", label: "YouTube", url: "https://youtube.com/@yourchannel" }
    //   ]
    // },
    // { type: "button", label: "Book a meeting", url: "https://calendly.com/you" },
  ],

  // ---- Sticky bottom button -------------------------------------------
  cta: {
    label: { en: "Save Contact", fr: "Enregistrer le contact" },
  },

  // ---- Share button + QR code -------------------------------------------
  share: {
    // {name} is replaced automatically with profile.name
    text: { en: "Check out {name}'s Touca digital business card:", fr: "Découvrez la carte de visite numérique Touca de {name} :" },
    // Leave empty to auto-use the page's own URL.
    url: "",
  },

  // ---- "Powered by Touca" footer badge ---------------------------------
  // Set showFooter to false to hide it for a white-label client card.
  brand: {
    showFooter: true,
    name: "Touca",
    tagline: { en: "Tap To Connect", fr: "Appuyez pour vous connecter" },
    url: "https://touca.app",
    icon: "assets/brand/icon.svg",
  },
};
