import React from 'react'
import { PureComponent } from '../component'
import { lazyloadClass } from './styles'
import { addStack, removeStack } from '../utils/lazyload'
import { LazyloadProps } from './Props'

interface LazyloadState {
  ready: boolean
}

const DefaultProps = {
  offset: 0,
}

class Lazyload extends PureComponent<LazyloadProps, LazyloadState> {
  static defaultProps = DefaultProps

  placeholder: HTMLSpanElement

  lazyId: string | null

  constructor(props: LazyloadProps) {
    super(props)
    this.state = { ready: false }
  }

  componentDidMount() {
    const { container, offset = DefaultProps.offset } = this.props
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

  placeholderRef = (el: HTMLSpanElement) => {
    this.placeholder = el
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

export default Lazyload
