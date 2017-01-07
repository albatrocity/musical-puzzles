import React from 'react'
import { observer } from 'mobx-react'
import AppState from '../../State'
import Shape from '../Shape'

function GameShape() {
  const state = AppState
  const { sideCount, radius, xCenter, yCenter, fill, rotation, skewX, skewY } = state

  let angle = rotation
  const angleIncrement = (2 * Math.PI) / sideCount

  const shapeCoords = Array.from(new Array(sideCount)).map(() => {
    const x = xCenter + (radius * Math.cos(angle))
    const y = yCenter + (radius * Math.sin(angle))
    angle += angleIncrement
    return { x, y }
  })

  return (
    <Shape
      width={radius}
      height={radius}
      points={shapeCoords}
      fill={fill}
      skewX={skewX}
      skewY={skewY}
    />
  )
}

export default observer(GameShape)
