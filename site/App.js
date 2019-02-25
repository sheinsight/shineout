import React, { useState, lazy, Suspense, useEffect } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import history from './history'
import Header from './Header'
import Loading from './Components/Loading'
import { mainClass } from './styles'

const Home = lazy(() => import(/* webpackChunkName: "Home" */ './pages/Home'))
const Components = lazy(() => import(/* webpackChunkName: "Components" */ './chunks/Components'))
const Documentation = lazy(() => import(/* webpackChunkName: "Documentation" */ './pages/documentation'))

const App = () => {
  const [versions, setVersions] = useState([])
  const [lastPath, setLastPath] = useState()

  useEffect(() => {
    window.addEventListener('hashchange', () => {
      const [, path] = window.location.hash.split('#')

      if (lastPath !== path) {
        document.documentElement.scrollTop = 0
        setLastPath(path)
      }
    })

    fetch('../versions.json')
      .then(res => res.json())
      .then(json => {
        const jsonVersions = json.map(v => ({ content: v, url: `../${v}` }))
        setVersions(jsonVersions)
      })
      .catch(() => {})
  }, [])

  return (
    <Router history={history}>
      <div>
        <Header versions={versions} />

        <div className={mainClass('body')}>
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/components" component={Components} />
              <Route path="/documentation" component={Documentation} />
            </Switch>
          </Suspense>
        </div>
      </div>
    </Router>
  )
}

export default App
