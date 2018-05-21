import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import List from '../List'
import { cardClass } from '../styles'

const CollapseList = List(['collapse'], 'fast')

class Body extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    collapsed: PropTypes.bool,
    collapsible: PropTypes.bool,
    style: PropTypes.object,
  }

  render() {
    const {
      className, collapsed, collapsible, ...other
    } = this.props
    const newClassName = classnames(cardClass('body'), className)

    if (!collapsible) return <div {...other} className={newClassName} />

    return (
      <CollapseList show={!collapsed}>
        <div {...other} className={newClassName} />
      </CollapseList>
    )
  }
}

Body.propTypes = {
}

export default Body
