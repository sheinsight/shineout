import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import immer from 'immer'
import Button from '../Button'
import icons from '../icons'
import Tab from './Tab'
import { tabsClass } from '../styles'

class Header extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      left: 0,
      overflow: false,
    }

    this.bindInner = this.bindElement.bind(this, 'innerElement')
    this.bindWrapper = this.bindElement.bind(this, 'wrapperElement')
    this.bindScroll = this.bindElement.bind(this, 'scrollElement')
    this.renderTab = this.renderTab.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handlePrevClick = this.handleMove.bind(this, true)
    this.handleNextClick = this.handleMove.bind(this, false)
    this.moveToLeft = this.moveToLeft.bind(this)

    this.scrollLeft = 0
  }

  componentDidMount() {
    this.setWidth()
  }

  componentDidUpdate() {
    this.setWidth()
  }

  setWidth() {
    if (!this.innerElement) return
    const innerWidth = this.innerElement.clientWidth
    const scrollWidth = this.scrollElement.clientWidth
    const { left } = this.state
    this.setState({ overflow: scrollWidth > left + innerWidth })
  }

  bindElement(name, el) {
    this[name] = el
  }

  handleMove(lt) {
    const innerWidth = this.innerElement.clientWidth
    const scrollWidth = this.scrollElement.clientWidth
    let left = this.state.left + (lt ? -innerWidth : innerWidth)
    if (left < 0) left = 0
    if (left + innerWidth > scrollWidth) left = scrollWidth - innerWidth
    this.setState({ left })
  }

  moveToLeft({ left, right }) {
    const rect = this.innerElement.getBoundingClientRect()
    if (left < rect.left) {
      this.setState(immer((draft) => {
        draft.left -= rect.left - left
      }))
    } else if (right > rect.right) {
      this.setState(immer((draft) => {
        draft.left += right - rect.right - (draft.left === 0 ? -30 : 0)
      }))
    }
  }

  handleClick(id) {
    if (this.props.onChange) this.props.onChange(id)
  }

  renderTab({ tab, id, ...other }) {
    return (
      <Tab
        {...other}
        key={id}
        id={id}
        moveToLeft={this.moveToLeft}
        onClick={this.handleClick}
      >
        {tab}
      </Tab>
    )
  }

  renderButtons() {
    const { onChange, tabs } = this.props
    return (
      <Button.Group>
        {
          tabs.map(tab => (
            <Button
              key={tab.id}
              onClick={tab.isActive ? undefined : onChange.bind(this, tab.id)}
              className={tabsClass(tab.isActive && 'button-active')}
            >
              {tab.tab}
            </Button>
          ))
        }
      </Button.Group>
    )
  }

  renderTabs() {
    const { border, tabs } = this.props
    const { left, overflow } = this.state

    return (
      <div ref={this.bindWrapper} className={tabsClass('header')}>
        {
          left > 0 &&
          <div onClick={this.handlePrevClick} className={tabsClass('scroll-prev')}>
            {icons.AngleLeft}
          </div>
        }
        <div ref={this.bindInner} className={tabsClass('inner')}>
          <div ref={this.bindScroll} style={{ marginLeft: -left }} className={tabsClass('scroll')}>
            { tabs.map(this.renderTab) }
          </div>
        </div>
        {
          overflow &&
          <div onClick={this.handleNextClick} className={tabsClass('scroll-next')}>
            {icons.AngleRight}
          </div>
        }
        <div style={{ borderColor: border }} className={tabsClass('hr')} />
      </div>
    )
  }

  render() {
    return this.props.shape === 'button' ? this.renderButtons() : this.renderTabs()
  }
}

Header.propTypes = {
  border: PropTypes.string,
  onChange: PropTypes.func,
  shape: PropTypes.string,
  tabs: PropTypes.array,
}

export default Header
