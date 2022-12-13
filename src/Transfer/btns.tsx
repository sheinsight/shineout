import React from 'react'
import { getKey } from '../utils/uid'
import Button from '../Button'
import { Component } from '../component'
import { transferClass } from './styles'
import icons from '../icons'
import { isRTL } from '../config'
import { BtnProps, IndexType } from './Props'

class Btns<DataItem, Value extends any[]> extends Component<BtnProps<DataItem, Value>> {
  toSource: () => void

  toTarget: () => void

  constructor(props: BtnProps<DataItem, Value>) {
    super(props)
    this.toSource = this.change.bind(this, 0)
    this.toTarget = this.change.bind(this, 1)
  }

  getDataMap() {
    const { data, keygen } = this.props
    const dataMap = new Map()
    for (let i = 0; i < data.length; i++) {
      dataMap.set(getKey(data[i], keygen, i), data[i])
    }
    return dataMap
  }

  change(index: IndexType) {
    const { setSelecteds, selecteds, datum } = this.props

    const dataMap = this.getDataMap()

    const newValue = selecteds[1 - index].map(c => dataMap.get(c))
    // const newValue = selecteds[1 - index].map(c => data.find((d, i) => getKey(d, keygen, i) === c))

    setSelecteds((1 - index) as IndexType, [])

    datum[index ? 'add' : 'remove'](newValue, undefined, undefined, true)
  }

  renderButtonText(mode = 'left') {
    const { operations, operationIcon } = this.props
    if (mode === 'left') {
      const left = [
        <React.Fragment key="operationIcon">{operationIcon && icons.AngleLeft}</React.Fragment>,
        <React.Fragment key="operations">{operations[1]}</React.Fragment>,
      ]

      if (isRTL()) return left.reverse()
      return left
    }
    const right = [
      <React.Fragment key="operationIcon">{operationIcon && icons.AngleRight}</React.Fragment>,
      <React.Fragment key="operations">{operations[0]}</React.Fragment>,
    ]
    if (isRTL()) return right.reverse()
    return right
  }

  render() {
    const { selecteds, disabled } = this.props

    const disable = disabled === true
    return (
      <div className={transferClass('btns')}>
        <div>
          <Button
            type="primary"
            disabled={disable || !selecteds[0].length}
            size="small"
            className={transferClass('btns-button', 'btns-bottom')}
            onClick={this.toTarget}
          >
            {this.renderButtonText('right')}
          </Button>
          <br />
          <Button
            type="primary"
            disabled={disable || !selecteds[1].length}
            size="small"
            className={transferClass('btns-button')}
            onClick={this.toSource}
          >
            {this.renderButtonText('left')}
          </Button>
        </div>
      </div>
    )
  }
}

export default Btns
