import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { range } from '../utils/numbers'
import { datepickerClass } from '../styles'
import utils from './utils'

const lineHeight = 30
const grayStyle = {
  1: { color: '#888' },
  2: { color: '#ccc' },
  3: { color: '#eee' },
}

class TimeScroll extends PureComponent {
  constructor(props) {
    super(props)

    this.bindElement = this.bindElement.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    this.updateScrollTop()
  }

  componentDidUpdate() {
    this.updateScrollTop()
  }

  getValue(v) {
    const { step, ampm } = this.props
    if (!step || ampm) return v
    return Math.ceil(v / step)
  }

  getItemStyle(num, isDisabled) {
    if (isDisabled) return null
    if (this.props.ampm || (typeof this.props.step === 'number' && this.props.step > 0)) {
      if (this.props.value % this.props.step) return null
      return grayStyle[Math.ceil(Math.abs(this.props.value - num) / this.props.step)]
    }
    return grayStyle[Math.abs(this.props.value - num)]
  }

  bindElement(el) {
    this.element = el
  }

  updateScrollTop() {
    const { value } = this.props
    if (!this.element) return
    if (typeof this.props.step === 'number' && this.props.step > 0 && value % this.props.step) return
    if (this.element.scrollTop !== lineHeight * value) {
      setTimeout(() => {
        if (this.element) this.scrollToValue()
      })
    }
  }

  scrollToValue() {
    const { value } = this.props
    this.element.scrollTop = lineHeight * this.getValue(value)
  }

  handleClick(value) {
    this.props.onChange(value)
    this.element.scrollTop = lineHeight * this.getValue(value)
  }

  handleMouseLeave() {
    const value = Math.round(this.element.scrollTop / lineHeight)
    this.element.scrollTop = lineHeight * value
  }

  handleScroll() {
    const { step, ampm } = this.props
    const value = Math.round(this.element.scrollTop / lineHeight)
    if (typeof step === 'number' && step > 0 && !ampm && value !== this.props.value) {
      this.props.onChange(value * step)
      return
    }
    if (value !== this.props.value) this.props.onChange(value)
  }

  renderItem(num) {
    const { ampm, total, value, step, mode, min, max, range: ra, current, disabled, disabledTime } = this.props

    if (typeof step === 'number' && step <= 0) return null
    if (!ampm && typeof step === 'number' && num % step !== 0) return null

    let text = num
    if (ampm) text = ['am', 'pm'][num]
    else if (total === 12 && num === 0) text = '12'
    else if (num < 10) text = `0${num}`

    const [isDisabled] = utils.judgeTimeByRange(num, current, mode, min, max, ra, disabled, disabledTime)

    const className = datepickerClass(!isDisabled && value === num && 'time-active')
    return (
      <span
        key={num}
        className={className}
        style={this.getItemStyle(num, isDisabled)}
        onClick={this.handleClick.bind(this, num)}
      >
        {text}
      </span>
    )
  }

  render() {
    const { total } = this.props
    return (
      <div
        ref={this.bindElement}
        className={datepickerClass('time-list')}
        onMouseLeave={this.handleMouseLeave}
        onScroll={this.handleScroll}
      >
        <div className={datepickerClass('pad')} />
        {range(total, 0).map(v => this.renderItem(v))}
        <div className={datepickerClass('pad')} />
      </div>
    )
  }
}

TimeScroll.propTypes = {
  ampm: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  total: PropTypes.number,
  value: PropTypes.number.isRequired,
  step: PropTypes.number,
  disabled: PropTypes.func,
  min: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  max: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  range: PropTypes.number,
  current: PropTypes.object,
  mode: PropTypes.string,
  disabledTime: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
}

TimeScroll.defaultProps = {
  total: 60,
}

export default TimeScroll
