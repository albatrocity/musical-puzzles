import React from 'react'
import ReactTransitionGroup from 'react-addons-transition-group'
import { observer } from 'mobx-react'
import GameShapeState from '../../GameShapeState'
import AnimatedShape from '../AnimatedShape'

function GameShape(props) {
  const state = GameShapeState
  const { shapePoints, radius, fill } = state
  const { animationDuration } = props

  return (
    <ReactTransitionGroup component="g">
      <AnimatedShape
        width={radius}
        height={radius}
        points={shapePoints}
        fill={fill}
        duration={animationDuration}
      />
    </ReactTransitionGroup>
  )
}

GameShape.propTypes = {
  animationDuration: React.PropTypes.number,
}

export default observer(GameShape)
