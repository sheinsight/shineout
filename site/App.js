import React, { useState, lazy, Suspense, useEffect } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import history from './history'
import Header from './Header'
import Loading from './Components/Loading'
import locate, { setLanguage, STORAGE_KEY, getItem } from './locate'
import { mainClass } from './styles'

const Home = lazy(() => import(/* webpackChunkName: "Home" */ './pages/Home'))
const Components = lazy(() => import(/* webpackChunkName: "Components" */ './chunks/Components'))
const Documentation = lazy(() => import(/* webpackChunkName: "Documentation" */ './pages/documentation'))

const oldVersions = ['1.0.x', '1.1.x']

const filterLang = href => {
  const location = href.split('#')[0]
  return location.indexOf('en') > -1 ? 'en-US' : 'zh-CN'
}

const App = () => {
  const [versions, setVersions] = useState([])
  const [lastPath, setLastPath] = useState()
  const [, setUpdate] = useState()

  useEffect(() => {
    const lang = filterLang(window.location.href)
    setLanguage(lang)
    if (getItem(STORAGE_KEY) !== lang) {
      setUpdate('update')
    }
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
        const language = locate('cn', 'en')
        const jsonVersions = json.map(v => ({
          content: v,
          url: oldVersions.find(o => o === v) ? `../${v}` : `../${v}/${language}`,
        }))
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
