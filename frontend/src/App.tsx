import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenuBar from "./components/MenuBar";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SupplierPortal from "./pages/SupplierPortal";
import WarehouseManagerPortal from "./pages/WarehouseManagerPortal";
import CompanyPortal from "./pages/CompanyPortal";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

const Dashboard: React.FC = () => (
  <div style={{ display: "flex", minHeight: "100vh" }}>
    <MenuBar />
    <div style={{ flex: 1, background: "#F6F8FA" }}>
      <Header />
      <main style={{ padding: "2rem" }}>
        {/* Your main content goes here */}
        <h2>Welcome to the Dashboard</h2>
      </main>
    </div>
  </div>
);

// Protect dashboard route
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    window.location.href = "/";
    return null;
  }
  return <>{children}</>;
};

const App: React.FC = () => (
  <Router>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/supplier" element={<SupplierPortal />} />
        <Route path="/warehouse" element={<WarehouseManagerPortal />}/>
        <Route path="/company" element={<CompanyPortal />}/>
        {/* <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/supplier" element={<ProtectedRoute><SupplierPortal /></ProtectedRoute>} />
        <Route path="/warehouse" element={<ProtectedRoute><WarehouseManagerPortal /></ProtectedRoute>} />
        <Route path="/company" element={<ProtectedRoute><CompanyPortal /></ProtectedRoute>} /> */}
      </Routes>
    </AuthProvider>
  </Router>
);

export default App;
