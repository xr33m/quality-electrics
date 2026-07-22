// Shared HTML partials: nav, footer, head, icons. Plain template strings, no framework.

export function svgIcon(name, cls = "w-5 h-5") {
  const icons = {
    phone: `<svg xmlns="http://www.w3.org/2000/svg" class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a2.25 2.25 0 002.25-2.25v-1.372a1.5 1.5 0 00-1.223-1.474l-4.117-.823a1.5 1.5 0 00-1.478.44l-.97 1.028a11.25 11.25 0 01-5.976-5.976l1.028-.97a1.5 1.5 0 00.44-1.478l-.823-4.117A1.5 1.5 0 007.622 3H6.25A2.25 2.25 0 004 5.25v1.5z"/></svg>`,
    mail: `<svg xmlns="http://www.w3.org/2000/svg" class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0-.828.672-1.5 1.5-1.5h16.5c.828 0 1.5.672 1.5 1.5v10.5a1.5 1.5 0 01-1.5 1.5H3.75a1.5 1.5 0 01-1.5-1.5V6.75z"/><path stroke-linecap="round" stroke-linejoin="round" d="M3 7l9 6 9-6"/></svg>`,
    pin: `<svg xmlns="http://www.w3.org/2000/svg" class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>`,
    clock: `<svg xmlns="http://www.w3.org/2000/svg" class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2"/><circle cx="12" cy="12" r="9" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    check: `<svg xmlns="http://www.w3.org/2000/svg" class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>`,
    shield: `<svg xmlns="http://www.w3.org/2000/svg" class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3l7.5 3v5.25c0 5.056-3.214 8.63-7.5 9.75-4.286-1.12-7.5-4.694-7.5-9.75V6L12 3z"/></svg>`,
    bolt: `<svg xmlns="http://www.w3.org/2000/svg" class="${cls}" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h7l-1 8 11-14h-7l1-6z"/></svg>`,
    arrow: `<svg xmlns="http://www.w3.org/2000/svg" class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6-6m6 6l-6 6"/></svg>`,
    chevronDown: `<svg xmlns="http://www.w3.org/2000/svg" class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/></svg>`,
    menu: `<svg xmlns="http://www.w3.org/2000/svg" class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"/></svg>`,
    close: `<svg xmlns="http://www.w3.org/2000/svg" class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`,
    chevronLeft: `<svg xmlns="http://www.w3.org/2000/svg" class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/></svg>`,
    chevronRight: `<svg xmlns="http://www.w3.org/2000/svg" class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>`,
    instagram: `<svg xmlns="http://www.w3.org/2000/svg" class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none"/></svg>`,
  };
  return icons[name] || "";
}

export function googleLogo(size = 24) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"/>
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
    <path fill="#4CAF50" d="M24 44c5.4 0 10.3-2.1 14-5.5l-6.5-5.4C29.5 34.8 26.9 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.6 39.6 16.3 44 24 44z"/>
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.3-4.1 5.7l6.5 5.4C40.9 36.6 44 30.9 44 24c0-1.3-.1-2.7-.4-3.5z"/>
  </svg>`;
}

export function head({ title, description, path, business, extraHead = "" }) {
  const canonical = `https://${business.domain}/${path}`;
  return `<meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta name="google-site-verification" content="QlWm7CjHBiPn_ohGRVbyErRRtSsrLjOX2Yjat1lg21k" />
  <link rel="canonical" href="${canonical}" />
  <link rel="icon" type="image/svg+xml" href="/assets/img/favicon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap" />
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" media="print" onload="this.media='all'" />
  <noscript><link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" /></noscript>
  <link rel="stylesheet" href="/assets/css/style.css" />
  <script src="https://quality-electrics-chat-widget.adam-mcgowan.workers.dev/widget.js" defer></script>
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:type" content="website" />
  ${extraHead}`;
}

export function nav({ business, services, active = "" }) {
  const serviceLinks = services
    .map(
      (s) =>
        `<a href="/services/${s.slug}/" class="block px-4 py-2.5 text-sm text-cream/80 hover:bg-white/5 hover:text-brand-gold transition-colors">${s.name}</a>`
    )
    .join("\n");

  const navLink = (href, label, key) =>
    `<a href="${href}" class="text-sm font-medium tracking-wide transition-colors ${active === key ? "text-brand-gold" : "text-cream/85 hover:text-brand-gold"}">${label}</a>`;

  return `
  <div class="bg-ink text-cream/70 text-xs border-b border-white/10">
    <div class="section flex items-center justify-between py-2">
      <div class="flex items-center gap-2">
        ${svgIcon("shield", "w-3.5 h-3.5 text-brand-gold")}
        <span>NICEIC Registered &amp; Fully Insured &mdash; Glasgow &amp; Surrounding Areas</span>
      </div>
      <div class="hidden sm:flex items-center gap-5">
        <a href="mailto:${business.email}" class="hover:text-brand-gold transition-colors">${business.email}</a>
        <a href="${business.phoneHref}" class="hover:text-brand-gold transition-colors font-semibold">${business.phoneDisplay}</a>
      </div>
    </div>
  </div>
  <header class="sticky top-0 z-50 bg-ink/95 backdrop-blur border-b border-white/10">
    <div class="section flex items-center justify-between py-4">
      <a href="/" class="flex items-center gap-2.5 shrink-0">
        <img src="/assets/img/logo-mark.webp" alt="Quality Electrics logo" class="h-9 w-auto shrink-0" width="99" height="61" />
        <span class="font-display text-lg font-semibold text-cream leading-none">Quality<br/><span class="text-brand-gold">Electrics</span></span>
      </a>
      <nav class="hidden lg:flex items-center gap-8">
        ${navLink("/", "Home", "home")}
        <div class="relative group">
          <button class="flex items-center gap-1 text-sm font-medium tracking-wide cursor-pointer ${active === "services" ? "text-brand-gold" : "text-cream/85 group-hover:text-brand-gold"} transition-colors">
            Services ${svgIcon("chevronDown", "w-3.5 h-3.5")}
          </button>
          <div class="absolute left-0 top-full pt-3 w-72 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-150">
            <div class="rounded-sm border border-white/10 bg-ink shadow-2xl py-2">
              ${serviceLinks}
              <div class="border-t border-white/10 mt-1 pt-1">
                <a href="/services/" class="block px-4 py-2.5 text-sm font-semibold text-brand-gold hover:bg-white/5 transition-colors">View all services</a>
              </div>
            </div>
          </div>
        </div>
        ${navLink("/projects/", "Projects", "projects")}
        ${navLink("/blog/", "Blog", "blog")}
        ${navLink("/about/", "About", "about")}
        ${navLink("/contact/", "Contact", "contact")}
      </nav>
      <div class="hidden lg:flex items-center gap-3">
        <a href="${business.phoneHref}" class="btn-outline !py-2.5 !px-4 text-xs">${svgIcon("phone", "w-4 h-4")} Call Now</a>
        <a href="/contact/" class="btn-gold !py-2.5 !px-5 text-xs">Get a Free Quote</a>
      </div>
      <button id="menu-toggle" class="lg:hidden text-cream cursor-pointer" aria-label="Toggle menu" aria-expanded="false" aria-controls="mobile-menu">
        ${svgIcon("menu", "w-7 h-7")}
      </button>
    </div>
    <div id="mobile-menu" class="hidden lg:hidden border-t border-white/10 bg-ink">
      <div class="section py-4 flex flex-col gap-1">
        <a href="/" class="py-2.5 text-cream/85 hover:text-brand-gold transition-colors">Home</a>
        <a href="/services/" class="py-2.5 text-cream/85 hover:text-brand-gold transition-colors">Services</a>
        ${services.map((s) => `<a href="/services/${s.slug}/" class="py-2 pl-4 text-sm text-cream/60 hover:text-brand-gold transition-colors">${s.name}</a>`).join("\n")}
        <a href="/projects/" class="py-2.5 text-cream/85 hover:text-brand-gold transition-colors">Projects</a>
        <a href="/blog/" class="py-2.5 text-cream/85 hover:text-brand-gold transition-colors">Blog</a>
        <a href="/about/" class="py-2.5 text-cream/85 hover:text-brand-gold transition-colors">About</a>
        <a href="/contact/" class="py-2.5 text-cream/85 hover:text-brand-gold transition-colors">Contact</a>
        <a href="${business.phoneHref}" class="btn-gold mt-3 justify-center">${svgIcon("phone", "w-4 h-4")} Call ${business.phoneDisplay}</a>
      </div>
    </div>
  </header>`;
}

export function footer({ business, services, areas, reviews = [] }) {
  const year = new Date().getFullYear();
  return `
  <footer class="bg-ink text-cream/70 border-t border-white/10">
    <div class="section py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
      <div>
        <a href="/" class="flex items-center gap-2.5 mb-4">
          <img src="/assets/img/logo-mark.webp" alt="Quality Electrics logo" class="h-8 w-auto shrink-0" width="99" height="61" />
          <span class="font-display text-base font-semibold text-cream">Quality Electrics</span>
        </a>
        <p class="text-sm leading-relaxed">NICEIC registered electrical contractor based in Glasgow, covering the surrounding areas for domestic and commercial work.</p>
        <ul class="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <li><a href="/projects/" class="hover:text-brand-gold transition-colors">Projects</a></li>
          <li><a href="/reviews/" class="hover:text-brand-gold transition-colors">Reviews</a></li>
          <li><a href="/blog/" class="hover:text-brand-gold transition-colors">Blog</a></li>
          <li><a href="/about/" class="hover:text-brand-gold transition-colors">About</a></li>
        </ul>
      </div>
      <div>
        <h4 class="text-cream font-semibold text-sm uppercase tracking-wide mb-4">Services</h4>
        <ul class="space-y-2 text-sm">
          ${services.map((s) => `<li><a href="/services/${s.slug}/" class="hover:text-brand-gold transition-colors">${s.name}</a></li>`).join("\n")}
        </ul>
      </div>
      <div>
        <h4 class="text-cream font-semibold text-sm uppercase tracking-wide mb-4">Areas Covered</h4>
        <ul class="space-y-2 text-sm">
          ${areas.map((a) => `<li><a href="/areas/${a.slug}/" class="hover:text-brand-gold transition-colors">${a.name}</a></li>`).join("\n")}
        </ul>
      </div>
      <div>
        <h4 class="text-cream font-semibold text-sm uppercase tracking-wide mb-4">Get In Touch</h4>
        <ul class="space-y-3 text-sm">
          <li class="flex items-center gap-2">${svgIcon("phone", "w-4 h-4 text-brand-gold")} <a href="${business.phoneHref}" class="hover:text-brand-gold transition-colors">${business.phoneDisplay}</a></li>
          <li class="flex items-center gap-2">${svgIcon("mail", "w-4 h-4 text-brand-gold")} <a href="mailto:${business.email}" class="hover:text-brand-gold transition-colors break-all">${business.email}</a></li>
          <li class="flex items-center gap-2">${svgIcon("pin", "w-4 h-4 text-brand-gold")} Glasgow, Scotland</li>
          <li class="flex items-start gap-2">${svgIcon("clock", "w-4 h-4 text-brand-gold shrink-0 mt-0.5")} <span>${business.hoursLine}</span></li>
        </ul>
      </div>
    </div>
    <div class="border-t border-white/10">
      <div class="section py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/50">
        <p>&copy; ${year} Quality Electrics. All rights reserved.</p>
        <p>Glasgow &middot; Bearsden &middot; Giffnock &middot; East Kilbride &middot; Newton Mearns &middot; Milngavie &middot; Glasgow East End</p>
      </div>
    </div>
  </footer>
  <div class="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-ink border-t border-white/10 grid grid-cols-2 shadow-[0_-4px_16px_rgba(0,0,0,0.25)]">
    <a href="${business.phoneHref}" class="flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-cream border-r border-white/10">${svgIcon("phone", "w-4 h-4 text-brand-gold")} Call Now</a>
    <a href="/contact/" class="flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-ink bg-brand-gold">${svgIcon("bolt", "w-4 h-4")} Get a Free Quote</a>
  </div>
  <script src="/assets/js/main.js"></script>
  <script>window.QE_REVIEWS = ${JSON.stringify(
    reviews.map((r) => ({ author: r.author, rating: r.rating, dateLabel: r.dateLabel }))
  )};</script>
  <script src="/assets/js/review-popup.js" defer></script>
  <script src="/assets/js/contact-form.js" defer></script>
  <script>window.QE_CHAT_DATA = ${JSON.stringify({
    services: services.map((s) => s.name),
    areas: areas.map((a) => a.name),
    phoneDisplay: business.phoneDisplay,
    phoneHref: business.phoneHref,
  })};</script>
  <script src="/assets/js/chat-widget.js" defer></script>
  <script src="/assets/js/scroll-animations.js"></script>`;
}

export function ctaBand({ business, heading = "Need an Electrician You Can Trust?", sub = "Get a free, no-obligation quote today." }) {
  return `
  <section class="bg-brand-green">
    <div class="section py-14 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
      <div>
        <h2 class="text-2xl sm:text-3xl font-display font-semibold text-cream">${heading}</h2>
        <p class="text-cream/70 mt-2">${sub}</p>
      </div>
      <div class="flex flex-col sm:flex-row gap-3 shrink-0">
        <a href="${business.phoneHref}" class="btn-outline">${svgIcon("phone", "w-4 h-4")} ${business.phoneDisplay}</a>
        <a href="/contact/" class="btn-gold">Get a Free Quote</a>
      </div>
    </div>
  </section>`;
}

export function page({ title, description, path, business, services, areas, active, bodyContent, extraHead = "", reviews = [] }) {
  return `<!doctype html>
<html lang="en">
<head>
${head({ title, description, path, business, extraHead })}
</head>
<body class="bg-ink pb-16 lg:pb-0">
${nav({ business, services, active })}
<main>
${bodyContent}
</main>
${footer({ business, services, areas, reviews })}
</body>
</html>
`;
}
