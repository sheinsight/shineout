import React, { cloneElement } from 'react'
import classnames from 'classnames'
import { PureComponent } from '../component'
import { getKey, getUidStr } from '../utils/uid'
import { menuClass } from './styles'
import List from './List'
import { consumer } from './context'
import { isLink } from '../utils/is'
import { isRTL } from '../config'
import { getParent } from '../utils/dom/element'
import { ItemProps, BaseItemProps } from './Props'
import { DefaultProps } from './Root'

interface State {
  open: boolean
  inPath: string
  isActive: boolean
  isHighLight: boolean
}

const getBaseIndent = () => 16

const calcIndent = (flag: boolean | undefined, indent: number) => {
  if (!flag) return indent
  return Math.ceil((indent / 3) * 2)
}

class Item<U extends BaseItemProps<U>> extends PureComponent<ItemProps<U>, State> {
  id: string

  handleMouseEnter: React.MouseEventHandler<HTMLLIElement>

  handleMouseLeave: React.MouseEventHandler<HTMLLIElement>

  element: HTMLLIElement

  toggleTimer: NodeJS.Timer

  constructor(props: ItemProps<U>) {
    super(props)

    this.id = `${props.path},${getUidStr()}`
    const key = this.getKey(props)
    const noop: (...args: any) => any = () => {}

    const [activeUpdate, openUpdate, inPathUpdate] = props.bindItem(this.id, noop, noop, noop)

    this.state = {
      open: openUpdate(key),
      isActive: activeUpdate(this.id, props.data),
      inPath: inPathUpdate(this.id),
      isHighLight: false,
    }

    this.bindElement = this.bindElement.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleSwitch = this.handleSwitch.bind(this)
    this.handleMouseEnter = this.handleToggle.bind(this, true)
    this.handleMouseLeave = this.handleToggle.bind(this, false)
    this.renderLink = this.renderLink.bind(this)
  }

  componentDidMount() {
    super.componentDidMount()
    this.props.bindItem(this.id, this.update.bind(this), this.updateOpen.bind(this), this.updateInPath.bind(this))
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    this.props.unbindItem(this.id)
    this.unbindDocumentEvent()
  }

  getKey(props = this.props) {
    return getKey(props.data, props.keygen, props.index) as string
  }

  getCalcStyle() {
    const style: React.CSSProperties = {}
    const { frontCaret, level, inlineIndent = DefaultProps.inlineIndent, mode } = this.props

    const rtl = isRTL()

    if (mode !== 'inline') return style

    const indent = calcIndent(frontCaret, inlineIndent)

    if (rtl) {
      style.paddingRight = getBaseIndent() + level * indent
    } else {
      style.paddingLeft = getBaseIndent() + level * indent
    }

    return style
  }

  bindElement(el: HTMLLIElement) {
    this.element = el
  }

  unbindDocumentEvent() {
    document.removeEventListener('click', (this.handleMouseLeave as unknown) as EventListenerObject)
  }

  update(check: (id: string, data: U) => boolean, activePath: string) {
    const isActive = check(this.id, this.props.data)
    const isHighLight = activePath && isActive ? activePath.indexOf(this.id) > -1 : false

    this.setState({ isActive, isHighLight })
  }

  updateOpen(check: (key: string) => boolean) {
    const isOpen = check(this.getKey())
    this.setState({ open: isOpen })
  }

  updateInPath(check: (...args: any) => boolean) {
    const inPath = check(this.id)
    this.setState({ inPath })
  }

  handleToggle(open: boolean) {
    const { toggleOpenKeys, toggleDuration } = this.props
    const key = this.getKey()

    if (this.toggleTimer) clearTimeout(this.toggleTimer)
    if (open) {
      toggleOpenKeys(key, true)
      document.addEventListener('click', (this.handleMouseLeave as unknown) as EventListenerObject)
    } else {
      this.toggleTimer = setTimeout(() => {
        toggleOpenKeys(key, false)
      }, toggleDuration)
      this.unbindDocumentEvent()
    }
  }

  handleClick(e: React.MouseEvent) {
    const { data, onClick, mode, toggleOpenKeys, looseChildren, parentSelectable } = this.props
    const expandClick = getParent(e.target as HTMLElement, `.${menuClass('expand')}`)
    const canExpand = !parentSelectable || expandClick
    if (mode === 'inline' && data.children && canExpand) {
      const shouldToggle = looseChildren || data.children.length
      if (shouldToggle) toggleOpenKeys(this.getKey(), !this.state.open)
      if (parentSelectable && expandClick) return
    }

    if (data.disabled) return
    if (typeof data.onClick === 'function') {
      data.onClick(this.id, data)
    } else if (
      (!data.children || data.children.length === 0 || data.onClick === true || parentSelectable) &&
      typeof onClick === 'function'
    ) {
      onClick(this.id, data)
    }
    const isLeaf = ((data || {}).children || []).length === 0
    if (!isLeaf) e.nativeEvent.stopImmediatePropagation()
  }

  handleItemClick(clickMethod: Function, e: React.MouseEvent) {
    clickMethod()
    this.handleClick(e)
  }

  handleSwitch(e: React.MouseEvent) {
    const { renderItem, data, index } = this.props
    const item = renderItem(data, index) as React.ReactElement
    if (item.props && item.props.onClick) {
      this.handleItemClick(item.props.onClick, e)
    } else {
      this.handleClick(e)
    }
  }

  renderLink(data: U) {
    const { linkKey } = this.props
    if (!linkKey) return null
    if (typeof linkKey === 'function') return linkKey(data)
    return data[linkKey as keyof typeof data]
  }

  renderItem(hasChilds = false, style: React.CSSProperties) {
    const { renderItem, data, index, frontCaret, caretColor } = this.props
    const item = renderItem(data, index) as React.ReactElement
    const link = this.renderLink(data)
    if (isLink(item)) {
      const mergeClass = classnames(menuClass('title'), item.props && item.props.className)
      const mergeStyle = Object.assign({}, style, item.props && item.props.style)
      return cloneElement(item, { className: mergeClass, style: mergeStyle, onClick: this.handleSwitch })
    }

    const props: React.ReactElement['props'] & { href?: string } = {
      className: menuClass('title'),
      style,
      onClick: this.handleClick,
    }
    if (link) props.href = link

    if (frontCaret) {
      return (
        <a {...props}>
          <div style={{ color: caretColor }} className={menuClass('caret', hasChilds && 'has-childs')} />
          {item}
        </a>
      )
    }

    return (
      <a {...props}>
        {item}
        <span className={menuClass('expand')} style={{ color: caretColor }} />
      </a>
    )
  }

  render() {
    const {
      data,
      renderItem,
      mode,
      keygen,
      level,
      onClick,
      inlineIndent,
      disabled,
      toggleOpenKeys,
      bottomLine,
      topLine,
      linkKey,
      toggleDuration,
      frontCaret,
      looseChildren,
      parentSelectable,
      frontCaretType,
    } = this.props
    const { open, isActive, isHighLight, inPath } = this.state
    const { children: dChildren } = data
    const children = dChildren || []

    const isDisabled = typeof disabled === 'function' ? disabled(data) : disabled

    let isUp = false
    if (mode === 'vertical-auto' && this.element) {
      isUp = this.element.getBoundingClientRect().bottom - topLine! > (bottomLine! - topLine!) / 2
    }

    const hasChilds = looseChildren ? Array.isArray(dChildren) : children.length > 0

    const className = menuClass(
      'item',
      isDisabled === true && 'disabled',
      hasChilds ? 'has-children' : 'no-children',
      isActive && 'active',
      open && 'open',
      isUp && 'open-up',
      isHighLight && 'highlight',
      inPath && 'in-path',
      frontCaret && `caret-${frontCaretType}`,
      parentSelectable && 'selectable'
    )

    const style = this.getCalcStyle()
    const events: {
      onMouseEnter?: React.MouseEventHandler<HTMLLIElement>
      onMouseLeave?: React.MouseEventHandler<HTMLLIElement>
    } = {}
    if (mode !== 'inline') {
      events.onMouseEnter = this.handleMouseEnter
      events.onMouseLeave = this.handleMouseLeave
    }
    return (
      <li className={className} {...events} ref={this.bindElement}>
        {this.renderItem(hasChilds, style)}
        {hasChilds && (
          <List
            // className={menuClass('sub')}
            data={children}
            disabled={disabled}
            renderItem={renderItem}
            keygen={keygen}
            inlineIndent={mode === 'horizontal' ? 0 : inlineIndent}
            mode={mode === 'horizontal' ? 'inline' : mode}
            onClick={onClick}
            path={this.id}
            level={level + 1}
            open={open}
            toggleOpenKeys={toggleOpenKeys}
            linkKey={linkKey}
            toggleDuration={toggleDuration}
            frontCaret={frontCaret}
            looseChildren={looseChildren}
            parentSelectable={parentSelectable}
          />
        )}
      </li>
    )
  }
}

export default consumer(Item)
