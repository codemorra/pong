import { Paddle } from "./Paddle";

/** Represents the moving ball and its collision and serve behavior. */
export class Ball {
  public x: number;
  public y: number;
  private velocityX: number;
  private velocityY: number;
  private readonly radius: number;
  private readonly speed: number;

  /**
   * Creates a ball with its initial direction pointing to the right.
   *
   * @param x Initial horizontal center position.
   * @param y Initial vertical center position.
   * @param radius Ball radius in pixels.
   * @param speed Base movement speed in pixels per second.
   */
  constructor(x: number, y: number, radius: number, speed: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
    this.velocityX = speed;
    this.velocityY = speed * 0.55;
  }

  /**
   * Moves the ball and reflects it from the top and bottom field boundaries.
   *
   * @param deltaTime Time elapsed since the previous frame in seconds.
   * @param fieldHeight Height of the playable field in pixels.
   */
  update(deltaTime: number, fieldHeight: number) {
    this.x += this.velocityX * deltaTime;
    this.y += this.velocityY * deltaTime;

    // Keep the whole ball inside the top boundary and reverse its vertical direction.
    if (this.y - this.radius <= 0) {
      this.y = this.radius;
      this.velocityY = Math.abs(this.velocityY);
    }

    // Apply the same correction at the bottom boundary.
    if (this.y + this.radius >= fieldHeight) {
      this.y = fieldHeight - this.radius;
      this.velocityY = -Math.abs(this.velocityY);
    }
  }

  /**
   * Checks whether the entire ball has passed either horizontal field boundary.
   *
   * @param fieldWidth Width of the playable field in pixels.
   * @returns Whether the ball is outside the field.
   */
  isOutside(fieldWidth: number) {
    return this.x + this.radius < 0 || this.x - this.radius > fieldWidth;
  }

  /**
   * Returns the ball to a position and starts its next serve.
   *
   * @param x Horizontal center position for the new serve.
   * @param y Vertical center position for the new serve.
   * @param horizontalDirection Horizontal serve direction: -1 for left, 1 for right.
   */
  reset(x: number, y: number, horizontalDirection: number) {
    // Alternate the vertical serve direction randomly while preserving the requested horizontal side.
    const verticalDirection = Math.random() < 0.5 ? -1 : 1;

    this.x = x;
    this.y = y;
    this.velocityX = this.speed * horizontalDirection;
    this.velocityY = this.speed * 0.55 * verticalDirection;
  }

  /**
   * Reflects the ball from a paddle when it overlaps while moving towards it.
   * The vertical hit position determines the outgoing vertical direction.
   *
   * @param paddle Paddle to test for a collision.
   */
  bounceOff(paddle: Paddle) {
    // Find the point on the paddle rectangle closest to the ball's center.
    // This lets us test a circular ball against a rectangular paddle.
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

    // Compare squared distances to avoid an unnecessary square-root calculation.
    const overlapsPaddle = distanceX ** 2 + distanceY ** 2 <= this.radius ** 2;

    if (!overlapsPaddle) {
      return;
    }

    // Only reflect a ball that is travelling into the paddle.
    // This prevents the ball from bouncing off the back side of the paddle.
    const paddleIsLeftOfBall = paddle.x < this.x;
    const movingTowardsPaddle =
      (paddleIsLeftOfBall && this.velocityX < 0) ||
      (!paddleIsLeftOfBall && this.velocityX > 0);

    if (!movingTowardsPaddle) {
      return;
    }

    // Calculate the vertical impact position relative to the paddle's center.
    const paddleCenterY = paddle.y + paddle.height / 2;
    const impactPosition = (this.y - paddleCenterY) / (paddle.height / 2);

    // Move the ball outside the paddle before reversing it to prevent repeated collisions.
    this.x = paddleIsLeftOfBall
      ? paddle.x + paddle.width + this.radius
      : paddle.x - this.radius;

    // Reflect horizontally and derive a new vertical velocity from the impact position.
    this.velocityX = paddleIsLeftOfBall
      ? Math.abs(this.velocityX)
      : -Math.abs(this.velocityX);
    this.velocityY = this.speed * impactPosition * 0.7;
  }

  /**
   * Reports whether the ball is currently travelling towards the computer opponent.
   *
   * @returns Whether the horizontal velocity points right.
   */
  isMovingRight() {
    return this.velocityX > 0;
  }

  /**
   * Draws the ball as a filled circle.
   *
   * @param context Canvas context used for rendering.
   */
  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = "#f8fafc";
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();
  }
}
