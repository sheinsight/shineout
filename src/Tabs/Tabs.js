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
    }

    this.handleChange = this.handleChange.bind(this)
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

  renderHeader() {
    const {
      children, color, shape, inactiveBackground,
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

    return <Header border={border} shape={shape} onChange={this.handleChange} tabs={tabs} />
  }

  renderContent(child, i) {
    if (!(child && child.type && child.type.isTabPanel)) return null
    const { id = i, ...other } = child.props

    return (
      <Wrapper {...other} id={id} key={id} active={this.getActive()} />
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
  color: PropTypes.string,
  defaultActive: PropTypes.any,
  inactiveBackground: PropTypes.string,
  onChange: PropTypes.func,
  shape: PropTypes.oneOf(['card', 'line', 'button']),
  style: PropTypes.object,
}

Tabs.defaultProps = {
  background: '#fff',
  border: '#ddd',
  color: '#333',
  inactiveBackground: 'transparent',
}

export default Tabs
