import React from 'react'

function NoteControl(props) {
  const { note, action } = props.note
  const { handleClick } = props

  function onClick() {
    handleClick(props.note)
  }
  return (
    <button onClick={onClick} key={note}>{note}</button>
  )
}

export default NoteControl
