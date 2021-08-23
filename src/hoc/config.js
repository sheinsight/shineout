import React from 'react'
import { Component } from '../component'
import { noti } from '../config'

export default (Com, name) =>
  class extends Component {
    constructor(props) {
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
