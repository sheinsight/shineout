/**
 * cn - 对齐方式
 * en - Alignment
 */
import React from 'react'
import { Pagination } from 'shineout'

const info = ({ total }) => `Total ${total}`

export default function () {
  return (
    <div>
      <Pagination align="center" total={100} layout={['links', info]} />
      <br />
      <Pagination align="right" total={100} layout={[info, 'links']} />
    </div>
  )
}
