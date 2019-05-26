export default class Racetrack {
  constructor(p5) {
    this.p5 = p5
  }

  display() {
    // track settings
    this.p5.noFill()
    this.p5.stroke('#333')
    this.p5.strokeWeight(80)

    // draw track lines
    this.p5.line(200, 100, 1100, 100)
    this.p5.bezier(400, 500, 300, 300, 1000, 400, 1100, 100)
    this.p5.curve(600, 200, 300, 700, 900, 700, 400, 400)
    this.p5.curve(0, 800, 900, 700, 400, 500, 0, 0)
    this.p5.curve(800, 0, 200, 100, 300, 700, 800, 800)

    // draw start/finish line
    this.p5.stroke('#fafafa')
    this.p5.strokeWeight(10)
    this.p5.line(600, 50, 600, 150)
  }
}
