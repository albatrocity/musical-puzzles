import { extendObservable, computed, action } from 'mobx'
import tinymusic from 'tinymusic'
import GameShapeState from './GameShapeState'

const blankNote = '_'

const requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60)
    }
}())

class SequenceState {
  constructor() {
    extendObservable(this, {
      octave: 4,
      currentStep: 0,
      context: window.AudioContext ? new AudioContext() : new window.webkitAudioContext(),
      currentTime: null,
      tempo: 120,
      load: action.bound(function loadSequence(notes) {
        this.solutionSequence = notes
        this.appliedTransforms = Array.from(new Array(notes.length))
        this.userSequence = notes.map((n) => {
          const newNote = n
          if (newNote.given) { return newNote }
          newNote.note = blankNote
          return newNote
        })
      }),
      appliedTransforms: [],
      solutionSequence: [],
      playedSteps: [],
      noteTimes: [],
      userSequence: [],
      userSequenceMusic: computed(function userSequenceMusic() {
        return this.userSequence.map(n => `${n.note}${n.octave} ${n.duration}`)
      }),
      nextEmptyIndex: computed(function nextEmptyIndex() {
        return this.userSequence.indexOf(this.userSequence.find(n => (
          n.note === blankNote
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
        this.playNote(note)
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
          note: blankNote,
          octave: this.octave,
          duration,
        }
        this.appliedTransforms[index] = false
      }),
      resetShape: action.bound(() => {
        console.log('reset shape!')
      }),
      play: action.bound(function play() {
        requestAnimFrame(this.getCurrentNote)
        this.playedSteps = []
        this.sequencer.play()
        this.sequencer.osc.onended = this.resetShape
        this.currentStep = 0
        const currentTime = this.context.currentTime
        let trackedTime = currentTime
        this.noteTimes = this.sequencer.notes.map((n) => {
          trackedTime += n.duration / 2
          return trackedTime
        })
      }),
      getCurrentNote: action.bound(function getCurrentNote() {
        const currentTime = this.context.currentTime
        this.noteTimes.forEach((time, i) => {
          if (time < currentTime) {
            if (this.playedSteps.indexOf(i) > -1) { return }
            this.playedSteps.push(i)
            this.currentStep = i + 1
          }
        })
        if (currentTime > this.noteTimes[this.noteTimes.length - 1]) { return }
        requestAnimFrame(this.getCurrentNote)
      }),
      playNote: action.bound(function playNote(note) {
        const noteString = `${note.note}${this.octave} q`
        this.sequencer.notes = []
        this.sequencer.push(noteString)
        this.sequencer.play()
      }),
      sequencer: computed(function sequencer() {
        const seq = new tinymusic.Sequence(this.context, this.tempo, this.userSequenceMusic)
        seq.loop = false
        seq.staccato = 0.5
        return seq
      }),
    })
  }
}

export default new SequenceState()
