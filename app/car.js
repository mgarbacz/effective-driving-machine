import {W_KEY, A_KEY, S_KEY, D_KEY} from './keys.js'

export default class Car {
  constructor(x, y, sprite, p5) {
    this.x = x
    this.y = y
    this.accel = 0
    this.angle = 270
    this.rotation = 0
    this.sprite = sprite
    this.width = sprite.width
    this.height = sprite.height
    this.p5 = p5
    this.bounds = {}
    this.sensors = []

    this._calculateBounds()
    this._calculateSensors()
  }

  // called every draw loop
  display() {
    // Create new drawing state for car
    this.p5.push()

    this._handleMovementKeys()
    this._handleTurnKeys()
    this._calculateNewAngle()
    this._calculateNewPosition()
    this._calculateBounds()
    this._calculateSensors()
    this._drawCar()
    this._drawSensorLines()

    // End drawing state of car
    this.p5.pop()
  }

  // calculate the bounding box corners for car
  _calculateBounds() {
    const sinModX = this.p5.sin(this.angle) * this.height / 2
    const cosModX = this.p5.cos(this.angle) * this.width / 2
    const sinModY = this.p5.sin(this.angle) * this.width / 2
    const cosModY = this.p5.cos(this.angle) * this.height / 2

    this.bounds.topLx = this.x + sinModX - cosModX
    this.bounds.topLy = this.y - sinModY - cosModY
    this.bounds.topRx = this.x + sinModX + cosModX
    this.bounds.topRy = this.y + sinModY - cosModY
    this.bounds.botLx = this.x - sinModX - cosModX
    this.bounds.botLy = this.y - sinModY + cosModY
    this.bounds.botRx = this.x - sinModX + cosModX
    this.bounds.botRy = this.y + sinModY + cosModY
  }

  // create sensor lines
  _calculateSensors() {
    this.sensors = []

    // forward line
    this.sensors.push({
      x1: (this.bounds.botLx + this.bounds.botRx) / 2,
      y1: (this.bounds.botLy + this.bounds.botRy) / 2,
      x2: (this.bounds.botLx + this.bounds.botRx) / 2 + (500 * -this.p5.sin(this.angle)),
      y2: (this.bounds.botLy + this.bounds.botRy) / 2 + (500 * this.p5.cos(this.angle))
    })

    // front-right line
    this.sensors.push({ x1: 0, y1: this.height, x2: -500, y2: this.height })
    // front-right angle line
    this.sensors.push({ x1: 0, y1: this.height, x2: -500, y2: 500 })
    // front-left line
    this.sensors.push({ x1: this.width, y1: this.height, x2: 500, y2: this.height })
    // front-left angle line
    this.sensors.push({ x1: this.width, y1: this.height, x2: 500, y2: 500 })

    // backward line
    this.sensors.push({
      x1: (this.bounds.topLx + this.bounds.topRx) / 2,
      y1: (this.bounds.topLy + this.bounds.topRy) / 2,
      x2: (this.bounds.topLx + this.bounds.topRx) / 2 + (-500 * -this.p5.sin(this.angle)),
      y2: (this.bounds.topLy + this.bounds.topRy) / 2 + (-500 * this.p5.cos(this.angle))
    })

    // back-right angle line
    this.sensors.push({ x1: 0, y1: 0, x2: -500, y2: -500 })
    // back-left angle line
    this.sensors.push({ x1: this.width, y1: 0, x2: 500, y2: -500 })
  }

  // handle forward and backward movement keys
  _handleMovementKeys() {
    if (this.p5.keyIsDown(W_KEY) && this.p5.keyIsDown(S_KEY)) {
      this._move(0)
    } else if (this.p5.keyIsDown(W_KEY)) {
      this._move(2)
      // if not turning, slight bump in speed
      if (!(this.p5.keyIsDown(A_KEY)) && !(this.p5.keyIsDown(D_KEY))) {
        this._move(2.5)
      }
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
      this._turn(-1.5)
    } else if (this.p5.keyIsDown(D_KEY)) {
      this._turn(1.5)
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
    if (this.accel >= 0) {
      // moving forwards
      this.angle += this.rotation
    } else if (this.accel < 0) {
      // moving backwards, opposite turn
      this.angle -= this.rotation
    }

    // put the angle between -360 and 360 degrees
    if (this.accel) {
      this.angle = this.angle % 360
    }
  }

  // calcuate new position based on accel
  _calculateNewPosition() {
    this.x += -this.accel * this.p5.sin(this.angle)
    this.y += this.accel * this.p5.cos(this.angle)
  }

  // actually draw the car sprite
  _drawCar() {
    // Create new drawing state for car sprite
    this.p5.push()

    // Rotate is relative to origin, so we translate to car's position to
    // rotate relative to that instead
    this.p5.translate(this.x, this.y)
    this.p5.rotate(this.angle)

    // The image needs to be drawn from top left corner, but car x and y
    // coordinates are centered, so we adjust by half width and height
    this.p5.image(this.sprite, -this.width / 2, -this.height / 2)

    // End drawing state of car sprite
    this.p5.pop()
  }

  // draw sensor lines
  _drawSensorLines() {
    this.p5.stroke('#fafafa')
    this.p5.strokeWeight(1)
    for (let line of this.sensors) {
      this.p5.line(line.x1, line.y1, line.x2, line.y2)
    }
  }
}
