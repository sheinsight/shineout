import React from 'react'
import PropTypes from 'prop-types'
import { PureComponent } from '../component'
import { getProps, defaultProps } from '../utils/proptypes'
import { getParent } from '../utils/dom/element'
import Button from '../Button'
import { dropdownClass } from '../styles'
import List from '../AnimationList'
import Item from './Item'
import { docSize } from '../utils/dom/document'
import absoluteList from '../AnimationList/AbsoluteList'
import { getUidStr } from '../utils/uid'
import absoluteComsumer from '../Table/context'
import Caret from '../icons/Caret'
import { isRTL } from '../config'
import getDataset from '../utils/dom/getDataset'

const positionMap = {
  'left-top': 'left-top',
  'left-bottom': 'left-bottom',
  'right-top': 'right-top',
  'right-bottom': 'right-bottom',
  'top-right': 'left-bottom',
  'top-left': 'right-bottom',
  'bottom-right': 'left-top',
  'bottom-left': 'right-top',
  auto: '',
}

class Dropdown extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      show: false,
    }

    if (props.hover !== undefined) {
      console.warn('The "hover" property is not recommend, use trigger="hover" instead.')
    }

    this.dropdownId = `dropdown_${getUidStr()}`
    this.bindElement = this.bindElement.bind(this)

    this.clickAway = this.clickAway.bind(this)

    this.handleFocus = this.handleFocus.bind(this)
    this.handleHide = this.handleHide.bind(this)
    this.handleMouseEnter = this.handleToggle.bind(this, true)
    this.handleMouseLeave = this.handleToggle.bind(this, false)

    this.renderList = this.renderList.bind(this)
    this.bindList()
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    this.toggleDocumentEvent(false)
  }

  getTrigger() {
    if (this.props.hover === true) return 'hover'
    return this.props.trigger
  }

  getPosition() {
    let { position } = this.props
    if (position !== 'auto') return position
    if (!this.element) return 'bottom-left'
    const windowHeight = docSize.height
    const windowWidth = docSize.width
    const rect = this.element.getBoundingClientRect()
    position = rect.bottom > windowHeight / 2 ? 'top-' : 'bottom-'
    position += rect.right > windowWidth / 2 ? 'right' : 'left'

    return position
  }

  bindElement(el) {
    this.element = el
  }

  bindList() {
    const { animation } = this.props
    const FadeList = List('fade', animation ? 'fast' : 0)
    this.DropdownList = absoluteList(({ focus, ...other }) => <FadeList show={focus} {...other} />)
  }

  toggleDocumentEvent(bind) {
    const method = bind ? 'addEventListener' : 'removeEventListener'
    document[method]('click', this.clickAway, true)
  }

  clickAway(e) {
    const { absolute } = this.props
    const el = getParent(e.target, 'a')
    const onSelf = absolute
      ? getParent(e.target, `[data-id=${this.dropdownId}]`)
      : el === this.element || this.element.contains(el)
    if (el && onSelf && el.getAttribute('data-role') === 'item') return
    this.handleHide(0)
  }

  handleFocus() {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer)
    }

    if (this.state.show) return
    this.setState({
      show: true,
    })

    this.toggleDocumentEvent(true)
  }

  handleHide(delay = 200) {
    this.closeTimer = setTimeout(() => {
      this.setState({ show: false })
      this.toggleDocumentEvent(false)
    }, delay)
  }

  handleToggle(show) {
    if (this.getTrigger() === 'click') return
    if (show) this.handleFocus()
    else this.handleHide()
  }

  renderRTLButton(placeholder, spanClassName, caret, buttonClassName) {
    const { isSub, type, outline, size, disabled } = this.props
    if (isSub) {
      return (
        <a
          key="button"
          className={dropdownClass('button', 'item', this.state.show && 'active')}
          data-role="item"
          onClick={this.handleFocus}
        >
          <span className={spanClassName}>{placeholder}</span>
          {caret}
        </a>
      )
    }
    return (
      <Button
        disabled={disabled}
        onClick={this.handleFocus}
        outline={outline}
        className={buttonClassName}
        type={type}
        size={size}
        key="button"
      >
        <span className={spanClassName}>{placeholder}</span>
        {caret}
      </Button>
    )
  }

  renderButton(placeholder) {
    const { type, outline, size, disabled, isSub } = this.props
    const rtl = isRTL()
    const buttonClassName = dropdownClass('button', !placeholder && 'split-button', rtl && 'rtl')
    const spanClassName = dropdownClass('button-content')
    const caret = (
      <span className={dropdownClass('caret', rtl && 'rtl')}>
        <Caret />
      </span>
    )

    if (isSub) {
      return (
        <a
          key="button"
          className={dropdownClass('button', 'item', this.state.show && 'active')}
          data-role="item"
          onClick={this.handleFocus}
        >
          <span className={spanClassName}>{placeholder}</span>
          {caret}
        </a>
      )
    }

    return (
      <Button
        disabled={disabled}
        onClick={this.handleFocus}
        outline={outline}
        className={buttonClassName}
        type={type}
        size={size}
        key="button"
      >
        <span className={spanClassName}>{placeholder}</span>
        {caret}
      </Button>
    )
  }

  renderList(data, placeholder, position) {
    const { width, onClick, columns, renderItem, absolute } = this.props
    if (!Array.isArray(data) || data.length === 0) return null
    const { DropdownList } = this
    return [
      <DropdownList
        absolute={absolute}
        parentElement={this.element}
        position={position}
        className={dropdownClass('menu', columns > 1 && 'box-list', isRTL() && 'rtl')}
        style={{ width }}
        key="list"
        focus={this.state.show}
        data-id={this.dropdownId}
        fixed="min"
      >
        {data.map((d, index) => {
          const childPosition = positionMap[position]
          const itemClassName = dropdownClass(
            'item',
            !width && 'no-width',
            childPosition.indexOf('left') === 0 && 'item-left'
          )
          return d.children ? (
            <Dropdown
              style={{ width: '100%' }}
              data={d.children}
              disabled={d.disabled}
              placeholder={d.content}
              type="link"
              key={index}
              position={childPosition}
              btnColor
              onClick={onClick}
              renderItem={renderItem}
              trigger={this.getTrigger()}
              isSub
            />
          ) : (
            <Item
              data={d}
              key={index}
              onClick={d.onClick || onClick}
              itemClassName={itemClassName}
              renderItem={renderItem}
              columns={columns}
              width={width}
            />
          )
        })}
      </DropdownList>,

      this.renderButton(placeholder),
    ]
  }

  render() {
    const { data, className, style, placeholder } = this.props
    const { show } = this.state
    const position = this.getPosition()

    let wrapClassName = dropdownClass('_', position, show && 'show', { 'split-dropdown': !placeholder })
    if (className) wrapClassName += ` ${className}`

    return (
      <div
        ref={this.bindElement}
        className={wrapClassName}
        style={style}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        {...getDataset(this.props)}
      >
        {this.renderList(data, placeholder, position)}
      </div>
    )
  }
}

Dropdown.propTypes = {
  ...getProps(PropTypes, 'placeholder', 'type'),
  data: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
  hover: PropTypes.bool,
  isSub: PropTypes.bool,
  position: PropTypes.string,
  trigger: PropTypes.oneOf(['click', 'hover']),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  animation: PropTypes.bool,
}

Dropdown.defaultProps = {
  ...defaultProps,
  disabled: false,
  data: [],
  position: 'bottom-left',
  trigger: 'click',
  animation: true,
}

Dropdown.displayName = 'ShineoutDropdown'

export default absoluteComsumer(Dropdown)
