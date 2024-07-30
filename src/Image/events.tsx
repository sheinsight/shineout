import React from 'react'
import ReactDOM from 'react-dom'
import Gallery from './Gallery'
import { getDefaultContainer } from '../config'
import { imageClass } from './styles'

let container: HTMLDivElement | null

export interface GalleryImage {
  src?: string
  thumb?: string
  key?: number | string
  zIndex?: number
}

export interface GalleryProps {
  zIndex?: number
}

function close() {
  // eslint-disable-next-line
  document.removeEventListener('keydown', keyClose)
  ReactDOM.unmountComponentAtNode(container as Element)
  if (container && container.parentNode) container.parentNode.removeChild(container)
  container = null
}

function keyClose(e: KeyboardEvent) {
  if (e.keyCode === 27) close()
}

function getContainer() {
  if (container) return container

  const defaultContainer = getDefaultContainer()
  container = document.createElement('div')
  defaultContainer.appendChild(container)
  container.className = imageClass('gallery')

  return container
}

export default function events(images: GalleryImage | GalleryImage[], current = 0, props?: GalleryProps) {
  const { zIndex } = props || {}
  if (!Array.isArray(images)) images = [images]
  const div = getContainer()

  if (zIndex) div.style.zIndex = zIndex.toString()

  document.addEventListener('keydown', keyClose)

  ReactDOM.render(<Gallery onClose={close} current={current} images={images} />, div)
}
