import React, { useState } from 'react';
import Header from '../components/Header';
import MenuBar from '../components/MenuBar';
import '../styles/theme.css';
import { FaUpload } from "react-icons/fa";

// --- Dashboard Cards ---
const ActivityDashboard: React.FC = () => {
  const stats = [
    { number: 18, label: "Planned Lifting" },
    { number: 42, label: "Shipments in Transit" },
    { number: 7, label: "Low Stock Items" },
    { number: 5, label: "Deliveries at Risk" },
  ];
  return (
      <div className="dashboard-cards">
        {stats.map((stat, idx) => (
          <div className="dashboard-card" key={idx}>
            <div className="dashboard-card-number">{stat.number}</div>
            <div className="dashboard-card-label">{stat.label}</div>
          </div>
        ))}
      </div>
  );
};



// --- Manage Dispatch Plans ---
const ManageDispatchPlans: React.FC = () => {
  const [liftingOrderId, setLiftingOrderId] = useState('');
  const [liftingDate, setLiftingDate] = useState('');
  const [plan, setPlan] = useState('');
  const [update, setUpdate] = useState('');
  const [liftingOrderFile, setLiftingOrderFile] = useState<File | null>(null);
  const [updatedLiftingOrderFile, setUpdatedLiftingOrderFile] = useState<File | null>(null);

  const handleLiftingOrderFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setLiftingOrderFile(file);
  };
  const handleUpdatedLiftingOrderFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setUpdatedLiftingOrderFile(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Manage Dispatch Plans submitted:", { liftingOrderId, liftingDate, plan, update });
  };

  return (
    <div className="card" style={{ marginTop: '40px' }}>
      <h2 style={{ marginBottom: 20, color: 'var(--primary-color)' }}>Manage Lifting Plans</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Lifting Order ID:</label>
          <input type="text" value={liftingOrderId} onChange={e => setLiftingOrderId(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Lifting Date:</label>
          <input type="date" value={liftingDate} onChange={e => setLiftingDate(e.target.value)} required />
        </div>
        <div className="form-group" style={{ alignItems: 'flex-start' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            Monthly Lifting Plan (optional):
            <label htmlFor="liftingOrderFile" style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', marginLeft: 12 }}>
              <FaUpload style={{ fontSize: 18, color: 'var(--primary-color)' }} />
              <span>Lifting Order Contents</span>
              <input
                id="liftingOrderFile"
                type="file"
                style={{ display: 'none' }}
                onChange={handleLiftingOrderFile}
              />
            </label>
            {liftingOrderFile && (
              <span style={{ marginLeft: 8, color: 'var(--text-muted)', fontSize: 13 }}>
                {liftingOrderFile.name}
              </span>
            )}
          </label>
          <textarea value={plan} onChange={e => setPlan(e.target.value)} />
        </div>
        <div className="form-group" style={{ alignItems: 'flex-start' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            Weekly Update (optional):
            <label htmlFor="updatedLiftingOrderFile" style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', marginLeft: 12 }}>
              <FaUpload style={{ fontSize: 18, color: 'var(--primary-color)' }} />
              <span>Updated Lifting Order Contents</span>
              <input
                id="updatedLiftingOrderFile"
                type="file"
                style={{ display: 'none' }}
                onChange={handleUpdatedLiftingOrderFile}
              />
            </label>
            {updatedLiftingOrderFile && (
              <span style={{ marginLeft: 8, color: 'var(--text-muted)', fontSize: 13 }}>
                {updatedLiftingOrderFile.name}
              </span>
            )}
          </label>
          <textarea value={update} onChange={e => setUpdate(e.target.value)} />
        </div>
        <button className="button" type="submit">Submit</button>
      </form>
    </div>
  );
};

// --- Main Portal Layout ---
const CompanyPortal: React.FC = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <MenuBar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header moduleName="Company Portal" />
        <div className="main-content">
            <ActivityDashboard />
            <ManageDispatchPlans />
        </div>
      </div>
    </div>
  );
};

export default CompanyPortal;