import React from 'react'
import PropTypes from 'prop-types'
import createReactContext from '../context'
import { PureComponent } from '../component'
import { ERROR_TYPE, FORCE_PASS, IGNORE_VALIDATE } from '../Datum/types'
import validate from '../utils/validate'
import { getUidStr } from '../utils/uid'
import { range } from '../utils/numbers'
import { promiseAll, wrapFormError } from '../utils/errors'
import FieldError from './FieldError'

const { Provider, Consumer } = createReactContext()

const Tag = React.Fragment ? React.Fragment : 'span'

export default class Loop extends PureComponent {
  constructor(props) {
    super(props)

    this.contextValue = {
      bind: this.bindValidate.bind(this),
      unbind: this.unbindValidate.bind(this),
    }

    this.validate = this.validate.bind(this)
    this.selfValidate = this.selfValidate.bind(this)
    this.update = this.forceUpdate.bind(this)

    this.validations = [this.selfValidate]
    this.keys = []

    console.warn('Form.Loop is not recommend. Use Form.FieldSet instead.')
  }

  componentDidMount() {
    super.componentDidMount()
    const { formDatum, name, defaultValue } = this.props
    formDatum.bind(name, this.handleUpdate.bind(this), defaultValue, this.validate)
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    const { formDatum, name } = this.props
    if (formDatum && name) {
      formDatum.unbind(name, this.handleUpdate)
    }
  }

  bindValidate(val) {
    if (this.validations.indexOf(val) < 0) {
      this.validations.unshift(val)
    }
  }

  unbindValidate(val) {
    this.validations = this.validations.filter(v => v !== val)
  }

  selfValidate() {
    const { formDatum, name } = this.props
    const value = formDatum.get(name)
    const data = formDatum.getValue()
    let rules = [...this.props.rules]
    rules = rules.concat(formDatum.getRule(name))

    return validate(value, data, rules, 'array').then(
      () => {
        formDatum.setError(name, [])
        return true
      },
      e => {
        formDatum.setError(name, e)
        return wrapFormError(e)
      }
    )
  }

  updateWithValidate() {
    this.selfValidate().then(this.update)
  }

  validate(type) {
    // old api
    const value = type === FORCE_PASS ? FORCE_PASS : undefined
    return promiseAll(this.validations.map(v => v(value, undefined)))
  }

  handleUpdate(_, sn, type) {
    if (type === ERROR_TYPE || type === IGNORE_VALIDATE) {
      this.update()
    } else if (type === FORCE_PASS) {
      this.validate(FORCE_PASS)
    } else {
      this.selfValidate()
        .then(this.update)
        .catch(() => {})
    }
  }

  handleChange(index, value, fullSet) {
    const { formDatum, name } = this.props

    if (fullSet) {
      formDatum.set(name, value)
      return
    }

    const values = formDatum.get(name)
    if (!values) return

    values[index] = value
    formDatum.set(name, [...values])
  }

  handleInsert(index, value) {
    this.keys.splice(index, 0, getUidStr())
    const { formDatum, name } = this.props
    formDatum.insert(name, index, value)
    this.updateWithValidate()
  }

  handleRemove(index) {
    this.keys.splice(index, 1)
    const { formDatum, name } = this.props
    formDatum.splice(name, index)
    this.updateWithValidate()
  }

  render() {
    const { children, empty, formDatum, name, defaultValue } = this.props
    const values = formDatum.get(name) || defaultValue
    const error = formDatum.getError(name)

    if (values.length === 0 && empty) {
      return empty(this.handleInsert.bind(this, 0))
    }

    range(values.length, 0).forEach(i => {
      if (!this.keys[i]) this.keys[i] = getUidStr()
    })

    const errorList = Array.isArray(error) ? error : []
    const results = values.map((value, index) => (
      <Tag key={this.keys[index]}>
        {children({
          list: values,
          value,
          index,
          error: errorList[index],
          onChange: this.handleChange.bind(this, index),
          onInsert: this.handleInsert.bind(this, index),
          onAppend: this.handleInsert.bind(this, index + 1),
          onRemove: this.handleRemove.bind(this, index),
        })}
      </Tag>
    ))

    if (error instanceof Error) {
      results.push(<FieldError key="error" error={error} />)
    }

    return <Provider value={this.contextValue}>{results}</Provider>
  }
}

Loop.propTypes = {
  children: PropTypes.func.isRequired,
  defaultValue: PropTypes.array,
  empty: PropTypes.func,
  formDatum: PropTypes.object.isRequired,
  name: PropTypes.string,
  rules: PropTypes.array,
}

Loop.defaultProps = {
  defaultValue: [],
  rules: [],
}

// eslint-disable-next-line
export const loopConsumer = Origin => class extends PureComponent {
    render() {
      return <Consumer>{value => <Origin {...this.props} loopContext={value} />}</Consumer>
    }
  }
