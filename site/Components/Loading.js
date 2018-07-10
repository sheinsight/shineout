import React from 'react'
import PropTypes from 'prop-types'
import { Spin } from 'shineout'

function Loading({ style }) {
  return (
    <div
      style={Object.assign({
        display: 'flex',
        width: '100%',
        height: 300,
      }, style)}
    >
      <Spin type="fading-circle" size={50} color="rgba(0,0,0,0.5)" />
    </div>
  )
}

Loading.propTypes = {
  style: PropTypes.object,
}

Loading.defaultProps = {
  style: {},
}

export default Loading
