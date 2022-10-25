let htmlDom
let lastStyle

const setScrollBehavior = () => {
  if (!htmlDom) {
    htmlDom = document.querySelector('html')
  }
  lastStyle = htmlDom.style.overscrollBehaviorX
  htmlDom.style.overscrollBehaviorX = 'none'
}

const resetScrollBehavior = () => {
  if (!htmlDom) {
    htmlDom = document.querySelector('html')
  }
  htmlDom.style.overscrollBehaviorX = lastStyle
}

export const banOverScrollX = el => {
  el.addEventListener('mouseenter', setScrollBehavior)
  el.addEventListener('mouseleave', resetScrollBehavior)
  return () => {
    el.removeEventListener('mouseenter', setScrollBehavior)
    el.removeEventListener('mouseleave', resetScrollBehavior)
  }
}
