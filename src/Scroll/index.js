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

  getRect() {
    const left = this.props.scrollLeft || this.state.left
    const top = this.props.scrollTop || this.state.top
    return { left, top }
  }

  handleScroll(x, y, ...others) {
    const left = this.props.scrollX ? x : 0
    const top = this.props.scrollY ? y : 0
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
        onScroll={this.handleScroll}
      />
    )
  }
}

Scroll.propTypes = {
  onScroll: PropTypes.func,
  scrollLeft: PropTypes.number,
  scrollTop: PropTypes.number,
  scrollX: PropTypes.bool,
  scrollY: PropTypes.bool,
}

Scroll.defaultProps = {
  onScroll: undefined,
  scrollLeft: undefined,
  scrollTop: undefined,
  scrollX: false,
  scrollY: false,
}

export default Scroll
