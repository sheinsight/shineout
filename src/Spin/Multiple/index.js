import React from 'react'
import Spin from './Spin'
import genaration from '../../utils/classname'

function formatSize(size) {
  const ss = /^(\d+)([%|\w]*)$/.exec(size)
  return {
    value: parseFloat(ss[1]),
    unit: ss[2] || 'px',
  }
}

function simpleRender(classname, i, { color, itemStyle }) {
  const style = Object.assign({ backgroundColor: color }, itemStyle)
  return (
    <div
      key={i}
      style={style}
      className={classname('item')}
    />
  )
}

const chasingDotsClass = genaration(require('./chasing-dots.less'), 'chasing-dots')

export function ChasingDots(props) {
  return <Spin {...props} count={2} spinClass={chasingDotsClass} render={simpleRender} />
}

const doubleBounceClass = genaration(require('./double-bounce.less'), 'double-bounce')

export function DoubleBounce(props) {
  return <Spin {...props} count={2} spinClass={doubleBounceClass} render={simpleRender} />
}

const waveClass = genaration(require('./wave.less'), 'spin-wave')

export function Wave(prop) {
  const { value, unit } = formatSize(prop.size)
  let width = value / 7
  let margin = (value / 20)

  if (unit === 'px') {
    width = Math.floor(width)
    margin = Math.ceil(margin) + unit
  } else {
    margin = '2px'
  }

  return (
    <Spin
      {...prop}
      itemStyle={{ width: width + unit, marginRight: margin }}
      count={5}
      spinClass={waveClass}
      render={simpleRender}
    />
  )
}

const cubeGridClass = genaration(require('./cube-grid.less'), 'cube-grid')

export function CubeGrid(props) {
  return <Spin {...props} count={9} spinClass={cubeGridClass} render={simpleRender} />
}

// =============================================================================

const chasingRingClass = genaration(require('./chasing-ring.less'), 'chasing-ring')

function ccRender(className, i, { itemStyle }) {
  return <div key={i} className={className('item')} style={itemStyle} />
}

export function ChasingRing(opt) {
  const { value, unit } = formatSize(opt.size)
  const border = `solid ${value / 10}${unit} ${opt.color}`
  const style = { borderTop: border, borderLeft: border }
  return (
    <Spin
      {...opt}
      count={4}
      itemStyle={style}
      spinClass={chasingRingClass}
      render={ccRender}
    />
  )
}

// =============================================================================

function circleRender(className, i, { color, itemSize, itemClass }) {
  return (
    <div key={i} className={className('item', itemClass)}>
      <svg width={itemSize} height={itemSize} viewBox="0 0 100 100">
        <circle fill={color} cx={50} cy={50} r={50} />
      </svg>
    </div>
  )
}

const scaleCircleClass = genaration(require('./twelve-circle.less'), 'twelve-circle')

function twelveCircle(opt, type) {
  const { value, unit } = formatSize(opt.size)
  const itemSize = (value / 7) + unit

  return (
    <Spin
      {...opt}
      count={12}
      itemSize={itemSize}
      itemClass={type}
      spinClass={scaleCircleClass}
      render={circleRender}
    />
  )
}

export const ScaleCircle = opt => twelveCircle(opt, 'scale')
export const FadingCircle = opt => twelveCircle(opt, 'fade')

const threeBounceClass = genaration(require('./three-bounce.less'), 'three-bounce')

export function ThreeBounce(prop) {
  const { value, unit } = formatSize(prop.size)
  return (
    <Spin
      {...prop}
      count={3}
      style={{ width: (value * 2) + unit, height: 'auto' }}
      itemSize={(value / 2) + unit}
      spinClass={threeBounceClass}
      render={circleRender}
    />
  )
}
