import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Checkbox from '../Checkbox/Checkbox'

export default class extends PureComponent {
  static propTypes = {
    data: PropTypes.array,
    datum: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  componentDidMount() {
    this.props.datum.listen('change', this.handleUpdate)
  }

  componentWillUnmount() {
    this.props.datum.unlisten('change', this.handleUpdate)
  }

  getChecked() {
    const { data, datum } = this.props
    if (datum.length === 0 || !data) return false

    let checked
    for (const d of data) {
      if (datum.disabled(d)) continue
      const p = datum.check(d)
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
    const { data, datum } = this.props
    if (checked) {
      datum.add(data, index)
    } else {
      datum.remove(data, index)
    }
  }

  render() {
    if (this.props.datum.limit === 1) return null

    return (
      <Checkbox
        {...this.props}
        checked={this.getChecked()}
        onChange={this.handleChange}
      />
    )
  }
}
