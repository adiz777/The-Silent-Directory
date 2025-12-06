import React, { useMemo } from "react";
import { useWorld } from "../context/WorldContext.jsx";

export default function Credits() {
  const { financial, timeline } = useWorld();

  const financeEvents = useMemo(
    () => timeline.filter((t) => t.type === "finance"),
    [timeline]
  );

  return (
    <div className="min-h-screen bg-black text-slate-100 font-mono px-4 md:px-6 lg:px-10 py-6">
      <header className="mb-4">
        <h1 className="text-sm md:text-base tracking-[0.3em] uppercase text-emerald-300">
          Underworld Credit Network
        </h1>
        <p className="text-[11px] text-slate-400 mt-1 max-w-xl">
          Front-end simulation of coin movement, marker disturbances and ledger
          noise. All entries are synthetic and non-binding.
        </p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 xl:gap-6">
        {/* FINANCIAL TABLE */}
        <section className="xl:col-span-2 border border-emerald-700 rounded-xl bg-black/80 backdrop-blur-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs uppercase tracking-[0.25em] text-emerald-300">
              Ledger Snapshots
            </h2>
            <span className="text-[10px] text-emerald-500">
              {financial.length} synthetic entries
            </span>
          </div>
          <div className="max-h-[420px] overflow-y-auto space-y-2 pr-1">
            {financial.map((entry, idx) => (
              <div
                key={entry.id || `fin-${idx}`}
                className="border border-emerald-800 rounded-md px-3 py-2 bg-black/80"
              >
                <div className="text-[11px] text-emerald-200">
                  {entry.summary || "No summary available."}
                </div>
                {entry.details && (
                  <div className="text-[11px] text-emerald-400 mt-1">
                    {entry.details}
                  </div>
                )}
              </div>
            ))}
            {financial.length === 0 && (
              <p className="text-[11px] text-slate-500">
                No financial entries present. Let the engines run for a bit.
              </p>
            )}
          </div>
        </section>

        {/* FINANCE-RELATED EVENTS */}
        <section className="border border-emerald-700 rounded-xl bg-black/90 backdrop-blur-sm p-4">
          <h2 className="text-xs uppercase tracking-[0.25em] text-emerald-300 mb-2">
            Credit Disturbances
          </h2>
          <p className="text-[11px] text-slate-400 mb-3">
            Engine-driven timeline of suspicious routes, freezes and severe
            mismatches.
          </p>
          <div className="max-h-[420px] overflow-y-auto space-y-2 pr-1">
            {financeEvents.length === 0 && (
              <p className="text-[11px] text-slate-500">
                No recorded disturbances yet. Credit engine may need more time.
              </p>
            )}
            {financeEvents.map((ev) => (
              <div
                key={ev.id}
                className="border border-emerald-800 rounded-md px-3 py-2 bg-black/80"
              >
                <div className="text-[10px] text-emerald-500 mb-1">
                  {new Date(ev.ts).toLocaleString() || "Unknown timestamp"}
                </div>
                <div className="text-[11px] text-emerald-200 font-semibold">
                  {ev.summary}
                </div>
                <div className="text-[11px] text-emerald-400 mt-1">
                  {ev.details}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
