import React from 'react'
import { mount } from 'enzyme'
import { Modal } from 'shineout'

/* global SO_PREFIX */
class ModalTest extends React.Component {
  // ['top', 'right', 'bottom', 'left']
  state = {
    position: 'top',
  }
  render() {
    return <Modal visible position={this.state.position} />
  }
}

describe('Modal[position]', () => {
  test('should set position', () => {
    const wrapper = mount(<ModalTest />)
    ;['top', 'right', 'bottom', 'left'].forEach(position => {
      wrapper.setState({
        position,
      })
      const panel = document.querySelector(`.${SO_PREFIX}-modal .${SO_PREFIX}-modal-panel`).classList
      expect(panel.contains(`${SO_PREFIX}-modal-${position}`)).toBeTruthy()
    })
  })
})
