/**
 * 最外层容器
 */
import ready from './ready'
import { isInDocument } from './isInDocument'

let Container = null

const getContainer = () => {
  if (Container && isInDocument(Container)) {
    return Container
  }
  Container = document.createElement('div')
  Container.setAttribute('style', 'position: absolute; top: 0; left: 0; width: 100%; contain: size')
  ready(() => {
    document.body.appendChild(Container)
  })
  return Container
}

export default getContainer
