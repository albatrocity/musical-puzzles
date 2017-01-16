import * as d3 from 'd3'
import React from 'react'

const Shape = function Shape(props) {
  const { width, height, points, fill, strokeColor, strokeWidth, strokeDasharray } = props

  const x = d3.scaleLinear()
    .range([0, width])
    .domain([0, width])

  const y = d3.scaleLinear()
    .range([0, height])
    .domain([0, width])

  const pointsString = points.map(d => [x(d.x), y(d.y)].join(',')).join(' ')

  return (
    <polygon
      fill={fill}
      points={pointsString}
      strokeWidth={strokeWidth}
      stroke={strokeColor}
      strokeDasharray={strokeDasharray}
    />
  )
}

Shape.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  points: React.PropTypes.array,
  fill: React.PropTypes.string,
  strokeColor: React.PropTypes.string,
  strokeWidth: React.PropTypes.number,
  strokeDasharray: React.PropTypes.array,
}

Shape.defaultProps = {
  strokeWidth: 0,
  stokeColor: 'transparent',
  fill: 'transparent',
  strokeDasharray: [1],
}

export default Shape
