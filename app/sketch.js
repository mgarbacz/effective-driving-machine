import Car from './car.js'

export default function(p5) {
  let car, carSprite;

  // p5 preload
  p5.preload = function() {
    carSprite = p5.loadImage('edm-sprite-x2.png')
  }

  // p5 init
  p5.setup = function() {
    p5.createCanvas(800, 800)
    p5.noStroke()
    p5.angleMode(p5.DEGREES)

    car = new Car(10, 22, carSprite, p5)
  }

  // p5 draw loop
  p5.draw = function() {
    p5.background('#333')
    car.display()
  }

  // called on every key press
  p5.keyPressed = function() {
    car.handleKeyPress(p5.key)
  }

  // called on every key release
  p5.keyReleased = function() {
    car.handleKeyRelease(p5.key)
  }
}
