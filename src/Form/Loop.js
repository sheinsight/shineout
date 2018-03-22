import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import immer from 'immer'
import { getUidStr } from '../utils/uid'
import { range } from '../utils/numbers'
import { formConsumer } from './formContext'

const Tag = React.Fragment ? React.Fragment : 'span'

class Loop extends PureComponent {
  constructor(props) {
    super(props)

    this.validate = this.validate.bind(this)
    this.keys = []

    const { formDatum, name } = props
    formDatum.listen(name, this.handleUpdate.bind(this), [], this.validate)
  }

  componentWillUnmount() {
    const { formDatum, name } = this.props
    if (formDatum && name) {
      formDatum.unlisten(name, this.handleUpdate)
    }
  }

  // eslint-disable-next-line
  validate(value) {
    return new Promise((resolve) => {
      resolve(true)
    })
  }

  handleUpdate() {
    this.forceUpdate()
  }

  handleChange(index, value) {
    const { formDatum, name } = this.props

    let values = formDatum.get(name)
    if (!values) return

    values = immer(values, (draft) => {
      draft[index] = value
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
    const { children, formDatum, name } = this.props
    const values = formDatum.get(name) || []

    range(values.length, 0).forEach((i) => {
      if (!this.keys[i]) this.keys[i] = getUidStr()
    })

    return values.map((value, index) => (
      <Tag key={this.keys[index]}>
        {
          children({
            value,
            index,
            onChange: this.handleChange.bind(this, index),
            onRemove: this.handleRemove.bind(this, index),
          })
        }
      </Tag>
    ))
  }
}

Loop.propTypes = {
  children: PropTypes.func.isRequired,
  formDatum: PropTypes.object.isRequired,
  name: PropTypes.string,
}

export default formConsumer(null, Loop)
