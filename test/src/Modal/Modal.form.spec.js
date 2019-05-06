import React from 'react'
import { Modal, Form, Input } from 'shineout'
import { mount } from 'enzyme'

/* global SO_PREFIX */
describe('Modal[Form]', () => {
  test('should call onSubmit', done => {
    jest.useFakeTimers()
    function renderFooter() {
      return (
        <div>
          <Modal.Submit>Submit</Modal.Submit>
        </div>
      )
    }
    const submitFn = () => done()
    mount(
      <Modal visible footer={renderFooter()}>
        <Form onSubmit={submitFn}>
          <Form.Item label="Email">
            <Input name="email" defaultValue="test" />
          </Form.Item>
        </Form>
      </Modal>
    )

    // submit click
    document.querySelector(`.${SO_PREFIX}-button-primary`).click()
    jest.runAllTimers()
  })
})
