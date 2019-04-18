import React, { Fragment, Suspense, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect, Switch, NavLink } from 'react-router-dom'
import { Sticky } from 'shineout'
import locate from 'doc/locate'
import Loading from 'docs/Loading'
import { mainClass } from 'doc/styles'
import Icon from '../icons/Icon'

function getUrl(base, page) {
  if (page.path === '') return base
  return `${base}/${page.path || page.name}`
}

export default function(pages) {
  function Page(props) {
    const base = props.match.url
    const indexRoute = pages.find(p => typeof p !== 'string')

    const { search } = props.history.location || { search: '' }

    if (search.indexOf('?example=') === 0) search.replace('?example=', '')

    const [shownav, setShowNav] = useState(true)
    if (window.innerWidth > 979 && shownav) {
      setShowNav(false)
    }
    const toggleCode = () => {
      const el = document.querySelector('#-shineout-menu')
      const showNav = !shownav
      setShowNav(showNav)
      if (showNav) {
        setTimeout(() => {
          if (el) el.style.display = 'none'
        }, 400)
      } else if (el) el.style.display = 'block'
    }

    useEffect(() => {
      const changeNav = () => {
        setShowNav(true)

        const el = document.querySelector('#-shineout-menu')
        if (el) el.style.display = 'none'
      }
      window.addEventListener('hashchange', changeNav)
      return () => {
        window.removeEventListener('hashchange', changeNav)
      }
    }, [])

    return (
      <Fragment>
        <div tabIndex="-1" className={mainClass('nav-open-close')}>
          <Icon name={shownav ? 'Menu' : 'close'} onClick={toggleCode.bind(null)} />
        </div>

        <Sticky top={0}>
          <div id="-shineout-menu" className={mainClass('menu', shownav && 'hidden')}>
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
                  <Route
                    key={p.name + search}
                    path={getUrl(base, p)}
                    component={p.component}
                    onEnter={() => {
                      console.log(1)
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
