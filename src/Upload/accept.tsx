import React from 'react'
import PropTypes from 'prop-types'
import { AcceptUpload, SimpleUploadProps } from './Props'

export default (Component: React.ComponentType<SimpleUploadProps<any>>) =>
  class<ValueItem> extends React.PureComponent<AcceptUpload<ValueItem>> {
    static propTypes = {
      accept: PropTypes.string,
      forceAccept: PropTypes.string,
    }

    render() {
      const { forceAccept, accept } = this.props
      return <Component {...this.props} accept={forceAccept || accept} forceAccept={!!forceAccept} />
    }
  }
