import React from 'react'
import Icon from './Icon'
import { IconCompProps } from './Props'

const links: {
  [url: string]: boolean
} = {}
const scripts: {
  [url: string]: HTMLScriptElement
} = {}

export default function icon(
  url: string,
  fontFamily = 'iconfont',
  prefix = 'icon'
): React.ComponentType<IconCompProps> {
  if (typeof url !== 'string') {
    console.error(`Shineout Icon url must be a string, but get ${url}`)
    return (null as unknown) as React.ComponentType<IconCompProps>
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

  const wrapperIcon = (props: IconCompProps) => <Icon ext={ext} fontFamily={fontFamily} prefix={prefix} {...props} />
  wrapperIcon.isShineoutIcon = true
  return wrapperIcon
}
