import React from 'react'
import { AcceptUpload, SimpleUploadProps } from './Props'

export default (Component: React.ComponentType<SimpleUploadProps<any>>) =>
  class<ValueItem> extends React.PureComponent<AcceptUpload<ValueItem>> {
    render() {
      const { forceAccept, accept } = this.props
      return <Component {...this.props} accept={forceAccept || accept} forceAccept={!!forceAccept} />
    }
  }
