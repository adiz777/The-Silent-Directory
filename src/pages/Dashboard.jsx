import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameState } from "../hooks/useGameState.js";
import CoinHud from "../components/CoinHud.jsx";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import { generateAgents } from "../utlis/generator.js"; // fixed typo 'utlis' → 'utils'

export default function Dashboard() {
  const { coins, credibility, rank, award } = useGameState();

    const [missionCard, setMissionCard] = useState(null);
const [status, setStatus] = useState("Idle — ready.");
  const [query, setQuery] = useState("");
  const [agents, setAgents] = useState([]);
  const [map, setMap] = useState(null);
  const [heatLayer, setHeatLayer] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [heatMode, setHeatMode] = useState(false);


  const [pulse, setPulse] = useState({
    network: "ONLINE",
    activeNodes: 7,
    lastPingMs: 320,
    encryption: "AES-4096"
  });

  const [deadDropInput, setDeadDropInput] = useState("");
  const [deadDropLog, setDeadDropLog] = useState([]);

  const [terminalLines, setTerminalLines] = useState([
    "[ACCESS GRANTED]",
    "Routing through safe nodes...",
    "Directory sync complete."
  ]);

  const pageSize = 10;
  const [classifiedPage, setClassifiedPage] = useState(0);
  const [weaponsPage, setWeaponsPage] = useState(0);
  const [blacklistPage, setBlacklistPage] = useState(0);
  const [missionsPage, setMissionsPage] = useState(0);
  const [filterAgency, setFilterAgency] = useState("ALL");
  const [filterNationality, setFilterNationality] = useState("ALL");
  const [excommunicado, setExcommunicado] = useState(false);
  const [subTheme, setSubTheme] = useState("Noir");


  const classifiedProfiles = [
  {
    "codename": "THE LOTUS TIGER 68",
    "role": "Forger",
    "status": "ACTIVE",
    "location": "Lisbon",
    "class": "Oracle"
  },
  {
    "codename": "THE SHADOW BLADE 29",
    "role": "Cryptographer",
    "status": "UNKNOWN",
    "location": "Prague",
    "class": "Architect"
  },
  {
    "codename": "THE OBSIDIAN TIGER 57",
    "role": "Fixer",
    "status": "ON CALL",
    "location": "Naples",
    "class": "Tech"
  },
  {
    "codename": "THE ONYX FOX 51",
    "role": "Scout",
    "status": "ACTIVE",
    "location": "Zurich",
    "class": "Handler"
  },
  {
    "codename": "THE DRIFTER LARK 72",
    "role": "Courier",
    "status": "ON CALL",
    "location": "Casablanca",
    "class": "Tech"
  },
  {
    "codename": "THE OBSIDIAN LION 18",
    "role": "Negotiator",
    "status": "UNKNOWN",
    "location": "Cairo",
    "class": "Oracle"
  },
  {
    "codename": "THE IVORY KING 62",
    "role": "Cleaner",
    "status": "ON CALL",
    "location": "Stockholm",
    "class": "Tech"
  },
  {
    "codename": "THE SERPENT CIPHER 21",
    "role": "Courier",
    "status": "ACTIVE",
    "location": "Berlin",
    "class": "Oracle"
  },
  {
    "codename": "THE STEEL CIPHER 54",
    "role": "Forger",
    "status": "ACTIVE",
    "location": "Casablanca",
    "class": "Handler"
  },
  {
    "codename": "THE LOTUS HAND 49",
    "role": "Armorer",
    "status": "UNKNOWN",
    "location": "Dubai",
    "class": "Architect"
  },
  {
    "codename": "THE SERPENT ECHO 49",
    "role": "Armorer",
    "status": "ON CALL",
    "location": "Reykjavik",
    "class": "Oracle"
  },
  {
    "codename": "THE FROST RIDER 83",
    "role": "Negotiator",
    "status": "ON CALL",
    "location": "Istanbul",
    "class": "Mythic"
  },
  {
    "codename": "THE IVORY BLADE 25",
    "role": "Interrogator",
    "status": "UNKNOWN",
    "location": "Hong Kong",
    "class": "Oracle"
  },
  {
    "codename": "THE IVORY BLADE 96",
    "role": "Negotiator",
    "status": "UNKNOWN",
    "location": "New York",
    "class": "Handler"
  },
  {
    "codename": "THE IVORY VEIL 46",
    "role": "Data Broker",
    "status": "UNKNOWN",
    "location": "New York",
    "class": "Architect"
  },
  {
    "codename": "THE RAVEN HAND 69",
    "role": "Data Broker",
    "status": "UNKNOWN",
    "location": "Osaka",
    "class": "Architect"
  },
  {
    "codename": "THE NEBULA WITCH 47",
    "role": "Courier",
    "status": "UNKNOWN",
    "location": "London",
    "class": "Handler"
  },
  {
    "codename": "THE DRIFTER WITCH 37",
    "role": "Interrogator",
    "status": "UNKNOWN",
    "location": "Stockholm",
    "class": "Architect"
  },
  {
    "codename": "THE EMBER WALKER 40",
    "role": "Data Broker",
    "status": "ON CALL",
    "location": "Seoul",
    "class": "Mythic"
  },
  {
    "codename": "THE OBSIDIAN FOX 27",
    "role": "Cryptographer",
    "status": "UNKNOWN",
    "location": "Seoul",
    "class": "Ghost"
  },
  {
    "codename": "THE WOLF KING 71",
    "role": "Ghost Driver",
    "status": "ON CALL",
    "location": "Vienna",
    "class": "Tech"
  },
  {
    "codename": "THE DRIFTER FOX 63",
    "role": "Safehouse Keeper",
    "status": "UNKNOWN",
    "location": "London",
    "class": "Architect"
  },
  {
    "codename": "THE WOLF ECHO 50",
    "role": "Data Broker",
    "status": "UNKNOWN",
    "location": "Prague",
    "class": "Handler"
  },
  {
    "codename": "THE IVORY HAND 83",
    "role": "Scout",
    "status": "UNKNOWN",
    "location": "Prague",
    "class": "Enforcer"
  },
  {
    "codename": "THE FROST LION 33",
    "role": "Safehouse Keeper",
    "status": "UNKNOWN",
    "location": "Stockholm",
    "class": "Architect"
  },
  {
    "codename": "THE JACKAL HUNTER 99",
    "role": "Data Broker",
    "status": "ON CALL",
    "location": "Istanbul",
    "class": "Architect"
  },
  {
    "codename": "THE JACKAL ECHO 94",
    "role": "Forger",
    "status": "ACTIVE",
    "location": "Casablanca",
    "class": "Handler"
  },
  {
    "codename": "THE OBSIDIAN KING 18",
    "role": "Cleaner",
    "status": "ON CALL",
    "location": "Istanbul",
    "class": "Oracle"
  },
  {
    "codename": "THE GHOST FOX 6",
    "role": "Safehouse Keeper",
    "status": "ON CALL",
    "location": "Marrakesh",
    "class": "Oracle"
  },
  {
    "codename": "THE WOLF LION 17",
    "role": "Scout",
    "status": "UNKNOWN",
    "location": "Warsaw",
    "class": "Handler"
  },
  {
    "codename": "THE ARCHITECT ECHO 53",
    "role": "Cryptographer",
    "status": "ON CALL",
    "location": "New York",
    "class": "Ghost"
  },
  {
    "codename": "THE RAVEN VEIL 83",
    "role": "Facilitator",
    "status": "ON CALL",
    "location": "Hong Kong",
    "class": "Mythic"
  },
  {
    "codename": "THE EMBER ECHO 53",
    "role": "Fixer",
    "status": "UNKNOWN",
    "location": "Vienna",
    "class": "Tech"
  },
  {
    "codename": "THE ARCHITECT LARK 32",
    "role": "Facilitator",
    "status": "ON CALL",
    "location": "Seoul",
    "class": "Architect"
  },
  {
    "codename": "THE NIGHT LARK 85",
    "role": "Negotiator",
    "status": "ON CALL",
    "location": "Vienna",
    "class": "Architect"
  },
  {
    "codename": "THE EMBER HAND 90",
    "role": "Data Broker",
    "status": "UNKNOWN",
    "location": "New York",
    "class": "Ghost"
  },
  {
    "codename": "THE SPECTER ECHO 91",
    "role": "Safehouse Keeper",
    "status": "UNKNOWN",
    "location": "Reykjavik",
    "class": "Tech"
  },
  {
    "codename": "THE MIRAGE LION 36",
    "role": "Negotiator",
    "status": "UNKNOWN",
    "location": "Berlin",
    "class": "Ghost"
  },
  {
    "codename": "THE FROST BLADE 50",
    "role": "Safehouse Keeper",
    "status": "ON CALL",
    "location": "Lisbon",
    "class": "Architect"
  },
  {
    "codename": "THE FROST KING 81",
    "role": "Forger",
    "status": "UNKNOWN",
    "location": "Budapest",
    "class": "Handler"
  },
  {
    "codename": "THE SHADOW SPIDER 13",
    "role": "Armorer",
    "status": "UNKNOWN",
    "location": "Budapest",
    "class": "Enforcer"
  },
  {
    "codename": "THE SPECTER RIDER 27",
    "role": "Armorer",
    "status": "UNKNOWN",
    "location": "Vienna",
    "class": "Oracle"
  },
  {
    "codename": "THE NEBULA QUEEN 11",
    "role": "Tracker",
    "status": "UNKNOWN",
    "location": "Vienna",
    "class": "Tech"
  },
  {
    "codename": "THE MIRAGE RIDER 66",
    "role": "Cryptographer",
    "status": "ACTIVE",
    "location": "Zurich",
    "class": "Handler"
  },
  {
    "codename": "THE IVORY WALKER 66",
    "role": "Courier",
    "status": "ACTIVE",
    "location": "Casablanca",
    "class": "Architect"
  },
  {
    "codename": "THE FROST MOTH 56",
    "role": "Cleaner",
    "status": "ACTIVE",
    "location": "Reykjavik",
    "class": "Architect"
  },
  {
    "codename": "THE CROW TIGER 59",
    "role": "Cryptographer",
    "status": "ON CALL",
    "location": "Reykjavik",
    "class": "Mythic"
  },
  {
    "codename": "THE SHADOW QUEEN 60",
    "role": "Facilitator",
    "status": "ACTIVE",
    "location": "Reykjavik",
    "class": "Architect"
  },
  {
    "codename": "THE VIPER WALKER 24",
    "role": "Safehouse Keeper",
    "status": "UNKNOWN",
    "location": "Marrakesh",
    "class": "Oracle"
  },
  {
    "codename": "THE DRIFTER MOTH 90",
    "role": "Handler",
    "status": "UNKNOWN",
    "location": "Cairo",
    "class": "Oracle"
  },
  {
    "codename": "THE ORACLE SPIDER 82",
    "role": "Interrogator",
    "status": "ON CALL",
    "location": "Prague",
    "class": "Mythic"
  },
  {
    "codename": "THE FROST HAND 52",
    "role": "Courier",
    "status": "ON CALL",
    "location": "Istanbul",
    "class": "Mythic"
  },
  {
    "codename": "THE IVORY KING 1",
    "role": "Fixer",
    "status": "ACTIVE",
    "location": "Prague",
    "class": "Handler"
  },
  {
    "codename": "THE SPECTER QUEEN 37",
    "role": "Cleaner",
    "status": "ON CALL",
    "location": "Stockholm",
    "class": "Architect"
  },
  {
    "codename": "THE CROW HAND 59",
    "role": "Cleaner",
    "status": "UNKNOWN",
    "location": "Reykjavik",
    "class": "Mythic"
  },
  {
    "codename": "THE ORACLE FOX 2",
    "role": "Data Broker",
    "status": "ACTIVE",
    "location": "New York",
    "class": "Handler"
  },
  {
    "codename": "THE MIRAGE QUEEN 29",
    "role": "Armorer",
    "status": "UNKNOWN",
    "location": "Naples",
    "class": "Ghost"
  },
  {
    "codename": "THE NEBULA LION 10",
    "role": "Data Broker",
    "status": "ACTIVE",
    "location": "Lisbon",
    "class": "Tech"
  },
  {
    "codename": "THE PHOENIX LARK 37",
    "role": "Forger",
    "status": "UNKNOWN",
    "location": "Naples",
    "class": "Ghost"
  },
  {
    "codename": "THE VIPER LARK 33",
    "role": "Ghost Driver",
    "status": "ON CALL",
    "location": "Lisbon",
    "class": "Tech"
  },
  {
    "codename": "THE ARCHITECT HAND 51",
    "role": "Tracker",
    "status": "ACTIVE",
    "location": "Osaka",
    "class": "Architect"
  },
  {
    "codename": "THE DRIFTER HUNTER 69",
    "role": "Safehouse Keeper",
    "status": "ON CALL",
    "location": "Reykjavik",
    "class": "Ghost"
  },
  {
    "codename": "THE JACKAL WITCH 42",
    "role": "Forger",
    "status": "UNKNOWN",
    "location": "Casablanca",
    "class": "Ghost"
  },
  {
    "codename": "THE EMBER VEIL 74",
    "role": "Cleaner",
    "status": "UNKNOWN",
    "location": "Casablanca",
    "class": "Architect"
  },
  {
    "codename": "THE ONYX LARK 34",
    "role": "Negotiator",
    "status": "ACTIVE",
    "location": "Zurich",
    "class": "Ghost"
  },
  {
    "codename": "THE FROST WARDEN 12",
    "role": "Tracker",
    "status": "ACTIVE",
    "location": "New York",
    "class": "Enforcer"
  },
  {
    "codename": "THE CROW BLADE 6",
    "role": "Cleaner",
    "status": "UNKNOWN",
    "location": "Naples",
    "class": "Enforcer"
  },
  {
    "codename": "THE NEBULA WITCH 18",
    "role": "Cleaner",
    "status": "ON CALL",
    "location": "Warsaw",
    "class": "Tech"
  },
  {
    "codename": "THE SHADOW VEIL 18",
    "role": "Handler",
    "status": "ACTIVE",
    "location": "Casablanca",
    "class": "Tech"
  },
  {
    "codename": "THE ARCHITECT FOX 36",
    "role": "Interrogator",
    "status": "ON CALL",
    "location": "New York",
    "class": "Tech"
  },
  {
    "codename": "THE WOLF MOTH 7",
    "role": "Interrogator",
    "status": "ON CALL",
    "location": "Dubai",
    "class": "Mythic"
  },
  {
    "codename": "THE MIRAGE SAGE 4",
    "role": "Ghost Driver",
    "status": "ACTIVE",
    "location": "Stockholm",
    "class": "Mythic"
  },
  {
    "codename": "THE EMBER TIGER 72",
    "role": "Cryptographer",
    "status": "ON CALL",
    "location": "Casablanca",
    "class": "Ghost"
  },
  {
    "codename": "THE ARCHITECT MOTH 46",
    "role": "Scout",
    "status": "ON CALL",
    "location": "Prague",
    "class": "Ghost"
  },
  {
    "codename": "THE SPECTER ECHO 12",
    "role": "Fixer",
    "status": "ON CALL",
    "location": "Casablanca",
    "class": "Tech"
  },
  {
    "codename": "THE FROST WALKER 74",
    "role": "Negotiator",
    "status": "ON CALL",
    "location": "Naples",
    "class": "Mythic"
  },
  {
    "codename": "THE JACKAL SAGE 83",
    "role": "Scout",
    "status": "ON CALL",
    "location": "Hong Kong",
    "class": "Architect"
  },
  {
    "codename": "THE ORACLE WALKER 22",
    "role": "Facilitator",
    "status": "ON CALL",
    "location": "Osaka",
    "class": "Handler"
  },
  {
    "codename": "THE SHADOW SAGE 54",
    "role": "Cleaner",
    "status": "ON CALL",
    "location": "Zurich",
    "class": "Tech"
  },
  {
    "codename": "THE OBSIDIAN CIPHER 27",
    "role": "Cleaner",
    "status": "ACTIVE",
    "location": "Hong Kong",
    "class": "Ghost"
  },
  {
    "codename": "THE WOLF TIGER 19",
    "role": "Facilitator",
    "status": "ACTIVE",
    "location": "Cairo",
    "class": "Ghost"
  },
  {
    "codename": "THE VIPER LION 16",
    "role": "Handler",
    "status": "ACTIVE",
    "location": "Vienna",
    "class": "Oracle"
  },
  {
    "codename": "THE SERPENT SAGE 70",
    "role": "Negotiator",
    "status": "ON CALL",
    "location": "Stockholm",
    "class": "Mythic"
  },
  {
    "codename": "THE ONYX FOX 47",
    "role": "Facilitator",
    "status": "UNKNOWN",
    "location": "Marrakesh",
    "class": "Enforcer"
  },
  {
    "codename": "THE WOLF FOX 16",
    "role": "Armorer",
    "status": "ACTIVE",
    "location": "Zurich",
    "class": "Enforcer"
  },
  {
    "codename": "THE ARCHITECT SAGE 30",
    "role": "Cleaner",
    "status": "ACTIVE",
    "location": "Budapest",
    "class": "Handler"
  },
  {
    "codename": "THE ONYX WARDEN 19",
    "role": "Safehouse Keeper",
    "status": "UNKNOWN",
    "location": "Reykjavik",
    "class": "Ghost"
  },
  {
    "codename": "THE SHADOW WITCH 33",
    "role": "Forger",
    "status": "UNKNOWN",
    "location": "Vienna",
    "class": "Tech"
  },
  {
    "codename": "THE JACKAL CIPHER 7",
    "role": "Data Broker",
    "status": "UNKNOWN",
    "location": "Istanbul",
    "class": "Ghost"
  },
  {
    "codename": "THE LOTUS ECHO 61",
    "role": "Cryptographer",
    "status": "ACTIVE",
    "location": "New York",
    "class": "Ghost"
  },
  {
    "codename": "THE RAVEN SPIDER 41",
    "role": "Scout",
    "status": "ACTIVE",
    "location": "Seoul",
    "class": "Oracle"
  },
  {
    "codename": "THE LOTUS RIDER 42",
    "role": "Tracker",
    "status": "ACTIVE",
    "location": "Budapest",
    "class": "Architect"
  },
  {
    "codename": "THE EMBER VEIL 34",
    "role": "Negotiator",
    "status": "UNKNOWN",
    "location": "Naples",
    "class": "Tech"
  },
  {
    "codename": "THE SERPENT SAGE 89",
    "role": "Scout",
    "status": "UNKNOWN",
    "location": "Cairo",
    "class": "Architect"
  },
  {
    "codename": "THE CROW LARK 26",
    "role": "Negotiator",
    "status": "ON CALL",
    "location": "Dubai",
    "class": "Architect"
  },
  {
    "codename": "THE FROST BLADE 36",
    "role": "Forger",
    "status": "ACTIVE",
    "location": "Warsaw",
    "class": "Oracle"
  },
  {
    "codename": "THE WOLF BLADE 84",
    "role": "Courier",
    "status": "ACTIVE",
    "location": "Naples",
    "class": "Ghost"
  },
  {
    "codename": "THE NEBULA BLADE 52",
    "role": "Interrogator",
    "status": "UNKNOWN",
    "location": "Dubai",
    "class": "Tech"
  },
  {
    "codename": "THE LOTUS FOX 6",
    "role": "Interrogator",
    "status": "ON CALL",
    "location": "London",
    "class": "Ghost"
  },
  {
    "codename": "THE ARCHITECT SPIDER 19",
    "role": "Facilitator",
    "status": "ACTIVE",
    "location": "Stockholm",
    "class": "Enforcer"
  },
  {
    "codename": "THE DRIFTER TIGER 54",
    "role": "Handler",
    "status": "UNKNOWN",
    "location": "Lisbon",
    "class": "Enforcer"
  },
  {
    "codename": "THE VIPER CIPHER 28",
    "role": "Armorer",
    "status": "UNKNOWN",
    "location": "Marrakesh",
    "class": "Oracle"
  },
  {
    "codename": "THE DRIFTER FOX 72",
    "role": "Tracker",
    "status": "ACTIVE",
    "location": "Stockholm",
    "class": "Tech"
  },
  {
    "codename": "THE RAVEN FOX 96",
    "role": "Courier",
    "status": "ACTIVE",
    "location": "Cairo",
    "class": "Tech"
  },
  {
    "codename": "THE RAVEN TIGER 17",
    "role": "Safehouse Keeper",
    "status": "ON CALL",
    "location": "Budapest",
    "class": "Enforcer"
  },
  {
    "codename": "THE CROW CIPHER 46",
    "role": "Handler",
    "status": "ACTIVE",
    "location": "Dubai",
    "class": "Mythic"
  },
  {
    "codename": "THE EMBER QUEEN 27",
    "role": "Armorer",
    "status": "ACTIVE",
    "location": "Naples",
    "class": "Tech"
  },
  {
    "codename": "THE STEEL WITCH 77",
    "role": "Interrogator",
    "status": "ACTIVE",
    "location": "Lisbon",
    "class": "Tech"
  },
  {
    "codename": "THE RAVEN KING 43",
    "role": "Cleaner",
    "status": "ON CALL",
    "location": "Lisbon",
    "class": "Tech"
  },
  {
    "codename": "THE VIPER SPIDER 20",
    "role": "Handler",
    "status": "ACTIVE",
    "location": "Istanbul",
    "class": "Ghost"
  },
  {
    "codename": "THE RAVEN RIDER 35",
    "role": "Cleaner",
    "status": "UNKNOWN",
    "location": "Hong Kong",
    "class": "Enforcer"
  },
  {
    "codename": "THE JACKAL HAND 16",
    "role": "Negotiator",
    "status": "UNKNOWN",
    "location": "Vienna",
    "class": "Enforcer"
  },
  {
    "codename": "THE EMBER FOX 24",
    "role": "Handler",
    "status": "ON CALL",
    "location": "Stockholm",
    "class": "Tech"
  },
  {
    "codename": "THE SPECTER WITCH 37",
    "role": "Fixer",
    "status": "UNKNOWN",
    "location": "Seoul",
    "class": "Mythic"
  },
  {
    "codename": "THE DRIFTER SPIDER 84",
    "role": "Handler",
    "status": "ACTIVE",
    "location": "Lisbon",
    "class": "Tech"
  },
  {
    "codename": "THE GHOST FOX 32",
    "role": "Safehouse Keeper",
    "status": "ACTIVE",
    "location": "Seoul",
    "class": "Handler"
  },
  {
    "codename": "THE DRIFTER FOX 4",
    "role": "Data Broker",
    "status": "UNKNOWN",
    "location": "Lisbon",
    "class": "Ghost"
  },
  {
    "codename": "THE OBSIDIAN FOX 39",
    "role": "Interrogator",
    "status": "UNKNOWN",
    "location": "Lisbon",
    "class": "Mythic"
  },
  {
    "codename": "THE RAVEN TIGER 35",
    "role": "Fixer",
    "status": "UNKNOWN",
    "location": "London",
    "class": "Tech"
  },
  {
    "codename": "THE IVORY LARK 42",
    "role": "Armorer",
    "status": "ON CALL",
    "location": "Istanbul",
    "class": "Enforcer"
  },
  {
    "codename": "THE MIRAGE QUEEN 54",
    "role": "Armorer",
    "status": "UNKNOWN",
    "location": "Stockholm",
    "class": "Tech"
  },
  {
    "codename": "THE ARCHITECT LION 92",
    "role": "Ghost Driver",
    "status": "UNKNOWN",
    "location": "Lisbon",
    "class": "Tech"
  },
  {
    "codename": "THE DRIFTER SAGE 48",
    "role": "Cleaner",
    "status": "ACTIVE",
    "location": "Zurich",
    "class": "Mythic"
  },
  {
    "codename": "THE ONYX RIDER 85",
    "role": "Data Broker",
    "status": "ON CALL",
    "location": "Zurich",
    "class": "Architect"
  },
  {
    "codename": "THE SERPENT RIDER 98",
    "role": "Safehouse Keeper",
    "status": "UNKNOWN",
    "location": "Dubai",
    "class": "Ghost"
  },
  {
    "codename": "THE DRIFTER HAND 88",
    "role": "Cryptographer",
    "status": "UNKNOWN",
    "location": "Budapest",
    "class": "Enforcer"
  },
  {
    "codename": "THE NEBULA MOTH 65",
    "role": "Ghost Driver",
    "status": "UNKNOWN",
    "location": "Prague",
    "class": "Enforcer"
  },
  {
    "codename": "THE IVORY LION 65",
    "role": "Tracker",
    "status": "ACTIVE",
    "location": "Cairo",
    "class": "Architect"
  },
  {
    "codename": "THE GHOST WALKER 33",
    "role": "Ghost Driver",
    "status": "ON CALL",
    "location": "Stockholm",
    "class": "Enforcer"
  },
  {
    "codename": "THE VIPER FOX 29",
    "role": "Courier",
    "status": "ON CALL",
    "location": "Seoul",
    "class": "Tech"
  },
  {
    "codename": "THE PHOENIX WITCH 17",
    "role": "Interrogator",
    "status": "UNKNOWN",
    "location": "Cairo",
    "class": "Enforcer"
  },
  {
    "codename": "THE FROST LION 66",
    "role": "Cryptographer",
    "status": "UNKNOWN",
    "location": "Naples",
    "class": "Oracle"
  },
  {
    "codename": "THE SHADOW WALKER 82",
    "role": "Courier",
    "status": "ACTIVE",
    "location": "Dubai",
    "class": "Ghost"
  },
  {
    "codename": "THE OBSIDIAN VEIL 16",
    "role": "Scout",
    "status": "ON CALL",
    "location": "Dubai",
    "class": "Mythic"
  },
  {
    "codename": "THE LOTUS CIPHER 38",
    "role": "Data Broker",
    "status": "ACTIVE",
    "location": "London",
    "class": "Oracle"
  },
  {
    "codename": "THE ONYX FOX 61",
    "role": "Handler",
    "status": "ON CALL",
    "location": "Budapest",
    "class": "Ghost"
  },
  {
    "codename": "THE SHADOW VEIL 17",
    "role": "Safehouse Keeper",
    "status": "ON CALL",
    "location": "Warsaw",
    "class": "Tech"
  },
  {
    "codename": "THE VIPER KING 49",
    "role": "Data Broker",
    "status": "UNKNOWN",
    "location": "Dubai",
    "class": "Architect"
  },
  {
    "codename": "THE SERPENT BLADE 23",
    "role": "Ghost Driver",
    "status": "UNKNOWN",
    "location": "Vienna",
    "class": "Tech"
  },
  {
    "codename": "THE EMBER LARK 45",
    "role": "Safehouse Keeper",
    "status": "ACTIVE",
    "location": "Warsaw",
    "class": "Oracle"
  },
  {
    "codename": "THE VIPER SAGE 8",
    "role": "Courier",
    "status": "ON CALL",
    "location": "Reykjavik",
    "class": "Handler"
  },
  {
    "codename": "THE ONYX VEIL 14",
    "role": "Courier",
    "status": "ACTIVE",
    "location": "Vienna",
    "class": "Mythic"
  },
  {
    "codename": "THE ONYX RIDER 90",
    "role": "Facilitator",
    "status": "UNKNOWN",
    "location": "Marrakesh",
    "class": "Handler"
  },
  {
    "codename": "THE SHADOW WARDEN 56",
    "role": "Interrogator",
    "status": "UNKNOWN",
    "location": "Dubai",
    "class": "Ghost"
  },
  {
    "codename": "THE ORACLE WALKER 1",
    "role": "Forger",
    "status": "ACTIVE",
    "location": "Osaka",
    "class": "Ghost"
  },
  {
    "codename": "THE WOLF TIGER 99",
    "role": "Cleaner",
    "status": "ON CALL",
    "location": "Zurich",
    "class": "Handler"
  },
  {
    "codename": "THE MIRAGE SAGE 43",
    "role": "Armorer",
    "status": "ON CALL",
    "location": "Berlin",
    "class": "Handler"
  },
  {
    "codename": "THE EMBER VEIL 35",
    "role": "Cleaner",
    "status": "ACTIVE",
    "location": "Casablanca",
    "class": "Architect"
  },
  {
    "codename": "THE DRIFTER RIDER 3",
    "role": "Cryptographer",
    "status": "ACTIVE",
    "location": "Berlin",
    "class": "Handler"
  },
  {
    "codename": "THE PHOENIX WALKER 90",
    "role": "Tracker",
    "status": "ON CALL",
    "location": "Seoul",
    "class": "Oracle"
  },
  {
    "codename": "THE WOLF LION 9",
    "role": "Negotiator",
    "status": "ACTIVE",
    "location": "Istanbul",
    "class": "Enforcer"
  },
  {
    "codename": "THE RAVEN KING 14",
    "role": "Facilitator",
    "status": "UNKNOWN",
    "location": "Dubai",
    "class": "Oracle"
  },
  {
    "codename": "THE NEBULA SAGE 2",
    "role": "Cleaner",
    "status": "UNKNOWN",
    "location": "Osaka",
    "class": "Enforcer"
  },
  {
    "codename": "THE SERPENT SPIDER 71",
    "role": "Safehouse Keeper",
    "status": "UNKNOWN",
    "location": "Stockholm",
    "class": "Mythic"
  },
  {
    "codename": "THE FROST ECHO 30",
    "role": "Negotiator",
    "status": "ACTIVE",
    "location": "Berlin",
    "class": "Ghost"
  },
  {
    "codename": "THE NEBULA SAGE 13",
    "role": "Cryptographer",
    "status": "ACTIVE",
    "location": "Stockholm",
    "class": "Mythic"
  },
  {
    "codename": "THE CROW TIGER 18",
    "role": "Negotiator",
    "status": "ACTIVE",
    "location": "Stockholm",
    "class": "Ghost"
  },
  {
    "codename": "THE FROST HUNTER 29",
    "role": "Safehouse Keeper",
    "status": "ACTIVE",
    "location": "Osaka",
    "class": "Handler"
  },
  {
    "codename": "THE FROST HAND 65",
    "role": "Handler",
    "status": "ON CALL",
    "location": "Stockholm",
    "class": "Tech"
  },
  {
    "codename": "THE SPECTER WALKER 3",
    "role": "Facilitator",
    "status": "ON CALL",
    "location": "Lisbon",
    "class": "Oracle"
  },
  {
    "codename": "THE IVORY BLADE 42",
    "role": "Ghost Driver",
    "status": "ACTIVE",
    "location": "Istanbul",
    "class": "Handler"
  },
  {
    "codename": "THE EMBER LION 31",
    "role": "Interrogator",
    "status": "ON CALL",
    "location": "New York",
    "class": "Ghost"
  },
  {
    "codename": "THE STEEL WALKER 24",
    "role": "Safehouse Keeper",
    "status": "UNKNOWN",
    "location": "Zurich",
    "class": "Mythic"
  },
  {
    "codename": "THE RAVEN WALKER 56",
    "role": "Scout",
    "status": "UNKNOWN",
    "location": "Casablanca",
    "class": "Handler"
  },
  {
    "codename": "THE MIRAGE ECHO 48",
    "role": "Cleaner",
    "status": "ACTIVE",
    "location": "Osaka",
    "class": "Mythic"
  },
  {
    "codename": "THE CROW HUNTER 72",
    "role": "Data Broker",
    "status": "ON CALL",
    "location": "Stockholm",
    "class": "Ghost"
  },
  {
    "codename": "THE STEEL SPIDER 67",
    "role": "Facilitator",
    "status": "UNKNOWN",
    "location": "New York",
    "class": "Mythic"
  },
  {
    "codename": "THE DRIFTER FOX 57",
    "role": "Handler",
    "status": "ACTIVE",
    "location": "Zurich",
    "class": "Ghost"
  },
  {
    "codename": "THE ARCHITECT RIDER 60",
    "role": "Interrogator",
    "status": "UNKNOWN",
    "location": "Casablanca",
    "class": "Mythic"
  },
  {
    "codename": "THE VIPER QUEEN 37",
    "role": "Forger",
    "status": "ON CALL",
    "location": "Stockholm",
    "class": "Enforcer"
  },
  {
    "codename": "THE SPECTER KING 39",
    "role": "Courier",
    "status": "ACTIVE",
    "location": "Dubai",
    "class": "Mythic"
  },
  {
    "codename": "THE IVORY VEIL 46",
    "role": "Courier",
    "status": "ACTIVE",
    "location": "Zurich",
    "class": "Tech"
  },
  {
    "codename": "THE RAVEN SAGE 42",
    "role": "Fixer",
    "status": "UNKNOWN",
    "location": "Prague",
    "class": "Tech"
  },
  {
    "codename": "THE ARCHITECT WITCH 60",
    "role": "Scout",
    "status": "UNKNOWN",
    "location": "Naples",
    "class": "Architect"
  },
  {
    "codename": "THE CROW MOTH 17",
    "role": "Tracker",
    "status": "ACTIVE",
    "location": "Budapest",
    "class": "Mythic"
  },
  {
    "codename": "THE ONYX MOTH 3",
    "role": "Interrogator",
    "status": "ACTIVE",
    "location": "Lisbon",
    "class": "Tech"
  },
  {
    "codename": "THE JACKAL RIDER 5",
    "role": "Courier",
    "status": "UNKNOWN",
    "location": "Lisbon",
    "class": "Enforcer"
  },
  {
    "codename": "THE ORACLE ECHO 24",
    "role": "Safehouse Keeper",
    "status": "ACTIVE",
    "location": "Vienna",
    "class": "Enforcer"
  },
  {
    "codename": "THE DRIFTER BLADE 13",
    "role": "Interrogator",
    "status": "ON CALL",
    "location": "Dubai",
    "class": "Handler"
  },
  {
    "codename": "THE VIPER HUNTER 11",
    "role": "Negotiator",
    "status": "ON CALL",
    "location": "London",
    "class": "Mythic"
  },
  {
    "codename": "THE SHADOW HAND 44",
    "role": "Forger",
    "status": "ACTIVE",
    "location": "Marrakesh",
    "class": "Tech"
  },
  {
    "codename": "THE LOTUS WALKER 94",
    "role": "Courier",
    "status": "UNKNOWN",
    "location": "Berlin",
    "class": "Oracle"
  },
  {
    "codename": "THE SPECTER VEIL 50",
    "role": "Tracker",
    "status": "UNKNOWN",
    "location": "Hong Kong",
    "class": "Handler"
  },
  {
    "codename": "THE MIRAGE TIGER 15",
    "role": "Fixer",
    "status": "UNKNOWN",
    "location": "Osaka",
    "class": "Architect"
  },
  {
    "codename": "THE GHOST QUEEN 30",
    "role": "Interrogator",
    "status": "UNKNOWN",
    "location": "Stockholm",
    "class": "Handler"
  },
  {
    "codename": "THE IVORY WITCH 90",
    "role": "Data Broker",
    "status": "ACTIVE",
    "location": "Reykjavik",
    "class": "Ghost"
  },
  {
    "codename": "THE LOTUS WARDEN 25",
    "role": "Data Broker",
    "status": "UNKNOWN",
    "location": "New York",
    "class": "Handler"
  },
  {
    "codename": "THE NEBULA FOX 16",
    "role": "Armorer",
    "status": "ACTIVE",
    "location": "New York",
    "class": "Architect"
  },
  {
    "codename": "THE ARCHITECT LION 54",
    "role": "Ghost Driver",
    "status": "ON CALL",
    "location": "Warsaw",
    "class": "Oracle"
  },
  {
    "codename": "THE VIPER VEIL 21",
    "role": "Armorer",
    "status": "ACTIVE",
    "location": "Dubai",
    "class": "Mythic"
  },
  {
    "codename": "THE EMBER QUEEN 6",
    "role": "Cleaner",
    "status": "UNKNOWN",
    "location": "Cairo",
    "class": "Enforcer"
  },
  {
    "codename": "THE STEEL LARK 1",
    "role": "Cleaner",
    "status": "ACTIVE",
    "location": "Hong Kong",
    "class": "Handler"
  },
  {
    "codename": "THE SERPENT WARDEN 6",
    "role": "Forger",
    "status": "ACTIVE",
    "location": "Istanbul",
    "class": "Ghost"
  },
  {
    "codename": "THE IVORY HAND 95",
    "role": "Courier",
    "status": "UNKNOWN",
    "location": "Seoul",
    "class": "Tech"
  },
  {
    "codename": "THE GHOST FOX 79",
    "role": "Cryptographer",
    "status": "ACTIVE",
    "location": "Naples",
    "class": "Tech"
  },
  {
    "codename": "THE ORACLE KING 7",
    "role": "Data Broker",
    "status": "ACTIVE",
    "location": "Marrakesh",
    "class": "Enforcer"
  },
  {
    "codename": "THE JACKAL WITCH 6",
    "role": "Armorer",
    "status": "ON CALL",
    "location": "Dubai",
    "class": "Enforcer"
  },
  {
    "codename": "THE NIGHT MOTH 80",
    "role": "Facilitator",
    "status": "ACTIVE",
    "location": "Seoul",
    "class": "Oracle"
  },
  {
    "codename": "THE ARCHITECT CIPHER 98",
    "role": "Negotiator",
    "status": "UNKNOWN",
    "location": "Prague",
    "class": "Tech"
  },
  {
    "codename": "THE IVORY TIGER 72",
    "role": "Armorer",
    "status": "ACTIVE",
    "location": "Naples",
    "class": "Oracle"
  },
  {
    "codename": "THE OBSIDIAN SAGE 9",
    "role": "Forger",
    "status": "ACTIVE",
    "location": "Cairo",
    "class": "Ghost"
  },
  {
    "codename": "THE ARCHITECT KING 69",
    "role": "Fixer",
    "status": "UNKNOWN",
    "location": "Cairo",
    "class": "Ghost"
  },
  {
    "codename": "THE CROW KING 12",
    "role": "Scout",
    "status": "ACTIVE",
    "location": "Marrakesh",
    "class": "Tech"
  },
  {
    "codename": "THE GHOST WALKER 77",
    "role": "Courier",
    "status": "ON CALL",
    "location": "Lisbon",
    "class": "Handler"
  },
  {
    "codename": "THE STEEL LION 70",
    "role": "Facilitator",
    "status": "ACTIVE",
    "location": "Dubai",
    "class": "Mythic"
  },
  {
    "codename": "THE OBSIDIAN BLADE 47",
    "role": "Ghost Driver",
    "status": "ACTIVE",
    "location": "Cairo",
    "class": "Mythic"
  },
  {
    "codename": "THE SERPENT WITCH 49",
    "role": "Handler",
    "status": "ON CALL",
    "location": "Seoul",
    "class": "Tech"
  },
  {
    "codename": "THE JACKAL HAND 50",
    "role": "Cleaner",
    "status": "ACTIVE",
    "location": "Dubai",
    "class": "Ghost"
  },
  {
    "codename": "THE VIPER HUNTER 38",
    "role": "Scout",
    "status": "ACTIVE",
    "location": "Warsaw",
    "class": "Enforcer"
  },
  {
    "codename": "THE OBSIDIAN RIDER 35",
    "role": "Cryptographer",
    "status": "ACTIVE",
    "location": "Cairo",
    "class": "Architect"
  },
  {
    "codename": "THE ONYX RIDER 10",
    "role": "Ghost Driver",
    "status": "ACTIVE",
    "location": "New York",
    "class": "Ghost"
  },
  {
    "codename": "THE EMBER MOTH 6",
    "role": "Courier",
    "status": "UNKNOWN",
    "location": "Istanbul",
    "class": "Mythic"
  },
  {
    "codename": "THE JACKAL SAGE 89",
    "role": "Cryptographer",
    "status": "UNKNOWN",
    "location": "Casablanca",
    "class": "Mythic"
  },
  {
    "codename": "THE GHOST SPIDER 64",
    "role": "Ghost Driver",
    "status": "ACTIVE",
    "location": "Berlin",
    "class": "Enforcer"
  },
  {
    "codename": "THE JACKAL LARK 35",
    "role": "Cryptographer",
    "status": "ON CALL",
    "location": "Osaka",
    "class": "Mythic"
  },
  {
    "codename": "THE CROW VEIL 76",
    "role": "Data Broker",
    "status": "ACTIVE",
    "location": "Stockholm",
    "class": "Enforcer"
  },
  {
    "codename": "THE NEBULA SPIDER 93",
    "role": "Interrogator",
    "status": "UNKNOWN",
    "location": "Marrakesh",
    "class": "Mythic"
  },
  {
    "codename": "THE IVORY FOX 46",
    "role": "Tracker",
    "status": "UNKNOWN",
    "location": "Marrakesh",
    "class": "Tech"
  },
  {
    "codename": "THE SERPENT MOTH 12",
    "role": "Safehouse Keeper",
    "status": "UNKNOWN",
    "location": "Istanbul",
    "class": "Oracle"
  },
  {
    "codename": "THE GHOST LARK 23",
    "role": "Facilitator",
    "status": "UNKNOWN",
    "location": "Prague",
    "class": "Oracle"
  },
  {
    "codename": "THE SHADOW RIDER 98",
    "role": "Handler",
    "status": "ACTIVE",
    "location": "Hong Kong",
    "class": "Handler"
  },
  {
    "codename": "THE ORACLE SPIDER 85",
    "role": "Forger",
    "status": "ON CALL",
    "location": "New York",
    "class": "Ghost"
  },
  {
    "codename": "THE CROW SPIDER 53",
    "role": "Cleaner",
    "status": "ACTIVE",
    "location": "Osaka",
    "class": "Mythic"
  },
  {
    "codename": "THE IVORY LARK 61",
    "role": "Tracker",
    "status": "ACTIVE",
    "location": "Naples",
    "class": "Mythic"
  },
  {
    "codename": "THE ORACLE CIPHER 43",
    "role": "Scout",
    "status": "ACTIVE",
    "location": "Warsaw",
    "class": "Enforcer"
  },
  {
    "codename": "THE ARCHITECT LARK 30",
    "role": "Handler",
    "status": "UNKNOWN",
    "location": "Prague",
    "class": "Tech"
  },
  {
    "codename": "THE CROW WARDEN 47",
    "role": "Fixer",
    "status": "ACTIVE",
    "location": "Casablanca",
    "class": "Handler"
  },
  {
    "codename": "THE WOLF HAND 4",
    "role": "Forger",
    "status": "UNKNOWN",
    "location": "Berlin",
    "class": "Tech"
  },
  {
    "codename": "THE DRIFTER QUEEN 96",
    "role": "Armorer",
    "status": "ON CALL",
    "location": "Vienna",
    "class": "Architect"
  },
  {
    "codename": "THE PHOENIX MOTH 76",
    "role": "Scout",
    "status": "UNKNOWN",
    "location": "Seoul",
    "class": "Mythic"
  },
  {
    "codename": "THE LOTUS BLADE 14",
    "role": "Forger",
    "status": "ON CALL",
    "location": "Dubai",
    "class": "Ghost"
  },
  {
    "codename": "THE SERPENT FOX 11",
    "role": "Ghost Driver",
    "status": "ON CALL",
    "location": "Istanbul",
    "class": "Mythic"
  },
  {
    "codename": "THE STEEL ECHO 84",
    "role": "Handler",
    "status": "ON CALL",
    "location": "Cairo",
    "class": "Architect"
  },
  {
    "codename": "THE EMBER KING 81",
    "role": "Cleaner",
    "status": "ON CALL",
    "location": "Cairo",
    "class": "Oracle"
  },
  {
    "codename": "THE EMBER BLADE 10",
    "role": "Negotiator",
    "status": "ON CALL",
    "location": "Istanbul",
    "class": "Ghost"
  },
  {
    "codename": "THE SHADOW QUEEN 59",
    "role": "Interrogator",
    "status": "ACTIVE",
    "location": "Prague",
    "class": "Ghost"
  },
  {
    "codename": "THE NIGHT TIGER 89",
    "role": "Courier",
    "status": "ON CALL",
    "location": "Lisbon",
    "class": "Enforcer"
  },
  {
    "codename": "THE OBSIDIAN QUEEN 97",
    "role": "Tracker",
    "status": "ACTIVE",
    "location": "Berlin",
    "class": "Oracle"
  },
  {
    "codename": "THE OBSIDIAN TIGER 39",
    "role": "Scout",
    "status": "ON CALL",
    "location": "Marrakesh",
    "class": "Architect"
  },
  {
    "codename": "THE SHADOW LION 75",
    "role": "Data Broker",
    "status": "ACTIVE",
    "location": "London",
    "class": "Handler"
  },
  {
    "codename": "THE SHADOW LARK 20",
    "role": "Cleaner",
    "status": "UNKNOWN",
    "location": "Cairo",
    "class": "Mythic"
  },
  {
    "codename": "THE FROST LARK 83",
    "role": "Cleaner",
    "status": "ACTIVE",
    "location": "Dubai",
    "class": "Enforcer"
  },
  {
    "codename": "THE NIGHT QUEEN 78",
    "role": "Scout",
    "status": "ACTIVE",
    "location": "Hong Kong",
    "class": "Enforcer"
  },
  {
    "codename": "THE ARCHITECT CIPHER 14",
    "role": "Courier",
    "status": "ON CALL",
    "location": "London",
    "class": "Oracle"
  },
  {
    "codename": "THE MIRAGE BLADE 41",
    "role": "Handler",
    "status": "ACTIVE",
    "location": "London",
    "class": "Architect"
  },
  {
    "codename": "THE SPECTER QUEEN 89",
    "role": "Handler",
    "status": "UNKNOWN",
    "location": "Naples",
    "class": "Oracle"
  },
  {
    "codename": "THE SERPENT CIPHER 81",
    "role": "Safehouse Keeper",
    "status": "UNKNOWN",
    "location": "Berlin",
    "class": "Tech"
  },
  {
    "codename": "THE SPECTER BLADE 90",
    "role": "Interrogator",
    "status": "UNKNOWN",
    "location": "Casablanca",
    "class": "Mythic"
  },
  {
    "codename": "THE IVORY MOTH 34",
    "role": "Fixer",
    "status": "UNKNOWN",
    "location": "Stockholm",
    "class": "Architect"
  },
  {
    "codename": "THE DRIFTER BLADE 69",
    "role": "Cryptographer",
    "status": "ON CALL",
    "location": "Casablanca",
    "class": "Oracle"
  },
  {
    "codename": "THE ORACLE BLADE 64",
    "role": "Facilitator",
    "status": "ACTIVE",
    "location": "Prague",
    "class": "Enforcer"
  },
  {
    "codename": "THE SHADOW FOX 83",
    "role": "Scout",
    "status": "UNKNOWN",
    "location": "Marrakesh",
    "class": "Oracle"
  },
  {
    "codename": "THE ORACLE VEIL 29",
    "role": "Cleaner",
    "status": "UNKNOWN",
    "location": "Reykjavik",
    "class": "Architect"
  },
  {
    "codename": "THE FROST LARK 47",
    "role": "Ghost Driver",
    "status": "UNKNOWN",
    "location": "Seoul",
    "class": "Enforcer"
  },
  {
    "codename": "THE MIRAGE KING 89",
    "role": "Facilitator",
    "status": "ACTIVE",
    "location": "Warsaw",
    "class": "Mythic"
  },
  {
    "codename": "THE MIRAGE HAND 34",
    "role": "Cleaner",
    "status": "UNKNOWN",
    "location": "New York",
    "class": "Mythic"
  },
  {
    "codename": "THE SHADOW HAND 19",
    "role": "Armorer",
    "status": "ON CALL",
    "location": "Dubai",
    "class": "Architect"
  },
  {
    "codename": "THE NIGHT SAGE 48",
    "role": "Courier",
    "status": "ACTIVE",
    "location": "Seoul",
    "class": "Architect"
  },
  {
    "codename": "THE DRIFTER RIDER 63",
    "role": "Courier",
    "status": "ON CALL",
    "location": "Seoul",
    "class": "Ghost"
  },
  {
    "codename": "THE SERPENT TIGER 16",
    "role": "Negotiator",
    "status": "ACTIVE",
    "location": "Budapest",
    "class": "Oracle"
  },
  {
    "codename": "THE ONYX WITCH 49",
    "role": "Safehouse Keeper",
    "status": "ON CALL",
    "location": "Reykjavik",
    "class": "Handler"
  },
  {
    "codename": "THE JACKAL MOTH 3",
    "role": "Facilitator",
    "status": "ON CALL",
    "location": "Istanbul",
    "class": "Ghost"
  },
  {
    "codename": "THE MIRAGE TIGER 26",
    "role": "Ghost Driver",
    "status": "ON CALL",
    "location": "Naples",
    "class": "Tech"
  },
  {
    "codename": "THE GHOST RIDER 58",
    "role": "Cleaner",
    "status": "ON CALL",
    "location": "Marrakesh",
    "class": "Handler"
  },
  {
    "codename": "THE LOTUS KING 49",
    "role": "Facilitator",
    "status": "UNKNOWN",
    "location": "Istanbul",
    "class": "Oracle"
  },
  {
    "codename": "THE JACKAL WARDEN 54",
    "role": "Cryptographer",
    "status": "UNKNOWN",
    "location": "Vienna",
    "class": "Ghost"
  },
  {
    "codename": "THE VIPER RIDER 16",
    "role": "Tracker",
    "status": "ON CALL",
    "location": "Budapest",
    "class": "Tech"
  },
  {
    "codename": "THE NEBULA BLADE 62",
    "role": "Scout",
    "status": "ACTIVE",
    "location": "Budapest",
    "class": "Oracle"
  },
  {
    "codename": "THE ORACLE SPIDER 15",
    "role": "Ghost Driver",
    "status": "ACTIVE",
    "location": "Cairo",
    "class": "Tech"
  },
  {
    "codename": "THE JACKAL QUEEN 23",
    "role": "Data Broker",
    "status": "UNKNOWN",
    "location": "Warsaw",
    "class": "Mythic"
  },
  {
    "codename": "THE VIPER CIPHER 97",
    "role": "Courier",
    "status": "ON CALL",
    "location": "Dubai",
    "class": "Oracle"
  },
  {
    "codename": "THE SHADOW FOX 83",
    "role": "Facilitator",
    "status": "UNKNOWN",
    "location": "Lisbon",
    "class": "Architect"
  },
  {
    "codename": "THE FROST LION 29",
    "role": "Fixer",
    "status": "UNKNOWN",
    "location": "London",
    "class": "Handler"
  },
  {
    "codename": "THE JACKAL KING 78",
    "role": "Negotiator",
    "status": "UNKNOWN",
    "location": "Istanbul",
    "class": "Ghost"
  },
  {
    "codename": "THE IVORY FOX 19",
    "role": "Forger",
    "status": "ACTIVE",
    "location": "Budapest",
    "class": "Oracle"
  },
  {
    "codename": "THE PHOENIX QUEEN 56",
    "role": "Safehouse Keeper",
    "status": "ON CALL",
    "location": "Dubai",
    "class": "Ghost"
  },
  {
    "codename": "THE EMBER ECHO 48",
    "role": "Handler",
    "status": "UNKNOWN",
    "location": "Seoul",
    "class": "Tech"
  },
  {
    "codename": "THE OBSIDIAN CIPHER 59",
    "role": "Scout",
    "status": "UNKNOWN",
    "location": "Istanbul",
    "class": "Ghost"
  },
  {
    "codename": "THE OBSIDIAN WALKER 61",
    "role": "Scout",
    "status": "UNKNOWN",
    "location": "Zurich",
    "class": "Mythic"
  },
  {
    "codename": "THE DRIFTER BLADE 28",
    "role": "Forger",
    "status": "ON CALL",
    "location": "London",
    "class": "Tech"
  },
  {
    "codename": "THE FROST RIDER 66",
    "role": "Tracker",
    "status": "UNKNOWN",
    "location": "Osaka",
    "class": "Mythic"
  },
  {
    "codename": "THE IVORY QUEEN 40",
    "role": "Safehouse Keeper",
    "status": "ACTIVE",
    "location": "Cairo",
    "class": "Mythic"
  },
  {
    "codename": "THE EMBER QUEEN 31",
    "role": "Handler",
    "status": "UNKNOWN",
    "location": "Reykjavik",
    "class": "Ghost"
  },
  {
    "codename": "THE MIRAGE VEIL 77",
    "role": "Interrogator",
    "status": "ON CALL",
    "location": "Seoul",
    "class": "Handler"
  },
  {
    "codename": "THE ARCHITECT CIPHER 1",
    "role": "Cleaner",
    "status": "ON CALL",
    "location": "Lisbon",
    "class": "Enforcer"
  },
  {
    "codename": "THE SPECTER VEIL 71",
    "role": "Cleaner",
    "status": "ACTIVE",
    "location": "Zurich",
    "class": "Oracle"
  },
  {
    "codename": "THE EMBER SPIDER 26",
    "role": "Handler",
    "status": "UNKNOWN",
    "location": "Marrakesh",
    "class": "Oracle"
  },
  {
    "codename": "THE OBSIDIAN SAGE 17",
    "role": "Facilitator",
    "status": "ON CALL",
    "location": "Berlin",
    "class": "Mythic"
  },
  {
    "codename": "THE MIRAGE MOTH 43",
    "role": "Safehouse Keeper",
    "status": "ACTIVE",
    "location": "London",
    "class": "Tech"
  },
  {
    "codename": "THE FROST KING 25",
    "role": "Tracker",
    "status": "ACTIVE",
    "location": "Berlin",
    "class": "Architect"
  },
  {
    "codename": "THE LOTUS MOTH 64",
    "role": "Cleaner",
    "status": "ACTIVE",
    "location": "Casablanca",
    "class": "Handler"
  },
  {
    "codename": "THE EMBER TIGER 57",
    "role": "Cleaner",
    "status": "ACTIVE",
    "location": "Warsaw",
    "class": "Mythic"
  },
  {
    "codename": "THE CROW CIPHER 28",
    "role": "Cryptographer",
    "status": "ON CALL",
    "location": "Berlin",
    "class": "Oracle"
  },
  {
    "codename": "THE SPECTER SPIDER 88",
    "role": "Data Broker",
    "status": "ON CALL",
    "location": "Seoul",
    "class": "Mythic"
  },
  {
    "codename": "THE RAVEN KING 34",
    "role": "Courier",
    "status": "ON CALL",
    "location": "Naples",
    "class": "Oracle"
  },
  {
    "codename": "THE ONYX VEIL 62",
    "role": "Tracker",
    "status": "UNKNOWN",
    "location": "Seoul",
    "class": "Tech"
  },
  {
    "codename": "THE PHOENIX FOX 11",
    "role": "Fixer",
    "status": "ACTIVE",
    "location": "Dubai",
    "class": "Ghost"
  },
  {
    "codename": "THE NIGHT FOX 5",
    "role": "Safehouse Keeper",
    "status": "UNKNOWN",
    "location": "Dubai",
    "class": "Mythic"
  },
  {
    "codename": "THE SPECTER BLADE 3",
    "role": "Data Broker",
    "status": "UNKNOWN",
    "location": "Zurich",
    "class": "Oracle"
  },
  {
    "codename": "THE SERPENT CIPHER 89",
    "role": "Armorer",
    "status": "ON CALL",
    "location": "Zurich",
    "class": "Enforcer"
  },
  {
    "codename": "THE SPECTER KING 80",
    "role": "Data Broker",
    "status": "ON CALL",
    "location": "Istanbul",
    "class": "Architect"
  },
  {
    "codename": "THE SERPENT QUEEN 86",
    "role": "Handler",
    "status": "ON CALL",
    "location": "Cairo",
    "class": "Ghost"
  },
  {
    "codename": "THE LOTUS BLADE 37",
    "role": "Ghost Driver",
    "status": "ON CALL",
    "location": "Osaka",
    "class": "Tech"
  },
  {
    "codename": "THE MIRAGE VEIL 79",
    "role": "Cryptographer",
    "status": "ACTIVE",
    "location": "Lisbon",
    "class": "Ghost"
  },
  {
    "codename": "THE EMBER HUNTER 1",
    "role": "Interrogator",
    "status": "ON CALL",
    "location": "Lisbon",
    "class": "Tech"
  },
  {
    "codename": "THE ONYX LARK 7",
    "role": "Negotiator",
    "status": "ACTIVE",
    "location": "New York",
    "class": "Mythic"
  },
  {
    "codename": "THE GHOST KING 56",
    "role": "Tracker",
    "status": "ON CALL",
    "location": "Casablanca",
    "class": "Enforcer"
  },
  {
    "codename": "THE JACKAL WITCH 42",
    "role": "Courier",
    "status": "ON CALL",
    "location": "Casablanca",
    "class": "Oracle"
  },
  {
    "codename": "THE VIPER BLADE 28",
    "role": "Armorer",
    "status": "UNKNOWN",
    "location": "Istanbul",
    "class": "Handler"
  },
  {
    "codename": "THE ARCHITECT MOTH 48",
    "role": "Facilitator",
    "status": "ACTIVE",
    "location": "Prague",
    "class": "Enforcer"
  },
  {
    "codename": "THE MIRAGE VEIL 32",
    "role": "Facilitator",
    "status": "ON CALL",
    "location": "Cairo",
    "class": "Ghost"
  },
  {
    "codename": "THE GHOST TIGER 53",
    "role": "Scout",
    "status": "UNKNOWN",
    "location": "Istanbul",
    "class": "Mythic"
  },
  {
    "codename": "THE VIPER RIDER 3",
    "role": "Tracker",
    "status": "ON CALL",
    "location": "Naples",
    "class": "Mythic"
  },
  {
    "codename": "THE DRIFTER HUNTER 85",
    "role": "Scout",
    "status": "ACTIVE",
    "location": "Naples",
    "class": "Mythic"
  },
  {
    "codename": "THE FROST MOTH 17",
    "role": "Armorer",
    "status": "ON CALL",
    "location": "London",
    "class": "Enforcer"
  },
  {
    "codename": "THE EMBER ECHO 9",
    "role": "Negotiator",
    "status": "UNKNOWN",
    "location": "Cairo",
    "class": "Tech"
  },
  {
    "codename": "THE PHOENIX KING 59",
    "role": "Armorer",
    "status": "UNKNOWN",
    "location": "Zurich",
    "class": "Enforcer"
  },
  {
    "codename": "THE STEEL BLADE 26",
    "role": "Handler",
    "status": "ON CALL",
    "location": "Istanbul",
    "class": "Oracle"
  },
  {
    "codename": "THE NEBULA FOX 50",
    "role": "Fixer",
    "status": "ACTIVE",
    "location": "Marrakesh",
    "class": "Architect"
  },
  {
    "codename": "THE OBSIDIAN SPIDER 80",
    "role": "Data Broker",
    "status": "ON CALL",
    "location": "Osaka",
    "class": "Mythic"
  },
  {
    "codename": "THE JACKAL SPIDER 71",
    "role": "Data Broker",
    "status": "UNKNOWN",
    "location": "Naples",
    "class": "Handler"
  },
  {
    "codename": "THE SPECTER VEIL 52",
    "role": "Scout",
    "status": "ACTIVE",
    "location": "Osaka",
    "class": "Oracle"
  },
  {
    "codename": "THE RAVEN FOX 50",
    "role": "Safehouse Keeper",
    "status": "UNKNOWN",
    "location": "Seoul",
    "class": "Tech"
  },
  {
    "codename": "THE RAVEN LION 92",
    "role": "Fixer",
    "status": "UNKNOWN",
    "location": "New York",
    "class": "Tech"
  },
  {
    "codename": "THE EMBER LARK 39",
    "role": "Negotiator",
    "status": "ACTIVE",
    "location": "Istanbul",
    "class": "Mythic"
  },
  {
    "codename": "THE EMBER SPIDER 9",
    "role": "Cleaner",
    "status": "ACTIVE",
    "location": "Budapest",
    "class": "Enforcer"
  },
  {
    "codename": "THE LOTUS WITCH 83",
    "role": "Forger",
    "status": "UNKNOWN",
    "location": "Lisbon",
    "class": "Tech"
  },
  {
    "codename": "THE MIRAGE WALKER 65",
    "role": "Scout",
    "status": "ON CALL",
    "location": "London",
    "class": "Mythic"
  },
  {
    "codename": "THE EMBER VEIL 86",
    "role": "Interrogator",
    "status": "ON CALL",
    "location": "Berlin",
    "class": "Ghost"
  },
  {
    "codename": "THE SERPENT QUEEN 85",
    "role": "Data Broker",
    "status": "ON CALL",
    "location": "Prague",
    "class": "Ghost"
  },
  {
    "codename": "THE VIPER HUNTER 18",
    "role": "Forger",
    "status": "ACTIVE",
    "location": "Osaka",
    "class": "Enforcer"
  },
  {
    "codename": "THE RAVEN RIDER 52",
    "role": "Facilitator",
    "status": "ON CALL",
    "location": "Reykjavik",
    "class": "Tech"
  },
  {
    "codename": "THE MIRAGE CIPHER 38",
    "role": "Negotiator",
    "status": "ON CALL",
    "location": "Seoul",
    "class": "Handler"
  },
  {
    "codename": "THE PHOENIX HAND 90",
    "role": "Negotiator",
    "status": "ON CALL",
    "location": "Cairo",
    "class": "Oracle"
  },
  {
    "codename": "THE LOTUS CIPHER 65",
    "role": "Cleaner",
    "status": "UNKNOWN",
    "location": "Zurich",
    "class": "Handler"
  },
  {
    "codename": "THE ONYX WALKER 82",
    "role": "Scout",
    "status": "UNKNOWN",
    "location": "Lisbon",
    "class": "Oracle"
  },
  {
    "codename": "THE CROW SPIDER 57",
    "role": "Cryptographer",
    "status": "UNKNOWN",
    "location": "Vienna",
    "class": "Mythic"
  },
  {
    "codename": "THE NIGHT LARK 96",
    "role": "Armorer",
    "status": "ACTIVE",
    "location": "Seoul",
    "class": "Architect"
  },
  {
    "codename": "THE NIGHT KING 78",
    "role": "Interrogator",
    "status": "ON CALL",
    "location": "Warsaw",
    "class": "Handler"
  },
  {
    "codename": "THE STEEL BLADE 93",
    "role": "Armorer",
    "status": "ON CALL",
    "location": "Zurich",
    "class": "Oracle"
  },
  {
    "codename": "THE FROST WALKER 14",
    "role": "Fixer",
    "status": "UNKNOWN",
    "location": "Osaka",
    "class": "Handler"
  },
  {
    "codename": "THE SHADOW QUEEN 37",
    "role": "Negotiator",
    "status": "UNKNOWN",
    "location": "Hong Kong",
    "class": "Mythic"
  },
  {
    "codename": "THE ARCHITECT LION 35",
    "role": "Safehouse Keeper",
    "status": "ACTIVE",
    "location": "Reykjavik",
    "class": "Handler"
  },
  {
    "codename": "THE ORACLE HAND 6",
    "role": "Interrogator",
    "status": "ACTIVE",
    "location": "New York",
    "class": "Ghost"
  },
  {
    "codename": "THE GHOST HUNTER 18",
    "role": "Scout",
    "status": "ON CALL",
    "location": "Warsaw",
    "class": "Architect"
  },
  {
    "codename": "THE EMBER LARK 39",
    "role": "Facilitator",
    "status": "ON CALL",
    "location": "Cairo",
    "class": "Handler"
  },
  {
    "codename": "THE GHOST BLADE 79",
    "role": "Interrogator",
    "status": "ACTIVE",
    "location": "Stockholm",
    "class": "Enforcer"
  },
  {
    "codename": "THE JACKAL HUNTER 45",
    "role": "Scout",
    "status": "UNKNOWN",
    "location": "Naples",
    "class": "Handler"
  },
  {
    "codename": "THE SPECTER FOX 31",
    "role": "Scout",
    "status": "UNKNOWN",
    "location": "Vienna",
    "class": "Mythic"
  },
  {
    "codename": "THE ARCHITECT KING 8",
    "role": "Courier",
    "status": "UNKNOWN",
    "location": "Warsaw",
    "class": "Enforcer"
  },
  {
    "codename": "THE NEBULA VEIL 12",
    "role": "Tracker",
    "status": "ACTIVE",
    "location": "Istanbul",
    "class": "Oracle"
  },
  {
    "codename": "THE RAVEN KING 41",
    "role": "Ghost Driver",
    "status": "ON CALL",
    "location": "Casablanca",
    "class": "Architect"
  },
  {
    "codename": "THE JACKAL HAND 40",
    "role": "Ghost Driver",
    "status": "UNKNOWN",
    "location": "Seoul",
    "class": "Enforcer"
  },
  {
    "codename": "THE PHOENIX QUEEN 63",
    "role": "Data Broker",
    "status": "ON CALL",
    "location": "Prague",
    "class": "Oracle"
  },
  {
    "codename": "THE DRIFTER KING 74",
    "role": "Courier",
    "status": "ACTIVE",
    "location": "Marrakesh",
    "class": "Enforcer"
  },
  {
    "codename": "THE NEBULA HAND 90",
    "role": "Forger",
    "status": "ON CALL",
    "location": "Zurich",
    "class": "Handler"
  },
  {
    "codename": "THE ONYX LION 70",
    "role": "Handler",
    "status": "UNKNOWN",
    "location": "Zurich",
    "class": "Oracle"
  },
  {
    "codename": "THE NIGHT WITCH 97",
    "role": "Ghost Driver",
    "status": "UNKNOWN",
    "location": "Prague",
    "class": "Oracle"
  },
  {
    "codename": "THE ARCHITECT SAGE 18",
    "role": "Interrogator",
    "status": "UNKNOWN",
    "location": "Lisbon",
    "class": "Mythic"
  },
  {
    "codename": "THE EMBER TIGER 19",
    "role": "Forger",
    "status": "UNKNOWN",
    "location": "Reykjavik",
    "class": "Ghost"
  },
  {
    "codename": "THE ONYX MOTH 62",
    "role": "Cryptographer",
    "status": "UNKNOWN",
    "location": "London",
    "class": "Handler"
  },
  {
    "codename": "THE DRIFTER FOX 85",
    "role": "Cryptographer",
    "status": "UNKNOWN",
    "location": "Marrakesh",
    "class": "Enforcer"
  },
  {
    "codename": "THE OBSIDIAN HAND 27",
    "role": "Data Broker",
    "status": "ACTIVE",
    "location": "Reykjavik",
    "class": "Architect"
  },
  {
    "codename": "THE STEEL BLADE 68",
    "role": "Forger",
    "status": "ACTIVE",
    "location": "Budapest",
    "class": "Mythic"
  },
  {
    "codename": "THE SHADOW QUEEN 70",
    "role": "Tracker",
    "status": "ACTIVE",
    "location": "New York",
    "class": "Oracle"
  },
  {
    "codename": "THE DRIFTER KING 58",
    "role": "Tracker",
    "status": "ACTIVE",
    "location": "Seoul",
    "class": "Tech"
  },
  {
    "codename": "THE ONYX CIPHER 23",
    "role": "Courier",
    "status": "UNKNOWN",
    "location": "Warsaw",
    "class": "Ghost"
  },
  {
    "codename": "THE MIRAGE QUEEN 27",
    "role": "Armorer",
    "status": "ACTIVE",
    "location": "Marrakesh",
    "class": "Enforcer"
  },
  {
    "codename": "THE ORACLE WALKER 10",
    "role": "Scout",
    "status": "ACTIVE",
    "location": "Reykjavik",
    "class": "Architect"
  },
  {
    "codename": "THE RAVEN QUEEN 52",
    "role": "Courier",
    "status": "ON CALL",
    "location": "Marrakesh",
    "class": "Enforcer"
  },
  {
    "codename": "THE ONYX SAGE 83",
    "role": "Tracker",
    "status": "UNKNOWN",
    "location": "Hong Kong",
    "class": "Mythic"
  },
  {
    "codename": "THE FROST HUNTER 13",
    "role": "Courier",
    "status": "ACTIVE",
    "location": "Naples",
    "class": "Ghost"
  },
  {
    "codename": "THE EMBER SPIDER 50",
    "role": "Data Broker",
    "status": "ON CALL",
    "location": "Lisbon",
    "class": "Architect"
  },
  {
    "codename": "THE FROST HAND 15",
    "role": "Armorer",
    "status": "UNKNOWN",
    "location": "Vienna",
    "class": "Architect"
  },
  {
    "codename": "THE JACKAL HAND 88",
    "role": "Data Broker",
    "status": "ACTIVE",
    "location": "Budapest",
    "class": "Mythic"
  },
  {
    "codename": "THE STEEL KING 88",
    "role": "Forger",
    "status": "ON CALL",
    "location": "Zurich",
    "class": "Tech"
  },
  {
    "codename": "THE SERPENT ECHO 90",
    "role": "Handler",
    "status": "ON CALL",
    "location": "Reykjavik",
    "class": "Tech"
  },
  {
    "codename": "THE ARCHITECT MOTH 22",
    "role": "Cryptographer",
    "status": "ACTIVE",
    "location": "Hong Kong",
    "class": "Ghost"
  },
  {
    "codename": "THE EMBER KING 97",
    "role": "Data Broker",
    "status": "UNKNOWN",
    "location": "Vienna",
    "class": "Enforcer"
  },
  {
    "codename": "THE VIPER RIDER 79",
    "role": "Safehouse Keeper",
    "status": "ACTIVE",
    "location": "Vienna",
    "class": "Ghost"
  },
  {
    "codename": "THE PHOENIX ECHO 9",
    "role": "Forger",
    "status": "ACTIVE",
    "location": "Dubai",
    "class": "Ghost"
  },
  {
    "codename": "THE FROST HAND 68",
    "role": "Ghost Driver",
    "status": "ON CALL",
    "location": "Reykjavik",
    "class": "Ghost"
  },
  {
    "codename": "THE VIPER VEIL 3",
    "role": "Cryptographer",
    "status": "ACTIVE",
    "location": "Reykjavik",
    "class": "Ghost"
  },
  {
    "codename": "THE VIPER SPIDER 6",
    "role": "Cleaner",
    "status": "ON CALL",
    "location": "Hong Kong",
    "class": "Mythic"
  },
  {
    "codename": "THE GHOST LARK 81",
    "role": "Data Broker",
    "status": "ACTIVE",
    "location": "London",
    "class": "Ghost"
  },
  {
    "codename": "THE RAVEN RIDER 71",
    "role": "Armorer",
    "status": "ON CALL",
    "location": "Vienna",
    "class": "Mythic"
  },
  {
    "codename": "THE ONYX KING 93",
    "role": "Forger",
    "status": "UNKNOWN",
    "location": "Naples",
    "class": "Oracle"
  },
  {
    "codename": "THE DRIFTER LARK 4",
    "role": "Handler",
    "status": "ACTIVE",
    "location": "New York",
    "class": "Tech"
  },
  {
    "codename": "THE JACKAL BLADE 41",
    "role": "Fixer",
    "status": "UNKNOWN",
    "location": "Zurich",
    "class": "Mythic"
  },
  {
    "codename": "THE LOTUS HUNTER 30",
    "role": "Cryptographer",
    "status": "ON CALL",
    "location": "Istanbul",
    "class": "Architect"
  },
  {
    "codename": "THE SPECTER FOX 18",
    "role": "Data Broker",
    "status": "UNKNOWN",
    "location": "Stockholm",
    "class": "Mythic"
  },
  {
    "codename": "THE EMBER MOTH 13",
    "role": "Cleaner",
    "status": "ON CALL",
    "location": "Budapest",
    "class": "Handler"
  },
  {
    "codename": "THE ONYX RIDER 76",
    "role": "Courier",
    "status": "UNKNOWN",
    "location": "New York",
    "class": "Enforcer"
  },
  {
    "codename": "THE ARCHITECT WALKER 15",
    "role": "Fixer",
    "status": "UNKNOWN",
    "location": "New York",
    "class": "Ghost"
  },
  {
    "codename": "THE SERPENT HUNTER 29",
    "role": "Ghost Driver",
    "status": "UNKNOWN",
    "location": "Reykjavik",
    "class": "Enforcer"
  },
  {
    "codename": "THE SHADOW CIPHER 15",
    "role": "Tracker",
    "status": "UNKNOWN",
    "location": "Hong Kong",
    "class": "Oracle"
  },
  {
    "codename": "THE ARCHITECT HAND 40",
    "role": "Armorer",
    "status": "UNKNOWN",
    "location": "Marrakesh",
    "class": "Ghost"
  },
  {
    "codename": "THE ARCHITECT ECHO 61",
    "role": "Forger",
    "status": "ON CALL",
    "location": "Prague",
    "class": "Handler"
  },
  {
    "codename": "THE NEBULA LION 84",
    "role": "Cleaner",
    "status": "ACTIVE",
    "location": "Dubai",
    "class": "Tech"
  },
  {
    "codename": "THE FROST HAND 65",
    "role": "Ghost Driver",
    "status": "ON CALL",
    "location": "Osaka",
    "class": "Ghost"
  },
  {
    "codename": "THE DRIFTER TIGER 90",
    "role": "Safehouse Keeper",
    "status": "ACTIVE",
    "location": "Prague",
    "class": "Ghost"
  },
  {
    "codename": "THE STEEL KING 21",
    "role": "Courier",
    "status": "ON CALL",
    "location": "Dubai",
    "class": "Enforcer"
  },
  {
    "codename": "THE ORACLE WALKER 32",
    "role": "Safehouse Keeper",
    "status": "ACTIVE",
    "location": "Reykjavik",
    "class": "Architect"
  },
  {
    "codename": "THE FROST CIPHER 85",
    "role": "Ghost Driver",
    "status": "ACTIVE",
    "location": "Marrakesh",
    "class": "Enforcer"
  },
  {
    "codename": "THE SERPENT HAND 67",
    "role": "Data Broker",
    "status": "ACTIVE",
    "location": "Cairo",
    "class": "Oracle"
  },
  {
    "codename": "THE SERPENT WALKER 50",
    "role": "Interrogator",
    "status": "ON CALL",
    "location": "Vienna",
    "class": "Mythic"
  },
  {
    "codename": "THE SHADOW WARDEN 89",
    "role": "Scout",
    "status": "ACTIVE",
    "location": "Cairo",
    "class": "Oracle"
  },
  {
    "codename": "THE IVORY WITCH 82",
    "role": "Courier",
    "status": "ACTIVE",
    "location": "Seoul",
    "class": "Handler"
  },
  {
    "codename": "THE OBSIDIAN HUNTER 47",
    "role": "Safehouse Keeper",
    "status": "UNKNOWN",
    "location": "Naples",
    "class": "Tech"
  },
  {
    "codename": "THE GHOST BLADE 18",
    "role": "Cryptographer",
    "status": "UNKNOWN",
    "location": "Berlin",
    "class": "Handler"
  },
  {
    "codename": "THE CROW KING 54",
    "role": "Courier",
    "status": "ACTIVE",
    "location": "Istanbul",
    "class": "Enforcer"
  },
  {
    "codename": "THE JACKAL ECHO 57",
    "role": "Armorer",
    "status": "ON CALL",
    "location": "Osaka",
    "class": "Architect"
  },
  {
    "codename": "THE OBSIDIAN LION 76",
    "role": "Tracker",
    "status": "UNKNOWN",
    "location": "Casablanca",
    "class": "Mythic"
  },
  {
    "codename": "THE EMBER TIGER 23",
    "role": "Interrogator",
    "status": "ON CALL",
    "location": "Dubai",
    "class": "Handler"
  },
  {
    "codename": "THE NIGHT WALKER 89",
    "role": "Fixer",
    "status": "ON CALL",
    "location": "Hong Kong",
    "class": "Oracle"
  },
  {
    "codename": "THE WOLF CIPHER 9",
    "role": "Facilitator",
    "status": "UNKNOWN",
    "location": "New York",
    "class": "Oracle"
  },
  {
    "codename": "THE ONYX SAGE 29",
    "role": "Facilitator",
    "status": "ACTIVE",
    "location": "Prague",
    "class": "Architect"
  },
  {
    "codename": "THE NIGHT HUNTER 18",
    "role": "Courier",
    "status": "ACTIVE",
    "location": "Stockholm",
    "class": "Mythic"
  },
  {
    "codename": "THE SHADOW ECHO 32",
    "role": "Scout",
    "status": "ACTIVE",
    "location": "Dubai",
    "class": "Architect"
  },
  {
    "codename": "THE JACKAL BLADE 7",
    "role": "Facilitator",
    "status": "ACTIVE",
    "location": "Reykjavik",
    "class": "Oracle"
  },
  {
    "codename": "THE NIGHT SAGE 51",
    "role": "Scout",
    "status": "UNKNOWN",
    "location": "Seoul",
    "class": "Tech"
  },
  {
    "codename": "THE FROST HUNTER 60",
    "role": "Safehouse Keeper",
    "status": "UNKNOWN",
    "location": "Zurich",
    "class": "Tech"
  },
  {
    "codename": "THE RAVEN SAGE 27",
    "role": "Fixer",
    "status": "ON CALL",
    "location": "Warsaw",
    "class": "Tech"
  },
  {
    "codename": "THE IVORY RIDER 53",
    "role": "Scout",
    "status": "ON CALL",
    "location": "Osaka",
    "class": "Architect"
  },
  {
    "codename": "THE VIPER FOX 85",
    "role": "Courier",
    "status": "UNKNOWN",
    "location": "New York",
    "class": "Architect"
  },
  {
    "codename": "THE MIRAGE BLADE 55",
    "role": "Courier",
    "status": "UNKNOWN",
    "location": "Vienna",
    "class": "Tech"
  },
  {
    "codename": "THE EMBER WITCH 91",
    "role": "Handler",
    "status": "UNKNOWN",
    "location": "New York",
    "class": "Ghost"
  },
  {
    "codename": "THE ORACLE WALKER 40",
    "role": "Facilitator",
    "status": "ON CALL",
    "location": "Cairo",
    "class": "Enforcer"
  },
  {
    "codename": "THE SHADOW VEIL 39",
    "role": "Scout",
    "status": "ON CALL",
    "location": "Warsaw",
    "class": "Tech"
  },
  {
    "codename": "THE NEBULA HUNTER 88",
    "role": "Courier",
    "status": "UNKNOWN",
    "location": "London",
    "class": "Enforcer"
  },
  {
    "codename": "THE FROST SAGE 44",
    "role": "Negotiator",
    "status": "UNKNOWN",
    "location": "Osaka",
    "class": "Oracle"
  },
  {
    "codename": "THE DRIFTER LARK 75",
    "role": "Safehouse Keeper",
    "status": "ACTIVE",
    "location": "Seoul",
    "class": "Mythic"
  },
  {
    "codename": "THE RAVEN RIDER 22",
    "role": "Fixer",
    "status": "UNKNOWN",
    "location": "Reykjavik",
    "class": "Handler"
  },
  {
    "codename": "THE LOTUS LION 93",
    "role": "Tracker",
    "status": "ON CALL",
    "location": "Hong Kong",
    "class": "Handler"
  },
  {
    "codename": "THE MIRAGE ECHO 89",
    "role": "Courier",
    "status": "ACTIVE",
    "location": "Reykjavik",
    "class": "Ghost"
  },
  {
    "codename": "THE FROST QUEEN 31",
    "role": "Cryptographer",
    "status": "ON CALL",
    "location": "London",
    "class": "Handler"
  },
  {
    "codename": "THE ONYX QUEEN 48",
    "role": "Tracker",
    "status": "ACTIVE",
    "location": "Warsaw",
    "class": "Handler"
  },
  {
    "codename": "THE WOLF LARK 26",
    "role": "Data Broker",
    "status": "UNKNOWN",
    "location": "Dubai",
    "class": "Mythic"
  },
  {
    "codename": "THE EMBER HAND 2",
    "role": "Courier",
    "status": "UNKNOWN",
    "location": "Reykjavik",
    "class": "Architect"
  },
  {
    "codename": "THE SPECTER FOX 53",
    "role": "Tracker",
    "status": "UNKNOWN",
    "location": "Budapest",
    "class": "Handler"
  },
  {
    "codename": "THE WOLF WITCH 97",
    "role": "Scout",
    "status": "ACTIVE",
    "location": "Seoul",
    "class": "Oracle"
  },
  {
    "codename": "THE OBSIDIAN HUNTER 53",
    "role": "Data Broker",
    "status": "ACTIVE",
    "location": "Cairo",
    "class": "Oracle"
  },
  {
    "codename": "THE NEBULA VEIL 62",
    "role": "Interrogator",
    "status": "ON CALL",
    "location": "Lisbon",
    "class": "Architect"
  },
  {
    "codename": "THE LOTUS HUNTER 33",
    "role": "Forger",
    "status": "UNKNOWN",
    "location": "Budapest",
    "class": "Handler"
  },
  {
    "codename": "THE MIRAGE BLADE 22",
    "role": "Courier",
    "status": "ACTIVE",
    "location": "Istanbul",
    "class": "Handler"
  },
  {
    "codename": "THE STEEL WARDEN 66",
    "role": "Interrogator",
    "status": "UNKNOWN",
    "location": "Cairo",
    "class": "Enforcer"
  },
  {
    "codename": "THE DRIFTER RIDER 11",
    "role": "Fixer",
    "status": "ON CALL",
    "location": "Marrakesh",
    "class": "Handler"
  },
  {
    "codename": "THE GHOST ECHO 26",
    "role": "Facilitator",
    "status": "ON CALL",
    "location": "Lisbon",
    "class": "Mythic"
  },
  {
    "codename": "THE VIPER VEIL 10",
    "role": "Cryptographer",
    "status": "ON CALL",
    "location": "Cairo",
    "class": "Ghost"
  },
  {
    "codename": "THE NIGHT VEIL 44",
    "role": "Ghost Driver",
    "status": "ON CALL",
    "location": "Osaka",
    "class": "Architect"
  },
  {
    "codename": "THE STEEL VEIL 64",
    "role": "Facilitator",
    "status": "ACTIVE",
    "location": "Zurich",
    "class": "Architect"
  },
  {
    "codename": "THE SHADOW LION 9",
    "role": "Courier",
    "status": "UNKNOWN",
    "location": "Warsaw",
    "class": "Architect"
  },
  {
    "codename": "THE EMBER WARDEN 31",
    "role": "Courier",
    "status": "ON CALL",
    "location": "Prague",
    "class": "Enforcer"
  },
  {
    "codename": "THE SERPENT SAGE 93",
    "role": "Interrogator",
    "status": "UNKNOWN",
    "location": "Marrakesh",
    "class": "Tech"
  },
  {
    "codename": "THE EMBER RIDER 19",
    "role": "Fixer",
    "status": "UNKNOWN",
    "location": "Prague",
    "class": "Enforcer"
  },
  {
    "codename": "THE STEEL BLADE 63",
    "role": "Facilitator",
    "status": "ACTIVE",
    "location": "Osaka",
    "class": "Mythic"
  },
  {
    "codename": "THE LOTUS LARK 59",
    "role": "Fixer",
    "status": "ON CALL",
    "location": "Hong Kong",
    "class": "Oracle"
  },
  {
    "codename": "THE GHOST VEIL 45",
    "role": "Cleaner",
    "status": "ACTIVE",
    "location": "Zurich",
    "class": "Oracle"
  },
  {
    "codename": "THE SPECTER MOTH 50",
    "role": "Armorer",
    "status": "ON CALL",
    "location": "Zurich",
    "class": "Ghost"
  },
  {
    "codename": "THE NEBULA ECHO 33",
    "role": "Courier",
    "status": "ON CALL",
    "location": "Reykjavik",
    "class": "Ghost"
  },
  {
    "codename": "THE STEEL MOTH 39",
    "role": "Forger",
    "status": "UNKNOWN",
    "location": "Seoul",
    "class": "Handler"
  },
  {
    "codename": "THE LOTUS LARK 88",
    "role": "Fixer",
    "status": "ACTIVE",
    "location": "Budapest",
    "class": "Tech"
  },
  {
    "codename": "THE FROST WITCH 25",
    "role": "Ghost Driver",
    "status": "ON CALL",
    "location": "Naples",
    "class": "Ghost"
  },
  {
    "codename": "THE DRIFTER HAND 94",
    "role": "Fixer",
    "status": "ACTIVE",
    "location": "Stockholm",
    "class": "Architect"
  },
  {
    "codename": "THE OBSIDIAN LARK 51",
    "role": "Cryptographer",
    "status": "ACTIVE",
    "location": "Marrakesh",
    "class": "Enforcer"
  },
  {
    "codename": "THE IVORY WARDEN 89",
    "role": "Interrogator",
    "status": "ACTIVE",
    "location": "Reykjavik",
    "class": "Enforcer"
  },
  {
    "codename": "THE DRIFTER LION 72",
    "role": "Forger",
    "status": "ACTIVE",
    "location": "Marrakesh",
    "class": "Handler"
  },
  {
    "codename": "THE STEEL WALKER 14",
    "role": "Armorer",
    "status": "UNKNOWN",
    "location": "Casablanca",
    "class": "Oracle"
  },
  {
    "codename": "THE NIGHT KING 16",
    "role": "Ghost Driver",
    "status": "ACTIVE",
    "location": "Hong Kong",
    "class": "Tech"
  },
  {
    "codename": "THE EMBER TIGER 25",
    "role": "Tracker",
    "status": "UNKNOWN",
    "location": "Reykjavik",
    "class": "Handler"
  },
  {
    "codename": "THE VIPER MOTH 80",
    "role": "Forger",
    "status": "UNKNOWN",
    "location": "Dubai",
    "class": "Enforcer"
  },
  {
    "codename": "THE SPECTER LARK 22",
    "role": "Forger",
    "status": "UNKNOWN",
    "location": "Marrakesh",
    "class": "Oracle"
  },
  {
    "codename": "THE EMBER WITCH 47",
    "role": "Tracker",
    "status": "ON CALL",
    "location": "Prague",
    "class": "Ghost"
  },
  {
    "codename": "THE LOTUS LION 55",
    "role": "Safehouse Keeper",
    "status": "UNKNOWN",
    "location": "London",
    "class": "Ghost"
  },
  {
    "codename": "THE VIPER HAND 8",
    "role": "Tracker",
    "status": "ON CALL",
    "location": "Berlin",
    "class": "Tech"
  },
  {
    "codename": "THE SPECTER VEIL 23",
    "role": "Data Broker",
    "status": "ACTIVE",
    "location": "Stockholm",
    "class": "Oracle"
  },
  {
    "codename": "THE JACKAL SPIDER 93",
    "role": "Fixer",
    "status": "UNKNOWN",
    "location": "New York",
    "class": "Architect"
  },
  {
    "codename": "THE SPECTER TIGER 5",
    "role": "Scout",
    "status": "ON CALL",
    "location": "London",
    "class": "Enforcer"
  },
  {
    "codename": "THE LOTUS SAGE 25",
    "role": "Interrogator",
    "status": "ON CALL",
    "location": "Vienna",
    "class": "Ghost"
  },
  {
    "codename": "THE STEEL CIPHER 54",
    "role": "Safehouse Keeper",
    "status": "ON CALL",
    "location": "Hong Kong",
    "class": "Enforcer"
  },
  {
    "codename": "THE GHOST WALKER 26",
    "role": "Handler",
    "status": "ACTIVE",
    "location": "Warsaw",
    "class": "Ghost"
  },
  {
    "codename": "THE SPECTER QUEEN 92",
    "role": "Handler",
    "status": "ON CALL",
    "location": "Zurich",
    "class": "Architect"
  },
  {
    "codename": "THE SPECTER FOX 27",
    "role": "Safehouse Keeper",
    "status": "ACTIVE",
    "location": "Marrakesh",
    "class": "Mythic"
  },
  {
    "codename": "THE MIRAGE WITCH 89",
    "role": "Ghost Driver",
    "status": "ON CALL",
    "location": "Marrakesh",
    "class": "Architect"
  },
  {
    "codename": "THE ONYX MOTH 77",
    "role": "Cryptographer",
    "status": "ON CALL",
    "location": "Prague",
    "class": "Tech"
  },
  {
    "codename": "THE SERPENT FOX 2",
    "role": "Negotiator",
    "status": "ON CALL",
    "location": "Istanbul",
    "class": "Handler"
  },
  {
    "codename": "THE VIPER RIDER 97",
    "role": "Scout",
    "status": "ACTIVE",
    "location": "Marrakesh",
    "class": "Tech"
  },
  {
    "codename": "THE DRIFTER KING 52",
    "role": "Cleaner",
    "status": "ON CALL",
    "location": "Warsaw",
    "class": "Ghost"
  },
  {
    "codename": "THE FROST HAND 61",
    "role": "Armorer",
    "status": "ACTIVE",
    "location": "Osaka",
    "class": "Architect"
  },
  {
    "codename": "THE LOTUS WITCH 17",
    "role": "Facilitator",
    "status": "ACTIVE",
    "location": "Dubai",
    "class": "Mythic"
  },
  {
    "codename": "THE JACKAL HAND 36",
    "role": "Interrogator",
    "status": "ACTIVE",
    "location": "Hong Kong",
    "class": "Ghost"
  },
  {
    "codename": "THE ORACLE VEIL 39",
    "role": "Cleaner",
    "status": "UNKNOWN",
    "location": "Stockholm",
    "class": "Enforcer"
  },
  {
    "codename": "THE WOLF WALKER 51",
    "role": "Ghost Driver",
    "status": "ACTIVE",
    "location": "Marrakesh",
    "class": "Enforcer"
  },
  {
    "codename": "THE SERPENT MOTH 96",
    "role": "Data Broker",
    "status": "ACTIVE",
    "location": "Reykjavik",
    "class": "Handler"
  },
  {
    "codename": "THE JACKAL ECHO 61",
    "role": "Negotiator",
    "status": "UNKNOWN",
    "location": "Reykjavik",
    "class": "Handler"
  },
  {
    "codename": "THE JACKAL SAGE 23",
    "role": "Cryptographer",
    "status": "ON CALL",
    "location": "Cairo",
    "class": "Enforcer"
  },
  {
    "codename": "THE FROST VEIL 86",
    "role": "Fixer",
    "status": "ACTIVE",
    "location": "Marrakesh",
    "class": "Tech"
  },
  {
    "codename": "THE RAVEN TIGER 27",
    "role": "Safehouse Keeper",
    "status": "UNKNOWN",
    "location": "Warsaw",
    "class": "Mythic"
  },
  {
    "codename": "THE STEEL HAND 80",
    "role": "Forger",
    "status": "ACTIVE",
    "location": "Istanbul",
    "class": "Enforcer"
  },
  {
    "codename": "THE GHOST QUEEN 60",
    "role": "Ghost Driver",
    "status": "ON CALL",
    "location": "Berlin",
    "class": "Mythic"
  },
  {
    "codename": "THE ONYX QUEEN 1",
    "role": "Cryptographer",
    "status": "UNKNOWN",
    "location": "Dubai",
    "class": "Oracle"
  },
  {
    "codename": "THE EMBER ECHO 30",
    "role": "Armorer",
    "status": "ACTIVE",
    "location": "Berlin",
    "class": "Mythic"
  },
  {
    "codename": "THE EMBER QUEEN 44",
    "role": "Fixer",
    "status": "ACTIVE",
    "location": "Naples",
    "class": "Architect"
  },
  {
    "codename": "THE SPECTER LARK 30",
    "role": "Forger",
    "status": "ACTIVE",
    "location": "Istanbul",
    "class": "Architect"
  },
  {
    "codename": "THE ARCHITECT QUEEN 2",
    "role": "Interrogator",
    "status": "ACTIVE",
    "location": "Zurich",
    "class": "Handler"
  },
  {
    "codename": "THE LOTUS HUNTER 93",
    "role": "Courier",
    "status": "ACTIVE",
    "location": "Dubai",
    "class": "Enforcer"
  },
  {
    "codename": "THE WOLF LION 37",
    "role": "Data Broker",
    "status": "ACTIVE",
    "location": "London",
    "class": "Tech"
  },
  {
    "codename": "THE OBSIDIAN BLADE 26",
    "role": "Scout",
    "status": "ON CALL",
    "location": "Berlin",
    "class": "Oracle"
  },
  {
    "codename": "THE MIRAGE TIGER 67",
    "role": "Fixer",
    "status": "ACTIVE",
    "location": "Naples",
    "class": "Ghost"
  },
  {
    "codename": "THE IVORY RIDER 42",
    "role": "Negotiator",
    "status": "UNKNOWN",
    "location": "Naples",
    "class": "Oracle"
  },
  {
    "codename": "THE NIGHT WITCH 20",
    "role": "Courier",
    "status": "ACTIVE",
    "location": "Osaka",
    "class": "Oracle"
  },
  {
    "codename": "THE CROW VEIL 63",
    "role": "Safehouse Keeper",
    "status": "UNKNOWN",
    "location": "Stockholm",
    "class": "Ghost"
  },
  {
    "codename": "THE SHADOW SAGE 1",
    "role": "Courier",
    "status": "ACTIVE",
    "location": "Stockholm",
    "class": "Handler"
  },
  {
    "codename": "THE EMBER VEIL 90",
    "role": "Fixer",
    "status": "UNKNOWN",
    "location": "Cairo",
    "class": "Enforcer"
  },
  {
    "codename": "THE JACKAL WITCH 85",
    "role": "Negotiator",
    "status": "ON CALL",
    "location": "Zurich",
    "class": "Oracle"
  },
  {
    "codename": "THE ONYX WALKER 24",
    "role": "Safehouse Keeper",
    "status": "ACTIVE",
    "location": "Istanbul",
    "class": "Enforcer"
  },
  {
    "codename": "THE VIPER FOX 6",
    "role": "Safehouse Keeper",
    "status": "ACTIVE",
    "location": "New York",
    "class": "Tech"
  },
  {
    "codename": "THE JACKAL QUEEN 26",
    "role": "Facilitator",
    "status": "UNKNOWN",
    "location": "Zurich",
    "class": "Mythic"
  },
  {
    "codename": "THE MIRAGE KING 42",
    "role": "Ghost Driver",
    "status": "ACTIVE",
    "location": "Budapest",
    "class": "Oracle"
  },
  {
    "codename": "THE VIPER WARDEN 50",
    "role": "Tracker",
    "status": "ON CALL",
    "location": "Cairo",
    "class": "Oracle"
  },
  {
    "codename": "THE VIPER LARK 5",
    "role": "Tracker",
    "status": "ON CALL",
    "location": "Zurich",
    "class": "Ghost"
  },
  {
    "codename": "THE PHOENIX CIPHER 76",
    "role": "Courier",
    "status": "UNKNOWN",
    "location": "Prague",
    "class": "Ghost"
  },
  {
    "codename": "THE WOLF SAGE 83",
    "role": "Tracker",
    "status": "ON CALL",
    "location": "Reykjavik",
    "class": "Ghost"
  },
  {
    "codename": "THE GHOST ECHO 26",
    "role": "Interrogator",
    "status": "ACTIVE",
    "location": "Marrakesh",
    "class": "Architect"
  },
  {
    "codename": "THE LOTUS VEIL 32",
    "role": "Facilitator",
    "status": "UNKNOWN",
    "location": "Hong Kong",
    "class": "Oracle"
  },
  {
    "codename": "THE CROW ECHO 18",
    "role": "Ghost Driver",
    "status": "ACTIVE",
    "location": "Cairo",
    "class": "Enforcer"
  },
  {
    "codename": "THE DRIFTER KING 83",
    "role": "Data Broker",
    "status": "ACTIVE",
    "location": "Casablanca",
    "class": "Enforcer"
  },
  {
    "codename": "THE RAVEN QUEEN 25",
    "role": "Fixer",
    "status": "ON CALL",
    "location": "Osaka",
    "class": "Ghost"
  },
  {
    "codename": "THE SPECTER SPIDER 78",
    "role": "Interrogator",
    "status": "ACTIVE",
    "location": "Vienna",
    "class": "Enforcer"
  },
  {
    "codename": "THE SERPENT WARDEN 31",
    "role": "Data Broker",
    "status": "ON CALL",
    "location": "Vienna",
    "class": "Ghost"
  },
  {
    "codename": "THE EMBER SAGE 32",
    "role": "Cryptographer",
    "status": "ON CALL",
    "location": "Prague",
    "class": "Mythic"
  },
  {
    "codename": "THE CROW VEIL 89",
    "role": "Cryptographer",
    "status": "UNKNOWN",
    "location": "Naples",
    "class": "Architect"
  },
  {
    "codename": "THE WOLF CIPHER 64",
    "role": "Interrogator",
    "status": "UNKNOWN",
    "location": "Naples",
    "class": "Tech"
  },
  {
    "codename": "THE CROW WALKER 95",
    "role": "Courier",
    "status": "ACTIVE",
    "location": "Casablanca",
    "class": "Architect"
  },
  {
    "codename": "THE JACKAL KING 98",
    "role": "Courier",
    "status": "ACTIVE",
    "location": "Casablanca",
    "class": "Handler"
  },
  {
    "codename": "THE VIPER CIPHER 5",
    "role": "Interrogator",
    "status": "ON CALL",
    "location": "Casablanca",
    "class": "Tech"
  },
  {
    "codename": "THE SPECTER KING 73",
    "role": "Armorer",
    "status": "ON CALL",
    "location": "Reykjavik",
    "class": "Handler"
  },
  {
    "codename": "THE SERPENT TIGER 44",
    "role": "Negotiator",
    "status": "ON CALL",
    "location": "Budapest",
    "class": "Architect"
  },
  {
    "codename": "THE NIGHT RIDER 25",
    "role": "Negotiator",
    "status": "UNKNOWN",
    "location": "Hong Kong",
    "class": "Enforcer"
  },
  {
    "codename": "THE EMBER VEIL 38",
    "role": "Scout",
    "status": "ACTIVE",
    "location": "Warsaw",
    "class": "Mythic"
  },
  {
    "codename": "THE NIGHT RIDER 74",
    "role": "Fixer",
    "status": "ACTIVE",
    "location": "New York",
    "class": "Mythic"
  },
  {
    "codename": "THE IVORY WITCH 83",
    "role": "Armorer",
    "status": "ON CALL",
    "location": "New York",
    "class": "Ghost"
  },
  {
    "codename": "THE ARCHITECT SAGE 81",
    "role": "Safehouse Keeper",
    "status": "UNKNOWN",
    "location": "Osaka",
    "class": "Ghost"
  },
  {
    "codename": "THE IVORY KING 27",
    "role": "Cleaner",
    "status": "ACTIVE",
    "location": "Warsaw",
    "class": "Architect"
  },
  {
    "codename": "THE RAVEN LARK 91",
    "role": "Tracker",
    "status": "ACTIVE",
    "location": "Casablanca",
    "class": "Ghost"
  },
  {
    "codename": "THE GHOST WITCH 50",
    "role": "Cryptographer",
    "status": "ON CALL",
    "location": "Naples",
    "class": "Tech"
  },
  {
    "codename": "THE ARCHITECT ECHO 96",
    "role": "Courier",
    "status": "UNKNOWN",
    "location": "Cairo",
    "class": "Enforcer"
  },
  {
    "codename": "THE SPECTER RIDER 84",
    "role": "Fixer",
    "status": "ACTIVE",
    "location": "Budapest",
    "class": "Architect"
  },
  {
    "codename": "THE VIPER SPIDER 61",
    "role": "Negotiator",
    "status": "ACTIVE",
    "location": "Naples",
    "class": "Handler"
  },
  {
    "codename": "THE SHADOW RIDER 82",
    "role": "Interrogator",
    "status": "ACTIVE",
    "location": "Naples",
    "class": "Architect"
  },
  {
    "codename": "THE OBSIDIAN SAGE 15",
    "role": "Negotiator",
    "status": "ON CALL",
    "location": "Istanbul",
    "class": "Enforcer"
  },
  {
    "codename": "THE VIPER HUNTER 13",
    "role": "Armorer",
    "status": "ACTIVE",
    "location": "Lisbon",
    "class": "Mythic"
  },
  {
    "codename": "THE OBSIDIAN RIDER 85",
    "role": "Cryptographer",
    "status": "ON CALL",
    "location": "Budapest",
    "class": "Mythic"
  },
  {
    "codename": "THE WOLF VEIL 1",
    "role": "Scout",
    "status": "ACTIVE",
    "location": "Prague",
    "class": "Tech"
  },
  {
    "codename": "THE MIRAGE QUEEN 2",
    "role": "Interrogator",
    "status": "ACTIVE",
    "location": "Warsaw",
    "class": "Ghost"
  },
  {
    "codename": "THE STEEL RIDER 47",
    "role": "Forger",
    "status": "ACTIVE",
    "location": "Dubai",
    "class": "Mythic"
  },
  {
    "codename": "THE IVORY KING 22",
    "role": "Safehouse Keeper",
    "status": "ACTIVE",
    "location": "London",
    "class": "Architect"
  },
  {
    "codename": "THE SHADOW VEIL 85",
    "role": "Courier",
    "status": "UNKNOWN",
    "location": "Prague",
    "class": "Architect"
  },
  {
    "codename": "THE NIGHT QUEEN 4",
    "role": "Forger",
    "status": "ON CALL",
    "location": "Prague",
    "class": "Ghost"
  },
  {
    "codename": "THE STEEL ECHO 30",
    "role": "Interrogator",
    "status": "UNKNOWN",
    "location": "Vienna",
    "class": "Enforcer"
  },
  {
    "codename": "THE WOLF RIDER 59",
    "role": "Negotiator",
    "status": "UNKNOWN",
    "location": "Naples",
    "class": "Tech"
  },
  {
    "codename": "THE SPECTER KING 90",
    "role": "Interrogator",
    "status": "UNKNOWN",
    "location": "Vienna",
    "class": "Tech"
  },
  {
    "codename": "THE VIPER WARDEN 5",
    "role": "Safehouse Keeper",
    "status": "ON CALL",
    "location": "Cairo",
    "class": "Architect"
  },
  {
    "codename": "THE MIRAGE VEIL 55",
    "role": "Handler",
    "status": "ON CALL",
    "location": "Dubai",
    "class": "Enforcer"
  },
  {
    "codename": "THE WOLF CIPHER 61",
    "role": "Cryptographer",
    "status": "ON CALL",
    "location": "Lisbon",
    "class": "Enforcer"
  },
  {
    "codename": "THE STEEL BLADE 6",
    "role": "Handler",
    "status": "ON CALL",
    "location": "Marrakesh",
    "class": "Architect"
  },
  {
    "codename": "THE GHOST WARDEN 52",
    "role": "Facilitator",
    "status": "ON CALL",
    "location": "Vienna",
    "class": "Architect"
  },
  {
    "codename": "THE OBSIDIAN LARK 70",
    "role": "Scout",
    "status": "ON CALL",
    "location": "Osaka",
    "class": "Architect"
  },
  {
    "codename": "THE SERPENT CIPHER 79",
    "role": "Negotiator",
    "status": "ON CALL",
    "location": "Budapest",
    "class": "Ghost"
  },
  {
    "codename": "THE NEBULA BLADE 72",
    "role": "Cleaner",
    "status": "ACTIVE",
    "location": "Zurich",
    "class": "Ghost"
  },
  {
    "codename": "THE CROW WARDEN 73",
    "role": "Cryptographer",
    "status": "ACTIVE",
    "location": "London",
    "class": "Tech"
  },
  {
    "codename": "THE CROW BLADE 63",
    "role": "Tracker",
    "status": "ACTIVE",
    "location": "Seoul",
    "class": "Mythic"
  },
  {
    "codename": "THE STEEL RIDER 36",
    "role": "Courier",
    "status": "UNKNOWN",
    "location": "Zurich",
    "class": "Oracle"
  },
  {
    "codename": "THE NIGHT VEIL 28",
    "role": "Safehouse Keeper",
    "status": "ACTIVE",
    "location": "Budapest",
    "class": "Oracle"
  },
  {
    "codename": "THE SERPENT SPIDER 46",
    "role": "Cleaner",
    "status": "ON CALL",
    "location": "London",
    "class": "Handler"
  },
  {
    "codename": "THE STEEL HAND 20",
    "role": "Interrogator",
    "status": "ACTIVE",
    "location": "Seoul",
    "class": "Enforcer"
  },
  {
    "codename": "THE VIPER RIDER 70",
    "role": "Tracker",
    "status": "UNKNOWN",
    "location": "London",
    "class": "Architect"
  },
  {
    "codename": "THE VIPER HUNTER 5",
    "role": "Forger",
    "status": "UNKNOWN",
    "location": "Lisbon",
    "class": "Mythic"
  },
  {
    "codename": "THE MIRAGE WARDEN 22",
    "role": "Negotiator",
    "status": "ACTIVE",
    "location": "Seoul",
    "class": "Ghost"
  },
  {
    "codename": "THE DRIFTER LION 36",
    "role": "Cryptographer",
    "status": "ON CALL",
    "location": "Lisbon",
    "class": "Architect"
  },
  {
    "codename": "THE MIRAGE QUEEN 24",
    "role": "Armorer",
    "status": "ACTIVE",
    "location": "Zurich",
    "class": "Mythic"
  },
  {
    "codename": "THE ARCHITECT KING 84",
    "role": "Scout",
    "status": "UNKNOWN",
    "location": "London",
    "class": "Oracle"
  },
  {
    "codename": "THE ORACLE BLADE 96",
    "role": "Data Broker",
    "status": "ON CALL",
    "location": "Stockholm",
    "class": "Mythic"
  },
  {
    "codename": "THE EMBER HAND 91",
    "role": "Data Broker",
    "status": "ACTIVE",
    "location": "Prague",
    "class": "Architect"
  },
  {
    "codename": "THE WOLF FOX 82",
    "role": "Cryptographer",
    "status": "ON CALL",
    "location": "London",
    "class": "Architect"
  },
  {
    "codename": "THE SHADOW LARK 13",
    "role": "Facilitator",
    "status": "ON CALL",
    "location": "Dubai",
    "class": "Handler"
  },
  {
    "codename": "THE OBSIDIAN KING 68",
    "role": "Data Broker",
    "status": "UNKNOWN",
    "location": "Naples",
    "class": "Tech"
  },
  {
    "codename": "THE SHADOW MOTH 23",
    "role": "Forger",
    "status": "ON CALL",
    "location": "Reykjavik",
    "class": "Tech"
  },
  {
    "codename": "THE WOLF HUNTER 79",
    "role": "Cleaner",
    "status": "ON CALL",
    "location": "Istanbul",
    "class": "Architect"
  },
  {
    "codename": "THE GHOST BLADE 67",
    "role": "Cleaner",
    "status": "UNKNOWN",
    "location": "Budapest",
    "class": "Enforcer"
  },
  {
    "codename": "THE OBSIDIAN CIPHER 81",
    "role": "Handler",
    "status": "UNKNOWN",
    "location": "Marrakesh",
    "class": "Mythic"
  },
  {
    "codename": "THE EMBER WARDEN 65",
    "role": "Handler",
    "status": "ACTIVE",
    "location": "Berlin",
    "class": "Handler"
  },
  {
    "codename": "THE GHOST BLADE 79",
    "role": "Forger",
    "status": "ON CALL",
    "location": "Stockholm",
    "class": "Ghost"
  },
  {
    "codename": "THE GHOST QUEEN 86",
    "role": "Interrogator",
    "status": "ACTIVE",
    "location": "Lisbon",
    "class": "Enforcer"
  },
  {
    "codename": "THE ARCHITECT FOX 75",
    "role": "Scout",
    "status": "UNKNOWN",
    "location": "Dubai",
    "class": "Enforcer"
  },
  {
    "codename": "THE EMBER TIGER 41",
    "role": "Tracker",
    "status": "ACTIVE",
    "location": "Lisbon",
    "class": "Oracle"
  },
  {
    "codename": "THE ARCHITECT SAGE 42",
    "role": "Interrogator",
    "status": "UNKNOWN",
    "location": "Cairo",
    "class": "Oracle"
  },
  {
    "codename": "THE OBSIDIAN ECHO 45",
    "role": "Fixer",
    "status": "UNKNOWN",
    "location": "Stockholm",
    "class": "Tech"
  },
  {
    "codename": "THE VIPER MOTH 87",
    "role": "Cryptographer",
    "status": "ON CALL",
    "location": "Lisbon",
    "class": "Architect"
  },
  {
    "codename": "THE WOLF VEIL 73",
    "role": "Fixer",
    "status": "ACTIVE",
    "location": "Vienna",
    "class": "Mythic"
  },
  {
    "codename": "THE MIRAGE FOX 26",
    "role": "Safehouse Keeper",
    "status": "UNKNOWN",
    "location": "Marrakesh",
    "class": "Architect"
  },
  {
    "codename": "THE EMBER FOX 59",
    "role": "Cryptographer",
    "status": "ACTIVE",
    "location": "Casablanca",
    "class": "Architect"
  },
  {
    "codename": "THE MIRAGE QUEEN 53",
    "role": "Negotiator",
    "status": "UNKNOWN",
    "location": "Warsaw",
    "class": "Ghost"
  },
  {
    "codename": "THE EMBER CIPHER 26",
    "role": "Fixer",
    "status": "ACTIVE",
    "location": "Budapest",
    "class": "Oracle"
  },
  {
    "codename": "THE OBSIDIAN WITCH 3",
    "role": "Cryptographer",
    "status": "UNKNOWN",
    "location": "Budapest",
    "class": "Handler"
  },
  {
    "codename": "THE FROST MOTH 97",
    "role": "Negotiator",
    "status": "ON CALL",
    "location": "Osaka",
    "class": "Enforcer"
  },
  {
    "codename": "THE STEEL KING 92",
    "role": "Facilitator",
    "status": "ON CALL",
    "location": "Istanbul",
    "class": "Mythic"
  },
  {
    "codename": "THE CROW RIDER 88",
    "role": "Handler",
    "status": "UNKNOWN",
    "location": "Stockholm",
    "class": "Tech"
  },
  {
    "codename": "THE EMBER WALKER 91",
    "role": "Cryptographer",
    "status": "UNKNOWN",
    "location": "Stockholm",
    "class": "Tech"
  },
  {
    "codename": "THE EMBER BLADE 6",
    "role": "Scout",
    "status": "ON CALL",
    "location": "Lisbon",
    "class": "Enforcer"
  },
  {
    "codename": "THE OBSIDIAN RIDER 75",
    "role": "Handler",
    "status": "ACTIVE",
    "location": "Marrakesh",
    "class": "Tech"
  },
  {
    "codename": "THE NIGHT WARDEN 24",
    "role": "Handler",
    "status": "UNKNOWN",
    "location": "Dubai",
    "class": "Architect"
  },
  {
    "codename": "THE SERPENT MOTH 15",
    "role": "Ghost Driver",
    "status": "ON CALL",
    "location": "Reykjavik",
    "class": "Mythic"
  },
  {
    "codename": "THE EMBER HUNTER 99",
    "role": "Fixer",
    "status": "ACTIVE",
    "location": "Reykjavik",
    "class": "Oracle"
  },
  {
    "codename": "THE OBSIDIAN WITCH 87",
    "role": "Ghost Driver",
    "status": "ON CALL",
    "location": "Vienna",
    "class": "Mythic"
  },
  {
    "codename": "THE ONYX HUNTER 38",
    "role": "Forger",
    "status": "ON CALL",
    "location": "Osaka",
    "class": "Ghost"
  },
  {
    "codename": "THE SHADOW SAGE 98",
    "role": "Data Broker",
    "status": "ON CALL",
    "location": "Istanbul",
    "class": "Oracle"
  },
  {
    "codename": "THE IVORY ECHO 67",
    "role": "Tracker",
    "status": "UNKNOWN",
    "location": "Reykjavik",
    "class": "Enforcer"
  },
  {
    "codename": "THE ARCHITECT SPIDER 29",
    "role": "Courier",
    "status": "ACTIVE",
    "location": "Reykjavik",
    "class": "Architect"
  },
  {
    "codename": "THE VIPER WARDEN 91",
    "role": "Tracker",
    "status": "ON CALL",
    "location": "Hong Kong",
    "class": "Handler"
  },
  {
    "codename": "THE CROW LARK 33",
    "role": "Handler",
    "status": "ON CALL",
    "location": "New York",
    "class": "Enforcer"
  },
  {
    "codename": "THE EMBER BLADE 25",
    "role": "Cleaner",
    "status": "ACTIVE",
    "location": "Budapest",
    "class": "Ghost"
  },
  {
    "codename": "THE NEBULA SPIDER 32",
    "role": "Courier",
    "status": "ON CALL",
    "location": "Casablanca",
    "class": "Architect"
  },
  {
    "codename": "THE EMBER WITCH 96",
    "role": "Facilitator",
    "status": "ON CALL",
    "location": "Zurich",
    "class": "Architect"
  },
  {
    "codename": "THE FROST ECHO 78",
    "role": "Handler",
    "status": "ACTIVE",
    "location": "Dubai",
    "class": "Architect"
  },
  {
    "codename": "THE NIGHT WITCH 27",
    "role": "Fixer",
    "status": "ACTIVE",
    "location": "Reykjavik",
    "class": "Mythic"
  },
  {
    "codename": "THE IVORY WARDEN 8",
    "role": "Safehouse Keeper",
    "status": "ACTIVE",
    "location": "Cairo",
    "class": "Oracle"
  },
  {
    "codename": "THE SHADOW ECHO 59",
    "role": "Negotiator",
    "status": "ON CALL",
    "location": "Dubai",
    "class": "Enforcer"
  },
  {
    "codename": "THE EMBER MOTH 17",
    "role": "Cryptographer",
    "status": "ACTIVE",
    "location": "Lisbon",
    "class": "Enforcer"
  },
  {
    "codename": "THE ARCHITECT VEIL 21",
    "role": "Cleaner",
    "status": "ON CALL",
    "location": "Budapest",
    "class": "Mythic"
  },
  {
    "codename": "THE STEEL SAGE 92",
    "role": "Interrogator",
    "status": "ON CALL",
    "location": "Vienna",
    "class": "Enforcer"
  },
  {
    "codename": "THE NIGHT VEIL 27",
    "role": "Negotiator",
    "status": "ACTIVE",
    "location": "Prague",
    "class": "Oracle"
  },
  {
    "codename": "THE GHOST WARDEN 32",
    "role": "Negotiator",
    "status": "ACTIVE",
    "location": "Prague",
    "class": "Oracle"
  },
  {
    "codename": "THE FROST RIDER 41",
    "role": "Negotiator",
    "status": "ON CALL",
    "location": "Marrakesh",
    "class": "Architect"
  },
  {
    "codename": "THE MIRAGE LARK 99",
    "role": "Tracker",
    "status": "ACTIVE",
    "location": "Reykjavik",
    "class": "Tech"
  },
  {
    "codename": "THE OBSIDIAN HAND 79",
    "role": "Data Broker",
    "status": "ACTIVE",
    "location": "Budapest",
    "class": "Architect"
  },
  {
    "codename": "THE SPECTER TIGER 81",
    "role": "Armorer",
    "status": "ON CALL",
    "location": "London",
    "class": "Tech"
  },
  {
    "codename": "THE JACKAL LION 84",
    "role": "Ghost Driver",
    "status": "UNKNOWN",
    "location": "Osaka",
    "class": "Architect"
  },
  {
    "codename": "THE CROW WITCH 13",
    "role": "Cleaner",
    "status": "ON CALL",
    "location": "Dubai",
    "class": "Enforcer"
  },
  {
    "codename": "THE NIGHT WALKER 11",
    "role": "Cleaner",
    "status": "ACTIVE",
    "location": "New York",
    "class": "Oracle"
  },
  {
    "codename": "THE OBSIDIAN BLADE 15",
    "role": "Facilitator",
    "status": "ON CALL",
    "location": "London",
    "class": "Architect"
  },
  {
    "codename": "THE OBSIDIAN ECHO 47",
    "role": "Scout",
    "status": "UNKNOWN",
    "location": "Naples",
    "class": "Architect"
  },
  {
    "codename": "THE SPECTER TIGER 86",
    "role": "Cleaner",
    "status": "ON CALL",
    "location": "Vienna",
    "class": "Mythic"
  },
  {
    "codename": "THE GHOST WALKER 81",
    "role": "Handler",
    "status": "ACTIVE",
    "location": "Prague",
    "class": "Oracle"
  },
  {
    "codename": "THE NEBULA KING 22",
    "role": "Forger",
    "status": "ACTIVE",
    "location": "Seoul",
    "class": "Handler"
  },
  {
    "codename": "THE WOLF WARDEN 54",
    "role": "Armorer",
    "status": "ON CALL",
    "location": "New York",
    "class": "Architect"
  },
  {
    "codename": "THE IVORY MOTH 63",
    "role": "Facilitator",
    "status": "UNKNOWN",
    "location": "Berlin",
    "class": "Mythic"
  },
  {
    "codename": "THE LOTUS ECHO 31",
    "role": "Forger",
    "status": "ON CALL",
    "location": "Dubai",
    "class": "Oracle"
  },
  {
    "codename": "THE NIGHT ECHO 44",
    "role": "Courier",
    "status": "UNKNOWN",
    "location": "Stockholm",
    "class": "Enforcer"
  },
  {
    "codename": "THE EMBER BLADE 65",
    "role": "Facilitator",
    "status": "UNKNOWN",
    "location": "Prague",
    "class": "Architect"
  },
  {
    "codename": "THE MIRAGE RIDER 14",
    "role": "Tracker",
    "status": "UNKNOWN",
    "location": "New York",
    "class": "Enforcer"
  },
  {
    "codename": "THE ONYX SAGE 94",
    "role": "Scout",
    "status": "ON CALL",
    "location": "Istanbul",
    "class": "Mythic"
  },
  {
    "codename": "THE JACKAL HAND 41",
    "role": "Safehouse Keeper",
    "status": "ON CALL",
    "location": "Reykjavik",
    "class": "Architect"
  },
  {
    "codename": "THE LOTUS LION 24",
    "role": "Fixer",
    "status": "ACTIVE",
    "location": "Istanbul",
    "class": "Handler"
  },
  {
    "codename": "THE NIGHT HUNTER 4",
    "role": "Ghost Driver",
    "status": "ACTIVE",
    "location": "Berlin",
    "class": "Tech"
  },
  {
    "codename": "THE PHOENIX MOTH 90",
    "role": "Tracker",
    "status": "ON CALL",
    "location": "Prague",
    "class": "Mythic"
  },
  {
    "codename": "THE EMBER CIPHER 63",
    "role": "Facilitator",
    "status": "ON CALL",
    "location": "Casablanca",
    "class": "Handler"
  },
  {
    "codename": "THE NIGHT SAGE 52",
    "role": "Tracker",
    "status": "ON CALL",
    "location": "Naples",
    "class": "Enforcer"
  },
  {
    "codename": "THE SHADOW SPIDER 28",
    "role": "Forger",
    "status": "ON CALL",
    "location": "Cairo",
    "class": "Tech"
  },
  {
    "codename": "THE NIGHT FOX 98",
    "role": "Interrogator",
    "status": "UNKNOWN",
    "location": "Budapest",
    "class": "Architect"
  },
  {
    "codename": "THE STEEL HUNTER 47",
    "role": "Negotiator",
    "status": "ACTIVE",
    "location": "Hong Kong",
    "class": "Mythic"
  },
  {
    "codename": "THE NIGHT TIGER 34",
    "role": "Courier",
    "status": "UNKNOWN",
    "location": "Casablanca",
    "class": "Handler"
  },
  {
    "codename": "THE NIGHT SPIDER 77",
    "role": "Safehouse Keeper",
    "status": "UNKNOWN",
    "location": "Marrakesh",
    "class": "Ghost"
  },
  {
    "codename": "THE ORACLE TIGER 52",
    "role": "Ghost Driver",
    "status": "ON CALL",
    "location": "Seoul",
    "class": "Enforcer"
  },
  {
    "codename": "THE MIRAGE WITCH 55",
    "role": "Cryptographer",
    "status": "UNKNOWN",
    "location": "Marrakesh",
    "class": "Handler"
  },
  {
    "codename": "THE DRIFTER LARK 26",
    "role": "Fixer",
    "status": "ON CALL",
    "location": "Berlin",
    "class": "Architect"
  },
  {
    "codename": "THE VIPER ECHO 73",
    "role": "Cryptographer",
    "status": "ON CALL",
    "location": "Berlin",
    "class": "Architect"
  },
  {
    "codename": "THE RAVEN HUNTER 64",
    "role": "Tracker",
    "status": "ACTIVE",
    "location": "Vienna",
    "class": "Enforcer"
  },
  {
    "codename": "THE DRIFTER LARK 2",
    "role": "Handler",
    "status": "ON CALL",
    "location": "London",
    "class": "Ghost"
  },
  {
    "codename": "THE ORACLE WITCH 66",
    "role": "Negotiator",
    "status": "UNKNOWN",
    "location": "Warsaw",
    "class": "Architect"
  },
  {
    "codename": "THE EMBER SAGE 58",
    "role": "Negotiator",
    "status": "ACTIVE",
    "location": "Casablanca",
    "class": "Ghost"
  },
  {
    "codename": "THE OBSIDIAN QUEEN 74",
    "role": "Interrogator",
    "status": "ACTIVE",
    "location": "Naples",
    "class": "Ghost"
  },
  {
    "codename": "THE SHADOW BLADE 4",
    "role": "Cryptographer",
    "status": "ON CALL",
    "location": "Budapest",
    "class": "Enforcer"
  },
  {
    "codename": "THE LOTUS RIDER 67",
    "role": "Ghost Driver",
    "status": "ACTIVE",
    "location": "Reykjavik",
    "class": "Architect"
  },
  {
    "codename": "THE PHOENIX BLADE 49",
    "role": "Cryptographer",
    "status": "UNKNOWN",
    "location": "Warsaw",
    "class": "Architect"
  },
  {
    "codename": "THE GHOST HUNTER 80",
    "role": "Interrogator",
    "status": "ACTIVE",
    "location": "Hong Kong",
    "class": "Tech"
  },
  {
    "codename": "THE SHADOW WALKER 81",
    "role": "Scout",
    "status": "ON CALL",
    "location": "Casablanca",
    "class": "Enforcer"
  },
  {
    "codename": "THE FROST BLADE 78",
    "role": "Ghost Driver",
    "status": "UNKNOWN",
    "location": "Lisbon",
    "class": "Architect"
  },
  {
    "codename": "THE EMBER RIDER 93",
    "role": "Facilitator",
    "status": "UNKNOWN",
    "location": "Casablanca",
    "class": "Architect"
  },
  {
    "codename": "THE IVORY TIGER 58",
    "role": "Data Broker",
    "status": "UNKNOWN",
    "location": "Zurich",
    "class": "Handler"
  },
  {
    "codename": "THE SHADOW WARDEN 89",
    "role": "Fixer",
    "status": "ACTIVE",
    "location": "Osaka",
    "class": "Oracle"
  },
  {
    "codename": "THE ONYX HUNTER 83",
    "role": "Armorer",
    "status": "ON CALL",
    "location": "Hong Kong",
    "class": "Handler"
  },
  {
    "codename": "THE WOLF WALKER 89",
    "role": "Scout",
    "status": "ACTIVE",
    "location": "Marrakesh",
    "class": "Ghost"
  },
  {
    "codename": "THE GHOST WALKER 26",
    "role": "Cryptographer",
    "status": "ON CALL",
    "location": "Prague",
    "class": "Ghost"
  },
  {
    "codename": "THE DRIFTER WARDEN 42",
    "role": "Data Broker",
    "status": "ACTIVE",
    "location": "Marrakesh",
    "class": "Tech"
  },
  {
    "codename": "THE SHADOW TIGER 11",
    "role": "Armorer",
    "status": "ACTIVE",
    "location": "Vienna",
    "class": "Oracle"
  },
  {
    "codename": "THE CROW VEIL 33",
    "role": "Safehouse Keeper",
    "status": "ON CALL",
    "location": "Naples",
    "class": "Tech"
  },
  {
    "codename": "THE CROW LION 43",
    "role": "Ghost Driver",
    "status": "ON CALL",
    "location": "Lisbon",
    "class": "Tech"
  },
  {
    "codename": "THE ONYX WALKER 44",
    "role": "Facilitator",
    "status": "ACTIVE",
    "location": "New York",
    "class": "Handler"
  },
  {
    "codename": "THE ONYX QUEEN 54",
    "role": "Negotiator",
    "status": "UNKNOWN",
    "location": "Seoul",
    "class": "Architect"
  },
  {
    "codename": "THE ONYX SPIDER 50",
    "role": "Scout",
    "status": "ACTIVE",
    "location": "Dubai",
    "class": "Mythic"
  },
  {
    "codename": "THE NIGHT BLADE 57",
    "role": "Fixer",
    "status": "ACTIVE",
    "location": "Marrakesh",
    "class": "Tech"
  },
  {
    "codename": "THE SPECTER LARK 91",
    "role": "Facilitator",
    "status": "UNKNOWN",
    "location": "Warsaw",
    "class": "Handler"
  },
  {
    "codename": "THE NIGHT BLADE 24",
    "role": "Data Broker",
    "status": "ACTIVE",
    "location": "Osaka",
    "class": "Mythic"
  },
  {
    "codename": "THE WOLF LARK 44",
    "role": "Cryptographer",
    "status": "UNKNOWN",
    "location": "Zurich",
    "class": "Enforcer"
  },
  {
    "codename": "THE MIRAGE QUEEN 4",
    "role": "Interrogator",
    "status": "ON CALL",
    "location": "Vienna",
    "class": "Tech"
  },
  {
    "codename": "THE FROST BLADE 71",
    "role": "Ghost Driver",
    "status": "ACTIVE",
    "location": "Dubai",
    "class": "Mythic"
  },
  {
    "codename": "THE EMBER LION 65",
    "role": "Negotiator",
    "status": "UNKNOWN",
    "location": "Naples",
    "class": "Ghost"
  },
  {
    "codename": "THE WOLF TIGER 1",
    "role": "Forger",
    "status": "ACTIVE",
    "location": "Istanbul",
    "class": "Architect"
  },
  {
    "codename": "THE WOLF VEIL 73",
    "role": "Cryptographer",
    "status": "ACTIVE",
    "location": "Reykjavik",
    "class": "Enforcer"
  },
  {
    "codename": "THE VIPER WARDEN 7",
    "role": "Tracker",
    "status": "UNKNOWN",
    "location": "Marrakesh",
    "class": "Mythic"
  },
  {
    "codename": "THE ONYX KING 41",
    "role": "Handler",
    "status": "UNKNOWN",
    "location": "New York",
    "class": "Ghost"
  },
  {
    "codename": "THE SPECTER FOX 13",
    "role": "Interrogator",
    "status": "UNKNOWN",
    "location": "New York",
    "class": "Tech"
  },
  {
    "codename": "THE NEBULA WARDEN 53",
    "role": "Scout",
    "status": "ACTIVE",
    "location": "New York",
    "class": "Architect"
  },
  {
    "codename": "THE SHADOW MOTH 30",
    "role": "Facilitator",
    "status": "ON CALL",
    "location": "Reykjavik",
    "class": "Tech"
  },
  {
    "codename": "THE FROST WARDEN 80",
    "role": "Fixer",
    "status": "UNKNOWN",
    "location": "Naples",
    "class": "Oracle"
  },
  {
    "codename": "THE JACKAL LION 57",
    "role": "Armorer",
    "status": "ON CALL",
    "location": "Dubai",
    "class": "Tech"
  },
  {
    "codename": "THE SPECTER WITCH 87",
    "role": "Armorer",
    "status": "ON CALL",
    "location": "Vienna",
    "class": "Ghost"
  },
  {
    "codename": "THE IVORY BLADE 14",
    "role": "Facilitator",
    "status": "ON CALL",
    "location": "Zurich",
    "class": "Tech"
  },
  {
    "codename": "THE DRIFTER MOTH 12",
    "role": "Cryptographer",
    "status": "UNKNOWN",
    "location": "Naples",
    "class": "Ghost"
  },
  {
    "codename": "THE WOLF CIPHER 68",
    "role": "Safehouse Keeper",
    "status": "UNKNOWN",
    "location": "Reykjavik",
    "class": "Handler"
  },
  {
    "codename": "THE NEBULA LION 93",
    "role": "Data Broker",
    "status": "ACTIVE",
    "location": "Seoul",
    "class": "Handler"
  },
  {
    "codename": "THE WOLF ECHO 76",
    "role": "Data Broker",
    "status": "ACTIVE",
    "location": "New York",
    "class": "Handler"
  },
  {
    "codename": "THE DRIFTER HUNTER 13",
    "role": "Cleaner",
    "status": "ON CALL",
    "location": "Marrakesh",
    "class": "Enforcer"
  },
  {
    "codename": "THE DRIFTER SAGE 83",
    "role": "Negotiator",
    "status": "ACTIVE",
    "location": "Osaka",
    "class": "Enforcer"
  },
  {
    "codename": "THE GHOST SAGE 82",
    "role": "Tracker",
    "status": "ACTIVE",
    "location": "Lisbon",
    "class": "Architect"
  },
  {
    "codename": "THE JACKAL SAGE 9",
    "role": "Forger",
    "status": "ACTIVE",
    "location": "Hong Kong",
    "class": "Tech"
  },
  {
    "codename": "THE GHOST BLADE 3",
    "role": "Data Broker",
    "status": "UNKNOWN",
    "location": "London",
    "class": "Tech"
  },
  {
    "codename": "THE EMBER FOX 63",
    "role": "Interrogator",
    "status": "ON CALL",
    "location": "Seoul",
    "class": "Enforcer"
  },
  {
    "codename": "THE DRIFTER FOX 33",
    "role": "Ghost Driver",
    "status": "UNKNOWN",
    "location": "Marrakesh",
    "class": "Enforcer"
  },
  {
    "codename": "THE WOLF RIDER 58",
    "role": "Armorer",
    "status": "UNKNOWN",
    "location": "Zurich",
    "class": "Mythic"
  },
  {
    "codename": "THE STEEL WARDEN 37",
    "role": "Handler",
    "status": "ACTIVE",
    "location": "Dubai",
    "class": "Handler"
  },
  {
    "codename": "THE FROST RIDER 74",
    "role": "Courier",
    "status": "ACTIVE",
    "location": "Prague",
    "class": "Oracle"
  },
  {
    "codename": "THE NEBULA WALKER 90",
    "role": "Handler",
    "status": "ON CALL",
    "location": "Dubai",
    "class": "Architect"
  },
  {
    "codename": "THE EMBER VEIL 69",
    "role": "Forger",
    "status": "ACTIVE",
    "location": "Naples",
    "class": "Ghost"
  },
  {
    "codename": "THE ONYX QUEEN 38",
    "role": "Data Broker",
    "status": "ACTIVE",
    "location": "Berlin",
    "class": "Enforcer"
  },
  {
    "codename": "THE SERPENT RIDER 40",
    "role": "Safehouse Keeper",
    "status": "ACTIVE",
    "location": "Budapest",
    "class": "Enforcer"
  },
  {
    "codename": "THE NEBULA HUNTER 93",
    "role": "Fixer",
    "status": "UNKNOWN",
    "location": "Vienna",
    "class": "Mythic"
  },
  {
    "codename": "THE NEBULA SAGE 84",
    "role": "Safehouse Keeper",
    "status": "UNKNOWN",
    "location": "Hong Kong",
    "class": "Architect"
  },
  {
    "codename": "THE OBSIDIAN TIGER 44",
    "role": "Ghost Driver",
    "status": "UNKNOWN",
    "location": "Casablanca",
    "class": "Tech"
  },
  {
    "codename": "THE ORACLE CIPHER 46",
    "role": "Ghost Driver",
    "status": "ACTIVE",
    "location": "Marrakesh",
    "class": "Architect"
  },
  {
    "codename": "THE ARCHITECT SAGE 34",
    "role": "Armorer",
    "status": "ACTIVE",
    "location": "Seoul",
    "class": "Architect"
  },
  {
    "codename": "THE RAVEN QUEEN 5",
    "role": "Armorer",
    "status": "ACTIVE",
    "location": "Cairo",
    "class": "Oracle"
  },
  {
    "codename": "THE RAVEN BLADE 3",
    "role": "Scout",
    "status": "ACTIVE",
    "location": "Cairo",
    "class": "Enforcer"
  },
  {
    "codename": "THE IVORY SPIDER 13",
    "role": "Data Broker",
    "status": "ON CALL",
    "location": "Casablanca",
    "class": "Enforcer"
  },
  {
    "codename": "THE ARCHITECT WARDEN 24",
    "role": "Armorer",
    "status": "UNKNOWN",
    "location": "Zurich",
    "class": "Mythic"
  },
  {
    "codename": "THE VIPER ECHO 87",
    "role": "Courier",
    "status": "ACTIVE",
    "location": "Berlin",
    "class": "Mythic"
  },
  {
    "codename": "THE SHADOW SAGE 15",
    "role": "Handler",
    "status": "ON CALL",
    "location": "Warsaw",
    "class": "Architect"
  },
  {
    "codename": "THE NEBULA HUNTER 44",
    "role": "Cleaner",
    "status": "ON CALL",
    "location": "Stockholm",
    "class": "Mythic"
  },
  {
    "codename": "THE CROW KING 72",
    "role": "Safehouse Keeper",
    "status": "ACTIVE",
    "location": "Warsaw",
    "class": "Architect"
  },
  {
    "codename": "THE FROST WITCH 34",
    "role": "Safehouse Keeper",
    "status": "UNKNOWN",
    "location": "Cairo",
    "class": "Handler"
  },
  {
    "codename": "THE STEEL CIPHER 18",
    "role": "Scout",
    "status": "ACTIVE",
    "location": "Prague",
    "class": "Handler"
  },
  {
    "codename": "THE RAVEN MOTH 80",
    "role": "Fixer",
    "status": "ACTIVE",
    "location": "Seoul",
    "class": "Architect"
  },
  {
    "codename": "THE EMBER FOX 99",
    "role": "Scout",
    "status": "UNKNOWN",
    "location": "Vienna",
    "class": "Architect"
  },
  {
    "codename": "THE RAVEN LARK 28",
    "role": "Ghost Driver",
    "status": "ON CALL",
    "location": "Prague",
    "class": "Handler"
  },
  {
    "codename": "THE ARCHITECT WARDEN 3",
    "role": "Tracker",
    "status": "ON CALL",
    "location": "Osaka",
    "class": "Tech"
  },
  {
    "codename": "THE ARCHITECT BLADE 69",
    "role": "Cryptographer",
    "status": "ON CALL",
    "location": "Vienna",
    "class": "Tech"
  },
  {
    "codename": "THE SHADOW WALKER 29",
    "role": "Facilitator",
    "status": "UNKNOWN",
    "location": "Prague",
    "class": "Oracle"
  },
  {
    "codename": "THE SPECTER KING 49",
    "role": "Forger",
    "status": "ON CALL",
    "location": "Marrakesh",
    "class": "Tech"
  },
  {
    "codename": "THE FROST HUNTER 65",
    "role": "Scout",
    "status": "ACTIVE",
    "location": "Stockholm",
    "class": "Tech"
  },
  {
    "codename": "THE SPECTER LION 24",
    "role": "Forger",
    "status": "UNKNOWN",
    "location": "Cairo",
    "class": "Handler"
  },
  {
    "codename": "THE SPECTER KING 29",
    "role": "Scout",
    "status": "ON CALL",
    "location": "Berlin",
    "class": "Ghost"
  },
  {
    "codename": "THE SPECTER QUEEN 19",
    "role": "Ghost Driver",
    "status": "ACTIVE",
    "location": "Dubai",
    "class": "Oracle"
  },
  {
    "codename": "THE PHOENIX SPIDER 69",
    "role": "Negotiator",
    "status": "ACTIVE",
    "location": "Budapest",
    "class": "Mythic"
  },
  {
    "codename": "THE FROST FOX 11",
    "role": "Courier",
    "status": "ACTIVE",
    "location": "Stockholm",
    "class": "Mythic"
  },
  {
    "codename": "THE IVORY WALKER 33",
    "role": "Facilitator",
    "status": "ON CALL",
    "location": "Istanbul",
    "class": "Oracle"
  },
  {
    "codename": "THE VIPER MOTH 33",
    "role": "Forger",
    "status": "UNKNOWN",
    "location": "Vienna",
    "class": "Tech"
  },
  {
    "codename": "THE GHOST HUNTER 37",
    "role": "Safehouse Keeper",
    "status": "ACTIVE",
    "location": "Berlin",
    "class": "Handler"
  },
  {
    "codename": "THE ONYX WITCH 94",
    "role": "Cleaner",
    "status": "ACTIVE",
    "location": "Berlin",
    "class": "Enforcer"
  },
  {
    "codename": "THE JACKAL SPIDER 5",
    "role": "Forger",
    "status": "ACTIVE",
    "location": "Vienna",
    "class": "Handler"
  },
  {
    "codename": "THE OBSIDIAN HAND 98",
    "role": "Facilitator",
    "status": "ON CALL",
    "location": "Cairo",
    "class": "Mythic"
  },
  {
    "codename": "THE NIGHT RIDER 44",
    "role": "Courier",
    "status": "ON CALL",
    "location": "New York",
    "class": "Tech"
  },
  {
    "codename": "THE SPECTER HUNTER 32",
    "role": "Fixer",
    "status": "ON CALL",
    "location": "Budapest",
    "class": "Handler"
  },
  {
    "codename": "THE IVORY VEIL 55",
    "role": "Tracker",
    "status": "ACTIVE",
    "location": "Reykjavik",
    "class": "Handler"
  },
  {
    "codename": "THE SHADOW ECHO 51",
    "role": "Negotiator",
    "status": "UNKNOWN",
    "location": "London",
    "class": "Ghost"
  },
  {
    "codename": "THE NEBULA TIGER 35",
    "role": "Data Broker",
    "status": "ON CALL",
    "location": "Berlin",
    "class": "Ghost"
  },
  {
    "codename": "THE SPECTER QUEEN 82",
    "role": "Cleaner",
    "status": "UNKNOWN",
    "location": "Seoul",
    "class": "Handler"
  },
  {
    "codename": "THE MIRAGE MOTH 79",
    "role": "Fixer",
    "status": "UNKNOWN",
    "location": "Istanbul",
    "class": "Enforcer"
  },
  {
    "codename": "THE ARCHITECT LION 44",
    "role": "Scout",
    "status": "ACTIVE",
    "location": "Budapest",
    "class": "Enforcer"
  },
  {
    "codename": "THE WOLF QUEEN 37",
    "role": "Cleaner",
    "status": "ON CALL",
    "location": "Cairo",
    "class": "Ghost"
  },
  {
    "codename": "THE SHADOW LARK 27",
    "role": "Cleaner",
    "status": "UNKNOWN",
    "location": "Marrakesh",
    "class": "Handler"
  },
  {
    "codename": "THE VIPER WARDEN 9",
    "role": "Scout",
    "status": "UNKNOWN",
    "location": "Hong Kong",
    "class": "Architect"
  },
  {
    "codename": "THE SHADOW SAGE 35",
    "role": "Negotiator",
    "status": "ACTIVE",
    "location": "Stockholm",
    "class": "Oracle"
  },
  {
    "codename": "THE ARCHITECT TIGER 53",
    "role": "Data Broker",
    "status": "ON CALL",
    "location": "Hong Kong",
    "class": "Handler"
  },
  {
    "codename": "THE STEEL KING 91",
    "role": "Facilitator",
    "status": "ACTIVE",
    "location": "Berlin",
    "class": "Enforcer"
  },
  {
    "codename": "THE NEBULA CIPHER 6",
    "role": "Courier",
    "status": "UNKNOWN",
    "location": "Marrakesh",
    "class": "Handler"
  },
  {
    "codename": "THE LOTUS KING 35",
    "role": "Ghost Driver",
    "status": "ON CALL",
    "location": "London",
    "class": "Oracle"
  },
  {
    "codename": "THE DRIFTER WARDEN 11",
    "role": "Negotiator",
    "status": "ACTIVE",
    "location": "Vienna",
    "class": "Handler"
  },
  {
    "codename": "THE RAVEN LION 5",
    "role": "Safehouse Keeper",
    "status": "ON CALL",
    "location": "Osaka",
    "class": "Enforcer"
  },
  {
    "codename": "THE IVORY TIGER 66",
    "role": "Interrogator",
    "status": "ACTIVE",
    "location": "Budapest",
    "class": "Ghost"
  },
  {
    "codename": "THE NIGHT SPIDER 76",
    "role": "Cryptographer",
    "status": "ON CALL",
    "location": "New York",
    "class": "Oracle"
  },
  {
    "codename": "THE ORACLE TIGER 81",
    "role": "Fixer",
    "status": "ON CALL",
    "location": "London",
    "class": "Enforcer"
  },
  {
    "codename": "THE WOLF QUEEN 5",
    "role": "Cleaner",
    "status": "ON CALL",
    "location": "Prague",
    "class": "Ghost"
  },
  {
    "codename": "THE NEBULA WALKER 10",
    "role": "Negotiator",
    "status": "UNKNOWN",
    "location": "Seoul",
    "class": "Mythic"
  },
  {
    "codename": "THE DRIFTER QUEEN 48",
    "role": "Cryptographer",
    "status": "UNKNOWN",
    "location": "London",
    "class": "Architect"
  },
  {
    "codename": "THE ARCHITECT TIGER 85",
    "role": "Cleaner",
    "status": "ON CALL",
    "location": "Naples",
    "class": "Mythic"
  },
  {
    "codename": "THE NIGHT HAND 65",
    "role": "Cleaner",
    "status": "ACTIVE",
    "location": "Budapest",
    "class": "Oracle"
  },
  {
    "codename": "THE ONYX WITCH 36",
    "role": "Cleaner",
    "status": "UNKNOWN",
    "location": "Naples",
    "class": "Ghost"
  },
  {
    "codename": "THE NIGHT HUNTER 33",
    "role": "Negotiator",
    "status": "ON CALL",
    "location": "New York",
    "class": "Enforcer"
  },
  {
    "codename": "THE JACKAL BLADE 35",
    "role": "Safehouse Keeper",
    "status": "UNKNOWN",
    "location": "Marrakesh",
    "class": "Oracle"
  },
  {
    "codename": "THE STEEL CIPHER 90",
    "role": "Facilitator",
    "status": "ACTIVE",
    "location": "Naples",
    "class": "Mythic"
  },
  {
    "codename": "THE SHADOW LARK 18",
    "role": "Scout",
    "status": "ACTIVE",
    "location": "Dubai",
    "class": "Enforcer"
  },
  {
    "codename": "THE NEBULA ECHO 88",
    "role": "Interrogator",
    "status": "ON CALL",
    "location": "Seoul",
    "class": "Tech"
  },
  {
    "codename": "THE JACKAL HUNTER 63",
    "role": "Cleaner",
    "status": "UNKNOWN",
    "location": "Budapest",
    "class": "Oracle"
  },
  {
    "codename": "THE FROST LION 28",
    "role": "Armorer",
    "status": "ACTIVE",
    "location": "Warsaw",
    "class": "Ghost"
  },
  {
    "codename": "THE RAVEN FOX 93",
    "role": "Cryptographer",
    "status": "ACTIVE",
    "location": "London",
    "class": "Ghost"
  },
  {
    "codename": "THE EMBER FOX 21",
    "role": "Cleaner",
    "status": "ON CALL",
    "location": "Berlin",
    "class": "Enforcer"
  },
  {
    "codename": "THE OBSIDIAN SPIDER 95",
    "role": "Courier",
    "status": "ACTIVE",
    "location": "Osaka",
    "class": "Oracle"
  },
  {
    "codename": "THE SPECTER WARDEN 49",
    "role": "Negotiator",
    "status": "ON CALL",
    "location": "New York",
    "class": "Tech"
  },
  {
    "codename": "THE LOTUS SAGE 90",
    "role": "Data Broker",
    "status": "ACTIVE",
    "location": "Istanbul",
    "class": "Handler"
  },
  {
    "codename": "THE ARCHITECT WITCH 29",
    "role": "Cryptographer",
    "status": "ACTIVE",
    "location": "Istanbul",
    "class": "Ghost"
  },
  {
    "codename": "THE EMBER TIGER 19",
    "role": "Handler",
    "status": "ON CALL",
    "location": "Vienna",
    "class": "Handler"
  },
  {
    "codename": "THE EMBER SAGE 73",
    "role": "Interrogator",
    "status": "ON CALL",
    "location": "New York",
    "class": "Architect"
  },
  {
    "codename": "THE EMBER BLADE 25",
    "role": "Negotiator",
    "status": "UNKNOWN",
    "location": "Prague",
    "class": "Ghost"
  },
  {
    "codename": "THE ARCHITECT TIGER 61",
    "role": "Fixer",
    "status": "ON CALL",
    "location": "Warsaw",
    "class": "Oracle"
  },
  {
    "codename": "THE SERPENT CIPHER 57",
    "role": "Ghost Driver",
    "status": "ACTIVE",
    "location": "Cairo",
    "class": "Tech"
  },
  {
    "codename": "THE FROST MOTH 95",
    "role": "Forger",
    "status": "ACTIVE",
    "location": "Hong Kong",
    "class": "Handler"
  },
  {
    "codename": "THE DRIFTER BLADE 68",
    "role": "Data Broker",
    "status": "ON CALL",
    "location": "Istanbul",
    "class": "Handler"
  },
  {
    "codename": "THE RAVEN HAND 72",
    "role": "Data Broker",
    "status": "UNKNOWN",
    "location": "Hong Kong",
    "class": "Mythic"
  },
  {
    "codename": "THE ORACLE WITCH 96",
    "role": "Cleaner",
    "status": "UNKNOWN",
    "location": "Istanbul",
    "class": "Architect"
  },
  {
    "codename": "THE ORACLE VEIL 16",
    "role": "Interrogator",
    "status": "UNKNOWN",
    "location": "London",
    "class": "Enforcer"
  },
  {
    "codename": "THE NEBULA LION 75",
    "role": "Armorer",
    "status": "ON CALL",
    "location": "Casablanca",
    "class": "Enforcer"
  },
  {
    "codename": "THE RAVEN HUNTER 55",
    "role": "Tracker",
    "status": "ACTIVE",
    "location": "Budapest",
    "class": "Tech"
  },
  {
    "codename": "THE EMBER WITCH 4",
    "role": "Forger",
    "status": "ON CALL",
    "location": "Marrakesh",
    "class": "Enforcer"
  },
  {
    "codename": "THE OBSIDIAN MOTH 5",
    "role": "Scout",
    "status": "UNKNOWN",
    "location": "Dubai",
    "class": "Enforcer"
  },
  {
    "codename": "THE VIPER SPIDER 70",
    "role": "Scout",
    "status": "ACTIVE",
    "location": "Naples",
    "class": "Handler"
  },
  {
    "codename": "THE NEBULA WITCH 89",
    "role": "Scout",
    "status": "UNKNOWN",
    "location": "Dubai",
    "class": "Handler"
  },
  {
    "codename": "THE JACKAL ECHO 97",
    "role": "Forger",
    "status": "UNKNOWN",
    "location": "Budapest",
    "class": "Enforcer"
  },
  {
    "codename": "THE EMBER MOTH 29",
    "role": "Courier",
    "status": "ACTIVE",
    "location": "Marrakesh",
    "class": "Mythic"
  },
  {
    "codename": "THE SPECTER HUNTER 70",
    "role": "Data Broker",
    "status": "ACTIVE",
    "location": "Casablanca",
    "class": "Ghost"
  },
  {
    "codename": "THE RAVEN BLADE 13",
    "role": "Cleaner",
    "status": "ON CALL",
    "location": "Marrakesh",
    "class": "Ghost"
  },
  {
    "codename": "THE RAVEN CIPHER 30",
    "role": "Safehouse Keeper",
    "status": "ACTIVE",
    "location": "Stockholm",
    "class": "Mythic"
  },
  {
    "codename": "THE STEEL WARDEN 80",
    "role": "Ghost Driver",
    "status": "ACTIVE",
    "location": "Prague",
    "class": "Architect"
  },
  {
    "codename": "THE SHADOW KING 76",
    "role": "Armorer",
    "status": "ON CALL",
    "location": "Warsaw",
    "class": "Mythic"
  },
  {
    "codename": "THE EMBER MOTH 76",
    "role": "Negotiator",
    "status": "ON CALL",
    "location": "Lisbon",
    "class": "Ghost"
  },
  {
    "codename": "THE MIRAGE SAGE 92",
    "role": "Scout",
    "status": "UNKNOWN",
    "location": "Berlin",
    "class": "Mythic"
  },
  {
    "codename": "THE MIRAGE SPIDER 59",
    "role": "Armorer",
    "status": "ON CALL",
    "location": "Cairo",
    "class": "Ghost"
  },
  {
    "codename": "THE RAVEN BLADE 7",
    "role": "Negotiator",
    "status": "ON CALL",
    "location": "Hong Kong",
    "class": "Mythic"
  },
  {
    "codename": "THE IVORY WITCH 33",
    "role": "Negotiator",
    "status": "UNKNOWN",
    "location": "Marrakesh",
    "class": "Mythic"
  },
  {
    "codename": "THE OBSIDIAN SAGE 16",
    "role": "Tracker",
    "status": "ACTIVE",
    "location": "Cairo",
    "class": "Enforcer"
  },
  {
    "codename": "THE ORACLE CIPHER 72",
    "role": "Cleaner",
    "status": "UNKNOWN",
    "location": "Reykjavik",
    "class": "Oracle"
  },
  {
    "codename": "THE NIGHT FOX 74",
    "role": "Tracker",
    "status": "ACTIVE",
    "location": "Seoul",
    "class": "Enforcer"
  },
  {
    "codename": "THE OBSIDIAN WARDEN 45",
    "role": "Cryptographer",
    "status": "UNKNOWN",
    "location": "Vienna",
    "class": "Mythic"
  },
  {
    "codename": "THE LOTUS HAND 6",
    "role": "Cleaner",
    "status": "ACTIVE",
    "location": "Hong Kong",
    "class": "Tech"
  },
  {
    "codename": "THE VIPER RIDER 43",
    "role": "Scout",
    "status": "ON CALL",
    "location": "Stockholm",
    "class": "Ghost"
  },
  {
    "codename": "THE LOTUS LARK 89",
    "role": "Fixer",
    "status": "ACTIVE",
    "location": "Vienna",
    "class": "Architect"
  },
  {
    "codename": "THE ONYX CIPHER 59",
    "role": "Handler",
    "status": "ACTIVE",
    "location": "Lisbon",
    "class": "Handler"
  },
  {
    "codename": "THE WOLF BLADE 9",
    "role": "Fixer",
    "status": "ON CALL",
    "location": "Seoul",
    "class": "Mythic"
  },
  {
    "codename": "THE NEBULA CIPHER 4",
    "role": "Courier",
    "status": "ON CALL",
    "location": "Zurich",
    "class": "Ghost"
  },
  {
    "codename": "THE LOTUS ECHO 1",
    "role": "Scout",
    "status": "ACTIVE",
    "location": "Stockholm",
    "class": "Enforcer"
  },
  {
    "codename": "THE RAVEN HUNTER 20",
    "role": "Tracker",
    "status": "ACTIVE",
    "location": "Osaka",
    "class": "Oracle"
  },
  {
    "codename": "THE RAVEN SPIDER 4",
    "role": "Cryptographer",
    "status": "UNKNOWN",
    "location": "Dubai",
    "class": "Architect"
  },
  {
    "codename": "THE CROW SAGE 75",
    "role": "Cleaner",
    "status": "ACTIVE",
    "location": "Marrakesh",
    "class": "Tech"
  },
  {
    "codename": "THE SPECTER HUNTER 42",
    "role": "Fixer",
    "status": "ACTIVE",
    "location": "Zurich",
    "class": "Architect"
  },
  {
    "codename": "THE VIPER WITCH 62",
    "role": "Negotiator",
    "status": "ON CALL",
    "location": "Naples",
    "class": "Tech"
  },
  {
    "codename": "THE MIRAGE HAND 16",
    "role": "Forger",
    "status": "ACTIVE",
    "location": "Zurich",
    "class": "Mythic"
  },
  {
    "codename": "THE LOTUS TIGER 32",
    "role": "Cryptographer",
    "status": "ON CALL",
    "location": "Lisbon",
    "class": "Architect"
  },
  {
    "codename": "THE SHADOW LARK 77",
    "role": "Safehouse Keeper",
    "status": "ACTIVE",
    "location": "Zurich",
    "class": "Ghost"
  },
  {
    "codename": "THE NIGHT WARDEN 9",
    "role": "Facilitator",
    "status": "ON CALL",
    "location": "Casablanca",
    "class": "Tech"
  },
  {
    "codename": "THE SERPENT WARDEN 68",
    "role": "Armorer",
    "status": "ACTIVE",
    "location": "Seoul",
    "class": "Enforcer"
  },
  {
    "codename": "THE RAVEN TIGER 33",
    "role": "Cleaner",
    "status": "ON CALL",
    "location": "Cairo",
    "class": "Handler"
  },
  {
    "codename": "THE EMBER LION 95",
    "role": "Safehouse Keeper",
    "status": "UNKNOWN",
    "location": "Reykjavik",
    "class": "Ghost"
  },
  {
    "codename": "THE LOTUS LION 36",
    "role": "Handler",
    "status": "ACTIVE",
    "location": "Istanbul",
    "class": "Ghost"
  },
  {
    "codename": "THE OBSIDIAN HUNTER 80",
    "role": "Cryptographer",
    "status": "ACTIVE",
    "location": "Hong Kong",
    "class": "Oracle"
  },
  {
    "codename": "THE DRIFTER WITCH 77",
    "role": "Armorer",
    "status": "ACTIVE",
    "location": "Dubai",
    "class": "Oracle"
  },
  {
    "codename": "THE IVORY LARK 6",
    "role": "Tracker",
    "status": "UNKNOWN",
    "location": "Cairo",
    "class": "Ghost"
  },
  {
    "codename": "THE LOTUS LION 11",
    "role": "Data Broker",
    "status": "UNKNOWN",
    "location": "Stockholm",
    "class": "Ghost"
  },
  {
    "codename": "THE NEBULA WARDEN 83",
    "role": "Safehouse Keeper",
    "status": "ACTIVE",
    "location": "New York",
    "class": "Tech"
  },
  {
    "codename": "THE ARCHITECT WARDEN 84",
    "role": "Ghost Driver",
    "status": "ON CALL",
    "location": "Vienna",
    "class": "Oracle"
  },
  {
    "codename": "THE STEEL SAGE 83",
    "role": "Negotiator",
    "status": "UNKNOWN",
    "location": "Zurich",
    "class": "Enforcer"
  },
  {
    "codename": "THE DRIFTER WALKER 18",
    "role": "Data Broker",
    "status": "ON CALL",
    "location": "Casablanca",
    "class": "Ghost"
  },
  {
    "codename": "THE NEBULA QUEEN 19",
    "role": "Data Broker",
    "status": "ON CALL",
    "location": "Casablanca",
    "class": "Mythic"
  },
  {
    "codename": "THE EMBER CIPHER 11",
    "role": "Negotiator",
    "status": "UNKNOWN",
    "location": "Dubai",
    "class": "Architect"
  },
  {
    "codename": "THE SPECTER FOX 70",
    "role": "Interrogator",
    "status": "ON CALL",
    "location": "Naples",
    "class": "Enforcer"
  },
  {
    "codename": "THE LOTUS FOX 45",
    "role": "Armorer",
    "status": "ACTIVE",
    "location": "Cairo",
    "class": "Handler"
  },
  {
    "codename": "THE PHOENIX WITCH 4",
    "role": "Safehouse Keeper",
    "status": "ON CALL",
    "location": "Warsaw",
    "class": "Tech"
  },
  {
    "codename": "THE CROW KING 74",
    "role": "Safehouse Keeper",
    "status": "ON CALL",
    "location": "Osaka",
    "class": "Handler"
  },
  {
    "codename": "THE LOTUS WALKER 80",
    "role": "Courier",
    "status": "ACTIVE",
    "location": "Reykjavik",
    "class": "Oracle"
  },
  {
    "codename": "THE DRIFTER SAGE 84",
    "role": "Fixer",
    "status": "UNKNOWN",
    "location": "Seoul",
    "class": "Tech"
  },
  {
    "codename": "THE EMBER SPIDER 10",
    "role": "Armorer",
    "status": "ACTIVE",
    "location": "London",
    "class": "Oracle"
  },
  {
    "codename": "THE RAVEN ECHO 88",
    "role": "Interrogator",
    "status": "ACTIVE",
    "location": "Cairo",
    "class": "Ghost"
  },
  {
    "codename": "THE PHOENIX WARDEN 51",
    "role": "Forger",
    "status": "ON CALL",
    "location": "Dubai",
    "class": "Ghost"
  },
  {
    "codename": "THE LOTUS RIDER 13",
    "role": "Courier",
    "status": "ACTIVE",
    "location": "London",
    "class": "Handler"
  },
  {
    "codename": "THE SPECTER HUNTER 31",
    "role": "Data Broker",
    "status": "ACTIVE",
    "location": "London",
    "class": "Tech"
  },
  {
    "codename": "THE ORACLE TIGER 59",
    "role": "Safehouse Keeper",
    "status": "ACTIVE",
    "location": "Hong Kong",
    "class": "Mythic"
  },
  {
    "codename": "THE WOLF VEIL 33",
    "role": "Facilitator",
    "status": "ACTIVE",
    "location": "Osaka",
    "class": "Mythic"
  },
  {
    "codename": "THE STEEL CIPHER 82",
    "role": "Armorer",
    "status": "ON CALL",
    "location": "Osaka",
    "class": "Architect"
  },
  {
    "codename": "THE IVORY SAGE 98",
    "role": "Facilitator",
    "status": "ACTIVE",
    "location": "Osaka",
    "class": "Tech"
  },
  {
    "codename": "THE OBSIDIAN VEIL 51",
    "role": "Interrogator",
    "status": "ACTIVE",
    "location": "Budapest",
    "class": "Architect"
  },
  {
    "codename": "THE VIPER BLADE 82",
    "role": "Cryptographer",
    "status": "UNKNOWN",
    "location": "Casablanca",
    "class": "Mythic"
  },
  {
    "codename": "THE CROW CIPHER 5",
    "role": "Ghost Driver",
    "status": "ON CALL",
    "location": "Berlin",
    "class": "Handler"
  },
  {
    "codename": "THE VIPER WALKER 99",
    "role": "Forger",
    "status": "ON CALL",
    "location": "Vienna",
    "class": "Ghost"
  },
  {
    "codename": "THE STEEL KING 25",
    "role": "Handler",
    "status": "ON CALL",
    "location": "Hong Kong",
    "class": "Handler"
  },
  {
    "codename": "THE STEEL VEIL 8",
    "role": "Safehouse Keeper",
    "status": "ON CALL",
    "location": "Prague",
    "class": "Enforcer"
  },
  {
    "codename": "THE EMBER TIGER 13",
    "role": "Cryptographer",
    "status": "ACTIVE",
    "location": "Seoul",
    "class": "Oracle"
  },
  {
    "codename": "THE WOLF ECHO 23",
    "role": "Armorer",
    "status": "ON CALL",
    "location": "Zurich",
    "class": "Architect"
  },
  {
    "codename": "THE WOLF TIGER 61",
    "role": "Forger",
    "status": "UNKNOWN",
    "location": "Prague",
    "class": "Oracle"
  },
  {
    "codename": "THE NEBULA LARK 30",
    "role": "Ghost Driver",
    "status": "ON CALL",
    "location": "Lisbon",
    "class": "Mythic"
  },
  {
    "codename": "THE EMBER ECHO 91",
    "role": "Armorer",
    "status": "ON CALL",
    "location": "Budapest",
    "class": "Mythic"
  },
  {
    "codename": "THE WOLF TIGER 6",
    "role": "Safehouse Keeper",
    "status": "ON CALL",
    "location": "Berlin",
    "class": "Mythic"
  },
  {
    "codename": "THE MIRAGE WARDEN 64",
    "role": "Data Broker",
    "status": "ON CALL",
    "location": "Zurich",
    "class": "Handler"
  },
  {
    "codename": "THE JACKAL ECHO 47",
    "role": "Courier",
    "status": "UNKNOWN",
    "location": "Naples",
    "class": "Handler"
  },
  {
    "codename": "THE ARCHITECT VEIL 55",
    "role": "Safehouse Keeper",
    "status": "ON CALL",
    "location": "Dubai",
    "class": "Ghost"
  },
  {
    "codename": "THE MIRAGE SAGE 27",
    "role": "Tracker",
    "status": "ACTIVE",
    "location": "Warsaw",
    "class": "Handler"
  },
  {
    "codename": "THE STEEL QUEEN 91",
    "role": "Cryptographer",
    "status": "UNKNOWN",
    "location": "Berlin",
    "class": "Architect"
  },
  {
    "codename": "THE EMBER QUEEN 1",
    "role": "Forger",
    "status": "ACTIVE",
    "location": "Istanbul",
    "class": "Tech"
  },
  {
    "codename": "THE NIGHT TIGER 76",
    "role": "Interrogator",
    "status": "UNKNOWN",
    "location": "Istanbul",
    "class": "Mythic"
  },
  {
    "codename": "THE ARCHITECT ECHO 21",
    "role": "Fixer",
    "status": "UNKNOWN",
    "location": "Naples",
    "class": "Ghost"
  },
  {
    "codename": "THE ARCHITECT SAGE 96",
    "role": "Tracker",
    "status": "ON CALL",
    "location": "Prague",
    "class": "Handler"
  },
  {
    "codename": "THE CROW HUNTER 64",
    "role": "Tracker",
    "status": "ON CALL",
    "location": "Marrakesh",
    "class": "Oracle"
  },
  {
    "codename": "THE JACKAL QUEEN 49",
    "role": "Data Broker",
    "status": "ON CALL",
    "location": "Osaka",
    "class": "Tech"
  },
  {
    "codename": "THE EMBER FOX 55",
    "role": "Courier",
    "status": "ON CALL",
    "location": "Istanbul",
    "class": "Tech"
  },
  {
    "codename": "THE SERPENT KING 22",
    "role": "Negotiator",
    "status": "ON CALL",
    "location": "Warsaw",
    "class": "Oracle"
  },
  {
    "codename": "THE IVORY WALKER 48",
    "role": "Forger",
    "status": "ACTIVE",
    "location": "Warsaw",
    "class": "Handler"
  },
  {
    "codename": "THE JACKAL MOTH 26",
    "role": "Cryptographer",
    "status": "ON CALL",
    "location": "Naples",
    "class": "Oracle"
  },
  {
    "codename": "THE EMBER KING 6",
    "role": "Ghost Driver",
    "status": "ON CALL",
    "location": "Vienna",
    "class": "Oracle"
  },
  {
    "codename": "THE GHOST KING 6",
    "role": "Safehouse Keeper",
    "status": "UNKNOWN",
    "location": "Naples",
    "class": "Oracle"
  },
  {
    "codename": "THE SHADOW WALKER 56",
    "role": "Courier",
    "status": "ON CALL",
    "location": "Stockholm",
    "class": "Ghost"
  },
  {
    "codename": "THE IVORY VEIL 61",
    "role": "Negotiator",
    "status": "ACTIVE",
    "location": "Osaka",
    "class": "Handler"
  },
  {
    "codename": "THE NIGHT WITCH 8",
    "role": "Cleaner",
    "status": "UNKNOWN",
    "location": "Hong Kong",
    "class": "Architect"
  },
  {
    "codename": "THE WOLF LION 30",
    "role": "Armorer",
    "status": "UNKNOWN",
    "location": "Zurich",
    "class": "Handler"
  },
  {
    "codename": "THE ARCHITECT WALKER 32",
    "role": "Negotiator",
    "status": "UNKNOWN",
    "location": "Lisbon",
    "class": "Enforcer"
  },
  {
    "codename": "THE VIPER VEIL 51",
    "role": "Cleaner",
    "status": "ACTIVE",
    "location": "London",
    "class": "Enforcer"
  },
  {
    "codename": "THE JACKAL SAGE 57",
    "role": "Forger",
    "status": "ACTIVE",
    "location": "New York",
    "class": "Mythic"
  },
  {
    "codename": "THE OBSIDIAN KING 41",
    "role": "Fixer",
    "status": "UNKNOWN",
    "location": "Lisbon",
    "class": "Tech"
  },
  {
    "codename": "THE FROST LARK 96",
    "role": "Fixer",
    "status": "ON CALL",
    "location": "London",
    "class": "Mythic"
  },
  {
    "codename": "THE DRIFTER ECHO 62",
    "role": "Facilitator",
    "status": "ON CALL",
    "location": "Hong Kong",
    "class": "Mythic"
  },
  {
    "codename": "THE EMBER SAGE 20",
    "role": "Armorer",
    "status": "UNKNOWN",
    "location": "Naples",
    "class": "Handler"
  },
  {
    "codename": "THE DRIFTER FOX 94",
    "role": "Ghost Driver",
    "status": "ON CALL",
    "location": "Zurich",
    "class": "Ghost"
  },
  {
    "codename": "THE ONYX SAGE 27",
    "role": "Ghost Driver",
    "status": "ON CALL",
    "location": "Istanbul",
    "class": "Tech"
  },
  {
    "codename": "THE OBSIDIAN VEIL 61",
    "role": "Handler",
    "status": "ON CALL",
    "location": "London",
    "class": "Tech"
  },
  {
    "codename": "THE NEBULA CIPHER 1",
    "role": "Armorer",
    "status": "ON CALL",
    "location": "Hong Kong",
    "class": "Ghost"
  },
  {
    "codename": "THE SHADOW TIGER 22",
    "role": "Cryptographer",
    "status": "ACTIVE",
    "location": "Reykjavik",
    "class": "Mythic"
  },
  {
    "codename": "THE NIGHT LARK 90",
    "role": "Safehouse Keeper",
    "status": "UNKNOWN",
    "location": "Osaka",
    "class": "Oracle"
  },
  {
    "codename": "THE WOLF BLADE 14",
    "role": "Interrogator",
    "status": "ACTIVE",
    "location": "Marrakesh",
    "class": "Architect"
  },
  {
    "codename": "THE SHADOW WITCH 10",
    "role": "Forger",
    "status": "ACTIVE",
    "location": "Vienna",
    "class": "Tech"
  },
  {
    "codename": "THE JACKAL TIGER 10",
    "role": "Armorer",
    "status": "ACTIVE",
    "location": "Stockholm",
    "class": "Handler"
  },
  {
    "codename": "THE STEEL ECHO 54",
    "role": "Cryptographer",
    "status": "UNKNOWN",
    "location": "Seoul",
    "class": "Oracle"
  },
  {
    "codename": "THE PHOENIX SPIDER 73",
    "role": "Courier",
    "status": "ON CALL",
    "location": "Cairo",
    "class": "Mythic"
  },
  {
    "codename": "THE EMBER LION 45",
    "role": "Data Broker",
    "status": "UNKNOWN",
    "location": "Hong Kong",
    "class": "Oracle"
  },
  {
    "codename": "THE NEBULA LION 79",
    "role": "Data Broker",
    "status": "ACTIVE",
    "location": "Vienna",
    "class": "Oracle"
  },
  {
    "codename": "THE CROW ECHO 42",
    "role": "Facilitator",
    "status": "UNKNOWN",
    "location": "Zurich",
    "class": "Ghost"
  },
  {
    "codename": "THE SHADOW VEIL 31",
    "role": "Negotiator",
    "status": "ON CALL",
    "location": "Naples",
    "class": "Tech"
  },
  {
    "codename": "THE DRIFTER VEIL 73",
    "role": "Fixer",
    "status": "ACTIVE",
    "location": "Stockholm",
    "class": "Handler"
  },
  {
    "codename": "THE ARCHITECT KING 73",
    "role": "Armorer",
    "status": "ACTIVE",
    "location": "Hong Kong",
    "class": "Ghost"
  },
  {
    "codename": "THE VIPER WALKER 97",
    "role": "Cleaner",
    "status": "ON CALL",
    "location": "Stockholm",
    "class": "Enforcer"
  },
  {
    "codename": "THE OBSIDIAN LION 64",
    "role": "Handler",
    "status": "ACTIVE",
    "location": "Vienna",
    "class": "Handler"
  },
  {
    "codename": "THE SERPENT SPIDER 3",
    "role": "Data Broker",
    "status": "ACTIVE",
    "location": "Vienna",
    "class": "Tech"
  },
  {
    "codename": "THE DRIFTER HAND 1",
    "role": "Cryptographer",
    "status": "UNKNOWN",
    "location": "Casablanca",
    "class": "Tech"
  },
  {
    "codename": "THE ONYX WARDEN 56",
    "role": "Scout",
    "status": "UNKNOWN",
    "location": "Istanbul",
    "class": "Mythic"
  },
  {
    "codename": "THE ORACLE WARDEN 86",
    "role": "Negotiator",
    "status": "UNKNOWN",
    "location": "Warsaw",
    "class": "Ghost"
  },
  {
    "codename": "THE SHADOW WARDEN 52",
    "role": "Courier",
    "status": "UNKNOWN",
    "location": "Vienna",
    "class": "Architect"
  },
  {
    "codename": "THE SERPENT ECHO 75",
    "role": "Cleaner",
    "status": "ON CALL",
    "location": "Seoul",
    "class": "Mythic"
  },
  {
    "codename": "THE SHADOW RIDER 31",
    "role": "Forger",
    "status": "ON CALL",
    "location": "Marrakesh",
    "class": "Enforcer"
  },
  {
    "codename": "THE NIGHT TIGER 11",
    "role": "Scout",
    "status": "ACTIVE",
    "location": "Stockholm",
    "class": "Handler"
  },
  {
    "codename": "THE IVORY SPIDER 97",
    "role": "Facilitator",
    "status": "UNKNOWN",
    "location": "Dubai",
    "class": "Tech"
  },
  {
    "codename": "THE LOTUS VEIL 60",
    "role": "Fixer",
    "status": "UNKNOWN",
    "location": "Istanbul",
    "class": "Enforcer"
  },
  {
    "codename": "THE MIRAGE HUNTER 32",
    "role": "Interrogator",
    "status": "ON CALL",
    "location": "Zurich",
    "class": "Oracle"
  },
  {
    "codename": "THE RAVEN BLADE 12",
    "role": "Data Broker",
    "status": "ON CALL",
    "location": "Vienna",
    "class": "Architect"
  },
  {
    "codename": "THE NEBULA HUNTER 37",
    "role": "Safehouse Keeper",
    "status": "ON CALL",
    "location": "Budapest",
    "class": "Mythic"
  },
  {
    "codename": "THE GHOST WITCH 68",
    "role": "Negotiator",
    "status": "ON CALL",
    "location": "Zurich",
    "class": "Enforcer"
  },
  {
    "codename": "THE DRIFTER RIDER 15",
    "role": "Negotiator",
    "status": "ON CALL",
    "location": "Casablanca",
    "class": "Oracle"
  },
  {
    "codename": "THE CROW TIGER 3",
    "role": "Scout",
    "status": "UNKNOWN",
    "location": "Naples",
    "class": "Architect"
  },
  {
    "codename": "THE STEEL RIDER 29",
    "role": "Scout",
    "status": "ACTIVE",
    "location": "Lisbon",
    "class": "Handler"
  },
  {
    "codename": "THE PHOENIX KING 28",
    "role": "Cryptographer",
    "status": "ON CALL",
    "location": "Marrakesh",
    "class": "Ghost"
  },
  {
    "codename": "THE WOLF LION 14",
    "role": "Safehouse Keeper",
    "status": "ON CALL",
    "location": "Berlin",
    "class": "Oracle"
  },
  {
    "codename": "THE IVORY WALKER 7",
    "role": "Facilitator",
    "status": "ACTIVE",
    "location": "Vienna",
    "class": "Oracle"
  },
  {
    "codename": "THE JACKAL TIGER 52",
    "role": "Interrogator",
    "status": "ACTIVE",
    "location": "Cairo",
    "class": "Handler"
  },
  {
    "codename": "THE GHOST QUEEN 8",
    "role": "Interrogator",
    "status": "ACTIVE",
    "location": "Reykjavik",
    "class": "Enforcer"
  },
  {
    "codename": "THE ORACLE RIDER 89",
    "role": "Tracker",
    "status": "ON CALL",
    "location": "Lisbon",
    "class": "Architect"
  },
  {
    "codename": "THE SPECTER ECHO 4",
    "role": "Ghost Driver",
    "status": "UNKNOWN",
    "location": "Lisbon",
    "class": "Oracle"
  },
  {
    "codename": "THE GHOST KING 30",
    "role": "Forger",
    "status": "UNKNOWN",
    "location": "Istanbul",
    "class": "Architect"
  },
  {
    "codename": "THE STEEL LION 15",
    "role": "Handler",
    "status": "UNKNOWN",
    "location": "Zurich",
    "class": "Mythic"
  },
  {
    "codename": "THE STEEL RIDER 54",
    "role": "Cleaner",
    "status": "ON CALL",
    "location": "New York",
    "class": "Enforcer"
  },
  {
    "codename": "THE FROST TIGER 12",
    "role": "Fixer",
    "status": "ACTIVE",
    "location": "London",
    "class": "Mythic"
  },
  {
    "codename": "THE WOLF MOTH 46",
    "role": "Negotiator",
    "status": "UNKNOWN",
    "location": "Istanbul",
    "class": "Ghost"
  },
  {
    "codename": "THE JACKAL LARK 8",
    "role": "Fixer",
    "status": "ON CALL",
    "location": "Stockholm",
    "class": "Mythic"
  },
  {
    "codename": "THE WOLF LION 83",
    "role": "Cryptographer",
    "status": "ON CALL",
    "location": "Istanbul",
    "class": "Oracle"
  },
  {
    "codename": "THE SPECTER ECHO 1",
    "role": "Scout",
    "status": "ACTIVE",
    "location": "Budapest",
    "class": "Tech"
  },
  {
    "codename": "THE DRIFTER WALKER 46",
    "role": "Safehouse Keeper",
    "status": "ON CALL",
    "location": "Cairo",
    "class": "Enforcer"
  },
  {
    "codename": "THE ARCHITECT MOTH 65",
    "role": "Tracker",
    "status": "UNKNOWN",
    "location": "Vienna",
    "class": "Architect"
  },
  {
    "codename": "THE NIGHT RIDER 36",
    "role": "Handler",
    "status": "UNKNOWN",
    "location": "Osaka",
    "class": "Oracle"
  },
  {
    "codename": "THE DRIFTER KING 15",
    "role": "Handler",
    "status": "ON CALL",
    "location": "Casablanca",
    "class": "Tech"
  },
  {
    "codename": "THE JACKAL VEIL 27",
    "role": "Interrogator",
    "status": "UNKNOWN",
    "location": "Lisbon",
    "class": "Mythic"
  },
  {
    "codename": "THE ORACLE BLADE 22",
    "role": "Armorer",
    "status": "ON CALL",
    "location": "Seoul",
    "class": "Handler"
  },
  {
    "codename": "THE OBSIDIAN RIDER 9",
    "role": "Tracker",
    "status": "ON CALL",
    "location": "Seoul",
    "class": "Handler"
  },
  {
    "codename": "THE ORACLE FOX 19",
    "role": "Scout",
    "status": "UNKNOWN",
    "location": "Vienna",
    "class": "Enforcer"
  },
  {
    "codename": "THE CROW HAND 47",
    "role": "Data Broker",
    "status": "ON CALL",
    "location": "Zurich",
    "class": "Oracle"
  },
  {
    "codename": "THE DRIFTER WITCH 95",
    "role": "Scout",
    "status": "ON CALL",
    "location": "Seoul",
    "class": "Architect"
  },
  {
    "codename": "THE LOTUS FOX 8",
    "role": "Handler",
    "status": "ACTIVE",
    "location": "Naples",
    "class": "Architect"
  },
  {
    "codename": "THE MIRAGE QUEEN 83",
    "role": "Negotiator",
    "status": "UNKNOWN",
    "location": "Vienna",
    "class": "Ghost"
  },
  {
    "codename": "THE SHADOW LARK 95",
    "role": "Safehouse Keeper",
    "status": "UNKNOWN",
    "location": "Istanbul",
    "class": "Oracle"
  },
  {
    "codename": "THE SERPENT SPIDER 90",
    "role": "Ghost Driver",
    "status": "ACTIVE",
    "location": "Prague",
    "class": "Tech"
  },
  {
    "codename": "THE STEEL WALKER 79",
    "role": "Ghost Driver",
    "status": "UNKNOWN",
    "location": "Berlin",
    "class": "Oracle"
  },
  {
    "codename": "THE IVORY FOX 85",
    "role": "Tracker",
    "status": "ACTIVE",
    "location": "Reykjavik",
    "class": "Ghost"
  },
  {
    "codename": "THE GHOST HAND 31",
    "role": "Data Broker",
    "status": "ACTIVE",
    "location": "Berlin",
    "class": "Enforcer"
  },
  {
    "codename": "THE MIRAGE HUNTER 66",
    "role": "Facilitator",
    "status": "ON CALL",
    "location": "Istanbul",
    "class": "Mythic"
  },
  {
    "codename": "THE GHOST FOX 79",
    "role": "Data Broker",
    "status": "UNKNOWN",
    "location": "Berlin",
    "class": "Oracle"
  },
  {
    "codename": "THE EMBER SPIDER 93",
    "role": "Cryptographer",
    "status": "ACTIVE",
    "location": "Berlin",
    "class": "Enforcer"
  },
  {
    "codename": "THE NIGHT WITCH 19",
    "role": "Safehouse Keeper",
    "status": "ACTIVE",
    "location": "Budapest",
    "class": "Tech"
  },
  {
    "codename": "THE DRIFTER FOX 16",
    "role": "Tracker",
    "status": "ACTIVE",
    "location": "Cairo",
    "class": "Ghost"
  },
  {
    "codename": "THE VIPER FOX 32",
    "role": "Negotiator",
    "status": "UNKNOWN",
    "location": "Budapest",
    "class": "Mythic"
  },
  {
    "codename": "THE ARCHITECT BLADE 45",
    "role": "Facilitator",
    "status": "ON CALL",
    "location": "Casablanca",
    "class": "Architect"
  },
  {
    "codename": "THE SHADOW QUEEN 41",
    "role": "Negotiator",
    "status": "UNKNOWN",
    "location": "Naples",
    "class": "Enforcer"
  },
  {
    "codename": "THE STEEL TIGER 47",
    "role": "Negotiator",
    "status": "ON CALL",
    "location": "Naples",
    "class": "Architect"
  },
  {
    "codename": "THE ORACLE LARK 84",
    "role": "Data Broker",
    "status": "ON CALL",
    "location": "Dubai",
    "class": "Tech"
  },
  {
    "codename": "THE SPECTER MOTH 84",
    "role": "Cryptographer",
    "status": "UNKNOWN",
    "location": "Prague",
    "class": "Handler"
  },
  {
    "codename": "THE OBSIDIAN MOTH 12",
    "role": "Facilitator",
    "status": "UNKNOWN",
    "location": "Prague",
    "class": "Mythic"
  },
  {
    "codename": "THE IVORY SPIDER 57",
    "role": "Data Broker",
    "status": "UNKNOWN",
    "location": "Zurich",
    "class": "Enforcer"
  },
  {
    "codename": "THE SERPENT WARDEN 96",
    "role": "Cleaner",
    "status": "ON CALL",
    "location": "Prague",
    "class": "Oracle"
  }
];

  const blacklist = [
  {
    "codename": "THE JACKAL MOTH 96",
    "threat": "MEDIUM",
    "lastSeen": "New York transit hub",
    "status": "MONITORED",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE DRIFTER WARDEN 64",
    "threat": "HIGH",
    "lastSeen": "Casablanca transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE SPECTER WARDEN 90",
    "threat": "CRITICAL",
    "lastSeen": "Lisbon transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE NIGHT FOX 97",
    "threat": "EXTREME",
    "lastSeen": "Prague transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE DRIFTER HUNTER 64",
    "threat": "EXTREME",
    "lastSeen": "Budapest transit hub",
    "status": "MONITORED",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE NEBULA BLADE 69",
    "threat": "EXTREME",
    "lastSeen": "Dubai transit hub",
    "status": "MONITORED",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE SPECTER HAND 68",
    "threat": "HIGH",
    "lastSeen": "Casablanca transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE ORACLE RIDER 1",
    "threat": "CRITICAL",
    "lastSeen": "Hong Kong transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE ORACLE RIDER 45",
    "threat": "HIGH",
    "lastSeen": "Stockholm transit hub",
    "status": "MONITORED",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE JACKAL QUEEN 23",
    "threat": "HIGH",
    "lastSeen": "Zurich transit hub",
    "status": "AT LARGE",
    "tag": "Unvetted"
  },
  {
    "codename": "THE RAVEN HAND 71",
    "threat": "MEDIUM",
    "lastSeen": "Hong Kong transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE EMBER FOX 91",
    "threat": "MEDIUM",
    "lastSeen": "London transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE EMBER CIPHER 16",
    "threat": "HIGH",
    "lastSeen": "Zurich transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE STEEL SAGE 70",
    "threat": "HIGH",
    "lastSeen": "Seoul transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE MIRAGE HAND 68",
    "threat": "EXTREME",
    "lastSeen": "Warsaw transit hub",
    "status": "AT LARGE",
    "tag": "Freelancer"
  },
  {
    "codename": "THE DRIFTER RIDER 25",
    "threat": "MEDIUM",
    "lastSeen": "Stockholm transit hub",
    "status": "AT LARGE",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE SPECTER SAGE 4",
    "threat": "CRITICAL",
    "lastSeen": "Stockholm transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE DRIFTER RIDER 77",
    "threat": "MEDIUM",
    "lastSeen": "Seoul transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE STEEL HUNTER 22",
    "threat": "EXTREME",
    "lastSeen": "Hong Kong transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE SERPENT SAGE 65",
    "threat": "MEDIUM",
    "lastSeen": "Casablanca transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE FROST WARDEN 71",
    "threat": "EXTREME",
    "lastSeen": "Naples transit hub",
    "status": "NO CONTRACTS",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE PHOENIX CIPHER 2",
    "threat": "MEDIUM",
    "lastSeen": "Osaka transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE SPECTER HUNTER 8",
    "threat": "CRITICAL",
    "lastSeen": "Osaka transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE SERPENT FOX 30",
    "threat": "HIGH",
    "lastSeen": "Istanbul transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE IVORY MOTH 79",
    "threat": "HIGH",
    "lastSeen": "Casablanca transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE EMBER LION 7",
    "threat": "HIGH",
    "lastSeen": "Vienna transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE SHADOW RIDER 50",
    "threat": "HIGH",
    "lastSeen": "Naples transit hub",
    "status": "MONITORED",
    "tag": "High-Noise"
  },
  {
    "codename": "THE VIPER ECHO 61",
    "threat": "CRITICAL",
    "lastSeen": "Berlin transit hub",
    "status": "MONITORED",
    "tag": "Freelancer"
  },
  {
    "codename": "THE WOLF WITCH 87",
    "threat": "CRITICAL",
    "lastSeen": "Osaka transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE IVORY RIDER 73",
    "threat": "EXTREME",
    "lastSeen": "New York transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE RAVEN WITCH 95",
    "threat": "MEDIUM",
    "lastSeen": "Hong Kong transit hub",
    "status": "AT LARGE",
    "tag": "Unvetted"
  },
  {
    "codename": "THE LOTUS LION 74",
    "threat": "HIGH",
    "lastSeen": "Casablanca transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE NIGHT WITCH 77",
    "threat": "HIGH",
    "lastSeen": "Osaka transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE LOTUS KING 69",
    "threat": "CRITICAL",
    "lastSeen": "Dubai transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE IVORY LION 22",
    "threat": "MEDIUM",
    "lastSeen": "Berlin transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE OBSIDIAN LION 70",
    "threat": "HIGH",
    "lastSeen": "Dubai transit hub",
    "status": "NO CONTRACTS",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE ARCHITECT KING 29",
    "threat": "MEDIUM",
    "lastSeen": "Berlin transit hub",
    "status": "NO CONTRACTS",
    "tag": "Freelancer"
  },
  {
    "codename": "THE SERPENT RIDER 39",
    "threat": "HIGH",
    "lastSeen": "Vienna transit hub",
    "status": "NO CONTRACTS",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE ONYX FOX 80",
    "threat": "HIGH",
    "lastSeen": "London transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE IVORY TIGER 42",
    "threat": "EXTREME",
    "lastSeen": "Marrakesh transit hub",
    "status": "AT LARGE",
    "tag": "Unvetted"
  },
  {
    "codename": "THE DRIFTER WITCH 60",
    "threat": "MEDIUM",
    "lastSeen": "Budapest transit hub",
    "status": "AT LARGE",
    "tag": "Unvetted"
  },
  {
    "codename": "THE WOLF BLADE 67",
    "threat": "CRITICAL",
    "lastSeen": "Stockholm transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE LOTUS MOTH 84",
    "threat": "MEDIUM",
    "lastSeen": "Budapest transit hub",
    "status": "NO CONTRACTS",
    "tag": "Freelancer"
  },
  {
    "codename": "THE CROW WARDEN 67",
    "threat": "HIGH",
    "lastSeen": "Budapest transit hub",
    "status": "NO CONTRACTS",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE LOTUS QUEEN 10",
    "threat": "CRITICAL",
    "lastSeen": "Reykjavik transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE OBSIDIAN FOX 14",
    "threat": "CRITICAL",
    "lastSeen": "Naples transit hub",
    "status": "NO CONTRACTS",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE WOLF FOX 6",
    "threat": "EXTREME",
    "lastSeen": "Berlin transit hub",
    "status": "NO CONTRACTS",
    "tag": "Freelancer"
  },
  {
    "codename": "THE EMBER CIPHER 75",
    "threat": "CRITICAL",
    "lastSeen": "Casablanca transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE SPECTER LION 54",
    "threat": "CRITICAL",
    "lastSeen": "Cairo transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE IVORY LARK 9",
    "threat": "MEDIUM",
    "lastSeen": "New York transit hub",
    "status": "AT LARGE",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE MIRAGE KING 67",
    "threat": "EXTREME",
    "lastSeen": "Warsaw transit hub",
    "status": "AT LARGE",
    "tag": "Freelancer"
  },
  {
    "codename": "THE JACKAL TIGER 3",
    "threat": "MEDIUM",
    "lastSeen": "Reykjavik transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE CROW FOX 95",
    "threat": "MEDIUM",
    "lastSeen": "Marrakesh transit hub",
    "status": "NO CONTRACTS",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE NIGHT SPIDER 46",
    "threat": "HIGH",
    "lastSeen": "Zurich transit hub",
    "status": "MONITORED",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE JACKAL LARK 31",
    "threat": "CRITICAL",
    "lastSeen": "Marrakesh transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE ORACLE KING 4",
    "threat": "CRITICAL",
    "lastSeen": "Lisbon transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE PHOENIX HAND 82",
    "threat": "HIGH",
    "lastSeen": "Lisbon transit hub",
    "status": "MONITORED",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE FROST VEIL 72",
    "threat": "MEDIUM",
    "lastSeen": "Prague transit hub",
    "status": "MONITORED",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE OBSIDIAN RIDER 1",
    "threat": "MEDIUM",
    "lastSeen": "Osaka transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE JACKAL QUEEN 81",
    "threat": "EXTREME",
    "lastSeen": "Zurich transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE VIPER RIDER 91",
    "threat": "CRITICAL",
    "lastSeen": "Reykjavik transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE LOTUS CIPHER 9",
    "threat": "EXTREME",
    "lastSeen": "Marrakesh transit hub",
    "status": "MONITORED",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE STEEL SPIDER 73",
    "threat": "HIGH",
    "lastSeen": "Berlin transit hub",
    "status": "NO CONTRACTS",
    "tag": "Freelancer"
  },
  {
    "codename": "THE FROST TIGER 47",
    "threat": "HIGH",
    "lastSeen": "Dubai transit hub",
    "status": "NO CONTRACTS",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE ONYX KING 50",
    "threat": "CRITICAL",
    "lastSeen": "London transit hub",
    "status": "AT LARGE",
    "tag": "High-Noise"
  },
  {
    "codename": "THE JACKAL WARDEN 52",
    "threat": "HIGH",
    "lastSeen": "Prague transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE JACKAL WARDEN 98",
    "threat": "CRITICAL",
    "lastSeen": "Stockholm transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE LOTUS WARDEN 30",
    "threat": "HIGH",
    "lastSeen": "Hong Kong transit hub",
    "status": "AT LARGE",
    "tag": "Unvetted"
  },
  {
    "codename": "THE NIGHT WITCH 80",
    "threat": "MEDIUM",
    "lastSeen": "Budapest transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE CROW ECHO 69",
    "threat": "CRITICAL",
    "lastSeen": "Naples transit hub",
    "status": "AT LARGE",
    "tag": "High-Noise"
  },
  {
    "codename": "THE LOTUS RIDER 10",
    "threat": "EXTREME",
    "lastSeen": "Reykjavik transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE FROST WARDEN 11",
    "threat": "CRITICAL",
    "lastSeen": "New York transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE EMBER BLADE 30",
    "threat": "MEDIUM",
    "lastSeen": "London transit hub",
    "status": "AT LARGE",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE PHOENIX FOX 70",
    "threat": "EXTREME",
    "lastSeen": "Berlin transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE DRIFTER LION 36",
    "threat": "HIGH",
    "lastSeen": "Berlin transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE CROW SPIDER 89",
    "threat": "CRITICAL",
    "lastSeen": "Cairo transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE WOLF FOX 9",
    "threat": "CRITICAL",
    "lastSeen": "London transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE WOLF CIPHER 47",
    "threat": "CRITICAL",
    "lastSeen": "Dubai transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE NEBULA HAND 12",
    "threat": "HIGH",
    "lastSeen": "Warsaw transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE IVORY WARDEN 93",
    "threat": "MEDIUM",
    "lastSeen": "Zurich transit hub",
    "status": "AT LARGE",
    "tag": "Freelancer"
  },
  {
    "codename": "THE ORACLE CIPHER 96",
    "threat": "HIGH",
    "lastSeen": "Lisbon transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE GHOST MOTH 97",
    "threat": "HIGH",
    "lastSeen": "Berlin transit hub",
    "status": "AT LARGE",
    "tag": "Freelancer"
  },
  {
    "codename": "THE FROST WALKER 63",
    "threat": "CRITICAL",
    "lastSeen": "Naples transit hub",
    "status": "AT LARGE",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE EMBER SAGE 1",
    "threat": "HIGH",
    "lastSeen": "New York transit hub",
    "status": "AT LARGE",
    "tag": "Unvetted"
  },
  {
    "codename": "THE WOLF LARK 11",
    "threat": "MEDIUM",
    "lastSeen": "Seoul transit hub",
    "status": "NO CONTRACTS",
    "tag": "Freelancer"
  },
  {
    "codename": "THE LOTUS QUEEN 22",
    "threat": "CRITICAL",
    "lastSeen": "London transit hub",
    "status": "AT LARGE",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE OBSIDIAN ECHO 13",
    "threat": "EXTREME",
    "lastSeen": "Seoul transit hub",
    "status": "MONITORED",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE LOTUS HAND 55",
    "threat": "MEDIUM",
    "lastSeen": "Zurich transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE ONYX LARK 32",
    "threat": "HIGH",
    "lastSeen": "New York transit hub",
    "status": "AT LARGE",
    "tag": "High-Noise"
  },
  {
    "codename": "THE PHOENIX TIGER 58",
    "threat": "MEDIUM",
    "lastSeen": "Cairo transit hub",
    "status": "MONITORED",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE FROST ECHO 3",
    "threat": "EXTREME",
    "lastSeen": "Hong Kong transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE EMBER WALKER 30",
    "threat": "MEDIUM",
    "lastSeen": "Dubai transit hub",
    "status": "MONITORED",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE FROST WITCH 24",
    "threat": "HIGH",
    "lastSeen": "Lisbon transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE WOLF BLADE 14",
    "threat": "MEDIUM",
    "lastSeen": "Casablanca transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE IVORY BLADE 82",
    "threat": "EXTREME",
    "lastSeen": "Osaka transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE SERPENT HAND 11",
    "threat": "HIGH",
    "lastSeen": "Seoul transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE PHOENIX TIGER 60",
    "threat": "HIGH",
    "lastSeen": "Cairo transit hub",
    "status": "AT LARGE",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE EMBER MOTH 41",
    "threat": "EXTREME",
    "lastSeen": "Prague transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE ORACLE KING 55",
    "threat": "MEDIUM",
    "lastSeen": "Vienna transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE SPECTER TIGER 35",
    "threat": "CRITICAL",
    "lastSeen": "Berlin transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE PHOENIX MOTH 78",
    "threat": "EXTREME",
    "lastSeen": "Vienna transit hub",
    "status": "AT LARGE",
    "tag": "High-Noise"
  },
  {
    "codename": "THE EMBER FOX 63",
    "threat": "HIGH",
    "lastSeen": "Prague transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE SHADOW CIPHER 74",
    "threat": "EXTREME",
    "lastSeen": "New York transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE NEBULA WITCH 17",
    "threat": "CRITICAL",
    "lastSeen": "Zurich transit hub",
    "status": "MONITORED",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE RAVEN FOX 58",
    "threat": "MEDIUM",
    "lastSeen": "Stockholm transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE EMBER HAND 84",
    "threat": "CRITICAL",
    "lastSeen": "Lisbon transit hub",
    "status": "AT LARGE",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE CROW LARK 29",
    "threat": "MEDIUM",
    "lastSeen": "Marrakesh transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE PHOENIX ECHO 15",
    "threat": "CRITICAL",
    "lastSeen": "Naples transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE SHADOW KING 18",
    "threat": "EXTREME",
    "lastSeen": "Lisbon transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE STEEL SAGE 75",
    "threat": "CRITICAL",
    "lastSeen": "Dubai transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE JACKAL LION 39",
    "threat": "HIGH",
    "lastSeen": "Reykjavik transit hub",
    "status": "MONITORED",
    "tag": "High-Noise"
  },
  {
    "codename": "THE LOTUS WALKER 28",
    "threat": "MEDIUM",
    "lastSeen": "Reykjavik transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE GHOST LION 73",
    "threat": "HIGH",
    "lastSeen": "Budapest transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE SHADOW LARK 54",
    "threat": "MEDIUM",
    "lastSeen": "Vienna transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE WOLF KING 64",
    "threat": "HIGH",
    "lastSeen": "Prague transit hub",
    "status": "AT LARGE",
    "tag": "Freelancer"
  },
  {
    "codename": "THE STEEL HAND 24",
    "threat": "MEDIUM",
    "lastSeen": "Hong Kong transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE WOLF SPIDER 33",
    "threat": "MEDIUM",
    "lastSeen": "Cairo transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE NEBULA KING 30",
    "threat": "MEDIUM",
    "lastSeen": "Naples transit hub",
    "status": "AT LARGE",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE SERPENT VEIL 25",
    "threat": "MEDIUM",
    "lastSeen": "Dubai transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE GHOST MOTH 26",
    "threat": "MEDIUM",
    "lastSeen": "Marrakesh transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE ORACLE TIGER 56",
    "threat": "HIGH",
    "lastSeen": "Dubai transit hub",
    "status": "MONITORED",
    "tag": "Freelancer"
  },
  {
    "codename": "THE ONYX LION 54",
    "threat": "MEDIUM",
    "lastSeen": "Dubai transit hub",
    "status": "NO CONTRACTS",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE PHOENIX SPIDER 75",
    "threat": "MEDIUM",
    "lastSeen": "Reykjavik transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE CROW HAND 74",
    "threat": "HIGH",
    "lastSeen": "Naples transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE MIRAGE HUNTER 79",
    "threat": "HIGH",
    "lastSeen": "Prague transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE IVORY WITCH 22",
    "threat": "EXTREME",
    "lastSeen": "Berlin transit hub",
    "status": "AT LARGE",
    "tag": "Unvetted"
  },
  {
    "codename": "THE GHOST SAGE 90",
    "threat": "EXTREME",
    "lastSeen": "Istanbul transit hub",
    "status": "AT LARGE",
    "tag": "Freelancer"
  },
  {
    "codename": "THE CROW KING 44",
    "threat": "MEDIUM",
    "lastSeen": "Prague transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE GHOST BLADE 57",
    "threat": "CRITICAL",
    "lastSeen": "London transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE RAVEN LION 39",
    "threat": "MEDIUM",
    "lastSeen": "Seoul transit hub",
    "status": "AT LARGE",
    "tag": "Freelancer"
  },
  {
    "codename": "THE ORACLE MOTH 64",
    "threat": "EXTREME",
    "lastSeen": "Seoul transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE FROST LARK 50",
    "threat": "HIGH",
    "lastSeen": "Marrakesh transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE SERPENT WALKER 33",
    "threat": "MEDIUM",
    "lastSeen": "Hong Kong transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE CROW CIPHER 21",
    "threat": "MEDIUM",
    "lastSeen": "Reykjavik transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE ONYX BLADE 8",
    "threat": "CRITICAL",
    "lastSeen": "Reykjavik transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE RAVEN WALKER 45",
    "threat": "EXTREME",
    "lastSeen": "Cairo transit hub",
    "status": "MONITORED",
    "tag": "High-Noise"
  },
  {
    "codename": "THE CROW MOTH 95",
    "threat": "MEDIUM",
    "lastSeen": "Reykjavik transit hub",
    "status": "MONITORED",
    "tag": "High-Noise"
  },
  {
    "codename": "THE WOLF HAND 61",
    "threat": "CRITICAL",
    "lastSeen": "Istanbul transit hub",
    "status": "MONITORED",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE OBSIDIAN WARDEN 36",
    "threat": "MEDIUM",
    "lastSeen": "Naples transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE CROW TIGER 4",
    "threat": "HIGH",
    "lastSeen": "Budapest transit hub",
    "status": "AT LARGE",
    "tag": "Unvetted"
  },
  {
    "codename": "THE VIPER WARDEN 50",
    "threat": "HIGH",
    "lastSeen": "Warsaw transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE LOTUS TIGER 55",
    "threat": "HIGH",
    "lastSeen": "Prague transit hub",
    "status": "MONITORED",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE VIPER WARDEN 37",
    "threat": "MEDIUM",
    "lastSeen": "Hong Kong transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE WOLF ECHO 95",
    "threat": "MEDIUM",
    "lastSeen": "Casablanca transit hub",
    "status": "MONITORED",
    "tag": "Freelancer"
  },
  {
    "codename": "THE PHOENIX SAGE 57",
    "threat": "HIGH",
    "lastSeen": "Stockholm transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE ORACLE KING 55",
    "threat": "CRITICAL",
    "lastSeen": "Reykjavik transit hub",
    "status": "MONITORED",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE EMBER HUNTER 6",
    "threat": "EXTREME",
    "lastSeen": "Hong Kong transit hub",
    "status": "MONITORED",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE STEEL WARDEN 79",
    "threat": "EXTREME",
    "lastSeen": "Seoul transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE DRIFTER WARDEN 15",
    "threat": "MEDIUM",
    "lastSeen": "Zurich transit hub",
    "status": "NO CONTRACTS",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE ARCHITECT TIGER 99",
    "threat": "HIGH",
    "lastSeen": "Istanbul transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE JACKAL MOTH 61",
    "threat": "MEDIUM",
    "lastSeen": "Dubai transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE LOTUS HUNTER 61",
    "threat": "MEDIUM",
    "lastSeen": "Prague transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE STEEL WARDEN 34",
    "threat": "MEDIUM",
    "lastSeen": "Seoul transit hub",
    "status": "NO CONTRACTS",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE ARCHITECT SAGE 41",
    "threat": "CRITICAL",
    "lastSeen": "Istanbul transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE CROW ECHO 60",
    "threat": "CRITICAL",
    "lastSeen": "Dubai transit hub",
    "status": "NO CONTRACTS",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE MIRAGE HUNTER 48",
    "threat": "MEDIUM",
    "lastSeen": "London transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE CROW ECHO 32",
    "threat": "MEDIUM",
    "lastSeen": "Lisbon transit hub",
    "status": "MONITORED",
    "tag": "High-Noise"
  },
  {
    "codename": "THE SPECTER SPIDER 94",
    "threat": "EXTREME",
    "lastSeen": "Marrakesh transit hub",
    "status": "AT LARGE",
    "tag": "High-Noise"
  },
  {
    "codename": "THE STEEL KING 75",
    "threat": "CRITICAL",
    "lastSeen": "Seoul transit hub",
    "status": "AT LARGE",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE NIGHT SAGE 88",
    "threat": "CRITICAL",
    "lastSeen": "Dubai transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE OBSIDIAN WITCH 96",
    "threat": "MEDIUM",
    "lastSeen": "Marrakesh transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE NIGHT LION 42",
    "threat": "MEDIUM",
    "lastSeen": "Prague transit hub",
    "status": "MONITORED",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE RAVEN SAGE 96",
    "threat": "EXTREME",
    "lastSeen": "Warsaw transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE FROST VEIL 95",
    "threat": "HIGH",
    "lastSeen": "Berlin transit hub",
    "status": "MONITORED",
    "tag": "High-Noise"
  },
  {
    "codename": "THE JACKAL WALKER 59",
    "threat": "MEDIUM",
    "lastSeen": "Seoul transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE OBSIDIAN ECHO 34",
    "threat": "CRITICAL",
    "lastSeen": "Lisbon transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE SPECTER WITCH 17",
    "threat": "CRITICAL",
    "lastSeen": "Vienna transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE DRIFTER LARK 56",
    "threat": "CRITICAL",
    "lastSeen": "Zurich transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE LOTUS LION 53",
    "threat": "EXTREME",
    "lastSeen": "Stockholm transit hub",
    "status": "NO CONTRACTS",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE NIGHT FOX 31",
    "threat": "MEDIUM",
    "lastSeen": "Istanbul transit hub",
    "status": "AT LARGE",
    "tag": "High-Noise"
  },
  {
    "codename": "THE NIGHT FOX 32",
    "threat": "HIGH",
    "lastSeen": "Seoul transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE SHADOW ECHO 20",
    "threat": "EXTREME",
    "lastSeen": "New York transit hub",
    "status": "MONITORED",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE PHOENIX RIDER 49",
    "threat": "EXTREME",
    "lastSeen": "Warsaw transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE ONYX BLADE 48",
    "threat": "EXTREME",
    "lastSeen": "Reykjavik transit hub",
    "status": "AT LARGE",
    "tag": "High-Noise"
  },
  {
    "codename": "THE STEEL ECHO 33",
    "threat": "CRITICAL",
    "lastSeen": "Zurich transit hub",
    "status": "MONITORED",
    "tag": "Freelancer"
  },
  {
    "codename": "THE GHOST HAND 65",
    "threat": "MEDIUM",
    "lastSeen": "Naples transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE NEBULA SPIDER 22",
    "threat": "MEDIUM",
    "lastSeen": "Berlin transit hub",
    "status": "NO CONTRACTS",
    "tag": "Freelancer"
  },
  {
    "codename": "THE JACKAL VEIL 21",
    "threat": "CRITICAL",
    "lastSeen": "Dubai transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE IVORY QUEEN 96",
    "threat": "EXTREME",
    "lastSeen": "Osaka transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE OBSIDIAN FOX 8",
    "threat": "EXTREME",
    "lastSeen": "Zurich transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE NEBULA QUEEN 74",
    "threat": "MEDIUM",
    "lastSeen": "Vienna transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE JACKAL FOX 48",
    "threat": "EXTREME",
    "lastSeen": "Dubai transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE JACKAL HAND 46",
    "threat": "MEDIUM",
    "lastSeen": "Hong Kong transit hub",
    "status": "AT LARGE",
    "tag": "High-Noise"
  },
  {
    "codename": "THE WOLF HUNTER 83",
    "threat": "CRITICAL",
    "lastSeen": "Osaka transit hub",
    "status": "NO CONTRACTS",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE IVORY LARK 35",
    "threat": "HIGH",
    "lastSeen": "Lisbon transit hub",
    "status": "MONITORED",
    "tag": "High-Noise"
  },
  {
    "codename": "THE DRIFTER TIGER 31",
    "threat": "MEDIUM",
    "lastSeen": "New York transit hub",
    "status": "AT LARGE",
    "tag": "Freelancer"
  },
  {
    "codename": "THE JACKAL FOX 68",
    "threat": "CRITICAL",
    "lastSeen": "Vienna transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE NEBULA FOX 23",
    "threat": "CRITICAL",
    "lastSeen": "Casablanca transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE FROST BLADE 96",
    "threat": "HIGH",
    "lastSeen": "Osaka transit hub",
    "status": "MONITORED",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE WOLF LION 50",
    "threat": "EXTREME",
    "lastSeen": "Reykjavik transit hub",
    "status": "MONITORED",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE VIPER VEIL 91",
    "threat": "HIGH",
    "lastSeen": "Zurich transit hub",
    "status": "NO CONTRACTS",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE EMBER KING 98",
    "threat": "MEDIUM",
    "lastSeen": "Stockholm transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE STEEL LARK 13",
    "threat": "HIGH",
    "lastSeen": "Dubai transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE VIPER WITCH 51",
    "threat": "CRITICAL",
    "lastSeen": "Warsaw transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE IVORY QUEEN 37",
    "threat": "MEDIUM",
    "lastSeen": "New York transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE LOTUS KING 29",
    "threat": "MEDIUM",
    "lastSeen": "Berlin transit hub",
    "status": "MONITORED",
    "tag": "Freelancer"
  },
  {
    "codename": "THE JACKAL KING 99",
    "threat": "MEDIUM",
    "lastSeen": "Budapest transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE EMBER SPIDER 82",
    "threat": "MEDIUM",
    "lastSeen": "Seoul transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE PHOENIX SPIDER 28",
    "threat": "HIGH",
    "lastSeen": "Berlin transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE DRIFTER LION 43",
    "threat": "HIGH",
    "lastSeen": "Casablanca transit hub",
    "status": "MONITORED",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE VIPER ECHO 86",
    "threat": "CRITICAL",
    "lastSeen": "Warsaw transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE SHADOW LARK 35",
    "threat": "CRITICAL",
    "lastSeen": "Istanbul transit hub",
    "status": "MONITORED",
    "tag": "High-Noise"
  },
  {
    "codename": "THE VIPER QUEEN 90",
    "threat": "HIGH",
    "lastSeen": "Naples transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE ARCHITECT HUNTER 42",
    "threat": "EXTREME",
    "lastSeen": "Prague transit hub",
    "status": "NO CONTRACTS",
    "tag": "Freelancer"
  },
  {
    "codename": "THE MIRAGE WARDEN 79",
    "threat": "EXTREME",
    "lastSeen": "Vienna transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE EMBER BLADE 16",
    "threat": "CRITICAL",
    "lastSeen": "New York transit hub",
    "status": "MONITORED",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE SERPENT TIGER 32",
    "threat": "EXTREME",
    "lastSeen": "Dubai transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE ONYX QUEEN 98",
    "threat": "EXTREME",
    "lastSeen": "Warsaw transit hub",
    "status": "AT LARGE",
    "tag": "Freelancer"
  },
  {
    "codename": "THE VIPER WALKER 72",
    "threat": "HIGH",
    "lastSeen": "New York transit hub",
    "status": "MONITORED",
    "tag": "Freelancer"
  },
  {
    "codename": "THE JACKAL BLADE 2",
    "threat": "HIGH",
    "lastSeen": "Reykjavik transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE SHADOW KING 78",
    "threat": "MEDIUM",
    "lastSeen": "Stockholm transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE SPECTER TIGER 16",
    "threat": "MEDIUM",
    "lastSeen": "Hong Kong transit hub",
    "status": "MONITORED",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE CROW LION 12",
    "threat": "EXTREME",
    "lastSeen": "Budapest transit hub",
    "status": "NO CONTRACTS",
    "tag": "Freelancer"
  },
  {
    "codename": "THE SPECTER TIGER 2",
    "threat": "EXTREME",
    "lastSeen": "Istanbul transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE EMBER QUEEN 74",
    "threat": "HIGH",
    "lastSeen": "Marrakesh transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE NEBULA SAGE 56",
    "threat": "HIGH",
    "lastSeen": "Prague transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE NEBULA WALKER 41",
    "threat": "HIGH",
    "lastSeen": "Naples transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE EMBER WARDEN 30",
    "threat": "MEDIUM",
    "lastSeen": "Zurich transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE ORACLE MOTH 69",
    "threat": "MEDIUM",
    "lastSeen": "Marrakesh transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE FROST MOTH 2",
    "threat": "HIGH",
    "lastSeen": "Prague transit hub",
    "status": "NO CONTRACTS",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE RAVEN LARK 46",
    "threat": "CRITICAL",
    "lastSeen": "Casablanca transit hub",
    "status": "AT LARGE",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE VIPER HAND 11",
    "threat": "EXTREME",
    "lastSeen": "Budapest transit hub",
    "status": "AT LARGE",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE GHOST WITCH 89",
    "threat": "HIGH",
    "lastSeen": "Dubai transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE DRIFTER WALKER 69",
    "threat": "CRITICAL",
    "lastSeen": "Naples transit hub",
    "status": "NO CONTRACTS",
    "tag": "Freelancer"
  },
  {
    "codename": "THE ARCHITECT WALKER 19",
    "threat": "CRITICAL",
    "lastSeen": "Warsaw transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE SERPENT SAGE 27",
    "threat": "CRITICAL",
    "lastSeen": "Zurich transit hub",
    "status": "MONITORED",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE OBSIDIAN WARDEN 6",
    "threat": "MEDIUM",
    "lastSeen": "Zurich transit hub",
    "status": "NO CONTRACTS",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE PHOENIX BLADE 94",
    "threat": "HIGH",
    "lastSeen": "Reykjavik transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE EMBER KING 27",
    "threat": "MEDIUM",
    "lastSeen": "Cairo transit hub",
    "status": "MONITORED",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE FROST CIPHER 87",
    "threat": "HIGH",
    "lastSeen": "Lisbon transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE FROST HAND 49",
    "threat": "MEDIUM",
    "lastSeen": "Istanbul transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE CROW SPIDER 37",
    "threat": "EXTREME",
    "lastSeen": "New York transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE MIRAGE FOX 33",
    "threat": "MEDIUM",
    "lastSeen": "Cairo transit hub",
    "status": "MONITORED",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE SERPENT BLADE 44",
    "threat": "EXTREME",
    "lastSeen": "Istanbul transit hub",
    "status": "MONITORED",
    "tag": "High-Noise"
  },
  {
    "codename": "THE EMBER WALKER 17",
    "threat": "HIGH",
    "lastSeen": "Istanbul transit hub",
    "status": "MONITORED",
    "tag": "High-Noise"
  },
  {
    "codename": "THE WOLF RIDER 94",
    "threat": "MEDIUM",
    "lastSeen": "Hong Kong transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE SPECTER MOTH 92",
    "threat": "HIGH",
    "lastSeen": "Cairo transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE ONYX LION 47",
    "threat": "CRITICAL",
    "lastSeen": "Vienna transit hub",
    "status": "MONITORED",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE LOTUS FOX 33",
    "threat": "CRITICAL",
    "lastSeen": "Seoul transit hub",
    "status": "MONITORED",
    "tag": "Freelancer"
  },
  {
    "codename": "THE ARCHITECT FOX 35",
    "threat": "MEDIUM",
    "lastSeen": "New York transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE ONYX HAND 30",
    "threat": "HIGH",
    "lastSeen": "Dubai transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE STEEL HAND 35",
    "threat": "EXTREME",
    "lastSeen": "Osaka transit hub",
    "status": "NO CONTRACTS",
    "tag": "Freelancer"
  },
  {
    "codename": "THE OBSIDIAN HUNTER 30",
    "threat": "MEDIUM",
    "lastSeen": "Hong Kong transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE SERPENT HUNTER 14",
    "threat": "EXTREME",
    "lastSeen": "Seoul transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE SERPENT LARK 81",
    "threat": "HIGH",
    "lastSeen": "Budapest transit hub",
    "status": "AT LARGE",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE ORACLE QUEEN 40",
    "threat": "CRITICAL",
    "lastSeen": "Vienna transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE NIGHT LION 84",
    "threat": "MEDIUM",
    "lastSeen": "Dubai transit hub",
    "status": "AT LARGE",
    "tag": "Freelancer"
  },
  {
    "codename": "THE MIRAGE RIDER 82",
    "threat": "CRITICAL",
    "lastSeen": "Prague transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE WOLF BLADE 72",
    "threat": "MEDIUM",
    "lastSeen": "Naples transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE OBSIDIAN WALKER 7",
    "threat": "CRITICAL",
    "lastSeen": "New York transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE JACKAL WITCH 78",
    "threat": "CRITICAL",
    "lastSeen": "Berlin transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE EMBER WALKER 27",
    "threat": "HIGH",
    "lastSeen": "Seoul transit hub",
    "status": "NO CONTRACTS",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE OBSIDIAN SPIDER 16",
    "threat": "EXTREME",
    "lastSeen": "Cairo transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE SPECTER LARK 16",
    "threat": "MEDIUM",
    "lastSeen": "Vienna transit hub",
    "status": "MONITORED",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE RAVEN VEIL 43",
    "threat": "EXTREME",
    "lastSeen": "Osaka transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE ARCHITECT BLADE 74",
    "threat": "HIGH",
    "lastSeen": "Stockholm transit hub",
    "status": "NO CONTRACTS",
    "tag": "Freelancer"
  },
  {
    "codename": "THE WOLF QUEEN 22",
    "threat": "HIGH",
    "lastSeen": "Reykjavik transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE GHOST FOX 76",
    "threat": "EXTREME",
    "lastSeen": "Budapest transit hub",
    "status": "AT LARGE",
    "tag": "Unvetted"
  },
  {
    "codename": "THE EMBER HAND 34",
    "threat": "CRITICAL",
    "lastSeen": "Zurich transit hub",
    "status": "NO CONTRACTS",
    "tag": "Freelancer"
  },
  {
    "codename": "THE EMBER LARK 33",
    "threat": "MEDIUM",
    "lastSeen": "Seoul transit hub",
    "status": "MONITORED",
    "tag": "High-Noise"
  },
  {
    "codename": "THE NEBULA MOTH 56",
    "threat": "EXTREME",
    "lastSeen": "Hong Kong transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE FROST CIPHER 79",
    "threat": "CRITICAL",
    "lastSeen": "Reykjavik transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE CROW FOX 82",
    "threat": "HIGH",
    "lastSeen": "Marrakesh transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE NIGHT KING 34",
    "threat": "MEDIUM",
    "lastSeen": "Osaka transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE EMBER LION 59",
    "threat": "CRITICAL",
    "lastSeen": "Osaka transit hub",
    "status": "AT LARGE",
    "tag": "Freelancer"
  },
  {
    "codename": "THE SERPENT SPIDER 53",
    "threat": "MEDIUM",
    "lastSeen": "Warsaw transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE WOLF FOX 60",
    "threat": "EXTREME",
    "lastSeen": "Stockholm transit hub",
    "status": "NO CONTRACTS",
    "tag": "Freelancer"
  },
  {
    "codename": "THE SERPENT MOTH 89",
    "threat": "MEDIUM",
    "lastSeen": "Warsaw transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE ARCHITECT MOTH 83",
    "threat": "MEDIUM",
    "lastSeen": "Marrakesh transit hub",
    "status": "MONITORED",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE EMBER VEIL 38",
    "threat": "HIGH",
    "lastSeen": "Cairo transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE EMBER TIGER 67",
    "threat": "EXTREME",
    "lastSeen": "Naples transit hub",
    "status": "AT LARGE",
    "tag": "Freelancer"
  },
  {
    "codename": "THE WOLF WITCH 4",
    "threat": "HIGH",
    "lastSeen": "Prague transit hub",
    "status": "MONITORED",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE SHADOW WARDEN 34",
    "threat": "MEDIUM",
    "lastSeen": "Istanbul transit hub",
    "status": "MONITORED",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE CROW SPIDER 19",
    "threat": "MEDIUM",
    "lastSeen": "Stockholm transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE IVORY BLADE 13",
    "threat": "CRITICAL",
    "lastSeen": "Zurich transit hub",
    "status": "MONITORED",
    "tag": "High-Noise"
  },
  {
    "codename": "THE STEEL CIPHER 41",
    "threat": "CRITICAL",
    "lastSeen": "Hong Kong transit hub",
    "status": "AT LARGE",
    "tag": "Unvetted"
  },
  {
    "codename": "THE CROW SAGE 94",
    "threat": "HIGH",
    "lastSeen": "Naples transit hub",
    "status": "MONITORED",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE PHOENIX FOX 10",
    "threat": "HIGH",
    "lastSeen": "Budapest transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE SPECTER LION 80",
    "threat": "CRITICAL",
    "lastSeen": "Casablanca transit hub",
    "status": "AT LARGE",
    "tag": "High-Noise"
  },
  {
    "codename": "THE PHOENIX HAND 12",
    "threat": "EXTREME",
    "lastSeen": "Cairo transit hub",
    "status": "NO CONTRACTS",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE FROST MOTH 26",
    "threat": "CRITICAL",
    "lastSeen": "New York transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE CROW ECHO 46",
    "threat": "MEDIUM",
    "lastSeen": "Seoul transit hub",
    "status": "NO CONTRACTS",
    "tag": "Freelancer"
  },
  {
    "codename": "THE DRIFTER FOX 85",
    "threat": "HIGH",
    "lastSeen": "Berlin transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE RAVEN VEIL 22",
    "threat": "CRITICAL",
    "lastSeen": "New York transit hub",
    "status": "MONITORED",
    "tag": "Freelancer"
  },
  {
    "codename": "THE GHOST LARK 41",
    "threat": "MEDIUM",
    "lastSeen": "Cairo transit hub",
    "status": "AT LARGE",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE FROST SPIDER 32",
    "threat": "MEDIUM",
    "lastSeen": "London transit hub",
    "status": "AT LARGE",
    "tag": "High-Noise"
  },
  {
    "codename": "THE WOLF SAGE 45",
    "threat": "EXTREME",
    "lastSeen": "Lisbon transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE JACKAL HUNTER 89",
    "threat": "MEDIUM",
    "lastSeen": "Stockholm transit hub",
    "status": "MONITORED",
    "tag": "Freelancer"
  },
  {
    "codename": "THE NIGHT WITCH 74",
    "threat": "MEDIUM",
    "lastSeen": "Vienna transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE ONYX VEIL 60",
    "threat": "EXTREME",
    "lastSeen": "Hong Kong transit hub",
    "status": "AT LARGE",
    "tag": "Freelancer"
  },
  {
    "codename": "THE SERPENT BLADE 81",
    "threat": "MEDIUM",
    "lastSeen": "Hong Kong transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE GHOST TIGER 34",
    "threat": "HIGH",
    "lastSeen": "Stockholm transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE LOTUS WALKER 23",
    "threat": "HIGH",
    "lastSeen": "Stockholm transit hub",
    "status": "AT LARGE",
    "tag": "High-Noise"
  },
  {
    "codename": "THE ONYX RIDER 46",
    "threat": "EXTREME",
    "lastSeen": "London transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE EMBER ECHO 3",
    "threat": "EXTREME",
    "lastSeen": "Lisbon transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE SHADOW ECHO 53",
    "threat": "HIGH",
    "lastSeen": "Warsaw transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE STEEL CIPHER 1",
    "threat": "CRITICAL",
    "lastSeen": "London transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE FROST QUEEN 15",
    "threat": "EXTREME",
    "lastSeen": "Budapest transit hub",
    "status": "AT LARGE",
    "tag": "Unvetted"
  },
  {
    "codename": "THE NEBULA HUNTER 27",
    "threat": "MEDIUM",
    "lastSeen": "Naples transit hub",
    "status": "MONITORED",
    "tag": "Freelancer"
  },
  {
    "codename": "THE DRIFTER WALKER 50",
    "threat": "EXTREME",
    "lastSeen": "Naples transit hub",
    "status": "AT LARGE",
    "tag": "Freelancer"
  },
  {
    "codename": "THE EMBER WARDEN 6",
    "threat": "EXTREME",
    "lastSeen": "Marrakesh transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE SERPENT LARK 38",
    "threat": "EXTREME",
    "lastSeen": "Vienna transit hub",
    "status": "NO CONTRACTS",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE FROST RIDER 40",
    "threat": "EXTREME",
    "lastSeen": "Naples transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE PHOENIX WALKER 81",
    "threat": "CRITICAL",
    "lastSeen": "Berlin transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE IVORY LION 77",
    "threat": "HIGH",
    "lastSeen": "Budapest transit hub",
    "status": "MONITORED",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE IVORY FOX 54",
    "threat": "HIGH",
    "lastSeen": "Lisbon transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE VIPER FOX 79",
    "threat": "MEDIUM",
    "lastSeen": "Zurich transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE ONYX HUNTER 3",
    "threat": "HIGH",
    "lastSeen": "New York transit hub",
    "status": "AT LARGE",
    "tag": "Freelancer"
  },
  {
    "codename": "THE SHADOW QUEEN 26",
    "threat": "MEDIUM",
    "lastSeen": "Hong Kong transit hub",
    "status": "MONITORED",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE DRIFTER TIGER 17",
    "threat": "HIGH",
    "lastSeen": "Lisbon transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE GHOST WALKER 60",
    "threat": "MEDIUM",
    "lastSeen": "Hong Kong transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE NEBULA WITCH 11",
    "threat": "MEDIUM",
    "lastSeen": "Vienna transit hub",
    "status": "MONITORED",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE EMBER LION 44",
    "threat": "EXTREME",
    "lastSeen": "Budapest transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE LOTUS QUEEN 60",
    "threat": "EXTREME",
    "lastSeen": "Reykjavik transit hub",
    "status": "MONITORED",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE DRIFTER ECHO 96",
    "threat": "HIGH",
    "lastSeen": "Istanbul transit hub",
    "status": "MONITORED",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE LOTUS LARK 50",
    "threat": "EXTREME",
    "lastSeen": "Dubai transit hub",
    "status": "AT LARGE",
    "tag": "Freelancer"
  },
  {
    "codename": "THE DRIFTER HAND 83",
    "threat": "HIGH",
    "lastSeen": "Budapest transit hub",
    "status": "MONITORED",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE RAVEN TIGER 5",
    "threat": "CRITICAL",
    "lastSeen": "Lisbon transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE FROST VEIL 83",
    "threat": "MEDIUM",
    "lastSeen": "Stockholm transit hub",
    "status": "AT LARGE",
    "tag": "Freelancer"
  },
  {
    "codename": "THE STEEL TIGER 44",
    "threat": "MEDIUM",
    "lastSeen": "Seoul transit hub",
    "status": "MONITORED",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE JACKAL QUEEN 83",
    "threat": "EXTREME",
    "lastSeen": "Zurich transit hub",
    "status": "NO CONTRACTS",
    "tag": "Freelancer"
  },
  {
    "codename": "THE EMBER SAGE 40",
    "threat": "EXTREME",
    "lastSeen": "Budapest transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE FROST BLADE 70",
    "threat": "EXTREME",
    "lastSeen": "London transit hub",
    "status": "NO CONTRACTS",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE SERPENT SAGE 23",
    "threat": "MEDIUM",
    "lastSeen": "Prague transit hub",
    "status": "AT LARGE",
    "tag": "High-Noise"
  },
  {
    "codename": "THE SERPENT LION 14",
    "threat": "HIGH",
    "lastSeen": "Seoul transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE SERPENT LARK 45",
    "threat": "HIGH",
    "lastSeen": "Lisbon transit hub",
    "status": "MONITORED",
    "tag": "High-Noise"
  },
  {
    "codename": "THE SERPENT CIPHER 4",
    "threat": "EXTREME",
    "lastSeen": "Lisbon transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE MIRAGE ECHO 39",
    "threat": "MEDIUM",
    "lastSeen": "Seoul transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE DRIFTER ECHO 50",
    "threat": "EXTREME",
    "lastSeen": "Prague transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE DRIFTER HUNTER 78",
    "threat": "HIGH",
    "lastSeen": "Prague transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE NIGHT QUEEN 1",
    "threat": "CRITICAL",
    "lastSeen": "Naples transit hub",
    "status": "AT LARGE",
    "tag": "Unvetted"
  },
  {
    "codename": "THE NIGHT CIPHER 26",
    "threat": "MEDIUM",
    "lastSeen": "Casablanca transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE IVORY LION 29",
    "threat": "HIGH",
    "lastSeen": "Marrakesh transit hub",
    "status": "NO CONTRACTS",
    "tag": "Freelancer"
  },
  {
    "codename": "THE ARCHITECT QUEEN 71",
    "threat": "MEDIUM",
    "lastSeen": "Berlin transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE OBSIDIAN MOTH 34",
    "threat": "CRITICAL",
    "lastSeen": "Casablanca transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE FROST LION 63",
    "threat": "EXTREME",
    "lastSeen": "Budapest transit hub",
    "status": "AT LARGE",
    "tag": "Freelancer"
  },
  {
    "codename": "THE VIPER SPIDER 82",
    "threat": "CRITICAL",
    "lastSeen": "Dubai transit hub",
    "status": "NO CONTRACTS",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE RAVEN KING 75",
    "threat": "MEDIUM",
    "lastSeen": "London transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE RAVEN ECHO 79",
    "threat": "EXTREME",
    "lastSeen": "Stockholm transit hub",
    "status": "MONITORED",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE MIRAGE HAND 10",
    "threat": "MEDIUM",
    "lastSeen": "New York transit hub",
    "status": "AT LARGE",
    "tag": "Unvetted"
  },
  {
    "codename": "THE ARCHITECT KING 69",
    "threat": "EXTREME",
    "lastSeen": "Dubai transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE ORACLE BLADE 50",
    "threat": "MEDIUM",
    "lastSeen": "London transit hub",
    "status": "AT LARGE",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE RAVEN RIDER 75",
    "threat": "HIGH",
    "lastSeen": "Dubai transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE OBSIDIAN SAGE 28",
    "threat": "HIGH",
    "lastSeen": "Vienna transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE NEBULA LARK 46",
    "threat": "MEDIUM",
    "lastSeen": "Hong Kong transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE VIPER MOTH 59",
    "threat": "CRITICAL",
    "lastSeen": "Lisbon transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE IVORY HAND 67",
    "threat": "EXTREME",
    "lastSeen": "Hong Kong transit hub",
    "status": "AT LARGE",
    "tag": "Unvetted"
  },
  {
    "codename": "THE SPECTER LARK 92",
    "threat": "EXTREME",
    "lastSeen": "Osaka transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE SHADOW QUEEN 61",
    "threat": "CRITICAL",
    "lastSeen": "Hong Kong transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE ARCHITECT LARK 32",
    "threat": "HIGH",
    "lastSeen": "Naples transit hub",
    "status": "AT LARGE",
    "tag": "Freelancer"
  },
  {
    "codename": "THE WOLF MOTH 8",
    "threat": "MEDIUM",
    "lastSeen": "Stockholm transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE EMBER TIGER 89",
    "threat": "HIGH",
    "lastSeen": "Dubai transit hub",
    "status": "AT LARGE",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE MIRAGE HUNTER 30",
    "threat": "HIGH",
    "lastSeen": "Naples transit hub",
    "status": "NO CONTRACTS",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE SPECTER HUNTER 65",
    "threat": "CRITICAL",
    "lastSeen": "London transit hub",
    "status": "MONITORED",
    "tag": "High-Noise"
  },
  {
    "codename": "THE SPECTER WITCH 50",
    "threat": "EXTREME",
    "lastSeen": "Lisbon transit hub",
    "status": "AT LARGE",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE EMBER LARK 98",
    "threat": "CRITICAL",
    "lastSeen": "Istanbul transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE IVORY CIPHER 29",
    "threat": "CRITICAL",
    "lastSeen": "Reykjavik transit hub",
    "status": "NO CONTRACTS",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE EMBER LARK 93",
    "threat": "HIGH",
    "lastSeen": "Zurich transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE NIGHT MOTH 40",
    "threat": "HIGH",
    "lastSeen": "Reykjavik transit hub",
    "status": "AT LARGE",
    "tag": "High-Noise"
  },
  {
    "codename": "THE PHOENIX LARK 96",
    "threat": "EXTREME",
    "lastSeen": "Vienna transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE ONYX KING 36",
    "threat": "EXTREME",
    "lastSeen": "Marrakesh transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE JACKAL HUNTER 79",
    "threat": "MEDIUM",
    "lastSeen": "Zurich transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE STEEL SPIDER 5",
    "threat": "MEDIUM",
    "lastSeen": "Marrakesh transit hub",
    "status": "MONITORED",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE RAVEN QUEEN 30",
    "threat": "MEDIUM",
    "lastSeen": "London transit hub",
    "status": "NO CONTRACTS",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE CROW WITCH 87",
    "threat": "HIGH",
    "lastSeen": "Lisbon transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE ORACLE HAND 94",
    "threat": "EXTREME",
    "lastSeen": "Hong Kong transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE NEBULA WALKER 9",
    "threat": "EXTREME",
    "lastSeen": "Istanbul transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE ORACLE LION 28",
    "threat": "MEDIUM",
    "lastSeen": "Istanbul transit hub",
    "status": "MONITORED",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE SERPENT VEIL 46",
    "threat": "MEDIUM",
    "lastSeen": "Warsaw transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE PHOENIX SPIDER 62",
    "threat": "HIGH",
    "lastSeen": "Vienna transit hub",
    "status": "AT LARGE",
    "tag": "Unvetted"
  },
  {
    "codename": "THE MIRAGE SAGE 24",
    "threat": "MEDIUM",
    "lastSeen": "Dubai transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE VIPER RIDER 65",
    "threat": "HIGH",
    "lastSeen": "Cairo transit hub",
    "status": "MONITORED",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE STEEL MOTH 41",
    "threat": "MEDIUM",
    "lastSeen": "Vienna transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE JACKAL BLADE 58",
    "threat": "CRITICAL",
    "lastSeen": "Naples transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE ORACLE WARDEN 60",
    "threat": "CRITICAL",
    "lastSeen": "Prague transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE WOLF KING 23",
    "threat": "MEDIUM",
    "lastSeen": "Dubai transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE STEEL WARDEN 42",
    "threat": "CRITICAL",
    "lastSeen": "Vienna transit hub",
    "status": "MONITORED",
    "tag": "High-Noise"
  },
  {
    "codename": "THE STEEL SAGE 82",
    "threat": "CRITICAL",
    "lastSeen": "London transit hub",
    "status": "NO CONTRACTS",
    "tag": "Freelancer"
  },
  {
    "codename": "THE EMBER TIGER 75",
    "threat": "MEDIUM",
    "lastSeen": "Prague transit hub",
    "status": "MONITORED",
    "tag": "Freelancer"
  },
  {
    "codename": "THE VIPER LARK 25",
    "threat": "MEDIUM",
    "lastSeen": "Osaka transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE ARCHITECT FOX 18",
    "threat": "MEDIUM",
    "lastSeen": "Lisbon transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE ONYX RIDER 78",
    "threat": "HIGH",
    "lastSeen": "New York transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE LOTUS WITCH 63",
    "threat": "HIGH",
    "lastSeen": "Berlin transit hub",
    "status": "AT LARGE",
    "tag": "High-Noise"
  },
  {
    "codename": "THE ONYX TIGER 23",
    "threat": "HIGH",
    "lastSeen": "Lisbon transit hub",
    "status": "AT LARGE",
    "tag": "Unvetted"
  },
  {
    "codename": "THE OBSIDIAN WALKER 88",
    "threat": "MEDIUM",
    "lastSeen": "Cairo transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE NEBULA QUEEN 14",
    "threat": "EXTREME",
    "lastSeen": "Istanbul transit hub",
    "status": "MONITORED",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE ORACLE BLADE 61",
    "threat": "HIGH",
    "lastSeen": "Osaka transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE GHOST VEIL 2",
    "threat": "HIGH",
    "lastSeen": "Reykjavik transit hub",
    "status": "NO CONTRACTS",
    "tag": "Freelancer"
  },
  {
    "codename": "THE IVORY SAGE 36",
    "threat": "CRITICAL",
    "lastSeen": "Warsaw transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE PHOENIX LION 5",
    "threat": "MEDIUM",
    "lastSeen": "Cairo transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE RAVEN WALKER 98",
    "threat": "MEDIUM",
    "lastSeen": "London transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE MIRAGE WARDEN 81",
    "threat": "HIGH",
    "lastSeen": "Reykjavik transit hub",
    "status": "NO CONTRACTS",
    "tag": "Freelancer"
  },
  {
    "codename": "THE DRIFTER WITCH 45",
    "threat": "MEDIUM",
    "lastSeen": "Lisbon transit hub",
    "status": "AT LARGE",
    "tag": "High-Noise"
  },
  {
    "codename": "THE NIGHT MOTH 2",
    "threat": "CRITICAL",
    "lastSeen": "Stockholm transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE DRIFTER KING 11",
    "threat": "EXTREME",
    "lastSeen": "Warsaw transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE MIRAGE KING 31",
    "threat": "HIGH",
    "lastSeen": "Seoul transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE CROW VEIL 56",
    "threat": "HIGH",
    "lastSeen": "Seoul transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE RAVEN VEIL 14",
    "threat": "CRITICAL",
    "lastSeen": "Warsaw transit hub",
    "status": "AT LARGE",
    "tag": "Freelancer"
  },
  {
    "codename": "THE IVORY VEIL 36",
    "threat": "EXTREME",
    "lastSeen": "Cairo transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE STEEL WITCH 42",
    "threat": "HIGH",
    "lastSeen": "Warsaw transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE NIGHT CIPHER 65",
    "threat": "CRITICAL",
    "lastSeen": "Lisbon transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE SERPENT LION 7",
    "threat": "HIGH",
    "lastSeen": "Stockholm transit hub",
    "status": "AT LARGE",
    "tag": "Unvetted"
  },
  {
    "codename": "THE PHOENIX WALKER 50",
    "threat": "CRITICAL",
    "lastSeen": "Stockholm transit hub",
    "status": "NO CONTRACTS",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE OBSIDIAN BLADE 53",
    "threat": "CRITICAL",
    "lastSeen": "New York transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE CROW QUEEN 33",
    "threat": "HIGH",
    "lastSeen": "Berlin transit hub",
    "status": "MONITORED",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE JACKAL RIDER 34",
    "threat": "HIGH",
    "lastSeen": "Lisbon transit hub",
    "status": "AT LARGE",
    "tag": "Freelancer"
  },
  {
    "codename": "THE SERPENT WALKER 39",
    "threat": "MEDIUM",
    "lastSeen": "Warsaw transit hub",
    "status": "NO CONTRACTS",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE OBSIDIAN HAND 32",
    "threat": "MEDIUM",
    "lastSeen": "Budapest transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE CROW BLADE 16",
    "threat": "MEDIUM",
    "lastSeen": "Prague transit hub",
    "status": "AT LARGE",
    "tag": "Unvetted"
  },
  {
    "codename": "THE NIGHT WARDEN 20",
    "threat": "CRITICAL",
    "lastSeen": "London transit hub",
    "status": "AT LARGE",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE CROW TIGER 45",
    "threat": "CRITICAL",
    "lastSeen": "New York transit hub",
    "status": "MONITORED",
    "tag": "High-Noise"
  },
  {
    "codename": "THE DRIFTER LARK 88",
    "threat": "EXTREME",
    "lastSeen": "Vienna transit hub",
    "status": "AT LARGE",
    "tag": "Freelancer"
  },
  {
    "codename": "THE JACKAL TIGER 76",
    "threat": "CRITICAL",
    "lastSeen": "Istanbul transit hub",
    "status": "MONITORED",
    "tag": "High-Noise"
  },
  {
    "codename": "THE SERPENT TIGER 97",
    "threat": "HIGH",
    "lastSeen": "Berlin transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE PHOENIX QUEEN 66",
    "threat": "MEDIUM",
    "lastSeen": "Seoul transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE LOTUS HAND 7",
    "threat": "HIGH",
    "lastSeen": "Budapest transit hub",
    "status": "MONITORED",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE RAVEN WITCH 29",
    "threat": "EXTREME",
    "lastSeen": "New York transit hub",
    "status": "MONITORED",
    "tag": "Freelancer"
  },
  {
    "codename": "THE NIGHT SPIDER 54",
    "threat": "HIGH",
    "lastSeen": "Istanbul transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE JACKAL LARK 45",
    "threat": "HIGH",
    "lastSeen": "Budapest transit hub",
    "status": "MONITORED",
    "tag": "High-Noise"
  },
  {
    "codename": "THE JACKAL KING 85",
    "threat": "CRITICAL",
    "lastSeen": "New York transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE SHADOW LARK 45",
    "threat": "CRITICAL",
    "lastSeen": "Hong Kong transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE SHADOW CIPHER 46",
    "threat": "MEDIUM",
    "lastSeen": "Osaka transit hub",
    "status": "AT LARGE",
    "tag": "Freelancer"
  },
  {
    "codename": "THE SPECTER CIPHER 38",
    "threat": "HIGH",
    "lastSeen": "Naples transit hub",
    "status": "MONITORED",
    "tag": "Freelancer"
  },
  {
    "codename": "THE DRIFTER WITCH 58",
    "threat": "CRITICAL",
    "lastSeen": "Berlin transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE RAVEN VEIL 86",
    "threat": "CRITICAL",
    "lastSeen": "Prague transit hub",
    "status": "MONITORED",
    "tag": "Freelancer"
  },
  {
    "codename": "THE ONYX SAGE 74",
    "threat": "MEDIUM",
    "lastSeen": "Marrakesh transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE DRIFTER VEIL 3",
    "threat": "CRITICAL",
    "lastSeen": "Cairo transit hub",
    "status": "MONITORED",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE CROW RIDER 78",
    "threat": "CRITICAL",
    "lastSeen": "London transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE MIRAGE LION 78",
    "threat": "CRITICAL",
    "lastSeen": "Berlin transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE VIPER VEIL 11",
    "threat": "EXTREME",
    "lastSeen": "Istanbul transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE FROST SPIDER 87",
    "threat": "CRITICAL",
    "lastSeen": "Zurich transit hub",
    "status": "AT LARGE",
    "tag": "Unvetted"
  },
  {
    "codename": "THE WOLF FOX 67",
    "threat": "CRITICAL",
    "lastSeen": "Zurich transit hub",
    "status": "NO CONTRACTS",
    "tag": "Freelancer"
  },
  {
    "codename": "THE CROW BLADE 74",
    "threat": "HIGH",
    "lastSeen": "Vienna transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE SERPENT QUEEN 97",
    "threat": "MEDIUM",
    "lastSeen": "Budapest transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE VIPER LARK 35",
    "threat": "CRITICAL",
    "lastSeen": "Hong Kong transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE EMBER RIDER 61",
    "threat": "MEDIUM",
    "lastSeen": "London transit hub",
    "status": "MONITORED",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE PHOENIX FOX 15",
    "threat": "CRITICAL",
    "lastSeen": "Lisbon transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE WOLF FOX 33",
    "threat": "HIGH",
    "lastSeen": "Dubai transit hub",
    "status": "NO CONTRACTS",
    "tag": "Freelancer"
  },
  {
    "codename": "THE SPECTER ECHO 87",
    "threat": "CRITICAL",
    "lastSeen": "Warsaw transit hub",
    "status": "MONITORED",
    "tag": "High-Noise"
  },
  {
    "codename": "THE EMBER TIGER 32",
    "threat": "MEDIUM",
    "lastSeen": "Budapest transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE EMBER SPIDER 52",
    "threat": "HIGH",
    "lastSeen": "London transit hub",
    "status": "NO CONTRACTS",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE DRIFTER BLADE 93",
    "threat": "MEDIUM",
    "lastSeen": "Seoul transit hub",
    "status": "MONITORED",
    "tag": "High-Noise"
  },
  {
    "codename": "THE FROST LION 72",
    "threat": "HIGH",
    "lastSeen": "Seoul transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE STEEL VEIL 47",
    "threat": "CRITICAL",
    "lastSeen": "Budapest transit hub",
    "status": "MONITORED",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE PHOENIX QUEEN 20",
    "threat": "HIGH",
    "lastSeen": "Istanbul transit hub",
    "status": "MONITORED",
    "tag": "High-Noise"
  },
  {
    "codename": "THE PHOENIX SPIDER 62",
    "threat": "CRITICAL",
    "lastSeen": "New York transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE ORACLE TIGER 90",
    "threat": "HIGH",
    "lastSeen": "Lisbon transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE GHOST ECHO 92",
    "threat": "CRITICAL",
    "lastSeen": "Casablanca transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE RAVEN LION 77",
    "threat": "CRITICAL",
    "lastSeen": "Prague transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE RAVEN SAGE 99",
    "threat": "CRITICAL",
    "lastSeen": "Osaka transit hub",
    "status": "MONITORED",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE SHADOW KING 77",
    "threat": "MEDIUM",
    "lastSeen": "Warsaw transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE WOLF QUEEN 21",
    "threat": "EXTREME",
    "lastSeen": "London transit hub",
    "status": "AT LARGE",
    "tag": "High-Noise"
  },
  {
    "codename": "THE NEBULA BLADE 59",
    "threat": "EXTREME",
    "lastSeen": "Vienna transit hub",
    "status": "AT LARGE",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE STEEL FOX 44",
    "threat": "EXTREME",
    "lastSeen": "Stockholm transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE EMBER WARDEN 16",
    "threat": "HIGH",
    "lastSeen": "Budapest transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE WOLF BLADE 44",
    "threat": "MEDIUM",
    "lastSeen": "Cairo transit hub",
    "status": "AT LARGE",
    "tag": "Freelancer"
  },
  {
    "codename": "THE WOLF SAGE 29",
    "threat": "CRITICAL",
    "lastSeen": "London transit hub",
    "status": "MONITORED",
    "tag": "Freelancer"
  },
  {
    "codename": "THE SHADOW WITCH 84",
    "threat": "MEDIUM",
    "lastSeen": "Naples transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE ARCHITECT HUNTER 83",
    "threat": "EXTREME",
    "lastSeen": "Hong Kong transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE EMBER HUNTER 12",
    "threat": "EXTREME",
    "lastSeen": "Casablanca transit hub",
    "status": "MONITORED",
    "tag": "Freelancer"
  },
  {
    "codename": "THE SERPENT HAND 61",
    "threat": "MEDIUM",
    "lastSeen": "Marrakesh transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE LOTUS SPIDER 40",
    "threat": "HIGH",
    "lastSeen": "Naples transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE SERPENT LARK 38",
    "threat": "HIGH",
    "lastSeen": "Istanbul transit hub",
    "status": "AT LARGE",
    "tag": "Freelancer"
  },
  {
    "codename": "THE MIRAGE FOX 96",
    "threat": "MEDIUM",
    "lastSeen": "Casablanca transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE SERPENT WITCH 42",
    "threat": "MEDIUM",
    "lastSeen": "Vienna transit hub",
    "status": "AT LARGE",
    "tag": "High-Noise"
  },
  {
    "codename": "THE RAVEN WALKER 32",
    "threat": "CRITICAL",
    "lastSeen": "Naples transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE ONYX LION 32",
    "threat": "CRITICAL",
    "lastSeen": "Reykjavik transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE WOLF BLADE 70",
    "threat": "MEDIUM",
    "lastSeen": "Hong Kong transit hub",
    "status": "MONITORED",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE RAVEN LION 35",
    "threat": "MEDIUM",
    "lastSeen": "Hong Kong transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE CROW SAGE 74",
    "threat": "MEDIUM",
    "lastSeen": "Reykjavik transit hub",
    "status": "AT LARGE",
    "tag": "Freelancer"
  },
  {
    "codename": "THE ARCHITECT WITCH 18",
    "threat": "MEDIUM",
    "lastSeen": "Dubai transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE FROST LARK 4",
    "threat": "HIGH",
    "lastSeen": "Istanbul transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE EMBER RIDER 78",
    "threat": "EXTREME",
    "lastSeen": "New York transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE LOTUS TIGER 64",
    "threat": "EXTREME",
    "lastSeen": "Stockholm transit hub",
    "status": "AT LARGE",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE EMBER HAND 27",
    "threat": "EXTREME",
    "lastSeen": "Naples transit hub",
    "status": "AT LARGE",
    "tag": "High-Noise"
  },
  {
    "codename": "THE SERPENT LARK 75",
    "threat": "CRITICAL",
    "lastSeen": "Berlin transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE EMBER TIGER 27",
    "threat": "HIGH",
    "lastSeen": "Stockholm transit hub",
    "status": "AT LARGE",
    "tag": "Unvetted"
  },
  {
    "codename": "THE ONYX BLADE 48",
    "threat": "CRITICAL",
    "lastSeen": "Stockholm transit hub",
    "status": "NO CONTRACTS",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE MIRAGE LION 12",
    "threat": "MEDIUM",
    "lastSeen": "Seoul transit hub",
    "status": "MONITORED",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE WOLF RIDER 39",
    "threat": "MEDIUM",
    "lastSeen": "Prague transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE MIRAGE RIDER 32",
    "threat": "MEDIUM",
    "lastSeen": "Vienna transit hub",
    "status": "AT LARGE",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE EMBER MOTH 25",
    "threat": "CRITICAL",
    "lastSeen": "Vienna transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE ORACLE LION 35",
    "threat": "CRITICAL",
    "lastSeen": "Marrakesh transit hub",
    "status": "NO CONTRACTS",
    "tag": "Freelancer"
  },
  {
    "codename": "THE OBSIDIAN TIGER 33",
    "threat": "EXTREME",
    "lastSeen": "Cairo transit hub",
    "status": "AT LARGE",
    "tag": "Unvetted"
  },
  {
    "codename": "THE ONYX BLADE 91",
    "threat": "CRITICAL",
    "lastSeen": "Naples transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE ORACLE SAGE 89",
    "threat": "MEDIUM",
    "lastSeen": "Cairo transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE RAVEN RIDER 76",
    "threat": "HIGH",
    "lastSeen": "Cairo transit hub",
    "status": "AT LARGE",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE SPECTER CIPHER 76",
    "threat": "HIGH",
    "lastSeen": "Naples transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE NIGHT KING 77",
    "threat": "HIGH",
    "lastSeen": "Dubai transit hub",
    "status": "MONITORED",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE LOTUS WARDEN 76",
    "threat": "CRITICAL",
    "lastSeen": "Zurich transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE CROW SAGE 32",
    "threat": "MEDIUM",
    "lastSeen": "Istanbul transit hub",
    "status": "AT LARGE",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE NEBULA RIDER 47",
    "threat": "MEDIUM",
    "lastSeen": "New York transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE DRIFTER WITCH 9",
    "threat": "EXTREME",
    "lastSeen": "Naples transit hub",
    "status": "MONITORED",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE MIRAGE HUNTER 4",
    "threat": "HIGH",
    "lastSeen": "Osaka transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE NIGHT LION 75",
    "threat": "CRITICAL",
    "lastSeen": "Naples transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE WOLF VEIL 37",
    "threat": "EXTREME",
    "lastSeen": "Budapest transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE IVORY RIDER 83",
    "threat": "EXTREME",
    "lastSeen": "Seoul transit hub",
    "status": "AT LARGE",
    "tag": "Unvetted"
  },
  {
    "codename": "THE ORACLE SAGE 54",
    "threat": "CRITICAL",
    "lastSeen": "Casablanca transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE JACKAL CIPHER 42",
    "threat": "CRITICAL",
    "lastSeen": "New York transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE MIRAGE HUNTER 52",
    "threat": "EXTREME",
    "lastSeen": "Reykjavik transit hub",
    "status": "MONITORED",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE ONYX LION 39",
    "threat": "CRITICAL",
    "lastSeen": "Dubai transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE GHOST QUEEN 36",
    "threat": "CRITICAL",
    "lastSeen": "Cairo transit hub",
    "status": "AT LARGE",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE PHOENIX LARK 50",
    "threat": "CRITICAL",
    "lastSeen": "Cairo transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE GHOST CIPHER 45",
    "threat": "CRITICAL",
    "lastSeen": "Osaka transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE IVORY RIDER 42",
    "threat": "CRITICAL",
    "lastSeen": "Istanbul transit hub",
    "status": "AT LARGE",
    "tag": "Freelancer"
  },
  {
    "codename": "THE RAVEN ECHO 28",
    "threat": "HIGH",
    "lastSeen": "Dubai transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE LOTUS LARK 35",
    "threat": "MEDIUM",
    "lastSeen": "Vienna transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE ORACLE KING 7",
    "threat": "EXTREME",
    "lastSeen": "Prague transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE CROW LION 68",
    "threat": "EXTREME",
    "lastSeen": "Zurich transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE JACKAL LARK 71",
    "threat": "MEDIUM",
    "lastSeen": "Osaka transit hub",
    "status": "MONITORED",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE ONYX KING 5",
    "threat": "CRITICAL",
    "lastSeen": "Hong Kong transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE GHOST MOTH 33",
    "threat": "CRITICAL",
    "lastSeen": "Budapest transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE VIPER QUEEN 59",
    "threat": "EXTREME",
    "lastSeen": "Berlin transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE OBSIDIAN SPIDER 55",
    "threat": "CRITICAL",
    "lastSeen": "Dubai transit hub",
    "status": "AT LARGE",
    "tag": "High-Noise"
  },
  {
    "codename": "THE SHADOW LION 76",
    "threat": "MEDIUM",
    "lastSeen": "Prague transit hub",
    "status": "AT LARGE",
    "tag": "High-Noise"
  },
  {
    "codename": "THE LOTUS MOTH 6",
    "threat": "HIGH",
    "lastSeen": "Osaka transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE MIRAGE FOX 48",
    "threat": "HIGH",
    "lastSeen": "Reykjavik transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE SPECTER WARDEN 34",
    "threat": "MEDIUM",
    "lastSeen": "Zurich transit hub",
    "status": "NO CONTRACTS",
    "tag": "Freelancer"
  },
  {
    "codename": "THE NIGHT VEIL 24",
    "threat": "CRITICAL",
    "lastSeen": "Stockholm transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE EMBER MOTH 28",
    "threat": "HIGH",
    "lastSeen": "Marrakesh transit hub",
    "status": "NO CONTRACTS",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE SPECTER LARK 46",
    "threat": "HIGH",
    "lastSeen": "Osaka transit hub",
    "status": "AT LARGE",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE LOTUS WARDEN 4",
    "threat": "MEDIUM",
    "lastSeen": "Warsaw transit hub",
    "status": "MONITORED",
    "tag": "Freelancer"
  },
  {
    "codename": "THE JACKAL BLADE 80",
    "threat": "MEDIUM",
    "lastSeen": "Stockholm transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE WOLF QUEEN 67",
    "threat": "MEDIUM",
    "lastSeen": "Hong Kong transit hub",
    "status": "AT LARGE",
    "tag": "High-Noise"
  },
  {
    "codename": "THE SERPENT WALKER 40",
    "threat": "HIGH",
    "lastSeen": "Stockholm transit hub",
    "status": "AT LARGE",
    "tag": "Freelancer"
  },
  {
    "codename": "THE EMBER LARK 22",
    "threat": "EXTREME",
    "lastSeen": "Zurich transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE SERPENT LION 32",
    "threat": "CRITICAL",
    "lastSeen": "Prague transit hub",
    "status": "AT LARGE",
    "tag": "High-Noise"
  },
  {
    "codename": "THE JACKAL LARK 53",
    "threat": "EXTREME",
    "lastSeen": "Reykjavik transit hub",
    "status": "MONITORED",
    "tag": "Freelancer"
  },
  {
    "codename": "THE EMBER LARK 37",
    "threat": "EXTREME",
    "lastSeen": "Vienna transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE GHOST BLADE 90",
    "threat": "EXTREME",
    "lastSeen": "Berlin transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE ORACLE WALKER 73",
    "threat": "EXTREME",
    "lastSeen": "Warsaw transit hub",
    "status": "MONITORED",
    "tag": "Freelancer"
  },
  {
    "codename": "THE IVORY LION 14",
    "threat": "MEDIUM",
    "lastSeen": "Dubai transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE ORACLE HAND 48",
    "threat": "CRITICAL",
    "lastSeen": "Istanbul transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE SERPENT TIGER 81",
    "threat": "MEDIUM",
    "lastSeen": "Dubai transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE EMBER LION 88",
    "threat": "EXTREME",
    "lastSeen": "Zurich transit hub",
    "status": "NO CONTRACTS",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE ONYX WARDEN 2",
    "threat": "CRITICAL",
    "lastSeen": "Istanbul transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE EMBER HAND 75",
    "threat": "MEDIUM",
    "lastSeen": "Budapest transit hub",
    "status": "NO CONTRACTS",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE DRIFTER SPIDER 21",
    "threat": "HIGH",
    "lastSeen": "Prague transit hub",
    "status": "AT LARGE",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE STEEL TIGER 67",
    "threat": "CRITICAL",
    "lastSeen": "Budapest transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE SHADOW LION 86",
    "threat": "EXTREME",
    "lastSeen": "Vienna transit hub",
    "status": "AT LARGE",
    "tag": "Unvetted"
  },
  {
    "codename": "THE NIGHT HUNTER 86",
    "threat": "CRITICAL",
    "lastSeen": "Osaka transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE SERPENT LARK 18",
    "threat": "HIGH",
    "lastSeen": "London transit hub",
    "status": "MONITORED",
    "tag": "High-Noise"
  },
  {
    "codename": "THE VIPER SAGE 88",
    "threat": "MEDIUM",
    "lastSeen": "London transit hub",
    "status": "NO CONTRACTS",
    "tag": "Freelancer"
  },
  {
    "codename": "THE ORACLE BLADE 42",
    "threat": "EXTREME",
    "lastSeen": "Prague transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE SHADOW WALKER 5",
    "threat": "HIGH",
    "lastSeen": "Zurich transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE VIPER CIPHER 2",
    "threat": "CRITICAL",
    "lastSeen": "New York transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE WOLF HAND 22",
    "threat": "MEDIUM",
    "lastSeen": "Zurich transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE NIGHT WITCH 11",
    "threat": "CRITICAL",
    "lastSeen": "Zurich transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE PHOENIX BLADE 23",
    "threat": "MEDIUM",
    "lastSeen": "Naples transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE ONYX LION 40",
    "threat": "MEDIUM",
    "lastSeen": "Zurich transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE PHOENIX KING 12",
    "threat": "HIGH",
    "lastSeen": "Warsaw transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE FROST HAND 56",
    "threat": "MEDIUM",
    "lastSeen": "Istanbul transit hub",
    "status": "MONITORED",
    "tag": "Freelancer"
  },
  {
    "codename": "THE FROST WITCH 18",
    "threat": "EXTREME",
    "lastSeen": "Reykjavik transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE CROW SPIDER 9",
    "threat": "MEDIUM",
    "lastSeen": "Istanbul transit hub",
    "status": "MONITORED",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE SERPENT FOX 53",
    "threat": "EXTREME",
    "lastSeen": "Dubai transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE OBSIDIAN RIDER 44",
    "threat": "CRITICAL",
    "lastSeen": "Dubai transit hub",
    "status": "MONITORED",
    "tag": "High-Noise"
  },
  {
    "codename": "THE RAVEN WALKER 47",
    "threat": "EXTREME",
    "lastSeen": "Reykjavik transit hub",
    "status": "MONITORED",
    "tag": "Freelancer"
  },
  {
    "codename": "THE NIGHT HUNTER 47",
    "threat": "CRITICAL",
    "lastSeen": "Zurich transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE SPECTER QUEEN 82",
    "threat": "MEDIUM",
    "lastSeen": "Seoul transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE SHADOW MOTH 47",
    "threat": "HIGH",
    "lastSeen": "Istanbul transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE WOLF TIGER 55",
    "threat": "EXTREME",
    "lastSeen": "Hong Kong transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE DRIFTER BLADE 63",
    "threat": "HIGH",
    "lastSeen": "Marrakesh transit hub",
    "status": "NO CONTRACTS",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE ARCHITECT MOTH 70",
    "threat": "CRITICAL",
    "lastSeen": "Berlin transit hub",
    "status": "AT LARGE",
    "tag": "Unvetted"
  },
  {
    "codename": "THE WOLF SPIDER 22",
    "threat": "CRITICAL",
    "lastSeen": "Istanbul transit hub",
    "status": "NO CONTRACTS",
    "tag": "Freelancer"
  },
  {
    "codename": "THE GHOST WARDEN 36",
    "threat": "CRITICAL",
    "lastSeen": "Naples transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE SPECTER WARDEN 65",
    "threat": "MEDIUM",
    "lastSeen": "Osaka transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE ORACLE SAGE 70",
    "threat": "MEDIUM",
    "lastSeen": "London transit hub",
    "status": "AT LARGE",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE EMBER LION 99",
    "threat": "EXTREME",
    "lastSeen": "Cairo transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE GHOST KING 81",
    "threat": "MEDIUM",
    "lastSeen": "Dubai transit hub",
    "status": "AT LARGE",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE NEBULA WALKER 66",
    "threat": "EXTREME",
    "lastSeen": "Istanbul transit hub",
    "status": "NO CONTRACTS",
    "tag": "Freelancer"
  },
  {
    "codename": "THE IVORY HUNTER 60",
    "threat": "EXTREME",
    "lastSeen": "Prague transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE JACKAL MOTH 7",
    "threat": "HIGH",
    "lastSeen": "Osaka transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE CROW QUEEN 20",
    "threat": "EXTREME",
    "lastSeen": "New York transit hub",
    "status": "NO CONTRACTS",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE VIPER ECHO 89",
    "threat": "CRITICAL",
    "lastSeen": "Stockholm transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE SHADOW TIGER 54",
    "threat": "HIGH",
    "lastSeen": "Warsaw transit hub",
    "status": "AT LARGE",
    "tag": "Freelancer"
  },
  {
    "codename": "THE SPECTER KING 88",
    "threat": "HIGH",
    "lastSeen": "Stockholm transit hub",
    "status": "MONITORED",
    "tag": "Freelancer"
  },
  {
    "codename": "THE FROST BLADE 58",
    "threat": "CRITICAL",
    "lastSeen": "Reykjavik transit hub",
    "status": "MONITORED",
    "tag": "Freelancer"
  },
  {
    "codename": "THE FROST MOTH 29",
    "threat": "MEDIUM",
    "lastSeen": "Hong Kong transit hub",
    "status": "NO CONTRACTS",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE PHOENIX TIGER 8",
    "threat": "MEDIUM",
    "lastSeen": "Zurich transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE WOLF TIGER 88",
    "threat": "CRITICAL",
    "lastSeen": "Hong Kong transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE PHOENIX MOTH 18",
    "threat": "CRITICAL",
    "lastSeen": "Zurich transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE JACKAL WARDEN 78",
    "threat": "HIGH",
    "lastSeen": "Reykjavik transit hub",
    "status": "MONITORED",
    "tag": "High-Noise"
  },
  {
    "codename": "THE VIPER SAGE 81",
    "threat": "CRITICAL",
    "lastSeen": "Naples transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE LOTUS SPIDER 15",
    "threat": "EXTREME",
    "lastSeen": "Casablanca transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE ORACLE KING 50",
    "threat": "CRITICAL",
    "lastSeen": "Cairo transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE PHOENIX LION 43",
    "threat": "EXTREME",
    "lastSeen": "Berlin transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE OBSIDIAN WARDEN 14",
    "threat": "CRITICAL",
    "lastSeen": "Zurich transit hub",
    "status": "NO CONTRACTS",
    "tag": "Freelancer"
  },
  {
    "codename": "THE DRIFTER LARK 36",
    "threat": "CRITICAL",
    "lastSeen": "Warsaw transit hub",
    "status": "MONITORED",
    "tag": "High-Noise"
  },
  {
    "codename": "THE STEEL WALKER 5",
    "threat": "MEDIUM",
    "lastSeen": "Istanbul transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE SPECTER MOTH 79",
    "threat": "MEDIUM",
    "lastSeen": "Casablanca transit hub",
    "status": "AT LARGE",
    "tag": "High-Noise"
  },
  {
    "codename": "THE NIGHT FOX 94",
    "threat": "EXTREME",
    "lastSeen": "Osaka transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE DRIFTER WALKER 18",
    "threat": "EXTREME",
    "lastSeen": "Casablanca transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE NIGHT SAGE 63",
    "threat": "MEDIUM",
    "lastSeen": "Hong Kong transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE DRIFTER WITCH 79",
    "threat": "CRITICAL",
    "lastSeen": "Seoul transit hub",
    "status": "MONITORED",
    "tag": "Freelancer"
  },
  {
    "codename": "THE STEEL FOX 93",
    "threat": "HIGH",
    "lastSeen": "Berlin transit hub",
    "status": "AT LARGE",
    "tag": "Unvetted"
  },
  {
    "codename": "THE MIRAGE BLADE 32",
    "threat": "HIGH",
    "lastSeen": "Osaka transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE EMBER KING 92",
    "threat": "HIGH",
    "lastSeen": "Prague transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE NEBULA WALKER 75",
    "threat": "HIGH",
    "lastSeen": "Warsaw transit hub",
    "status": "AT LARGE",
    "tag": "Unvetted"
  },
  {
    "codename": "THE DRIFTER BLADE 35",
    "threat": "HIGH",
    "lastSeen": "New York transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE NEBULA TIGER 72",
    "threat": "HIGH",
    "lastSeen": "Hong Kong transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE GHOST WALKER 95",
    "threat": "CRITICAL",
    "lastSeen": "Marrakesh transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE SHADOW WALKER 73",
    "threat": "EXTREME",
    "lastSeen": "Marrakesh transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE ARCHITECT QUEEN 79",
    "threat": "CRITICAL",
    "lastSeen": "Warsaw transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE ORACLE QUEEN 83",
    "threat": "EXTREME",
    "lastSeen": "Cairo transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE MIRAGE WALKER 31",
    "threat": "EXTREME",
    "lastSeen": "Warsaw transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE WOLF TIGER 62",
    "threat": "CRITICAL",
    "lastSeen": "Berlin transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE ARCHITECT TIGER 63",
    "threat": "MEDIUM",
    "lastSeen": "Zurich transit hub",
    "status": "AT LARGE",
    "tag": "Freelancer"
  },
  {
    "codename": "THE ORACLE WALKER 67",
    "threat": "MEDIUM",
    "lastSeen": "Warsaw transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE NEBULA HUNTER 46",
    "threat": "EXTREME",
    "lastSeen": "Lisbon transit hub",
    "status": "MONITORED",
    "tag": "Freelancer"
  },
  {
    "codename": "THE WOLF QUEEN 27",
    "threat": "MEDIUM",
    "lastSeen": "Budapest transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE WOLF KING 98",
    "threat": "MEDIUM",
    "lastSeen": "Stockholm transit hub",
    "status": "AT LARGE",
    "tag": "Freelancer"
  },
  {
    "codename": "THE SPECTER KING 59",
    "threat": "MEDIUM",
    "lastSeen": "Lisbon transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE SERPENT WITCH 76",
    "threat": "HIGH",
    "lastSeen": "Marrakesh transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE ARCHITECT WALKER 42",
    "threat": "MEDIUM",
    "lastSeen": "Marrakesh transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE RAVEN HUNTER 71",
    "threat": "MEDIUM",
    "lastSeen": "London transit hub",
    "status": "MONITORED",
    "tag": "Freelancer"
  },
  {
    "codename": "THE OBSIDIAN SPIDER 6",
    "threat": "HIGH",
    "lastSeen": "Hong Kong transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE FROST SAGE 56",
    "threat": "CRITICAL",
    "lastSeen": "Vienna transit hub",
    "status": "MONITORED",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE SHADOW TIGER 4",
    "threat": "EXTREME",
    "lastSeen": "Budapest transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE NEBULA HAND 8",
    "threat": "MEDIUM",
    "lastSeen": "London transit hub",
    "status": "AT LARGE",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE ONYX KING 92",
    "threat": "MEDIUM",
    "lastSeen": "Hong Kong transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE MIRAGE WITCH 30",
    "threat": "EXTREME",
    "lastSeen": "Zurich transit hub",
    "status": "MONITORED",
    "tag": "High-Noise"
  },
  {
    "codename": "THE LOTUS VEIL 90",
    "threat": "MEDIUM",
    "lastSeen": "Zurich transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE CROW CIPHER 27",
    "threat": "HIGH",
    "lastSeen": "Naples transit hub",
    "status": "NO CONTRACTS",
    "tag": "Freelancer"
  },
  {
    "codename": "THE CROW KING 44",
    "threat": "MEDIUM",
    "lastSeen": "Osaka transit hub",
    "status": "MONITORED",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE PHOENIX RIDER 82",
    "threat": "MEDIUM",
    "lastSeen": "Naples transit hub",
    "status": "NO CONTRACTS",
    "tag": "Freelancer"
  },
  {
    "codename": "THE RAVEN MOTH 37",
    "threat": "MEDIUM",
    "lastSeen": "Dubai transit hub",
    "status": "NO CONTRACTS",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE SERPENT ECHO 14",
    "threat": "MEDIUM",
    "lastSeen": "Casablanca transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE EMBER LARK 88",
    "threat": "MEDIUM",
    "lastSeen": "Berlin transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE JACKAL WARDEN 57",
    "threat": "EXTREME",
    "lastSeen": "Marrakesh transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE SPECTER SAGE 84",
    "threat": "EXTREME",
    "lastSeen": "Zurich transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE SPECTER WALKER 96",
    "threat": "MEDIUM",
    "lastSeen": "Lisbon transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE FROST LION 13",
    "threat": "MEDIUM",
    "lastSeen": "Warsaw transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE DRIFTER WITCH 81",
    "threat": "EXTREME",
    "lastSeen": "New York transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE JACKAL BLADE 8",
    "threat": "MEDIUM",
    "lastSeen": "Zurich transit hub",
    "status": "AT LARGE",
    "tag": "Freelancer"
  },
  {
    "codename": "THE ORACLE FOX 76",
    "threat": "EXTREME",
    "lastSeen": "Budapest transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE GHOST LARK 75",
    "threat": "HIGH",
    "lastSeen": "Osaka transit hub",
    "status": "MONITORED",
    "tag": "Freelancer"
  },
  {
    "codename": "THE SHADOW HAND 52",
    "threat": "MEDIUM",
    "lastSeen": "Reykjavik transit hub",
    "status": "AT LARGE",
    "tag": "Freelancer"
  },
  {
    "codename": "THE JACKAL FOX 97",
    "threat": "MEDIUM",
    "lastSeen": "Osaka transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE MIRAGE WALKER 9",
    "threat": "HIGH",
    "lastSeen": "London transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE ORACLE KING 83",
    "threat": "CRITICAL",
    "lastSeen": "Casablanca transit hub",
    "status": "MONITORED",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE GHOST QUEEN 3",
    "threat": "CRITICAL",
    "lastSeen": "Stockholm transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE IVORY LION 34",
    "threat": "CRITICAL",
    "lastSeen": "Prague transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE MIRAGE SAGE 60",
    "threat": "MEDIUM",
    "lastSeen": "London transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE CROW BLADE 42",
    "threat": "CRITICAL",
    "lastSeen": "Istanbul transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE VIPER HUNTER 85",
    "threat": "EXTREME",
    "lastSeen": "Zurich transit hub",
    "status": "NO CONTRACTS",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE EMBER WITCH 42",
    "threat": "EXTREME",
    "lastSeen": "Reykjavik transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE ORACLE WALKER 68",
    "threat": "MEDIUM",
    "lastSeen": "Zurich transit hub",
    "status": "MONITORED",
    "tag": "Freelancer"
  },
  {
    "codename": "THE STEEL CIPHER 70",
    "threat": "CRITICAL",
    "lastSeen": "Casablanca transit hub",
    "status": "MONITORED",
    "tag": "High-Noise"
  },
  {
    "codename": "THE ONYX QUEEN 34",
    "threat": "EXTREME",
    "lastSeen": "Berlin transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE JACKAL SAGE 1",
    "threat": "EXTREME",
    "lastSeen": "Warsaw transit hub",
    "status": "AT LARGE",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE FROST RIDER 34",
    "threat": "EXTREME",
    "lastSeen": "London transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE RAVEN WALKER 77",
    "threat": "EXTREME",
    "lastSeen": "Marrakesh transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE MIRAGE HAND 85",
    "threat": "EXTREME",
    "lastSeen": "Osaka transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE CROW SAGE 87",
    "threat": "EXTREME",
    "lastSeen": "London transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE NEBULA HUNTER 30",
    "threat": "CRITICAL",
    "lastSeen": "Stockholm transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE CROW MOTH 3",
    "threat": "CRITICAL",
    "lastSeen": "Zurich transit hub",
    "status": "MONITORED",
    "tag": "Freelancer"
  },
  {
    "codename": "THE ARCHITECT BLADE 21",
    "threat": "CRITICAL",
    "lastSeen": "Budapest transit hub",
    "status": "MONITORED",
    "tag": "High-Noise"
  },
  {
    "codename": "THE NIGHT BLADE 86",
    "threat": "HIGH",
    "lastSeen": "New York transit hub",
    "status": "AT LARGE",
    "tag": "Freelancer"
  },
  {
    "codename": "THE ARCHITECT TIGER 30",
    "threat": "HIGH",
    "lastSeen": "Stockholm transit hub",
    "status": "NO CONTRACTS",
    "tag": "Freelancer"
  },
  {
    "codename": "THE STEEL SAGE 66",
    "threat": "EXTREME",
    "lastSeen": "Vienna transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE GHOST MOTH 4",
    "threat": "MEDIUM",
    "lastSeen": "Lisbon transit hub",
    "status": "AT LARGE",
    "tag": "High-Noise"
  },
  {
    "codename": "THE ORACLE VEIL 75",
    "threat": "EXTREME",
    "lastSeen": "New York transit hub",
    "status": "MONITORED",
    "tag": "High-Noise"
  },
  {
    "codename": "THE LOTUS LARK 40",
    "threat": "HIGH",
    "lastSeen": "Seoul transit hub",
    "status": "NO CONTRACTS",
    "tag": "Freelancer"
  },
  {
    "codename": "THE SPECTER FOX 55",
    "threat": "MEDIUM",
    "lastSeen": "Osaka transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE FROST CIPHER 48",
    "threat": "MEDIUM",
    "lastSeen": "Marrakesh transit hub",
    "status": "AT LARGE",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE GHOST WITCH 79",
    "threat": "HIGH",
    "lastSeen": "Istanbul transit hub",
    "status": "AT LARGE",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE RAVEN HUNTER 66",
    "threat": "HIGH",
    "lastSeen": "Zurich transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE LOTUS MOTH 87",
    "threat": "HIGH",
    "lastSeen": "Hong Kong transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE ARCHITECT VEIL 85",
    "threat": "HIGH",
    "lastSeen": "Stockholm transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE OBSIDIAN SAGE 75",
    "threat": "HIGH",
    "lastSeen": "Naples transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE SPECTER BLADE 46",
    "threat": "HIGH",
    "lastSeen": "London transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE ONYX BLADE 14",
    "threat": "HIGH",
    "lastSeen": "Berlin transit hub",
    "status": "MONITORED",
    "tag": "Freelancer"
  },
  {
    "codename": "THE ARCHITECT WALKER 41",
    "threat": "CRITICAL",
    "lastSeen": "Lisbon transit hub",
    "status": "MONITORED",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE IVORY HAND 26",
    "threat": "HIGH",
    "lastSeen": "Osaka transit hub",
    "status": "MONITORED",
    "tag": "High-Noise"
  },
  {
    "codename": "THE DRIFTER LION 79",
    "threat": "MEDIUM",
    "lastSeen": "Reykjavik transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE NIGHT TIGER 24",
    "threat": "MEDIUM",
    "lastSeen": "Reykjavik transit hub",
    "status": "NO CONTRACTS",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE STEEL LION 90",
    "threat": "CRITICAL",
    "lastSeen": "Prague transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE SERPENT TIGER 83",
    "threat": "HIGH",
    "lastSeen": "Berlin transit hub",
    "status": "MONITORED",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE ONYX HAND 20",
    "threat": "HIGH",
    "lastSeen": "Vienna transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE EMBER WITCH 32",
    "threat": "HIGH",
    "lastSeen": "Cairo transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE GHOST FOX 82",
    "threat": "EXTREME",
    "lastSeen": "Lisbon transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE WOLF KING 57",
    "threat": "HIGH",
    "lastSeen": "Osaka transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE NEBULA MOTH 50",
    "threat": "CRITICAL",
    "lastSeen": "Marrakesh transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE NEBULA FOX 42",
    "threat": "HIGH",
    "lastSeen": "Warsaw transit hub",
    "status": "MONITORED",
    "tag": "Freelancer"
  },
  {
    "codename": "THE WOLF WITCH 85",
    "threat": "MEDIUM",
    "lastSeen": "Dubai transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE EMBER SPIDER 17",
    "threat": "EXTREME",
    "lastSeen": "New York transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE SHADOW WARDEN 81",
    "threat": "CRITICAL",
    "lastSeen": "Zurich transit hub",
    "status": "NO CONTRACTS",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE EMBER KING 64",
    "threat": "CRITICAL",
    "lastSeen": "Zurich transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE FROST HAND 98",
    "threat": "HIGH",
    "lastSeen": "Osaka transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE FROST SAGE 49",
    "threat": "MEDIUM",
    "lastSeen": "Osaka transit hub",
    "status": "MONITORED",
    "tag": "High-Noise"
  },
  {
    "codename": "THE WOLF MOTH 59",
    "threat": "EXTREME",
    "lastSeen": "New York transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE ARCHITECT HAND 16",
    "threat": "EXTREME",
    "lastSeen": "Osaka transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE IVORY FOX 68",
    "threat": "HIGH",
    "lastSeen": "Stockholm transit hub",
    "status": "MONITORED",
    "tag": "Freelancer"
  },
  {
    "codename": "THE SHADOW FOX 8",
    "threat": "CRITICAL",
    "lastSeen": "Dubai transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE FROST FOX 45",
    "threat": "EXTREME",
    "lastSeen": "Reykjavik transit hub",
    "status": "NO CONTRACTS",
    "tag": "Freelancer"
  },
  {
    "codename": "THE VIPER BLADE 88",
    "threat": "HIGH",
    "lastSeen": "Dubai transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE OBSIDIAN HUNTER 96",
    "threat": "HIGH",
    "lastSeen": "Dubai transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE ARCHITECT TIGER 66",
    "threat": "HIGH",
    "lastSeen": "Berlin transit hub",
    "status": "MONITORED",
    "tag": "High-Noise"
  },
  {
    "codename": "THE FROST HUNTER 85",
    "threat": "CRITICAL",
    "lastSeen": "Hong Kong transit hub",
    "status": "MONITORED",
    "tag": "High-Noise"
  },
  {
    "codename": "THE OBSIDIAN HAND 92",
    "threat": "MEDIUM",
    "lastSeen": "Reykjavik transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE DRIFTER LION 47",
    "threat": "HIGH",
    "lastSeen": "Prague transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE ONYX BLADE 92",
    "threat": "EXTREME",
    "lastSeen": "London transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE EMBER MOTH 69",
    "threat": "EXTREME",
    "lastSeen": "Vienna transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE VIPER HAND 28",
    "threat": "CRITICAL",
    "lastSeen": "Zurich transit hub",
    "status": "AT LARGE",
    "tag": "Freelancer"
  },
  {
    "codename": "THE PHOENIX SPIDER 48",
    "threat": "MEDIUM",
    "lastSeen": "Warsaw transit hub",
    "status": "AT LARGE",
    "tag": "High-Noise"
  },
  {
    "codename": "THE ARCHITECT WITCH 23",
    "threat": "HIGH",
    "lastSeen": "Osaka transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE SERPENT HAND 23",
    "threat": "CRITICAL",
    "lastSeen": "Lisbon transit hub",
    "status": "AT LARGE",
    "tag": "High-Noise"
  },
  {
    "codename": "THE PHOENIX FOX 29",
    "threat": "HIGH",
    "lastSeen": "Prague transit hub",
    "status": "MONITORED",
    "tag": "High-Noise"
  },
  {
    "codename": "THE SPECTER MOTH 88",
    "threat": "MEDIUM",
    "lastSeen": "Berlin transit hub",
    "status": "AT LARGE",
    "tag": "High-Noise"
  },
  {
    "codename": "THE JACKAL WITCH 96",
    "threat": "CRITICAL",
    "lastSeen": "London transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE VIPER WALKER 10",
    "threat": "MEDIUM",
    "lastSeen": "Lisbon transit hub",
    "status": "MONITORED",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE DRIFTER SPIDER 39",
    "threat": "HIGH",
    "lastSeen": "Naples transit hub",
    "status": "MONITORED",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE LOTUS MOTH 75",
    "threat": "CRITICAL",
    "lastSeen": "Hong Kong transit hub",
    "status": "AT LARGE",
    "tag": "Freelancer"
  },
  {
    "codename": "THE JACKAL RIDER 86",
    "threat": "EXTREME",
    "lastSeen": "Marrakesh transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE OBSIDIAN HUNTER 34",
    "threat": "EXTREME",
    "lastSeen": "Prague transit hub",
    "status": "AT LARGE",
    "tag": "Unvetted"
  },
  {
    "codename": "THE STEEL HAND 24",
    "threat": "HIGH",
    "lastSeen": "Berlin transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE EMBER KING 3",
    "threat": "MEDIUM",
    "lastSeen": "Marrakesh transit hub",
    "status": "MONITORED",
    "tag": "High-Noise"
  },
  {
    "codename": "THE EMBER HAND 34",
    "threat": "HIGH",
    "lastSeen": "New York transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE RAVEN CIPHER 14",
    "threat": "HIGH",
    "lastSeen": "Lisbon transit hub",
    "status": "NO CONTRACTS",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE CROW HAND 40",
    "threat": "HIGH",
    "lastSeen": "Istanbul transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE LOTUS LARK 87",
    "threat": "CRITICAL",
    "lastSeen": "Reykjavik transit hub",
    "status": "MONITORED",
    "tag": "Freelancer"
  },
  {
    "codename": "THE NIGHT CIPHER 44",
    "threat": "HIGH",
    "lastSeen": "Budapest transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE STEEL KING 8",
    "threat": "MEDIUM",
    "lastSeen": "Lisbon transit hub",
    "status": "MONITORED",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE LOTUS SPIDER 31",
    "threat": "MEDIUM",
    "lastSeen": "Casablanca transit hub",
    "status": "NO CONTRACTS",
    "tag": "Freelancer"
  },
  {
    "codename": "THE RAVEN CIPHER 3",
    "threat": "CRITICAL",
    "lastSeen": "Cairo transit hub",
    "status": "AT LARGE",
    "tag": "Unvetted"
  },
  {
    "codename": "THE ARCHITECT VEIL 57",
    "threat": "EXTREME",
    "lastSeen": "Zurich transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE WOLF FOX 51",
    "threat": "CRITICAL",
    "lastSeen": "Hong Kong transit hub",
    "status": "AT LARGE",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE RAVEN FOX 91",
    "threat": "MEDIUM",
    "lastSeen": "Vienna transit hub",
    "status": "AT LARGE",
    "tag": "Unvetted"
  },
  {
    "codename": "THE FROST ECHO 57",
    "threat": "HIGH",
    "lastSeen": "Hong Kong transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE ONYX SAGE 75",
    "threat": "CRITICAL",
    "lastSeen": "Casablanca transit hub",
    "status": "MONITORED",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE DRIFTER FOX 49",
    "threat": "CRITICAL",
    "lastSeen": "Vienna transit hub",
    "status": "AT LARGE",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE DRIFTER LARK 14",
    "threat": "EXTREME",
    "lastSeen": "Warsaw transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE SHADOW BLADE 54",
    "threat": "CRITICAL",
    "lastSeen": "Vienna transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE WOLF WITCH 10",
    "threat": "HIGH",
    "lastSeen": "Berlin transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE SHADOW BLADE 71",
    "threat": "EXTREME",
    "lastSeen": "Lisbon transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE MIRAGE FOX 8",
    "threat": "EXTREME",
    "lastSeen": "Warsaw transit hub",
    "status": "MONITORED",
    "tag": "High-Noise"
  },
  {
    "codename": "THE NEBULA KING 32",
    "threat": "CRITICAL",
    "lastSeen": "Reykjavik transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE DRIFTER BLADE 39",
    "threat": "MEDIUM",
    "lastSeen": "Stockholm transit hub",
    "status": "AT LARGE",
    "tag": "Unvetted"
  },
  {
    "codename": "THE FROST HAND 38",
    "threat": "CRITICAL",
    "lastSeen": "Stockholm transit hub",
    "status": "NO CONTRACTS",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE NIGHT HUNTER 54",
    "threat": "HIGH",
    "lastSeen": "Prague transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE SPECTER LARK 82",
    "threat": "MEDIUM",
    "lastSeen": "Vienna transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE MIRAGE ECHO 50",
    "threat": "HIGH",
    "lastSeen": "Berlin transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE PHOENIX WITCH 54",
    "threat": "EXTREME",
    "lastSeen": "Dubai transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE STEEL WALKER 3",
    "threat": "CRITICAL",
    "lastSeen": "Vienna transit hub",
    "status": "AT LARGE",
    "tag": "High-Noise"
  },
  {
    "codename": "THE SERPENT LARK 53",
    "threat": "MEDIUM",
    "lastSeen": "Berlin transit hub",
    "status": "MONITORED",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE SHADOW CIPHER 60",
    "threat": "EXTREME",
    "lastSeen": "Zurich transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE SERPENT MOTH 11",
    "threat": "MEDIUM",
    "lastSeen": "Berlin transit hub",
    "status": "AT LARGE",
    "tag": "Unvetted"
  },
  {
    "codename": "THE VIPER KING 78",
    "threat": "HIGH",
    "lastSeen": "Casablanca transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE GHOST BLADE 82",
    "threat": "EXTREME",
    "lastSeen": "Berlin transit hub",
    "status": "MONITORED",
    "tag": "Freelancer"
  },
  {
    "codename": "THE ONYX LARK 47",
    "threat": "HIGH",
    "lastSeen": "Prague transit hub",
    "status": "AT LARGE",
    "tag": "Freelancer"
  },
  {
    "codename": "THE WOLF BLADE 34",
    "threat": "MEDIUM",
    "lastSeen": "Seoul transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE ORACLE WARDEN 31",
    "threat": "CRITICAL",
    "lastSeen": "Marrakesh transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE GHOST QUEEN 14",
    "threat": "HIGH",
    "lastSeen": "Budapest transit hub",
    "status": "MONITORED",
    "tag": "High-Noise"
  },
  {
    "codename": "THE DRIFTER CIPHER 53",
    "threat": "HIGH",
    "lastSeen": "Zurich transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE EMBER WALKER 17",
    "threat": "CRITICAL",
    "lastSeen": "New York transit hub",
    "status": "AT LARGE",
    "tag": "High-Noise"
  },
  {
    "codename": "THE ORACLE FOX 5",
    "threat": "MEDIUM",
    "lastSeen": "Reykjavik transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE EMBER LION 44",
    "threat": "EXTREME",
    "lastSeen": "London transit hub",
    "status": "NO CONTRACTS",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE JACKAL LARK 96",
    "threat": "CRITICAL",
    "lastSeen": "Naples transit hub",
    "status": "AT LARGE",
    "tag": "High-Noise"
  },
  {
    "codename": "THE FROST WARDEN 67",
    "threat": "MEDIUM",
    "lastSeen": "Berlin transit hub",
    "status": "NO CONTRACTS",
    "tag": "Freelancer"
  },
  {
    "codename": "THE EMBER LARK 26",
    "threat": "EXTREME",
    "lastSeen": "Budapest transit hub",
    "status": "AT LARGE",
    "tag": "High-Noise"
  },
  {
    "codename": "THE MIRAGE SAGE 32",
    "threat": "MEDIUM",
    "lastSeen": "Lisbon transit hub",
    "status": "NO CONTRACTS",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE LOTUS LION 19",
    "threat": "EXTREME",
    "lastSeen": "Stockholm transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE NEBULA QUEEN 77",
    "threat": "HIGH",
    "lastSeen": "Hong Kong transit hub",
    "status": "AT LARGE",
    "tag": "Freelancer"
  },
  {
    "codename": "THE ONYX WITCH 24",
    "threat": "CRITICAL",
    "lastSeen": "Reykjavik transit hub",
    "status": "NO CONTRACTS",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE SHADOW VEIL 81",
    "threat": "EXTREME",
    "lastSeen": "Seoul transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE ORACLE LARK 65",
    "threat": "CRITICAL",
    "lastSeen": "Casablanca transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE OBSIDIAN VEIL 73",
    "threat": "CRITICAL",
    "lastSeen": "London transit hub",
    "status": "AT LARGE",
    "tag": "High-Noise"
  },
  {
    "codename": "THE RAVEN SPIDER 90",
    "threat": "EXTREME",
    "lastSeen": "Dubai transit hub",
    "status": "MONITORED",
    "tag": "Freelancer"
  },
  {
    "codename": "THE SPECTER HAND 44",
    "threat": "HIGH",
    "lastSeen": "Budapest transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE JACKAL SPIDER 80",
    "threat": "HIGH",
    "lastSeen": "Istanbul transit hub",
    "status": "AT LARGE",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE STEEL WALKER 8",
    "threat": "MEDIUM",
    "lastSeen": "Dubai transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE SERPENT MOTH 69",
    "threat": "CRITICAL",
    "lastSeen": "Reykjavik transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE GHOST BLADE 1",
    "threat": "MEDIUM",
    "lastSeen": "Marrakesh transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE ONYX LARK 21",
    "threat": "EXTREME",
    "lastSeen": "Osaka transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE RAVEN FOX 87",
    "threat": "EXTREME",
    "lastSeen": "New York transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE VIPER LARK 82",
    "threat": "EXTREME",
    "lastSeen": "Budapest transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE ONYX CIPHER 38",
    "threat": "HIGH",
    "lastSeen": "Hong Kong transit hub",
    "status": "MONITORED",
    "tag": "Freelancer"
  },
  {
    "codename": "THE STEEL SAGE 47",
    "threat": "HIGH",
    "lastSeen": "Dubai transit hub",
    "status": "AT LARGE",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE MIRAGE RIDER 57",
    "threat": "MEDIUM",
    "lastSeen": "Lisbon transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE WOLF HUNTER 67",
    "threat": "HIGH",
    "lastSeen": "Cairo transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE PHOENIX HUNTER 15",
    "threat": "MEDIUM",
    "lastSeen": "Zurich transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE VIPER ECHO 30",
    "threat": "EXTREME",
    "lastSeen": "Budapest transit hub",
    "status": "AT LARGE",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE FROST FOX 93",
    "threat": "HIGH",
    "lastSeen": "Budapest transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE GHOST MOTH 85",
    "threat": "HIGH",
    "lastSeen": "Naples transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE OBSIDIAN HUNTER 63",
    "threat": "HIGH",
    "lastSeen": "Dubai transit hub",
    "status": "MONITORED",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE IVORY VEIL 44",
    "threat": "CRITICAL",
    "lastSeen": "Vienna transit hub",
    "status": "MONITORED",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE SHADOW FOX 60",
    "threat": "MEDIUM",
    "lastSeen": "Istanbul transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE ARCHITECT ECHO 67",
    "threat": "CRITICAL",
    "lastSeen": "Casablanca transit hub",
    "status": "MONITORED",
    "tag": "High-Noise"
  },
  {
    "codename": "THE LOTUS WARDEN 2",
    "threat": "EXTREME",
    "lastSeen": "Budapest transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE MIRAGE HAND 45",
    "threat": "EXTREME",
    "lastSeen": "Cairo transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE SERPENT WALKER 88",
    "threat": "CRITICAL",
    "lastSeen": "Dubai transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE SERPENT BLADE 80",
    "threat": "CRITICAL",
    "lastSeen": "Istanbul transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE EMBER VEIL 44",
    "threat": "CRITICAL",
    "lastSeen": "Stockholm transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE EMBER WITCH 96",
    "threat": "EXTREME",
    "lastSeen": "London transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE OBSIDIAN WARDEN 55",
    "threat": "HIGH",
    "lastSeen": "Casablanca transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE OBSIDIAN BLADE 7",
    "threat": "EXTREME",
    "lastSeen": "Naples transit hub",
    "status": "MONITORED",
    "tag": "High-Noise"
  },
  {
    "codename": "THE SHADOW WARDEN 84",
    "threat": "MEDIUM",
    "lastSeen": "New York transit hub",
    "status": "AT LARGE",
    "tag": "High-Noise"
  },
  {
    "codename": "THE EMBER TIGER 19",
    "threat": "MEDIUM",
    "lastSeen": "Stockholm transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE NIGHT RIDER 94",
    "threat": "CRITICAL",
    "lastSeen": "Naples transit hub",
    "status": "MONITORED",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE NEBULA SAGE 12",
    "threat": "MEDIUM",
    "lastSeen": "Cairo transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE GHOST TIGER 22",
    "threat": "EXTREME",
    "lastSeen": "Budapest transit hub",
    "status": "AT LARGE",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE CROW TIGER 55",
    "threat": "CRITICAL",
    "lastSeen": "Warsaw transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE STEEL HUNTER 49",
    "threat": "HIGH",
    "lastSeen": "Reykjavik transit hub",
    "status": "MONITORED",
    "tag": "Freelancer"
  },
  {
    "codename": "THE MIRAGE SPIDER 11",
    "threat": "HIGH",
    "lastSeen": "Osaka transit hub",
    "status": "NO CONTRACTS",
    "tag": "Freelancer"
  },
  {
    "codename": "THE EMBER HAND 57",
    "threat": "MEDIUM",
    "lastSeen": "Berlin transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE NIGHT WARDEN 5",
    "threat": "EXTREME",
    "lastSeen": "Istanbul transit hub",
    "status": "AT LARGE",
    "tag": "Freelancer"
  },
  {
    "codename": "THE OBSIDIAN KING 22",
    "threat": "EXTREME",
    "lastSeen": "Budapest transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE SHADOW QUEEN 73",
    "threat": "MEDIUM",
    "lastSeen": "New York transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE OBSIDIAN SAGE 90",
    "threat": "MEDIUM",
    "lastSeen": "Istanbul transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE LOTUS SAGE 93",
    "threat": "CRITICAL",
    "lastSeen": "Istanbul transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE CROW QUEEN 56",
    "threat": "EXTREME",
    "lastSeen": "New York transit hub",
    "status": "MONITORED",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE STEEL LION 2",
    "threat": "EXTREME",
    "lastSeen": "Dubai transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE EMBER LION 24",
    "threat": "CRITICAL",
    "lastSeen": "Dubai transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE NEBULA LION 13",
    "threat": "HIGH",
    "lastSeen": "Marrakesh transit hub",
    "status": "AT LARGE",
    "tag": "High-Noise"
  },
  {
    "codename": "THE FROST QUEEN 2",
    "threat": "CRITICAL",
    "lastSeen": "Warsaw transit hub",
    "status": "NO CONTRACTS",
    "tag": "Freelancer"
  },
  {
    "codename": "THE PHOENIX HAND 46",
    "threat": "EXTREME",
    "lastSeen": "Lisbon transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE JACKAL ECHO 57",
    "threat": "CRITICAL",
    "lastSeen": "Casablanca transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE IVORY WARDEN 70",
    "threat": "MEDIUM",
    "lastSeen": "Seoul transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE SHADOW RIDER 8",
    "threat": "MEDIUM",
    "lastSeen": "Zurich transit hub",
    "status": "AT LARGE",
    "tag": "Unvetted"
  },
  {
    "codename": "THE PHOENIX QUEEN 83",
    "threat": "MEDIUM",
    "lastSeen": "Budapest transit hub",
    "status": "MONITORED",
    "tag": "High-Noise"
  },
  {
    "codename": "THE MIRAGE WALKER 76",
    "threat": "CRITICAL",
    "lastSeen": "Prague transit hub",
    "status": "AT LARGE",
    "tag": "Unvetted"
  },
  {
    "codename": "THE MIRAGE HAND 95",
    "threat": "HIGH",
    "lastSeen": "Stockholm transit hub",
    "status": "MONITORED",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE RAVEN HUNTER 32",
    "threat": "MEDIUM",
    "lastSeen": "Naples transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE ONYX MOTH 78",
    "threat": "MEDIUM",
    "lastSeen": "New York transit hub",
    "status": "AT LARGE",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE GHOST WITCH 36",
    "threat": "HIGH",
    "lastSeen": "Berlin transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE VIPER WITCH 4",
    "threat": "MEDIUM",
    "lastSeen": "Reykjavik transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE NEBULA MOTH 90",
    "threat": "HIGH",
    "lastSeen": "Stockholm transit hub",
    "status": "MONITORED",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE IVORY CIPHER 96",
    "threat": "EXTREME",
    "lastSeen": "Warsaw transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE LOTUS LARK 9",
    "threat": "HIGH",
    "lastSeen": "Prague transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE NEBULA TIGER 66",
    "threat": "EXTREME",
    "lastSeen": "Prague transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE CROW ECHO 84",
    "threat": "CRITICAL",
    "lastSeen": "Istanbul transit hub",
    "status": "NO CONTRACTS",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE PHOENIX LARK 68",
    "threat": "EXTREME",
    "lastSeen": "Cairo transit hub",
    "status": "AT LARGE",
    "tag": "Freelancer"
  },
  {
    "codename": "THE VIPER FOX 60",
    "threat": "MEDIUM",
    "lastSeen": "Cairo transit hub",
    "status": "AT LARGE",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE RAVEN CIPHER 58",
    "threat": "EXTREME",
    "lastSeen": "Zurich transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE JACKAL SPIDER 83",
    "threat": "HIGH",
    "lastSeen": "Osaka transit hub",
    "status": "MONITORED",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE DRIFTER SPIDER 32",
    "threat": "HIGH",
    "lastSeen": "Vienna transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE ARCHITECT LION 99",
    "threat": "CRITICAL",
    "lastSeen": "Hong Kong transit hub",
    "status": "AT LARGE",
    "tag": "Unvetted"
  },
  {
    "codename": "THE SERPENT SPIDER 7",
    "threat": "CRITICAL",
    "lastSeen": "Cairo transit hub",
    "status": "MONITORED",
    "tag": "High-Noise"
  },
  {
    "codename": "THE SERPENT WITCH 43",
    "threat": "EXTREME",
    "lastSeen": "Casablanca transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE FROST KING 24",
    "threat": "HIGH",
    "lastSeen": "Berlin transit hub",
    "status": "AT LARGE",
    "tag": "High-Noise"
  },
  {
    "codename": "THE SHADOW ECHO 15",
    "threat": "HIGH",
    "lastSeen": "New York transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE WOLF ECHO 83",
    "threat": "HIGH",
    "lastSeen": "Seoul transit hub",
    "status": "NO CONTRACTS",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE STEEL SPIDER 48",
    "threat": "EXTREME",
    "lastSeen": "Marrakesh transit hub",
    "status": "NO CONTRACTS",
    "tag": "Freelancer"
  },
  {
    "codename": "THE VIPER MOTH 79",
    "threat": "EXTREME",
    "lastSeen": "Vienna transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE FROST HUNTER 37",
    "threat": "EXTREME",
    "lastSeen": "Lisbon transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE JACKAL QUEEN 39",
    "threat": "CRITICAL",
    "lastSeen": "Istanbul transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE VIPER CIPHER 52",
    "threat": "HIGH",
    "lastSeen": "Stockholm transit hub",
    "status": "MONITORED",
    "tag": "High-Noise"
  },
  {
    "codename": "THE JACKAL SPIDER 85",
    "threat": "HIGH",
    "lastSeen": "Prague transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE NEBULA WITCH 11",
    "threat": "EXTREME",
    "lastSeen": "Berlin transit hub",
    "status": "AT LARGE",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE ARCHITECT FOX 11",
    "threat": "MEDIUM",
    "lastSeen": "New York transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE JACKAL CIPHER 17",
    "threat": "HIGH",
    "lastSeen": "Istanbul transit hub",
    "status": "MONITORED",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE DRIFTER LION 90",
    "threat": "HIGH",
    "lastSeen": "Reykjavik transit hub",
    "status": "NO CONTRACTS",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE MIRAGE FOX 86",
    "threat": "EXTREME",
    "lastSeen": "Marrakesh transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE WOLF MOTH 13",
    "threat": "CRITICAL",
    "lastSeen": "Budapest transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE LOTUS TIGER 22",
    "threat": "EXTREME",
    "lastSeen": "Vienna transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE EMBER ECHO 47",
    "threat": "HIGH",
    "lastSeen": "Seoul transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE JACKAL BLADE 51",
    "threat": "HIGH",
    "lastSeen": "Dubai transit hub",
    "status": "AT LARGE",
    "tag": "Unvetted"
  },
  {
    "codename": "THE OBSIDIAN TIGER 17",
    "threat": "MEDIUM",
    "lastSeen": "New York transit hub",
    "status": "AT LARGE",
    "tag": "High-Noise"
  },
  {
    "codename": "THE SHADOW BLADE 73",
    "threat": "CRITICAL",
    "lastSeen": "Cairo transit hub",
    "status": "MONITORED",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE VIPER CIPHER 4",
    "threat": "CRITICAL",
    "lastSeen": "Naples transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE IVORY MOTH 29",
    "threat": "MEDIUM",
    "lastSeen": "Zurich transit hub",
    "status": "AT LARGE",
    "tag": "Unvetted"
  },
  {
    "codename": "THE STEEL WITCH 82",
    "threat": "CRITICAL",
    "lastSeen": "Zurich transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE RAVEN FOX 19",
    "threat": "CRITICAL",
    "lastSeen": "Lisbon transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE ORACLE RIDER 11",
    "threat": "CRITICAL",
    "lastSeen": "Vienna transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE SPECTER VEIL 39",
    "threat": "MEDIUM",
    "lastSeen": "Hong Kong transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE NIGHT VEIL 16",
    "threat": "HIGH",
    "lastSeen": "Warsaw transit hub",
    "status": "MONITORED",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE SHADOW WARDEN 27",
    "threat": "HIGH",
    "lastSeen": "Dubai transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE LOTUS MOTH 38",
    "threat": "HIGH",
    "lastSeen": "Berlin transit hub",
    "status": "AT LARGE",
    "tag": "Unvetted"
  },
  {
    "codename": "THE STEEL HUNTER 36",
    "threat": "EXTREME",
    "lastSeen": "Lisbon transit hub",
    "status": "MONITORED",
    "tag": "High-Noise"
  },
  {
    "codename": "THE DRIFTER WITCH 80",
    "threat": "CRITICAL",
    "lastSeen": "London transit hub",
    "status": "NO CONTRACTS",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE EMBER WALKER 37",
    "threat": "EXTREME",
    "lastSeen": "London transit hub",
    "status": "AT LARGE",
    "tag": "High-Noise"
  },
  {
    "codename": "THE FROST VEIL 91",
    "threat": "EXTREME",
    "lastSeen": "Berlin transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE NIGHT MOTH 11",
    "threat": "EXTREME",
    "lastSeen": "Osaka transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE FROST LION 11",
    "threat": "CRITICAL",
    "lastSeen": "London transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE GHOST ECHO 97",
    "threat": "HIGH",
    "lastSeen": "Prague transit hub",
    "status": "AT LARGE",
    "tag": "Unvetted"
  },
  {
    "codename": "THE MIRAGE TIGER 38",
    "threat": "EXTREME",
    "lastSeen": "Prague transit hub",
    "status": "NO CONTRACTS",
    "tag": "Freelancer"
  },
  {
    "codename": "THE ORACLE ECHO 94",
    "threat": "CRITICAL",
    "lastSeen": "Dubai transit hub",
    "status": "AT LARGE",
    "tag": "Unvetted"
  },
  {
    "codename": "THE ORACLE TIGER 80",
    "threat": "EXTREME",
    "lastSeen": "Vienna transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE FROST WALKER 9",
    "threat": "MEDIUM",
    "lastSeen": "Vienna transit hub",
    "status": "AT LARGE",
    "tag": "Freelancer"
  },
  {
    "codename": "THE DRIFTER LION 26",
    "threat": "HIGH",
    "lastSeen": "Lisbon transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE MIRAGE LARK 28",
    "threat": "EXTREME",
    "lastSeen": "Marrakesh transit hub",
    "status": "AT LARGE",
    "tag": "Freelancer"
  },
  {
    "codename": "THE SHADOW TIGER 94",
    "threat": "MEDIUM",
    "lastSeen": "Cairo transit hub",
    "status": "AT LARGE",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE DRIFTER WITCH 80",
    "threat": "HIGH",
    "lastSeen": "Cairo transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE LOTUS SAGE 32",
    "threat": "CRITICAL",
    "lastSeen": "Hong Kong transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE SPECTER CIPHER 6",
    "threat": "MEDIUM",
    "lastSeen": "Cairo transit hub",
    "status": "MONITORED",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE LOTUS SPIDER 20",
    "threat": "CRITICAL",
    "lastSeen": "New York transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE STEEL WALKER 40",
    "threat": "EXTREME",
    "lastSeen": "Cairo transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE PHOENIX WARDEN 46",
    "threat": "HIGH",
    "lastSeen": "Prague transit hub",
    "status": "AT LARGE",
    "tag": "High-Noise"
  },
  {
    "codename": "THE EMBER KING 10",
    "threat": "HIGH",
    "lastSeen": "Naples transit hub",
    "status": "MONITORED",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE FROST ECHO 26",
    "threat": "HIGH",
    "lastSeen": "Zurich transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE DRIFTER TIGER 11",
    "threat": "EXTREME",
    "lastSeen": "Warsaw transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE OBSIDIAN HUNTER 49",
    "threat": "EXTREME",
    "lastSeen": "Reykjavik transit hub",
    "status": "NO CONTRACTS",
    "tag": "Freelancer"
  },
  {
    "codename": "THE VIPER LARK 29",
    "threat": "MEDIUM",
    "lastSeen": "Osaka transit hub",
    "status": "AT LARGE",
    "tag": "Freelancer"
  },
  {
    "codename": "THE DRIFTER LARK 26",
    "threat": "MEDIUM",
    "lastSeen": "Casablanca transit hub",
    "status": "AT LARGE",
    "tag": "Unvetted"
  },
  {
    "codename": "THE ORACLE QUEEN 42",
    "threat": "MEDIUM",
    "lastSeen": "New York transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE SPECTER WITCH 81",
    "threat": "CRITICAL",
    "lastSeen": "Stockholm transit hub",
    "status": "MONITORED",
    "tag": "High-Noise"
  },
  {
    "codename": "THE GHOST BLADE 20",
    "threat": "CRITICAL",
    "lastSeen": "Reykjavik transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE LOTUS SAGE 3",
    "threat": "HIGH",
    "lastSeen": "Budapest transit hub",
    "status": "AT LARGE",
    "tag": "High-Noise"
  },
  {
    "codename": "THE ONYX BLADE 91",
    "threat": "CRITICAL",
    "lastSeen": "Lisbon transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE IVORY ECHO 63",
    "threat": "CRITICAL",
    "lastSeen": "Lisbon transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE LOTUS VEIL 20",
    "threat": "EXTREME",
    "lastSeen": "Casablanca transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE OBSIDIAN RIDER 20",
    "threat": "MEDIUM",
    "lastSeen": "Zurich transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE LOTUS LARK 50",
    "threat": "CRITICAL",
    "lastSeen": "Prague transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE ARCHITECT BLADE 47",
    "threat": "CRITICAL",
    "lastSeen": "Naples transit hub",
    "status": "AT LARGE",
    "tag": "Unvetted"
  },
  {
    "codename": "THE WOLF LARK 10",
    "threat": "EXTREME",
    "lastSeen": "Vienna transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE EMBER TIGER 23",
    "threat": "HIGH",
    "lastSeen": "Berlin transit hub",
    "status": "AT LARGE",
    "tag": "High-Noise"
  },
  {
    "codename": "THE MIRAGE ECHO 75",
    "threat": "CRITICAL",
    "lastSeen": "Prague transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE LOTUS HUNTER 33",
    "threat": "EXTREME",
    "lastSeen": "London transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE WOLF FOX 93",
    "threat": "CRITICAL",
    "lastSeen": "Hong Kong transit hub",
    "status": "MONITORED",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE ONYX BLADE 92",
    "threat": "MEDIUM",
    "lastSeen": "Stockholm transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE ONYX WARDEN 40",
    "threat": "MEDIUM",
    "lastSeen": "Zurich transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE MIRAGE SPIDER 67",
    "threat": "MEDIUM",
    "lastSeen": "Stockholm transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE IVORY SAGE 14",
    "threat": "CRITICAL",
    "lastSeen": "Budapest transit hub",
    "status": "MONITORED",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE RAVEN HAND 34",
    "threat": "CRITICAL",
    "lastSeen": "Seoul transit hub",
    "status": "AT LARGE",
    "tag": "Unvetted"
  },
  {
    "codename": "THE CROW FOX 95",
    "threat": "EXTREME",
    "lastSeen": "Seoul transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE EMBER WALKER 87",
    "threat": "EXTREME",
    "lastSeen": "Stockholm transit hub",
    "status": "NO CONTRACTS",
    "tag": "Freelancer"
  },
  {
    "codename": "THE FROST LARK 91",
    "threat": "MEDIUM",
    "lastSeen": "London transit hub",
    "status": "NO CONTRACTS",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE STEEL MOTH 84",
    "threat": "HIGH",
    "lastSeen": "New York transit hub",
    "status": "UNKNOWN",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE ONYX KING 10",
    "threat": "CRITICAL",
    "lastSeen": "Stockholm transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE EMBER HAND 97",
    "threat": "EXTREME",
    "lastSeen": "Prague transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE NIGHT WARDEN 97",
    "threat": "MEDIUM",
    "lastSeen": "Prague transit hub",
    "status": "NO CONTRACTS",
    "tag": "Freelancer"
  },
  {
    "codename": "THE NEBULA RIDER 75",
    "threat": "MEDIUM",
    "lastSeen": "Vienna transit hub",
    "status": "MONITORED",
    "tag": "Freelancer"
  },
  {
    "codename": "THE RAVEN LARK 64",
    "threat": "EXTREME",
    "lastSeen": "Naples transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE FROST HAND 39",
    "threat": "MEDIUM",
    "lastSeen": "Dubai transit hub",
    "status": "MONITORED",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE FROST HAND 45",
    "threat": "EXTREME",
    "lastSeen": "Reykjavik transit hub",
    "status": "MONITORED",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE IVORY ECHO 66",
    "threat": "CRITICAL",
    "lastSeen": "Stockholm transit hub",
    "status": "MONITORED",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE GHOST ECHO 7",
    "threat": "HIGH",
    "lastSeen": "Marrakesh transit hub",
    "status": "MONITORED",
    "tag": "High-Noise"
  },
  {
    "codename": "THE NEBULA LARK 94",
    "threat": "HIGH",
    "lastSeen": "Budapest transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE EMBER WITCH 29",
    "threat": "CRITICAL",
    "lastSeen": "Stockholm transit hub",
    "status": "AT LARGE",
    "tag": "High-Noise"
  },
  {
    "codename": "THE RAVEN LION 88",
    "threat": "CRITICAL",
    "lastSeen": "Istanbul transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE IVORY WARDEN 70",
    "threat": "MEDIUM",
    "lastSeen": "Warsaw transit hub",
    "status": "AT LARGE",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE EMBER LARK 66",
    "threat": "MEDIUM",
    "lastSeen": "London transit hub",
    "status": "AT LARGE",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE SERPENT ECHO 85",
    "threat": "CRITICAL",
    "lastSeen": "Istanbul transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE ARCHITECT ECHO 30",
    "threat": "HIGH",
    "lastSeen": "Berlin transit hub",
    "status": "AT LARGE",
    "tag": "Unvetted"
  },
  {
    "codename": "THE SERPENT MOTH 9",
    "threat": "HIGH",
    "lastSeen": "New York transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE IVORY LARK 5",
    "threat": "MEDIUM",
    "lastSeen": "Osaka transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE SERPENT WARDEN 13",
    "threat": "HIGH",
    "lastSeen": "Seoul transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE SERPENT LION 36",
    "threat": "HIGH",
    "lastSeen": "Stockholm transit hub",
    "status": "AT LARGE",
    "tag": "High-Noise"
  },
  {
    "codename": "THE OBSIDIAN LION 80",
    "threat": "MEDIUM",
    "lastSeen": "Osaka transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE LOTUS WARDEN 91",
    "threat": "HIGH",
    "lastSeen": "Prague transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE NIGHT BLADE 51",
    "threat": "HIGH",
    "lastSeen": "Hong Kong transit hub",
    "status": "AT LARGE",
    "tag": "High-Noise"
  },
  {
    "codename": "THE NIGHT SPIDER 69",
    "threat": "EXTREME",
    "lastSeen": "Zurich transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE FROST LARK 14",
    "threat": "MEDIUM",
    "lastSeen": "Reykjavik transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE ARCHITECT LION 35",
    "threat": "EXTREME",
    "lastSeen": "Stockholm transit hub",
    "status": "AT LARGE",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE EMBER MOTH 29",
    "threat": "HIGH",
    "lastSeen": "Osaka transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE DRIFTER RIDER 80",
    "threat": "HIGH",
    "lastSeen": "Lisbon transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE VIPER CIPHER 34",
    "threat": "EXTREME",
    "lastSeen": "Osaka transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE RAVEN WALKER 70",
    "threat": "MEDIUM",
    "lastSeen": "Budapest transit hub",
    "status": "AT LARGE",
    "tag": "High-Noise"
  },
  {
    "codename": "THE MIRAGE WITCH 3",
    "threat": "HIGH",
    "lastSeen": "London transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE WOLF WITCH 94",
    "threat": "CRITICAL",
    "lastSeen": "New York transit hub",
    "status": "AT LARGE",
    "tag": "High-Noise"
  },
  {
    "codename": "THE OBSIDIAN VEIL 66",
    "threat": "EXTREME",
    "lastSeen": "Marrakesh transit hub",
    "status": "AT LARGE",
    "tag": "Freelancer"
  },
  {
    "codename": "THE FROST WARDEN 75",
    "threat": "MEDIUM",
    "lastSeen": "Vienna transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE JACKAL HAND 97",
    "threat": "EXTREME",
    "lastSeen": "London transit hub",
    "status": "MONITORED",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE ONYX SPIDER 4",
    "threat": "HIGH",
    "lastSeen": "Hong Kong transit hub",
    "status": "AT LARGE",
    "tag": "Unvetted"
  },
  {
    "codename": "THE ARCHITECT RIDER 9",
    "threat": "EXTREME",
    "lastSeen": "Berlin transit hub",
    "status": "NO CONTRACTS",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE FROST RIDER 1",
    "threat": "EXTREME",
    "lastSeen": "Seoul transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE GHOST FOX 70",
    "threat": "CRITICAL",
    "lastSeen": "Vienna transit hub",
    "status": "NO CONTRACTS",
    "tag": "Freelancer"
  },
  {
    "codename": "THE WOLF MOTH 66",
    "threat": "HIGH",
    "lastSeen": "Marrakesh transit hub",
    "status": "AT LARGE",
    "tag": "High-Noise"
  },
  {
    "codename": "THE EMBER HUNTER 96",
    "threat": "MEDIUM",
    "lastSeen": "Prague transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE VIPER LION 95",
    "threat": "EXTREME",
    "lastSeen": "New York transit hub",
    "status": "AT LARGE",
    "tag": "High-Noise"
  },
  {
    "codename": "THE JACKAL SPIDER 12",
    "threat": "HIGH",
    "lastSeen": "Stockholm transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE FROST KING 81",
    "threat": "MEDIUM",
    "lastSeen": "Vienna transit hub",
    "status": "NO CONTRACTS",
    "tag": "Freelancer"
  },
  {
    "codename": "THE ONYX WARDEN 90",
    "threat": "MEDIUM",
    "lastSeen": "Stockholm transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE ARCHITECT BLADE 8",
    "threat": "CRITICAL",
    "lastSeen": "Hong Kong transit hub",
    "status": "MONITORED",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE DRIFTER BLADE 40",
    "threat": "HIGH",
    "lastSeen": "Seoul transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE PHOENIX WALKER 70",
    "threat": "EXTREME",
    "lastSeen": "Hong Kong transit hub",
    "status": "MONITORED",
    "tag": "Unvetted"
  },
  {
    "codename": "THE OBSIDIAN SPIDER 71",
    "threat": "MEDIUM",
    "lastSeen": "Warsaw transit hub",
    "status": "MONITORED",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE MIRAGE WALKER 57",
    "threat": "EXTREME",
    "lastSeen": "Budapest transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE LOTUS SPIDER 64",
    "threat": "HIGH",
    "lastSeen": "Seoul transit hub",
    "status": "NO CONTRACTS",
    "tag": "Freelancer"
  },
  {
    "codename": "THE FROST LION 93",
    "threat": "CRITICAL",
    "lastSeen": "Budapest transit hub",
    "status": "AT LARGE",
    "tag": "High-Noise"
  },
  {
    "codename": "THE SPECTER BLADE 99",
    "threat": "CRITICAL",
    "lastSeen": "Prague transit hub",
    "status": "AT LARGE",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE SERPENT MOTH 3",
    "threat": "MEDIUM",
    "lastSeen": "Istanbul transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE MIRAGE RIDER 77",
    "threat": "MEDIUM",
    "lastSeen": "New York transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE ARCHITECT QUEEN 30",
    "threat": "CRITICAL",
    "lastSeen": "Casablanca transit hub",
    "status": "NO CONTRACTS",
    "tag": "High-Noise"
  },
  {
    "codename": "THE DRIFTER WARDEN 89",
    "threat": "MEDIUM",
    "lastSeen": "Vienna transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE WOLF FOX 89",
    "threat": "MEDIUM",
    "lastSeen": "Naples transit hub",
    "status": "AT LARGE",
    "tag": "Unvetted"
  },
  {
    "codename": "THE ARCHITECT CIPHER 24",
    "threat": "CRITICAL",
    "lastSeen": "Casablanca transit hub",
    "status": "NO CONTRACTS",
    "tag": "Freelancer"
  },
  {
    "codename": "THE DRIFTER LION 94",
    "threat": "MEDIUM",
    "lastSeen": "Warsaw transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE OBSIDIAN WARDEN 33",
    "threat": "EXTREME",
    "lastSeen": "Berlin transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE SERPENT SPIDER 4",
    "threat": "MEDIUM",
    "lastSeen": "London transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE NIGHT SPIDER 71",
    "threat": "HIGH",
    "lastSeen": "Cairo transit hub",
    "status": "AT LARGE",
    "tag": "Unvetted"
  },
  {
    "codename": "THE STEEL HUNTER 73",
    "threat": "HIGH",
    "lastSeen": "Hong Kong transit hub",
    "status": "MONITORED",
    "tag": "Freelancer"
  },
  {
    "codename": "THE CROW CIPHER 19",
    "threat": "EXTREME",
    "lastSeen": "Seoul transit hub",
    "status": "UNKNOWN",
    "tag": "Unvetted"
  },
  {
    "codename": "THE FROST WARDEN 49",
    "threat": "HIGH",
    "lastSeen": "Casablanca transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE ARCHITECT CIPHER 83",
    "threat": "EXTREME",
    "lastSeen": "Osaka transit hub",
    "status": "MONITORED",
    "tag": "High-Noise"
  },
  {
    "codename": "THE DRIFTER LION 69",
    "threat": "EXTREME",
    "lastSeen": "Naples transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE CROW SPIDER 47",
    "threat": "MEDIUM",
    "lastSeen": "Prague transit hub",
    "status": "MONITORED",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE DRIFTER QUEEN 31",
    "threat": "EXTREME",
    "lastSeen": "Lisbon transit hub",
    "status": "UNKNOWN",
    "tag": "Freelancer"
  },
  {
    "codename": "THE JACKAL HUNTER 99",
    "threat": "EXTREME",
    "lastSeen": "Warsaw transit hub",
    "status": "MONITORED",
    "tag": "Freelancer"
  },
  {
    "codename": "THE ONYX TIGER 99",
    "threat": "HIGH",
    "lastSeen": "Dubai transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE GHOST BLADE 48",
    "threat": "EXTREME",
    "lastSeen": "Hong Kong transit hub",
    "status": "UNKNOWN",
    "tag": "High-Noise"
  },
  {
    "codename": "THE PHOENIX CIPHER 68",
    "threat": "EXTREME",
    "lastSeen": "Naples transit hub",
    "status": "NO CONTRACTS",
    "tag": "Unvetted"
  },
  {
    "codename": "THE NEBULA RIDER 83",
    "threat": "CRITICAL",
    "lastSeen": "Hong Kong transit hub",
    "status": "MONITORED",
    "tag": "High-Noise"
  },
  {
    "codename": "THE SPECTER QUEEN 98",
    "threat": "HIGH",
    "lastSeen": "Budapest transit hub",
    "status": "MONITORED",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE SERPENT QUEEN 31",
    "threat": "CRITICAL",
    "lastSeen": "Seoul transit hub",
    "status": "AT LARGE",
    "tag": "High-Noise"
  },
  {
    "codename": "THE RAVEN WARDEN 38",
    "threat": "EXTREME",
    "lastSeen": "Dubai transit hub",
    "status": "NO CONTRACTS",
    "tag": "Ex-Continental"
  },
  {
    "codename": "THE ONYX MOTH 66",
    "threat": "HIGH",
    "lastSeen": "New York transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE SHADOW RIDER 13",
    "threat": "HIGH",
    "lastSeen": "Berlin transit hub",
    "status": "AT LARGE",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE WOLF HAND 92",
    "threat": "HIGH",
    "lastSeen": "Hong Kong transit hub",
    "status": "UNKNOWN",
    "tag": "Burned Asset"
  },
  {
    "codename": "THE EMBER WARDEN 26",
    "threat": "HIGH",
    "lastSeen": "Budapest transit hub",
    "status": "NO CONTRACTS",
    "tag": "Freelancer"
  }
];

  const safehouses = [
    { city: "London", status: "ACTIVE", rating: "Clean" },
    { city: "Berlin", status: "COLD", rating: "Compromised once" },
    { city: "Osaka", status: "UNKNOWN", rating: "No recent traffic" },
  ];

  const weapons = [
  {
    "name": "CT-80 Obsidian Jackal",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "AR-57 Hex Mirage",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "MK-49 Crimson Jackal",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "VX-11 Phantom Viper",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "CT-18 Blackout Jackal",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "CT-95 Silent Viper",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Unregistered build"
  },
  {
    "name": "SR-14 Crimson Jackal",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "HX-22 Phantom Specter",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "AR-57 Crimson Regent",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "VX-61 Phantom Specter",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "MK-30 Crimson Echo",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "MK-69 Obsidian Viper",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Prototype unit"
  },
  {
    "name": "MK-16 Phantom Regent",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "AR-89 Crimson Echo",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "AR-30 Ivory Jackal",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "HX-71 Blackout Viper",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "SR-16 Blackout Jackal",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "MK-41 Silent Jackal",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "VX-42 Hex Specter",
    "category": "SMG",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "VX-83 Ivory Viper",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "VX-88 Phantom Harbinger",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "MK-41 Hex Echo",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "AR-92 Hex Viper",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "SR-31 Blackout Echo",
    "category": "SMG",
    "status": "CLEAN",
    "note": "Unregistered build"
  },
  {
    "name": "AR-30 Obsidian Viper",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "HX-26 Eclipse Regent",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "CT-82 Blackout Jackal",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "VX-45 Phantom Mirage",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "VX-23 Eclipse Echo",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "VX-96 Eclipse Jackal",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "High Table restricted"
  },
  {
    "name": "CT-16 Silent Echo",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "VX-82 Ivory Viper",
    "category": "SMG",
    "status": "CLEAN",
    "note": "Unregistered build"
  },
  {
    "name": "CT-15 Silent Jackal",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "AR-36 Eclipse Specter",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "CT-33 Phantom Regent",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "HX-18 Blackout Specter",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "CT-55 Phantom Regent",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "SR-24 Phantom Echo",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "SR-80 Crimson Harbinger",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "AR-58 Phantom Regent",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "MK-92 Eclipse Jackal",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "SR-15 Ivory Harbinger",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "SR-64 Obsidian Jackal",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "VX-83 Ivory Regent",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "AR-56 Eclipse Jackal",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "VX-72 Crimson Viper",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "CT-28 Eclipse Regent",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "AR-93 Obsidian Jackal",
    "category": "SMG",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "HX-41 Crimson Echo",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "CT-88 Silent Seraph",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "VX-36 Hex Jackal",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "HX-30 Crimson Harbinger",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "VX-27 Eclipse Viper",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "CT-87 Ivory Jackal",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "High Table restricted"
  },
  {
    "name": "VX-34 Crimson Seraph",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Recovered from vault"
  },
  {
    "name": "MK-13 Eclipse Mirage",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "CT-42 Eclipse Echo",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "MK-86 Obsidian Mirage",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "MK-10 Hex Regent",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Prototype unit"
  },
  {
    "name": "MK-52 Obsidian Viper",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Unregistered build"
  },
  {
    "name": "MK-38 Eclipse Specter",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "MK-28 Phantom Specter",
    "category": "SMG",
    "status": "CLEAN",
    "note": "Unregistered build"
  },
  {
    "name": "AR-53 Silent Jackal",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "CT-30 Crimson Harbinger",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "SR-82 Eclipse Seraph",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "VX-78 Ivory Mirage",
    "category": "SMG",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "CT-41 Phantom Mirage",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "SR-34 Crimson Harbinger",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "HX-76 Phantom Harbinger",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "AR-75 Eclipse Jackal",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "MK-95 Eclipse Echo",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "SR-53 Eclipse Viper",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "HX-21 Silent Harbinger",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "VX-65 Phantom Viper",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "SR-46 Obsidian Regent",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "MK-17 Blackout Seraph",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "High Table restricted"
  },
  {
    "name": "HX-91 Obsidian Jackal",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "CT-17 Hex Mirage",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "HX-47 Blackout Regent",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "SR-98 Hex Specter",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "SR-60 Phantom Specter",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "SR-73 Crimson Seraph",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "CT-31 Crimson Echo",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "CT-85 Blackout Viper",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "HX-31 Ivory Echo",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "CT-65 Eclipse Echo",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "High Table restricted"
  },
  {
    "name": "SR-15 Crimson Harbinger",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "CT-88 Phantom Regent",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "CT-58 Crimson Specter",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Recovered from vault"
  },
  {
    "name": "AR-47 Hex Mirage",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Prototype unit"
  },
  {
    "name": "SR-93 Hex Seraph",
    "category": "SMG",
    "status": "CLEAN",
    "note": "High Table restricted"
  },
  {
    "name": "AR-63 Blackout Mirage",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "HX-58 Obsidian Seraph",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "MK-68 Silent Specter",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "VX-65 Obsidian Mirage",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "HX-10 Eclipse Specter",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "AR-21 Obsidian Echo",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Prototype unit"
  },
  {
    "name": "VX-97 Eclipse Seraph",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "VX-32 Crimson Specter",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "AR-91 Eclipse Mirage",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Recovered from vault"
  },
  {
    "name": "CT-77 Silent Mirage",
    "category": "SMG",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "MK-37 Hex Echo",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Unregistered build"
  },
  {
    "name": "SR-27 Blackout Echo",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "SR-39 Silent Harbinger",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Unregistered build"
  },
  {
    "name": "SR-83 Silent Echo",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "HX-57 Blackout Harbinger",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "SR-51 Ivory Echo",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "SR-42 Crimson Harbinger",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "HX-57 Hex Seraph",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Unregistered build"
  },
  {
    "name": "HX-45 Blackout Specter",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "CT-55 Crimson Jackal",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "AR-14 Phantom Mirage",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "Recovered from vault"
  },
  {
    "name": "CT-67 Obsidian Mirage",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "SR-26 Ivory Jackal",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "CT-42 Ivory Mirage",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "SR-16 Eclipse Jackal",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "CT-32 Phantom Regent",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Unregistered build"
  },
  {
    "name": "CT-15 Phantom Echo",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "MK-19 Hex Echo",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "SR-76 Eclipse Jackal",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Prototype unit"
  },
  {
    "name": "VX-85 Obsidian Specter",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "HX-60 Eclipse Mirage",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "CT-43 Obsidian Mirage",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Unregistered build"
  },
  {
    "name": "MK-83 Ivory Viper",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "Recovered from vault"
  },
  {
    "name": "MK-95 Phantom Viper",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "MK-60 Hex Regent",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "MK-65 Obsidian Specter",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "MK-89 Blackout Specter",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "VX-49 Phantom Seraph",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Unregistered build"
  },
  {
    "name": "AR-50 Blackout Viper",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "AR-18 Blackout Viper",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "AR-46 Hex Echo",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "VX-89 Obsidian Echo",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "HX-70 Silent Harbinger",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "HX-93 Ivory Specter",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "MK-55 Eclipse Viper",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "MK-72 Silent Seraph",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "CT-35 Silent Viper",
    "category": "SMG",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "AR-30 Crimson Jackal",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "VX-41 Ivory Mirage",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "SR-45 Crimson Seraph",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "CT-38 Blackout Jackal",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Recovered from vault"
  },
  {
    "name": "SR-67 Obsidian Regent",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "VX-28 Silent Harbinger",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "MK-18 Blackout Regent",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "SR-38 Phantom Specter",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "AR-47 Ivory Harbinger",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "AR-59 Obsidian Regent",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "AR-86 Blackout Regent",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "MK-31 Hex Viper",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "CT-88 Blackout Regent",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "MK-51 Ivory Seraph",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "VX-71 Phantom Echo",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "VX-55 Ivory Viper",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "AR-85 Crimson Specter",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "AR-71 Silent Mirage",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "HX-49 Crimson Harbinger",
    "category": "SMG",
    "status": "CLEAN",
    "note": "Unregistered build"
  },
  {
    "name": "CT-25 Obsidian Specter",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "SR-64 Crimson Jackal",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "SR-20 Crimson Echo",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "SR-27 Eclipse Regent",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "HX-79 Ivory Mirage",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "HX-99 Obsidian Seraph",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "MK-60 Eclipse Harbinger",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Recovered from vault"
  },
  {
    "name": "CT-21 Ivory Jackal",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Unregistered build"
  },
  {
    "name": "CT-28 Obsidian Viper",
    "category": "SMG",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "AR-82 Phantom Seraph",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "MK-24 Hex Regent",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "AR-58 Silent Jackal",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "AR-88 Phantom Regent",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "MK-29 Phantom Specter",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "VX-63 Hex Specter",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "AR-22 Eclipse Seraph",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "HX-71 Crimson Harbinger",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "SR-19 Obsidian Seraph",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "VX-39 Eclipse Seraph",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "MK-93 Blackout Harbinger",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "SR-36 Crimson Harbinger",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "CT-50 Blackout Mirage",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "CT-71 Hex Seraph",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "SR-35 Silent Seraph",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "Recovered from vault"
  },
  {
    "name": "MK-76 Silent Specter",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "SR-89 Eclipse Regent",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "MK-60 Hex Echo",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "AR-20 Obsidian Echo",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "SR-38 Hex Seraph",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "HX-35 Ivory Mirage",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "CT-29 Blackout Specter",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Prototype unit"
  },
  {
    "name": "AR-61 Hex Viper",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "SR-34 Blackout Viper",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "HX-82 Blackout Mirage",
    "category": "SMG",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "MK-93 Hex Harbinger",
    "category": "SMG",
    "status": "CLEAN",
    "note": "High Table restricted"
  },
  {
    "name": "AR-16 Blackout Echo",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "Recovered from vault"
  },
  {
    "name": "HX-18 Phantom Viper",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "AR-20 Hex Jackal",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "Recovered from vault"
  },
  {
    "name": "AR-86 Silent Viper",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "HX-51 Silent Specter",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "HX-19 Ivory Specter",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "VX-97 Blackout Specter",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "HX-33 Blackout Echo",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "HX-81 Silent Seraph",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "VX-53 Blackout Mirage",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "High Table restricted"
  },
  {
    "name": "CT-54 Eclipse Viper",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Unregistered build"
  },
  {
    "name": "SR-32 Obsidian Jackal",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Prototype unit"
  },
  {
    "name": "AR-69 Phantom Jackal",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "AR-66 Eclipse Mirage",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "High Table restricted"
  },
  {
    "name": "HX-81 Silent Jackal",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "MK-84 Obsidian Specter",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Prototype unit"
  },
  {
    "name": "CT-56 Eclipse Mirage",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "AR-69 Silent Harbinger",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "SR-46 Ivory Jackal",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "AR-74 Blackout Viper",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "SR-43 Silent Harbinger",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Unregistered build"
  },
  {
    "name": "CT-72 Hex Echo",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "HX-69 Crimson Specter",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "SR-28 Phantom Specter",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "AR-72 Blackout Specter",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "Recovered from vault"
  },
  {
    "name": "HX-25 Ivory Harbinger",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "MK-60 Crimson Echo",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "CT-37 Ivory Mirage",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "HX-93 Ivory Seraph",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "SR-74 Phantom Specter",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "SR-27 Phantom Regent",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Prototype unit"
  },
  {
    "name": "HX-26 Eclipse Specter",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Prototype unit"
  },
  {
    "name": "VX-13 Crimson Regent",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "SR-52 Eclipse Harbinger",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "VX-10 Blackout Harbinger",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "SR-95 Ivory Mirage",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "MK-52 Obsidian Harbinger",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "CT-62 Eclipse Viper",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "MK-78 Crimson Seraph",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "MK-62 Obsidian Harbinger",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "VX-87 Eclipse Regent",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "SR-83 Ivory Regent",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "AR-46 Obsidian Viper",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "CT-45 Crimson Echo",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "MK-24 Obsidian Regent",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "High Table restricted"
  },
  {
    "name": "HX-58 Phantom Mirage",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "SR-37 Crimson Echo",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "VX-50 Ivory Viper",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "HX-10 Eclipse Seraph",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Prototype unit"
  },
  {
    "name": "CT-85 Phantom Mirage",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "HX-46 Blackout Specter",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "SR-37 Phantom Specter",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Prototype unit"
  },
  {
    "name": "CT-74 Hex Jackal",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Unregistered build"
  },
  {
    "name": "CT-62 Blackout Specter",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "MK-41 Crimson Regent",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "HX-24 Silent Specter",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "CT-66 Hex Mirage",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Prototype unit"
  },
  {
    "name": "CT-10 Hex Regent",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "MK-67 Silent Specter",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "HX-67 Obsidian Regent",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "HX-78 Eclipse Jackal",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "CT-21 Blackout Jackal",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "AR-39 Eclipse Jackal",
    "category": "SMG",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "HX-62 Silent Echo",
    "category": "SMG",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "SR-12 Blackout Specter",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Recovered from vault"
  },
  {
    "name": "VX-58 Hex Viper",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "AR-81 Blackout Jackal",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "VX-83 Hex Viper",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "VX-14 Ivory Jackal",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "HX-40 Silent Harbinger",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "AR-82 Phantom Echo",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "MK-10 Obsidian Seraph",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "High Table restricted"
  },
  {
    "name": "VX-15 Silent Specter",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "SR-35 Ivory Regent",
    "category": "SMG",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "SR-45 Ivory Harbinger",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "CT-51 Silent Viper",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "CT-25 Obsidian Jackal",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "HX-68 Obsidian Viper",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "MK-47 Obsidian Mirage",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "High Table restricted"
  },
  {
    "name": "CT-82 Eclipse Echo",
    "category": "SMG",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "AR-20 Crimson Seraph",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "MK-68 Hex Mirage",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "VX-70 Ivory Mirage",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "CT-66 Phantom Specter",
    "category": "SMG",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "SR-50 Obsidian Echo",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "AR-55 Crimson Specter",
    "category": "SMG",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "CT-60 Obsidian Echo",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "VX-95 Blackout Jackal",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "VX-92 Crimson Harbinger",
    "category": "SMG",
    "status": "CLEAN",
    "note": "Unregistered build"
  },
  {
    "name": "VX-61 Crimson Harbinger",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "MK-71 Crimson Viper",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "AR-23 Ivory Jackal",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "CT-71 Silent Specter",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Unregistered build"
  },
  {
    "name": "HX-82 Hex Viper",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "CT-23 Hex Harbinger",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "MK-50 Eclipse Viper",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "HX-95 Ivory Regent",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "HX-51 Crimson Regent",
    "category": "SMG",
    "status": "CLEAN",
    "note": "High Table restricted"
  },
  {
    "name": "MK-87 Eclipse Echo",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "CT-72 Eclipse Seraph",
    "category": "SMG",
    "status": "CLEAN",
    "note": "High Table restricted"
  },
  {
    "name": "AR-39 Silent Specter",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "VX-66 Ivory Regent",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "VX-44 Obsidian Regent",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "VX-42 Phantom Mirage",
    "category": "SMG",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "CT-14 Blackout Regent",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "CT-19 Ivory Mirage",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Unregistered build"
  },
  {
    "name": "MK-27 Eclipse Echo",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "SR-17 Phantom Jackal",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Prototype unit"
  },
  {
    "name": "SR-79 Blackout Jackal",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "AR-21 Blackout Harbinger",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "SR-96 Eclipse Mirage",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "CT-90 Phantom Seraph",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Prototype unit"
  },
  {
    "name": "MK-62 Obsidian Viper",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "AR-43 Eclipse Harbinger",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "SR-59 Blackout Echo",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "AR-44 Blackout Jackal",
    "category": "SMG",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "CT-59 Phantom Jackal",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "AR-81 Ivory Jackal",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "MK-65 Phantom Viper",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "HX-35 Hex Regent",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "CT-38 Phantom Mirage",
    "category": "SMG",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "AR-51 Blackout Specter",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "MK-39 Ivory Seraph",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "CT-92 Obsidian Specter",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "High Table restricted"
  },
  {
    "name": "HX-88 Eclipse Harbinger",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "HX-58 Silent Echo",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "High Table restricted"
  },
  {
    "name": "HX-66 Crimson Seraph",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "Recovered from vault"
  },
  {
    "name": "AR-58 Obsidian Viper",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "SR-52 Obsidian Echo",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "CT-30 Hex Mirage",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Prototype unit"
  },
  {
    "name": "CT-90 Phantom Echo",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Prototype unit"
  },
  {
    "name": "MK-72 Phantom Echo",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "SR-44 Eclipse Regent",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "CT-68 Eclipse Mirage",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "SR-39 Ivory Viper",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "MK-52 Blackout Jackal",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "High Table restricted"
  },
  {
    "name": "AR-82 Blackout Harbinger",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "VX-47 Obsidian Mirage",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "CT-14 Crimson Mirage",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "AR-94 Crimson Seraph",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "MK-48 Obsidian Regent",
    "category": "SMG",
    "status": "CLEAN",
    "note": "Unregistered build"
  },
  {
    "name": "HX-91 Hex Harbinger",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Recovered from vault"
  },
  {
    "name": "SR-79 Hex Jackal",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "VX-60 Silent Viper",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "HX-27 Crimson Specter",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "MK-80 Silent Specter",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "HX-52 Silent Specter",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "HX-71 Silent Jackal",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "VX-96 Silent Regent",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "VX-98 Ivory Harbinger",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "HX-18 Hex Specter",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Recovered from vault"
  },
  {
    "name": "VX-84 Blackout Seraph",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "MK-34 Crimson Specter",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Prototype unit"
  },
  {
    "name": "SR-31 Eclipse Echo",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "CT-69 Silent Mirage",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "CT-32 Obsidian Specter",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "MK-33 Phantom Specter",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "Recovered from vault"
  },
  {
    "name": "AR-49 Crimson Regent",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "AR-30 Silent Echo",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "MK-71 Silent Echo",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "VX-68 Phantom Echo",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "SR-37 Silent Specter",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "SR-59 Crimson Echo",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Prototype unit"
  },
  {
    "name": "HX-52 Eclipse Seraph",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "AR-90 Ivory Jackal",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "MK-25 Crimson Jackal",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "VX-81 Hex Harbinger",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "CT-65 Hex Echo",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "Recovered from vault"
  },
  {
    "name": "HX-19 Ivory Seraph",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "SR-15 Crimson Seraph",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Unregistered build"
  },
  {
    "name": "VX-15 Ivory Seraph",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "VX-98 Obsidian Harbinger",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "AR-23 Hex Echo",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Prototype unit"
  },
  {
    "name": "CT-22 Obsidian Seraph",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "HX-26 Hex Regent",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "VX-62 Phantom Harbinger",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Prototype unit"
  },
  {
    "name": "CT-76 Ivory Harbinger",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "SR-62 Hex Seraph",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "MK-94 Eclipse Harbinger",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "Recovered from vault"
  },
  {
    "name": "VX-32 Ivory Seraph",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "MK-48 Silent Regent",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "MK-24 Obsidian Echo",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "Recovered from vault"
  },
  {
    "name": "HX-88 Blackout Specter",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "VX-31 Hex Mirage",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "CT-38 Phantom Echo",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "AR-43 Crimson Seraph",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "VX-59 Silent Echo",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "AR-37 Obsidian Specter",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Prototype unit"
  },
  {
    "name": "MK-87 Phantom Specter",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "AR-26 Blackout Specter",
    "category": "SMG",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "AR-96 Blackout Viper",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "Recovered from vault"
  },
  {
    "name": "MK-65 Ivory Specter",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "HX-72 Phantom Specter",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "MK-52 Blackout Seraph",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "MK-37 Blackout Mirage",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "AR-91 Ivory Specter",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "AR-89 Obsidian Echo",
    "category": "SMG",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "HX-57 Silent Mirage",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "Recovered from vault"
  },
  {
    "name": "MK-81 Obsidian Harbinger",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "High Table restricted"
  },
  {
    "name": "VX-79 Phantom Viper",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Prototype unit"
  },
  {
    "name": "SR-24 Blackout Seraph",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "AR-46 Crimson Specter",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "SR-39 Silent Mirage",
    "category": "SMG",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "CT-88 Obsidian Regent",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "MK-33 Blackout Mirage",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "AR-72 Ivory Echo",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "CT-41 Ivory Mirage",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "VX-23 Crimson Specter",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Prototype unit"
  },
  {
    "name": "AR-72 Ivory Echo",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "HX-28 Hex Echo",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "CT-36 Obsidian Echo",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "HX-14 Phantom Jackal",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "MK-32 Blackout Regent",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "CT-38 Eclipse Mirage",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "MK-75 Eclipse Harbinger",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "CT-51 Obsidian Seraph",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "VX-10 Hex Specter",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "CT-77 Silent Echo",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "SR-29 Silent Regent",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Prototype unit"
  },
  {
    "name": "MK-52 Hex Jackal",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "AR-53 Ivory Specter",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "AR-41 Silent Harbinger",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "High Table restricted"
  },
  {
    "name": "MK-37 Hex Mirage",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Recovered from vault"
  },
  {
    "name": "VX-84 Crimson Echo",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "AR-17 Silent Regent",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Prototype unit"
  },
  {
    "name": "VX-94 Crimson Viper",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "CT-27 Blackout Harbinger",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "CT-52 Crimson Mirage",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "VX-53 Hex Specter",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "SR-30 Blackout Mirage",
    "category": "SMG",
    "status": "CLEAN",
    "note": "Unregistered build"
  },
  {
    "name": "CT-14 Eclipse Echo",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "High Table restricted"
  },
  {
    "name": "AR-74 Eclipse Seraph",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "MK-44 Hex Echo",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "MK-10 Crimson Seraph",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "SR-44 Crimson Echo",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "MK-92 Crimson Specter",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Unregistered build"
  },
  {
    "name": "SR-37 Ivory Jackal",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "AR-34 Eclipse Echo",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Unregistered build"
  },
  {
    "name": "AR-60 Phantom Viper",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Unregistered build"
  },
  {
    "name": "CT-29 Phantom Harbinger",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "AR-96 Eclipse Regent",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "CT-97 Eclipse Regent",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "HX-57 Silent Mirage",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Unregistered build"
  },
  {
    "name": "SR-18 Ivory Jackal",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "MK-47 Crimson Jackal",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "High Table restricted"
  },
  {
    "name": "HX-59 Crimson Regent",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "CT-24 Obsidian Echo",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "AR-99 Ivory Harbinger",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "HX-67 Blackout Jackal",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "SR-56 Crimson Jackal",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "AR-58 Crimson Harbinger",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "MK-16 Phantom Harbinger",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "SR-12 Crimson Mirage",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "CT-80 Crimson Specter",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "SR-62 Silent Regent",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "AR-24 Crimson Viper",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "AR-72 Hex Specter",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Prototype unit"
  },
  {
    "name": "AR-17 Phantom Regent",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Unregistered build"
  },
  {
    "name": "MK-83 Silent Specter",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "CT-85 Silent Mirage",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "VX-90 Blackout Echo",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "SR-62 Crimson Harbinger",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "SR-58 Blackout Harbinger",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "HX-54 Ivory Mirage",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "HX-81 Crimson Echo",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "VX-67 Phantom Regent",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "AR-50 Hex Specter",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "HX-33 Hex Regent",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "SR-58 Obsidian Mirage",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "SR-13 Eclipse Jackal",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Prototype unit"
  },
  {
    "name": "MK-79 Phantom Specter",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "VX-42 Crimson Viper",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "MK-37 Eclipse Specter",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "VX-63 Phantom Harbinger",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "MK-72 Obsidian Harbinger",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "HX-77 Obsidian Seraph",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "HX-71 Phantom Seraph",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "SR-33 Hex Jackal",
    "category": "SMG",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "SR-34 Obsidian Regent",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Unregistered build"
  },
  {
    "name": "VX-17 Silent Jackal",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "MK-93 Blackout Specter",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "VX-51 Eclipse Regent",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "MK-23 Phantom Harbinger",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "VX-17 Silent Jackal",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "VX-54 Eclipse Seraph",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "AR-87 Crimson Specter",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "MK-97 Obsidian Specter",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "HX-37 Ivory Viper",
    "category": "SMG",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "HX-40 Phantom Viper",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "MK-18 Blackout Echo",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "MK-35 Crimson Regent",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "SR-71 Phantom Echo",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "AR-37 Hex Echo",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "High Table restricted"
  },
  {
    "name": "MK-24 Ivory Mirage",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "MK-18 Obsidian Viper",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "MK-58 Ivory Harbinger",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "VX-17 Phantom Echo",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "SR-91 Ivory Mirage",
    "category": "SMG",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "CT-68 Silent Mirage",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "HX-58 Eclipse Seraph",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Recovered from vault"
  },
  {
    "name": "AR-57 Obsidian Harbinger",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "CT-27 Blackout Echo",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "HX-12 Eclipse Regent",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "VX-24 Obsidian Seraph",
    "category": "SMG",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "CT-72 Hex Echo",
    "category": "SMG",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "HX-55 Eclipse Seraph",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "AR-87 Phantom Jackal",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Prototype unit"
  },
  {
    "name": "SR-46 Eclipse Regent",
    "category": "SMG",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "AR-90 Obsidian Mirage",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "VX-31 Ivory Specter",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "SR-48 Eclipse Harbinger",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "HX-38 Silent Viper",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "CT-65 Crimson Mirage",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "CT-83 Hex Harbinger",
    "category": "SMG",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "VX-66 Ivory Specter",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "MK-54 Blackout Regent",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "HX-46 Phantom Regent",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "MK-74 Blackout Regent",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Unregistered build"
  },
  {
    "name": "MK-82 Obsidian Echo",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "CT-25 Phantom Viper",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Unregistered build"
  },
  {
    "name": "AR-26 Obsidian Regent",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "VX-30 Silent Mirage",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "SR-94 Hex Harbinger",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "MK-81 Hex Seraph",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "CT-68 Phantom Harbinger",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "SR-59 Eclipse Harbinger",
    "category": "SMG",
    "status": "CLEAN",
    "note": "High Table restricted"
  },
  {
    "name": "VX-91 Ivory Seraph",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Recovered from vault"
  },
  {
    "name": "SR-43 Eclipse Echo",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "SR-49 Blackout Harbinger",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "HX-73 Crimson Regent",
    "category": "SMG",
    "status": "CLEAN",
    "note": "High Table restricted"
  },
  {
    "name": "AR-33 Hex Mirage",
    "category": "SMG",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "HX-37 Crimson Harbinger",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "VX-21 Ivory Viper",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "MK-37 Obsidian Echo",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "CT-54 Ivory Regent",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "HX-68 Obsidian Regent",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "CT-83 Blackout Jackal",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "CT-23 Obsidian Regent",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "HX-31 Blackout Echo",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "SR-81 Silent Specter",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "HX-79 Ivory Viper",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "MK-97 Crimson Specter",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "HX-45 Silent Viper",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "High Table restricted"
  },
  {
    "name": "SR-16 Eclipse Harbinger",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "VX-86 Blackout Echo",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "AR-43 Obsidian Seraph",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "MK-82 Eclipse Harbinger",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "MK-20 Silent Regent",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "SR-61 Hex Seraph",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "HX-66 Blackout Seraph",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Unregistered build"
  },
  {
    "name": "HX-77 Silent Jackal",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "AR-52 Blackout Regent",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "VX-59 Obsidian Jackal",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "MK-99 Crimson Specter",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "MK-23 Blackout Seraph",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "HX-86 Silent Harbinger",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "MK-39 Blackout Harbinger",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "VX-43 Crimson Echo",
    "category": "SMG",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "CT-12 Ivory Specter",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "AR-81 Phantom Mirage",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "AR-57 Ivory Harbinger",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "HX-82 Crimson Echo",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "CT-26 Obsidian Harbinger",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "MK-29 Blackout Regent",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "MK-29 Silent Seraph",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "AR-25 Eclipse Seraph",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "Recovered from vault"
  },
  {
    "name": "AR-25 Crimson Regent",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "CT-13 Silent Echo",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "MK-21 Phantom Seraph",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "MK-19 Hex Seraph",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "CT-48 Eclipse Regent",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "AR-97 Phantom Jackal",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "MK-98 Hex Echo",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "CT-55 Obsidian Mirage",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "HX-93 Hex Seraph",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "SR-62 Hex Regent",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "SR-84 Ivory Seraph",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "VX-19 Blackout Seraph",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "CT-78 Eclipse Echo",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "AR-17 Blackout Harbinger",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "VX-86 Obsidian Jackal",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "MK-36 Obsidian Seraph",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "AR-36 Eclipse Echo",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Recovered from vault"
  },
  {
    "name": "SR-68 Phantom Seraph",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "VX-75 Silent Regent",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "AR-79 Phantom Echo",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "CT-21 Eclipse Specter",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "SR-31 Eclipse Jackal",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Prototype unit"
  },
  {
    "name": "SR-54 Silent Viper",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "VX-64 Ivory Viper",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "CT-85 Hex Regent",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Unregistered build"
  },
  {
    "name": "AR-16 Silent Harbinger",
    "category": "SMG",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "HX-63 Blackout Echo",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "VX-12 Phantom Seraph",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "HX-89 Eclipse Harbinger",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "HX-35 Hex Specter",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "MK-91 Blackout Harbinger",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Unregistered build"
  },
  {
    "name": "VX-62 Phantom Echo",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "HX-50 Ivory Harbinger",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "SR-16 Obsidian Regent",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "HX-10 Silent Seraph",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Prototype unit"
  },
  {
    "name": "MK-84 Hex Specter",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "Recovered from vault"
  },
  {
    "name": "HX-56 Obsidian Jackal",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Prototype unit"
  },
  {
    "name": "VX-13 Hex Viper",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "CT-78 Ivory Harbinger",
    "category": "SMG",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "HX-81 Eclipse Echo",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "High Table restricted"
  },
  {
    "name": "HX-15 Hex Specter",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "HX-51 Ivory Viper",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "HX-86 Blackout Specter",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "VX-85 Crimson Jackal",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "VX-44 Blackout Regent",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "AR-37 Phantom Harbinger",
    "category": "SMG",
    "status": "CLEAN",
    "note": "Unregistered build"
  },
  {
    "name": "MK-37 Hex Jackal",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "MK-25 Eclipse Echo",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Prototype unit"
  },
  {
    "name": "AR-95 Blackout Viper",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "MK-23 Ivory Echo",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "MK-87 Silent Echo",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Unregistered build"
  },
  {
    "name": "AR-47 Hex Jackal",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "MK-33 Ivory Regent",
    "category": "SMG",
    "status": "CLEAN",
    "note": "High Table restricted"
  },
  {
    "name": "HX-40 Phantom Harbinger",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "SR-28 Silent Viper",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "VX-25 Hex Harbinger",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Unregistered build"
  },
  {
    "name": "SR-42 Eclipse Jackal",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "CT-58 Obsidian Viper",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "High Table restricted"
  },
  {
    "name": "VX-92 Obsidian Regent",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "AR-34 Ivory Seraph",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "AR-95 Silent Jackal",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "CT-76 Hex Seraph",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "SR-40 Ivory Jackal",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "Recovered from vault"
  },
  {
    "name": "SR-34 Ivory Specter",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "CT-16 Phantom Mirage",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "CT-73 Eclipse Regent",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "VX-36 Blackout Mirage",
    "category": "SMG",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "MK-26 Silent Viper",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "SR-97 Hex Seraph",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "AR-46 Hex Seraph",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "HX-25 Eclipse Mirage",
    "category": "SMG",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "SR-89 Silent Specter",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "VX-20 Phantom Regent",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "SR-84 Obsidian Seraph",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "AR-86 Ivory Mirage",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "VX-86 Hex Regent",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Prototype unit"
  },
  {
    "name": "CT-16 Phantom Mirage",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "AR-75 Hex Viper",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "HX-10 Silent Mirage",
    "category": "SMG",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "SR-39 Silent Seraph",
    "category": "SMG",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "VX-37 Silent Regent",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "SR-70 Eclipse Mirage",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "MK-18 Ivory Specter",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "CT-45 Silent Viper",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "SR-79 Blackout Viper",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "SR-63 Hex Regent",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "CT-32 Obsidian Mirage",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "SR-41 Phantom Specter",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "MK-58 Silent Harbinger",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "SR-85 Blackout Specter",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "High Table restricted"
  },
  {
    "name": "CT-55 Crimson Mirage",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "MK-62 Silent Echo",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "MK-63 Phantom Regent",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Prototype unit"
  },
  {
    "name": "CT-53 Hex Harbinger",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "CT-35 Blackout Specter",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "VX-73 Hex Echo",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "High Table restricted"
  },
  {
    "name": "AR-90 Phantom Harbinger",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "AR-47 Blackout Regent",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "CT-30 Obsidian Regent",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "AR-24 Eclipse Echo",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "VX-41 Ivory Specter",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Recovered from vault"
  },
  {
    "name": "SR-82 Ivory Specter",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "HX-23 Silent Seraph",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "CT-73 Silent Jackal",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "AR-44 Hex Specter",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "HX-25 Phantom Viper",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "HX-13 Phantom Jackal",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "MK-29 Blackout Echo",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "MK-78 Ivory Echo",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "HX-24 Hex Mirage",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "MK-82 Blackout Echo",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "VX-88 Crimson Seraph",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "HX-47 Hex Echo",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "AR-46 Silent Echo",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "HX-20 Eclipse Echo",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "VX-27 Phantom Specter",
    "category": "SMG",
    "status": "CLEAN",
    "note": "Unregistered build"
  },
  {
    "name": "HX-18 Blackout Jackal",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "AR-53 Phantom Mirage",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "MK-29 Hex Echo",
    "category": "SMG",
    "status": "CLEAN",
    "note": "High Table restricted"
  },
  {
    "name": "SR-52 Phantom Seraph",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "VX-63 Obsidian Specter",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "AR-86 Silent Specter",
    "category": "SMG",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "MK-60 Hex Jackal",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "MK-84 Phantom Jackal",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "CT-82 Obsidian Regent",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "HX-85 Hex Seraph",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "HX-60 Crimson Harbinger",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "SR-47 Eclipse Echo",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "AR-39 Silent Jackal",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "VX-84 Silent Seraph",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "VX-99 Phantom Regent",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "MK-75 Crimson Specter",
    "category": "SMG",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "MK-49 Hex Seraph",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Recovered from vault"
  },
  {
    "name": "AR-95 Silent Seraph",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "SR-67 Silent Specter",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "High Table restricted"
  },
  {
    "name": "VX-31 Blackout Echo",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "SR-68 Ivory Mirage",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "SR-41 Blackout Harbinger",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "SR-34 Hex Viper",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Prototype unit"
  },
  {
    "name": "HX-58 Ivory Specter",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "HX-99 Blackout Mirage",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "High Table restricted"
  },
  {
    "name": "SR-93 Eclipse Jackal",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "HX-66 Phantom Regent",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "AR-76 Crimson Echo",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "SR-37 Silent Mirage",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "CT-15 Hex Regent",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "CT-15 Hex Echo",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "High Table restricted"
  },
  {
    "name": "CT-84 Blackout Viper",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Prototype unit"
  },
  {
    "name": "HX-67 Hex Viper",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "HX-35 Blackout Viper",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "High Table restricted"
  },
  {
    "name": "CT-40 Hex Seraph",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "MK-43 Silent Viper",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "AR-54 Obsidian Viper",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "Recovered from vault"
  },
  {
    "name": "CT-99 Eclipse Jackal",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Recovered from vault"
  },
  {
    "name": "CT-49 Obsidian Echo",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "High Table restricted"
  },
  {
    "name": "CT-88 Ivory Specter",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "CT-11 Obsidian Echo",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "VX-19 Eclipse Viper",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "VX-10 Blackout Mirage",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "AR-10 Crimson Jackal",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "SR-34 Blackout Viper",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "CT-26 Silent Specter",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "MK-80 Obsidian Viper",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "VX-47 Phantom Harbinger",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "MK-75 Silent Harbinger",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "CT-13 Silent Jackal",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Prototype unit"
  },
  {
    "name": "HX-48 Silent Viper",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "AR-64 Phantom Echo",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "MK-54 Blackout Harbinger",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "HX-20 Phantom Jackal",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "HX-77 Silent Regent",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "CT-38 Blackout Viper",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "SR-96 Blackout Echo",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "AR-30 Ivory Viper",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "High Table restricted"
  },
  {
    "name": "VX-62 Crimson Specter",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "VX-44 Crimson Jackal",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "SR-45 Silent Echo",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "MK-37 Eclipse Regent",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Recovered from vault"
  },
  {
    "name": "SR-45 Hex Viper",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Recovered from vault"
  },
  {
    "name": "MK-91 Phantom Echo",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "High Table restricted"
  },
  {
    "name": "SR-94 Ivory Specter",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "MK-52 Crimson Mirage",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "AR-23 Ivory Mirage",
    "category": "SMG",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "MK-41 Hex Seraph",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Prototype unit"
  },
  {
    "name": "HX-87 Ivory Viper",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "CT-75 Silent Seraph",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "VX-61 Hex Jackal",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "CT-54 Eclipse Mirage",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "Recovered from vault"
  },
  {
    "name": "CT-71 Silent Mirage",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Recovered from vault"
  },
  {
    "name": "AR-94 Phantom Seraph",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "HX-88 Silent Regent",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "High Table restricted"
  },
  {
    "name": "CT-91 Ivory Regent",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "MK-33 Ivory Seraph",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "SR-75 Silent Mirage",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "MK-57 Obsidian Viper",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "Recovered from vault"
  },
  {
    "name": "HX-85 Silent Echo",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "SR-78 Hex Viper",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "MK-84 Blackout Echo",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "SR-95 Eclipse Specter",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "SR-19 Eclipse Jackal",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "VX-26 Eclipse Seraph",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "CT-61 Crimson Harbinger",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "HX-63 Phantom Harbinger",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "VX-87 Phantom Seraph",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "SR-24 Ivory Viper",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Prototype unit"
  },
  {
    "name": "HX-31 Blackout Specter",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Unregistered build"
  },
  {
    "name": "VX-60 Blackout Mirage",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "MK-35 Silent Jackal",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "AR-43 Obsidian Jackal",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "High Table restricted"
  },
  {
    "name": "MK-14 Obsidian Specter",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "CT-18 Crimson Seraph",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "MK-13 Obsidian Specter",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "MK-70 Phantom Jackal",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "CT-33 Crimson Specter",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "MK-91 Blackout Harbinger",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "HX-53 Crimson Echo",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "AR-78 Ivory Viper",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "CT-64 Blackout Specter",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "MK-60 Blackout Harbinger",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "CT-22 Obsidian Jackal",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "AR-47 Phantom Viper",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "AR-11 Silent Specter",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "CT-33 Obsidian Jackal",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "MK-13 Silent Jackal",
    "category": "SMG",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "AR-11 Silent Harbinger",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "CT-51 Silent Mirage",
    "category": "SMG",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "VX-41 Ivory Viper",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "CT-28 Hex Specter",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Prototype unit"
  },
  {
    "name": "VX-45 Obsidian Regent",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "HX-10 Ivory Seraph",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "VX-88 Obsidian Echo",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "AR-67 Obsidian Harbinger",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "SR-43 Silent Mirage",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "SR-40 Hex Specter",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "HX-66 Eclipse Viper",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "AR-50 Crimson Harbinger",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "HX-39 Phantom Specter",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Unregistered build"
  },
  {
    "name": "MK-67 Phantom Mirage",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "MK-87 Phantom Mirage",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "HX-32 Phantom Jackal",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "HX-50 Eclipse Regent",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "SR-48 Phantom Viper",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "VX-27 Eclipse Seraph",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Unregistered build"
  },
  {
    "name": "VX-30 Blackout Mirage",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "VX-48 Crimson Harbinger",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "MK-18 Crimson Jackal",
    "category": "SMG",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "VX-49 Crimson Jackal",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Prototype unit"
  },
  {
    "name": "SR-41 Crimson Mirage",
    "category": "SMG",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "CT-96 Blackout Echo",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "MK-50 Eclipse Seraph",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "AR-32 Blackout Viper",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "CT-48 Crimson Echo",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "SR-16 Ivory Jackal",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Recovered from vault"
  },
  {
    "name": "HX-96 Eclipse Jackal",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "SR-24 Obsidian Jackal",
    "category": "SMG",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "SR-59 Silent Regent",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "CT-85 Phantom Seraph",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "CT-62 Obsidian Mirage",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "CT-34 Blackout Echo",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "SR-58 Ivory Viper",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "VX-98 Hex Echo",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "HX-85 Ivory Regent",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "MK-29 Eclipse Seraph",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "AR-71 Eclipse Seraph",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Recovered from vault"
  },
  {
    "name": "SR-20 Hex Echo",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "MK-18 Obsidian Jackal",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "HX-16 Silent Viper",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "MK-44 Blackout Viper",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Unregistered build"
  },
  {
    "name": "MK-26 Crimson Echo",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "SR-59 Blackout Specter",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "CT-18 Silent Regent",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "HX-49 Silent Regent",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "MK-24 Ivory Harbinger",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "VX-65 Obsidian Jackal",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "AR-18 Obsidian Mirage",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "CT-33 Blackout Specter",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "VX-16 Blackout Viper",
    "category": "SMG",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "SR-87 Hex Mirage",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "SR-10 Silent Jackal",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "Recovered from vault"
  },
  {
    "name": "AR-21 Hex Regent",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "High Table restricted"
  },
  {
    "name": "AR-26 Eclipse Harbinger",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "VX-74 Ivory Mirage",
    "category": "SMG",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "MK-22 Obsidian Echo",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "Recovered from vault"
  },
  {
    "name": "VX-58 Obsidian Viper",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "SR-64 Ivory Viper",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "CT-86 Hex Regent",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "HX-27 Silent Jackal",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "SR-64 Silent Seraph",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "HX-27 Obsidian Jackal",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "HX-76 Crimson Viper",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Unregistered build"
  },
  {
    "name": "CT-55 Hex Echo",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "MK-99 Ivory Specter",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "HX-94 Ivory Harbinger",
    "category": "SMG",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "HX-51 Eclipse Harbinger",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "VX-38 Eclipse Mirage",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "MK-86 Phantom Mirage",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "CT-49 Crimson Viper",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "MK-65 Eclipse Jackal",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "CT-10 Silent Regent",
    "category": "SMG",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "MK-22 Ivory Seraph",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Prototype unit"
  },
  {
    "name": "CT-92 Obsidian Harbinger",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "SR-30 Eclipse Mirage",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "VX-95 Silent Harbinger",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "SR-23 Silent Viper",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "SR-60 Eclipse Viper",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "VX-23 Phantom Specter",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "HX-17 Phantom Harbinger",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "HX-95 Blackout Mirage",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "CT-26 Obsidian Specter",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "SR-61 Blackout Specter",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "CT-93 Crimson Jackal",
    "category": "SMG",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "SR-32 Blackout Echo",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Prototype unit"
  },
  {
    "name": "HX-47 Eclipse Mirage",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "CT-75 Blackout Jackal",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Prototype unit"
  },
  {
    "name": "SR-13 Eclipse Jackal",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Recovered from vault"
  },
  {
    "name": "MK-18 Ivory Echo",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "MK-41 Eclipse Mirage",
    "category": "SMG",
    "status": "CLEAN",
    "note": "Unregistered build"
  },
  {
    "name": "HX-15 Obsidian Jackal",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "VX-58 Silent Seraph",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "AR-98 Obsidian Seraph",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "VX-12 Blackout Specter",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "HX-95 Blackout Jackal",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "VX-98 Blackout Echo",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "VX-40 Crimson Specter",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "CT-16 Crimson Seraph",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "AR-46 Eclipse Echo",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "AR-56 Obsidian Specter",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "VX-71 Eclipse Mirage",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "SR-49 Ivory Echo",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "MK-35 Eclipse Seraph",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "VX-24 Obsidian Jackal",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "MK-33 Obsidian Harbinger",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "MK-46 Hex Echo",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "HX-51 Ivory Regent",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "Recovered from vault"
  },
  {
    "name": "SR-80 Silent Harbinger",
    "category": "SMG",
    "status": "CLEAN",
    "note": "Unregistered build"
  },
  {
    "name": "HX-66 Hex Viper",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "MK-55 Blackout Viper",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Prototype unit"
  },
  {
    "name": "VX-42 Eclipse Viper",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "High Table restricted"
  },
  {
    "name": "CT-54 Blackout Mirage",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "MK-94 Hex Mirage",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "Recovered from vault"
  },
  {
    "name": "VX-34 Crimson Specter",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "HX-55 Hex Jackal",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "SR-84 Silent Jackal",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "VX-24 Blackout Seraph",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "SR-31 Hex Harbinger",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "SR-75 Hex Seraph",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "VX-62 Eclipse Viper",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "VX-94 Ivory Regent",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "AR-71 Ivory Viper",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "HX-23 Ivory Harbinger",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "AR-61 Eclipse Viper",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "VX-16 Obsidian Specter",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "MK-57 Obsidian Specter",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "CT-66 Eclipse Viper",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "SR-46 Ivory Seraph",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "HX-55 Silent Regent",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "HX-44 Blackout Echo",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "AR-88 Ivory Jackal",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "HX-25 Ivory Specter",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "VX-49 Phantom Harbinger",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "VX-36 Phantom Seraph",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "High Table restricted"
  },
  {
    "name": "AR-24 Ivory Jackal",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "AR-45 Phantom Specter",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "HX-82 Hex Echo",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "MK-56 Silent Echo",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "AR-39 Crimson Jackal",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "VX-38 Ivory Viper",
    "category": "SMG",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "MK-65 Eclipse Specter",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "VX-78 Ivory Mirage",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "CT-15 Blackout Specter",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "CT-62 Hex Regent",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "VX-51 Ivory Viper",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "SR-31 Silent Regent",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "AR-76 Hex Mirage",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "AR-63 Obsidian Viper",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "MK-32 Hex Mirage",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "MK-32 Obsidian Echo",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "CT-85 Obsidian Seraph",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "SR-81 Obsidian Viper",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "AR-41 Phantom Mirage",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "SR-69 Phantom Echo",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "VX-30 Silent Jackal",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "MK-13 Phantom Mirage",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "CT-38 Obsidian Harbinger",
    "category": "Exotic",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "CT-44 Hex Mirage",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "Unregistered build"
  },
  {
    "name": "AR-71 Ivory Jackal",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "VX-46 Eclipse Mirage",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "HX-46 Hex Echo",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "HX-57 Crimson Jackal",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "SR-90 Hex Echo",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "HX-89 Obsidian Seraph",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "CT-79 Obsidian Harbinger",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "AR-18 Crimson Harbinger",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "HX-14 Blackout Jackal",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "AR-11 Eclipse Mirage",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "CT-34 Obsidian Mirage",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "SR-15 Silent Echo",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "SR-77 Silent Specter",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "CT-97 Ivory Echo",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "HX-90 Obsidian Seraph",
    "category": "Sniper",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "HX-75 Phantom Harbinger",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Legacy piece"
  },
  {
    "name": "CT-24 Ivory Jackal",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "VX-21 Ivory Specter",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Unregistered build"
  },
  {
    "name": "MK-80 Ivory Jackal",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "High Table restricted"
  },
  {
    "name": "SR-64 Obsidian Mirage",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "SR-20 Silent Harbinger",
    "category": "SMG",
    "status": "UNAVAILABLE",
    "note": "Unregistered build"
  },
  {
    "name": "HX-81 Ivory Mirage",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "SR-48 Blackout Harbinger",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "SR-92 Crimson Regent",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "MK-84 Blackout Mirage",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Prototype unit"
  },
  {
    "name": "AR-30 Blackout Specter",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "MK-49 Crimson Viper",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "AR-99 Hex Viper",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "AR-97 Eclipse Mirage",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "AR-58 Blackout Seraph",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "HX-68 Crimson Harbinger",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "HX-92 Crimson Specter",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "AR-42 Ivory Harbinger",
    "category": "SMG",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "VX-68 Phantom Harbinger",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "Recovered from vault"
  },
  {
    "name": "SR-50 Hex Specter",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Ghost-only allocation"
  },
  {
    "name": "HX-21 Obsidian Regent",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "CT-40 Eclipse Mirage",
    "category": "SMG",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "CT-20 Ivory Harbinger",
    "category": "Handgun",
    "status": "CLEAN",
    "note": "Recovered from vault"
  },
  {
    "name": "AR-89 Hex Seraph",
    "category": "Rifle",
    "status": "CLEAN",
    "note": "Prototype unit"
  },
  {
    "name": "SR-58 Obsidian Viper",
    "category": "Sniper",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "SR-80 Phantom Specter",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Recovered from vault"
  },
  {
    "name": "MK-56 Obsidian Viper",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Recovered from vault"
  },
  {
    "name": "MK-20 Ivory Seraph",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "SR-32 Blackout Jackal",
    "category": "Sniper",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "VX-72 Ivory Seraph",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Unregistered build"
  },
  {
    "name": "HX-68 Blackout Jackal",
    "category": "SMG",
    "status": "LOCKED",
    "note": "Ghost-only allocation"
  },
  {
    "name": "MK-26 Eclipse Specter",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "VX-43 Phantom Specter",
    "category": "Rifle",
    "status": "UNAVAILABLE",
    "note": "Prototype unit"
  },
  {
    "name": "MK-66 Hex Regent",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "SR-99 Blackout Echo",
    "category": "Handgun",
    "status": "LOCKED",
    "note": "Recovered from vault"
  },
  {
    "name": "CT-17 Obsidian Viper",
    "category": "Exotic",
    "status": "UNAVAILABLE",
    "note": "Recovered from vault"
  },
  {
    "name": "AR-92 Blackout Viper",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Legacy piece"
  },
  {
    "name": "MK-50 Ivory Mirage",
    "category": "Handgun",
    "status": "UNAVAILABLE",
    "note": "Legacy piece"
  },
  {
    "name": "SR-10 Eclipse Echo",
    "category": "SMG",
    "status": "CLEAN",
    "note": "High Table restricted"
  },
  {
    "name": "VX-63 Ivory Harbinger",
    "category": "Rifle",
    "status": "LOCKED",
    "note": "High Table restricted"
  },
  {
    "name": "CT-41 Ivory Mirage",
    "category": "SMG",
    "status": "CLEAN",
    "note": "Ghost-only allocation"
  },
  {
    "name": "AR-35 Phantom Regent",
    "category": "Exotic",
    "status": "CLEAN",
    "note": "Legacy piece"
  }
];

  const missions = [
  {
    "id": "KR-47",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "GX-73",
    "level": "Burn Notice",
    "reward": "Debt Cleared",
    "status": "IN NEGOTIATION",
    "region": "APAC"
  },
  {
    "id": "NX-70",
    "level": "High Table",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "MK-21",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "AL-24",
    "level": "Burn Notice",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "HV-69",
    "level": "High Table",
    "reward": "Unknown",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "NX-16",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "GX-10",
    "level": "Burn Notice",
    "reward": "Debt Cleared",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "KR-47",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "IN NEGOTIATION",
    "region": "LATAM"
  },
  {
    "id": "AL-29",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "EMEA"
  },
  {
    "id": "NX-98",
    "level": "High Table",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "KR-26",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "MK-77",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "AL-82",
    "level": "High Table",
    "reward": "Debt Cleared",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "GX-61",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "GX-47",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "HV-22",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "IN NEGOTIATION",
    "region": "APAC"
  },
  {
    "id": "KR-20",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "NX-63",
    "level": "High Table",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "KR-19",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "KR-53",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "LOCKED",
    "region": "GLOBAL"
  },
  {
    "id": "MK-69",
    "level": "Ghost",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "AL-13",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "NX-93",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "GX-34",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "HV-13",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "HV-33",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "IN NEGOTIATION",
    "region": "AMER"
  },
  {
    "id": "NX-71",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "HV-95",
    "level": "Ghost",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "GX-97",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "KR-26",
    "level": "High Table",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "AMER"
  },
  {
    "id": "KR-73",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "GX-93",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "GLOBAL"
  },
  {
    "id": "KR-53",
    "level": "Burn Notice",
    "reward": "Full Erasure",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "AL-38",
    "level": "High Table",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "HV-31",
    "level": "Continental Only",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "GX-39",
    "level": "Continental Only",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "NX-87",
    "level": "Ghost",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "EMEA"
  },
  {
    "id": "GX-77",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "GLOBAL"
  },
  {
    "id": "GX-17",
    "level": "Continental Only",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "MK-23",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "KR-32",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "LOCKED",
    "region": "GLOBAL"
  },
  {
    "id": "NX-55",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "NX-27",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "EMEA"
  },
  {
    "id": "NX-33",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "APAC"
  },
  {
    "id": "AL-63",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "HV-27",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "APAC"
  },
  {
    "id": "NX-69",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "MK-49",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "GX-31",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "NX-74",
    "level": "Continental Only",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "NX-83",
    "level": "High Table",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "HV-97",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "APAC"
  },
  {
    "id": "KR-55",
    "level": "High Table",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "HV-65",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "HV-75",
    "level": "Continental Only",
    "reward": "Unknown",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "GX-70",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "LOCKED",
    "region": "APAC"
  },
  {
    "id": "HV-82",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "LOCKED",
    "region": "GLOBAL"
  },
  {
    "id": "HV-64",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "GX-52",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "IN NEGOTIATION",
    "region": "AMER"
  },
  {
    "id": "KR-28",
    "level": "Continental Only",
    "reward": "Unknown",
    "status": "LOCKED",
    "region": "APAC"
  },
  {
    "id": "GX-55",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "GX-80",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "IN NEGOTIATION",
    "region": "APAC"
  },
  {
    "id": "NX-14",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "EMEA"
  },
  {
    "id": "MK-21",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "EMEA"
  },
  {
    "id": "GX-95",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "KR-68",
    "level": "Continental Only",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "HV-90",
    "level": "High Table",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "KR-24",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "KR-35",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "NX-80",
    "level": "High Table",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "NX-50",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "LATAM"
  },
  {
    "id": "NX-52",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "AL-14",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "MK-95",
    "level": "High Table",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "NX-74",
    "level": "Ghost",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "EMEA"
  },
  {
    "id": "NX-19",
    "level": "High Table",
    "reward": "Debt Cleared",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "MK-28",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "AL-17",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "KR-18",
    "level": "Burn Notice",
    "reward": "Debt Cleared",
    "status": "AVAILABLE",
    "region": "EMEA"
  },
  {
    "id": "MK-78",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "APAC"
  },
  {
    "id": "GX-95",
    "level": "Burn Notice",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "NX-72",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "EMEA"
  },
  {
    "id": "NX-90",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "HV-49",
    "level": "Ghost",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "KR-76",
    "level": "Burn Notice",
    "reward": "Debt Cleared",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "MK-53",
    "level": "High Table",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "GX-14",
    "level": "High Table",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "GLOBAL"
  },
  {
    "id": "GX-83",
    "level": "Continental Only",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "AMER"
  },
  {
    "id": "MK-47",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "KR-29",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "KR-69",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "IN NEGOTIATION",
    "region": "LATAM"
  },
  {
    "id": "MK-59",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "HV-83",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "APAC"
  },
  {
    "id": "AL-36",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "NX-29",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "IN NEGOTIATION",
    "region": "APAC"
  },
  {
    "id": "AL-94",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "GX-56",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "KR-10",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "GLOBAL"
  },
  {
    "id": "GX-36",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "AL-27",
    "level": "Burn Notice",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "APAC"
  },
  {
    "id": "NX-43",
    "level": "Continental Only",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "NX-85",
    "level": "Ghost",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "MK-85",
    "level": "Ghost",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "APAC"
  },
  {
    "id": "AL-50",
    "level": "Continental Only",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "AL-26",
    "level": "Ghost",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "HV-33",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "IN NEGOTIATION",
    "region": "AMER"
  },
  {
    "id": "GX-95",
    "level": "High Table",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "GX-22",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "IN NEGOTIATION",
    "region": "LATAM"
  },
  {
    "id": "GX-32",
    "level": "High Table",
    "reward": "Debt Cleared",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "AL-76",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "HV-79",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "EMEA"
  },
  {
    "id": "HV-41",
    "level": "Burn Notice",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "AMER"
  },
  {
    "id": "NX-42",
    "level": "High Table",
    "reward": "Full Erasure",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "MK-60",
    "level": "Ghost",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "EMEA"
  },
  {
    "id": "KR-84",
    "level": "High Table",
    "reward": "Unknown",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "MK-93",
    "level": "Ghost",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "MK-92",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "AL-30",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "LOCKED",
    "region": "APAC"
  },
  {
    "id": "AL-60",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "AVAILABLE",
    "region": "EMEA"
  },
  {
    "id": "NX-32",
    "level": "High Table",
    "reward": "Full Erasure",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "AL-79",
    "level": "High Table",
    "reward": "Full Erasure",
    "status": "DECLINED",
    "region": "APAC"
  },
  {
    "id": "AL-40",
    "level": "High Table",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "LATAM"
  },
  {
    "id": "MK-27",
    "level": "High Table",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "MK-54",
    "level": "High Table",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "GX-85",
    "level": "Ghost",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "HV-90",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "IN NEGOTIATION",
    "region": "AMER"
  },
  {
    "id": "GX-65",
    "level": "Continental Only",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "HV-18",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "AL-60",
    "level": "High Table",
    "reward": "Debt Cleared",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "HV-59",
    "level": "High Table",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "HV-19",
    "level": "Continental Only",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "HV-74",
    "level": "High Table",
    "reward": "Full Erasure",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "NX-19",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "IN NEGOTIATION",
    "region": "AMER"
  },
  {
    "id": "HV-10",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "AL-11",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "HV-83",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "AMER"
  },
  {
    "id": "AL-50",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "APAC"
  },
  {
    "id": "HV-24",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "EMEA"
  },
  {
    "id": "AL-70",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "AL-48",
    "level": "High Table",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "AL-37",
    "level": "High Table",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "EMEA"
  },
  {
    "id": "NX-48",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "IN NEGOTIATION",
    "region": "LATAM"
  },
  {
    "id": "AL-84",
    "level": "High Table",
    "reward": "Debt Cleared",
    "status": "IN NEGOTIATION",
    "region": "AMER"
  },
  {
    "id": "AL-16",
    "level": "High Table",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "KR-45",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "MK-58",
    "level": "High Table",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "NX-25",
    "level": "Ghost",
    "reward": "Golden Marker",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "GX-55",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "EMEA"
  },
  {
    "id": "NX-58",
    "level": "Ghost",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "NX-21",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "HV-36",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "EMEA"
  },
  {
    "id": "GX-18",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "HV-55",
    "level": "Ghost",
    "reward": "Obsidian Token",
    "status": "IN NEGOTIATION",
    "region": "LATAM"
  },
  {
    "id": "MK-92",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "AL-58",
    "level": "Continental Only",
    "reward": "Golden Marker",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "GX-18",
    "level": "Ghost",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "HV-13",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "IN NEGOTIATION",
    "region": "APAC"
  },
  {
    "id": "HV-49",
    "level": "High Table",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "HV-20",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "IN NEGOTIATION",
    "region": "LATAM"
  },
  {
    "id": "KR-23",
    "level": "Burn Notice",
    "reward": "Full Erasure",
    "status": "LOCKED",
    "region": "GLOBAL"
  },
  {
    "id": "AL-24",
    "level": "Continental Only",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "MK-86",
    "level": "High Table",
    "reward": "Unknown",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "GX-60",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "MK-86",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "NX-63",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "NX-32",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "GX-16",
    "level": "High Table",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "AL-16",
    "level": "Burn Notice",
    "reward": "Debt Cleared",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "GX-21",
    "level": "High Table",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "MK-96",
    "level": "Continental Only",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "NX-89",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "APAC"
  },
  {
    "id": "NX-93",
    "level": "Burn Notice",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "NX-75",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "LATAM"
  },
  {
    "id": "HV-37",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "HV-96",
    "level": "Burn Notice",
    "reward": "Debt Cleared",
    "status": "LOCKED",
    "region": "APAC"
  },
  {
    "id": "HV-16",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "APAC"
  },
  {
    "id": "KR-59",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "KR-17",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "MK-94",
    "level": "Burn Notice",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "KR-65",
    "level": "High Table",
    "reward": "Golden Marker",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "MK-40",
    "level": "High Table",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "EMEA"
  },
  {
    "id": "HV-47",
    "level": "Continental Only",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "HV-75",
    "level": "Burn Notice",
    "reward": "Debt Cleared",
    "status": "LOCKED",
    "region": "GLOBAL"
  },
  {
    "id": "MK-79",
    "level": "Burn Notice",
    "reward": "Full Erasure",
    "status": "IN NEGOTIATION",
    "region": "AMER"
  },
  {
    "id": "AL-66",
    "level": "High Table",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "NX-18",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "EMEA"
  },
  {
    "id": "MK-44",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "AL-38",
    "level": "High Table",
    "reward": "Full Erasure",
    "status": "IN NEGOTIATION",
    "region": "LATAM"
  },
  {
    "id": "NX-11",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "KR-27",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "EMEA"
  },
  {
    "id": "MK-38",
    "level": "Continental Only",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "GX-28",
    "level": "High Table",
    "reward": "Golden Marker",
    "status": "IN NEGOTIATION",
    "region": "AMER"
  },
  {
    "id": "MK-11",
    "level": "Continental Only",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "KR-63",
    "level": "Ghost",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "AL-38",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "EMEA"
  },
  {
    "id": "GX-77",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "IN NEGOTIATION",
    "region": "APAC"
  },
  {
    "id": "HV-80",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "IN NEGOTIATION",
    "region": "APAC"
  },
  {
    "id": "NX-17",
    "level": "Continental Only",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "AL-19",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "NX-84",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "AL-91",
    "level": "Ghost",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "AMER"
  },
  {
    "id": "KR-13",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "NX-18",
    "level": "Ghost",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "GX-73",
    "level": "Continental Only",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "NX-16",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "IN NEGOTIATION",
    "region": "APAC"
  },
  {
    "id": "GX-54",
    "level": "Burn Notice",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "AL-87",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "EMEA"
  },
  {
    "id": "KR-19",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "MK-15",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "IN NEGOTIATION",
    "region": "APAC"
  },
  {
    "id": "NX-91",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "IN NEGOTIATION",
    "region": "APAC"
  },
  {
    "id": "KR-33",
    "level": "Continental Only",
    "reward": "Golden Marker",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "HV-27",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "IN NEGOTIATION",
    "region": "LATAM"
  },
  {
    "id": "MK-23",
    "level": "High Table",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "EMEA"
  },
  {
    "id": "GX-73",
    "level": "Ghost",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "NX-38",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "IN NEGOTIATION",
    "region": "LATAM"
  },
  {
    "id": "MK-69",
    "level": "High Table",
    "reward": "Unknown",
    "status": "LOCKED",
    "region": "APAC"
  },
  {
    "id": "AL-84",
    "level": "Ghost",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "KR-53",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "MK-97",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "EMEA"
  },
  {
    "id": "KR-22",
    "level": "High Table",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "MK-86",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "EMEA"
  },
  {
    "id": "NX-32",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "NX-76",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "AMER"
  },
  {
    "id": "MK-60",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "NX-41",
    "level": "Ghost",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "MK-76",
    "level": "High Table",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "EMEA"
  },
  {
    "id": "HV-38",
    "level": "Continental Only",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "APAC"
  },
  {
    "id": "KR-48",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "GX-43",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "AMER"
  },
  {
    "id": "NX-12",
    "level": "Burn Notice",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "EMEA"
  },
  {
    "id": "KR-50",
    "level": "High Table",
    "reward": "Full Erasure",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "GX-56",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "HV-22",
    "level": "Ghost",
    "reward": "Obsidian Token",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "KR-58",
    "level": "Ghost",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "GX-42",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "KR-95",
    "level": "Continental Only",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "HV-11",
    "level": "High Table",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "AMER"
  },
  {
    "id": "HV-65",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "HV-18",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "APAC"
  },
  {
    "id": "NX-74",
    "level": "Continental Only",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "MK-95",
    "level": "Continental Only",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "KR-29",
    "level": "Burn Notice",
    "reward": "Full Erasure",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "AL-57",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "HV-27",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "GX-58",
    "level": "High Table",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "NX-86",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "DECLINED",
    "region": "EMEA"
  },
  {
    "id": "NX-95",
    "level": "Continental Only",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "KR-21",
    "level": "Ghost",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "NX-45",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "MK-79",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "MK-79",
    "level": "High Table",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "AL-16",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "EMEA"
  },
  {
    "id": "GX-35",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "MK-66",
    "level": "Ghost",
    "reward": "Obsidian Token",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "GX-62",
    "level": "Continental Only",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "HV-30",
    "level": "Ghost",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "EMEA"
  },
  {
    "id": "GX-78",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "HV-40",
    "level": "High Table",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "AL-31",
    "level": "High Table",
    "reward": "Full Erasure",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "NX-31",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "GX-26",
    "level": "Burn Notice",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "HV-71",
    "level": "High Table",
    "reward": "Full Erasure",
    "status": "DECLINED",
    "region": "EMEA"
  },
  {
    "id": "NX-39",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "KR-20",
    "level": "High Table",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "NX-71",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "GX-65",
    "level": "High Table",
    "reward": "Debt Cleared",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "HV-64",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "HV-73",
    "level": "High Table",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "AL-11",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "HV-21",
    "level": "High Table",
    "reward": "Full Erasure",
    "status": "IN NEGOTIATION",
    "region": "LATAM"
  },
  {
    "id": "NX-59",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "LOCKED",
    "region": "GLOBAL"
  },
  {
    "id": "NX-74",
    "level": "Continental Only",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "AL-15",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "GX-82",
    "level": "Ghost",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "KR-98",
    "level": "High Table",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "GX-52",
    "level": "High Table",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "KR-18",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "AL-64",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "HV-78",
    "level": "Burn Notice",
    "reward": "Full Erasure",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "NX-56",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "KR-68",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "GLOBAL"
  },
  {
    "id": "AL-41",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "HV-97",
    "level": "Continental Only",
    "reward": "Golden Marker",
    "status": "IN NEGOTIATION",
    "region": "AMER"
  },
  {
    "id": "KR-33",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "APAC"
  },
  {
    "id": "GX-53",
    "level": "Ghost",
    "reward": "Obsidian Token",
    "status": "IN NEGOTIATION",
    "region": "AMER"
  },
  {
    "id": "NX-27",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "KR-30",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "HV-56",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "GX-75",
    "level": "Continental Only",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "KR-47",
    "level": "Continental Only",
    "reward": "Unknown",
    "status": "LOCKED",
    "region": "APAC"
  },
  {
    "id": "HV-27",
    "level": "High Table",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "KR-81",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "AMER"
  },
  {
    "id": "MK-54",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "APAC"
  },
  {
    "id": "NX-48",
    "level": "High Table",
    "reward": "Unknown",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "MK-77",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "GX-10",
    "level": "Ghost",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "APAC"
  },
  {
    "id": "MK-64",
    "level": "High Table",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "KR-72",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "IN NEGOTIATION",
    "region": "AMER"
  },
  {
    "id": "GX-38",
    "level": "High Table",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "AMER"
  },
  {
    "id": "AL-61",
    "level": "High Table",
    "reward": "Unknown",
    "status": "LOCKED",
    "region": "APAC"
  },
  {
    "id": "HV-89",
    "level": "Continental Only",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "AL-49",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "MK-82",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "AL-86",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "LOCKED",
    "region": "APAC"
  },
  {
    "id": "MK-87",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "HV-83",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "LOCKED",
    "region": "GLOBAL"
  },
  {
    "id": "HV-15",
    "level": "Ghost",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "KR-86",
    "level": "Burn Notice",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "MK-95",
    "level": "High Table",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "KR-26",
    "level": "High Table",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "EMEA"
  },
  {
    "id": "GX-55",
    "level": "High Table",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "KR-34",
    "level": "Burn Notice",
    "reward": "Debt Cleared",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "MK-94",
    "level": "Ghost",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "AMER"
  },
  {
    "id": "HV-68",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "GX-79",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "MK-46",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "AL-74",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "APAC"
  },
  {
    "id": "AL-35",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "AMER"
  },
  {
    "id": "NX-74",
    "level": "Ghost",
    "reward": "Golden Marker",
    "status": "IN NEGOTIATION",
    "region": "APAC"
  },
  {
    "id": "HV-62",
    "level": "Ghost",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "AMER"
  },
  {
    "id": "NX-94",
    "level": "Ghost",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "APAC"
  },
  {
    "id": "MK-45",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "MK-65",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "AL-75",
    "level": "High Table",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "GX-47",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "APAC"
  },
  {
    "id": "HV-20",
    "level": "Continental Only",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "AL-79",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "APAC"
  },
  {
    "id": "AL-92",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "AVAILABLE",
    "region": "AMER"
  },
  {
    "id": "AL-35",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "EMEA"
  },
  {
    "id": "GX-87",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "KR-40",
    "level": "High Table",
    "reward": "Debt Cleared",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "MK-35",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "KR-97",
    "level": "High Table",
    "reward": "Debt Cleared",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "GX-60",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "IN NEGOTIATION",
    "region": "LATAM"
  },
  {
    "id": "AL-84",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "GLOBAL"
  },
  {
    "id": "AL-66",
    "level": "High Table",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "NX-22",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "GX-43",
    "level": "Burn Notice",
    "reward": "Full Erasure",
    "status": "LOCKED",
    "region": "APAC"
  },
  {
    "id": "MK-57",
    "level": "High Table",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "KR-76",
    "level": "High Table",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "AL-74",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "AL-72",
    "level": "High Table",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "AMER"
  },
  {
    "id": "GX-72",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "IN NEGOTIATION",
    "region": "LATAM"
  },
  {
    "id": "MK-26",
    "level": "High Table",
    "reward": "Debt Cleared",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "NX-64",
    "level": "Burn Notice",
    "reward": "Full Erasure",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "MK-10",
    "level": "High Table",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "KR-85",
    "level": "High Table",
    "reward": "Unknown",
    "status": "LOCKED",
    "region": "APAC"
  },
  {
    "id": "MK-46",
    "level": "Continental Only",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "HV-64",
    "level": "High Table",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "MK-52",
    "level": "Burn Notice",
    "reward": "Debt Cleared",
    "status": "IN NEGOTIATION",
    "region": "APAC"
  },
  {
    "id": "KR-30",
    "level": "Continental Only",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "KR-43",
    "level": "High Table",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "HV-93",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "MK-69",
    "level": "High Table",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "APAC"
  },
  {
    "id": "AL-35",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "MK-59",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "EMEA"
  },
  {
    "id": "GX-60",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "GX-88",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "GX-71",
    "level": "Continental Only",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "HV-46",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "AMER"
  },
  {
    "id": "NX-58",
    "level": "Continental Only",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "EMEA"
  },
  {
    "id": "GX-50",
    "level": "High Table",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "NX-17",
    "level": "High Table",
    "reward": "Debt Cleared",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "GX-73",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "APAC"
  },
  {
    "id": "KR-85",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "KR-96",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "NX-83",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "GLOBAL"
  },
  {
    "id": "AL-82",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "MK-39",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "GX-32",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "MK-84",
    "level": "High Table",
    "reward": "Golden Marker",
    "status": "IN NEGOTIATION",
    "region": "AMER"
  },
  {
    "id": "GX-49",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "APAC"
  },
  {
    "id": "KR-85",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "EMEA"
  },
  {
    "id": "GX-39",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "AL-96",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "HV-20",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "KR-61",
    "level": "Ghost",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "GLOBAL"
  },
  {
    "id": "KR-98",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "KR-74",
    "level": "Ghost",
    "reward": "Golden Marker",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "GX-69",
    "level": "High Table",
    "reward": "Debt Cleared",
    "status": "AVAILABLE",
    "region": "EMEA"
  },
  {
    "id": "GX-35",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "EMEA"
  },
  {
    "id": "NX-28",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "IN NEGOTIATION",
    "region": "LATAM"
  },
  {
    "id": "NX-32",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "NX-14",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "APAC"
  },
  {
    "id": "MK-43",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "AL-56",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "APAC"
  },
  {
    "id": "HV-10",
    "level": "High Table",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "AMER"
  },
  {
    "id": "MK-96",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "GX-89",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "APAC"
  },
  {
    "id": "MK-56",
    "level": "Burn Notice",
    "reward": "Full Erasure",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "NX-88",
    "level": "Continental Only",
    "reward": "Unknown",
    "status": "LOCKED",
    "region": "APAC"
  },
  {
    "id": "KR-58",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "LOCKED",
    "region": "GLOBAL"
  },
  {
    "id": "KR-96",
    "level": "Ghost",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "APAC"
  },
  {
    "id": "MK-91",
    "level": "Ghost",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "EMEA"
  },
  {
    "id": "HV-43",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "IN NEGOTIATION",
    "region": "LATAM"
  },
  {
    "id": "NX-28",
    "level": "High Table",
    "reward": "Full Erasure",
    "status": "IN NEGOTIATION",
    "region": "LATAM"
  },
  {
    "id": "MK-76",
    "level": "High Table",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "HV-34",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "LOCKED",
    "region": "GLOBAL"
  },
  {
    "id": "KR-70",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "MK-76",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "KR-37",
    "level": "Continental Only",
    "reward": "Unknown",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "HV-10",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "HV-13",
    "level": "Ghost",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "APAC"
  },
  {
    "id": "AL-42",
    "level": "Continental Only",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "GX-58",
    "level": "Ghost",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "HV-83",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "GX-52",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "DECLINED",
    "region": "EMEA"
  },
  {
    "id": "KR-87",
    "level": "Ghost",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "GX-99",
    "level": "High Table",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "EMEA"
  },
  {
    "id": "AL-55",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "MK-82",
    "level": "Burn Notice",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "EMEA"
  },
  {
    "id": "HV-89",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "GX-62",
    "level": "Ghost",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "NX-10",
    "level": "Continental Only",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "LATAM"
  },
  {
    "id": "KR-87",
    "level": "High Table",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "GX-66",
    "level": "Burn Notice",
    "reward": "Debt Cleared",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "AL-84",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "AL-58",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "KR-73",
    "level": "High Table",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "NX-65",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "APAC"
  },
  {
    "id": "KR-20",
    "level": "Ghost",
    "reward": "Obsidian Token",
    "status": "IN NEGOTIATION",
    "region": "LATAM"
  },
  {
    "id": "GX-18",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "NX-41",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "MK-61",
    "level": "High Table",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "AL-97",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "GX-57",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "GX-53",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "NX-40",
    "level": "High Table",
    "reward": "Full Erasure",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "AL-35",
    "level": "Ghost",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "HV-68",
    "level": "High Table",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "HV-13",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "AL-42",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "KR-51",
    "level": "Continental Only",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "NX-65",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "AL-47",
    "level": "Ghost",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "GLOBAL"
  },
  {
    "id": "NX-39",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "HV-95",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "GX-24",
    "level": "Burn Notice",
    "reward": "Full Erasure",
    "status": "DECLINED",
    "region": "EMEA"
  },
  {
    "id": "GX-39",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "MK-11",
    "level": "Continental Only",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "GX-82",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "EMEA"
  },
  {
    "id": "GX-60",
    "level": "Ghost",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "EMEA"
  },
  {
    "id": "AL-14",
    "level": "High Table",
    "reward": "Debt Cleared",
    "status": "AVAILABLE",
    "region": "AMER"
  },
  {
    "id": "GX-77",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "KR-92",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "AL-19",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "HV-11",
    "level": "High Table",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "NX-69",
    "level": "Ghost",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "GX-62",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "GX-91",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "MK-28",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "IN NEGOTIATION",
    "region": "AMER"
  },
  {
    "id": "GX-22",
    "level": "Ghost",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "KR-26",
    "level": "High Table",
    "reward": "Full Erasure",
    "status": "LOCKED",
    "region": "GLOBAL"
  },
  {
    "id": "AL-39",
    "level": "High Table",
    "reward": "Full Erasure",
    "status": "IN NEGOTIATION",
    "region": "LATAM"
  },
  {
    "id": "HV-95",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "AL-45",
    "level": "Continental Only",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "HV-97",
    "level": "High Table",
    "reward": "Full Erasure",
    "status": "IN NEGOTIATION",
    "region": "AMER"
  },
  {
    "id": "GX-38",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "AL-58",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "AVAILABLE",
    "region": "EMEA"
  },
  {
    "id": "GX-46",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "NX-74",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "LOCKED",
    "region": "GLOBAL"
  },
  {
    "id": "KR-33",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "AL-93",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "GX-42",
    "level": "Continental Only",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "MK-60",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "IN NEGOTIATION",
    "region": "AMER"
  },
  {
    "id": "MK-69",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "MK-33",
    "level": "High Table",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "NX-24",
    "level": "High Table",
    "reward": "Debt Cleared",
    "status": "IN NEGOTIATION",
    "region": "LATAM"
  },
  {
    "id": "NX-84",
    "level": "Burn Notice",
    "reward": "Debt Cleared",
    "status": "IN NEGOTIATION",
    "region": "APAC"
  },
  {
    "id": "MK-92",
    "level": "High Table",
    "reward": "Full Erasure",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "GX-12",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "AMER"
  },
  {
    "id": "GX-92",
    "level": "Ghost",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "NX-48",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "NX-99",
    "level": "High Table",
    "reward": "Debt Cleared",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "AL-92",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "IN NEGOTIATION",
    "region": "AMER"
  },
  {
    "id": "KR-95",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "KR-63",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "MK-94",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "MK-84",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "AVAILABLE",
    "region": "EMEA"
  },
  {
    "id": "MK-90",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "MK-43",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "MK-24",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "IN NEGOTIATION",
    "region": "LATAM"
  },
  {
    "id": "NX-95",
    "level": "High Table",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "EMEA"
  },
  {
    "id": "KR-91",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "MK-26",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "AVAILABLE",
    "region": "EMEA"
  },
  {
    "id": "HV-27",
    "level": "Burn Notice",
    "reward": "Debt Cleared",
    "status": "LOCKED",
    "region": "APAC"
  },
  {
    "id": "HV-77",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "LOCKED",
    "region": "APAC"
  },
  {
    "id": "KR-88",
    "level": "Burn Notice",
    "reward": "Full Erasure",
    "status": "LOCKED",
    "region": "GLOBAL"
  },
  {
    "id": "HV-26",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "AMER"
  },
  {
    "id": "AL-69",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "EMEA"
  },
  {
    "id": "MK-13",
    "level": "High Table",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "LATAM"
  },
  {
    "id": "KR-27",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "MK-89",
    "level": "High Table",
    "reward": "Debt Cleared",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "MK-30",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "NX-46",
    "level": "Ghost",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "KR-40",
    "level": "Ghost",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "APAC"
  },
  {
    "id": "NX-29",
    "level": "High Table",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "KR-69",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "NX-35",
    "level": "Burn Notice",
    "reward": "Debt Cleared",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "HV-43",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "AL-48",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "EMEA"
  },
  {
    "id": "GX-83",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "HV-17",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "KR-57",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "MK-29",
    "level": "Continental Only",
    "reward": "Unknown",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "GX-86",
    "level": "Burn Notice",
    "reward": "Full Erasure",
    "status": "IN NEGOTIATION",
    "region": "LATAM"
  },
  {
    "id": "HV-70",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "KR-20",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "MK-67",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "MK-21",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "MK-10",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "AL-72",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "APAC"
  },
  {
    "id": "GX-58",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "MK-69",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "LATAM"
  },
  {
    "id": "NX-25",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "LOCKED",
    "region": "APAC"
  },
  {
    "id": "HV-26",
    "level": "Ghost",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "NX-29",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "NX-47",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "HV-89",
    "level": "Continental Only",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "EMEA"
  },
  {
    "id": "AL-84",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "IN NEGOTIATION",
    "region": "APAC"
  },
  {
    "id": "HV-30",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "HV-60",
    "level": "High Table",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "APAC"
  },
  {
    "id": "AL-65",
    "level": "High Table",
    "reward": "Unknown",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "HV-98",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "HV-72",
    "level": "Ghost",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "KR-78",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "GX-39",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "NX-30",
    "level": "Continental Only",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "HV-78",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "APAC"
  },
  {
    "id": "MK-89",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "HV-11",
    "level": "High Table",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "GX-46",
    "level": "Ghost",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "AL-99",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "HV-74",
    "level": "Ghost",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "HV-18",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "NX-78",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "APAC"
  },
  {
    "id": "HV-75",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "AL-78",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "AL-29",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "MK-91",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "LATAM"
  },
  {
    "id": "GX-14",
    "level": "High Table",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "GX-23",
    "level": "Continental Only",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "EMEA"
  },
  {
    "id": "MK-76",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "AVAILABLE",
    "region": "EMEA"
  },
  {
    "id": "KR-42",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "EMEA"
  },
  {
    "id": "NX-32",
    "level": "Continental Only",
    "reward": "Unknown",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "MK-42",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "AL-17",
    "level": "Continental Only",
    "reward": "Unknown",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "KR-58",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "EMEA"
  },
  {
    "id": "MK-24",
    "level": "Continental Only",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "AMER"
  },
  {
    "id": "AL-65",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "HV-83",
    "level": "Continental Only",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "LATAM"
  },
  {
    "id": "KR-93",
    "level": "Continental Only",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "GX-90",
    "level": "Ghost",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "NX-36",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "IN NEGOTIATION",
    "region": "AMER"
  },
  {
    "id": "KR-76",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "GX-18",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "KR-68",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "HV-32",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "MK-95",
    "level": "Ghost",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "APAC"
  },
  {
    "id": "GX-53",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "NX-30",
    "level": "Burn Notice",
    "reward": "Full Erasure",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "KR-25",
    "level": "High Table",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "AL-55",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "HV-46",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "IN NEGOTIATION",
    "region": "AMER"
  },
  {
    "id": "MK-32",
    "level": "High Table",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "GX-92",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "KR-23",
    "level": "Ghost",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "AL-86",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "IN NEGOTIATION",
    "region": "LATAM"
  },
  {
    "id": "NX-23",
    "level": "High Table",
    "reward": "Debt Cleared",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "HV-34",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "EMEA"
  },
  {
    "id": "GX-72",
    "level": "High Table",
    "reward": "Debt Cleared",
    "status": "AVAILABLE",
    "region": "EMEA"
  },
  {
    "id": "NX-31",
    "level": "Burn Notice",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "EMEA"
  },
  {
    "id": "HV-78",
    "level": "High Table",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "GX-68",
    "level": "Continental Only",
    "reward": "Unknown",
    "status": "LOCKED",
    "region": "APAC"
  },
  {
    "id": "AL-65",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "KR-75",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "AMER"
  },
  {
    "id": "GX-39",
    "level": "High Table",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "KR-59",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "LOCKED",
    "region": "GLOBAL"
  },
  {
    "id": "GX-41",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "KR-36",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "HV-66",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "KR-17",
    "level": "Burn Notice",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "AMER"
  },
  {
    "id": "GX-29",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "GLOBAL"
  },
  {
    "id": "NX-47",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "HV-25",
    "level": "High Table",
    "reward": "Debt Cleared",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "MK-53",
    "level": "High Table",
    "reward": "Debt Cleared",
    "status": "IN NEGOTIATION",
    "region": "AMER"
  },
  {
    "id": "GX-17",
    "level": "Continental Only",
    "reward": "Unknown",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "KR-37",
    "level": "Burn Notice",
    "reward": "Debt Cleared",
    "status": "LOCKED",
    "region": "APAC"
  },
  {
    "id": "HV-40",
    "level": "Continental Only",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "EMEA"
  },
  {
    "id": "MK-45",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "IN NEGOTIATION",
    "region": "APAC"
  },
  {
    "id": "GX-67",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "AMER"
  },
  {
    "id": "HV-47",
    "level": "Burn Notice",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "APAC"
  },
  {
    "id": "HV-99",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "HV-59",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "IN NEGOTIATION",
    "region": "LATAM"
  },
  {
    "id": "AL-12",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "HV-77",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "LATAM"
  },
  {
    "id": "NX-81",
    "level": "Burn Notice",
    "reward": "Full Erasure",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "NX-45",
    "level": "High Table",
    "reward": "Golden Marker",
    "status": "IN NEGOTIATION",
    "region": "AMER"
  },
  {
    "id": "GX-82",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "HV-38",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "LOCKED",
    "region": "GLOBAL"
  },
  {
    "id": "NX-33",
    "level": "Ghost",
    "reward": "Obsidian Token",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "MK-65",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "NX-89",
    "level": "Continental Only",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "APAC"
  },
  {
    "id": "HV-30",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "HV-91",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "MK-15",
    "level": "High Table",
    "reward": "Golden Marker",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "NX-46",
    "level": "Ghost",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "AL-47",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "AL-68",
    "level": "Continental Only",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "APAC"
  },
  {
    "id": "AL-78",
    "level": "Burn Notice",
    "reward": "Debt Cleared",
    "status": "LOCKED",
    "region": "APAC"
  },
  {
    "id": "KR-86",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "APAC"
  },
  {
    "id": "NX-20",
    "level": "High Table",
    "reward": "Golden Marker",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "HV-75",
    "level": "High Table",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "HV-64",
    "level": "High Table",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "GX-62",
    "level": "Ghost",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "APAC"
  },
  {
    "id": "GX-38",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "HV-33",
    "level": "Ghost",
    "reward": "Obsidian Token",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "GX-36",
    "level": "Ghost",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "KR-17",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "AL-48",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "NX-91",
    "level": "Burn Notice",
    "reward": "Full Erasure",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "GX-37",
    "level": "Ghost",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "AL-93",
    "level": "Continental Only",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "LATAM"
  },
  {
    "id": "NX-72",
    "level": "High Table",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "GX-75",
    "level": "High Table",
    "reward": "Debt Cleared",
    "status": "AVAILABLE",
    "region": "EMEA"
  },
  {
    "id": "MK-22",
    "level": "Ghost",
    "reward": "Golden Marker",
    "status": "IN NEGOTIATION",
    "region": "AMER"
  },
  {
    "id": "KR-12",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "KR-85",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "GX-45",
    "level": "Ghost",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "GLOBAL"
  },
  {
    "id": "NX-54",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "AL-75",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "IN NEGOTIATION",
    "region": "APAC"
  },
  {
    "id": "NX-28",
    "level": "Burn Notice",
    "reward": "Full Erasure",
    "status": "LOCKED",
    "region": "GLOBAL"
  },
  {
    "id": "HV-96",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "GX-57",
    "level": "High Table",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "APAC"
  },
  {
    "id": "MK-62",
    "level": "High Table",
    "reward": "Full Erasure",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "NX-76",
    "level": "Continental Only",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "APAC"
  },
  {
    "id": "KR-10",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "KR-26",
    "level": "Burn Notice",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "AL-95",
    "level": "High Table",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "GX-31",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "IN NEGOTIATION",
    "region": "APAC"
  },
  {
    "id": "GX-70",
    "level": "High Table",
    "reward": "Unknown",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "MK-64",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "KR-69",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "GX-58",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "GX-73",
    "level": "Continental Only",
    "reward": "Golden Marker",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "MK-76",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "EMEA"
  },
  {
    "id": "KR-86",
    "level": "Continental Only",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "LATAM"
  },
  {
    "id": "NX-24",
    "level": "Burn Notice",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "AL-10",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "MK-21",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "AL-69",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "LOCKED",
    "region": "APAC"
  },
  {
    "id": "GX-75",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "GX-78",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "AL-61",
    "level": "Ghost",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "HV-35",
    "level": "Burn Notice",
    "reward": "Debt Cleared",
    "status": "LOCKED",
    "region": "APAC"
  },
  {
    "id": "HV-76",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "APAC"
  },
  {
    "id": "NX-21",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "AL-85",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "AL-42",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "IN NEGOTIATION",
    "region": "AMER"
  },
  {
    "id": "AL-66",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "AL-51",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "EMEA"
  },
  {
    "id": "NX-83",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "GX-94",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "EMEA"
  },
  {
    "id": "NX-58",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "EMEA"
  },
  {
    "id": "NX-14",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "AMER"
  },
  {
    "id": "GX-17",
    "level": "Ghost",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "HV-32",
    "level": "Continental Only",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "AL-55",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "IN NEGOTIATION",
    "region": "APAC"
  },
  {
    "id": "AL-60",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "MK-81",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "NX-34",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "HV-95",
    "level": "High Table",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "LATAM"
  },
  {
    "id": "NX-77",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "EMEA"
  },
  {
    "id": "HV-45",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "AL-79",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "IN NEGOTIATION",
    "region": "LATAM"
  },
  {
    "id": "KR-86",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "HV-86",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "NX-18",
    "level": "Ghost",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "NX-95",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "KR-85",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "EMEA"
  },
  {
    "id": "HV-65",
    "level": "Ghost",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "NX-11",
    "level": "High Table",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "HV-51",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "EMEA"
  },
  {
    "id": "MK-51",
    "level": "Burn Notice",
    "reward": "Full Erasure",
    "status": "IN NEGOTIATION",
    "region": "AMER"
  },
  {
    "id": "GX-53",
    "level": "Ghost",
    "reward": "Obsidian Token",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "GX-70",
    "level": "Continental Only",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "GLOBAL"
  },
  {
    "id": "GX-12",
    "level": "Burn Notice",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "GX-50",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "APAC"
  },
  {
    "id": "HV-87",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "AVAILABLE",
    "region": "EMEA"
  },
  {
    "id": "GX-86",
    "level": "Continental Only",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "GLOBAL"
  },
  {
    "id": "KR-64",
    "level": "High Table",
    "reward": "Debt Cleared",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "GX-43",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "GX-69",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "KR-71",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "MK-72",
    "level": "High Table",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "HV-97",
    "level": "Ghost",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "NX-44",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "APAC"
  },
  {
    "id": "GX-97",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "GX-75",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "AL-62",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "HV-56",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "AL-78",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "DECLINED",
    "region": "EMEA"
  },
  {
    "id": "AL-86",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "APAC"
  },
  {
    "id": "AL-78",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "GX-98",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "AL-98",
    "level": "Burn Notice",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "APAC"
  },
  {
    "id": "MK-96",
    "level": "High Table",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "HV-22",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "NX-66",
    "level": "Continental Only",
    "reward": "Golden Marker",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "HV-14",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "IN NEGOTIATION",
    "region": "APAC"
  },
  {
    "id": "MK-19",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "HV-29",
    "level": "Burn Notice",
    "reward": "Debt Cleared",
    "status": "IN NEGOTIATION",
    "region": "APAC"
  },
  {
    "id": "AL-86",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "LOCKED",
    "region": "APAC"
  },
  {
    "id": "MK-99",
    "level": "Burn Notice",
    "reward": "Debt Cleared",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "HV-13",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "NX-66",
    "level": "Burn Notice",
    "reward": "Debt Cleared",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "KR-85",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "EMEA"
  },
  {
    "id": "HV-61",
    "level": "Continental Only",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "MK-12",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "AVAILABLE",
    "region": "AMER"
  },
  {
    "id": "MK-23",
    "level": "Burn Notice",
    "reward": "Full Erasure",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "NX-10",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "GX-60",
    "level": "High Table",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "KR-13",
    "level": "Burn Notice",
    "reward": "Full Erasure",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "KR-96",
    "level": "Ghost",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "APAC"
  },
  {
    "id": "AL-47",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "EMEA"
  },
  {
    "id": "MK-53",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "GLOBAL"
  },
  {
    "id": "HV-15",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "HV-54",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "AL-90",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "LOCKED",
    "region": "GLOBAL"
  },
  {
    "id": "NX-14",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "EMEA"
  },
  {
    "id": "NX-80",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "MK-94",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "MK-67",
    "level": "Burn Notice",
    "reward": "Debt Cleared",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "NX-33",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "KR-39",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "KR-20",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "LATAM"
  },
  {
    "id": "AL-55",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "AL-52",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "GX-58",
    "level": "Ghost",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "NX-34",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "NX-57",
    "level": "Continental Only",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "APAC"
  },
  {
    "id": "AL-70",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "GX-17",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "IN NEGOTIATION",
    "region": "APAC"
  },
  {
    "id": "GX-32",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "AL-72",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "GX-72",
    "level": "Burn Notice",
    "reward": "Full Erasure",
    "status": "IN NEGOTIATION",
    "region": "APAC"
  },
  {
    "id": "HV-24",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "NX-72",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "KR-28",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "EMEA"
  },
  {
    "id": "KR-32",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "NX-62",
    "level": "High Table",
    "reward": "Full Erasure",
    "status": "IN NEGOTIATION",
    "region": "APAC"
  },
  {
    "id": "GX-94",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "DECLINED",
    "region": "EMEA"
  },
  {
    "id": "GX-33",
    "level": "Burn Notice",
    "reward": "Full Erasure",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "MK-36",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "MK-52",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "AVAILABLE",
    "region": "EMEA"
  },
  {
    "id": "AL-74",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "AMER"
  },
  {
    "id": "HV-92",
    "level": "Ghost",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "KR-20",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "HV-74",
    "level": "High Table",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "APAC"
  },
  {
    "id": "GX-16",
    "level": "Continental Only",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "EMEA"
  },
  {
    "id": "NX-44",
    "level": "Burn Notice",
    "reward": "Debt Cleared",
    "status": "AVAILABLE",
    "region": "AMER"
  },
  {
    "id": "MK-65",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "IN NEGOTIATION",
    "region": "AMER"
  },
  {
    "id": "HV-83",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "MK-16",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "HV-71",
    "level": "Continental Only",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "GLOBAL"
  },
  {
    "id": "NX-80",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "IN NEGOTIATION",
    "region": "AMER"
  },
  {
    "id": "MK-85",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "KR-24",
    "level": "Ghost",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "GLOBAL"
  },
  {
    "id": "KR-99",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "AL-15",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "EMEA"
  },
  {
    "id": "KR-74",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "APAC"
  },
  {
    "id": "GX-43",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "HV-76",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "APAC"
  },
  {
    "id": "KR-89",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "NX-53",
    "level": "High Table",
    "reward": "Full Erasure",
    "status": "LOCKED",
    "region": "APAC"
  },
  {
    "id": "MK-17",
    "level": "Ghost",
    "reward": "Obsidian Token",
    "status": "IN NEGOTIATION",
    "region": "APAC"
  },
  {
    "id": "HV-65",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "KR-82",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "EMEA"
  },
  {
    "id": "HV-22",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "EMEA"
  },
  {
    "id": "HV-35",
    "level": "Ghost",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "MK-58",
    "level": "Ghost",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "NX-63",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "NX-27",
    "level": "High Table",
    "reward": "Full Erasure",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "GX-16",
    "level": "High Table",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "GX-61",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "APAC"
  },
  {
    "id": "HV-36",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "IN NEGOTIATION",
    "region": "APAC"
  },
  {
    "id": "MK-19",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "GX-18",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "GX-50",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "GX-13",
    "level": "High Table",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "GX-18",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "APAC"
  },
  {
    "id": "KR-90",
    "level": "Ghost",
    "reward": "Obsidian Token",
    "status": "IN NEGOTIATION",
    "region": "APAC"
  },
  {
    "id": "AL-29",
    "level": "High Table",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "MK-73",
    "level": "High Table",
    "reward": "Debt Cleared",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "AL-36",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "LOCKED",
    "region": "GLOBAL"
  },
  {
    "id": "HV-57",
    "level": "Burn Notice",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "MK-86",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "LOCKED",
    "region": "GLOBAL"
  },
  {
    "id": "NX-67",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "HV-96",
    "level": "High Table",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "GX-16",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "APAC"
  },
  {
    "id": "AL-87",
    "level": "High Table",
    "reward": "Full Erasure",
    "status": "IN NEGOTIATION",
    "region": "APAC"
  },
  {
    "id": "KR-38",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "AMER"
  },
  {
    "id": "HV-98",
    "level": "High Table",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "LATAM"
  },
  {
    "id": "AL-95",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "NX-26",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "IN NEGOTIATION",
    "region": "AMER"
  },
  {
    "id": "GX-74",
    "level": "High Table",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "EMEA"
  },
  {
    "id": "MK-76",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "AMER"
  },
  {
    "id": "GX-20",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "AL-74",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "GX-45",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "HV-26",
    "level": "Burn Notice",
    "reward": "Full Erasure",
    "status": "LOCKED",
    "region": "GLOBAL"
  },
  {
    "id": "KR-47",
    "level": "High Table",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "AL-67",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "EMEA"
  },
  {
    "id": "HV-55",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "APAC"
  },
  {
    "id": "GX-72",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "GX-42",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "GX-22",
    "level": "Continental Only",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "AMER"
  },
  {
    "id": "MK-48",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "IN NEGOTIATION",
    "region": "APAC"
  },
  {
    "id": "MK-97",
    "level": "Continental Only",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "HV-54",
    "level": "Continental Only",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "EMEA"
  },
  {
    "id": "HV-16",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "NX-63",
    "level": "Burn Notice",
    "reward": "Full Erasure",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "MK-61",
    "level": "High Table",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "AMER"
  },
  {
    "id": "KR-45",
    "level": "High Table",
    "reward": "Full Erasure",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "GX-60",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "LOCKED",
    "region": "APAC"
  },
  {
    "id": "KR-92",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "GX-72",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "IN NEGOTIATION",
    "region": "LATAM"
  },
  {
    "id": "NX-85",
    "level": "Burn Notice",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "KR-95",
    "level": "High Table",
    "reward": "Unknown",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "KR-44",
    "level": "Burn Notice",
    "reward": "Debt Cleared",
    "status": "AVAILABLE",
    "region": "EMEA"
  },
  {
    "id": "MK-28",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "LOCKED",
    "region": "GLOBAL"
  },
  {
    "id": "HV-95",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "GX-65",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "KR-87",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "EMEA"
  },
  {
    "id": "GX-90",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "HV-36",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "AMER"
  },
  {
    "id": "KR-78",
    "level": "High Table",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "MK-32",
    "level": "Ghost",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "GX-31",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "KR-68",
    "level": "High Table",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "MK-21",
    "level": "Burn Notice",
    "reward": "Debt Cleared",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "HV-42",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "GLOBAL"
  },
  {
    "id": "NX-30",
    "level": "Burn Notice",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "KR-83",
    "level": "Continental Only",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "MK-11",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "GX-77",
    "level": "High Table",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "MK-47",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "HV-57",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "AL-54",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "HV-15",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "GX-96",
    "level": "Burn Notice",
    "reward": "Debt Cleared",
    "status": "IN NEGOTIATION",
    "region": "LATAM"
  },
  {
    "id": "KR-37",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "GX-93",
    "level": "High Table",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "GX-79",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "LOCKED",
    "region": "GLOBAL"
  },
  {
    "id": "GX-51",
    "level": "Continental Only",
    "reward": "Golden Marker",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "NX-83",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "NX-87",
    "level": "High Table",
    "reward": "Full Erasure",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "KR-43",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "APAC"
  },
  {
    "id": "HV-10",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "MK-62",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "NX-30",
    "level": "High Table",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "AMER"
  },
  {
    "id": "KR-68",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "EMEA"
  },
  {
    "id": "HV-93",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "IN NEGOTIATION",
    "region": "LATAM"
  },
  {
    "id": "HV-10",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "AMER"
  },
  {
    "id": "MK-34",
    "level": "High Table",
    "reward": "Full Erasure",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "MK-20",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "MK-98",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "NX-70",
    "level": "High Table",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "AL-85",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "MK-11",
    "level": "Continental Only",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "AMER"
  },
  {
    "id": "NX-63",
    "level": "Burn Notice",
    "reward": "Full Erasure",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "HV-25",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "MK-47",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "NX-99",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "NX-20",
    "level": "High Table",
    "reward": "Debt Cleared",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "GX-56",
    "level": "High Table",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "AMER"
  },
  {
    "id": "AL-26",
    "level": "Burn Notice",
    "reward": "Full Erasure",
    "status": "IN NEGOTIATION",
    "region": "APAC"
  },
  {
    "id": "HV-56",
    "level": "Continental Only",
    "reward": "Golden Marker",
    "status": "IN NEGOTIATION",
    "region": "APAC"
  },
  {
    "id": "HV-33",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "GX-36",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "EMEA"
  },
  {
    "id": "GX-22",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "HV-88",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "NX-26",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "AMER"
  },
  {
    "id": "AL-66",
    "level": "Ghost",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "MK-11",
    "level": "High Table",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "MK-61",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "AL-38",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "IN NEGOTIATION",
    "region": "AMER"
  },
  {
    "id": "GX-96",
    "level": "High Table",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "KR-55",
    "level": "Ghost",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "AMER"
  },
  {
    "id": "HV-23",
    "level": "High Table",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "EMEA"
  },
  {
    "id": "AL-36",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "AL-82",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "DECLINED",
    "region": "APAC"
  },
  {
    "id": "MK-51",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "IN NEGOTIATION",
    "region": "APAC"
  },
  {
    "id": "AL-32",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "LOCKED",
    "region": "APAC"
  },
  {
    "id": "NX-56",
    "level": "High Table",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "HV-49",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "GLOBAL"
  },
  {
    "id": "HV-88",
    "level": "High Table",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "EMEA"
  },
  {
    "id": "KR-81",
    "level": "Continental Only",
    "reward": "Golden Marker",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "NX-82",
    "level": "High Table",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "KR-70",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "EMEA"
  },
  {
    "id": "AL-50",
    "level": "Ghost",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "GX-14",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "EMEA"
  },
  {
    "id": "MK-92",
    "level": "High Table",
    "reward": "Golden Marker",
    "status": "IN NEGOTIATION",
    "region": "AMER"
  },
  {
    "id": "AL-48",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "AMER"
  },
  {
    "id": "KR-58",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "HV-70",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "KR-78",
    "level": "Continental Only",
    "reward": "Unknown",
    "status": "LOCKED",
    "region": "APAC"
  },
  {
    "id": "HV-54",
    "level": "High Table",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "KR-20",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "HV-44",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "NX-52",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "GX-21",
    "level": "High Table",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "HV-51",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "NX-73",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "KR-50",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "IN NEGOTIATION",
    "region": "LATAM"
  },
  {
    "id": "KR-15",
    "level": "High Table",
    "reward": "Full Erasure",
    "status": "DECLINED",
    "region": "EMEA"
  },
  {
    "id": "GX-40",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "HV-89",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "AL-83",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "EMEA"
  },
  {
    "id": "MK-95",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "APAC"
  },
  {
    "id": "NX-36",
    "level": "High Table",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "KR-55",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "EMEA"
  },
  {
    "id": "KR-10",
    "level": "High Table",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "EMEA"
  },
  {
    "id": "KR-27",
    "level": "High Table",
    "reward": "Full Erasure",
    "status": "LOCKED",
    "region": "GLOBAL"
  },
  {
    "id": "NX-32",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "AL-45",
    "level": "Continental Only",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "MK-68",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "HV-81",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "KR-79",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "HV-92",
    "level": "Ghost",
    "reward": "Obsidian Token",
    "status": "IN NEGOTIATION",
    "region": "LATAM"
  },
  {
    "id": "KR-23",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "APAC"
  },
  {
    "id": "GX-13",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "NX-89",
    "level": "High Table",
    "reward": "Full Erasure",
    "status": "IN NEGOTIATION",
    "region": "AMER"
  },
  {
    "id": "MK-62",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "MK-41",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "HV-40",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "HV-31",
    "level": "Burn Notice",
    "reward": "Full Erasure",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "GX-81",
    "level": "Continental Only",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "MK-69",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "EMEA"
  },
  {
    "id": "AL-86",
    "level": "High Table",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "GLOBAL"
  },
  {
    "id": "AL-45",
    "level": "Ghost",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "AL-75",
    "level": "Ghost",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "GLOBAL"
  },
  {
    "id": "KR-87",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "AL-82",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "AL-52",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "LOCKED",
    "region": "GLOBAL"
  },
  {
    "id": "AL-38",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "APAC"
  },
  {
    "id": "GX-86",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "HV-29",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "LOCKED",
    "region": "GLOBAL"
  },
  {
    "id": "MK-86",
    "level": "Continental Only",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "AMER"
  },
  {
    "id": "HV-40",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "AMER"
  },
  {
    "id": "HV-19",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "IN NEGOTIATION",
    "region": "APAC"
  },
  {
    "id": "AL-13",
    "level": "High Table",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "APAC"
  },
  {
    "id": "MK-54",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "NX-42",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "HV-42",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "AVAILABLE",
    "region": "AMER"
  },
  {
    "id": "KR-29",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "LOCKED",
    "region": "LATAM"
  },
  {
    "id": "GX-77",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "GX-84",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "AL-59",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "NX-72",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "MK-34",
    "level": "High Table",
    "reward": "Debt Cleared",
    "status": "IN NEGOTIATION",
    "region": "AMER"
  },
  {
    "id": "HV-11",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "NX-78",
    "level": "High Table",
    "reward": "Debt Cleared",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "AL-62",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "IN NEGOTIATION",
    "region": "AMER"
  },
  {
    "id": "MK-14",
    "level": "High Table",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "APAC"
  },
  {
    "id": "HV-21",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "MK-43",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "DECLINED",
    "region": "APAC"
  },
  {
    "id": "NX-79",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "LOCKED",
    "region": "GLOBAL"
  },
  {
    "id": "MK-41",
    "level": "Ghost",
    "reward": "Debt Cleared",
    "status": "IN NEGOTIATION",
    "region": "AMER"
  },
  {
    "id": "NX-87",
    "level": "High Table",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "APAC"
  },
  {
    "id": "AL-60",
    "level": "Ghost",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "AMER"
  },
  {
    "id": "MK-15",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "NX-90",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "EMEA"
  },
  {
    "id": "NX-39",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "HV-56",
    "level": "Ghost",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "AMER"
  },
  {
    "id": "MK-67",
    "level": "High Table",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "HV-25",
    "level": "Ghost",
    "reward": "Obsidian Token",
    "status": "AVAILABLE",
    "region": "LATAM"
  },
  {
    "id": "HV-10",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "KR-53",
    "level": "Continental Only",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "AL-87",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "LOCKED",
    "region": "APAC"
  },
  {
    "id": "GX-71",
    "level": "Ghost",
    "reward": "Obsidian Token",
    "status": "DECLINED",
    "region": "APAC"
  },
  {
    "id": "AL-81",
    "level": "Burn Notice",
    "reward": "Full Erasure",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "AL-71",
    "level": "Burn Notice",
    "reward": "Debt Cleared",
    "status": "IN NEGOTIATION",
    "region": "LATAM"
  },
  {
    "id": "KR-24",
    "level": "Burn Notice",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "APAC"
  },
  {
    "id": "KR-49",
    "level": "Continental Only",
    "reward": "Full Erasure",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "GX-65",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "IN NEGOTIATION",
    "region": "EMEA"
  },
  {
    "id": "AL-44",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "DECLINED",
    "region": "LATAM"
  },
  {
    "id": "MK-33",
    "level": "Continental Only",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "AMER"
  },
  {
    "id": "AL-72",
    "level": "High Table",
    "reward": "Full Erasure",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "HV-49",
    "level": "Ghost",
    "reward": "Full Erasure",
    "status": "LOCKED",
    "region": "GLOBAL"
  },
  {
    "id": "GX-19",
    "level": "Burn Notice",
    "reward": "Full Erasure",
    "status": "DECLINED",
    "region": "APAC"
  },
  {
    "id": "MK-46",
    "level": "Burn Notice",
    "reward": "Obsidian Token",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "GX-68",
    "level": "Continental Only",
    "reward": "Debt Cleared",
    "status": "LOCKED",
    "region": "AMER"
  },
  {
    "id": "MK-40",
    "level": "High Table",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "AMER"
  },
  {
    "id": "KR-63",
    "level": "High Table",
    "reward": "Unknown",
    "status": "IN NEGOTIATION",
    "region": "GLOBAL"
  },
  {
    "id": "AL-82",
    "level": "Burn Notice",
    "reward": "Full Erasure",
    "status": "LOCKED",
    "region": "EMEA"
  },
  {
    "id": "KR-31",
    "level": "High Table",
    "reward": "Golden Marker",
    "status": "AVAILABLE",
    "region": "AMER"
  },
  {
    "id": "KR-62",
    "level": "Ghost",
    "reward": "Unknown",
    "status": "DECLINED",
    "region": "GLOBAL"
  },
  {
    "id": "MK-38",
    "level": "Burn Notice",
    "reward": "Golden Marker",
    "status": "IN NEGOTIATION",
    "region": "AMER"
  }
];
  const username = localStorage.getItem("tsd_user") || "Agent";
  const navigate = useNavigate();
  useEffect(() => {
    function handleKey(e) {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "h") {
        e.preventDefault();
        navigate("/high-table");
      }
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "x") {
        e.preventDefault();
        setExcommunicado((prev) => !prev);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [navigate]);

  useEffect(() => {
    const pulseTimer = setInterval(() => {
      setPulse((prev) => ({
        network: Math.random() < 0.05 ? "DEGRADED" : "ONLINE",
        activeNodes: 5 + Math.floor(Math.random() * 6),
        lastPingMs: 200 + Math.floor(Math.random() * 400),
        encryption: Math.random() < 0.3 ? "AES-4096" : "QUANTUM-LATTICE"
      }));

      setTerminalLines((prev) => {
        const next = [
          `[${new Date().toLocaleTimeString()}] Node ping OK`,
          "Safe route confirmed.",
          "Low-noise traffic detected.",
          "Tracer sweep completed.",
        ];
        const picked = next[Math.floor(Math.random() * next.length)];
        const updated = [...prev, picked];
        return updated.slice(-6);
      });
    }, 4000);

    return () => clearInterval(pulseTimer);
  }, []);


  useEffect(() => {
    const m = L.map("map", {
      center: [20, 0],
      zoom: 2,
      worldCopyJump: true,
      zoomControl: false,
      attributionControl: false,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      subdomains: "abcd",
      maxZoom: 19,
    }).addTo(m);

    setMap(m);
    return () => m.remove();
  }, []);

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  async function handleSearch() {
    if (!query) return;

    // simulate random connection loss (5% chance)
    if (Math.random() < 0.05) {
      await typeStatus("⚠ Connection lost. Re-routing through safe node...");
      await sleep(2000 + Math.random() * 1000);
      await typeStatus("Secure channel restored. Continuing search...");
      await sleep(800);
    }

    await typeStatus(`Scanning directory for "${query}"...`);

    const result = await generateAgents(query, 12);
    setAgents([]);

    // clear old map layers
    markers.forEach((m) => m.remove());
    if (heatLayer) heatLayer.remove();

    let newMarkers = [];
    let coords = [];

    for (let i = 0; i < result.length; i++) {
      await sleep(200 + Math.random() * 200);
      setAgents((prev) => [...prev, result[i]]);
      await typeStatus(`Decrypted profile ${i + 1} / ${result.length}...`);

      if (map && result[i].lat && result[i].lng) {
        const marker = L.circleMarker([result[i].lat, result[i].lng], {
          radius: 6,
          color: "#00ffe0",
          fillColor: "#00f0ef",
          fillOpacity: 0.9,
        }).addTo(map);

        marker.on("click", () => {
          const city = result[i].city || "unknown city";
          setStatus(`Regional dossier opened for ${city}.`);
        });

        newMarkers.push(marker);
        coords.push([result[i].lat, result[i].lng, 0.8]);
      }
    }

    setMarkers(newMarkers);

    if (coords.length && map) {
      map.fitBounds(coords.map((c) => [c[0], c[1]]), { padding: [50, 50] });

      // tracer lines to London hub
      const hub = { lat: 51.5072, lng: -0.1276 };
      coords.forEach(([lat, lng]) => {
        const line = L.polyline([[hub.lat, hub.lng], [lat, lng]], {
          color: "#00ffe0",
          weight: 2,
          opacity: 0.6,
          dashArray: "6 8",
        }).addTo(map);
        newMarkers.push(line);
      });
    }

    if (heatMode && coords.length && map) {
      if (L.heatLayer) {
        const heat = L.heatLayer(coords, {
          radius: 25,
          blur: 15,
          gradient: { 0.4: "#0ff", 0.65: "#f0f", 1: "#fff" },
        }).addTo(map);
        setHeatLayer(heat);
      }
    }

    await typeStatus("Search complete.");
  }

  async function typeStatus(text) {
    setStatus("");
    for (let i = 0; i < text.length; i++) {
      setStatus((prev) => prev + text[i]);
      await sleep(15 + Math.random() * 20);
    }
  }

  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative", background: excommunicado ? "#200" : "#000" }}>
      {/* Map fills background */}
      <div id="map" style={{ height: "100%", width: "100%", zIndex: 0 }}></div>

      {/* Overlay UI */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          width: "320px",
          background:
            subTheme === "Ember"
              ? "rgba(30,0,0,0.9)"
              : subTheme === "Glitch"
              ? "rgba(5,0,30,0.9)"
              : subTheme === "Cipher"
              ? "rgba(0,20,25,0.9)"
              : subTheme === "Stealth"
              ? "rgba(0,10,10,0.9)"
              : "rgba(0,0,0,0.8)",
          border: "1px solid #0ff",
          borderRadius: "8px",
          padding: "15px",
          zIndex: 1000,
        }}
      >
        <h2 style={{ color: "#0ff", fontWeight: "bold", marginBottom: "6px" }}>
          Welcome {username} — THE SILENT DIRECTORY
        </h2>
        <CoinHud coins={coins} credibility={credibility} rank={rank} />

        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "10px" }}>
          <button
            className="btn ghost"
            style={{ flex: "1 1 45%", fontSize: "11px" }}
            onClick={() => navigate("/black-archive")}
          >
            Black Archive
          </button>
          <button
            className="btn ghost"
            style={{ flex: "1 1 45%", fontSize: "11px" }}
            onClick={() => navigate("/generator")}
          >
            Dossier Gen
          </button>
          <button
            className="btn ghost"
            style={{ flex: "1 1 45%", fontSize: "11px" }}
            onClick={() => navigate("/check-in")}
          >
            Continental
          </button>
          <button
            className="btn ghost"
            style={{ flex: "1 1 45%", fontSize: "11px" }}
            onClick={() => navigate("/surveillance")}
          >
            Surveillance
          </button>
        
        <div style={{ display: "flex", gap: "6px", marginBottom: "10px", fontSize: "10px" }}>
          <span style={{ opacity: 0.7 }}>Subtheme:</span>
          {["Noir", "Glitch", "Ember", "Cipher", "Stealth"].map((mode) => (
            <button
              key={mode}
              className="btn ghost"
              style={{
                padding: "2px 6px",
                fontSize: "10px",
                borderColor: subTheme === mode ? "#0ff" : "#044",
              }}
              onClick={() => setSubTheme(mode)}
            >
              {mode}
            </button>
          ))}
        </div>
</div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "4px", marginBottom: "6px" }}>
          <button
            className="btn ghost"
            style={{ fontSize: "11px", padding: "4px 8px" }}
            onClick={() => navigate("/high-table")}
          >
            HIGH TABLE CONSOLE
          </button>
          <div style={{ fontSize: "11px" }}>
            <span style={{ marginRight: "4px" }}>Agency:</span>
            <select
              value={filterAgency}
              onChange={(e) => setFilterAgency(e.target.value)}
              style={{ background: "#000", color: "#0ff", border: "1px solid #0ff", fontSize: "11px" }}
            >
              <option value="ALL">ALL</option>
              <option value="HANDLER">Handlers</option>
              <option value="TECH">Techs</option>
              <option value="MYTHIC">Mythics</option>
            </select>
            <span style={{ marginLeft: "8px", marginRight: "4px" }}>Nation:</span>
            <select
              value={filterNationality}
              onChange={(e) => setFilterNationality(e.target.value)}
              style={{ background: "#000", color: "#0ff", border: "1px solid #0ff", fontSize: "11px" }}
            >
              <option value="ALL">ALL</option>
              <option value="UK">UK</option>
              <option value="US">US</option>
              <option value="JP">JP</option>
              <option value="DE">DE</option>
            </select>
          </div>
        </div>

        <div style={{ fontSize: "12px", color: "#0ff", marginBottom: "10px" }}>
          <div>Network: <strong>{pulse.network}</strong> · Nodes: <strong>{pulse.activeNodes}</strong></div>
          <div>Last ping: {pulse.lastPingMs} ms · Cipher: {pulse.encryption}</div>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter city or keyword..."
          style={{
            width: "100%",
            marginTop: "10px",
            marginBottom: "10px",
            padding: "8px",
            background: "#111",
            border: "1px solid #0ff",
            color: "#0ff",
          }}
        />
        <button className="btn" onClick={handleSearch} style={{ width: "100%", marginBottom: "8px" }}>
          Search
        </button>
        <button
          className="btn ghost"
          onClick={() => setHeatMode(!heatMode)}
          style={{ width: "100%" }}
        >
          Toggle Heat Map
        </button>
        <div className="small" style={{ marginTop: "12px", color: "#0ff" }}>
          Status: {status}
        </div>
      </div>

      {/* Agent results overlay */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          maxHeight: "40%",
          overflowY: "auto",
          background: "rgba(0,0,0,0.85)",
          borderTop: "2px solid #0ff",
          padding: "10px",
          zIndex: 999,
        }}
      >
        {/* Dead Drop Locker + Terminal */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1.2fr", gap: "10px", marginBottom: "12px", fontSize: "12px" }}>
          {/* Dead Drop */}
          <div style={{ border: "1px solid #0ff", padding: "8px", borderRadius: "6px" }}>
            <div style={{ fontWeight: "bold", color: "#0ff", marginBottom: "4px" }}>Dead Drop Locker</div>
            <textarea
              value={deadDropInput}
              onChange={(e) => setDeadDropInput(e.target.value)}
              rows={3}
              placeholder="Leave encrypted notes. Nothing here exists on paper."
              style={{
                width: "100%",
                background: "#050505",
                border: "1px solid #0ff",
                color: "#0ff",
                padding: "4px",
                fontSize: "11px",
                marginBottom: "6px",
              }}
            />
            <button
              className="btn"
              onClick={() => {
                if (!deadDropInput.trim()) return;
                setDeadDropLog((prev) => [
                  { ts: new Date().toLocaleTimeString(), text: deadDropInput.trim() },
                  ...prev,
                ].slice(0, 5));
                setDeadDropInput("");
              }}
              style={{ width: "100%", fontSize: "11px" }}
            >
              Drop & Seal
            </button>
            <div style={{ marginTop: "6px", maxHeight: "80px", overflowY: "auto" }}>
              {deadDropLog.map((entry, idx) => (
                <div key={idx} style={{ color: "#0ff", marginBottom: "2px" }}>
                  [{entry.ts}] {entry.text}
                </div>
              ))}
              {!deadDropLog.length && (
                <div style={{ color: "#666" }}>No drops recorded.</div>
              )}
            </div>
          </div>

          {/* Terminal */}
          <div style={{ border: "1px solid #0ff", padding: "8px", borderRadius: "6px", background: "#020202" }}>
            <div style={{ fontWeight: "bold", color: "#0ff", marginBottom: "4px" }}>Live Terminal</div>
            <div style={{ fontFamily: "monospace", fontSize: "11px", maxHeight: "110px", overflowY: "auto" }}>
              {terminalLines.map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div>
          </div>

                    {/* Mission Generator */}
          <div style={{ border: "1px solid #0ff", padding: "8px", borderRadius: "6px", background: "#020202", marginBottom: "8px" }}>
            <div style={{ fontWeight: "bold", color: "#0ff", marginBottom: "4px" }}>Contract Fabricator</div>
            <p style={{ fontSize: "11px", marginBottom: "4px" }}>
              Spin up a synthetic contract. No one gets hurt. Your ledger still likes the initiative.
            </p>
            <button
              className="btn"
              style={{ width: "100%", fontSize: "11px", marginBottom: "6px" }}
              onClick={() => {
                const card = generateMissionCard();
                setMissionCard(card);
                award({ coins: 1, cred: 2 });
              }}
            >
              Generate Mission
            </button>
            {missionCard && (
              <div style={{ fontSize: "11px", borderTop: "1px solid #0ff", paddingTop: "4px", marginTop: "4px" }}>
                <div><strong>ID:</strong> {missionCard.id}</div>
                <div><strong>Type:</strong> {missionCard.type}</div>
                <div><strong>Priority:</strong> {missionCard.priority}</div>
                <div><strong>City:</strong> {missionCard.city}</div>
                <div><strong>Complication:</strong> {missionCard.complication}</div>
                <div><strong>Reward:</strong> {missionCard.reward}</div>
              </div>
            )}
          </div>

{/* Time-Locked & Cipher */}
          <div style={{ border: "1px solid #0ff", padding: "8px", borderRadius: "6px" }}>
            <div style={{ fontWeight: "bold", color: "#0ff", marginBottom: "4px" }}>Midnight Protocol</div>
            {(() => {
              const now = new Date();
              const isMidnight = now.getHours() === 0;
              if (!isMidnight) {
                return (
                  <div style={{ fontSize: "11px", color: "#888" }}>
                    Locked. Window opens between 00:00–00:10 local time.
                  </div>
                );
              }
            
  function generateMissionCard() {
    const types = ["Extraction", "Pursuit", "Recon", "Retrieval", "Erasure"];
    const priorities = ["Low", "Moderate", "High", "Critical"];
    const comps = [
      "zero civilian noise",
      "no digital trace",
      "no Continental collateral",
      "maintain camera blindness",
      "asset must leave breathing",
    ];
    const rewards = [
      "One Golden Marker",
      "Obsidian token",
      "Full file erasure",
      "Debt cleared with local branch",
      "Unknown — High Table discretion",
    ];
    const cities = ["London", "Berlin", "Osaka", "Casablanca", "New York", "Rome", "Lisbon", "Marrakesh"];

    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    return {
      id: "MK-" + String(Math.floor(10 + Math.random() * 89)),
      type: pick(types),
      priority: pick(priorities),
      city: pick(cities),
      complication: pick(comps),
      reward: pick(rewards),
    };
  }

  return (
                <div style={{ fontSize: "11px", color: "#0ff" }}>
                  Protocol online. No records. No witnesses.
                </div>
              );
            })()}
            <div style={{ marginTop: "8px", fontSize: "11px" }}>
              <div style={{ fontWeight: "bold", marginBottom: "4px" }}>Cipher Pad</div>
              <div>Use any simple shift cipher. Nothing here is stored beyond this session.</div>
            </div>
          </div>
        </div>

        
        {/* Directory Intel — Accordions */}
        <div style={{ marginBottom: "12px", fontSize: "12px" }}>
          <details open style={{ marginBottom: "6px" }}>
            <summary style={{ cursor: "pointer", color: "#0ff", fontWeight: "bold" }}>
              Classified Profiles · {classifiedProfiles.length} records · Page {classifiedPage + 1}
            </summary>
            <div style={{ marginTop: "6px", maxHeight: "140px", overflowY: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left" }}>Codename</th>
                    <th style={{ textAlign: "left" }}>Role</th>
                    <th style={{ textAlign: "left" }}>Class</th>
                    <th style={{ textAlign: "left" }}>Location</th>
                    <th style={{ textAlign: "left" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {classifiedProfiles
                    .slice(classifiedPage * pageSize, (classifiedPage + 1) * pageSize)
                    .map((p, idx) => (
                      <tr key={idx}>
                        <td>{p.codename}</td>
                        <td>{p.role}</td>
                        <td>{p.class}</td>
                        <td>{p.location}</td>
                        <td>{p.status}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div style={{ marginTop: "4px", display: "flex", justifyContent: "space-between" }}>
                <button
                  className="btn ghost"
                  disabled={classifiedPage === 0}
                  onClick={() => setClassifiedPage((p) => Math.max(0, p - 1))}
                >
                  Prev
                </button>
                <button
                  className="btn ghost"
                  disabled={(classifiedPage + 1) * pageSize >= classifiedProfiles.length}
                  onClick={() =>
                    setClassifiedPage((p) =>
                      (p + 1) * pageSize >= classifiedProfiles.length ? p : p + 1
                    )
                  }
                >
                  Next
                </button>
              </div>
            </div>
          </details>

          <details style={{ marginBottom: "6px" }}>
            <summary style={{ cursor: "pointer", color: "#0ff", fontWeight: "bold" }}>
              Weapons Inventory · {weapons.length} records · Page {weaponsPage + 1}
            </summary>
            <div style={{ marginTop: "6px", maxHeight: "140px", overflowY: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left" }}>Name</th>
                    <th style={{ textAlign: "left" }}>Category</th>
                    <th style={{ textAlign: "left" }}>Status</th>
                    <th style={{ textAlign: "left" }}>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {weapons
                    .slice(weaponsPage * pageSize, (weaponsPage + 1) * pageSize)
                    .map((w, idx) => (
                      <tr key={idx}>
                        <td>{w.name}</td>
                        <td>{w.category}</td>
                        <td>{w.status}</td>
                        <td>{w.note}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div style={{ marginTop: "4px", display: "flex", justifyContent: "space-between" }}>
                <button
                  className="btn ghost"
                  disabled={weaponsPage === 0}
                  onClick={() => setWeaponsPage((p) => Math.max(0, p - 1))}
                >
                  Prev
                </button>
                <button
                  className="btn ghost"
                  disabled={(weaponsPage + 1) * pageSize >= weapons.length}
                  onClick={() =>
                    setWeaponsPage((p) =>
                      (p + 1) * pageSize >= weapons.length ? p : p + 1
                    )
                  }
                >
                  Next
                </button>
              </div>
            </div>
          </details>

          <details style={{ marginBottom: "6px" }}>
            <summary style={{ cursor: "pointer", color: "#0ff", fontWeight: "bold" }}>
              Blacklist · {blacklist.length} records · Page {blacklistPage + 1}
            </summary>
            <div style={{ marginTop: "6px", maxHeight: "140px", overflowY: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left" }}>Codename</th>
                    <th style={{ textAlign: "left" }}>Threat</th>
                    <th style={{ textAlign: "left" }}>Last Seen</th>
                    <th style={{ textAlign: "left" }}>Status</th>
                    <th style={{ textAlign: "left" }}>Tag</th>
                  </tr>
                </thead>
                <tbody>
                  {blacklist
                    .slice(blacklistPage * pageSize, (blacklistPage + 1) * pageSize)
                    .map((b, idx) => (
                      <tr key={idx}>
                        <td>{b.codename}</td>
                        <td>{b.threat}</td>
                        <td>{b.lastSeen}</td>
                        <td>{b.status}</td>
                        <td>{b.tag}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div style={{ marginTop: "4px", display: "flex", justifyContent: "space-between" }}>
                <button
                  className="btn ghost"
                  disabled={blacklistPage === 0}
                  onClick={() => setBlacklistPage((p) => Math.max(0, p - 1))}
                >
                  Prev
                </button>
                <button
                  className="btn ghost"
                  disabled={(blacklistPage + 1) * pageSize >= blacklist.length}
                  onClick={() =>
                    setBlacklistPage((p) =>
                      (p + 1) * pageSize >= blacklist.length ? p : p + 1
                    )
                  }
                >
                  Next
                </button>
              </div>
            </div>
          </details>

          <details>
            <summary style={{ cursor: "pointer", color: "#0ff", fontWeight: "bold" }}>
              Mission Board · {missions.length} records · Page {missionsPage + 1}
            </summary>
            <div style={{ marginTop: "6px", maxHeight: "140px", overflowY: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left" }}>Mission</th>
                    <th style={{ textAlign: "left" }}>Level</th>
                    <th style={{ textAlign: "left" }}>Reward</th>
                    <th style={{ textAlign: "left" }}>Status</th>
                    <th style={{ textAlign: "left" }}>Region</th>
                  </tr>
                </thead>
                <tbody>
                  {missions
                    .slice(missionsPage * pageSize, (missionsPage + 1) * pageSize)
                    .map((m, idx) => (
                      <tr key={idx}>
                        <td>{m.id}</td>
                        <td>{m.level}</td>
                        <td>{m.reward}</td>
                        <td>{m.status}</td>
                        <td>{m.region}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div style={{ marginTop: "4px", display: "flex", justifyContent: "space-between" }}>
                <button
                  className="btn ghost"
                  disabled={missionsPage === 0}
                  onClick={() => setMissionsPage((p) => Math.max(0, p - 1))}
                >
                  Prev
                </button>
                <button
                  className="btn ghost"
                  disabled={(missionsPage + 1) * pageSize >= missions.length}
                  onClick={() =>
                    setMissionsPage((p) =>
                      (p + 1) * pageSize >= missions.length ? p : p + 1
                    )
                  }
                >
                  Next
                </button>
              </div>
            </div>
          </details>
        </div>

        <table style={{ width: "100%", color: "#fff", borderCollapse: "collapse" }}>
          <thead style={{ color: "#0ff" }}>
            <tr>
              <th>Codename</th>
              <th>Full Name</th>
              <th>Profession</th>
              <th>Nationality</th>
              <th>City</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Agency</th>
            </tr>
          </thead>
          <tbody>
            {agents.filter((a) => {
              if (filterNationality !== "ALL") {
                if (!a.nationality || !a.nationality.includes(filterNationality)) return false;
              }
              return true;
            }).map((a, i) => (
              <tr key={i}>
                <td
                  style={{ cursor: "pointer", color: "#0ff", textDecoration: "underline" }}
                  onClick={() => navigate("/profile", { state: a })}
                >
                  {a.codename}
                </td>
                <td>{a.fullName}</td>
                <td>{a.profession}</td>
                <td>{a.nationality}</td>
                <td>{a.city}</td>
                <td>{a.email}</td>
                <td>{a.phone}</td>
                <td>{a.agency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
