import React from 'react'
import Icon from './Icon'

export default function (url, fontFamily = 'iconfont', prefix = 'icon') {
  if (!url) {
    console.warning('you may add a "url" to create a icon ')
  }
  const link = document.createElement('link')
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('type', 'text/css')
  link.setAttribute('href', url)
  document.head.appendChild(link)
  return props => (<Icon fontFamily={fontFamily} prefix={prefix} {...props} />)
}

