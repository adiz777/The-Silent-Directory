// src/utils/anomalyEngine.js

import { emit } from "./eventBus";
import anomalies from "../data/anomalies.json";
import cities from "../data/cities.json";
import operators from "../data/operators.json";

/**
 * Anomaly engine handles unpredictable, high-impact world events.
 */
class AnomalyEngine {
  constructor() {
    this.interval = null;
  }

  start() {
    if (this.interval) return;

    // triggers every 20 seconds
    this.interval = setInterval(() => {
      this.triggerAnomaly();
    }, 20000);
  }

  stop() {
    if (this.interval) clearInterval(this.interval);
    this.interval = null;
  }

  triggerAnomaly() {
    const roll = Math.random();

    // 30% — random anomaly from table
    if (roll < 0.30) {
      this.randomAnomaly();
    }
    // 20% — heat surge event
    else if (roll < 0.50) {
      this.heatSurgeAnomaly();
    }
    // 15% — duplicate alias anomaly
    else if (roll < 0.65) {
      this.identityCollision();
    }
    // 15% — dormant city activity
    else if (roll < 0.80) {
      this.ghostCity();
    }
    // 10% — continental irregularity
    else if (roll < 0.90) {
      this.continentalIssue();
    }
    // 10% — safehouse problem
    else {
      this.safehouseWipe();
    }
  }

  // -------------------------
  // ANOMALY TYPES
  // -------------------------

  randomAnomaly() {
    const item = anomalies[Math.floor(Math.random() * anomalies.length)];
    emit("anomaly", item);
  }

  heatSurgeAnomaly() {
    const city = cities[Math.floor(Math.random() * cities.length)];

    const anomaly = {
      id: `anom-heat-${Date.now()}`,
      type: "heat-surge",
      severity: "High",
      description: `Heat surge in ${city.name}. Activity increased sharply.`,
    };

    emit("anomaly", anomaly);
    emit("cityHeat", { cityId: city.id, amount: 10 });
  }

  identityCollision() {
    const op1 = operators[Math.floor(Math.random() * operators.length)];
    const op2 = operators[Math.floor(Math.random() * operators.length)];

    const anomaly = {
      id: `anom-dup-${Date.now()}`,
      type: "identity-duplication",
      severity: "Extreme",
      description: `${op1.codename} and ${op2.codename} detected under identical alias signatures.`,
    };

    emit("anomaly", anomaly);

    emit("whisper", {
      id: `wh-shadow-${Date.now()}`,
      category: "operators",
      text: `Duplicate alias detected across operators.`,
    });
  }

  ghostCity() {
    const city = cities[Math.floor(Math.random() * cities.length)];

    const anomaly = {
      id: `anom-ghost-${Date.now()}`,
      type: "ghost-city",
      severity: "Medium",
      description: `Unexpected movement detected in ${city.name}, previously marked dormant.`,
    };

    emit("anomaly", anomaly);
  }

  continentalIssue() {
    const anomaly = {
      id: `anom-cont-${Date.now()}`,
      type: "continental-irregular",
      severity: "Medium",
      description: `Staff rotation or ledger issue detected in a Continental branch.`,
    };

    emit("anomaly", anomaly);
  }

  safehouseWipe() {
    const anomaly = {
      id: `anom-safe-${Date.now()}`,
      type: "safehouse-wipe",
      severity: "High",
      description: "Safehouse inventory wiped without authorization.",
    };

    emit("anomaly", anomaly);
  }
}

const anomalyEngine = new AnomalyEngine();
export default anomalyEngine;
