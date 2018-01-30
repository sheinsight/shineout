import React from 'react'
import PropTypes from 'prop-types'

function DropdownMenu({ children }) {
  return (
    <div>
      {children}
    </div>
  )
}

DropdownMenu.propTypes = {
  children: PropTypes.any.isRequired,
}

export default DropdownMenu
