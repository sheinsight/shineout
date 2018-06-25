import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import immer from 'immer'
import { getUidStr } from '../utils/uid'
import { SUCCESS, ERROR, UPLOADING } from './ajax'

export default function (Origin) {
  return class extends PureComponent {
    static propTypes = {
      validator: PropTypes.object,
    }

    static defaultProps = {
      validator: {},
    }

    constructor(props) {
      super(props)

      this.state = { files: {} }

      this.addFile = this.addFile.bind(this)
    }

    addFile(input, handle) {
      const { validator } = this.props
      const files = { ...this.state.files }

      console.log(typeof input.files)
      console.log(input.files, validator, files, handle)

      Array.from({ length: input.files.length }).forEach((_, i) => {
        const blob = input.files[i]
        const id = getUidStr()
        const file = {
          name: blob.name,
          process: 0,
          status: UPLOADING,
        }

        files[id] = file

        if (typeof validator.size === 'function') {
          const res = validator.size(blob.size)
          if (res instanceof Error) {
            file.message = res.message
            file.name = res.message
            file.status = ERROR
            return
          }
        }

        if (handle) {
          handle(file, blob, (f) => {
            if (f.status !== ERROR) {
              f.xhr = this.uploadFile(id, blob)
            }
            this.setState((draft) => {
              draft[id] = f
            })
          })
        }
      })

      this.setState({ files })
    }

    uploadFile(id, file) {

    }

    render() {
      return (
        <Origin
          {...this.props}
          onFileAdd={this.addFile}
        />
      )
    }
  }
}
