import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import immer from 'immer'
import { docSize } from '../utils/dom/document'
import { moveableClass } from '../styles'
import { getUidStr } from '../utils/uid'

const REBOUND_DIS = 50

export default Origin =>
  class Moveable extends React.Component {
    static propTypes = {
      style: PropTypes.object,
      className: PropTypes.string,
      moveable: PropTypes.bool,
    }

    constructor(props) {
      super(props)
      this.state = {
        x: 0,
        y: 0,
        draging: false,
      }
      this.moveabledId = getUidStr()
      this.handleMouseDown = this.handleMouseDown.bind(this)
      this.handleMouseMove = this.handleMouseMove.bind(this)
      this.handleMouseUp = this.handleMouseUp.bind(this)
    }

    componentDidMount() {
      this.bindEvent()
    }

    componentWillUnmount() {
      if (this.el) {
        this.el.removeEventListener('mousedown', this.handleMouseDown)
      }
    }

    getStyle() {
      const { x, y } = this.state
      return {
        transform: `translate(${x}px, ${y}px)`,
      }
    }

    bindEvent() {
      this.el = document.querySelector(`.${moveableClass(this.moveabledId)}`)
      if (!this.el) return
      this.el.addEventListener('mousedown', this.handleMouseDown)
      this.originPos = this.el.getBoundingClientRect()
    }

    rebound() {
      this.setState(
        immer(draft => {
          // vertical
          if (this.originPos.bottom + draft.y <= REBOUND_DIS) {
            draft.y = REBOUND_DIS - this.originPos.bottom
          } else if (this.originPos.bottom + draft.y > docSize.height) {
            draft.y = docSize.height - this.originPos.top - REBOUND_DIS
          }
        })
      )
    }

    handleMouseDown(e) {
      if (e.button !== 0 || !this.el) return
      document.addEventListener('mousemove', this.handleMouseMove)
      document.addEventListener('mouseup', this.handleMouseUp)
      this.setState({
        draging: true,
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
      this.rebound()
      this.setState({
        draging: false,
      })
    }

    render() {
      const { moveable, ...others } = this.props
      if (!moveable) return <Origin {...this.props} />
      const ms = Object.assign({}, this.props.style, this.getStyle())
      const mc = classnames(this.props.className, moveableClass('_', this.moveabledId, !this.state.draging && 'bounce'))
      console.log(mc, this.state.draging)
      return <Origin {...others} style={ms} className={mc} />
    }
  }
