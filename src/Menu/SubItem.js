import React, { Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import classname from 'classnames'
import { findDOMNode } from 'react-dom'
import { menuClass } from '../styles'
import { getProps, defaultProps } from '../utils/proptypes'
import List from '../List'

const CollapseList = List('collapse')
const FadeList = List('fade')

const aStyle = { display: 'block', width: '100%' }

class SubMenu extends React.Component {
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
      if (!this.isUnmounted) this.setState({ show: false })
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
      data, renderItem, inlineIndent, mode,
    } = this.props

    const itemData = typeof renderItem === 'string' ? data[renderItem] : renderItem(data)
    const className = classname(menuClass('submenu'))
    const titleClassName = classname(menuClass('submenu-title', `${mode}-submenu-title`, this.state.show && `${mode}-submenu-title-open`, this.props.data.disabled && 'disabled'))
    const ulClassName = classname(menuClass('submenu-ul', `${mode}-submenu-ul`))
    const ListStyle = mode === 'inline' ? CollapseList : FadeList

    return (
      <li className={className} onMouseEnter={this.handleEnter} onMouseLeave={this.handleLeave}>
        <div
          ref={this.getTitleHeight}
          className={titleClassName}
          style={mode === 'inline' ? { paddingLeft: inlineIndent } : {}}
        >
          <a
            tabIndex={0}
            href="javascript:;"
            ref={this.bindRef}
            style={aStyle}
            onClick={this.handleClick}
            onBlur={this.handleBlur}
          >
            {itemData}
          </a>
        </div>
        <ListStyle
          show={this.state.show}
          className={ulClassName}
          height={this.titleHeight * this.props.nums}
        >
          <ul>
            {
              Children.toArray(this.props.children).map(child => (
                cloneElement(child, { handleHide: this.handleHide })
              ))
            }
          </ul>
        </ListStyle>
      </li>
    )
  }
}

SubMenu.propTypes = {
  ...getProps(),
  data: PropTypes.object,
  nums: PropTypes.number,
  isOpen: PropTypes.bool,
  isHover: PropTypes.bool,
}

SubMenu.defaultProps = {
  ...defaultProps,
  data: {},
  isOpen: false,
}

export default SubMenu
