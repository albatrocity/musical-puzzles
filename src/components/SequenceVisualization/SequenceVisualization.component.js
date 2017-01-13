import React from 'react'
import { observer } from 'mobx-react'
import SequenceState from '../../SequenceState'

function SequenceVisualization(props) {
  const { sequence } = props
  const { currentStep } = SequenceState

  const notes = sequence.map((n, i) => {
    return (
      <span
        className={currentStep === i ? 'active sequencerNote' : 'sequencerNote'}
        key={`note-${i}`}
      >
        {n}
      </span>
    )
  })

  return (
    <div>{ notes }</div>
  )
}

export default observer(SequenceVisualization)
