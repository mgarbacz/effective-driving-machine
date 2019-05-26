export default class Car {
  constructor(x, y, sprite, p5) {
    this.x = x
    this.y = y
    this.sprite = sprite
    this.p5 = p5
  }

  // called every draw loop
  display() {
    this.p5.image(this.sprite, this.x, this.y)
  }
}
