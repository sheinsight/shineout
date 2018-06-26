import React from 'react'
import PropTypes from 'prop-types'
import PureComponent from '../PureComponent'
import Scroll from './Scroll'

export default class extends PureComponent {
  static propTypes = {
    onScroll: PropTypes.func,
    scroll: PropTypes.oneOf(['x', 'y', 'both', '']),
    scrollLeft: PropTypes.number,
    scrollTop: PropTypes.number,
  }

  static defaultProps = {
    scroll: 'both',
  }

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
    const left = this.props.scrollLeft === undefined ? this.state.left : this.props.scrollLeft
    const top = this.props.scrollTop === undefined ? this.state.top : this.props.scrollTop
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
      <Scroll
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

