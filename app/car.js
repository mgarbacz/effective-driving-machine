export default class Car {
  constructor(x, y, sprite, p5) {
    this.x = x
    this.y = y
    this.sprite = sprite
    this.width = sprite.width
    this.height = sprite.height
    this.accel = p5.createVector(0, 0)

    this.p5 = p5
  }

  // called every draw loop
  display() {
    this.x += this.accel.x
    this.y += this.accel.y
    this.p5.image(this.sprite, this.x, this.y)
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
    this.accel.y = direction
  }

  // called when turn key pressed or released
  turn(direction) {
    this.accel.x = direction
  }
}
