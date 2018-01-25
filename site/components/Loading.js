import React from 'react'
import PropTypes from 'prop-types'

function Loading({ style }) {
  return (
    <div
      style={Object.assign({
        display: 'flex',
        width: '100%',
        height: '100%',
      }, style)}
    >
      <div style={{ display: 'inline-block', margin: 'auto' }}>
        先占位，等 Spin 组件
      </div>
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
