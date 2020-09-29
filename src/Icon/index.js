import React from 'react'
import Icon from './Icon'

const links = {}
const scripts = {}

export default function(url, fontFamily = 'iconfont', prefix = 'icon') {
  if (typeof url !== 'string') {
    console.error(`Shineout Icon must url must be a string, but get ${url}`)
    return null
  }
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
