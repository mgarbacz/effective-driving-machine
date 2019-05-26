import {W_KEY, A_KEY, S_KEY, D_KEY} from './keys.js'

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
    this._handleMovementKeys()
    this._handleTurnKeys()
    this._calculateNewAngle()
    this._calculateNewPosition()
    this._translate()
    this._drawCar()
  }

  // handle forward and backward movement keys
  _handleMovementKeys() {
    if (this.p5.keyIsDown(W_KEY) && this.p5.keyIsDown(S_KEY)) {
      this._move(0)
    } else if (this.p5.keyIsDown(W_KEY)) {
      this._move(1)
    } else if (this.p5.keyIsDown(S_KEY)) {
      this._move(-1)
    } else {
      this._move(0)
    }
  }

  // handle left and right turn keys
  _handleTurnKeys() {
    if (this.p5.keyIsDown(A_KEY) && this.p5.keyIsDown(D_KEY)) {
      this._turn(0)
    } else if (this.p5.keyIsDown(A_KEY)) {
      this._turn(-1)
    } else if (this.p5.keyIsDown(D_KEY)) {
      this._turn(1)
    } else {
      this._turn(0)
    }
  }

  // called when movement key pressed or released
  _move(direction) {
    this.accel = direction
  }

  // called when turn key pressed or released
  _turn(direction) {
    this.rotation = direction
  }

  // calculate new angle, we only turn if moving
  _calculateNewAngle() {
    if (this.accel > 0) {
      // moving forwards
      this.angle += this.rotation
    } else if (this.accel < 0) {
      // moving backwards, opposite turn
      this.angle -= this.rotation
    }
  }

  // calcuate new position based on accel
  _calculateNewPosition() {
    this.x += -this.accel * this.p5.sin(this.angle)
    this.y += this.accel * this.p5.cos(this.angle)
  }

  // translate to new position and rotation
  // Note: top left corner of car is always rotate point
  _translate() {
    this.p5.translate(this.x, this.y)
    this.p5.rotate(this.angle)

    // adjust car to center of its location based on sprite size
    // this is done after the rotation so that rotation is centered on car
    // and not on the top left corner of the car
    this.p5.translate(-this.width / 2, -this.height / 2)
  }

  // actually draw the car sprite
  _drawCar() {
    this.p5.image(this.sprite, 0, 0)
  }
}
