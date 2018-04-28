import React from 'react'
import PropTypes from 'prop-types'
import icons from '../icons'
import { datepickerClass } from '../styles'

function Icon({ name, onClick }) {
  return (
    <span className={datepickerClass('icon')} onClick={onClick}>{icons[name]}</span>
  )
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Icon
