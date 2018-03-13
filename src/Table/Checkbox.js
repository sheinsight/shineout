import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
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
    this.props.datum.listen('change', this.handleUpdate)
  }

  componentWillUnmount() {
    this.props.datum.unlisten('change', this.handleUpdate)
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
