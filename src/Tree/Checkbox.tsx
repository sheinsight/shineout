import React from 'react'
import { PureComponent } from '../component'
import Checkbox from '../Checkbox/Checkbox'
import { treeClass } from './styles'
import { getDirectionClass } from '../utils/classname'
import { CheckboxProps } from './Props'
import { CheckValueType } from '../Checkbox/Props'

export default class TreeCheckbox<DataItem, Value extends any[]> extends PureComponent<CheckboxProps<DataItem, Value>> {
  constructor(props: CheckboxProps<DataItem, Value>) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    props.datum.bind(props.id, this.forceUpdate.bind(this))
  }

  componentDidMount() {
    super.componentDidMount()
    // When dragging a node,
    // it will first trigger the constructor of the new node,
    // then trigger the willUnmount of the old node,
    // and finally trigger the didMount of the new node,
    // the old node will unload the update event, so bind it here again
    this.props.datum.bind(this.props.id, this.forceUpdate.bind(this))
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    this.props.datum.unbind(this.props.id)
  }

  checkDisabled() {
    const { datum, id, disabled } = this.props
    if (disabled) return true

    return datum.isDisabled(id)
  }

  handleChange(_: any, checked: CheckValueType) {
    const { datum, id, onChange } = this.props
    datum.set(id, checked ? 1 : 0)
    onChange(datum.getValue() as Value, id)
  }

  render() {
    const { datum, id } = this.props
    const checked = datum.getChecked(id)

    return (
      <Checkbox
        checked={checked}
        disabled={this.checkDisabled()}
        onChange={this.handleChange}
        className={treeClass(getDirectionClass('checkbox'))}
      />
    )
  }
}
