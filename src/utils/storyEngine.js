// src/utils/storyEngine.js

import { emit } from "./eventBus";
import houses from "../data/houses.json";
import council from "../data/council.json";
import cities from "../data/cities.json";

/**
 * Story Engine
 * Generates rare narrative events, long-form signals,
 * deep worldbuilding whispers, and mythic patterns.
 */
class StoryEngine {
  constructor() {
    this.interval = null;
  }

  start() {
    if (this.interval) return;

    // slow narrative pulse — every 55 seconds
    this.interval = setInterval(() => {
      this.storyPulse();
    }, 55000);
  }

  stop() {
    if (this.interval) clearInterval(this.interval);
    this.interval = null;
  }

  storyPulse() {
    const roll = Math.random();

    // 40% — long-form whisper
    if (roll < 0.40) {
      this.longFormWhisper();
    }
    // 25% — faction omen
    else if (roll < 0.65) {
      this.factionOmen();
    }
    // 20% — council forewarning
    else if (roll < 0.85) {
      this.councilForewarning();
    }
    // 15% — deep red priority event (rare)
    else {
      this.deepRedEvent();
    }
  }

  // -----------------------------------------
  // STORY EVENTS
  // -----------------------------------------

  longFormWhisper() {
    const city = this.randomCity();

    emit("whisper", {
      id: `story-lf-${Date.now()}`,
      category: "story",
      text: `Several unrelated signals in ${city.name} appear to point toward the same unnamed source. Correlation unclear.`,
    });
  }

  factionOmen() {
    const house = this.randomHouse();

    emit("whisper", {
      id: `story-omen-${Date.now()}`,
      category: "factions",
      text: `Old alliances stir within ${house.name}. Their motto "${house.motto}" has been uttered unusually often.`,
    });
  }

  councilForewarning() {
    const seat =
      council[Math.floor(Math.random() * council.length)];

    emit("council", {
      summary: `${seat.codename} issued a forewarning.`,
      details: `Patterns across several regions hint at coordinated shifts.`,
    });

    emit("whisper", {
      id: `story-council-${Date.now()}`,
      category: "council",
      text: `${seat.codename}: forewarning issued — records suggest this has happened only twice before.`,
    });
  }

  deepRedEvent() {
    const city = this.randomCity();
    const house = this.randomHouse();

    emit("anomaly", {
      id: `deep-red-${Date.now()}`,
      type: "deep-red-event",
      severity: "Extreme",
      description: `Deep red-level signal detected overlapping ${city.name} and ${house.name}. Meaning unknown.`,
    });

    emit("whisper", {
      id: `wh-deepred-${Date.now()}`,
      category: "redacted",
      text: `██ DEEP RED EVENT ██ — overlapping anomalies detected near ${city.name}. House involved: ${house.name}.`,
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

const storyEngine = new StoryEngine();
export default storyEngine;
