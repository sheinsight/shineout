import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { range } from '../utils/numbers'
import { datepickerClass } from '../styles'

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
    setTimeout(() => {
      this.scrollToValue()
    })
  }

  bindElement(el) {
    this.element = el
  }

  scrollToValue() {
    const { value } = this.props
    this.element.scrollTop = lineHeight * value
  }

  handleClick(value) {
    this.props.onChange(value)
    this.element.scrollTop = lineHeight * value
  }

  handleMouseLeave() {
    const value = Math.round(this.element.scrollTop / lineHeight)
    this.element.scrollTop = lineHeight * value
  }

  handleScroll() {
    const value = Math.round(this.element.scrollTop / lineHeight)
    if (value !== this.props.value) this.props.onChange(value)
  }

  renderItem(num) {
    const { ampm, total, value } = this.props
    let text = num
    if (ampm) text = ['am', 'pm'][num]
    else if (total === 12 && num === 0) text = '12'
    else if (num < 10) text = `0${num}`

    const className = datepickerClass(value === num && 'time-active')
    return (
      <span
        key={num}
        className={className}
        style={grayStyle[Math.abs(value - num)]}
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
        { range(total, 0).map(v => this.renderItem(v)) }
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
}

TimeScroll.defaultProps = {
  total: 60,
}

export default TimeScroll
