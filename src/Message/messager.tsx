import React from 'react'
import ReactDOM from 'react-dom'
import { messageClass } from './styles'
import Container from './Container'
import { PositionType } from './Props'
import { isFunc } from '../utils/is'
import { getDefaultContainer } from '../config'

const elements: {
  [type: string]: HTMLElement
} = {}
const components: {
  [type: string]: Container | null
} = {}

function getElement(type: PositionType, container?: (() => HTMLElement) | HTMLElement) {
  const defaultContainer = getDefaultContainer()
  const div = document.createElement('div')
  div.className = messageClass('_', type)
  let target = defaultContainer

  if (container && isFunc(container)) {
    target = container()
  }

  if (container && container instanceof HTMLElement) {
    target = container
  }

  target.appendChild(div)
  elements[type!] = div
  return div
}

export function destroy(type: PositionType) {
  if (elements[type]) {
    ReactDOM.unmountComponentAtNode(elements[type])
    const el = elements[type]
    if (el && el.parentNode) el.parentNode.removeChild(el)
    delete elements[type]
  }
  if (components[type]) {
    delete components[type]
  }
}

export function getComponent({
  position,
  container,
}: {
  position: PositionType
  container?: (() => HTMLElement) | HTMLElement
}): Promise<{ addMessage: (message: any) => () => void }> {
  return new Promise(resolve => {
    const component = components[position!]
    if (component) {
      resolve(component)
    } else {
      ReactDOM.render(
        <Container
          ref={comp => {
            components[position] = comp
            resolve(comp!)
          }}
          onDestory={destroy.bind(null, position)}
        />,
        getElement(position, container)
      )
    }
  })
}
