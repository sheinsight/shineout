import React from 'react'
import { PureComponent } from '../component'
import Input from './Input'
import { defaultProps } from '../utils/proptypes'
import Spin from '../Spin'
import icons from '../icons'
import { wrapSpan } from '../utils/dom/element'
import { isPromise, isFunc, isString, isEmpty } from '../utils/is'
import { isDark } from '../utils/color'
import { tagClass } from './styles'
import { isRTL } from '../config'
import getDataset from '../utils/dom/getDataset'
import { TagProps } from './interface'

const hideInput = 0
const showInput = 1

interface TagState {
  dismiss: 0 | 1 | 2
  inputVisible: 0 | 1
  value: null | string
}

type ReactMouseEvent = React.MouseEvent<HTMLDivElement> & { defaultPrevented: boolean }

class Tag extends PureComponent<TagProps, TagState> {
  static defaultProps = {
    ...defaultProps,
    type: 'default',
  }

  constructor(props: TagProps) {
    super(props)

    this.state = {
      dismiss: 0,
      inputVisible: hideInput, // tag input status
      value: null,
    }

    this.dismiss = this.dismiss.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.renderClose = this.renderClose.bind(this)
    this.closeTag = this.closeTag.bind(this)
    this.toggleInputVisible = this.toggleInputVisible.bind(this)
    this.inputBlur = this.inputBlur.bind(this)
    this.inputChange = this.inputChange.bind(this)
  }

  componentDidMount() {
    const { children, onCompleted } = this.props
    if (onCompleted && isString(children) && !isEmpty(children)) {
      this.setState({ value: children })
    }
  }

  closeTag(dismiss = 2) {
    this.setState({ dismiss })
  }

  dismiss(e: ReactMouseEvent) {
    const { onClose } = this.props
    let callback
    if (onClose === true) {
      this.closeTag()
      return
    }
    if (typeof onClose === 'function') {
      callback = onClose(e)
    }
    if (isPromise(callback)) {
      this.setState({ dismiss: 1 })
      callback
        .then(() => {
          this.closeTag()
        })
        .catch(() => {
          this.closeTag(0)
        })
      return
    }
    if (e.defaultPrevented) {
      return
    }
    this.closeTag()
  }

  inputBlur(value: string) {
    const { onCompleted } = this.props
    if (isFunc(onCompleted)) onCompleted(value)
    this.setState({ inputVisible: hideInput })
  }

  inputChange(value: string) {
    this.setState({ value })
  }

  toggleInputVisible() {
    const { inputVisible, value } = this.state
    const { onCompleted } = this.props
    // if onCompleted is not null
    if (onCompleted && !isEmpty(value)) {
      this.setState({ inputVisible: inputVisible === hideInput ? showInput : hideInput })
    }
  }

  handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const { onClick, disabled } = this.props
    if (disabled) return

    // toggle input visible
    this.toggleInputVisible()

    if (typeof onClick === 'function') {
      onClick(e)
    }
  }

  handleClose(e: React.MouseEvent<HTMLDivElement>) {
    const { disabled } = this.props
    if (this.state.dismiss > 0 || disabled) return
    this.dismiss(e)
  }

  renderClose(dismiss: 0 | 1) {
    const { onClose } = this.props
    if (!onClose) return null
    const closeClass = tagClass('close-icon')
    const loadingClass = tagClass('close-loading')
    if (dismiss === 0) {
      return (
        <div className={closeClass} onClick={this.handleClose}>
          {icons.Close}
        </div>
      )
    }
    return (
      <div className={loadingClass}>
        <Spin name="ring" size={10} />
      </div>
    )
  }

  render() {
    const { dismiss, inputVisible, value } = this.state
    if (dismiss === 2) return null

    const {
      children,
      className,
      type,
      backgroundColor,
      onClose,
      disabled,
      onCompleted,
      onEnterPress,
      onKeyUp,
    } = this.props

    const rtl = isRTL()

    // if editable and input visible
    if (onCompleted && inputVisible === showInput)
      return (
        <Input
          value={value}
          onBlur={this.inputBlur}
          onChange={this.inputChange}
          onEnterPress={onEnterPress}
          onKeyUp={onKeyUp}
        />
      )

    const childrenParsed = wrapSpan(children)
    const { style } = this.props
    let tagClassName = tagClass('_', disabled && 'disabled', type, rtl && 'rtl')
    const inlineClassName = tagClass('inline')
    const click = !onClose ? { onClick: this.handleClick } : {}
    let tagStyle = style || {}

    if (className) tagClassName += ` ${className}`
    if (backgroundColor) {
      tagStyle = {
        color: isDark(backgroundColor) ? '#fff' : '#000',
        backgroundColor,
        borderColor: 'transparent',
        ...style,
      }
    }
    return (
      <div className={tagClassName} style={tagStyle} {...click} {...getDataset(this.props)}>
        {onClose ? (
          <div onClick={this.handleClick} className={inlineClassName}>
            {childrenParsed}
          </div>
        ) : (
          childrenParsed
        )}
        {this.renderClose(dismiss)}
      </div>
    )
  }
}

export default Tag
