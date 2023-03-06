import React, { ReactNode } from 'react'
import { PureComponent } from '../component'
import { defaultProps } from '../utils/defaultProps'
import { getParent } from '../utils/dom/element'
import Button from '../Button'
import { dropdownClass } from './styles'
import List from '../AnimationList'
import Item from './Item'
import { docSize } from '../utils/dom/document'
import absoluteList from '../AnimationList/AbsoluteList'
import { getUidStr } from '../utils/uid'
import { isFunc } from '../utils/is'
import absoluteComsumer from '../Table/context'
import Caret from '../icons/Caret'
import { isRTL } from '../config'
import { getDirectionClass } from '../utils/classname'
import getDataset from '../utils/dom/getDataset'
import { DropdownProps, DropdownNode, DropdownType } from './Props'

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

const DefaultProps = {
  ...defaultProps,
  data: [],
  animation: true,
  disabled: false,
  trigger: 'click',
  position: 'bottom-left',
}

interface DropDownState {
  show: boolean
}

class Dropdown extends PureComponent<DropdownProps, DropDownState> {
  static defaultProps: any = DefaultProps

  dropdownId: string

  handleMouseEnter: React.MouseEventHandler<HTMLDivElement>

  handleMouseLeave: React.MouseEventHandler<HTMLDivElement>

  element: HTMLDivElement

  DropdownList: any

  closeTimer: NodeJS.Timeout

  static displayName: string

  constructor(props: DropdownProps) {
    super(props)

    this.state = {
      show: false,
    }

    // @ts-ignore
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
    // @ts-ignore
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
    const prefix = rect.bottom > windowHeight / 2 ? 'top-' : 'bottom-'
    const suffix = rect.right > windowWidth / 2 ? 'right' : 'left'
    position = (prefix + suffix) as keyof DropdownProps['position']

    return position
  }

  bindElement(el: HTMLDivElement) {
    this.element = el
  }

  bindList() {
    const { animation } = this.props
    const FadeList = List('fade', animation ? 'fast' : 0)
    // @ts-ignore
    this.DropdownList = absoluteList(({ focus, ...other }) => <FadeList show={focus} {...other} />)
  }

  toggleDocumentEvent(bind: boolean) {
    const method = bind ? 'addEventListener' : 'removeEventListener'
    document[method]('click', (this.clickAway as unknown) as EventListener, true)
  }

  clickAway(e: React.MouseEvent) {
    const { absolute } = this.props
    const el = getParent(e.target as HTMLElement, 'a')
    const onSelf = absolute
      ? getParent(e.target as HTMLElement, `[data-id=${this.dropdownId}]`)
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

  handleToggle(show: boolean) {
    if (this.getTrigger() === 'click') return
    if (show) this.handleFocus()
    else this.handleHide()
  }

  renderRTLButton(placeholder: string, spanClassName: string, caret: ReactNode, buttonClassName: string) {
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

  renderButton(placeholder: ReactNode) {
    const { type, outline, size, disabled, isSub, position } = this.props
    const rtl = isRTL()
    const buttonClassName = dropdownClass('button', !placeholder && 'split-button', rtl && 'rtl')
    const spanClassName = dropdownClass('button-content')
    const caret = (
      <span key="caret" className={dropdownClass('caret', rtl && 'rtl')}>
        <Caret />
      </span>
    )
    const childs = [
      <span key="text" className={spanClassName}>
        {placeholder}
      </span>,
      caret,
    ]
    if (['left-bottom', 'left-top'].includes(position!)) {
      childs.reverse()
    }
    if (isSub) {
      return (
        <a
          key="button"
          className={dropdownClass('button', 'item', this.state.show && 'active')}
          data-role="item"
          onClick={this.handleFocus}
        >
          {childs}
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
        {childs}
      </Button>
    )
  }

  renderList(data: DropdownProps['data'], placeholder: DropdownProps['placeholder'], position?: string) {
    const { width, onClick, columns, renderItem, absolute } = this.props
    if (!Array.isArray(data) || data.length === 0) return null
    const { DropdownList } = this
    return [
      <DropdownList
        absolute={absolute}
        parentElement={this.element}
        position={position}
        className={dropdownClass(
          getDirectionClass('menu'),
          columns !== undefined && columns > 1 && 'box-list',
          isRTL() && 'rtl'
        )}
        style={{ width }}
        key="list"
        focus={this.state.show}
        data-id={this.dropdownId}
        fixed="min"
      >
        {data.map((d, index) => {
          const childPosition = positionMap[position as keyof typeof positionMap]
          const itemClassName = dropdownClass(
            'item',
            !width && 'no-width',
            childPosition.indexOf('left') === 0 && 'item-left'
          )

          let renderPlaceholder

          if (renderItem) {
            renderPlaceholder = isFunc(renderItem) ? renderItem(d) : (d as any)[renderItem]
          } else {
            renderPlaceholder = (d as DropdownNode).content
          }
          const { children } = d as DropdownNode
          return children ? (
            <Dropdown
              style={{ width: '100%' }}
              data={children}
              disabled={!!(d as DropdownNode).disabled}
              placeholder={renderPlaceholder}
              type="link"
              key={index}
              position={childPosition as DropdownProps['position']}
              onClick={onClick}
              renderItem={renderItem}
              trigger={this.getTrigger()}
              isSub
            />
          ) : (
            <Item
              data={d}
              key={index}
              onClick={(d as DropdownNode).onClick || onClick}
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

    let wrapClassName = dropdownClass('_', position, show && 'show', { 'split-dropdown': !placeholder, rtl: isRTL() })
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

Dropdown.displayName = 'ShineoutDropdown'

const exports = absoluteComsumer(Dropdown)

export default (exports as unknown) as DropdownType
