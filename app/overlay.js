export default class Overlay {
  constructor(car, p5) {
    this.x = 950
    this.y = 400
    this.car = car
    this.p5 = p5
  }

  display() {
    this.p5.textSize(16)
    this.p5.text(`Mouse X: ${this.p5.mouseX}`, this.x, this.y)
    this.p5.text(`Mouse Y: ${this.p5.mouseY}`, this.x, this.y + 20)
    this.p5.text(`Car X: ${this.car.x}`, this.x, this.y + 40)
    this.p5.text(`Car Y: ${this.car.y}`, this.x, this.y + 60)
  }
}
