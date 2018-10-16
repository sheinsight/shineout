import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getKey } from '../utils/uid'
import { menuClass } from '../styles'
import Item from './Item'

class List extends PureComponent {
  render() {
    const {
      data, level, keygen, mode, renderItem, style, active, bottomLine,
      onClick, path, inlineIndent, defaultOpenKeys, disabled, toggleOpenKeys,
    } = this.props

    const className = classnames(
      menuClass('list', mode),
      this.props.className,
    )

    return (
      <ul className={className} style={style}>
        {
          data.map((d, i) => (
            <Item
              active={active}
              bottomLine={bottomLine}
              defaultOpenKeys={defaultOpenKeys}
              disabled={disabled}
              key={getKey(d, keygen, i)}
              index={i}
              keygen={keygen}
              data={d}
              renderItem={renderItem}
              inlineIndent={inlineIndent}
              level={level}
              mode={mode}
              onClick={onClick}
              path={path}
              toggleOpenKeys={toggleOpenKeys}
            />
          ))
        }
      </ul>
    )
  }
}

List.propTypes = {
  active: PropTypes.func,
  bottomLine: PropTypes.number,
  className: PropTypes.string,
  defaultOpenKeys: PropTypes.array,
  disabled: PropTypes.func,
  inlineIndent: PropTypes.number,
  keygen: PropTypes.any,
  level: PropTypes.number,
  data: PropTypes.array,
  mode: PropTypes.string,
  onClick: PropTypes.func,
  path: PropTypes.string,
  renderItem: PropTypes.func,
  style: PropTypes.object,
  toggleOpenKeys: PropTypes.func,
}

export default List
