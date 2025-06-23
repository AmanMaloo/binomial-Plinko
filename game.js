const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let balls = [];
const obstacles = [];
const sinks = [];

const NUM_SINKS = 17;
const sinkWidth = 36;

// Create obstacles
const rows = 18;
for (let row = 2; row < rows; row++) {
  const numObstacles = row + 1;
  const y = 0 + row * 35;
  const spacing = 36;
  for (let col = 0; col < numObstacles; col++) {
    const x = WIDTH / 2 - spacing * (row / 2 - col);
    obstacles.push({ x: pad(x), y: pad(y), radius: obstacleRadius });
  }
}

// Create sinks
for (let i = 0; i < NUM_SINKS; i++) {
  const x = WIDTH / 2 + (i - 8.5) * sinkWidth + obstacleRadius;
  const y = HEIGHT - 175;
  sinks.push({ x, y, width: sinkWidth, height: sinkWidth });
}

function drawObstacles() {
  ctx.fillStyle = 'white';
  obstacles.forEach(obstacle => {
    ctx.beginPath();
    ctx.arc(unpad(obstacle.x), unpad(obstacle.y), obstacle.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  });
}

function drawSinks() {
  ctx.font = 'bold 15px Arial';
  ctx.textAlign = 'center';

  for (let i = 0; i < sinks.length; i++) {
    const sink = sinks[i];
    let t = i / (sinks.length - 1);
    let hue = t <= 0.5 ? 60 * t / 0.5 : 60 - 60 * ((t - 0.5) / 0.5);
    ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.fillRect(sink.x, sink.y - sink.height / 2, sink.width - obstacleRadius * 2, sink.height);

    ctx.fillStyle = 'black';
    ctx.fillText(`${multipliers[i]}x`, sink.x + (sink.width - obstacleRadius * 2) / 2, sink.y + 5);
  }
}

function draw() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  drawObstacles();
  drawSinks();
  balls.forEach(ball => {
    ball.draw(ctx);
    ball.update(obstacles, sinks);
  });
  
  balls = balls.filter(ball => !ball.toRemove);
}

function update() {
  draw();
  requestAnimationFrame(update);
}

function addBallToSink(sinkIndex) {
    const xList = sinkData[sinkIndex];
    const randomX = xList[Math.floor(Math.random() * xList.length)];
    const newBall = new Ball(pad(randomX), pad(50), ballRadius, 'cyan');
    balls.push(newBall);
}

document.getElementById('add-ball').addEventListener('click', () => {
  const sinkIndex = getTargetSinkIndex();
  addBallToSink(sinkIndex);
});

update();
