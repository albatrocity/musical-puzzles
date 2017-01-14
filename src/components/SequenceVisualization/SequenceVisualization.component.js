import React from 'react'
import { observer } from 'mobx-react'
import SequenceState from '../../SequenceState'
import NoteControl from '../NoteControl'

function SequenceVisualization(props) {
  const { sequence } = props
  const { currentStep, playNote } = SequenceState

  function handleRemove(note) {
    SequenceState.removeNote(note)
  }
  function onOver(note) { playNote(note) }

  const applied = SequenceState.appliedTransforms.map((t, i) => {
    if (t) { return <div key={i}>{t.transform}: {t.iterations}</div>}
    return null
  })
  const notes = sequence.map((n, i) => {
    return (
      <NoteControl
        className={currentStep === i ? 'active sequencerNote' : 'sequencerNote'}
        note={n}
        key={`note-${i}`}
        handleClick={handleRemove}
        handleMouseOver={onOver}
      />
    )
  })

  return (
    <div>
      <div className="debug">{ applied }</div>
      <br />
      { notes }
    </div>
  )
}

export default observer(SequenceVisualization)
