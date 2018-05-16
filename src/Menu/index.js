import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { defaultProps, getProps } from '../utils/proptypes'
import Item from './Item'
import SubItem from './SubItem'
import { menuClass } from '../styles'
import { getKey } from '../utils/uid'

class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.activeKey = []
    this.inlineIndent = 0
    this.checkActive = this.checkActive.bind(this)
  }

  componentDidMount() {
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
      const menuKey = getKey(da, keygen, index)
      return da.children && da.children.length > 0 ?
        <SubItem
          key={menuKey}
          data={da}
          inlineIndent={this.props.inlineIndent * times}
          renderItem={this.props.renderItem}
          nums={da.children.length}
          isOpen={!!this.props.defaultOpenKeys.find(key => key === menuKey)}
          isHover={times > 1 && this.props.mode === 'horizontal'}
          mode={times > 1 && this.props.mode === 'horizontal' ? 'vertical' : this.props.mode}
          onClick={this.props.onClick}
        >
          {
            this.renderMenu(da.children, keygen, times)
          }
        </SubItem> :
        <Item
          data={da}
          key={menuKey}
          mode={this.props.mode}
          renderItem={this.props.renderItem}
          isActive={this.props.active(da)}
          handleClick={da.onClick ? da.onClick : this.props.onClick}
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
  renderItem: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  defaultOpenKeys: PropTypes.array,
}

Menu.defaultProps = {
  ...defaultProps,
  data: [],
  keygen: 'id',
  mode: 'inline',
  active: () => false,
  inlineIndent: 24,
  renderItem: 'title',
  defaultOpenKeys: [],
  onClick: () => true,
}

export default Menu
