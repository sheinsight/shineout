import React from 'react'
import classname from 'classnames'
import PropTypes from 'prop-types'
import Checkbox from '../Checkbox/Checkbox'
import { cardGroupClass } from '../styles'
import Lazyload from '../Lazyload'

class Item extends React.Component {
  handleChange(value, _, checked) {
    const { onChange } = this.props
    if (onChange) onChange(checked, value)
  }

  render() {
    const { style, className, container, children, placeholder, value, ...others } = this.props
    const cls = classname(cardGroupClass('item'), className)
    const showCheck = others.checked !== undefined
    return (
      <div style={style} className={cls}>
        <Lazyload container={container} placeholder={placeholder}>
          {children}
          {showCheck && (
            <Checkbox
              {...others}
              onChange={this.handleChange.bind(this, value)}
              className={cardGroupClass('checkbox')}
            />
          )}
        </Lazyload>
      </div>
    )
  }
}

Item.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  container: PropTypes.object,
  children: PropTypes.element,
  placeholder: PropTypes.element,
  onChange: PropTypes.func,
  value: PropTypes.any,
  checked: PropTypes.oneOfType([PropTypes.oneOf([true, false, 'indeterminate']), PropTypes.func]),
}

export default Item
