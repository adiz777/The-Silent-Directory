import React, { useEffect, useState, useMemo } from "react";
import { generateContinentals } from "../utils/generator.js";

export default function Continentals() {
  const [hotels, setHotels] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [alias, setAlias] = useState("");
  const [nights, setNights] = useState(1);
  const [slip, setSlip] = useState(null);

  // init
  useEffect(() => {
    const data = generateContinentals(200);
    setHotels(data);

    const storedAlias = localStorage.getItem("sd_alias");
    if (storedAlias) setAlias(storedAlias);

    const storedSlip = sessionStorage.getItem("continental_slip");
    if (storedSlip) setSlip(JSON.parse(storedSlip));
  }, []);

  // search filter
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return hotels;

    return hotels.filter((h) =>
      [h.name, h.city, h.manager]
        .filter(Boolean)
        .some((v) => v.toLowerCase().includes(q))
    );
  }, [hotels, search]);

  function handleSelect(hotel) {
    setSelected(hotel);
    setSlip(null);
  }

  function confirmBooking() {
    if (!selected || !alias) return;

    const newSlip = {
      id: `SLIP-${Date.now()}`,
      alias,
      nights,
      hotel: selected.name,
      city: selected.city,
      manager: selected.manager,
    };

    setSlip(newSlip);
    sessionStorage.setItem(
      "continental_slip",
      JSON.stringify(newSlip)
    );

    // fake room decrement for immersion
    setHotels((prev) =>
      prev.map((h) =>
        h.id === selected.id
          ? {
              ...h,
              roomsAvailable: Math.max(0, h.roomsAvailable - 1),
            }
          : h
      )
    );
  }

  return (
    <div className="min-h-screen bg-black text-slate-100 font-mono px-4 md:px-6 lg:px-10 py-6">
      <header className="mb-4">
        <h1 className="text-sm md:text-base tracking-[0.3em] uppercase text-amber-300">
          Continental Directory
        </h1>
        <p className="text-[11px] text-slate-400 mt-1 max-w-xl">
          Fictional registry of Continental hotels. Visual-only, in-universe UI.
        </p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 xl:gap-6">
        {/* LIST */}
        <section className="xl:col-span-2 border border-slate-800 rounded-xl bg-black/70 p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
            <div>
              <h2 className="text-xs uppercase tracking-[0.25em]">
                All Branches
              </h2>
              <p className="text-[10px] text-slate-500">
                {hotels.length} synthetic locations
              </p>
            </div>

            <input
              type="text"
              className="bg-black border border-slate-700 rounded-md px-3 py-1.5 text-xs"
              placeholder="Search city / hotel / manager"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="max-h-[420px] overflow-y-auto space-y-2">
            {filtered.map((h) => (
              <button
                key={h.id}
                onClick={() => handleSelect(h)}
                className={`w-full text-left border rounded-md px-3 py-2 ${
                  selected?.id === h.id
                    ? "border-amber-400 bg-black"
                    : "border-slate-800 bg-black/60"
                }`}
              >
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold">{h.name}</span>
                  <span className="uppercase tracking-wide text-amber-300">
                    {h.city}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 flex justify-between">
                  <span>Manager: {h.manager}</span>
                  <span>
                    Rating {h.rating}.0 • Rooms {h.roomsAvailable}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* BOOKING */}
        <section className="border border-slate-800 rounded-xl bg-black/80 p-4">
          <h2 className="text-xs uppercase tracking-[0.25em] mb-2">
            Continental Check-In
          </h2>

          {selected ? (
            <>
              <div className="text-[11px] mb-3">
                <div className="font-semibold">{selected.name}</div>
                <div className="text-slate-400">
                  {selected.city} • {selected.manager}
                </div>
              </div>

              <div className="space-y-2 mb-3">
                <input
                  placeholder="Operator Alias"
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs border border-slate-700 bg-black"
                />

                <input
                  type="number"
                  min={1}
                  max={30}
                  value={nights}
                  onChange={(e) =>
                    setNights(Math.max(1, Number(e.target.value) || 1))
                  }
                  className="w-24 px-3 py-1.5 text-xs border border-slate-700 bg-black"
                />
              </div>

              <button
                onClick={confirmBooking}
                className="w-full uppercase tracking-widest border border-amber-400 text-amber-300 py-1.5 text-xs"
              >
                Generate Check-In Slip
              </button>
            </>
          ) : (
            <p className="text-[11px] text-slate-500">
              Select a Continental branch to begin.
            </p>
          )}

          {slip && (
            <div className="mt-4 border border-amber-500 rounded-md p-3">
              <div className="text-[10px] uppercase tracking-widest text-amber-300 mb-2">
                Check-In Slip
              </div>
              {Object.entries(slip).map(([k, v]) => (
                <div key={k} className="text-[11px]">
                  <strong>{k}:</strong> {v}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
