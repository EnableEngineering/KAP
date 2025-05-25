import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

const roleOptions = [
  { value: "SUPPLIER", label: "Supplier" },
  { value: "WAREHOUSE", label: "Warehouse Manager" },
  { value: "COMPANY", label: "Company" },
  { value: "ADMIN", label: "Admin" },
];

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState(roleOptions[0].value);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !role) {
      setError("Please fill in all required fields.");
      setSuccess("");
      return;
    }
    setError("");
    setSuccess("");
    try {
      await registerUser({
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        address,
        role,
      });
      setSuccess("Registration successful! You can now log in.");
      setTimeout(() => navigate("/"), 1500);
    } catch (err: any) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "#F6F8FA",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "2.5rem 2rem 2rem 2rem",
          borderRadius: 16,
          boxShadow: "0 4px 24px rgba(24,31,43,0.08)",
          width: "100%",
          maxWidth: 420,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 32, color: "#181F2B", marginBottom: 8, letterSpacing: 0.75 }}>Enable<span style={{ color: "#4F8CFF" }}>.</span></div>
        <h2 style={{ margin: 0, marginBottom: 24, color: "#181F2B", fontWeight: 700 }}>Register User</h2>
        <form style={{ width: "100%" }} onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16, display: "flex", gap: 8 }}>
            <input
              type="text"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              style={{
                width: "50%",
                padding: "0.75rem 1rem",
                borderRadius: 8,
                border: "1px solid #D1D5DB",
                fontSize: 16
              }}
              placeholder="First Name*"
            />
            <input
              type="text"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              style={{
                width: "50%",
                padding: "0.75rem 1rem",
                borderRadius: 8,
                border: "1px solid #D1D5DB",
                fontSize: 16
              }}
              placeholder="Last Name*"
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                width: "92%",
                padding: "0.75rem 1rem",
                borderRadius: 8,
                border: "1px solid #D1D5DB",
                fontSize: 16
              }}
              placeholder="Email*"
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <input
              type="text"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              style={{
                width: "92%",
                padding: "0.75rem 1rem",
                borderRadius: 8,
                border: "1px solid #D1D5DB",
                fontSize: 16
              }}
              placeholder="Phone"
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <input
              type="text"
              value={address}
              onChange={e => setAddress(e.target.value)}
              style={{
                width: "92%",
                padding: "0.75rem 1rem",
                borderRadius: 8,
                border: "1px solid #D1D5DB",
                fontSize: 16
              }}
              placeholder="Address"
            />
          </div>
          <div style={{ marginBottom: 18 }}>
            <select
              value={role}
              onChange={e => setRole(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: 8,
                border: "1px solid #D1D5DB",
                fontSize: 16,
                color: role ? "#232B3E" : "#888"
              }}
            >
              {roleOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          {error && <div style={{ color: "#e74c3c", marginBottom: 12 }}>{error}</div>}
          {success && <div style={{ color: "#27ae60", marginBottom: 12 }}>{success}</div>}
          <button
            type="submit"
            style={{
              width: "100%",
              background: "#181F2B",
              color: "#fff",
              padding: "0.75rem 0",
              border: "none",
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 18,
              cursor: "pointer"
            }}
          >
            Register
          </button>
        </form>
        <div style={{ marginTop: 18, width: "100%", textAlign: "center" }}>
          <span style={{ color: "#232B3E", fontSize: 15 }}>Already have an account? </span>
          <a href="#" onClick={e => { e.preventDefault(); navigate("/"); }} style={{ color: "#4F8CFF", textDecoration: "none", fontWeight: 500 }}>Login</a>
        </div>
      </div>
    </div>
  );
};

export default Register; 