import React from 'react'
import PropTypes from 'prop-types'
import { PureComponent } from '../component'
import { CHANGE_TOPIC } from '../Datum/types'
import Checkbox from '../Checkbox/Checkbox'

export default class extends PureComponent {
  static propTypes = {
    data: PropTypes.array,
    datum: PropTypes.object.isRequired,
    treeColumnsName: PropTypes.string,
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

  getChecked() {
    const { data, datum } = this.props
    if (datum.length === 0 || !data) return false

    let checked
    for (const d of data) {
      if (datum.disabled(d)) continue
      const p = this.check(d)
      if (p === 'indeterminate') return p
      if (checked === undefined) {
        checked = p
      } else if (checked !== p) {
        return 'indeterminate'
      }
    }

    return checked
  }

  check(d) {
    const { datum, treeColumnsName } = this.props
    const p = datum.check(d)
    const children = d[treeColumnsName]
    const isArray = children && Array.isArray(children)
    if (isArray) {
      for (const c of children) {
        if (this.check(c) !== p) return 'indeterminate'
      }
    }
    return p
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
    if (this.props.datum.limit === 1) return null

    return <Checkbox {...this.props} checked={this.getChecked()} onChange={this.handleChange} />
  }
}
