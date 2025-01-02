import React, { useContext, useLayoutEffect, useRef, useState } from 'react'
import TableContext from './TableContext'
import { TABLE_CELL_STICKY_Z_INDEX } from './Table'
import { StickyProps } from '../Sticky/Props'

interface ThProps {
  top: number
  fixed?: 'left' | 'right'
  index: number
  sticky?: boolean | StickyProps
  style?: React.CSSProperties
  children: React.ReactNode
  rowSpan?: number
  colSpan?: number
  className?: string
}

function Th(props: ThProps) {
  const { colgroup, fixed: tableFixedProp } = useContext(TableContext)
  const [thStickyStyle, setThStickyStyle] = useState<React.CSSProperties>()
  const ref = useRef<HTMLTableCellElement>(null)
  const { top, fixed, index, sticky, ...rest } = props

  useLayoutEffect(
    () => {
      if (tableFixedProp !== 'x' || !colgroup) return

      let horizontalStickyStyle: React.CSSProperties = {}

      if (props.fixed === 'left') {
        const stickyLeft = colgroup.slice(0, props.index).reduce((sum, col) => sum + (col || 0), 0)
        horizontalStickyStyle = {
          position: 'sticky',
          zIndex: TABLE_CELL_STICKY_Z_INDEX + 1,
          left: stickyLeft,
        }
      } else if (props.fixed === 'right') {
        const stickyRight = colgroup.slice(props.index + (props.colSpan || 1)).reduce((sum, col) => sum + (col || 0), 0)
        horizontalStickyStyle = {
          position: 'sticky',
          zIndex: TABLE_CELL_STICKY_Z_INDEX + 1,
          right: stickyRight,
        }
      }

      const topStickyStyle: React.CSSProperties = {
        position: 'sticky',
        zIndex: TABLE_CELL_STICKY_Z_INDEX - 1,
        top: (sticky && typeof sticky !== 'boolean' ? sticky.top || 0 : 0) + top,
      }

      setThStickyStyle({
        ...topStickyStyle,
        ...horizontalStickyStyle,
      })
    },
    [tableFixedProp, colgroup, props.fixed, props.index, props.sticky]
  )

  return (
    <th {...rest} style={{ ...props.style, ...thStickyStyle }} ref={ref}>
      {props.children}
    </th>
  )
}

export default Th
