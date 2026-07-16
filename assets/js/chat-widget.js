/*
 * Quality Electrics quote-booking widget.
 *
 * Deliberately NOT a free-text AI chatbot. Industry research on lead-gen
 * bots for trades is consistent on this: the bot should capture and route
 * enquiries, not attempt to chat freely or estimate prices — so this is a
 * guided, button-driven flow (service -> area -> urgency -> details ->
 * contact info), which also means no LLM API key, no backend, and no
 * ongoing running cost. It submits straight to Formspree so enquiries land
 * in the client's email, same as the main contact form.
 *
 * SETUP — one value needed:
 * FORMSPREE_ENDPOINT below needs your real Formspree form endpoint
 * (formspree.io/f/xxxxxxx). Can be the same form as the contact page, or a
 * separate one if you want widget leads tracked apart from contact-page
 * leads — either way, a hidden field tags the submission source so it's
 * distinguishable in the email either way.
 */

const FORMSPREE_ENDPOINT = "https://formspree.io/f/REPLACE_WITH_YOUR_FORM_ID";

document.addEventListener("DOMContentLoaded", () => {
  const data = window.QE_CHAT_DATA;
  if (!data) return;

  const state = {
    step: "greeting",
    service: null,
    area: null,
    urgency: null,
    description: "",
    name: "",
    phone: "",
    email: "",
  };

  // ---- DOM scaffold -------------------------------------------------

  const launcher = document.createElement("button");
  launcher.id = "qe-chat-launcher";
  launcher.type = "button";
  launcher.setAttribute("aria-label", "Open quote booking assistant");
  launcher.className =
    "fixed bottom-5 right-5 z-[70] flex items-center gap-2 bg-brand-green text-cream rounded-full pl-4 pr-5 py-3.5 shadow-xl hover:bg-brand-green-light transition-colors cursor-pointer";
  launcher.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 10.5h7.5m-7.5 3h4.5m4.875 4.875L21 21l-2.625-2.625M3 12c0-4.556 3.858-8.25 9-8.25s9 3.694 9 8.25-3.858 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C4.148 16.351 3 14.315 3 12z"/></svg>
    <span class="text-sm font-semibold">Get a Quick Quote</span>
  `;

  const panel = document.createElement("div");
  panel.id = "qe-chat-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-modal", "true");
  panel.setAttribute("aria-label", "Quality Electrics quote booking assistant");
  panel.className =
    "fixed z-[70] bottom-5 right-5 w-[calc(100vw-2.5rem)] max-w-sm h-[36rem] max-h-[80vh] bg-surface border border-white/10 rounded-sm shadow-2xl flex-col overflow-hidden hidden";
  panel.innerHTML = `
    <div class="bg-brand-green text-cream px-5 py-4 flex items-start justify-between shrink-0">
      <div>
        <p class="font-display font-semibold">Quality Electrics</p>
        <p class="text-xs text-cream/60 mt-0.5">Automated booking assistant</p>
      </div>
      <button type="button" id="qe-chat-close" aria-label="Close" class="text-cream/70 hover:text-cream cursor-pointer leading-none text-xl">&times;</button>
    </div>
    <div class="bg-brand-green-dark px-5 py-2 shrink-0">
      <a href="${data.phoneHref}" class="text-xs text-cream/80 hover:text-brand-gold transition-colors flex items-center gap-1.5">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a2.25 2.25 0 002.25-2.25v-1.372a1.5 1.5 0 00-1.223-1.474l-4.117-.823a1.5 1.5 0 00-1.478.44l-.97 1.028a11.25 11.25 0 01-5.976-5.976l1.028-.97a1.5 1.5 0 00.44-1.478l-.823-4.117A1.5 1.5 0 007.622 3H6.25A2.25 2.25 0 004 5.25v1.5z"/></svg>
        Urgent? Call ${data.phoneDisplay} directly
      </a>
    </div>
    <div id="qe-chat-log" class="flex-1 overflow-y-auto px-4 py-4 space-y-3 text-sm"></div>
    <div id="qe-chat-action" class="border-t border-white/10 p-3 shrink-0"></div>
  `;

  document.body.appendChild(launcher);
  document.body.appendChild(panel);

  const log = panel.querySelector("#qe-chat-log");
  const actionArea = panel.querySelector("#qe-chat-action");
  const closeBtn = panel.querySelector("#qe-chat-close");

  // ---- render helpers -------------------------------------------------

  function botBubble(text) {
    const div = document.createElement("div");
    div.className = "flex";
    div.innerHTML = `<div class="bg-white/5 border border-white/10 rounded-sm rounded-tl-none px-3.5 py-2.5 max-w-[85%] text-cream/85">${text}</div>`;
    log.appendChild(div);
  }

  function userBubble(text) {
    const div = document.createElement("div");
    div.className = "flex justify-end";
    div.innerHTML = `<div class="bg-brand-green text-cream rounded-sm rounded-tr-none px-3.5 py-2.5 max-w-[85%]">${text}</div>`;
    log.appendChild(div);
  }

  function scrollToBottom() {
    log.scrollTop = log.scrollHeight;
  }

  function renderButtons(options, onPick) {
    actionArea.innerHTML = "";
    const wrap = document.createElement("div");
    wrap.className = "flex flex-wrap gap-2";
    options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className =
        "text-xs sm:text-sm font-medium border border-brand-green text-brand-green rounded-full px-3.5 py-2 hover:bg-brand-green hover:text-cream transition-colors cursor-pointer";
      btn.textContent = opt;
      btn.addEventListener("click", () => onPick(opt));
      wrap.appendChild(btn);
    });
    actionArea.appendChild(wrap);
  }

  function renderTextStep({ placeholder, multiline, skippable, onSubmit }) {
    actionArea.innerHTML = "";
    const form = document.createElement("form");
    form.className = "flex gap-2";
    const input = document.createElement(multiline ? "textarea" : "input");
    input.className =
      "flex-1 rounded-sm border border-white/20 bg-white/5 text-cream px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold resize-none placeholder:text-cream/40";
    if (!multiline) input.type = "text";
    input.rows = multiline ? 2 : undefined;
    input.placeholder = placeholder;
    const submit = document.createElement("button");
    submit.type = "submit";
    submit.className = "btn-green !px-4 !py-2 text-xs shrink-0";
    submit.textContent = skippable ? "Next" : "Send";
    form.appendChild(input);
    form.appendChild(submit);

    if (skippable) {
      const skip = document.createElement("button");
      skip.type = "button";
      skip.className = "text-xs text-cream/40 hover:text-cream/70 underline shrink-0";
      skip.textContent = "Skip";
      skip.addEventListener("click", () => onSubmit(""));
      form.appendChild(skip);
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      onSubmit(input.value.trim());
    });
    actionArea.appendChild(form);
    input.focus();
  }

  function renderContactForm(onSubmit) {
    actionArea.innerHTML = "";
    const form = document.createElement("form");
    form.className = "space-y-2";
    form.innerHTML = `
      <input required type="text" name="name" placeholder="Full name" autocomplete="name" class="w-full rounded-sm border border-white/20 bg-white/5 text-cream px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold placeholder:text-cream/40" />
      <input required type="tel" name="phone" placeholder="Phone number" autocomplete="tel" class="w-full rounded-sm border border-white/20 bg-white/5 text-cream px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold placeholder:text-cream/40" />
      <input required type="email" name="email" placeholder="Email address" autocomplete="email" class="w-full rounded-sm border border-white/20 bg-white/5 text-cream px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold placeholder:text-cream/40" />
      <button type="submit" class="btn-green w-full !py-2 text-xs">Send My Request</button>
    `;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      onSubmit({
        name: fd.get("name").toString().trim(),
        phone: fd.get("phone").toString().trim(),
        email: fd.get("email").toString().trim(),
      });
    });
    actionArea.appendChild(form);
    form.querySelector('input[name="name"]').focus();
  }

  function clearActions() {
    actionArea.innerHTML = "";
  }

  // ---- conversation steps -------------------------------------------------

  function start() {
    log.innerHTML = "";
    botBubble(
      "Hi! I can help you request a callback or quote in under a minute. What do you need help with?"
    );
    renderButtons([...data.services, "Not sure / something else"], (choice) => {
      state.service = choice;
      userBubble(choice);
      scrollToBottom();
      askArea();
    });
  }

  function askArea() {
    botBubble(`Got it &mdash; ${escapeHtml(state.service)}. Which area are you in?`);
    scrollToBottom();
    renderButtons([...data.areas, "Outside these areas"], (choice) => {
      state.area = choice;
      userBubble(choice);
      scrollToBottom();
      askUrgency();
    });
  }

  function askUrgency() {
    botBubble("How urgent is this?");
    scrollToBottom();
    renderButtons(
      ["Emergency — need someone ASAP", "Within the next few days", "Just getting a quote for now"],
      (choice) => {
        state.urgency = choice;
        userBubble(choice);
        scrollToBottom();
        askDescription();
      }
    );
  }

  function askDescription() {
    botBubble("Anything you'd like to add about the job? (optional)");
    scrollToBottom();
    renderTextStep({
      placeholder: "e.g. flickering lights in the kitchen...",
      multiline: true,
      skippable: true,
      onSubmit: (text) => {
        state.description = text;
        if (text) userBubble(escapeHtml(text));
        scrollToBottom();
        askContact();
      },
    });
  }

  function askContact() {
    botBubble("Last step — how should we get back to you?");
    scrollToBottom();
    renderContactForm((contact) => {
      state.name = contact.name;
      state.phone = contact.phone;
      state.email = contact.email;
      userBubble(`${escapeHtml(contact.name)} &middot; ${escapeHtml(contact.phone)} &middot; ${escapeHtml(contact.email)}`);
      scrollToBottom();
      submit();
    });
  }

  async function submit() {
    clearActions();
    botBubble("Sending your request&hellip;");
    scrollToBottom();

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          _subject: "New quote request via chat widget",
          source: "Chat Widget",
          service: state.service,
          area: state.area,
          urgency: state.urgency,
          description: state.description || "(not provided)",
          name: state.name,
          phone: state.phone,
          email: state.email,
        }),
      });

      log.lastChild.remove();
      if (response.ok) {
        botBubble(
          `Thanks, ${escapeHtml(state.name.split(" ")[0] || "there")}! Your request has been sent to Quality Electrics &mdash; we'll be in touch soon.`
        );
      } else {
        throw new Error("submission failed");
      }
    } catch (err) {
      log.lastChild.remove();
      botBubble(
        `Sorry, something went wrong sending that. Please call us directly on <a href="${data.phoneHref}" class="underline font-semibold">${data.phoneDisplay}</a>.`
      );
    }
    scrollToBottom();
    renderButtons(["Start Over"], () => start());
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  // ---- open/close -------------------------------------------------

  let started = false;

  function openPanel() {
    panel.classList.remove("hidden");
    panel.classList.add("flex");
    launcher.classList.add("hidden");
    if (!started) {
      started = true;
      start();
    }
    closeBtn.focus();
  }

  function closePanel() {
    panel.classList.add("hidden");
    panel.classList.remove("flex");
    launcher.classList.remove("hidden");
    launcher.focus();
  }

  launcher.addEventListener("click", openPanel);
  closeBtn.addEventListener("click", closePanel);
  panel.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePanel();
  });
});
