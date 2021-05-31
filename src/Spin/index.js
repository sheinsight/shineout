import React from 'react'
import PropTypes from 'prop-types'
import config from '../config'
import configable from '../hoc/config'
import { spinClass } from '../styles'
import {
  ChasingDots,
  DoubleBounce,
  ThreeBounce,
  ScaleCircle,
  FadingCircle,
  CubeGrid,
  ChasingRing,
  Wave,
  FourDots,
  Default,
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

function renderContainer(Loading, props) {
  // eslint-disable-next-line react/prop-types
  const { loading, children } = props
  return (
    <div className={spinClass('container', loading && 'show')}>
      <div className={spinClass('content')}>{children}</div>
      {loading && (
        <div className={spinClass('loading')}>
          <Loading {...props} />
        </div>
      )}
    </div>
  )
}

function getName(name) {
  if (name !== undefined) return name
  if (config.spin !== undefined) return config.spin
  return 'default'
}

function Spin(props) {
  const { children } = props
  const name = getName(props.name)
  const Component = spins[name]
  if (!Component) {
    console.warn(`Spin type '${name}' not existed.`)
    return null
  }
  if (children) return renderContainer(Component, props)
  return <Component {...props} />
}

Spin.displayName = 'ShineoutSpin'

Spin.propTypes = {
  color: PropTypes.string,
  children: PropTypes.node,
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
}

export default configable(Spin, 'spin')
