"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { statusLabel, workGroups, workItems, type WorkItem, type WorkStatus } from "./catalog-data";

function QuoteBotDemo() {
  const [eventType, setEventType] = useState("");
  const [guests, setGuests] = useState("");
  const [date, setDate] = useState("");
  const [city, setCity] = useState("");
  const [complete, setComplete] = useState(false);

  const reset = () => { setEventType(""); setGuests(""); setDate(""); setCity(""); setComplete(false); };

  return <div className="product-window">
    <div className="window-top"><div className="window-dots"><i /><i /><i /></div><span>QUOTE CHATBOT · SAMPLE</span><span className="safe-label">SAMPLE</span></div>
    <div className="quote-layout">
      <div className="quote-chat">
        <div className="assistant-line"><span className="assistant-mark">AI</span><div><small>QuoteBot</small><p>I can help collect the details for your quote. What are you planning?</p></div></div>
        {!eventType && <div className="quick-choices">{["Wedding", "Birthday", "Corporate event", "Something else"].map((choice) => <button key={choice} onClick={() => setEventType(choice)}>{choice}<span>↗</span></button>)}</div>}
        {eventType && <div className="user-line"><span>{eventType}</span></div>}
        {eventType && <div className="assistant-line"><span className="assistant-mark">AI</span><div><small>QuoteBot</small><p>About how many people need a ride?</p></div></div>}
        {eventType && !guests && <div className="quick-choices compact">{["1–10", "11–20", "21–30", "31+"].map((choice) => <button key={choice} onClick={() => setGuests(choice)}>{choice}</button>)}</div>}
        {guests && <div className="user-line"><span>{guests} guests</span></div>}
        {guests && <div className="assistant-line"><span className="assistant-mark">AI</span><div><small>QuoteBot</small><p>When do you need the ride?</p></div></div>}
        {guests && !date && <div className="quick-choices compact">{["This week", "Next week", "Later date"].map((choice) => <button key={choice} onClick={() => setDate(choice)}>{choice}</button>)}</div>}
        {date && <div className="user-line"><span>{date}</span></div>}
        {date && !complete && <div className="city-entry"><label htmlFor="pickup-city">Pickup city</label><div><input id="pickup-city" value={city} onChange={(event) => setCity(event.target.value)} placeholder="e.g. Phoenix" /><button disabled={!city.trim()} onClick={() => setComplete(true)}>Continue →</button></div></div>}
        {complete && <div className="handoff-card"><span className="handoff-check">✓</span><div><strong>Example request is ready</strong><p>{eventType} · {guests} guests · {date} · {city}</p><small>This is only a sample. It will not send a real request.</small></div></div>}
        {(eventType || complete) && <button className="reset-link" onClick={reset}>Start over</button>}
      </div>
      <aside className="behind-card"><span className="section-kicker">HOW THIS HELPS</span><ul><li><b>01</b> Asks customers the usual questions</li><li><b>02</b> Puts their trip details in one place</li><li><b>03</b> Lets your team handle prices and bookings</li></ul><span className="built-from">From my QuoteBot project</span></aside>
    </div>
  </div>;
}

function AudienceDemo() {
  const [first, setFirst] = useState("Need a party bus for your next big event?");
  const [second, setSecond] = useState("Check Phoenix party bus availability and get a clear quote fast.");
  const [ran, setRan] = useState(true);
  const [audience, setAudience] = useState("Party bus shoppers");

  const review = (text: string) => {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const hasOffer = /(book|quote|ride|bus|group|price|event|service|home|inspection|treatment)/i.test(text);
    const hasNextStep = /(book|quote|get|check|call|compare|schedule|availability|reserve|request)/i.test(text);
    const hasConcreteBenefit = /(price|pricing|clear|fast|quick|available|availability|same.day|upfront)/i.test(text);
    if (words < 5) return "People may not know what you offer yet. Name the service and the result they want.";
    if (!hasOffer) return "This message is vague. Say what service you offer and how it helps.";
    if (words > 13) return "This may be too long to read quickly. Try a shorter message.";
    if (!hasNextStep) return "People may not know what to do next. Tell them how to ask for a quote or book.";
    if (!hasConcreteBenefit) return "Say why your service is worth choosing—for example, a quick reply or clear pricing.";
    return "This says what you offer and what to do next. Check how real customers respond before choosing it.";
  };

  return <div className="product-window">
    <div className="window-top"><div className="window-dots"><i /><i /><i /></div><span>MESSAGE CHECK · SAMPLE</span><span className="safe-label">SAMPLE</span></div>
    <div className="audience-demo">
      <div className="audience-controls"><label htmlFor="audience-type">Who is this for?</label><select id="audience-type" value={audience} onChange={(event) => { setAudience(event.target.value); setRan(false); }}><option>Party bus shoppers</option><option>Pest control leads</option><option>Home service customers</option></select><span>Compare two messages</span></div>
      <p className="audience-disclosure">This sample checks whether a message is clear. It does not use customer data or run a live test.</p>
      <div className="copy-variants"><label><span>MESSAGE A</span><textarea value={first} onChange={(event) => { setFirst(event.target.value); setRan(false); }} rows={2} /></label><label><span>MESSAGE B</span><textarea value={second} onChange={(event) => { setSecond(event.target.value); setRan(false); }} rows={2} /></label></div>
      <button className="yellow-button" onClick={() => setRan(true)}>{ran ? "Check again" : "Check these messages →"}</button>
      {ran && <div className="audience-results"><span className="section-kicker">WHAT A SHOPPER MIGHT THINK · {audience.toUpperCase()}</span><div><b>A</b><p>{review(first)}</p></div><div><b>B</b><p>{review(second)}</p></div><small>This is a writing suggestion, not a real test. To know which message gets more customers, show both to real visitors and count the results.</small></div>}
    </div>
  </div>;
}

function PulseDemo() {
  const [state, setState] = useState<"normal" | "changed" | "source-error">("changed");
  return <div className="product-window">
    <div className="window-top"><div className="window-dots"><i /><i /><i /></div><span>AUTOMATIC ALERTS · SAMPLE</span><span className="safe-label">SAMPLE</span></div>
    <div className="pulse-demo"><div className="pulse-toolbar"><div><span className="pulse-light" /><strong>Product page checks</strong><small>Get a message only when something changes</small></div><label>Show me<select value={state} onChange={(event) => setState(event.target.value as typeof state)}><option value="normal">No change</option><option value="changed">Item is back in stock</option><option value="source-error">Page could not be checked</option></select></label></div>
      <div className="source-row"><span className="source-icon">P</span><div><strong>Pokémon Center</strong><small>Example product page</small></div><span className={`source-status ${state === "source-error" ? "attention" : ""}`}>{state === "source-error" ? "Page not checked" : "Page checked"}</span></div>
      <div className="source-row"><span className="source-icon dark">T</span><div><strong>Target</strong><small>Example product page</small></div><span className="source-status">Page checked</span></div>
      <div className={`signal-card ${state === "changed" ? "signal-change" : state === "source-error" ? "signal-error" : ""}`}><span>{state === "changed" ? "STOCK CHANGED" : state === "source-error" ? "CHECK FAILED" : "NO CHANGE"}</span><strong>{state === "changed" ? "The item changed from unavailable to available." : state === "source-error" ? "The store page could not be checked. That does not mean the item is in stock." : "Nothing changed, so no alert is needed."}</strong><p>{state === "changed" ? "Send one useful alert so you can act quickly." : state === "source-error" ? "A broken page is reported as a problem—not a false stock alert." : "No change means no unnecessary message."}</p></div>
      <div className="pulse-footer"><span>Checks for changes and sends a useful alert</span><span>Sample only</span></div>
    </div>
  </div>;
}

function OptimizerDemo() {
  const [ran, setRan] = useState(true);
  const [page, setPage] = useState("/services/party-bus");
  return <div className="product-window">
    <div className="window-top"><div className="window-dots"><i /><i /><i /></div><span>WEBSITE CHECK · SAMPLE</span><span className="safe-label">SAMPLE</span></div>
    <div className="optimizer-demo"><div className="optimizer-toolbar"><label htmlFor="page-path">Page to check</label><div><input id="page-path" value={page} onChange={(event) => { setPage(event.target.value); setRan(false); }} /><button className="yellow-button" onClick={() => setRan(true)}>{ran ? "Check again" : "Check this page →"}</button></div></div>
      {!ran ? <div className="optimizer-empty"><span className="search-icon">⌕</span><strong>See a sample website check</strong><p>Find out if the page answers what people are looking for and makes the next step clear.</p></div> : <div className="review-result"><div className="review-title"><div><span className="section-kicker">WHAT TO CHECK</span><strong>{page || "/your-page"}</strong></div><span className="review-badge">CHECK BEFORE CHANGING</span></div><div className="review-grid"><div><span>WHAT PEOPLE SEARCH</span><b>Does the page answer their question?</b></div><div><span>QUOTE REQUESTS</span><b>Are quote requests being counted?</b></div><div><span>THE NEXT STEP</span><b>Can visitors tell what to do?</b></div></div><div className="recommendation"><span>A USEFUL NEXT STEP</span><strong>Make sure this page answers what people searched for.</strong><p>This is an example only. It is not connected to your website or Google account.</p></div></div>}
      <div className="optimizer-footer">From my website and visitor-checking project · Sample only</div>
    </div>
  </div>;
}

const statusClass: Record<WorkStatus, string> = {
  confirmed: "confirmed",
  listed: "listed",
  source: "source",
  paused: "paused",
  prototype: "prototype",
  prelaunch: "prototype",
  development: "prototype",
  empty: "paused",
};

const groupNames: Record<string, string> = {
  "AI, sales & automation": "Sales tools",
  Transportation: "Transportation websites",
  "Pest-control sites": "Pest-control websites",
  "Dashboards & alerts": "Reports & alerts",
  "Directories & lead generation": "Directories",
  "Other websites": "Other websites",
  "Other apps & experiments": "Other tools",
  "Platforms & infrastructure": "Tools behind the scenes",
};

function DemoPanel({ demo }: { demo: WorkItem["demo"] }) {
  if (!demo) return null;
  return <section className="selected-demo" aria-label="Interactive project walkthrough">
    <div className="selected-demo-heading"><span className="eyebrow">TRY A SAMPLE</span><p>This is just a sample. It will not contact customers or send a request.</p></div>
    {demo === "quotebot" && <QuoteBotDemo />}
    {demo === "audience" && <AudienceDemo />}
    {demo === "pulse" && <PulseDemo />}
    {demo === "optimizer" && <OptimizerDemo />}
  </section>;
}

function WorkDetail({ item }: { item: WorkItem }) {
  const verified = item.status === "confirmed" && item.domain;
  const listed = item.status !== "confirmed" && item.status !== "paused" && item.status !== "prelaunch" && item.status !== "empty" && item.domain;
  const paused = item.status === "paused";

  return <article className="work-detail" key={item.id}>
    <div className="detail-topline"><span>{groupNames[item.group] ?? item.group}</span><span className={`status-badge ${statusClass[item.status]}`}><i />{statusLabel[item.status]}</span></div>
    <h2>{item.title}</h2>
    {item.domain && <div className="detail-domain">{item.domain}</div>}
    <p className="detail-summary">{item.what}</p>
    <div className="detail-actions">
      {verified && <a className="yellow-button" href={`https://${item.domain}`} target="_blank" rel="noreferrer">Visit website <span>↗</span></a>}
      {listed && <a className="secondary-link" href={`https://${item.domain}`} target="_blank" rel="noreferrer">Try website <span>↗</span><small>It has not been checked recently</small></a>}
      {item.repo && <a className="secondary-link" href={item.repo} target="_blank" rel="noreferrer">See project code <span>↗</span></a>}
      {item.preview && !paused && <a className="secondary-link subdued-link" href={item.preview} target="_blank" rel="noreferrer">Open sample preview <span>↗</span><small>This link may not be live</small></a>}
      {paused && <span className="paused-note">This sample website is paused right now. The project code is still available.</span>}
    </div>
    <div className="detail-story">
      <section className="story-card"><span className="story-label">WHY I BUILT IT</span><p>{item.why}</p></section>
      <section className="story-card built-card"><span className="story-label">WHAT IT DOES</span><p>{item.built}</p></section>
    </div>
    {item.demo && <DemoPanel demo={item.demo} />}
    <div className="detail-footer"><span>Clear plan · regular updates · you approve important decisions</span><a href="mailto:hello@leadwave.dev">Have a problem like this? Let’s talk ↗</a></div>
  </article>;
}

export default function Home() {
  const defaultItem = workItems.find((item) => item.id === "repo-chatbot-awesome") ?? workItems[0];
  const [selected, setSelected] = useState(defaultItem);
  const [search, setSearch] = useState("");
  const [openGroups, setOpenGroups] = useState<string[]>([defaultItem.group]);
  const portfolioRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("work");
    const initial = workItems.find((item) => item.id === requested);
    if (initial) {
      if (portfolioRef.current) portfolioRef.current.open = true;
      setSelected(initial);
      setOpenGroups((groups) => groups.includes(initial.group) ? groups : [...groups, initial.group]);
    }
  }, []);

  const normalizedSearch = search.trim().toLowerCase();
  const groupedItems = useMemo(() => workGroups.map((group) => ({
    group,
    items: workItems.filter((item) => item.group === group && (!normalizedSearch || `${item.title} ${item.domain ?? ""} ${item.what}`.toLowerCase().includes(normalizedSearch))),
  })).filter((entry) => entry.items.length > 0), [normalizedSearch]);

  const selectItem = (item: WorkItem) => {
    setSelected(item);
    setOpenGroups((groups) => groups.includes(item.group) ? groups : [...groups, item.group]);
    const url = new URL(window.location.href);
    url.searchParams.set("work", item.id);
    window.history.replaceState(null, "", url);
  };

  const repoCount = workItems.filter((item) => item.id.startsWith("repo-")).length;
  const confirmedCount = workItems.filter((item) => item.status === "confirmed").length;
  const groupCount = (group: string) => workItems.filter((item) => item.group === group).length;

  return <main className="portfolio sales-page">
    <header className="site-nav sales-nav">
      <a className="wordmark" href="/" aria-label="Dan Kolbaba home"><span>DK</span><strong>DAN KOLBABA</strong></a>
      <nav aria-label="Main navigation"><a href="#services">What I fix</a><a href="#leadwave">Leadwave example</a><a href="#portfolio" onClick={() => { if (portfolioRef.current) portfolioRef.current.open = true; }}>All projects</a><a className="nav-contact" href="#contact">Get help <span>↗</span></a></nav>
    </header>

    <section className="sales-hero sales-hero-focused">
      <div className="sales-copy">
        <span className="eyebrow">FOR SERVICE BUSINESSES LOSING TIME OR LEADS</span>
        <h1>Stop letting good leads <em>go cold.</em></h1>
        <p>I build quote bots, follow-up tools and alerts that help your team answer sooner and see exactly who needs attention—without forcing you into another generic CRM.</p>
        <div className="sales-proof-points"><span><b>01</b> Catch quote requests and after-hours calls</span><span><b>02</b> Make the next follow-up hard to miss</span><span><b>03</b> Flag problems before they become bigger ones</span></div>
        <div className="sales-actions"><a className="yellow-button" href="mailto:hello@leadwave.dev?subject=Help%20me%20stop%20losing%20leads">Fix my lead follow-up <span>↗</span></a><a href="#leadwave">See what I built for Leadwave <span>↓</span></a></div>
        <p className="sales-note">No technical brief needed. Tell me what gets missed; I’ll explain the simplest useful fix and keep you informed as I build.</p>
      </div>
      <div className="leadflow-card" aria-label="Leadwave sales workflow I built">
        <div className="leadflow-top"><div><span className="eyebrow">A REAL SYSTEM I BUILT</span><h2>New lead in. Clear next step out.</h2></div><span className="leadflow-mark">DK</span></div>
        <div className="leadflow-before"><span>THE OLD WAY</span><div><b>Missed calls</b><i>+</i><b>Scattered details</b><i>+</i><b>Forgotten follow-up</b></div></div>
        <div className="leadflow-list">
          <div><span className="leadflow-step">01</span><span><b>Answer</b><small>Chat and voice collect the request</small></span><span className="leadflow-tool">QUOTE BOT · VERA</span></div>
          <div><span className="leadflow-step">02</span><span><b>Keep it together</b><small>Details, owner, and next action stay visible</small></span><span className="leadflow-tool">LEAD TOOLS</span></div>
          <div><span className="leadflow-step">03</span><span><b>Follow through</b><small>Staff review it, reply, and confirm the booking</small></span><span className="leadflow-tool">HUMAN APPROVAL</span></div>
        </div>
        <div className="leadflow-bottom"><span>QUOTE BOT</span><span>LIVE CHAT</span><span>VOICE INTAKE</span><span>SALES DASHBOARD</span></div>
        <p>Built for Leadwave. Example workflow only—no customer data or made-up results.</p>
      </div>
    </section>

    <section className="pain-strip" aria-label="Business problems addressed">
      <span>Calls answered too late?</span><span>Staff forget who to call back?</span><span>Paying for a CRM nobody updates?</span><span>Finding problems after customers do?</span>
    </section>

    <section className="leadwave-case" id="leadwave">
      <div className="case-heading"><div><span className="eyebrow">REAL PROJECT · LEADWAVE</span><h2>I replaced Zoho CRM with tools built around the sales work.</h2></div><p>The goal was simple: stop bouncing between tools to answer leads, prepare outreach, and remember the next step.</p></div>
      <div className="case-grid">
        <div className="case-before"><span className="story-label">THE PROBLEM</span><h3>Leads and sales work spread across tools.</h3><p>It took extra effort to find the conversation, prepare the next call, and know who needed a reply.</p><div className="case-tags"><span>Zoho CRM</span><span>Separate chat</span><span>Manual follow-up</span></div></div>
        <div className="case-after"><span className="story-label">WHAT I BUILT</span><h3>One connected set of tools.</h3><ul><li><b>QuoteBot + LiveChat</b><span>Collect quote details and put the inquiry in front of staff.</span></li><li><b>Sales and outreach dashboard</b><span>Help reps research who to contact and keep next steps visible.</span></li><li><b>Vera voice bot</b><span>Take after-hours details and pass the call back to a person.</span></li></ul><a href="https://github.com/partybusexperts/Chatbot-Awesome" target="_blank" rel="noreferrer">See the project behind it <span>↗</span></a></div>
      </div>
      <p className="case-truth">The live sales app is private. The example shows the tools I built, not customer records or promised sales results.</p>
    </section>

    <section className="services-section" id="services">
      <div className="sales-section-heading"><div><span className="eyebrow">WHAT I CAN FIX FOR YOU</span><h2>Choose the problem. I’ll build around it.</h2></div><p>Start with one frustrating step. You don’t need to know the technical answer.</p></div>
      <div className="service-grid">
        <article><span className="service-icon">01</span><h3>Stop leads going cold</h3><p>Quote bots, website chat, and voice intake that collect what customers need and put it in front of your team.</p><small>Built: QuoteBot · LiveChat · Vera</small></article>
        <article><span className="service-icon">02</span><h3>Know who needs a follow-up</h3><p>Replace messy CRM work with a sales view that shows the lead, the context, and the next action.</p><small>Built: Leadwave · sales dashboards</small></article>
        <article><span className="service-icon">03</span><h3>Catch changes before they cost you</h3><p>Alerts, dashboards, and website checks that point out unusual activity, broken steps, or a change worth investigating.</p><small>Built: monitoring · analytics · A/B test tools*</small></article>
        <article className="service-secondary"><span className="service-icon">04</span><h3>Need a website or directory?</h3><p>I also build service-business websites, local directories, and lead-generation systems.</p><small>Built: transportation · pest-control websites</small></article>
      </div>
      <p className="service-disclosure">*A/B test tools help plan and review experiments. A real live test needs traffic-splitting and conversion tracking set up on the website.</p>
    </section>
    <details className="portfolio-expand" id="portfolio" ref={portfolioRef}>
      <summary><span>Want to see everything else?</span><strong>Browse all {workItems.length} projects, websites & experiments <b>＋</b></strong><small>Live websites, software, dashboards, directories, and works in progress—with their status clearly marked.</small></summary>
    <section className="portfolio-index" id="portfolio-content">
      <div className="catalog-intro">
        <div><span className="eyebrow">MORE PROJECTS AND WEBSITES</span><h2>See the rest of my work.</h2><p>This list includes websites, tools, and works in progress. I’ve marked what has been checked so you can tell what is live and what is only a project or sample.</p></div>
        <div className="inventory-counts" aria-label="Portfolio inventory counts">
          <div><strong>{repoCount}</strong><span>software projects</span></div>
          <div><strong>19</strong><span>pest websites listed</span></div>
          <div><strong>{confirmedCount}</strong><span>websites checked</span></div>
        </div>
      </div>

      <div className="catalog-shell">
      <aside className="catalog-sidebar" aria-label="Portfolio project list">
        <div className="sidebar-heading"><div><span className="sidebar-eyebrow">FIND A PROJECT</span><strong>My work</strong></div><span className="sidebar-total">{workItems.length}</span></div>
        <label className="catalog-search"><span>⌕</span><input aria-label="Search projects and sites" placeholder="Search projects or websites" value={search} onChange={(event) => setSearch(event.target.value)} /><kbd>ALL</kbd></label>
        <div className="catalog-groups">
          {groupedItems.map(({ group, items }) => {
            const expanded = Boolean(normalizedSearch) || openGroups.includes(group);
            return <section className="catalog-group" key={group}>
              <button className="group-toggle" type="button" aria-expanded={expanded} onClick={() => setOpenGroups((groups) => expanded ? groups.filter((value) => value !== group) : [...groups, group])}>
                <span>{groupNames[group] ?? group}</span><span className="group-meta">{groupCount(group)} <b>{expanded ? "−" : "+"}</b></span>
              </button>
              {expanded && <div className="group-items" id={`group-${group.replace(/\W/g, "-")}`}>
                {items.map((item) => <button key={item.id} type="button" className={`catalog-item ${selected.id === item.id ? "selected" : ""}`} aria-current={selected.id === item.id ? "page" : undefined} onClick={() => selectItem(item)}>
                  <span className={`item-indicator ${statusClass[item.status]}`} />
                  <span className="item-text"><strong>{item.title}</strong><small>{item.domain ?? (item.repo ? item.repo.split("/").pop() : "Project notes")}</small></span>
                  {selected.id === item.id && <span className="item-arrow">↗</span>}
                </button>)}
              </div>}
            </section>;
          })}
          {groupedItems.length === 0 && <p className="no-results">Nothing matches. Try a project or website name.</p>}
        </div>
        <div className="sidebar-legend"><span><i className="confirmed" /> website checked</span><span><i className="source" /> needs a check</span></div>
      </aside>

      <section className="catalog-content" aria-live="polite">
        <div className="content-caption"><span>PROJECT DETAILS</span><span>{String(workItems.findIndex((item) => item.id === selected.id) + 1).padStart(2, "0")} / {workItems.length}</span></div>
        <WorkDetail item={selected} />
      </section>
      </div>
    </section>
    </details>
    <section className="sales-closing" id="contact"><div><span className="eyebrow">START WITH THE THING THAT’S COSTING YOU TIME</span><h2>Tell me where leads are slipping through.</h2><p>I’ll help you find the simplest fix—whether that’s a better workflow, a custom tool, or no new software at all. You’ll know what I’m doing and why.</p></div><a className="yellow-button" href="mailto:hello@leadwave.dev?subject=Help%20me%20stop%20losing%20leads">Let’s fix the bottleneck <span>↗</span></a></section>
    <footer className="site-footer sales-footer"><span>Dan Kolbaba · Software, AI & websites that solve business problems</span><span>I’ll tell you what’s live and what’s only a sample.</span><span>© 2026</span></footer>
  </main>;
}
