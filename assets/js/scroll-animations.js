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
