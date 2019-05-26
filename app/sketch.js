import Car from './car.js'

export default function(p5) {
  let car, carSprite

  // p5 preload
  p5.preload = function() {
    carSprite = p5.loadImage('edm-sprite-x2.png')
  }

  // p5 init
  p5.setup = function() {
    p5.createCanvas(800, 800)
    p5.noStroke()
    p5.angleMode(p5.DEGREES)

    car = new Car(p5.width / 2, p5.height / 2, carSprite, p5)
  }

  // p5 draw loop
  p5.draw = function() {
    p5.background('#333')
    car.display()
  }
}
