import React from 'react'
import PropTypes from 'prop-types'
import createReactContext from '../context'
import { Component } from '../component'
import { filterProps } from '../utils/objects'
import validate from '../utils/validate'
import { FormError, isSameError } from '../utils/errors'
import { ERROR_TYPE, FORCE_PASS, IGNORE_VALIDATE } from '../Datum/types'
import FieldError from './FieldError'

const { Provider, Consumer } = createReactContext()

const extendName = (path = '', name) => {
  if (name === undefined) return undefined
  if (name === '') return path
  if (Array.isArray(name)) return name.map(n => extendName(path, n))
  return `${path}${path.length > 0 ? '.' : ''}${name}`
}

class FieldSet extends Component {
  constructor(props) {
    super(props)

    this.validate = this.validate.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  componentDidMount() {
    super.componentDidMount()
    const { formDatum, name, defaultValue } = this.props
    formDatum.bind(name, this.handleUpdate, defaultValue, this.validate)
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    const { formDatum, name } = this.props
    formDatum.unbind(name, this.handleUpdate)
  }

  validate() {
    const { formDatum, name } = this.props
    const value = formDatum.get(name)
    const data = formDatum.getValue()
    const validateProps = filterProps(this.props, v => typeof v === 'string' || typeof v === 'number')
    validateProps.type = 'array'
    let rules = [...this.props.rules]
    rules = rules.concat(formDatum.getRule(name))

    if (rules.length === 0) return Promise.resolve(true)

    return validate(value, data, rules, validateProps).then(
      () => {
        this.handleError()
        return true
      },
      e => {
        this.handleError(e)
        return new FormError(e)
      }
    )
  }

  updateWithValidate() {
    this.validate().then(() => {
      this.forceUpdate()
    })
  }

  handleError(error) {
    const { formDatum, name, onError } = this.props
    if (isSameError(error, formDatum.getError(name, true))) return
    formDatum.setError(name, error, true)
    if (onError) onError(error)
  }

  handleUpdate(v, n, type) {
    if (this.updateTimer) clearTimeout(this.updateTimer)
    this.updateTimer = setTimeout(() => {
      if (type === ERROR_TYPE || type === FORCE_PASS || type === IGNORE_VALIDATE) {
        this.forceUpdate()
      } else {
        this.updateWithValidate()
      }
    })
  }

  handleInsert(index, value) {
    const { formDatum, name } = this.props
    formDatum.insert(name, index, value)
    this.updateWithValidate()
  }

  handleRemove(index) {
    const { formDatum, name } = this.props
    formDatum.splice(name, index)
    this.updateWithValidate()
  }

  handleChange(index, value, update) {
    const { formDatum, name } = this.props
    formDatum.set(`${name}[${index}]`, value)
    if (update) this.updateWithValidate()
  }

  render() {
    const { children, formDatum, name, empty, defaultValue } = this.props

    const errors = formDatum.getError(name)
    const result = []

    if (typeof children !== 'function') {
      return (
        <Provider value={{ path: name, val: this.validate }}>
          {children}
          {errors instanceof Error && <FieldError key="error" error={errors} />}
        </Provider>
      )
    }

    let values = formDatum.get(name) || defaultValue || []
    if (values && !Array.isArray(values)) values = [values]
    if (values.length === 0 && empty) {
      result.push(empty(this.handleInsert.bind(this, 0)))
    } else {
      const errorList = Array.isArray(errors) ? errors : []
      values.forEach((v, i) => {
        const error = errorList[i]
        result.push(
          <Provider key={i} value={{ path: `${name}[${i}]`, val: this.validate }}>
            {children({
              list: values,
              value: v,
              index: i,
              error,
              datum: formDatum,
              onChange: this.handleChange.bind(this, i),
              onInsert: this.handleInsert.bind(this, i),
              onAppend: this.handleInsert.bind(this, i + 1),
              onRemove: this.handleRemove.bind(this, i),
            })}
          </Provider>
        )
      })
    }

    if (errors instanceof Error) {
      result.push(<FieldError key="error" error={errors} />)
    }

    return result
  }
}

FieldSet.propTypes = {
  children: PropTypes.any,
  defaultValue: PropTypes.array,
  empty: PropTypes.func,
  formDatum: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  onError: PropTypes.func,
  rules: PropTypes.array,
}

FieldSet.defaultProps = {
  rules: [],
}

export const fieldSetConsumer = Origin => props => (
  <Consumer>
    {({ path, val } = {}) => (
      <Origin
        {...props}
        // eslint-disable-next-line
        name={extendName(path, props.name)}
        innerFormNamePath={path}
        fieldSetValidate={val}
      />
    )}
  </Consumer>
)

export const FieldSetProvider = Provider

export default fieldSetConsumer(FieldSet)
