import { Paddle } from "./Paddle";

export class ComputerOpponent {
  private readonly paddle: Paddle;
  private readonly trackingTolerance: number;

  constructor(paddle: Paddle, trackingTolerance = 8) {
    this.paddle = paddle;
    this.trackingTolerance = trackingTolerance;
  }

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
