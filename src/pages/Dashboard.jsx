import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWorld } from "../context/WorldContext.jsx";
import { generateAgents, generateAll } from "../utils/generator.js";

import "leaflet/dist/leaflet.css";
import * as L from "leaflet";

// expose Leaflet globally for plugins like leaflet.heat
if (typeof window !== "undefined") {
  window.L = window.L || L;
  import("leaflet.heat").catch(() => {});
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { alias, theme } = useWorld();

  const [directoryData, setDirectoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sampleAgents, setSampleAgents] = useState([]);

  useEffect(() => {
    const world = generateAll();
    setDirectoryData(world);

    generateAgents("London", 10).then((agents) => {
      setSampleAgents(agents);
      setLoading(false);
    });
  }, []);

  const accent =
    theme === "high-table-crimson"
      ? "text-red-400"
      : theme === "shadow-blue"
      ? "text-cyan-400"
      : "text-amber-300";

  const borderAccent =
    theme === "high-table-crimson"
      ? "border-red-500/60"
      : theme === "shadow-blue"
      ? "border-cyan-400/60"
      : "border-amber-300/60";

  function logout() {
    navigate("/login");
  }

  return (
    <div className="min-h-screen w-full bg-black text-slate-100 font-mono flex">
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-slate-900 p-4 space-y-1 overflow-y-auto">
        <h2 className="text-xs uppercase tracking-[0.25em] text-slate-500 mb-3">
          Navigation
        </h2>

        {[
          ["Classified Profiles", "/profiles"],
          ["Weapons Inventory", "/weapons"],
          ["Mission Board", "/missions"],
          ["Blacklist Registry", "/blacklist"],
          ["Safehouses", "/safehouses"],
          ["Operators Network", "/operators"],
          ["Council", "/council"],
          ["Archives", "/archives"],
          ["Messages", "/messages"],
          ["Cities Activity", "/cities"],
          ["Continentals", "/continentals"],
          ["High Table Console", "/high-table"],
        ].map(([label, path]) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className="w-full text-left text-xs px-2 py-1 rounded hover:bg-slate-900"
          >
            {label}
          </button>
        ))}

        <button
          onClick={logout}
          className="mt-4 w-full text-left text-xs px-2 py-1 rounded text-red-400 hover:bg-red-950"
        >
          Log Out
        </button>
      </aside>

      {/* MAIN */}
      <main className="flex-1 px-6 py-5 overflow-y-auto">
        <header className="border-b border-slate-800 pb-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className={`text-lg tracking-[0.2em] uppercase ${accent}`}>
                THE SILENT DIRECTORY
              </h1>
              <p className="text-[11px] text-slate-400 mt-1">
                Operator console linked to world engines. Visual & fictional only.
              </p>
            </div>
            <div className="text-right text-xs">
              <div>
                Active operator:{" "}
                <span className={accent}>{alias}</span>
              </div>
              <div className="text-slate-500">
                Theme: <span className="uppercase">{theme}</span>
              </div>
            </div>
          </div>
        </header>

        {loading || !directoryData ? (
          <div className="text-center text-xs text-slate-400 mt-12">
            Initializing world snapshot…
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* LEFT */}
            <section className="space-y-4">
              <div className={`border rounded-xl p-4 bg-black/60 ${borderAccent}`}>
                <h2 className="text-sm uppercase tracking-[0.25em] mb-2">
                  Classified Profiles
                </h2>

                <div className="max-h-72 overflow-y-auto space-y-2">
                  {directoryData.dossiers.slice(0, 30).map((d) => (
                    <div key={d.id} className="border border-slate-800 p-3 rounded">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold">{d.name}</span>
                        <span className="text-slate-400 text-[10px]">
                          {d.codename}
                        </span>
                      </div>
                      <div className="text-[11px]">Specialty: {d.specialty}</div>
                      <div className="text-[11px]">Risk: {d.risk}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-slate-800 rounded-xl p-4 bg-black/60">
                <h2 className="text-sm uppercase tracking-[0.25em] mb-2">
                  Mission Board
                </h2>

                <div className="max-h-72 overflow-y-auto space-y-2">
                  {directoryData.missions.slice(0, 40).map((m) => (
                    <div key={m.id} className="border border-amber-700/60 p-3 rounded">
                      <div className="flex justify-between text-xs">
                        <span className="text-amber-200">{m.type}</span>
                        <span className="text-amber-400 text-[10px]">
                          {m.difficulty}
                        </span>
                      </div>
                      <div className="text-[11px]">Location: {m.location}</div>
                      <div className="text-[11px]">Target: {m.target}</div>
                      <div className="text-[11px]">Reward: {m.reward}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* RIGHT */}
            <section className="space-y-4">
              <div className="border border-slate-800 rounded-xl p-4 bg-black/60">
                <h2 className="text-sm uppercase tracking-[0.25em] mb-2">
                  Weapons Inventory
                </h2>

                <div className="max-h-72 overflow-y-auto space-y-2">
                  {directoryData.weapons.slice(0, 40).map((wp) => (
                    <div key={wp.id} className="border border-slate-700/70 p-3 rounded">
                      <div className="flex justify-between text-xs">
                        <span>{wp.name}</span>
                        <span className="text-slate-400 text-[10px]">{wp.type}</span>
                      </div>
                      <div className="text-[11px]">Origin: {wp.origin}</div>
                      <div className="text-[11px]">Rarity: {wp.rarity}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-slate-800 rounded-xl p-4 bg-black/60">
                <h2 className="text-sm uppercase tracking-[0.25em] mb-2">
                  Live Query // London
                </h2>

                <div className="max-h-40 overflow-y-auto space-y-2">
                  {sampleAgents.map((a, i) => (
                    <div key={i} className="border border-slate-800 p-2 rounded">
                      <div className="flex justify-between text-[11px]">
                        <span>{a.fullName}</span>
                        <span className="text-slate-400">{a.codename}</span>
                      </div>
                      <div className="text-[10px]">
                        {a.profession} — {a.city}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
