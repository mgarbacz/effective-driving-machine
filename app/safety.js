export default class Safety {
  constructor(trackLineOuter, trackLineInner) {
    this.lineOuter = trackLineOuter
    this.lineInner = trackLineInner
    this.offRoad = false
  }

  detectCollision(car) {
    this.offRoad = this._checkAllCarSides(car)
    this.sensorCollisions = []
    this._checkAllSensors(car.sensors)
  }

  _checkAllCarSides(car) {
    let offRoad = this._checkCarSide(
      car.bounds.topLx, car.bounds.topLy, car.bounds.botLx, car.bounds.botLy)
    if (offRoad) return true
    offRoad = this._checkCarSide(
      car.bounds.topRx, car.bounds.topRy, car.bounds.botRx, car.bounds.botRy)
    if (offRoad) return true
    offRoad = this._checkCarSide(
      car.bounds.topLx, car.bounds.topLy, car.bounds.topRx, car.bounds.TopRy)
    if (offRoad) return true
    offRoad = this._checkCarSide(
      car.bounds.botRx, car.bounds.botRy, car.bounds.botLx, car.bounds.botLy)
    if (offRoad) return true
    return false
  }

  _checkCarSide(carX1, carY1, carX2, carY2) {
    let offRoad = this._checkAllTrackLines(carX1, carY1, carX2, carY2, this.lineOuter)
    if (offRoad) return true
    offRoad = this._checkAllTrackLines(carX1, carY1, carX2, carY2, this.lineInner)
    if (offRoad) return true
    return false
  }

  _checkAllTrackLines(carX1, carY1, carX2, carY2, side) {
    for (let i = 0; i < side.length; i++) {
      let j = (i + 1) % side.length
      let offRoad = this._willIntersect(carX1, carY1, carX2, carY2,
        side[i].x, side[i].y,
        side[j].x, side[j].y)
      if (offRoad) return true
    }
    return false
  }

  _checkAllSensors(sensors) {
    for (let sensor of sensors) {
      this._checkAllTrackLinesSensor(sensor.x1, sensor.y1, sensor.x2, sensor.y2, this.lineOuter)
      this._checkAllTrackLinesSensor(sensor.x1, sensor.y1, sensor.x2, sensor.y2, this.lineInner)
    }
  }

  _checkAllTrackLinesSensor(sX1, sY1, sX2, sY2, side) {
    for (let i = 0; i < side.length; i++) {
      let j = (i + 1) % side.length
      this._willIntersect(sX1, sY1, sX2, sY2,
        side[i].x, side[i].y,
        side[j].x, side[j].y)
    }
  }

  _willIntersect(x1, y1, x2, y2, x3, y3, x4, y4) {
    let uA = ((x4-x3) * (y1-y3) - (y4-y3) * (x1-x3)) / ((y4-y3) * (x2-x1) - (x4-x3) * (y2-y1))

    let uB = ((x2-x1) * (y1-y3) - (y2-y1) * (x1-x3)) / ((y4-y3) * (x2-x1) - (x4-x3) * (y2-y1))

    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
      let iX = x1 + (uA * (x2-x1))
      let iY = y1 + (uA * (y2-y1))
      this.sensorCollisions.push({x: iX, y: iY })

      return true
    }
    return false
  }
}
