const DECIMAL_MULTIPLIER = 10000;
const WIDTH = 800;
const HEIGHT = 800;
const ballRadius = 7;
const obstacleRadius = 4;
const gravity = pad(0.4);
const horizontalFriction = 0.35;
const verticalFriction = 0.8;
const multipliers = [20, 10, 5, 2, 1.2, 1.1, 1.1, 1, 0.5, 1, 1.1, 1.1, 1.2, 2, 5, 10, 20];

function pad(n) {
  return n * DECIMAL_MULTIPLIER;
}

function unpad(n) {
  return Math.floor(n / DECIMAL_MULTIPLIER);
}
