import React, { useEffect, useState } from "react";
import DirectoryLayout from "../components/DirectoryLayout";
import { generateAll } from "../utils/generator";

export default function Profiles() {
  const [dossiers, setDossiers] = useState([]);

  useEffect(() => {
    const world = generateAll();
    setDossiers(world.dossiers);
  }, []);

  return (
    <DirectoryLayout title="Classified Profiles">
      {/* INFO HEADER */}
      <div className="sd-panel sd-panel-wide">
        <div className="sd-panel-header">
          <h2>Dossier Archive</h2>
          <span className="sd-pill">{dossiers.length} Files</span>
        </div>

        <p className="sd-muted">
          Synthetic operator dossiers generated for cinematic visualization.
          No real identities. All access logged.
        </p>

        <button
          className="sd-btn secondary"
          onClick={() => window.print()}
          style={{ marginTop: "12px" }}
        >
          Export / Print Dossiers
        </button>
      </div>

      {/* DOSSIER LIST */}
      <div className="sd-panel sd-panel-wide">
        <ul className="sd-list">
          {dossiers.slice(0, 80).map((d) => (
            <li key={d.id} className="sd-list-row">
              <div className="sd-strong">
                {d.name}
                <span className="sd-tag" style={{ marginLeft: "10px" }}>
                  {d.codename}
                </span>
              </div>

              <div className="sd-meta">
                Specialty: {d.specialty} • Risk Level: {d.risk}
              </div>

              <div className="sd-faint">
                Location: {d.city}, {d.nationality}
              </div>

              <div className="sd-faint">
                Notes: {d.notes}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </DirectoryLayout>
  );
}
