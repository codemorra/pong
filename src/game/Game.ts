export class Game {
  private readonly canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  start() {
    const context = this.canvas.getContext("2d");

    if (!context) {
      throw new Error("Canvas rendering is not supported.");
    }

    context.fillStyle = "#010305";
    context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
