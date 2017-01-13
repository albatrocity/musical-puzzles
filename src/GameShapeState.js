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
      scale: 1,
      starPow: 1,
      incSides: action.bound(function incSides() {
        this.sideCount += 1
      }),
      decSides: action.bound(function decSides() {
        this.sideCount += -1
      }),
      scaleUp: action.bound(function scaleUp() {
        this.scale += 0.2
      }),
      scaleDown: action.bound(function scale() {
        this.scale += -0.2
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
        this.doSkewY(0.5)
      }),
      decSkewY: action.bound(function decSkewY() {
        this.doSkewY(-0.5)
      }),
      incSkewX: action.bound(function incSkewX() {
        this.doSkewX(0.5)
      }),
      decSkewX: action.bound(function decSkewX() {
        this.doSkewX(-0.5)
      }),
      starify: action.bound(function funkify(val) {
        this.starPow = val
      }),
      shapePoints: computed(function shapePoints() {
        const angleIncrement = (2 * Math.PI) / this.sideCount
        const { scale, radius, xCenter, yCenter, starPow, skewX, skewY } = this
        let angle = this.rotation

        return Array.from(new Array(this.sideCount)).map((v, i) => {
          const modRadius = i % 2 === 0 ? (radius / starPow) : radius
          const x = (xCenter) + ((scale * modRadius) * Math.cos(angle + skewX))
          const y = (yCenter) + ((scale * modRadius) * Math.sin(angle + skewY))
          angle += angleIncrement
          return { x, y }
        })
      }),
    })
  }
}

export default new AppState()
