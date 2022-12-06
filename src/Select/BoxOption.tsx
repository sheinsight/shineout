import React, { PureComponent } from 'react'
import Checkbox from '../Checkbox/Checkbox'
import Radio from '../Radio/Radio'
import { selectClass } from './styles'
import { getDirectionClass } from '../utils/classname'
import { BoxOptionProps } from './Props'

class BoxOption<Item, Value> extends PureComponent<BoxOptionProps<Item, Value>> {
  locked: boolean

  constructor(props: BoxOptionProps<Item, Value>) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const { data, onClick, isActive, index, disabled } = this.props

    if (this.locked || disabled) return
    this.locked = true

    onClick(!isActive, data, index)

    setTimeout(() => {
      this.locked = false
    }, 200)
  }

  render() {
    const { data, index, isActive, renderItem, columns, multiple, disabled } = this.props

    const className = selectClass(getDirectionClass('option'))
    const width = columns < 0 ? undefined : `${(1 / columns) * 100}%`
    const Input = multiple ? Checkbox : Radio

    const result = renderItem(data, index)
    const title = typeof result === 'string' ? result : undefined

    return (
      <Input disabled={disabled} style={{ width }} checked={isActive} className={className} onChange={this.handleClick}>
        <span title={title}>{result}</span>
      </Input>
    )
  }
}

export default BoxOption
