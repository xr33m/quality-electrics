import { svgIcon, ctaBand } from "./partials.mjs";

function statBar(stats) {
  return `
  <div class="border-t border-white/10 bg-ink/60">
    <div class="section grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
      ${stats
        .map(
          (s) => `
      <div class="text-center py-6 px-2">
        <div class="text-2xl sm:text-3xl font-display font-semibold text-brand-gold">${s.value}</div>
        <div class="text-xs uppercase tracking-wide text-cream/60 mt-1">${s.label}</div>
      </div>`
        )
        .join("\n")}
    </div>
  </div>`;
}

function guaranteesStrip(business) {
  return `
  <div class="bg-brand-green-dark border-y border-white/10">
    <div class="section py-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
      ${business.guarantees
        .map(
          (g) => `<div class="flex items-center gap-2 text-cream/90 text-sm">${svgIcon("check", "w-4 h-4 text-brand-gold")} ${g}</div>`
        )
        .join("\n")}
    </div>
  </div>`;
}

export function homeTemplate({ business, services, areas }) {
  const featured = services.slice(0, 6);
  return `
  <section class="relative bg-ink overflow-hidden">
    <div class="absolute inset-0">
      <img src="/assets/img/van.jpg" alt="Quality Electrics branded van parked in Glasgow city centre" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/50"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/40 to-transparent"></div>
    </div>
    <div class="relative section pt-16 pb-14 sm:pt-24 sm:pb-16">
      <div class="max-w-2xl">
        <span class="eyebrow">NICEIC Registered &middot; Glasgow &amp; Surrounding Areas</span>
        <h1 class="mt-5 text-4xl sm:text-5xl lg:text-6xl font-display font-semibold leading-[1.05] text-cream">
          Powering Glasgow's<br/>
          <span class="text-brand-gold">Homes &amp; Businesses</span>
        </h1>
        <p class="mt-6 text-cream/70 text-base sm:text-lg leading-relaxed max-w-xl">
          Rewiring, EV chargers, inspection &amp; testing, and consumer unit upgrades for homeowners, landlords, and commercial properties across Glasgow &mdash; done right, first time.
        </p>
        <div class="mt-8 flex flex-col sm:flex-row gap-4">
          <a href="/contact/" class="btn-gold">${svgIcon("bolt", "w-4 h-4")} Get a Free Quote</a>
          <a href="${business.phoneHref}" class="btn-outline">${svgIcon("phone", "w-4 h-4")} ${business.phoneDisplay}</a>
        </div>
      </div>
    </div>
    ${statBar(business.heroStats)}
  </section>

  ${guaranteesStrip(business)}

  <section class="py-20 sm:py-28">
    <div class="section">
      <div class="max-w-2xl">
        <span class="eyebrow">What We Do</span>
        <h2 class="mt-3 text-3xl sm:text-4xl font-display font-semibold text-ink">Electrical Services Built Around Your Property</h2>
        <p class="mt-4 text-ink/60 leading-relaxed">From a single rewired socket to a full commercial fit-out, every job is quoted clearly and certified on completion.</p>
      </div>
      <div class="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${featured
          .map(
            (s) => `
        <a href="/services/${s.slug}/" class="group block rounded-sm overflow-hidden border border-ink/10 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
          <div class="aspect-[4/3] overflow-hidden">
            <img src="/${s.image}" alt="${s.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          </div>
          <div class="p-6">
            <h3 class="font-display font-semibold text-lg text-ink group-hover:text-brand-green transition-colors">${s.name}</h3>
            <p class="mt-2 text-sm text-ink/60 leading-relaxed">${s.shortDesc}</p>
            <span class="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-green">Learn more ${svgIcon("arrow", "w-4 h-4")}</span>
          </div>
        </a>`
          )
          .join("\n")}
      </div>
      <div class="mt-10 text-center">
        <a href="/services/" class="btn-green">View All Services ${svgIcon("arrow", "w-4 h-4")}</a>
      </div>
    </div>
  </section>

  <section class="py-20 sm:py-28 bg-ink">
    <div class="section grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
      <div>
        <span class="eyebrow">Who We Work With</span>
        <h2 class="mt-3 text-3xl sm:text-4xl font-display font-semibold text-cream">Trusted By Homeowners, Landlords &amp; Developers</h2>
        <p class="mt-4 text-cream/60 leading-relaxed">Whether it's a quick call-out, an ongoing maintenance contract, or a 2&ndash;4 week project, we scope the job properly before we start.</p>
        <ul class="mt-8 grid grid-cols-2 gap-4">
          ${business.targetCustomers
            .map(
              (c) => `<li class="flex items-center gap-2.5 text-cream/85 text-sm"><span class="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0"></span>${c}</li>`
            )
            .join("\n")}
        </ul>
      </div>
      <div class="rounded-sm border border-white/10 bg-white/5 p-8">
        <h3 class="font-display text-xl font-semibold text-cream mb-6">Typical Job Types</h3>
        <ul class="space-y-4">
          ${business.jobTypes
            .map(
              (j) => `
          <li class="flex items-start gap-3">
            ${svgIcon("check", "w-5 h-5 text-brand-gold shrink-0 mt-0.5")}
            <span class="text-cream/80 text-sm">${j}</span>
          </li>`
            )
            .join("\n")}
        </ul>
        <div class="mt-8 pt-6 border-t border-white/10">
          <p class="text-xs uppercase tracking-wide text-cream/50 mb-3">Guide Pricing (excl. VAT)</p>
          <ul class="space-y-2">
            ${business.pricing
              .map(
                (p) => `<li class="flex items-center justify-between text-sm"><span class="text-cream/70">${p.item}</span><span class="text-brand-gold font-semibold">${p.price}</span></li>`
              )
              .join("\n")}
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section class="py-20 sm:py-28">
    <div class="section">
      <div class="max-w-2xl">
        <span class="eyebrow">Where We Work</span>
        <h2 class="mt-3 text-3xl sm:text-4xl font-display font-semibold text-ink">Covering Glasgow &amp; the Surrounding Areas</h2>
        <p class="mt-4 text-ink/60 leading-relaxed">Based in Glasgow and on the road across the following areas &mdash; click yours for local call-out details.</p>
      </div>
      <div class="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        ${areas
          .map(
            (a) => `
        <a href="/areas/${a.slug}/" class="group flex items-center justify-between rounded-sm border border-ink/10 bg-white px-5 py-4 hover:border-brand-green transition-colors">
          <span class="font-medium text-ink group-hover:text-brand-green transition-colors">${a.name}</span>
          ${svgIcon("arrow", "w-4 h-4 text-ink/30 group-hover:text-brand-green transition-colors")}
        </a>`
          )
          .join("\n")}
      </div>
    </div>
  </section>

  ${ctaBand({ business })}
  `;
}

export function servicesHubTemplate({ business, services }) {
  return `
  <section class="bg-ink py-16 sm:py-20">
    <div class="section text-center max-w-2xl mx-auto">
      <span class="eyebrow">Our Services</span>
      <h1 class="mt-3 text-4xl sm:text-5xl font-display font-semibold text-cream">Electrical Services in Glasgow</h1>
      <p class="mt-4 text-cream/60 leading-relaxed">NICEIC registered work for homes, landlords, and commercial properties &mdash; fully insured, certified on completion.</p>
    </div>
  </section>
  <section class="py-16 sm:py-24">
    <div class="section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      ${services
        .map(
          (s) => `
      <a href="/services/${s.slug}/" class="group block rounded-sm overflow-hidden border border-ink/10 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
        <div class="aspect-[4/3] overflow-hidden">
          <img src="/${s.image}" alt="${s.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div class="p-6">
          <h2 class="font-display font-semibold text-lg text-ink group-hover:text-brand-green transition-colors">${s.name}</h2>
          <p class="mt-2 text-sm text-ink/60 leading-relaxed">${s.shortDesc}</p>
          <span class="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-green">Learn more ${svgIcon("arrow", "w-4 h-4")}</span>
        </div>
      </a>`
        )
        .join("\n")}
    </div>
  </section>
  ${ctaBand({ business })}
  `;
}

export function serviceTemplate({ business, service, areas }) {
  return `
  <section class="relative bg-ink overflow-hidden">
    <div class="absolute inset-0">
      <img src="/${service.image}" alt="${service.name}" class="w-full h-full object-cover opacity-30" />
      <div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/90 to-ink/70"></div>
    </div>
    <div class="relative section py-16 sm:py-24 max-w-2xl">
      <a href="/services/" class="text-xs uppercase tracking-wide text-cream/50 hover:text-brand-gold transition-colors">&larr; All Services</a>
      <h1 class="mt-4 text-4xl sm:text-5xl font-display font-semibold text-cream">${service.name}</h1>
      <p class="mt-5 text-cream/70 leading-relaxed">${service.intro}</p>
      <div class="mt-8 flex flex-col sm:flex-row gap-4">
        <a href="/contact/" class="btn-gold">Get a Free Quote</a>
        <a href="${business.phoneHref}" class="btn-outline">${svgIcon("phone", "w-4 h-4")} ${business.phoneDisplay}</a>
      </div>
    </div>
  </section>

  <section class="py-16 sm:py-24">
    <div class="section grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
      <div>
        <h2 class="text-2xl font-display font-semibold text-ink mb-6">What's Included</h2>
        <ul class="space-y-4">
          ${service.highlights
            .map(
              (h) => `
          <li class="flex items-start gap-3">
            ${svgIcon("check", "w-5 h-5 text-brand-green shrink-0 mt-0.5")}
            <span class="text-ink/70">${h}</span>
          </li>`
            )
            .join("\n")}
        </ul>
      </div>
      <div class="rounded-sm overflow-hidden">
        <img src="/${service.image}" alt="${service.name}" class="w-full h-full object-cover" />
      </div>
    </div>
  </section>

  <section class="py-16 sm:py-20 bg-white border-y border-ink/10">
    <div class="section">
      <h2 class="text-2xl font-display font-semibold text-ink mb-2">${service.name} &mdash; By Area</h2>
      <p class="text-ink/60 mb-8">We carry out ${service.name.toLowerCase()} across Glasgow and the surrounding areas.</p>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        ${areas
          .map(
            (a) => `
        <a href="/services/${service.slug}/${a.slug}/" class="group flex items-center justify-between rounded-sm border border-ink/10 px-5 py-4 hover:border-brand-green transition-colors">
          <span class="font-medium text-ink group-hover:text-brand-green transition-colors">${a.name}</span>
          ${svgIcon("arrow", "w-4 h-4 text-ink/30 group-hover:text-brand-green transition-colors")}
        </a>`
          )
          .join("\n")}
      </div>
    </div>
  </section>

  ${ctaBand({ business, heading: `Ready to Book Your ${service.name}?` })}
  `;
}

export function serviceAreaTemplate({ business, service, area, services }) {
  const otherServices = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  return `
  <section class="relative bg-ink overflow-hidden">
    <div class="absolute inset-0">
      <img src="/${service.image}" alt="${service.name} in ${area.name}" class="w-full h-full object-cover opacity-25" />
      <div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/90 to-ink/70"></div>
    </div>
    <div class="relative section py-16 sm:py-24 max-w-2xl">
      <p class="text-xs uppercase tracking-wide text-cream/50">
        <a href="/services/" class="hover:text-brand-gold transition-colors">Services</a> &middot;
        <a href="/services/${service.slug}/" class="hover:text-brand-gold transition-colors">${service.name}</a>
      </p>
      <h1 class="mt-4 text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-cream leading-tight">
        ${service.name} in <span class="text-brand-gold">${area.name}</span>
      </h1>
      <p class="mt-5 text-cream/70 leading-relaxed">
        Local ${service.name.toLowerCase()} for homes and businesses in ${area.name}, ${area.region} &mdash; from ${area.character}. NICEIC registered, fully insured, and quoted clearly before we start.
      </p>
      <div class="mt-8 flex flex-col sm:flex-row gap-4">
        <a href="/contact/" class="btn-gold">Get a Free Quote</a>
        <a href="${business.phoneHref}" class="btn-outline">${svgIcon("phone", "w-4 h-4")} ${business.phoneDisplay}</a>
      </div>
    </div>
  </section>

  <section class="py-16 sm:py-24">
    <div class="section grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
      <div>
        <h2 class="text-2xl font-display font-semibold text-ink mb-5">${service.name} for ${area.propertyNote}</h2>
        <p class="text-ink/70 leading-relaxed">${service.intro}</p>
        <p class="mt-4 text-ink/70 leading-relaxed">In ${area.name} that means working across ${area.character}, so every quote accounts for the property type before we arrive on site.</p>
        <ul class="mt-8 space-y-4">
          ${service.highlights
            .map(
              (h) => `
          <li class="flex items-start gap-3">
            ${svgIcon("check", "w-5 h-5 text-brand-green shrink-0 mt-0.5")}
            <span class="text-ink/70">${h}</span>
          </li>`
            )
            .join("\n")}
        </ul>
      </div>
      <div class="rounded-sm overflow-hidden">
        <img src="/${service.image}" alt="${service.name} in ${area.name}" class="w-full h-full object-cover" />
      </div>
    </div>
  </section>

  <section class="py-16 sm:py-20 bg-white border-y border-ink/10">
    <div class="section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <div>
        <h3 class="font-semibold text-ink mb-2">Also Serving ${area.name}</h3>
        <ul class="space-y-2">
          ${otherServices.map((s) => `<li><a href="/services/${s.slug}/${area.slug}/" class="text-sm text-brand-green hover:underline">${s.name} in ${area.name}</a></li>`).join("\n")}
        </ul>
      </div>
      <div>
        <h3 class="font-semibold text-ink mb-2">${service.name} Elsewhere</h3>
        <ul class="space-y-2">
          <li><a href="/services/${service.slug}/" class="text-sm text-brand-green hover:underline">All ${service.name} areas</a></li>
        </ul>
      </div>
      <div>
        <h3 class="font-semibold text-ink mb-2">More on ${area.name}</h3>
        <ul class="space-y-2">
          <li><a href="/areas/${area.slug}/" class="text-sm text-brand-green hover:underline">All services in ${area.name}</a></li>
        </ul>
      </div>
    </div>
  </section>

  ${ctaBand({ business, heading: `Book ${service.name} in ${area.name}` })}
  `;
}

export function areaHubTemplate({ business, area, services }) {
  return `
  <section class="relative bg-ink overflow-hidden">
    <div class="absolute inset-0">
      <img src="/assets/img/van.jpg" alt="Quality Electrics van in Glasgow" class="w-full h-full object-cover opacity-25" />
      <div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/90 to-ink/70"></div>
    </div>
    <div class="relative section py-16 sm:py-24 max-w-2xl">
      <span class="eyebrow">Areas Covered</span>
      <h1 class="mt-4 text-4xl sm:text-5xl font-display font-semibold text-cream">Electrician in <span class="text-brand-gold">${area.name}</span></h1>
      <p class="mt-5 text-cream/70 leading-relaxed">NICEIC registered electrical work across ${area.name}, ${area.region} &mdash; from ${area.character}.</p>
      <div class="mt-8 flex flex-col sm:flex-row gap-4">
        <a href="/contact/" class="btn-gold">Get a Free Quote</a>
        <a href="${business.phoneHref}" class="btn-outline">${svgIcon("phone", "w-4 h-4")} ${business.phoneDisplay}</a>
      </div>
    </div>
  </section>
  <section class="py-16 sm:py-24">
    <div class="section">
      <h2 class="text-2xl font-display font-semibold text-ink mb-8">Services Available in ${area.name}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${services
          .map(
            (s) => `
        <a href="/services/${s.slug}/${area.slug}/" class="group block rounded-sm overflow-hidden border border-ink/10 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
          <div class="aspect-[4/3] overflow-hidden">
            <img src="/${s.image}" alt="${s.name} in ${area.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          </div>
          <div class="p-6">
            <h3 class="font-display font-semibold text-lg text-ink group-hover:text-brand-green transition-colors">${s.name}</h3>
            <p class="mt-2 text-sm text-ink/60 leading-relaxed">${s.shortDesc}</p>
          </div>
        </a>`
          )
          .join("\n")}
      </div>
    </div>
  </section>
  ${ctaBand({ business, heading: `Need an Electrician in ${area.name}?` })}
  `;
}

export function aboutTemplate({ business }) {
  return `
  <section class="relative bg-ink overflow-hidden">
    <div class="absolute inset-0">
      <img src="/assets/img/van.jpg" alt="Quality Electrics van in Glasgow city centre" class="w-full h-full object-cover opacity-30" />
      <div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/90 to-ink/70"></div>
    </div>
    <div class="relative section py-16 sm:py-24 max-w-2xl">
      <span class="eyebrow">About Us</span>
      <h1 class="mt-4 text-4xl sm:text-5xl font-display font-semibold text-cream">Straightforward Electrical Work, Done Right</h1>
      <p class="mt-5 text-cream/70 leading-relaxed">Quality Electrics is a Glasgow-based, NICEIC registered electrical contractor working across homes, lets, and commercial properties in the city and surrounding areas.</p>
    </div>
  </section>

  <section class="py-16 sm:py-24">
    <div class="section grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
      <div>
        <span class="eyebrow">Our Approach</span>
        <h2 class="mt-3 text-3xl font-display font-semibold text-ink">Clear Quotes. Certified Work. No Surprises.</h2>
        <p class="mt-5 text-ink/70 leading-relaxed">We work with homeowners, landlords, property developers, and commercial clients who need electrical work they don't have to think twice about &mdash; from a same-day call-out to a multi-week commercial fit-out.</p>
        <p class="mt-4 text-ink/70 leading-relaxed">Every job is scoped properly before we start, priced clearly excl. VAT, and certified on completion so you've got the paperwork when you need it &mdash; for a sale, a let, or your own records.</p>
        <ul class="mt-8 space-y-3">
          ${business.certifications
            .map(
              (c) => `<li class="flex items-center gap-3 text-ink/80"><span class="flex items-center justify-center w-8 h-8 rounded-full bg-brand-green/10 text-brand-green">${svgIcon("shield", "w-4 h-4")}</span>${c}</li>`
            )
            .join("\n")}
        </ul>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <img src="/assets/img/tenement.jpg" alt="Glasgow tenement" class="rounded-sm object-cover w-full h-64" />
        <img src="/assets/img/outhouse-1.jpg" alt="Outbuilding electrical first fix" class="rounded-sm object-cover w-full h-64 mt-8" />
        <img src="/assets/img/office-lighting.jpg" alt="Office lighting installation" class="rounded-sm object-cover w-full h-64" />
        <img src="/assets/img/outdoor-supply.jpg" alt="Outdoor electrical supply" class="rounded-sm object-cover w-full h-64 mt-8" />
      </div>
    </div>
  </section>

  <section class="py-16 sm:py-24 bg-ink">
    <div class="section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      ${business.guarantees
        .map(
          (g) => `
      <div class="text-center">
        <div class="mx-auto w-14 h-14 rounded-full bg-brand-green flex items-center justify-center text-brand-gold mb-4">${svgIcon("bolt", "w-6 h-6")}</div>
        <p class="text-cream/85 font-medium">${g}</p>
      </div>`
        )
        .join("\n")}
    </div>
  </section>

  ${ctaBand({ business })}
  `;
}

export function projectsTemplate({ business, services }) {
  const gallery = services.map((s) => ({ image: s.image, caption: s.name }));
  return `
  <section class="relative bg-ink overflow-hidden">
    <div class="absolute inset-0">
      <img src="/assets/img/van.jpg" alt="Quality Electrics van" class="w-full h-full object-cover opacity-25" />
      <div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/90 to-ink/70"></div>
    </div>
    <div class="relative section py-16 sm:py-24 max-w-2xl">
      <span class="eyebrow">Our Work</span>
      <h1 class="mt-4 text-4xl sm:text-5xl font-display font-semibold text-cream">Recent Projects</h1>
      <p class="mt-5 text-cream/70 leading-relaxed">A selection of recent jobs across Glasgow &amp; the surrounding areas. More photos added as projects complete &mdash; placeholder images shown below.</p>
    </div>
  </section>
  <section class="py-16 sm:py-24">
    <div class="section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      ${gallery
        .map(
          (g) => `
      <figure class="rounded-sm overflow-hidden border border-ink/10 bg-white">
        <div class="aspect-[4/3] overflow-hidden">
          <img src="/${g.image}" alt="${g.caption}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
        </div>
        <figcaption class="p-4 text-sm font-medium text-ink/70">${g.caption}</figcaption>
      </figure>`
        )
        .join("\n")}
    </div>
  </section>
  ${ctaBand({ business, heading: "Have a Project in Mind?" })}
  `;
}

export function contactTemplate({ business, areas }) {
  return `
  <section class="relative bg-ink overflow-hidden">
    <div class="absolute inset-0">
      <img src="/assets/img/van.jpg" alt="Quality Electrics van" class="w-full h-full object-cover opacity-25" />
      <div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/90 to-ink/70"></div>
    </div>
    <div class="relative section py-16 sm:py-24 max-w-2xl">
      <span class="eyebrow">Get In Touch</span>
      <h1 class="mt-4 text-4xl sm:text-5xl font-display font-semibold text-cream">Get a Free Quote</h1>
      <p class="mt-5 text-cream/70 leading-relaxed">Tell us what you need and we'll get back to you the same day. For urgent call-outs, phone is fastest.</p>
    </div>
  </section>

  <section class="py-16 sm:py-24">
    <div class="section grid grid-cols-1 lg:grid-cols-5 gap-12">
      <div class="lg:col-span-3 rounded-sm border border-ink/10 bg-white p-6 sm:p-10">
        <form name="quote-request" method="POST" data-netlify="true" class="space-y-5">
          <input type="hidden" name="form-name" value="quote-request" />
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label for="name" class="block text-sm font-medium text-ink mb-1.5">Full Name</label>
              <input id="name" name="name" type="text" required autocomplete="name" class="w-full rounded-sm border border-ink/20 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green" />
            </div>
            <div>
              <label for="phone" class="block text-sm font-medium text-ink mb-1.5">Phone Number</label>
              <input id="phone" name="phone" type="tel" required autocomplete="tel" class="w-full rounded-sm border border-ink/20 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green" />
            </div>
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-ink mb-1.5">Email Address</label>
            <input id="email" name="email" type="email" required autocomplete="email" class="w-full rounded-sm border border-ink/20 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green" />
          </div>
          <div>
            <label for="area" class="block text-sm font-medium text-ink mb-1.5">Area</label>
            <select id="area" name="area" class="w-full rounded-sm border border-ink/20 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green">
              ${areas.map((a) => `<option value="${a.name}">${a.name}</option>`).join("\n")}
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label for="message" class="block text-sm font-medium text-ink mb-1.5">What do you need done?</label>
            <textarea id="message" name="message" rows="5" required class="w-full rounded-sm border border-ink/20 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"></textarea>
          </div>
          <button type="submit" class="btn-green w-full sm:w-auto">${svgIcon("bolt", "w-4 h-4")} Send Enquiry</button>
        </form>
      </div>
      <div class="lg:col-span-2 space-y-6">
        <div class="rounded-sm border border-ink/10 bg-ink p-8">
          <h3 class="font-display text-xl font-semibold text-cream mb-6">Contact Details</h3>
          <ul class="space-y-4 text-sm">
            <li class="flex items-center gap-3">${svgIcon("phone", "w-5 h-5 text-brand-gold")} <a href="${business.phoneHref}" class="text-cream/85 hover:text-brand-gold transition-colors">${business.phoneDisplay}</a></li>
            <li class="flex items-center gap-3">${svgIcon("mail", "w-5 h-5 text-brand-gold")} <a href="mailto:${business.email}" class="text-cream/85 hover:text-brand-gold transition-colors break-all">${business.email}</a></li>
            <li class="flex items-center gap-3">${svgIcon("pin", "w-5 h-5 text-brand-gold")} <span class="text-cream/85">Glasgow, Scotland</span></li>
            <li class="flex items-start gap-3">${svgIcon("clock", "w-5 h-5 text-brand-gold shrink-0 mt-0.5")} <span class="text-cream/85">${business.hoursLine}</span></li>
          </ul>
        </div>
        <div class="rounded-sm border border-ink/10 bg-white p-8">
          <h3 class="font-semibold text-ink mb-4">Areas We Cover</h3>
          <div class="flex flex-wrap gap-2">
            ${areas.map((a) => `<a href="/areas/${a.slug}/" class="text-xs font-medium px-3 py-1.5 rounded-full bg-brand-green/10 text-brand-green hover:bg-brand-green hover:text-cream transition-colors">${a.name}</a>`).join("\n")}
          </div>
        </div>
      </div>
    </div>
  </section>
  `;
}
