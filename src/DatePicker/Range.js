import React from 'react'
import PropTypes from 'prop-types'
import immer from 'immer'
import { PureComponent } from '../component'
import shallowEqual from '../utils/shallowEqual'
import utils from './utils'
import Picker from './Picker'
import { datepickerClass } from '../styles'

class Range extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      hover: undefined,
      rangeDate: props.value,
    }

    this.pickers = []

    this.handleFirstChange = this.handleChange.bind(this, 0)
    this.handleSecondChange = this.handleChange.bind(this, 1)
    this.handleDayHover = this.handleDayHover.bind(this)
    this.bindFirstPicker = this.bindPicker.bind(this, 0)
    this.bindSecondPicker = this.bindPicker.bind(this, 1)
    this.handleDisabledStart = this.handleDisabled.bind(this, 'start')
    this.handleDisabledEnd = this.handleDisabled.bind(this, 'end')
  }

  componentDidUpdate(prevProps) {
    const { rangeDate } = this.state
    if (
      rangeDate.length !== 1 &&
      !shallowEqual(prevProps.value, this.props.value) &&
      !shallowEqual(this.state.rangeDate, this.props.value)
    ) {
      // eslint-disable-next-line
      this.setState({ rangeDate: this.props.value })
    }
  }

  bindPicker(index, el) {
    this.pickers[index] = el
  }

  resetRange(rangeDate) {
    this.setState({ rangeDate, hover: undefined })
  }

  handleDayHover(date) {
    if (this.state.rangeDate.length === 1) {
      utils.cloneTime(date, this.props.value[1], this.props.format)
      this.setState({ hover: date })
    }
  }

  handleChange(index, date, change, end, mode) {
    const { type, format, defaultTime, range } = this.props

    if (!change) {
      const current = immer(this.props.current, draft => {
        draft[index] = date
      })
      this.props.onChange(current)
      return
    }

    if (mode === 'time') {
      let endChangedDate
      this.setState(
        immer(draft => {
          draft.rangeDate[index] = date
          const [s, e] = draft.rangeDate
          if (index !== 0) return
          if (range && utils.compareAsc(s, e) === 1) {
            endChangedDate = date
            draft.rangeDate[1] = endChangedDate
          }
          if (typeof range === 'number' && utils.compareAsc(s, utils.addSeconds(e, -range)) < 0) {
            endChangedDate = utils.addSeconds(s, range)
            draft.rangeDate[1] = endChangedDate
          }
        }),
        () => {
          const current = immer(this.props.value, draft => {
            draft[index] = date
            if (endChangedDate) draft[1] = endChangedDate
          })
          this.props.onChange(current, true)
        }
      )
      return
    }

    if (type === 'month') {
      const rangeDate = [...this.state.rangeDate]
      rangeDate[index] = date
      if (rangeDate.some(v => !utils.isInvalid(v))) {
        rangeDate.sort((a, b) => a.getTime() - b.getTime())
      }
      this.setState({ rangeDate })
      this.props.onChange(rangeDate, true)

      return
    }

    utils.cloneTime(date, this.props.value[index])

    if (this.state.rangeDate.length !== 1) {
      this.setState({ rangeDate: [date], hover: undefined })
      return
    }

    this.setState(
      immer(draft => {
        const method = utils.compareAsc(draft.rangeDate[0], date) > 0 ? 'unshift' : 'push'
        draft.rangeDate[method](date)
        draft.rangeDate.map((d, i) => utils.formatDateWithDefaultTime(d, defaultTime[i], format))
        draft.hover = undefined
      }),
      () => {
        this.props.onChange(this.state.rangeDate, true, type === 'date')
      }
    )
  }

  handleDisabled(type, date) {
    const { disabled } = this.props
    if (disabled) {
      return disabled(date, type)
    }
    return false
  }

  render() {
    const { current, value, range, ...props } = this.props
    const rangeDate = [...this.state.rangeDate]

    let rangeTemp
    if (rangeDate.length === 1) {
      // eslint-disable-next-line
      rangeTemp = rangeDate[0]
      const method = utils.compareAsc(rangeDate[0], this.state.hover) > 0 ? 'unshift' : 'push'
      rangeDate[method](this.state.hover)
    }

    return (
      <div className={datepickerClass('range-picker')}>
        <Picker
          {...props}
          pos="start"
          disabled={this.handleDisabledStart}
          index={0}
          max={rangeDate[1]}
          current={current[0]}
          range={typeof range === 'number' ? range : undefined}
          rangeDate={rangeDate}
          rangeTemp={rangeTemp}
          onChange={this.handleFirstChange}
          onDayHover={this.handleDayHover}
          ref={this.bindFirstPicker}
          value={utils.toDateWithFormat(value[0], props.format)}
          showTimePicker={value.length === 2}
        />
        <Picker
          {...props}
          disabled={this.handleDisabledEnd}
          index={1}
          min={rangeDate[0]}
          current={current[1]}
          range={typeof range === 'number' ? range : undefined}
          rangeDate={rangeDate}
          rangeTemp={rangeTemp}
          onChange={this.handleSecondChange}
          onDayHover={this.handleDayHover}
          ref={this.bindSecondPicker}
          value={utils.toDateWithFormat(value[1], props.format)}
          showTimePicker={value.length === 2}
        />
      </div>
    )
  }
}

Range.propTypes = {
  current: PropTypes.array,
  disabled: PropTypes.func,
  format: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  range: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  value: PropTypes.array,
  type: PropTypes.string.isRequired,
  defaultTime: PropTypes.array,
}

Range.defaultProps = {
  value: [],
}

export default Range
