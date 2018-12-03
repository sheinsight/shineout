import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import createReactContext from 'create-react-context'
import { getUidStr } from '../utils/uid'
import validate from '../utils/validate'
import { FormError } from '../utils/errors'
import { ERROR_TYPE } from '../Datum/types'

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

  handleUpdate(_, sn) {
    console.log(_, sn)
    if (sn === ERROR_TYPE) {
      console.log(11111)
      this.forceUpdate()
    } else {
      console.log(22222)
      this.validate()
    }
  }

  validate() {
    const { formDatum, name } = this.props
    const value = formDatum.get(name)
    const data = formDatum.getValue()
    let rules = [...this.props.rules]
    rules = rules.concat(formDatum.getRule(name))

    return validate(value, data, rules, 'array').then(() => {
      formDatum.setError(name, [])
      return true
    }, (e) => {
      formDatum.setError(name, e)
      return new FormError(e)
    })
  }

  render() {
    const {
      children, formDatum, loop, name, empty, defaultValue,
    } = this.props

    const fullName = this.getFullName()

    if (!loop) {
      return <Provider value={fullName}>{children}</Provider>
    }

    console.log(formDatum.$errors)

    let values = formDatum.get(name) || defaultValue
    if (values && !Array.isArray(values)) values = [values]
    if (values.length === 0 && empty) return empty()

    return values.map((v, i) => {
      if (!this.keys[i]) this.keys[i] = getUidStr()
      return (
        <Provider key={this.keys[i]} value={{ path: `${fullName}.[${i}]`, validate: this.validate }}>
          {children()}
        </Provider>
      )
    })
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
