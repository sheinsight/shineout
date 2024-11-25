import React, { Fragment } from 'react'
import classname from 'classnames'
import PropTypes from 'prop-types'
import Checkbox from '../Checkbox/Checkbox'
import { cardGroupClass } from './styles'
import Lazyload from '../Lazyload'

class Item extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isInView: true,
    }

    this.containerRef = React.createRef()
  }

  componentDidMount() {
    if (typeof window === 'undefined' || !window.IntersectionObserver || !this.containerRef.current) {
      return
    }

    if (this.props.placeholder) {
      this.observerIns = new IntersectionObserver(
        ([entry]) => {
          const inView = entry.isIntersecting
          this.setState({
            isInView: inView,
          })
        },
        {
          root: this.props.container,
          rootMargin: `${this.props.container?.offsetHeight || 0}px`,
          threshold: [0, 1],
        }
      )

      this.observerIns.observe(this.containerRef.current)
    }
  }

  componentWillUnmount() {
    if (this.observerIns) {
      this.observerIns.disconnect()
    }
  }

  observerIns = null

  handleChange(value, _, checked) {
    const { onChange } = this.props
    if (onChange) onChange(checked, value)
  }

  renderChildren(content) {
    const { placeholder, container } = this.props
    if (!placeholder) return content
    return (
      <Lazyload container={container} placeholder={placeholder} isInView={this.state.isInView}>
        {content}
      </Lazyload>
    )
  }

  render() {
    const { style, className, container, children, placeholder, value, ...others } = this.props
    const cls = classname(cardGroupClass('item'), className)
    const showCheck = others.checked !== undefined
    const content = (
      <Fragment>
        {children}
        {showCheck && (
          <Checkbox {...others} onChange={this.handleChange.bind(this, value)} className={cardGroupClass('checkbox')} />
        )}
      </Fragment>
    )

    const hiddenStyle = this.state.isInView ? undefined : { visibility: 'hidden' }
    const itemStyle = { ...style, ...hiddenStyle }

    return (
      <div style={itemStyle} className={cls} ref={this.containerRef}>
        {this.renderChildren(content)}
      </div>
    )
  }
}

Item.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  container: PropTypes.object,
  children: PropTypes.element,
  placeholder: PropTypes.element,
  onChange: PropTypes.func,
  value: PropTypes.any,
  checked: PropTypes.oneOfType([PropTypes.oneOf([true, false, 'indeterminate']), PropTypes.func]),
}

export default Item
