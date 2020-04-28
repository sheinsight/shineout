import React from 'react'
import PropTypes from 'prop-types'

function Colgroup({ columns, colgroup, columnResizable }) {
  if (colgroup && colgroup.length === columns.length) {
    return (
      <colgroup>
        {colgroup.map((c, i) => {
          const last = colgroup.length - 1 === i
          if (last && columnResizable) return null
          return <col key={columns[i].key} style={{ width: c }} />
        })}
      </colgroup>
    )
  }
  return (
    <colgroup>
      {columns.map((c, i) => {
        const last = columns.length - 1 === i
        if (last && columnResizable) return null
        return <col key={c.key} style={{ width: c.width }} />
      })}
    </colgroup>
  )
}

Colgroup.propTypes = {
  columns: PropTypes.array.isRequired,
  colgroup: PropTypes.array,
  columnResizable: PropTypes.bool,
}

Colgroup.defaultProps = {
  colgroup: undefined,
}

export default Colgroup
