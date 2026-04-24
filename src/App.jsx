import { useState } from 'react'
import './App.css'

const providerRail = [
  {
    id: 'hubspot',
    name: 'HubSpot',
    action: 'Disconnect',
    connected: true,
    details: [
      ['Hub Domain', "DO NOT DELETE Blake's Demo-dev-46365059.com"],
      ['Connected User', 'blake@supered.io'],
      ['Hub ID', '46365059'],
      ['Process Enforcement Enabled?', 'YES'],
      ['Object Library Enabled?', 'YES'],
      ['Guide Hub ID', ''],
    ],
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    action: 'Disconnect',
    connected: true,
    details: [
      ['Instance', 'Open'],
      ['Connected User', 'blake@supered.io'],
    ],
  },
  {
    id: 'slack',
    name: 'Slack',
    action: 'Connect',
    connected: false,
    details: [],
  },
]

const providerUsersRows = [
  ['Ashley Cardenas', 'ashley@supered.io', 'Disconnected', 'Invite User'],
  ['Blake Lytle', 'blake@supered.io', 'Connected', 'Manage'],
  ['Dylan Ross', 'dylan@supered.io', 'Disconnected', 'Invite User'],
  ['Jamie Young', 'jamie@supered.io', 'Disconnected', 'Invite User'],
  ['Morgan Page', 'morgan@supered.io', 'Connected', 'Manage'],
]

const schemaRows = [
  ['Contact', 'Apr 23'],
  ['User', 'Apr 23'],
  ['Postal Mail', 'Apr 23'],
  ['Order', 'Apr 23'],
  ['Lead', 'Apr 23'],
  ['Quote', 'Apr 23'],
  ['Service', 'Apr 23'],
  ['Communication (WhatsApp, SMS, LinkedIn)', 'Apr 23'],
  ['Company', 'Apr 23'],
  ['Task', 'Apr 23'],
]

const syncObjects = [
  {
    object: 'Ticket',
    description: 'Map Action Plan fields into HubSpot ticket properties.',
    rows: [
      ['Action Plan Name', 'Ticket name', 'Mapped'],
      ['Priority', 'Priority', 'Mapped'],
      ['Owner', 'Ticket owner', 'Mapped'],
      ['Status', 'Status', 'Mapped'],
    ],
  },
  {
    object: 'Deal',
    description: 'Keep action plans and deal data aligned.',
    rows: [
      ['Action Plan Name', 'Deal name', 'Mapped'],
      ['Owner', 'Deal owner', 'Mapped'],
      ['Priority', 'Create property', 'Needs setup'],
      ['Due Date', 'Close date', 'Mapped'],
    ],
  },
  {
    object: 'Project',
    description: 'Mirror project state into project-like CRM objects.',
    rows: [
      ['Project Name', 'Project title', 'Mapped'],
      ['Project Stage', 'Status', 'Mapped'],
      ['Project Owner', 'Owner', 'Mapped'],
      ['Launch Date', 'Start date', 'Mapped'],
    ],
  },
  {
    object: 'Custom Objects',
    description: 'Custom object mappings supported by your HubSpot schema.',
    rows: [
      ['Custom Name', 'Find existing property', 'Mapped'],
      ['Custom Owner', 'Find existing property', 'Mapped'],
      ['Custom Status', 'Create property', 'Needs setup'],
      ['Custom Notes', 'Find existing property', 'Mapped'],
    ],
  },
]

function SectionShell({ title, action, children }) {
  return (
    <section className="panel">
      <div className="panel-head">
        <h3>{title}</h3>
        {action ? <div className="panel-action">{action}</div> : null}
      </div>
      {children}
    </section>
  )
}

function ProviderUsersSection() {
  return (
    <SectionShell title="Provider Users">
      <div className="table-tools">
        <input className="search" value="Search..." readOnly />
        <button className="primary small">Invite Team Member</button>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {providerUsersRows.map(([name, email, status, action]) => (
              <tr key={email}>
                <td>{name}</td>
                <td>{email}</td>
                <td>
                  <span className={`status-pill ${status === 'Connected' ? 'good' : 'warn'}`}>{status}</span>
                </td>
                <td>
                  <button className={action === 'Manage' ? 'ghost small' : 'primary small'}>{action}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pager muted-row">
        <span>Showing 1 to 5 of 5 results</span>
      </div>
    </SectionShell>
  )
}

function ActionPlanSyncSection() {
  const [activeObject, setActiveObject] = useState('Deal')
  const selectedObject = syncObjects.find((item) => item.object === activeObject)

  return (
    <SectionShell title="Action Plan Sync">
      <div className="subtabs">
        {syncObjects.map((item) => (
          <button
            key={item.object}
            className={`subtab ${activeObject === item.object ? 'active' : ''}`}
            onClick={() => setActiveObject(item.object)}
          >
            {item.object}
          </button>
        ))}
      </div>

      <div className="sync-topbar">
        <div>
          <strong>{selectedObject.object}</strong>
          <p>{selectedObject.description}</p>
        </div>
        <div className="sync-actions">
          <label className="toggle-row"><span>Sync Active</span><span className="toggle on">On</span></label>
          <label className="toggle-row"><span>Auto-Create</span><span className="toggle">Off</span></label>
          <button className="ghost small">Clear</button>
          <button className="ghost small">Create All Properties</button>
          <button className="primary small">Save Mapping</button>
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Action Plan Field</th>
              <th>HubSpot Property</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {selectedObject.rows.map(([field, target, status]) => (
              <tr key={field}>
                <td>{field}</td>
                <td>{target}</td>
                <td>
                  <span className={`status-pill ${status === 'Mapped' ? 'good' : 'warn'}`}>{status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionShell>
  )
}

function HubspotSchemaSection() {
  return (
    <SectionShell title="HubSpot Schema" action={<button className="primary small">Sync Schema</button>}>
      <div className="schema-head-row muted-row">
        <div className="selection-row">
          <strong>0 Selected</strong>
          <button className="link-button">Select All 25</button>
        </div>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Schema</th>
              <th>Last Synced</th>
            </tr>
          </thead>
          <tbody>
            {schemaRows.map(([schema, synced]) => (
              <tr key={schema}>
                <td>
                  <div className="schema-name-cell">
                    <input type="checkbox" readOnly />
                    <span>{schema}</span>
                  </div>
                </td>
                <td>{synced}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pager">
        <span>Showing 1 to 10 of 25 results</span>
        <div className="pager-controls">
          <button className="ghost small">Previous</button>
          <button className="page-chip active">1</button>
          <button className="page-chip">2</button>
          <button className="page-chip">3</button>
          <button className="ghost small">Next</button>
          <button className="ghost small">10 per page</button>
        </div>
      </div>
    </SectionShell>
  )
}

function App() {
  const [activeSection, setActiveSection] = useState('hubspot-schema')
  const [activeProvider, setActiveProvider] = useState('hubspot')

  const selectedProvider = providerRail.find((provider) => provider.id === activeProvider)

  return (
    <div className="app-shell">
      <aside className="workspace-nav">
        <div className="workspace-brand">
          <div className="brand-square">S</div>
          <div>
            <div className="eyebrow">Supered redesign</div>
            <strong>Connections UI pass</strong>
          </div>
        </div>

        <div className="fake-app-nav">
          <span className="nav-title">Blakes sandbox</span>
          <button className="nav-link">Home</button>
          <button className="nav-link">Content</button>
          <button className="nav-link">Processes</button>
          <button className="nav-link">Partner</button>
          <button className="nav-link active">Bases</button>
        </div>

        <div className="fake-base-list">
          {['01. HubSpot Guided Onboarding', 'left lane road company delivery system', 'example of folder structure', 'how we run projects', 'AskElephant training', 'new client', 'sales enablement', 'XYZ acct'].map((item) => (
            <div key={item} className="base-item">{item}</div>
          ))}
        </div>
      </aside>

      <main className="connections-page">
        <div className="top-meta muted-row">
          <span>You don’t have the Sidekick Chrome Extension.</span>
          <button className="link-button">Install in Seconds →</button>
        </div>

        <div className="page-toolbar">
          <input className="search large" value="Search..." readOnly />
          <button className="primary">Invite Team Member</button>
        </div>

        <div className="feature-shell">
          <aside className="provider-rail">
            <h2>Connections</h2>
            {providerRail.map((provider) => (
              <article
                key={provider.id}
                className={`provider-card ${provider.id === activeProvider ? 'selected' : ''}`}
                onClick={() => setActiveProvider(provider.id)}
              >
                <div className="provider-header-row">
                  <strong>{provider.name}</strong>
                  <button className={provider.connected ? 'ghost small danger' : 'primary small'}>{provider.action}</button>
                </div>
                <div className="provider-detail-list">
                  {provider.details.length ? (
                    provider.details.map(([label, value]) => (
                      <div key={label} className="provider-detail-row">
                        <span>{label}:</span>
                        <strong>{value || '—'}</strong>
                      </div>
                    ))
                  ) : (
                    <div className="provider-detail-row">
                      <span>Not connected yet.</span>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </aside>

          <section className="main-panel">
            <div className="panel intro-panel">
              <h1>{selectedProvider.name} Connection</h1>
              <p>Connected to {selectedProvider.name}. It is available as a provider in process rules.</p>
            </div>

            <div className="tabs">
              <button className={`tab ${activeSection === 'provider-users' ? 'active' : ''}`} onClick={() => setActiveSection('provider-users')}>HubSpot Users</button>
              <button className={`tab ${activeSection === 'action-plan-sync' ? 'active' : ''}`} onClick={() => setActiveSection('action-plan-sync')}>Action Plan Sync</button>
              <button className={`tab ${activeSection === 'hubspot-schema' ? 'active' : ''}`} onClick={() => setActiveSection('hubspot-schema')}>HubSpot Schema</button>
            </div>

            {activeSection === 'provider-users' ? <ProviderUsersSection /> : null}
            {activeSection === 'action-plan-sync' ? <ActionPlanSyncSection /> : null}
            {activeSection === 'hubspot-schema' ? <HubspotSchemaSection /> : null}
          </section>
        </div>
      </main>
    </div>
  )
}

export default App
