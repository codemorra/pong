import "./style.css";
import { Game } from "./game/Game";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <main class="grid min-h-screen place-items-center bg-slate-950 p-6">
    <canvas
      id="game-canvas"
      width="800"
      height="500"
      class="max-w-full border border-slate-700 bg-slate-950 shadow-2xl"
      aria-label="Pong game field"
    >
      Your browser does not support the canvas element.
    </canvas>
  </main>
`;

const canvas = document.querySelector<HTMLCanvasElement>("#game-canvas");

if (!canvas) {
  throw new Error("Game canvas could not be found.");
}

new Game(canvas).start();
