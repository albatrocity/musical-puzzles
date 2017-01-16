import React from 'react'
import { observer } from 'mobx-react'
import SequenceState from '../../SequenceState'
import NoteControl from '../NoteControl'

function SequenceVisualization(props) {
  const { sequence } = props
  const {
    currentStep,
    playNote,
    palette,
    colors,
    isPlaying,
    auditionedStep,
    selectedStep,
  } = SequenceState

  function handleClick(step) {
    if (step.note === '_') {
      SequenceState.selectedStep = sequence.indexOf(step)
    }
    SequenceState.removeNote(step)
  }
  function onOver(note) {
    if (isPlaying) return
    SequenceState.auditionedStep = sequence.indexOf(note)
    playNote(note)
  }
  function onOut() {
    SequenceState.auditionedStep = false
  }

  const applied = SequenceState.appliedTransforms.map((t, i) => {
    if (t) { return <div key={i}>{t.transform}: {t.iterations}</div> }
    return null
  })
  const notes = sequence.map((n, i) => {
    const color = colors[palette.map(s => s.note).indexOf(n.note)]
    const isActive = currentStep === i || auditionedStep === i || selectedStep === i
    const isSelected = selectedStep === i
    const className = `${isActive ? 'active' : ''} ${isSelected ? 'selected' : ''} sequencerNote`
    return (
      <NoteControl
        className={className}
        note={n}
        key={`note-${i}`}
        handleClick={handleClick}
        handleMouseOver={onOver}
        handleMouseOut={onOut}
        showName={SequenceState.solved}
        color={color}
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
