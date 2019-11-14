export default {
  hint: '...will tear us apart',
  barLength: 8,
  strategy: 'linear',
  notes: [
    { note: 'E', octave: 4, duration: 'w', given: true },
    { note: 'F#', octave: 4, duration: 'q', given: true },
    { note: 'G', octave: 4, duration: 'e' },
    { note: 'F#', octave: 4, duration: 'q', given: true },
    { note: 'E', octave: 4, duration: 'e', given: true },
    { note: 'D', octave: 4, duration: 'q', given: true },
    { note: 'B', octave: 3, duration: 'hqe' },
    { note: 'D', octave: 4, duration: 'e', given: true },
    { note: 'A', octave: 3, duration: 'w', given: true },
  ],
  palette: [
    { note: 'A', transform: 'rotateCC', octave: 3 },
    { note: 'B', transform: 'incSides', octave: 3 },
    { note: 'C#', transform: 'scaleUp', octave: 4 },
    { note: 'D', transform: 'rotateC', octave: 4 },
    { note: 'E', transform: 'incSkewX', octave: 4 },
    { note: 'F#', transform: 'incSkewY', octave: 4 },
    { note: 'G', transform: 'scaleUp', octave: 4 },
    { note: 'A', transform: 'incSkewX', octave: 4 },
  ],
  startShape: {
    sideCount: 5,
    radius: 50,
    xCenter: 100,
    yCenter: 100,
    colorVal: 4.5,
    rotation: 2,
    skewX: 0,
    skewY: 0,
    scale: 1,
    starPow: 1.3,
  },
}