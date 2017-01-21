import React from 'react'
import { observer, inject } from 'mobx-react'
import SequenceState from '../../SequenceState'
import AppState from '../../AppState'
import PuzzleControls from '../PuzzleControls'
import GameShape from '../GameShape'
import SolutionShape from '../SolutionShape'

function Puzzle(props) {
  const { store } = props
  const { router: { params } } = store
  console.log(params.id)
  AppState.currentPuzzleId = params.id
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

export default inject('store')(observer(Puzzle))
