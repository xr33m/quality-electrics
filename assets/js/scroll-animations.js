/*
 * Section reveals (fade/rise), staggered card/grid entrances, and
 * alternating left/right slide-ins for image+text rows. Built with a plain
 * IntersectionObserver + CSS transitions (see .reveal/.stagger-item/
 * .slide-left/.slide-right rules in styles) rather than a scroll-linked
 * animation library — this keeps things resilient across embeds/iframes and
 * guarantees content is never left permanently hidden if something upstream
 * misbehaves. Content is fully visible in the raw HTML with no JS; this is
 * a pure progressive-enhancement layer.
 */

document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const targets = document.querySelectorAll(".reveal, .stagger-group, .slide-left, .slide-right");

  if (reduceMotion || typeof IntersectionObserver === "undefined") {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const reveal = (el) => {
    el.classList.add("is-visible");
    if (el.classList.contains("stagger-group")) {
      const items = el.querySelectorAll(":scope > .stagger-item");
      items.forEach((item, i) => {
        item.style.transitionDelay = `${Math.min(i, 8) * 90}ms`;
        item.classList.add("is-visible");
      });
    }
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          reveal(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
  );

  targets.forEach((el) => observer.observe(el));

  // Safety net: if for any reason an element never intersects (e.g. it's
  // already off-screen in a non-standard scroll container), force it
  // visible after a few seconds so content can never be stuck hidden.
  setTimeout(() => {
    targets.forEach((el) => {
      if (!el.classList.contains("is-visible")) reveal(el);
    });
  }, 4000);
});
