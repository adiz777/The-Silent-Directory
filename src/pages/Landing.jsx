import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const THEMES = [
  "continental-gold",
  "high-table-crimson",
  "shadow-blue",
  "terminal-wick"
];

const QUOTES = [
  "“If not now, then when? If not you, then who?”",
  "“Rules and consequences. A simple exchange.”",
  "“Every shadow has a keeper.”",
  "“Welcome back, operator.”",
  "“The chosen are rarely the willing.”",
  "“Exile is temporary. Purpose is permanent.”"
];

const BOOT_LINES = [
  "Decrypting secure channels…",
  "Synchronizing network nodes…",
  "Verifying Continental credentials…",
  "Routing through shadow proxies…",
  "Rebuilding archive index…",
  "Checking High Table directives…",
  "Initializing Whisper relay…",
  "Preparing operator console…",
  "Loading blacksite configurations…",
  "Secure environment established."
];

export default function Landing() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("");
  const [quote, setQuote] = useState("");
  const [bootIndex, setBootIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const randomTheme = THEMES[Math.floor(Math.random() * THEMES.length)];
    setTheme(randomTheme);
    localStorage.setItem("sd_theme", randomTheme);

    const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    setQuote(randomQuote);

    const interval = setInterval(() => {
      setBootIndex((prev) => {
        if (prev >= BOOT_LINES.length - 1) {
          clearInterval(interval);
          setFinished(true);
        }
        return prev + 1;
      });
    }, 700);

    const auto = setTimeout(() => {
      navigate("/login");
    }, BOOT_LINES.length * 700 + 1200);

    return () => {
      clearInterval(interval);
      clearTimeout(auto);
    };
  }, [navigate]);

  return (
    <div className="w-full h-full flex items-center justify-center p-6" data-theme={theme}>
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-xl mb-6">{quote}</h1>
        <div className="text-left mb-6">
          {BOOT_LINES.slice(0, bootIndex).map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
        {!finished && (
          <button onClick={() => navigate("/login")} className="px-4 py-2">
            Skip Intro
          </button>
        )}
      </div>
    </div>
  );
}
