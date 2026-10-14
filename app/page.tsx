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

function DemoPanel({ demo }: { demo: WorkItem["demo"] }) {
  if (!demo) return null;
  return <section className="selected-demo" aria-label="Interactive project walkthrough">
    <div className="selected-demo-heading"><span className="eyebrow">TRY A SAFE WALKTHROUGH</span><p>Sample interaction only. No customer information is used and nothing is sent.</p></div>
    {demo === "quotebot" && <QuoteBotDemo />}
    {demo === "audience" && <AudienceDemo />}
    {demo === "pulse" && <PulseDemo />}
    {demo === "optimizer" && <OptimizerDemo />}
  </section>;
}

function WorkDetail({ item }: { item: WorkItem }) {
  const verified = item.status === "confirmed" && item.domain;
  const listed = item.status === "listed" && item.domain;
  const paused = item.status === "paused";

  return <article className="work-detail" key={item.id}>
    <div className="detail-topline"><span>{item.group}</span><span className={`status-badge ${statusClass[item.status]}`}><i />{statusLabel[item.status]}</span></div>
    <h2>{item.title}</h2>
    {item.domain && <div className="detail-domain">{item.domain}</div>}
    <p className="detail-summary">{item.what}</p>
    <div className="detail-actions">
      {verified && <a className="yellow-button" href={`https://${item.domain}`} target="_blank" rel="noreferrer">Open public site <span>↗</span></a>}
      {listed && <a className="secondary-link" href={`https://${item.domain}`} target="_blank" rel="noreferrer">Open listed domain <span>↗</span></a>}
      {item.repo && <a className="secondary-link" href={item.repo} target="_blank" rel="noreferrer">View GitHub source <span>↗</span></a>}
      {item.preview && !paused && <a className="secondary-link subdued-link" href={item.preview} target="_blank" rel="noreferrer">Repo-linked Vercel URL <span>↗</span><small>Deployment status not verified</small></a>}
      {paused && <span className="paused-note">The linked Vercel deployment returned “Deployment is paused by the owner” when checked. The source repo is still available.</span>}
    </div>
    <div className="detail-story">
      <section className="story-card"><span className="story-label">THE PROBLEM I SAW</span><p>{item.why}</p></section>
      <section className="story-card built-card"><span className="story-label">WHAT I BUILT</span><p>{item.built}</p></section>
    </div>
    {item.demo && <DemoPanel demo={item.demo} />}
    <div className="detail-footer"><span>Clear scope · visible progress · human approval for consequential actions</span><a href="mailto:hello@leadwave.dev">Have a problem like this? Let’s talk ↗</a></div>
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

  return <main className="portfolio catalog-page">
    <header className="site-nav catalog-nav">
      <a className="wordmark" href="/" aria-label="Dan Kolbaba home"><span>DK</span><strong>DAN KOLBABA</strong></a>
      <div className="catalog-nav-right"><span>SOFTWARE · AUTOMATION · OPERATING SYSTEMS</span><a href="mailto:hello@leadwave.dev" className="nav-contact">Talk about your project <b>↗</b></a></div>
    </header>

    <section className="catalog-intro">
      <div><span className="eyebrow">BUILT FROM REAL BUSINESS PROBLEMS</span><h1>Here’s what I’ve built.</h1><p>Pick a project on the left. I’ll show you the problem I set out to fix, what I made, and what’s actually live.</p></div>
      <div className="inventory-counts" aria-label="Portfolio inventory counts">
        <div><strong>{repoCount}</strong><span>GitHub repos</span></div>
        <div><strong>19</strong><span>pest domains listed</span></div>
        <div><strong>{confirmedCount}</strong><span>public pages confirmed</span></div>
      </div>
    </section>

    <div className="catalog-shell">
      <aside className="catalog-sidebar" aria-label="Portfolio project list">
        <div className="sidebar-heading"><div><span className="sidebar-eyebrow">BROWSE MY WORK</span><strong>Projects & sites</strong></div><span className="sidebar-total">{workItems.length}</span></div>
        <label className="catalog-search"><span>⌕</span><input aria-label="Search projects and sites" placeholder="Search everything" value={search} onChange={(event) => setSearch(event.target.value)} /><kbd>ALL</kbd></label>
        <div className="catalog-groups">
          {groupedItems.map(({ group, items }) => {
            const expanded = Boolean(normalizedSearch) || openGroups.includes(group);
            return <section className="catalog-group" key={group}>
              <button className="group-toggle" type="button" aria-expanded={expanded} onClick={() => setOpenGroups((groups) => expanded ? groups.filter((value) => value !== group) : [...groups, group])}>
                <span>{group}</span><span className="group-meta">{groupCount(group)} <b>{expanded ? "−" : "+"}</b></span>
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
          {groupedItems.length === 0 && <p className="no-results">Nothing matches that search. Try a company name, tool, or domain.</p>}
        </div>
        <div className="sidebar-legend"><span><i className="confirmed" /> public page checked</span><span><i className="source" /> source / status unknown</span></div>
      </aside>

      <section className="catalog-content" aria-live="polite">
        <div className="content-caption"><span>PROJECT FILE</span><span>{String(workItems.findIndex((item) => item.id === selected.id) + 1).padStart(2, "0")} / {workItems.length}</span></div>
        <WorkDetail item={selected} />
      </section>
    </div>
    <footer className="site-footer catalog-footer"><span>Dan Kolbaba · AI and custom software</span><span>Public status is labeled separately from repository existence.</span><span>© 2026</span></footer>
  </main>;
}
