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
    else this.setState({ active })
  }

  renderHeader() {
    const { children } = this.props
    const active = this.getActive()
    const tabs = []

    let { border, color } = this.props
    Children.toArray(children).forEach((child, i) => {
      if (child && child.type && child.type.isTabPanel) {
        const { id = i, tab, background } = child.props
        color = child.props.color || (active === id ? color : undefined)

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
          background: active === id ? (background || '#fff') : background,
          border: childBorder,
          color,
        })
      }
    })

    return <Header border={border} onChange={this.handleChange} tabs={tabs} />
  }

  renderContent(child, i) {
    if (!(child && child.type && child.type.isTabPanel)) return null
    const { id = i, ...other } = child.props

    return (
      <Wrapper {...other} id={id} key={id} active={this.getActive()} />
    )
  }

  render() {
    const { children, style } = this.props
    const className = classnames(tabsClass('_'), this.props.className)

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
  border: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
  className: PropTypes.string,
  color: PropTypes.string,
  defaultActive: PropTypes.any,
  onChange: PropTypes.func,
  style: PropTypes.object,
}

Tabs.defaultProps = {
  border: '#ddd',
  color: '#333',
}

export default Tabs
