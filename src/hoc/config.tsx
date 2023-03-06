import React from 'react'
import { noti } from '../config'

export default <U extends any>(Com: React.ComponentType<U>, name: string) =>
  class extends React.Component<U, any> {
    handleUpdate: () => void

    constructor(props: U) {
      super(props)
      this.handleUpdate = this.forceUpdate.bind(this)
      noti.subscribe(name, this.handleUpdate)
    }

    componentWillUnmount() {
      noti.unsubscribe(name, this.handleUpdate)
    }

    render() {
      return <Com {...this.props} />
    }
  }
