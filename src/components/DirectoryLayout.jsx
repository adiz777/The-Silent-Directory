import React from "react";
import { useNavigate } from "react-router-dom";
import { useWorld } from "../context/WorldContext";

export default function DirectoryLayout({ title, children }) {
  const navigate = useNavigate();
  const { alias, theme } = useWorld();

  return (
    <div className="sd-root" data-theme={theme}>
      {/* SIDEBAR */}
      <aside className="sd-sidebar">
        <div className="sd-brand">The Silent Directory</div>

        <nav className="sd-nav">
          <button className="sd-btn" onClick={() => navigate("/dashboard")}>
            Dashboard
          </button>
          <button className="sd-btn" onClick={() => navigate("/profiles")}>
            Profiles
          </button>
          <button className="sd-btn" onClick={() => navigate("/weapons")}>
            Weapons
          </button>
          <button className="sd-btn" onClick={() => navigate("/missions")}>
            Missions
          </button>
          <button className="sd-btn" onClick={() => navigate("/blacklist")}>
            Blacklist
          </button>
          <button className="sd-btn" onClick={() => navigate("/continentals")}>
            Continentals
          </button>
          <button className="sd-btn" onClick={() => navigate("/cities")}>
            Cities
          </button>
          <button className="sd-btn" onClick={() => navigate("/high-table")}>
            High Table
          </button>
        </nav>

        <div className="sd-footer">
          <div className="sd-operator">Operator: {alias}</div>
          <button
            className="sd-btn danger"
            onClick={() => navigate("/login")}
          >
            Log out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="sd-main">
        {title && <h1 className="sd-title">{title}</h1>}

        <div className="sd-grid">{children}</div>
      </main>
    </div>
  );
}
