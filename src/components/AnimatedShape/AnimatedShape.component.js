import * as d3 from 'd3'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const defaultDuration = 80

class AnimatedShape extends Component {
  static propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    points: React.PropTypes.array,
    fill: React.PropTypes.string,
    duration: React.PropTypes.number
  }
  state = {
    points: this.pointsToString(this.props.points),
    className: 'enter',
    fillOpacity: 1e-6,
  }

  componentWillReceiveProps(nextProps) {
    const duration = this.props.duration || defaultDuration
    if (this.props.points !== nextProps.points) {
      const node = d3.select(ReactDOM.findDOMNode(this))
      this.setState({ className: 'update' })
      const pointsString = this.pointsToString(nextProps.points)
      node.transition(this.transition).duration(duration)
        .attr('points', pointsString)
        .on('end', () => this.setState({ points: pointsString }))
    }
  }

  componentWillEnter(callback) {
    const node = d3.select(ReactDOM.findDOMNode(this))
    const pointsString = this.pointsToString(this.props.points)
    this.setState({
      points: pointsString,
    })

    node.transition(this.transition)
      .attr('points', pointsString)
      .on('end', () => {
        this.setState({ points: pointsString })
        callback()
      })
  }

  componentWillLeave(callback) {
    const node = d3.select(ReactDOM.findDOMNode(this))
    const duration = this.props.duration || defaultDuration
    this.setState({ className: 'exit' })

    node.transition(this.transition).duration(duration)
      .attr('y', 60)
      .style('fill-opacity', 1e-6)
      .on('end', () => {
        this.setState({ points: this.pointsToString(this.props.points) })
        callback()
      })
  }

  pointsToString(points) {
    const x = d3.scaleLinear()
      .range([0, this.props.width])
      .domain([0, 100])

    const y = d3.scaleLinear()
      .range([0, this.props.height])
      .domain([0, 100])
    return points.map(d => [x(d.x), y(d.y)].join(',')).join(' ')
  }

  transition = d3.transition()
      .duration(defaultDuration)
      .ease(d3.easeCubicInOut)

  render() {
    const { fill } = this.props

    return (
      <polygon x={this.state.x} y={this.state.y} fill={fill} points={this.state.points} />
    )
  }

}

export default AnimatedShape
