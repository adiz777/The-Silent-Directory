import { useState, useEffect } from "react";

/**
 * Shared game state for The Silent Directory.
 * Manages coins, credibility and rank using localStorage for persistence.
 */
export function useGameState() {
  const [coins, setCoins] = useState(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem("tsd_coins") : null;
    return stored ? parseInt(stored, 10) || 0 : 0;
  });

  const [credibility, setCredibility] = useState(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem("tsd_cred") : null;
    return stored ? parseInt(stored, 10) || 20 : 20;
  });

  const [rank, setRank] = useState(() => {
    return typeof window !== "undefined" ? window.localStorage.getItem("tsd_rank") || "Observer" : "Observer";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("tsd_coins", String(coins));
  }, [coins]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("tsd_cred", String(credibility));
  }, [credibility]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("tsd_rank", rank);
  }, [rank]);

  useEffect(() => {
    // auto-update rank from credibility
    if (credibility >= 80 && rank !== "High Table Asset") setRank("High Table Asset");
    else if (credibility >= 60 && rank !== "Continental Member") setRank("Continental Member");
    else if (credibility >= 40 && rank !== "Trusted Operator") setRank("Trusted Operator");
    else if (credibility < 40 && rank !== "Observer") setRank("Observer");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [credibility]);

  function award(progress = { coins: 0, cred: 0 }) {
    const { coins: c = 0, cred: cr = 0 } = progress;
    if (c !== 0) setCoins((prev) => prev + c);
    if (cr !== 0) setCredibility((prev) => prev + cr);
  }

  return { coins, credibility, rank, award };
}
