import { svgIcon, ctaBand, googleLogo } from "./partials.mjs";
import {
  serviceAreaFaqs,
  propertyConsiderations,
  regulationsNote,
  areaHubFaqs,
  mapEmbedUrl,
} from "./local-seo.mjs";

function midSentence(str) {
  const firstWord = str.split(" ")[0].replace(/[^A-Za-z]/g, "");
  const isAcronym = firstWord.length > 1 && firstWord === firstWord.toUpperCase();
  return isAcronym ? str : str.charAt(0).toLowerCase() + str.slice(1);
}

function starString(rating) {
  const full = Math.round(rating);
  return "★".repeat(full) + "☆".repeat(5 - full);
}

function reviewCard(review, services) {
  const service = review.service ? services.find((s) => s.slug === review.service) : null;
  return `
  <div class="rounded-sm border border-white/10 bg-surface p-6 flex flex-col stagger-item">
    <div class="flex items-center justify-between gap-3 mb-3">
      <div>
        <div class="text-sm font-medium text-cream">${review.author}</div>
        <div class="text-brand-gold text-xs leading-none mt-1">${starString(review.rating)}</div>
      </div>
      <span class="text-xs text-cream/40">${review.dateLabel}</span>
    </div>
    <p class="text-sm text-cream/70 leading-relaxed flex-1">${review.text}</p>
    <div class="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
      <span class="text-xs text-cream/40">Google review</span>
      ${service ? `<a href="/services/${service.slug}/" class="text-xs font-semibold text-brand-gold hover:underline">${service.name}</a>` : ""}
    </div>
  </div>`;
}

function whyChooseUsSection() {
  const points = [
    {
      label: "One",
      title: "NICEIC Registered & Fully Insured",
      body: "Every job is certified to BS7671 and backed by full insurance, so you've got the paperwork when you need it &mdash; for a sale, a let, or your own records.",
    },
    {
      label: "Two",
      title: "Same-Day Response",
      body: "Got an urgent problem? We aim to get back to you the same day, not stuck in a queue for next week.",
    },
    {
      label: "Three",
      title: "Clear, No-Obligation Quotes",
      body: "You'll know the price before we start &mdash; no surprises on the invoice, ever.",
    },
  ];
  return `
  <section class="reveal relative py-20 sm:py-28">
    <div class="reveal-glow absolute inset-0 -z-10 pointer-events-none"></div>
    <div class="section">
      <div class="max-w-2xl mb-12">
        <span class="eyebrow">Why Choose Us</span>
        <h2 class="mt-3 text-3xl sm:text-4xl font-display font-semibold text-cream">Why Glasgow Chooses Quality Electrics</h2>
        <p class="mt-4 text-cream/60 leading-relaxed">NICEIC registered, fully insured, and built on repeat business from homeowners and landlords across the city.</p>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div class="relative slide-left">
          <img src="/assets/img/outhouse-1.webp" alt="Electrical first-fix wiring in progress" class="rounded-sm w-full h-[420px] object-cover" />
          <span class="absolute -bottom-6 -left-6 hidden sm:flex items-center justify-center w-20 h-20 rounded-full bg-brand-green text-brand-gold shadow-xl">${svgIcon("bolt", "w-8 h-8")}</span>
        </div>
        <div class="divide-y divide-ink/10 stagger-group">
          ${points
            .map(
              (p) => `
          <div class="py-6 first:pt-0 stagger-item">
            <span class="inline-block text-xs font-semibold uppercase tracking-wide bg-brand-green text-cream px-3 py-1 rounded-sm mb-4">${p.label}</span>
            <div class="flex items-start gap-3">
              ${svgIcon("check", "w-6 h-6 text-brand-gold shrink-0 mt-0.5")}
              <div>
                <h3 class="font-display font-semibold text-lg text-cream">${p.title}</h3>
                <p class="mt-1.5 text-sm text-cream/60 leading-relaxed">${p.body}</p>
              </div>
            </div>
          </div>`
            )
            .join("\n")}
        </div>
      </div>
    </div>
  </section>`;
}

function processTimelineSection(business) {
  const images = [
    "assets/img/office-lighting.webp",
    "assets/img/outdoor-supply.webp",
    "assets/img/tenement.webp",
    "assets/img/outhouse.webp",
    "assets/img/under-unit-lighting.webp",
  ];
  return `
  <section class="reveal relative py-20 sm:py-28 bg-surface border-y border-white/10">
    <div class="reveal-glow absolute inset-0 -z-10 pointer-events-none"></div>
    <div class="section">
      <div class="max-w-2xl mx-auto text-center mb-16">
        <span class="eyebrow">Our Work Process</span>
        <h2 class="mt-3 text-3xl sm:text-4xl font-display font-semibold text-cream">Our Collaborative Workflow</h2>
        <p class="mt-4 text-cream/60 leading-relaxed">From first call to final certificate &mdash; here's exactly what to expect.</p>
      </div>
      <div class="relative max-w-4xl mx-auto">
        <div class="hidden lg:block absolute left-1/2 top-2 bottom-2 border-l-2 border-dashed border-brand-green/30 -translate-x-1/2" aria-hidden="true"></div>
        <div class="space-y-6 lg:space-y-10">
          ${business.process
            .map((step, i) => {
              const reversed = i % 2 === 1;
              const textCard = `
            <div class="rounded-sm border border-white/10 bg-white/5 p-6 sm:p-7">
              <h3 class="text-lg sm:text-xl font-display font-semibold text-cream">${step.title}</h3>
              <p class="mt-2 text-sm text-cream/60 leading-relaxed">${step.detail}</p>
            </div>`;
              const imageCell = `
            <div class="rounded-sm overflow-hidden h-48 sm:h-56">
              <img src="/${images[i % images.length]}" alt="${step.title}" class="w-full h-full object-cover" />
            </div>`;
              return `
          <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16 items-center">
            <span class="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 items-center justify-center w-11 h-11 rounded-full bg-white border-2 border-brand-green text-brand-green font-display font-semibold text-sm">0${i + 1}</span>
            <div class="${reversed ? "slide-right" : "slide-left"}">${reversed ? imageCell : textCard}</div>
            <div class="${reversed ? "slide-left" : "slide-right"}">${reversed ? textCard : imageCell}</div>
          </div>`;
            })
            .join("\n")}
        </div>
      </div>
    </div>
  </section>`;
}

function reviewsCarouselSection(reviews, services, avgRating) {
  const cards = reviews
    .map(
      (r, i) => `
    <div class="snap-start shrink-0 w-[85%] sm:w-[360px] rounded-sm p-6 flex flex-col ${i % 2 === 0 ? "bg-brand-green text-cream" : "bg-surface text-cream border border-white/10"}">
      <div class="flex items-center gap-3 mb-4">
        <span class="flex items-center justify-center w-10 h-10 rounded-full ${i % 2 === 0 ? "bg-cream/15 text-cream" : "bg-brand-green/20 text-brand-gold"} font-display font-semibold">${r.author.charAt(0)}</span>
        <div>
          <div class="font-medium">${r.author}</div>
          <div class="text-xs opacity-60">${r.dateLabel}</div>
        </div>
      </div>
      <p class="text-sm leading-relaxed flex-1 ${i % 2 === 0 ? "text-cream/85" : "text-cream/70"}">${r.text}</p>
      <div class="mt-4 ${i % 2 === 0 ? "text-brand-gold" : "text-brand-gold"} text-sm">${starString(r.rating)}</div>
    </div>`
    )
    .join("\n");

  return `
  <section class="reveal relative py-20 sm:py-28">
    <div class="reveal-glow absolute inset-0 -z-10 pointer-events-none"></div>
    <div class="section">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-10 items-end mb-10">
        <div class="lg:col-span-2">
          <span class="eyebrow">Trusted Clients</span>
          <h2 class="mt-3 text-3xl sm:text-4xl font-display font-semibold text-cream">Trusted Across Glasgow</h2>
          <p class="mt-4 text-cream/60 leading-relaxed">Real reviews from real jobs &mdash; not curated by us.</p>
        </div>
        <div class="flex items-center gap-3">
          ${googleLogo(28)}
          <div>
            <div class="text-xs uppercase tracking-wide text-cream/40">Google Rating</div>
            <div class="flex items-center gap-2">
              <span class="font-display font-semibold text-cream">${avgRating}</span>
              <span class="text-brand-gold text-sm leading-none">${starString(Number(avgRating))}</span>
            </div>
          </div>
        </div>
        <div class="flex sm:justify-end">
          <a href="/reviews/" class="btn-green">See All ${svgIcon("arrow", "w-4 h-4")}</a>
        </div>
      </div>
      <div class="relative">
        <div id="review-carousel" class="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-6 px-6 sm:mx-0 sm:px-0" style="scrollbar-width:none;">
          ${cards}
        </div>
        <div class="hidden sm:flex justify-end gap-3 mt-4">
          <button type="button" data-carousel-prev="review-carousel" aria-label="Previous reviews" class="flex items-center justify-center w-11 h-11 rounded-full border border-white/15 text-cream/50 hover:text-brand-gold hover:border-brand-green transition-colors cursor-pointer">${svgIcon("chevronLeft", "w-5 h-5")}</button>
          <button type="button" data-carousel-next="review-carousel" aria-label="Next reviews" class="flex items-center justify-center w-11 h-11 rounded-full border border-white/15 text-cream/50 hover:text-brand-gold hover:border-brand-green transition-colors cursor-pointer">${svgIcon("chevronRight", "w-5 h-5")}</button>
        </div>
      </div>
    </div>
  </section>`;
}

function trustBandSection(business, avgRating, reviewCount) {
  const items = [
    { icon: "shield", title: "NICEIC Registered", body: "Assessed and certified to national wiring standards." },
    { icon: "check", title: "Fully Insured", body: "Full public liability cover on every job, every time." },
    { icon: "bolt", title: "Same-Day Response", body: "We aim to get back to you the day you call." },
    { icon: "phone", title: "Free Quotes", body: "No obligation, no pressure, no hidden costs." },
  ];
  const legend = ["Domestic", "Commercial", "Landlords", "EV Charging"];
  return `
  <section class="reveal relative py-20 sm:py-28 bg-ink">
    <div class="reveal-glow absolute inset-0 -z-10 pointer-events-none"></div>
    <div class="section">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div class="slide-left">
          <div class="relative rounded-sm overflow-hidden">
            <img src="/assets/img/van.webp" alt="Quality Electrics van and team in Glasgow" class="w-full h-72 sm:h-96 object-cover" />
            <div class="absolute bottom-5 right-5 bg-brand-gold text-cream rounded-sm px-5 py-3 text-center shadow-xl">
              <div class="text-2xl font-display font-bold leading-none">${avgRating}★</div>
              <div class="text-[11px] uppercase tracking-wide font-semibold mt-1">Google Rating</div>
            </div>
          </div>
          <div class="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
            ${legend
              .map(
                (l, i) => `
            <div class="flex items-center gap-2 text-xs text-cream/60">
              <span class="w-2 h-2 rounded-full ${["bg-brand-gold", "bg-brand-green-light", "bg-cream/50", "bg-brand-gold/60"][i % 4]}"></span>${l}
            </div>`
              )
              .join("\n")}
          </div>
        </div>
        <div class="slide-right">
          <span class="eyebrow">About Us</span>
          <h2 class="mt-3 text-3xl sm:text-4xl font-display font-semibold text-cream leading-tight">Glasgow's Trusted<br/><span class="text-brand-gold">Electricians</span></h2>
          <p class="mt-5 text-cream/65 leading-relaxed">Quality Electrics is your go-to source for reliable, professional electrical work in Glasgow and the surrounding areas. We bring careful, methodical workmanship to every project, whether it's a simple repair, a full rewire, or a complete consumer unit upgrade.</p>
          <p class="mt-4 text-cream/65 leading-relaxed">We prioritise safety, efficiency, and customer satisfaction, using the latest tools and testing equipment to make sure every job is completed to the highest standards. As a fully NICEIC registered and insured contractor, you can trust us to handle your electrical work, big or small.</p>
        </div>
      </div>

      <div class="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger-group">
        ${items
          .map(
            (item) => `
        <div class="stagger-item rounded-sm border border-white/10 bg-white/5 p-6">
          <div class="flex items-center justify-center w-11 h-11 rounded-sm bg-brand-green text-brand-gold mb-4">${svgIcon(item.icon, "w-5 h-5")}</div>
          <h3 class="font-semibold text-cream">${item.title}</h3>
          <p class="mt-1.5 text-sm text-cream/50 leading-relaxed">${item.body}</p>
        </div>`
          )
          .join("\n")}
      </div>

      <div class="mt-16 text-center">
        <h3 class="text-lg font-display font-semibold text-cream">Registered &amp; <span class="text-brand-gold">Approved</span></h3>
        <p class="mt-2 text-sm text-cream/50 max-w-md mx-auto">Every job is backed by our professional registrations and insurance cover.</p>
        <div class="mt-8 flex flex-wrap items-center justify-center gap-6">
          <div class="flex items-center justify-center rounded-sm bg-white/95 px-8 py-5">
            <img src="/assets/img/niceic-logo.webp" alt="NICEIC Approved Contractor" class="h-12 w-auto" />
          </div>
          <div class="flex items-center justify-center rounded-sm bg-white/95 px-8 py-6">
            <img src="/assets/img/checkatrade-logo.webp" alt="Checkatrade" class="h-7 w-auto" />
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

function instagramSection() {
  const igUrl = "https://www.instagram.com/quality_electrics_ltd/";
  const images = [
    "assets/img/office-lighting.webp",
    "assets/img/outdoor-supply.webp",
    "assets/img/outhouse-1.webp",
    "assets/img/outhouse.webp",
    "assets/img/tenement.webp",
    "assets/img/under-unit-lighting.webp",
    "assets/img/van.webp",
  ];
  return `
  <section class="reveal relative py-20 sm:py-28 bg-ink">
    <div class="reveal-glow absolute inset-0 -z-10 pointer-events-none"></div>
    <div class="section text-center">
      <span class="eyebrow">Our Work</span>
      <h2 class="mt-3 text-3xl sm:text-4xl font-display font-semibold text-cream">Follow Us On <span class="text-brand-gold">Instagram</span></h2>
      <p class="mt-4 text-cream/60 leading-relaxed max-w-xl mx-auto">See our latest jobs, behind-the-scenes work, and electrical tips. Follow @quality_electrics_ltd for updates.</p>
      <div class="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 stagger-group">
        ${images
          .map(
            (img) => `
        <a href="${igUrl}" target="_blank" rel="noopener noreferrer" class="group block aspect-square overflow-hidden rounded-sm relative stagger-item">
          <img src="/${img}" alt="Quality Electrics project photo" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          <span class="absolute inset-0 bg-ink/0 group-hover:bg-ink/40 transition-colors flex items-center justify-center">
            <span class="opacity-0 group-hover:opacity-100 transition-opacity text-cream">${svgIcon("instagram", "w-6 h-6")}</span>
          </span>
        </a>`
          )
          .join("\n")}
      </div>
      <a href="${igUrl}" target="_blank" rel="noopener noreferrer" class="btn-gold mt-10 inline-flex">${svgIcon("instagram", "w-4 h-4")} Follow @quality_electrics_ltd</a>
    </div>
  </section>`;
}

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

export function homeTemplate({ business, services, areas, reviews }) {
  const featured = services.slice(0, 6);
  const featuredReviews = reviews.slice(0, 6);
  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
  return `
  <section class="relative bg-ink overflow-hidden">
    <div class="absolute inset-0">
      <img src="/assets/img/van.webp" alt="Quality Electrics branded van parked in Glasgow city centre" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/50"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/40 to-transparent"></div>
    </div>
    <div class="relative section pt-16 pb-14 sm:pt-24 sm:pb-16">
      <div class="max-w-2xl">
        <div class="flex items-center gap-2 mb-5">
          ${googleLogo(22)}
          <span class="text-brand-gold text-sm leading-none">${starString(Number(avgRating))}</span>
          <span class="text-cream/50 text-xs">${avgRating} on Google</span>
        </div>
        <span class="eyebrow">NICEIC Registered &middot; Glasgow &amp; Surrounding Areas</span>
        <h1 class="mt-5 text-4xl sm:text-5xl lg:text-6xl font-display font-semibold leading-[1.05] text-cream">
          Electrician in Glasgow<br/>
          <span class="text-brand-gold">Powering Homes &amp; Businesses</span>
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

  ${trustBandSection(business, avgRating, reviews.length)}

  ${guaranteesStrip(business)}

  <section class="reveal relative py-20 sm:py-28">
    <div class="reveal-glow absolute inset-0 -z-10 pointer-events-none"></div>
    <div class="section">
      <div class="max-w-2xl">
        <span class="eyebrow">What We Do</span>
        <h2 class="mt-3 text-3xl sm:text-4xl font-display font-semibold text-cream">Electrical Services Built Around Your Property</h2>
        <p class="mt-4 text-cream/60 leading-relaxed">From a single rewired socket to a full commercial fit-out, every job is quoted clearly and certified on completion.</p>
      </div>
      <div class="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-group">
        ${featured
          .map(
            (s) => `
        <a href="/services/${s.slug}/" class="group block rounded-sm overflow-hidden border border-white/10 bg-surface hover:shadow-xl hover:-translate-y-1 transition-all duration-200 stagger-item">
          <div class="aspect-[4/3] overflow-hidden">
            <img src="/${s.image}" alt="${s.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          </div>
          <div class="p-6">
            <h3 class="font-display font-semibold text-lg text-cream group-hover:text-brand-gold transition-colors">${s.name}</h3>
            <p class="mt-2 text-sm text-cream/60 leading-relaxed">${s.shortDesc}</p>
            <span class="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-gold">Learn more ${svgIcon("arrow", "w-4 h-4")}</span>
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

  ${whyChooseUsSection()}

  <section class="reveal relative py-20 sm:py-28 bg-ink">
    <div class="reveal-glow absolute inset-0 -z-10 pointer-events-none"></div>
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

  ${processTimelineSection(business)}

  ${reviewsCarouselSection(featuredReviews, services, avgRating)}

  ${instagramSection()}

    <section class="reveal relative py-20 sm:py-28">
    <div class="reveal-glow absolute inset-0 -z-10 pointer-events-none"></div>
    <div class="section">
      <div class="max-w-2xl">
        <span class="eyebrow">Where We Work</span>
        <h2 class="mt-3 text-3xl sm:text-4xl font-display font-semibold text-cream">Covering Glasgow &amp; the Surrounding Areas</h2>
        <p class="mt-4 text-cream/60 leading-relaxed">Based in Glasgow and on the road across the following areas &mdash; click yours for local call-out details.</p>
      </div>
      <div class="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        ${areas
          .map(
            (a) => `
        <a href="/areas/${a.slug}/" class="group flex items-center justify-between rounded-sm border border-white/10 bg-surface px-5 py-4 hover:border-brand-green transition-colors">
          <span class="font-medium text-cream group-hover:text-brand-gold transition-colors">${a.name}</span>
          ${svgIcon("arrow", "w-4 h-4 text-cream/30 group-hover:text-brand-gold transition-colors")}
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
    <div class="section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-group">
      ${services
        .map(
          (s) => `
      <a href="/services/${s.slug}/" class="group block rounded-sm overflow-hidden border border-white/10 bg-surface hover:shadow-xl hover:-translate-y-1 transition-all duration-200 stagger-item">
        <div class="aspect-[4/3] overflow-hidden">
          <img src="/${s.image}" alt="${s.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div class="p-6">
          <h2 class="font-display font-semibold text-lg text-cream group-hover:text-brand-gold transition-colors">${s.name}</h2>
          <p class="mt-2 text-sm text-cream/60 leading-relaxed">${s.shortDesc}</p>
          <span class="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-gold">Learn more ${svgIcon("arrow", "w-4 h-4")}</span>
        </div>
      </a>`
        )
        .join("\n")}
    </div>
  </section>
  ${ctaBand({ business })}
  `;
}

export function serviceTemplate({ business, service, services, areas, post }) {
  const pairService = services.find((s) => s.slug === service.pairSlug);
  return `
  <section class="relative bg-ink overflow-hidden">
    <div class="absolute inset-0">
      <img src="/${service.image}" alt="${service.name}" class="w-full h-full object-cover opacity-30" />
      <div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/90 to-ink/70"></div>
    </div>
    <div class="relative section py-16 sm:py-24 max-w-2xl">
      <a href="/services/" class="text-xs uppercase tracking-wide text-cream/50 hover:text-brand-gold transition-colors">&larr; All Services</a>
      <h1 class="mt-4 text-4xl sm:text-5xl font-display font-semibold text-cream">${service.name} in Glasgow <span class="text-brand-gold">&mdash; ${service.benefit}</span></h1>
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
        <h2 class="text-2xl font-display font-semibold text-cream mb-6">What's Included</h2>
        <ul class="space-y-4">
          ${service.highlights
            .map(
              (h) => `
          <li class="flex items-start gap-3">
            ${svgIcon("check", "w-5 h-5 text-brand-gold shrink-0 mt-0.5")}
            <span class="text-cream/70">${h}</span>
          </li>`
            )
            .join("\n")}
        </ul>
        ${
          pairService
            ? `
        <p class="mt-6 text-sm text-cream/55 leading-relaxed">Often booked alongside our ${service.name}: <a href="/services/${pairService.slug}/" class="font-semibold text-brand-gold hover:underline">${pairService.name}</a> &mdash; ${midSentence(pairService.shortDesc)}</p>`
            : ""
        }
      </div>
      <div class="rounded-sm overflow-hidden">
        <img src="/${service.image}" alt="${service.name}" class="w-full h-full object-cover" />
      </div>
    </div>
  </section>

  <section class="py-16 sm:py-24 bg-ink">
    <div class="section">
      <div class="max-w-2xl">
        <span class="eyebrow">Why Quality Electrics</span>
        <h2 class="mt-3 text-2xl sm:text-3xl font-display font-semibold text-cream">Why Choose Us for ${service.name}</h2>
      </div>
      <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
        ${service.whyUs
          .map(
            (w) => `
        <div class="flex items-start gap-4 rounded-sm border border-white/10 bg-white/5 p-5">
          ${svgIcon("bolt", "w-5 h-5 text-brand-gold shrink-0 mt-0.5")}
          <span class="text-cream/80 text-sm leading-relaxed">${w}</span>
        </div>`
          )
          .join("\n")}
      </div>
    </div>
  </section>

  <section class="py-16 sm:py-24">
    <div class="section grid grid-cols-1 lg:grid-cols-2 gap-14">
      <div>
        <span class="eyebrow">When You'd Need This</span>
        <h2 class="mt-3 text-2xl font-display font-semibold text-cream mb-6">Signs You Might Need ${service.name}</h2>
        <ul class="space-y-4">
          ${service.signs
            .map(
              (s) => `
          <li class="flex items-start gap-3">
            ${svgIcon("check", "w-5 h-5 text-brand-gold shrink-0 mt-0.5")}
            <span class="text-cream/70">${s}</span>
          </li>`
            )
            .join("\n")}
        </ul>
      </div>
      <div>
        <span class="eyebrow">How It Works</span>
        <h2 class="mt-3 text-2xl font-display font-semibold text-cream mb-6">Our Process</h2>
        <ol class="space-y-6">
          ${business.process
            .map(
              (p, i) => `
          <li class="flex gap-4">
            <span class="flex items-center justify-center w-8 h-8 rounded-full bg-brand-green text-cream text-sm font-semibold shrink-0">${i + 1}</span>
            <div>
              <h3 class="font-semibold text-cream">${p.title}</h3>
              <p class="text-sm text-cream/60 mt-0.5 leading-relaxed">${p.detail}</p>
            </div>
          </li>`
            )
            .join("\n")}
        </ol>
      </div>
    </div>
  </section>

  <section class="py-16 sm:py-24 bg-surface border-y border-white/10">
    <div class="section max-w-3xl">
      <span class="eyebrow">FAQs</span>
      <h2 class="mt-3 text-2xl sm:text-3xl font-display font-semibold text-cream mb-8">Common Questions About ${service.name}</h2>
      <div class="space-y-3">
        ${service.faqs
          .map(
            (f) => `
        <details class="group rounded-sm border border-white/10 bg-white/5 open:bg-white/10 transition-colors">
          <summary class="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer font-medium text-cream list-none">
            <span>${f.q}</span>
            <span class="shrink-0 text-brand-gold transition-transform group-open:rotate-180">${svgIcon("chevronDown", "w-4 h-4")}</span>
          </summary>
          <div class="px-5 pb-4 text-sm text-cream/65 leading-relaxed">${f.a}</div>
        </details>`
          )
          .join("\n")}
      </div>
    </div>
  </section>

  <section class="py-16 sm:py-20">
    <div class="section">
      <h2 class="text-2xl font-display font-semibold text-cream mb-2">${service.name} &mdash; By Area</h2>
      <p class="text-cream/60 mb-8">We carry out ${service.name.toLowerCase()} across Glasgow and the surrounding areas.</p>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        ${areas
          .map(
            (a) => `
        <a href="/services/${service.slug}/${a.slug}/" class="group flex items-center justify-between rounded-sm border border-white/10 px-5 py-4 hover:border-brand-green transition-colors">
          <span class="font-medium text-cream group-hover:text-brand-gold transition-colors">${a.name}</span>
          ${svgIcon("arrow", "w-4 h-4 text-cream/30 group-hover:text-brand-gold transition-colors")}
        </a>`
          )
          .join("\n")}
      </div>
    </div>
  </section>

  ${post ? `
  <section class="py-16 sm:py-20 bg-surface border-y border-white/10">
    <div class="section">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 rounded-sm border border-white/10 p-6 sm:p-8">
        <div>
          <span class="eyebrow">Free Guide</span>
          <h2 class="mt-2 text-xl font-display font-semibold text-cream">${post.title}</h2>
          <p class="mt-2 text-sm text-cream/60 leading-relaxed max-w-xl">${post.excerpt}</p>
        </div>
        <a href="/blog/${post.slug}/" class="btn-green shrink-0">Read the Guide ${svgIcon("arrow", "w-4 h-4")}</a>
      </div>
    </div>
  </section>` : ""}

  ${ctaBand({ business, heading: `Ready to Book Your ${service.name}?` })}
  `;
}

export function serviceAreaTemplate({ business, service, area, services, reviews = [] }) {
  const otherServices = services.filter((s) => s.slug !== service.slug);
  const faqs = serviceAreaFaqs(service, area);
  const regNote = regulationsNote(service);
  const relevantReviews = reviews.filter((r) => r.service === service.slug).slice(0, 3);
  const featuredReviews = relevantReviews.length >= 2 ? relevantReviews : reviews.filter((r) => r.rating === 5).slice(0, 3);

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
        <h2 class="text-2xl font-display font-semibold text-cream mb-5">${service.name} for ${area.propertyNote}</h2>
        <p class="text-cream/70 leading-relaxed">${service.intro}</p>
        <p class="mt-4 text-cream/70 leading-relaxed">${propertyConsiderations(service, area)}</p>
        <ul class="mt-8 space-y-4">
          ${service.highlights
            .map(
              (h) => `
          <li class="flex items-start gap-3">
            ${svgIcon("check", "w-5 h-5 text-brand-gold shrink-0 mt-0.5")}
            <span class="text-cream/70">${h}</span>
          </li>`
            )
            .join("\n")}
        </ul>
        ${
          regNote
            ? `
        <div class="mt-8 rounded-sm border border-brand-gold/20 bg-brand-gold/5 p-5">
          <div class="flex items-start gap-3">
            ${svgIcon("shield", "w-5 h-5 text-brand-gold shrink-0 mt-0.5")}
            <div>
              <h3 class="text-sm font-semibold text-cream mb-1">Compliance &amp; Regulations</h3>
              <p class="text-sm text-cream/65 leading-relaxed">${regNote}</p>
            </div>
          </div>
        </div>`
            : ""
        }
      </div>
      <div class="rounded-sm overflow-hidden">
        <img src="/${service.image}" alt="${service.name} in ${area.name}" class="w-full h-full object-cover" />
      </div>
    </div>
  </section>

  ${
    featuredReviews.length
      ? `
  <section class="reveal relative py-16 sm:py-20 bg-surface border-y border-white/10">
    <div class="section">
      <span class="eyebrow">${relevantReviews.length >= 2 ? "Customer Reviews" : "Reviews"}</span>
      <h2 class="mt-3 text-2xl font-display font-semibold text-cream mb-8">${
        relevantReviews.length >= 2 ? `What ${area.name} Customers Say About Our ${service.name}` : `What Our Customers Say`
      }</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-group">
        ${featuredReviews.map((r) => reviewCard(r, services)).join("\n")}
      </div>
    </div>
  </section>`
      : ""
  }

  <section class="py-16 sm:py-24 bg-surface border-y border-white/10">
    <div class="section max-w-3xl">
      <span class="eyebrow">FAQs</span>
      <h2 class="mt-3 text-2xl sm:text-3xl font-display font-semibold text-cream mb-8">${service.name} in ${area.name} &mdash; Common Questions</h2>
      <div class="space-y-3">
        ${faqs
          .map(
            (f) => `
        <details class="group rounded-sm border border-white/10 bg-white/5 open:bg-white/10 transition-colors">
          <summary class="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer font-medium text-cream list-none">
            <span>${f.q}</span>
            <span class="shrink-0 text-brand-gold transition-transform group-open:rotate-180">${svgIcon("chevronDown", "w-4 h-4")}</span>
          </summary>
          <div class="px-5 pb-4 text-sm text-cream/65 leading-relaxed">${f.a}</div>
        </details>`
          )
          .join("\n")}
      </div>
    </div>
  </section>

  <section class="py-16 sm:py-20">
    <div class="section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 stagger-group">
      <div>
        <h3 class="font-semibold text-cream mb-3">Also Serving ${area.name}</h3>
        <ul class="space-y-2">
          ${otherServices.map((s) => `<li><a href="/services/${s.slug}/${area.slug}/" class="text-sm text-cream/70 hover:text-brand-gold transition-colors">${s.name} in ${area.name}</a></li>`).join("\n")}
        </ul>
      </div>
      <div>
        <h3 class="font-semibold text-cream mb-3">${service.name} Elsewhere</h3>
        <ul class="space-y-2">
          <li><a href="/services/${service.slug}/" class="text-sm text-cream/70 hover:text-brand-gold transition-colors font-medium">All ${service.name} areas</a></li>
        </ul>
      </div>
      <div>
        <h3 class="font-semibold text-cream mb-3">More on ${area.name}</h3>
        <ul class="space-y-2">
          <li><a href="/areas/${area.slug}/" class="text-sm text-cream/70 hover:text-brand-gold transition-colors font-medium">All services in ${area.name}</a></li>
        </ul>
      </div>
    </div>
  </section>

  ${ctaBand({ business, heading: `Book ${service.name} in ${area.name}` })}
  `;
}

export function areaHubTemplate({ business, area, services, reviews = [] }) {
  const faqs = areaHubFaqs(area);
  const featuredReviews = reviews.filter((r) => r.rating === 5).slice(0, 3);
  return `
  <section class="relative bg-ink overflow-hidden">
    <div class="absolute inset-0">
      <img src="/assets/img/van.webp" alt="Quality Electrics van in Glasgow" class="w-full h-full object-cover opacity-25" />
      <div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/90 to-ink/70"></div>
    </div>
    <div class="relative section py-16 sm:py-24 max-w-2xl">
      <span class="eyebrow">Areas Covered</span>
      <h1 class="mt-4 text-4xl sm:text-5xl font-display font-semibold text-cream">Electrician in <span class="text-brand-gold">${area.name}</span> &mdash; ${business.areaBenefit}</h1>
      <p class="mt-5 text-cream/70 leading-relaxed">NICEIC registered electrical work across ${area.name}, ${area.region} &mdash; from ${area.character}.</p>
      <div class="mt-8 flex flex-col sm:flex-row gap-4">
        <a href="/contact/" class="btn-gold">Get a Free Quote</a>
        <a href="${business.phoneHref}" class="btn-outline">${svgIcon("phone", "w-4 h-4")} ${business.phoneDisplay}</a>
      </div>
    </div>
  </section>

  <section class="py-16 sm:py-24">
    <div class="section">
      <h2 class="text-2xl font-display font-semibold text-cream mb-8">Services Available in ${area.name}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-group">
        ${services
          .map(
            (s) => `
        <a href="/services/${s.slug}/${area.slug}/" class="group block rounded-sm overflow-hidden border border-white/10 bg-surface hover:shadow-xl hover:-translate-y-1 transition-all duration-200 stagger-item">
          <div class="aspect-[4/3] overflow-hidden">
            <img src="/${s.image}" alt="${s.name} in ${area.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          </div>
          <div class="p-6">
            <h3 class="font-display font-semibold text-lg text-cream group-hover:text-brand-gold transition-colors">${s.name}</h3>
            <p class="mt-2 text-sm text-cream/60 leading-relaxed">${s.shortDesc}</p>
          </div>
        </a>`
          )
          .join("\n")}
      </div>
    </div>
  </section>

  <section class="reveal relative py-16 sm:py-24 bg-surface border-y border-white/10">
    <div class="reveal-glow absolute inset-0 -z-10 pointer-events-none"></div>
    <div class="section grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div class="slide-left rounded-sm overflow-hidden h-72 sm:h-96">
        <iframe
          src="${mapEmbedUrl(area)}"
          class="w-full h-full grayscale contrast-125 opacity-80"
          style="border:0;"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="Map of ${area.name}, ${area.region}"
        ></iframe>
      </div>
      <div class="slide-right">
        <span class="eyebrow">Why ${area.name} Trusts Us</span>
        <h2 class="mt-3 text-2xl sm:text-3xl font-display font-semibold text-cream">Local, Registered, and Accountable</h2>
        <p class="mt-4 text-cream/65 leading-relaxed">Whether it's a quick repair or a full rewire, ${area.name} customers get the same NICEIC registered, fully insured service &mdash; quoted clearly before any work starts, and certified properly once it's done.</p>
        <ul class="mt-6 space-y-3">
          <li class="flex items-center gap-3 text-cream/80"><span class="flex items-center justify-center w-8 h-8 rounded-full bg-brand-green/20 text-brand-gold">${svgIcon("shield", "w-4 h-4")}</span>NICEIC registered for all work in ${area.region}</li>
          <li class="flex items-center gap-3 text-cream/80"><span class="flex items-center justify-center w-8 h-8 rounded-full bg-brand-green/20 text-brand-gold">${svgIcon("check", "w-4 h-4")}</span>Fully insured, every job, every time</li>
          <li class="flex items-center gap-3 text-cream/80"><span class="flex items-center justify-center w-8 h-8 rounded-full bg-brand-green/20 text-brand-gold">${svgIcon("bolt", "w-4 h-4")}</span>Same-day response for most ${area.name} enquiries</li>
        </ul>
      </div>
    </div>
  </section>

  ${
    featuredReviews.length
      ? `
  <section class="reveal relative py-16 sm:py-20">
    <div class="section">
      <span class="eyebrow">Reviews</span>
      <h2 class="mt-3 text-2xl font-display font-semibold text-cream mb-8">What Our Customers Say</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-group">
        ${featuredReviews.map((r) => reviewCard(r, services)).join("\n")}
      </div>
    </div>
  </section>`
      : ""
  }

  <section class="py-16 sm:py-24 bg-surface border-y border-white/10">
    <div class="section max-w-3xl">
      <span class="eyebrow">FAQs</span>
      <h2 class="mt-3 text-2xl sm:text-3xl font-display font-semibold text-cream mb-8">Electrician in ${area.name} &mdash; Common Questions</h2>
      <div class="space-y-3">
        ${faqs
          .map(
            (f) => `
        <details class="group rounded-sm border border-white/10 bg-white/5 open:bg-white/10 transition-colors">
          <summary class="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer font-medium text-cream list-none">
            <span>${f.q}</span>
            <span class="shrink-0 text-brand-gold transition-transform group-open:rotate-180">${svgIcon("chevronDown", "w-4 h-4")}</span>
          </summary>
          <div class="px-5 pb-4 text-sm text-cream/65 leading-relaxed">${f.a}</div>
        </details>`
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
      <img src="/assets/img/van.webp" alt="Quality Electrics van in Glasgow city centre" class="w-full h-full object-cover opacity-30" />
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
        <h2 class="mt-3 text-3xl font-display font-semibold text-cream">Clear Quotes. Certified Work. No Surprises.</h2>
        <p class="mt-5 text-cream/70 leading-relaxed">We work with homeowners, landlords, property developers, and commercial clients who need electrical work they don't have to think twice about &mdash; from a same-day call-out to a multi-week commercial fit-out.</p>
        <p class="mt-4 text-cream/70 leading-relaxed">Every job is scoped properly before we start, priced clearly excl. VAT, and certified on completion so you've got the paperwork when you need it &mdash; for a sale, a let, or your own records.</p>
        <ul class="mt-8 space-y-3">
          ${business.certifications
            .map(
              (c) => `<li class="flex items-center gap-3 text-cream/80"><span class="flex items-center justify-center w-8 h-8 rounded-full bg-brand-green/20 text-brand-gold">${svgIcon("shield", "w-4 h-4")}</span>${c}</li>`
            )
            .join("\n")}
        </ul>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <img src="/assets/img/tenement.webp" alt="Glasgow tenement" class="rounded-sm object-cover w-full h-64" />
        <img src="/assets/img/outhouse-1.webp" alt="Outbuilding electrical first fix" class="rounded-sm object-cover w-full h-64 mt-8" />
        <img src="/assets/img/office-lighting.webp" alt="Office lighting installation" class="rounded-sm object-cover w-full h-64" />
        <img src="/assets/img/outdoor-supply.webp" alt="Outdoor electrical supply" class="rounded-sm object-cover w-full h-64 mt-8" />
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
      <img src="/assets/img/van.webp" alt="Quality Electrics van" class="w-full h-full object-cover opacity-25" />
      <div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/90 to-ink/70"></div>
    </div>
    <div class="relative section py-16 sm:py-24 max-w-2xl">
      <span class="eyebrow">Our Work</span>
      <h1 class="mt-4 text-4xl sm:text-5xl font-display font-semibold text-cream">Recent Projects</h1>
      <p class="mt-5 text-cream/70 leading-relaxed">A selection of recent jobs across Glasgow &amp; the surrounding areas. More photos added as projects complete &mdash; placeholder images shown below.</p>
    </div>
  </section>
  <section class="py-16 sm:py-24">
    <div class="section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-group">
      ${gallery
        .map(
          (g) => `
      <figure class="rounded-sm overflow-hidden border border-white/10 bg-surface">
        <div class="aspect-[4/3] overflow-hidden">
          <img src="/${g.image}" alt="${g.caption}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
        </div>
        <figcaption class="p-4 text-sm font-medium text-cream/70">${g.caption}</figcaption>
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
      <img src="/assets/img/van.webp" alt="Quality Electrics van" class="w-full h-full object-cover opacity-25" />
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
      <div class="lg:col-span-3 rounded-sm border border-white/10 bg-surface p-6 sm:p-10">
        <form id="contact-form" action="https://formspree.io/f/REPLACE_WITH_YOUR_FORM_ID" method="POST" class="space-y-5">
          <div id="form-status" class="hidden text-sm font-medium" role="status"></div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label for="name" class="block text-sm font-medium text-cream mb-1.5">Full Name</label>
              <input id="name" name="name" type="text" required autocomplete="name" class="w-full rounded-sm border border-white/20 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green" />
            </div>
            <div>
              <label for="phone" class="block text-sm font-medium text-cream mb-1.5">Phone Number</label>
              <input id="phone" name="phone" type="tel" required autocomplete="tel" class="w-full rounded-sm border border-white/20 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green" />
            </div>
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-cream mb-1.5">Email Address</label>
            <input id="email" name="email" type="email" required autocomplete="email" class="w-full rounded-sm border border-white/20 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green" />
          </div>
          <div>
            <label for="area" class="block text-sm font-medium text-cream mb-1.5">Area</label>
            <select id="area" name="area" class="w-full rounded-sm border border-white/20 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green">
              ${areas.map((a) => `<option value="${a.name}">${a.name}</option>`).join("\n")}
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label for="message" class="block text-sm font-medium text-cream mb-1.5">What do you need done?</label>
            <textarea id="message" name="message" rows="5" required class="w-full rounded-sm border border-white/20 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"></textarea>
          </div>
          <button type="submit" class="btn-green w-full sm:w-auto">${svgIcon("bolt", "w-4 h-4")} Send Enquiry</button>
        </form>
      </div>
      <div class="lg:col-span-2 space-y-6">
        <div class="rounded-sm border border-white/10 bg-ink p-8">
          <h3 class="font-display text-xl font-semibold text-cream mb-6">Contact Details</h3>
          <ul class="space-y-4 text-sm">
            <li class="flex items-center gap-3">${svgIcon("phone", "w-5 h-5 text-brand-gold")} <a href="${business.phoneHref}" class="text-cream/85 hover:text-brand-gold transition-colors">${business.phoneDisplay}</a></li>
            <li class="flex items-center gap-3">${svgIcon("mail", "w-5 h-5 text-brand-gold")} <a href="mailto:${business.email}" class="text-cream/85 hover:text-brand-gold transition-colors break-all">${business.email}</a></li>
            <li class="flex items-center gap-3">${svgIcon("pin", "w-5 h-5 text-brand-gold")} <span class="text-cream/85">Glasgow, Scotland</span></li>
            <li class="flex items-start gap-3">${svgIcon("clock", "w-5 h-5 text-brand-gold shrink-0 mt-0.5")} <span class="text-cream/85">${business.hoursLine}</span></li>
          </ul>
        </div>
        <div class="rounded-sm border border-white/10 bg-surface p-8">
          <h3 class="font-semibold text-cream mb-4">Areas We Cover</h3>
          <div class="flex flex-wrap gap-2">
            ${areas.map((a) => `<a href="/areas/${a.slug}/" class="text-xs font-medium px-3 py-1.5 rounded-full bg-white/5 text-cream/75 border border-white/10 hover:bg-brand-green hover:text-cream hover:border-brand-green transition-colors">${a.name}</a>`).join("\n")}
          </div>
        </div>
      </div>
    </div>
  </section>
  `;
}

function postCard(post, services) {
  const service = services.find((s) => s.slug === post.service);
  return `
  <a href="/blog/${post.slug}/" class="group block rounded-sm overflow-hidden border border-white/10 bg-surface hover:shadow-xl hover:-translate-y-1 transition-all duration-200 stagger-item">
    <div class="aspect-[16/10] overflow-hidden">
      <img src="/${post.heroImage}" alt="${post.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
    </div>
    <div class="p-6">
      ${service ? `<span class="text-xs font-semibold uppercase tracking-wide text-brand-gold">${service.name}</span>` : ""}
      <h3 class="mt-2 font-display font-semibold text-lg text-cream leading-snug group-hover:text-brand-gold transition-colors">${post.title}</h3>
      <p class="mt-2 text-sm text-cream/60 leading-relaxed">${post.excerpt}</p>
      <div class="mt-4 flex items-center gap-3 text-xs text-cream/45">
        <span>${post.displayDate}</span>
        <span>&middot;</span>
        <span>${post.readTime}</span>
      </div>
    </div>
  </a>`;
}

export function blogHubTemplate({ business, posts, services }) {
  return `
  <section class="bg-ink py-16 sm:py-20">
    <div class="section text-center max-w-2xl mx-auto">
      <span class="eyebrow">Guides &amp; Advice</span>
      <h1 class="mt-3 text-4xl sm:text-5xl font-display font-semibold text-cream">The Quality Electrics Blog</h1>
      <p class="mt-4 text-cream/60 leading-relaxed">Straight answers to the questions we get asked most &mdash; costs, regulations, and what to plan before work starts.</p>
    </div>
  </section>
  <section class="py-16 sm:py-24">
    <div class="section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-group">
      ${posts.map((p) => postCard(p, services)).join("\n")}
    </div>
  </section>
  ${ctaBand({ business })}
  `;
}

export function blogArticleSchema({ business, post }) {
  const url = `https://${business.domain}/blog/${post.slug}/`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    image: `https://${business.domain}/${post.heroImage}`,
    datePublished: post.publishDate,
    dateModified: post.publishDate,
    author: { "@type": "Organization", name: business.name },
    publisher: { "@type": "Organization", name: business.name },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>
  <script type="application/ld+json">${JSON.stringify(faqSchema)}</script>`;
}

export function blogPostTemplate({ business, post, service, relatedPosts, services }) {
  return `
  <article>
    <section class="relative bg-ink overflow-hidden">
      <div class="absolute inset-0">
        <img src="/${post.heroImage}" alt="${post.title}" class="w-full h-full object-cover opacity-25" />
        <div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/90 to-ink/70"></div>
      </div>
      <div class="relative section py-16 sm:py-24 max-w-3xl">
        <p class="text-xs uppercase tracking-wide text-cream/50">
          <a href="/blog/" class="hover:text-brand-gold transition-colors">Blog</a>
          ${service ? ` &middot; <a href="/services/${service.slug}/" class="hover:text-brand-gold transition-colors">${service.name}</a>` : ""}
        </p>
        <h1 class="mt-4 text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-cream leading-tight text-balance">${post.title}</h1>
        <div class="mt-5 flex items-center gap-3 text-sm text-cream/60">
          <span>${post.displayDate}</span>
          <span>&middot;</span>
          <span>${post.readTime}</span>
        </div>
      </div>
    </section>

    <section class="py-16 sm:py-20">
      <div class="section max-w-3xl">
        <div class="rounded-sm border border-brand-green/20 bg-brand-green/5 p-6 sm:p-8">
          <h2 class="text-sm font-semibold uppercase tracking-wide text-brand-gold mb-4">Key Takeaways</h2>
          <ul class="space-y-3">
            ${post.keyTakeaways
              .map(
                (k) => `
            <li class="flex items-start gap-3">
              ${svgIcon("check", "w-5 h-5 text-brand-gold shrink-0 mt-0.5")}
              <span class="text-cream/75 text-sm leading-relaxed">${k}</span>
            </li>`
              )
              .join("\n")}
          </ul>
        </div>

        <div class="mt-10 prose-content">
          ${post.intro.map((p) => `<p class="text-cream/75 leading-relaxed mb-5">${p}</p>`).join("\n")}

          ${post.sections
            .map(
              (s) => `
          <h2 class="text-2xl font-display font-semibold text-cream mt-10 mb-4">${s.heading}</h2>
          ${s.body.map((p) => `<p class="text-cream/75 leading-relaxed mb-5">${p}</p>`).join("\n")}
          ${
            s.list
              ? `<ul class="space-y-3 mb-5">${s.list
                  .map(
                    (item) => `
            <li class="flex items-start gap-3">
              ${svgIcon("check", "w-5 h-5 text-brand-gold shrink-0 mt-0.5")}
              <span class="text-cream/75 leading-relaxed">${item}</span>
            </li>`
                  )
                  .join("\n")}</ul>`
              : ""
          }`
            )
            .join("\n")}
        </div>

        ${service ? `
        <div class="mt-12 rounded-sm bg-ink p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span class="eyebrow">Related Service</span>
            <h3 class="mt-2 text-xl font-display font-semibold text-cream">${service.name}</h3>
            <p class="mt-2 text-sm text-cream/60 leading-relaxed max-w-md">${service.shortDesc}</p>
          </div>
          <a href="/services/${service.slug}/" class="btn-gold shrink-0">View Service ${svgIcon("arrow", "w-4 h-4")}</a>
        </div>` : ""}
      </div>
    </section>

    <section class="py-16 sm:py-20 bg-surface border-y border-white/10">
      <div class="section max-w-3xl">
        <h2 class="text-2xl font-display font-semibold text-cream mb-8">Frequently Asked Questions</h2>
        <div class="space-y-3">
          ${post.faqs
            .map(
              (f) => `
          <details class="group rounded-sm border border-white/10 bg-white/5 open:bg-white/10 transition-colors">
            <summary class="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer font-medium text-cream list-none">
              <span>${f.q}</span>
              <span class="shrink-0 text-brand-gold transition-transform group-open:rotate-180">${svgIcon("chevronDown", "w-4 h-4")}</span>
            </summary>
            <div class="px-5 pb-4 text-sm text-cream/65 leading-relaxed">${f.a}</div>
          </details>`
            )
            .join("\n")}
        </div>
      </div>
    </section>

    ${relatedPosts.length ? `
    <section class="py-16 sm:py-24">
      <div class="section">
        <h2 class="text-2xl font-display font-semibold text-cream mb-8">Related Guides</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-group">
          ${relatedPosts.map((p) => postCard(p, services)).join("\n")}
        </div>
      </div>
    </section>` : ""}

    ${ctaBand({ business, heading: "Need This Sorted, Not Just Explained?" })}
  </article>
  `;
}

export function reviewsPageTemplate({ business, reviews, services }) {
  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
  return `
  <section class="relative bg-ink overflow-hidden">
    <div class="absolute inset-0">
      <img src="/assets/img/van.webp" alt="Quality Electrics van" class="w-full h-full object-cover opacity-25" />
      <div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/90 to-ink/70"></div>
    </div>
    <div class="relative section py-16 sm:py-24 max-w-2xl">
      <span class="eyebrow">Reviews</span>
      <h1 class="mt-4 text-4xl sm:text-5xl font-display font-semibold text-cream">What Our Customers Say</h1>
      <div class="mt-5 flex items-center gap-3">
        <span class="text-3xl font-display font-semibold text-cream">${avgRating}</span>
        <span class="text-brand-gold text-xl leading-none">${starString(Number(avgRating))}</span>
        <span class="text-cream/60">${reviews.length} Google reviews</span>
      </div>
    </div>
  </section>
  <section class="py-16 sm:py-24">
    <div class="section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-group">
      ${reviews.map((r) => reviewCard(r, services)).join("\n")}
    </div>
  </section>
  ${ctaBand({ business })}
  `;
}
