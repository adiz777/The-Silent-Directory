import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [alias, setAlias] = useState("");

  useEffect(() => {
    const themes = [
      "continental-gold",
      "high-table-crimson",
      "shadow-blue"
    ];
    const chosen = themes[Math.floor(Math.random() * themes.length)];

    document.body.setAttribute("data-theme", chosen);
    localStorage.setItem("sd_theme", chosen);
  }, []);

  function submit(e) {
    e.preventDefault();
    if (!alias.trim()) return;
    localStorage.setItem("sd_alias", alias);
    navigate("/dashboard");
  }

  return (
    <div className="login-screen">
      <form className="login-card" onSubmit={submit}>
        <div className="login-title">The Silent Directory</div>

        <p className="text-xs opacity-80">
          Identification required to access the network.
        </p>

        <div className="login-divider" />

        <input
          className="login-input"
          placeholder="Enter your alias…"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
        />

        <button className="login-btn">
          ACCESS NETWORK
        </button>

        <div className="login-meta">
          Unauthorized access is prohibited.<br />
          All activity is logged.
        </div>
      </form>
    </div>
  );
}
