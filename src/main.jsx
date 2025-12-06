import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { WorldProvider } from "./context/WorldContext.jsx";
import "./index.css";

// ✅ APPLY SAVED OR DEFAULT THEME
const theme =
  localStorage.getItem("sd_theme") || "continental-gold";

document.body.setAttribute("data-theme", theme);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <WorldProvider>
        <App />
      </WorldProvider>
    </BrowserRouter>
  </React.StrictMode>
);
