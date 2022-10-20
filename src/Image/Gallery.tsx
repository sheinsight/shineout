import React from 'react'
import immer from 'immer'
import icons from '../icons'
import Magnify from './Magnify'
import { imageClass } from './styles'
import { GalleryImage } from './events'
import { PureComponent } from '../component'
import { docSize } from '../utils/dom/document'
import normalizeWheel from '../utils/dom/normalizeWheel'

interface GalleryProps {
  current: number
  onClose: () => void
  images: any[]
}

interface State {
  current: number
  direction: string
}

const DefaultProps = {
  current: 0,
}

type Props = GalleryProps & Required<Pick<GalleryProps, keyof typeof DefaultProps>>

class Gallery extends PureComponent<Props, State> {
  static defaultProps = DefaultProps

  scrollX: number

  rawScroll: boolean

  scrollTimer: NodeJS.Timeout

  constructor(props: Props) {
    super(props)

    this.state = {
      current: props.current,
      direction: 'init',
    }

    this.handleScroll = this.handleScroll.bind(this)
    this.lockScroll = this.lockScroll.bind(this)

    this.scrollX = 0
    this.rawScroll = false
  }

  componentDidMount() {
    super.componentDidMount()
    document.addEventListener('wheel', this.handleScroll, { passive: false })
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    document.removeEventListener('wheel', this.handleScroll, { passive: false } as EventListenerOptions)
  }

  lockScroll(status: boolean) {
    this.rawScroll = status
  }

  handleClick(direction: number) {
    const { length } = this.props.images
    this.setState(
      immer(draft => {
        draft.current += direction
        if (draft.current < 0) draft.current = 0
        else if (draft.current >= length) draft.current = length - 1
        else draft.direction = direction === 1 ? 'forward' : 'backward'
      }),
      () => {
        setTimeout(() => {
          this.setState({ direction: 'init' })
        }, 400)
      }
    )
  }

  handleScroll(e: WheelEvent) {
    if (this.rawScroll) return
    e.preventDefault()
    if (this.scrollX !== 0) return
    const wheel = normalizeWheel(e)
    this.scrollX += wheel.spinX

    if (this.scrollX < 0) this.handleClick(-1)
    if (this.scrollX > 0) this.handleClick(1)

    this.scrollTimer = setTimeout(() => {
      this.scrollX = 0
    }, 1000)
  }

  renderImage(image: GalleryImage, pos: string) {
    const windowHeight = docSize.height
    const windowWidth = docSize.width

    let onClick
    if (pos !== 'center') {
      onClick = this.handleClick.bind(this, pos === 'left' ? -1 : 1)
    }
    return (
      <div key={image.key} className={imageClass(pos, this.state.direction)} onClick={onClick}>
        <a onClick={this.props.onClose} className={imageClass('close')}>
          {icons.Close}
        </a>
        <Magnify
          maxWidth={windowWidth - 400}
          maxHeight={windowHeight - 160}
          position={pos}
          src={image.src}
          lockScroll={this.lockScroll}
        />
      </div>
    )
  }

  render() {
    const { current } = this.state
    const { images, onClose } = this.props
    const currentImage = images[current]

    const result = []

    result.push(<div key="overlay" className={imageClass('overlay')} onClick={onClose} />)
    result.push(this.renderImage(currentImage, 'center'))

    if (images[current - 1]) result.push(this.renderImage(images[current - 1], 'left'))
    if (images[current + 1]) result.push(this.renderImage(images[current + 1], 'right'))

    return result
  }
}

Gallery.defaultProps = {
  current: 0,
}

export default Gallery as React.ComponentType<GalleryProps>
