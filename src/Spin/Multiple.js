import React from 'react'
import Spin from './Spin'
import { chasingDotsClass, doubleBounceClass, waveClass, cubeGridClass,
  chasingRingClass, scaleCircleClass, threeBounceClass, fourDotsClass } from './styles'

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

export function DoubleBounce(props) {
  return <Spin {...props} count={2} spinClass={doubleBounceClass} render={simpleRender} />
}

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

export function CubeGrid(props) {
  return <Spin {...props} count={9} spinClass={cubeGridClass} render={simpleRender} />
}

export function ChasingRing(opt) {
  const { value, unit } = formatSize(opt.size)
  // const border = `solid ${value / 10}${unit} ${opt.color}`
  const borderWidth = `${value / 10}${unit}`
  const style = { borderWidth, borderTopColor: opt.color, backgroundColor: 'transparent' }
  return (
    <Spin
      {...opt}
      count={4}
      itemStyle={style}
      spinClass={chasingRingClass}
      render={simpleRender}
    />
  )
}

// =============================================================================

function circleRender(className, i, { color, itemSize, itemClass }) {
  return (
    <div key={i} className={className('item', itemClass)}>
      {/*
      <div
        style={{
          backgroundColor: color,
          lineHeight: itemSize,
          height: itemSize,
          width: itemSize,
        }}
      />
      */}
      <svg width={itemSize} height={itemSize} viewBox="0 0 100 100">
        <circle fill={color} cx={50} cy={50} r={50} />
      </svg>
    </div>
  )
}

function twelveCircle(opt, type) {
  const { value, unit } = formatSize(opt.size)
  const itemSize = (value / 7).toFixed(3) + unit

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

export function ChasingDots(props) {
  return (
    <Spin
      {...props}
      count={2}
      spinClass={chasingDotsClass}
      render={circleRender}
    />
  )
}

export function FourDots(props) {
  return (
    <Spin
      {...props}
      count={4}
      spinClass={fourDotsClass}
      render={circleRender}
    />
  )
}
