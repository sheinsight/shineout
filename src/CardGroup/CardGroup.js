import React from 'react'
import PropTypes from 'prop-types'
import classname from 'classnames'
import { cardGroupClass } from '../styles'
import { PureComponent } from '../component'
import { Provider } from './context'

class CardGroup extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      scroller: undefined,
    }
    this.bindScroller = this.bindScroller.bind(this)
  }

  get templateColumns() {
    const { columns, cardWidth, cardMaxWidth } = this.props
    if (cardWidth === undefined && cardMaxWidth === undefined) {
      return `repeat(${columns}, 1fr)`
    }
    const min = cardWidth !== undefined ? `${cardWidth}px` : 'auto'
    const max = cardMaxWidth !== undefined ? `${cardMaxWidth}px` : '1fr'
    return `repeat(auto-fit, minmax(${min}, ${max}))`
  }

  bindScroller(ref) {
    const { scroller } = this.state
    if (scroller || !ref) return
    this.setState({
      scroller: ref,
    })
  }

  renderBody() {
    const { cardWidth, columns, children, gap, ...other } = this.props
    const { scroller } = this.state
    if (!children) return children
    const context = {
      container: scroller,
    }
    const gridStyle = {
      gridRowGap: gap,
      gridColumnGap: gap,
      ...other.gridStyle,
      gridTemplateColumns: this.templateColumns,
    }
    return (
      <Provider value={context}>
        <div className={cardGroupClass('scroller')} ref={this.bindScroller}>
          <div style={gridStyle} className={cardGroupClass('grid')}>
            {scroller && children}
          </div>
        </div>
      </Provider>
    )
  }

  render() {
    const { height, style, className } = this.props
    const cls = classname(cardGroupClass('_'), className)
    const groupStyle = {
      height,
      ...style,
    }
    return (
      <div style={groupStyle} className={cls}>
        {this.renderBody()}
      </div>
    )
  }
}

CardGroup.defaultProps = {
  columns: 3,
  gap: 16,
}

CardGroup.propTypes = {
  style: PropTypes.object,
  children: PropTypes.array,
  className: PropTypes.string,
  height: PropTypes.number,
  cardWidth: PropTypes.number,
  cardMaxWidth: PropTypes.number,
  columns: PropTypes.number,
  gridStyle: PropTypes.object,
  gap: PropTypes.number,
}

export default CardGroup
