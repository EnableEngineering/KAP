import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import '../styles/theme.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }
    setError("");
    const success = await login(username, password);
    if (!success) {
      setError("Invalid credentials");
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
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 32, color: "#181F2B", marginBottom: 8, letterSpacing: 0.75 }}>Enable<span style={{ color: "#4F8CFF" }}>.</span></div>
        <form style={{ width: "100%" }} onSubmit={handleSubmit}>
          <div style={{ marginBottom: 18 }}>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: 8,
                border: "1px solid #D1D5DB",
                fontSize: 16
              }}
              placeholder="Username"
            />
          </div>
          <div style={{ marginBottom: 8 }}>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{
                width: "92%",
                padding: "0.75rem 1rem",
                borderRadius: 8,
                border: "1px solid #D1D5DB",
                fontSize: 16
              }}
              placeholder="Password"
            />
          </div>
          <div style={{ textAlign: "right", marginBottom: 18 }}>
            <a href="#" style={{ color: "#4F8CFF", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>Forgot password?</a>
          </div>
          {error && <div style={{ color: "#e74c3c", marginBottom: 12 }}>{error}</div>}
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
            Login
          </button>
        </form>
        <div style={{ marginTop: 18, width: "100%", textAlign: "center" }}>
          <span style={{ color: "#232B3E", fontSize: 15 }}>Manage Users? </span>
          <a
            href="#"
            onClick={e => {
              e.preventDefault();
              navigate("/register");
            }}
            style={{ color: "#4F8CFF", textDecoration: "none", fontWeight: 500 }}
          >
            Admin Console
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login; 