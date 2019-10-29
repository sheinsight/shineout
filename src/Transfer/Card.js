import React from 'react'
import PropTypes from 'prop-types'
import SCard from '../Card'
import Checkbox from '../Checkbox'
import { Component } from '../component'
import { transferClass } from '../styles'
import { getKey } from '../utils/uid'
import { createFunc } from '../utils/func'
import Item from './item'

class Card extends Component {
  constructor(props) {
    super(props)
    this.getCheckAll = this.getCheckAll.bind(this)
    this.checkAll = this.checkAll.bind(this)
  }

  getCheckAll() {
    const { checks, keygen, data } = this.props

    if (checks.length === 0) return false

    let checkNum = 0

    data.forEach((d, i) => {
      if (checks.indexOf(getKey(d, keygen, i)) > -1) checkNum += 1
    })

    if (!checkNum) return false

    if (checkNum === data.length) return true

    return 'indeterminate'
  }

  checkAll(c) {
    const { setChecks, index, data, keygen } = this.props
    if (c) {
      setChecks(index, data.map((d, i) => getKey(d, keygen, i)))
    } else {
      setChecks(index, [])
    }
  }

  render() {
    const { title, data, renderItem, keygen, index } = this.props
    return (
      <SCard className={transferClass('card')}>
        <SCard.Header className={transferClass('card-header')}>
          <div>
            <Checkbox onChange={this.checkAll} checked={this.getCheckAll()}>{`${data.length} 项`}</Checkbox>
          </div>
          <div className={transferClass('card-header-title')}>{title}</div>
        </SCard.Header>
        <SCard.Body className={transferClass('card-body')}>
          {data.map((d, i) => {
            const key = getKey(d, keygen, i)
            return <Item key={key} index={index} checkKey={key} liData={d} content={createFunc(renderItem)(d)} />
          })}
        </SCard.Body>
      </SCard>
    )
  }
}

Card.propTypes = {
  checks: PropTypes.array,
  keygen: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  data: PropTypes.array,
  setChecks: PropTypes.func,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  renderItem: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  index: PropTypes.number,
}

export default Card
