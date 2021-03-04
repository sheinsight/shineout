import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Popover from '../Popover'
import { isEmpty } from '../utils/is'

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

  mapData() {
    const { data, render, renderItem, compressed, raw } = this.props
    return data
      .filter((d, i) => {
        if (compressed === 'no-repeat') return i !== 0
        return true
      })
      .map((d, i) =>
        renderItem({
          index: i,
          data: d,
          render,
          raw,
        })
      )
      .filter(n => !isEmpty(n))
  }

  render() {
    const { className, popoverClassName, contentClassName, dataId, trigger, compressed } = this.props
    const { status } = this.state

    // map data, weed out null value
    const items = this.mapData()

    if (items.length <= 0) return null

    let itemsLength = items.length

    if (compressed !== 'no-repeat') {
      itemsLength -= 1
    }

    return (
      <a tabIndex={-1} key="more" className={className}>
        <span>{`+${itemsLength}`}</span>
        <Popover trigger={trigger} visible={status} onVisibleChange={this.changeStatus} className={popoverClassName}>
          <div className={contentClassName} data-id={dataId}>
            {items}
          </div>
        </Popover>
      </a>
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
  renderItem: PropTypes.func,
  dataId: PropTypes.string,
  render: PropTypes.func,
  trigger: PropTypes.string,
  compressed: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  raw: PropTypes.array,
}

export default More
