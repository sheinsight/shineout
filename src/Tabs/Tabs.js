import React, { Children } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { PureComponent } from '../component'
import Header from './Header'
import Wrapper from './Wrapper'
import { tabsClass } from '../styles'

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
    if (this.props.active) return this.props.active
    return this.state.active
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
    const { children, color, shape, tabBarStyle, inactiveBackground, collapsible, tabBarExtraContent } = this.props
    const active = this.getActive()
    const tabs = []

    let { border } = this.props
    Children.toArray(children).forEach((child, i) => {
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
      })
    })

    return (
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
  }

  renderContent(child, i) {
    if (!(child && child.type && child.type.isTabPanel)) return null
    const { collapsible } = this.props
    const { id = i, ...other } = child.props

    return (
      <Wrapper
        {...other}
        collapsed={this.state.collapsed}
        collapsible={collapsible}
        id={id}
        key={id}
        active={this.getActive()}
      />
    )
  }

  render() {
    const { children, shape, style } = this.props
    const position = this.getAlign()
    const { align, isVertical } = position
    const className = classnames(
      tabsClass('_', align && `align-${align}`, isVertical && 'vertical', shape),
      this.props.className
    )

    return (
      <div className={className} style={style}>
        {align !== 'vertical-right' && align !== 'bottom' && this.renderHeader(position)}
        {Children.toArray(children).map(this.renderContent)}
        {(align === 'vertical-right' || align === 'bottom') && this.renderHeader(position)}
      </div>
    )
  }
}

Tabs.propTypes = {
  active: PropTypes.any,
  align: PropTypes.oneOf(['left', 'right', 'vertical-left', 'vertical-right']),
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
  shape: PropTypes.oneOf(['card', 'line', 'button']),
  style: PropTypes.object,
  tabBarExtraContent: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  tabBarStyle: PropTypes.object,
}

Tabs.defaultProps = {
  background: '#fff',
  border: '#ddd',
  color: '#333',
  defaultCollapsed: false,
  inactiveBackground: 'transparent',
}

export default Tabs
