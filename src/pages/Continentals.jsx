import React, { useEffect, useMemo, useState } from "react";
import DirectoryLayout from "../components/DirectoryLayout";
import { generateContinentals } from "../utils/generator";
import { useWorld } from "../context/WorldContext";

export default function Continentals() {
  const { alias: globalAlias } = useWorld();

  const [hotels, setHotels] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [alias, setAlias] = useState("");
  const [nights, setNights] = useState(1);
  const [slip, setSlip] = useState(null);

  // Load synthetic continentals once
  useEffect(() => {
    const data = generateContinentals(200);
    setHotels(data);
  }, []);

  // Filtered list by search
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return hotels;
    return hotels.filter((h) => {
      return (
        h.name.toLowerCase().includes(q) ||
        h.city.toLowerCase().includes(q) ||
        h.manager.toLowerCase().includes(q)
      );
    });
  }, [hotels, search]);

  // Select a branch
  const handleSelect = (hotel) => {
    setSelected(hotel);
    setSlip(null);
    if (!alias && globalAlias) {
      setAlias(globalAlias);
    }
  };

  // Confirm booking -> generate slip
  const confirmBooking = () => {
    if (!selected || !alias.trim()) return;

    const now = new Date();
    const id = `SLIP-${now.getTime().toString(16).toUpperCase()}`;

    setSlip({
      id,
      alias: alias.trim(),
      nights,
      hotel: selected.name,
      city: selected.city,
      manager: selected.manager,
      issuedAt: now.toLocaleString(),
    });
  };

  const clearSlip = () => {
    setSlip(null);
  };

  return (
    <DirectoryLayout title="Continental Network">
      {/* PANEL 1: Registry + Search + Cards */}
      <section className="sd-panel sd-panel-wide">
        <div className="sd-panel-header">
          <div>
            <h2>Continental Registry</h2>
            <p className="sd-muted">
              Fictional registry of Continental branches. Synthetic only — no
              real bookings, no network calls.
            </p>
          </div>
          <span className="sd-pill">
            {hotels.length.toString().padStart(3, "0")} BRANCHES
          </span>
        </div>

        <div className="sd-search-row">
          <input
            type="text"
            placeholder="Search city / branch / manager…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button type="button" onClick={() => setSearch("")}>
              Clear
            </button>
          )}
        </div>

        <div className="sd-cards">
          {filtered.map((h) => (
            <button
              key={h.id}
              type="button"
              className={
                "sd-card" + (selected?.id === h.id ? " active" : "")
              }
              onClick={() => handleSelect(h)}
            >
              <div className="sd-card-title">{h.name}</div>
              <div className="sd-card-meta">
                {h.city} &bull; Rating {h.rating}.0
              </div>
              <div className="sd-card-sub">
                Manager: {h.manager}
                <br />
                Rooms available: {h.roomsAvailable}
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="sd-hint">
              No branches match that filter. Try another city or manager.
            </div>
          )}
        </div>
      </section>

      {/* PANEL 2: Check-in console + slip */}
      <section className="sd-panel sd-panel-wide">
        <div className="sd-panel-header">
          <div>
            <h2>Continental Check-In Console</h2>
            <p className="sd-muted">
              Select a branch, set your operator alias and nights, then issue a
              High Table-style check-in slip for aesthetic / PDF export only.
            </p>
          </div>
        </div>

        <div className="sd-map-grid">
          {/* LEFT: ACTIVE BRANCH + FORM */}
          <div>
            {selected ? (
              <>
                <div className="sd-list-row">
                  <div className="sd-strong">{selected.name}</div>
                  <div className="sd-meta">
                    {selected.city} &bull; Managed by {selected.manager}
                    <br />
                    Rating {selected.rating}.0 &bull; Rooms {selected.roomsAvailable}
                  </div>
                </div>

                <div className="sd-slip" style={{ marginTop: "14px" }}>
                  <h2>Issue Check-In Slip</h2>

                  <label>
                    OPERATOR ALIAS
                    <input
                      type="text"
                      placeholder={globalAlias || "e.g. MAJOR_ADI"}
                      value={alias}
                      onChange={(e) => setAlias(e.target.value)}
                    />
                  </label>

                  <label style={{ marginTop: "10px" }}>
                    NIGHTS
                    <input
                      type="number"
                      min={1}
                      max={30}
                      value={nights}
                      onChange={(e) =>
                        setNights(Math.max(1, Number(e.target.value) || 1))
                      }
                    />
                  </label>

                  <div style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
                    <button type="button" onClick={confirmBooking}>
                      Generate Slip
                    </button>
                    {slip && (
                      <button type="button" onClick={clearSlip}>
                        Reset
                      </button>
                    )}
                  </div>

                  <div className="sd-slip-body">
                    <p className="sd-meta" style={{ marginTop: "10px" }}>
                      Note: this is a **fictional** in-universe artefact for your
                      UI and PDF exports only. No real reservation is made.
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="sd-hint">
                Select a Continental branch from the registry on the left to
                begin issuing a check-in slip.
              </div>
            )}
          </div>

          {/* RIGHT: SLIP + COIN VISUAL */}
          <div>
            {slip ? (
              <div className="sd-slip">
                <h2>Continental Check-In Slip</h2>
                <div className="sd-slip-body">
                  <p>
                    <strong>Slip ID:</strong> {slip.id}
                  </p>
                  <p>
                    <strong>Alias:</strong> {slip.alias}
                  </p>
                  <p>
                    <strong>Branch:</strong> {slip.hotel}
                  </p>
                  <p>
                    <strong>City:</strong> {slip.city}
                  </p>
                  <p>
                    <strong>Manager:</strong> {slip.manager}
                  </p>
                  <p>
                    <strong>Nights:</strong> {slip.nights}
                  </p>
                  <p>
                    <strong>Issued:</strong> {slip.issuedAt}
                  </p>

                  <div className="sd-coin">
                    CONTINENTAL COIN ACKNOWLEDGED &mdash; NO BLOOD OATH
                  </div>

                  <p className="sd-meta" style={{ marginTop: "10px" }}>
                    Stamped: <span className="sd-strong">Issued by the High Table</span>{" "}
                    &middot; For cinematic use only.
                  </p>
                </div>
              </div>
            ) : (
              <div className="sd-hint">
                Once you generate a slip, it will appear here with a coin
                acknowledgement block suitable for screenshots / PDFs.
              </div>
            )}
          </div>
        </div>
      </section>
    </DirectoryLayout>
  );
}
