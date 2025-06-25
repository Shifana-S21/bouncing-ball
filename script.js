// Setup canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Utility functions
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomColor() {
  return `rgb(${random(0,255)}, ${random(0,255)}, ${random(0,255)})`;
}

// Ball class
class Ball {
  constructor(x, y, velX, velY, size, color) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.size = size;
    this.color = color;
    this.collisions = 0; // Track number of collisions
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  update() {
    // Gravity effect
    this.velY += 0.1;

    if ((this.x + this.size) >= canvas.width || (this.x - this.size) <= 0) {
      this.velX = -this.velX;
    }

    if ((this.y + this.size) >= canvas.height) {
      this.velY = -this.velY * 0.9; // simulate bounce + energy loss
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  checkCollision(otherBall) {
    const dx = this.x - otherBall.x;
    const dy = this.y - otherBall.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.size + otherBall.size) {
      this.color = randomColor();
      otherBall.color = randomColor();
      this.collisions++;
      otherBall.collisions++;
    }
  }
}

// Ball array
const balls = [];
while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    random(size, canvas.width - size),
    random(size, canvas.height - size),
    random(-2, 2),
    random(-2, 2),
    size,
    randomColor()
  );
  balls.push(ball);
}

// Animation loop
function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();

    for (let j = i + 1; j < balls.length; j++) {
      balls[i].checkCollision(balls[j]);
    }
  }

  requestAnimationFrame(loop);
}

loop();
