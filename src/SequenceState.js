import { extendObservable, computed, action, autorun } from 'mobx'
import { scaleSequential } from 'd3'
import { interpolateSpectral } from 'd3-scale-chromatic'
import tinymusic from 'tinymusic'
import GameShapeState from './GameShapeState'
import SolutionShapeState from './SolutionShapeState'
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
      auditionedStep: false,
      context: window.AudioContext ? new AudioContext() : new window.webkitAudioContext(),
      currentTime: null,
      tempo: 120,
      barLength: 4,
      isPlaying: false,
      stepDuration: computed(() => 1), // maybe base animation speed on tempo
      solved: computed(function solved() {
        return this.correctCount === this.solutionSequence.length
      }),
      colors: computed(function colors() {
        const colorScale = scaleSequential(interpolateSpectral)
          .domain([0, this.palette.length - 1])
        return this.palette.map((n, i) => colorScale(i))
      }),
      hint: null,
      startShape: null,
      loadedSequence: null,
      load: action.bound(function loadSequence(sequence) {
        this.loadedSequence = sequence
        this.solutionSequence = sequence.notes.map((step) => {
          const newNote = step
          newNote.octave = step.octave
          return newNote
        })
        this.hint = sequence.hint
        this.barLength = sequence.barLength
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
        SolutionShapeState.reset(this.startShape)
        this.applySequence(this.solutionSequence, SolutionShapeState)
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
      strategy: computed(function strategy() {
        if (this.loadedSequence) {
          return this.loadedSequence.strategy || 'exponential'
        }
        return false
      }),
      spacers: computed(function spacers() {
        return this.solutionSequence.reduce((mem, s, i) => {
          const noteDur = mem[mem.length - 1].value + tinymusic.Note.getDuration(s.duration)
          const durations = mem
          if (noteDur >= this.barLength) {
            durations[i] = { isSpacer: true, value: 0 }
          } else {
            durations[i] = { isSpacer: false, value: noteDur }
          }
          return durations
        }, [{ isSpacer: false, value: 0 }]).map(x => x.isSpacer)
      }),
      correctCount: computed(function correctCount() {
        const user = this.userSequence.map(n => `${n.note}${n.octave}`)
        const solu = this.solutionSequence.map(n => `${n.note}${n.octave}`)
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
      applyStep: action.bound(function applyStep(i, sequence, shapeState) {
        if (i > sequence.length - 1) { return }
        const note = this.palette
          .find(n => (
            n.note === sequence[i].note &&
              (n.octave || this.octave) === (sequence[i].octave || this.octave)
          ))
        if (!note) { return }
        this.applyNote(note, i, shapeState)
      }),
      applySequence: action.bound(function applySequence(sequence, shapeState) {
        sequence.forEach(s => this.applyStep(sequence.indexOf(s), sequence, shapeState))
      }),
      applyNote: action.bound(function applyNote(note, index, shapeState) {
        let itBase = 0
        if (this.strategy === 'exponential') { itBase = index }
        const iterations = itBase + 1
        this.appliedTransforms[index] = { transform: note.transform, iterations }

        Array.from(new Array(iterations)).forEach(() => {
          shapeState.transform(note.transform)
        })
      }),
      addNote: action.bound(function addNote(note, i) {
        this.selectedStep = false
        this.auditionedStep = false
        const index = i || this.nextEmptyIndex
        if (!this.solutionSequence[index]) { return }
        const duration = this.solutionSequence[index].duration
        this.userSequence[index] = {
          note: note.note,
          octave: note.octave || this.octave,
          duration,
        }
        this.resetShapeToUserInput()
        this.playNote(note)
      }),
      unapplyNote: action.bound(function undoNoteTransform(note, index) {
        if (this.playing) { return }
        const transformation = this.appliedTransforms[index]
        if (!transformation) { return }
        Array.from(new Array(transformation.iterations)).forEach(() => {
          GameShapeState.undoTransform(transformation.transform)
        })
        this.appliedTransforms[index] = false
      }),
      removeNote: action.bound(function removeNote(note) {
        const index = this.userSequence.indexOf(note)
        if (this.solutionSequence[index] && this.solutionSequence[index].given) { return }
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
          octave: note.octave,
          duration,
        }
        this.resetShape()
        this.currentStep = index
        this.playNote(note, duration)
        this.applySequence(clone, GameShapeState)
      }),
      resetShapeToUserInput: action.bound(() => {
        if (this.playing) { return }
        this.resetShape()
        this.applySequence(this.userSequence, GameShapeState)
      }),
      resetPuzzle: action.bound(() => {
        GameShapeState.reset(this.startShape)
        this.resetTransforms()
        this.selectedStep = false
        this.auditionedStep = false
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
        if (this.isPlaying) return
        this.resetShape()
        this.animationDuration = this.stepDuration
        requestAnimFrame(this.getCurrentNote)
        this.playedSteps = []
        this.isPlaying = true
        this.sequencer.play()
        const state = this
        this.sequencer.osc.onended = () => {
          state.resetShapeToUserInput()
          state.isPlaying = false
        }
        this.currentStep = 0
        const currentTime = this.context.currentTime
        let trackedTime = currentTime
        this.noteTimes = this.sequencer.notes.map((n) => {
          trackedTime += n.duration / 2
          return trackedTime
        })
      }),
      stop: action.bound(function stop() {
        this.sequencer.stop()
        this.isPlaying = false
      }),
      getCurrentNote: action.bound(function getCurrentNote() {
        if (!this.isPlaying) return
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
        if (this.isPlaying) return
        const noteString = `${note.note}${note.octave || this.octave} ${duration}`
        this.sequencer.notes = []
        this.sequencer.push(noteString)
        this.sequencer.play()
      }),
      sequencer: computed(function sequencer() {
        const seq = new tinymusic.Sequence(this.context, this.tempo, this.userSequenceMusic)
        seq.loop = false
        seq.staccato = 0.3
        seq.gain.value = 0.7
        seq.createCustomWave([-0.8, 1, 0.8, 0.8, -0.8, -0.8, -1])
        return seq
      }),
    })
  }
}

const state = new SequenceState()

autorun('applySequenceAutorun', () => {
  if (state.currentStep !== false) {
    state.applyStep(state.currentStep, state.userSequence, GameShapeState)
  }
})

// autorun('playSolution', () => {
//   if (state.solved === true && isSolved !== state.solved) {
//     setTimeout(() => {
//       state.resetTransforms()
//       state.play()
//     }, 1000)
//   }
// })

export default state
