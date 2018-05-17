import React from 'react'
import ReactDOM from 'react-dom'
import Gallery from './Gallery'
import { imageClass } from '../styles'

let container

function close() {
  // eslint-disable-next-line
  document.removeEventListener('keydown', keyClose)
  ReactDOM.unmountComponentAtNode(container)
  document.body.removeChild(container)
  container = null
}

function keyClose(e) {
  if (e.keyCode === 27) close()
}

function getContainer() {
  if (container) return container

  container = document.createElement('div')
  document.body.appendChild(container)
  container.className = imageClass('gallery')

  return container
}

export default function (images, current = 0) {
  if (!Array.isArray(images)) images = [images]
  const div = getContainer()

  document.addEventListener('keydown', keyClose)

  ReactDOM.render(<Gallery onClose={close} current={current} images={images} />, div)
}
