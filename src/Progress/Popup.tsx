import React from 'react'
import { progressClass } from './styles'
import { isRTL } from '../config'
import { PopupProps } from './Props'

const ROTATE_MAX_ANGLE = 15
const PROGRESS_CENTER = 60
export default class Popup extends React.Component<PopupProps> {
  getStyle() {
    const { value } = this.props
    let rotate = 0
    if (value! <= PROGRESS_CENTER) rotate = ROTATE_MAX_ANGLE * (value! / PROGRESS_CENTER)
    else rotate = (1 - value! / 100) * ROTATE_MAX_ANGLE
    return {
      [isRTL() ? 'right' : 'left']: `${value}%`,
      transform: `translateX(${isRTL() ? '50%' : '-50%'}) rotate(${rotate}deg)`,
    }
  }

  render() {
    const { children } = this.props
    return (
      <div className={progressClass('popup')} style={this.getStyle()}>
        <span className={progressClass('value')}>{children}</span>
        <span className={progressClass('arrow')} />
      </div>
    )
  }
}
