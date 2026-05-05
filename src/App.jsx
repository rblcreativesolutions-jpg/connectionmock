import './App.css'

const categories = [
  {
    name: 'Local service revenue recovery',
    summary: 'Boring, high-ROI workflows where missed calls, slow follow-up, and no-shows directly cost money.',
    ideas: [
      ['After-hours receptionist for plumbers/HVAC', 'Home services', 'Setup + monthly retainer', 'Medium', 'Medium'],
      ['Missed-call text-back for med spas', 'Appointment businesses', 'Monthly', 'Low', 'Medium'],
      ['AI intake for solo law firms', 'Small legal practices', 'Setup + retainer', 'Medium', 'Medium'],
      ['Lead follow-up engine for contractors', 'Roofers, painters, remodelers', 'Retainer', 'Low', 'Medium'],
      ['No-show recovery automation', 'Salons, clinics, coaches', 'Monthly', 'Low', 'Medium'],
      ['Quote-to-close follow-up assistant', 'Contractors, agencies', 'Retainer or revenue share', 'Low', 'Low'],
      ['Dispatch triage assistant', 'HVAC, plumbing, electrical', 'Setup + monthly', 'Medium', 'Medium'],
      ['Review request and response system', 'Local SMBs', 'Monthly', 'Low', 'High'],
      ['Sales inbox copilot for owner-led firms', 'Consultants, small services', 'Monthly', 'Low', 'Medium'],
      ['Appointment reminder caller', 'Dentists, clinics, med spas', 'Per location/month', 'Medium', 'Medium'],
    ],
  },
  {
    name: 'Back-office admin services',
    summary: 'Less sexy, better economics. Buyers already feel the pain and often pay quickly.',
    ideas: [
      ['CRM cleanup and lead enrichment', 'Small B2B teams', 'Project + retainer', 'Low', 'Medium'],
      ['Unpaid invoice chase automation', 'Agencies, freelancers', 'Monthly', 'Low', 'Low'],
      ['Proposal personalization service', 'Consultants, agencies', 'Per proposal or retainer', 'Low', 'Medium'],
      ['RFP/questionnaire assistant', 'Agencies, dev shops', 'Per seat or retainer', 'Medium', 'Low'],
      ['Meeting-to-CRM autopilot', 'Sales-led SMBs', 'Monthly', 'Low', 'Medium'],
      ['Accounting document intake organizer', 'Bookkeepers, tax firms', 'Monthly', 'Medium', 'Medium'],
      ['Invoice/receipt extraction service', 'Bookkeepers', 'Per doc or retainer', 'Low', 'Medium'],
      ['Reconciliation exception prep', 'Controllers, bookkeeping firms', 'Monthly', 'Medium', 'Low'],
      ['Tax-season missing-document chaser', 'Tax preparers', 'Seasonal package', 'Low', 'Low'],
      ['Contract clause/renewal tracker', 'Small legal or ops teams', 'Monthly', 'Medium', 'Medium'],
    ],
  },
  {
    name: 'Property and operations',
    summary: 'Lots of repetitive communication, coordination, and status updates. Good side-hustle wedge.',
    ideas: [
      ['Tenant maintenance triage assistant', 'Small landlords, PMs', 'Per door or monthly', 'Medium', 'Medium'],
      ['Lease renewal and rent reminders', 'Self-managing landlords', 'Monthly', 'Low', 'Medium'],
      ['Vendor coordination helper', 'Property managers', 'Monthly', 'Medium', 'Low'],
      ['Airbnb guest inbox copilot', 'Hosts and co-hosts', 'Monthly', 'Low', 'High'],
      ['Matter status update bot', 'Law firms', 'Monthly', 'Medium', 'Low'],
      ['Legal intake timeline builder', 'Plaintiff firms', 'Per matter or monthly', 'Medium', 'Low'],
      ['Maintenance photo triage + work order prep', 'Property managers', 'Monthly', 'Medium', 'Medium'],
      ['HOA or building announcement assistant', 'Small associations', 'Monthly', 'Low', 'Low'],
      ['Insurance claim document organizer', 'Public adjusters, contractors', 'Per claim', 'Medium', 'Medium'],
      ['Simple operations audit productized service', 'Owner-operators', 'Fixed-fee audit + upsell', 'Low', 'Medium'],
    ],
  },
  {
    name: 'Ecommerce and customer support',
    summary: 'Very real demand, but crowded. Best if you go narrow and make it operational, not generic chatbot fluff.',
    ideas: [
      ['Shopify support deflection setup', 'Small ecommerce brands', 'Monthly + usage', 'Medium', 'High'],
      ['Returns/refund workflow assistant', 'DTC stores', 'Setup + monthly', 'Medium', 'Medium'],
      ['Product listing optimization', 'Marketplaces, DTC sellers', 'Per SKU or retainer', 'Low', 'High'],
      ['Catalog enrichment for resellers', 'eBay/Poshmark/resale shops', 'Per item or monthly', 'Low', 'Medium'],
      ['Reorder/stockout alert layer', 'Shopify/Amazon sellers', 'Monthly', 'Medium', 'Medium'],
      ['Support call summarizer', 'Ecommerce brands with phone support', 'Monthly', 'Low', 'Medium'],
      ['Post-purchase upsell flows', 'Beauty, supplements, consumables', 'Retainer + rev share', 'Low', 'Medium'],
      ['Review mining for product teams', 'Amazon/DTC founders', 'Monthly', 'Medium', 'Medium'],
      ['Refund-risk flagging service', 'High-return categories', 'Monthly', 'Medium', 'Medium'],
      ['UGC/testimonial organizer', 'Small brands', 'Monthly', 'Low', 'Medium'],
    ],
  },
  {
    name: 'Content and creator services',
    summary: 'Easy to start, but only worth it if quality control and niche positioning are strong.',
    ideas: [
      ['Podcast-to-newsletter repurposing', 'Podcasters, B2B founders', 'Per episode or retainer', 'Low', 'High'],
      ['Long-form to short-form content studio', 'Creators, consultants', 'Per asset or retainer', 'Low', 'High'],
      ['Founder ghostwriting assistant service', 'B2B founders', 'Retainer', 'Low', 'Medium'],
      ['Webinar repurposing for sales teams', 'SaaS/B2B teams', 'Retainer', 'Low', 'Medium'],
      ['Local SEO content and GBP posting', 'Local SMBs', 'Retainer', 'Low', 'High'],
      ['Client testimonial story builder', 'Agencies, coaches', 'Per case study', 'Low', 'Low'],
      ['YouTube summary + clip package', 'Experts and creators', 'Per episode', 'Low', 'High'],
      ['Course/material refresh service', 'Coaches and edu businesses', 'Project fee', 'Low', 'Medium'],
      ['Email newsletter engine for niche experts', 'Solo operators', 'Retainer', 'Low', 'Medium'],
      ['Niche social content system for one vertical', 'Med spas, realtors, trainers', 'Monthly retainer', 'Low', 'High'],
    ],
  },
]

const bestBets = [
  {
    idea: 'Quote-to-close follow-up for contractors',
    why: 'Very direct ROI, easy to explain, can start as a service before software.',
  },
  {
    idea: 'Accounting document intake organizer',
    why: 'Pain is constant, buyers are used to paying for boring admin relief, competition is less flashy.',
  },
  {
    idea: 'Tenant maintenance triage assistant',
    why: 'Clear repetitive pain, decent monthly-retainer shape, less saturated than generic chatbots.',
  },
  {
    idea: 'Podcast-to-newsletter repurposing for B2B founders',
    why: 'Fast to launch as a side hustle if quality is high and niche is specific.',
  },
  {
    idea: 'Missed-call text-back + booking recovery for med spas',
    why: 'Money leaks are obvious, appointment value is high, easy wedge into broader front-office automation.',
  },
  {
    idea: 'Meeting-to-CRM + proposal follow-up for agencies/consultants',
    why: 'Pain is personal and immediate, easy to demo with a real before/after workflow.',
  },
]

const filters = [
  'Can start as a productized service, not just a fragile SaaS dream',
  'Buyer pain is obvious and tied to time savings or revenue recovery',
  'AI is an acceleration layer, not the whole value prop',
  'Solo side-hustle feasible without massive engineering upfront',
  'Avoided pure “AI slop” businesses with no moat beyond generation',
]

function App() {
  return (
    <div className="brief-shell">
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Overnight brief</p>
          <h1>50 side-hustle businesses you could build faster with AI</h1>
          <p>
            Not “AI startups” for the sake of it. These are practical business ideas that AI can help
            you launch, deliver, or automate. The strongest pattern is boring workflow pain tied to
            money, missed leads, admin drag, or repetitive customer communication.
          </p>
        </div>
        <div className="hero-card">
          <div className="hero-stat">
            <span>Best overall angle</span>
            <strong>Productized service first, software later</strong>
          </div>
          <div className="hero-stat">
            <span>Most promising wedge</span>
            <strong>Revenue recovery and operations cleanup</strong>
          </div>
        </div>
      </header>

      <section className="panel">
        <div className="section-head">
          <h2>How I filtered the list</h2>
        </div>
        <div className="filter-list">
          {filters.map((item) => (
            <div className="filter-item" key={item}>{item}</div>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="section-head">
          <h2>Best bets to look at first</h2>
          <p>The six ideas that look easiest to explain, validate, and sell without pretending to be a huge startup.</p>
        </div>
        <div className="bets-grid">
          {bestBets.map((bet) => (
            <article className="bet-card" key={bet.idea}>
              <h3>{bet.idea}</h3>
              <p>{bet.why}</p>
            </article>
          ))}
        </div>
      </section>

      {categories.map((category) => (
        <section className="panel" key={category.name}>
          <div className="section-head">
            <h2>{category.name}</h2>
            <p>{category.summary}</p>
          </div>
          <div className="ideas-table-wrap">
            <table className="ideas-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Idea</th>
                  <th>Customer</th>
                  <th>Monetization</th>
                  <th>Complexity</th>
                  <th>Saturation</th>
                </tr>
              </thead>
              <tbody>
                {category.ideas.map((idea, index) => (
                  <tr key={idea[0]}>
                    <td>{index + 1}</td>
                    <td>{idea[0]}</td>
                    <td>{idea[1]}</td>
                    <td>{idea[2]}</td>
                    <td><span className={`badge ${idea[3].toLowerCase()}`}>{idea[3]}</span></td>
                    <td><span className={`badge ${idea[4].toLowerCase()}`}>{idea[4]}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      <section className="panel conclusion-panel">
        <div className="section-head">
          <h2>Bottom line</h2>
        </div>
        <div className="conclusion-grid">
          <div>
            <h3>Weak path</h3>
            <p>Generic “AI agency” or “AI assistant for everyone” with no sharp buyer or workflow.</p>
          </div>
          <div>
            <h3>Better path</h3>
            <p>Pick one painful workflow, one buyer, and one measurable outcome, then sell it as a productized service.</p>
          </div>
          <div>
            <h3>Strongest side-hustle shape</h3>
            <p>Use AI to do delivery faster, not just to make marketing sound futuristic.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
