import Racetrack from './racetrack.js'
import Car from './car.js'
import Safety from './safety.js'
import Overlay from './overlay.js'

export default function(p5) {
  let racetrack, car, carSprite, safety, overlay

  // p5 preload
  p5.preload = function() {
    carSprite = p5.loadImage('edm-sprite-x2.png')
  }

  // p5 init
  p5.setup = function() {
    p5.createCanvas(1200, 800)
    p5.noStroke()
    p5.angleMode(p5.DEGREES)

    racetrack = new Racetrack(p5)
    car = new Car(550, 100, carSprite, p5)
    safety = new Safety(racetrack.trackLineOuter, racetrack.trackLineInner)
    overlay = new Overlay(car, safety, p5)
  }

  // p5 draw loop
  p5.draw = function() {
    p5.background('#335533')
    racetrack.display()
    car.display()
    safety.detectCollision(car)

    // TODO better termination
    if (safety.offRoad) {
      p5.noLoop()
      window.setTimeout(function() {
        p5.setup()
        p5.loop()
      }, 2000)
    }
    overlay.display()
  }
}
