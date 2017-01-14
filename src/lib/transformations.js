export default {
  incSides: {
    transform: 'incSides',
    undo: 'decSides',
  },
  decSides: {
    transform: 'decSides',
    undo: 'incSides',
  },
  rotateC: {
    transform: 'rotateC',
    undo: 'rotateCC',
  },
  rotateCC: {
    transform: 'rotateCC',
    undo: 'rotateC',
  },
  scaleUp: {
    transform: 'scaleUp',
    undo: 'scaleDown',
  },
  scaleDown: {
    transform: 'scaleDown',
    undo: 'scaleUp',
  },
  shiftCool: {
    transform: 'shiftCool',
    undo: 'shiftWarm',
  },
  shiftWarm: {
    transform: 'shiftWarm',
    undo: 'shiftCool',
  },
  incSkewX: {
    transform: 'incSkewX',
    undo: 'decSkewX',
  },
  decSkewX: {
    transform: 'decSkewX',
    undo: 'incSkewX',
  },
  incSkewY: {
    transform: 'incSkewY',
    undo: 'decSkewY',
  },
  decSkewY: {
    transform: 'decSkewY',
    undo: 'incSkewY',
  },
}
