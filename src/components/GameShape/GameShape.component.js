import React from 'react'
import ReactTransitionGroup from 'react-addons-transition-group'
import { observer } from 'mobx-react'
import AppState from '../../State'
import AnimatedShape from '../AnimatedShape'

function GameShape() {
  const state = AppState
  const { shapePoints, radius, fill } = state

  return (
    <svg style={{ height: '100%', width: '100%' }}>
      <ReactTransitionGroup component="g">
        <AnimatedShape
          width={radius}
          height={radius}
          points={shapePoints}
          fill={fill}
        />
      </ReactTransitionGroup>
    </svg>
  )
}

export default observer(GameShape)
