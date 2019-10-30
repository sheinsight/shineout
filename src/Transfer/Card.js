import React from 'react'
import PropTypes from 'prop-types'
import shallowEqual from '../utils/shallowEqual'
import SCard from '../Card'
import Checkbox from '../Checkbox'
import { Component } from '../component'
import { transferClass } from '../styles'
import { getKey } from '../utils/uid'
import { createFunc } from '../utils/func'
import Item from './item'
import { getLocale } from '../locale'

class Card extends Component {
  constructor(props) {
    super(props)
    this.getCheckAll = this.getCheckAll.bind(this)
    this.checkAll = this.checkAll.bind(this)
  }

  // componentDidUpdate(prevProps) {
  //   if (!shallowEqual(prevProps.data, this.props.data)) {
  //     const { keygen, data, index, setChecks, checks } = this.props
  //     console.log('checks', checks.filter(c => !!data.find((d, i) => getKey(d, keygen, i) === c)))
  //     setChecks(index, checks.filter(c => !!data.find((d, i) => getKey(d, keygen, i) === c)))
  //   }
  // }

  getCheckAll() {
    const { checks, data } = this.props

    if (checks.length === 0) return false

    if (checks.length === data.length) return true

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
    const { title, data, renderItem, checks, keygen, index, footer } = this.props
    const check = this.getCheckAll()
    return (
      <SCard className={transferClass('card')}>
        <SCard.Header className={transferClass('card-header')}>
          <div>
            <Checkbox onChange={this.checkAll} checked={check}>
              {check ? `${checks.length} ${getLocale('selected')}` : getLocale('selectAll')}
            </Checkbox>
          </div>
          <div className={transferClass('card-header-title')}>{title}</div>
        </SCard.Header>
        <SCard.Body className={transferClass('card-body')}>
          {data.map((d, i) => {
            const key = getKey(d, keygen, i)
            return <Item key={key} index={index} checkKey={key} liData={d} content={createFunc(renderItem)(d)} />
          })}
        </SCard.Body>
        {footer && <SCard.Footer className={transferClass('card-footer')}>{footer}</SCard.Footer>}
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
