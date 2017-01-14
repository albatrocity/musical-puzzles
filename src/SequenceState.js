import { extendObservable, computed, action } from 'mobx'
import GameShapeState from './GameShapeState'

class SequenceState {
  constructor() {
    extendObservable(this, {
      octave: 4,
      currentStep: 0,
      appliedTransforms: [],
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
        { note: '_', octave: 4, duration: 'e' },
        { note: '_', octave: 4, duration: 'e' },
        { note: '_', octave: 4, duration: 'e' },
        { note: '_', octave: 4, duration: 'e' },
        { note: '_', octave: 4, duration: 'e' },
        { note: '_', octave: 4, duration: 'e' },
        { note: '_', octave: 4, duration: 'e' },
        { note: '_', octave: 4, duration: 'e' },
      ],
      solutionSequence: [
        { note: 'C4', octave: 4, duration: 'e' },
        { note: 'D4', octave: 4, duration: 'e' },
        { note: 'A4', octave: 4, duration: 'e' },
        { note: 'C4', octave: 4, duration: 'e' },
        { note: 'G4', octave: 4, duration: 'e' },
        { note: 'G4', octave: 4, duration: 'e' },
        { note: 'F4', octave: 4, duration: 'e' },
        { note: 'G4', octave: 4, duration: 'e' },
      ],
      nextEmptyIndex: computed(function nextEmptyIndex() {
        return this.userSequence.indexOf(this.userSequence.find(n => (
          n.note === '_'
        )))
      }),
      fullPalette: [
        { note: 'C', transform: 'incSides' },
        { note: 'C#', transform: 'rotateC' },
        { note: 'D', transform: 'incSides' },
        { note: 'D#', transform: 'scaleUp' },
        { note: 'E', transform: 'scaleDown' },
        { note: 'F', transform: 'rotateCC' },
        { note: 'F#', transform: 'shiftWarm' },
        { note: 'G', transform: 'incSkewX' },
        { note: 'G#', transform: 'decSkewX' },
        { note: 'A', transform: 'incSkewY' },
        { note: 'A#', transform: 'decSkewY' },
        { note: 'B', transform: 'shiftCool' },
      ],
      addNote: action.bound(function addNote(note, i) {
        const index = i || this.nextEmptyIndex
        if (!this.solutionSequence[index]) { return }
        const duration = this.solutionSequence[index].duration
        this.userSequence[index] = {
          note: note.note,
          octave: this.octave,
          duration,
        }
        const iterations = index + 1
        this.appliedTransforms[index] = { transform: note.transform, iterations }

        Array.from(new Array(iterations)).forEach(() => {
          GameShapeState.transform(note.transform)
        })
        this.currentStep = index
      }),
      removeNote: action.bound(function removeNote(note) {
        const index = this.userSequence.indexOf(note)
        const transformation = this.appliedTransforms[index]
        if (!transformation) { return }
        Array.from(new Array(transformation.iterations)).forEach(() => {
          GameShapeState.undoTransform(transformation.transform)
        })
        const duration = this.solutionSequence[index].duration
        this.userSequence[index] = {
          note: '_',
          octave: this.octave,
          duration,
        }
        this.appliedTransforms[index] = false
      }),
    })
  }
}

export default new SequenceState()
