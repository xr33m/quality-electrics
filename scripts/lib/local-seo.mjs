/*
 * Content generators for service+area and area-hub pages.
 *
 * Goal: give each of the 49 service×area combination pages genuinely
 * distinct, locally-relevant content (not templated "mad-libs" text),
 * built from the real area/service data already in src/data/, rather
 * than hand-authoring 49 separate copies.
 */

// Classify an area's housing stock into one of a few buckets based on its
// propertyNote, so content can speak to the actual property type instead
// of generically to "your property".
export function propertyType(area) {
  const note = area.propertyNote.toLowerCase();
  if (note.includes("tenement") || note.includes("flat")) return "tenement";
  if (note.includes("new-build") || note.includes("new town")) return "newbuild";
  if (note.includes("cottage")) return "cottage";
  if (note.includes("commercial")) return "commercial";
  return "detached"; // detached/semi/period homes fallback
}

const propertyLabel = {
  tenement: "tenement and flatted properties",
  newbuild: "new-build homes",
  cottage: "traditional cottages and older homes",
  commercial: "commercial and mixed-use units",
  detached: "detached and semi-detached homes",
};

/*
 * Three area-specific FAQ builders per service. Each is a function of
 * (service, area) so the copy genuinely varies by both what the service
 * is and what kind of property is typical in that area.
 */
const areaFaqBuilders = {
  "ev-charger-installation": [
    (s, a) => ({
      q: `Can I get an EV charger fitted on a ${propertyLabel[propertyType(a)]} in ${a.name}?`,
      a:
        propertyType(a) === "tenement"
          ? `It depends on parking. Tenement flats in ${a.name} without private, off-street parking usually can't have a home charger fitted directly, since the supply and parking need to be linked to the same property. We can survey your specific situation and talk through options, including workplace or on-street charging schemes.`
          : `Yes — ${propertyLabel[propertyType(a)]} in ${a.name} are generally straightforward for a home charge point, provided there's off-street parking and a suitable route for the cable back to the consumer unit. We'll confirm this on the free survey.`,
    }),
    (s, a) => ({
      q: `How much does EV charger installation cost in ${a.name}?`,
      a: `Most home installations in ${a.name} fall within a standard fixed-price range, though the exact cost depends on cable run length and whether your consumer unit needs any work first. We'll give you a clear, no-obligation quote after a quick survey — no hidden extras.`,
    }),
    (s, a) => ({
      q: `Do you cover EV charger installs across ${a.region}?`,
      a: `Yes, we regularly install EV chargers across ${a.name} and the rest of ${a.region}, alongside the surrounding Glasgow areas.`,
    }),
  ],
  "domestic-commercial-rewiring": [
    (s, a) => ({
      q: `How disruptive is a rewire for ${propertyLabel[propertyType(a)]} in ${a.name}?`,
      a:
        propertyType(a) === "tenement"
          ? `Rewiring a tenement flat in ${a.name} is more contained than a house rewire since there's less floor area, but we still plan room-by-room to keep at least part of the flat usable throughout, and we're careful with shared stairwells and neighbouring flats.`
          : `For ${propertyLabel[propertyType(a)]} in ${a.name}, we work room by room so you're never without power to the whole property, and we protect flooring and finishes throughout.`,
    }),
    (s, a) => ({
      q: `Do older properties in ${a.name} need a full rewire or just a partial one?`,
      a: `It depends on the age and condition of the existing wiring, which we assess during an inspection rather than assuming. Many older ${propertyLabel[propertyType(a)]} in ${a.name} only need a partial rewire of specific circuits — we'll be upfront about what's actually needed.`,
    }),
    (s, a) => ({
      q: `Can you rewire commercial units in ${a.name}?`,
      a: `Yes — alongside domestic rewiring we handle commercial and business rewiring across ${a.name} and ${a.region}, typically scheduled around your trading hours to minimise disruption.`,
    }),
  ],
  "electrical-inspection-testing": [
    (s, a) => ({
      q: `Do landlords in ${a.name} legally need an EICR?`,
      a: `Yes — landlords letting property in Scotland, including in ${a.name}, have a legal duty to have a satisfactory Electrical Installation Condition Report (EICR) in place, generally renewed every five years. We're happy to confirm exactly where your property stands.`,
    }),
    (s, a) => ({
      q: `How long does an inspection take for ${propertyLabel[propertyType(a)]}?`,
      a:
        propertyType(a) === "commercial"
          ? `Commercial EICRs in ${a.name} vary with the size of the unit, but most are completed within a day, with a written report to follow.`
          : `Most domestic EICRs on ${propertyLabel[propertyType(a)]} in ${a.name} take a few hours on-site, and we'll talk you through any findings before we leave.`,
    }),
    (s, a) => ({
      q: `What happens if the inspection finds a problem?`,
      a: `We'll explain exactly what's classified as needing attention and why, give you a clear quote for any remedial work in ${a.name}, and there's never any pressure to book it with us on the spot.`,
    }),
  ],
  "consumer-unit-upgrades": [
    (s, a) => ({
      q: `Do ${propertyLabel[propertyType(a)]} in ${a.name} typically need a consumer unit upgrade?`,
      a:
        propertyType(a) === "tenement"
          ? `Many older tenement flats in ${a.name} still have outdated fuse boxes without modern RCD protection. If yours hasn't been touched in a while, it's worth a quick assessment — we'll tell you plainly whether an upgrade is actually needed.`
          : `Older ${propertyLabel[propertyType(a)]} in ${a.name} sometimes still run on outdated fuse boxes. We'll assess yours honestly rather than assuming an upgrade is needed just because the unit is old.`,
    }),
    (s, a) => ({
      q: `Is a consumer unit upgrade notifiable work in ${a.region}?`,
      a: `Yes, a consumer unit change is notifiable electrical work under Scottish building regulations. As a registered electrician, we self-certify this for you through our approved scheme, so you don't need to apply for a separate council warrant.`,
    }),
    (s, a) => ({
      q: `How long does a consumer unit upgrade take?`,
      a: `Most upgrades in ${a.name} are completed in a day, though you'll be without power for short periods while we work — we'll agree timing with you in advance.`,
    }),
  ],
  "commercial-installations-lighting": [
    (s, a) => ({
      q: `Do you work with businesses in ${a.name} outside normal hours?`,
      a: `Yes — commercial lighting and installation work in ${a.name} is often scheduled evenings or weekends specifically to avoid disrupting trading hours.`,
    }),
    (s, a) => ({
      q: `Can you help reduce lighting running costs for a unit in ${a.name}?`,
      a: `Yes, LED upgrades are one of the most common jobs we do for ${a.name} businesses — they typically cut lighting energy use significantly, and we'll quote clearly against your current setup so you can see the difference.`,
    }),
    (s, a) => ({
      q: `Do you handle both retail and office fit-outs in ${a.region}?`,
      a: `Yes, we cover retail, office, and hospitality electrical fit-outs across ${a.region}, from a single lighting circuit to a full commercial installation.`,
    }),
  ],
  "domestic-extensions-conversions": [
    (s, a) => ({
      q: `Do you work alongside builders on extensions in ${a.name}?`,
      a: `Yes — for extensions and conversions in ${a.name} we typically coordinate directly with your builder or architect so first-fix wiring happens at the right point in the build, not as an afterthought.`,
    }),
    (s, a) => ({
      q: `Can the existing consumer unit handle a new extension?`,
      a: `We check this as standard for ${propertyLabel[propertyType(a)]} in ${a.name} — if extra circuits mean your consumer unit is at capacity, we'll flag it and quote for any upgrade alongside the extension work.`,
    }),
    (s, a) => ({
      q: `Do loft or garage conversions need certified electrical work in ${a.region}?`,
      a: `Yes, new circuits in a conversion are notifiable work, which we self-certify as a registered electrician — so it's handled correctly without you needing to deal with the council directly.`,
    }),
  ],
  "kitchen-electrical-installations": [
    (s, a) => ({
      q: `Can you handle the electrics for a full kitchen renovation in ${a.name}?`,
      a: `Yes — we regularly work alongside kitchen fitters in ${a.name} covering everything from appliance circuits and under-cabinet lighting to sockets positioned exactly where your new layout needs them.`,
    }),
    (s, a) => ({
      q: `Do older ${propertyLabel[propertyType(a)]} in ${a.name} need extra circuits for a modern kitchen?`,
      a: `Often yes — modern kitchens draw more power than older wiring in ${propertyLabel[propertyType(a)]} was designed for, particularly with induction hobs and built-in appliances. We'll assess your existing circuits before quoting so nothing gets missed.`,
    }),
    (s, a) => ({
      q: `How do you coordinate timing with my kitchen fitter in ${a.name}?`,
      a: `We're used to working to a fitter's schedule — first-fix wiring before units go in, then final connections once appliances are in place. Just let us know your fitter's timeline and we'll fit around it.`,
    }),
  ],
};

export function serviceAreaFaqs(service, area) {
  const generic = (service.faqs || []).slice(0, 2);
  const builders = areaFaqBuilders[service.slug] || [];
  const local = builders.map((build) => build(service, area));
  return [...generic, ...local];
}

/*
 * A short, genuinely locally-relevant paragraph tying the service to the
 * area's actual housing/building stock, rather than a generic "we cover
 * all property types" line repeated on every page.
 */
export function propertyConsiderations(service, area) {
  const type = propertyType(area);
  const byType = {
    tenement: `Most of our work in ${area.name} is on ${area.character}. Tenement flats often mean shared stairwells, older meter rooms, and sometimes a shared supply to consider — we plan around all of that before we start, not after.`,
    newbuild: `${area.name} has a lot of ${area.character}, which usually means modern consumer units and cabling already in place — so work here is often more about additions and upgrades than replacing outdated infrastructure.`,
    cottage: `Around ${area.name} that means ${area.character} — properties where older cabling, solid stone or lath-and-plaster walls, and non-standard room layouts all affect how a job is planned and quoted.`,
    commercial: `In ${area.name} that spans ${area.character}, so jobs range from single-unit retail fixes to larger multi-circuit commercial installs, each scheduled to suit the business's trading hours.`,
    detached: `Around ${area.name} that means ${area.character} — typically larger properties with more circuits and, on older ones, wiring that's due a proper inspection before any major work goes ahead.`,
  };
  return byType[type];
}

/*
 * General regulatory/compliance context per service. Kept deliberately
 * cautious and non-jurisdictional-specific beyond what's confidently
 * true, with a steer toward confirming specifics directly rather than
 * asserting exact statutory detail on a live commercial site.
 */
const regulationsByService = {
  "ev-charger-installation": `Since 2022, new home and workplace EV chargers in Great Britain are legally required to have smart charging capability — every installation we carry out meets this as standard. We'll also flag the rare cases (such as listed buildings) where planning permission might apply.`,
  "domestic-commercial-rewiring": `A full or partial rewire counts as notifiable electrical work under Scottish building regulations. As a registered electrician, we self-certify this through our approved scheme on your behalf, so there's no separate building warrant application for you to manage.`,
  "electrical-inspection-testing": `Landlords letting residential property in Scotland have a legal duty to hold a satisfactory Electrical Installation Condition Report (EICR), generally renewed at least every five years. We'll tell you plainly where your property currently stands against that requirement.`,
  "consumer-unit-upgrades": `A consumer unit replacement is notifiable work under Scottish building regulations. We self-certify this as a registered electrician, so you avoid a separate council application while still getting the correct compliance paperwork.`,
  "commercial-installations-lighting": `Commercial electrical installations need to meet current wiring regulations (BS 7671) and, depending on scope, may be notifiable work — we handle certification as part of the job so your business has the right paperwork on file.`,
  "domestic-extensions-conversions": `New circuits added as part of an extension or conversion are notifiable electrical work. We self-certify this as a registered electrician, which is generally simpler than a separate building warrant route for the electrical element of the project.`,
  "kitchen-electrical-installations": `New circuits for kitchen appliances are notifiable electrical work under Scottish building regulations, which we self-certify as a registered electrician as standard as part of the job.`,
};

export function regulationsNote(service) {
  return regulationsByService[service.slug] || null;
}

/*
 * Service+areaServed JSON-LD for a service×area combination page.
 */
export function serviceAreaSchema({ business, service, area }) {
  const url = `https://${business.domain}/services/${service.slug}/${area.slug}/`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    name: `${service.name} in ${area.name}`,
    description: service.shortDesc,
    areaServed: {
      "@type": "City",
      name: area.name,
      containedInPlace: { "@type": "AdministrativeArea", name: area.region },
    },
    provider: {
      "@type": "Electrician",
      name: business.name,
      telephone: business.phoneDisplay,
      email: business.email,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
  const faqs = serviceAreaFaqs(service, area);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>
  <script type="application/ld+json">${JSON.stringify(faqSchema)}</script>`;
}

/*
 * LocalBusiness/Place JSON-LD for an area hub page.
 */
export function areaHubSchema({ business, area }) {
  const url = `https://${business.domain}/areas/${area.slug}/`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Electrician",
    name: `${business.name} — ${area.name}`,
    areaServed: {
      "@type": "City",
      name: area.name,
      containedInPlace: { "@type": "AdministrativeArea", name: area.region },
    },
    telephone: business.phoneDisplay,
    email: business.email,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

export function areaHubFaqs(area) {
  const type = propertyType(area);
  return [
    {
      q: `Do you cover all of ${area.name}?`,
      a: `Yes — we cover ${area.name} and the surrounding parts of ${area.region} in full, from ${area.character}.`,
    },
    {
      q: `How quickly can you get to ${area.name}?`,
      a: `We aim for a same-day response for most enquiries in ${area.name}. For anything urgent, calling us directly is fastest.`,
    },
    {
      q: `Do you work on ${propertyLabel[type]} specifically?`,
      a: `Yes — a large share of our work in ${area.name} is on ${propertyLabel[type]}, so we're familiar with the specific wiring and access considerations that come with them.`,
    },
    {
      q: `Are you registered and insured to work in ${area.name}?`,
      a: `Yes — we're NICEIC registered and fully insured for all domestic and commercial electrical work across ${area.name} and the wider Glasgow area.`,
    },
  ];
}

export function localBusinessSchema({ business, areas, reviews }) {
  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Electrician",
    name: business.name,
    image: `https://${business.domain}/assets/img/van.webp`,
    url: `https://${business.domain}/`,
    telephone: business.phoneHref.replace("tel:", ""),
    email: business.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Glasgow",
      addressRegion: "Scotland",
      addressCountry: "GB",
    },
    areaServed: areas.map((a) => ({ "@type": "City", name: a.name })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    sameAs: ["https://www.instagram.com/quality_electrics_ltd/"],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avgRating,
      reviewCount: reviews.length,
    },
  };
  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

export function serviceFaqSchema(service) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

// Simple, no-API-key Google Maps embed URL centered on an area.
export function mapEmbedUrl(area) {
  const q = encodeURIComponent(`${area.name}, ${area.region}, Scotland`);
  return `https://www.google.com/maps?q=${q}&output=embed`;
}
