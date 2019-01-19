/**
 * cn - 基本
 *    -- 附着在顶部 20px
 * en - Basic
 *    -- Sticky 20px to top
 */
import React from 'react'
import { Alert, Sticky } from 'shineout'

export default function() {
  return (
    <Sticky top={20}>
      <Alert onClose>
        <h3>Some content.</h3>
        Sticky 20px to top.
      </Alert>
    </Sticky>
  )
}
