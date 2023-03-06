import React from 'react'
import Spin from './Spin'
import { ringClass, planeClass, pulseClass } from './styles'
import { TypeSpinProps } from './Props'
import { formatSize } from './util'

export function Ring(obj: TypeSpinProps) {
  const { value, unit } = formatSize(obj.size)
  const style = {
    borderWidth: value / 10 + unit,
    borderTopColor: obj.color,
  }
  return <Spin {...obj} count={0} style={style} spinClass={ringClass} />
}

export function Plane(obj: TypeSpinProps) {
  const style = {
    backgroundColor: obj.color,
  }
  return <Spin {...obj} count={0} style={style} spinClass={planeClass} />
}

export function Pulse(obj: TypeSpinProps) {
  const style = {
    backgroundColor: obj.color,
  }
  return <Spin {...obj} count={0} style={style} spinClass={pulseClass} />
}
