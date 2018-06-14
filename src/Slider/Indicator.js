import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import draggable from '../hoc/draggable'
import { sliderClass } from '../styles'

class Indicator extends PureComponent {
  render() {
    const event = this.props.disabled ? undefined : this.props.onDragStart
    return <div onMouseDown={event} className={sliderClass('indicator')} />
  }
}

Indicator.propTypes = {
  disabled: PropTypes.bool,
  onDragStart: PropTypes.func.isRequired,
}

export default draggable(Indicator)
