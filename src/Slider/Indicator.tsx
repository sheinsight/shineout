import React, { PureComponent } from 'react'
import draggable from '../hoc/draggable'
import { sliderClass } from './styles'
import { IndicatorProps } from './Props'

class Indicator extends PureComponent<IndicatorProps> {
  render() {
    const event = this.props.disabled ? undefined : this.props.onDragStart
    return <div onMouseDown={event} className={sliderClass('indicator')} />
  }
}

export default draggable(Indicator)
