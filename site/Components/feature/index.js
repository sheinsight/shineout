import React from 'react'
import ReactDOM from 'react-dom'
import ready from 'shineout/utils/dom/ready'
import Shineout from 'shineout'
import Feature from './Feature'

const HISTORY_KEY = `SHINEOUT_FEATURE_KEY_${Shineout.version}`
const firstEnter = () => localStorage.getItem(HISTORY_KEY) === null
const enter = () => localStorage.setItem(HISTORY_KEY, Date.now())
let container = null
ready(() => {
  if (process.env.LOG_ENV !== 'rc') return
  if (!firstEnter()) return
  const div = document.createElement('div')
  div.className = HISTORY_KEY
  document.body.appendChild(div)
  container = div
  ReactDOM.render(
    <Feature
      onClose={() => {
        ReactDOM.unmountComponentAtNode(container)
        document.body.removeChild(container)
        enter()
        container = null
      }}
    />,
    container
  )
})
