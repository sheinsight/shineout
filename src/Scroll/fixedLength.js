import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default function (Bar) {
  class FixedLength extends PureComponent {
    /*
    constructor(props) {
      super(props)
      this.state = {
        length: 0,
      }

      this.setRect = this.setRect.bind(this)
      this.bindBar = this.bindBar.bind(this)
    }

    componentDidMount() {
      setTimeout(this.setRect)
      window.addEventListener('resize', this.setRect)
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.setRect)
    }

    setRect() {
      const { direction, setRect } = this.props
      const rect = this.bar.getBoundingClientRect()
      const length = direction === 'x' ? rect.width : rect.height
      this.setState({ length })
      setRect(direction === 'x' ? 'width' : 'height', length)
    }

    bindBar(el) {
      this.bar = el
    }
    */

    render() {
      const { length, scrollLength } = this.props
      let barLength = (length / scrollLength) * length
      if (barLength < 20) barLength = 20

      return (
        <Bar
          {...this.props}
          length={length}
          barLength={barLength}
        />
      )
    }
  }

  FixedLength.propTypes = {
    direction: PropTypes.string,
    length: PropTypes.number.isRequired,
    scrollLength: PropTypes.number.isRequired,
  }

  FixedLength.defaultProps = {
    direction: 'y',
  }

  return FixedLength
}
