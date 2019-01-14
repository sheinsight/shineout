import React from 'react'
import ReactDOM from 'react-dom'
import './vendor'
import '../src/styles/normalize.less'
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
