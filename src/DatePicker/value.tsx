import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import shallowEqual from '../utils/shallowEqual'
import utils from './utils'
import { getLocale } from '../locale'
import { DatePickerValueProps, DatePickerValue as DatePickerValueType, QuickSelect } from './Props'

interface DatePickerState {
  value: DatePickerValueType
  quickSelect?: QuickSelect | null
}

export default <Props extends DatePickerValueProps>(Origin: React.ComponentType<Props>) =>
  class DatePickerValue extends Component<Props, DatePickerState> {
    constructor(props: Props) {
      super(props)

      this.state = { value: props.value }
      this.handleBlur = this.handleBlur.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.rangeWithSingle = this.rangeWithSingle.bind(this)
    }

    componentDidMount() {
      this.convertValue(this.props.value)
    }

    shouldComponentUpdate(nextProps: Props, nextState: DatePickerState) {
      const options = { deep: ['defaultValue', 'name', 'value'] }
      return !(shallowEqual(nextProps, this.props, options) && shallowEqual(nextState, this.state, options))
    }

    componentDidUpdate(prevProps: Props) {
      const { value } = this.props
      if (!shallowEqual(prevProps.value, value) && !shallowEqual(value, this.state.value)) {
        this.convertValue(value)
      }
    }

    getOptions() {
      const { timeZone } = this.props
      return { timeZone, weekStartsOn: getLocale('startOfWeek') }
    }

    getFormat() {
      const { format, type } = this.props
      if (format) return format
      switch (type) {
        case 'datetime':
          return 'yyyy-MM-dd HH:mm:ss'
        case 'month':
          return 'yyyy-MM'
        case 'time':
          return 'HH:mm:ss'
        case 'week':
          return 'RRRR II'
        default:
          return 'yyyy-MM-dd'
      }
    }

    rangeWithSingle() {
      if (!this.state.value) return false
      return (
        this.props.range &&
        !this.props.allowSingle &&
        Array.isArray(this.state.value) &&
        this.state.value.filter(v => v).length === 1
      )
    }

    convertValue(value: DatePickerValueType) {
      const { range, onChange } = this.props
      if (!value) {
        this.setState({ value })
        return undefined
      }
      const format = this.getFormat()

      if (!range) {
        const newValue = utils.format(
          utils.toDateWithFormat(value as Date, format, undefined, this.getOptions()),
          format as string,
          this.getOptions()
        )
        if (newValue !== value && onChange) onChange(newValue)
        else if (newValue !== this.state.value) this.setState({ value: newValue })
        return newValue
      }

      // expand
      const { quickSelect } = this.state
      const newValue: Date[] = (value as Date[]).map(v => {
        if (!v) return undefined
        return utils.format(
          utils.toDateWithFormat(v, format, undefined, this.getOptions()),
          format as string,
          this.getOptions()
        )
      })

      if (!shallowEqual(newValue, value)) {
        if (onChange) onChange(newValue, quickSelect)
      } else if (!shallowEqual(newValue, this.state.value)) {
        // reset quickSelect if newValue !== this.state.value
        this.setState({ value: newValue, quickSelect: null })
        return newValue
      }

      if (shallowEqual(newValue, [undefined, undefined])) {
        this.setState({ value: newValue, quickSelect: null })
      } else {
        // @ts-ignore
        this.state.value = newValue
      }

      return newValue
    }

    handleChange(value: DatePickerValueType, callback?: () => void, quickSelect?: QuickSelect) {
      const { range } = this.props
      const newState: { value: DatePickerValueType; quickSelect?: QuickSelect } = { value }
      if (range) {
        newState.quickSelect = quickSelect
      }
      this.setState(newState, callback)
    }

    handleBlur() {
      const { onChange } = this.props
      if (this.rangeWithSingle()) {
        this.setState({ value: this.props.value })
      } else if (this.state.value !== this.props.value && onChange) onChange(this.state.value, this.state.quickSelect)
    }

    render() {
      const { value } = this.state

      return <Origin {...this.props} onChange={this.handleChange} onValueBlur={this.handleBlur} value={value} />
    }
  }
