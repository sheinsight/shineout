import React from 'react'
import Icon from './Icon'

const links = {}

export default function (url, fontFamily = 'iconfont', prefix = 'icon') {
  if (url && !links[url]) {
    links[url] = true
    const link = document.createElement('link')
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('type', 'text/css')
    link.setAttribute('href', url)
    document.head.appendChild(link)
  }

  return props => (<Icon fontFamily={fontFamily} prefix={prefix} {...props} />)
}

