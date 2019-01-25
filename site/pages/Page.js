import React, { Fragment, Suspense } from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect, Switch, NavLink } from 'react-router-dom'
import { Sticky } from 'shineout'
import locate from 'doc/locate'
import Loading from 'docs/Loading'
import { mainClass } from 'doc/styles'

function getUrl(base, page) {
  if (page.path === '') return base
  return `${base}/${page.path || page.name}`
}

export default function(pages) {
  function Page(props) {
    const base = props.match.url
    const indexRoute = pages.find(p => typeof p !== 'string')

    const { search } = props.history.location || ''
    if (search.indexOf('?example=') === 0) search.replace('?example=', '')

    return (
      <Fragment>
        <Sticky top={0}>
          <div className={mainClass('menu')}>
            {pages.map((p, i) =>
              typeof p === 'string' ? (
                <label key={i}>{p}</label>
              ) : (
                <NavLink
                  className={mainClass(p.level === 2 && 'sub')}
                  activeClassName={mainClass('active')}
                  key={p.name}
                  to={getUrl(base, p)}
                >
                  <p>
                    {p.name} <span>{locate(p.cn)}</span>
                  </p>
                </NavLink>
              )
            )}
          </div>
        </Sticky>

        <div className={mainClass('page')}>
          <Suspense fallback={<Loading />}>
            <Switch>
              <Redirect from={base} exact to={getUrl(base, indexRoute)} />
              {pages
                .filter(p => typeof p === 'object')
                .map(p => (
                  <Route key={p.name + search} path={getUrl(base, p)} component={p.component} />
                ))}
            </Switch>
          </Suspense>
        </div>
      </Fragment>
    )
  }

  Page.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object.isRequired,
  }

  return Page
}
