# Musical Puzzles
A puzzle engine and a few fill-in-the-blank melody puzzles to test if shape and color manipulation can aid in ear training. Each pitch added to the sequence causes a unique transformation to occur to the game shape. The goal is to match the shape, color, and size of the solution shape.

Puzzles are a javascript object with the following keys:

* `hint` - _String_ - displays above the game shape
* `barLength` - _Integer_ - number of base durations (quarter notes) per bar.
* `notes` - _Array[note]_ - array of notes: objects with the following properties:
  * `note` - _String_ - note letter
  * `octave` - _Integer_
  * `duration` - _String_ - note duration. See [tinymusic](https://github.com/kevincennis/TinyMusic#documentation) documentation
  * `given` - _Boolean_ - whether the note will given to the user in the puzzle (unchangeable) or whether it will be represented as a blank space
* `palette`: _Array[note]_ - array of notes that will be given to the player to use to solve the puzzle
* `startShape`: _Object_ - object describing the starting shape. See example

#### Example Puzzle

```js
export default {
  hint: 'Major!',
  barLength: 8,
  strategy: 'linear',
  notes: [
    { note: 'C', octave: 4, duration: 'q', given: true },
    { note: 'D', octave: 4, duration: 'q', given: true },
    { note: 'E', octave: 4, duration: 'q', given: true },
    { note: 'F', octave: 4, duration: 'q' },
    { note: 'G', octave: 4, duration: 'q' },
    { note: 'A', octave: 4, duration: 'q', given: true },
    { note: 'B', octave: 4, duration: 'q', given: true },
    { note: 'C', octave: 5, duration: 'q', given: true },
  ],
  palette: [
    { note: 'C', transform: 'rotateC', octave: 4 },
    { note: 'D', transform: 'incSides', octave: 4 },
    { note: 'E', transform: 'scaleUp', octave: 4 },
    { note: 'F', transform: 'shiftCool', octave: 4 },
    { note: 'G', transform: 'scaleUp', octave: 4 },
    { note: 'A', transform: 'rotateCC', octave: 4 },
    { note: 'B', transform: 'shiftWarm', octave: 4 },
    { note: 'C', transform: 'incStar', octave: 5 },
  ],
  startShape: {
    sideCount: 3,
    radius: 50,
    xCenter: 100,
    yCenter: 100,
    colorVal: 0.5,
    rotation: 0,
    skewX: 0,
    skewY: 0,
    scale: 1,
    starPow: 1,
  },
}
```
