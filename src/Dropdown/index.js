import React, { PureComponent } from 'react'
import { findDOMNode } from 'react-dom'
import immer from 'immer'
import PropTypes from 'prop-types'
import { getProps, defaultProps } from '../utils/proptypes'
import Button from '../Button'
import { dropdownClass } from '../styles'
import List from '../List'
import Item from './Item'

const FadeList = List('fade')

const positionMap = {
  'left-top': 'left-top',
  'left-bottom': 'left-bottom',
  'right-top': 'right-top',
  'right-bottom': 'right-bottom',
  'top-right': 'left-bottom',
  'top-left': 'right-bottom',
  'bottom-right': 'left-top',
  'bottom-left': 'right-top',
}

class Dropdown extends PureComponent {
  static getKey(data, keygen, index) {
    switch (typeof keygen) {
      case 'string':
        return data[keygen]
      case 'function':
        return keygen(data)
      default:
        return index
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
    this.handleHide = this.handleHide.bind(this)
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
    if (this.props.hover) this.button.focus()

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
    this.handleHide(e.relatedTarget)
  }

  handleHide(relatedTarget) {
    if (relatedTarget &&
      relatedTarget.getAttribute('dropdown-item') !== '1'
      && this.element.contains(relatedTarget)) return

    this.closeTimer = setTimeout(() => {
      if (!this.isUnmounted) this.setState({ show: false })
    }, 200)
    if (this.props.handleHide) this.props.handleHide(relatedTarget)
  }

  handleHover() {
    const { hover } = this.props
    const { show } = this.state
    if (show || !hover) return
    this.handleFocus()
  }

  renderList(data, placeholder) {
    const {
      keygen,
      width,
      type,
      outline,
      size,
      disabled,
      btnColor,
      style,
      onClick,
      columns,
      itemRender,
    } = this.props
    if (!Array.isArray(data) || data.length === 0) return null
    const buttonClassName = dropdownClass('button', { 'split-button': !placeholder })
    const spanClassName = dropdownClass('button-content')
    return [
      <Button
        disabled={disabled}
        ref={this.bindButton}
        onMouseEnter={this.handleHover}
        onBlur={this.handleBlur}
        onClick={this.handleFocus}
        outline={outline}
        className={buttonClassName}
        type={type}
        size={size}
        style={btnColor ? { ...style, color: '#000', textAlign: 'left' } : style}
        key="1"
      >
        <span className={spanClassName}>{placeholder}</span>
      </Button>,
      <FadeList
        className={dropdownClass('menu')}
        style={{ width }}
        key="2"
        show={this.state.show}
      >
        {
          data.map((d, index) => {
            const liKey = Dropdown.getKey(d, keygen, index)
            const childPosition = positionMap[this.props.position]
            const itemClassName = dropdownClass('item', !width && 'no-width', childPosition.startsWith('left') && 'item-left')
            return d.children ?
              <Dropdown
                hover={this.props.hover}
                style={{ width: '100%' }}
                data={d.children}
                disabled={d.disabled}
                placeholder={d.content}
                type="link"
                key={liKey}
                position={childPosition}
                btnColor
                onClick={onClick}
                itemRender={itemRender}
                handleHide={this.handleHide}
                _first
              /> :
              (
                <Item
                  data={d}
                  key={liKey}
                  onClick={d.onClick ? d.onClick : onClick}
                  itemClassName={itemClassName}
                  itemRender={itemRender}
                  columns={columns}
                  width={width}
                />)
          })
        }
      </FadeList>]
  }
  render() {
    const {
      data, className, style, placeholder,
    } = this.props
    const { show } = this.state
    const position = this.getPosition()

    let wrapClassName = dropdownClass('_', position, show && 'show', { 'split-dropdown': !placeholder })
    if (className) wrapClassName += ` ${className}`

    return (
      <div
        ref={this.bindElement}
        className={wrapClassName}
        style={style}
      >
        {this.renderList(data, placeholder)}
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
  position: 'bottom-left',
}

export default Dropdown
