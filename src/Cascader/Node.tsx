import React from 'react'
import Spin from '../Spin'
import { isRTL } from '../config'
import Caret from '../icons/Caret'
import Checkbox from '../Checkbox'
import DatumTree from '../Datum/Tree'
import { cascaderClass } from './styles'
import { CascaderProps } from './interface'
import { PureComponent } from '../component'
import { CHANGE_TOPIC } from '../Datum/types'
import { getParent } from '../utils/dom/element'
import { checkinputClass } from '../Checkbox/styles'
import { getDirectionClass } from '../utils/classname'

const checkBoxStyle = { marginRight: 8, marginTop: -1, verticalAlign: 'top' }

export interface NodeProps<U, T> {
  data: U
  id: string
  path: string[]
  active: boolean
  datum: DatumTree
  multiple?: boolean
  loader?: CascaderProps<U, T>['loader']
  onChange?: CascaderProps<U, T>['onChange']
  disabled?: CascaderProps<U, T>['disabled']
  renderItem?: CascaderProps<U, T>['renderItem']
  childrenKey?: CascaderProps<U, T>['childrenKey']
  expandTrigger?: CascaderProps<U, T>['expandTrigger']
  onPathChange?: (id: string, data: U, path?: string[], is?: boolean) => void
}

interface NodeState {
  loading: boolean
}

class Node<U extends { [children: string]: U[] }, T extends string[]> extends PureComponent<
  NodeProps<U, T>,
  NodeState
> {
  handleUpdate: MouseEvent

  constructor(props: NodeProps<U, T>) {
    super(props)

    this.state = {
      loading: false,
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handlePathChange = this.handlePathChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleUpdate = this.forceUpdate.bind(this)

    this.props.datum.subscribe(CHANGE_TOPIC, this.handleUpdate)
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    this.props.datum.unsubscribe(CHANGE_TOPIC, this.handleUpdate)
  }

  checkDisabled() {
    const { datum, id, disabled } = this.props
    if (disabled) return true

    return datum.isDisabled(id)
  }

  handleClick(e: MouseEvent) {
    const { id, data, path, onChange, onPathChange, loader, multiple, datum } = this.props
    if (onPathChange) onPathChange(id, data, path, true)
    if (!multiple) {
      if (onChange && path) onChange([...path, id] as T, datum.getDataById(id))
    }

    if (loader && !this.state.loading && !getParent(e.target as HTMLElement, `.${checkinputClass('_')}`)) {
      this.setState({ loading: true })
      loader(id, data)
    }
  }

  handlePathChange() {
    const { id, data, path, onPathChange } = this.props
    // if (active) return
    if (onPathChange) onPathChange(id, data, path)
  }

  handleChange(_: any, checked: boolean) {
    const { datum, id, onChange } = this.props
    datum.set(id, checked ? 1 : 0)
    if (onChange) onChange((datum as any).getValue(), datum.getDataById(id))
  }

  handleSelect(e: MouseEvent) {
    const { datum, id } = this.props
    if (getParent(e.target as HTMLElement, `.${checkinputClass('_')}`)) return
    const checked = datum.getChecked(id)
    this.handleChange(null, !checked)
  }

  renderContent() {
    const { id, active, data, renderItem } = this.props
    const render = typeof renderItem === 'function' ? renderItem : (d: U) => d[renderItem as keyof U]
    return render(data, active, id)
  }

  render() {
    const { active, data, multiple, datum, id, loader, expandTrigger, childrenKey } = this.props
    const { loading } = this.state
    const disabled = this.checkDisabled()
    const children = data[childrenKey!]
    const hasChildren = children && children.length > 0
    const mayChildren = loader && !loading && children === undefined
    const className = cascaderClass(
      'node',
      active && 'active',
      disabled && 'disabled',
      hasChildren && 'has-children',
      mayChildren && 'may-be-children'
    )

    const style: React.CSSProperties = {}

    const events: {
      [x: string]: (e: MouseEvent) => void
    } = {}
    if (!disabled && (expandTrigger !== 'hover-only' || !children || children.length === 0)) {
      events.onClick = this.handleClick
      style.cursor = 'pointer'
    }
    if (expandTrigger === 'hover' || expandTrigger === 'hover-only') {
      events.onMouseEnter = this.handlePathChange
      if (multiple) events.onClick = this.handleSelect
    }
    const caret = <span className={cascaderClass(getDirectionClass('caret'))}>{<Caret />}</span>

    if (isRTL() && checkBoxStyle.marginRight !== 0) {
      checkBoxStyle.marginRight = 0
    }

    return (
      <div className={className} style={style} {...events}>
        {multiple && (
          <Checkbox
            checked={datum.getChecked(id)}
            disabled={disabled}
            onChange={this.handleChange}
            style={checkBoxStyle}
          />
        )}

        {this.renderContent()}
        {loading && children === undefined && <Spin className={cascaderClass('loading')} size={10} name="ring" />}
        {(hasChildren || mayChildren) && caret}
      </div>
    )
  }
}

export default Node
