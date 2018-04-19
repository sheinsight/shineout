import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'

import 'shineout/styles/normalize.less'
import './verdor'
// import './utils/polyfill'
import './styles/index.less'
import App from './App'

import theme from './utils/theme'

theme.init(() => {
  ReactDOM.render(
    <App />,
    document.getElementById('root'),
  )
})

if (module.hot) module.hot.accept()
