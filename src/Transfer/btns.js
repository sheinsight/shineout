import React from 'react'
import PropTypes from 'prop-types'
import { getKey } from '../utils/uid'
import Button from '../Button'
import { Component } from '../component'
import { transferClass } from '../styles'
import icons from '../icons'
import { isRTL } from '../config'

class Btns extends Component {
  constructor(props) {
    super(props)
    this.toSource = this.change.bind(this, 0)
    this.toTarget = this.change.bind(this, 1)
  }

  change(index) {
    const { setSelecteds, selecteds, datum, data, keygen } = this.props

    const newValue = selecteds[1 - index].map(c => data.find((d, i) => getKey(d, keygen, i) === c))

    setSelecteds(1 - index, [])

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

Btns.propTypes = {
  datum: PropTypes.object,
  selecteds: PropTypes.array,
  data: PropTypes.array,
  setSelecteds: PropTypes.func,
  keygen: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  operations: PropTypes.array,
  operationIcon: PropTypes.bool,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
}

export default Btns
