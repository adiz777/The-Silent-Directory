// src/utils/councilEngine.js

import { emit } from "./eventBus";
import council from "../data/council.json";
import houses from "../data/houses.json";
import cities from "../data/cities.json";

/**
 * Council Engine
 * Handles High Table decrees, sanctions, enforcement warnings,
 * and global-scale intelligence shifts.
 */
class CouncilEngine {
  constructor() {
    this.interval = null;
  }

  start() {
    if (this.interval) return;

    // council moves slower — every 35 seconds
    this.interval = setInterval(() => {
      this.councilPulse();
    }, 35000);
  }

  stop() {
    if (this.interval) clearInterval(this.interval);
    this.interval = null;
  }

  councilPulse() {
    const roll = Math.random();

    // 30% — minor decree
    if (roll < 0.30) {
      this.minorDecree();
    }
    // 25% — faction injunction
    else if (roll < 0.55) {
      this.houseInjunction();
    }
    // 20% — city lockdown order
    else if (roll < 0.75) {
      this.cityLockdown();
    }
    // 15% — marker freeze
    else if (roll < 0.90) {
      this.markerFreeze();
    }
    // 10% — emergency summons
    else {
      this.emergencySummons();
    }
  }

  // -----------------------------------------------------
  // COUNCIL ACTIONS
  // -----------------------------------------------------

  minorDecree() {
    const seat =
      council[Math.floor(Math.random() * council.length)];

    emit("council", {
      summary: `${seat.codename} issued a quiet directive.`,
      details: `Regional focus: ${seat.regionFocus.join(", ")}`,
    });

    emit("whisper", {
      id: `wh-decree-${Date.now()}`,
      category: "council",
      text: `${seat.codename} released a low-level directive for internal members.`,
    });
  }

  houseInjunction() {
    const house =
      houses.houses[Math.floor(Math.random() * houses.houses.length)];

    emit("whisper", {
      id: `wh-hinj-${Date.now()}`,
      category: "council",
      text: `The High Table issued an injunction against ${house.name}.`,
    });

    emit("anomaly", {
      id: `anom-houseinj-${Date.now()}`,
      type: "injunction",
      severity: "High",
      description: `${house.name} activities temporarily restricted.`,
    });
  }

  cityLockdown() {
    const city =
      cities[Math.floor(Math.random() * cities.length)];

    emit("whisper", {
      id: `wh-citylock-${Date.now()}`,
      category: "council",
      text: `${city.name} has been placed under temporary High Table lockdown.`,
    });

    emit("cityHeat", {
      cityId: city.id,
      amount: 8, // lockdowns increase heat drastically
    });

    emit("anomaly", {
      id: `anom-lock-${Date.now()}`,
      type: "city-lockdown",
      severity: "Extreme",
      description: `Movement restricted in ${city.name}. Neutral ground enforcement elevated.`,
    });
  }

  markerFreeze() {
    emit("whisper", {
      id: `wh-finfreeze-${Date.now()}`,
      category: "finance",
      text: "Council ordered a temporary freeze on marker redemptions.",
    });

    emit("anomaly", {
      id: `anom-markfreeze-${Date.now()}`,
      type: "marker-freeze",
      severity: "High",
      description:
        "Blood markers temporarily suspended world-wide pending ledger audit.",
    });
  }

  emergencySummons() {
    const seat =
      council[Math.floor(Math.random() * council.length)];

    emit("council", {
      summary: `Emergency summons issued by ${seat.codename}.`,
      details: "All regional adjudicators are expected to respond immediately.",
    });

    emit("whisper", {
      id: `wh-summon-${Date.now()}`,
      category: "council",
      text: `Emergency summons from ${seat.codename}. Response protocols initiated.`,
    });

    emit("anomaly", {
      id: `anom-summon-${Date.now()}`,
      type: "council-summons",
      severity: "Extreme",
      description: "Emergency level communication protocol triggered.",
    });
  }
}

const councilEngine = new CouncilEngine();
export default councilEngine;
