"use client";

import { useState } from "react";

type DemoId = "quotebot" | "audience" | "pulse" | "optimizer";

const demos: { id: DemoId; label: string; title: string; source: string; intro: string }[] = [
  { id: "quotebot", label: "QuoteBot", title: "Turn a chat into a useful quote request", source: "QuoteBot + LiveChat", intro: "See how the assistant gathers the details a sales rep needs, while leaving pricing and availability decisions to the business." },
  { id: "audience", label: "A/B testing", title: "Find the message worth testing", source: "Synthetic Audience Lab", intro: "Compare page headlines with simulated customer feedback. The full product explores objections and audience segments before real traffic is spent." },
  { id: "pulse", label: "Alerts", title: "Catch meaningful changes automatically", source: "TCG Pulse", intro: "A product monitor checks sources, spots real state changes, filters noise, and batches useful alerts." },
  { id: "optimizer", label: "Analytics", title: "Turn search data into the next action", source: "Page Optimizer", intro: "Connect page evidence from Search Console and GA4 to a clear review queue, with a person approving any change." }
];

const projects = [
  { name: "QuoteBot + LiveChat", type: "AI lead intake", text: "Structured quote conversations, catalog-aware rules, customer context, and a deliberate handoff to a person." },
  { name: "Synthetic Audience Lab", type: "AI testing", text: "Run headline, landing page, ad, email, and offer tests against AI-simulated audiences. See objections and segment feedback, then validate with real traffic." },
  { name: "TCG Pulse", type: "Monitoring", text: "Scheduled retailer checks, source-health tracking, real availability transitions, deduplicated alerts, and Telegram digests." },
  { name: "Page Optimizer", type: "Analytics + SEO", text: "Use Search Console, GA4, and page audits to build a prioritized improvement workflow with evidence and human review." },
  { name: "Camille Desk", type: "AI-assisted outreach", text: "Read a prospect’s website, surface people and conversation starters for a human caller, then organize call outcomes and follow-up." },
  { name: "Transportation directories", type: "Lead generation", text: "Build focused sites and reusable systems that capture, attribute, route, and follow up on service inquiries." }
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

    <section className="hero" id="top"><div className="hero-copy"><span className="eyebrow">AI · CUSTOM SOFTWARE · AUTOMATION</span><h1>I build AI that<br /><em>does useful work.</em></h1><p>I build systems that qualify leads, test what customers respond to, and catch problems early—then keep you informed at every step.</p><div className="hero-actions"><button className="yellow-button" onClick={tryDemo}>Try a system <span>↓</span></button><a href="mailto:hello@leadwave.dev">Tell me what you want to improve <span>↗</span></a></div><div className="hero-promise"><span /> Clear updates. Real progress. No mystery handoff.</div></div><div className="hero-side"><div className="hero-terminal"><div className="terminal-head"><span><i /><i /><i /></span><small>HOW I BUILD</small></div><div className="terminal-body"><p><b>01</b><span>Understand the business problem</span></p><p><b>02</b><span>Build the right workflow</span></p><p><b>03</b><span>Use AI where it helps</span></p><p><b>04</b><span>Keep a human in control</span></p><div className="terminal-line"><span>system</span> ready for your idea<span className="cursor">_</span></div></div></div><div className="hero-caption">From a first idea to a working product.</div></div></section>

    <section className="demo-section" id="demo-lab"><div className="section-heading"><div><span className="eyebrow">TRY WHAT I BUILD</span><h2>Pick a business problem.</h2></div><p>These hands-on previews follow real systems I’ve built. Use the controls to see how each workflow behaves.</p></div>
      <div className="demo-tabs" role="tablist" aria-label="Interactive system demos">{demos.map((demo) => <button key={demo.id} role="tab" aria-selected={active === demo.id} className={active === demo.id ? "demo-tab active" : "demo-tab"} onClick={() => setActive(demo.id)}><span>{demo.label}</span><b>↗</b></button>)}</div>
      <div className="demo-intro"><div><span className="demo-source">BUILT PROJECT · {selected.source.toUpperCase()}</span><h3>{selected.title}</h3></div><p>{selected.intro}</p></div>
      {active === "quotebot" && <QuoteBotDemo />}
      {active === "audience" && <AudienceDemo />}
      {active === "pulse" && <PulseDemo />}
      {active === "optimizer" && <OptimizerDemo />}
    </section>

    <section className="work-section" id="work"><div className="section-heading"><div><span className="eyebrow">SELECTED WORK</span><h2>Real systems. Real business problems.</h2></div><p>These are the kinds of products and workflows I build. The demos above use safe sample interactions.</p></div><div className="project-grid">{projects.map((project, index) => <article className="project-card" key={project.name}><div className="project-card-top"><span className="project-index">0{index + 1}</span><span className="project-type">{project.type}</span></div><h3>{project.name}</h3><p>{project.text}</p></article>)}</div></section>

    <section className="closing"><div><span className="eyebrow">GOT A PROCESS THAT IS COSTING YOU TIME?</span><h2>Let’s make the next step easier.</h2><p>Tell me what your team struggles with. I’ll ask the questions early, explain tradeoffs, and show you what’s happening as the build moves forward.</p></div><a className="yellow-button contact-cta" href="mailto:hello@leadwave.dev">Start a conversation <span>↗</span></a></section>
    <footer className="site-footer"><span>Dan Kolbaba · AI and custom software</span><span>© 2026</span></footer>
  </main>;
}
