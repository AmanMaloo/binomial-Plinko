# Binomial Ball Drop (Plinko-Style Simulation Game)

A browser-based Plinko simulation game built with HTML5 Canvas and JavaScript. The project models the physics of falling balls through pegs and into sinks (slots), and uses simulation to reverse-engineer which `x` positions lead to which sinks using a binomial-probabilty distribution.
## Features
- probability-driven sinks
- Physics-based ball bounces and collisions
- Simulation to discover which `x` positions land in which sinks

```bash
plinko-game/
├── index.html           # Main HTML file
├── styles.css           # All CSS styles
├── utils.js             # Common utility functions (e.g., pad, unpad)
├── ball.js              # Ball class with physics and drawing logic
├── game.js              # Main game setup, rendering, and game loop
├── simulation.js        # Logic for simulating ball drops and saving outcomes
├── sink_generator.js     # Logic to choose which sink to target (uses binomial distribution)
├── outcomes.js          # Auto-generated file with pre-simulated x-positions
```

## How Simulation Works
- `simulation.js` drops balls from random `x` values.
- Each ball tracks which sink it falls into.
- At the end, `outcomes.js` is generated containing `sinkData[]`, mapping sink index to a list of working `x` values

## Usage
- Click **"Add Ball"** to drop a ball into a sink.
- The sink is chosen via `getTargetSinkIndex()` in `sink_generator.js`.
- The game selects an appropriate `x` from `sinkData` to make it land in the generated sink.

