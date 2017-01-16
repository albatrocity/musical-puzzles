import React from 'react'
import { observer } from 'mobx-react'
import SequenceState from '../../SequenceState'
import NotePalette from '../NotePalette'
import SequenceVisualization from '../SequenceVisualization'

function PuzzleControls() {
  const sequence = SequenceState

  const solvedMarkup = (<h1>You solved it!!!!!</h1>)

  function handleAdd(note) {
    sequence.addNote(note)
  }
  function playSequence() {
    SequenceState.play()
  }

  return (
    <div className="puzzleControls">
      { sequence.solved ? solvedMarkup : null }
      <SequenceVisualization sequence={sequence.userSequence} />
      <button onClick={playSequence}>Play</button>
      <button onClick={SequenceState.resetPuzzle}>Reset</button>
      <NotePalette onAdd={handleAdd} />
    </div>
  )
}

export default observer(PuzzleControls)
