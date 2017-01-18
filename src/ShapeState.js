import { extendObservable, computed, action } from 'mobx'
import { scaleSequential } from 'd3'
import { interpolateSpectral } from 'd3-scale-chromatic'
import transformations from './lib/transformations'
import SequenceState from './SequenceState'

const defaultShape = {
  sideCount: 4,
  radius: 50,
  xCenter: 100,
  yCenter: 100,
  colorVal: 0.5,
  rotation: 0,
  skewX: 0,
  skewY: 0,
  scale: 1,
  starPow: 1,
}

class ShapeState {
  constructor() {
    extendObservable(this, {
      sideCount: defaultShape.sideCount,
      radius: defaultShape.radius,
      xCenter: defaultShape.xCenter,
      yCenter: defaultShape.yCenter,
      colorVal: defaultShape.colorVal,
      colorScale: computed(() => (
        scaleSequential(interpolateSpectral).domain([0, SequenceState.palette.length - 1])
      )),
      fill: computed(function colorOutput() {
        return this.colorScale(this.colorVal)
      }),
      stroke: computed(function colorOutput() {
        return this.colorScale(this.colorVal)
      }),
      rotation: defaultShape.rotation,
      skewX: defaultShape.skewX,
      skewY: defaultShape.skewY,
      scale: defaultShape.scale,
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
        this.starPow += val
      }),
      incStar: action.bound(function incStar() {
        this.starify(0.1)
      }),
      decStar: action.bound(function decStar() {
        this.starify(-0.1)
      }),
      transform: action.bound(function transform(act) {
        const actionName = transformations[act].transform
        this[actionName]()
      }),
      undoTransform: action.bound(function undoTransform(act) {
        const actionName = transformations[act].undo
        this[actionName]()
      }),
      reset: action.bound(function reset(shape = defaultShape) {
        const attrs = Object.assign({}, defaultShape, shape)
        Object.keys(attrs).forEach((k) => { this[k] = attrs[k] })
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

export default ShapeState
