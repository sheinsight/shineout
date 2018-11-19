import React from 'react'
import PropTypes from 'prop-types'

import {
  ChasingDots, DoubleBounce, ThreeBounce, ScaleCircle, FadingCircle,
  CubeGrid, ChasingRing, Wave, FourDots, Default,
} from './Multiple'
import { Ring, Plane, Pulse } from './Simple'

const spins = {
  plane: Plane,
  pulse: Pulse,
  ring: Ring,
  wave: Wave,
  default: Default,
  'chasing-ring': ChasingRing,
  'chasing-dots': ChasingDots,
  'cube-grid': CubeGrid,
  'double-bounce': DoubleBounce,
  'fading-circle': FadingCircle,
  'four-dots': FourDots,
  'scale-circle': ScaleCircle,
  'three-bounce': ThreeBounce,
}

export default function Spin(props) {
  const { name } = props
  const Component = spins[name]
  if (!Component) {
    console.warn(`Spin type '${name}' not existed.`)
    return null
  }
  return <Component {...props} />
}

Spin.displayName = 'ShineoutSpin'

Spin.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  name: PropTypes.oneOf([
    'default',
    'chasing-ring',
    'chasing-dots',
    'cube-grid',
    'double-bounce',
    'fading-circle',
    'four-dots',
    'plane',
    'pulse',
    'ring',
    'scale-circle',
    'three-bounce',
    'wave',
  ]),
}

Spin.defaultProps = {
  color: '#6c757d',
  size: 40,
  name: 'default',
}
