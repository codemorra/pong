import { Paddle } from "./Paddle";

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

  bounceOff(paddle: Paddle) {
    const closestX = Math.max(
      paddle.x,
      Math.min(this.x, paddle.x + paddle.width),
    );
    const closestY = Math.max(
      paddle.y,
      Math.min(this.y, paddle.y + paddle.height),
    );
    const distanceX = this.x - closestX;
    const distanceY = this.y - closestY;
    const overlapsPaddle = distanceX ** 2 + distanceY ** 2 <= this.radius ** 2;

    if (!overlapsPaddle) {
      return;
    }

    const paddleIsLeftOfBall = paddle.x < this.x;
    const movingTowardsPaddle =
      (paddleIsLeftOfBall && this.velocityX < 0) ||
      (!paddleIsLeftOfBall && this.velocityX > 0);

    if (!movingTowardsPaddle) {
      return;
    }

    const paddleCenterY = paddle.y + paddle.height / 2;
    const impactPosition = (this.y - paddleCenterY) / (paddle.height / 2);

    this.x = paddleIsLeftOfBall
      ? paddle.x + paddle.width + this.radius
      : paddle.x - this.radius;
    this.velocityX = paddleIsLeftOfBall
      ? Math.abs(this.velocityX)
      : -Math.abs(this.velocityX);
    this.velocityY = this.speed * impactPosition * 0.7;
  }

  isMovingRight() {
    return this.velocityX > 0;
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = "#f8fafc";
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();
  }
}
