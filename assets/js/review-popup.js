/*
 * "Recent review" social-proof popup, driven by real static review data
 * (window.QE_REVIEWS, injected per-page — see partials.mjs footer()).
 * Shows the genuinely most recent review with its real date label —
 * never a fabricated "just now" claim.
 */

const POPUP_DELAY_MS = 20000;
const POPUP_SESSION_KEY = "qe_review_popup_shown";

function googleLogoSvg() {
  return `<svg width="20" height="20" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"/>
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
    <path fill="#4CAF50" d="M24 44c5.4 0 10.3-2.1 14-5.5l-6.5-5.4C29.5 34.8 26.9 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.6 39.6 16.3 44 24 44z"/>
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.3-4.1 5.7l6.5 5.4C40.9 36.6 44 30.9 44 24c0-1.3-.1-2.7-.4-3.5z"/>
  </svg>`;
}

function showReviewPopup(review) {
  if (sessionStorage.getItem(POPUP_SESSION_KEY)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const firstName = review.author.split(" ")[0];
  const popup = document.createElement("div");
  popup.setAttribute("role", "status");
  popup.className =
    "fixed bottom-5 left-5 z-[60] flex items-start gap-3 bg-white border border-ink/10 shadow-xl rounded-sm p-4 max-w-xs translate-y-4 opacity-0 transition-all duration-300";
  popup.innerHTML = `
    <div class="shrink-0 mt-0.5">${googleLogoSvg()}</div>
    <div class="flex-1 text-sm">
      <p class="text-ink"><strong>${firstName}</strong> left a ${review.rating}&#9733; review</p>
      <p class="text-ink/50 text-xs mt-0.5">${review.dateLabel} &middot; Google</p>
    </div>
    <button aria-label="Dismiss" class="text-ink/30 hover:text-ink/60 shrink-0 leading-none text-lg cursor-pointer">&times;</button>
  `;
  document.body.appendChild(popup);
  sessionStorage.setItem(POPUP_SESSION_KEY, "1");

  requestAnimationFrame(() => {
    popup.classList.remove("translate-y-4", "opacity-0");
  });

  const dismiss = () => {
    popup.classList.add("translate-y-4", "opacity-0");
    setTimeout(() => popup.remove(), 300);
  };
  popup.querySelector("button").addEventListener("click", dismiss);
  setTimeout(dismiss, 8000);
}

document.addEventListener("DOMContentLoaded", () => {
  const reviews = window.QE_REVIEWS;
  if (!Array.isArray(reviews) || !reviews.length) return;
  const mostRecent = reviews[0];
  setTimeout(() => showReviewPopup(mostRecent), POPUP_DELAY_MS);
});
