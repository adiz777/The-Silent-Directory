import { faker } from "@faker-js/faker";

// Helper arrays
const specialties = [
  "Close Protection",
  "Asset Recovery",
  "Covert Transport",
  "Information Laundering",
  "Counter-Surveillance",
  "Cyber Reconnaissance",
  "Forensic Accounting",
  "Arms Brokering",
  "Extraction Planning",
  "Operational Logistics",
];

const risks = ["Low", "Moderate", "High", "Severe", "Unknown"];

const weaponTypes = ["Handgun", "Sniper", "Rifle", "Shotgun", "SMG", "Melee", "Exotic"];
const weaponRarity = ["Common", "Uncommon", "Rare", "Legendary", "Prototype"];

const missionTypes = ["Extraction", "Recon", "Erasure", "Retrieval", "Pursuit"];
const difficulties = ["Low", "Medium", "High", "Extreme"];
const priorities = ["Routine", "Time-Sensitive", "Urgent", "Non-Negotiable"];

const threatLevels = ["Level 1", "Level 2", "Level 3", "Level 4", "Level 5"];

// ---- Dossiers ----
function generateDossier(id) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const city = faker.location.city();
  const country = faker.location.country();

  return {
    id: `DOS-${id}`,
    name: `${firstName} ${lastName}`,
    codename: faker.word.adjective().toUpperCase() + " " + faker.animal.type().toUpperCase(),
    specialty: faker.helpers.arrayElement(specialties),
    risk: faker.helpers.arrayElement(risks),
    notes: faker.lorem.sentence(),
    city,
    nationality: country,
  };
}

// ---- Weapons ----
function generateWeapon(id) {
  return {
    id: `WPN-${id}`,
    name: faker.commerce.productName(),
    type: faker.helpers.arrayElement(weaponTypes),
    caliber: faker.helpers.arrayElement(["9mm", "5.56", "7.62", ".45 ACP", "12g", "Unknown"]),
    origin: faker.location.country(),
    weight: faker.number.float({ min: 0.5, max: 10, precision: 0.1 }) + " kg",
    rarity: faker.helpers.arrayElement(weaponRarity),
    useCase: faker.helpers.arrayElement([
      "Close quarters",
      "Long-range precision",
      "Crowd control",
      "Silent operation",
      "Ritual contract",
    ]),
    serial: faker.string.alphanumeric(10).toUpperCase(),
  };
}

// ---- Missions ----
function generateMission(id) {
  const location = `${faker.location.city()}, ${faker.location.country()}`;
  const deadline = faker.date.soon({ days: 14 });

  return {
    id: `MIS-${id}`,
    type: faker.helpers.arrayElement(missionTypes),
    difficulty: faker.helpers.arrayElement(difficulties),
    priority: faker.helpers.arrayElement(priorities),
    location,
    target: faker.person.fullName(),
    reward: faker.finance.amount({ min: 5000, max: 500000, dec: 0 }) + " coins",
    window: deadline.toISOString(),
  };
}

// ---- Blacklist ----
function generateBlacklistEntry(id) {
  return {
    id: `BLK-${id}`,
    name: faker.person.fullName(),
    codename: faker.hacker.noun().toUpperCase() + "-" + faker.number.int({ min: 10, max: 99 }),
    threat: faker.helpers.arrayElement(threatLevels),
    lastSeen: `${faker.location.city()}, ${faker.location.country()}`,
    background: faker.lorem.sentence(),
  };
}

// ---- Agents (generateAgents) ----
export async function generateAgents(query, count = 10) {
  const city = query || faker.location.city();
  const country = faker.location.country();

  const agents = [];
  for (let i = 0; i < count; i++) {
    agents.push({
      fullName: faker.person.fullName(),
      codename: faker.word.adjective().toUpperCase() + " " + faker.animal.type().toUpperCase(),
      profession: faker.person.jobTitle(),
      nationality: country,
      city,
      address: faker.location.streetAddress({ useFullAddress: true }),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      agency: faker.company.name(),
      lat: faker.location.latitude(),
      lng: faker.location.longitude(),
    });
  }

  return agents;
}

// ---- Continentals (200 hotels) ----
export function generateContinentals(count = 200) {
  const hotels = [];
  for (let i = 0; i < count; i++) {
    hotels.push({
      id: `CON-${i + 1}`,
      name: "The Continental " + faker.location.city(),
      city: faker.location.city(),
      manager: faker.person.fullName(),
      rating: faker.number.int({ min: 3, max: 5 }),
      roomsAvailable: faker.number.int({ min: 10, max: 200 }),
    });
  }
  return hotels;
}

// ---- Main world snapshot (generateAll) ----
export function generateAll() {
  const dossiers = Array.from({ length: 200 }, (_, i) => generateDossier(i + 1));
  const missions = Array.from({ length: 150 }, (_, i) => generateMission(i + 1));
  const weapons = Array.from({ length: 200 }, (_, i) => generateWeapon(i + 1));
  const blacklist = Array.from({ length: 120 }, (_, i) =>
    generateBlacklistEntry(i + 1)
  );

  return {
    dossiers,
    missions,
    weapons,
    blacklist,
  };
}
