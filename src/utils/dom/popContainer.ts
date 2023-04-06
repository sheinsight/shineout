/**
 * 最外层容器
 */
import { isInDocument } from './isInDocument'
import { getDefaultContainer } from '../../config'

let Container: HTMLElement | null = null

const getContainer = () => {
  if (Container && isInDocument(Container)) {
    return Container
  }
  Container = document.createElement('div')
  Container.setAttribute('style', 'position: absolute; top: 0; left: 0; width: 100%; contain: size')
  const target = getDefaultContainer()
  target.appendChild(Container)
  return Container
}

export default getContainer
