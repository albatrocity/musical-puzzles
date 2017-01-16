import React from 'react'
import { observer } from 'mobx-react'
import SequenceState from '../../SequenceState'
import NoteControl from '../NoteControl'

function NotePalette(props) {
  const state = SequenceState
  const { onAdd } = props
  const {
    palette,
    resetShapeToUserInput,
    auditionNote,
    isPlaying,
    colors,
    currentStep,
    auditionedStep,
    userSequence,
  } = state
  function handleAdd(note) { onAdd(note, state.selectedStep) }
  function onOver(note) {
    if (!isPlaying) {
      auditionNote(note, state.selectedStep || state.nextEmptyIndex)
    }
  }
  function onOut(note) {
    if (!isPlaying) {
      resetShapeToUserInput(note, state.nextEmptyIndex)
    }
  }

  const currentNote = (
    (currentStep > -1
      && currentStep < userSequence.length
      && userSequence[currentStep]
      && userSequence[currentStep].note) ||
    (auditionedStep > -1
      && auditionedStep < userSequence.length
      && userSequence[auditionedStep]
      && userSequence[auditionedStep].note)
  )
  const paletteEls = palette.map((n, i) => {
    const isActive = currentNote === n.note
    return (
      <NoteControl
        className={isActive ? 'active sequencerNote' : 'sequencerNote'}
        handleMouseOver={onOver}
        handleMouseOut={onOut}
        handleClick={handleAdd}
        key={`shape-${n.note}`}
        note={n}
        disabled={state.isPlaying}
        color={colors[i]}
        showName={state.solved}
      />
    )
  })
  return (
    <div className="notePalette">
      { paletteEls }
    </div>
  )
}

NotePalette.propTypes = {
  onAdd: React.PropTypes.func,
}

export default observer(NotePalette)
