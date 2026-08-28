/*
 * Forwards a copy of every contact form submission to Danny's n8n
 * automation (via sendBeacon, which is fire-and-forget and won't block or
 * delay the actual form submission handled separately in contact-form.js).
 * Runs alongside that handler, not instead of it -- both fire on submit.
 */
(function () {
  var ENDPOINT = "https://adammcgowan.app.n8n.cloud/webhook/quality-electrics-form";
  var form = document.getElementById("contact-form");
  if (!form || !navigator.sendBeacon) return;

  form.addEventListener(
    "submit",
    function () {
      try {
        var trap = form.querySelector('[name="_gotcha"]');
        if (trap && trap.value) return; // bot, don't forward

        var data = new FormData(form);
        data.delete("_gotcha");
        data.append("source", "website-contact-form");
        data.append("page", location.href);

        navigator.sendBeacon(ENDPOINT, data);
      } catch (e) {
        /* never interfere with the form */
      }
    },
    true
  );
})();
