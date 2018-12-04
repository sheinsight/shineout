import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import immer from 'immer'
import createReactContext from 'create-react-context'
import validate from '../utils/validate'
import { FormError } from '../utils/errors'
import { ERROR_TYPE, FORCE_PASS } from '../Datum/types'
import Item from './Item'

const { Provider, Consumer } = createReactContext()

const extendName = (path = '', name) => {
  if (!name) return undefined
  if (Array.isArray(name)) return name.map(n => extendName(path, n))
  return `${path}${path.length > 0 ? '.' : ''}${name}`
}

class FieldSet extends PureComponent {
  constructor(props) {
    super(props)
    this.validate = this.validate.bind(this)
  }

  componentDidMount() {
    const { formDatum, defaultValue } = this.props
    formDatum.bind(
      this.getFullName(),
      this.handleUpdate.bind(this),
      defaultValue,
      this.validate,
    )
  }

  componentWillUnmount() {
    this.$willUnmount = true
    this.props.formDatum.unbind(this.getFullName(), this.handleUpdate)
  }

  getFullName() {
    return extendName(this.props.innerFormNamePath, this.props.name)
  }

  validate(pub) {
    const { formDatum, name } = this.props
    const value = formDatum.get(name)
    const data = formDatum.getValue()
    let rules = [...this.props.rules]
    rules = rules.concat(formDatum.getRule(name))

    return validate(value, data, rules, 'array').then(() => {
      formDatum.setError(name, [], pub)
      return true
    }, (e) => {
      formDatum.setError(name, e, pub)
      return new FormError(e)
    })
  }

  handleUpdate(_, sn) {
    if (this.updateTimer) clearTimeout(this.updateTimer)
    this.updateTimer = setTimeout(() => {
      if (sn === ERROR_TYPE || sn === FORCE_PASS) {
        if (this.$willUnmount) return
        this.forceUpdate()
      } else {
        this.validate().then(() => {
          if (this.$willUnmount) return
          this.forceUpdate()
        })
      }
    })
  }

  handleInsert(index, value) {
    const { formDatum, name } = this.props
    const values = immer(formDatum.get(name), (draft) => {
      draft.splice(index, 0, value)
    })
    formDatum.insertError(name, index)
    formDatum.forceSet(name, values)
  }

  handleRemove(index) {
    const { formDatum, name } = this.props
    const values = immer(formDatum.get(name), (draft) => {
      draft.splice(index, 1)
    })
    formDatum.spliceError(name, index)
    formDatum.forceSet(name, values)
  }

  handleChange(index, value) {
    const fullName = this.getFullName()
    this.props.formDatum.set(`${fullName}[${index}]`, value)
  }

  render() {
    const {
      children, formDatum, name, empty, defaultValue,
    } = this.props

    const errors = formDatum.getError(name)
    const result = []

    if (typeof children !== 'function') {
      return <Provider value={{ path: name, val: this.validate }}>{children}</Provider>
    }

    let values = formDatum.get(name) || defaultValue
    if (values && !Array.isArray(values)) values = [values]
    if (values.length === 0 && empty) {
      result.push(empty(this.handleInsert.bind(this, 0)))
    } else {
      const errorList = Array.isArray(errors) ? errors : []
      values.forEach((v, i) => {
        const error = errorList[i]
        result.push((
          <Provider key={i} value={{ path: `${name}.[${i}]`, val: this.validate }}>
            {
              children({
                list: values,
                value: formDatum.get(`${name}.[${i}]`),
                index: i,
                error,
                onChange: this.handleChange.bind(this, i),
                onInsert: this.handleInsert.bind(this, i),
                onAppend: this.handleInsert.bind(this, i + 1),
                onRemove: this.handleRemove.bind(this, i),
              })
            }
          </Provider>
        ))

        if (error instanceof Error) {
          result.push(<Item key={`er-${i}`} formItemErrors={[error]} />)
        }
      })
    }

    if (errors instanceof Error) {
      result.push(<Item key="error" formItemErrors={[errors]} />)
    }

    return result
  }
}

FieldSet.propTypes = {
  children: PropTypes.any,
  defaultValue: PropTypes.array,
  empty: PropTypes.func,
  formDatum: PropTypes.object.isRequired,
  innerFormNamePath: PropTypes.string,
  name: PropTypes.string.isRequired,
  rules: PropTypes.array,
}

FieldSet.defaultProps = {
  defaultValue: [],
  rules: [],
}

export const fieldSetConsumer = Origin => props => (
  <Consumer>
    { ({ path, val } = {}) => (
      <Origin
        {...props}
        name={extendName(path, props.name)}
        innerFormNamePath={path}
        fieldSetValidate={val}
      />
    ) }
  </Consumer>
)

export default fieldSetConsumer(FieldSet)
