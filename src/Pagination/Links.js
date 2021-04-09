import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import icons from '../icons'
import { paginationClass } from '../styles'
import Item from './Item'
import Prev from './Prev'
import Next from './Next'
import { isRTL } from '../config'

const renderIcon = isPrev => {
  const rtl = isRTL()
  if ((isPrev && rtl) || (!isPrev && !rtl)) {
    return icons.AngleDoubleRight
  }
  return icons.AngleDoubleLeft
}

class Links extends PureComponent {
  getLinks() {
    const { current, total, pageSize, span } = this.props

    if (total === 0) return { links: [], max: 0 }

    const max = Math.ceil(total / pageSize)
    const links = []
    let right
    let left = current - Math.floor(span / 2)
    if (left < 3) {
      left = 3
    }
    right = left + span
    if (right + 1 >= max) {
      right = max - 1
      left = right - span
      if (left < 1) {
        left = 1
      }
    } else {
      right -= left > 1 ? 1 : 0
    }

    if (left > 1) {
      links.push(1)
    }
    if (left === 3) {
      links.push(2)
    } else if (left > 3) {
      links.push('<<')
    }

    for (let i = left; i < right + 1; i++) {
      links.push(i)
    }

    if (right === max - 2) {
      links.push(max - 1)
    } else if (right < max - 1) {
      links.push('>>')
    }

    if (right < max) {
      links.push(max)
    }

    return { links, max }
  }

  render() {
    const { current, onChange, span, disabled } = this.props
    const { links, max } = this.getLinks()

    return (
      <div className={paginationClass('links', 'section')}>
        <Prev {...this.props} />
        {links.map(p => {
          if (typeof p === 'number') {
            return (
              <Item key={p} disabled={disabled} isCurrent={current === p} page={p} onClick={onChange}>
                {p}
              </Item>
            )
          }
          const isPrev = p === '<<'
          let page = isPrev ? current - span : current + span
          if (page < 1) page = 1
          if (page > max) page = max
          return (
            <Item
              key={p}
              disabled={disabled}
              page={page}
              className={`no-border ${isPrev ? 'more-left' : 'more-right'}`}
              onClick={onChange}
            >
              {renderIcon(isPrev)}
            </Item>
          )
        })}
        <Next {...this.props} />
      </div>
    )
  }
}

Links.propTypes = {
  current: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
  span: PropTypes.number,
  text: PropTypes.object,
  total: PropTypes.number.isRequired,
}

Links.defaultProps = {
  span: 5,
  text: {},
}

export default Links
