import React, { Component } from 'react'
import PropTypes from 'prop-types'
import shallowEqual from '../utils/shallowEqual'
import utils from './utils'
import { getLocale } from '../locale'

export default Origin =>
  class extends Component {
    static propTypes = {
      format: PropTypes.string,
      onBlur: PropTypes.func,
      onChange: PropTypes.func,
      range: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
      type: PropTypes.string,
      value: PropTypes.any,
      allowSingle: PropTypes.bool,
    }

    constructor(props) {
      super(props)

      this.state = { value: props.value }
      this.handleBlur = this.handleBlur.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.rangeWithSingle = this.rangeWithSingle.bind(this)
    }

    componentDidMount() {
      this.convertValue(this.props.value)
    }

    shouldComponentUpdate(nextProps, nextState) {
      const options = { deep: ['defaultValue', 'name', 'value'] }
      return !(shallowEqual(nextProps, this.props, options) && shallowEqual(nextState, this.state, options))
    }

    componentDidUpdate(prevProps) {
      const { value } = this.props
      if (!shallowEqual(prevProps.value, value) && !shallowEqual(value, this.state.value)) {
        this.convertValue(value)
      }
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
      return this.props.range && !this.props.allowSingle && this.state.value.filter(v => v).length === 1
    }

    convertValue(value) {
      const { range } = this.props
      if (!value) {
        this.setState({ value })
        return undefined
      }
      const format = this.getFormat()

      if (!range) {
        const newValue = utils.format(utils.toDateWithFormat(value, format, undefined), format, {
          weekStartsOn: getLocale('startOfWeek'),
        })
        if (newValue !== value) this.props.onChange(newValue)
        else if (newValue !== this.state.value) this.setState({ value: newValue })
        return newValue
      }

      // expand
      const { quickSelect } = this.state

      const newValue = value.map(v => {
        if (!v) return undefined
        return utils.format(utils.toDateWithFormat(v, format, undefined), format, {
          weekStartsOn: getLocale('startOfWeek'),
        })
      })

      if (!shallowEqual(newValue, value)) {
        this.props.onChange(newValue, quickSelect)
      } else if (!shallowEqual(newValue, this.state.value)) {
        // reset quickSelect if newValue !== this.state.value
        this.setState({ value: newValue, quickSelect: null })
        return newValue
      }

      if (shallowEqual(newValue, [undefined, undefined])) {
        this.setState({ value: newValue, quickSelect: null })
      } else {
        this.state.value = newValue
      }

      return newValue
    }

    handleChange(value, callback, quickSelect) {
      const { range } = this.props
      const newState = { value }
      if (range) {
        newState.quickSelect = quickSelect
      }
      this.setState(newState, callback)
    }

    handleBlur() {
      if (this.rangeWithSingle()) {
        this.setState({ value: this.props.value })
      } else if (this.state.value !== this.props.value) this.props.onChange(this.state.value, this.state.quickSelect)
    }

    render() {
      const { value } = this.state

      return (
        <Origin
          {...this.props}
          onChange={this.handleChange}
          onValueBlur={this.handleBlur}
          onBlur={this.props.onBlur}
          value={value}
        />
      )
    }
  }
