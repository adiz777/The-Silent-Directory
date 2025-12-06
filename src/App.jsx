import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";

import ClassifiedProfiles from "./pages/ClassifiedProfiles.jsx";
import Weapons from "./pages/Weapons.jsx";
import Missions from "./pages/Missions.jsx";
import Blacklist from "./pages/Blacklist.jsx";
import Safehouses from "./pages/Safehouses.jsx";
import Operators from "./pages/Operators.jsx";
import Council from "./pages/Council.jsx";
import Archives from "./pages/Archives.jsx";
import Messages from "./pages/Messages.jsx";
import Cities from "./pages/Cities.jsx";
import Continentals from "./pages/Continentals.jsx";
import HighTable from "./pages/HighTable.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />

      <Route path="/profiles" element={<ClassifiedProfiles />} />
      <Route path="/weapons" element={<Weapons />} />
      <Route path="/missions" element={<Missions />} />
      <Route path="/blacklist" element={<Blacklist />} />
      <Route path="/safehouses" element={<Safehouses />} />
      <Route path="/operators" element={<Operators />} />
      <Route path="/council" element={<Council />} />
      <Route path="/archives" element={<Archives />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/cities" element={<Cities />} />
      <Route path="/continentals" element={<Continentals />} />
      <Route path="/high-table" element={<HighTable />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
