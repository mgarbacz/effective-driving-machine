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
    this.angle += this.rotation
    this.x += -this.accel * this.p5.sin(this.angle)
    this.y += this.accel * this.p5.cos(this.angle)

    this.p5.translate(this.x + (this.width / 2), this.y + (this.height / 2))
    this.p5.rotate(this.angle)
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
