import React, { PureComponent, Children } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
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

    this.handleChange = this.handleChange.bind(this)
    this.handleCollapse = this.handleCollapse.bind(this)
    this.renderContent = this.renderContent.bind(this)
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

  renderHeader() {
    const {
      children, color, shape, inactiveBackground, collapsible,
    } = this.props
    const active = this.getActive()
    const tabs = []

    let { border } = this.props
    Children.toArray(children).forEach((child, i) => {
      if (child && child.type && child.type.isTabPanel) {
        const { id = i, tab, background } = child.props

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
          background: background || (active === id ? this.props.background : inactiveBackground),
          border: childBorder,
          color: child.props.color || (active === id ? color : undefined),
          shape,
        })
      }
    })

    return (
      <Header
        border={border}
        collapsed={this.state.collapsed}
        onCollapse={collapsible ? this.handleCollapse : undefined}
        shape={shape}
        onChange={this.handleChange}
        tabs={tabs}
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
    const {
      children, shape, align, style,
    } = this.props
    const className = classnames(
      tabsClass('_', align && `align-${align}`, shape),
      this.props.className,
    )

    return (
      <div className={className} style={style}>
        {this.renderHeader()}
        {Children.toArray(children).map(this.renderContent)}
      </div>
    )
  }
}

Tabs.propTypes = {
  active: PropTypes.any,
  align: PropTypes.oneOf(['left', 'right']),
  background: PropTypes.string,
  border: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
  className: PropTypes.string,
  collapsible: PropTypes.bool,
  color: PropTypes.string,
  defaultActive: PropTypes.any,
  defaultCollapsed: PropTypes.bool,
  inactiveBackground: PropTypes.string,
  onChange: PropTypes.func,
  shape: PropTypes.oneOf(['card', 'line', 'button']),
  style: PropTypes.object,
}

Tabs.defaultProps = {
  background: '#fff',
  border: '#ddd',
  color: '#333',
  defaultCollapsed: false,
  inactiveBackground: 'transparent',
}

export default Tabs
