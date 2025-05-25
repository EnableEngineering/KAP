import React, { useState } from 'react';

// Placeholder Acknowledge Shipment form component (for updating shipment status and marking deliveries as Received or Damaged)
const AcknowledgeShipment: React.FC = () => {
  const [shipmentId, setShipmentId] = useState('');
  const [status, setStatus] = useState('Received');
  const [remarks, setRemarks] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Call API (or dispatch action) to update shipment status.
    console.log("Acknowledge Shipment submitted:", { shipmentId, status, remarks });
  };
  return (
    <div>
      <h2>Acknowledge Shipment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Shipment ID:</label>
          <input type="text" value={shipmentId} onChange={(e) => setShipmentId(e.target.value)} required />
        </div>
        <div>
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Received">Received</option>
            <option value="Damaged">Damaged</option>
          </select>
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
      <h2>Dispatch Entry</h2>
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
          <label>Dispatch Date (e.g. 2023-12-31):</label>
          <input type="text" value={dispatchDate} onChange={(e) => setDispatchDate(e.target.value)} required />
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

// Placeholder Activity Dashboard component (for viewing incoming, pending, processed shipments, dispatch history, and inventory levels)
const ActivityDashboard: React.FC = () => {
  // In a real component, you would fetch (or read from a context) incoming, pending, processed shipments, dispatch history, and inventory levels.
  const incomingShipments = "Incoming Shipments (placeholder)";
  const pendingShipments = "Pending Shipments (placeholder)";
  const processedShipments = "Processed Shipments (placeholder)";
  const dispatchHistory = "Dispatch History (placeholder)";
  const inventoryLevels = "Inventory Levels (placeholder)";
  return (
    <div>
      <h2>Activity Dashboard</h2>
      <p>Incoming Shipments: {incomingShipments}</p>
      <p>Pending Shipments: {pendingShipments}</p>
      <p>Processed Shipments: {processedShipments}</p>
      <p>Dispatch History: {dispatchHistory}</p>
      <p>Inventory Levels: {inventoryLevels}</p>
    </div>
  );
};

// Warehouse Manager Portal (wrapper) component
const WarehouseManagerPortal: React.FC = () => {
  return (
    <div>
      <h1>Warehouse Manager Portal</h1>
      <AcknowledgeShipment />
      <DispatchEntry />
      <ActivityDashboard />
    </div>
  );
};

export default WarehouseManagerPortal; 