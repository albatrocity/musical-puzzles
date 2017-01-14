import { extendObservable, computed, action, autorun } from 'mobx'
import tinymusic from 'tinymusic'
import GameShapeState from './GameShapeState'
import defaultPalette from './lib/defaultPalette'

const blankNote = '_'

const requestAnimFrame = (function requestAnim() {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function fallbackAnim(callback) {
      window.setTimeout(callback, 1000 / 60)
    }
}())

class SequenceState {
  constructor() {
    extendObservable(this, {
      octave: 4,
      currentStep: false,
      context: window.AudioContext ? new AudioContext() : new window.webkitAudioContext(),
      currentTime: null,
      tempo: 120,
      isPlaying: false,
      stepDuration: computed(() => 1), // maybe base animation speed on tempo
      solved: computed(function solved() {
        return this.correctCount === this.solutionSequence.length
      }),
      hint: null,
      startShape: null,
      loadedSequence: null,
      load: action.bound(function loadSequence(sequence) {
        this.loadedSequence = sequence
        this.solutionSequence = sequence.notes
        this.hint = sequence.hint
        if (sequence.palette) {
          this.palette = sequence.palette
        } else {
          this.palette = defaultPalette
        }
        if (sequence.startShape) {
          this.startShape = sequence.startShape
        } else {
          this.startShape = null
        }
        GameShapeState.reset(this.startShape)
        this.resetTransforms()
        this.userSequence = sequence.notes.map((n) => {
          const newNote = n
          if (newNote.given) { return newNote }
          newNote.note = blankNote
          return newNote
        })
        this.resetShapeToUserInput()
      }),
      appliedTransforms: [],
      solutionSequence: [],
      playedSteps: [],
      noteTimes: [],
      userSequence: [],
      correctCount: computed(function correctCount() {
        const user = this.userSequence.map(n => n.note)
        const solu = this.solutionSequence.map(n => n.note)
        return user.reduce((mem, n, i) => {
          if (n === solu[i]) { return mem + 1 }
          return mem
        }, 0)
      }),
      userSequenceMusic: computed(function userSequenceMusic() {
        return this.userSequence.map(n => `${n.note}${n.octave} ${n.duration}`)
      }),
      nextEmptyIndex: computed(function nextEmptyIndex() {
        return this.userSequence.indexOf(this.userSequence.find(n => (
          n.note === blankNote
        )))
      }),
      palette: [],
      applyStep: action.bound(function applyStep(i, sequence) {
        if (i > sequence.length - 1) { return }
        const note = this.palette
          .find(n => n.note === sequence[i].note)
        if (!note) { return }
        this.applyNote(note, i)
      }),
      applySequence: action.bound(function applySequence(sequence) {
        sequence.forEach(s => this.applyStep(sequence.indexOf(s), sequence))
      }),
      applyNote: action.bound(function applyNote(note, index) {
        const iterations = index + 1
        this.appliedTransforms[index] = { transform: note.transform, iterations }

        Array.from(new Array(iterations)).forEach(() => {
          GameShapeState.transform(note.transform)
        })
      }),
      addNote: action.bound(function addNote(note, i) {
        const index = i || this.nextEmptyIndex
        if (!this.solutionSequence[index]) { return }
        const duration = this.solutionSequence[index].duration
        this.userSequence[index] = {
          note: note.note,
          octave: this.octave,
          duration,
        }
        this.resetShapeToUserInput()
        this.playNote(note)
      }),
      unapplyNote: action.bound(function undoNoteTransform(note, index) {
        const transformation = this.appliedTransforms[index]
        if (!transformation) { return }
        Array.from(new Array(transformation.iterations)).forEach(() => {
          GameShapeState.undoTransform(transformation.transform)
        })
        this.appliedTransforms[index] = false
      }),
      removeNote: action.bound(function removeNote(note) {
        const index = this.userSequence.indexOf(note)
        if (this.solutionSequence[index].given) { return }
        const duration = this.solutionSequence[index].duration
        this.userSequence[index] = {
          note: blankNote,
          octave: this.octave,
          duration,
        }
        this.unapplyNote(note, index)
      }),
      auditionNote: action.bound(function auditionNote(note, index) {
        if (this.isPlaying) { return }
        const clone = this.userSequence.slice()
        if (!this.solutionSequence[index]) { return }
        const duration = this.solutionSequence[index].duration
        clone[index] = {
          note: note.note,
          octave: this.octave,
          duration,
        }
        this.resetShape()
        this.currentStep = index
        this.playNote(note, duration)
        this.applySequence(clone)
      }),
      resetShapeToUserInput: action.bound(() => {
        this.resetShape()
        // this.isPlaying = false
        this.applySequence(this.userSequence)
      }),
      resetPuzzle: action.bound(() => {
        GameShapeState.reset(this.startShape)
        this.resetTransforms()
        this.userSequence = this.loadedSequence.notes.map((n) => {
          const newNote = n
          if (newNote.given) { return newNote }
          newNote.note = blankNote
          return newNote
        })
        this.resetShapeToUserInput()
      }),
      resetShape: action.bound(() => {
        this.currentStep = false
        this.resetTransforms()
        GameShapeState.reset(this.startShape)
      }),
      resetTransforms: action.bound(() => {
        this.appliedTransforms = Array.from(new Array(this.solutionSequence.length))
      }),
      play: action.bound(function play() {
        this.resetShape()
        this.animationDuration = this.stepDuration
        requestAnimFrame(this.getCurrentNote)
        this.playedSteps = []
        this.isPlaying = true
        this.sequencer.play()
        this.sequencer.osc.onended = () => {
          this.resetShapeToUserInput()
          this.isPlaying = false
        }
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
      playNote: action.bound(function playNote(note, duration = 'q') {
        const noteString = `${note.note}${this.octave} ${duration}`
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

const state = new SequenceState()

let isSolved = false
autorun('applySequenceAutorun', () => {
  if (state.currentStep !== false) { state.applyStep(state.currentStep, state.userSequence) }
})

autorun('playSolution', () => {
  if (state.solved === true && isSolved !== state.solved) {
    state.resetTransforms()
    state.play()
  }
})

export default state
