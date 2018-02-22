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

const ringClass = genaration(require('./ring.less'), 'spin-ring')

export function Ring(obj) {
  const { value, unit } = formatSize(obj.size)
  const style = {
    borderWidth: (value / 10) + unit,
    borderTopColor: obj.color,
  }
  return <Spin {...obj} style={style} spinClass={ringClass} />
}

const planeClass = genaration(require('./plane.less'), 'spin-plane')

export function Plane(obj) {
  const style = {
    backgroundColor: obj.color,
  }
  return <Spin {...obj} style={style} spinClass={planeClass} />
}

const pulseClass = genaration(require('./pulse.less'), 'spin-pulse')

export function Pulse(obj) {
  const style = {
    backgroundColor: obj.color,
  }
  return <Spin {...obj} style={style} spinClass={pulseClass} />
}
