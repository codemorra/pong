export type Difficulty = "easy" | "medium" | "hard";

/** Configuration for the AI opponent at different difficulty levels. */
export interface AiConfiguration {
  /** Time in seconds before the AI refreshes its paddle target. */
  reactionDelay: number;
  /** Maximum vertical movement speed of the computer paddle in pixels per second. */
  maxPaddleSpeed: number;
  /** Paddle height in pixels as perceived by the AI. */
  perceivedPaddleHeight: number;
}

/** AI configurations for each difficulty level. */
export const AI_CONFIGURATIONS: Record<Difficulty, AiConfiguration> = {
  easy: {
    reactionDelay: 0.45,
    maxPaddleSpeed: 120,
    perceivedPaddleHeight: 170,
  },
  medium: {
    reactionDelay: 0.2,
    maxPaddleSpeed: 150,
    perceivedPaddleHeight: 125,
  },
  hard: {
    reactionDelay: 0.05,
    maxPaddleSpeed: 220,
    perceivedPaddleHeight: 100,
  },
};
