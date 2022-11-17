import React, { ComponentType, PureComponent } from 'react'
import { BarProps, FixedLengthProps } from './Props'

export default function(Bar: ComponentType<BarProps>) {
  class FixedLength extends PureComponent<FixedLengthProps> {
    render() {
      const { length, scrollLength } = this.props
      let barLength = (length / scrollLength) * length
      if (barLength < 20) barLength = 20

      return <Bar {...this.props} length={length} barLength={barLength} />
    }
  }

  return FixedLength as ComponentType<FixedLengthProps>
}
