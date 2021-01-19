import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps } from '../utils/proptypes'
import { dividerClass } from '../styles'

class Divider extends PureComponent {
  showText() {
    const { children, mode } = this.props
    return children && mode === 'horizontal'
  }

  render() {
    const { className, children, mode, orientation, ...restProps } = this.props
    const mc = classnames(
      dividerClass('_', mode, children && 'with-text', orientation && `with-text-${orientation}`),
      className
    )
    return (
      <div {...restProps} className={mc}>
        {this.showText() && <span className={dividerClass('inner-text')}>{children}</span>}
      </div>
    )
  }
}

Divider.propTypes = {
  ...getProps(PropTypes),
  mode: PropTypes.oneOf(['horizontal', 'vertical']),
  orientation: PropTypes.oneOf(['left', 'center', 'right']),
}

Divider.defaultProps = {
  mode: 'horizontal',
}

export default Divider
