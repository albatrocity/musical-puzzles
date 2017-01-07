import * as d3 from 'd3'
import React from 'react'

const Shape = function Shape(props) {
  const { width, height, points } = props
  const fill = props.fill || '#000'
  const skewX = props.skewX || 0
  const skewY = props.skewY || 0

  const x = d3.scaleLinear()
    .range([0, width])
    .domain([0, 100])

  const y = d3.scaleLinear()
    .range([0, height])
    .domain([0, 100])

  const pointsString = points.map(d => [x(d.x), y(d.y)].join(',')).join(' ')

  return (
    <svg style={{ height: '100%', width: '100%' }}>
      <polygon fill={fill} points={pointsString} transform={`skewX(${skewX}) skewY(${skewY})`} />
    </svg>
  )
}

Shape.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  skewX: React.PropTypes.number,
  skewY: React.PropTypes.number,
  points: React.PropTypes.array,
  fill: React.PropTypes.string,
}

export default Shape
