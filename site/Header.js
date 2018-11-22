import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Button, Dropdown } from 'shineout'
import locate, { setLanguage } from './locate'
import classGenerate from './utils/classname'
import theme from './utils/theme'
import logo from './icons/logo'
import Icon from './icons/Icon'

const headerClass = classGenerate(require('./styles/header.less'), 'header')

const themes = [{
  content: 'antd',
  id: '1',
}, {
  content: 'default',
  id: '2',
}]

/*
function getPath(pathname) {
  const index = pathname.indexOf('/', 2)
  let path = pathname
  if (index > 0) path = pathname.substr(0, index)
  return path
}
*/

function handleLangClick() {
  const lang = locate('en-US', 'zh-CN')
  setLanguage(lang)
}

function handleThemeClick(data) {
  const url = `?theme=${data.content}${window.location.hash}`
  window.location.href = url
}

class Header extends React.PureComponent {
  render() {
    // const path = getPath(this.context.location.pathname)
    const path = ''

    const navs = [
      { path: '/', en: 'Home', cn: '首页' },
      { path: '/components', en: 'Components', cn: '组件' },
      { path: '/documentation', en: '', cn: '文档' },
    ]

    const { pathname } = window.location
    let version = this.props.versions.find(v => pathname.indexOf(v.content) >= 0)
    if (version) version = version.content

    return (
      <div className={headerClass('_')}>
        <div className={headerClass('logo')}>
          <a href="#/">
            {logo}
          </a>
        </div>
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
        </div>
        <div className={headerClass('right')}>
          <Button size="small" onClick={handleLangClick} style={{ marginRight: 12 }}>
            {locate('English', '中文')}
          </Button>

          {
            version &&
            <Dropdown
              className={headerClass('light')}
              data={this.props.versions}
              trigger="hover"
              placeholder={version}
              size="small"
              style={{ marginRight: 12 }}
            />
          }

          <Dropdown
            className={headerClass('light')}
            data={themes}
            onClick={handleThemeClick}
            trigger="hover"
            placeholder={`theme: ${theme.getTheme()}`}
            size="small"
          />

          <Button type="link" style={{ color: '#666' }} href="https://github.com/sheinsight/shineout">
            <Icon name="github" /> GitHub
          </Button>
        </div>
      </div>
    )
  }
}

Header.propTypes = {
  versions: PropTypes.array,
}

export default Header
