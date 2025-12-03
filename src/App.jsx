import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
import BlackArchive from "./pages/BlackArchive.jsx";
import DossierGenerator from "./pages/DossierGenerator.jsx";
import ContinentalCheckIn from "./pages/ContinentalCheckIn.jsx";
import Surveillance from "./pages/Surveillance.jsx";
import HighTable from "./pages/HighTable.jsx";

export default function App() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<Login />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Profile */}
      <Route path="/profile" element={<Profile />} />

      {/* High Table Console */}
      <Route path="/high-table" element={<HighTable />} />

      {/* Black Archive */}
      <Route path="/black-archive" element={<BlackArchive />} />

      {/* Dossier Generator */}
      <Route path="/generator" element={<DossierGenerator />} />

      {/* Continental Check-In */}
      <Route path="/check-in" element={<ContinentalCheckIn />} />

      {/* Surveillance */}
      <Route path="/surveillance" element={<Surveillance />} />

      {/* Fallback redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
