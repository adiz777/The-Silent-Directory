// src/utils/whisperEngine.js

import { emit } from "./eventBus";
import whispersData from "../data/whispers.json";
import operators from "../data/operators.json";
import cities from "../data/cities.json";
import houses from "../data/houses.json";

/**
 * Whisper Engine
 * Generates richer, contextual whispers beyond the state engine's simple drops.
 */
class WhisperEngine {
  constructor() {
    this.interval = null;
  }

  start() {
    if (this.interval) return;

    // whisper pulses every 12 seconds
    this.interval = setInterval(() => {
      this.generateWhisper();
    }, 12000);
  }

  stop() {
    if (this.interval) clearInterval(this.interval);
    this.interval = null;
  }

  // ------------------------
  // MAIN GENERATION LOGIC
  // ------------------------

  generateWhisper() {
    const roll = Math.random();

    if (roll < 0.40) {
      this.genericWhisper();
    } else if (roll < 0.65) {
      this.operatorWhisper();
    } else if (roll < 0.80) {
      this.cityWhisper();
    } else if (roll < 0.93) {
      this.houseWhisper();
    } else {
      this.redactedWhisper();
    }
  }

  // BASE from whispers.json
  genericWhisper() {
    const pool = whispersData.whispers;
    const item = pool[Math.floor(Math.random() * pool.length)];
    emit("whisper", item);
  }

  // OPERATOR EVENTS
  operatorWhisper() {
    const op = operators[Math.floor(Math.random() * operators.length)];
    emit("whisper", {
      id: `wh-op-${Date.now()}`,
      category: "operators",
      text: `${op.codename} reported near ${op.lastSeen}. Status: ${op.status}.`
    });
  }

  // CITY EVENTS
  cityWhisper() {
    const city = cities[Math.floor(Math.random() * cities.length)];
    emit("whisper", {
      id: `wh-city-${Date.now()}`,
      category: "cities",
      text: `Movement spike detected in ${city.name}. Current heat: ${city.heat}.`
    });
  }

  // HOUSE RELATIONS
  houseWhisper() {
    const house = houses.houses[Math.floor(Math.random() * houses.houses.length)];
    emit("whisper", {
      id: `wh-house-${Date.now()}`,
      category: "factions",
      text: `House ${house.name}: intelligence suggests internal reshuffling. Motto: "${house.motto}".`
    });
  }

  // RARE EVENTS
  redactedWhisper() {
    emit("whisper", {
      id: `wh-red-${Date.now()}`,
      category: "redacted",
      text: "███████████████ — signal partially intercepted — ████ available ██ review ███."
    });
  }
}

const whisperEngine = new WhisperEngine();
export default whisperEngine;
