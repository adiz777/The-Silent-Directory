import { faker } from "@faker-js/faker";
import { resolveCity } from "./cityResolver";

/* ============================
   ✅ AGENTS (CITIES / MAP)
============================ */

export async function generateAgents(query, count = 10) {
  const city = await resolveCity(query);

  const baseLat = city?.lat ?? faker.number.float({ min: 20, max: 60 });
  const baseLng = city?.lng ?? faker.number.float({ min: -20, max: 80 });

  return Array.from({ length: count }, () => ({
    fullName: faker.person.fullName(),
    codename:
      faker.word.adjective().toUpperCase() +
      " " +
      faker.animal.type().toUpperCase(),
    profession: faker.person.jobTitle(),
    city: city?.name || query || "Unknown",
    nationality: city?.country || faker.location.countryCode("alpha-2"),
    agency: faker.company.name(),
    lat: baseLat + (Math.random() - 0.5) * 0.12,
    lng: baseLng + (Math.random() - 0.5) * 0.12,
  }));
}

/* ============================
   ✅ CONTINENTALS (HOTELS)
============================ */

export function generateContinentals(count = 200) {
  return Array.from({ length: count }, (_, i) => ({
    id: `CON-${i + 1}`,
    name: `The Continental ${faker.location.city()}`,
    city: faker.location.city(),
    manager: faker.person.fullName(),
    rating: faker.number.int({ min: 3, max: 5 }),
    roomsAvailable: faker.number.int({ min: 12, max: 240 }),
    status: faker.helpers.arrayElement([
      "Operational",
      "Under Observation",
      "Restricted",
    ]),
  }));
}

/* ============================
   ✅ WORLD SNAPSHOT (DASHBOARD)
============================ */

export function generateAll() {
  const dossiers = Array.from({ length: 200 }, (_, i) => ({
    id: `DOS-${i + 1}`,
    name: faker.person.fullName(),
    codename:
      faker.word.adjective().toUpperCase() +
      " " +
      faker.animal.type().toUpperCase(),
    specialty: faker.person.jobTitle(),
    risk: faker.helpers.arrayElement([
      "Low",
      "Moderate",
      "High",
      "Severe",
    ]),
    notes: faker.lorem.sentence(),
    city: faker.location.city(),
    nationality: faker.location.countryCode("alpha-2"),
  }));

  const missions = Array.from({ length: 150 }, (_, i) => ({
    id: `MIS-${i + 1}`,
    type: faker.helpers.arrayElement([
      "Extraction",
      "Recon",
      "Erasure",
      "Retrieval",
    ]),
    difficulty: faker.helpers.arrayElement([
      "Low",
      "Medium",
      "High",
      "Extreme",
    ]),
    priority: faker.helpers.arrayElement([
      "Routine",
      "Urgent",
      "Non-Negotiable",
    ]),
    location: faker.location.city(),
    target: faker.person.fullName(),
    reward: `${faker.number.int({ min: 5, max: 500 })} coins`,
    window: faker.date.soon().toISOString(),
  }));

  const weapons = Array.from({ length: 200 }, (_, i) => ({
    id: `WPN-${i + 1}`,
    name: faker.commerce.productName(),
    type: faker.helpers.arrayElement([
      "Handgun",
      "Rifle",
      "Sniper",
      "Shotgun",
    ]),
    origin: faker.location.country(),
    rarity: faker.helpers.arrayElement([
      "Common",
      "Rare",
      "Legendary",
    ]),
    serial: faker.string.alphanumeric(10).toUpperCase(),
  }));

  const blacklist = Array.from({ length: 120 }, (_, i) => ({
    id: `BLK-${i + 1}`,
    name: faker.person.fullName(),
    codename: faker.word.adjective().toUpperCase(),
    threat: faker.helpers.arrayElement([
      "Level 1",
      "Level 3",
      "Level 5",
    ]),
    lastSeen: faker.location.city(),
    background: faker.lorem.sentence(),
  }));

  return { dossiers, missions, weapons, blacklist };
}
