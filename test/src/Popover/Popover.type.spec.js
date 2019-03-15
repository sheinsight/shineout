import React from 'react'
import { mount } from 'enzyme'
import { Popover } from 'shineout'
import { dispatchEvent } from '../../../src/utils/dom/element'

/* global SO_PREFIX */
class PopoverTest extends React.Component {
  state = {
    type: 'success',
  }
  render() {
    return (
      <button>
        <Popover type={this.state.type} style={{ padding: 20 }}>Content</Popover>
        Test
      </button>
    )
  }
}
describe('Popover[Type]', () => {
  test('should render different background-color with type', () => {
    const wrapper = mount(<PopoverTest />)
    ;['success', 'info', 'warning', 'danger'].forEach(type => {
      expect(document.querySelectorAll(`.${SO_PREFIX}-popover-${type}`)).toHaveLength(0)
      wrapper.setState({
        type,
      })
      dispatchEvent(wrapper.find('button').instance(), 'mouseenter')
      expect(document.querySelectorAll(`.${SO_PREFIX}-popover-${type}`)).toHaveLength(1)
    })
  })
})
