import React from "react";
import { FaTachometerAlt, FaBoxes, FaTruck, FaProjectDiagram } from "react-icons/fa";
import '../styles/theme.css';

interface MenuBarProps {
  showProductionPlanning?: boolean;
}

const MenuBar: React.FC<MenuBarProps> = ({ showProductionPlanning }) => {
  const menuItems = [
    { icon: <FaTachometerAlt />, label: "Activity Dashboard" },
    { icon: <FaBoxes />, label: "Inventory Snapshot" },
    { icon: <FaTruck />, label: "Shipment Insights" },
  ];

  // Conditionally add Production Planning
  if (showProductionPlanning) {
    menuItems.push({ icon: <FaProjectDiagram />, label: "Production Planning" });
  }

  return (
    <aside style={{
      width: 250,
      background: "#181F2B",
      color: "#fff",
      minHeight: "100vh",
      padding: "2rem 0",
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
    }}>
      <div className="sidebar">
        <div style={{ fontWeight: 700, fontSize: 24, textAlign: "center", marginBottom: "2rem" }}>
          Enable.
        </div>
        <nav>
          {menuItems.map((item, idx) => (
            <div
              key={item.label}
              className={`menu-item${idx === 0 ? ' active' : ''}`}
              style={{ marginBottom: 8 }}
            >
              {item.icon} {item.label}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default MenuBar;