import React from 'react'
import classnames from 'classnames'
import { PureComponent } from '../component'
import { InputTitleProps } from './Props'

import { inputTitleClass } from './styles'

interface InputTitleState {
  animation: boolean
}
class InputTitle extends PureComponent<InputTitleProps, InputTitleState> {
  constructor(props: InputTitleProps) {
    super(props)
    this.state = {
      animation: false,
    }
    this.stopAnimation = this.stopAnimation.bind(this)
  }

  componentDidUpdate(prevProps: InputTitleProps) {
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
          <div className={classnames(inputTitleClass('title'))}>{placeTitle || innerTitle}</div>
        </div>
      </div>
    )
  }
}

export default InputTitle
