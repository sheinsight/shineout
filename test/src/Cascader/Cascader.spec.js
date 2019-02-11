import { shallow, mount} from 'enzyme'
import React from 'react'
import Cascader from 'shineout/Cascader'
import CascaderBase from '../../../site/pages/components/Cascader/example-01-base'

describe('Cascader[Base]', () => {
  test('should show list while click the Cascader', () => {
    const wrapper = mount(<CascaderBase />)
    console.log(wrapper.debug())
  })
})
