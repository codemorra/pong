import { Paddle } from "./Paddle";
import type { AiConfiguration } from "./Difficulty";

/** Controls the computer paddle using the selected AI configuration. */
export class ComputerOpponent {
  private readonly paddle: Paddle; // The paddle controlled by this computer opponent.
  private targetPosition: number | null = null; // The relative point on the paddle the ball is targeting.
  private desiredPaddleY: number | null = null; // The vertical position the paddle aims to reach.
  private reactionTimer = 0; // Current countdown timer for the reaction delay.
  private readonly targetTolerance = 4; // Distance in pixels where the paddle stops adjusting.
  private readonly configuration: AiConfiguration; // The AI configuration for this opponent.

  /**
   * Creates the controller for the computer-controlled paddle.
   *
   * @param paddle Paddle controlled by this opponent.
   * @param configuration The AI configuration for this opponent.
   */
  constructor(paddle: Paddle, configuration: AiConfiguration) {
    this.paddle = paddle;
    this.configuration = configuration;
  }

  /**
   * Moves the opponent towards an approaching ball.
   * It intentionally does not track balls moving away, which gives the player an advantage.
   * A target position is selected once for every incoming ball and is
   * refreshed only after the configured reaction delay.
   *
   * @param ballY Current vertical center position of the ball.
   * @param isBallApproaching Whether the ball is travelling towards the opponent.
   * @param deltaTime Time elapsed since the previous frame in seconds.
   * @param fieldHeight Height of the playable field in pixels.
   */
  update(
    ballY: number, // Current vertical center position of the ball.
    isBallApproaching: boolean, // Whether the ball is travelling towards the opponent.
    deltaTime: number, // Time elapsed since the previous frame in seconds.
    fieldHeight: number, // Height of the playable field in pixels.
  ) {
    // If the ball is not approaching, reset the target and desired positions and the reaction timer.
    if (!isBallApproaching) {
      this.targetPosition = null;
      this.desiredPaddleY = null;
      this.reactionTimer = 0;
      return;
    }

    if (this.targetPosition === null) {
      // Pick one point on the paddle for this incoming ball.
      this.targetPosition = 0.15 + Math.random() * 0.7;

      // Calculate the initial desired paddle position based on the target point.
      this.desiredPaddleY =
        ballY - this.configuration.perceivedPaddleHeight * this.targetPosition;

      // Wait for the configured delay before the first target refresh.
      this.reactionTimer = this.configuration.reactionDelay;
    }

    this.reactionTimer -= deltaTime;

    if (this.reactionTimer <= 0) {
      // Recalculate the desired paddle position after the reaction delay.
      this.desiredPaddleY =
        ballY - this.configuration.perceivedPaddleHeight * this.targetPosition;

      // Wait for the configured delay before the next target refresh.
      this.reactionTimer = this.configuration.reactionDelay;
    }

    // If the desired paddle position is not set, no movement is needed.
    if (this.desiredPaddleY === null) {
      return;
    }

    // Calculate the distance from the current paddle position to the desired target position.
    const distanceToTarget = this.desiredPaddleY - this.paddle.y;

    // If the distance to the target is within the tolerance, no movement is needed.
    if (Math.abs(distanceToTarget) <= this.targetTolerance) {
      return;
    }

    this.paddle.move(Math.sign(distanceToTarget), deltaTime, fieldHeight);
  }
}
