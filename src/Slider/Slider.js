import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Indicator from './Indicator'
import { sliderClass } from '../styles'

class Slider extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      length: props.value / (props.to - props.from),
    }

    this.bindElement = this.bindElement.bind(this)
    this.handleDrag = this.handleDrag.bind(this)
    this.handleDragEnd = this.handleDragEnd.bind(this)
  }

  componentDidUpdate(prevProps) {
    const { value, from, to } = this.props
    if (prevProps.value !== value) {
      // eslint-disable-next-line
      this.setState({ length: value / (to - from) })
    }
  }

  bindElement(el) {
    if (el) this.parentElement = el.parentElement
  }

  formatValue(length) {
    const { from, to, step } = this.props
    const count = (to - from) / step
    const value = from + (Math.round(length * count) * step)

    return value
  }

  handleDrag(mx, my) {
    const { onDrag, value, vertical } = this.props
    const m = vertical ? my / this.parentElement.clientHeight : mx / this.parentElement.clientWidth
    const { length } = this.state

    let newLength = m + length
    if (newLength < 0) newLength = 0
    if (newLength > 1) newLength = 1

    this.setState({ length: newLength })

    if (onDrag) {
      const newValue = this.formatValue(newLength)
      if (newValue !== value) onDrag(newValue)
    }
  }

  handleDragEnd() {
    const { length } = this.state
    const { from, to, onChange } = this.props
    const value = this.formatValue(length)

    this.setState({ length: value / (to - from) })
    onChange(value)
  }

  render() {
    const { vertical } = this.props
    const { length } = this.state
    const style = { [vertical ? 'height' : 'width']: `${length * 100}%` }

    return (
      <div ref={this.bindElement} style={style} className={sliderClass('bar')}>
        <div className={sliderClass('active')} />
        <Indicator onDrag={this.handleDrag} onDragEnd={this.handleDragEnd} />
      </div>
    )
  }
}

Slider.propTypes = {
  from: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onDrag: PropTypes.func,
  step: PropTypes.number,
  to: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  vertical: PropTypes.bool.isRequired,
}

export default Slider
