import React from 'react'
import immer from 'immer'
import { addResizeObserver } from '../utils/dom/element'
import { PureComponent } from '../component'
import Button from '../Button'
import icons from '../icons'
import Tab from './Tab'
import { tabsClass } from './styles'
import { isRTL } from '../config'
import { HeaderProps, TabsChildProps } from './Props'

interface HeaderState {
  attribute: number
  overflow: boolean
  attributeString?: string
}

const REDUNDANT = 30
class Header extends PureComponent<HeaderProps, HeaderState> {
  bindInner: (e: HTMLDivElement) => void

  bindWrapper: (e: HTMLDivElement) => void

  bindScroll: (e: HTMLDivElement) => void

  handlePrevClick: any

  handleNextClick: any

  removeObserver: () => void

  innerElement: HTMLElement

  scrollElement: HTMLElement

  ignoreNextCollapse: boolean

  constructor(props: HeaderProps) {
    super(props)

    this.state = {
      attribute: 0,
      overflow: false,
    }

    this.setPosition = this.setPosition.bind(this)
    this.bindInner = this.bindElement.bind(this, 'innerElement')
    this.bindWrapper = this.bindElement.bind(this, 'wrapperElement')
    this.bindScroll = this.bindElement.bind(this, 'scrollElement')
    this.renderTab = this.renderTab.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handlePrevClick = this.handleMove.bind(this, true)
    this.handleNextClick = this.handleMove.bind(this, false)
    this.moveToCenter = this.moveToCenter.bind(this)
    this.handleCollapse = this.handleCollapse.bind(this)
    this.handleResize = this.handleResize.bind(this)
  }

  componentDidMount() {
    super.componentDidMount()
    const { isVertical } = this.props
    this.setPosition(isVertical)
    this.removeObserver = addResizeObserver(this.innerElement, this.handleResize, { direction: true, timer: 100 })
  }

  componentDidUpdate() {
    const { isVertical } = this.props
    this.setPosition(isVertical)
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    if (this.removeObserver) {
      this.removeObserver()
    }
  }

  setPosition(isVertical?: boolean) {
    const attributeString = isVertical ? 'Height' : 'Width'
    if (!this.innerElement) return
    const innerAttribute = this.innerElement[`client${attributeString}`]
    const scrollAttribute = this.scrollElement[`client${attributeString}`]
    const { attribute: domAttribute } = this.state
    this.setState({ overflow: scrollAttribute > domAttribute + innerAttribute, attributeString })
  }

  handleResize(_entry: HTMLElement, { x, y }: { x: boolean; y: boolean }) {
    const { isVertical } = this.props
    const isResize = isVertical ? y : x
    if (isResize) this.setPosition(isVertical)
  }

  bindElement(name: keyof this, el: any) {
    this[name] = el
  }

  handleMove(lt: boolean) {
    const { attributeString, attribute: a } = this.state
    const innerAttribute = this.innerElement[`client${attributeString}` as keyof HTMLElement] as number
    const scrollAttribute = this.scrollElement[`client${attributeString}` as keyof HTMLElement] as number
    let attribute = a + (lt ? -innerAttribute : innerAttribute)
    if (attribute < 0) attribute = 0
    if (attribute + innerAttribute > scrollAttribute) attribute = scrollAttribute - innerAttribute
    if (scrollAttribute <= innerAttribute) attribute = 0
    this.setState({ attribute })
  }

  moveToCenter(tabRect: DOMRect, last: boolean, first: boolean) {
    const { isVertical } = this.props
    const positions: ['top', 'bottom'] | ['left', 'right'] = isVertical ? ['top', 'bottom'] : ['left', 'right']
    const rect = this.innerElement.getBoundingClientRect()
    const d = isRTL() && !isVertical ? -1 : 1
    if (tabRect[positions[0]] < rect[positions[0]]) {
      this.setState(
        immer(draft => {
          draft.attribute -= (rect[positions[0]] - tabRect[positions[0]] + (first ? 0 : REDUNDANT)) * d
        })
      )
    } else if (tabRect[positions[1]] > rect[positions[1]]) {
      this.setState(
        immer(draft => {
          draft.attribute +=
            (tabRect[positions[1]] - rect[positions[1]] - (draft.attribute === 0 ? -30 : 0) + (last ? 0 : REDUNDANT)) *
            d
        })
      )
    }
  }

  handleClick(id: string | number, isActive: boolean) {
    if (!isActive) {
      if (this.props.onChange) this.props.onChange(id)
      this.ignoreNextCollapse = true
      setTimeout(() => this.handleCollapse(false), 200)
    }
  }

  handleCollapse(e: React.MouseEvent<HTMLDivElement> | boolean) {
    const { onCollapse, collapsed } = this.props
    if (!onCollapse) return

    if (typeof e === 'boolean') {
      onCollapse(e)
      return
    }

    if (this.ignoreNextCollapse) {
      this.ignoreNextCollapse = false
      return
    }

    onCollapse(!collapsed)
  }

  renderTab({ tab, id, ...other }: TabsChildProps) {
    return (
      <Tab {...other} key={id} id={id} moveToCenter={this.moveToCenter} onClick={this.handleClick}>
        {tab}
      </Tab>
    )
  }

  renderButtons() {
    const { onChange, tabs } = this.props
    return (
      <Button.Group className={tabsClass('header-button')}>
        {tabs.map(tab => (
          <Button
            key={tab.id}
            onClick={tab.isActive ? undefined : onChange.bind(this, tab.id)}
            className={tabsClass(tab.isActive && 'button-active')}
            disabled={tab.disabled}
          >
            {tab.tab}
          </Button>
        ))}
      </Button.Group>
    )
  }

  renderTabs() {
    const { tabs } = this.props
    return tabs.map(this.renderTab)
  }

  render() {
    const { border, onCollapse, collapsed, isVertical, tabBarExtraContent, tabBarStyle, shape, hideSplit } = this.props
    const { attribute, overflow } = this.state

    const hor = isRTL() ? 'Right' : 'Left'
    const position = isVertical ? 'Top' : hor
    const showBorder = shape !== 'bordered' && shape !== 'dash' && !hideSplit

    return (
      <div onClick={this.handleCollapse} className={tabsClass('header')} style={tabBarStyle || {}}>
        <div ref={this.bindWrapper} className={tabsClass('header-tabs')}>
          {onCollapse && <span className={tabsClass('indicator', collapsed && 'collapsed')}>{icons.AngleRight}</span>}
          {attribute > 0 && (
            <div onClick={this.handlePrevClick} className={tabsClass('scroll-prev')}>
              {icons.AngleLeft}
            </div>
          )}
          <div ref={this.bindInner} className={tabsClass('inner')}>
            <div ref={this.bindScroll} style={{ [`margin${position}`]: -attribute }} className={tabsClass('scroll')}>
              {shape === 'button' ? this.renderButtons() : this.renderTabs()}
            </div>
          </div>
          {overflow && (
            <div onClick={this.handleNextClick} className={tabsClass('scroll-next')}>
              {isVertical ? icons.AngleRight : icons.AngleRight}
            </div>
          )}
        </div>
        {tabBarExtraContent && <div className={tabsClass('extra')}>{tabBarExtraContent}</div>}
        {showBorder && shape !== 'button' && <div style={{ borderColor: border }} className={tabsClass('hr')} />}
      </div>
    )
  }
}

export default Header
