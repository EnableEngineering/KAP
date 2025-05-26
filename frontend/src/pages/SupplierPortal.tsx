import React, { useState } from 'react';
import Header from '../components/Header';
import MenuBar from '../components/MenuBar';
import '../styles/theme.css';
import { FaUpload } from "react-icons/fa";

// Placeholder Create Shipment form component (for creating a new shipment with details about parts and shipment)
const CreateShipment: React.FC = () => {
  const [quantity, setQuantity] = useState('');
  const [containerNumber, setContainerNumber] = useState('');
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState('');
  const [remarks, setRemarks] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // You can add file reading logic here
      console.log("Selected file:", file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Call API (or dispatch action) to create a new shipment.
    console.log("Create Shipment submitted:", { 
      file: selectedFile, 
      quantity, 
      containerNumber, 
      estimatedDeliveryDate, 
      remarks 
    });
  };

  return (
    <div className="card" style={{ marginTop: '40px'   }}>
      <h2 style={{ marginBottom: 20, color: 'var(--primary-color)' }}>Create New Shipment</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          
        </div>
        <div className="form-group">
          <label htmlFor="partFile" style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <span>Insert Shipment Cotents from File (.xlsx, .pdf, .csv)</span>
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
          <label>Container Number:</label>
          <input type="text" value={containerNumber} onChange={(e) => setContainerNumber(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Estimated Delivery Date (e.g. 2023-12-31):</label>
          <input type="text" value={estimatedDeliveryDate} onChange={(e) => setEstimatedDeliveryDate(e.target.value)} required />
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

// Placeholder Activity Dashboard component (for reading inventory stock status and shipment status)
const ActivityDashboard: React.FC = () => {
  const stats = [
    { number: 8, label: "Shipments in Transit" },
    { number: 24, label: "Shipments Delivered" },
    { number: 3, label: "Next Inventory Lifting" },
    { number: 2, label: "Low Stock Inventory" },
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

// ... CreateShipment and ActivityDashboard components ...

const SupplierPortal: React.FC = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <MenuBar showProductionPlanning />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header moduleName="Supplier Portal" />
        <div className="main-content">
          <ActivityDashboard />
          <CreateShipment />
        </div>
      </div>
    </div>
  );
};

export default SupplierPortal; 