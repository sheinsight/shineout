import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Dropdown } from 'shineout'
import locate, { setLanguage } from './locate'
import classGenerate from './utils/classname'
import theme from './utils/theme'

const headerClass = classGenerate(require('./styles/header.less'), 'header')

function getPath(pathname) {
  const index = pathname.indexOf('/', 2)
  let path = pathname
  if (index > 0) path = pathname.substr(0, index)
  return path
}

function handleLangClick() {
  const lang = locate('en', 'zh-cn')
  setLanguage(lang)
}

function handleThemeClick(theme) {
  const url = `?theme=${theme}${window.location.hash}`
  window.location.href = url
}

function Header(props, context) {
  const path = getPath(context.router.route.location.pathname)

  const navs = [
    { path: '/', en: 'Home', cn: '首页' },
    { path: '/components', en: 'Components', cn: '组件' },
    { path: '/documentation', en: 'Documentation', cn: '文档' },
  ]

  return (
    <div className={headerClass('_')}>
      <div className={headerClass('logo')}>Logo</div>
      <div className={headerClass('nav')}>
        {
          navs.map(nav => (
            <NavLink
              key={nav.path}
              to={nav.path}
              className={headerClass(path === nav.path && 'active')}
            >
              {locate(nav.cn, nav.en)}
            </NavLink>
          ))
        }
        <a href="javascript:;" onClick={handleLangClick}>{locate('English', '中文')}</a>
      </div>
      <div className={headerClass('right')}>
        <Dropdown className={headerClass('light')} placeholder={`theme: ${theme.getTheme()}`} type="link">
          {(['default', 'antd']).map(t => (
            <a
              key={t}
              href="javascript:;"
              onClick={handleThemeClick.bind(null, t)}
            >{t}
            </a>
          ))}
        </Dropdown>
      </div>
    </div>
  )
}

Header.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default Header
