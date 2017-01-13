import React from 'react'
import { observer } from 'mobx-react'
import GameShapeState from '../../GameShapeState'
import SequenceState from '../../SequenceState'
import NotePalette from '../NotePalette'
import SequenceVisualization from '../SequenceVisualization'

function PuzzleControls() {
  const state = GameShapeState
  const sequence = SequenceState

  const { shapePoints, radius, fill } = state

  function handleAdd(note) {
    sequence.addNote(note)
  }

  return (
    <div className='puzzleControlz'>
      <SequenceVisualization sequence={sequence.userSequence} />
      <NotePalette onAdd={handleAdd} />
    </div>
  )
}

export default observer(PuzzleControls)
