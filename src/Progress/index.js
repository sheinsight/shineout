import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps, defaultProps } from '../utils/proptypes'
import { progressClass } from '../styles'

class Progress extends PureComponent {
  render() {
    const { style } = this.props
    const className = classnames(
      progressClass('_'),
      this.props.className,
    )

    return (
      <div className={className} style={style}>Progress</div>
    )
  }
}

Progress.propTypes = {
  ...getProps(PropTypes, 'size', 'type'),
}

Progress.defaultProps = {
  ...defaultProps,
}

export default Progress
