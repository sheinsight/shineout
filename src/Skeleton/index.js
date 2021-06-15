import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps, defaultProps } from '../utils/proptypes'
import { skeletonClass } from '../styles'

class Skeleton extends PureComponent {
  render() {
    const { style } = this.props
    const className = classnames(skeletonClass('_'), this.props.className)

    return (
      <div className={className} style={style}>
        I'm a Skeleton
      </div>
    )
  }
}

Skeleton.propTypes = {
  ...getProps(PropTypes, 'size', 'type'),
}

Skeleton.defaultProps = {
  ...defaultProps,
}

export default Skeleton
