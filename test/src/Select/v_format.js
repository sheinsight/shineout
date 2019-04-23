import { range } from '../../../src/utils/numbers'

/* global SO_PREFIX */
export function vSingle({ wrapper, changeFn, citys, renderItem, format }) {
  // select first option
  wrapper.find(`.${SO_PREFIX}-select-inner`).simulate('click')
  const options = wrapper.find(`.${SO_PREFIX}-select-option`)
  options.first().simulate('click')
  expect(changeFn.mock.calls[0][0]).toBe(citys[0][format])
  // renderItem
  options.forEach((option, index) => {
    const text = option.text().trim()
    expect(text).toBe(citys[index][renderItem])
  })
}

export function vMultiple({ wrapper, citys, changeFn, format }) {
  // select first five option
  wrapper.find(`.${SO_PREFIX}-select-inner`).simulate('click')
  const options = wrapper.find(`.${SO_PREFIX}-select-option`)
  const selected = []
  range(5).forEach((...arg) => {
    options.at(arg[1]).simulate('click')
    selected.push(citys[arg[1]][format])
    wrapper.update()
    expect(changeFn.mock.calls[arg[1]][0]).toEqual(selected)
  })
}
