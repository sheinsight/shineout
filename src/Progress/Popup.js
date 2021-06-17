import React from 'react'
import PropTypes from 'prop-types'
import { progressClass } from '../styles'

export default class Popup extends React.Component {
  getStyle() {
    const { value } = this.props
    // const rotate =
    // 60% 偏转角度最大 15度
    return { left: `${value}%` }
  }

  render() {
    return (
      <div className={progressClass('popup')} style={this.getStyle()}>
        <span className={progressClass('value')}>10%</span>
        <span className={progressClass('arrow')} />
      </div>
    )
  }
}

Popup.propTypes = {
  value: PropTypes.number,
}
