/* global SO_PREFIX */
export function vAbsolute({ wrapper, data }) {
  wrapper.find(`.${SO_PREFIX}-select-inner`).simulate('click')
  const options = Array.prototype.slice.apply(document.getElementsByClassName(`${SO_PREFIX}-select-option`))
  options.forEach((option, index) => {
    expect(option.innerHTML.trim()).toBe(data[index])
  })
}
