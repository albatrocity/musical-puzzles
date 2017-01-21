import { extendObservable, computed, action, autorun } from 'mobx'
import { RouterStore } from 'mobx-router'
import SequenceState from './SequenceState'
import puzzles from './lib/puzzles'

class AppState {
  constructor() {
    this.router = new RouterStore()
    extendObservable(this, {
      currentPuzzleId: 0,
      nextPuzzle: action.bound(function nextPuzzle() {
        this.currentPuzzleId += 1
      }),
      currentPuzzle: computed(function currentPuzzle() {
        return puzzles[this.currentPuzzleId]
      }),
    })
  }
}

// const state = new AppState()

// autorun('loadSequence', () => {
//   if (state.currentPuzzleId !== false) {
//     SequenceState.load(state.currentPuzzle)
//   }
// })

export default AppState
