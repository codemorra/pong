export class Ball {
  public x: number;
  public y: number;
  private velocityX: number;
  private velocityY: number;
  private readonly radius: number;
  private readonly speed: number;

  constructor(x: number, y: number, radius: number, speed: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
    this.velocityX = speed;
    this.velocityY = speed * 0.55;
  }

  update(deltaTime: number, fieldHeight: number) {
    this.x += this.velocityX * deltaTime;
    this.y += this.velocityY * deltaTime;

    if (this.y - this.radius <= 0) {
      this.y = this.radius;
      this.velocityY = Math.abs(this.velocityY);
    }

    if (this.y + this.radius >= fieldHeight) {
      this.y = fieldHeight - this.radius;
      this.velocityY = -Math.abs(this.velocityY);
    }
  }

  isOutside(fieldWidth: number) {
    return this.x + this.radius < 0 || this.x - this.radius > fieldWidth;
  }

  reset(x: number, y: number, horizontalDirection: number) {
    const verticalDirection = Math.random() < 0.5 ? -1 : 1;

    this.x = x;
    this.y = y;
    this.velocityX = this.speed * horizontalDirection;
    this.velocityY = this.speed * 0.55 * verticalDirection;
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = "#f8fafc";
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();
  }
}
