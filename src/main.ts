import "./style.css";
import { AI_CONFIGURATIONS } from "./game/Difficulty";
import type { Difficulty } from "./game/Difficulty";
import { Game } from "./game/Game";

const appElement = document.querySelector<HTMLDivElement>("#app");

if (!appElement) {
  throw new Error("Application root could not be found.");
}

const app: HTMLDivElement = appElement;

function showMenu() {
  app.innerHTML = `
    <main class="grid min-h-screen place-items-center bg-slate-950 p-6 text-slate-100">
      <section class="w-full max-w-md space-y-8 text-center">
        <h1 class="text-5xl font-bold tracking-wider">Pong</h1>

        <div class="grid gap-3">
          <button
            type="button"
            data-difficulty="easy"
            class="rounded border border-slate-600 px-6 py-3 text-lg font-semibold transition hover:border-slate-100 hover:bg-slate-800"
          >
            EASY
          </button>
          <button
            type="button"
            data-difficulty="medium"
            class="rounded border border-slate-600 px-6 py-3 text-lg font-semibold transition hover:border-slate-100 hover:bg-slate-800"
          >
            MEDIUM
          </button>
          <button
            type="button"
            data-difficulty="hard"
            class="rounded border border-slate-600 px-6 py-3 text-lg font-semibold transition hover:border-slate-100 hover:bg-slate-800"
          >
            HARD
          </button>
        </div>
      </section>
    </main>
  `;

  const buttons =
    document.querySelectorAll<HTMLButtonElement>("[data-difficulty]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const difficulty = button.dataset.difficulty;

      if (
        difficulty !== "easy" &&
        difficulty !== "medium" &&
        difficulty !== "hard"
      ) {
        return;
      }

      startGame(difficulty);
    });
  });
}

function startGame(difficulty: Difficulty) {
  app.innerHTML = `
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

  new Game(canvas, AI_CONFIGURATIONS[difficulty], showMenu).start();
}

showMenu();
