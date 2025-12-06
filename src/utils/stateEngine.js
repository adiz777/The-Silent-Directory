// src/utils/stateEngine.js

import { emit } from "./eventBus";
import anomalies from "../data/anomalies.json";
import whispers from "../data/whispers.json";
import cities from "../data/cities.json";
import operators from "../data/operators.json";
import financial from "../data/financial.json";

/**
 * The root engine controlling all world activity.
 * Other engines plug into this loop.
 */
class StateEngine {
  constructor() {
    this.pulseInterval = null;
    this.counter = 0;
  }

  start() {
    if (this.pulseInterval) return; // prevent double-start

    // main world pulse: every 5 seconds
    this.pulseInterval = setInterval(() => {
      this.tick();
    }, 5000);
  }

  stop() {
    if (this.pulseInterval) {
      clearInterval(this.pulseInterval);
      this.pulseInterval = null;
    }
  }

  /**
   * Each tick selects an event category.
   */
  tick() {
    this.counter++;

    const roll = Math.random();

    // 15% – whisper drop
    if (roll < 0.15) {
      this.fireWhisper();
    }
    // 10% – anomaly
    else if (roll < 0.25) {
      this.fireAnomaly();
    }
    // 15% – operator movement
    else if (roll < 0.40) {
      this.fireOperatorShadow();
    }
    // 10% – city heat change
    else if (roll < 0.50) {
      this.fireHeatShift();
    }
    // 10% – credit movement
    else if (roll < 0.60) {
      this.fireCreditEvent();
    }

    // small: every 20 ticks, drop a meta story event
    if (this.counter % 20 === 0) {
      emit("whisper", {
        id: `meta-${Date.now()}`,
        category: "system",
        text: "Directory pulse reached threshold. Secondary systems online."
      });
    }
  }

  // --------------------------------------------------
  // EMITTERS
  // --------------------------------------------------

  fireWhisper() {
    const pool = whispers.whispers;
    const item = pool[Math.floor(Math.random() * pool.length)];
    emit("whisper", item);
  }

  fireAnomaly() {
    const anom = anomalies[Math.floor(Math.random() * anomalies.length)];
    emit("anomaly", anom);
  }

  fireHeatShift() {
    const city = cities[Math.floor(Math.random() * cities.length)];
    const amount = Math.floor(Math.random() * 6) + 1; // +1 to +6 heat
    emit("cityHeat", { cityId: city.id, amount });
  }

  fireOperatorShadow() {
    const op = operators[Math.floor(Math.random() * operators.length)];
    emit("whisper", {
      id: `shadow-${Date.now()}`,
      category: "operator",
      text: `${op.codename} sighted near ${op.lastSeen}`
    });
  }

  fireCreditEvent() {
    const entry = financial[Math.floor(Math.random() * financial.length)];
    emit("whisper", {
      id: `credit-${Date.now()}`,
      category: "finance",
      text: entry.summary
    });
  }
}

const stateEngine = new StateEngine();
export default stateEngine;
