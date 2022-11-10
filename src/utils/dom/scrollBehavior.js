let htmlDom
let lastStyle = null

const getHtml = () => {
  if (!htmlDom) htmlDom = document.body.parentElement
  return htmlDom
}
const setScrollBehavior = () => {
  if (lastStyle !== null) return
  lastStyle = getHtml().style.overscrollBehaviorX
  htmlDom.style.overscrollBehaviorX = 'none'
}

const resetScrollBehavior = () => {
  htmlDom.style.overscrollBehaviorX = lastStyle
  lastStyle = null
}

export const banOverScrollX = el => {
  el.addEventListener('mouseenter', setScrollBehavior)
  el.addEventListener('mouseleave', resetScrollBehavior)
  return () => {
    el.removeEventListener('mouseenter', setScrollBehavior)
    el.removeEventListener('mouseleave', resetScrollBehavior)
  }
}
