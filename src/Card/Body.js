import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import List from '../AnimationList'
import { cardClass } from '../styles'

const CollapseList = List(['collapse'], 'fast')

class Body extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    collapsed: PropTypes.bool,
    collapsible: PropTypes.bool,
    style: PropTypes.object,
    onCollapse: PropTypes.func,
  }

  render() {
    const {
      className, collapsed, collapsible, onCollapse, ...other
    } = this.props
    const newClassName = classnames(cardClass('body'), className)

    if (!collapsible) return <div {...other} className={newClassName} />

    const onClick = typeof collapsed === 'boolean' ? onCollapse : undefined
    return (
      <CollapseList show={!collapsed}>
        <div {...other} className={newClassName}>
          {other.children}
          {collapsible === 'bottom' && (
            <div className={cardClass('foldup')} onClick={onClick}>
              <span />
            </div>
          )}
        </div>
      </CollapseList>
    )
  }
}

Body.propTypes = {
}

export default Body
