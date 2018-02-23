import React from 'react'
import PropTypes from 'prop-types'
import { Spin } from 'shineout'

function Loading({ style }) {
  return (
    <div
      style={Object.assign({
        display: 'flex',
        width: '100%',
        height: '100%',
      }, style)}
    >
      <Spin type="fading-circle" color="rgba(0,0,0,0.5)" />
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
