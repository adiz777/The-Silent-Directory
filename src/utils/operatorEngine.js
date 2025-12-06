// src/utils/operatorEngine.js

import { emit } from "./eventBus";
import operators from "../data/operators.json";
import cities from "../data/cities.json";

/**
 * Operator Engine
 * Simulates shadow movements, sightings, proximity events,
 * and false/duplicate operator signals.
 */
class OperatorEngine {
  constructor() {
    this.interval = null;
  }

  start() {
    if (this.interval) return;

    // fires every 22 seconds
    this.interval = setInterval(() => {
      this.operatorPulse();
    }, 22000);
  }

  stop() {
    if (this.interval) clearInterval(this.interval);
    this.interval = null;
  }

  operatorPulse() {
    const roll = Math.random();

    // 35% — operator shadow sighting
    if (roll < 0.35) {
      this.shadowSighting();
    }
    // 25% — operator relocation event
    else if (roll < 0.60) {
      this.relocationEvent();
    }
    // 20% — conflicting location anomaly
    else if (roll < 0.80) {
      this.conflictEvent();
    }
    // 20% — ghost operator resurfacing
    else {
      this.ghostResurface();
    }
  }

  // --------------------------
  // OPERATOR EVENT TYPES
  // --------------------------

  shadowSighting() {
    const op = operators[Math.floor(Math.random() * operators.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];

    emit("whisper", {
      id: `op-shadow-${Date.now()}`,
      category: "operators",
      text: `${op.codename} sighted moving through ${city.name}.`,
    });
  }

  relocationEvent() {
    const op = operators[Math.floor(Math.random() * operators.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];

    op.lastSeen = city.name;

    emit("whisper", {
      id: `op-reloc-${Date.now()}`,
      category: "operators",
      text: `${op.codename} has changed locations. New trace: ${city.name}.`,
    });

    emit("cityHeat", {
      cityId: city.id,
      amount: 2,
    });
  }

  conflictEvent() {
    const op = operators[Math.floor(Math.random() * operators.length)];
    const cityA = cities[Math.floor(Math.random() * cities.length)];
    const cityB = cities[Math.floor(Math.random() * cities.length)];

    emit("anomaly", {
      id: `anom-conflict-${Date.now()}`,
      type: "operator-duplicate",
      severity: "Extreme",
      description: `${op.codename} detected in both ${cityA.name} and ${cityB.name} within minutes.`,
    });

    emit("whisper", {
      id: `wh-conflict-${Date.now()}`,
      category: "operators",
      text: `${op.codename} anomaly — conflicting signal detected.`,
    });
  }

  ghostResurface() {
    const missingOps = operators.filter(
      (op) => op.status === "Missing" || op.status === "Unknown"
    );

    const ghost =
      missingOps[Math.floor(Math.random() * missingOps.length)];

    if (!ghost) return;

    const city = cities[Math.floor(Math.random() * cities.length)];

    emit("whisper", {
      id: `op-ghost-${Date.now()}`,
      category: "operators",
      text: `Ghost operator ${ghost.codename} briefly detected near ${city.name}.`,
    });

    emit("anomaly", {
      id: `anom-ghostop-${Date.now()}`,
      type: "operator-ghost",
      severity: "High",
      description: `${ghost.codename} resurfaced with weak signal.`,
    });
  }
}

const operatorEngine = new OperatorEngine();
export default operatorEngine;
