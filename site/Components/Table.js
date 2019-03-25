import React from 'react'
import PropTypes from 'prop-types'

function Table({ children }) {
  return <table className="doc-api-table">{children}</table>
}

Table.propTypes = {
  children: PropTypes.any,
}

Table.defaultProps = {}

export default Table
