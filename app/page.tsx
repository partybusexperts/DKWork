"use client";

import { useState } from "react";

type DemoId = "quotebot" | "audience" | "pulse" | "optimizer";

const demos: { id: DemoId; label: string; title: string; source: string; intro: string }[] = [
  { id: "quotebot", label: "Capture leads", title: "Turn a chat into a useful quote request", source: "QuoteBot + LiveChat", intro: "I built this because reps shouldn't have to chase basic trip details across chat and CRM screens. It gathers the request while keeping pricing and availability with people." },
  { id: "audience", label: "Test your message", title: "Find the message worth testing", source: "Synthetic Audience Lab", intro: "I built this to screen ideas before spending on real traffic. AI-simulated feedback can surface likely objections; only a real experiment measures conversions." },
  { id: "pulse", label: "Catch issues", title: "Catch meaningful changes automatically", source: "TCG Pulse", intro: "I built this because a broken source should never look like a real restock. It separates page failures from confirmed product changes and filters alert noise." },
  { id: "optimizer", label: "Improve pages", title: "Turn search data into the next action", source: "Page Optimizer", intro: "I built this because SEO advice needs page-level evidence. It joins Search Console, GA4, and deterministic audits, then leaves changes for a person to approve." }
];

const projects = [
  { name: "QuoteBot + LiveChat", type: "CRM + quote workflow", problem: "Zoho and separate quote/chat tools had sales reps bouncing between screens and repeating work.", story: "I built a connected workflow to replace that patchwork: structured intake, catalog-controlled quote rules, conversation context, and a human handoff for pricing or booking decisions." },
  { name: "Synthetic Audience Lab", type: "AI message testing", problem: "If a headline misses the mark, finding out after you buy traffic gets expensive.", story: "I built a lab to compare headlines, offers, ads, emails, and pages with AI-simulated audience segments—surfacing likely objections before a real test. The simulation is directional, not conversion data." },
  { name: "TCG Pulse", type: "Monitoring + alerts", problem: "Manual checks miss changes, while noisy alerts teach people to ignore the notifications.", story: "I built a scheduled monitor that tracks source health, detects known availability changes, and batches useful alerts. A blocked page is reported as an error—not a fake restock." },
  { name: "Page Optimizer", type: "SEO + analytics", problem: "SEO recommendations without page evidence are guesswork, and unreviewed AI edits are risky.", story: "I built a page-level workflow using Search Console, GA4, and deterministic audits to identify the next review action. A person checks the evidence and approves changes; it doesn't publish for you." },
  { name: "Camille Desk", type: "AI-assisted outreach", problem: "Callers waste prep time researching each prospect and start with too little context.", story: "I built a desk that turns a prospect's website into likely contacts, related vendors, and three concise talking points—then organizes call outcomes and follow-ups. A human makes the call using a consistent script." },
  { name: "Transportation directories", type: "Multi-market lead generation", problem: "A one-city site has a ceiling, and rebuilding every market from scratch wastes effort.", story: "I built reusable directory systems to launch focused sites across markets, capture and attribute inquiries, and route them to operators. Selling qualified surplus leads is a revenue option when partner demand supports it—not revenue I’m claiming here." }
];

function QuoteBotDemo() {
  const [eventType, setEventType] = useState("");
  const [guests, setGuests] = useState("");
  const [date, setDate] = useState("");
  const [city, setCity] = useState("");
  const [complete, setComplete] = useState(false);

  const reset = () => { setEventType(""); setGuests(""); setDate(""); setCity(""); setComplete(false); };

  return <div className="product-window">
    <div className="window-top"><div className="window-dots"><i /><i /><i /></div><span>QUOTEBOT · CUSTOMER INTAKE</span><span className="safe-label">DEMO</span></div>
    <div className="quote-layout">
      <div className="quote-chat">
        <div className="assistant-line"><span className="assistant-mark">AI</span><div><small>QuoteBot</small><p>Hi! I can help get your quote request ready. What kind of event are you planning?</p></div></div>
        {!eventType && <div className="quick-choices">{["Wedding", "Birthday", "Corporate event", "Something else"].map((choice) => <button key={choice} onClick={() => setEventType(choice)}>{choice}<span>↗</span></button>)}</div>}
        {eventType && <div className="user-line"><span>{eventType}</span></div>}
        {eventType && <div className="assistant-line"><span className="assistant-mark">AI</span><div><small>QuoteBot</small><p>Got it. About how many people should the vehicle accommodate?</p></div></div>}
        {eventType && !guests && <div className="quick-choices compact">{["1–10", "11–20", "21–30", "31+"].map((choice) => <button key={choice} onClick={() => setGuests(choice)}>{choice}</button>)}</div>}
        {guests && <div className="user-line"><span>{guests} guests</span></div>}
        {guests && <div className="assistant-line"><span className="assistant-mark">AI</span><div><small>QuoteBot</small><p>When do you need the ride?</p></div></div>}
        {guests && !date && <div className="quick-choices compact">{["This week", "Next week", "Later date"].map((choice) => <button key={choice} onClick={() => setDate(choice)}>{choice}</button>)}</div>}
        {date && <div className="user-line"><span>{date}</span></div>}
        {date && !complete && <div className="city-entry"><label htmlFor="pickup-city">Pickup city</label><div><input id="pickup-city" value={city} onChange={(event) => setCity(event.target.value)} placeholder="e.g. Phoenix" /><button disabled={!city.trim()} onClick={() => setComplete(true)}>Continue →</button></div></div>}
        {complete && <div className="handoff-card"><span className="handoff-check">✓</span><div><strong>Request ready for review</strong><p>{eventType} · {guests} guests · {date} · {city}</p><small>No request was sent. This is a private demo.</small></div></div>}
        {(eventType || complete) && <button className="reset-link" onClick={reset}>Start over</button>}
      </div>
      <aside className="behind-card"><span className="section-kicker">WHAT THE SYSTEM DOES</span><ul><li><b>01</b> Collects useful details in a conversation</li><li><b>02</b> Keeps quote rules deterministic</li><li><b>03</b> Sends availability and booking decisions to a human</li></ul><span className="built-from">Built from the QuoteBot + LiveChat workflow</span></aside>
    </div>
  </div>;
}

function AudienceDemo() {
  const [first, setFirst] = useState("Need a party bus for your next big event?");
  const [second, setSecond] = useState("Get the right ride for your group and event.");
  const [ran, setRan] = useState(false);
  const [audience, setAudience] = useState("Party bus shoppers");

  const review = (text: string) => {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const hasOffer = /(book|quote|ride|bus|group|price|event|service|home|inspection|treatment)/i.test(text);
    if (words < 5) return "A shopper may not know what the business offers yet. Add the service or outcome.";
    if (!hasOffer) return "The benefit is still broad. Name the service or the result the customer wants.";
    if (words > 13) return "This may take too long to scan. Try a shorter, more direct promise.";
    return "Clear starting point. Test whether adding a specific customer benefit makes it more compelling.";
  };

  return <div className="product-window">
    <div className="window-top"><div className="window-dots"><i /><i /><i /></div><span>SYNTHETIC AUDIENCE LAB</span><span className="safe-label">PREVIEW</span></div>
    <div className="audience-demo">
      <div className="audience-controls"><label htmlFor="audience-type">Audience</label><select id="audience-type" value={audience} onChange={(event) => { setAudience(event.target.value); setRan(false); }}><option>Party bus shoppers</option><option>Pest control leads</option><option>Home service customers</option></select><span>Compare two headlines</span></div>
      <p className="audience-disclosure">This preview uses simple local checks. The full product uses AI-simulated feedback—not real conversion data.</p>
      <div className="copy-variants"><label><span>HEADLINE A</span><textarea value={first} onChange={(event) => { setFirst(event.target.value); setRan(false); }} rows={2} /></label><label><span>HEADLINE B</span><textarea value={second} onChange={(event) => { setSecond(event.target.value); setRan(false); }} rows={2} /></label></div>
      <button className="yellow-button" onClick={() => setRan(true)}>{ran ? "Run it again" : "Preview audience feedback →"}</button>
      {ran && <div className="audience-results"><span className="section-kicker">DIRECTIONAL FEEDBACK · {audience.toUpperCase()}</span><div><b>A</b><p>{review(first)}</p></div><div><b>B</b><p>{review(second)}</p></div><small>This quick preview uses simple local rules. Synthetic audience runs in the full product are AI-generated and directional; real A/B tests measure actual behavior.</small></div>}
    </div>
  </div>;
}

function PulseDemo() {
  const [state, setState] = useState<"normal" | "changed" | "source-error">("normal");
  return <div className="product-window">
    <div className="window-top"><div className="window-dots"><i /><i /><i /></div><span>TCG PULSE · SOURCE MONITOR</span><span className="safe-label">DEMO DATA</span></div>
    <div className="pulse-demo"><div className="pulse-toolbar"><div><span className="pulse-light" /><strong>Retailer monitor</strong><small>Scheduled checks · quiet unless something matters</small></div><label>Simulate<select value={state} onChange={(event) => setState(event.target.value as typeof state)}><option value="normal">No change</option><option value="changed">Availability changed</option><option value="source-error">Source blocked</option></select></label></div>
      <div className="source-row"><span className="source-icon">P</span><div><strong>Pokémon Center</strong><small>Product page · last check just now</small></div><span className={`source-status ${state === "source-error" ? "attention" : ""}`}>{state === "source-error" ? "Source blocked" : "Source healthy"}</span></div>
      <div className="source-row"><span className="source-icon dark">T</span><div><strong>Target</strong><small>Product page · last check just now</small></div><span className="source-status">Source healthy</span></div>
      <div className={`signal-card ${state === "changed" ? "signal-change" : state === "source-error" ? "signal-error" : ""}`}><span>{state === "changed" ? "PRODUCT STATE CHANGE" : state === "source-error" ? "SOURCE ERROR" : "NO ALERT"}</span><strong>{state === "changed" ? "Known out-of-stock → available transition" : state === "source-error" ? "A blocked page is reported as a source issue, never as a restock" : "No meaningful product change. No notification sent."}</strong><p>{state === "changed" ? "The change can be deduplicated and added to a consolidated Telegram digest." : state === "source-error" ? "Monitoring stays honest: a failed check cannot create a false stock alert." : "Quiet hours, cooldowns, and daily caps keep notifications useful."}</p></div>
      <div className="pulse-footer"><span>Built with scheduled checks · source health · state tracking · Telegram digests</span><span>Sample display</span></div>
    </div>
  </div>;
}

function OptimizerDemo() {
  const [ran, setRan] = useState(false);
  const [page, setPage] = useState("/services/party-bus");
  return <div className="product-window">
    <div className="window-top"><div className="window-dots"><i /><i /><i /></div><span>PAGE OPTIMIZER · REVIEW QUEUE</span><span className="safe-label">SAMPLE URL</span></div>
    <div className="optimizer-demo"><div className="optimizer-toolbar"><label htmlFor="page-path">Page to review</label><div><input id="page-path" value={page} onChange={(event) => { setPage(event.target.value); setRan(false); }} /><button className="yellow-button" onClick={() => setRan(true)}>{ran ? "Refresh review" : "Review page →"}</button></div></div>
      {!ran ? <div className="optimizer-empty"><span className="search-icon">⌕</span><strong>Run a sample page review</strong><p>See how search signals, analytics events, and page checks become a prioritized next step.</p></div> : <div className="review-result"><div className="review-title"><div><span className="section-kicker">REVIEW RESULT</span><strong>{page || "/your-page"}</strong></div><span className="review-badge">HUMAN REVIEW REQUIRED</span></div><div className="review-grid"><div><span>SEARCH CONSOLE</span><b>Check query intent and page visibility</b></div><div><span>GA4</span><b>Confirm lead events are working</b></div><div><span>PAGE AUDIT</span><b>Check the offer and next step</b></div></div><div className="recommendation"><span>RECOMMENDED NEXT ACTION</span><strong>Compare the page promise with the searches bringing visitors here.</strong><p>Evidence is attached to the recommendation. The system does not publish changes on its own.</p></div></div>}
      <div className="optimizer-footer">Built from a real Search Console + GA4 page-optimization workflow</div>
    </div>
  </div>;
}

export default function Home() {
  const [active, setActive] = useState<DemoId>("quotebot");
  const selected = demos.find((demo) => demo.id === active) ?? demos[0];

  const tryDemo = () => document.getElementById("demo-lab")?.scrollIntoView({ behavior: "smooth", block: "start" });

  return <main className="portfolio">
    <header className="site-nav"><a className="wordmark" href="#top"><span>DK</span><strong>DAN KOLBABA</strong></a><nav><a href="#work">Work I built</a><a href="mailto:hello@leadwave.dev" className="nav-contact">Talk about your project <span>↗</span></a></nav></header>

    <section className="hero" id="top"><div className="hero-copy"><span className="eyebrow">AI · CUSTOM SOFTWARE · AUTOMATION</span><h1>Stop letting good leads<br /><em>go cold.</em></h1><p>I built these for problems I know firsthand: quote requests missing key details, sales work scattered across tools, and important changes buried in noise. Each demo shows the system I made to fix one.</p><div className="hero-actions"><button className="yellow-button" onClick={tryDemo}>Try a system <span>↓</span></button><a href="mailto:hello@leadwave.dev">Tell me what you want to improve <span>↗</span></a></div><div className="hero-promise"><span /> Clear updates. Real progress. No mystery handoff.</div></div><div className="hero-side"><div className="hero-terminal"><div className="terminal-head"><span><i /><i /><i /></span><small>QUOTEBOT · SAMPLE</small></div><div className="terminal-body quote-preview"><span className="preview-kicker">NEW CUSTOMER MESSAGE</span><div className="preview-customer">“I need a party bus for 20 friends.”</div><div className="preview-assistant"><span className="assistant-mark">AI</span><div><small>QuoteBot</small><p>Sure—what date and pickup city should we start with?</p></div></div><div className="preview-handoff"><span>LEAD INTAKE</span><strong>Ready for sales follow-up</strong><small>Pricing and availability stay with your team.</small></div></div></div><div className="hero-caption">Sample workflow · no live customer data.</div></div></section>

    <section className="demo-section" id="demo-lab"><div className="section-heading"><div><span className="eyebrow">TRY WHAT I BUILT</span><h2>Pick a business problem.</h2></div><p>These are real products I built, shown with safe sample interactions. Click a problem to see how I approached it.</p></div>
      <div className="demo-tabs" role="tablist" aria-label="Interactive system demos">{demos.map((demo) => <button key={demo.id} role="tab" aria-selected={active === demo.id} className={active === demo.id ? "demo-tab active" : "demo-tab"} onClick={() => setActive(demo.id)}><span>{demo.label}</span><b>↗</b></button>)}</div>
      <div className="demo-intro"><div><span className="demo-source">BUILT PROJECT · {selected.source.toUpperCase()}</span><h3>{selected.title}</h3></div><p>{selected.intro}</p></div>
      {active === "quotebot" && <QuoteBotDemo />}
      {active === "audience" && <AudienceDemo />}
      {active === "pulse" && <PulseDemo />}
      {active === "optimizer" && <OptimizerDemo />}
    </section>

    <section className="work-section" id="work"><div className="section-heading"><div><span className="eyebrow">WHY I BUILT THEM</span><h2>Every project started with a problem.</h2></div><p>Here’s the problem I saw—and the system I built to solve it.</p></div><div className="project-grid">{projects.map((project, index) => <article className="project-card" key={project.name}><div className="project-card-top"><span className="project-index">0{index + 1}</span><span className="project-type">{project.type}</span></div><h3>{project.name}</h3><span className="project-label">THE PROBLEM</span><p className="project-problem">{project.problem}</p><div className="project-build"><span>WHAT I BUILT AND WHY</span><p>{project.story}</p></div></article>)}</div></section>

    <section className="closing"><div><span className="eyebrow">GOT A PROCESS THAT IS COSTING YOU TIME?</span><h2>Let’s make the next step easier.</h2><p>Tell me what your team struggles with. I’ll ask the questions early, explain tradeoffs, and show you what’s happening as the build moves forward.</p></div><a className="yellow-button contact-cta" href="mailto:hello@leadwave.dev">Start a conversation <span>↗</span></a></section>
    <footer className="site-footer"><span>Dan Kolbaba · AI and custom software</span><span>© 2026</span></footer>
  </main>;
}
