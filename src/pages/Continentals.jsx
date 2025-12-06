import React, { useEffect, useState, useMemo } from "react";
import { generateContinentals } from "../utils/generator.js";

export default function Continentals() {
  const [hotels, setHotels] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [alias, setAlias] = useState("");
  const [nights, setNights] = useState(1);
  const [slip, setSlip] = useState(null);

  useEffect(() => {
    const data = generateContinentals(200);
    setHotels(data);
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return hotels;
    return hotels.filter((h) => {
      return (
        h.name.toLowerCase().includes(q) ||
        h.city.toLowerCase().includes(q) ||
        h.manager.toLowerCase().includes(q)
      );
    });
  }, [hotels, search]);

  const handleBook = (hotel) => {
    setSelected(hotel);
    setSlip(null);
  };

  const confirmBooking = () => {
    if (!selected || !alias) return;
    setSlip({
      id: `SLIP-${Date.now()}`,
      alias,
      nights,
      hotel: selected.name,
      city: selected.city,
      manager: selected.manager,
    });
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 font-mono px-4 md:px-6 lg:px-10 py-6">
      <header className="mb-4">
        <h1 className="text-sm md:text-base tracking-[0.3em] uppercase text-amber-300">
          Continental Directory
        </h1>
        <p className="text-[11px] text-slate-400 mt-1 max-w-xl">
          Fictional registry of Continental hotels used for aesthetic UI only.
          Search, select, and generate an in-universe check-in slip. No real
          bookings. No network calls.
        </p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 xl:gap-6">
        {/* LIST + SEARCH */}
        <section className="xl:col-span-2 border border-slate-800 rounded-xl bg-black/70 backdrop-blur-sm p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
            <div>
              <h2 className="text-xs uppercase tracking-[0.25em]">
                All Branches
              </h2>
              <p className="text-[10px] text-slate-500">
                {hotels.length} synthetic entries. Filter by city, name or
                manager.
              </p>
            </div>
            <input
              type="text"
              className="bg-black/80 border border-slate-700 rounded-md px-3 py-1.5 text-xs outline-none focus:border-amber-400 w-full md:w-56"
              placeholder="Search by city / name / manager"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="max-h-[420px] overflow-y-auto space-y-2 pr-1">
            {filtered.map((h) => (
              <button
                key={h.id}
                onClick={() => handleBook(h)}
                className={`w-full text-left border border-slate-800 rounded-md px-3 py-2 bg-black/60 hover:border-amber-400/80 hover:bg-black/80 transition-colors ${
                  selected?.id === h.id ? "border-amber-400 bg-black" : ""
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-100">
                    {h.name}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-amber-300">
                    {h.city}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>
                    Manager: <span className="text-slate-200">{h.manager}</span>
                  </span>
                  <span>
                    Rating:{" "}
                    <span className="text-amber-300">{h.rating}.0</span> • Rooms:{" "}
                    <span className="text-slate-200">{h.roomsAvailable}</span>
                  </span>
                </div>
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="text-[11px] text-slate-500">
                No branches match that filter.
              </p>
            )}
          </div>
        </section>

        {/* BOOKING PANEL */}
        <section className="border border-slate-800 rounded-xl bg-black/80 backdrop-blur-sm p-4">
          <h2 className="text-xs uppercase tracking-[0.25em] mb-2">
            Continental Check-In
          </h2>
          <p className="text-[11px] text-slate-400 mb-3">
            Select a branch on the left, set your alias and nights, then print a
            fake in-universe slip.
          </p>

          {selected ? (
            <>
              <div className="text-[11px] text-slate-300 mb-3">
                <div className="font-semibold text-slate-100">
                  {selected.name}
                </div>
                <div className="text-slate-400">
                  {selected.city} • Managed by {selected.manager}
                </div>
              </div>

              <div className="space-y-2 mb-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-1">
                    Operator Alias
                  </label>
                  <input
                    type="text"
                    className="bg-black/80 border border-slate-700 rounded-md px-3 py-1.5 text-xs w-full outline-none focus:border-amber-400"
                    placeholder="e.g. MAJOR_ADI"
                    value={alias}
                    onChange={(e) => setAlias(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-1">
                    Nights
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    className="bg-black/80 border border-slate-700 rounded-md px-3 py-1.5 text-xs w-24 outline-none focus:border-amber-400"
                    value={nights}
                    onChange={(e) =>
                      setNights(Math.max(1, Number(e.target.value) || 1))
                    }
                  />
                </div>
              </div>

              <button
                onClick={confirmBooking}
                className="w-full text-xs uppercase tracking-[0.18em] border border-amber-400 text-amber-300 rounded-md py-1.5 hover:bg-amber-400/10 transition-colors"
              >
                Generate Check-In Slip
              </button>
            </>
          ) : (
            <p className="text-[11px] text-slate-500">
              Select a branch from the directory to begin.
            </p>
          )}

          {slip && (
            <div className="mt-4 border border-amber-500/70 rounded-md px-3 py-3 bg-black/90">
              <div className="text-[10px] uppercase tracking-[0.22em] text-amber-300 mb-2">
                Continental Check-In Slip
              </div>
              <div className="text-[11px] text-slate-200">
                <div>
                  <span className="font-semibold">Slip ID:</span> {slip.id}
                </div>
                <div>
                  <span className="font-semibold">Alias:</span> {slip.alias}
                </div>
                <div>
                  <span className="font-semibold">Branch:</span> {slip.hotel}
                </div>
                <div>
                  <span className="font-semibold">City:</span> {slip.city}
                </div>
                <div>
                  <span className="font-semibold">Manager:</span>{" "}
                  {slip.manager}
                </div>
                <div>
                  <span className="font-semibold">Nights:</span> {slip.nights}
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
