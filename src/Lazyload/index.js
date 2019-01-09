import React from 'react'
import PropTypes from 'prop-types'
import { PureComponent } from '../component'
import { addStack, removeStack } from '../utils/lazyload'

class Lazyload extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { ready: false }

    this.placeholderRef = (el) => { this.placeholder = el }
  }


  componentDidMount() {
    this.lazyId = addStack({
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
    return <span ref={this.placeholderRef}>{placeholder}</span>
  }
}

Lazyload.propTypes = {
  children: PropTypes.any,
  placeholder: PropTypes.element,
}

export default Lazyload
