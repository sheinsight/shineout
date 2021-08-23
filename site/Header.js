import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Button, Dropdown, color } from 'shineout'
import docsearch from 'docsearch.js'
import { Link } from 'react-router-dom'
import locate, { setItem, STORAGE_KEY } from './locate'
import theme from './utils/theme'
import logo from './icons/logo'
import Icon from './icons/Icon'
import { headerClass } from './styles'
import FontAwesome from './pages/components/Icon/FontAwesome'
import ThemeEditor from './Components/ThemeEditor'
import history from './history'

const themes = [
  {
    content: 'antd',
    id: '1',
  },
  {
    content: 'default',
    id: '2',
  },
  {
    content: 'shineout',
    id: '3',
  },
]

/*
function getPath(pathname) {
  const index = pathname.indexOf('/', 2)
  let path = pathname
  if (index > 0) path = pathname.substr(0, index)
  return path
}
*/

function findLangs() {
  const prevLang = locate('cn', 'en')
  const nextLang = locate('en', 'cn')
  const itemLang = locate('en-US', 'zh-CN')

  return [prevLang, nextLang, itemLang]
}

function handleLangClick() {
  const langs = findLangs()
  const href = window.location.href.replace(`/${langs[0]}`, `/${langs[1]}`)

  setItem(STORAGE_KEY, langs[2])
  window.location = href
}

function handleThemeClick(data) {
  const url = `?theme=${data.content}${window.location.hash}`
  window.location.href = url
}

const Header = ({ versions }) => {
  // const path = getPath(this.context.location.pathname)
  const path = ''

  const navs = [
    { path: '/index/', en: 'Home', cn: '首页' },
    { path: '/components/GetStart', en: 'Components', cn: '组件' },
    { path: '/documentation/Props', en: '', cn: '杂项' },
  ]

  const { pathname } = window.location
  let version = versions.find(v => pathname.indexOf(v.content) >= 0)
  if (version) version = version.content

  const searchInput = !version || version === (versions[versions.length - 1] || {}).content

  useEffect(() => {
    if (searchInput) {
      docsearch({
        appId: 'QZ4V4FVOGI',
        apiKey: '221731045c2ba6c166d98d78dcf4461a',
        indexName: process.env.LOG_ENV === 'rc' ? `shineout-rc` : `shineout-wiki`,
        inputSelector: '#algolia-doc-search',
        algoliaOptions: { facetFilters: [`${locate('cn', 'en')}`] },
        // transformData(hits) {
        //   /* eslint-disable-next-line */
        //   hits.map(hit => (hit.url = `${hit.url}#${hit.anchor}`))
        //   return hits
        // },
        debug: false, // Set debug to true if you want to inspect the dropdown
      })
    }
  }, [])

  return (
    <div className={headerClass('_')}>
      <div className={headerClass('logo')}>
        <Link to="/index/">{logo}</Link>
      </div>
      <div className={headerClass('nav')}>
        {navs.map(nav => (
          <NavLink key={nav.path} to={nav.path} className={headerClass(path === nav.path && 'active')}>
            {locate(nav.cn, nav.en)}
          </NavLink>
        ))}
      </div>
      {searchInput && (
        <div className={headerClass('docsearch')}>
          <label htmlFor="algolia-doc-search">
            <FontAwesome name="search" className={headerClass('icon')} />
          </label>
          <input
            placeholder={locate('在 shineout 中搜索', 'Search in shineout')}
            className={headerClass('search')}
            id="algolia-doc-search"
            width={220}
          />
        </div>
      )}
      <div className={headerClass('right')}>
        <Button size="small" onClick={handleLangClick} style={{ marginRight: 12 }}>
          {locate('English', '中文')}
        </Button>

        {version && (
          <Dropdown
            className={headerClass('light')}
            data={versions}
            trigger="hover"
            placeholder={version}
            size="small"
            style={{ marginRight: 12 }}
          />
        )}

        <Dropdown
          className={headerClass('light')}
          data={themes}
          onClick={handleThemeClick}
          trigger="hover"
          placeholder={`theme: ${theme.getTheme()}`}
          size="small"
        />

        <Button type="link" style={{ color: '#666' }} href="https://github.com/sheinsight/shineout">
          <Icon name="github" />
          &nbsp;GitHub
        </Button>

        <ThemeEditor />
      </div>
    </div>
  )
}

Header.propTypes = {
  versions: PropTypes.array,
}

export default Header
