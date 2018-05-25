import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps } from '../utils/proptypes'
import { treeClass } from '../styles'

class Root extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const className = classnames(
      treeClass('_'),
      this.props.className,
    )

    return (
      <div className={className} />
    )
  }
}

Root.propTypes = {
  ...getProps(['keygen']),
  data: PropTypes.array,
}

export default Root
