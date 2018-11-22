import React from 'react'
import ReactDOM from 'react-dom'
import './vendor'
import './styles/index.less'
import App from './App'

import theme from './utils/theme'

theme.init(() => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root'),
  )
})

if (module.hot) module.hot.accept()
