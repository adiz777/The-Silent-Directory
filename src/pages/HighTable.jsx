import React from "react";

export default function HighTable() {
  return (
    <div className="w-full h-full p-6 overflow-auto">
      <h1 className="text-xl mb-4">High Table Console</h1>
      <p className="text-sm mb-2">
        This is a placeholder console view for the High Table / central authority layer
        of the Silent Directory. All information is synthetic and for cinematic UI only.
      </p>
      <p className="text-sm opacity-70">
        You can extend this page later with council feeds, decrees, contract overviews,
        or PDF export of dossiers.
      </p>
    </div>
  );
}
