const canvas = document.getElementById('gamecanvas')
const ctx = canvas.getContext('2d')

const player = new Player({ position: { x: 16, y: 0 }, image: './img/dragon.png', ctx, canvas })
const obstacle = new Obstacle({ position: { x: canvas.width - 1, y: 0 }, image: './img/wall.png', ctx, canvas })

let objects = [player, obstacle]

let animationFrameID
let level = 0

window.onload = function () {
  let fps = 60
  let fpsInterval
  let startTime
  let now
  let then
  let elapsed

  startAnimating()

  function startAnimating() {
    fpsInterval = 1000 / fps
    then = window.performance.now()
    startTime = then
    console.log(startTime)
    animate()
  }

  function animate() {

    // request another frame

    animationFrameID = requestAnimationFrame(animate);

    // calc elapsed time since last loop

    now = Date.now();
    elapsed = now - then;

    // if enough time has elapsed, draw the next frame

    if (elapsed > fpsInterval) {

      // Get ready for next frame by setting then=now, but also adjust for your
      // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
      then = now - (elapsed % fpsInterval);

      // Put your drawing code here
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      updateObjects()
      renderObjects()
    }
  }

  function updateObjects() {
    // Remove empty ones.
    objects = objects.filter(Boolean)

    for (let index = 0; index < objects.length; index++) {
      const object = objects[index]
      object.update()

      logicByInstance(object, index)
    }
  }

  function renderObjects() {
    // Remove empty ones.
    objects = objects.filter(Boolean)

    for (let index = 0; index < objects.length; index++) {
      const object = objects[index]
      object.render()
    }
  }

  function logicByInstance(object, index) {
    if (object instanceof Player) {
      if (player.position.y > canvas.height) {
        gameOver('Into the void!')
      }
    } else if (object instanceof Obstacle) {
      const objectPos = object.position

      // Player is still in the game!
      const player = objects.find(obj => obj instanceof Player)
      if (player) {
        const playerPos = player.position
        const doesXMatch = (playerPos.x >= (objectPos.x - 64)) && (playerPos.x <= objectPos.x + 48)

        const playerAboveGap = playerPos.y < (object.gap - object.halfSize)
        const playerBelowGap = playerPos.y > (object.gap + object.halfSize)

        if (doesXMatch && (playerAboveGap || playerBelowGap)) {
          gameOver('Hit an obstacle!')
        }
      }

      // If Obstacle is leaving the canvas, spawn a new one in.
      if (objectPos.x < -48) {
        level += 0.5
        const obstacle = new Obstacle({ position: { x: canvas.width - 1, y: 0 }, image: './img/wall.png', ctx, canvas }, level)
        objects[index] = null
        objects.push(obstacle)
      }
    }
  }

  function gameOver(deathReason) {
    // Game over!
    const playerIndex = objects.findIndex(obj => obj instanceof Player)
    objects[playerIndex] = null

    objects.push(new TextObject(
      { position: { x: canvas.width / 2, y: canvas.height / 2 }, ctx, canvas },
      { font: '48px monospace', text: 'OTUR! KÖR IGEN?' }
    ))
    objects.push(new TextObject(
      { position: { x: canvas.width / 2, y: (canvas.height / 2) + 26 }, ctx, canvas },
      { font: '26px monospace', text: deathReason }
    ))
    objects.push(new TextObject(
      { position: { x: canvas.width / 2, y: (canvas.height / 2) + 48 }, ctx, canvas },
      { font: '26px monospace', text: 'Score: ' + (level * 2) }
    ))
    // cancelAnimationFrame(animationFrameID)
  }

  canvas.addEventListener('mousedown', function () {
    player.flap()
  })

  animate()
}

// https://stackoverflow.com/a/7228322 CC BY-SA 4.0
function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}