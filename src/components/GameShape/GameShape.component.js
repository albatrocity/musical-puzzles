import React from 'react'
import ReactTransitionGroup from 'react-addons-transition-group'
import { observer } from 'mobx-react'
import GameShapeState from '../../GameShapeState'
import AnimatedShape from '../AnimatedShape'

function GameShape() {
  const state = GameShapeState
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
