import React from 'react'
import classname from 'classnames'
import { range } from '../utils/numbers'

import {OriginSpinProps} from './Props'

export default function Spin(props: OriginSpinProps) {
  const {
    spinClass, count = 0, render, size, wrapperClass, wrapperStyle
  } = props

  const style = Object.assign(
    {
      width: size,
      height: size,
    },
    props.style,
    wrapperStyle
  )

  const className = classname(spinClass('_'), wrapperClass)

  if (count < 1 || !render) {
    return <div style={style} className={className} />
  }

  return (
    <div style={style} className={className}>
      {range(count + 1, 1).map(i => render(spinClass, i, props))}
    </div>
  )
}
