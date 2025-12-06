// src/utils/creditEngine.js

import { emit } from "./eventBus";
import financialData from "../data/financial.json";
import houses from "../data/houses.json";

/**
 * Credit Engine
 * Handles noisy financial movement through the Underworld Credit Network.
 */
class CreditEngine {
  constructor() {
    this.interval = null;
  }

  start() {
    if (this.interval) return;

    // triggers every 25 seconds
    this.interval = setInterval(() => {
      this.creditPulse();
    }, 25000);
  }

  stop() {
    if (this.interval) clearInterval(this.interval);
    this.interval = null;
  }

  creditPulse() {
    const roll = Math.random();

    // 40% — financial update
    if (roll < 0.40) {
      this.standardFinanceEvent();
    }
    // 25% — suspicious activity
    else if (roll < 0.65) {
      this.suspiciousFlow();
    }
    // 20% — high-risk house ledger conflict
    else if (roll < 0.85) {
      this.houseFinancialIncident();
    }
    // 15% — major ledger mismatch
    else {
      this.majorMismatch();
    }
  }

  // -----------------------------------
  // FINANCIAL INTEL LOGIC
  // -----------------------------------

  standardFinanceEvent() {
    const entry =
      financialData[Math.floor(Math.random() * financialData.length)];

    emit("whisper", {
      id: `fin-${Date.now()}`,
      category: "finance",
      text: entry.summary,
    });
  }

  suspiciousFlow() {
    const amount = Math.floor(Math.random() * 40) + 10;

    emit("whisper", {
      id: `fin-susp-${Date.now()}`,
      category: "finance",
      text: `Unusual coin flow detected (${amount} units) through an unregistered route.`,
    });
  }

  houseFinancialIncident() {
    const house =
      houses.houses[Math.floor(Math.random() * houses.houses.length)];

    emit("whisper", {
      id: `fin-house-${Date.now()}`,
      category: "finance",
      text: `${house.name} ledger shows irregularities. Motto: "${house.motto}".`,
    });

    // small chance of anomaly escalation
    if (Math.random() < 0.25) {
      emit("anomaly", {
        id: `anom-ledger-${Date.now()}`,
        type: "ledger-irregularity",
        severity: "High",
        description: `Irregular movement inside the ${house.name} financial registry.`,
      });
    }
  }

  majorMismatch() {
    emit("anomaly", {
      id: `anom-fin-major-${Date.now()}`,
      type: "ledger-mismatch",
      severity: "Extreme",
      description: "Ledger totals exceed possible coin circulation.",
    });

    emit("whisper", {
      id: `wh-fin-major-${Date.now()}`,
      category: "finance",
      text: "Ledger totals exceed circulation. Possible tampering.",
    });
  }
}

const creditEngine = new CreditEngine();
export default creditEngine;
