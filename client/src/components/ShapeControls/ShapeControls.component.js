import React from 'react'
import { observer } from 'mobx-react'
import state from '../../GameShapeState'

function ShapeControls() {
  return (
    <div className="controls">
      <button onClick={state.decSides}>Remove Side</button>
      <button onClick={state.incSides}>Add Side</button>
      <br />
      <button onClick={state.scaleDown}>Scale Down</button>
      <button onClick={state.scaleUp}>Scale Up</button>
      <br />
      <button onClick={state.rotateCC}>Rotate Counter-clockwise</button>
      <button onClick={state.rotateC}>Rotate Clockwise</button>
      <br />
      <button onClick={state.shiftWarm}>Color Warmer</button>
      <button onClick={state.shiftCool}>Color Cooler</button>
      <br />
      <button onClick={state.decSkewX}>Skew X Negative</button>
      <button onClick={state.incSkewX}>Skew X Positive</button>
      <br />
      <button onClick={state.decSkewY}>Skew Y Negative</button>
      <button onClick={state.incSkewY}>Skew Y Positive</button>
      <br />
    </div>
  )
}
export default observer(ShapeControls)
