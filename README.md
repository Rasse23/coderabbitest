# Tyyni

A fictional Finnish lakeside sauna retreat, built with React and Vite. The responsive page includes a sauna chooser, session planner, price preview, and practical visitor information.

## Run locally

Use Node.js 22.12+ (Node.js 24 is verified) and npm.

```sh
npm ci
npm run dev -- --host 0.0.0.0 --port 5173
```

Open http://localhost:5173.

## Checks

```sh
npm run lint
npm run build
```

## Booking preview

Choose a sauna, day, guest count, and start time to preview a session. The smoke sauna allows four guests and the shore sauna allows six. Prices are per guest for a two-hour shared session.

This is a frontend concept. Availability is illustrative; there is no booking backend, payment processing, or persistent reservation storage.

## Design and assets

Lake blue and mist, Bricolage Grotesque headings, and Source Sans 3 body text. Fonts load from Google Fonts with a sans-serif fallback. The cabin photograph is bundled locally from [Unsplash](https://images.unsplash.com/photo-1510798831971-661eb04b3739); it is illustrative, rather than a photograph of a real Tyyni retreat. Original image source: https://images.unsplash.com/photo-1510798831971-661eb04b3739.
