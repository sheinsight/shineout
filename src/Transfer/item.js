import React from 'react'
import PropTypes from 'prop-types'
import Checkbox from '../Checkbox'
import { PureComponent } from '../component'
import { transferClass } from '../styles'
import Context from './context'

class Card extends PureComponent {
  constructor(props) {
    super(props)
    this.check = this.check.bind(this)
  }

  check(c) {
    const { index, checks, checkKey, setChecks } = this.props
    if (c) {
      setChecks(index, [...checks[index], checkKey])
    } else {
      setChecks(index, checks[index].filter(ch => ch !== checkKey))
    }
  }

  render() {
    const { content, checks, checkKey, index } = this.props
    return (
      <div className={transferClass('item')}>
        <Checkbox onChange={this.check} checked={checks[index].indexOf(checkKey) > -1}>
          {content}
        </Checkbox>
      </div>
    )
  }
}

Card.propTypes = {
  index: PropTypes.number,
  checks: PropTypes.array,
  checkKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  setChecks: PropTypes.func,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

export default prop => (
  <Context.Consumer>{value => <Card {...prop} checks={value.checks} setChecks={value.setChecks} />}</Context.Consumer>
)
