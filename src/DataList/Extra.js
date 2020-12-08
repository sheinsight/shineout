import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { listClass } from '../styles'

class Extra extends PureComponent {
  render() {
    const render = this.props.extra.map((value, index) => (
      <React.Fragment key={index}>
        {value}
        {index < this.props.extra.length - 1 ? <div className={listClass('split')} /> : null}
      </React.Fragment>
    ))

    return <div className={listClass('extra')}>{render}</div>
  }
}

Extra.propTypes = {
  extra: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
}

export default Extra
