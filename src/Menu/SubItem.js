import React from 'react'
import PropTypes from 'prop-types'
import classname from 'classnames'
import { findDOMNode } from 'react-dom'
import { menuClass } from '../styles'
import { getProps, defaultProps } from '../utils/proptypes'
import List from '../List'

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
  }
  getTitleHeight(ref) {
    this.titleHeight = ref && ref.offsetHeight
  }
  bindRef(ev) {
    this.ref = findDOMNode(ev)
  }
  handleBlur(e) {
    const { parentNode } = e.currentTarget
    if (parentNode.parentNode.contains(e.relatedTarget)) return
    this.setState({
      show: false,
    })
  }
  handleClick() {
    if (this.props.data.disabled) return
    if (this.props.mode === 'horizontal') return
    if (this.props.mode === 'vertical') {
      this.ref.focus()
    }
    this.setState({
      show: !this.state.show,
    })
  }
  handleEnter() {
    if (this.props.mode !== 'horizontal') return
    this.setState({
      show: true,
    })
  }
  handleLeave() {
    if (this.props.mode !== 'horizontal') return
    this.setState({
      show: false,
    })
  }
  render() {
    const {
      data, itemRender, inlineIndent, mode,
    } = this.props
    const itemData = typeof itemRender === 'string' ? data[itemRender] : itemRender(data)
    const className = classname(menuClass('submenu'))
    const titleClassName = classname(menuClass('submenu-title', `${mode}-submenu-title`, this.state.show && 'submenu-title-open', this.props.data.disabled && 'disabled'))
    const ulClassName = classname(menuClass('submenu-ul'))
    const ListStyle = mode === 'inline' ? List.Collapse : List.Fade
    return (
      <li className={className} onMouseEnter={this.handleEnter} onMouseLeave={this.handleLeave}>
        <div
          ref={this.getTitleHeight}
          className={titleClassName}
          style={mode === 'inline' ? { paddingLeft: inlineIndent } : {}}
        >
          <a
            tabIndex={1}
            ref={this.bindRef}
            style={aStyle}
            onClick={this.handleClick}
            onBlur={this.handleBlur}
          >{itemData}
          </a>
        </div>
        <ListStyle
          show={this.state.show}
          className={ulClassName}
          height={this.titleHeight * this.props.nums}
        >
          <ul>
            {
              this.props.children
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
}

SubMenu.defaultProps = {
  ...defaultProps,
  data: {},
  isOpen: false,
}

export default SubMenu