import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { inputTitleClass } from './styles'

const InputTitle = props => {
  const { innerTitle, className, style, children, open, titleClass, contentClass } = props
  if (!innerTitle) return children
  return (
    <div style={style} className={classnames(inputTitleClass('_', open && 'open'), className)}>
      <div className={classnames(inputTitleClass('title', 'top'), titleClass)}>{innerTitle}</div>
      <div className={classnames(contentClass, inputTitleClass('content'))}>{children}</div>
      <div className={inputTitleClass('place')}>
        <div className={classnames(inputTitleClass('title'), titleClass)}>{innerTitle}</div>
      </div>
    </div>
  )
}

InputTitle.propTypes = {
  innerTitle: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
  open: PropTypes.bool,
  titleClass: PropTypes.string,
  contentClass: PropTypes.string,
}

export default InputTitle
