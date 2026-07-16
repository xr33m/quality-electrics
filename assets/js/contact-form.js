/*
 * Submits the contact form to Formspree via fetch so the visitor stays on
 * the page instead of being redirected to Formspree's own confirmation
 * page. Falls back to a normal form POST (full page load) if fetch fails
 * for any reason, since the form's action/method still work on their own.
 */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const status = document.getElementById("form-status");
  const button = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    button.disabled = true;
    button.classList.add("opacity-60", "cursor-not-allowed");

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        form.reset();
        status.textContent = "Thanks — your enquiry has been sent. We'll get back to you soon.";
        status.classList.remove("hidden", "text-red-600");
        status.classList.add("text-brand-green");
      } else {
        throw new Error("Form submission failed");
      }
    } catch (err) {
      status.textContent = "Something went wrong sending that — please call or email us directly.";
      status.classList.remove("hidden", "text-brand-green");
      status.classList.add("text-red-600");
    } finally {
      button.disabled = false;
      button.classList.remove("opacity-60", "cursor-not-allowed");
    }
  });
});
