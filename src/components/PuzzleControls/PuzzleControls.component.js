import React from 'react'
import { observer } from 'mobx-react'
import SequenceState from '../../SequenceState'
import AppState from '../../AppState'
import NotePalette from '../NotePalette'
import SequenceVisualization from '../SequenceVisualization'

function PuzzleControls() {
  const sequence = SequenceState

  function nextPuzzle() {
    AppState.nextPuzzle()
  }

  function handleAdd(note, i) {
    sequence.addNote(note, i)
  }
  function playSequence() {
    SequenceState.play()
  }
  function stopSequence() {
    SequenceState.stop()
  }

  const solvedMarkup = (
    <div>
      <h1>You solved it!!!!!</h1>
      <button onClick={nextPuzzle}>Next Puzzle</button>
    </div>
  )

  return (
    <div className="puzzleControls">
      { sequence.solved ? solvedMarkup : null }
      <SequenceVisualization sequence={sequence.userSequence} />
      {
        sequence.isPlaying ?
          <button onClick={stopSequence}>Stop</button> :
          <button onClick={playSequence}>Play</button>
      }
      <button onClick={SequenceState.resetPuzzle}>Reset</button>
      <NotePalette onAdd={handleAdd} />
    </div>
  )
}

export default observer(PuzzleControls)
