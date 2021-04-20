import React from 'react'
import PropTypes from 'prop-types'
import { PureComponent } from '../component'
import { CHANGE_TOPIC } from '../Datum/types'
import Checkbox from '../Checkbox/Checkbox'
import Radio from '../Radio/Radio'

export default class extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    datum: PropTypes.object.isRequired,
    treeColumnsName: PropTypes.string,
    checked: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleUpdate = this.forceUpdate.bind(this)
  }

  componentDidMount() {
    super.componentDidMount()
    this.props.datum.subscribe(CHANGE_TOPIC, this.handleUpdate)
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    this.props.datum.unsubscribe(CHANGE_TOPIC, this.handleUpdate)
  }

  handleChange(_, checked, index) {
    const { data, datum, treeColumnsName } = this.props
    if (checked) {
      datum.add(data, index, treeColumnsName)
    } else {
      datum.remove(data, index, treeColumnsName)
    }
  }

  render() {
    const { data, datum } = this.props
    const disabled = datum.disabled(data)
    const checked = datum.check(data)
    const CheckItem = datum.limit === 1 ? Radio : Checkbox
    return <CheckItem {...this.props} checked={checked} disabled={disabled} onChange={this.handleChange} />
  }
}
