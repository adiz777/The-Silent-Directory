import React, { useEffect, useState } from "react";
import DirectoryLayout from "../components/DirectoryLayout";
import { generateAll } from "../utils/generator";

/* ================================
   STATIC COUNCIL FEED (Authoritative)
================================ */
const COUNCIL_FEED = [
  {
    title: "Elder Chamber",
    body: "Voting conclave concluded — silence remains."
  },
  {
    title: "Financial Circle",
    body: "Coin circulation normalized after Rome incident."
  },
  {
    title: "Judicator Office",
    body: "Field judgments delegated. No appeals accepted."
  },
  {
    title: "Archivists",
    body: "Classified retrieval requests increased by 23%."
  }
];

export default function HighTable() {
  const [excommunicado, setExcommunicado] = useState(false);
  const [orders, setOrders] = useState([]);

  /* ================================
     EXCOMMUNICADO MODE
  ================================ */
  useEffect(() => {
    document.body.classList.toggle("excommunicado", excommunicado);
  }, [excommunicado]);

  /* ================================
     GENERATE HIGH TABLE ORDERS
  ================================ */
  useEffect(() => {
    const world = generateAll();

    const generated = world.missions.slice(0, 10).map((m, i) => ({
      id: `HT-${i}`,
      title: `Directive ${i + 1}`,
      classification: classify(m),
      location: m.location,
      target: m.target,
      reward: m.reward,
      summary: `Authorization granted for ${m.type.toLowerCase()} under High Table mandate.`
    }));

    setOrders(generated);
  }, []);

  return (
    <DirectoryLayout title="High Table Console">
      {/* ================== STATUS ================== */}
      <div className="sd-panel sd-panel-wide sd-panel-danger">
        <div className="sd-panel-header">
          <h2>Authority Status</h2>
          <span className="sd-pill sd-tag-danger">ABSOLUTE</span>
        </div>

        <p className="sd-muted">
          This console reflects binding decisions issued by the High Table.
          All access is logged. Dissent is terminal.
        </p>

        <button
          className={`sd-btn ${excommunicado ? "danger" : ""}`}
          onClick={() => setExcommunicado(v => !v)}
          style={{ marginTop: "12px" }}
        >
          {excommunicado ? "Revoke Excommunicado" : "Declare Excommunicado"}
        </button>
      </div>

      {/* ================== ORDERS ================== */}
      <div className="sd-panel sd-panel-wide">
        <div className="sd-panel-header">
          <h2>High Table Directives</h2>
          <span className="sd-pill">{orders.length} Active</span>
        </div>

        <ul className="sd-list">
          {orders.map(o => (
            <li key={o.id} className="sd-list-row">
              <div className="sd-panel-header">
                <span className="sd-strong">{o.title}</span>
                <span className={`sd-tag ${tagClass(o.classification)}`}>
                  {o.classification}
                </span>
              </div>

              <div className="sd-meta">
                Target: {o.target}<br />
                Location: {o.location}<br />
                Reward: {o.reward}
              </div>

              <div className="sd-faint">{o.summary}</div>
            </li>
          ))}
        </ul>
      </div>

      {/* ================== COUNCIL FEED ================== */}
      <div className="sd-panel sd-panel-danger">
        <div className="sd-panel-header">
          <h2>Council Surveillance</h2>
          <span className="sd-tag sd-tag-danger">LIVE</span>
        </div>

        <ul className="sd-list sd-list-tight">
          {COUNCIL_FEED.map((c, i) => (
            <li key={i} className="sd-list-row">
              <span className="sd-strong">{c.title}</span>
              <span className="sd-meta">{c.body}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ================== WARNING ================== */}
      <div className="sd-panel sd-panel-wide">
        <p className="sd-muted">
          “Consequences are the foundation of order. Without them, rules are meaningless.”
        </p>
      </div>
    </DirectoryLayout>
  );
}

/* ================================
   HELPERS
================================ */

function classify(mission) {
  if (mission.priority === "Non-Negotiable") return "EXCOMMUNICADO";
  if (mission.priority === "Urgent") return "RESTRICTED";
  return "STANDARD";
}

function tagClass(level) {
  if (level === "EXCOMMUNICADO") return "sd-tag-danger";
  if (level === "RESTRICTED") return "sd-tag-warning";
  return "";
}
