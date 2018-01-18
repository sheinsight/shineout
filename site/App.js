import React, { PureComponent, Fragment } from 'react'
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom'
import classGenerate from './utils/classname'
import Pages from './pages'

const clsMain = classGenerate(require('./styles/index.less'), 'main')

const componentPages = [
  ['Sticky', '附着', 'sticky'],
]

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
        })
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
              <Link to="/">Home</Link>
              {
                componentPages.map(p => (
                  <Link key={p[2]} to={`/components/${p[2]}`}>{p[0]}</Link>
                ))
              }
            </div>
            <div className={clsMain('page')}>
              <Switch>
                <Route exact path="/" component={Pages.Home} />
                {

                componentPages.map(p => (
                  <Route key={p[2]} path={`/components/${p[2]}`} component={Pages.Components[p[0]]} />
                ))
                }
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
