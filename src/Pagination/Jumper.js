import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { paginationClass } from '../styles'

class Jumper extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <div className={paginationClass('section')}>
        <span>缺 Input</span>
      </div>
    )
  }
}

Jumper.propTypes = {
  onChange: PropTypes.func.isRequired,
}

export default Jumper
