import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default function (Bar) {
  class FixedLength extends PureComponent {
    constructor(props) {
      super(props)
      this.state = {
        length: 0,
      }

      this.bindBar = this.bindBar.bind(this)
    }

    componentDidMount() {
      const { direction, setRect } = this.props
      setTimeout(() => {
        const rect = this.bar.getBoundingClientRect()
        const length = direction === 'x' ? rect.width : rect.height
        this.setState({ length })
        setRect(direction === 'x' ? 'width' : 'height', length)
      })
    }

    bindBar(el) {
      this.bar = el
    }

    render() {
      const { scrollLength } = this.props
      const { length } = this.state
      let barLength = (length / scrollLength) * length
      if (barLength < 20) barLength = 20

      return (
        <Bar
          {...this.props}
          length={length}
          bindBar={this.bindBar}
          barLength={barLength}
        />
      )
    }
  }

  FixedLength.propTypes = {
    direction: PropTypes.string,
    setRect: PropTypes.func.isRequired,
    scrollLength: PropTypes.number.isRequired,
  }

  FixedLength.defaultProps = {
    direction: 'y',
  }

  return FixedLength
}
