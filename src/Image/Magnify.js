import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import immer from 'immer'

class Magnify extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      status: 0,
      style: {
        maxHeight: props.maxHeight,
        maxWidth: props.maxWidth,
      },
    }

    this.handleResize = this.handleResize.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.src !== this.props.src && this.state.status === 1) {
      // eslint-disable-next-line
      this.setState({
        status: 0,
        style: {
          maxHeight: this.props.maxHeight,
          maxWidth: this.props.maxWidth,
        },
      })
      this.props.lockScroll(false)
    }
  }

  handleResize() {
    const { maxHeight, maxWidth } = this.props
    const status = this.state.status === 1 ? 0 : 1
    this.setState(immer((state) => {
      state.status = status
      state.style = status === 0 ? { maxHeight, maxWidth } : undefined
    }))
    this.props.lockScroll(status === 1)
  }

  render() {
    const { maxHeight, maxWidth, src } = this.props
    const { status, style } = this.state

    return (
      <div
        onClick={this.handleResize}
        style={{
          maxHeight, maxWidth, overflow: 'auto', cursor: status === 1 ? 'zoom-out' : 'zoom-in',
        }}
      >
        <img src={src} alt="" style={style} />
      </div>
    )
  }
}

Magnify.propTypes = {
  lockScroll: PropTypes.func,
  maxHeight: PropTypes.number,
  maxWidth: PropTypes.number,
  src: PropTypes.string,
}

export default Magnify
