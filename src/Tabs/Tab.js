import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { tabsClass } from '../styles'

class Tab extends PureComponent {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.onClick(this.props.id)
  }

  render() {
    const { background, border, isActive } = this.props
    const style = {
      background: isActive ? background : undefined,
      borderColor: `${border} ${border} ${isActive ? background : border} ${border}`,
    }

    return (
      <div className={tabsClass('tab')} style={style} onClick={this.handleClick}>
        {this.props.children}
      </div>
    )
  }
}

Tab.propTypes = {
  background: PropTypes.string,
  border: PropTypes.string,
  children: PropTypes.any,
  id: PropTypes.any.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

Tab.defaultProps = {
  background: '#fff',
  border: '#ddd',
}

export default Tab
