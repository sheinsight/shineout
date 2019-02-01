import React from 'react'
import { shallow } from 'enzyme'
import showGallery from '../../../src/Image/events'

describe('Image[Gallery]', () => {
  test('should render correct gallery dom structure', () => {
    const images = ['./images/1_b.jpg', './images/2_b.jpg', './images/3_b.jpg', './images/4_b.jpg']
    showGallery(images.map(src => ({ src })), 1)
    const gallery = document.querySelector(`.${SO_PREFIX}-image-gallery`)
    // 1 layer + 3 image
    expect(gallery.children.length).toBe(4)
    Array.prototype.slice.apply(gallery.children).forEach(container => {
      if (container.getAttribute('class').indexOf('overlay') > 0) return
      expect(container.querySelector(`a.${SO_PREFIX}-image-close`)).toBeTruthy()
      expect(container.querySelector('div img[src]')).toBeTruthy()
    })
  })

  test('should switch while click the image', () => {
    const images = ['/images/1_b.jpg', '/images/2_b.jpg', '/images/3_b.jpg', '/images/4_b.jpg']
    showGallery(images.map(src => ({ src })), 0)
    const gallery = document.querySelector(`.${SO_PREFIX}-image-gallery`)
    // 1 layer + 2 image
    expect(gallery.children.length).toBe(3)
    expect(gallery.getElementsByTagName('img')[0].src.indexOf(images[0]) > 0).toBeTruthy()
    expect(gallery.getElementsByTagName('img')[1].src.indexOf(images[1]) > 0).toBeTruthy()
    // simulate right-image click
    gallery.querySelector(`.${SO_PREFIX}-image-right`).click()
    expect(gallery.children.length).toBe(4)
    expect(gallery.getElementsByTagName('img')[0].src.indexOf(images[1]) > 0).toBeTruthy()
    expect(gallery.getElementsByTagName('img')[1].src.indexOf(images[0]) > 0).toBeTruthy()
    expect(gallery.getElementsByTagName('img')[2].src.indexOf(images[2]) > 0).toBeTruthy()

  })

  test('should dismiss while click the background', () => {
    const images = ['/images/1_b.jpg', '/images/2_b.jpg', '/images/3_b.jpg', '/images/4_b.jpg']
    showGallery(images.map(src => ({ src })), 0)
    const gallery = document.querySelector(`.${SO_PREFIX}-image-gallery`)
    expect(gallery).toBeTruthy()
    gallery.querySelector(`.${SO_PREFIX}-image-overlay`).click()
    expect(document.querySelector(`.${SO_PREFIX}-image-gallery`)).toBeFalsy()
  })
})
