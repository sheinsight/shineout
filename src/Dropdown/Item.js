import React from 'react'
import PropTypes from 'prop-types'

function DropdownItem({ className, children }) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

DropdownItem.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string.isRequired,
}

export default DropdownItem
