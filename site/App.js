import React, { PureComponent, Fragment } from 'react'
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom'
import classGenerate from './utils/classname'
import { Home } from './pages'

const clsMain = classGenerate(require('./styles/index.less'), 'main')

class App extends PureComponent {
  componentDidMount() {
    window.addEventListener('hashchange', () => {
      const { hash } = window.location
      const index = hash.lastIndexOf('#')
      if (index > 0) {
        const id = hash.substr(index + 1)
        setTimeout(() => {
          const element = document.getElementById(id)
          if (element) element.scrollIntoView()
        }, 0)
      }
    })
  }

  render() {
    return (
      <Fragment>
        <div className={clsMain('header')}>
            header
        </div>
        <Router>
          <div className={clsMain('body')}>
            <div className={clsMain('menu')}>
              menu
            </div>
            <div className={clsMain('page')}>
              <Switch>
                <Route exact path="/" component={Home} />
              </Switch>
            </div>
          </div>
        </Router>
      </Fragment>
    )
  }
}

App.propTypes = {
}

export default App
