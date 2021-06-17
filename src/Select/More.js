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
    const {
      data,
      className,
      popoverClassName,
      contentClassName,
      dataId,
      trigger,
      compressed,
      cls,
      style,
      children,
      count,
    } = this.props
    const { status } = this.state

    return (
      <a style={style} tabIndex={-1} key="more" className={classnames(className, cls && status && cls('item-more'))}>
        <span>{children}</span>
        <Popover
          showArrow={false}
          trigger={trigger}
          visible={status}
          onVisibleChange={this.changeStatus}
          className={popoverClassName}
        >
          <div className={contentClassName} data-id={dataId}>
            {compressed === 'no-repeat' ? data.slice(count) : data}
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
  style: PropTypes.object,
  children: PropTypes.any,
  count: PropTypes.number,
}

export default More
