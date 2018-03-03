import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { defaultProps, getProps } from '../utils/proptypes'
import Item from './Item'
import SubItem from './SubItem'
import { menuClass } from '../styles'

class Menu extends React.Component {
  static getKey(data, keygen) {
    switch (typeof keygen) {
      case 'string':
        return data[keygen]
      case 'function':
        return keygen(data)
      default:
        return data.id
    }
  }
  constructor(props) {
    super(props)
    this.state = {
      selectKeys: this.props.selectKeys || this.props.defaultSelectKeys,
    }
  }
  renderMenu(data, keygen) {
    if (!Array.isArray(data) || data.length === 0) return null
    return data.map((da) => {
      const menuKey = Menu.getKey(da, keygen)
      return da.children && da.children.length > 0 ?
        <SubItem key={menuKey} data={da}>
          {
            this.renderMenu(da.children, keygen)
          }
        </SubItem> :
        <Item
          data={da}
          key={menuKey}
          menuKey={menuKey}
          selectKeys={this.state.selectKeys}
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
  selectKeys: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  defaultSelectKeys: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
}

Menu.defaultProps = {
  ...defaultProps,
  data: [],
  keygen: 'id',
  mode: 'vertical',
  selectKeys: null,
  defaultSelectKeys: [],
}

export default Menu
