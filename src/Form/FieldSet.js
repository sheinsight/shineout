import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import immer from 'immer'
import createReactContext from 'create-react-context'
import { getUidStr } from '../utils/uid'
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
    this.keys = []

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
    console.log(_, sn)
    if (sn === ERROR_TYPE || sn === FORCE_PASS) {
      this.forceUpdate()
    } else {
      this.validate().then(() => {
        this.forceUpdate()
      })
    }
  }

  handleInsert(index, value) {
    this.keys.splice(index, 0, getUidStr())
    const { formDatum, name } = this.props
    const values = immer(formDatum.get(name), (draft) => {
      draft.splice(index, 0, value)
    })
    formDatum.forceSet(name, values)
  }

  handleRemove(index) {
    this.keys.splice(index, 1)
    const { formDatum, name } = this.props
    const values = immer(formDatum.get(name), (draft) => {
      draft.splice(index, 1)
    })
    formDatum.forceSet(name, values)
  }

  handleChange(index, value) {
    const fullName = this.getFullName()
    this.props.formDatum.set(`${fullName}[${index}]`, value)
  }

  render() {
    const {
      children, formDatum, loop, name, empty, defaultValue,
    } = this.props

    const fullName = this.getFullName()
    const error = formDatum.getError(fullName)

    if (!loop) {
      return <Provider value={fullName}>{children}</Provider>
    }

    let values = formDatum.get(name) || defaultValue
    if (values && !Array.isArray(values)) values = [values]
    if (values.length === 0 && empty) return empty()

    const errorList = Array.isArray(error) ? error : []

    const result = values.map((v, i) => {
      if (!this.keys[i]) this.keys[i] = getUidStr()
      return (
        <Provider key={i} value={{ path: `${fullName}.[${i}]`, val: this.validate }}>
          {
            children({
              list: values,
              value: formDatum.get(`${fullName}.[${i}]`),
              index: i,
              error: errorList[i],
              onChange: this.handleChange.bind(this, i),
              onInsert: this.handleInsert.bind(this, i),
              onAppend: this.handleInsert.bind(this, i + 1),
              onRemove: this.handleRemove.bind(this, i),
            })
          }
        </Provider>
      )
    })

    if (error instanceof Error) {
      result.push(<Item key="error" formItemErrors={[error]} />)
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
  loop: PropTypes.bool,
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
