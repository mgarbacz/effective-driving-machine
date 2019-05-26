export default class Overlay {
  constructor(car, p5) {
    this.car = car
    this.p5 = p5
  }

  display() {
    this.p5.textSize(16)
    this.p5.text(`Mouse X: ${this.p5.mouseX}`, 10, 20)
    this.p5.text(`Mouse Y: ${this.p5.mouseY}`, 10, 40)
    this.p5.text(`Car X: ${this.car.x}`, 10, 60)
    this.p5.text(`Car Y: ${this.car.y}`, 10, 80)
  }
}
