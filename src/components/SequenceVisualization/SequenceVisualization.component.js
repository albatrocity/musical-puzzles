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
    spacers,
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

  const bars = spacers.reduce((mem, newBar, i) => {
    const stepBars = mem
    const barIndex = stepBars.length - 1
    stepBars[barIndex].push(sequence[i])
    if (newBar) {
      stepBars.push([])
    }
    return stepBars
  }, [[]])

  const notes = bars.map((bar, barI) => {
    const barNotes = bar.map((n, noteI) => {
      const color = colors[palette.map(s => s.note).indexOf(n.note)]
      const noteIndex = sequence.indexOf(n)
      const isActive = currentStep === noteIndex ||
        auditionedStep === noteIndex ||
        selectedStep === noteIndex
      const isSelected = selectedStep === noteIndex
      const className = `${isActive ? 'active' : ''} ${isSelected ? 'selected' : ''} sequencerNote duration-${n.duration}`
      return (
        <div className="userSequence-step" key={`note-${noteI}`}>
          <NoteControl
            className={className}
            note={n}
            handleClick={handleClick}
            handleMouseOver={onOver}
            handleMouseOut={onOut}
            showName={SequenceState.solved}
            color={color}
          />
        </div>
      )
    })
    return (
      <div className="sequenceBar" key={`bar-${barI}`}>
        {barNotes}
      </div>
    )
  })

  return (
    <div className="userSequence">
      <div className="debug">{ applied }</div>
      <br />
      { notes }
    </div>
  )
}

export default observer(SequenceVisualization)
