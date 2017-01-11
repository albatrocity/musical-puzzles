import { extendObservable, computed } from 'mobx'
import { scaleSequential, scaleLog, scaleLinear, extent } from 'd3'
import { interpolateSpectral } from 'd3-scale-chromatic'

// const colorScale = scaleOrdinal(interpolatePiYG)
const colorScale = scaleSequential(interpolateSpectral)

console.log(colorScale(0.5))
class AppState {
  constructor() {
    this.incSides = this.incSides.bind(this)
    this.decSides = this.decSides.bind(this)
    this.scaleUp = this.scaleUp.bind(this)
    this.scaleDown = this.scaleDown.bind(this)
    this.scale = this.scale.bind(this)
    this.rotate = this.rotate.bind(this)
    this.rotateC = this.rotateC.bind(this)
    this.rotateCC = this.rotateCC.bind(this)
    this.shiftColor = this.shiftColor.bind(this)
    this.shiftCool = this.shiftCool.bind(this)
    this.shiftWarm = this.shiftWarm.bind(this)
    this.doSkewX = this.doSkewX.bind(this)
    this.doSkewY = this.doSkewY.bind(this)
    this.incSkewY = this.incSkewY.bind(this)
    this.decSkewY = this.decSkewY.bind(this)
    this.incSkewX = this.incSkewX.bind(this)
    this.decSkewX = this.decSkewX.bind(this)
    extendObservable(this, {
      sideCount: 3,
      radius: 50,
      xCenter: 500,
      yCenter: 500,
      colorVal: 0.5,
      fill: colorScale(0.3),
      rotation: 0,
      skewX: 0,
      skewY: 0,
      shapePoints: computed(function () {
        const angleIncrement = (2 * Math.PI) / this.sideCount
        let angle = this.rotation

        return Array.from(new Array(this.sideCount)).map(() => {
          const x = this.xCenter + (this.radius * Math.cos(angle))
          const y = this.yCenter + (this.radius * Math.sin(angle))
          angle += angleIncrement
          return { x, y }
        })
      }),
    })
  }
  setShape(points) {
    this.activeShapePoints = points
  }
  incSides() {
    this.sideCount += 1
  }
  decSides() {
    this.sideCount += -1
  }
  scale(x) {
    this.radius = this.radius * x
    // this.xCenter = this.xCenter * x
    // this.yCenter = this.yCenter * x
  }
  scaleUp() {
    this.scale(1.1)
  }
  scaleDown() {
    this.scale(0.9)
  }
  rotate(deg) {
    this.rotation = this.rotation + deg
  }
  rotateCC() {
    this.rotate(45 * (Math.PI / 180))
  }
  rotateC() {
    this.rotate(-45 * (Math.PI / 180))
  }
  shiftColor(inc) {
    this.colorVal = this.colorVal + inc
    this.fill = colorScale(this.colorVal)
  }
  shiftCool() {
    this.shiftColor(0.05)
  }
  shiftWarm() {
    this.shiftColor(-0.05)
  }
  doSkewX(inc) {
    this.skewX = this.skewX + inc
  }
  doSkewY(inc) {
    this.skewY = this.skewY + inc
  }
  incSkewY() {
    this.doSkewY(1)
  }
  decSkewY() {
    this.doSkewY(-1)
  }
  incSkewX() {
    this.doSkewX(1)
  }
  decSkewX() {
    this.doSkewX(-1)
  }
}

export default new AppState()
