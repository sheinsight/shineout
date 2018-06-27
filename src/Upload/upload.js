import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import immer from 'immer'
import { getUidStr } from '../utils/uid'
import ajax, { ERROR, UPLOADING } from './ajax'
import FileInput from './FileInput'
import File from './File'
import Value from './Value'

class Upload extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      files: {},
      recycle: [],
    }

    this.addFile = this.addFile.bind(this)
    this.bindElement = this.bindElement.bind(this)
    this.handleAddClick = this.handleAddClick.bind(this)
    this.removeFile = this.removeFile.bind(this)
    this.removeValue = this.removeValue.bind(this)
  }

  bindElement(input) {
    this.input = input
  }

  handleAddClick() {
    this.input.click()
  }

  removeFile(id) {
    const file = this.state.files[id]
    if (file) {
      file.xhr.abort()
      this.setState(immer((draft) => {
        delete draft.files[id]
      }))
    }
  }

  removeValue(index) {
    const value = immer(this.props.value, (draft) => {
      draft.splice(index, 1)
    })
    this.props.onChange(value)
  }

  addFile(e) {
    const input = e.target
    const { image, validator } = this.props
    const files = { ...this.state.files }

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

      if (image) {
        files[id].xhr = this.uploadImage(id, file, blob)
      } else {
        files[id].xhr = this.uploadFile(id, blob)
      }
    })

    this.setState({ files })
  }

  uploadImage() {
  }

  uploadFile(id, file) {
    const {
      onUpload, action, name, htmlName, cors, params, withCredentials,
    } = this.props
    return ajax({
      url: action,
      name: htmlName || name,
      cors,
      params,
      withCredentials,
      file,

      onProgress: (e) => {
        const percentage = (e.loaded / e.total) * 100

        this.setState(immer((draft) => {
          draft.files[id].process = percentage
        }))
      },

      onLoad: (e) => {
        let value = e.currentTarget.responseText
        if (onUpload) {
          value = onUpload(value)
        }

        if (value instanceof Error) {
          this.setState(immer((draft) => {
            draft.files[id].status = ERROR
            draft.files[id].name = value.message
            draft.files[id].message = value.message
          }))
        } else {
          this.setState(immer((draft) => {
            delete draft.files[id]
          }))
          // add value
          const values = immer(this.props.value, (draft) => {
            draft.push(value)
          })
          console.log(values)
          this.props.onChange(values)
        }
      },

      onError: () => {
        this.setState(immer((draft) => {
          draft.files[id].status = ERROR
          draft.files[id].message = 'upload fail.'
        }))
      },
    })
  }

  render() {
    const { children, value, renderResult } = this.props
    const { files } = this.state

    return (
      <div>
        <span onClick={this.handleAddClick}>
          {children}
          <FileInput ref={this.bindElement} onChange={this.addFile} />
        </span>

        {
          value.map((v, i) => (
            <Value
              key={i}
              value={v}
              index={i}
              renderResult={renderResult}
              onRemove={this.removeValue}
            />
          ))
        }

        {
          Object.keys(files).map(id => (
            <File {...files[id]} key={id} id={id} onRemove={this.removeFile} />
          ))
        }
      </div>
    )
  }
}

Upload.propTypes = {
  action: PropTypes.string.isRequired,
  children: PropTypes.any,
  cors: PropTypes.bool,
  image: PropTypes.bool,
  htmlName: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onUpload: PropTypes.func,
  params: PropTypes.object,
  renderResult: PropTypes.func,
  validator: PropTypes.object,
  value: PropTypes.array,
  withCredentials: PropTypes.bool,
}

Upload.defaultProps = {
  cors: false,
  validator: {},
  value: [],
  withCredentials: false,
}

export default Upload
