import React from 'react'
import Icon from './Icon'

const links = {}
const scripts = {}

export default function(url, fontFamily = 'iconfont', prefix = 'icon') {
  const ext = (url || '').split('.').reverse()[0]
  if (ext === 'css' && !links[url]) {
    links[url] = true
    const link = document.createElement('link')
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('type', 'text/css')
    link.setAttribute('href', url)
    document.head.appendChild(link)
  }
  if (ext === 'js') {
    if (scripts[url]) document.head.removeChild(scripts[url])
    const script = document.createElement('script')
    scripts[url] = script
    script.setAttribute('src', url)
    document.head.appendChild(script)
  }

  const wrapperIcon = props => <Icon ext={ext} fontFamily={fontFamily} prefix={prefix} {...props} />
  wrapperIcon.isShineoutIcon = true
  return wrapperIcon
}
