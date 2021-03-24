import React, { Children } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { PureComponent } from '../component'
import Header from './Header'
import getDataset from '../utils/dom/getDataset'
import Wrapper from './Wrapper'
import Sticky from '../Sticky'
import { tabsClass } from '../styles'
import { isEmpty, isObject } from '../utils/is'

class Tabs extends PureComponent {
  constructor(props) {
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

  componentDidUpdate(prevProps, prevState) {
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

  setStickyStatus(flag) {
    const { sticky, switchToTop } = this.props
    if (!sticky || !switchToTop) return
    this.sticky = flag
  }

  bindContainer(node) {
    this.container = node
  }

  handleChange(active) {
    const { onChange } = this.props
    if (onChange) onChange(active)
    this.setState({ active })
  }

  handleCollapse(collapsed) {
    this.setState({ collapsed })
  }

  renderHeader({ align, isVertical }) {
    const {
      children,
      color,
      shape,
      tabBarStyle,
      inactiveBackground,
      collapsible,
      tabBarExtraContent,
      sticky,
    } = this.props
    const active = this.getActive()
    const tabs = []

    let { border } = this.props
    Children.toArray(children).forEach((child, i, arr) => {
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
    })

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
      />
    )

    if (!isEmpty(sticky) && !isVertical) {
      const stickyClassName = tabsClass('sticky')
      let stickyProps = {
        top: 0,
        className: stickyClassName,
      }
      if (typeof sticky === 'number') {
        stickyProps.top = sticky
      }
      if (isObject(sticky)) {
        stickyProps = { ...sticky, className: classnames(stickyClassName, sticky.className) }
      }
      return (
        <Sticky onChange={this.setStickyStatus} {...stickyProps}>
          {header}
        </Sticky>
      )
    }
    return header
  }

  renderContent(child, i) {
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
      tabsClass('_', align && `align-${align}`, isVertical && 'vertical', shape, autoFill && 'auto-fill'),
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

Tabs.propTypes = {
  active: PropTypes.any,
  align: PropTypes.oneOf(['left', 'right', 'vertical-left', 'vertical-right', 'bottom']),
  background: PropTypes.string,
  border: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  className: PropTypes.string,
  collapsible: PropTypes.bool,
  color: PropTypes.string,
  defaultActive: PropTypes.any,
  defaultCollapsed: PropTypes.bool,
  inactiveBackground: PropTypes.string,
  onChange: PropTypes.func,
  shape: PropTypes.oneOf(['card', 'line', 'button', 'bordered', 'dash']),
  style: PropTypes.object,
  tabBarExtraContent: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  tabBarStyle: PropTypes.object,
  lazy: PropTypes.bool,
  autoFill: PropTypes.bool,
  sticky: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.object]),
  switchToTop: PropTypes.bool,
}

Tabs.defaultProps = {
  background: '#fff',
  border: '#ddd',
  color: '#333',
  defaultCollapsed: false,
  inactiveBackground: 'transparent',
  lazy: true,
}

export default Tabs
