import React, { useEffect, useState } from "react";
import { generateAll } from "../utils/generator";
import DirectoryLayout from "../components/DirectoryLayout";

export default function Profiles() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const world = generateAll();
    setProfiles(world.dossiers.slice(0, 20));
  }, []);

  return (
    <DirectoryLayout title="Classified Dossiers">
      <div className="sd-panel sd-panel-wide">
        <p className="sd-muted">
          The following dossiers are procedurally generated.  
          They represent operational archetypes for cinematic reference only.
        </p>
      </div>

      {profiles.map((p) => (
        <div key={p.id} className="sd-panel">
          <div className="sd-panel-header">
            <h2>{p.codename}</h2>
            <span className="sd-pill">{p.risk}</span>
          </div>

          <div className="sd-meta">
            Name: {p.name}<br />
            Specialty: {p.specialty}
          </div>

          <div className="sd-faint" style={{ marginTop: "8px" }}>
            {p.notes}
          </div>

          <div style={{ marginTop: "10px" }}>
            <button className="sd-btn secondary">View Dossier</button>
            <button className="sd-btn" style={{ marginLeft: "8px" }}>
              Export PDF
            </button>
          </div>
        </div>
      ))}
    </DirectoryLayout>
  );
}
