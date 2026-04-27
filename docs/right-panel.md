# Right Panel — Persistent Telemetry

The right-hand panel is always visible and provides fast, glanceable situational awareness. It aggregates key live feeds that are relevant across modules.

Components
- Grasberg geohazard radar map
  - Live raster overlay with slope/radar reflectivity
  - Moveable viewport and zoom controls
- Live AI telemetry feed
  - Streaming text and short structured events (updates every 3 seconds)
  - Includes model confidence, severity, recommended actions
- Real-time rainfall gauge
  - Current instantaneous rainfall and short-term trend
- Model performance badges
  - ConvLSTM: short-term rainfall forecast MAPE, last retrain date
  - XGBoost: block-grade RMSE, feature importance snapshot
  - GPT-4o: latency and recent summary quality flags

Update frequencies
- AI telemetry feed: every 3s (push stream)
- IoT sensor readings: 1–10s depending on sensor type and priority
- Radar/gauge: 30s–5min depending on external provider
- Model retrain/metrics: daily (or on-demand)

Data flow and latency considerations
- Priority routing for safety- and geohazard-related alerts to ensure sub-5s delivery from edge to operator console.
- Local edge inference for CV modules to avoid bandwidth bottlenecks; aggregated summaries forwarded to central stream.

Integration notes
- Right panel widgets are reachable from all modules and support quick actions (acknowledge, escalate, mute) and deep-linking to the relevant module.

Developer notes
- Provide a stable websocket endpoint for the AI telemetry feed.
- Keep model metric payloads small (summary + link to detailed logs) to avoid UI lag.
