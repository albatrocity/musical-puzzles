export default {
  hint: '...lies over the ocean!',
  barLength: 3,
  notes: [
    { note: 'D', octave: 4, duration: 'q', given: true },
    { note: 'B', octave: 4, duration: 'qe', given: true },
    { note: 'A', octave: 4, duration: 'e' },
    { note: 'G', octave: 4, duration: 'q' },
    { note: 'A', octave: 4, duration: 'q', given: true },
    { note: 'G', octave: 4, duration: 'q' },
    { note: 'E', octave: 4, duration: 'q' },
    { note: 'D', octave: 4, duration: 'q' },
    { note: 'B', octave: 3, duration: 'he', given: true },
  ],
  palette: [
    { note: 'B', transform: 'incSkewX', octave: 3 },
    { note: 'C', transform: 'incSkewY' },
    { note: 'D', transform: 'decSides' },
    { note: 'E', transform: 'scaleUp' },
    { note: 'F', transform: 'rotateC' },
    { note: 'G', transform: 'incSides' },
    { note: 'A', transform: 'shiftCool' },
    { note: 'B', transform: 'incSkewX', octave: 4 },
  ],
  startShape: {
    sideCount: 4,
    radius: 20,
    xCenter: 100,
    yCenter: 100,
    colorVal: 1,
    rotation: 0,
    skewX: 0,
    skewY: 0,
    scale: 1,
    starPow: 1,
  },
}