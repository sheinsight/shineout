import React, { PureComponent, Fragment } from 'react'
import { findDOMNode } from 'react-dom'
import immer from 'immer'
import PropTypes from 'prop-types'
import { getProps, defaultProps } from '../utils/proptypes'
import Button from '../Button'
import { dropdownClass } from '../styles'
import { FadeList } from '../List'

class Dropdown extends PureComponent {

  static getKey(data, keygen) {
    switch (typeof keygen) {
      case 'string':
        return data[keygen]
      case 'function':
        return keygen(data)
      default:
        return data.id
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      position: 'bottom-left',
      show: false,
    }

    this.bindButton = this.bindButton.bind(this)
    this.bindElement = this.bindElement.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleHover = this.handleHover.bind(this)
    this.renderList = this.renderList.bind(this)
  }

  componentWillUnmount() {
    this.isUnmounted = true
  }

  getPosition() {
    return this.props.position || this.state.position
  }

  bindButton(el) {
    this.button = findDOMNode(el)
  }

  bindElement(el) {
    this.element = el
  }

  handleFocus() {
    let f = 'bottom'
    const s = 'left'
    const height = window.innerHeight || document.documentElement.clientHeight
    const rect = this.element.getBoundingClientRect()
    if (height - rect.bottom < 200) {
      f = 'top'
    }

    if (this.closeTimer) {
      clearTimeout(this.closeTimer)
    }

    this.button.focus()
    this.setState(immer((state) => {
      state.show = true
      state.position = `${f}-${s}`
    }))
  }

  handleBlur() {
    // wait item event execute
    console.log('blur')
    this.closeTimer = setTimeout(() => {
      if (!this.isUnmounted) this.setState({ show: false, position: 'bottom-left' })
    }, 200)
  }

  handleHover() {
    const { hover } = this.props
    const { show } = this.state
    if (show || !hover) return

    this.handleFocus()
  }


  renderList(data, placeholder) {
    const {
      keygen, width, type, outline, size, disabled, btnColor, style,
    } = this.props
    if (!Array.isArray(data) || data.length === 0) return null
    const itemClassName = dropdownClass('item', !width && 'no-width')
    return (
      <Fragment>
        <Button
          disabled={disabled}
          ref={this.bindButton}
          onClick={this.handleFocus}
          onMouseEnter={this.handleHover}
          outline={outline}
          className={dropdownClass('button')}
          type={type}
          size={size}
          style={btnColor ? { ...style, color: '#000' } : style}
        >
          {placeholder}
        </Button>
        <FadeList
          className={dropdownClass('menu')}
          style={{ width }}
          show={this.state.show}
        >
          {
            data.map((d) => {
              const liKey = Dropdown.getKey(d, keygen)
              return d.children ?
                <Dropdown data={d.children} placeholder={d.content} type="link" key={liKey} position="right-top" btnColor /> :
                (<a key={liKey} className={itemClassName} href={d.url ? d.url : 'javascript:;'}>{d.content}</a>)
            })
          }
        </FadeList>
      </Fragment>
    )
  }
  render() {
    const {
      data, className, style, placeholder,
    } = this.props
    const { show } = this.state
    const position = this.getPosition()

    let wrapClassName = dropdownClass('_', position, show && 'show')
    if (className) wrapClassName += ` ${className}`

    return (
      <div ref={this.bindElement} className={wrapClassName} style={style} >
        {this.renderList(data, placeholder, -1)}
      </div>
    )
  }
}

Dropdown.propTypes = {
  ...getProps('placeholder', 'type', 'keygen'),
  data: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  hover: PropTypes.bool,
  position: PropTypes.string,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
}

Dropdown.defaultProps = {
  ...defaultProps,
  disabled: false,
  data: [],
  keygen: 'id',
}

export default Dropdown
