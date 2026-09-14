export class Paddle {
  public x: number;
  public y: number;
  public readonly width: number;
  public readonly height: number;
  private readonly speed: number;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    speed: number,
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
  }

  move(direction: number, deltaTime: number, boundaryHeight: number) {
    const nextY = this.y + direction * this.speed * deltaTime;
    const maximumY = boundaryHeight - this.height;

    this.y = Math.max(0, Math.min(maximumY, nextY));
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = "#f8fafc";
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
