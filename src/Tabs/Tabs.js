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

    const tabs = []
    Children.toArray(children).forEach((child, i) => {
      if (child && child.type && child.type.isTabPanel) {
        const { tab, id = i } = child.props
        tabs.push({ tab, id })
      }
    })

    return <Header onChange={this.handleChange} tabs={tabs} />
  }

  renderContent(child, i) {
    if (!(child && child.type && child.type.isTabPanel)) return null
    const { id = i, children } = child.props

    return (
      <Wrapper id={id} key={id} active={this.getActive()}>{children}</Wrapper>
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
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
  className: PropTypes.string,
  defaultActive: PropTypes.any,
  onChange: PropTypes.func,
  style: PropTypes.object,
}

export default Tabs
