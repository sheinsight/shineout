import React, { Fragment, Suspense, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect, Switch, NavLink } from 'react-router-dom'
import { Sticky } from 'shineout'
import locate from 'doc/locate'
import Loading from 'docs/Loading'
import { mainClass } from 'doc/styles'
import Icon from '../icons/Icon'

const filters = ['Datum.Form', 'Datum.List']

function getUrl(base, page, search) {
  if (page.path === '') return base
  if (search) {
    return {
      pathname: `${base}/${page.path || page.name}`,
      search,
    }
  }
  return `${base}/${page.path || page.name}${search || ''}`
}

export default function(pages) {
  function Page(props) {
    const base = props.match.url
    const indexRoute = pages.find(p => typeof p !== 'string')

    const { search } = props.history.location || { search: '' }

    if (search.indexOf('?example=') === 0) search.replace('?example=', '')

    const [shownav, setShowNav] = useState(window.innerWidth < 979)

    const toggleCode = () => {
      if (window.innerWidth > 979) return
      const el = document.querySelector('#-shineout-menu')
      const showNav = !shownav
      if (showNav) {
        setShowNav(showNav)
        setTimeout(() => {
          if (el) el.style.display = 'none'
        }, 400)
      } else {
        setTimeout(() => setShowNav(showNav), 16)
        if (el) el.style.display = 'block'
      }
    }

    useEffect(() => {
      const changeNav = () => {
        setShowNav(window.innerWidth < 979)
      }

      window.addEventListener('resize', changeNav)

      return () => window.removeEventListener('resize', changeNav)
    }, [])

    return (
      <Fragment>
        <div tabIndex="-1" className={mainClass('nav-open-close')}>
          <Icon name={shownav ? 'Menu' : 'close'} onClick={toggleCode} />
        </div>

        <Sticky top={0} className={mainClass('menu-sticky-wrap')}>
          <div id="-shineout-menu" className={mainClass('menu', shownav && 'hidden')}>
            {pages
              .filter(v => filters.indexOf(v.name) === -1)
              .map((p, i) =>
                typeof p === 'string' ? (
                  // eslint-disable-next-line
                <label key={i}>{p}</label>
                ) : (
                  <NavLink
                    className={mainClass(p.level === 2 && 'sub')}
                    activeClassName={mainClass('active')}
                    key={p.name}
                    to={getUrl(base, p, search)}
                    onClick={toggleCode}
                  >
                    <p>
                      {p.name}
                      <span style={{ margin: '0 0 0 6px' }}>{locate(p.cn)}</span>
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
                  <Route
                    key={p.name + search}
                    path={getUrl(base, p)}
                    component={p.component}
                    onEnter={() => {
                      toggleCode.bind(null)
                    }}
                  />
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
