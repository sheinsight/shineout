import React, { PureComponent } from 'react'
import classnames from 'classnames'
import {  defaultProps } from '../utils/proptypes'
import { dispatchEvent } from '../utils/dom/element'
import { cardClass } from './styles'
import { Provider } from './context'
import { compose } from '../utils/func'
import resizable from '../hoc/resizable'
import moveable from '../hoc/moveable'
import { modalClass } from '../Modal/styles'
import { isRTL } from '../config'
import {CardProps} from './interface'
import { CardContextValueType } from './context'

interface CardState {
  collapsed?: boolean
  formStatus: string
}


class Card extends PureComponent<CardProps, CardState> {

  static defaultProps = {
    ...defaultProps,
    defaultCollapsed: true,
    collapsible: false,
  }

  element: HTMLDivElement

  constructor(props: CardProps) {
    super(props)


    this.state = {
      collapsed: props.defaultCollapsed,
      formStatus: '',
    }

    this.bindElement = this.bindElement.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCollapse = this.handleCollapse.bind(this)
    this.setFormStatus = this.setFormStatus.bind(this)
  }

  getCollapsed() {
    const { collapsible, collapsed } = this.props
    if (!collapsible) return undefined
    return collapsed !== undefined ? collapsed : this.state.collapsed
  }

  setFormStatus(status: string) {
    if (status !== this.state.formStatus) {
      this.setState({ formStatus: status })
    }
  }

  bindElement(el: HTMLDivElement) {
    this.element = el
    const { forwardedRef } = this.props
    if (forwardedRef) forwardedRef(el)
  }

  handleCollapse() {
    const collapsed = !this.getCollapsed()
    if (this.props.onCollapse) this.props.onCollapse(collapsed)
    else this.setState({ collapsed })
  }

  handleSubmit(target: any) {
    const form = this.element.querySelector('form')
    if (form) dispatchEvent(form, 'submit', target)
    else console.error(new Error('No form found.'))
  }

  render() {
    const { collapsible } = this.props
    const collapsed = this.getCollapsed()
    const shadow = this.props.shadow === true ? 'shadow' : this.props.shadow
    const className = classnames(
      cardClass('_', shadow, collapsible && 'collapsible', collapsed && 'collapsed', isRTL() && 'rtl'),
      this.props.className
    )

    const provierValue: CardContextValueType = {
      onCollapse: this.handleCollapse,
      collapsible,
      collapsed,
      formStatus: this.state.formStatus,
      onSubmit: this.handleSubmit,
      setFormStatus: this.setFormStatus,
    }

    return (
      <div className={className} ref={this.bindElement} style={this.props.style}>
        <Provider value={provierValue}>{this.props.children}</Provider>
      </div>
    )
  }
}


export default compose(
  moveable(`.${cardClass('header')}, .${modalClass('method-title')}`),
  resizable
)(Card)
