// src/utils/cityEngine.js

import { emit } from "./eventBus";
import cities from "../data/cities.json";
import houses from "../data/houses.json";

/**
 * City Engine
 * Adds low-level urban disturbances and minor events
 * that don't qualify as anomalies.
 */
class CityEngine {
  constructor() {
    this.interval = null;
  }

  start() {
    if (this.interval) return;

    // fires every 16 seconds
    this.interval = setInterval(() => {
      this.cityPulse();
    }, 16000);
  }

  stop() {
    if (this.interval) clearInterval(this.interval);
    this.interval = null;
  }

  cityPulse() {
    const roll = Math.random();

    // 40% — minor disturbance
    if (roll < 0.40) {
      this.minorDisturbance();
    }
    // 25% — underground movement
    else if (roll < 0.65) {
      this.undergroundMovement();
    }
    // 20% — faction presence increase
    else if (roll < 0.85) {
      this.factionPresence();
    }
    // 15% — comms disruption
    else {
      this.commsGlitch();
    }
  }

  // -----------------------------------------
  // EVENT TYPES
  // -----------------------------------------

  minorDisturbance() {
    const city = this.randomCity();

    emit("whisper", {
      id: `city-minor-${Date.now()}`,
      category: "cities",
      text: `Minor disturbance reported in ${city.name}. No escalation yet.`,
    });
  }

  undergroundMovement() {
    const city = this.randomCity();

    emit("whisper", {
      id: `city-und-${Date.now()}`,
      category: "cities",
      text: `Transit nodes in ${city.name} show unusual routing patterns.`,
    });

    emit("cityHeat", {
      cityId: city.id,
      amount: 1,
    });
  }

  factionPresence() {
    const city = this.randomCity();
    const house = this.randomHouse();

    emit("whisper", {
      id: `city-faction-${Date.now()}`,
      category: "factions",
      text: `Increased ${house.name} presence in ${city.name}. Motto: "${house.motto}".`,
    });

    emit("cityHeat", {
      cityId: city.id,
      amount: 2,
    });
  }

  commsGlitch() {
    const city = this.randomCity();

    emit("whisper", {
      id: `city-comms-${Date.now()}`,
      category: "comms",
      text: `Intermittent comms disruption reported in ${city.name}. Monitoring.`,
    });
  }

  // -----------------------------------------
  // HELPERS
  // -----------------------------------------

  randomCity() {
    return cities[Math.floor(Math.random() * cities.length)];
  }

  randomHouse() {
    return houses.houses[Math.floor(Math.random() * houses.houses.length)];
  }
}

const cityEngine = new CityEngine();
export default cityEngine;
