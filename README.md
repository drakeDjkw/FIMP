# FIMP — Freeport Intelligence Mining Platform

A real-time AI operations dashboard for **PT Freeport Indonesia (PTFI) Grasberg** — the world's largest gold mine and second-largest copper mine. Combines live telemetry, IoT sensor streams, digital twin models, and AI to provide situational awareness and decision support across processing, maintenance, fleet, and safety operations.

---

## Live Preview

> Run the dev server locally to see the full interactive dashboard.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Opens automatically at **http://localhost:5173**

To also stream mock WebSocket telemetry in a second terminal:

```bash
npm run mock-ws
# WebSocket server starts at ws://localhost:8081
# In the app: switch the top-right toggle to "WebSocket"
```

---

## Platform Modules

All modules are scoped to **Grasberg (PTFI), Indonesia**. Click any item in the left sidebar to navigate.

| Module | What it shows |
|---|---|
| **Overview** | KPI cards (copper production gain, +200M lbs output, +22% efficiency, −30% downtime), active site status, strategic partners |
| **Real-time Processing** | 6 live plant metrics updating every 2s — throughput, recovery rate, energy, reagent dosage, pH, airflow — each shown vs. AI-adjusted baseline |
| **Ore Sorting** | Live metal recovery rate and throughput, XRT/NIR sensor array status, energy and chemical savings |
| **Digital Twin** | Virtual mine model with 15,300 sensors and 3.4M geo-points — live sync timestamps and running AI models |
| **Predictive Maintenance** | 8 assets (haul trucks, shovels, crushers, mill) with animated health bars and AI failure predictions |
| **Fleet Intelligence** | 8-truck fleet with real-time speed/cycle updates, route deviation alerts, WWT integration |
| **Safety & 5G** | PTFI underground zones with 5G coverage, worker tracking, live safety index, remote-operated equipment |

Right panel (persistent across all modules): live AI telemetry feed updating every 3s with real operational events.

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI framework | React 18 + TypeScript |
| Build tool | Vite 5 |
| Schema validation | Ajv 8 (JSON Schema) |
| WebSocket | Native browser WS + Node.js `ws` mock server |
| Testing | Vitest + Testing Library |
| Component explorer | Storybook 7 |
| Cloud platform | Accenture (data analytics) |
| Hybrid infra | Nutanix (remote-site connectivity) |
| AI models | McKinsey custom models + FCX-AI |
| Fleet data | WWT integration |

---

## Scripts

```bash
npm run dev           # Start dev server at http://localhost:5173
npm run build         # Production build
npm run preview       # Preview production build
npm run mock-ws       # Mock WebSocket server at ws://localhost:8081
npm run test          # Run unit tests
npm run test:coverage # Test coverage report
npm run storybook     # Component explorer at http://localhost:6006
```

---

## Contact

- Maintainer: Freeport Intelligence Mining Platform team
- Repository: drakeDjkw/FIMP
