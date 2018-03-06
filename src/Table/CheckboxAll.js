import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Checkbox from '../Checkbox'

export default class extends PureComponent {
  static propTypes = {
    data: PropTypes.array,
    value: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  componentDidMount() {
    this.props.value.listen('change', this.handleUpdate)
  }

  componentWillUnmount() {
    this.props.value.unlisten('change', this.handleUpdate)
  }

  getChecked() {
    const { data, value } = this.props
    if (value.length === 0 || !data) return false

    let checked
    for (const d of data) {
      if (value.disabled(d)) continue
      const p = value.check(d)
      if (checked === undefined) {
        checked = p
      } else if (checked !== p) {
        return 'indeterminate'
      }
    }

    return checked
  }

  handleUpdate() {
    this.forceUpdate()
  }

  handleChange(_, checked, index) {
    const { data, value } = this.props
    if (checked) {
      value.add(data, index)
    } else {
      value.remove(data, index)
    }
  }

  render() {
    return (
      <Checkbox
        {...this.props}
        checked={this.getChecked()}
        onChange={this.handleChange}
      />
    )
  }
}
