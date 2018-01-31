import React from 'react'
import ReactDOM from 'react-dom'
import { messageClass } from '../styles'
import Container from './Container'

const elements = {}
const components = {}

function getElement(type) {
  const div = document.createElement('div')
  div.className = messageClass('_', type)

  document.body.appendChild(div)
  elements[type] = div
  return div
}

export function destroy(type) {
  if (components[type]) {
    delete components[type]
  }
  if (elements[type]) {
    document.body.removeChild(elements[type])
    delete elements[type]
  }
}

export function getComponent(type) {
  let component = components[type]
  if (!component) {
    component = ReactDOM.render(
      <Container onDestory={destroy.bind(null, type)} />,
      getElement(type),
    )
    components[type] = component
  }

  return component
}
