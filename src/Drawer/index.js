import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps, defaultProps } from '../utils/proptypes'
import { drawerClass } from '../styles'

class Drawer extends PureComponent {
  render() {
    const { style } = this.props
    const className = classnames(drawerClass('_'), this.props.className)

    return (
      <div className={className} style={style}>
        Drawer
      </div>
    )
  }
}

Drawer.propTypes = {
  ...getProps(PropTypes, 'size', 'type'),
}

Drawer.defaultProps = {
  ...defaultProps,
}

export default Drawer
