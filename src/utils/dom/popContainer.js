/**
 * 最外层容器
 */
import ready from './ready'
import { getDefaultContainer } from '../../config'

let Container = null

const observer = new MutationObserver(mutationsList => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList' && mutation.removedNodes.length > 0) {
      if (!document.documentElement.contains(Container)) {
        Container = null
        observer.disconnect()
      }
    }
  }
})

const getContainer = () => {
  if (Container) {
    return Container
  }
  Container = document.createElement('div')
  Container.setAttribute('style', 'position: absolute; top: 0; left: 0; width: 100%; contain: size')
  ready(() => {
    const target = getDefaultContainer()
    target.appendChild(Container)
    observer.observe(Container.parentNode, { childList: true })
  })
  return Container
}

export default getContainer
