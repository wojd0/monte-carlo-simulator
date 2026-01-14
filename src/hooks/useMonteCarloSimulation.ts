/**
 * useMonteCarloSimulation Hook
 *
 * Core simulation logic for estimating Pi using Monte Carlo method.
 *
 * How it works:
 * 1. We throw random points in a 1x1 square
 * 2. We check if each point falls inside a quarter circle (radius 1)
 * 3. Ratio of inside/total points ≈ area of quarter circle / area of square
 * 4. Since quarter circle area = π/4, we get: π ≈ 4 * (inside/total)
 */

import { useState, useRef, useCallback } from "react";
import type { SimulationResult, SimulationState } from "../types";

// The value we're trying to approximate
export const PI_REFERENCE = Math.PI;

// Default number of trials
export const DEFAULT_N = 10_000_000;

// Generate milestones based on target n (powers of 10 up to n, plus n itself)
function generateMilestones(n: number): number[] {
  const milestones: number[] = [];
  let current = 1;
  while (current < n) {
    milestones.push(current);
    current *= 10;
  }
  // Always include the target n as the final milestone
  if (milestones[milestones.length - 1] !== n) {
    milestones.push(n);
  }
  return milestones;
}

// Process this many points before yielding to the UI thread
const BATCH_SIZE = 5000;

export function useMonteCarloSimulation() {
  // Simulation state
  const [state, setState] = useState<SimulationState>({
    isRunning: false,
    progress: 0,
    currentPi: 0,
    totalPoints: 0,
    pointsInside: 0,
    results: [],
  });

  // Canvas ref for visualization - we'll expose this so the canvas component can use it
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Main simulation function
  const runSimulation = useCallback(async (n: number = DEFAULT_N) => {
    // Clamp n to reasonable bounds (1 to 10^8)
    const targetN = Math.max(1, Math.min(n, 100_000_000));
    const milestones = generateMilestones(targetN);

    // Reset everything
    setState({
      isRunning: true,
      progress: 0,
      currentPi: 0,
      totalPoints: 0,
      pointsInside: 0,
      results: [],
    });

    // Setup canvas for drawing points
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const width = canvas?.width ?? 280;
    const height = canvas?.height ?? 280;

    if (ctx) {
      // Clear previous drawing
      ctx.clearRect(0, 0, width, height);

      // Draw the quarter circle outline (just for visual reference)
      ctx.beginPath();
      ctx.arc(0, height, width, 0, 1.5 * Math.PI);
      ctx.strokeStyle = "rgba(59, 130, 246, 0.2)";
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Counters
    let inside = 0;
    let total = 0;
    const results: SimulationResult[] = [];
    const maxPoints = milestones[milestones.length - 1];

    // Go through each milestone
    for (const target of milestones) {
      // Generate points until we reach this milestone
      while (total < target) {
        const batchEnd = Math.min(target, total + BATCH_SIZE);

        // Only draw the first 5000 points to keep things responsive
        const shouldDraw = ctx && total < 5000;

        // Generate a batch of random points
        for (let j = total; j < batchEnd; j++) {
          const x = Math.random();
          const y = Math.random();

          // Point is inside quarter circle if x² + y² ≤ 1
          const isInside = x * x + y * y <= 1;
          if (isInside) inside++;

          // Draw the point on canvas (if we're still in the drawing phase)
          if (shouldDraw) {
            const px = x * width;
            const py = height - y * height; // Flip Y axis
            ctx.fillStyle = isInside ? "#3b82f6" : "#ef4444";
            ctx.fillRect(px, py, 1, 1);
          }
        }

        total = batchEnd;

        // Update UI with current progress
        const currentPi = (4 * inside) / total;
        setState((prev) => ({
          ...prev,
          totalPoints: total,
          pointsInside: inside,
          currentPi,
          progress: (total / maxPoints) * 100,
        }));

        // Let the browser paint (sync with animation frame for smooth progress updates)
        await new Promise((r) => requestAnimationFrame(r));
      }

      // Record this milestone
      const calculatedPi = (4 * inside) / total;
      results.push({
        n: total,
        pi: calculatedPi,
        error: Math.abs(calculatedPi - PI_REFERENCE),
        percentError: (Math.abs(calculatedPi - PI_REFERENCE) / PI_REFERENCE) * 100,
      });

      setState((prev) => ({
        ...prev,
        results: [...results],
      }));
    }

    // Done!
    setState((prev) => ({ ...prev, isRunning: false }));
  }, []);

  return {
    ...state,
    canvasRef,
    runSimulation,
  };
}
