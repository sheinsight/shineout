import React from 'react'
import PropTypes from 'prop-types'
import Panel from './panel'
import { getProps } from '../utils/proptypes'

export default function CreateModal(props) {
  const { content, ...otherProps } = props
  return <Panel {...otherProps}>{ content }</Panel>
}

CreateModal.propTypes = {
  ...getProps(),
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
}

