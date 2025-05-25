import React from "react";
import { FaTachometerAlt, FaBoxes, FaTruck, FaProjectDiagram } from "react-icons/fa";

const menuItems = [
  { icon: <FaTachometerAlt />, label: "Activity Dashboard" },
  { icon: <FaBoxes />, label: "Inventory Snapshot" },
  { icon: <FaTruck />, label: "Shipment Insights" },
  { icon: <FaProjectDiagram />, label: "Production Planning" },
];

const MenuBar: React.FC = () => (
  <aside style={{
    width: 250,
    background: "#181F2B",
    color: "#fff",
    minHeight: "100vh",
    padding: "2rem 0",
    display: "flex",
    flexDirection: "column",
    gap: "2rem"
  }}>
    <div style={{ fontWeight: 700, fontSize: 24, textAlign: "center", marginBottom: "2rem" }}>
      Enable.
    </div>
    <nav>
      {menuItems.map((item, idx) => (
        <div key={idx} style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "1rem 2rem",
          cursor: "pointer",
          fontWeight: 500,
          fontSize: 18,
          background: idx === 0 ? "#232B3E" : "none",
          borderRadius: 8,
          marginBottom: 8
        }}>
          {item.icon}
          {item.label}
        </div>
      ))}
    </nav>
  </aside>
);

export default MenuBar; 