import { Keyboard } from "../input/Keyboard";
import { Paddle } from "./Paddle";
import { Ball } from "./Ball";
import { ComputerOpponent } from "./ComputerOpponent";

export class Game {
  private readonly canvas: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;
  private readonly keyboard = new Keyboard();
  private readonly player: Paddle;
  private readonly ball: Ball;
  private readonly opponentPaddle: Paddle;
  private readonly computerOpponent: ComputerOpponent;
  private playerScore = 0;
  private opponentScore = 0;
  private lastFrameTime = performance.now();

  constructor(canvas: HTMLCanvasElement) {
    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Canvas rendering is not supported.");
    }

    this.canvas = canvas;
    this.context = context;
    this.player = new Paddle(24, (canvas.height - 100) / 2, 16, 100, 420);
    this.opponentPaddle = new Paddle(
      canvas.width - 40,
      (canvas.height - 100) / 2,
      16,
      100,
      150,
    );
    this.computerOpponent = new ComputerOpponent(this.opponentPaddle);
    this.ball = new Ball(canvas.width / 2, canvas.height / 2, 10, 320);
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

    this.ball.update(deltaTime, this.canvas.height);

    this.computerOpponent.update(
      this.ball.y,
      this.ball.isMovingRight(),
      deltaTime,
      this.canvas.height,
    );

    this.ball.bounceOff(this.player);
    this.ball.bounceOff(this.opponentPaddle);

    if (this.ball.isOutside(this.canvas.width)) {
      const playerScored = this.ball.x > this.canvas.width;

      if (playerScored) {
        this.playerScore += 1;
      } else {
        this.opponentScore += 1;
      }

      const horizontalDirection = playerScored ? -1 : 1;

      this.ball.reset(
        this.canvas.width / 2,
        this.canvas.height / 2,
        horizontalDirection,
      );
    }
  }

  private render() {
    this.context.fillStyle = "#010305";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.context.fillStyle = "#94a3b8";
    this.context.font = "32px system-ui, sans-serif";
    this.context.textAlign = "center";
    this.context.fillText(
      `${this.playerScore} : ${this.opponentScore}`,
      this.canvas.width / 2,
      48,
    );

    this.player.draw(this.context);
    this.opponentPaddle.draw(this.context);
    this.ball.draw(this.context);
  }
}
