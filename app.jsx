/* global React, ReactDOM, TweaksPanel, useTweaks, TweakSection, TweakRadio, TweakToggle, TweakSelect */

const { useState, useEffect, useMemo } = React;

/* =========================================
   PILLAR SELECTOR
   ========================================= */
const PILLARS = [
  {
    id: "career",
    name: "Career direction",
    sub: "Pivot · clarity · next step",
    icon: "assets/images/symbol_work.png",
    headline: "You\u2019ve outgrown your role \u2014 but the next one isn\u2019t obvious.",
    body: "Whether you\u2019re facing redundancy, a return to work, or quietly knowing it\u2019s time to leave \u2014 we\u2019ll map a next chapter that actually fits who you\u2019ve become.",
    bullets: [
      "Identify roles that match your real strengths, not your CV",
      "Rebuild confidence to interview, network, and negotiate",
      "Build a 90-day transition plan you\u2019ll actually follow",
    ],
    statNum: "82%",
    statLabel: "of clients have moved roles or pivoted within 6 months",
  },
  {
    id: "wellbeing",
    name: "Health & wellbeing",
    sub: "Burnout · energy · self",
    icon: "assets/images/symbol_health-wellbeing.png",
    headline: "You look fine on paper \u2014 but you\u2019re running on fumes.",
    body: "We rebuild the basics that keep you grounded: sleep, energy, boundaries, and a relationship with yourself that doesn\u2019t collapse under the first hard week.",
    bullets: [
      "Spot the patterns quietly draining your energy",
      "Build sustainable habits (not another 30-day reset)",
      "Reclaim the parts of your life you\u2019ve been ignoring",
    ],
    statNum: "9/10",
    statLabel: "clients report better sleep and lower stress by week 8",
  },
  {
    id: "relationships",
    name: "Relationships",
    sub: "Boundaries · voice · connection",
    icon: "assets/images/symbol_relationships.png",
    headline: "You keep saying yes \u2014 and resenting yourself for it.",
    body: "We work on the conversations you\u2019ve been avoiding, the boundaries that keep slipping, and the voice you\u2019ve quieted to keep the peace.",
    bullets: [
      "Have the conversation you\u2019ve been putting off",
      "Set boundaries that actually hold (without guilt)",
      "Reconnect with relationships that genuinely fuel you",
    ],
    statNum: "94%",
    statLabel: "say they communicate more clearly with the people who matter",
  },
  {
    id: "money",
    name: "Money & time",
    sub: "Worth · structure · agency",
    icon: "assets/images/symbol_time-money.png",
    headline: "Your calendar and your bank account aren\u2019t telling the truth about what you want.",
    body: "We get honest about how you spend your time and money \u2014 and design systems that finally line up with the life you say you want.",
    bullets: [
      "Audit where your time and money are actually going",
      "Charge, ask, and price what you\u2019re genuinely worth",
      "Build calmer systems that don\u2019t need willpower to run",
    ],
    statNum: "+£14k",
    statLabel: "average client uplift from raises, pivots, or pricing changes",
  },
];

function PillarSelector() {
  const [active, setActive] = useState("career");
  const p = PILLARS.find((x) => x.id === active);

  return (
    <div className="pillars-shell">
      <div className="pillars-tabs">
        {PILLARS.map((pl) => (
          <button
            key={pl.id}
            className={`pillar-tab ${active === pl.id ? "active" : ""}`}
            onClick={() => setActive(pl.id)}
          >
            <img src={pl.icon} alt="" />
            <span className="tab-label">
              <span className="tab-name">{pl.name}</span>
              <span className="tab-sub">{pl.sub}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="pillar-panel" key={p.id}>
        <div className="pillar-panel-copy">
          <h3 dangerouslySetInnerHTML={{ __html: p.headline.replace(/\u2014/g, "<em>—</em>") }} />
          <p>{p.body}</p>
          <ul>
            {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
          <a href="#booking" className="btn btn-ivory">Book a call about this →</a>
        </div>
        <div className="pillar-stat">
          <div className="num">{p.statNum}</div>
          <div className="label">{p.statLabel}</div>
        </div>
      </div>
    </div>
  );
}

/* =========================================
   QUIZ LEAD MAGNET
   ========================================= */
function QuizCard() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="quiz-card">
        <div className="qc-eyebrow"><span className="pulse"></span> Sent to your inbox</div>
        <div className="qc-success">
          <strong>Check your email, {name || "friend"}.</strong>
          <p style={{ fontSize: 14, lineHeight: 1.5, color: "var(--cream-soft)" }}>
            Your 5-page Clarity Audit is on its way. Open the first email when
            you have 10 quiet minutes — it sets the tone for the rest.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-card">
      <div className="qc-eyebrow"><span className="pulse"></span> Free clarity audit</div>
      <h3>Where should you <em>start</em>?</h3>
      <div className="qc-meta">
        <span>6 questions</span>
        <span>2 minutes</span>
        <span>5-page guide</span>
      </div>
      <form onSubmit={onSubmit}>
        <label htmlFor="qc-name">Your first name</label>
        <input
          id="qc-name"
          type="text"
          placeholder="Jane"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="qc-email">Email address</label>
        <input
          id="qc-email"
          type="email"
          placeholder="you@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Start the audit →</button>
      </form>
      <p className="qc-fineprint">
        No spam. Unsubscribe anytime. We\u2019ll email you the audit link instantly.
      </p>
    </div>
  );
}

/* =========================================
   FAQ
   ========================================= */
const FAQS = [
  {
    q: "How is this different from therapy or another life-coach course?",
    a: "Therapy explores why. Most coaching courses sell motivation. The Full Bloom Method is a structured 12-week 1:1 programme — equal parts deep reflection and practical action — designed so the change actually sticks once we\u2019re finished.",
  },
  {
    q: "I\u2019m not sure I\u2019m \u2018ready.\u2019 Should I still book a call?",
    a: "Almost everyone says this. The discovery call is exactly where we figure that out together — there\u2019s zero pressure to commit. If it\u2019s not the right time, I\u2019ll tell you, and we\u2019ll part on great terms.",
  },
  {
    q: "What does the 12 weeks actually look like, week to week?",
    a: "One 60-minute 1:1 session per week (Zoom), a personalised reflection prompt between sessions, and voice-note support whenever something comes up. Weeks 1–3 focus on foundation, 4–8 on action, 9–12 on integration. You leave with a 6-month plan and a 30-day check-in.",
  },
  {
    q: "Is the £1,500 investment worth it?",
    a: "I\u2019m biased — but the average UK premium 1:1 coaching package runs £3,000–£5,000. More importantly: clients commonly recoup the investment within months through pay rises, pivots, or simply stopping things that were costing them more than money. And there\u2019s a 2-session refund window if it\u2019s not right.",
  },
  {
    q: "Can I do this if I\u2019m juggling a full-time job and family?",
    a: "Yes — most clients do. Sessions are flexible (evening and weekend slots available) and the work between sessions is intentionally light. The programme is designed for women with full lives, not blank calendars.",
  },
  {
    q: "What if I can\u2019t afford £1,500 right now?",
    a: "Choose the 3-payment plan (£550 to begin, then split across the programme), or join the Full Bloom community on Patreon (£8/mo) for tools and live workshops while you decide if 1:1 is right.",
  },
];

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq-list">
      {FAQS.map((f, i) => (
        <div key={i} className={`faq-item ${open === i ? "open" : ""}`} onClick={() => setOpen(open === i ? -1 : i)}>
          <div className="faq-q">
            <span>{f.q}</span>
            <button className="faq-toggle" aria-label="Toggle">+</button>
          </div>
          <div className="faq-a">
            <p>{f.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* =========================================
   URGENCY BANNER
   ========================================= */
function useCountdown(target) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { d, h, m, s };
}

// Cohort opens Mon 9 June 2026; bookings close Fri 6 June 2026 23:59
const COHORT_CLOSE = (() => {
  const t = new Date(2026, 5, 6, 23, 59, 59, 0); // June = month index 5
  // Fallback if today is past close: roll to +21 days so banner stays useful
  if (t.getTime() < Date.now()) {
    const f = new Date();
    f.setDate(f.getDate() + 21);
    f.setHours(23, 59, 59, 0);
    return f.getTime();
  }
  return t.getTime();
})();

function UrgencyBanner({ enabled, onClose, mode }) {
  const { d, h, m, s } = useCountdown(COHORT_CLOSE);
  if (!enabled) return null;
  const cd = (
    <span className="cd">
      <b>{String(d).padStart(2, "0")}</b>d <b>{String(h).padStart(2, "0")}</b>h <b>{String(m).padStart(2, "0")}</b>m <b>{String(s).padStart(2, "0")}</b>s
    </span>
  );
  const messages = {
    soft: <>Next cohort: <strong>Mon 9 June 2026</strong> · <strong>4 spots left</strong> · Closes in {cd} · <a href="#booking">Reserve your call →</a></>,
    scarcity: <><strong>Only 3 of 6 spots left</strong> · cohort closes <strong>Fri 6 June</strong> · {cd} · <a href="#booking">Book a call →</a></>,
    none: null,
  };
  return (
    <div className="urgency-banner">
      {mode === "scarcity" && <span className="pulse"></span>}
      <span>{messages[mode] || messages.soft}</span>
      <button className="x" onClick={onClose} aria-label="Dismiss">×</button>
    </div>
  );
}

/* =========================================
   HERO COPY VARIANTS
   ========================================= */
const HERO_VARIANTS = {
  unstuck: {
    h: "Get unstuck.<br /><em>Move forward with confidence.</em>",
    s: "A personal 12-week coaching programme for women ready to stop circling the same questions and start living the next chapter — with clarity, courage, and a coach in your corner.",
  },
  bloom: {
    h: "It\u2019s your turn<br /><em>to fully bloom.</em>",
    s: "1:1 coaching for women at a turning point — across career, wellbeing, relationships, and the small daily decisions that quietly shape a life.",
  },
  midlife: {
    h: "Midlife isn\u2019t a crisis.<br /><em>It\u2019s a beginning.</em>",
    s: "Twelve weeks of structured 1:1 coaching for women ready to write the next chapter on their own terms — not someone else\u2019s.",
  },
  enough: {
    h: "You\u2019ve been<br /><em>quietly ready</em> for a while.",
    s: "Full Bloom is the 12-week 1:1 programme for women who already know something needs to change — and want a real plan, a real coach, and someone in their corner.",
  },
};

/* =========================================
   PALETTE MODES
   ========================================= */
const PALETTES = {
  warm: {}, // default in CSS
  forest: {
    "--rust": "#3c4c24",
    "--rust-deep": "#2c3818",
    "--wine": "#1a2a0f",
    "--wine-dark": "#0e1a06",
  },
  rose: {
    "--rust": "#a04a52",
    "--rust-deep": "#7a3138",
    "--wine": "#4a1a24",
    "--wine-dark": "#2e0d15",
  },
};

/* =========================================
   MAIN APP
   ========================================= */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroVariant": "unstuck",
  "urgency": "soft",
  "palette": "warm",
  "showQuiz": true,
  "showCommunity": true,
  "showTrioTestimonials": true,
  "pricingDisplay": "visible"
}/*EDITMODE-END*/;

function applyHeroVariant(v) {
  const variant = HERO_VARIANTS[v] || HERO_VARIANTS.unstuck;
  const h = document.getElementById("hero-headline");
  const s = document.getElementById("hero-sub");
  if (h) h.innerHTML = variant.h;
  if (s) s.textContent = variant.s;
}

function applyPalette(p) {
  const root = document.documentElement;
  // reset
  ["--rust", "--rust-deep", "--wine", "--wine-dark"].forEach((k) => root.style.removeProperty(k));
  const overrides = PALETTES[p] || {};
  Object.entries(overrides).forEach(([k, v]) => root.style.setProperty(k, v));
}

function applyVisibility(tweaks) {
  const map = {
    showQuiz: "#quiz",
    showCommunity: ".community",
    showTrioTestimonials: ".testimonial-trio",
  };
  Object.entries(map).forEach(([key, sel]) => {
    const el = document.querySelector(sel);
    if (el) el.style.display = tweaks[key] ? "" : "none";
  });

  const pricing = document.querySelector(".pricing-grid");
  const pricingNote = document.querySelector(".pricing-sub");
  if (pricing) {
    if (tweaks.pricingDisplay === "hidden") {
      pricing.style.display = "none";
      if (pricingNote) pricingNote.innerHTML =
        "Investment is discussed on the discovery call — to make sure the programme is the right fit before we talk numbers. <a href='#booking' style='color:var(--rust); text-decoration:underline;'>Book a call →</a>";
    } else {
      pricing.style.display = "";
    }
  }
}

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [bannerVisible, setBannerVisible] = useState(true);

  useEffect(() => {
    applyHeroVariant(tweaks.heroVariant);
  }, [tweaks.heroVariant]);

  useEffect(() => {
    applyPalette(tweaks.palette);
  }, [tweaks.palette]);

  useEffect(() => {
    applyVisibility(tweaks);
  }, [tweaks]);

  // Banner spacing
  useEffect(() => {
    const bannerOn = tweaks.urgency !== "none" && bannerVisible;
    document.body.classList.toggle("has-banner", bannerOn);
  }, [tweaks.urgency, bannerVisible]);

  return (
    <>
      {ReactDOM.createPortal(
        <UrgencyBanner
          enabled={tweaks.urgency !== "none" && bannerVisible}
          mode={tweaks.urgency}
          onClose={() => setBannerVisible(false)}
        />,
        document.getElementById("urgency-mount")
      )}

      <TweaksPanel title="Tweaks">
        <TweakSection title="Hero copy">
          <TweakSelect
            label="Headline variant"
            value={tweaks.heroVariant}
            onChange={(v) => setTweak("heroVariant", v)}
            options={[
              { value: "unstuck", label: "Get unstuck (default)" },
              { value: "bloom", label: "It's your turn to bloom" },
              { value: "midlife", label: "Midlife isn't a crisis" },
              { value: "enough", label: "You've been quietly ready" },
            ]}
          />
        </TweakSection>

        <TweakSection title="Urgency banner">
          <TweakRadio
            label="Mode"
            value={tweaks.urgency}
            onChange={(v) => setTweak("urgency", v)}
            options={[
              { value: "soft", label: "Soft" },
              { value: "scarcity", label: "Scarcity" },
              { value: "none", label: "Off" },
            ]}
          />
        </TweakSection>

        <TweakSection title="Palette">
          <TweakRadio
            label="Mood"
            value={tweaks.palette}
            onChange={(v) => setTweak("palette", v)}
            options={[
              { value: "warm", label: "Warm (default)" },
              { value: "forest", label: "Forest" },
              { value: "rose", label: "Rose" },
            ]}
          />
        </TweakSection>

        <TweakSection title="Sections">
          <TweakToggle
            label="Lead-magnet quiz"
            value={tweaks.showQuiz}
            onChange={(v) => setTweak("showQuiz", v)}
          />
          <TweakToggle
            label="Community CTA"
            value={tweaks.showCommunity}
            onChange={(v) => setTweak("showCommunity", v)}
          />
          <TweakToggle
            label="Mini-testimonials"
            value={tweaks.showTrioTestimonials}
            onChange={(v) => setTweak("showTrioTestimonials", v)}
          />
        </TweakSection>

        <TweakSection title="Pricing">
          <TweakRadio
            label="Display"
            value={tweaks.pricingDisplay}
            onChange={(v) => setTweak("pricingDisplay", v)}
            options={[
              { value: "visible", label: "Show prices (default)" },
              { value: "hidden", label: "Hide — discuss on call" },
            ]}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

/* =========================================
   MOUNT
   ========================================= */
ReactDOM.createRoot(document.getElementById("pillars-mount")).render(<PillarSelector />);
ReactDOM.createRoot(document.getElementById("quiz-mount")).render(<QuizCard />);
ReactDOM.createRoot(document.getElementById("faq-mount")).render(<FAQ />);
ReactDOM.createRoot(document.getElementById("tweaks-mount")).render(<App />);
