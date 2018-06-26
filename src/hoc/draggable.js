import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { curry } from '../utils/func'

export default curry((OriginComponent) => {
  class Drag extends PureComponent {
    constructor(props) {
      super(props)

      this.handleDragStart = this.handleDragStart.bind(this)
      this.handleDrag = this.handleDrag.bind(this)
      this.handleDragEnd = this.handleDragEnd.bind(this)
    }

    componentDidMount() {
      const { client } = this.props
      if (client) {
        this.clientX = client.x
        this.clientY = client.y
        this.dragging = true
        this.addEvents()
        this.props.onDragStart(true)
      }
    }

    componentWillUnmount() {
      this.removeEvents()
    }

    addEvents() {
      document.addEventListener('mousemove', this.handleDrag)
      document.addEventListener('mouseup', this.handleDragEnd)
      document.addEventListener('mouseleave', this.handleDragEnd)
    }

    removeEvents() {
      document.removeEventListener('mousemove', this.handleDrag)
      document.removeEventListener('mouseup', this.handleDragEnd)
      document.removeEventListener('mouseleave', this.handleDragEnd)
    }

    handleDragStart(e) {
      if (e.button !== 0) return
      this.clientX = e.clientX
      this.clientY = e.clientY
      this.dragging = true
      this.addEvents()
      this.props.onDragStart(true)
    }

    handleDrag(e) {
      if (!this.dragging) return
      if (e.clientX === 0 && e.clientY === 0) return

      const mx = e.clientX - this.clientX
      const my = e.clientY - this.clientY
      if (mx === 0 && my === 0) return

      this.clientX = e.clientX
      this.clientY = e.clientY

      this.props.onDrag(mx, my, e.clientX, e.clientY)
    }

    handleDragEnd() {
      if (!this.dragging) return
      this.dragging = false
      this.removeEvents()
      this.props.onDragEnd(false)
    }

    render() {
      return <OriginComponent {...this.props} onDragStart={this.handleDragStart} />
    }
  }

  Drag.propTypes = {
    client: PropTypes.object,
    onDragStart: PropTypes.func,
    onDrag: PropTypes.func,
    onDragEnd: PropTypes.func,
  }

  Drag.defaultProps = {
    client: undefined,
    onDragStart() {},
    onDrag() {},
    onDragEnd() {},
  }

  return Drag
})
