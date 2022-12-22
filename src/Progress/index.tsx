import React from 'react'
import Line from './Line'
import Circle from './Circle'

import { ProgressProps } from './Props'

function Progress(props: ProgressProps) {
  switch (props.shape) {
    case 'circle':
      return <Circle {...props} />
    default:
      return <Line {...props} />
  }
}

Progress.defaultProps = {
  shape: 'line',
}

Progress.displayName = 'ShineoutProgress'

export default Progress
