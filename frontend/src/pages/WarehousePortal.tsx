import React, { useState } from 'react';
import Header from '../components/Header';
import MenuBar from '../components/MenuBar';
import '../styles/theme.css';
import { FaUpload } from "react-icons/fa";

// Placeholder Acknowledge Shipment form component (for updating shipment status and marking deliveries as Received or Damaged)
const AcknowledgeShipment: React.FC = () => {
  const [shipmentId, setShipmentId] = useState('');
  const [status, setStatus] = useState('Received');
  const [remarks, setRemarks] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Call API (or dispatch action) to update shipment status.
    console.log("Acknowledge Shipment submitted:", { shipmentId, status, remarks });
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // You can add file reading logic here
      console.log("Selected file:", file);
    }
  };
  return (
    <div>
      <h2 style={{ marginBottom: 20, color: 'var(--primary-color)' }}>Acknowledge Shipment</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Shipment ID:</label>
          <input type="text" value={shipmentId} onChange={(e) => setShipmentId(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="partFile" style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <span>Insert Shipment Cotents from File (.xlsx, .pdf, .csv):</span>
            <FaUpload style={{ fontSize: 20, color: 'var(--primary-color)' }} />
            {selectedFile && (
              <span style={{ marginLeft: 12, color: 'var(--text-muted)', fontSize: 13 }}>
                {selectedFile.name}
              </span>
            )}
          </label>
          <input
            id="partFile"
            type="file"
            accept=".csv,.xlsx,.xls,.txt"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </div>
        <div className="form-group">
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-color)' }}>
            <option value="Received">Received</option>
            <option value="Damaged">Damaged</option>
          </select>
        </div>
        <div className="form-group">
          <label>Remarks (optional):</label>
          <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} />
        </div>
        <button className="button" type="submit">Submit</button>
      </form>
    </div>
  );
};

// Placeholder Dispatch Entry component (for recording dispatch of parts based on HGAP lifting)
const DispatchEntry: React.FC = () => {
  const [part, setPart] = useState('');
  const [quantity, setQuantity] = useState('');
  const [dispatchDate, setDispatchDate] = useState('');
  const [remarks, setRemarks] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Call API (or dispatch action) to record dispatch.
    console.log("Dispatch Entry submitted:", { part, quantity, dispatchDate, remarks });
  };
  return (
    <div>
      <h2 style={{ marginBottom: 20, color: 'var(--primary-color)' }}>Dispatch Entry</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Dispatch ID:</label>
          <input type="text" value={part} onChange={(e) => setPart(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Part (SKU):</label>
          <input type="text" value={part} onChange={(e) => setPart(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Quantity:</label>
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Dispatch Date (e.g. 2023-12-31):</label>
          <input type="text" value={dispatchDate} onChange={(e) => setDispatchDate(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Remarks (optional):</label>
          <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} />
        </div>
        <button className="button" type="submit">Submit</button>
      </form>
    </div>
  );
};

// Placeholder Activity Dashboard component (for viewing incoming, pending, processed shipments, dispatch history, and inventory levels)
const ActivityDashboard: React.FC = () => {
  const stats = [
    { number: 5, label: "Incoming Shipments" },
    { number: 2, label: "Pending Shipments" },
    { number: 12, label: "Processed Shipments" },
    { number: 7, label: "Dispatches Today" },
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

// Warehouse Manager Portal (wrapper) component
const WarehousePortal: React.FC = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <MenuBar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header moduleName="Warehouse Portal" />
        <div className="main-content" style={{ width: '100%' }}>
          <ActivityDashboard />
          <div style={{ marginTop: '40px' }} className="card"><AcknowledgeShipment /></div>
          <div className="card"><DispatchEntry /></div>
        </div>
      </div>
    </div>
  );
};

export default WarehousePortal; 