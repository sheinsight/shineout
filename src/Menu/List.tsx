import React, { PureComponent } from 'react'
import classnames from 'classnames'
import { getKey } from '../utils/uid'
import { menuClass } from './styles'
import Item from './Item'
import { ListProps } from './Props'

class List<U> extends PureComponent<ListProps<U>> {
  render() {
    const {
      data,
      path,
      mode,
      style,
      level,
      keygen,
      topLine,
      onClick,
      linkKey,
      disabled,
      renderItem,
      frontCaret,
      bottomLine,
      caretColor,
      inlineIndent,
      looseChildren,
      frontCaretType,
      toggleOpenKeys,
      toggleDuration,
      parentSelectable,
    } = this.props

    const isVertical = mode.indexOf('vertical') === 0
    const className = classnames(menuClass('list', isVertical ? 'vertical' : mode), this.props.className)

    return (
      <ul className={className} style={style}>
        {data!.map((d, i) => (
          <Item
            data={d}
            index={i}
            mode={mode}
            path={path}
            level={level}
            keygen={keygen as (data: U, index?: number) => string}
            onClick={onClick}
            linkKey={linkKey}
            topLine={topLine}
            disabled={disabled}
            frontCaret={frontCaret}
            caretColor={caretColor}
            bottomLine={bottomLine}
            renderItem={renderItem}
            key={getKey(d, keygen, i)}
            inlineIndent={inlineIndent}
            looseChildren={looseChildren}
            toggleOpenKeys={toggleOpenKeys}
            toggleDuration={toggleDuration}
            frontCaretType={frontCaretType}
            parentSelectable={parentSelectable}
          />
        ))}
      </ul>
    )
  }
}

export default List
