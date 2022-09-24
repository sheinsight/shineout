/**
 * 最外层容器
 */
import ready from './ready'

let Container: HTMLElement | null = null

const getContainer = function() {
  if (Container) return Container
  Container = document.createElement('div')
  Container.setAttribute('style', 'position: absolute; top: 0; left: 0; width: 100%; contain: size')
  ready(() => {
    if (Container) document.body.appendChild(Container)
  })
  return Container
}

export default getContainer
