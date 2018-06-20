import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Tab from './Tab'
import { tabsClass } from '../styles'

class Header extends PureComponent {
  constructor(props) {
    super(props)

    this.renderTab = this.renderTab.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(id) {
    if (this.props.onChange) this.props.onChange(id)
  }

  renderTab({ tab, id, ...other }) {
    return <Tab {...other} key={id} id={id} onClick={this.handleClick}>{tab}</Tab>
  }

  render() {
    const { border, tabs } = this.props

    return (
      <div className={tabsClass('header')}>
        { tabs.map(this.renderTab) }
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
