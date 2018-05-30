import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps } from '../utils/proptypes'
import { treeClass } from '../styles'
import List from './List'

function Root(props) {
  const className = classnames(
    treeClass('_'),
    props.className,
  )

  return (
    <List
      {...props}
      className={className}
      expanded
      isRoot
      deepIndex={0}
    />
  )
}

Root.propTypes = {
  ...getProps(),
  keygen: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]).isRequired,
  data: PropTypes.array,
}

Root.defaultProps = {
  data: [],
}

export default Root
