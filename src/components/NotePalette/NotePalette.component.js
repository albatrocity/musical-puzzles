import React from 'react'
import { observer } from 'mobx-react'
import SequenceState from '../../SequenceState'
import NoteControl from '../NoteControl'

function NotePalette(props) {
  const state = SequenceState
  const { onAdd } = props
  const { fullPalette } = state
  function handleAdd(note) { onAdd(note) }

  const paletteEls = fullPalette.map(n => (
    <NoteControl handleClick={handleAdd} key={`shape-${n.note}`} note={n} />
  ))
  return (
    <ul>
      { paletteEls }
    </ul>
  )
}

export default observer(NotePalette)
