import React, { ReactElement } from 'react'
import classnames from 'classnames'
import config from '../config'
import configable from '../hoc/config'
import { spinClass } from './styles'
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
import { SpinName, SpinProps } from './Props'

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

function renderContainer(Loading: ReactElement, props: Pick<SpinProps, 'loading' | 'children'>) {
  const { loading, children } = props
  return (
    <div className={spinClass('container', loading && 'show')}>
      <div className={spinClass('content')}>{children}</div>
      {loading && <div className={spinClass('loading')}>{Loading}</div>}
    </div>
  )
}

function getName(name?: SpinName) {
  if (name !== undefined) return name
  if (config.spin !== undefined) return config.spin
  return 'default'
}

const Spin: React.FC<SpinProps> = (props: SpinProps) => {
  const { children, style, className, size = 40, color = '#6c757d', tip, ...rest } = props
  const name = getName(props.name)
  const Component = spins[name]
  if (!Component) {
    console.warn(`Spin type '${name}' not existed.`)
    return null
  }
  const wrapperStyle = Object.assign(
    {
      color,
    },
    style
  )
  let Content
  if (!('tip' in props)) {
    Content = <Component size={size} color={color} {...rest} wrapperStyle={wrapperStyle} wrapperClass={className} />
  } else {
    Content = (
      <div style={wrapperStyle} className={classnames(spinClass('_'), className)}>
        <Component size={size} color={color} {...rest} />
        {tip && (
          <div className={spinClass('tip')} style={{ color }}>
            {typeof tip === 'string' ? <span>{tip}</span> : tip}
          </div>
        )}
      </div>
    )
  }
  if (children) return renderContainer(Content, props)
  return Content
}

Spin.displayName = 'ShineoutSpin'

export default configable(Spin, 'spin')
