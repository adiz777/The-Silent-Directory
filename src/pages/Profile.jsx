import React from "react";
import { useWorld } from "../context/WorldContext.jsx";

export default function Profile() {
  const { alias, theme } = useWorld();

  return (
    <div className="w-full h-full p-6">
      <h1 className="text-xl mb-4">Operator Profile</h1>
      <p className="text-sm mb-2">Alias: {alias}</p>
      <p className="text-sm mb-4">Theme: {theme}</p>
      <p className="text-sm opacity-70">
        This is a placeholder profile view for the Silent Directory. You can extend it later
        with more in-universe details, credits, and custom settings.
      </p>
    </div>
  );
}
