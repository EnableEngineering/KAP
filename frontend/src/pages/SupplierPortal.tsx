import React, { useState } from 'react';

// Placeholder Create Shipment form component (for creating a new shipment with details about parts and shipment)
const CreateShipment: React.FC = () => {
  const [part, setPart] = useState('');
  const [quantity, setQuantity] = useState('');
  const [containerNumber, setContainerNumber] = useState('');
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState('');
  const [remarks, setRemarks] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Call API (or dispatch action) to create a new shipment.
    console.log("Create Shipment submitted:", { part, quantity, containerNumber, estimatedDeliveryDate, remarks });
  };
  return (
    <div>
      <h2>Create New Shipment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Part (SKU):</label>
          <input type="text" value={part} onChange={(e) => setPart(e.target.value)} required />
        </div>
        <div>
          <label>Quantity:</label>
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        </div>
         <div>
          <label>Container Number:</label>
          <input type="text" value={containerNumber} onChange={(e) => setContainerNumber(e.target.value)} required />
         </div>
         <div>
          <label>Estimated Delivery Date (e.g. 2023-12-31):</label>
          <input type="text" value={estimatedDeliveryDate} onChange={(e) => setEstimatedDeliveryDate(e.target.value)} required />
         </div>
         <div>
          <label>Remarks (optional):</label>
          <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} />
         </div>
         <button type="submit">Submit</button>
      </form>
    </div>
  );
};

// Placeholder Activity Dashboard component (for reading inventory stock status and shipment status)
const ActivityDashboard: React.FC = () => {
  // In a real component, you would fetch (or read from a context) inventory stock status and shipment status.
  const inventoryStatus = "Inventory Stock Status (placeholder)";
  const shipmentStatus = "Current and Delivered Shipments Status (placeholder)";
  return (
    <div>
      <h2>Activity Dashboard</h2>
      <p>Inventory Stock Status: {inventoryStatus}</p>
      <p>Shipment Status: {shipmentStatus}</p>
    </div>
  );
};

// Supplier Portal (wrapper) component
const SupplierPortal: React.FC = () => {
  return (
    <div>
      <h1>Supplier Portal</h1>
      <CreateShipment />
      <ActivityDashboard />
    </div>
  );
};

export default SupplierPortal; 