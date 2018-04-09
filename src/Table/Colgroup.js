import React from 'react'
import PropTypes from 'prop-types'

function Colgroup({ columns, colgroup }) {
  if (colgroup && colgroup.length === columns.length) {
    return (
      <colgroup>
        { colgroup.map((c, i) => <col key={columns[i].key} style={{ width: c }} />) }
      </colgroup>
    )
  }
  return (
    <colgroup>
      { columns.map(c => <col key={c.key} style={{ width: c.width }} />) }
    </colgroup>
  )
}

Colgroup.propTypes = {
  columns: PropTypes.array.isRequired,
  colgroup: PropTypes.array,
}

Colgroup.defaultProps = {
  colgroup: undefined,
}

export default Colgroup
