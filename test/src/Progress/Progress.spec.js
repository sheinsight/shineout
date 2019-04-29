import React from 'react'
import { mount } from 'enzyme'
import { Progress } from 'shineout'

/* global SO_PREFIX */
describe('Progress[base]', () => {
  test('should render length correctly', () => {
    class ProgressTest extends React.Component {
      state = {
        progress: 0,
      }
      render() {
        return <Progress value={this.state.progress} />
      }
    }
    const wrapper = mount(<ProgressTest />)
    for (let i = 0; i <= 100; i++) {
      wrapper.setState({
        progress: i,
      })
      wrapper.update()
      const frontWidth = wrapper.find(`.${SO_PREFIX}-progress-front`).prop('style').width
      const frontWidthNumber = parseFloat(frontWidth.substring(0, frontWidth.length - 1)).toPrecision(12)
      expect(frontWidthNumber === i)
    }
  })
  test('should render children', () => {
    const childrens = ['test', 'hello', 'content', <h2>Test</h2>]
    childrens.forEach(children => {
      const wrapper = mount(<Progress>{children}</Progress>)
      const content = wrapper.find(`.${SO_PREFIX}-progress-content`)
      if (typeof children === 'string') {
        expect(content.text()).toBe(children)
        return
      }
      expect(content.instance().childNodes[0].tagName).toBe(children.type.toUpperCase())
      expect(content.find(`h2`).html()).toBe('<h2>Test</h2>')
    })
  })
  test('should render type', () => {
    ;['success', 'info', 'warning', 'danger'].forEach(type => {
      const wrapper = mount(<Progress value={100} type={type} />)
      expect(wrapper.find(`.${SO_PREFIX}-progress-${type}`)).toHaveLength(1)
    })
  })
  test('should render custom color', () => {
    ;[
      'rgb(1, 1, 1)',
      'rgb(23, 45, 123)',
      'rgb(23, 23, 1)',
      'linear-gradient(45deg, #ffadd2 25%, #eb2f96 25%, #eb2f96 50%, #ffadd2 50%, #ffadd2 75%, #eb2f96 75%, #eb2f96)',
    ].forEach(color => {
      const wrapper = mount(<Progress value={50} color={color} />)
      const bg = wrapper.find(`.${SO_PREFIX}-progress-front`).prop('style').background
      expect(bg).toBe(color)
    })
  })
  test('should render circle', () => {
    const wrapper = mount(<Progress shape="circle" value={50} />)
    expect(wrapper.find('svg circle')).toHaveLength(2)
  })
  test('should render strokeLinecap on circle', () => {
    const wrapper = mount(<Progress shape="circle" value={70} />)
    document.body.innerHTML = wrapper.html()
    expect(document.querySelectorAll(`circle[stroke-linecap="round"]`)).toHaveLength(1)
  })
  test('able to set strokeLinecap on circle default', () => {
    const wrapper = mount(<Progress shape="circle" strokeLinecap="butt" value={70} />)
    document.body.innerHTML = wrapper.html()
    expect(document.querySelectorAll(`circle[stroke-linecap="butt"]`)).toHaveLength(1)
  })
})
