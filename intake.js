/* ========================================
   INTAKE GATE
   Two-step flow: complete brief → unlock calendar
   Posts answers to Tally + saves to localStorage
   ======================================== */

(function () {
  // Question sets — different per page
  const QUESTION_SETS = {
    clarity: {
      title: "Tell me about you",
      sub: "6 questions · about 15 minutes · I read every answer the night before our session.",
      stepLabel: "Step 1 of 2 · Pre-session brief",
      submitLabel: "Submit & unlock my calendar",
      // Replace with Vivienne's real Tally form ID for clarity intake
      tallyFormId: "REPLACE_WITH_TALLY_CLARITY_FORM_ID",
      questions: [
        {
          id: "stuck",
          label: "In one sentence — what's keeping you stuck right now?",
          help: "Don't overthink it. The version you'd say out loud to a trusted friend.",
          type: "textarea",
          rows: 3,
          required: true,
        },
        {
          id: "wand",
          label: "If we wave a wand and it's 90 days from now — what's different in your life?",
          help: "Be specific. What's changed in your week, your body, your relationships, your work?",
          type: "textarea",
          rows: 4,
          required: true,
        },
        {
          id: "pillar",
          label: "Which area matters most right now?",
          type: "radio",
          required: true,
          options: [
            "Career direction — pivot, clarity, next step",
            "Health & wellbeing — burnout, energy, self",
            "Relationships — boundaries, voice, connection",
            "Money & time — worth, structure, agency",
            "Honestly, all four are tangled",
          ],
        },
        {
          id: "tried",
          label: "What have you already tried — and why didn't it stick?",
          help: "Therapy, courses, books, journalling, a previous coach… what's the pattern?",
          type: "textarea",
          rows: 3,
          required: true,
        },
        {
          id: "afraid",
          label: "What are you afraid to admit out loud about this?",
          help: "This stays between us. The honest answer here saves us 3 sessions.",
          type: "textarea",
          rows: 3,
          required: false,
        },
        {
          id: "anything",
          label: "Anything else I should know before we meet?",
          type: "textarea",
          rows: 2,
          required: false,
        },
      ],
    },

    programme: {
      title: "Your Full Bloom intake",
      sub: "11 questions · about 25 minutes · This is the foundation of our 12 weeks together. Take your time.",
      stepLabel: "Step 1 of 3 · Programme intake",
      submitLabel: "Submit & unlock my Session 1 calendar",
      tallyFormId: "REPLACE_WITH_TALLY_PROGRAMME_FORM_ID",
      questions: [
        {
          id: "stuck",
          label: "In one sentence — what's keeping you stuck right now?",
          help: "Don't overthink it. The version you'd say out loud to a trusted friend.",
          type: "textarea",
          rows: 3,
          required: true,
        },
        {
          id: "wand",
          label: "If we wave a wand and it's 12 weeks from now — what's different?",
          help: "Be specific and ambitious. Don't pre-edit yourself.",
          type: "textarea",
          rows: 4,
          required: true,
        },
        {
          id: "pillar",
          label: "Which area matters most right now?",
          type: "radio",
          required: true,
          options: [
            "Career direction",
            "Health & wellbeing",
            "Relationships",
            "Money & time",
            "All four are tangled",
          ],
        },
        {
          id: "tried",
          label: "What have you already tried — and why didn't it stick?",
          type: "textarea",
          rows: 3,
          required: true,
        },
        {
          id: "afraid",
          label: "What are you afraid to admit out loud about this?",
          help: "This stays between us. Honesty here is the shortcut.",
          type: "textarea",
          rows: 3,
          required: false,
        },
        {
          id: "wins",
          label: "Three biggest wins of your life — and what made them possible?",
          help: "Career, personal, hidden — anything you're proud of. The pattern matters.",
          type: "textarea",
          rows: 4,
          required: true,
        },
        {
          id: "story",
          label: "What's the story you tell yourself about why you can't move forward?",
          help: "We all have one. Naming it is half the work.",
          type: "textarea",
          rows: 3,
          required: true,
        },
        {
          id: "support",
          label: "Who in your life will support this work? Who might resist it?",
          type: "textarea",
          rows: 3,
          required: false,
        },
        {
          id: "style",
          label: "How do you want me to coach you?",
          type: "radio",
          required: true,
          options: [
            "Direct and challenging — push me",
            "Warm and exploratory — hold space",
            "A mix — read me and adjust",
            "Honestly, I don't know yet",
          ],
        },
        {
          id: "schedule",
          label: "Best time of week / day for our regular sessions?",
          help: "We'll meet weekly for 12 weeks. Knowing your rhythm helps.",
          type: "textarea",
          rows: 2,
          required: true,
        },
        {
          id: "anything",
          label: "Anything else I should know before we begin?",
          help: "Health, family, life events, what's on your mind right now.",
          type: "textarea",
          rows: 3,
          required: false,
        },
      ],
    },
  };

  function el(tag, attrs = {}, ...kids) {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") e.className = v;
      else if (k === "html") e.innerHTML = v;
      else if (k.startsWith("on")) e.addEventListener(k.slice(2), v);
      else e.setAttribute(k, v);
    }
    for (const kid of kids) {
      if (kid == null) continue;
      e.appendChild(typeof kid === "string" ? document.createTextNode(kid) : kid);
    }
    return e;
  }

  function renderQuestion(q, savedAnswers) {
    const wrap = el("div", { class: "ig-q" });
    wrap.appendChild(el("label", { class: "ig-q-label", for: `ig-${q.id}` },
      q.label, q.required ? el("span", { class: "ig-req" }, " *") : null
    ));
    if (q.help) wrap.appendChild(el("p", { class: "ig-q-help" }, q.help));

    if (q.type === "textarea") {
      const ta = el("textarea", {
        id: `ig-${q.id}`,
        name: q.id,
        rows: String(q.rows || 3),
        ...(q.required ? { required: "true" } : {}),
      });
      if (savedAnswers[q.id]) ta.value = savedAnswers[q.id];
      wrap.appendChild(ta);
    } else if (q.type === "radio") {
      const group = el("div", { class: "ig-radio-group" });
      q.options.forEach((opt, i) => {
        const id = `ig-${q.id}-${i}`;
        const row = el("label", { class: "ig-radio", for: id });
        const input = el("input", {
          type: "radio",
          name: q.id,
          id,
          value: opt,
          ...(q.required ? { required: "true" } : {}),
        });
        if (savedAnswers[q.id] === opt) input.checked = true;
        row.appendChild(input);
        row.appendChild(el("span", {}, opt));
        group.appendChild(row);
      });
      wrap.appendChild(group);
    }
    return wrap;
  }

  function buildIntake(mount, mode, calendarMount) {
    const set = QUESTION_SETS[mode];
    if (!set) return;
    const storageKey = `ig-${mode}-answers`;
    const submittedKey = `ig-${mode}-submitted`;

    // If already submitted in this browser, jump straight to calendar
    if (localStorage.getItem(submittedKey) === "1") {
      mount.style.display = "none";
      if (calendarMount) calendarMount.classList.add("ig-unlocked");
      return;
    }

    // Lock the calendar visually until submitted
    if (calendarMount) calendarMount.classList.add("ig-locked");

    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(storageKey) || "{}"); } catch (e) {}

    const form = el("form", { class: "ig-form", novalidate: "true" });

    // Header
    form.appendChild(el("p", { class: "ig-step" }, set.stepLabel));
    form.appendChild(el("h2", { class: "ig-title" }, set.title));
    form.appendChild(el("p", { class: "ig-sub" }, set.sub));

    // Progress bar
    const bar = el("div", { class: "ig-progress" });
    const barFill = el("div", { class: "ig-progress-fill" });
    bar.appendChild(barFill);
    form.appendChild(bar);

    // Questions
    const qWrap = el("div", { class: "ig-questions" });
    set.questions.forEach((q) => qWrap.appendChild(renderQuestion(q, saved)));
    form.appendChild(qWrap);

    // Email (so Vivienne can match it back to the Stripe receipt)
    const emailWrap = el("div", { class: "ig-q" });
    emailWrap.appendChild(el("label", { class: "ig-q-label", for: "ig-email" },
      "Your email", el("span", { class: "ig-req" }, " *")
    ));
    emailWrap.appendChild(el("p", { class: "ig-q-help" }, "Same one you used to pay — so I can match this to your booking."));
    const emailInput = el("input", {
      id: "ig-email",
      name: "email",
      type: "email",
      required: "true",
      placeholder: "you@example.com",
    });
    if (saved.email) emailInput.value = saved.email;
    emailWrap.appendChild(emailInput);
    form.appendChild(emailWrap);

    // Footer / submit
    const footer = el("div", { class: "ig-footer" });
    const status = el("p", { class: "ig-status" }, "Saved automatically as you type");
    const btn = el("button", { type: "submit", class: "ig-submit" }, set.submitLabel);
    footer.appendChild(status);
    footer.appendChild(btn);
    form.appendChild(footer);

    mount.appendChild(form);

    // Auto-save + progress
    const total = set.questions.length + 1; // +1 for email
    function recompute() {
      const data = new FormData(form);
      const answers = {};
      for (const [k, v] of data.entries()) answers[k] = v;
      localStorage.setItem(storageKey, JSON.stringify(answers));
      const filled = Object.values(answers).filter((v) => String(v).trim().length > 0).length;
      const pct = Math.min(100, Math.round((filled / total) * 100));
      barFill.style.width = pct + "%";
      status.textContent = pct === 100
        ? "All set — ready to submit"
        : `Saved · ${pct}% complete`;
    }
    form.addEventListener("input", recompute);
    form.addEventListener("change", recompute);
    recompute();

    // Submit
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      // Native validation
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const data = new FormData(form);
      const answers = {};
      for (const [k, v] of data.entries()) answers[k] = v;

      btn.disabled = true;
      btn.textContent = "Sending…";

      // Best-effort post to Tally (if form ID configured)
      const tallyId = set.tallyFormId;
      const send = (tallyId && !tallyId.startsWith("REPLACE_"))
        ? fetch(`https://api.tally.so/r/${tallyId}`, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(answers),
          }).catch(() => null)
        : Promise.resolve();

      send.finally(() => {
        localStorage.setItem(submittedKey, "1");
        // Smooth transition: collapse form, unlock calendar
        mount.classList.add("ig-fading");
        setTimeout(() => {
          mount.style.display = "none";
          if (calendarMount) {
            calendarMount.classList.remove("ig-locked");
            calendarMount.classList.add("ig-unlocked");
            calendarMount.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 350);
      });
    });
  }

  // Auto-init from data attribute
  document.addEventListener("DOMContentLoaded", () => {
    const mount = document.querySelector("[data-intake-mount]");
    if (!mount) return;
    const mode = mount.getAttribute("data-intake-mount"); // "clarity" or "programme"
    const calendarMount = document.querySelector("[data-calendar-gate]");
    buildIntake(mount, mode, calendarMount);
  });
})();
