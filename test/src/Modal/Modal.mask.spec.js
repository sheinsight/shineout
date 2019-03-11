import React from 'react'
import { Modal } from 'shineout'
import { mount } from 'enzyme'
import { dispatchEvent } from '../../../src/utils/dom/element'

class ModalMask extends React.Component {
  state = {
    maskClosable: false,
    visible: true,
  }
  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }
  render() {
    const { visible, maskClosable } = this.state
    return (
      <Modal
        visible={visible}
        maskClosable={maskClosable}
        title="Modal Title"
        onClose={this.handleCancel}
      />
    )
  }
}

describe('Modal[mask]', () => {
  test('should not click to dismiss && hide close btn while maskClosable false', () => {
    jest.useFakeTimers()
    const wrapper = mount(<ModalMask />)
    wrapper.setState({
      visible: true,
      maskClosable: false,
    })
    jest.runAllTimers()
    console.log(document.body.innerHTML)
    dispatchEvent(document, 'click')
    jest.runAllTimers()
    console.log(document.body.innerHTML)
  })
  test('should dismiss while maskCloseable true', () => {

  })
  test('should not click to dismiss while maskCloseable null', () => {

  })
})
