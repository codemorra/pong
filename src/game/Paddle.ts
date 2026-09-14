/** Represents a vertically moving player or opponent paddle. */
export class Paddle {
  public x: number;
  public y: number;
  public readonly width: number;
  public readonly height: number;
  private readonly speed: number;

  /**
   * Creates a paddle at a fixed position and movement speed.
   *
   * @param x Horizontal paddle position in pixels.
   * @param y Vertical paddle position in pixels.
   * @param width Paddle width in pixels.
   * @param height Paddle height in pixels.
   * @param speed Movement speed in pixels per second.
   */
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

  /**
   * Moves the paddle vertically without allowing it to leave the game field.
   *
   * @param direction Movement direction: -1 for up, 1 for down, 0 for no movement.
   * @param deltaTime Time elapsed since the previous frame in seconds.
   * @param boundaryHeight Height of the playable field in pixels.
   */
  move(direction: number, deltaTime: number, boundaryHeight: number) {
    const nextY = this.y + direction * this.speed * deltaTime;
    const maximumY = boundaryHeight - this.height;

    this.y = Math.max(0, Math.min(maximumY, nextY));
  }

  /**
   * Draws the paddle as a filled rectangle.
   *
   * @param context Canvas context used for rendering.
   */
  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = "#f8fafc";
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
