import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Existing pages
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
import HighTable from "./pages/HighTable.jsx";

// Phase 2 new pages
import Anomalies from "./pages/Anomalies";
import Council from "./pages/Council";
import Credits from "./pages/Credits";
import Safehouses from "./pages/Safehouses";
import Continentals from "./pages/Continentals";
import Messages from "./pages/Messages";
import Archives from "./pages/Archives";
import Operators from "./pages/Operators";
import Cities from "./pages/Cities";
import Manual from "./pages/Manual";

export default function App() {
  return (
    <Routes>
      {/* Landing */}
      <Route path="/" element={<Landing />} />

      {/* Login */}
      <Route path="/login" element={<Login />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Profile */}
      <Route path="/profile" element={<Profile />} />

      {/* High Table Console */}
      <Route path="/high-table" element={<HighTable />} />

      {/* Phase 2 Core OS Pages */}
      <Route path="/anomalies" element={<Anomalies />} />
      <Route path="/council" element={<Council />} />
      <Route path="/credits" element={<Credits />} />
      <Route path="/safehouses" element={<Safehouses />} />
      <Route path="/continentals" element={<Continentals />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/archives" element={<Archives />} />
      <Route path="/operators" element={<Operators />} />
      <Route path="/cities" element={<Cities />} />
      <Route path="/manual" element={<Manual />} />

      {/* Fallback redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
