import React, { PureComponent, Fragment } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import classGenerate from './utils/classname'
import Home from './pages/Home'
import Components from './chunks/Components'
import Documentation from './pages/documentation'
import Header from './Header'

const clsMain = classGenerate(require('./styles/index.less'), 'main')

class App extends PureComponent {
  componentDidMount() {
    window.addEventListener('hashchange', () => {
      const { hash } = window.location
      const index = hash.lastIndexOf('#')

      if (index > 0) {
        const id = hash.substr(index + 1)
        if (id) {
          setTimeout(() => {
            const element = document.getElementById(id)
            if (element) element.scrollIntoView()
          })
        }
      }
    })
  }

  render() {
    return (
      <Router>
        <Fragment>
          <Header />

          <div className={clsMain('body')}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/components" component={Components} />
              <Route path="/documentation" component={Documentation} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    )
  }
}

export default App
