// src/utils/heatEngine.js

import { emit } from "./eventBus";
import cities from "../data/cities.json";

/**
 * Heat Engine
 * Handles slow-burn global heat drift, regional tension changes,
 * cooling cycles, and occasional flare-ups.
 */
class HeatEngine {
  constructor() {
    this.interval = null;
  }

  start() {
    if (this.interval) return;

    // fire every 18 seconds
    this.interval = setInterval(() => {
      this.processHeatCycle();
    }, 18000);
  }

  stop() {
    if (this.interval) clearInterval(this.interval);
    this.interval = null;
  }

  processHeatCycle() {
    const roll = Math.random();

    // 40% — slow global drift
    if (roll < 0.40) {
      this.slowDrift();
    }
    // 30% — cooldown pulse
    else if (roll < 0.70) {
      this.slowCooldown();
    }
    // 20% — regional heat spike
    else if (roll < 0.90) {
      this.regionalSpike();
    }
    // 10% — single city microflare
    else {
      this.singleFlare();
    }
  }

  // -----------------------------------
  // HEAT LOGIC
  // -----------------------------------

  slowDrift() {
    // +1 heat to 3 random cities
    for (let i = 0; i < 3; i++) {
      const city =
        cities[Math.floor(Math.random() * cities.length)];

      emit("cityHeat", {
        cityId: city.id,
        amount: 1,
      });

      emit("whisper", {
        id: `wh-drift-${Date.now()}`,
        category: "cities",
        text: `Minor tension rising in ${city.name}.`,
      });
    }
  }

  slowCooldown() {
    // -1 heat from 2 cities (if heat > 20)
    for (let i = 0; i < 2; i++) {
      const city =
        cities[Math.floor(Math.random() * cities.length)];

      emit("cityHeat", {
        cityId: city.id,
        amount: -1,
      });

      emit("whisper", {
        id: `wh-cool-${Date.now()}`,
        category: "cities",
        text: `${city.name} shows signs of calming.`,
      });
    }
  }

  regionalSpike() {
    const regionPool = [
      "Europe",
      "Asia",
      "Africa",
      "North America",
      "South America",
      "Middle East",
      "Oceania",
    ];

    const region =
      regionPool[Math.floor(Math.random() * regionPool.length)];

    const impacted = cities.filter((c) => c.region === region);

    if (impacted.length === 0) return;

    impacted.forEach((city) => {
      emit("cityHeat", {
        cityId: city.id,
        amount: 3,
      });
    });

    emit("whisper", {
      id: `wh-region-${Date.now()}`,
      category: "cities",
      text: `Regional spike detected across ${region}.`,
    });
  }

  singleFlare() {
    const city = cities[Math.floor(Math.random() * cities.length)];

    emit("cityHeat", {
      cityId: city.id,
      amount: 5,
    });

    emit("whisper", {
      id: `wh-flare-${Date.now()}`,
      category: "cities",
      text: `Sudden flare in ${city.name}. Activity increased sharply.`,
    });
  }
}

const heatEngine = new HeatEngine();
export default heatEngine;
