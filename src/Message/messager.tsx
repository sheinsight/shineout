import React from 'react'
import ReactDOM from 'react-dom'
import { messageClass } from './styles'
import Container from './Container'
import { PositionType } from './Props'

const elements: {
  [type: string]: HTMLElement
} = {}
const components: {
  [type: string]: Container | null
} = {}

function getElement(type: PositionType) {
  const div = document.createElement('div')
  div.className = messageClass('_', type)

  document.body.appendChild(div)
  elements[type!] = div
  return div
}

export function destroy(type: PositionType) {
  if (elements[type]) {
    ReactDOM.unmountComponentAtNode(elements[type])
    document.body.removeChild(elements[type])
    delete elements[type]
  }
  if (components[type]) {
    delete components[type]
  }
}

export function getComponent(type: PositionType): Promise<{ addMessage: (message: any) => void }> {
  return new Promise(resolve => {
    const component = components[type!]
    if (component) {
      resolve(component)
    } else {
      ReactDOM.render(
        <Container
          ref={comp => {
            components[type] = comp
            resolve(comp!)
          }}
          onDestory={destroy.bind(null, type)}
        />,
        getElement(type)
      )
    }
  })
}
