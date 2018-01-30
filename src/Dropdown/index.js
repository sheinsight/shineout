import React, { PureComponent, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { getProps, defaultProps } from '../utils/proptypes'
import Button from '../Button'
import { dropdownClass } from '../styles'
import { FadeList } from '../List'

class Dropdown extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      show: false,
    }

    this.handleBlur = this.handleBlur.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
  }

  componentWillUnmount() {
    this.isUnmounted = true
  }

  handleFocus() {
    this.setState({ show: true })
  }

  handleBlur() {
    setTimeout(() => {
      if (!this.isUnmounted) this.setState({ show: false })
    }, 200)
  }

  renderButton() {
    const {
      placeholder, type, outline, size, href,
    } = this.props
    return (
      <Button
        onClick={this.handleFocus}
        onBlur={this.handleBlur}
        outline={outline}
        href={href}
        className={dropdownClass('button')}
        type={type}
        size={size}
      >
        {placeholder}
      </Button>
    )
  }

  render() {
    const {
      className, style, children, width, position,
    } = this.props
    const { show } = this.state

    let wrapClassName = dropdownClass('_', position, show && 'show')
    if (className) wrapClassName += ` ${className}`

    const itemClassName = dropdownClass('item', !width && 'no-width')

    return (
      <div className={wrapClassName} style={style}>
        {this.renderButton()}
        <FadeList className={dropdownClass('menu')} style={{ width }} show={show}>
          {
            Children.toArray(children).map((child, i) => {
              if (typeof child === 'string') {
                return <a key={i} className={itemClassName}>{child}</a>
              }

              if (child.type === 'hr') return child

              return cloneElement(child, { className: itemClassName })
            })
          }
        </FadeList>
      </div>
    )
  }
}

Dropdown.displayName = 'Dropdown'

Dropdown.propTypes = {
  ...getProps('placeholder', 'type'),
  children: PropTypes.any.isRequired,
  href: PropTypes.string,
  position: PropTypes.string,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
}

Dropdown.defaultProps = {
  ...defaultProps,
  position: 'bottom-left',
}

export default Dropdown
