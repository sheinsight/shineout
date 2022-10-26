import React from 'react'
import classnames from 'classnames'
import immer from 'immer'
import { resizableClass } from './styles'
import { getUidStr } from '../utils/uid'
import {ResizableType} from './Props'

interface BaseProps {
  style?: React.CSSProperties
  className?: string
}

interface ResizeableState {
  x: number
  y: number
}

type Direction = 'x' | 'y' | 'xy'


export default
  <U extends BaseProps >(Origin: React.ComponentType<U>) =>
    class Resizable extends React.Component<ResizableType<U>, ResizeableState> {

      resizableId: string

      handlers: Map<HTMLElement, EventListener>

      active?: Direction

      appended?: boolean

      size?: {
        width: number
        height: number
      }

      el: HTMLElement

      constructor(props: ResizableType<U>) {
        super(props)
        this.state = {
          x: 0,
          y: 0,
        }
        this.resizableId = getUidStr()
        this.handleMouseUp = this.handleMouseUp.bind(this)
        this.handleMouseMove = this.handleMouseMove.bind(this)
      }

      componentDidMount() {
        this.appendHandler()
      }

      componentDidUpdate() {
        if (this.props.resizable) {
          this.appendHandler()
        }
      }

      componentWillUnmount() {
        if (this.handlers) {
          this.handlers.forEach((action, handler) => handler.removeEventListener('mousedown', action))
        }
      }

      getStyle() {
        const { x, y } = this.state
        if (!this.size) return undefined
        return {
          width: this.size.width + x,
          height: this.size.height + y,
        }
      }

      handleMouseMove(e: MouseEvent) {
        let x = e.movementX
        let y = e.movementY
        if (!this.active) return
        this.setState(
          immer(draft => {
            x += draft.x
            y += draft.y
            if (this.active!.indexOf('x') >= 0) draft.x = x
            if (this.active!.indexOf('y') >= 0) draft.y = y
          })
        )
      }

      handleMouseDown(dir: Direction) {
        this.active = dir
        document.addEventListener('mousemove', this.handleMouseMove)
        document.addEventListener('mouseup', this.handleMouseUp)
        document.addEventListener('mouseleave', this.handleMouseUp)
      }

      handleMouseUp() {
        this.active = undefined
        document.removeEventListener('mousemove', this.handleMouseMove)
        document.removeEventListener('mouseup', this.handleMouseUp)
        document.removeEventListener('mouseleave', this.handleMouseUp)
      }

      appendHandler() {
        const { resizable } = this.props
        if (!resizable || this.appended) return
        this.appended = true
        this.el = document.querySelector(`.${resizableClass(this.resizableId)}`) as HTMLElement
        if (!this.el) return
        this.size = {
          width: this.el.clientWidth,
          height: this.el.clientHeight,
        }
        this.handlers = new Map()
        ;['x', 'y', 'xy'].forEach(dir => {
          if (typeof resizable === 'string' && resizable !== dir) return
          const handler = document.createElement('div')
          const action = this.handleMouseDown.bind(this, dir)
          handler.className = resizableClass('handler', `handler-${dir}`)
          handler.addEventListener('mousedown', action)
          this.el.appendChild(handler)
          this.handlers.set(handler, action)
        })
      }

      render() {
        const { resizable, className, style, ...others } = this.props
        if (!resizable) return <Origin {...this.props} />
        const ms = Object.assign({}, style, this.getStyle())
        const mc = classnames(className, resizableClass('_', this.resizableId))
        return <Origin {...others as U} style={ms} className={mc} />
      }
    }
