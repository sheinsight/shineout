import React from 'react'
import PropTypes from 'prop-types'
import classname from 'classnames'
import { menuClass } from '../styles'
import { getProps, defaultProps } from '../utils/proptypes'
import List from '../List'

const aStyle = { display: 'block', width: '100%' }

class SubMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    this.setState({
      show: !this.state.show,
    })
  }
  render() {
    const { data, itemRender, inlineIndent } = this.props
    const itemData = typeof itemRender === 'string' ? data[itemRender] : itemRender(data)
    const className = classname(menuClass('submenu'))
    const titleClassName = classname(menuClass('submenu-title'))
    const ulClassName = classname(menuClass('submenu-ul'))
    return (
      <li className={className}>
        <div
          className={titleClassName}
          style={{ paddingLeft: inlineIndent }}
        ><a style={aStyle} onClick={this.handleClick}>{itemData}</a>
        </div>
        <List.Collapse show={this.state.show} className={ulClassName} style={{ overflow: 'hidden' }}>
          <ul>
            {
              this.props.children
            }
          </ul>
        </List.Collapse>
      </li>
    )
  }
}

SubMenu.propTypes = {
  ...getProps(),
  data: PropTypes.object,
}

SubMenu.defaultProps = {
  ...defaultProps,
  data: {},
}

export default SubMenu