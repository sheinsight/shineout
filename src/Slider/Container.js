import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps } from '../utils/proptypes'
import { sliderClass } from '../styles'
import Slider from './Slider'

class Container extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {}

    this.bindElement = this.bindElement.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleFirstChange = this.handleChange.bind(this, 0)
    this.handleSecondChange = this.handleChange.bind(this, 1)
  }

  getValue() {
    const { range, value } = this.props
    let val = value
    if (range && !Array.isArray(value)) val = [0, 0]
    return val
  }

  bindElement(el) {
    this.innerElement = el
  }

  handleClick(e) {
    const {
      from, to, step, vertical,
    } = this.props
    const rect = this.innerElement.getBoundingClientRect()
    const per = vertical
      ? (e.clientY - rect.top) / rect.height
      : (e.clientX - rect.left) / rect.width
    const count = (to - from) / step
    const value = from + (Math.round(per * count) * step)
    this.props.onChange(value)
  }

  handleChange(index, value) {
    const { range } = this.props
    if (!range) this.props.onChange(value)
  }

  render() {
    const { style, vertical, ...other } = this.props
    const className = classnames(
      sliderClass('_', vertical && 'vertical'),
      this.props.className,
    )

    const value = this.getValue()

    return (
      <div style={style} className={className}>
        <div className={sliderClass('background')} />
        <div ref={this.bindElement} onClick={this.handleClick} className={sliderClass('inner')}>
          <Slider {...other} onChange={this.handleFirstChange} value={value} vertical={vertical} />
        </div>
      </div>
    )
  }
}

Container.propTypes = {
  ...getProps(PropTypes, 'disabled', 'type'),
  from: PropTypes.number,
  onChange: PropTypes.func,
  onDragEnd: PropTypes.func,
  renderResult: PropTypes.func,
  step: PropTypes.number,
  to: PropTypes.number,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
  ]),
  vertical: PropTypes.bool,
}

Container.defaultProps = {
  from: 0,
  step: 1,
  to: 100,
  value: 0,
  vertical: false,
}

export default Container
