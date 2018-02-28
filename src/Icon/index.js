import React from 'react'
import Icon from './Icon'

export default function (fontName = '', url) {
  if (!url) {
    console.warning('you may add a "url" to create a icon ')
  }
  const link = document.createElement('link')
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('type', 'text/css')
  link.setAttribute('href', url)
  document.head.appendChild(link)
  return props => (<Icon fontName={fontName} {...props} />)
}

