import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Checkbox from '../Checkbox'
import { PureComponent } from '../component'
import { transferClass } from '../styles'
import Context from './context'

class Item extends PureComponent {
  constructor(props) {
    super(props)
    this.check = this.check.bind(this)
  }

  check(c) {
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

Item.propTypes = {
  index: PropTypes.number,
  selecteds: PropTypes.array,
  checkKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  setSelecteds: PropTypes.func,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  itemClass: PropTypes.string,
}

export default prop => (
  <Context.Consumer>
    {value => <Item {...prop} selecteds={value.selecteds} setSelecteds={value.setSelecteds} />}
  </Context.Consumer>
)
