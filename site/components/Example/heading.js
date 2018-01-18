import React from 'react'
import { getUidStr } from 'shineout/utils/uid'

export default function (appendHeading) {
  const id = getUidStr()
  const heading = <h2 id={id}>Example</h2>
  appendHeading({
    id,
    level: 2,
    children: ['Example'],
  })

  return heading
}
