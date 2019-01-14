import React from 'react'
import Sticky from 'shineout/Sticky'
import history from '../../history'
import { navClass } from '../../styles'

const scrollTo = (id) => {
  const isSingleMode = history.location.search.indexOf('?example=') === 0
  if (isSingleMode) {
    history.push(`${history.location.pathname}?example=${id.replace('heading-', '')}`)
  } else {
    const element = document.getElementById(id)
    if (element) element.scrollIntoView()
  }
}

export default function (Component) {
  return class Nav extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        active: '',
        headings: [],
      }

      this.setHeading = this.setHeading.bind(this)
      this.handleScroll = this.handleScroll.bind(this)
    }

    componentDidMount() {
      this.bindScroll()
      this.handleScroll()
    }

    componentWillUnmount() {
      this.$willUnmount = true
      this.unbindScroll()
    }

    setHeading(headings) {
      this.setState({ headings: [...this.state.headings, ...headings] })
    }

    bindScroll() {
      document.addEventListener('scroll', this.handleScroll)
    }

    unbindScroll() {
      document.removeEventListener('scroll', this.handleScroll)
    }

    handleScroll() {
      const top = document.documentElement.scrollTop
      const headings = this.state.headings.filter(h => h.level === 3 && h.children[0])
      if (headings.length === 0) return

      let active = headings[0].id
      headings.forEach((h) => {
        const el = document.querySelector(`#${h.id}`)
        if (!el) return
        if (el.offsetTop <= top) active = h.id
      })

      if (!this.$willUnmount) {
        this.setState({ active })
      }
    }

    renderNav() {
      const { active, headings } = this.state

      return (
        <Sticky className={navClass('sticky')} top={50}>
          <div className={navClass('nav')}>
            {
              headings.map((h, i) => {
                const children = h.children.filter(c => typeof c === 'string')
                return (
                  <a
                    key={i}
                    className={navClass(`level-${h.level}`, active === h.id && 'active')}
                    onClick={scrollTo.bind(this, h.id)}
                  >
                    {children}
                  </a>
                )
              })
            }
          </div>
        </Sticky>
      )
    }

    render() {
      return (
        <div className={navClass('_')}>
          <Component onHeadingSetted={this.setHeading} />
          { this.renderNav() }
        </div>
      )
    }
  }
}
