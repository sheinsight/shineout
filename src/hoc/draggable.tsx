import React, { PureComponent } from 'react'
import { curry } from '../utils/func'

interface DragProps {
  client?: { x: number; y: number; [name: string]: any }
  onDragStart?: () => void
  onDrag?: (mx: number, my: number, clientX: number, clientY: number) => void
  onDragEnd?: () => void
}

const defaultProps: DragProps = {
  client: undefined,
  onDragStart() {},
  onDrag() {},
  onDragEnd() {},
}

export default curry(<U extends DragProps>(OriginComponent: React.ComponentType<U>) => {
  class Drag extends PureComponent<U> {
    static defaultProps = defaultProps

    clientX?: number

    clientY?: number

    dragging?: boolean

    constructor(props: U) {
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
        if (this.props.onDragStart) this.props.onDragStart()
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

    handleDragStart(e: React.DragEvent<HTMLElement>) {
      if (e.button !== 0) return
      this.clientX = e.clientX
      this.clientY = e.clientY
      this.dragging = true
      this.addEvents()
      if (this.props.onDragStart) this.props.onDragStart()
    }

    handleDrag(e: MouseEvent) {
      if (!this.dragging) return
      if (e.clientX === 0 && e.clientY === 0) return

      const mx = e.clientX - (this.clientX as number)
      const my = e.clientY - (this.clientY as number)
      if (mx === 0 && my === 0) return

      this.clientX = e.clientX
      this.clientY = e.clientY

      if (this.props.onDrag) this.props.onDrag(mx, my, e.clientX, e.clientY)
    }

    handleDragEnd() {
      if (!this.dragging) return
      this.dragging = false
      this.removeEvents()
      if (this.props.onDragEnd) this.props.onDragEnd()
    }

    render() {
      return <OriginComponent {...this.props} onDragStart={this.handleDragStart} />
    }
  }

  return Drag
})
