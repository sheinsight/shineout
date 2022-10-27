import React from 'react'
import classname from 'classnames'
import { cardGroupClass } from './styles'
import { PureComponent } from '../component'
import { Provider } from "./context"
import {CardGroupProps} from './Props'

interface CardGroupState {
  scroller?: HTMLDivElement
}

class CardGroup extends PureComponent<CardGroupProps, CardGroupState> {

  static defaultProps = {
    columns: 3,
    gap: 16,
  }

  constructor(props: CardGroupProps) {
    super(props)
    this.state = {
      scroller: undefined,
    }
    this.bindScroller = this.bindScroller.bind(this)
  }

  getGap() {
    // @ts-ignore gap 属性以被重命名了
    const { gap, gutter } = this.props
    if (gutter !== undefined) return gutter
    return gap
  }

  bindScroller(ref: HTMLDivElement) {
    const { scroller } = this.state
    if (scroller || !ref) return
    this.setState({
      scroller: ref,
    })
  }

  renderBody() {
    const { cardWidth, columns, children, ...other } = this.props
    const { scroller } = this.state
    if (!children) return children
    const gap = this.getGap()
    const context = {
      container: scroller,
    }
    const gridStyle = {
      gridRowGap: gap,
      gridColumnGap: gap,
      ...other.gridStyle,
      gridTemplateColumns:
        cardWidth !== undefined ? `repeat(auto-fill, minmax(${cardWidth}px, 1fr))` : `repeat(${columns}, 1fr)`,
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

export default CardGroup
