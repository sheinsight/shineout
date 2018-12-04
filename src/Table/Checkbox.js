import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { CHANGE_TOPIC } from '../Datum/types'
import Checkbox from '../Checkbox/Checkbox'

export default class extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    datum: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  componentDidMount() {
    this.props.datum.subscribe(CHANGE_TOPIC, this.handleUpdate)
  }

  componentWillUnmount() {
    this.$willUnmount = true
    this.props.datum.unsubscribe(CHANGE_TOPIC, this.handleUpdate)
  }

  handleUpdate() {
    if (this.$willUnmount) return
    this.forceUpdate()
  }

  handleChange(_, checked, index) {
    const { data, datum } = this.props
    if (checked) {
      datum.add(data, index)
    } else {
      datum.remove(data, index)
    }
  }

  render() {
    const { data, datum } = this.props
    const checked = datum.check(data)
    const disabled = datum.disabled(data)
    return (
      <Checkbox
        {...this.props}
        checked={checked}
        disabled={disabled}
        onChange={this.handleChange}
      />
    )
  }
}
