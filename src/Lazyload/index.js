import React from 'react'
import PropTypes from 'prop-types'
import { PureComponent } from '../component'
import { lazyloadClass } from '../styles'
import { addStack, removeStack } from '../utils/lazyload'

class Lazyload extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { ready: false }

    this.placeholderRef = el => {
      this.placeholder = el
    }
  }

  componentDidMount() {
    const { container, offset } = this.props
    this.lazyId = addStack({
      offset,
      container,
      element: this.placeholder,
      render: () => this.setState({ ready: true }),
    })
  }

  componentWillUnmount() {
    removeStack(this.lazyId)
  }

  render() {
    const { ready } = this.state
    const { children, placeholder } = this.props

    if (ready) return children
    return (
      <span ref={this.placeholderRef} className={lazyloadClass('_')}>
        {placeholder}
      </span>
    )
  }
}

Lazyload.propTypes = {
  children: PropTypes.any,
  placeholder: PropTypes.element,
  container: PropTypes.oneOfType([PropTypes.element, PropTypes.object]),
  offset: PropTypes.number,
}

Lazyload.defaultProps = {
  offset: 0,
}

export default Lazyload
