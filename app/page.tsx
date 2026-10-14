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
      <nav aria-label="Main navigation"><a href="#systems">What I can build</a><a href="#portfolio">More work</a><a className="nav-contact" href="mailto:hello@leadwave.dev">Tell me what you need <span>↗</span></a></nav>
    </header>

    <section className="sales-hero">
      <div className="sales-copy">
        <span className="eyebrow">I BUILD TOOLS THAT HELP YOU WIN AND KEEP CUSTOMERS</span>
        <h1>Reply faster. Miss less. <em>Grow smarter.</em></h1>
        <p>I build quote chatbots, follow-up tools, simple sales dashboards, and alerts that help your team get back to customers and catch problems sooner. I explain what I’m building in plain English and keep you updated as we go.</p>
        <div className="sales-proof-points"><span><b>01</b> Get back to customers sooner</span><span><b>02</b> Improve your message before buying ads</span><span><b>03</b> Know when something needs attention</span></div>
        <div className="sales-actions"><a className="yellow-button" href="mailto:hello@leadwave.dev?subject=Let%E2%80%99s%20fix%20a%20business%20workflow">Tell me what’s slowing you down <span>↗</span></a><a href="#systems">See what I’ve built <span>↓</span></a></div>
        <p className="sales-note">You stay in charge of prices, bookings, and important customer promises.</p>
      </div>
      <div className="sales-hero-demo" aria-label="Interactive QuoteBot demonstration">
        <div className="sales-demo-intro"><span>TRY A QUOTE CHATBOT</span><strong>Click through. This is only a sample.</strong></div>
        <QuoteBotDemo />
        <p className="sales-demo-caption">This sample shows how a chatbot can ask the usual questions and prepare the details for your team.</p>
      </div>
    </section>

    <section className="pain-strip" aria-label="Business problems addressed">
      <span>Paying for tools your team avoids?</span><span>Customers waiting too long for a reply?</span><span>Finding out too late when something broke?</span><span>Too many reports, no clear next step?</span>
    </section>

    <section className="systems-section" id="systems">
      <div className="sales-section-heading"><div><span className="eyebrow">REAL PROJECTS, PLAIN EXPLANATIONS</span><h2>Here’s what I built—and what it helps with.</h2></div><p>Try the samples below. They show how the tools work, but they are not connected to your business and will not send anything.</p></div>
      <div className="system-grid">
        <article className="system-card">
          <div className="system-card-heading"><span className="system-number">01 · TEST YOUR MESSAGE</span><h3>See which message is clearer before you spend on ads.</h3><p>I built a tool to compare different headlines and spot confusing wording. A real test with visitors tells you which one brings in more customers.</p></div>
          <AudienceDemo />
          <small className="truth-note">This sample gives writing tips. It does not run a live test or predict sales.</small>
        </article>
        <article className="system-card">
          <div className="system-card-heading"><span className="system-number">02 · GET A USEFUL ALERT</span><h3>Know when something changes—or stops working.</h3><p>I built a tool that checks for changes and tells you when it finds one. If a page breaks, it reports the problem instead of sending a false alert.</p></div>
          <PulseDemo />
          <small className="truth-note">Choose an example above to see the difference between a real change and a failed check.</small>
        </article>
        <article className="system-card system-card-wide">
          <div className="system-card-heading"><span className="system-number">03 · KNOW WHAT TO FIX</span><h3>Find out why a website page isn’t bringing in inquiries.</h3><p>I built a page checker that helps answer three simple questions: do people find the page, can they request a quote, and is the next step clear?</p></div>
          <OptimizerDemo />
          <small className="truth-note">This is sample information, not a check of your website. A person reviews any changes before they go live.</small>
        </article>
      </div>
    </section>

    <section className="business-work">
      <div className="sales-section-heading"><div><span className="eyebrow">BUILT TO FIX REAL BUSINESS HEADACHES</span><h2>Less busywork. Better follow-up.</h2></div><p>I make tools that help your team know who to contact, what to say, and what needs attention next.</p></div>
      <div className="business-work-grid">
        <article><span>LEADWAVE · SALES TOOLS</span><h3>Replace Zoho and scattered sales tools.</h3><p>I replaced their Zoho setup with quote chatbots, a live chat tool, a headline tester, and a sales dashboard for outreach. The goal: less copying information between tools and more time talking with potential customers.</p></article>
        <article><span>CAMILLE DESK · CALL PREP</span><h3>Know who you’re calling and what to say.</h3><p>I built a tool that looks up a business, suggests people to contact, gives the salesperson a few useful talking points, and keeps track of follow-up.</p></article>
        <article><span>LOCAL SERVICE WEBSITES</span><h3>Build a website for each kind of customer.</h3><p>I built websites for transportation and pest-control services. Each one can focus on a specific place or problem and give people a clear way to ask for help. The list below shows which sites have been checked.</p></article>
      </div>
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
    <section className="sales-closing" id="contact"><div><span className="eyebrow">TIRED OF DOING IT BY HAND?</span><h2>Let’s fix what’s slowing your team down.</h2><p>Tell me what takes too much time, what keeps getting missed, or what you wish your software could do. I’ll explain a clear next step.</p></div><a className="yellow-button" href="mailto:hello@leadwave.dev?subject=Let%E2%80%99s%20talk%20about%20a%20workflow">Talk about your problem <span>↗</span></a></section>
    <footer className="site-footer sales-footer"><span>Dan Kolbaba · Business tools and websites</span><span>I’ll tell you what’s live and what’s only a sample.</span><span>© 2026</span></footer>
  </main>;
}
