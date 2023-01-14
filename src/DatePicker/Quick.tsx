import React from 'react'
import utils from './utils'
import { datepickerClass } from './styles'
import { getLocale } from '../locale'
import { QuickProps } from './Props'

export default class Quick extends React.Component<QuickProps> {
  getOptions() {
    const { timeZone } = this.props
    return { timeZone, startOfWeek: getLocale('startOfWeek') }
  }

  compareDate(a: Date[], b: Date[]) {
    const { type } = this.props
    return utils.compareDateArray(a, b, type, this.getOptions())
  }

  handleQuick(quick: { invalid: boolean; value: Date[]; name: string }) {
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
        {quicks.map(q => (
          <div
            onClick={this.handleQuick.bind(this, q)}
            className={datepickerClass(
              'quick-select-item',
              this.compareDate(q.value, currentArray) && 'quick-select-item-active'
            )}
            key={q.name}
          >
            {q.name}
          </div>
        ))}
      </div>
    )
  }
}
