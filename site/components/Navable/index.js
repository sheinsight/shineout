import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import Sticky from 'shineout/Sticky'
import classGenerate from '../../utils/classname'

const cls = classGenerate(require('./nav.less'), 'nav')

export default function (Component) {
  class Nav extends PureComponent {
    constructor(props) {
      super(props)

      this.state = {
        headings: [],
      }

      this.setHeading = this.setHeading.bind(this)
    }

    setHeading(headings) {
      this.setState({ headings: [...this.state.headings, ...headings] })
    }

    renderNav() {
      const { headings } = this.state

      return (
        <Sticky className={cls('sticky')} top={40}>
          <div className={cls('nav')}>
            {
              headings.map((h) => {
                const children = h.children.filter(c => typeof c === 'string')
                return (
                  <Link
                    key={h.id}
                    className={cls(`level-${h.level}`)}
                    to={`#${h.id}`}
                  >
                    {children}
                  </Link>
                )
              })
            }
          </div>
        </Sticky>
      )
    }

    render() {
      return (
        <div className={cls('container')}>
          <Component onHeadingSetted={this.setHeading} />
          { this.renderNav() }
        </div>
      )
    }
  }

  return Nav
}
