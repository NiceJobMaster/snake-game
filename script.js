let canvas,
  ctx,
  speedX,
  speedY,
  playerX,
  playerY,
  gridSize,
  tileCount,
  appleX,
  appleY,
  trail,
  tail,
  previousKey,
  showGameEnd;

window.onload = () => {
  canvas = document.getElementById("game");
  ctx = canvas.getContext("2d");
  setInitialValues();

  canvas.addEventListener("mousedown", handleMouseClick);
  document.addEventListener("keydown", keyPush);
  const framePerSecond = 10;
  setInterval(game, 1000 / framePerSecond);
};

const setInitialValues = () => {
  speedX = speedY = 0;
  playerX = playerY = 10;
  gridSize = tileCount = 20;
  appleX = appleY = 15;
  trail = [];
  tail = 1;
  showGameEnd = false;
};

const game = () => {
  move();
  draw();
};

const move = () => {
  if (showGameEnd) {
    return;
  }

  playerX += speedX;
  playerY += speedY;

  if (playerX < 0) {
    playerX = tileCount - 1;
  }
  if (playerX > tileCount - 1) {
    playerX = 0;
  }
  if (playerY < 0) {
    playerY = tileCount - 1;
  }
  if (playerY > tileCount - 1) {
    playerY = 0;
  }
};

const draw = () => {
  colorRect(0, 0, canvas.width, canvas.height, "black");

  if (showGameEnd) {
    ctx.fillStyle = "white";
    const textTail = "Tail: " + tail;
    ctx.fillText(textTail, 200 - ctx.measureText(textTail).width / 2, 180);

    const textClick = "Click to continue";
    ctx.fillText(textClick, 200 - ctx.measureText(textClick).width / 2, 220);
    return;
  }

  for (let i = 0; i < trail.length; i++) {
    colorRect(
      trail[i].x * gridSize,
      trail[i].y * gridSize,
      gridSize - 2,
      gridSize - 2,
      "green"
    );

    if (trail[i].x === playerX && trail[i].y === playerY) {
      if (tail > 1) {
        showGameEnd = true;
      }
    }
  }

  trail.push({ x: playerX, y: playerY });
  while (trail.length > tail) {
    trail.shift();
  }

  if (appleX == playerX && appleY === playerY) {
    tail++;
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
  }

  colorRect(
    appleX * gridSize,
    appleY * gridSize,
    gridSize - 2,
    gridSize - 2,
    "red"
  );
};

const colorRect = (x, y, width, height, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

const keyPush = (e) => {
  if (showGameEnd) {
    return;
  }

  switch (e.keyCode) {
    case 37:
      if (previousKey !== 39) {
        speedX = -1;
        speedY = 0;
        previousKey = 37;
      }
      break;
    case 38:
      if (previousKey !== 40) {
        speedX = 0;
        speedY = -1;
        previousKey = 38;
      }
      break;
    case 39:
      if (previousKey !== 37) {
        speedX = 1;
        speedY = 0;
        previousKey = 39;
      }
      break;
    case 40:
      if (previousKey !== 38) {
        speedX = 0;
        speedY = 1;
        previousKey = 40;
      }
      break;
  }
};

const handleMouseClick = () => {
  if (showGameEnd) {
    setInitialValues();
  }
};
