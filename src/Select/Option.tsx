import React from 'react'
import classnames from 'classnames'
import { selectClass } from './styles'
import { isObject } from '../utils/is'
import shallowEqual from '../utils/shallowEqual'
import icons from '../icons'
import { getDirectionClass } from '../utils/classname'
import { OptionProps } from './Props'

class Option<Data> extends React.Component<OptionProps<Data>> {
  locked?: boolean

  handleEnter: () => void

  constructor(props: OptionProps<Data>) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleEnter = this.handleHover.bind(this)
  }

  shouldComponentUpdate(nextProps: OptionProps<Data>, nextState: any) {
    if (this.props.filterText) return true
    if (!shallowEqual(nextProps, this.props) || !shallowEqual(nextState, this.state)) return true
    return false
  }

  handleClick() {
    const { data, onClick, isActive, disabled, groupKey } = this.props

    if (this.locked || disabled || (data && data[groupKey as keyof Data])) return
    this.locked = true

    onClick(!isActive, data)

    setTimeout(() => {
      this.locked = false
    }, 200)
  }

  handleHover() {
    this.props.onHover(this.props.index)
  }

  render() {
    const { data, isActive, index, renderItem, isHover, disabled, groupKey } = this.props
    const isGroupTitle = data && data[groupKey as keyof Data]
    const className = classnames(
      selectClass(
        getDirectionClass('option'),
        isActive && 'active',
        isHover && 'hover',
        disabled && getDirectionClass('disabled'),
        isGroupTitle && 'group'
      ),
      `option-${index}`
    )

    const result = isGroupTitle ? data[groupKey as keyof Data] : (renderItem as Function)(data, index)
    const title = typeof result === 'string' ? result : ''

    if (isObject(data) && result === data) {
      console.warn('renderItem is essential when data element is Object')
    }

    return (
      <a tabIndex={-1} onClick={this.handleClick} onMouseEnter={this.handleEnter} className={className} title={title}>
        {result}
        {isActive && icons.Check}
      </a>
    )
  }
}

export default Option
