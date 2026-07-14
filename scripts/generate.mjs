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

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const business = JSON.parse(readFileSync(join(root, "src/data/business.json")));
const services = JSON.parse(readFileSync(join(root, "src/data/services.json")));
const areas = JSON.parse(readFileSync(join(root, "src/data/areas.json")));
const posts = JSON.parse(readFileSync(join(root, "src/data/blog.json")));
const reviews = JSON.parse(readFileSync(join(root, "src/data/reviews.json")));

function write(relPath, html) {
  const outPath = join(root, relPath, "index.html");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html);
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
}));
pageCount++;

// Services hub
write("services", page({
  title: "Electrical Services | Quality Electrics Glasgow",
  description: "Rewiring, EV charger installation, electrical inspection & testing, consumer unit upgrades, commercial installations, extensions & kitchen electrics across Glasgow.",
  path: "services/",
  business, services, areas, reviews,
  active: "services",
  bodyContent: servicesHubTemplate({ business, services }),
}));
pageCount++;

// Individual service pages
for (const service of services) {
  const relatedPost = posts.find((p) => p.service === service.slug);
  write(`services/${service.slug}`, page({
    title: `${service.name} in Glasgow | Quality Electrics`,
    description: `${service.shortDesc} NICEIC registered, fully insured, serving Glasgow & the surrounding areas.`,
    path: `services/${service.slug}/`,
    business, services, areas, reviews,
    active: "services",
    bodyContent: serviceTemplate({ business, service, areas, post: relatedPost }),
  }));
  pageCount++;

  // Service x Area pages
  for (const area of areas) {
    write(`services/${service.slug}/${area.slug}`, page({
      title: `${service.name} in ${area.name} | Quality Electrics`,
      description: `${service.name} for ${area.propertyNote} in ${area.name}, ${area.region}. NICEIC registered, fully insured, free quotes.`,
      path: `services/${service.slug}/${area.slug}/`,
      business, services, areas, reviews,
      active: "services",
      bodyContent: serviceAreaTemplate({ business, service, area, services }),
    }));
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
    bodyContent: areaHubTemplate({ business, area, services }),
  }));
  pageCount++;
}

// About
write("about", page({
  title: "About Us | Quality Electrics Glasgow",
  description: "Quality Electrics is a Glasgow-based, NICEIC registered electrical contractor serving homeowners, landlords, developers & commercial clients.",
  path: "about/",
  business, services, areas, reviews,
  active: "about",
  bodyContent: aboutTemplate({ business }),
}));
pageCount++;

// Projects
write("projects", page({
  title: "Our Projects | Quality Electrics Glasgow",
  description: "A selection of recent electrical projects across Glasgow & the surrounding areas.",
  path: "projects/",
  business, services, areas, reviews,
  active: "projects",
  bodyContent: projectsTemplate({ business, services }),
}));
pageCount++;

// Contact
write("contact", page({
  title: "Contact Us | Quality Electrics Glasgow",
  description: "Get a free, no-obligation quote from Quality Electrics. Call, email, or send an enquiry online.",
  path: "contact/",
  business, services, areas, reviews,
  active: "contact",
  bodyContent: contactTemplate({ business, areas }),
}));
pageCount++;

// Reviews
write("reviews", page({
  title: "Reviews | Quality Electrics Glasgow",
  description: "Real Google reviews from Quality Electrics customers across Glasgow and the surrounding areas.",
  path: "reviews/",
  business, services, areas, reviews,
  active: "reviews",
  bodyContent: reviewsPageTemplate({ business, reviews, services }),
}));
pageCount++;

// Blog hub
write("blog", page({
  title: "Blog | Quality Electrics Glasgow",
  description: "Straight-talking guides on electrical costs, regulations, and what to plan before work starts — from Quality Electrics, Glasgow.",
  path: "blog/",
  business, services, areas, reviews,
  active: "blog",
  bodyContent: blogHubTemplate({ business, posts, services }),
}));
pageCount++;

// Individual blog posts
for (const post of posts) {
  const service = services.find((s) => s.slug === post.service);
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
    bodyContent: blogPostTemplate({ business, post, service, relatedPosts, services }),
  }));
  pageCount++;
}

// 404 page
write("404", page({
  title: "Page Not Found | Quality Electrics",
  description: "The page you're looking for doesn't exist.",
  path: "404/",
  business, services, areas, reviews,
  active: "",
  bodyContent: `
  <section class="section py-32 text-center">
    <p class="eyebrow">404</p>
    <h1 class="mt-3 text-4xl font-display font-semibold text-ink">Page Not Found</h1>
    <p class="mt-4 text-ink/60">The page you're looking for doesn't exist or has moved.</p>
    <a href="/" class="btn-green mt-8 inline-flex">Back to Home</a>
  </section>`,
}));
pageCount++;

console.log(`Generated ${pageCount} pages.`);
