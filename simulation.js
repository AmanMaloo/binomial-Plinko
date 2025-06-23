// simulation.js

// This script runs simulations of dropping balls from random x positions
// and logs which x-values lead to which sinks. It stores results into `outcomes.js`

const NUM_SIMULATED_DROPS = 1000;
const xHitsPerSink = Array(NUM_SINKS).fill(null).map(() => []);

function dropRandomBallAndTrack() {
  const randX = (WIDTH / 2 + 36 * (Math.random() - 0.5));
  const testBall = new Ball(pad(randX), pad(50), ballRadius, 'lime');
  testBall.trackX = randX;
  testBall.isTracking = true;
  balls.push(testBall);
}

function runSimulation(drops = NUM_SIMULATED_DROPS, callback) {
  let remaining = drops;
  const interval = setInterval(() => {
    if (remaining-- <= 0) {
      clearInterval(interval);
      if (callback) callback();
      return;
    }
    dropRandomBallAndTrack();
  }, 10);
}

function saveResultsAsJSFile() {
  const content = `const sinkData = ${JSON.stringify(xHitsPerSink, null, 2)};`;
  const blob = new Blob([content], { type: 'application/javascript' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'outcomes.js';
  a.click();

  URL.revokeObjectURL(url);
}

