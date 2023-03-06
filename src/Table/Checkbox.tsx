import React from 'react'
import { PureComponent } from '../component'
import { CHANGE_TOPIC } from '../Datum/types'
import Checkbox from '../Checkbox/Checkbox'
import Radio from '../Radio/Radio'
import { CheckboxProps } from './Props'

export default class TableCheckbox<DataItem, Value> extends PureComponent<CheckboxProps<DataItem, Value>> {
  handleUpdate: () => void

  constructor(props: CheckboxProps<DataItem, Value>) {
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

  handleChange(_: any, checked: boolean, index: number) {
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
