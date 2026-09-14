import { Paddle } from "./Paddle";

/** Controls the computer paddle with a deliberately simple ball-following strategy. */
export class ComputerOpponent {
  private readonly paddle: Paddle;
  private readonly trackingTolerance: number;

  /**
   * Creates the controller for the computer-controlled paddle.
   *
   * @param paddle Paddle controlled by this opponent.
   * @param trackingTolerance Distance in pixels where the paddle stops adjusting.
   */
  constructor(paddle: Paddle, trackingTolerance = 8) {
    this.paddle = paddle;
    this.trackingTolerance = trackingTolerance;
  }

  /**
   * Moves the opponent towards an approaching ball.
   * It intentionally does not track balls moving away, which gives the player an advantage.
   *
   * @param ballY Current vertical center position of the ball.
   * @param isBallApproaching Whether the ball is travelling towards the opponent.
   * @param deltaTime Time elapsed since the previous frame in seconds.
   * @param fieldHeight Height of the playable field in pixels.
   */
  update(
    ballY: number,
    isBallApproaching: boolean,
    deltaTime: number,
    fieldHeight: number,
  ) {
    if (!isBallApproaching) {
      return;
    }

    const paddleCenterY = this.paddle.y + this.paddle.height / 2;
    const distanceToBall = ballY - paddleCenterY;

    if (Math.abs(distanceToBall) <= this.trackingTolerance) {
      return;
    }

    this.paddle.move(Math.sign(distanceToBall), deltaTime, fieldHeight);
  }
}
