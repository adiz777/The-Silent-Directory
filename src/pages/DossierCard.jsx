import React, { useState } from "react";
import { printPDF } from "../utils/pdf";

export default function DossierCard({ agent }) {
  const [redacted, setRedacted] = useState(true);

  return (
    <div className="sd-panel dossier">
      <div className="sd-panel-header">
        <h2>{agent.name}</h2>
        <span className="sd-pill sd-tag-warning">{agent.codename}</span>
      </div>

      <div className="sd-list">
        <div className="sd-list-row">
          <span className="sd-strong">Specialty</span>
          <span>{agent.specialty}</span>
        </div>

        <div className="sd-list-row">
          <span className="sd-strong">Nationality</span>
          <span className={redacted ? "redacted" : ""}>
            {agent.nationality}
          </span>
        </div>

        <div className="sd-list-row">
          <span className="sd-strong">Last Known Location</span>
          <span className={redacted ? "redacted" : ""}>
            {agent.lastKnown}
          </span>
        </div>

        <div className="sd-list-row">
          <span className="sd-strong">Risk Level</span>
          <span className="sd-tag sd-tag-danger">{agent.risk}</span>
        </div>

        <div className="sd-list-row">
          <span className="sd-strong">Notes</span>
          <span className={redacted ? "redacted" : ""}>
            {agent.notes}
          </span>
        </div>
      </div>

      <div className="sd-search-row" style={{ marginTop: "12px" }}>
        <button
          className="sd-btn secondary"
          onClick={() => setRedacted(!redacted)}
        >
          {redacted ? "Unredact" : "Redact"}
        </button>

        <button
          className="sd-btn"
          onClick={() => printPDF(`Dossier_${agent.codename}`)}
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}
