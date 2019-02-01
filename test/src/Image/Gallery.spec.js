import { mount } from 'enzyme'
import React from 'react'
import Gallery from '../../../src/Image/Gallery'
import Magnify from '../../../src/Image/Magnify'
import { simulateWheel } from '../../utils'
import showGallery from '../../../src/Image/events'

describe('Image[Gallery]', () => {
  test('should rende correct gallery dom structure ', () => {
    const images = ['./images/1_b.jpg', './images/2_b.jpg', './images/3_b.jpg', './images/4_b.jpg']
    const wrapper = mount(<Gallery current={0} images={images.map(src => ({ src }))} onClose={() => {}} />)
    const prefix = SO_PREFIX
    const structure = ['-image-overlay', '-image-center', '-image-right'].map(v => `${prefix}${v}`)
    const validate = () => {
      wrapper
        .find('Gallery')
        .children()
        .forEach((child, index) => {
          expect(child.hasClass(structure[index])).toBeTruthy()
          if (index === 0) return
          expect(child.childAt(0).type()).toBe('a')
          expect(child.childAt(1).type()).toBe(Magnify)
        })
    }
    validate()
    // simulate right-click
    wrapper.find(`.${prefix}-image-right`).simulate('click')
    structure.splice(2, 0, `${prefix}-image-left`)
    validate()
  })
  test('should change structure while mouse-wheel', () => {
    const images = ['./images/1_b.jpg', './images/2_b.jpg', './images/3_b.jpg', './images/4_b.jpg']
    const wrapper = mount(<Gallery current={0} images={images.map(src => ({ src }))} onClose={() => {}} />)
    const originLength = wrapper.find('Gallery').children().length
    simulateWheel(-1)
    // pass the css animation
    wrapper.setState({
      direction: 'init',
    })
    expect(originLength).toBe(wrapper.find('Gallery').children().length - 1)
  })
  test('should dismiss while close', () => {
    const modal = () => {
      const images = ['./images/1_b.jpg', './images/2_b.jpg', './images/3_b.jpg', './images/4_b.jpg']
      showGallery(images.map(src => ({ src })), 0)
    }
    const gWClass = `.${SO_PREFIX}-image-gallery`
    modal()
    expect(document.querySelector(gWClass)).toBeTruthy()
    // 1、click the cover to dismiss
    document.querySelector(`${gWClass} .${SO_PREFIX}-image-overlay`).click()
    expect(document.querySelector(gWClass)).toBeNull()
    modal()
    // 2、click the image-close-btn to dismiss
    expect(document.querySelector(gWClass)).toBeTruthy()
    document.querySelector(`${gWClass} .${SO_PREFIX}-image-close`).click()
    expect(document.querySelector(gWClass)).toBeNull()
  })
})
