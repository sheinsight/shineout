import React, { ReactNode, useCallback, useContext, useRef } from 'react'
import classnames from 'classnames'
import { tableClass } from './styles'
import Checkbox from './Checkbox'
import { TdProps } from './Props'
import { getDirectionX } from '../utils/dom/translate'
import TableContext from './TableContext'
import { TABLE_CELL_STICKY_Z_INDEX } from './Table'

export const CLASS_FIXED_LEFT = 'fixed-left'
export const CLASS_FIXED_RIGHT = 'fixed-right'

const DefaultProps: any = {
  fixed: '',
  style: {},
  align: 'left',
}

function Td<DataItem, Value>(props: TdProps<DataItem, Value>) {
  const {
    originKey,
    expanded,
    data,
    expandKeys,
    expandClick,
    resetFixAuto,
    onExpand,
    onTreeExpand,
    index,
    columnIndex,
    datum,
    treeColumnsName,
    treeCheckAll,
    disabled,
    render,
    treeRoot,
    treeExpand,
    treeExpandLevel,
    treeIndent,
    treeEmptyExpand,
    treeExpandShow,
    type,
    rowSpan,
    colSpan,
    fixed,
    style = {},
    firstFixed,
    lastFixed,
    align,
    ignoreBorderRight,
    offsetLeft,
    offsetRight,
    className: propClassName,
  } = props

  const { colgroup, fixed: tableFixedProp } = useContext(TableContext)

  const cachedRenderRef = useRef<() => ReactNode>()

  const handleExpandClick = useCallback(
    () => {
      if (expandKeys) {
        if (expandClick) expandClick(data, !expanded)
      } else {
        onExpand(originKey, expanded ? undefined : cachedRenderRef.current)
      }
      resetFixAuto(true)
    },
    [expandKeys, expandClick, data, expanded, onExpand, originKey, resetFixAuto]
  )

  const handleTreeExpand = useCallback(
    () => {
      onTreeExpand(data, index)
    },
    [data, index, onTreeExpand]
  )

  const renderCheckbox = () => {
    const checkbox = (
      <Checkbox
        force={datum.check(data)}
        data={data}
        index={index}
        datum={datum}
        disabled={disabled}
        treeColumnsName={treeCheckAll ? treeColumnsName : undefined}
      />
    )
    if (render && typeof render === 'function') {
      return render(data, index, checkbox) as ReactNode
    }
    return checkbox
  }

  const renderExpand = (_index: number) => {
    if (typeof render !== 'function') return null

    let cachedRender = render(data, _index) as () => ReactNode

    if (!cachedRender) return null

    if (typeof cachedRender !== 'function') {
      cachedRender = () => cachedRender as ReactNode
    }

    cachedRenderRef.current = cachedRender

    return (
      <span
        className={tableClass('expand-indicator', `icon-expand-${expanded ? 'sub' : 'plus'}`)}
        onClick={handleExpandClick}
      />
    )
  }

  const renderTreeExpand = (content: ReactNode) => {
    const level = treeExpandLevel.get(originKey) || 0
    const className = tableClass('expand-wrapped')
    if (
      !treeColumnsName ||
      !data[treeColumnsName] ||
      (((data[treeColumnsName] as unknown) as DataItem[]).length === 0 && !treeEmptyExpand)
    ) {
      return (
        <span className={className} style={{ marginLeft: level * treeIndent, paddingLeft: treeRoot ? 0 : 25 }}>
          {content}
        </span>
      )
    }
    return (
      <span className={className} style={{ marginLeft: level * treeIndent }}>
        <span
          key="expand-icon"
          onClick={handleTreeExpand}
          className={tableClass('icon-tree-expand', `icon-tree-${treeExpand ? 'sub' : 'plus'}`)}
        />
        {content}
      </span>
    )
  }

  const renderResult = () => {
    const content =
      typeof render === 'function'
        ? (render(data, index) as ReactNode)
        : ((data[render as keyof DataItem] as unknown) as ReactNode)
    if (!treeColumnsName || !treeExpandShow) return content
    return renderTreeExpand(content)
  }

  const renderContent = () => {
    switch (type) {
      case 'checkbox':
        return renderCheckbox()
      case 'expand':
      case 'row-expand':
        return renderExpand(index)
      default:
        return renderResult()
    }
  }

  const className = classnames(
    propClassName,
    tableClass(
      fixed === 'left' && CLASS_FIXED_LEFT,
      fixed === 'right' && CLASS_FIXED_RIGHT,
      firstFixed && 'fixed-first',
      lastFixed && 'fixed-last',
      (type === 'checkbox' || type === 'expand' || type === 'row-expand') && 'checkbox',
      align !== 'left' && `align-${align}`,
      ignoreBorderRight && 'ignore-right-border'
    )
  )

  const stickyStyle: React.CSSProperties = {}
  if (tableFixedProp === 'x' && colgroup) {
    if (fixed === 'left') {
      stickyStyle.position = 'sticky'
      stickyStyle.zIndex = TABLE_CELL_STICKY_Z_INDEX
      const stickyLeft = colgroup.slice(0, columnIndex).reduce((sum, value) => sum + value, 0)
      stickyStyle.left = stickyLeft
    } else if (fixed === 'right') {
      stickyStyle.position = 'sticky'
      stickyStyle.zIndex = TABLE_CELL_STICKY_Z_INDEX
      const stickyRight = colgroup.slice(columnIndex + 1).reduce((sum, value) => sum + value, 0)
      stickyStyle.right = stickyRight
    }
  } else if (fixed === 'left' && offsetLeft) {
    stickyStyle.transform = `translateX(${getDirectionX(`${offsetLeft}px`)})`
  } else if (fixed === 'right' && offsetRight) {
    stickyStyle.transform = `translateX(${getDirectionX(`-${offsetRight}px`)})`
  }

  return (
    <td style={{ ...style, ...stickyStyle }} className={className} rowSpan={rowSpan} colSpan={colSpan}>
      {renderContent()}
    </td>
  )
}

Td.defaultProps = DefaultProps
export default Td
