import React from 'react'
import PropTypes from 'prop-types'
import { getKey } from '../utils/uid'
import Button from '../Button'
import { Component } from '../component'
import { transferClass } from '../styles'
import icons from '../icons'

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

    datum[index ? 'add' : 'remove'](newValue)
  }

  render() {
    const { selecteds, operations, operationIcon, disabled } = this.props

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
            {operationIcon && icons.AngleRight}
            {operations[0]}
          </Button>
          <br />
          <Button
            type="primary"
            disabled={disable || !selecteds[1].length}
            size="small"
            className={transferClass('btns-button')}
            onClick={this.toSource}
          >
            {operationIcon && icons.AngleLeft}
            {operations[1]}
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
