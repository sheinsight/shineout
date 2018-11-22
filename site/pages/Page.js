import React, { Fragment, Suspense } from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect, Switch, NavLink } from 'react-router-dom'
import { Sticky } from 'shineout'
import locate from 'doc/locate'
import Loading from 'docs/Loading'
import classGenerate from '../utils/classname'

const clsMain = classGenerate(require('../styles/index.less'), 'main')

function getUrl(base, page) {
  if (page.path === '') return base
  return `${base}/${page.path || page.name}`
}

export default function (pages) {
  function Page(props) {
    const base = props.match.url

    const indexRoute = pages.find(p => typeof p !== 'string')

    return (
      <Fragment>
        <Sticky top={0}>
          <div className={clsMain('menu')}>
            {
              pages.map((p, i) => (
                typeof p === 'string'
                  // eslint-disable-next-line
                  ? <label key={i}>{p}</label>
                  : (
                    <NavLink
                      className={clsMain(p.level === 2 && 'sub')}
                      activeClassName={clsMain('active')}
                      key={p.name}
                      to={getUrl(base, p)}
                    >
                      <p>{p.name} <span>{locate(p.cn)}</span></p>
                    </NavLink>
                  )
              ))
            }
          </div>
        </Sticky>

        <div className={clsMain('page')}>
          <Suspense fallback={<Loading />}>
            <Switch>
              <Redirect from={base} exact to={getUrl(base, indexRoute)} />
              {
                pages.filter(p => typeof p === 'object').map(p => (
                  <Route key={p.name} path={getUrl(base, p)} component={p.component} />
                ))
              }
            </Switch>
          </Suspense>
        </div>
      </Fragment>
    )
  }

  Page.propTypes = {
    match: PropTypes.object.isRequired,
  }

  return Page
}
