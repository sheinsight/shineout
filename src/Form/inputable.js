import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { curry } from '../utils/func'
import validate from '../utils/validate'
import { formConsumer } from './formContext'
import { itemConsumer } from './itemContext'

const types = ['formDatum', 'disabled', 'onError']

export default curry((delay, Origin) =>
  formConsumer(types, itemConsumer(class extends PureComponent {
    static propTypes = {
      datum: PropTypes.object,
      defaultValue: PropTypes.any,
      delay: PropTypes.number,
      formDatum: PropTypes.object,
      name: PropTypes.string,
      onChange: PropTypes.func,
      onError: PropTypes.func,
      required: PropTypes.bool,
      rules: PropTypes.array,
      type: PropTypes.string,
      value: PropTypes.any,
    }

    static defaultProps = {
      delay,
      onError: () => {},
      rules: [],
    }

    constructor(props) {
      super(props)

      const { formDatum, name, defaultValue } = props

      this.state = {
        value: props.value || defaultValue,
      }

      this.handleChange = this.handleChange.bind(this)
      this.handleUpdate = this.handleUpdate.bind(this)
      this.validate = this.validate.bind(this)

      if (formDatum && name) {
        formDatum.listen(name, this.handleUpdate, defaultValue, this.validate)
        this.state.value = formDatum.get(name)
      }
    }

    componentWillUnmount() {
      const { formDatum, name } = this.props
      if (formDatum && name) {
        formDatum.unlisten(name, this.handleUpdate)
      }
    }

    getValue() {
      // if changeLocked, use state value
      if (this.changeLocked) return this.state.value

      const { formDatum, name, value } = this.props
      if (formDatum && name) return formDatum.get(name)
      return value === undefined ? this.state.value : value
    }

    validate(value) {
      const {
        onError, name, formDatum, type, datum,
      } = this.props

      let rules = [...this.props.rules]
      let data = {}
      if (formDatum && name) {
        rules = rules.concat(formDatum.getRule(name))
        data = formDatum.getValue()
      }

      if (datum) value = datum
      return validate(value, data, rules, type).then(() => {
        onError(name, null)
        return true
      }, (e) => {
        onError(name, e)
        return e
      })
    }

    change(value, ...args) {
      const { formDatum, name } = this.props
      if (formDatum && name) formDatum.set(name, value)
      else this.validate(value)

      if (this.props.onChange) this.props.onChange(value, ...args)
    }

    handleUpdate(value) {
      this.setState({ value })
      this.validate(value)
    }

    handleChange(value, ...args) {
      // use state as cache
      this.setState({ value })

      // handle change immediately
      if (this.props.delay === 0) {
        this.change(value, ...args)
        return
      }

      this.changeLocked = true
      if (this.changeTimer) clearTimeout(this.changeTimer)
      // delay validate
      this.changeTimer = setTimeout(() => {
        this.changeLocked = false
        this.change(value, ...args)
      }, this.props.delay)
    }

    render() {
      const {
        formDatum, value, required, ...other
      } = this.props

      console.log('render input', this.props.name, this.getValue())

      return (
        <Origin
          {...other}
          value={this.getValue()}
          onChange={this.handleChange}
        />
      )
    }
  })))
