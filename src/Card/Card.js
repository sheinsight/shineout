import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps, defaultProps } from '../utils/proptypes'
import { dispatchEvent } from '../utils/dom/element'
import { cardClass } from './styles'
import { Provider } from './context'
import { compose } from '../utils/func'
import resizable from '../hoc/resizable'
import moveable from '../hoc/moveable'
import { modalClass } from '../Modal/styles'
import { isRTL } from '../config'

class Card extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      collapsed: props.defaultCollapsed,
      formStatus: '',
    }

    this.forms = new Set()

    this.bindElement = this.bindElement.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCollapse = this.handleCollapse.bind(this)
    this.setFormStatus = this.setFormStatus.bind(this)
    this.addForm = this.addForm.bind(this)
    this.delForm = this.delForm.bind(this)
  }

  getCollapsed() {
    const { collapsible, collapsed } = this.props
    if (!collapsible) return undefined
    return collapsed !== undefined ? collapsed : this.state.collapsed
  }

  setFormStatus(status) {
    if (this.forms.size > 1) {
      if (this.state.formStatus !== 'overBound') {
        this.setState({
          formStatus: 'overBound',
        })
      }
      return
    }
    if (status !== this.state.formStatus) {
      this.setState({ formStatus: status })
    }
  }

  bindElement(el) {
    this.element = el
    const { forwardedRef } = this.props
    if (forwardedRef) forwardedRef(el)
  }

  handleCollapse() {
    const collapsed = !this.getCollapsed()
    if (this.props.onCollapse) this.props.onCollapse(collapsed)
    else this.setState({ collapsed })
  }

  handleSubmit(target) {
    const form = this.element.querySelector('form')
    if (form) dispatchEvent(form, 'submit', target)
    else console.error(new Error('No form found.'))
  }

  addForm(id) {
    this.forms.add(id)
  }

  delForm(id) {
    this.forms.delete(id)
  }

  render() {
    const { collapsible } = this.props
    const collapsed = this.getCollapsed()
    const shadow = this.props.shadow === true ? 'shadow' : this.props.shadow
    const className = classnames(
      cardClass('_', shadow, collapsible && 'collapsible', collapsed && 'collapsed', isRTL() && 'rtl'),
      this.props.className
    )

    const provierValue = {
      onCollapse: this.handleCollapse,
      collapsible,
      collapsed,
      formStatus: this.state.formStatus,
      onSubmit: this.handleSubmit,
      setFormStatus: this.setFormStatus,
      addForm: this.addForm,
      delForm: this.delForm,
    }

    return (
      <div className={className} ref={this.bindElement} style={this.props.style}>
        <Provider value={provierValue}>{this.props.children}</Provider>
      </div>
    )
  }
}

Card.propTypes = {
  ...getProps(PropTypes),
  shadow: PropTypes.oneOf([true, false, 'hover']),
  forwardedRef: PropTypes.func,
}

Card.defaultProps = {
  ...defaultProps,
  defaultCollapsed: true,
  collapsible: false,
}

export default compose(
  moveable(`.${cardClass('header')}, .${modalClass('method-title')}`),
  resizable
)(Card)
