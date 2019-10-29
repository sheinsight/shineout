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
    this.hasCheck = this.hasCheck.bind(this)
    this.toSource = this.change.bind(this, 0)
    this.toTarget = this.change.bind(this, 1)
  }

  hasCheck(index) {
    const { checks, sources, targets, keygen } = this.props
    const { length } = checks[index]
    if (length === 0) return true
    const data = index ? targets : sources
    for (let i = 0; i < length; i++) {
      // eslint-disable-next-line
      if (data.find((d, j) => getKey(d, keygen, j) === checks[index][i])) return false
    }

    return true
  }

  change(index) {
    const { setChecks, checks, datum, data, keygen } = this.props

    const newValue = checks[1 - index].map(c => data.find((d, i) => getKey(d, keygen, i) === c))

    setChecks(1 - index, [])

    datum[index ? 'add' : 'remove'](newValue)
  }

  render() {
    const { content, checks, checkKey, index } = this.props
    return (
      <div className={transferClass('btns')}>
        <div>
          <Button
            type="primary"
            disabled={this.hasCheck(0)}
            size="small"
            className={transferClass('btns-button', 'btns-bottom')}
            onClick={this.toTarget}
          >
            {icons.AngleRight}
          </Button>
          <br />
          <Button
            type="primary"
            disabled={this.hasCheck(1)}
            size="small"
            className={transferClass('btns-button')}
            onClick={this.toSource}
          >
            {icons.AngleLeft}
          </Button>
        </div>
      </div>
    )
  }
}

Btns.propTypes = {
  index: PropTypes.number,
  checks: PropTypes.array,
  checkKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  setChecks: PropTypes.func,
  content: PropTypes.object,
}

export default Btns
