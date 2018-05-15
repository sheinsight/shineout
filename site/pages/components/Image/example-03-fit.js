/**
 * cn - 适配
 * en - fit
 */
import React from 'react'
import { Image } from 'shineout'

const src = 'http://lobos.github.io/react-ui/0.7/images/image1.jpg'

export default function () {
  return (
    <div>
      {
        (['fill', 'center', 'fit', 'stretch']).map(fit => (
          <div key={fit} style={{ width: '25%', padding: 4, display: 'inline-block' }}>
            <Image width="100%" height="70%" src={src} shape="thumbnail" fit={fit} />
            <div style={{ textAlign: 'center', paddingTop: 4 }}>{fit}</div>
          </div>
        ))
      }
    </div>
  )
}
