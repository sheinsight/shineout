import React from 'react'
import PropTypes from 'prop-types'
import { PureComponent } from '../component'
import Input from './Input'
import { getProps, defaultProps } from '../utils/proptypes'
import Spin from '../Spin'
import icons from '../icons'
import { wrapSpan } from '../utils/dom/element'
import { isPromise, isFunc } from '../utils/is'
import { isDark } from '../utils/color'
import { tagClass } from '../styles'

const hideInput = 0
const showInput = 1

class Tag extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      dismiss: 0,
      inputVisible: hideInput, // tag input status
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

  closeTag() {
    this.setState({ dismiss: 2 })
  }

  dismiss(e) {
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
      callback.then(() => {
        this.closeTag()
      })
      return
    }
    if (e.defaultPrevented) {
      return
    }
    this.closeTag()
  }

  inputBlur(val) {
    const { onBlur } = this.props
    if (isFunc(onBlur)) onBlur(val)
    this.setState({ inputVisible: hideInput })
  }

  inputChange(val) {
    const { onChange } = this.props
    if (isFunc(onChange)) onChange(val)
  }

  toggleInputVisible() {
    const { inputVisible } = this.state
    const { editable } = this.props
    // if editable is true
    if (editable) this.setState({ inputVisible: inputVisible === hideInput ? showInput : hideInput })
  }

  handleClick(e) {
    const { onClick, disabled } = this.props
    if (disabled) return

    // toggle input visible
    this.toggleInputVisible()

    if (typeof onClick === 'function') {
      onClick(e)
    }
  }

  handleClose(e) {
    const { disabled } = this.props
    if (this.state.dismiss > 0 || disabled) return
    this.dismiss(e)
  }

  renderClose(dismiss) {
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
    const { dismiss, inputVisible } = this.state
    if (dismiss === 2) return null

    const { children, className, type, backgroundColor, onClose, disabled, editable, value } = this.props

    // if editable and input visible
    if (editable && inputVisible === showInput)
      return <Input value={value} onBlur={this.inputBlur} onChange={this.inputChange} />

    const childrenParsed = wrapSpan(editable ? value : children)
    const { style } = this.props

    let tagClassName = tagClass('_', disabled && 'disabled', type)
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
      <div className={tagClassName} style={tagStyle} {...click}>
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

Tag.propTypes = {
  ...getProps(PropTypes, 'type'),
  children: PropTypes.any,
  onClose: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  backgroundColor: PropTypes.string,
  editable: PropTypes.bool,
  onBlur: PropTypes.func,
}

Tag.defaultProps = {
  ...defaultProps,
  type: 'default',
}

export default Tag
