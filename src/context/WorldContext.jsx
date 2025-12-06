import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const WorldContext = createContext(null);

export function WorldProvider({ children }) {
  const [alias, setAlias] = useState("Operator");
  const [theme, setTheme] = useState("shadow-blue");

  useEffect(() => {
    const a = localStorage.getItem("sd_alias") || "Operator";
    const t = localStorage.getItem("sd_theme") || "shadow-blue";
    setAlias(a);
    setTheme(t);
  }, []);

  const value = useMemo(
    () => ({
      alias,
      theme,
    }),
    [alias, theme]
  );

  return <WorldContext.Provider value={value}>{children}</WorldContext.Provider>;
}

export function useWorld() {
  const ctx = useContext(WorldContext);
  if (!ctx) {
    throw new Error("useWorld must be used within a WorldProvider");
  }
  return ctx;
}
