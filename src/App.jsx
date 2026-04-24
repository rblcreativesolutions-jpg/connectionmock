import './App.css'

const providers = [
  {
    name: 'HubSpot',
    account: 'Acme Revenue Ops',
    status: 'Connected',
    tone: 'success',
    lastSync: 'Last sync 18 minutes ago',
    issueCount: 3,
  },
  {
    name: 'Salesforce',
    account: 'West Coast Pipeline',
    status: 'Needs attention',
    tone: 'warning',
    lastSync: 'Schema refresh recommended',
    issueCount: 2,
  },
  {
    name: 'Slack',
    account: 'Not connected',
    status: 'Not connected',
    tone: 'neutral',
    lastSync: 'Connect to enable alerts',
    issueCount: 0,
  },
]

const overviewStats = [
  { label: 'Linked users', value: '42', hint: '5 pending invite' },
  { label: 'Objects configured', value: '3 / 4', hint: 'Deals needs review' },
  { label: 'Schema health', value: 'Healthy', hint: 'Last refresh today, 1:12 PM' },
]

const attentionItems = [
  { title: '14 users lost their HubSpot link', action: 'Review users' },
  { title: '3 required fields are unmapped for Deals', action: 'Fix mapping' },
  { title: '2 new HubSpot fields were detected after the last schema sync', action: 'Review schema' },
]

const users = [
  {
    name: 'Jane Cooper',
    email: 'jane@acme.com',
    role: 'Admin',
    status: 'Connected',
    tone: 'success',
    activity: 'Synced 15m ago',
    action: 'No action needed',
  },
  {
    name: 'Sam Lee',
    email: 'sam@acme.com',
    role: 'AE',
    status: 'Disconnected',
    tone: 'warning',
    activity: 'Lost access yesterday',
    action: 'Invite to reconnect',
  },
  {
    name: 'Priya Shah',
    email: 'priya@acme.com',
    role: 'Manager',
    status: 'Pending invite',
    tone: 'neutral',
    activity: 'Invite sent 2h ago',
    action: 'Resend invite',
  },
  {
    name: 'Miguel Alvarez',
    email: 'miguel@acme.com',
    role: 'RevOps',
    status: 'Invite failed',
    tone: 'danger',
    activity: 'Delivery failed 20m ago',
    action: 'Retry invite',
  },
]

const objects = [
  {
    name: 'Deals',
    description: 'Keep pipeline records aligned between Supered and HubSpot.',
    status: 'Needs attention',
    tone: 'warning',
    meta: '12 fields mapped, 3 required missing',
  },
  {
    name: 'Tickets',
    description: 'Sync service work and action plans into HubSpot tickets.',
    status: 'Configured',
    tone: 'success',
    meta: '18 fields mapped, synced 1h ago',
  },
  {
    name: 'Projects',
    description: 'Push project status and ownership to custom objects.',
    status: 'Draft',
    tone: 'neutral',
    meta: 'Not yet active',
  },
]

const mappings = [
  {
    required: true,
    source: 'Action Plan Title',
    type: 'Text',
    target: 'Deal Name',
    status: 'Mapped',
    tone: 'success',
    direction: 'Two-way',
    note: 'Healthy',
  },
  {
    required: true,
    source: 'Owner',
    type: 'User',
    target: 'Deal Owner',
    status: 'Mapped',
    tone: 'success',
    direction: 'Supered → HubSpot',
    note: 'Uses owner resolution rule',
  },
  {
    required: true,
    source: 'Priority',
    type: 'Enum',
    target: 'Missing property',
    status: 'Missing property',
    tone: 'warning',
    direction: 'Two-way',
    note: 'Will create property on save',
  },
  {
    required: false,
    source: 'Projected revenue',
    type: 'Currency',
    target: 'Annual Contract Value',
    status: 'Type mismatch',
    tone: 'danger',
    direction: 'Supered → HubSpot',
    note: 'Currency vs number mismatch',
  },
]

const schemaRows = [
  {
    object: 'Deals',
    type: 'Core object',
    fields: 54,
    synced: 'Today, 1:12 PM',
    status: 'Synced',
    tone: 'success',
    changes: '2 new fields',
  },
  {
    object: 'Tickets',
    type: 'Core object',
    fields: 31,
    synced: 'Today, 1:10 PM',
    status: 'Synced',
    tone: 'success',
    changes: 'No changes',
  },
  {
    object: 'Projects',
    type: 'Custom object',
    fields: 18,
    synced: 'Yesterday, 5:42 PM',
    status: 'Needs review',
    tone: 'warning',
    changes: 'Schema outdated',
  },
]

function Badge({ children, tone = 'neutral' }) {
  return <span className={`badge ${tone}`}>{children}</span>
}

function SectionCard({ title, subtitle, actions, children }) {
  return (
    <section className="section-card">
      <div className="section-head">
        <div>
          <h3>{title}</h3>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        {actions ? <div className="section-actions">{actions}</div> : null}
      </div>
      {children}
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <aside className="global-sidebar">
        <div className="brand-block">
          <div className="brand-mark">S</div>
          <div>
            <div className="eyebrow">Supered prototype</div>
            <strong>Connections redesign</strong>
          </div>
        </div>

        <nav className="global-nav">
          <button className="nav-item active">Connections</button>
          <button className="nav-item">Workflows</button>
          <button className="nav-item">Reporting</button>
          <button className="nav-item">Settings</button>
        </nav>

        <div className="sidebar-footer">
          <p>Desktop-first prototype for stakeholder review.</p>
        </div>
      </aside>

      <main className="workspace">
        <header className="topbar">
          <div>
            <div className="eyebrow">Settings / Connections</div>
            <h1>Connections workspace</h1>
          </div>
          <div className="topbar-actions">
            <button className="btn btn-secondary">Share preview</button>
            <button className="btn btn-primary">Add connection</button>
          </div>
        </header>

        <div className="content-grid">
          <aside className="provider-rail">
            <div className="provider-rail-head">
              <h2>Providers</h2>
              <button className="ghost-link">+ Add</button>
            </div>
            {providers.map((provider) => (
              <article
                key={provider.name}
                className={`provider-card ${provider.name === 'HubSpot' ? 'selected' : ''}`}
              >
                <div className="provider-card-row">
                  <div className="provider-logo">{provider.name[0]}</div>
                  <div className="provider-meta">
                    <strong>{provider.name}</strong>
                    <span>{provider.account}</span>
                  </div>
                  <button className="icon-button">⋯</button>
                </div>
                <div className="provider-status-row">
                  <Badge tone={provider.tone}>{provider.status}</Badge>
                  <span>{provider.lastSync}</span>
                </div>
                {provider.issueCount ? (
                  <div className="provider-issues">{provider.issueCount} items need attention</div>
                ) : null}
              </article>
            ))}
          </aside>

          <section className="main-stage">
            <section className="hero-card">
              <div>
                <div className="hero-title-row">
                  <h2>HubSpot</h2>
                  <Badge tone="success">Connected</Badge>
                </div>
                <p>Connected as ops@acme.com, managing users, sync configuration, and schema health.</p>
              </div>
              <div className="hero-actions">
                <div className="meta-pill">Last sync 18 minutes ago</div>
                <button className="btn btn-secondary">View logs</button>
                <button className="btn btn-secondary">Reconnect</button>
                <button className="btn btn-primary">Sync now</button>
              </div>
            </section>

            <div className="tab-row">
              <button className="tab active">Overview</button>
              <button className="tab">Users</button>
              <button className="tab">Sync Setup</button>
              <button className="tab">Schema</button>
            </div>

            <div className="stage-layout">
              <div className="primary-column">
                <div className="stats-grid">
                  {overviewStats.map((item) => (
                    <SectionCard key={item.label} title={item.value} subtitle={item.label}>
                      <p className="muted">{item.hint}</p>
                    </SectionCard>
                  ))}
                </div>

                <SectionCard title="Attention needed" subtitle="Fix the urgent items before the next sync run.">
                  <div className="list-stack">
                    {attentionItems.map((item) => (
                      <div key={item.title} className="list-row">
                        <div>
                          <strong>{item.title}</strong>
                          <p>Impact is visible to admins before they hit the next workflow.</p>
                        </div>
                        <button className="btn btn-secondary small">{item.action}</button>
                      </div>
                    ))}
                  </div>
                </SectionCard>

                <SectionCard
                  title="Provider users"
                  subtitle="Clear user status, filters, and recommended actions instead of noisy row buttons."
                  actions={
                    <>
                      <button className="btn btn-secondary small">Export CSV</button>
                      <button className="btn btn-primary small">Invite users</button>
                    </>
                  }
                >
                  <div className="toolbar-row">
                    <input className="search-input" value="Search by name or email" readOnly />
                    <div className="chip-row">
                      <Badge>All</Badge>
                      <Badge tone="success">Connected</Badge>
                      <Badge tone="warning">Disconnected</Badge>
                      <Badge>Pending invite</Badge>
                    </div>
                  </div>
                  <div className="table-card">
                    <table>
                      <thead>
                        <tr>
                          <th>User</th>
                          <th>Role</th>
                          <th>Status</th>
                          <th>Last activity</th>
                          <th>Recommended action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user.email}>
                            <td>
                              <strong>{user.name}</strong>
                              <span>{user.email}</span>
                            </td>
                            <td>{user.role}</td>
                            <td>
                              <Badge tone={user.tone}>{user.status}</Badge>
                            </td>
                            <td>{user.activity}</td>
                            <td className="action-cell">
                              <span>{user.action}</span>
                              {user.action !== 'No action needed' ? (
                                <button className="text-link">Open</button>
                              ) : null}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </SectionCard>

                <SectionCard
                  title="Sync setup"
                  subtitle="Guide setup before users fall into a dense mapping table."
                  actions={<button className="btn btn-primary small">Continue setup</button>}
                >
                  <div className="object-grid">
                    {objects.map((object) => (
                      <article key={object.name} className="object-card">
                        <div className="object-card-head">
                          <div>
                            <strong>{object.name}</strong>
                            <p>{object.description}</p>
                          </div>
                          <Badge tone={object.tone}>{object.status}</Badge>
                        </div>
                        <div className="object-meta">{object.meta}</div>
                      </article>
                    ))}
                  </div>
                </SectionCard>

                <SectionCard
                  title="Field mapping"
                  subtitle="Redesigned to highlight required fields, validation, and safer property creation."
                  actions={
                    <>
                      <button className="btn btn-secondary small">Run test sync</button>
                      <button className="btn btn-primary small">Save changes</button>
                    </>
                  }
                >
                  <div className="mapping-banner warning-banner">
                    You have 3 blocking issues, 1 type mismatch, and 6 unsaved changes.
                  </div>
                  <div className="mapping-toolbar">
                    <div className="inline-controls">
                      <span className="control-pill">Object: Deals</span>
                      <span className="control-pill">Direction: Two-way</span>
                      <span className="control-pill">Sync active</span>
                    </div>
                    <button className="btn btn-secondary small">Create 1 missing property</button>
                  </div>
                  <div className="table-card">
                    <table>
                      <thead>
                        <tr>
                          <th>Required</th>
                          <th>Supered field</th>
                          <th>Type</th>
                          <th>HubSpot property</th>
                          <th>Status</th>
                          <th>Direction</th>
                          <th>Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mappings.map((row) => (
                          <tr key={row.source}>
                            <td>{row.required ? 'Required' : 'Optional'}</td>
                            <td>{row.source}</td>
                            <td>{row.type}</td>
                            <td>{row.target}</td>
                            <td>
                              <Badge tone={row.tone}>{row.status}</Badge>
                            </td>
                            <td>{row.direction}</td>
                            <td>{row.note}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </SectionCard>

                <SectionCard
                  title="Schema"
                  subtitle="Make schema freshness, change detection, and review actions obvious."
                  actions={<button className="btn btn-primary small">Sync schema</button>}
                >
                  <div className="table-card">
                    <table>
                      <thead>
                        <tr>
                          <th>Object</th>
                          <th>Type</th>
                          <th>Fields</th>
                          <th>Last synced</th>
                          <th>Status</th>
                          <th>Source changes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {schemaRows.map((row) => (
                          <tr key={row.object}>
                            <td>{row.object}</td>
                            <td>{row.type}</td>
                            <td>{row.fields}</td>
                            <td>{row.synced}</td>
                            <td>
                              <Badge tone={row.tone}>{row.status}</Badge>
                            </td>
                            <td>{row.changes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </SectionCard>
              </div>

              <aside className="helper-column">
                <SectionCard title="Selected field inspector" subtitle="Example right-side helper panel for mapping review.">
                  <div className="helper-block">
                    <strong>Priority</strong>
                    <p>Required enum field used for downstream routing and SLA reporting.</p>
                  </div>
                  <div className="helper-block">
                    <strong>Suggested action</strong>
                    <p>Create a matching HubSpot dropdown property before enabling two-way sync.</p>
                  </div>
                  <div className="helper-block">
                    <strong>Warnings</strong>
                    <ul>
                      <li>Changing mapping may affect historical sync values.</li>
                      <li>Type mismatch must be resolved before save.</li>
                    </ul>
                  </div>
                  <button className="btn btn-secondary full">Review property creation</button>
                </SectionCard>

                <SectionCard title="Setup checklist" subtitle="A lighter, clearer replacement for instruction-heavy blank states.">
                  <ul className="checklist">
                    <li className="done">Select objects to sync</li>
                    <li className="done">Map required fields</li>
                    <li className="active">Review sync rules</li>
                    <li>Run test sync</li>
                  </ul>
                </SectionCard>

                <SectionCard title="Risky actions" subtitle="Destructive actions moved out of the default work surface.">
                  <div className="stack-actions">
                    <button className="btn btn-secondary full">Disconnect integration</button>
                    <button className="btn btn-secondary full">Clear mappings</button>
                    <button className="btn btn-secondary full">View sync history</button>
                  </div>
                </SectionCard>
              </aside>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default App
