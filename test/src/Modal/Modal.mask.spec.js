import React from 'react'
import { Modal } from 'shineout'
import { mount } from 'enzyme'
import { dispatchEvent } from '../../../src/utils/dom/element'

/* global SO_PREFIX */
class ModalMask extends React.Component {
  state = {
    maskCloseAble: false,
    visible: true,
  }
  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }
  render() {
    const { visible, maskCloseAble } = this.state
    return <Modal visible={visible} maskCloseAble={maskCloseAble} title="Modal Title" onClose={this.handleCancel} />
  }
}

describe('Modal[mask]', () => {
  test('should match maskCloseAble', () => {
    function expectResult(closeBtn, modalShow){
      jest.runAllTimers()
      expect(document.getElementsByClassName(`${SO_PREFIX}-modal-close`).length).toBe(closeBtn ? 1: 0)
      document.querySelector(`.${SO_PREFIX}-modal-mask`).click()
      jest.runAllTimers()
      expect(document.getElementsByClassName(`${SO_PREFIX}-modal-show`).length).toBe(modalShow ? 1: 0)
    }
    jest.useFakeTimers()
    const wrapper = mount(<ModalMask />)
    // should not click to dismiss && hide close btn while maskCloseAble false
    wrapper.setState({
      visible: true,
      maskCloseAble: false,
    })
    expectResult(false, true)

    // should dismiss while maskCloseable true
    wrapper.setState({
      visible: true,
      maskCloseAble: true,
    })
    expectResult(true, false)

    // should not click to dismiss while maskCloseable null
    wrapper.setState({
      visible: true,
      maskCloseAble: null,
    })
    expectResult(true, true)
  })
})
