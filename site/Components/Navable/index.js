import React, { useState, useEffect, useCallback } from 'react'
import Sticky from 'shineout/Sticky'
import history from '../../history'
import { navClass } from '../../styles'

const scrollTo = id => {
  const isSingleMode = history.location.search.indexOf('?example=') === 0
  if (isSingleMode) {
    history.push(`${history.location.pathname}?example=${id.replace('heading-', '')}`)
  } else {
    history.push(`${history.location.pathname}#${id}`)
    const element = document.getElementById(id)
    if (element) element.scrollIntoView()
  }
}

export default function (Component) {
  return function Nav(prop) {
    const [active, setActive] = useState('')
    const [headings] = useState([])
    const { hash } = prop.location

    const setHeading = useCallback(hs => {
      hs.forEach(h => {
        headings.push(h)
      })
    }, [])

    const hashScroll = useCallback(
      () => {
        if (hash) {
          const element = document.querySelector(decodeURI(hash))
          if (element)
            setTimeout(() => {
              element.scrollIntoView()
            }, 50)
        }
      },
      [hash]
    )

    useEffect(() => {
      hashScroll()
      const handleScroll = () => {
        const top = document.documentElement.scrollTop
        const hs = headings.filter(h => h.level === 3 && h.children[0])
        if (hs.length === 0) return

        let newActive = hs[0].id
        hs.forEach(h => {
          const el = document.querySelector(`#${h.id}`)
          if (!el) return
          if (el.offsetTop <= top) newActive = h.id
        })
        setActive(newActive)
      }

      document.addEventListener('scroll', handleScroll)
      handleScroll()
      return () => {
        document.removeEventListener('scroll', handleScroll)
      }
    }, [])

    const renderNav = () => (
      <Sticky className={navClass('sticky')} top={50}>
        <div className={navClass('nav')}>
          {headings.map((h, i) => {
            const children = h.children.filter(c => typeof c === 'string')
            return (
              <a
                key={i}
                className={navClass(`level-${h.level}`, active === h.id && 'active')}
                onClick={scrollTo.bind(null, h.id)}
              >
                {children}
              </a>
            )
          })}
        </div>
      </Sticky>
    )
    return (
      <div className={navClass('_')}>
        <Component onHeadingSetted={setHeading} />
        {!prop.noNav && renderNav()}
      </div>
    )
  }
}
