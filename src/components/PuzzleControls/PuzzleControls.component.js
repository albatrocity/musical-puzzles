import React from 'react'
import { observer } from 'mobx-react'
import SequenceState from '../../SequenceState'
import NotePalette from '../NotePalette'
import SequenceVisualization from '../SequenceVisualization'
import AudioPlayer from '../AudioPlayer'

function PuzzleControls() {
  const sequence = SequenceState

  function handleAdd(note) {
    sequence.addNote(note)
  }

  return (
    <div className="puzzleControlz">
      <SequenceVisualization sequence={sequence.userSequence} />
      <AudioPlayer />
      <NotePalette onAdd={handleAdd} />
    </div>
  )
}

export default observer(PuzzleControls)
