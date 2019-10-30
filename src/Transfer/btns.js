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
    const { setChecks, checks, datum, data, keygen } = this.props

    const newValue = checks[1 - index].map(c => data.find((d, i) => getKey(d, keygen, i) === c))

    setChecks(1 - index, [])

    datum[index ? 'add' : 'remove'](newValue)
  }

  render() {
    const { content, checks, operations } = this.props
    const defaultOperations = [icons.AngleRight, icons.AngleLeft]
    return (
      <div className={transferClass('btns')}>
        <div>
          <Button
            type="primary"
            disabled={!checks[0].length}
            size="small"
            className={transferClass('btns-button', 'btns-bottom')}
            onClick={this.toTarget}
          >
            {operations(defaultOperations)[0] || icons.AngleRight}
          </Button>
          <br />
          <Button
            type="primary"
            disabled={!checks[1].length}
            size="small"
            className={transferClass('btns-button')}
            onClick={this.toSource}
          >
            {operations(defaultOperations)[1] || icons.AngleLeft}
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
