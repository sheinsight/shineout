import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps, defaultProps } from '../utils/proptypes'
import { scrollClass } from '../styles'
import Bar from './Bar'

class Scroll extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      left: 0,
      top: 0,
      width: 0,
      height: 0,
    }

    this.bindContainer = this.bindContainer.bind(this)
    this.handleScrollX = this.handleScrollX.bind(this)
    this.handleScrollY = this.handleScrollY.bind(this)
    this.handleWheel = this.handleWheel.bind(this)
  }

  componentDidMount() {
    this.setState({
      width: this.element.offsetWidth,
      height: this.element.offsetHeight,
    })
  }

  handleWheel(event) {
    event.preventDefault()
  }

  handleScroll(left, top) {
    const { width, height } = this.state
    const { scrollWidth, scrollHeight } = this.props
    const right = 1 - (width / scrollWidth)
    const bottom = 1 - (height / scrollHeight)
    if (this.props.onScroll) {
      this.props.onScroll(left, top, right, bottom)
    }
  }

  handleScrollX(left) {
    this.setState({ left })
    this.handleScroll(left, this.state.top)
  }

  handleScrollY(top) {
    this.setState({ top })
    this.handleScroll(this.state.left, top)
  }

  bindContainer(el) {
    this.element = el
  }

  render() {
    const { children, scrollWidth, scrollHeight } = this.props
    const {
      width, height, left, top,
    } = this.state

    const className = classnames(
      scrollClass('_'),
      this.props.className,
    )

    return (
      <div ref={this.bindContainer} onWheel={this.handleWheel} className={className}>
        { children }
        <Bar
          scrollLength={scrollHeight}
          length={height}
          offset={top}
          onScroll={this.handleScrollY}
        />
        <Bar
          direction="x"
          scrollLength={scrollWidth}
          length={width}
          offset={left}
          onScroll={this.handleScrollX}
        />
      </div>
    )
  }
}

Scroll.propTypes = {
  ...getProps(),
  onScroll: PropTypes.func,
  scrollHeight: PropTypes.number,
  scrollWidth: PropTypes.number,
}

Scroll.defaultProps = {
  ...defaultProps,
  scrollHeight: 0,
  scrollWidth: 0,
}

export default Scroll
