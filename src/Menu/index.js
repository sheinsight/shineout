import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
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
    }
    this.activeKey = []
    this.inlineIndent = 0
    this.checkActive = this.checkActive.bind(this)
  }
  componentDidMount() {
    this.setState({ activeKey: this.activeKey })
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
  renderMenu(data, keygen, i) {
    if (!Array.isArray(data) || data.length === 0) return null
    const times = i + 1
    return data.map((da, index) => {
      const menuKey = Menu.getKey(da, keygen, index)
      return da.children && da.children.length > 0 ?
        <SubItem
          key={menuKey}
          data={da}
          inlineIndent={this.props.inlineIndent * times}
          itemRender={this.props.itemRender}
        >
          {
            this.renderMenu(da.children, keygen, times)
          }
        </SubItem> :
        <Item
          data={da}
          key={menuKey}
          itemRender={this.props.itemRender}
          isActive={this.props.active(da)}
          handleClick={() => this.props.onClick(da)}
          inlineIndent={this.props.inlineIndent * times}
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
    return (
      <ul className={className} style={style}>{
        this.renderMenu(data, keygen, 0)
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
  inlineIndent: PropTypes.number,
  itemRender: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
}

Menu.defaultProps = {
  ...defaultProps,
  data: [],
  keygen: 'id',
  mode: 'vertical',
  active: () => false,
  inlineIndent: 24,
  itemRender: 'title',
}

export default Menu
