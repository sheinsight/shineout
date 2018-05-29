import React from 'react'
import PropTypes from 'prop-types'

function Line(props) {
  const { points } = props
  console.log(points)

  return (
    <div />
  )
}

Line.propTypes = {
  points: PropTypes.array.isRequired,
}

export default Line
