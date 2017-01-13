import { extendObservable, computed, action } from 'mobx'
import { scaleSequential } from 'd3'
import { interpolateSpectral } from 'd3-scale-chromatic'

// const colorScale = scaleOrdinal(interpolatePiYG)
const colorScale = scaleSequential(interpolateSpectral)

class AppState {
  constructor() {
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
      incSides: action.bound(function incSides() {
        this.sideCount += 1
      }),
      decSides: action.bound(function decSides() {
        this.sideCount += -1
      }),
      scale: action.bound(function scale(x) {
        this.xCenter = this.xCenter / x
        this.yCenter = this.yCenter / x
        this.radius = this.radius * x
        // this.radius = this.radius
      }),
      scaleUp: action.bound(function scaleUp() {
        this.scale(1.1)
      }),
      scaleDown: action.bound(function scale() {
        this.scale(0.9)
      }),
      rotate: action.bound(function rotate(deg) {
        this.rotation = this.rotation + deg
      }),
      rotateCC: action.bound(function rotateCC() {
        this.rotate(-45 * (Math.PI / 180))
      }),
      rotateC: action.bound(function rotateC() {
        this.rotate(45 * (Math.PI / 180))
      }),
      shiftColor: action.bound(function shiftColor(inc) {
        this.colorVal = this.colorVal + inc
        this.fill = colorScale(this.colorVal)
      }),
      shiftCool: action.bound(function shiftCool() {
        this.shiftColor(0.05)
      }),
      shiftWarm: action.bound(function shiftWarm() {
        this.shiftColor(-0.05)
      }),
      doSkewX: action.bound(function doSkewX(inc) {
        this.skewX = this.skewX + inc
      }),
      doSkewY: action.bound(function doSkewY(inc) {
        this.skewY = this.skewY + inc
      }),
      incSkewY: action.bound(function incSkewY() {
        this.doSkewY(1)
      }),
      decSkewY: action.bound(function decSkewY() {
        this.doSkewY(-1)
      }),
      incSkewX: action.bound(function incSkewX() {
        this.doSkewX(1)
      }),
      decSkewX: action.bound(function decSkewX() {
        this.doSkewX(-1)
      }),
      shapePoints: computed(function shapePoints() {
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
}

export default new AppState()
