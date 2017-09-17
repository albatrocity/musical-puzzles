import React from 'react'
// import DevTools from 'mobx-react-devtools'
import { observer } from 'mobx-react'
import SequenceState from './SequenceState'
import GameShape from './components/GameShape'
import PuzzleControls from './components/PuzzleControls'
import SolutionShape from './components/SolutionShape'
import './App.css'

function App() {
  const sequence = SequenceState

  return (
    <div className="canvas">
      <svg viewBox="0 0 200 200" width="100%" height="100%">
        <GameShape animationDuration={sequence.stepDuration} />
        <SolutionShape />
      </svg>
      { sequence.hint ?
        (<blockquote>{ sequence.hint }</blockquote>)
        :
        null
      }
      <PuzzleControls sequence={sequence} />
    </div>
  )
}

export default observer(App)
