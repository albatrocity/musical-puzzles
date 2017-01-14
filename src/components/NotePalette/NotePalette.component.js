import React from 'react'
import { observer } from 'mobx-react'
import SequenceState from '../../SequenceState'
import NoteControl from '../NoteControl'

function NotePalette(props) {
  const state = SequenceState
  const { onAdd } = props
  const { palette, resetShapeToUserInput, auditionNote } = state
  function handleAdd(note) { onAdd(note) }
  function onOver(note) { auditionNote(note, state.nextEmptyIndex) }
  function onOut(note) { resetShapeToUserInput(note, state.nextEmptyIndex) }

  const paletteEls = palette.map(n => (
    <NoteControl
      handleMouseOver={onOver}
      handleMouseOut={onOut}
      handleClick={handleAdd}
      key={`shape-${n.note}`}
      note={n}
    />
  ))
  return (
    <ul>
      { paletteEls }
    </ul>
  )
}

export default observer(NotePalette)
