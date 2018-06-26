import React from 'react'
import PropTypes from 'prop-types'
import immer from 'immer'
import PureComponent from '../PureComponent'
import normalizeWheel from '../utils/dom/normalizeWheel'
import { imageClass } from '../styles'

class Gallery extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      current: props.current,
      direction: 'init',
    }

    this.handleScroll = this.handleScroll.bind(this)
    this.scrollX = 0
  }

  componentDidMount() {
    document.addEventListener('wheel', this.handleScroll)
  }

  componentWillUnmount() {
    document.removeEventListener('wheel', this.handleScroll)
  }

  handleClick(direction) {
    const { length } = this.props.images
    this.setState(immer((draft) => {
      draft.current += direction
      if (draft.current < 0) draft.current = 0
      else if (draft.current >= length) draft.current = length - 1
      else draft.direction = direction === 1 ? 'forward' : 'backward'
    }), () => {
      setTimeout(() => {
        this.setState({ direction: 'init' })
      }, 400)
    })
  }

  handleScroll(e) {
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

  // eslint-disable-next-line
  renderImage(image, pos) {
    const windowHeight = window.innerHeight || document.documentElement.clientHeight
    const windowWidth = window.innerWidth || document.documentElement.clientWidth

    let onClick
    if (pos !== 'center') {
      onClick = this.handleClick.bind(this, pos === 'left' ? -1 : 1)
    }

    return (
      <div key={pos} className={imageClass(pos, this.state.direction)} onClick={onClick}>
        <img src={image.src} alt="" style={{ maxWidth: windowWidth - 400, maxHeight: windowHeight - 160 }} />
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

Gallery.propTypes = {
  current: PropTypes.number,
  images: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
}

Gallery.defaultProps = {
  current: 0,
}

export default Gallery
