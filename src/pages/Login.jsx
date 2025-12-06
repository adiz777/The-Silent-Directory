import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const THEMES = [
  "continental-gold",
  "high-table-crimson",
  "shadow-blue",
  "terminal-wick"
];

export default function Login() {
  const navigate = useNavigate();
  const [alias, setAlias] = useState("");
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const randomTheme = THEMES[Math.floor(Math.random() * THEMES.length)];
    setTheme(randomTheme);
    localStorage.setItem("sd_theme", randomTheme);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    if (!alias.trim()) {
      alert("Alias required.");
      return;
    }

    localStorage.setItem("sd_alias", alias);
    navigate("/dashboard");
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-6" data-theme={theme}>
      <div className="w-full max-w-md p-6">
        <h1 className="text-2xl mb-6 text-center">The Silent Directory</h1>
        <p className="text-sm opacity-70 mb-6 text-center">
          Identification required to access the network.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter your alias…"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            className="px-3 py-2"
          />
          <button type="submit" className="px-3 py-2">
            Access Network
          </button>
        </form>
        <div className="mt-6 opacity-60 text-center text-xs">
          <p>Unauthorized access is prohibited.</p>
          <p>All activity is logged.</p>
        </div>
      </div>
    </div>
  );
}
