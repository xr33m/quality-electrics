document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("mobile-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const willShow = menu.classList.contains("hidden");
      menu.classList.toggle("hidden");
      toggle.setAttribute("aria-expanded", String(willShow));
    });
  }

  document.querySelectorAll("[data-carousel-prev], [data-carousel-next]").forEach((btn) => {
    const targetId = btn.dataset.carouselPrev || btn.dataset.carouselNext;
    const track = document.getElementById(targetId);
    if (!track) return;
    const direction = btn.dataset.carouselPrev ? -1 : 1;
    btn.addEventListener("click", () => {
      const card = track.querySelector(":scope > *");
      const scrollAmount = card ? card.getBoundingClientRect().width + 20 : track.clientWidth * 0.8;
      track.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
    });
  });
});
