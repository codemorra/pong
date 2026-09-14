# Pong

A small, classic Pong game built for the browser. Play against a simple computer opponent with `W`/`S` or the arrow keys.

## Live preview

Play the current version at [codemorra.github.io/pong](https://codemorra.github.io/pong/).

## Run locally

Requirements: Node.js 22 or later and npm.

```bash
npm ci
npm run dev
```

Open the local address printed by Vite, usually [http://localhost:5173](http://localhost:5173).

To create the static production build, run:

```bash
npm run build
```

The generated files are written to `dist/` and can be served by any static web server.

## Controls

| Key | Action |
| --- | --- |
| `W` or `ArrowUp` | Move the player paddle up |
| `S` or `ArrowDown` | Move the player paddle down |

## Planned improvements

- Visual improvements for the game field.
- Improved computer opponent behavior.
- Pause and restart controls.
- Additional game modes.
- An expanded scoring system.

## License

This project is licensed under the [MIT License](LICENSE).
