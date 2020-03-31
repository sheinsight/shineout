import React from 'react'
import Icon from './Icon'

const links = {}
const scripts = {}

export default function(url, fontFamily = 'iconfont', prefix = 'icon') {
  const ext = url.substr(url.lastIndexOf('.') + 1)
  if (ext === 'css' && !links[url]) {
    links[url] = true
    const link = document.createElement('link')
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('type', 'text/css')
    link.setAttribute('href', url)
    document.head.appendChild(link)
  }
  if (ext === 'js' && !scripts[url]) {
    const script = document.createElement('script')
    scripts[url] = script
    script.setAttribute('src', url)
    document.body.appendChild(script)
  }

  const wrapperIcon = props => <Icon ext={ext} fontFamily={fontFamily} prefix={prefix} {...props} />
  wrapperIcon.isShineoutIcon = true
  return wrapperIcon
}
