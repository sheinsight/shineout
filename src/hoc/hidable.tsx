import React, { ComponentType } from 'react'
import classnames from 'classnames'
import createReactContext from '../context'
import { PureComponent } from '../component'
import { getUidStr } from '../utils/uid'
import { hidableClass } from './styles'
import { GetHidableConsumerProps } from './Props'
import { ListAnimationType } from '../AnimationList/Props'

const context = createReactContext<{ visible?: boolean }>({})

export const consumer = <U extends {}>(
  Origin: React.ComponentType<U>
): React.FC<GetHidableConsumerProps<U>> => props => (
  <context.Consumer>{value => <Origin {...value} {...props} />}</context.Consumer>
)

interface HideableProps {
  show?: boolean
  className?: string
}

interface HidableConfig {
  type: ListAnimationType[]
  duration: number
  display?: string
}

/**
 * @param {*} Component
 * @param {*} duration
 * @param {*} type - fade, collapse, tranlate
 */

export default function<U extends HideableProps>(
  Component: React.ComponentType<U>,
  { type = ['fade'], duration = 360, display = 'block' }: HidableConfig
) {
  const hasCollapse = type.indexOf('collapse') >= 0
  const needTransform = type.indexOf('scale-y') >= 0

  class Hidable extends PureComponent<U, { show?: boolean }> {
    static defaultProps = {
      className: '',
      show: false,
    }

    height: number

    id: string

    constructor(props: U) {
      super(props)

      this.state = {
        show: props.show,
      }
      this.height = 0
      this.id = `__hidable_${getUidStr()}__`
    }

    componentDidMount() {
      super.componentDidMount()
      const el = this.getElement()
      if (!el) return

      if (hasCollapse) this.height = el.offsetHeight

      if (this.props.show) {
        this.show()
        return
      }

      el.style.display = 'none'

      if (hasCollapse) {
        el.style.overflow = 'hidden'
        el.style.height = '0px'
      }
    }

    componentDidUpdate(prevProps: U) {
      if (this.props.show === prevProps.show) return

      if (this.props.show) this.show()
      else this.hide()
    }

    getElement() {
      return document.querySelector(`.${this.id}`) as HTMLElement
    }

    show() {
      const el = this.getElement()
      if (!el) return
      const es = el.style
      es.display = display
      setTimeout(() => {
        if (this.$isMounted) {
          this.setState({ show: true })

          if (hasCollapse) {
            es.height = `${this.height}px`

            setTimeout(() => {
              es.height = 'auto'
              es.overflow = ''
            }, duration)
          }
        }
      }, 10)
    }

    hide() {
      this.setState({ show: false })
      const element = this.getElement()

      if (hasCollapse) {
        this.height = element.offsetHeight
        element.style.height = `${this.height}px`
        element.style.overflow = 'hidden'

        setTimeout(() => {
          element.style.height = '0px'
        }, 10)
      }

      setTimeout(() => {
        if (this.state.show === false && element && element) {
          element.style.display = 'none'
        }
      }, duration)
    }

    render() {
      let animation = `animation-${duration}`
      if (!needTransform) {
        animation = `fade-${animation}`
      }
      const className = classnames(
        hidableClass('_', ...type, animation, this.state.show && 'show'),
        this.props.className,
        this.id
      )
      const provider = { visible: this.state.show }
      return (
        <context.Provider value={provider}>
          <Component {...this.props} className={className} />
        </context.Provider>
      )
    }
  }

  return (Hidable as unknown) as ComponentType<U>
}
