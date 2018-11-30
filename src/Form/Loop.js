import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import createReactContext from 'create-react-context'
import immer from 'immer'
import { ERROR_TYPE } from '../Datum/types'
import validate from '../utils/validate'
import { getUidStr } from '../utils/uid'
import { range } from '../utils/numbers'
import { promiseAll, wrapFormError } from '../utils/errors'
import Item from './Item'

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

    this.validations = [this.selfValidate]
    this.keys = []
  }

  componentDidMount() {
    const { formDatum, name, defaultValue } = this.props
    formDatum.bind(
      name,
      this.handleUpdate.bind(this),
      defaultValue,
      this.validate,
    )
  }

  componentWillUnmount() {
    this.$willUnmount = true
    const { formDatum, name } = this.props
    if (formDatum && name) {
      formDatum.unbind(name, this.handleUpdate)
    }
  }

  bindValidate(val) {
    if (this.validations.indexOf(val) < 0) {
      this.validations.push(val)
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

    return validate(value, data, rules, 'array').then(() => {
      formDatum.removeError(name)
      formDatum.setError(name, [])
      return true
    }, (e) => {
      formDatum.removeError(name)
      formDatum.setError(name, e)
      return wrapFormError(e)
    })
  }

  validate() {
    return promiseAll(this.validations.map(v => v(undefined, undefined, true)))
  }

  handleUpdate(_, sn) {
    if (sn === ERROR_TYPE) {
      this.forceUpdate()
    } else {
      this.selfValidate().then(() => {
        this.forceUpdate()
      }).catch(() => {})
    }
  }

  handleChange(index, value, fullSet) {
    const { formDatum, name } = this.props

    if (fullSet) {
      formDatum.forceSet(name, value)
      return
    }

    let values = formDatum.get(name)
    if (!values) return

    values = immer(values, (draft) => {
      draft[index] = value
    })
    formDatum.forceSet(name, values)
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

  render() {
    const {
      children, empty, formDatum, name, defaultValue,
    } = this.props
    const values = formDatum.get(name) || defaultValue
    const error = formDatum.getError(name)

    if (values.length === 0 && empty) {
      return empty(this.handleInsert.bind(this, 0))
    }

    range(values.length, 0).forEach((i) => {
      if (!this.keys[i]) this.keys[i] = getUidStr()
    })

    const errorList = Array.isArray(error) ? error : []
    const results = values.map((value, index) => (
      <Tag key={this.keys[index]}>
        {
          children({
            list: values,
            value,
            index,
            error: errorList[index],
            onChange: this.handleChange.bind(this, index),
            onInsert: this.handleInsert.bind(this, index),
            onAppend: this.handleInsert.bind(this, index + 1),
            onRemove: this.handleRemove.bind(this, index),
          })
        }
      </Tag>
    ))

    if (error instanceof Error) {
      results.push(<Item key="error" formItemErrors={[error]} />)
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
    return (
      <Consumer>
        { value => <Origin {...this.props} loopContext={value} /> }
      </Consumer>
    )
  }
}

