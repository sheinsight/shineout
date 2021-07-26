import React from 'react'
import PropTypes from 'prop-types'
import { PureComponent } from '../component'
import { datepickerClass } from '../styles'
import utils from './utils'
import Year from './Year'
import Month from './Month'
import Day from './Day'
import Time from './Time'
import Quick from './Quick'

class Picker extends PureComponent {
  constructor(props) {
    super(props)

    let mode
    switch (props.type) {
      case 'month':
        mode = 'month'
        break
      case 'time':
        mode = 'time'
        break
      default:
        mode = 'day'
    }

    this.state = { mode }
    this.defaultCurrent = new Date(
      utils.formatDateWithDefaultTime(utils.newDate(), undefined, props.defaultTime[0], 'yyyy-MM-dd HH:mm:ss')
    )
    this.handleModeChange = this.handleModeChange.bind(this)
    this.handleEnter = this.handleMouse.bind(this, true)
    this.handleLeave = this.handleMouse.bind(this, false)
    this.handleQuick = this.handleQuick.bind(this)
  }

  handleQuick(quick) {
    const { onChange } = this.props
    onChange(...utils.quickHandleChangeParams(quick.value[0], true, null, null, quick))
  }

  handleMouse(isEnter, e) {
    // stop
    e.stopPropagation()

    const { index, handleHover } = this.props

    handleHover(index, isEnter)
  }

  handleModeChange(mode) {
    setTimeout(() => {
      this.setState({ mode })
    }, 10)
  }

  render() {
    const { mode } = this.state
    const { current, index, children, ...otherProps } = this.props

    let Render
    switch (mode) {
      case 'year':
        Render = Year
        break
      case 'month':
        Render = Month
        break
      case 'time':
        Render = Time
        break
      default:
        Render = Day
    }

    // only range has index prop
    if (index === undefined)
      return (
        <div className={datepickerClass('split')}>
          <Quick {...otherProps} current={current || this.defaultCurrent} onChange={this.handleQuick} />
          <Render {...otherProps} current={current || this.defaultCurrent} onModeChange={this.handleModeChange} />
        </div>
      )

    return (
      <div onMouseEnter={this.handleEnter} onMouseLeave={this.handleLeave}>
        <Render
          {...otherProps}
          index={index}
          current={current || this.defaultCurrent}
          onModeChange={this.handleModeChange}
        />
      </div>
    )
  }
}

Picker.propTypes = {
  current: PropTypes.object,
  disabled: PropTypes.func,
  format: PropTypes.string,
  max: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  min: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onChange: PropTypes.func.isRequired,
  value: PropTypes.object,
  type: PropTypes.string.isRequired,
  index: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  handleHover: PropTypes.func,
  defaultTime: PropTypes.array,
}

export default Picker
