import React from 'react'
import { observer } from 'mobx-react'
import SequenceState from '../../SequenceState'
import NoteControl from '../NoteControl'

function NotePalette(props) {
  const state = SequenceState
  const { onAdd } = props
  const { palette, resetShapeToUserInput, auditionNote, isPlaying } = state
  function handleAdd(note) { onAdd(note) }
  function onOver(note) {
    if (!isPlaying) {
      auditionNote(note, state.nextEmptyIndex)
    }
  }
  function onOut(note) {
    if (!isPlaying) {
      resetShapeToUserInput(note, state.nextEmptyIndex)
    }
  }

  const paletteEls = palette.map(n => (
    <NoteControl
      handleMouseOver={onOver}
      handleMouseOut={onOut}
      handleClick={handleAdd}
      key={`shape-${n.note}`}
      note={n}
      disabled={state.isPlaying}
    />
  ))
  return (
    <ul>
      { paletteEls }
    </ul>
  )
}

NotePalette.propTypes = {
  onAdd: React.PropTypes.func,
}

export default observer(NotePalette)
