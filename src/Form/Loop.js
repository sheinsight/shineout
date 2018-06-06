import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import immer from 'immer'
import validate from '../utils/validate'
import { getUidStr } from '../utils/uid'
import { range } from '../utils/numbers'
import Item from './Item'

const Tag = React.Fragment ? React.Fragment : 'span'

class Loop extends PureComponent {
  constructor(props) {
    super(props)

    this.validate = this.validate.bind(this)
    this.keys = []

    this.state = { error: null }

    const { formDatum, name } = props
    formDatum.bind(name, this.handleUpdate.bind(this), [], this.validate)
  }

  componentWillUnmount() {
    const { formDatum, name } = this.props
    if (formDatum && name) {
      formDatum.unbind(name, this.handleUpdate)
    }
  }

  selfValidate(value, data) {
    const { formDatum, name } = this.props
    let rules = [...this.props.rules]
    rules = rules.concat(formDatum.getRule(name))

    return validate(value, data, rules, 'array').then(() => {
      this.setState({ error: null })
      return true
    }, (e) => {
      this.setState({ error: e })
      return e
    })
  }

  validate(value, data) {
    return this.props.validate().then((results) => {
      if (results.length === 0) return true
      return !results.some(r => r !== true)
    }).then((result) => {
      if (!result) return result
      return this.selfValidate(value, data)
    })
  }

  handleUpdate() {
    this.forceUpdate()
  }

  handleChange(index, value, fullSet) {
    const { formDatum, name } = this.props

    if (fullSet) {
      this.selfValidate(value)
      formDatum.set(name, value)
      return
    }

    let values = formDatum.get(name)
    if (!values) return

    values = immer(values, (draft) => {
      draft[index] = value
    })

    this.selfValidate(values)

    formDatum.set(name, values)
  }

  handleInsert(index, value) {
    this.keys.splice(index, 0, getUidStr())
    const { formDatum, name } = this.props
    const values = immer(formDatum.get(name), (draft) => {
      draft.splice(index, 0, value)
    })

    formDatum.set(name, values)
  }

  handleRemove(index) {
    this.keys.splice(index, 1)
    const { formDatum, name } = this.props
    const values = immer(formDatum.get(name), (draft) => {
      draft.splice(index, 1)
    })

    formDatum.set(name, values)
  }

  render() {
    const {
      children, empty, formDatum, name,
    } = this.props
    const values = formDatum.get(name) || []

    const { error } = this.state

    if (values.length === 0 && empty) {
      return empty(this.handleInsert.bind(this, 0))
    }

    range(values.length, 0).forEach((i) => {
      if (!this.keys[i]) this.keys[i] = getUidStr()
    })

    const results = values.map((value, index) => (
      <Tag key={this.keys[index]}>
        {
          children({
            list: values,
            value,
            index,
            onChange: this.handleChange.bind(this, index),
            onInsert: this.handleInsert.bind(this, index),
            onAppend: this.handleInsert.bind(this, index + 1),
            onRemove: this.handleRemove.bind(this, index),
          })
        }
      </Tag>
    ))

    if (error) {
      results.push(<Item key="error" formItemErrors={{ error }} />)
    }

    return results
  }
}

Loop.propTypes = {
  children: PropTypes.func.isRequired,
  empty: PropTypes.func,
  formDatum: PropTypes.object.isRequired,
  name: PropTypes.string,
  rules: PropTypes.array,
  validate: PropTypes.func.isRequired,
}

Loop.defaultProps = {
  rules: [],
}

export default Loop
