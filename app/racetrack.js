export default class Racetrack {
  constructor(p5) {
    this.p5 = p5
  }

  display() {
    this.p5.noFill()
    this.p5.stroke('#333')
    this.p5.strokeWeight(80)
    this.p5.curve(600, 600, 300, 100, 900, 100, 400, 400)
    this.p5.curve(0, 0, 900, 100, 400, 300, 0, 800)
    this.p5.bezier(400, 300, 300, 500, 1000, 400, 1100, 700)
    this.p5.line(1100, 700, 200, 700)
    this.p5.curve(800, 800, 200, 700, 300, 100, 800, 0)
  }
}
