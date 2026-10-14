"use client";

import { useMemo, useState } from "react";

type Demo = {
  id: string;
  group: string;
  icon: string;
  title: string;
  short: string;
  description: string;
  tags: string[];
  metric: string;
};

const demos: Demo[] = [
  { id: "overview", group: "Start here", icon: "✦", title: "Leadwave Systems Lab", short: "A tour of what I build", description: "A portfolio of practical software systems: AI assistants, revenue dashboards, outreach tools, directories, alerts, and conversion experiments.", tags: ["Full-stack", "AI systems", "Automation"], metric: "13 system patterns" },
  { id: "quotebot", group: "AI & automation", icon: "◌", title: "QuoteBot + human handoff", short: "Qualify a lead before a salesperson steps in", description: "A guided quote experience that asks the right questions, organizes the request, and knows when a human should take over.", tags: ["AI intake", "Lead qualification", "Supabase"], metric: "3 handoff paths" },
  { id: "chatbot", group: "AI & automation", icon: "◈", title: "Website chatbot", short: "Answer questions and move visitors forward", description: "A customer-facing assistant that can explain services, handle objections, collect contact details, and route serious buyers to a next step.", tags: ["Chatbot", "Conversion", "Human review"], metric: "24/7 response layer" },
  { id: "abtest", group: "Conversion", icon: "⌁", title: "AI A/B message tester", short: "Improve the message before buying traffic", description: "Compare headlines and offers for clarity, intent, differentiation, trust, and objection reduction before sending visitors to the page.", tags: ["A/B testing", "Copy analysis", "CRO"], metric: "6 decision signals" },
  { id: "pokemon", group: "Monitoring", icon: "⬡", title: "Pokémon availability alerts", short: "Turn repetitive checking into useful alerts", description: "A simulated retailer monitor that tracks product changes, avoids duplicate notifications, groups updates, and delivers a clean alert feed.", tags: ["Cron jobs", "Data parsing", "Telegram"], metric: "4 alert states" },
  { id: "directory", group: "Lead platforms", icon: "⌖", title: "Nationwide lead directory", short: "Build one platform that can sell leads in every market", description: "A multi-location directory concept for service providers, with market pages, provider profiles, lead routing, attribution, and monetization paths.", tags: ["Directories", "Local SEO", "Lead resale"], metric: "50-state model" },
  { id: "sales", group: "Sales systems", icon: "↗", title: "Relationship sales desk", short: "A smarter outreach system than a spreadsheet", description: "Research, talking points, follow-ups, call outcomes, and next actions in one focused workspace for a sales organization.", tags: ["Outreach", "Prospecting", "Follow-up"], metric: "1 shared pipeline" },
  { id: "analytics", group: "Dashboards", icon: "▥", title: "Console Analytics Dashboard", short: "Turn web data into decisions", description: "A read-only command center for Search Console, GA4, SEO evidence, page opportunities, and prioritized next actions.", tags: ["GA4", "Search Console", "SEO"], metric: "12 decision views" },
  { id: "vertical", group: "Dashboards", icon: "▤", title: "Trade sales dashboards", short: "See the pipeline, not just the traffic", description: "Demo dashboards for roofing, concrete, pest control, and other operators who need to see leads, response times, stage movement, and revenue opportunities.", tags: ["Roofing", "Concrete", "Pest control"], metric: "5 vertical templates" },
  { id: "quiz", group: "Conversion", icon: "?", title: "Interactive website quiz", short: "Use useful questions to reduce bounce", description: "A guided quiz that turns a passive visitor into a qualified conversation by giving them a reason to click, answer, and continue.", tags: ["Quizzes", "Engagement", "Lead capture"], metric: "4-step journey" },
  { id: "voice", group: "AI & automation", icon: "◉", title: "Voice-bot workflow", short: "Design the call path before the call", description: "A visual voice-agent workflow for intake, qualification, scheduling, escalation, and human approval points.", tags: ["Voice AI", "Workflows", "Guardrails"], metric: "5 call states" },
  { id: "journal", group: "Product concepts", icon: "✎", title: "Growth & journaling dashboard", short: "Turn notes into patterns and actions", description: "A private reflection workspace for goals, habits, notes, progress, and next actions—designed as a real product, not a generic notes page.", tags: ["SaaS", "Product design", "Analytics"], metric: "7 reflection lenses" }
];

const groups = [...new Set(demos.map((demo) => demo.group))];

function DemoPanel({ demo }: { demo: Demo }) {
  const [active, setActive] = useState(0);
  const isAB = demo.id === "abtest";
  const isQuiz = demo.id === "quiz";
  const isAlerts = demo.id === "pokemon";
  const isOverview = demo.id === "overview";
  const values = isAB ? ["Book the right vehicle for your next event", "Your event. Your route. Your perfect ride."] : ["Phoenix · 2 hours ago", "Dallas · 8 minutes ago"];

  return <section className="demo-panel">
    <div className="panel-head"><div><span className="eyebrow">INTERACTIVE DEMO / {demo.group.toUpperCase()}</span><h2>{demo.title}</h2><p>{demo.description}</p></div><span className="demo-badge">SIMULATED DATA</span></div>
    {isOverview && <div className="overview-grid">{demos.slice(1, 7).map((item) => <button className="overview-card" key={item.id} onClick={() => document.getElementById(item.id)?.click()}><span>{item.icon}</span><strong>{item.title}</strong><small>{item.short}</small></button>)}</div>}
    {isAB && <div className="ab-stage"><div className="score-card"><span className="mini-label">VARIANT A</span><strong>{values[0]}</strong><div className="score-row"><b>82</b><span className="bar"><i style={{ width: "82%" }} /></span><em>STRONG</em></div><small>Clear intent · good commercial fit · could be more distinctive</small></div><div className="score-card winner"><span className="mini-label">VARIANT B · RECOMMENDED</span><strong>{values[1]}</strong><div className="score-row"><b>94</b><span className="bar"><i style={{ width: "94%" }} /></span><em>BEST FIT</em></div><small>Memorable · specific · creates a reason to continue</small></div></div>}
    {isQuiz && <div className="quiz-stage"><span className="mini-label">QUESTION 2 OF 4</span><h3>What kind of project are you planning?</h3><div className="choice-grid">{["New installation", "Repair or replacement", "Comparing options", "I’m not sure yet"].map((x, i) => <button key={x} className={active === i ? "choice selected" : "choice"} onClick={() => setActive(i)}>{x}<span>→</span></button>)}</div><div className="progress"><i style={{ width: `${(active + 2) * 25}%` }} /></div><p>Useful questions create momentum and help the business respond with context.</p></div>}
    {isAlerts && <div className="alert-feed">{["Pokémon 151 Booster Bundle", "Prismatic Evolutions ETB", "Mega Evolution Collection"].map((x, i) => <div className="alert-item" key={x}><span className={`status-dot ${i === 1 ? "green" : "orange"}`} /><div><strong>{x}</strong><small>{i === 1 ? "Available · $49.99 · Target" : "Availability changed · monitoring"}</small></div><time>{i === 1 ? "just now" : `${i + 2}m ago`}</time></div>)}</div>}
    {!isOverview && !isAB && !isQuiz && !isAlerts && <div className="system-preview"><div className="metric-strip"><div><small>PRIMARY METRIC</small><strong>{demo.metric}</strong></div><div><small>STATUS</small><strong className="green-text">Ready to explore</strong></div><div><small>STACK</small><strong>Next.js + Supabase</strong></div></div><div className="fake-chart"><div className="chart-label"><span>Activity over the last 30 days</span><b>+28.4%</b></div><div className="bars">{[34, 52, 43, 68, 55, 77, 64, 88, 73, 96, 82, 100].map((height, i) => <i key={i} style={{ height: `${height}%` }} />)}</div></div><div className="workflow"><span>Capture</span><b>→</b><span>Qualify</span><b>→</b><span>Recommend</span><b>→</b><span>Human action</span></div></div>}
    <div className="panel-foot"><span>Built to demonstrate the workflow—not claim live production results.</span><button onClick={() => setActive((active + 1) % 4)}>Explore interaction <span>↗</span></button></div>
  </section>;
}

export default function Home() {
  const [selected, setSelected] = useState("overview");
  const [search, setSearch] = useState("");
  const active = demos.find((demo) => demo.id === selected) ?? demos[0];
  const filtered = useMemo(() => demos.filter((demo) => `${demo.title} ${demo.short} ${demo.group} ${demo.tags.join(" ")}`.toLowerCase().includes(search.toLowerCase())), [search]);
  return <main className="app-shell">
    <aside className="sidebar"><div className="brand"><span className="brand-mark">L</span><div><strong>LEADWAVE</strong><small>SYSTEMS LAB</small></div></div><div className="profile"><div className="avatar">DK</div><div><strong>Dan Kolbaba</strong><small>Founder · Builder · Problem solver</small></div></div><nav>{groups.map((group) => <div className="nav-group" key={group}><span className="nav-label">{group}</span>{demos.filter((demo) => demo.group === group).map((demo) => <button key={demo.id} className={selected === demo.id ? "nav-item active" : "nav-item"} onClick={() => setSelected(demo.id)}><span>{demo.icon}</span>{demo.title}</button>)}</div>)}</nav><div className="sidebar-bottom"><span className="live-dot" /> All demos use safe sample data<div>React · Next.js · Python · Supabase</div></div></aside>
    <div className="content"><header><div><span className="eyebrow">LEADWAVE / PORTFOLIO</span><h1>If you can imagine it,<br /><span>we can build it.</span></h1><p className="hero-copy">Interactive demos of the systems I build for businesses that want more than a brochure website.</p></div><div className="header-actions"><div className="search"><span>⌕</span><input placeholder="Search systems" value={search} onChange={(e) => setSearch(e.target.value)} /></div><a href="mailto:hello@leadwave.dev" className="contact-button">Start a conversation <span>↗</span></a></div></header><div className="proof-row"><div><strong>AI-first</strong><span>Practical automation</span></div><div><strong>Full-stack</strong><span>Idea to deployed product</span></div><div><strong>Revenue-minded</strong><span>Built for the next outcome</span></div></div><div className="results">{search && <div className="search-results"><span>Showing {filtered.length} matching systems</span>{filtered.map((demo) => <button key={demo.id} onClick={() => { setSelected(demo.id); setSearch(""); }}>{demo.icon} {demo.title}</button>)}</div>}<DemoPanel demo={active} /></div><footer><span>Leadwave Systems Lab</span><span>Real capability. Clear communication. Thoughtful software.</span><span>© 2026</span></footer></div>
  </main>;
}
