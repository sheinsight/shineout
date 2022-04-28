import React from 'react'
import PropTypes from 'prop-types'
import { compareColumns } from 'shineout/utils/shallowEqual'

class EmptyDom extends React.PureComponent {
  componentDidMount() {
    if (this.props.onEmptyRender) {
      this.props.onEmptyRender()
    }
  }

  componentDidUpdate(prevProps) {
    if (!compareColumns(prevProps.columns, this.props.columns)) {
      setTimeout(() => {
        this.props.onEmptyRender()
      })
    }
  }

  render() {
    return <div />
  }
}
EmptyDom.propTypes = {
  onEmptyRender: PropTypes.func,
  columns: PropTypes.any,
}

export default EmptyDom
