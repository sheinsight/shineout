import { createElement, PureComponent } from 'react'
import PropTypes from 'prop-types'
import icons from '../icons'
import { datepickerClass } from '../styles'

class Icon extends PureComponent {
  render() {
    const {
      className, name, onClick, tag, disabled,
    } = this.props

    const newProps = {
      className: datepickerClass(className, 'icon', disabled && 'disabled'),
      onClick: disabled ? undefined : onClick,
    }

    if (tag === 'a') newProps.href = 'javascript:;'

    return createElement(tag, newProps, icons[name])
  }
}

Icon.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  tag: PropTypes.string,
}

Icon.defaultProps = {
  tag: 'span',
}

export default Icon
