import React from 'react'
import { observer } from 'mobx-react'
import SequenceState from '../../SequenceState'
import NoteControl from '../NoteControl'

function SequenceVisualization(props) {
  const { sequence } = props
  const { currentStep, currentTime } = SequenceState

  function handleRemove(note) {
    SequenceState.removeNote(note)
  }

  const notes = sequence.map((n, i) => {
    return (
      <NoteControl
        className={currentStep === i ? 'active sequencerNote' : 'sequencerNote'}
        note={n}
        key={`note-${i}`}
        handleClick={handleRemove}
      />
    )
  })

  return (
    <div>
      { currentStep }
      { currentTime }
      <br />
      { notes }
    </div>
  )
}

export default observer(SequenceVisualization)
