import React, { PureComponent } from 'react'
import { findDOMNode } from 'react-dom'
import immer from 'immer'
import PropTypes from 'prop-types'
import { getProps, defaultProps } from '../utils/proptypes'
import Button from '../Button'
import { dropdownClass } from '../styles'
import { FadeList } from '../List'

class Dropdown extends PureComponent {

  static getKey(data, keygen) {
    switch (typeof keygen) {
      case 'string':
        return data[keygen]
      case 'function':
        return keygen(data)
      default:
        return data.id
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      position: 'bottom-left',
      show: false,
    }

    this.bindButton = this.bindButton.bind(this)
    this.bindElement = this.bindElement.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleHover = this.handleHover.bind(this)
    this.renderList = this.renderList.bind(this)
  }

  componentWillUnmount() {
    this.isUnmounted = true
  }

  getPosition() {
    return this.props.position || this.state.position
  }

  bindButton(el) {
    this.button = findDOMNode(el)
  }

  bindElement(el) {
    this.element = el
  }

  handleFocus() {
    let f = 'bottom'
    const s = 'left'
    const height = window.innerHeight || document.documentElement.clientHeight
    const rect = this.element.getBoundingClientRect()
    if (height - rect.bottom < 200) {
      f = 'top'
    }

    if (this.props.hover) this.element.focus()

    if (this.closeTimer) {
      clearTimeout(this.closeTimer)
    }
    this.setState(immer((state) => {
      state.show = true
      state.position = `${f}-${s}`
    }))
  }

  handleBlur(e) {
    // wait item event execute
    if (e.relatedTarget && e.relatedTarget.nodeName !== 'A' && e.currentTarget.contains(e.relatedTarget)) return
    this.closeTimer = setTimeout(() => {
      if (!this.isUnmounted) this.setState({ show: false, position: 'bottom-left' })
    }, 200)
  }

  handleHover() {
    const { hover } = this.props
    const { show } = this.state
    if (show || !hover) return

    this.handleFocus()
  }

  renderList(data, placeholder) {
    const {
      keygen, width, type, outline, size, disabled, btnColor, style, onClick, buttonSplit,
    } = this.props
    if (!Array.isArray(data) || data.length === 0) return null
    const itemClassName = dropdownClass('item', !width && 'no-width')
    const buttonClassName = dropdownClass('button', buttonSplit && 'split-button')
    return [
      <Button
        disabled={disabled}
        ref={this.bindButton}
        onClick={this.handleFocus}
        outline={outline}
        className={buttonClassName}
        type={type}
        size={size}
        style={btnColor ? { ...style, color: '#000' } : style}
        key="1"
      >
        {placeholder}
      </Button>,
      <FadeList
        className={dropdownClass('menu')}
        style={{ width }}
        key="2"
        show={this.state.show}
      >
        {
          data.map((d) => {
            const liKey = Dropdown.getKey(d, keygen)
            return d.children ?
              <Dropdown
                hover={this.props.hover}
                style={{ width: '100%' }}
                data={d.children}
                placeholder={d.content}
                type="link"
                key={liKey}
                position="right-top"
                btnColor
                onClick={onClick}
              /> :
              (
                <a
                  key={liKey}
                  onClick={() => onClick && onClick(d.content, d)}
                  className={itemClassName}
                  href={d.url ? d.url : 'javascript:;'}
                >
                  {d.content}
                </a>)
          })
        }
      </FadeList>]
  }
  render() {
    const {
      data, className, style, placeholder, buttonSplit
    } = this.props
    const { show } = this.state
    const position = this.getPosition()

    let wrapClassName = dropdownClass('_', position, show && 'show', buttonSplit && 'split-dropdown')
    if (className) wrapClassName += ` ${className}`

    return (
      <div
        onMouseEnter={this.handleHover}
        ref={this.bindElement}
        onBlur={this.handleBlur}
        className={wrapClassName}
        style={style}
        tabIndex={1}
      >
        {this.renderList(data, placeholder, -1)}
      </div>
    )
  }
}

Dropdown.propTypes = {
  ...getProps('placeholder', 'type', 'keygen'),
  data: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  hover: PropTypes.bool,
  position: PropTypes.string,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
}

Dropdown.defaultProps = {
  ...defaultProps,
  disabled: false,
  data: [],
  keygen: 'id',
}

export default Dropdown
