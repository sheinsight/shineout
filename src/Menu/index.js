import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import immer from 'immer'
import { defaultProps, getProps } from '../utils/proptypes'
import Item from './Item'
import SubItem from './SubItem'
import { menuClass } from '../styles'

class Menu extends React.Component {
  static getKey(data, keygen, index) {
    switch (typeof keygen) {
      case 'string':
        return data[keygen]
      case 'function':
        return keygen(data)
      default:
        return index
    }
  }
  constructor(props) {
    super(props)
    this.state = {
      activeKey: [],
      firstRender: true,
    }
    this.activeKey = []
    this.checkActive = this.checkActive.bind(this)
  }
  componentDidMount() {
    this.setState({ activeKey: this.activeKey, firstRender: false })
    this.activeKey = []
  }
  checkActive(data) {
    const [isActive] = [this.props.active(data)]
    if (isActive && (this.activeKey.length === 0 || this.props.multiple)) {
      this.activeKey.push(data)
      return true
    }
    return false
  }
  renderMenu(data, keygen) {
    if (!Array.isArray(data) || data.length === 0) return null
    return data.map((da, index) => {
      const menuKey = Menu.getKey(da, keygen, index)
      return da.children && da.children.length > 0 ?
        <SubItem key={menuKey} data={da}>
          {
            this.renderMenu(da.children, keygen)
          }
        </SubItem> :
        <Item
          data={da}
          key={menuKey}
          isActive={this.props.active(da)}
          handleClick={() => this.props.onClick(da)}
        />
    })
  }
  render() {
    const {
      keygen, data, mode, style,
    } = this.props
    const className = classnames(
      menuClass('_', 'root', mode),
      this.props.className,
    )
    console.log(this.state.activeKey)
    return (
      <ul className={className} style={style}>{
        this.renderMenu(data, keygen)
      }
      </ul>
    )
  }
}

Menu.propTypes = {
  ...getProps('style', 'keygen'),
  data: PropTypes.array,
  mode: PropTypes.string,
  active: PropTypes.func,
}

Menu.defaultProps = {
  ...defaultProps,
  data: [],
  keygen: 'id',
  mode: 'vertical',
  active: () => false,
}

export default Menu
