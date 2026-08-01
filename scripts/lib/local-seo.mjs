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
  "pat-testing": [
    (s, a) => ({
      q: `Do you cover PAT testing for businesses and rentals in ${a.name}?`,
      a: `Yes — we regularly carry out PAT testing for offices, retail units, and rented ${propertyLabel[propertyType(a)]} across ${a.name} and the wider ${a.region} area.`,
    }),
    (s, a) => ({
      q: `Can you schedule PAT testing around our opening hours in ${a.name}?`,
      a: `Yes, most ${a.name} businesses have their equipment tested early morning, evening, or on a quiet trading day — we'll work around whatever suits you.`,
    }),
    (s, a) => ({
      q: `How many items are typically tested for a property in ${a.name}?`,
      a: `It varies hugely by property type — a single rented flat in ${a.name} might have a handful of items, while a commercial unit can run into hundreds. We'll give you an accurate estimate once we know your setup.`,
    }),
  ],
  "landlord-electrical-certificates": [
    (s, a) => ({
      q: `Do you provide landlord EICRs for ${propertyLabel[propertyType(a)]} in ${a.name}?`,
      a: `Yes, landlord EICRs are one of the most common jobs we carry out on ${propertyLabel[propertyType(a)]} across ${a.name} and ${a.region}, timed around tenancy changeovers wherever possible.`,
    }),
    (s, a) => ({
      q: `Can you work directly with my letting agent in ${a.name}?`,
      a: `Yes, we're happy to liaise directly with letting agents managing properties in ${a.name} to arrange access and share the finished report.`,
    }),
    (s, a) => ({
      q: `Do you manage certificate renewals for landlords with multiple properties in ${a.region}?`,
      a: `Yes, for landlords with more than one property across ${a.region} we can set up a rolling renewal schedule so nothing lapses unnoticed.`,
    }),
  ],
  "smoke-heat-alarm-installation": [
    (s, a) => ({
      q: `Do ${propertyLabel[propertyType(a)]} in ${a.name} usually meet the interlinked alarm standard already?`,
      a:
        propertyType(a) === "tenement"
          ? `Often not fully — older tenement flats in ${a.name} frequently have standalone battery alarms that were never interlinked. We'll assess what's already there against the standard before recommending anything.`
          : `It varies — some newer ${propertyLabel[propertyType(a)]} in ${a.name} were built to a more recent standard already, while older properties often need alarms upgraded or interlinked. We'll check yours honestly.`,
    }),
    (s, a) => ({
      q: `Can you fit interlinked alarms without major disruption in ${a.name}?`,
      a: `Yes — where full mains wiring isn't practical for a property in ${a.name}, wireless-interlinked alarms are a compliant option with minimal disruption.`,
    }),
    (s, a) => ({
      q: `Do you cover this across all of ${a.region}?`,
      a: `Yes, we install and certify interlinked smoke, heat, and CO alarm systems across ${a.name} and the rest of ${a.region}.`,
    }),
  ],
  "electrical-fault-finding-repairs": [
    (s, a) => ({
      q: `How quickly can you respond to a fault in ${a.name}?`,
      a: `We aim for same-day response to genuine electrical faults in ${a.name} and the surrounding ${a.region} area — call rather than email if it's urgent.`,
    }),
    (s, a) => ({
      q: `Are faults in ${propertyLabel[propertyType(a)]} usually different to other property types?`,
      a:
        propertyType(a) === "tenement"
          ? `Tenement flats in ${a.name} can have shared supplies or older wiring quirks that affect fault-finding, so it helps to have an electrician who's worked that property type before.`
          : `${propertyLabel[propertyType(a)]} in ${a.name} tend to have more circuits and greater load, which we account for when tracing a fault rather than assuming a simple single-circuit issue.`,
    }),
    (s, a) => ({
      q: `Do you fix the fault on the same visit in ${a.name}?`,
      a: `In most cases yes, once it's diagnosed — we carry common parts on the van specifically to avoid a second trip out to ${a.name} wherever possible.`,
    }),
  ],
  "domestic-lighting-installation": [
    (s, a) => ({
      q: `Do you plan lighting layouts for ${propertyLabel[propertyType(a)]} in ${a.name}?`,
      a: `Yes — we plan spacing and positioning specifically around ${propertyLabel[propertyType(a)]} in ${a.name} before any fitting goes in, rather than using a generic layout.`,
    }),
    (s, a) => ({
      q: `Can you fit downlights without disturbing period ceilings in ${a.name}?`,
      a:
        propertyType(a) === "cottage"
          ? `We take particular care with older ceiling constructions common in ${a.name}, checking what's above before cutting anything.`
          : `Yes, most ceiling types in ${a.name} are straightforward for downlight installation, and we'll flag it clearly if yours needs a different approach.`,
    }),
    (s, a) => ({
      q: `Do you cover full-home lighting projects in ${a.region}?`,
      a: `Yes, from a single room upgrade to a full-home lighting plan across ${a.name} and ${a.region}.`,
    }),
  ],
  "security-lighting-installation": [
    (s, a) => ({
      q: `Where do you recommend security lighting for homes in ${a.name}?`,
      a: `It depends on the property, but entry points and approach routes matter most — we'll walk the property with you in ${a.name} and recommend positions based on how it's actually accessed.`,
    }),
    (s, a) => ({
      q: `Do you install security lighting for businesses in ${a.name} as well as homes?`,
      a: `Yes, from single domestic floodlights through to full perimeter lighting for commercial premises across ${a.name} and ${a.region}.`,
    }),
    (s, a) => ({
      q: `Can this be added to an existing outdoor circuit in ${a.name}?`,
      a: `Often yes, provided the circuit has capacity — we'll check this on-site for your property in ${a.name} before quoting.`,
    }),
  ],
  "garden-outdoor-lighting": [
    (s, a) => ({
      q: `Do you design garden lighting schemes for properties in ${a.name}?`,
      a: `Yes — we plan feature, path, and patio lighting around how a garden in ${a.name} is actually used, not just fit generic spotlights.`,
    }),
    (s, a) => ({
      q: `Is low-voltage garden lighting suitable for gardens in ${a.name}?`,
      a: `For most garden and feature lighting in ${a.name}, yes — it's safer to install and cheaper to run than a full mains circuit for the same effect.`,
    }),
    (s, a) => ({
      q: `Can you coordinate lighting with landscaping work in ${a.region}?`,
      a: `Yes, we regularly coordinate with landscapers and builders working on gardens across ${a.region}, so cable goes in at the right stage.`,
    }),
  ],
  "new-socket-switch-installations": [
    (s, a) => ({
      q: `Can you add sockets to older wiring in ${propertyLabel[propertyType(a)]} in ${a.name}?`,
      a:
        propertyType(a) === "tenement" || propertyType(a) === "cottage"
          ? `Usually yes, though we check the existing circuit's condition and capacity first on older ${propertyLabel[propertyType(a)]} in ${a.name} before adding to it.`
          : `Yes — for ${propertyLabel[propertyType(a)]} in ${a.name}, adding sockets to an existing circuit is usually straightforward once we've checked its capacity.`,
    }),
    (s, a) => ({
      q: `Do you chase cable into walls in ${a.name} for a clean finish?`,
      a: `Yes, chasing and making good is our standard approach for properties in ${a.name}, unless you specifically prefer surface-mounted trunking.`,
    }),
    (s, a) => ({
      q: `How quickly can you fit a couple of extra sockets in ${a.name}?`,
      a: `Small socket and switch jobs in ${a.name} are usually straightforward to book in quickly — get in touch and we'll confirm availability.`,
    }),
  ],
  "electric-heating-thermostats": [
    (s, a) => ({
      q: `Do you fit electric heating for ${propertyLabel[propertyType(a)]} in ${a.name} without mains gas?`,
      a: `Yes, this is a common job for ${propertyLabel[propertyType(a)]} in ${a.name} and across ${a.region} that aren't connected to mains gas.`,
    }),
    (s, a) => ({
      q: `Can you wire heating out to a garden room or outbuilding in ${a.name}?`,
      a: `Yes, including running the supply from the main property where needed — a common request from homeowners in ${a.name} with garden offices or outbuildings.`,
    }),
    (s, a) => ({
      q: `Do you fit and configure smart thermostats for homes in ${a.region}?`,
      a: `Yes, including Hive and similar systems, wired and set up properly for homes across ${a.name} and ${a.region}.`,
    }),
  ],
  "data-network-cabling": [
    (s, a) => ({
      q: `Do you install home office data cabling in ${a.name}?`,
      a: `Yes, structured data cabling for home offices is a regular job for us across ${a.name} and the wider ${a.region} area.`,
    }),
    (s, a) => ({
      q: `Can you set up a small business network in ${a.name} from scratch?`,
      a: `Yes, including planning point positions, running cabling, and terminating everything properly for businesses in ${a.name}.`,
    }),
    (s, a) => ({
      q: `Is this easy to add to ${propertyLabel[propertyType(a)]} in ${a.name}?`,
      a:
        propertyType(a) === "tenement"
          ? `It depends on access — tenement flats in ${a.name} can be more limited for cable routes, so we'll assess this properly before quoting.`
          : `Generally yes for ${propertyLabel[propertyType(a)]} in ${a.name}, particularly where there's loft or underfloor access to route cable through.`,
    }),
  ],
  "extractor-fan-installation": [
    (s, a) => ({
      q: `Do older ${propertyLabel[propertyType(a)]} in ${a.name} typically need extractor fan upgrades?`,
      a:
        propertyType(a) === "tenement" || propertyType(a) === "cottage"
          ? `Often yes — older bathrooms in ${propertyLabel[propertyType(a)]} in ${a.name} were frequently built without proper extraction, which we're regularly asked to fix.`
          : `Sometimes — it depends on the age of the bathroom or kitchen fit-out in your ${propertyLabel[propertyType(a)]} in ${a.name}, which we'll assess honestly before recommending anything.`,
    }),
    (s, a) => ({
      q: `Can extractor fans be ducted properly in ${a.name} properties?`,
      a: `In the vast majority of cases yes — we'll find the shortest practical route to the outside for properties in ${a.name}, rather than venting into a loft space.`,
    }),
    (s, a) => ({
      q: `Do you fit fans for both bathrooms and kitchens in ${a.region}?`,
      a: `Yes, bathroom, kitchen, and utility room extraction across ${a.name} and ${a.region}.`,
    }),
  ],
  "emergency-electrical-callouts": [
    (s, a) => ({
      q: `How fast can you get to an emergency in ${a.name}?`,
      a: `We aim for same-day response to genuine electrical emergencies in ${a.name} and across ${a.region} — call rather than email if it's urgent.`,
    }),
    (s, a) => ({
      q: `Do you cover emergency callouts for businesses in ${a.name}?`,
      a: `Yes, including commercial premises in ${a.name} losing power during trading hours, where getting back up and running quickly matters.`,
    }),
    (s, a) => ({
      q: `Is the call-out charge the same across ${a.region}?`,
      a: `Yes, it's a fixed call-out charge regardless of exactly where in ${a.name} or ${a.region} you're based, agreed with you before we head out.`,
    }),
  ],
  "three-phase-power-installations": [
    (s, a) => ({
      q: `Do you install three-phase supplies for businesses in ${a.name}?`,
      a: `Yes, three-phase installations and upgrades are a regular job for us across commercial and industrial premises in ${a.name} and ${a.region}.`,
    }),
    (s, a) => ({
      q: `Can you coordinate a DNO application for a site in ${a.name}?`,
      a: `Yes, where a new or upgraded supply is needed for a premises in ${a.name}, we handle the coordination with the distribution network operator as part of the job.`,
    }),
    (s, a) => ({
      q: `Do you work with existing commercial units in ${a.region}, not just new builds?`,
      a: `Yes, most of our three-phase work in ${a.region} is upgrading or extending an existing supply for a business that's grown into needing it, not just new-build installations.`,
    }),
  ],
  "warehouse-industrial-electrical": [
    (s, a) => ({
      q: `Do you cover warehouse and industrial units in ${a.name}?`,
      a: `Yes, we carry out warehouse and industrial electrical installations across ${a.name} and the wider ${a.region} area.`,
    }),
    (s, a) => ({
      q: `Can you work alongside other trades on a fit-out in ${a.name}?`,
      a: `Yes, coordinating with other trades on live fit-outs in ${a.name} is a standard part of this work for us.`,
    }),
    (s, a) => ({
      q: `Do you handle machinery power supplies for sites in ${a.region}?`,
      a: `Yes, including assessing specific machinery requirements and running dedicated, correctly rated supplies for industrial units across ${a.region}.`,
    }),
  ],
  "high-bay-warehouse-lighting": [
    (s, a) => ({
      q: `Do you install high-bay lighting for warehouses in ${a.name}?`,
      a: `Yes, high-bay LED lighting installations and upgrades are a regular job for us across warehouses and industrial units in ${a.name} and ${a.region}.`,
    }),
    (s, a) => ({
      q: `Can lighting upgrades be phased for a site in ${a.name}?`,
      a: `Yes, a phased approach across sections of a warehouse in ${a.name} is common and lets you spread the cost while operations continue.`,
    }),
    (s, a) => ({
      q: `Do you work at height safely on live sites in ${a.region}?`,
      a: `Yes, we follow proper working-at-height procedures for high-bay lighting work across ${a.region}, coordinating access equipment and scheduling with your site.`,
    }),
  ],
  "ev-fleet-forklift-charging": [
    (s, a) => ({
      q: `Do you install fleet charging infrastructure for businesses in ${a.name}?`,
      a: `Yes, fleet EV and forklift charging installations are a service we provide for businesses across ${a.name} and ${a.region}.`,
    }),
    (s, a) => ({
      q: `Can you assess our supply capacity before recommending charge points in ${a.name}?`,
      a: `Yes, we always assess existing supply capacity for a site in ${a.name} before recommending a specific number of charge points or whether load management is the better option.`,
    }),
    (s, a) => ({
      q: `Do you handle both EV fleet and forklift charging for depots in ${a.region}?`,
      a: `Yes, we cover both fleet vehicle charging and warehouse equipment charging like forklifts for depots and warehouses across ${a.region}.`,
    }),
  ],
  "cctv-installation": [
    (s, a) => ({
      q: `Do you install CCTV for ${propertyLabel[propertyType(a)]} in ${a.name}?`,
      a: `Yes, CCTV installation is a regular job for us on ${propertyLabel[propertyType(a)]} across ${a.name} and ${a.region}, planned around the property's actual entry points.`,
    }),
    (s, a) => ({
      q: `Can you set up remote CCTV viewing for a property in ${a.name}?`,
      a: `Yes, remote viewing from your phone is set up and tested as standard for CCTV installations in ${a.name}.`,
    }),
    (s, a) => ({
      q: `Do you cover commercial CCTV installations in ${a.region}?`,
      a: `Yes, from single-camera home setups through to multi-camera commercial coverage across ${a.region}.`,
    }),
  ],
  "battery-storage-installation": [
    (s, a) => ({
      q: `Do you install battery storage for homes in ${a.name}?`,
      a: `Yes, battery storage installation and consumer unit integration is a service we provide for homes and businesses across ${a.name} and ${a.region}.`,
    }),
    (s, a) => ({
      q: `Can battery storage work with an existing solar setup in ${a.name}?`,
      a: `Yes, we regularly integrate battery storage with existing solar panel systems for properties in ${a.name}.`,
    }),
    (s, a) => ({
      q: `Is battery storage worth it for properties in ${a.region} without solar?`,
      a: `It can be, particularly on an off-peak tariff — we'll give you an honest assessment for your specific property in ${a.region} rather than a generic answer.`,
    }),
  ],
  "alarm-system-installation": [
    (s, a) => ({
      q: `Do you install alarm systems for ${propertyLabel[propertyType(a)]} in ${a.name}?`,
      a: `Yes, alarm system installation is a service we provide for ${propertyLabel[propertyType(a)]} across ${a.name} and ${a.region}, with zones planned around the property.`,
    }),
    (s, a) => ({
      q: `Can you fix an existing alarm system that keeps false-triggering in ${a.name}?`,
      a: `Yes, we can assess and correct an existing system's sensitivity and positioning for a property in ${a.name}, rather than automatically recommending full replacement.`,
    }),
    (s, a) => ({
      q: `Do you install alarm systems for commercial premises in ${a.region}?`,
      a: `Yes, including zoned systems for larger commercial premises with multiple access points across ${a.region}.`,
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
  "pat-testing": `The Electricity at Work Regulations 1989 require electrical equipment to be maintained in a safe condition — PAT testing is the recognised way to demonstrate this, and many insurers and letting agreements treat it as a practical requirement.`,
  "landlord-electrical-certificates": `Private landlords in Scotland have a legal duty under the Repairing Standard to hold a satisfactory Electrical Installation Condition Report, generally renewed at least every five years. We'll confirm exactly where your property stands.`,
  "smoke-heat-alarm-installation": `Since February 2022, all homes in Scotland — owned, rented, or social housing — are legally required to have interlinked smoke, heat, and where relevant carbon monoxide alarms fitted to the current standard.`,
  "electrical-fault-finding-repairs": `Repairs to existing circuits are generally not notifiable work in themselves, but any new circuit added as part of a repair is — we'll flag this and handle certification as part of the job where it applies.`,
  "domestic-lighting-installation": `Additions to an existing lighting circuit are generally not notifiable, though a new dedicated circuit for extensive lighting work may be — we'll confirm this and provide a minor works certificate where appropriate.`,
  "security-lighting-installation": `Outdoor electrical installations need to meet current wiring regulations (BS 7671) for weatherproofing and protection, and we test and certify every installation on completion.`,
  "garden-outdoor-lighting": `Outdoor lighting circuits, particularly mains-wired schemes, need to meet current wiring regulations for outdoor and buried cable installations — we test and certify all garden lighting work on completion.`,
  "new-socket-switch-installations": `Adding sockets to an existing circuit is generally not notifiable work in the way a new circuit is, though we'll confirm this for your specific job and provide appropriate certification.`,
  "electric-heating-thermostats": `A new dedicated circuit for electric heating is generally notifiable electrical work under Scottish building regulations, which we self-certify as a registered electrician as standard.`,
  "data-network-cabling": `Data cabling itself isn't electrical work in the regulatory sense, but where it's combined with new power points or circuits, that element is handled and certified to BS 7671 as standard.`,
  "extractor-fan-installation": `Building Regulations Part F sets ventilation requirements for bathrooms and kitchens, and a new dedicated circuit for a fan is generally notifiable electrical work, which we self-certify as a registered electrician.`,
  "emergency-electrical-callouts": `Any remedial work carried out during an emergency callout is tested and, where the scope requires it, certified to BS 7671 in the same way as scheduled work — an emergency visit doesn't mean cutting corners on paperwork.`,
  "three-phase-power-installations": `Three-phase installations must meet current BS 7671 wiring regulations, and new or upgraded supplies typically require formal application to and approval from the local distribution network operator (DNO).`,
  "warehouse-industrial-electrical": `Industrial and warehouse electrical installations are certified to BS 7671, and larger installations are generally notifiable electrical work under Scottish building regulations, which we self-certify as a registered electrician.`,
  "high-bay-warehouse-lighting": `New lighting circuits for warehouse and industrial premises are generally notifiable electrical work under Scottish building regulations, self-certified as standard, and all installations meet current BS 7671 wiring regulations.`,
  "ev-fleet-forklift-charging": `Fleet and multi-point charging installations are notifiable electrical work under Scottish building regulations and must meet BS 7671 requirements for EV charging equipment, including appropriate earthing and load management provisions.`,
  "cctv-installation": `CCTV wiring and power supply work is carried out to BS 7671 as standard; CCTV installation itself is not typically notifiable electrical work, though any new dedicated circuit added to support it may be.`,
  "battery-storage-installation": `Battery storage systems connected to a property's electrical installation are notifiable electrical work under Scottish building regulations, self-certified as a registered electrician, and installed to BS 7671 and relevant battery storage installation standards.`,
  "alarm-system-installation": `Alarm system wiring and power supply work is carried out to BS 7671 as standard; installation itself is not typically notifiable electrical work, though any new dedicated circuit added to support it may be.`,
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
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
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
    mainEntity: [...service.concerns, ...service.faqs].map((f) => ({
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
