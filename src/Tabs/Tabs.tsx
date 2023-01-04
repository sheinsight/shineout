import React, { Children, ReactElement } from 'react'
import classnames from 'classnames'
import { PureComponent } from '../component'
import Header from './Header'
import getDataset from '../utils/dom/getDataset'
import Wrapper from './Wrapper'
import Sticky from '../Sticky'
import { StickyProps } from '../Sticky/Props'
import { tabsClass } from './styles'
import { isEmpty, isObject } from '../utils/is'
import { isRTL } from '../config'
import { TabsProps, TabsChildProps } from './Props'
import Panel from './Panel'
import Link from './Link'

interface TabsState {
  active: string | number
  collapsed?: boolean
}

const DefaultValue = {
  defaultCollapsed: false,
  lazy: true,
  hideSplit: false,
}

class Tabs extends PureComponent<TabsProps, TabsState> {
  static defaultProps = DefaultValue

  container: HTMLDivElement | null

  sticky: boolean

  static Panel = Panel

  static Link = Link

  static displayName: string

  constructor(props: TabsProps) {
    super(props)

    this.state = {
      active: props.defaultActive || 0,
      collapsed: props.defaultCollapsed,
    }

    this.getAlign = this.getAlign.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleCollapse = this.handleCollapse.bind(this)
    this.renderContent = this.renderContent.bind(this)
    this.bindContainer = this.bindContainer.bind(this)
    this.setStickyStatus = this.setStickyStatus.bind(this)
  }

  componentDidUpdate(prevProps: TabsProps, prevState: TabsState) {
    const { sticky, switchToTop, active } = this.props

    if (
      (prevProps.active !== active || prevState.active !== this.state.active) &&
      this.container &&
      !isEmpty(sticky) &&
      switchToTop &&
      this.sticky
    ) {
      // jump to active panel
      this.container.scrollIntoView(true)
    }
  }

  componentWillUnmount() {
    this.container = null
  }

  getAlign() {
    const { shape, collapsible, align } = this.props
    const isVertical = align && align.indexOf('vertical') > -1
    if (shape === 'button' && isVertical) {
      console.warn("align vertical-* can't supported when shape is button")
      return { align: 'left', isVertical: false }
    }

    if (collapsible && isVertical) {
      console.warn("align vertical-* can't supported when collapsible is true")
      return { align: 'left', isVertical: false }
    }

    return { align, isVertical }
  }

  getActive() {
    if ('active' in this.props) return this.props.active
    return this.state.active
  }

  setStickyStatus(flag: boolean) {
    const { sticky, switchToTop } = this.props
    if (!sticky || !switchToTop) return
    this.sticky = flag
  }

  bindContainer(node: HTMLDivElement) {
    this.container = node
  }

  handleChange(active: string | number) {
    const { onChange } = this.props
    if (onChange) onChange(active)
    this.setState({ active })
  }

  handleCollapse(collapsed: boolean) {
    this.setState({ collapsed })
  }

  renderHeader({ align, isVertical }: any) {
    const {
      children,
      color,
      shape,
      tabBarStyle,
      inactiveBackground,
      collapsible,
      tabBarExtraContent,
      sticky,
      hideSplit,
    } = this.props
    const active = this.getActive()
    const tabs: TabsChildProps[] = []

    let { border } = this.props
    Children.toArray(children).forEach(
      (child: ReactElement & { type: { isTabPanel: boolean; isTabLink: boolean } }, i, arr) => {
        if (!child || !child.type) return

        let tab = null
        if (child.type.isTabPanel) {
          // eslint-disable-next-line
          tab = child.props.tab
        } else if (child.type.isTabLink) {
          tab = child
        } else return

        const { id = i, background } = child.props
        let childBorder = child.props.border
        // eslint-disable-next-line
        if (active === id) {
          if (childBorder) border = childBorder
          else childBorder = border
        }

        tabs.push({
          id,
          isActive: active === id,
          tab,
          isVertical,
          align,
          background: background || (active === id ? this.props.background : inactiveBackground),
          border: childBorder,
          color: child.props.color || (active === id ? color : undefined),
          disabled: child.props.disabled,
          shape,
          last: arr.length - 1 === i,
          ...getDataset(child.props),
        })
      }
    )

    const header = (
      <Header
        isVertical={isVertical}
        border={border}
        collapsed={this.state.collapsed}
        onCollapse={collapsible ? this.handleCollapse : undefined}
        shape={shape}
        onChange={this.handleChange}
        tabs={tabs}
        tabBarExtraContent={tabBarExtraContent}
        tabBarStyle={tabBarStyle}
        hideSplit={hideSplit}
      />
    )

    if (!isEmpty(sticky) && !isVertical) {
      const stickyClassName = tabsClass('sticky')
      let stickyProps: { top?: number | undefined; className: string } = {
        top: 0,
        className: stickyClassName,
      }
      if (typeof sticky === 'number') {
        stickyProps.top = sticky
      }
      if (isObject(sticky)) {
        stickyProps = {
          ...(sticky as StickyProps),
          className: classnames(stickyClassName, (sticky as StickyProps).className),
        }
      }
      return (
        <Sticky onChange={this.setStickyStatus} {...stickyProps}>
          {header}
        </Sticky>
      )
    }
    return header
  }

  renderContent(child: ReactElement & { type: { isTabPanel: boolean; isTabLink: boolean } }, i: number) {
    if (!(child && child.type && child.type.isTabPanel)) return null
    const { collapsible, lazy } = this.props
    const { id = i, ...other } = child.props

    return (
      <Wrapper
        {...other}
        lazy={lazy}
        collapsed={this.state.collapsed}
        collapsible={collapsible}
        id={id}
        key={id}
        active={this.getActive()}
      />
    )
  }

  render() {
    const { children, shape, style, autoFill } = this.props
    const position = this.getAlign()
    const { align, isVertical } = position
    const className = classnames(
      tabsClass(
        '_',
        align && `align-${align}`,
        isVertical && 'vertical',
        shape,
        autoFill && 'auto-fill',
        isRTL() && 'rtl'
      ),
      this.props.className
    )

    return (
      <div className={className} style={style} ref={this.bindContainer}>
        {align !== 'vertical-right' && align !== 'bottom' && this.renderHeader(position)}
        {Children.toArray(children).map(this.renderContent)}
        {(align === 'vertical-right' || align === 'bottom') && this.renderHeader(position)}
      </div>
    )
  }
}

export default Tabs
