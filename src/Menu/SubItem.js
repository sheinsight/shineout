import React, { Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import PureComponent from '../PureComponent'
import { menuClass } from '../styles'
import { getProps, defaultProps } from '../utils/proptypes'
import List from '../List'

const CollapseList = List('collapse', 'fast')
const FadeList = List('fade', 'fast')

class SubMenu extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      show: this.props.isOpen && !this.props.data.disabled,
    }
    this.handleClick = this.handleClick.bind(this)
    this.getTitleHeight = this.getTitleHeight.bind(this)
    this.handleEnter = this.handleEnter.bind(this)
    this.handleLeave = this.handleLeave.bind(this)
    this.bindRef = this.bindRef.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleHide = this.handleHide.bind(this)

    this.titleHeight = 0
  }

  getTitleHeight(ref) {
    this.titleHeight = ref && ref.offsetHeight
  }

  bindRef(ev) {
    this.ref = findDOMNode(ev)
  }

  handleBlur(e) {
    if (this.props.mode !== 'vertical') return
    this.handleHide(e)
  }

  handleHide(e) {
    const { parentNode } = e.currentTarget
    if (parentNode.parentNode.contains(e.relatedTarget)) return
    this.closeTimer = setTimeout(() => {
      this.setState({ show: false })
    }, 200)
    if (this.props.handleHide) this.props.handleHide(e)
  }

  handleClick() {
    if (this.props.data.disabled) return
    if (this.props.data.onClick) {
      if (typeof this.props.data.onClick === 'function') this.props.data.onClick(this.props.data)
      else this.props.onClick(this.props.data)
    }
    if (this.props.mode === 'horizontal') return
    if (this.props.mode === 'vertical') {
      this.ref.focus()
    }
    this.setState({
      show: !this.state.show,
    })
  }

  handleEnter() {
    if (this.props.mode !== 'horizontal' && !this.props.isHover) return
    this.setState({
      show: true,
    })
  }

  handleLeave() {
    if (this.props.mode !== 'horizontal' && !this.props.isHover) return
    this.setState({
      show: false,
    })
  }

  render() {
    const {
      data, renderItem, mode, active,
    } = this.props

    const children = Children.toArray(this.props.children)

    const itemData = typeof renderItem === 'string' ? data[renderItem] : renderItem(data)
    const className = menuClass(
      'submenu',
      data.disabled && 'disabled',
      children.length > 0 && 'has-children',
      this.state.show && active && data.onClick && 'submenu-active',
    )
    const ListStyle = mode === 'inline' ? CollapseList : FadeList

    return (
      <li className={className} onMouseEnter={this.handleEnter} onMouseLeave={this.handleLeave}>
        <div
          ref={this.getTitleHeight}
          className={menuClass('submenu-title')}
        >
          <div
            tabIndex={-1}
            className={menuClass('submenu-text')}
            ref={this.bindRef}
            onClick={this.handleClick}
            onBlur={this.handleBlur}
          >
            {itemData}
          </div>
        </div>
        {
          children.length > 0 &&
          <ListStyle
            show={this.state.show}
            className={menuClass('submenu-ul')}
            height={this.titleHeight * this.props.nums}
          >
            <ul>
              {
                children.map(child => (
                  cloneElement(child, { handleHide: this.handleHide })
                ))
              }
            </ul>
          </ListStyle>
        }
      </li>
    )
  }
}

SubMenu.propTypes = {
  ...getProps(PropTypes),
  data: PropTypes.object,
  level: PropTypes.number,
  isHover: PropTypes.bool,
  isOpen: PropTypes.bool,
  nums: PropTypes.number,
}

SubMenu.defaultProps = {
  ...defaultProps,
  data: {},
  isOpen: false,
}

export default SubMenu
