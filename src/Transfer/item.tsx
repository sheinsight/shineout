import React from 'react'
import classnames from 'classnames'
import Checkbox from '../Checkbox'
import { PureComponent } from '../component'
import { transferClass } from './styles'
import Context from './context'
import { ItemConsumerProps, ItemProps } from './Props'

class Item<DataItem, Value extends any[]> extends PureComponent<ItemProps<DataItem, Value>> {
  constructor(props: ItemProps<DataItem, Value>) {
    super(props)
    this.check = this.check.bind(this)
  }

  check(c: boolean | undefined) {
    const { index, selecteds, checkKey, setSelecteds } = this.props
    if (c) {
      setSelecteds(index, [...selecteds[index], checkKey])
    } else {
      setSelecteds(index, selecteds[index].filter(ch => ch !== checkKey))
    }
  }

  render() {
    const { content, selecteds, checkKey, index, disabled, itemClass } = this.props
    return (
      <div className={classnames(transferClass('item', disabled && 'item-disabled'), itemClass)}>
        <Checkbox
          className={transferClass('item-check')}
          onChange={this.check}
          disabled={disabled}
          checked={selecteds[index].indexOf(checkKey) > -1}
        >
          {content}
        </Checkbox>
      </div>
    )
  }
}

export default <DataItem, Value extends any[]>(prop: ItemConsumerProps<DataItem, Value>) => (
  <Context.Consumer>
    {value => (
      <Item {...prop} selecteds={value.selecteds} setSelecteds={value.setSelecteds} itemClass={value.itemClass} />
    )}
  </Context.Consumer>
)
