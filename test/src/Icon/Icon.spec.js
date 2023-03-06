import { mount } from 'enzyme'
import React from 'react'
import { baseTest } from '../../utils'
import IconAwesome from '../../../site/pages/components/Icon/example-1-awesome'
import IconIconfont from '../../../site/pages/components/Icon/example-2-iconfont'
import IconSize from '../../../site/pages/components/Icon/example-3-size'

/* global SO_PREFIX */

describe('Icon[Awesome]', () => {
  let icons
  beforeAll(() => {
    icons = mount(<IconAwesome />).find('ShineoutIcon')
  })
  test('font-family should be FontAwesome', () => {
    icons.forEach(icon => {
      expect(icon.find('i').prop('style').fontFamily).toBe('FontAwesome')
    })
  })
  test('class prefix should be fa', () => {
    icons.forEach(icon => {
      expect(icon.find('i').hasClass(`fa-${icon.prop('name')}`)).toBeTruthy()
    })
  })
  test('classname should use the prop type', () => {
    icons.forEach(icon => {
      const className = `${SO_PREFIX}-icon-${icon.prop('type') ? icon.prop('type') : 'default'}`
      expect(icon.find('i').hasClass(className)).toBeTruthy()
    })
  })
})

describe('Icon[Iconfont]', () => {
  test('font-family should be iconfont', () => {
    mount(<IconIconfont />)
      .find('ShineoutIcon')
      .forEach(icon => {
        expect(icon.find('i').prop('style').fontFamily).toBe('iconfont')
      })
  })
})

describe('Icon[Size]', () => {
  test('should set fontsize', () => {
    mount(<IconSize />)
      .find('ShineoutIcon')
      .forEach(icon => {
        const propSize = Number.parseInt(icon.prop('fontSize'), 10)
        if (propSize) {
          const iconSize = parseInt(icon.find('i').prop('style').fontSize, 10)
          expect(propSize).toBe(iconSize)
        }
      })
  })
})

describe('Icon[Name]', () => {
  test('should set name', () => {
    const wrapper = mount(<IconSize />)
    wrapper.find(`.${SO_PREFIX}-icon`).forEach(icon => {
      expect(icon.hasClass('fa-home')).toBeTruthy()
    })
  })
})
