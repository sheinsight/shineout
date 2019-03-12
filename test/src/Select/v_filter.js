/* global SO_PREFIX */
export function v({ wrapper, data }) {
  wrapper.find(`.${SO_PREFIX}-select-inner`).simulate('click')
  // should render input
  const inputSpan = wrapper.find(`span.${SO_PREFIX}-select-input`)
  data.forEach(color => {
    inputSpan.simulate('input', {
      target: {
        innerText: color,
      },
    })
    jest.runAllTimers()
    wrapper.update()
    const innerText = wrapper.find(`.${SO_PREFIX}-scroll-inner a.${SO_PREFIX}-select-option`)
    expect(innerText.length).toBe(1)
    expect(innerText.text().trim()).toBe(color)
  })
}

export function vLoading({ wrapper }) {
  wrapper.find(`.${SO_PREFIX}-select-inner`).simulate('click')
  // should render input
  const inputSpan = wrapper.find(`span.${SO_PREFIX}-select-input`)
  inputSpan.simulate('input', {
    target: {
      innerText: 'test',
    },
  })
  expect(wrapper.find(`span.${SO_PREFIX}-select-option div.${SO_PREFIX}-spin-default`).length).toBe(1)
}

export function vCreate({ wrapper, finalValue, multiple }) {
  wrapper.find(`.${SO_PREFIX}-select-inner`).simulate('click')
  // should render input
  const inputSpan = wrapper.find(`span.${SO_PREFIX}-select-input`)
  inputSpan.simulate('blur', {
    target: {
      innerText: finalValue,
    },
  })
  jest.runAllTimers()
  wrapper.update()
  multiple
    ? expect(wrapper.find('Select').prop('value')).toEqual([finalValue])
    : expect(wrapper.find('Select').prop('value')).toBe(finalValue)
}
