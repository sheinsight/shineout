import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

export default Origin =>
  class Moveable extends React.Component {
    static propTypes = {
      style: PropTypes.object,
      className: PropTypes.string,
    }

    constructor(props) {
      super(props)
      this.state = {
        x: 0,
        y: 0,
        darging: false,
      }
      this.handleMouseDown = this.handleMouseDown.bind(this)
      this.handleMouseMove = this.handleMouseMove.bind(this)
      this.handleMouseUp = this.handleMouseUp.bind(this)
    }

    getStyle() {
      const { x, y } = this.state
      return {
        transform: `translate(${x}px, ${y}px)`,
      }
    }

    handleMouseDown() {
      document.addEventListener('mousemove', this.handleMouseMove)
      document.addEventListener('mouseup', this.handleMouseUp)
      this.setState({
        darging: true,
      })
    }

    handleMouseMove(e) {
      this.setState(prev => ({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY,
      }))
    }

    handleMouseUp() {
      document.removeEventListener('mousemove', this.handleMouseMove)
      document.removeEventListener('mouseup', this.handleMouseUp)
      this.setState({
        darging: false,
      })
    }

    render() {
      const ms = Object.assign({}, this.props.style, this.getStyle())
      const mc = classnames(this.props.className)
      return <Origin {...this.props} style={ms} className={mc} onMouseDown={this.handleMouseDown} />
    }
  }
