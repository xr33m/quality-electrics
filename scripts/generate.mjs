import { readFileSync, writeFileSync, mkdirSync, existsSync, cpSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { page } from "./lib/partials.mjs";
import {
  homeTemplate,
  servicesHubTemplate,
  serviceTemplate,
  serviceAreaTemplate,
  areaHubTemplate,
  aboutTemplate,
  projectsTemplate,
  contactTemplate,
  blogHubTemplate,
  blogPostTemplate,
  blogArticleSchema,
  reviewsPageTemplate,
} from "./lib/templates.mjs";
import { serviceAreaSchema, areaHubSchema, localBusinessSchema, serviceFaqSchema } from "./lib/local-seo.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const business = JSON.parse(readFileSync(join(root, "src/data/business.json")));
const services = JSON.parse(readFileSync(join(root, "src/data/services.json")));
const areas = JSON.parse(readFileSync(join(root, "src/data/areas.json")));
const posts = JSON.parse(readFileSync(join(root, "src/data/blog.json")));
const reviews = JSON.parse(readFileSync(join(root, "src/data/reviews.json")));

const sitemapEntries = [];

function write(relPath, html, sitemap = {}) {
  const outPath = join(root, relPath, "index.html");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html);

  if (sitemap.skip) return;
  const urlPath = relPath ? `${relPath}/` : "";
  sitemapEntries.push({
    loc: `https://${business.domain}/${urlPath}`,
    changefreq: sitemap.changefreq || "monthly",
    priority: sitemap.priority ?? 0.6,
  });
}

let pageCount = 0;

// Home
write("", page({
  title: "Quality Electrics | NICEIC Registered Electrician in Glasgow",
  description: "NICEIC registered electrician covering Glasgow, Bearsden, Giffnock, East Kilbride, Newton Mearns, Milngavie & the Glasgow East End. Rewiring, EV chargers, EICR testing & consumer unit upgrades.",
  path: "",
  business, services, areas, reviews,
  active: "home",
  bodyContent: homeTemplate({ business, services, areas, reviews }),
  extraHead: localBusinessSchema({ business, areas, reviews }),
}), { changefreq: "weekly", priority: 1.0 });
pageCount++;

// Services hub
write("services", page({
  title: "Electrical Services | Quality Electrics Glasgow",
  description: "Rewiring, EV charger installation, electrical inspection & testing, consumer unit upgrades, commercial installations, extensions & kitchen electrics across Glasgow.",
  path: "services/",
  business, services, areas, reviews,
  active: "services",
  bodyContent: servicesHubTemplate({ business, services }),
}), { changefreq: "monthly", priority: 0.9 });
pageCount++;

// Individual service pages
for (const [serviceIndex, service] of services.entries()) {
  const relatedPost = posts.find((p) => p.service === service.slug);
  write(`services/${service.slug}`, page({
    title: `${service.name} in Glasgow | Quality Electrics`,
    description: `${service.shortDesc} NICEIC registered, fully insured, serving Glasgow & the surrounding areas.`,
    path: `services/${service.slug}/`,
    business, services, areas, reviews,
    active: "services",
    extraHead: serviceFaqSchema(service),
    bodyContent: serviceTemplate({ business, service, services, areas, post: relatedPost, index: serviceIndex }),
  }), { changefreq: "monthly", priority: 0.8 });
  pageCount++;

  // Service x Area pages
  for (const area of areas) {
    write(`services/${service.slug}/${area.slug}`, page({
      title: `${service.shortName} in ${area.name} | Quality Electrics`,
      description: `${service.name} for ${area.propertyNote} in ${area.name}, ${area.region}. NICEIC registered, fully insured, free quotes.`,
      path: `services/${service.slug}/${area.slug}/`,
      business, services, areas, reviews,
      active: "services",
      bodyContent: serviceAreaTemplate({ business, service, area, services, reviews }),
      extraHead: serviceAreaSchema({ business, service, area }),
    }), { changefreq: "monthly", priority: 0.6 });
    pageCount++;
  }
}

// Area hub pages
for (const area of areas) {
  write(`areas/${area.slug}`, page({
    title: `Electrician in ${area.name} | Quality Electrics`,
    description: `NICEIC registered electrician covering ${area.name}, ${area.region}. Rewiring, EV chargers, EICR testing, consumer unit upgrades & more.`,
    path: `areas/${area.slug}/`,
    business, services, areas, reviews,
    active: "areas",
    bodyContent: areaHubTemplate({ business, area, services, reviews }),
    extraHead: areaHubSchema({ business, area }),
  }), { changefreq: "monthly", priority: 0.7 });
  pageCount++;
}

// About
write("about", page({
  title: "About Us | Quality Electrics Glasgow",
  description: "Quality Electrics is a Glasgow-based, NICEIC registered electrical contractor serving homeowners, landlords, developers & commercial clients.",
  path: "about/",
  business, services, areas, reviews,
  active: "about",
  bodyContent: aboutTemplate({ business, services, reviews }),
}), { changefreq: "monthly", priority: 0.5 });
pageCount++;

// Projects
write("projects", page({
  title: "Our Projects | Quality Electrics Glasgow",
  description: "A selection of recent electrical projects across Glasgow & the surrounding areas.",
  path: "projects/",
  business, services, areas, reviews,
  active: "projects",
  bodyContent: projectsTemplate({ business, services }),
}), { changefreq: "monthly", priority: 0.5 });
pageCount++;

// Contact
write("contact", page({
  title: "Contact Us | Quality Electrics Glasgow",
  description: "Get a free, no-obligation quote from Quality Electrics. Call, email, or send an enquiry online.",
  path: "contact/",
  business, services, areas, reviews,
  active: "contact",
  bodyContent: contactTemplate({ business, areas, services }),
}), { changefreq: "yearly", priority: 0.7 });
pageCount++;

// Reviews
write("reviews", page({
  title: "Reviews | Quality Electrics Glasgow",
  description: "Real Google reviews from Quality Electrics customers across Glasgow and the surrounding areas.",
  path: "reviews/",
  business, services, areas, reviews,
  active: "reviews",
  bodyContent: reviewsPageTemplate({ business, reviews, services }),
}), { changefreq: "weekly", priority: 0.6 });
pageCount++;

// Blog hub
write("blog", page({
  title: "Blog | Quality Electrics Glasgow",
  description: "Straight-talking guides on electrical costs, regulations, and what to plan before work starts — from Quality Electrics, Glasgow.",
  path: "blog/",
  business, services, areas, reviews,
  active: "blog",
  bodyContent: blogHubTemplate({ business, posts, services }),
}), { changefreq: "weekly", priority: 0.7 });
pageCount++;

// Individual blog posts
posts.forEach((post, i) => {
  const service = services.find((s) => s.slug === post.service);
  const featuredArea = areas[i % areas.length];
  const relatedPosts = (post.relatedSlugs || [])
    .map((slug) => posts.find((p) => p.slug === slug))
    .filter(Boolean);
  write(`blog/${post.slug}`, page({
    title: post.metaTitle,
    description: post.metaDescription,
    path: `blog/${post.slug}/`,
    business, services, areas, reviews,
    active: "blog",
    extraHead: blogArticleSchema({ business, post }),
    bodyContent: blogPostTemplate({ business, post, service, featuredArea, relatedPosts, services }),
  }), { changefreq: "monthly", priority: 0.6 });
  pageCount++;
});

// 404 page (excluded from sitemap — not a real indexable page)
write("404", page({
  title: "Page Not Found | Quality Electrics",
  description: "The page you're looking for doesn't exist.",
  path: "404/",
  business, services, areas, reviews,
  active: "",
  bodyContent: `
  <section class="section py-32 text-center">
    <p class="eyebrow">404</p>
    <h1 class="mt-3 text-4xl font-display font-semibold text-cream">Page Not Found</h1>
    <p class="mt-4 text-cream/60">The page you're looking for doesn't exist or has moved.</p>
    <a href="/" class="btn-green mt-8 inline-flex">Back to Home</a>
  </section>`,
}), { skip: true });
pageCount++;

console.log(`Generated ${pageCount} pages.`);

// Sitemap
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries
  .map(
    (e) => `  <url>
    <loc>${e.loc}</loc>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority.toFixed(1)}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;
writeFileSync(join(root, "sitemap.xml"), sitemapXml);
console.log(`Generated sitemap.xml with ${sitemapEntries.length} URLs.`);

// robots.txt
const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://${business.domain}/sitemap.xml
`;
writeFileSync(join(root, "robots.txt"), robotsTxt);
console.log("Generated robots.txt.");
