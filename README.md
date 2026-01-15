# Monte Carlo Pi Simulator

A web-based Monte Carlo simulation for estimating the value of Pi.

**Live Demo:** https://wojd0.github.io/monte-carlo-simulator/

## About

This application estimates the value of Pi using the Monte Carlo method. It was created as part of a physics lab exercise at WSB Merito University.

## Installation

```bash
bun install
```

## Development

```bash
bun run dev
```

## Build

```bash
bun run build
```

### How it works

The Monte Carlo method estimates Pi by randomly generating points within a square and counting how many fall inside an inscribed circle:

1. Consider a square with side 2r and a circle with radius r inscribed within it
2. The ratio of the circle's area to the square's area is: `(πr²) / (4r²) = π/4`
3. By randomly sampling N points and counting how many fall inside the circle (N_in), we can estimate: `π ≈ 4 × (N_in / N)`

The error decreases proportionally to `1/√N`, meaning to improve accuracy by one order of magnitude, the number of samples must increase by 100×.

### Sample Results

| Points (N) | Estimated Pi | Absolute Error | Relative Error |
|------------|--------------|----------------|----------------|
| 10         | 3.2000       | 0.0584         | 1.85%          |
| 100        | 3.1600       | 0.0184         | 0.58%          |
| 1,000      | 3.1480       | 0.0064         | 0.20%          |
| 10,000     | 3.1408       | 0.0008         | 0.02%          |
| 100,000    | 3.1421       | 0.0005         | 0.016%         |
| 1,000,000  | 3.1414       | 0.0001         | 0.006%         |

## Tech Stack

- **Framework:** React with TypeScript
- **Build Tool:** Vite
- **Runtime:** Bun
- **Random Number Generator:** `Math.random()` (browser's built-in PRNG)

## Deployment

The app is automatically deployed to GitHub Pages via GitHub Actions.
