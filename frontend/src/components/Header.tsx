import React from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";

const Header: React.FC = () => (
  <header style={{
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "1rem 2rem",
    background: "#fff",
    borderBottom: "1px solid #eee",
    height: 70,
    width: "100%",
  }}>
    <FaBell size={22} style={{ marginRight: 24, color: "#181F2B", cursor: "pointer" }} />
    <FaUserCircle size={32} style={{ color: "#181F2B", cursor: "pointer" }} />
  </header>
);

export default Header; 