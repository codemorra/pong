export type Difficulty = "easy" | "medium" | "hard";

/** Configuration for the AI opponent at different difficulty levels. */
export interface AiConfiguration {
  reactionDelay: number; // Time in seconds before the AI reacts to a new ball position.
  maxPaddleSpeed: number; // Maximum speed at which the AI-controlled paddle can move.
  perceivedPaddleHeight: number; // The height of the paddle as perceived by the AI for tracking purposes.
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
