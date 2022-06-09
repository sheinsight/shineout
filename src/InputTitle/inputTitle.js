import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { PureComponent } from '../component'

import { inputTitleClass } from './styles'

class InputTitle extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      animation: false,
    }
    this.stopAnimation = this.stopAnimation.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.open !== this.props.open) {
      this.startAnimation()
    }
  }

  startAnimation() {
    this.setState({
      animation: true,
    })
  }

  stopAnimation() {
    this.setState({
      animation: false,
    })
  }

  render() {
    const { innerTitle, className, style, children, open, titleClass, contentClass, placeTitle } = this.props
    if (!innerTitle) return children
    const { animation } = this.state
    return (
      <div
        style={style}
        className={classnames(inputTitleClass('_', open && 'open', animation && 'animation'), className)}
      >
        <div onAnimationEnd={this.stopAnimation} className={classnames(inputTitleClass('title', 'top'), titleClass)}>
          {innerTitle}
        </div>
        <div className={classnames(contentClass, inputTitleClass('content'))}>{children}</div>
        <div onAnimationEnd={this.stopAnimation} className={inputTitleClass('place')}>
          <div className={classnames(inputTitleClass('title'), titleClass)}>{placeTitle || innerTitle}</div>
        </div>
      </div>
    )
  }
}

InputTitle.propTypes = {
  innerTitle: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
  open: PropTypes.bool,
  titleClass: PropTypes.string,
  placeTitle: PropTypes.node,
  contentClass: PropTypes.string,
}

export default InputTitle
