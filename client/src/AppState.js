import { get } from 'axios'
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
      currentPuzzle: null,
      fetchPuzzle: action.bound(function fetchPuzzle(id) {
        get('http://google.com').then((res) => {
          this.currentPuzzle = res
        })
      })
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
