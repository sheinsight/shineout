import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps, defaultProps } from '../utils/proptypes'
import { dispatchEvent } from '../utils/dom/element'
import { cardClass } from '../styles'
import { Provider } from './context'

class Card extends PureComponent {
  constructor(props) {
    super(props)

    this.bindElement = this.bindElement.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  bindElement(el) {
    this.element = el
  }

  handleSubmit() {
    const form = this.element.querySelector('form')
    if (form) dispatchEvent(form, 'submit')
    else console.error('No form found.')
  }

  render() {
    const shadow = this.props.shadow === true ? 'shadow' : this.props.shadow
    const className = classnames(
      cardClass('_', shadow),
      this.props.className,
    )

    return (
      <div className={className} ref={this.bindElement} style={this.props.style}>
        <Provider value={this.handleSubmit}>
          {this.props.children}
        </Provider>
      </div>
    )
  }
}

Card.propTypes = {
  ...getProps(),
  shadow: PropTypes.oneOf([true, false, 'hover']),
}

Card.defaultProps = {
  ...defaultProps,
}

export default Card
