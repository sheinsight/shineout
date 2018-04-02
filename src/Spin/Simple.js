import React from 'react'
import Spin from './Spin'
import { ringClass, planeClass, pulseClass } from '../styles/spin'

function formatSize(size) {
  const ss = /^(\d+)([%|\w]*)$/.exec(size)
  return {
    value: parseFloat(ss[1]),
    unit: ss[2] || 'px',
  }
}

export function Ring(obj) {
  const { value, unit } = formatSize(obj.size)
  const style = {
    borderWidth: (value / 10) + unit,
    borderTopColor: obj.color,
  }
  return <Spin {...obj} style={style} spinClass={ringClass} />
}

export function Plane(obj) {
  const style = {
    backgroundColor: obj.color,
  }
  return <Spin {...obj} style={style} spinClass={planeClass} />
}

export function Pulse(obj) {
  const style = {
    backgroundColor: obj.color,
  }
  return <Spin {...obj} style={style} spinClass={pulseClass} />
}
