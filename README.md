# 🕵️‍♂️ The Silent Directory

A cinematic, John Wick–inspired underworld intelligence dashboard.
A fully interactive, dark-themed, immersive system built purely for creativity, world-building, and fun.

Not a real OSINT tool. Not connected to any network. No data leaves the client.
Just style, story, and tech.

---

## 📌 Overview

**The Silent Directory** simulates a global contract‑operative network. It includes:

* A real-time world map with agent activity
* Massive datasets of operatives, weapons, missions, and blacklisted entities
* Dead‑drop system for encrypted-style messaging
* Live terminal feed that simulates tracer logs
* Network pulse monitor mimicking an active underworld communication hub
* Safehouses, classified dossiers, weapon caches, mission archives, and more
* All data generated locally — no backend, no logging

This project is meant to feel like accessing a forbidden database inside the John Wick universe.

---

## 🎥 Aesthetic Philosophy

The Silent Directory is built with three core principles:

1. **Minimal, lethal, elegant** — Inspired by the Continental’s subtle aesthetic
2. **Cinematic UI** — Everything feels like part of a hidden assassin network
3. **Privacy-by-design** — Nothing persists, nothing leaves the browser, everything is simulated

---

## ✨ Features

### 🌍 Global Map Interface

* Interactive Leaflet map
* Agent markers dynamically generated around the world
* Heatmap mode for global activity spikes
* Automatic tracer lines between nodes
* Multi-layered operation visualization

### 🧠 Classified Profiles (200+)

Each profile contains:

* Codename
* Role (Tracker, Cleaner, Courier, Handler, etc.)
* Status (Active, On Call, Unknown)
* Last known location

### 🔫 Weapons Inventory (100+)

Each entry includes:

* Weapon name (fictional prototypes, suppressed arms, exotic builds)
* Operational status (Locked, Clean, Unavailable)
* Notes (High Table restricted, unregistered steel, vault‑recovered)

### ⚠️ Blacklist (250+ Entities)

Complete with:

* Codename
* Threat level (Medium → Critical)
* Last seen location
* Activity status (At Large, Monitored, No Contracts)

### 🎯 Mission Board (150 Tasks)

Each mission contains:

* Mission ID
* Access level (Ghost, Continental Only, Burn Notice)
* Reward (Golden Marker, Obsidian Token, Full Erasure)
* Status (Available, Locked, Declined)

### 💼 Safehouses

Classified safehouse data:

* City
* Status (Active, Cold, Unknown)
* Risk notes

### 📦 Dead Drop Locker

* Local-only encrypted-style note system
* No external storage
* Notes auto-expire (session-based)

### 💻 Live Terminal Feed

Real-time simulated system messages:

* Node pings
* Safe-route confirmations
* Traffic noise reports
* Tracer sweeps

### 🌐 Network Pulse Monitor

Displays:

* Encryption mode
* Active nodes
* Latency fluctuations
* Line stability

---

## 🛠️ Tech Stack

* **React** — Component-driven UI
* **Vite** — Ultra-fast dev environment
* **TailwindCSS** — Efficient styling system
* **Leaflet + Heatmap Layer** — Global map & visualization
* **Faker.js** — Dynamic data generation

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/adiz-777/The-Silent-Directory
cd The-Silent-Directory
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Application will start on:

```
http://localhost:5173
```

---

## 📁 Project Structure

```
/src
  /pages
    Login.jsx
    Dashboard.jsx
    Profile.jsx
  /utils
    generator.js
/public
  cities.json
package.json
vite.config.js
```

---

## 🔒 Security & Disclaimer

The Silent Directory:

* Does NOT collect data
* Does NOT send network requests
* Does NOT track usage
* Generates all info offline

This is a fictional tool intended purely for creative and aesthetic purposes.

---

## 🤝 Contributions

Suggestions, ideas, new lore, or UI enhancements are welcome.
Feel free to open issues or submit pull requests.

---

## ⭐ Support

If you like projects blending design, code, and cinematic world‑building:

* Star the repo
* Share it
* Fork it and build your own universe

---

## 🕶️ Final Words

*You don’t find The Silent Directory.
It finds you.*
