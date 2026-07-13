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
    q: "How is Full Bloom different from other coaching programmes?",
    a: "Full Bloom is not a course, a workbook, or a group programme. It is a structured, deeply personal 12-week journey, just the two of us. We work from the inside out, reflection and action together, until the change is genuinely yours to keep.",
  },
  {
    q: "What does a typical week actually look like?",
    a: "One 60-minute 1:1 session on Zoom, a personal reflection prompt to sit with in between, and voice-note support whenever something comes up. Every phase builds on the last: weeks 1 to 3 open things up, weeks 4 to 8 deepen the work, and weeks 9 to 12 make it permanent. You finish with a 6-month forward plan and a 30-day check-in with me.",
  },
  {
    q: "I have a full life already. Is this realistic for me?",
    a: "Absolutely. Before the programme begins, we have a dedicated time planning call together. We look at your real week and find where everything fits, so nothing is left to chance. The work between sessions is intentional, not heavy, and it all belongs somewhere in your life from day one.",
  },
  {
    q: "Is the \u00a31,500 investment worth it?",
    a: "That works out at \u00a3125 a week for a programme that changes how you think, how you move through the world, and what you believe is possible for you. The tools, the clarity, and the confidence you leave with are yours for life. That is not something you can put a price on.",
  },
  {
    q: "What if \u00a31,500 is not possible for me right now?",
    a: "You can spread the investment across three payments, starting with \u00a3550. If the timing is not quite right for 1:1 work, the Full Bloom community is a beautiful place to begin.",
  },
  {
    q: "How do I know if I am ready to book a call?",
    a: "If something in you is asking that question, you are ready enough. The discovery call is a conversation, not a commitment. We talk, we see if there is a fit, and we go from there. There is no pressure, only honesty.",
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
   HERO COPY VARIANTS
   ========================================= */
const HERO_VARIANTS = {
  unstuck: {
    h: "Move forward with confidence.",
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
function mountReactComponent(id, component) {
  const mountNode = document.getElementById(id);

  if (!mountNode) return;

  ReactDOM.createRoot(mountNode).render(component);
}

mountReactComponent("pillars-mount", <PillarSelector />);
mountReactComponent("quiz-mount", <QuizCard />);
mountReactComponent("faq-mount", <FAQ />);
mountReactComponent("tweaks-mount", <App />);
