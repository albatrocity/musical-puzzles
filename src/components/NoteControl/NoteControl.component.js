import React from 'react'

function NoteControl(props) {
  const { note } = props.note
  const { handleClick, handleMouseOver, handleMouseOut, className, disabled } = props

  function onClick() {
    handleClick(props.note)
  }
  function onOver() {
    handleMouseOver(props.note)
  }
  function onOut() {
    handleMouseOut(props.note)
  }
  return (
    <button
      className={className}
      onMouseOver={handleMouseOver ? onOver : () => {}}
      onMouseOut={handleMouseOut ? onOut : () => {}}
      onClick={onClick}
      key={note}
      disabled={disabled}
    >
      {note}
    </button>
  )
}

NoteControl.propTypes = {
  handleClick: React.PropTypes.func,
  handleMouseOver: React.PropTypes.func,
  handleMouseOut: React.PropTypes.func,
  className: React.PropTypes.string,
  note: React.PropTypes.object,
  disabled: React.PropTypes.bool,
}

export default NoteControl
