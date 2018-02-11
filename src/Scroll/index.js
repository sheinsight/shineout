import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ScrollView from './Scroll'

class Scroll extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      left: props.scrollLeft || 0,
      top: props.scrollTop || 0,
    }

    this.handleScroll = this.handleScroll.bind(this)
  }

  get scrollX() {
    const { scroll } = this.props
    return scroll === 'x' || scroll === 'both'
  }

  get scrollY() {
    const { scroll } = this.props
    return scroll === 'y' || scroll === 'both'
  }

  getRect() {
    const left = this.props.scrollLeft || this.state.left
    const top = this.props.scrollTop || this.state.top
    return { left, top }
  }

  handleScroll(x, y, ...others) {
    const left = this.scrollX ? x : 0
    const top = this.scrollY ? y : 0
    this.setState({ left, top })
    if (this.props.onScroll) {
      this.props.onScroll(left, top, ...others)
    }
  }

  render() {
    const { left, top } = this.getRect()
    return (
      <ScrollView
        {...this.props}
        left={left}
        top={top}
        scrollX={this.scrollX}
        scrollY={this.scrollY}
        onScroll={this.handleScroll}
      />
    )
  }
}

Scroll.propTypes = {
  onScroll: PropTypes.func,
  scroll: PropTypes.oneOf(['x', 'y', 'both']),
  scrollLeft: PropTypes.number,
  scrollTop: PropTypes.number,
}

Scroll.defaultProps = {
  onScroll: undefined,
  scroll: 'both',
  scrollLeft: undefined,
  scrollTop: undefined,
}

export default Scroll
