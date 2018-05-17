import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import immer from 'immer'
import { imageClass } from '../styles'

class Gallery extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      current: props.current,
      direction: '',
    }
  }

  handleClick(direction) {
    this.setState(immer((draft) => {
      draft.current += direction
      draft.direction = direction === 1 ? 'forward' : 'backward'
    }))
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
        <img src={image.src} alt="" style={{ maxWidth: windowWidth - 400, maxHeight: windowHeight - 200 }} />
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
