import { faker } from "@faker-js/faker";

// --- PROFESSIONS (100+) ---
const professions = [
  "Weapons Consultant","Body Remover","Clean-Up Coordinator","Forensic Accountant",
  "Negotiation Specialist","Private Security Operative","Risk Auditor","Counter-Espionage Officer",
  "Field Engineer","Digital Forensics Expert","Smuggling Route Analyst","Covert Diplomat",
  "Tactical Medic","Corporate Fixer","Crisis Negotiator","Undercover Transporter",
  "Cyber Intelligence Analyst","Black-Market Broker","Tech Recovery Specialist",
  "Surveillance Specialist","Infiltration Expert","Ballistics Analyst","Safehouse Operator",
  "Explosives Specialist","Encryption Consultant","Supply Chain Fixer","Night Courier",
  "Weapon Smuggler","Tactical Planner","Info Launderer","Shadow Operative","Hostage Negotiator",
  "Escape Route Architect","Ghost Driver","Cultural Attaché","Underworld Connector",
  "Forgery Expert","Identity Broker","Data Miner","Silent Tracker","Espionage Handler",
  "Combat Instructor","Covert Recruiter","Black Bag Specialist","Interrogation Consultant",
  "Dead Drop Manager","Codebreaker","Urban Scout","Tactical Pilot","Naval Liaison",
  "Cyber Wetworker","Signal Interceptor","Silent Locksmith","Cover Story Fabricator",
  "Underground Healer","Money Launderer","Illegal Arms Dealer","Conflict Mediator",
  "Black-Hat Hacker","White-Hat Ghost","Zero-Day Broker","Drone Specialist","Silent Observer",
  "Covert Assassin","Political Fixer","Security Analyst","Subterfuge Engineer",
  "Linguistics Expert","Disguise Specialist","Survival Trainer","Poison Expert",
  "Silent Cleaner","Biohazard Handler","Undercover Analyst","Weapon Tester","Tactical Negotiator",
  "Archive Infiltrator","Radio Intercept Officer","Sleeper Agent Liaison","Chemical Ops Expert",
  "Covert Saboteur","Artifact Smuggler","Financial Manipulator","Data Ghost",
  "Wiretap Expert","Counter-Hacker","Urban Combatant","Crypto Launderer",
  "Bounty Contractor","Neutralizer","Signal Jamming Specialist","Vehicular Specialist",
  "Supply Saboteur","Border Fixer","Arms Collector","Vault Cracker","Counterfeit Master",
  "Info Broker","Undercover Asset","Transport Fixer","Network Phantom","Black Ops Surgeon"
];

// --- AGENCIES (100+) ---
const agencies = [
  "Kronos Group","Helix Division","Phantom Circle","Obsidian Agency","Titan Recovery","Eclipse Network",
  "Atlas Logistics","Vigil Corp","Nova Operations","Ghost Protocol Unit","Blacklight Bureau","Silent Order",
  "Iron Syndicate","Emerald Veil","Spectre Ops","Crimson Directive","Orchid Network","Silver Fang Unit",
  "Wraith Collective","Onyx Commission","Azure Node","Nightshade Cell","Hollow Star Bureau","Cipher Division",
  "Cobalt Front","Ravenwing Ops","Venom Protocol","Umbra Syndicate","Deepwave Initiative","Arclight Agency",
  "Duskfall Group","Phantom Hive","Shadow Council","Echo Network","Serpent Guild","Silent Spire",
  "Ironhand Circle","Lucid Veil","Ashen Ring","Noctis Bureau","Redline Agency","Silent Mantle",
  "Stormveil Ops","Ghostwalkers","Black Sun Division","Horizon Bureau","Orion Directive","Titanfall Cell",
  "Oblivion Network","Nightfall Circle","Spectral Division","Silent Echo","Null Point Bureau","Vector Cell",
  "Silent Guard","Warden Protocol","Cipherfall Division","Coldsteel Agency","Arcanum Bureau","Silent Flame",
  "Hyperion Network","Noir Protocol","Aurora Ops","Catalyst Group","Phantom Aegis","Sentinel Bureau",
  "Frostveil Division","Abyss Protocol","Radiant Syndicate","Monarch Bureau","Nether Ops","Umbra Veil",
  "Silent Reign","Grimlight Circle","Black Dagger Unit","Phantom Dawn","Steelshade Ops","Silent Tide",
  "Omega Protocol","Cryptic Bureau","Silent Bastion","Silent Tower","Bloodveil Network","Phantom Forge",
  "Shatterpoint Division","Silent Wolf Cell","Voidline Bureau","Spectre Wing","Zero Point Ops","Silent Flame",
  "Obsidian Dawn","Ghostfang Unit","Nebula Bureau","Silent Horizon","Silent Nexus","Cinder Veil","Silent Throne"
];

// --- CODENAME GENERATOR ---
const codenameAnimals = ["Viper","Falcon","Raven","Wolf","Hawk","Shade","Echo","Lynx","Cobra","Panther","Jackal","Scorpion","Python","Owl","Fox"];
function generateCodename() {
  return (
    faker.word.adjective().charAt(0).toUpperCase() +
    faker.word.adjective().slice(1) +
    " " +
    faker.helpers.arrayElement(codenameAnimals)
  );
}

// --- FALLBACK CITIES (from local cities.json) ---
let allCities = [];
async function loadCities() {
  if (allCities.length) return allCities;
  const res = await fetch("/cities.json");
  const raw = await res.json();

  // Normalize GeoNames format -> expected format
  allCities = raw.map(c => ({
    id: c.id,
    name: c.name,
    country: c.country,
    admin1: c.admin1,
    lat: parseFloat(c.lat),
    lng: parseFloat(c.lon),   // map "lon" to "lng"
    pop: parseInt(c.pop || 0)
  }));

  return allCities;
}

// --- API CITY LOOKUP (OpenStreetMap Nominatim) ---
async function fetchCityFromAPI(cityName) {
  try {
    const url = `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(cityName)}&format=json&limit=1`;
    const res = await fetch(url, { headers: { "User-Agent": "TheSilentDirectory/1.0" } });
    const data = await res.json();
    if (data.length > 0) {
      return {
        name: cityName,
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
        country: data[0].display_name.split(",").pop().trim(),
      };
    }
  } catch (err) {
    console.error("API lookup failed:", err);
  }
  return null;
}

// --- FUZZY MATCH (fallback) ---
function fuzzyMatchCity(cities, query) {
  const lower = query.toLowerCase();
  return cities.find(c => lower.includes(c.name.toLowerCase()));
}

// --- MAIN GENERATOR ---
export async function generateAgents(query, count = 10) {
  const lowerQuery = query.toLowerCase();

  // Try API first
  let cityData = await fetchCityFromAPI(query);

  // Fallback to local cities.json
  if (!cityData) {
    const cities = await loadCities();
    const match = fuzzyMatchCity(cities, query);
    if (match) {
      cityData = {
        name: match.name,
        lat: match.lat,
        lng: match.lng,
        country: match.country,
      };
    }
  }

  // If still nothing, pick random from local dataset
  if (!cityData) {
    const cities = await loadCities();
    const rand = faker.helpers.arrayElement(cities);
    cityData = {
      name: rand.name,
      lat: rand.lat,
      lng: rand.lng,
      country: rand.country,
    };
  }

  // Generate agents around city
  const results = [];
  for (let i = 0; i < count; i++) {
    let prof = faker.helpers.arrayElement(professions);

    // keyword bias
    if (lowerQuery.includes("weapon")) prof = "Weapons Consultant";
    if (lowerQuery.includes("body")) prof = "Body Remover";
    if (lowerQuery.includes("clean")) prof = "Clean-Up Coordinator";
    if (lowerQuery.includes("cyber")) prof = "Cyber Intelligence Analyst";

    results.push({
      fullName: faker.person.fullName(),
      codename: generateCodename(),
      profession: prof,
      nationality: cityData.country,
      city: cityData.name,
      address: faker.location.streetAddress({ useFullAddress: true }),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      agency: faker.helpers.arrayElement(agencies),
      lat: cityData.lat + (Math.random() - 0.5) * 0.1,
      lng: cityData.lng + (Math.random() - 0.5) * 0.1,
    });
  }
  return results;
}
