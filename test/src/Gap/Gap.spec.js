import React from 'react'
import { mount } from 'enzyme'
import { Gap } from 'shineout'
import exampleTest from '../../example'
import { baseTest } from '../../utils'

/**
 * className
 * style
 * column
 * itemStyle
 * row
 */

describe('Gap[snapshot]', () => {
  exampleTest(`Gap`)
})

describe('Gap[base]', () => {
  it('should have render classname and style', () => {
    baseTest(Gap, '.so-gap')
  })
})
describe('Gap[column row itemClass]', () => {
  const wrapper = mount(
    <Gap>
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i}>
          Tag
          {i}
        </div>
      ))}
    </Gap>
  )
  it('should have render itemStyle', () => {
    expect(
      (wrapper
        .find('.so-gap-item')
        .first()
        .getDOMNode().style.color = 'red')
    )
  })

  it('should have custom gap', () => {
    expect((wrapper.find('.so-gap').getDOMNode().style.gap = '30px 50px'))
  })
})
