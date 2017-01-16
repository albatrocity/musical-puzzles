import React from 'react'
import { observer } from 'mobx-react'
import SolutionShapeState from '../../SolutionShapeState'
import Shape from '../Shape'

function SolutionShape() {
  const state = SolutionShapeState
  const { shapePoints, radius, stroke } = state

  return (
    <g id="solution-shape">
      <Shape
        width={radius}
        height={radius}
        points={shapePoints}
        strokeColor={stroke}
        strokeWidth={2}
        strokeDasharray={[5, 5]}
        fill="transparent"
      />
    </g>
  )
}

export default observer(SolutionShape)
