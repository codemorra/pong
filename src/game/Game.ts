import { Keyboard } from "../input/Keyboard";
import { Paddle } from "./Paddle";

export class Game {
  private readonly canvas: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;
  private readonly keyboard = new Keyboard();
  private readonly player: Paddle;
  private lastFrameTime = performance.now();

  constructor(canvas: HTMLCanvasElement) {
    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Canvas rendering is not supported.");
    }

    this.canvas = canvas;
    this.context = context;
    this.player = new Paddle(24, (canvas.height - 100) / 2, 16, 100, 420);
  }

  start() {
    requestAnimationFrame(this.gameLoop);
  }

  private gameLoop = (currentTime: number) => {
    const deltaTime = Math.min((currentTime - this.lastFrameTime) / 1000, 0.05);

    this.lastFrameTime = currentTime;
    this.update(deltaTime);
    this.render();

    requestAnimationFrame(this.gameLoop);
  };

  private update(deltaTime: number) {
    const movingUp =
      this.keyboard.isPressed("KeyW") || this.keyboard.isPressed("ArrowUp");
    const movingDown =
      this.keyboard.isPressed("KeyS") || this.keyboard.isPressed("ArrowDown");
    const direction = Number(movingDown) - Number(movingUp);

    this.player.move(direction, deltaTime, this.canvas.height);
  }

  private render() {
    this.context.fillStyle = "#010305";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.player.draw(this.context);
  }
}
