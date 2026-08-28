export const newPosts = [
  {
    slug: "what-is-an-eicr",
    service: "electrical-inspection-testing",
    title: "What Is an EICR? A Plain-English Guide",
    metaTitle: "What Is an EICR? Plain-English Guide | Quality Electrics",
    metaDescription: "What an EICR actually checks, who needs one, and what the different fault codes mean — explained without the jargon.",
    excerpt: "EICR gets thrown around a lot without much explanation. Here's what the report actually checks, who legally needs one, and what those C1/C2/C3 codes on the results mean.",
    readTime: "6 min read",
    publishDate: "2026-08-04",
    displayDate: "4 August 2026",
    heroImage: "assets/img/distribution-board.webp",
    keyTakeaways: [
      "An EICR is a formal inspection of a property's fixed electrical installation, not the appliances plugged into it",
      "It results in a report classified as satisfactory or unsatisfactory, with any issues coded by severity",
      "Scottish landlords have a legal duty to hold a satisfactory EICR, renewed at least every five years",
      "A domestic inspection typically takes a few hours and doesn't usually require major disruption"
    ],
    intro: [
      "EICR is one of those terms that gets mentioned constantly around property, mortgages, and renting, but rarely gets properly explained. It stands for Electrical Installation Condition Report, and it's essentially a formal health check for the fixed wiring in a building.",
      "Here's what it actually involves, what the results mean, and when you genuinely need one."
    ],
    sections: [
      {
        heading: "What actually gets inspected",
        body: [
          "An EICR looks at the fixed parts of a property's electrical installation — the wiring itself, the consumer unit, sockets, switches, and earthing and bonding arrangements. It's not checking your appliances or anything plugged in; that's what PAT testing covers separately.",
          "The inspection combines a visual check with a series of electrical tests: earth continuity, insulation resistance, and how quickly protective devices like RCDs actually trip. It's a proper diagnostic process, not a walk-round with a torch."
        ]
      },
      {
        heading: "What the report classifications mean",
        body: [
          "The finished report is classified as either satisfactory or unsatisfactory, and any issues found are coded by severity. A C1 means danger present, requiring immediate action. A C2 means potentially dangerous, requiring urgent remedial work. A C3 is an improvement recommended, but not a safety failure in itself. FI simply means further investigation is needed to reach a conclusion on a specific point.",
          "Only C1 and C2 codes make a report unsatisfactory overall — a report with only C3 observations can still be classified satisfactory, which surprises a lot of people expecting a strict pass or fail."
        ]
      },
      {
        heading: "Who actually needs one",
        body: [
          "Landlords letting residential property in Scotland have a clear legal duty to hold a satisfactory EICR, generally renewed at least every five years. Homeowners aren't legally required to have one, but it's commonly requested by mortgage lenders, insurers, and buyers during a property sale."
        ]
      },
      {
        heading: "How long it actually takes",
        body: [
          "For a typical domestic property, an inspection usually takes a few hours on-site, with the written report following within a couple of working days. It's not usually disruptive — the electrician isolates circuits briefly for testing rather than cutting power for extended periods."
        ]
      }
    ],
    faqs: [
      {
        q: "How is an EICR different from a PAT test?",
        a: "An EICR checks the fixed wiring and installation of a property. PAT testing checks portable appliances plugged into it. They cover different things and neither replaces the other."
      },
      {
        q: "What happens if my EICR comes back unsatisfactory?",
        a: "You'll get a clear breakdown of what's been coded C1 or C2 and why, along with a quote for the remedial work needed to bring it back to a satisfactory standard."
      },
      {
        q: "Can I get an EICR done quickly if I need one urgently?",
        a: "Often yes, particularly for a single domestic property — get in touch and we'll do our best to fit you in around a tight deadline."
      },
      {
        q: "Is an EICR the same as a Building Warrant?",
        a: "No — an EICR is a condition report on existing wiring, while a Building Warrant relates to approval for new building work. They're separate processes."
      }
    ],
    relatedSlugs: ["eicr-landlord-guide-scotland", "how-long-does-an-eicr-last", "how-much-does-an-eicr-cost"]
  },
  {
    slug: "what-is-an-rcd",
    service: "consumer-unit-upgrades",
    title: "What Is an RCD and Why Does It Matter?",
    metaTitle: "What Is an RCD? How It Protects Your Home | Quality Electrics",
    metaDescription: "What an RCD actually does, how it's different from a fuse, and how to tell if your consumer unit has proper RCD protection.",
    excerpt: "RCD gets mentioned on every electrical report but rarely explained. Here's what it actually does, how it differs from a fuse, and why it's the single biggest safety upgrade in most older homes.",
    readTime: "5 min read",
    publishDate: "2026-08-11",
    displayDate: "11 August 2026",
    heroImage: "assets/img/distribution-board.webp",
    keyTakeaways: [
      "An RCD detects tiny imbalances in current and cuts power fast enough to prevent a fatal shock",
      "It's a different kind of protection to a fuse or MCB, which respond to overload and short circuits, not shock risk",
      "Many older fuse boxes have no RCD protection at all, or only cover some circuits",
      "Modern consumer units fit RCD protection — usually via RCBOs — on every circuit individually"
    ],
    intro: [
      "RCD stands for Residual Current Device, and it's arguably the single most important piece of safety equipment in a modern consumer unit — yet most people couldn't explain what it actually does if asked.",
      "Here's the plain version, and how to check whether your home actually has it."
    ],
    sections: [
      {
        heading: "What an RCD actually detects",
        body: [
          "An RCD constantly monitors the current flowing out through the live wire against the current flowing back through the neutral. In a healthy circuit, those two figures match. If some current is leaking to earth — through a person, water, or damaged cable — there's an imbalance, and the RCD detects it.",
          "When it detects a leak above a set threshold, typically 30mA for personal protection, it disconnects the circuit in under 40 milliseconds. That speed is what makes the difference between a shock and a fatal one."
        ]
      },
      {
        heading: "How this is different from a fuse or MCB",
        body: [
          "A standard fuse or MCB (miniature circuit breaker) protects against overload and short circuits — too much current flowing through the wire itself, which risks fire. It has no way of detecting current leaking to earth through a person, which is a completely different failure mode.",
          "That's why a property can have fuses or MCBs that work perfectly and still offer no protection against electric shock — the two systems are solving different problems."
        ]
      },
      {
        heading: "How to tell if your home has RCD protection",
        body: [
          "Open your consumer unit and look for a device labelled RCD, or individual breakers labelled RCBO — these combine both overload and RCD protection in one unit per circuit. If you see only rows of plain MCBs, or worse, an old fuse box with rewireable fuses, there's likely no RCD protection at all."
        ]
      },
      {
        heading: "Why older homes are often missing it",
        body: [
          "RCD protection wasn't a standard requirement for most circuits until relatively recently in UK wiring regulations. Plenty of homes with wiring that's otherwise sound simply predate the requirement — which is usually the actual reason an older consumer unit gets flagged on an inspection, rather than the wiring itself being faulty."
        ]
      }
    ],
    faqs: [
      {
        q: "Can I add an RCD without a full consumer unit upgrade?",
        a: "Sometimes a single RCD module can be added, but a full upgrade to individual RCBOs per circuit is usually the better long-term fix, since one circuit tripping won't take out the whole board."
      },
      {
        q: "Why does my RCD trip when I plug something in?",
        a: "Usually a faulty appliance leaking current, or occasionally a damp outdoor connection. It's doing its job — worth getting the specific cause diagnosed rather than just resetting it repeatedly."
      },
      {
        q: "Is one RCD enough for the whole house?",
        a: "It's better than nothing, but if it trips, everything on that RCD loses power at once. Individual RCBOs per circuit mean only the affected circuit trips."
      },
      {
        q: "Do I need RCD protection to sell my house?",
        a: "It's not a strict legal requirement to sell, but it's frequently flagged on surveys and EICRs, and buyers increasingly expect it."
      }
    ],
    relatedSlugs: ["what-is-an-rcbo", "what-is-surge-protection", "consumer-unit-upgrade-cost-guide"]
  },
  {
    slug: "how-long-does-an-eicr-last",
    service: "electrical-inspection-testing",
    title: "How Long Does an EICR Last?",
    metaTitle: "How Long Does an EICR Last? | Quality Electrics",
    metaDescription: "How long an EICR stays valid for homeowners, landlords, and commercial premises in Scotland, and what actually triggers an earlier renewal.",
    excerpt: "The honest answer depends on who owns the property and what it's used for. Here's the actual timeline for homeowners, landlords, and commercial premises.",
    readTime: "5 min read",
    publishDate: "2026-08-18",
    displayDate: "18 August 2026",
    heroImage: "assets/img/tenement.webp",
    keyTakeaways: [
      "For rented residential property in Scotland, an EICR is generally valid for five years",
      "Commercial premises and older installations are often recommended a shorter interval",
      "There's no fixed legal expiry for owner-occupied homes, though it's still good practice to renew periodically",
      "Certain events — like a failed report or major electrical work — can trigger the need for a fresh EICR earlier"
    ],
    intro: [
      "\"How long does an EICR last?\" is one of the most common follow-up questions we get after explaining what one actually is, and the honest answer depends on what the property's used for.",
      "Here's the breakdown by property type, plus the situations that can force a renewal earlier than expected."
    ],
    sections: [
      {
        heading: "Rented residential property",
        body: [
          "For private rented housing in Scotland, the standard interval is five years, or sooner if the previous report recommends it. Landlords have a legal duty to keep a satisfactory report in place continuously — not just get one done once and forget about it."
        ]
      },
      {
        heading: "Owner-occupied homes",
        body: [
          "There's no fixed legal expiry for a homeowner's own EICR, since there's no statutory duty to have one at all. That said, most electricians recommend renewing every ten years for a standard domestic property, or five years if the property is older or the last inspection flagged concerns worth monitoring."
        ]
      },
      {
        heading: "Commercial and industrial premises",
        body: [
          "Commercial properties are often recommended shorter intervals — frequently five years, sometimes less depending on the type of premises and how the electrical installation is used. Higher-risk environments, like those with heavy machinery or public access, often warrant more frequent inspection regardless of any specific legal minimum."
        ]
      },
      {
        heading: "What can trigger an earlier renewal",
        body: [
          "A change of tenancy, a failed or unsatisfactory previous report, significant electrical work being carried out, or simply a specific recommendation on the last EICR for an earlier re-check can all mean a fresh inspection is needed before the standard interval is up."
        ]
      }
    ],
    faqs: [
      {
        q: "Does the five-year clock reset after remedial work?",
        a: "Remedial work fixes the specific issues found — a fresh EICR (or at minimum a minor works certificate for the fix) confirms the property's now satisfactory, and the renewal clock generally runs from that inspection."
      },
      {
        q: "What happens if my landlord EICR lapses?",
        a: "You'd be in breach of the legal duty to hold a satisfactory report — worth booking a renewal well before the expiry date rather than after it's lapsed."
      },
      {
        q: "Do I need a new EICR every time I get a new tenant?",
        a: "Not necessarily, provided your existing EICR is still within its valid period and remains satisfactory — but it's worth checking the exact date rather than assuming."
      },
      {
        q: "Can you remind me before my EICR is due for renewal?",
        a: "Yes — we can set up a renewal reminder so it's a scheduled visit rather than a scramble against a deadline."
      }
    ],
    relatedSlugs: ["what-is-an-eicr", "eicr-landlord-guide-scotland", "do-i-need-an-eicr-to-sell-my-house"]
  },
  {
    slug: "what-is-surge-protection",
    service: "consumer-unit-upgrades",
    title: "What Is Surge Protection, and Do You Actually Need It?",
    metaTitle: "What Is Surge Protection? Do You Need It? | Quality Electrics",
    metaDescription: "What a surge protection device (SPD) actually does, what causes power surges, and whether your home genuinely needs one fitted.",
    excerpt: "Surge protection gets offered on almost every consumer unit quote now. Here's what it actually protects against, and how to judge whether it's worth it for your home.",
    readTime: "5 min read",
    publishDate: "2026-08-25",
    displayDate: "25 August 2026",
    heroImage: "assets/img/home-office-lighting.webp",
    keyTakeaways: [
      "A surge protection device (SPD) guards against sudden voltage spikes reaching your home's electronics",
      "Surges can come from lightning strikes, the grid itself, or even large appliances switching off nearby",
      "UK wiring regulations now require an SPD risk assessment on new and upgraded consumer units",
      "It's a one-off fit into the consumer unit, not something added per appliance"
    ],
    intro: [
      "Surge protection has gone from a rarely-mentioned extra to something offered on nearly every consumer unit upgrade quote, and understandably, people want to know whether it's a genuine necessity or an upsell.",
      "Here's what it does, and how the current regulations actually treat it."
    ],
    sections: [
      {
        heading: "What a power surge actually is",
        body: [
          "A power surge is a brief, sudden spike in voltage above the normal supply level. It can come from a lightning strike near the property, switching events on the wider electricity grid, or even large appliances and motors switching off elsewhere in the building, which can send a brief spike back through shared wiring.",
          "These spikes are usually far too brief to trip a breaker, but they can be more than enough to damage sensitive electronics — think TVs, boilers with electronic controls, and anything with a circuit board."
        ]
      },
      {
        heading: "What a surge protection device does",
        body: [
          "A surge protection device (SPD) sits in the consumer unit and diverts excess voltage safely to earth before it can reach the circuits feeding your sockets and appliances. It's a single component fitted once, rather than something you'd need on every individual plug."
        ]
      },
      {
        heading: "Is it actually required?",
        body: [
          "Current UK wiring regulations require an SPD risk assessment whenever a consumer unit is installed or upgraded, weighing factors like the consequences of a surge (data loss, safety systems, etc.) against the likelihood of one occurring. In many cases, particularly properties with a lot of connected electronics or in areas more exposed to lightning activity, that assessment concludes an SPD is genuinely warranted, not just a nice-to-have."
        ]
      },
      {
        heading: "What it doesn't cover",
        body: [
          "An SPD protects against external and grid-related surges, not a direct lightning strike on the property itself, and it doesn't replace good practice like unplugging genuinely sensitive equipment during severe storms. It's one solid layer of protection, not a total guarantee."
        ]
      }
    ],
    faqs: [
      {
        q: "Can surge protection be added without a full consumer unit upgrade?",
        a: "In some cases yes, if there's suitable space in the existing unit — we'll assess this and let you know honestly whether it's straightforward or whether a fuller upgrade makes more sense."
      },
      {
        q: "Does surge protection stop appliances breaking from everyday use?",
        a: "No — that's general wear and tear, not what an SPD is designed for. It specifically addresses voltage spikes, not mechanical or age-related failure."
      },
      {
        q: "Is surge protection worth it for a small flat?",
        a: "It depends on the risk assessment for that specific property — we'll give you an honest answer rather than a blanket yes, based on what's actually connected and the supply situation."
      },
      {
        q: "How much does adding an SPD typically cost?",
        a: "It's a relatively small addition compared to the rest of a consumer unit upgrade — we'll quote it clearly alongside the main job so you can see it as a separate line item."
      }
    ],
    relatedSlugs: ["what-is-an-rcd", "what-is-an-rcbo", "consumer-unit-upgrade-cost-guide"]
  },
  {
    slug: "what-is-an-rcbo",
    service: "consumer-unit-upgrades",
    title: "What Is an RCBO? RCD vs RCBO Explained",
    metaTitle: "What Is an RCBO? RCD vs RCBO Explained | Quality Electrics",
    metaDescription: "What an RCBO actually is, how it combines RCD and MCB protection, and why modern consumer units use one per circuit.",
    excerpt: "RCBO is one of the more confusing acronyms in home electrics — mostly because it's doing the job of two older devices at once. Here's what it means in practice.",
    readTime: "5 min read",
    publishDate: "2026-09-01",
    displayDate: "1 September 2026",
    heroImage: "assets/img/distribution-board.webp",
    keyTakeaways: [
      "An RCBO combines the functions of an RCD (shock protection) and an MCB (overload protection) in a single device",
      "Modern consumer units typically fit one RCBO per circuit, rather than sharing an RCD across several",
      "This means a fault on one circuit trips only that circuit, not several at once",
      "RCBOs are more expensive per circuit than a shared RCD setup, but offer better fault isolation"
    ],
    intro: [
      "RCBO is one of those acronyms that shows up on a quote and rarely gets unpacked properly, mostly because it's really two other acronyms combined into one device — RCD and MCB.",
      "Here's what it actually means, and why it's become the standard for modern consumer units."
    ],
    sections: [
      {
        heading: "Breaking down what it combines",
        body: [
          "RCBO stands for Residual Current Breaker with Overcurrent protection. It combines what an MCB does — protecting against overload and short-circuit current that could cause a fire — with what an RCD does — detecting current leaking to earth that could cause an electric shock. One device, two jobs."
        ]
      },
      {
        heading: "Why this matters compared to an older setup",
        body: [
          "Older consumer units often used a single shared RCD covering several circuits at once, alongside separate individual MCBs. The problem with that setup is that a fault on any one of those circuits trips the shared RCD, which takes out every circuit connected to it — lights, sockets, and everything else on that side of the board goes off together.",
          "With an RCBO fitted per circuit, a fault on your kitchen sockets trips only the kitchen sockets. The rest of the property, including the lights, stays on. It's a genuinely practical improvement, not just a technical upgrade."
        ]
      },
      {
        heading: "Why not every consumer unit has always used them",
        body: [
          "Cost is the main reason — RCBOs are individually more expensive than plain MCBs paired with a shared RCD, so older installations, especially in properties fitted out before RCBOs became the practical standard, often used the cheaper shared arrangement instead."
        ]
      },
      {
        heading: "What this means for a consumer unit upgrade",
        body: [
          "When we upgrade an older board, moving to individual RCBOs per circuit is standard practice now, not an optional extra — it's a meaningfully better setup for very little extra cost once you're already replacing the whole unit."
        ]
      }
    ],
    faqs: [
      {
        q: "Do I need to replace my whole consumer unit to get RCBOs?",
        a: "In almost all cases yes, since RCBOs need to be fitted into a compatible board — it's not usually something added to an old unit piecemeal."
      },
      {
        q: "Are RCBOs more likely to trip than a shared RCD?",
        a: "No — they're just as reliable, they simply isolate the specific circuit at fault rather than taking the rest of the board down with it."
      },
      {
        q: "Is RCBO protection a legal requirement?",
        a: "It's not a blanket legal requirement for every home, but it's what current wiring regulations expect for new consumer unit installations."
      },
      {
        q: "Can I mix RCBOs and standard MCBs in the same board?",
        a: "Yes, this is common, particularly if only some circuits need individual protection — we'll advise honestly on what your specific property needs."
      }
    ],
    relatedSlugs: ["what-is-an-rcd", "what-is-surge-protection", "consumer-unit-upgrade-cost-guide"]
  },
  {
    slug: "how-much-does-an-eicr-cost",
    service: "electrical-inspection-testing",
    title: "How Much Does an EICR Cost in Glasgow?",
    metaTitle: "How Much Does an EICR Cost in Glasgow? | Quality Electrics",
    metaDescription: "A clear breakdown of what an EICR typically costs for a flat, house, or commercial unit in Glasgow, and what actually affects the price.",
    excerpt: "The honest range for an EICR depends more on property size and circuit count than most people expect. Here's what actually drives the price.",
    readTime: "5 min read",
    publishDate: "2026-09-08",
    displayDate: "8 September 2026",
    heroImage: "assets/img/tenement.webp",
    keyTakeaways: [
      "EICR pricing typically starts from around £200 excl. VAT for a standard flat, scaling up with property size and circuit count",
      "Number of circuits, not floor area alone, is the main driver of cost",
      "Commercial EICRs are priced separately, based on the size and complexity of the installation",
      "A genuinely clear quote should specify what's included before you book, not just a flat headline figure"
    ],
    intro: [
      "EICR pricing varies more than people expect, and the honest reason isn't inconsistent electricians — it's that the number of circuits in a property, not just its size, is what actually determines how long the inspection takes.",
      "Here's a realistic breakdown of what drives the cost."
    ],
    sections: [
      {
        heading: "Typical starting price",
        body: [
          "For a standard flat or smaller property, EICR pricing typically starts from around £200 excluding VAT. Larger homes with more circuits, more bedrooms, and more sockets and fixed appliances will cost more, since there's simply more to test."
        ]
      },
      {
        heading: "What actually drives the price up",
        body: [
          "Circuit count is the biggest factor — a property with a straightforward single consumer unit and a handful of circuits is quicker to test than one with an extension, outbuilding, or multiple consumer units feeding different parts of the property. Access difficulty and the age of the installation also play a role, since older or poorly documented wiring can take longer to test and interpret properly."
        ]
      },
      {
        heading: "Commercial EICR pricing",
        body: [
          "Commercial and industrial premises are priced individually rather than against a standard domestic range, since the size and complexity of installations varies hugely — from a single small retail unit to a multi-circuit warehouse. We'll always survey or discuss the property properly before quoting rather than guessing from a generic price list."
        ]
      },
      {
        heading: "What should be included in the price",
        body: [
          "A proper EICR quote should include the full inspection and testing, the written report itself, and a clear explanation of any findings — not just the site visit with the report as a costly add-on. Ask directly what's included before booking if a quote doesn't make this clear."
        ]
      }
    ],
    faqs: [
      {
        q: "Is the EICR report itself extra on top of the inspection?",
        a: "No, with us the written report is included as standard in the quoted price, not billed separately afterwards."
      },
      {
        q: "Does an unsatisfactory result cost extra to fix?",
        a: "Any remedial work needed is quoted separately and clearly, so you know exactly what you're agreeing to before anything further is booked."
      },
      {
        q: "Is a landlord EICR priced differently to a homeowner's?",
        a: "The inspection itself is the same process — pricing is driven by property size and circuit count, not who owns it."
      },
      {
        q: "Can you give me a fixed price before you've seen the property?",
        a: "For straightforward standard properties, often yes over the phone — for anything larger or unusual, we'll confirm with a quick look first so the quote's accurate."
      }
    ],
    relatedSlugs: ["what-is-an-eicr", "eicr-landlord-guide-scotland", "do-i-need-an-eicr-to-sell-my-house"]
  },
  {
    slug: "how-much-does-rewiring-a-house-cost",
    service: "domestic-commercial-rewiring",
    title: "How Much Does Rewiring a House Cost in Glasgow?",
    metaTitle: "House Rewiring Cost Guide (Glasgow) | Quality Electrics",
    metaDescription: "A realistic breakdown of full and partial rewire costs for Glasgow homes, and the property factors that actually move the price.",
    excerpt: "A full rewire quote can vary a lot between properties, and it's rarely about the electrician — it's the property itself driving the number. Here's what actually matters.",
    readTime: "6 min read",
    publishDate: "2026-09-15",
    displayDate: "15 September 2026",
    heroImage: "assets/img/business-wiring-fitout.webp",
    keyTakeaways: [
      "A full rewire cost is driven mainly by property size, number of circuits, and how accessible the walls and floors are",
      "Tenement flats and period properties often cost more per room than modern new-builds",
      "A partial rewire, targeting only affected circuits, is sometimes genuinely enough and considerably cheaper",
      "Making good after chasing walls is a real cost to factor in, separate from the electrical work itself"
    ],
    intro: [
      "\"How much will it cost to rewire my house?\" doesn't have a single answer, and anyone quoting one figure over the phone without seeing the property is guessing. What actually drives the price is a combination of size, access, and property type.",
      "Here's a realistic breakdown of what moves the number up or down."
    ],
    sections: [
      {
        heading: "The main cost drivers",
        body: [
          "Property size and the number of circuits involved is the single biggest factor — more rooms means more sockets, switches, and light positions to rewire, which is straightforwardly more materials and labour. Beyond that, access matters just as much: a property with easy underfloor and loft access is faster to chase cable through than one with solid floors and lath-and-plaster walls throughout."
        ]
      },
      {
        heading: "Why tenement and period properties often cost more",
        body: [
          "Glasgow's tenement flats and period homes bring genuine complications a modern new-build simply doesn't have — solid stone or lath-and-plaster walls that are harder to chase cleanly, shared stairwells and common areas that sometimes need factor involvement, and older layouts that don't always follow a predictable cable route. None of this makes a rewire impossible, but it does typically push the cost and timeline up compared to an equivalent-sized modern property."
        ]
      },
      {
        heading: "Full rewire vs partial rewire",
        body: [
          "A full rewire replaces every circuit in the property. A partial rewire targets only the circuits that are actually faulty, undersized, or unsafe, leaving sound existing wiring untouched. It's considerably cheaper where it's genuinely appropriate — the honest answer depends on what an inspection actually finds, not a blanket assumption either way."
        ]
      },
      {
        heading: "Making good — a cost that's easy to forget",
        body: [
          "Chasing cable into walls means those channels need filling and making good afterwards. We include basic making good as standard, but a full plaster skim across affected walls is typically a separate cost, usually handled by a plasterer — factor this into your overall budget, not just the electrical quote."
        ]
      }
    ],
    faqs: [
      {
        q: "Can you give me an accurate quote without visiting the property?",
        a: "Not accurately for a full or partial rewire — there are too many variables specific to your property. We'll always survey before quoting properly."
      },
      {
        q: "Is it cheaper to rewire an empty property?",
        a: "Often yes, since access is easier without furniture and belongings in the way, though it's not always practical to empty a property just for this reason."
      },
      {
        q: "Does a rewire include new sockets and switches, or just cabling?",
        a: "A proper rewire quote includes the sockets, switches, and light fittings themselves, not just the cable behind the walls — worth confirming this is included in any quote you're comparing."
      },
      {
        q: "How do I know if I need a full rewire or just a partial one?",
        a: "An inspection is the honest way to find out — we'll tell you plainly which your property actually needs rather than defaulting to the bigger job."
      }
    ],
    relatedSlugs: ["how-often-should-a-house-be-rewired", "signs-your-home-needs-rewired", "what-is-part-p-electrical"]
  },
  {
    slug: "how-often-should-a-house-be-rewired",
    service: "domestic-commercial-rewiring",
    title: "How Often Should a House Be Rewired?",
    metaTitle: "How Often Should a House Be Rewired? | Quality Electrics",
    metaDescription: "The general rule of thumb for house rewiring intervals in the UK, and the practical signs that matter more than age alone.",
    excerpt: "There's a commonly quoted rule of thumb for rewiring intervals, but the honest answer depends more on condition than a fixed number of years. Here's how to actually judge it.",
    readTime: "5 min read",
    publishDate: "2026-09-22",
    displayDate: "22 September 2026",
    heroImage: "assets/img/business-wiring-fitout.webp",
    keyTakeaways: [
      "The commonly quoted rule of thumb is a rewire roughly every 25 to 30 years",
      "Condition, not just age, is what actually determines whether wiring needs replacing",
      "An EICR is the reliable way to establish the actual state of a property's wiring, rather than guessing from age alone",
      "Some older wiring still performs safely well past 30 years if it was well installed and hasn't been altered badly since"
    ],
    intro: [
      "There's a commonly repeated rule of thumb that a house should be rewired roughly every 25 to 30 years, and while it's a reasonable general guide, it's not a strict deadline — condition matters more than a number of years on a calendar.",
      "Here's how to actually judge whether your home's wiring needs attention."
    ],
    sections: [
      {
        heading: "Where the 25-to-30-year guideline comes from",
        body: [
          "Cable insulation and general wiring components do degrade over time, and older materials used decades ago don't always match the standards and safety features expected today. The 25-to-30-year figure is a sensible average based on typical component lifespan and how wiring regulations have evolved over that period — but it's a guide, not a hard rule that applies identically to every property."
        ]
      },
      {
        heading: "Why condition matters more than age alone",
        body: [
          "A well-installed system that's been left alone and properly maintained can genuinely still be sound at 30-plus years, while a poorly maintained or badly altered system can develop real issues well before that. What actually matters is the physical condition of the cabling, the presence (or absence) of RCD protection, and whether the installation has kept pace with the loads modern homes actually put on it."
        ]
      },
      {
        heading: "The practical warning signs worth acting on",
        body: [
          "Regardless of the property's age, certain signs are worth taking seriously: frequent tripping, warm sockets or switches, flickering lights unrelated to a specific appliance, a persistent burning smell, or still having a fuse box with rewireable fuses rather than modern circuit breakers. Any of these are reasons to get an inspection regardless of what year the property was last rewired."
        ]
      },
      {
        heading: "Why an EICR is the honest way to actually know",
        body: [
          "Rather than guessing from age, an EICR gives you an actual, evidenced answer on the condition of your wiring — tested and classified rather than assumed. It's the difference between a rule of thumb and a genuine diagnosis."
        ]
      }
    ],
    faqs: [
      {
        q: "My house is 35 years old — does it definitely need rewiring?",
        a: "Not necessarily — age alone doesn't tell the full story. An inspection will give you a genuine answer based on actual condition, not just the property's age."
      },
      {
        q: "Can a rewire be done in stages rather than all at once?",
        a: "Yes, a partial or phased rewire targeting specific circuits or areas is often a practical option, particularly for a property that's still liveable but has specific concerns."
      },
      {
        q: "Does buying an older property mean I should assume a rewire is needed?",
        a: "It's worth budgeting for the possibility, but get an EICR done rather than assuming — plenty of older properties have already been rewired or are still genuinely sound."
      },
      {
        q: "Will my insurance be affected by old wiring?",
        a: "Some insurers do ask about the age and condition of wiring, and unresolved known issues can affect cover — worth being upfront and addressing anything flagged."
      }
    ],
    relatedSlugs: ["signs-your-home-needs-rewired", "how-much-does-rewiring-a-house-cost", "what-is-part-p-electrical"]
  },
  {
    slug: "do-i-need-an-eicr-to-sell-my-house",
    service: "electrical-inspection-testing",
    title: "Do I Need an EICR to Sell My House?",
    metaTitle: "Do I Need an EICR to Sell My House? | Quality Electrics",
    metaDescription: "Whether an EICR is legally required to sell a home in Scotland, and why buyers, solicitors, and lenders often ask for one anyway.",
    excerpt: "There's no strict legal requirement, but in practice an EICR often ends up part of the sale anyway. Here's why, and when it's worth getting ahead of it.",
    readTime: "5 min read",
    publishDate: "2026-09-29",
    displayDate: "29 September 2026",
    heroImage: "assets/img/tenement.webp",
    keyTakeaways: [
      "There's no strict legal requirement for a homeowner to hold an EICR to sell their property",
      "Buyers, solicitors, and mortgage lenders frequently request one during the sale process regardless",
      "Getting one done proactively can prevent delays later in a sale, rather than scrambling once it's requested",
      "An unsatisfactory report doesn't stop a sale, but it usually leads to a price or repair negotiation"
    ],
    intro: [
      "There's no law in Scotland that says a homeowner must hold a valid EICR to sell their property — but in practice, it comes up in a large number of sales anyway, usually requested by someone else in the chain rather than required upfront.",
      "Here's who actually asks for one, and why it's often worth getting ahead of it."
    ],
    sections: [
      {
        heading: "The legal position",
        body: [
          "For owner-occupied property being sold, there's no statutory requirement to produce an EICR. This is different from the position for landlords letting a property, who do have a clear legal duty to hold one — the sale of a home you live in yourself isn't covered by the same rules."
        ]
      },
      {
        heading: "Why it comes up anyway",
        body: [
          "Buyers' solicitors, surveyors, and sometimes mortgage lenders frequently ask for evidence of the electrical installation's condition as part of due diligence, particularly for older properties or where a survey has flagged the wiring as worth checking. It's not a legal box that must be ticked, but in a competitive market it can genuinely smooth or stall a sale depending on whether you already have an answer ready."
        ]
      },
      {
        heading: "The case for getting one done before listing",
        body: [
          "Getting an EICR done proactively, before a buyer or their solicitor asks, means you're not scrambling to book an inspection and potential remedial work at a point in the sale where delays cost real money and goodwill. It also gives you an honest picture of anything worth fixing before it becomes a negotiating point."
        ]
      },
      {
        heading: "What happens if the report comes back unsatisfactory",
        body: [
          "An unsatisfactory EICR doesn't stop a sale outright, but it typically leads to a conversation about who fixes what, or a price adjustment reflecting the cost of remedial work. Having the report — and ideally the remedial work already sorted — puts you in a stronger position than a buyer finding an issue themselves late in the process."
        ]
      }
    ],
    faqs: [
      {
        q: "Will my sale definitely fall through without an EICR?",
        a: "No, it's not a legal requirement to sell — but not having an answer ready if it's requested can cause delays at a sensitive point in the process."
      },
      {
        q: "How far in advance of listing should I get one done?",
        a: "As early as feels practical — it gives you time to address anything found without it becoming a rushed, last-minute issue during a live sale."
      },
      {
        q: "Does the buyer usually pay for the EICR instead?",
        a: "It varies by transaction and who requests it — there's no fixed rule, and it's often simply agreed between the parties or their solicitors."
      },
      {
        q: "Is an EICR the same thing a surveyor checks?",
        a: "No — a standard survey may make general comments on visible wiring, but it isn't a substitute for a proper EICR, which involves actual testing."
      }
    ],
    relatedSlugs: ["what-is-an-eicr", "how-long-does-an-eicr-last", "eicr-landlord-guide-scotland"]
  },
  {
    slug: "what-is-part-p-electrical",
    service: "domestic-commercial-rewiring",
    title: "What Is Part P Electrical, and When Does It Apply?",
    metaTitle: "What Is Part P Electrical Work? | Quality Electrics",
    metaDescription: "What Part P actually covers, which jobs count as notifiable electrical work in Scotland, and how self-certification works.",
    excerpt: "Part P gets mentioned on quotes without much explanation. Here's what it actually covers, and why it matters for Scottish building regulations even though the name comes from England and Wales.",
    readTime: "5 min read",
    publishDate: "2026-10-06",
    displayDate: "6 October 2026",
    heroImage: "assets/img/business-wiring-fitout.webp",
    keyTakeaways: [
      "Part P is technically an England and Wales building regulation, but Scotland has its own equivalent notifiable work rules",
      "Notifiable electrical work includes new circuits, consumer unit replacements, and work in bathrooms or other special locations",
      "A registered electrician can self-certify notifiable work, avoiding a separate council application",
      "Not all electrical work is notifiable — many repairs and additions to existing circuits fall outside these rules"
    ],
    intro: [
      "Part P comes up a lot in conversations about electrical work, though strictly speaking it's an England and Wales building regulation — Scotland has its own, broadly similar system under Scottish building regulations, which is what actually applies here.",
      "Here's what the underlying idea covers, and what it means in practice for work done on a Scottish property."
    ],
    sections: [
      {
        heading: "What the regulation is actually trying to achieve",
        body: [
          "The core idea, whether under Part P in England and Wales or the equivalent Scottish building regulations, is that certain types of electrical work carry enough risk that they need to be properly certified as meeting current safety standards — not just completed, but formally signed off."
        ]
      },
      {
        heading: "What counts as notifiable work in Scotland",
        body: [
          "New circuits, consumer unit replacements, and electrical work in special locations like bathrooms (where water and electricity are both present) are typical examples of notifiable work. Simpler jobs — like adding a socket to an existing circuit or replacing a like-for-like fitting — often fall outside these rules, though it's worth confirming rather than assuming."
        ]
      },
      {
        heading: "How self-certification actually works",
        body: [
          "As a registered electrician with an approved certification scheme, we can self-certify notifiable work on your behalf. This means the job is properly certified as meeting Building Standards without you needing to apply for a separate building warrant through the council — the paperwork is handled as part of the job itself."
        ]
      },
      {
        heading: "Why this matters if you're doing DIY or hiring unregistered work",
        body: [
          "Work carried out without proper certification — whether DIY or by someone not registered with an approved scheme — can cause real problems later, particularly when selling a property or making an insurance claim, since there's no formal proof the work meets current safety standards."
        ]
      }
    ],
    faqs: [
      {
        q: "Do I need a building warrant for a new socket?",
        a: "Generally no — adding a socket to an existing circuit typically isn't notifiable work, though we'll confirm this for your specific job."
      },
      {
        q: "Is bathroom electrical work always notifiable?",
        a: "Often yes, given the water risk involved — we'll tell you clearly whether your specific bathroom job needs certification."
      },
      {
        q: "What proof do I get once notifiable work is certified?",
        a: "You'll receive a certificate confirming the work meets current standards, which you should keep for future reference, insurance, or sale purposes."
      },
      {
        q: "Does self-certification cost extra?",
        a: "It's built into the cost of notifiable work as standard with a registered electrician, not billed as a separate line item."
      }
    ],
    relatedSlugs: ["how-much-does-rewiring-a-house-cost", "signs-your-home-needs-rewired", "consumer-unit-upgrade-cost-guide"]
  }
];
