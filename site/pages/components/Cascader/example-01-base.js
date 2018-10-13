/**
 * cn - 基本用法
 *    -- 基础的级联用法
 * en - Base
 *   -- Basic usage of Cascader
 */

import React from 'react'
import { Cascader } from 'shineout'
import { cascader as data } from 'doc/data/tree'

export default function () {
  return (
    <Cascader
      data={data}
      keygen="id"
      renderItem={n => `node ${n.text}`}
    />
  )
}
