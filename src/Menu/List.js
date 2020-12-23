import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getKey } from '../utils/uid'
import { menuClass } from '../styles'
import Item from './Item'

class List extends PureComponent {
  render() {
    const {
      data,
      level,
      keygen,
      mode,
      renderItem,
      style,
      bottomLine,
      topLine,
      onClick,
      path,
      inlineIndent,
      disabled,
      toggleOpenKeys,
      linkKey,
      toggleDuration,
      frontCaret,
    } = this.props

    const isVertical = mode.indexOf('vertical') === 0
    const className = classnames(menuClass('list', isVertical ? 'vertical' : mode), this.props.className)

    return (
      <ul className={className} style={style}>
        {data.map((d, i) => (
          <Item
            bottomLine={bottomLine}
            topLine={topLine}
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
            linkKey={linkKey}
            toggleDuration={toggleDuration}
            frontCaret={frontCaret}
          />
        ))}
      </ul>
    )
  }
}

List.propTypes = {
  bottomLine: PropTypes.number,
  topLine: PropTypes.number,
  className: PropTypes.string,
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
  linkKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  toggleDuration: PropTypes.number,
  frontCaret: PropTypes.bool,
}

export default List
