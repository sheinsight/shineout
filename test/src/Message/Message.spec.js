import React from 'react'
import { mount } from 'enzyme'
import MessageContainer from 'shineout/Message/Container'
import { Message } from 'shineout'
import { delay } from '../../utils'
import exampleTest from '../../example'

/* global SO_PREFIX */

describe('Message[snapshot]', () => {
  exampleTest('Message')
})
describe('Message', () => {
  test('should show content', () => {
    const testMsg = 'test'
    const wrapper = mount(<MessageContainer onDestory={() => {}} />)
    wrapper.instance().addMessage({
      content: testMsg,
      duration: 3,
    })
    wrapper.update()
    expect(
      wrapper
        .find('ShineoutAlert')
        .find(`.${SO_PREFIX}-alert-content`)
        .text()
    ).toBe(testMsg)
  })
  test('should show different type', () => {
    const msg = 'test'
    ;['info', 'success', 'warn', 'error'].forEach(type => {
      const wrapper = mount(<MessageContainer onDestory={() => {}} />)
      wrapper.instance().addMessage({
        content: msg,
        duration: 3,
        type,
      })
      wrapper.update()
      expect(wrapper.find('ShineoutAlert').find(`div.${SO_PREFIX}-alert-${type}`)).toHaveLength(1)
    })
  })
  test('should render alert correct', () => {
    const msg = 'The Alert Message !!!'
    ;['info', 'success', 'warn', 'error'].forEach(type => {
      const wrapper = mount(<MessageContainer onDestory={() => {}} />)
      wrapper.instance().addMessage({
        content: msg,
        duration: 3,
        type,
      })
      wrapper.update()
      // expect(wrapper.debug()).toMatchSnapshot()
    })
  })
})

describe('Message[function]', () => {
  it('show', async () => {
    jest.useRealTimers()
    Message.show('test')
    await delay(200)
    expect(document.querySelectorAll('.so-message').length).toBe(1)
    expect(document.querySelector('.so-alert-content').innerHTML).toBe('test')
    await delay(3200)
    expect(document.querySelectorAll('.so-message').length).toBe(0)
  })

  test.each(['info', 'success', 'warn', 'error'])('method: %s', async type => {
    jest.useRealTimers()
    Message[type]('test', 0)
    const classMap = {
      info: 'info',
      success: 'success',
      warn: 'warning',
      error: 'danger',
    }
    await delay(200)
    expect(document.querySelectorAll(`.so-message .so-alert-${classMap[type]} .so-alert-icon`).length).toBe(1)
    expect(document.querySelector('.so-alert-content').innerHTML).toBe('test')
    document.querySelector('.so-alert-close').click()
    await delay(200)
    expect(document.querySelectorAll('.so-message').length).toBe(0)
  })

  test('method close', async () => {
    jest.useRealTimers()
    Message.success('test', 0)
    Message.warn('test', 0)
    await delay(200)
    expect(document.querySelectorAll(`.so-message-item`).length).toBe(2)
    Message.close()
    await delay(200)
    expect(document.querySelectorAll(`.so-message-item`).length).toBe(0)
  })
})

describe('Message[options]', () => {
  it.each(['top', 'middle', 'top-left', 'top-right', 'bottom-left', 'bottom-right'])('position: %s', async position => {
    Message.info('text', 0, { position })
    await delay(200)
    expect(document.querySelectorAll(`.so-message-${position}`).length).toBe(1)
    Message.close()
    await delay(200)
    expect(document.querySelectorAll(`.so-message-item`).length).toBe(0)
  })

  it('hideClose', async () => {
    Message.info('text', 0, { hideClose: true })
    await delay(200)
    expect(document.querySelectorAll(`.so-message-item`).length).toBe(1)
    expect(document.querySelectorAll(`.so-alert-close`).length).toBe(0)
    Message.close()
  })

  it('title', async () => {
    Message.info('text', 0, { title: 'i am title' })
    await delay(200)
    expect(document.querySelectorAll(`.so-message-item`).length).toBe(1)
    expect(document.querySelector(`.so-alert-content h3`).innerHTML).toBe('i am title')
    Message.close()
  })

  it('onClose', async () => {
    const closeFn = jest.fn()
    Message.info('text', 1, { title: 'i am title', onClose: closeFn })
    await delay(1400)
    expect(closeFn.mock.calls.length).toBe(1)
  })
})
