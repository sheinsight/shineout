const fs = require('fs')
const path = require('path')

const rootPath = path.resolve(__dirname, '../site/pages/components/Spin')
const spins = [
  // 'chasing-ring',
  'default',
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
]

spins.forEach((spin, i) => {
  const text = `/**
* cn - ${spin}
     -- name="${spin}"
* en - ${spin}
     -- name="${spin}"
*/
import React from 'react'
import { Spin } from 'shineout'

export default function () {
  const style = { display: 'flex' }
  return (
    <div style={style}>
      <Spin size={18} name="${spin}" color="green" />
      <Spin name="${spin}" />
      <Spin size="54px" name="${spin}" color="#dc3545" />
    </div>
  )
}
`

  const fn = path.resolve(rootPath, `example-${(`0${i + 1}`).slice(-2)}-${spin}.js`)
  fs.writeFileSync(fn, text)
})
