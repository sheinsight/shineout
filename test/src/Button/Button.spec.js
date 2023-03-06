import enzyme from 'enzyme'
import React from 'react'
import { Button } from 'shineout'
import { childrenTest, baseTest } from '../../utils'
import ButtonBase from '../../../site/pages/components/Button/example-1-base'
import ButtonOutLine from '../../../site/pages/components/Button/example-7-outline'
import ButtonDisabled from '../../../site/pages/components/Button/example-4-disabled'
import ButtonSize from '../../../site/pages/components/Button/example-3-size'
import ButtonLoading from '../../../site/pages/components/Button/example-5-loading'
import ButtonHref from '../../../site/pages/components/Button/example-6-href'
import ButtonGroup from '../../../site/pages/components/Button/example-8-group'

import { defaultProps } from '../../../src/utils/defaultProps'

/* global SO_PREFIX */

describe('Button[Base]', () => {
  let wrapper
  beforeAll(() => {
    wrapper = enzyme.shallow(<ButtonBase />)
  })
  test('should render .so-button in a Button', () => {
    wrapper.find(Button).forEach(button => {
      expect(button.shallow().hasClass(`${SO_PREFIX}-button`)).toBeTruthy()
    })
  })
  test('should make contact on prop and className', () => {
    wrapper.find(Button).forEach(button => {
      const type = button.prop('type')
      if (type === 'secondary') return
      expect(button.shallow().hasClass(`${SO_PREFIX}-button-${type}`)).toBeTruthy()
    })
  })
})
describe('Button[Outline]', () => {
  test('should set outline class while outline has', () => {
    const wrapper = enzyme.shallow(<ButtonOutLine />)
    wrapper.find(Button).forEach(button => {
      expect(button.shallow().hasClass(`${SO_PREFIX}-button-outline`)).toBeTruthy()
    })
  })
})
describe('Button[disabled]', () => {
  test('should set disabled attr while disabled has', () => {
    const wrapper = enzyme.shallow(<ButtonDisabled />)
    wrapper.find(Button).forEach(button => {
      expect(button.shallow().prop('disabled')).toBe(true)
    })
  })
})
describe('Button[Size]', () => {
  test('should set size class while has size prop', () => {
    const wrapper = enzyme.shallow(<ButtonSize />)
    wrapper.find(Button).forEach(button => {
      const size = button.prop('size')
      if (size !== defaultProps.size) {
        expect(button.shallow().hasClass(`${SO_PREFIX}-button-${size}`)).toBeTruthy()
      }
    })
  })
})
describe('Button[Loading]', () => {
  test('should add loading span while loading prop', () => {
    const wrapper = enzyme.shallow(<ButtonLoading />)
    wrapper.find(Button).forEach(button => {
      expect(button.render().find('div.so-spin-ring').length).toBe(1)
    })
  })
})
describe('Button[Href]', () => {
  test('should render as a tage while has href', () => {
    const wrapper = enzyme.shallow(<ButtonHref />)
    wrapper.find(Button).forEach(button => {
      expect(button.shallow().type()).toBe('a')
    })
  })
})
describe('Button[Icon]', () => {
  // test('should render while has children', () => {
  //   const wrapper = enzyme.shallow(<ButtonIcon />)
  //   wrapper.find(Button).forEach(button => {
  //     button.children().forEach((child, index) => {
  //       const children = button.prop('children')
  //       console.log(child.shallow().debug())
  //       console.log(enzyme.shallow(children[index]).debug())
  //     })
  //   })
  // })
})
describe('Button[Group]', () => {
  test('should take effect on button while set on button-group', () => {
    const wrapper = enzyme.mount(<ButtonGroup />)
    wrapper.find(Button.Group).forEach(group => {
      const outline = group.prop('outline')
      const size = group.prop('size')
      const type = group.prop('type')
      group.find(Button).forEach(button => {
        const originBtn = button.find('button')
        outline && expect(originBtn.hasClass(`${SO_PREFIX}-button-outline`)).toBeTruthy()
        size && expect(originBtn.hasClass(`${SO_PREFIX}-button-${size}`)).toBeTruthy()
        type && expect(originBtn.hasClass(`${SO_PREFIX}-button-${type}`)).toBeTruthy()
      })
    })
  })
})
describe('Button[displayName]', () => {
  test('should start with Shineout', () => {
    expect(Button.displayName).toBe('ShineoutButton')
  })
})

describe('Button[children]', () => {
  test('should mount children', () => {
    childrenTest(Button, `.${SO_PREFIX}-button`)
  })
})
describe('Button[baseTest]', () => {
  const style = { color: 'red', fontSize: '12px' }
  test('should custom style and className', () => {
    baseTest(Button, `.${SO_PREFIX}-button`, style)
  })
})
describe('Button[onClick]', () => {
  test('should onClick', () => {
    const onClick = jest.fn()
    const wrapper = enzyme.mount(<Button onClick={onClick} />)
    wrapper.simulate('click')
    expect(onClick).toHaveBeenCalled()
  })
})
describe('Button[htmlType]', () => {
  test('should set htmlType while has htmlType', () => {
    const wrapper = enzyme.mount(<Button htmlType="submit" />)
    expect(wrapper.find('button').props().type).toBe('submit')
  })
})
describe('Button[space]', () => {
  test('should set space while has space', () => {
    const wrapper = enzyme.mount(<Button space>测试</Button>)
    expect(wrapper.find('button').text()).toBe('测 试')
  })
})
