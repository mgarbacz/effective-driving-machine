const W_KEY = 87,
      A_KEY = 65,
      S_KEY = 83,
      D_KEY = 68

export default class Car {
  constructor(x, y, sprite, p5) {
    this.x = x
    this.y = y
    this.accel = 0
    this.angle = 0
    this.rotation = 0
    this.sprite = sprite
    this.width = sprite.width
    this.height = sprite.height

    this.p5 = p5
  }

  // called every draw loop
  display() {
    // handle forward and backward movement keys
    if (this.p5.keyIsDown(W_KEY) && this.p5.keyIsDown(S_KEY)) {
      this.move(0)
    } else if (this.p5.keyIsDown(W_KEY)) {
      this.move(-1)
    } else if (this.p5.keyIsDown(S_KEY)) {
      this.move(1)
    } else {
      this.move(0)
    }

    // handle left and right turn keys
    if (this.p5.keyIsDown(A_KEY) && this.p5.keyIsDown(D_KEY)) {
      this.turn(0)
    } else if (this.p5.keyIsDown(A_KEY)) {
      this.turn(-1)
    } else if (this.p5.keyIsDown(D_KEY)) {
      this.turn(1)
    } else {
      this.turn(0)
    }

    // calculate new angle, we only turn if moving
    if (this.accel) {
      this.angle += this.rotation
    }
    // calcuate new position based on accel
    this.x += -this.accel * this.p5.sin(this.angle)
    this.y += this.accel * this.p5.cos(this.angle)

    // translate to new position
    this.p5.translate(this.x, this.y)
    // calculate the rotation
    this.p5.rotate(this.angle)
    // adjust car to center of its location based on sprite size
    // this is done after the rotation so that rotation is centered on car
    this.p5.translate(-this.width / 2, -this.height / 2)

    // actually draw the car sprite
    this.p5.image(this.sprite, 0, 0)
  }

  // if wasd keys pressed, do some moves
  handleKeyPress(key) {
    if (key === 'w') {
      this.move(-1)
    } else if (key === 'a') {
      this.turn(-1)
    } else if (key === 's') {
      this.move(1)
    } else if (key === 'd') {
      this.turn(1)
    }

  }

  // if wasd keys released, stop the moves
  handleKeyRelease(key) {
    if (key === 'w' || key === 's') {
      this.move(0)
    } else if (key === 'a' || key === 'd') {
      this.turn(0)
    }
  }

  // called when movement key pressed or released
  move(direction) {
    this.accel = direction
  }

  // called when turn key pressed or released
  turn(direction) {
    this.rotation = direction
  }
}
