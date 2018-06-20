import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Tab from './Tab'
import { tabsClass } from '../styles'

class Header extends PureComponent {
  constructor(props) {
    super(props)

    this.state = { overflow: false }

    this.bindInner = this.bindElement.bind(this, 'innerElement')
    this.bindWrapper = this.bindElement.bind(this, 'wrapperElement')
    this.renderTab = this.renderTab.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.setWidth()
  }

  setWidth() {
    if (!this.innerElement || !this.wrapperElement) return
    const innerWidth = this.innerElement.clientWidth
    const wrapperWidth = this.wrapperElement.clientWidth
    console.log(innerWidth, wrapperWidth)
    this.setState({ overflow: innerWidth > wrapperWidth })
  }

  bindElement(name, el) {
    this[name] = el
  }

  handleClick(id) {
    if (this.props.onChange) this.props.onChange(id)
  }

  renderTab({ tab, id, ...other }) {
    return <Tab {...other} key={id} id={id} onClick={this.handleClick}>{tab}</Tab>
  }

  render() {
    const { border, tabs } = this.props
    const { overflow } = this.state
    console.log(overflow)

    return (
      <div ref={this.bindWrapper} className={tabsClass('header')}>
        <div ref={this.bindInner} className={tabsClass('inner')}>
          { tabs.map(this.renderTab) }
        </div>
        <div style={{ borderColor: border }} className={tabsClass('hr')} />
      </div>
    )
  }
}

Header.propTypes = {
  border: PropTypes.string,
  onChange: PropTypes.func,
  tabs: PropTypes.array,
}

export default Header
