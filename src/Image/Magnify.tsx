import React from 'react'
import immer from 'immer'
import Spin from '../Spin'
import { imageClass } from './styles'
import { PureComponent } from '../component'

interface MagnifyProps {
  src?: string
  position: string
  maxWidth: number
  maxHeight: number
  lockScroll: (isLock: boolean) => void
}
interface State {
  loading: boolean
  status: number
  style: React.CSSProperties
}

class Magnify extends PureComponent<MagnifyProps, State> {
  element: HTMLDivElement

  constructor(props: MagnifyProps) {
    super(props)

    this.state = {
      loading: true,
      status: 0,
      style: {
        maxHeight: props.maxHeight,
        maxWidth: props.maxWidth,
      },
    }

    this.handleMove = this.handleMove.bind(this)
    this.handleResize = this.handleResize.bind(this)
    this.handleLoaded = this.handleLoaded.bind(this)
  }

  componentDidUpdate(prevProps: MagnifyProps) {
    if (prevProps.src !== this.props.src && this.state.status === 1) {
      // eslint-disable-next-line
      this.setState({
        loading: true,
        status: 0,
        style: {
          maxHeight: this.props.maxHeight,
          maxWidth: this.props.maxWidth,
        },
      })
      this.props.lockScroll(false)
    }
  }

  move(clientX: number, clientY: number) {
    const rect = this.element.getBoundingClientRect()
    const image = this.element.querySelector('img')
    const width = rect.width - 100
    const height = rect.height - 100
    const x = (clientX - rect.left - 50) / width
    const y = (clientY - rect.top - 50) / height
    this.element.scrollTop = (image!.offsetHeight - height) * y
    this.element.scrollLeft = (image!.offsetWidth - width) * x
  }

  handleLoaded() {
    this.setState({ loading: false })
  }

  handleMove(e: React.MouseEvent) {
    this.move(e.clientX, e.clientY)
  }

  handleResize(e: React.MouseEvent) {
    const { maxHeight, maxWidth, position } = this.props
    if (position !== 'center') return
    const status = this.state.status === 1 ? 0 : 1
    const { clientX, clientY } = e

    this.setState(
      immer(state => {
        state.status = status
        state.style = status === 0 ? { maxHeight, maxWidth } : undefined
      }),
      () => {
        if (status === 0) return
        this.move(clientX, clientY)
      }
    )
    this.props.lockScroll(status === 1)
  }

  render() {
    const { maxHeight, maxWidth, src } = this.props
    const { status, loading } = this.state
    // eslint-disable-next-line
    const cursor = this.props.position === 'center' ? (status === 1 ? 'zoom-out' : 'zoom-in') : 'pointer'
    const style: React.CSSProperties = { maxHeight, maxWidth, cursor }
    if (status === 1) {
      style.overflow = 'scroll'
      style.borderRightWidth = 0
      style.borderBottomWidth = 0
    }

    const onMouseMove = status === 1 ? this.handleMove : undefined

    return (
      <div
        onClick={this.handleResize}
        onMouseMove={onMouseMove}
        ref={el => {
          this.element = el!
        }}
        style={style}
        className={imageClass('magnify')}
      >
        <img onLoad={this.handleLoaded} src={src} alt="" style={this.state.style} />
        {loading && (
          <div className={imageClass('magnify-loading')}>
            <Spin size={30} />
          </div>
        )}
      </div>
    )
  }
}

export default Magnify
