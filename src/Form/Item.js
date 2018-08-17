import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getGrid } from '../Grid/utils'
import { getProps, defaultProps } from '../utils/proptypes'
import { formClass } from '../styles'

class Item extends PureComponent {
  renderHelp() {
    const { formItemErrors } = this.props
    const keys = Object.keys(formItemErrors)
    if (keys.length > 0) {
      return <div className={formClass('error')}>{formItemErrors[keys[0]].message}</div>
    }

    const { tip } = this.props
    if (!tip) return null
    return <div className={formClass('tip')}>{tip}</div>
  }

  render() {
    const {
      children, grid, label, labelAlign, labelWidth, required, formItemErrors, style,
    } = this.props

    const className = classnames(
      getGrid(grid),
      formClass(
        'item',
        required && 'required',
        Object.keys(formItemErrors).length > 0 && 'invalid',
        ['top', 'right'].indexOf(labelAlign) >= 0 && `label-align-${labelAlign}`,
      ),
      this.props.className,
    )

    return (
      <div className={className} style={style}>
        {
          label !== undefined &&
          <div style={{ width: labelWidth }} className={formClass('label')}>
            {label}
          </div>
        }
        <div className={formClass('control')}>
          {children}
          {this.renderHelp()}
        </div>
      </div>
    )
  }
}

Item.propTypes = {
  ...getProps(PropTypes, 'children', 'grid'),
  className: PropTypes.string,
  formItemErrors: PropTypes.object,
  label: PropTypes.string,
  labelAlign: PropTypes.string,
  labelWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  required: PropTypes.bool,
  tip: PropTypes.any,
}

Item.defaultProps = {
  ...defaultProps,
  formItemErrors: {},
}

export default Item
