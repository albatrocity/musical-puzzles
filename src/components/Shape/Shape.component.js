import * as d3 from 'd3'
import React from 'react'
import ReactFauxDOM from 'react-faux-dom'

class Shape extends React.Component {
  static propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    data: React.PropTypes.array,
    interpolation: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.function
    ])
  }

  render () {
    const {width, height, data} = this.props
    const el = d3.select(ReactFauxDOM.createElement('svg'))

    const x = d3.scaleLinear()
      .range([0, width])
      .domain(d3.extent(data, (d, i) => i))

    const y = d3.scaleLinear()
      .range([height, 0])
      .domain(d3.extent(data, (d) => d))

    const line = d3.line()
      .x((d, i) => x(i))
      .y((d) => y(d))

    el.append('path')
      .attr('d', line(data))

    return el.node().toReact()
  }
}

export default Shape
