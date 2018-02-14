import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps, defaultProps } from '../utils/proptypes'
import icons from '../icons'
import { paginationClass } from '../styles'
import Item from './Item'

class Pagination extends PureComponent {
  getPages() {
    const {
      current, total, pageSize, span,
    } = this.props
    const max = Math.ceil(total / pageSize)
    const pages = []
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
      pages.push(1)
    }
    if (left === 3) {
      pages.push(2)
    } else if (left > 3) {
      pages.push('<<')
    }

    for (let i = left; i < right + 1; i++) {
      pages.push(i)
    }

    if (right === max - 2) {
      pages.push(max - 1)
    } else if (right < max - 1) {
      pages.push('>>')
    }

    if (right < max) {
      pages.push(max)
    }

    return { pages, max }
  }

  renderPrev() {
    const { onChange, current, text } = this.props
    const prev = current - 1
    return (
      <Item page={prev} disabled={prev < 1} onClick={onChange}>
        {text.prev || icons.AngleLeft}
      </Item>
    )
  }

  renderNext() {
    const {
      onChange, current, text, total, pageSize,
    } = this.props
    const max = Math.ceil(total / pageSize)
    const next = current + 1
    return (
      <Item page={next} disabled={next > max} onClick={onChange}>
        {text.next || icons.AngleRight}
      </Item>
    )
  }

  render() {
    const {
      current, style, onChange, span,
    } = this.props
    const className = classnames(
      paginationClass('_'),
      this.props.className,
    )

    const { pages, max } = this.getPages()

    return (
      <div className={className} style={style}>
        {this.renderPrev()}
        {
          pages.map((p) => {
            if (typeof p === 'number') {
              return (
                <Item
                  key={p}
                  isCurrent={current === p}
                  page={p}
                  onClick={onChange}
                >
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
                page={page}
                className={`no-border ${isPrev ? 'more-left' : 'more-right'}`}
                onClick={onChange}
              >
                {isPrev ? icons.AngleDoubleLeft : icons.AngleDoubleRight}
              </Item>
            )
          })
        }
        {this.renderNext()}
      </div>
    )
  }
}

Pagination.propTypes = {
  ...getProps('size', 'type'),
  current: PropTypes.number.isRequired,
  layout: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
  span: PropTypes.number,
  text: PropTypes.object,
  total: PropTypes.number.isRequired,
}

Pagination.defaultProps = {
  ...defaultProps,
  layout: 'pager',
  span: 5,
  text: {},
}

export default Pagination
