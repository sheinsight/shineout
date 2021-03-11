import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Popover from '../Popover'

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
    const { data, className, popoverClassName, contentClassName, dataId, trigger, compressed, cls } = this.props
    const { status } = this.state

    if (data.length <= 1) return data

    const [firstItem, ...items] = data

    const itemsLength = items.length

    return (
      <a tabIndex={-1} key="more" className={classnames(className, cls && status && cls('item-more'))}>
        <span>{`+${itemsLength}`}</span>
        <Popover trigger={trigger} visible={status} onVisibleChange={this.changeStatus} className={popoverClassName}>
          <div className={contentClassName} data-id={dataId}>
            {compressed === 'no-repeat' ? null : firstItem}
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
  dataId: PropTypes.string,
  trigger: PropTypes.string,
  compressed: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  cls: PropTypes.func,
}

export default More
