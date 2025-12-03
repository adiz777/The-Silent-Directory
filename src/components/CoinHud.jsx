import React from "react";

/**
 * Small HUD component showing coins, credibility and rank.
 */
export default function CoinHud({ coins, credibility, rank }) {
  return (
    <div
      style={{
        border: "1px solid #0ff",
        borderRadius: "6px",
        padding: "8px",
        fontSize: "11px",
        background: "rgba(0,0,0,0.85)",
        marginBottom: "8px",
      }}
    >
      <div style={{ fontWeight: "bold", color: "#0ff", marginBottom: "4px" }}>Continental Ledger</div>
      <div>Coins: {coins}</div>
      <div>Credibility: {credibility}</div>
      <div>Rank: {rank}</div>
    </div>
  );
}
