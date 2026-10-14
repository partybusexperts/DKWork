"use client";

import { useEffect, useMemo, useState } from "react";
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

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("work");
    const initial = workItems.find((item) => item.id === requested);
    if (initial) {
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
      <nav aria-label="Main navigation"><a href="#services">What I build</a><a href="#leadwave">Proof</a><a href="#portfolio">More work</a><a className="nav-contact" href="#contact">Tell me the problem <span>↗</span></a></nav>
    </header>

    <section className="sales-hero sales-hero-focused">
      <div className="sales-copy">
        <span className="eyebrow">CUSTOM SOFTWARE FOR SERVICE BUSINESSES & SALES TEAMS</span>
        <h1>Stop paying for software your team <em>works around.</em></h1>
        <p>I build practical sales systems that capture leads, organize follow-up, and show your team what to do next—using AI where it helps, not just because it’s trendy.</p>
        <div className="sales-proof-points"><span><b>01</b> Replace scattered steps with one clear workflow</span><span><b>02</b> Collect useful details from web chats and calls</span><span><b>03</b> See what needs a person’s attention next</span></div>
        <div className="sales-actions"><a className="yellow-button" href="mailto:hello@leadwave.dev?subject=Help%20me%20fix%20a%20business%20workflow">Tell me what keeps getting missed <span>↗</span></a><a href="#leadwave">See the Leadwave build <span>↓</span></a></div>
        <p className="sales-note">No technical brief needed. You stay in control of pricing, bookings, and important customer promises.</p>
      </div>
      <div className="leadflow-card" aria-label="Leadwave sales workflow I built">
        <div className="leadflow-top"><div><span className="eyebrow">REAL BUILD · LEADWAVE</span><h2>From new inquiry to clear next step.</h2></div><span className="leadflow-mark">DK</span></div>
        <div className="leadflow-before"><span>BEFORE</span><div><b>Zoho CRM</b><i>+</i><b>Separate chat</b><i>+</i><b>Manual follow-up</b></div></div>
        <div className="leadflow-list">
          <div><span className="leadflow-step">01</span><span><b>Capture</b><small>A quote request or call comes in</small></span><span className="leadflow-tool">CHAT · VOICE</span></div>
          <div><span className="leadflow-step">02</span><span><b>Keep the details</b><small>Trip needs and conversation stay with the lead</small></span><span className="leadflow-tool">LEAD RECORD</span></div>
          <div><span className="leadflow-step">03</span><span><b>Know what happens next</b><small>Call prep, follow-up, and team handoff</small></span><span className="leadflow-tool">SALES TOOLS</span></div>
          <div><span className="leadflow-step">04</span><span><b>Keep a human in control</b><small>Staff confirm the price and booking</small></span><span className="leadflow-tool">APPROVAL</span></div>
        </div>
        <div className="leadflow-bottom"><span>QUOTE BOT</span><span>LIVE CHAT</span><span>VOICE INTAKE</span><span>FOLLOW-UP</span></div>
        <p>Workflow from a real system I built. This diagram contains no customer data.</p>
      </div>
    </section>

    <section className="pain-strip" aria-label="Business problems addressed">
      <span>Paying for tools people avoid?</span><span>Leads waiting for follow-up?</span><span>Copying the same info between apps?</span><span>Finding problems too late?</span>
    </section>

    <section className="leadwave-case" id="leadwave">
      <div className="case-heading"><div><span className="eyebrow">FLAGSHIP PROJECT · LEADWAVE</span><h2>I replaced Zoho CRM—and built the sales workflow around how Leadwave works.</h2></div><p>Instead of asking the team to work around a generic setup, I built connected tools for handling leads, preparing outreach, and keeping follow-up visible.</p></div>
      <div className="case-grid">
        <div className="case-before"><span className="story-label">THE PROBLEM</span><h3>Too many handoffs. Too much checking.</h3><p>Lead details, chats, call prep, and next steps were spread across separate tools. It was harder to see who needed a reply and what should happen next.</p><div className="case-tags"><span>Zoho CRM</span><span>Separate chat</span><span>Manual tracking</span></div></div>
        <div className="case-after"><span className="story-label">WHAT I BUILT</span><h3>One sales workflow, shaped around their process.</h3><ul><li><b>QuoteBot + live chat</b><span>Collect inquiry details and prepare the lead for staff.</span></li><li><b>Lead and follow-up tools</b><span>Keep the conversation, owner, and next action together.</span></li><li><b>Outreach and call prep</b><span>Help reps research businesses and plan who to contact.</span></li><li><b>Vera voice intake</b><span>Collect after-hours call details and hand off to a person.</span></li></ul><a href="https://github.com/partybusexperts/Chatbot-Awesome" target="_blank" rel="noreferrer">Explore the project code <span>↗</span></a></div>
      </div>
      <p className="case-truth">The live sales app is private, so I’m showing the workflow—not customer records. No made-up revenue or conversion numbers: this is what I built.</p>
    </section>

    <section className="services-section" id="services">
      <div className="sales-section-heading"><div><span className="eyebrow">WHAT I CAN BUILD FOR YOUR BUSINESS</span><h2>Pick the headache. I’ll build the tool around it.</h2></div><p>Start with one part of your business that costs time, loses leads, or keeps getting missed.</p></div>
      <div className="service-grid">
        <article><span className="service-icon">01</span><h3>Leads that get handled</h3><p>Quote bots, website chat, voice intake, and lead tracking that give your team the details they need to follow up.</p><small>Built: QuoteBot · LiveChat · Vera</small></article>
        <article><span className="service-icon">02</span><h3>Sales follow-up that stays visible</h3><p>Call prep, prospect research, outreach tracking, reminders, and dashboards—so reps know who to contact and why.</p><small>Built: Leadwave · Camille Desk</small></article>
        <article><span className="service-icon">03</span><h3>Alerts before small issues grow</h3><p>Checks that flag meaningful changes or failures, and dashboards that point to the next thing worth looking at.</p><small>Built: Pokémon alerts · Console Analytics</small></article>
        <article><span className="service-icon">04</span><h3>Websites that bring in the right inquiries</h3><p>Local service sites and directory systems designed around what a customer is searching for and how they ask for help.</p><small>Built: transportation · pest-control sites</small></article>
        <article><span className="service-icon">05</span><h3>Website tests based on real results</h3><p>Plan A/B tests around quote requests or bookings, then measure real visitor behavior. AI can suggest what to test; traffic data decides what wins.</p><small>Built: experiment planning and review tools · live tests need site setup</small></article>
        <article><span className="service-icon">06</span><h3>AI that takes the boring first pass</h3><p>Sort, summarize, research, and draft—then send exceptions and important decisions to a person for review.</p><small>AI supports the workflow. You stay in charge.</small></article>
      </div>
    </section>

    <section className="work-process" id="how-it-works">
      <div className="process-heading"><span className="eyebrow">NO GUESSING. NO VANISHING DEVELOPER.</span><h2>You’ll know what’s happening before it becomes a problem.</h2><p>Good software matters. So does knowing what you’re paying for and what happens next.</p></div>
      <div className="process-steps"><article><b>01</b><h3>Show me the bottleneck</h3><p>Tell me what takes too long, gets forgotten, or frustrates your team. You do not need a technical spec.</p></article><article><b>02</b><h3>Agree on the plan</h3><p>I explain the simplest workable approach, what’s included, and what could affect the budget or timeline.</p></article><article><b>03</b><h3>See progress as it happens</h3><p>You get clear updates: what’s done, what’s next, and where I need your decision.</p></article><article><b>04</b><h3>Test before trusting it</h3><p>We check the real workflow together. AI does not silently make pricing, booking, or customer promises.</p></article></div>
      <div className="sales-faq"><details><summary>Do I need to know exactly what I want?</summary><p>No. Bring the problem or a messy process. I’ll help turn it into a clear plan before we build.</p></details><details><summary>Do I have to replace my current software?</summary><p>No. We start with what you already use. Replacing a tool only makes sense if it solves a real problem.</p></details><details><summary>Can you guarantee more sales?</summary><p>I won’t invent a number. We can agree on what to measure—like response time, completed inquiries, or booked jobs—and use your real data to judge the result.</p></details></div>
    </section>

    <section className="portfolio-index" id="portfolio">
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
    <section className="sales-closing" id="contact"><div><span className="eyebrow">YOU DON’T NEED A PERFECT PLAN TO START</span><h2>Tell me what keeps getting missed.</h2><p>I’ll help you sort out whether it needs better software, a simpler process, or no new tool at all—and explain the next step in plain English.</p></div><a className="yellow-button" href="mailto:hello@leadwave.dev?subject=Help%20me%20fix%20a%20business%20workflow">Talk through the problem <span>↗</span></a></section>
    <footer className="site-footer sales-footer"><span>Dan Kolbaba · Business tools and websites</span><span>I’ll tell you what’s live and what’s only a sample.</span><span>© 2026</span></footer>
  </main>;
}
