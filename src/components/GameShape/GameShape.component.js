import React from 'react'
import { observer } from 'mobx-react'
import AppState from '../../State'
import Shape from '../Shape'

function GameShape() {
  const state = AppState
  const { shapePoints, radius, fill } = state

  return (
    <Shape
      width={radius}
      height={radius}
      points={shapePoints}
      fill={fill}
    />
  )
}

export default observer(GameShape)
