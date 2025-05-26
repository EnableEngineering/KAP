import React from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import '../styles/theme.css';

interface HeaderProps {
  moduleName: string;
}

const Header: React.FC<HeaderProps> = ({ moduleName }) => (
  <header style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    background: "#fff",
    borderBottom: "1px solid #eee",
    height: 70,
    width: "100%",
  }}>
    <span style={{ fontWeight: 600, fontSize: 22, color: "#FFFFFF" }}>
      {moduleName}
    </span>
    <div>
      <FaBell size={22} style={{ marginRight: 24, color: "#181F2B", cursor: "pointer" }} />
      <FaUserCircle size={32} style={{ color: "#181F2B", cursor: "pointer" }} />
    </div>
  </header>
);

export default Header;