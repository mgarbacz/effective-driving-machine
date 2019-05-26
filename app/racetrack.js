export default class Racetrack {
  constructor(p5) {
    this.p5 = p5
  }

  display() {
    // Create new drawing state for racetrack
    this.p5.push()

    // track settings
    this.p5.fill('#333')

    // draw track
    this.p5.beginShape()
    for (let vertex of trackLineOuter) {
      this.p5.vertex(vertex.x, vertex.y)
    }

    this.p5.beginContour()
    for (let vertex of trackLineInner) {
      this.p5.vertex(vertex.x, vertex.y)
    }

    this.p5.endContour()
    this.p5.endShape(this.p5.CLOSE)

    // draw start/finish line
    this.p5.stroke('#fafafa')
    this.p5.strokeWeight(10)
    this.p5.line(600, 50, 600, 150)

    // End drawing state of racetrack
    this.p5.pop()
  }
}

const trackLineOuter = [
  { x:  200, y:  50 },
  { x: 1100, y:  50 },
  { x: 1150, y: 100 },
  { x: 1050, y: 275 },
  { x:  550, y: 400 },
  { x:  500, y: 450 },
  { x:  600, y: 500 },
  { x:  850, y: 500 },
  { x:  1000, y: 600 },
  { x:  900, y: 725 },
  { x:  600, y: 775 },
  { x:  300, y: 725 },
  { x:  100, y: 400 },
  { x:  100, y: 150 }
]
const trackLineInner = [
  { x:  200, y: 200 },
  { x:  200, y: 350 },
  { x:  350, y: 625 },
  { x:  600, y: 675 },
  { x:  850, y: 625 },
  { x:  500, y: 600 },
  { x:  350, y: 450 },
  { x:  450, y: 300 },
  { x:  950, y: 200 },
  { x: 1010, y: 160 },
  { x: 1000, y: 150 },
  { x:  250, y: 150 }
]
