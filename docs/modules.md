# FIMP Modules

This document describes the six interactive modules available from the left sidebar and the key metrics, data sources, and models they expose.

1. Overview
- Purpose: High-level situational awareness and quick actions.
- Key elements:
  - KPI row: ore processed (t), fleet availability (%), geohazard alerts (count), AI predictions (summary)
  - Live alert strip with severity colors and click-to-expand events
  - Rainfall forecast chart (ConvLSTM): 1–72 hour horizon, ensemble mean + uncertainty band
  - Ore grade chart (XGBoost): predicted grade distribution across active blocks
  - Equipment health list: top-10 assets by failure risk
  - Event log: sequence of operator notes, automated system messages, and AI summaries
- Data sources: central telemetry bus, weather radar, sensor gateways, maintenance logs.

2. Geohazard
- Purpose: Continuous landslide and slope-failure monitoring.
- Highlights:
  - Zone risk matrix (bar view) with normalized risk per zone
  - Zone B7 indicator: current Landslide risk score 87%
  - Bayesian P(Landslide | Rainfall) model showing posterior curves as rain accumulates
  - Live IoT readings: soil moisture, displacement (in mm), pore pressure (kPa)
  - Feature importance: which sensors and external covariates most influence risk
- Models: Bayesian networks for conditional risk, ConvLSTM streams for rainfall-driven features.

3. Predictive Maintenance
- Purpose: Reduce unplanned downtime with early failure detection.
- Elements:
  - Full asset health table (filterable/sortable) — example alert: HT-042 hydraulic failure in ~18h
  - Vibration, temperature, oil analysis trends and anomaly flags
  - Maintenance schedule optimizations and mean-time-between-failure forecasts
- Data sources: on-asset sensors, maintenance management system, SCADA.

4. Fleet Intelligence
- Purpose: Optimize haulage operations and safety.
- Elements:
  - 48-truck grid map showing status (active/maintenance/standby)
  - Fuel efficiency KPIs (fleet + per-truck), +14% improvement over baseline
  - Safety streaks and collisions history (92-day collision-free)
  - Cycle time tracking and percent improvement (–18%)
- Models: route optimization heuristics, anomaly detection on GPS/telemetry.

5. Ore Optimization
- Purpose: Maximize recoveries and blending efficiency.
- Elements:
  - Grade prediction per block, recommended blends for mill feed
  - Cu/Au recovery curves and sensitivity analysis
  - Simulation controls for blend scenarios and expected recoveries
- Models: XGBoost for local block grade prediction, blending optimizer.

6. Safety AI
- Purpose: Prevent incidents with vision and gas monitoring.
- Elements:
  - Six CV modules (PPE compliance, fatigue, fire/smoke, gas detection, hazardous zone intrusion, vehicle proximity)
  - CH4 alert example: Sector D2
  - Incident-free streak counter (127 days)
- Data sources: edge cameras, gas sensors, access control logs.

Notes
- Each module exposes explainability panels (feature importance, temporal contributions).
- Modules allow action triggers (alerts -> notify crews, schedule maintenance, reroute trucks).
