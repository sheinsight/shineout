import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps, defaultProps } from '../utils/proptypes'
import { dividerClass } from '../styles'

class Divider extends PureComponent {
    render() {
        const { style, children, mode, orientation, ...restProps } = this.props
        const className = classnames(
            dividerClass('_', mode, children && 'with-text', {
                'with-text-left': orientation === 'left',
                'with-text-right': orientation === 'right',
            }),
            this.props.className,
        )
        return (
            <div className={className} {...restProps} style={style}>
                {children && <span className={dividerClass('inner-text')}>{children}</span>}
            </div>
        )
    }
}

Divider.propTypes = {
    ...getProps(PropTypes, 'mode','orientation'),
}

Divider.defaultProps = {
    mode: 'horizontal',
    orientation: "center"
}

export default Divider