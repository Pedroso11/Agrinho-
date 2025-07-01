function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
let player;
let plants = [];
let score = 0;
let moving = { up: false, down: false, left: false, right: false };

function setup() {
  createCanvas(800, 400);
  player = {
    x: 50,
    y: height - 100,
    w: 40,
    h: 60,
    speed: 5
  };

  for (let i = 0; i < 5; i++) {
    spawnPlant();
  }
}

function draw() {
  background(34, 139, 34); // verde floresta

  fill(255);
  textSize(20);
  text("Plantas coletadas: " + score, 10, 30);

  drawPlayer();
  movePlayer();

  for (let i = plants.length - 1; i >= 0; i--) {
    let p = plants[i];
    drawPlant(p);

    p.x -= 3;
    if (p.x + p.w < 0) {
      plants.splice(i, 1);
      spawnPlant();
    }

    if (collideRectRect(player.x, player.y, player.w, player.h, p.x, p.y, p.w, p.h)) {
      score++;
      plants.splice(i, 1);
      spawnPlant();
    }
  }
}

function drawPlayer() {
  fill(255, 200, 0);
  rect(player.x, player.y, player.w, player.h);
}

function movePlayer() {
  if (moving.up && player.y > 0) {
    player.y -= player.speed;
  }
  if (moving.down && player.y + player.h < height) {
    player.y += player.speed;
  }
  if (moving.left && player.x > 0) {
    player.x -= player.speed;
  }
  if (moving.right && player.x + player.w < width) {
    player.x += player.speed;
  }
}

// Detecta quando a tecla é pressionada
function keyPressed() {
  if (keyCode === UP_ARROW) moving.up = true;
  if (keyCode === DOWN_ARROW) moving.down = true;
  if (keyCode === LEFT_ARROW) moving.left = true;
  if (keyCode === RIGHT_ARROW) moving.right = true;
}

// Detecta quando a tecla é solta
function keyReleased() {
  if (keyCode === UP_ARROW) moving.up = false;
  if (keyCode === DOWN_ARROW) moving.down = false;
  if (keyCode === LEFT_ARROW) moving.left = false;
  if (keyCode === RIGHT_ARROW) moving.right = false;
}

function drawPlant(p) {
  fill(0, 255, 0);
  rect(p.x, p.y, p.w, p.h);
}

function spawnPlant() {
  let p = {
    x: random(width, width + 300),
    y: random(50, height - 50),
    w: 30,
    h: 30
  };
  plants.push(p);
}

function collideRectRect(x1, y1, w1, h1, x2, y2, w2, h2) {
  return (x1 < x2 + w2 &&
          x1 + w1 > x2 &&
          y1 < y2 + h2 &&
          y1 + h1 > y2);
}