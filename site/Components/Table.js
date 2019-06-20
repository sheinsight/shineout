import React from 'react'
import PropTypes from 'prop-types'

function Table({ children }) {
  const sortChildren = [...children[1].props.children]
  try {
    sortChildren.sort((a, b) =>
      a.props.children[0].props.children[0].localeCompare(b.props.children[0].props.children[0])
    )
  } catch (e) {
    console.log('sort fail...')
  }
  return (
    <div style={{ overflow: 'auto' }}>
      <table className="doc-api-table">
        {children[0]}
        {React.cloneElement(children[1], {
          children: sortChildren,
        })}
      </table>
    </div>
  )
}

Table.propTypes = {
  children: PropTypes.any,
}

Table.defaultProps = {}

export default Table
