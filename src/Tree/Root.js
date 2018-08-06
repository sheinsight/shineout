import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps } from '../utils/proptypes'
import { treeClass } from '../styles'
import List from './List'

function Root(props) {
  const className = classnames(
    treeClass('_', props.line ? 'with-line' : 'no-line'),
    props.className,
  )

  return (
    <List
      {...props}
      className={className}
      expanded
      path=""
      isRoot
      deepIndex={0}
    />
  )
}

Root.propTypes = {
  ...getProps(PropTypes),
  keygen: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]).isRequired,
  data: PropTypes.array,
  line: PropTypes.bool,
}

Root.defaultProps = {
  data: [],
  line: true,
}

export default Root
