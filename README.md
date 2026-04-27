# FIMP — Freeport Intelligent Mining Platform

FIMP is a live operations dashboard for large-scale open-pit mining. It combines real-time telemetry, IoT sensor streams, and AI models to provide situational awareness and decision support across geohazard monitoring, predictive maintenance, fleet operations, ore optimization, and safety.

Core ideas
- Single-pane operations: sidebar modules + persistent right-panel telemetry
- Real-time streams (radar, rainfall, sensor telemetry) and periodic ML predictions
- Explainability for critical models (feature importance, risk decomposition)

Interactive modules (click any in the left sidebar)
- Overview — KPI row (ore processed, fleet availability, geohazard alerts, AI predictions), live alert strip, rainfall forecast chart (ConvLSTM), ore grade chart (XGBoost), equipment health list, event log
- Geohazard — Landslide risk score 87% for Zone B7, Bayesian P(Landslide|Rainfall) model, zone risk matrix bars, live IoT sensor readings (soil moisture, displacement, pore pressure), feature importance breakdown
- Predictive Maintenance — Full asset health table (HT-042 hydraulic failure in 18h, crusher vibration, belt tension), 214 assets monitored, 38% downtime reduction
- Fleet Intelligence — 48-truck grid map (active/maintenance/standby), fuel efficiency +14%, 92-day collision-free streak, cycle time –18%
- Ore Optimization — Block-level grade prediction, mill feed blend AI, Cu/Au recovery rates
- Safety AI — 6 computer-vision modules (PPE, fatigue, gas detection, hazard zones), CH4 alert Sector D2, 127 days without incident

Right panel (persistent)
- Grasberg geohazard radar map (live)
- Live AI telemetry feed (updates every 3s)
- Real-time rainfall gauge
- Model performance badges (ConvLSTM, XGBoost, GPT-4o)

Models and algorithms used
- ConvLSTM for short-term rainfall forecasting and temporal geohazard signals
- XGBoost for block-level ore grade prediction and feature importance
- Bayesian inference for conditional landslide probability P(Landslide|Rainfall)
- Computer vision modules (edge models) for safety detections
- GPT-4o for natural-language summarization of events and operator guidance

Quick notes
- This repo currently contains documentation; UI and data backends are out-of-scope until requested.
- If you want, I can scaffold a minimal React app with the sidebar + panels to demonstrate layout and interactivity.

Contact
- Maintainer: Freeport Intelligent Mining Platform team
- Repository: drakeDjkw/FIMP
