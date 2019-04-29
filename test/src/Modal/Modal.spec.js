import { Modal } from 'shineout'
import { mount } from 'enzyme'
import React from 'react'

/* global SO_PREFIX */
describe('Modal', () => {
  test('should render correctly', () => {
    mount(
      <Modal visible title="Modal Title">
        Modal Content
      </Modal>
    )
    expect(document.querySelector(`.${SO_PREFIX}-modal`).innerHTML).toMatchSnapshot()
  })
})
