/*
 * Section reveals (fade/rise), staggered card/grid entrances, and
 * alternating left/right slide-ins for image+text rows. Built with a plain
 * IntersectionObserver + CSS transitions (see .reveal/.stagger-item/
 * .slide-left/.slide-right rules in styles) rather than a scroll-linked
 * animation library — this keeps things resilient across embeds/iframes and
 * guarantees content is never left permanently hidden if something upstream
 * misbehaves. Content is fully visible in the raw HTML with no JS; this is
 * a pure progressive-enhancement layer.
 *
 * Every <section> on the page is automatically opted in to a reveal so the
 * whole site feels animated without per-section markup. Sections already
 * carrying an explicit reveal/slide class, plus the homepage hero and any
 * hero with a scroll-scrubbed video, are left alone.
 */

document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const baseTargets = document.querySelectorAll(".reveal, .stagger-group, .slide-left, .slide-right");

  // Auto-reveal: add .reveal to every <section> that doesn't already have an
  // explicit animation class. Skip #home-hero (it has its own parallax) and
  // the scroll-scrub video hero (#hero-video-wrapper), which would clip if
  // faded. Keeps the safety-net and observer logic below unified.
  const autoSections = [];
  document.querySelectorAll("main section").forEach((section) => {
    if (section.id === "home-hero" || section.id === "hero-video-wrapper") return;
    if (
      section.classList.contains("reveal") ||
      section.classList.contains("slide-left") ||
      section.classList.contains("slide-right")
    )
      return;
    section.classList.add("reveal");
    autoSections.push(section);
  });

  const targets = [...baseTargets, ...autoSections];

  if (reduceMotion || typeof IntersectionObserver === "undefined") {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const reveal = (el) => {
    el.classList.add("is-visible");
    if (el.classList.contains("stagger-group")) {
      const items = el.querySelectorAll(":scope > .stagger-item, :scope > * > .stagger-item");
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
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  targets.forEach((el) => observer.observe(el));

  // Scroll-scrubbed hero video (e.g. Commercial Installations & Lighting):
  // the clip is pre-rendered (pan + lighting reveal), and scroll position
  // drives currentTime directly — no autoplay/looping, so it's cheap on
  // mobile too. Plain scroll-listener + rAF throttling rather than a
  // scroll-linked animation library, consistent with the rest of this
  // file. Reduced-motion just leaves the poster frame showing (video src
  // is never set, so nothing downloads). Only present on pages with a
  // heroVideo (e.g. Commercial Installations), so this is a no-op
  // everywhere else.
  const heroVideo = document.getElementById("hero-scrub-video");
  const heroWrapper = document.getElementById("hero-video-wrapper");
  if (heroVideo && heroWrapper && !reduceMotion) {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const webm = isDesktop ? heroVideo.dataset.desktopWebm : heroVideo.dataset.mobileWebm;
    const mp4 = isDesktop ? heroVideo.dataset.desktopMp4 : heroVideo.dataset.mobileMp4;
    heroVideo.innerHTML = `<source src="${webm}" type="video/webm"><source src="${mp4}" type="video/mp4">`;

    let ticking = false;
    const scrub = () => {
      ticking = false;
      if (!heroVideo.duration) return;
      const rect = heroWrapper.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      heroVideo.currentTime = progress * heroVideo.duration;
    };

    const armScrub = () => {
      window.addEventListener(
        "scroll",
        () => {
          if (!ticking) {
            ticking = true;
            requestAnimationFrame(scrub);
          }
        },
        { passive: true }
      );
      scrub();
    };

    // readyState >= 1 (HAVE_METADATA) means loadedmetadata may already have
    // fired before this code ran (e.g. a cached/fast local load racing
    // ahead of this listener registration) — check directly rather than
    // relying solely on the event, or scrubbing would silently never start.
    if (heroVideo.readyState >= 1) {
      armScrub();
    } else {
      heroVideo.addEventListener("loadedmetadata", armScrub, { once: true });
    }
    heroVideo.load();
  }

  // Homepage hero background parallax: the video is oversized (130%
  // height, offset -15% from the top) so it has room to drift without
  // exposing an edge as it moves. Scoped to the hero's own height via
  // scroll/rAF (same pattern as the scrub video above), rather than
  // GSAP ScrollTrigger, consistent with the rest of this file.
  const heroSection = document.getElementById("home-hero");
  const heroBg = document.getElementById("home-hero-bg");
  if (heroSection && heroBg && !reduceMotion) {
    let heroTicking = false;
    const drift = () => {
      heroTicking = false;
      const rect = heroSection.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;
      const progress = Math.min(1, Math.max(0, -rect.top / rect.height));
      heroBg.style.transform = `translateY(${progress * 12}%)`;
    };
    window.addEventListener(
      "scroll",
      () => {
        if (!heroTicking) {
          heroTicking = true;
          requestAnimationFrame(drift);
        }
      },
      { passive: true }
    );
    drift();
  }
});
