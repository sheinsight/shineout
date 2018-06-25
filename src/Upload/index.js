import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps, defaultProps } from '../utils/proptypes'
import { uploadClass } from '../styles'

class Upload extends PureComponent {
  render() {
    const { style } = this.props
    const className = classnames(
      uploadClass('_'),
      this.props.className,
    )

    return (
      <div className={className} style={style}>Upload</div>
    )
  }
}

Upload.propTypes = {
  ...getProps(PropTypes, 'size', 'type'),
}

Upload.defaultProps = {
  ...defaultProps,
}

export default Upload