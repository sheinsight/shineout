import React, { useState, lazy, Suspense, useEffect } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import history from './history'
import Header from './Header'
import Loading from './Components/Loading'
import locate, { setLanguage, STORAGE_KEY, getItem } from './locate'
import { mainClass } from './styles'
import Eggs from './Components/Eggs'

const Home = lazy(() => import(/* webpackChunkName: "Home" */ './pages/Home'))
const Components = lazy(() => import(/* webpackChunkName: "Components" */ './chunks/Components'))
const Documentation = lazy(() => import(/* webpackChunkName: "Documentation" */ './pages/documentation'))

// 上古版本
const oldestVersions = ['1.0.x', '1.1.x']
// 旧版本

const verReg = /(\d+\.){2}x/

const filterLang = href => (href.indexOf('/en') > -1 ? 'en-US' : 'zh-CN')
const lang = filterLang(window.location.href)
document.documentElement.lang = lang

const versionUrl = (v, lan) => {
  const preUrl = window.location.href.split(verReg)[0]
  if (oldestVersions.find(a => a === v)) return `${preUrl}${v}/`
  // if (oldVersions.find(b => b === v)) return `${preUrl}${v}/${lang}`
  return `${preUrl}${v}/${lan}`
}

const App = () => {
  const [versions, setVersions] = useState([])
  const [lastPath] = useState({ pathname: history.location.pathname })
  const [, setUpdate] = useState()

  useEffect(() => {
    setLanguage(lang)
    if (getItem(STORAGE_KEY) !== lang) {
      setUpdate('update')
    }

    const unListen = history.listen(loc => {
      if (lastPath.pathname !== loc.pathname) {
        document.documentElement.scrollTop = 0
        lastPath.pathname = loc.pathname
      }
    })

    fetch('../../../versions.json')
      .then(res => res.json())
      .then(json => {
        const language = locate('cn', 'en')
        const jsonVersions = json.map(v => ({
          content: v,
          url: versionUrl(v, language),
        }))
        setVersions(jsonVersions)
      })
      .catch(() => {})

    return () => {
      unListen()
    }
  }, [])

  return (
    <Router history={history}>
      <div>
        <Header versions={versions} />
        <Eggs />
        <div className={mainClass('body')}>
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route exact path="/index" component={Home} />
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
