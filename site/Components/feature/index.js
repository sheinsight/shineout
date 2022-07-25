import React from 'react'
import ReactDOM from 'react-dom'
import Shineout from 'shineout'
import Features from './Features'
import featuresData from './features.json'

const features = Array.isArray(featuresData) ? featuresData : [featuresData]
const HISTORY_KEY = `SHINEOUT_FEATURE_KEY_${Shineout.version}`
const firstEnter = () => localStorage.getItem(HISTORY_KEY) === null
const enter = () => localStorage.setItem(HISTORY_KEY, Date.now())
const getContainer = () => {
  const div = document.createElement('div')
  div.className = HISTORY_KEY
  document.body.appendChild(div)
  return div
}

export default () => {
  if (process.env.LOG_ENV !== 'rc') return
  if (process.env.CASE_ENV === 'test') return
  if (features.length === 0) return
  if (!firstEnter()) return
  const container = getContainer()
  ReactDOM.render(
    <Features
      features={features}
      onClose={() => {
        ReactDOM.unmountComponentAtNode(container)
        document.body.removeChild(container)
        enter()
      }}
    />,
    container
  )
}
