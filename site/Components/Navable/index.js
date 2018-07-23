import React, { PureComponent } from 'react'
import Sticky from 'shineout/Sticky'
import classGenerate from '../../utils/classname'

const cls = classGenerate(require('./nav.less'), 'nav')

const scrollTo = (id) => {
  const element = document.getElementById(id)
  if (element) element.scrollIntoView()
}

export default function (Component) {
  return class Nav extends PureComponent {
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
      if (this.throttleTimer) clearTimeout(this.throttleTimer)
      this.throttleTimer = setTimeout(() => {
        const top = document.documentElement.scrollTop
        const heads = this.state.headings.filter(h => h.level === 3)
        if (heads.length === 0) return

        let active = heads[0].id
        heads.forEach((head) => {
          const el = document.querySelector(`#${head.id}`)
          if (!el) return
          if (el.offsetTop <= top) active = head.id
        })

        if (!this.$willUnmount) {
          this.setState({ active })
        }
      }, 30)
    }

    renderNav() {
      const { active, headings } = this.state

      return (
        <Sticky className={cls('sticky')} top={50}>
          <div className={cls('nav')}>
            {
              headings.map((h, i) => {
                const children = h.children.filter(c => typeof c === 'string')
                return (
                  <a
                    key={i}
                    className={cls(`level-${h.level}`, active === h.id && 'active')}
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
        <div className={cls('_')}>
          <Component onHeadingSetted={this.setHeading} />
          { this.renderNav() }
        </div>
      )
    }
  }
}
