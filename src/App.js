import React from 'react'
import DevTools from 'mobx-react-devtools'
import { observer } from 'mobx-react'
import GameShapeState from './GameShapeState'
import SequenceState from './SequenceState'
import GameShape from './components/GameShape'
import PuzzleControls from './components/PuzzleControls'
import exampleSequence from './lib/exampleSequence'
import './App.css'

function App() {
  const state = GameShapeState
  const sequence = SequenceState

  sequence.load(exampleSequence)

  function onChangeTense(e) {
    state.starify(e.target.value)
  }

  return (
    <div className="canvas">
      <GameShape animationDuration={sequence.stepDuration} />
      { sequence.hint ?
        (<blockquote>{ sequence.hint }</blockquote>)
        :
        null
      }
      <PuzzleControls sequence={sequence} />
      <DevTools />
    </div>
  )
}

export default observer(App)
