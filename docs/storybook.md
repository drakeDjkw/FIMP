# Storybook

This project includes Storybook stories for UI components.

Run locally:

```bash
npm install
npm run storybook
```

Open http://localhost:6006 to view the component stories (TelemetryFeed included).

Notes:
- `Live` story wraps `TelemetryFeed` in `StreamsProvider` which uses a mock stream to push messages every 3s.
- `Standalone` story renders `TelemetryFeed` with its internal fallback interval.
