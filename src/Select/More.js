import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { parsePxToNumber } from '../utils/dom/element'
import Popover from '../Popover'

export function getResetMore(onFilter, container, doms) {
  if (!container || !doms || !doms.length) return -1
  const items = Array.from(doms)
  const style = getComputedStyle(container)
  const { clientWidth } = container
  const paddingLeft = parsePxToNumber(style.paddingLeft)
  const paddingRight = parsePxToNumber(style.paddingRight)
  const minFilterWidth = onFilter ? 16 : 0
  const contentWidth = clientWidth - paddingLeft - paddingRight - minFilterWidth - 1

  const hideEl = items.pop()
  const hideElStyle = getComputedStyle(hideEl)
  const hideMargin = parsePxToNumber(hideElStyle.marginLeft) + parsePxToNumber(hideElStyle.marginRight)

  let num = 0
  let sumWidth = 0
  const itemWidthArr = items.map(item => {
    const itemStyle = getComputedStyle(item)
    const itemLen = item.offsetWidth + parsePxToNumber(itemStyle.marginLeft) + parsePxToNumber(itemStyle.marginRight)
    sumWidth += itemLen
    return itemLen
  })
  if (sumWidth <= contentWidth) {
    num = -1
  } else {
    let len = 0
    for (let i = 0; i < itemWidthArr.length; i++) {
      const itemLen = itemWidthArr[i]
      // number length
      const reset = `+${items.length - 1 - i}`
      hideEl.childNodes[0].innerText = reset
      // (+num) width
      const moreWidth = hideEl.offsetWidth + hideMargin
      len += itemLen
      if (len > contentWidth - moreWidth) {
        break
      }
      num += 1
      if (i === items.length - 1) {
        // not show more
        num = -1
      }
    }
  }

  return num
}
class More extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: false,
    }

    this.changeStatus = this.changeStatus.bind(this)
  }

  changeStatus(status) {
    this.setState({ status })
  }

  render() {
    const {
      data,
      className,
      popoverClassName,
      contentClassName,
      dataId,
      trigger,
      compressed,
      cls,
      showNum,
    } = this.props
    const { status } = this.state
    if (showNum < 0 || showNum > data.length)
      return (
        <React.Fragment>
          {data}
          {/* { for compute width} */}
          <a
            key="hidden"
            className={className}
            style={{
              position: 'absolute',
              zIndex: '-100',
              userSelect: 'none',
              msUserSelect: 'none',
              contain: 'layout',
            }}
          >
            <span>+</span>
          </a>
        </React.Fragment>
      )

    const before = new Array(showNum).fill().map((item, index) => data[index])
    const after = new Array(data.length - showNum).fill().map((item, index) => data[showNum + index])
    const itemsLength = after.length

    return (
      <React.Fragment>
        {before}
        <a tabIndex={-1} key="more" className={classnames(className, cls && status && cls('item-more'))}>
          <span>{`+${itemsLength}`}</span>
          <Popover
            showArrow={false}
            trigger={trigger}
            visible={status}
            onVisibleChange={this.changeStatus}
            className={popoverClassName}
          >
            <div className={contentClassName} data-id={dataId}>
              {compressed === 'no-repeat' ? null : before}
              {after}
            </div>
          </Popover>
        </a>
      </React.Fragment>
    )
  }
}

More.defaultProps = {
  trigger: 'hover',
}

More.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array,
  popoverClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  dataId: PropTypes.string,
  trigger: PropTypes.string,
  compressed: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  cls: PropTypes.func,
  showNum: PropTypes.number,
}

export default More
