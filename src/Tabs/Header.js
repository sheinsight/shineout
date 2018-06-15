import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Tab from './Tab'

class Header extends PureComponent {
  constructor(props) {
    super(props)

    this.renderTab = this.renderTab.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(id) {
    if (this.props.onChange) this.props.onChange(id)
  }

  renderTab({ tab, id }) {
    return <Tab key={id} id={id} onClick={this.handleClick}>{tab}</Tab>
  }

  render() {
    const { tabs } = this.props
    return (
      <div>
        { tabs.map(this.renderTab) }
      </div>
    )
  }
}

Header.propTypes = {
  onChange: PropTypes.func,
  tabs: PropTypes.array,
}

export default Header
