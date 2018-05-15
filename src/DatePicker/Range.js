import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import immer from 'immer'
import utils from './utils'
import Picker from './Picker'
import { datepickerClass } from '../styles'

class Range extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      hover: undefined,
      range: props.value,
    }

    this.pickers = []

    this.handleFirstChange = this.handleChange.bind(this, 0)
    this.handleSecondChange = this.handleChange.bind(this, 1)
    this.handleDayHover = this.handleDayHover.bind(this)
    this.bindFirstPicker = this.bindPicker.bind(this, 0)
    this.bindSecondPicker = this.bindPicker.bind(this, 1)
  }

  bindPicker(index, el) {
    this.pickers[index] = el
  }

  resetRange(range) {
    this.setState({ range, hover: undefined })
  }

  handleDayHover(date) {
    if (this.state.range.length === 1) {
      utils.cloneTime(date, this.props.value[1], this.props.format)
      this.setState({ hover: date })
    }
  }

  handleChange(index, date, change, end, mode) {
    const { type } = this.props

    if (!change) {
      const current = immer(this.props.current, (draft) => {
        draft[index] = date
      })
      this.props.onChange(current)
      return
    }

    if (mode === 'time') {
      this.setState(immer((draft) => {
        draft.range[index] = date
      }), () => {
        const current = immer(this.props.value, (draft) => {
          draft[index] = date
        })
        this.props.onChange(current, true)
      })
      return
    }

    if (type === 'month') {
      const range = [...this.state.range]
      range[index] = date
      if (range.some(v => !utils.isInvalid(v))) {
        range.sort((a, b) => a.getTime() - b.getTime())
      }
      this.setState({ range })
      this.props.onChange(range, true)

      return
    }

    utils.cloneTime(date, this.props.value[index])

    if (this.state.range.length !== 1) {
      this.setState({ range: [date], hover: undefined })
      return
    }

    this.setState(immer((draft) => {
      const method = utils.compareAsc(draft.range[0], date) > 0 ? 'unshift' : 'push'
      draft.range[method](date)
      draft.hover = undefined
    }), () => {
      this.props.onChange(this.state.range, true, type === 'date')
    })
  }

  render() {
    const { current, value, ...props } = this.props
    const range = [...this.state.range]
    if (range.length === 1) {
      const method = utils.compareAsc(range[0], this.state.hover) > 0 ? 'unshift' : 'push'
      range[method](this.state.hover)
    }

    return (
      <div className={datepickerClass('range-picker')}>
        <Picker
          {...props}
          index={0}
          max={range[1]}
          current={current[0]}
          range={range}
          onChange={this.handleFirstChange}
          onDayHover={this.handleDayHover}
          ref={this.bindFirstPicker}
          value={utils.toDateWithFormat(value[0], props.format)}
        />
        <Picker
          {...props}
          index={1}
          min={range[0]}
          current={current[1]}
          range={range}
          onChange={this.handleSecondChange}
          onDayHover={this.handleDayHover}
          ref={this.bindSecondPicker}
          value={utils.toDateWithFormat(value[1], props.format)}
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
  value: PropTypes.array,
  type: PropTypes.string.isRequired,
}

Range.defaultProps = {
  value: [],
}

export default Range
