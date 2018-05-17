/**
 * cn - 跳转
 * en - Target
 */
import React from 'react'
import { Image } from 'shineout'

export default function () {
  return (
    <Image.Group width={80} height={80}>
      <Image
        style={{ marginRight: 12 }}
        shape="thumbnail"
        src="https://farm1.staticflickr.com/490/20349556755_e181f04e6b_s.jpg"
        href="https://c1.staticflickr.com/1/490/20349556755_a4e3a5e461_k.jpg"
      />
      <Image
        style={{ marginRight: 12 }}
        shape="thumbnail"
        src="https://farm1.staticflickr.com/572/23351561726_2411a821eb_s.jpg"
        href="https://c1.staticflickr.com/1/572/23351561726_62e45b2ab3_h.jpg"
      />
      <Image
        style={{ marginRight: 12 }}
        shape="thumbnail"
        src="https://farm9.staticflickr.com/8881/18154757388_7655652915_s.jpg"
        href="https://c1.staticflickr.com/9/8881/18154757388_7655652915_b.jpg"
      />
      <Image
        style={{ marginRight: 12 }}
        shape="thumbnail"
        src="https://farm8.staticflickr.com/7354/9519038413_f53f47a260_s.jpg"
        href="https://c1.staticflickr.com/8/7354/9519038413_5c405eded8_h.jpg"
      />
    </Image.Group>
  )
}
