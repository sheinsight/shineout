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
            src="https://farm1.staticflickr.com/490/20349556755_e181f04e6b_s.jpg"
            href="https://c1.staticflickr.com/1/490/20349556755_a4e3a5e461_k.jpg"
          />
        ))
      }
    </div>
  )
}
