/**
 * cn - 跳转
 * en - Target
 */
import React from 'react'
import { Image } from 'shineout'

export default function () {
  return (
    <div>
      {
        (['_modal', '_blank', '_self']).map(target => (
          <Image
            width={80}
            height={80}
            key={target}
            target={target}
            style={{ marginRight: 12 }}
            shape="thumbnail"
            src="/images/1_s.jpg"
            href="/images/1_b.jpg"
          />
        ))
      }
    </div>
  )
}
