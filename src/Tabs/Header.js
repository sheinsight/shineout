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
      attribute: 0,
      overflow: false,
    }

    this.setPosition = this.setPosition.bind(this)
    this.bindInner = this.bindElement.bind(this, 'innerElement')
    this.bindWrapper = this.bindElement.bind(this, 'wrapperElement')
    this.bindScroll = this.bindElement.bind(this, 'scrollElement')
    this.renderTab = this.renderTab.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handlePrevClick = this.handleMove.bind(this, true)
    this.handleNextClick = this.handleMove.bind(this, false)
    this.moveToCenter = this.moveToCenter.bind(this)
    this.handleCollapse = this.handleCollapse.bind(this)
  }

  componentDidMount() {
    const { isVertical } = this.props
    this.setPosition(isVertical)
  }

  componentDidUpdate() {
    const { isVertical } = this.props
    this.setPosition(isVertical)
  }

  setPosition(isVertical) {
    const attributeString = isVertical ? 'Height' : 'Width'
    if (!this.innerElement) return
    const innerAttribute = this.innerElement[`client${attributeString}`]
    const scrollAttribute = this.scrollElement[`client${attributeString}`]
    const { attribute: domAttribute } = this.state
    this.setState({ overflow: scrollAttribute > domAttribute + innerAttribute, attributeString })
  }

  bindElement(name, el) {
    this[name] = el
  }

  handleMove(lt) {
    const { attributeString } = this.state
    const innerAttribute = this.innerElement[`client${attributeString}`]
    const scrollAttribute = this.scrollElement[`client${attributeString}`]
    let attribute = this.state.attribute + (lt ? -innerAttribute : innerAttribute)
    if (attribute < 0) attribute = 0
    if (attribute + innerAttribute > scrollAttribute) attribute = scrollAttribute - innerAttribute
    this.setState({ attribute })
  }

  moveToCenter(tabRect) {
    const { isVertical } = this.props
    const positions = isVertical ? ['top', 'bottom'] : ['left', 'right']
    const rect = this.innerElement.getBoundingClientRect()
    if (tabRect[positions[0]] < rect[positions[0]]) {
      this.setState(immer((draft) => {
        draft.attribute -= rect[positions[0]] - tabRect[positions[0]]
      }))
    } else if (tabRect[positions[1]] > rect[positions[1]]) {
      this.setState(immer((draft) => {
        draft.attribute += tabRect[positions[1]] - rect[positions[1]] - (draft.attribute === 0 ? -30 : 0)
      }))
    }
  }

  handleClick(id, isActive) {
    if (!isActive) {
      if (this.props.onChange) this.props.onChange(id)
      this.ignoreNextCollapse = true
      setTimeout(() => this.handleCollapse(false), 200)
    }
  }

  handleCollapse(e) {
    const { onCollapse, collapsed } = this.props
    if (!onCollapse) return

    if (typeof e === 'boolean') {
      onCollapse(e)
      return
    }

    if (this.ignoreNextCollapse) {
      this.ignoreNextCollapse = false
      return
    }

    onCollapse(!collapsed)
  }

  renderTab({ tab, id, ...other }) {
    return (
      <Tab
        {...other}
        key={id}
        id={id}
        moveToCenter={this.moveToCenter}
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
    const {
      border, onCollapse, collapsed, tabs,
      isVertical,
    } = this.props
    const { attribute, overflow } = this.state

    const position = isVertical ? 'Top' : 'Left'

    return (
      <div ref={this.bindWrapper} onClick={this.handleCollapse} className={tabsClass('header')}>
        {
          onCollapse &&
          <span className={tabsClass('indicator', collapsed && 'collapsed')}>{icons.AngleRight}</span>
        }
        {
          attribute > 0 &&
          <div onClick={this.handlePrevClick} className={tabsClass('scroll-prev')}>
            {icons.AngleLeft}
          </div>
        }
        <div ref={this.bindInner} className={tabsClass('inner')}>
          <div ref={this.bindScroll} style={{ [`margin${position}`]: -attribute }} className={tabsClass('scroll')}>
            { tabs.map(this.renderTab) }
          </div>
        </div>
        {
          overflow &&
          <div onClick={this.handleNextClick} className={tabsClass('scroll-next')}>
            {isVertical ? icons.AngleRight : icons.AngleRight}
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
  collapsed: PropTypes.bool,
  onChange: PropTypes.func,
  onCollapse: PropTypes.func,
  shape: PropTypes.string,
  tabs: PropTypes.array,
}

export default Header
