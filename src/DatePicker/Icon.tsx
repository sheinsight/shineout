import { createElement, PureComponent } from 'react'
import icons from '../icons'
import { datepickerClass } from './styles'
import { DatePickerIconProps } from './Props'

const DefaultValue = {
  tag: 'span',
}
class Icon extends PureComponent<DatePickerIconProps> {
  static defaultProps = DefaultValue

  render() {
    const { className, name, onClick, tag, disabled } = this.props

    const newProps = {
      className: datepickerClass(className, 'icon', disabled && 'disabled'),
      onClick: disabled ? undefined : onClick,
    }

    return createElement(tag, newProps, icons[name as keyof typeof icons])
  }
}

export default Icon
