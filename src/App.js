import React from 'react'
import DevTools from 'mobx-react-devtools'
import { observer } from 'mobx-react'
import GameShapeState from './GameShapeState'
import SequenceState from './SequenceState'
import GameShape from './components/GameShape'
import PuzzleControls from './components/PuzzleControls'
import './App.css'

function App() {
  const state = GameShapeState
  const sequence = SequenceState

  function onChangeTense(e) {
    state.starify(e.target.value)
  }

  return (
    <div className="canvas">
      <GameShape />
      <PuzzleControls sequence={sequence}/>
      <div className='controls'>
        <button onClick={state.decSides}>Remove Side</button>
        <button onClick={state.incSides}>Add Side</button>
        <br/>
        <button onClick={state.scaleDown}>Scale Down</button>
        <button onClick={state.scaleUp}>Scale Up</button>
        <br/>
        <button onClick={state.rotateCC}>Rotate Counter-clockwise</button>
        <button onClick={state.rotateC}>Rotate Clockwise</button>
        <br/>
        <button onClick={state.shiftWarm}>Color Warmer</button>
        <button onClick={state.shiftCool}>Color Cooler</button>
        <br/>
        <button onClick={state.decSkewX}>Skew X Negative</button>
        <button onClick={state.incSkewX}>Skew X Positive</button>
        <br/>
        <button onClick={state.decSkewY}>Skew Y Negative</button>
        <button onClick={state.incSkewY}>Skew Y Positive</button>
        <br/>
        <input type='number' onChange={onChangeTense} />
      </div>
      <DevTools />
    </div>
  )
}

export default observer(App)
