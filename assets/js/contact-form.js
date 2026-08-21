/*
 * Submits the contact form to Formspree via fetch so the visitor stays on
 * the page instead of being redirected to Formspree's own confirmation
 * page. Falls back to a normal form POST (full page load) if fetch fails
 * for any reason, since the form's action/method still work on their own.
 *
 * Also fires a parallel, fire-and-forget POST to the Quality Electrics CRM
 * webhook (Make.com) carrying the same fields plus any UTM params present
 * on the URL, so new leads land in Airtable automatically. This never
 * blocks or affects the user-facing Formspree confirmation — if the CRM
 * webhook is slow or fails, the visitor's experience is unaffected.
 */

const CRM_WEBHOOK_URL = "https://hook.eu2.make.com/h2jkrxqknc2kph4ps2xfjg0nc5kph1po";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const status = document.getElementById("form-status");
  const button = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    button.disabled = true;
    button.classList.add("opacity-60", "cursor-not-allowed");

    const formData = new FormData(form);

    // Fire the CRM webhook in parallel — never awaited, never blocks the UI.
    try {
      const params = new URLSearchParams(window.location.search);
      const payload = Object.fromEntries(formData.entries());
      payload.utm_source = params.get("utm_source") || "";
      payload.utm_medium = params.get("utm_medium") || "";
      payload.utm_campaign = params.get("utm_campaign") || "";
      payload.page_url = window.location.href;

      fetch(CRM_WEBHOOK_URL, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      }).catch(() => {
        /* CRM delivery is best-effort; a failure here must never surface to the visitor */
      });
    } catch (err) {
      /* never let CRM payload construction break the actual form submission */
    }

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
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
