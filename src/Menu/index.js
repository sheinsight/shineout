import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { defaultProps, getProps } from '../utils/proptypes'
import Item from './Item'
import SubItem from './SubItem'
import { menuClass } from '../styles'

class Menu extends React.PureComponent {
  static renderMenu(data, key = 'id') {
    if (!Array.isArray(data) || data.length === 0) return null
    return data.map(da => (
      da.children && da.children.length > 0 ?
        <SubItem key={key ? da[key] : da.id} data={da}>
          {
            Menu.renderMenu(da.children, key)
          }
        </SubItem> :
        <Item data={da} key={key ? da[key] : da.id} />
    ))
  }
  render() {
    const { key, data } = this.props
    const className = classnames(
      menuClass('_'),
      this.props.className,
    )
    return (
      <ul className={className}>{
        Menu.renderMenu(data, key)
      }
      </ul>
    )
  }
}

Menu.propTypes = {
  ...getProps(),
  data: PropTypes.array,
  key: PropTypes.string,
}

Menu.defaultProps = {
  ...defaultProps,
  data: [],
  key: 'id',
}

export default Menu
