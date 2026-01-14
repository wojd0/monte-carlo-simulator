/**
 * Types for the Monte Carlo Pi simulation
 *
 * This is a simple educational project demonstrating how random sampling
 * can approximate mathematical constants like Pi.
 */

// A single data point recorded at each milestone (power of 10)
export interface SimulationResult {
  n: number;           // Number of random points thrown so far
  pi: number;          // Estimated value of Pi at this point
  error: number;       // Absolute error |estimated - actual|
  percentError: number; // Relative error as percentage
}

// Current state of the simulation
export interface SimulationState {
  isRunning: boolean;
  progress: number;      // 0-100 percent
  currentPi: number;     // Latest Pi estimate
  totalPoints: number;   // Total points generated
  pointsInside: number;  // Points inside quarter circle
  results: SimulationResult[];
}
