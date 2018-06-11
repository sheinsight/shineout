import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import draggable from '../hoc/draggable'
import { sliderClass } from '../styles'

class Indicator extends PureComponent {
  render() {
    return (
      <div
        onMouseDown={this.props.onDragStart}
        className={sliderClass('indicator')}
      />
    )
  }
}

Indicator.propTypes = {
  onDragStart: PropTypes.func.isRequired,
}

export default draggable(Indicator)
