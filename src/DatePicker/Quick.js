import React from 'react'
import PropTypes from 'prop-types'
import utils from './utils'
import { datepickerClass } from './styles'
import { getLocale } from '../locale'

export default class Quick extends React.Component {
  getOptions() {
    const { timeZone } = this.props
    return { timeZone, startOfWeek: getLocale('startOfWeek') }
  }

  compareDate(a, b) {
    const { type } = this.props
    return utils.compareDateArray(a, b, type, this.getOptions())
  }

  handleQuick(quick) {
    if (quick.invalid) {
      console.error(`the date you provider for ${quick.name} is invalid, please check the date in quickSelect!`)
      return
    }
    const { onChange } = this.props
    if (onChange) onChange(quick)
  }

  render() {
    const { quicks, current, children } = this.props
    const currentArray = Array.isArray(current) ? current : [current]
    if (!quicks) return children || null
    return (
      <div className={datepickerClass('quick-select')}>
        {quicks.map((q, i) => (
          <div
            onClick={this.handleQuick.bind(this, q)}
            className={datepickerClass(
              'quick-select-item',
              this.compareDate(q.value, currentArray) && 'quick-select-item-active'
            )}
            key={i}
          >
            {q.name}
          </div>
        ))}
      </div>
    )
  }
}

Quick.propTypes = {
  type: PropTypes.string,
  onChange: PropTypes.func,
  quicks: PropTypes.array,
  current: PropTypes.any,
  children: PropTypes.node,
  timeZone: PropTypes.string,
}
