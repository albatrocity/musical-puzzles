import React from 'react'

function NoteControl(props) {
  const { note, action } = props.note
  const { handleClick, className } = props

  function onClick() {
    handleClick(props.note)
  }
  return (
    <button className={className} onClick={onClick} key={note}>{note}</button>
  )
}

export default NoteControl
