import { useMemo, useState } from 'react'
import './App.css'

const providers = [
  {
    id: 'hubspot',
    name: 'HubSpot',
    account: 'Acme Revenue Ops',
    status: 'Connected',
    tone: 'success',
    lastSync: 'Last sync 18 minutes ago',
    issueCount: 3,
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    account: 'West Coast Pipeline',
    status: 'Needs attention',
    tone: 'warning',
    lastSync: 'Schema refresh recommended',
    issueCount: 2,
  },
  {
    id: 'slack',
    name: 'Slack',
    account: 'Not connected',
    status: 'Not connected',
    tone: 'neutral',
    lastSync: 'Connect to enable alerts',
    issueCount: 0,
  },
]

const overviewStats = [
  { label: 'Linked users', value: '42', hint: '5 pending invites' },
  { label: 'Objects configured', value: '3 / 4', hint: 'Deals needs review' },
  { label: 'Schema health', value: 'Healthy', hint: 'Last refresh today, 1:12 PM' },
]

const attentionItems = [
  { title: '14 users lost their HubSpot link', detail: 'They cannot sync actions until reconnected.', action: 'Review users' },
  { title: '3 required fields are unmapped for Deals', detail: 'Two-way sync is blocked until required fields are resolved.', action: 'Fix mapping' },
  { title: '2 new HubSpot fields were detected', detail: 'Review schema changes before publishing more mapping edits.', action: 'Review schema' },
]

const activityItems = [
  { title: 'Deals schema synced successfully', time: '12 minutes ago' },
  { title: '2 users invited to reconnect', time: '38 minutes ago' },
  { title: 'Ticket mapping updated and published', time: 'Yesterday, 5:42 PM' },
]

const users = [
  {
    id: 1,
    name: 'Jane Cooper',
    email: 'jane@acme.com',
    role: 'Admin',
    status: 'Connected',
    tone: 'success',
    activity: 'Synced 15m ago',
    action: 'No action needed',
  },
  {
    id: 2,
    name: 'Sam Lee',
    email: 'sam@acme.com',
    role: 'AE',
    status: 'Disconnected',
    tone: 'warning',
    activity: 'Lost access yesterday',
    action: 'Invite to reconnect',
  },
  {
    id: 3,
    name: 'Priya Shah',
    email: 'priya@acme.com',
    role: 'Manager',
    status: 'Pending invite',
    tone: 'neutral',
    activity: 'Invite sent 2h ago',
    action: 'Resend invite',
  },
  {
    id: 4,
    name: 'Miguel Alvarez',
    email: 'miguel@acme.com',
    role: 'RevOps',
    status: 'Invite failed',
    tone: 'danger',
    activity: 'Delivery failed 20m ago',
    action: 'Retry invite',
  },
  {
    id: 5,
    name: 'Lauren Burke',
    email: 'lauren@acme.com',
    role: 'CSM',
    status: 'Connected',
    tone: 'success',
    activity: 'Synced 42m ago',
    action: 'No action needed',
  },
]

const objectCards = [
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
  {
    name: 'Custom Objects',
    description: 'Map custom object types for advanced workflows.',
    status: 'Not started',
    tone: 'neutral',
    meta: 'Schema refresh recommended first',
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
  {
    required: false,
    source: 'Next step summary',
    type: 'Long text',
    target: 'Deal notes',
    status: 'Mapped',
    tone: 'success',
    direction: 'Supered → HubSpot',
    note: 'One-way sync',
  },
]

const syncRules = [
  { label: 'Create HubSpot records when missing', value: 'Enabled' },
  { label: 'Conflict handling', value: 'Prefer latest edit with manual review flag' },
  { label: 'Owner mapping', value: 'Resolve via provider user email' },
  { label: 'Delete/archive behavior', value: 'Archive only, never hard delete' },
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
  {
    object: 'Custom Playbooks',
    type: 'Custom object',
    fields: 12,
    synced: 'Never',
    status: 'Error',
    tone: 'danger',
    changes: 'Auth required',
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

function OverviewPage({ onJump }) {
  return (
    <div className="page-stack">
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
                <p>{item.detail}</p>
              </div>
              <button className="btn btn-secondary small" onClick={() => onJump(item.action)}>{item.action}</button>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="overview-grid">
        <SectionCard title="Recent activity" subtitle="Make system freshness and recent changes obvious.">
          <div className="activity-list">
            {activityItems.map((item) => (
              <div key={item.title} className="activity-row">
                <div>
                  <strong>{item.title}</strong>
                </div>
                <span>{item.time}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="What changed in the redesign" subtitle="The prototype fixes the pain points from the live screenshots.">
          <ul className="bullet-list">
            <li>Provider rail simplified into clean status cards instead of dense metadata blocks.</li>
            <li>Overview added so admins don’t land in a noisy table first.</li>
            <li>Users, Sync Setup, and Schema now each have their own focused workspace.</li>
            <li>Risky actions are pushed into lower-emphasis controls and confirmation patterns.</li>
          </ul>
        </SectionCard>
      </div>
    </div>
  )
}

function UsersPage() {
  const [selectedUser, setSelectedUser] = useState(users[1])
  const [selectedIds, setSelectedIds] = useState([2, 3])

  const toggleSelection = (id) => {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  return (
    <div className="stage-layout">
      <div className="primary-column">
        <div className="summary-chip-row">
          <div className="summary-chip"><strong>24</strong><span>Total users</span></div>
          <div className="summary-chip"><strong>17</strong><span>Connected</span></div>
          <div className="summary-chip warning"><strong>7</strong><span>Disconnected</span></div>
          <div className="summary-chip neutral"><strong>2</strong><span>Pending invite</span></div>
        </div>

        <SectionCard
          title="Provider users"
          subtitle="Separate user state, recommended action, and bulk operations clearly."
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

          {selectedIds.length ? (
            <div className="bulk-bar">
              <strong>{selectedIds.length} selected</strong>
              <div className="section-actions">
                <button className="btn btn-secondary small">Invite selected</button>
                <button className="btn btn-secondary small">Resend invites</button>
                <button className="btn btn-secondary small">Clear</button>
              </div>
            </div>
          ) : null}

          <div className="table-card">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>User</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Last activity</th>
                  <th>Recommended action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.email}
                    className={selectedUser.id === user.id ? 'row-selected' : ''}
                    onClick={() => setSelectedUser(user)}
                  >
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(user.id)}
                        onChange={() => toggleSelection(user.id)}
                        onClick={(event) => event.stopPropagation()}
                      />
                    </td>
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
                      {user.action !== 'No action needed' ? <button className="text-link">Open</button> : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>

      <aside className="helper-column">
        <SectionCard title="User detail" subtitle="Example right-side panel opened from the table.">
          <div className="helper-block">
            <strong>{selectedUser.name}</strong>
            <p>{selectedUser.email}</p>
          </div>
          <div className="helper-block">
            <strong>Status timeline</strong>
            <ul>
              <li>Connected successfully on Apr 12</li>
              <li>Provider access changed on Apr 23</li>
              <li>Current state: {selectedUser.status}</li>
            </ul>
          </div>
          <div className="helper-block">
            <strong>Suggested action</strong>
            <p>{selectedUser.action === 'No action needed' ? 'Nothing urgent. User is syncing normally.' : selectedUser.action}</p>
          </div>
          <button className="btn btn-primary full">Send reconnect flow</button>
        </SectionCard>
      </aside>
    </div>
  )
}

function SyncSetupPage() {
  const [syncSubTab, setSyncSubTab] = useState('Objects')

  return (
    <div className="page-stack">
      <div className="subtab-row">
        {['Objects', 'Field Mapping', 'Sync Rules', 'Activity Log'].map((item) => (
          <button
            key={item}
            className={`subtab ${syncSubTab === item ? 'active' : ''}`}
            onClick={() => setSyncSubTab(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {syncSubTab === 'Objects' ? (
        <div className="stage-layout">
          <div className="primary-column">
            <SectionCard
              title="Objects to sync"
              subtitle="Guide setup before users fall into a dense mapping table."
              actions={<button className="btn btn-primary small">Continue setup</button>}
            >
              <div className="summary-chip-row compact">
                <div className="summary-chip"><strong>Active</strong><span>Sync status</span></div>
                <div className="summary-chip"><strong>3</strong><span>Objects enabled</span></div>
                <div className="summary-chip"><strong>1h ago</strong><span>Last successful sync</span></div>
              </div>
              <div className="object-grid">
                {objectCards.map((object) => (
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
          </div>

          <aside className="helper-column">
            <SectionCard title="Setup checklist" subtitle="Replace passive helper text with progress-oriented guidance.">
              <ul className="checklist">
                <li className="done">Select objects to sync</li>
                <li className="done">Map required fields</li>
                <li className="active">Review sync rules</li>
                <li>Run test sync</li>
              </ul>
            </SectionCard>
          </aside>
        </div>
      ) : null}

      {syncSubTab === 'Field Mapping' ? (
        <div className="stage-layout">
          <div className="primary-column">
            <SectionCard
              title="Field Mapping"
              subtitle="Highlight required fields, validation, and safer property creation."
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
          </div>

          <aside className="helper-column">
            <SectionCard title="Selected field inspector" subtitle="Contextual side panel for field review and warnings.">
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
          </aside>
        </div>
      ) : null}

      {syncSubTab === 'Sync Rules' ? (
        <SectionCard title="Sync Rules" subtitle="Move dense, technical settings into a clean rule workspace.">
          <div className="rule-list">
            {syncRules.map((rule) => (
              <div key={rule.label} className="rule-row">
                <div>
                  <strong>{rule.label}</strong>
                  <p>{rule.value}</p>
                </div>
                <button className="btn btn-secondary small">Edit</button>
              </div>
            ))}
          </div>
          <div className="sticky-footer-sim">
            <span>3 unsaved rule changes</span>
            <div className="section-actions">
              <button className="btn btn-secondary small">Discard</button>
              <button className="btn btn-primary small">Save changes</button>
            </div>
          </div>
        </SectionCard>
      ) : null}

      {syncSubTab === 'Activity Log' ? (
        <SectionCard title="Activity Log" subtitle="Surface what changed recently without forcing users into raw system logs.">
          <div className="activity-list">
            {activityItems.map((item) => (
              <div key={item.title} className="activity-row">
                <div>
                  <strong>{item.title}</strong>
                  <p>Triggered by a workspace admin.</p>
                </div>
                <span>{item.time}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      ) : null}
    </div>
  )
}

function SchemaPage() {
  const [isSyncing] = useState(true)

  return (
    <div className="stage-layout">
      <div className="primary-column">
        <SectionCard
          title="Schema"
          subtitle="Make schema freshness, change detection, and review actions obvious."
          actions={
            <>
              <button className="btn btn-secondary small">View sync history</button>
              <button className="btn btn-primary small">Sync schema</button>
            </>
          }
        >
          {isSyncing ? (
            <div className="sync-banner">
              Syncing schema for 12 objects. You can leave this page while the refresh continues.
            </div>
          ) : null}
          <div className="summary-chip-row compact">
            <div className="summary-chip"><strong>25</strong><span>Objects discovered</span></div>
            <div className="summary-chip"><strong>Today</strong><span>Last schema sync</span></div>
            <div className="summary-chip warning"><strong>2</strong><span>Objects need review</span></div>
          </div>
          <div className="toolbar-row">
            <input className="search-input" value="Search objects" readOnly />
            <div className="chip-row">
              <Badge>All</Badge>
              <Badge tone="warning">Outdated</Badge>
              <Badge tone="danger">Error</Badge>
            </div>
          </div>
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
        <SectionCard title="Selected object detail" subtitle="Drawer-like context panel for change review.">
          <div className="helper-block">
            <strong>Deals</strong>
            <p>Core CRM object with 54 fields currently available for mapping.</p>
          </div>
          <div className="helper-block">
            <strong>Change summary</strong>
            <ul>
              <li>2 new fields discovered in the last schema refresh</li>
              <li>1 field type changed from text to number</li>
            </ul>
          </div>
          <button className="btn btn-secondary full">Review mapping impact</button>
        </SectionCard>
      </aside>
    </div>
  )
}

function App() {
  const [activePage, setActivePage] = useState('overview')

  const pageTitle = useMemo(() => {
    if (activePage === 'users') return 'Users'
    if (activePage === 'sync') return 'Sync Setup'
    if (activePage === 'schema') return 'Schema'
    return 'Overview'
  }, [activePage])

  const jumpMap = {
    'Review users': () => setActivePage('users'),
    'Fix mapping': () => setActivePage('sync'),
    'Review schema': () => setActivePage('schema'),
  }

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
          <p>Desktop-first prototype with routed states for stakeholder review.</p>
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
              <article key={provider.name} className={`provider-card ${provider.name === 'HubSpot' ? 'selected' : ''}`}>
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
                {provider.issueCount ? <div className="provider-issues">{provider.issueCount} items need attention</div> : null}
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
              <button className={`tab ${activePage === 'overview' ? 'active' : ''}`} onClick={() => setActivePage('overview')}>Overview</button>
              <button className={`tab ${activePage === 'users' ? 'active' : ''}`} onClick={() => setActivePage('users')}>Users</button>
              <button className={`tab ${activePage === 'sync' ? 'active' : ''}`} onClick={() => setActivePage('sync')}>Sync Setup</button>
              <button className={`tab ${activePage === 'schema' ? 'active' : ''}`} onClick={() => setActivePage('schema')}>Schema</button>
            </div>

            <div className="page-label-row">
              <div>
                <div className="eyebrow">Prototype state</div>
                <strong>{pageTitle}</strong>
              </div>
              <div className="section-actions">
                <Badge tone="warning">Mock data</Badge>
                <Badge>Desktop preview</Badge>
              </div>
            </div>

            {activePage === 'overview' ? <OverviewPage onJump={(action) => jumpMap[action]?.()} /> : null}
            {activePage === 'users' ? <UsersPage /> : null}
            {activePage === 'sync' ? <SyncSetupPage /> : null}
            {activePage === 'schema' ? <SchemaPage /> : null}
          </section>
        </div>
      </main>
    </div>
  )
}

export default App
