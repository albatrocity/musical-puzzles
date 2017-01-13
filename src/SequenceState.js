import GameShapeState from './GameShapeState'
import { extendObservable, computed, action } from 'mobx'
import { scaleSequential } from 'd3'
import { interpolateSpectral } from 'd3-scale-chromatic'

// const colorScale = scaleOrdinal(interpolatePiYG)
const colorScale = scaleSequential(interpolateSpectral)

class SequenceState {
  constructor() {
    extendObservable(this, {
      octave: 4,
      currentStep: 0,
      initialSequence: [
        '_  e',
        'D4  e',
        '_  e',
        '_  e',
        '_  e',
        '_  e',
        'F4  e',
        'G4  e',
      ],
      userSequence: [
        '_  e',
        '_  e',
        '_  e',
        '_  e',
        '_  e',
        '_  e',
        '_  e',
        '_  e',
      ],
      solutionSequence: [
        'C4  e',
        'D4  e',
        'A4  e',
        'C4  e',
        'G4  e',
        'G4  e',
        'F4  e',
        'G4  e',
      ],
      nextEmptyIndex: computed(function nextEmptyIndex() {
        return this.userSequence.indexOf(this.userSequence.find(n => (
          n.split(' ')[0] === '_'
        )))
      }),
      fullPalette: [
        { note: 'C', action: GameShapeState.incSides },
        { note: 'C#', action: GameShapeState.rotateC },
        { note: 'D', action: GameShapeState.decSides },
        { note: 'D#', action: GameShapeState.scaleUp },
        { note: 'E', action: GameShapeState.scaleDown },
        { note: 'F', action: GameShapeState.rotateCC },
        { note: 'F#', action: GameShapeState.shiftWarm },
        { note: 'G', action: GameShapeState.incSkewX },
        { note: 'G#', action: GameShapeState.decSkewX },
        { note: 'A', action: GameShapeState.incSkewY },
        { note: 'A#', action: GameShapeState.decSkewY },
        { note: 'B', action: GameShapeState.shiftCool },
      ],
      addNote: action.bound(function addNote(note, i) {
        const index = i || this.nextEmptyIndex
        const duration = this.solutionSequence[index].split(' ')[1]
        this.userSequence[index] = `${note.note}${this.octave} ${duration}`
        this.currentStep = index
      }),
    })
  }
}

export default new SequenceState()
