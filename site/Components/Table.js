import React from 'react'
import PropTypes from 'prop-types'

function Table({ children }) {
  return (
    <div style={{ overflow: 'auto' }}>
      <table className="doc-api-table">{children}</table>
    </div>
  )
}

Table.propTypes = {
  children: PropTypes.any,
}

Table.defaultProps = {}

export default Table
