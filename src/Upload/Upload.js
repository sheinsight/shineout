import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import immer from 'immer'
import { getUidStr } from '../utils/uid'
import { uploadClass } from '../styles'
import defaultRequest, { ERROR, UPLOADING } from './request'
import FileInput from './FileInput'
import File from './File'
import ImageFile from './ImageFile'
import Result from './Result'
import ImageResult from './ImageResult'

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
    this.recoverValue = this.recoverValue.bind(this)

    props.validateHook(this.validate.bind(this))
  }

  getAction(file) {
    const { action } = this.props
    if (typeof action === 'string') return action
    if (typeof action === 'function') return action(file)
    return ''
  }

  bindElement(input) {
    this.input = input
  }

  handleAddClick() {
    this.input.click()
  }

  validate() {
    const { files } = this.state
    return Object.keys(files).length === 0 ? true : new Error('')
  }

  removeFile(id) {
    const file = this.state.files[id]
    if (file) {
      if (file.xhr && file.xhr.abort) file.xhr.abort()
      this.setState(immer((draft) => {
        delete draft.files[id]
      }))
    }
  }

  removeValue(index) {
    const { recoverAble } = this.props
    this.setState(immer((draft) => {
      draft.recycle.push(this.props.value[index])
      if (typeof recoverAble === 'number' && draft.recycle.length > recoverAble) {
        draft.recycle.shift()
      }
    }))
    const value = immer(this.props.value, (draft) => {
      draft.splice(index, 1)
    })
    this.props.onChange(value)
  }

  recoverValue(index, value) {
    this.props.onChange(immer(this.props.value, (draft) => {
      draft.push(value)
    }))
    this.setState(immer((draft) => {
      draft.recycle.splice(index, 1)
    }))
  }

  addFile(e) {
    const input = e.target
    const { beforeUpload, validator } = this.props
    const files = { ...this.state.files }

    Array.from({ length: input.files.length }).forEach((_, i) => {
      const blob = input.files[i]
      const id = getUidStr()
      const file = {
        name: blob.name,
        process: -1,
        status: UPLOADING,
      }

      files[id] = file
      let error = null

      if (typeof validator.size === 'function') {
        error = validator.size(blob.size)
      }

      if (typeof validator.ext === 'function') {
        const exts = blob.name.split('.')
        error = validator.ext(exts[exts.length - 1])
      }

      if (error instanceof Error) {
        file.message = error.message
        file.status = ERROR

        if (beforeUpload) {
          beforeUpload(blob).then((args) => {
            this.setState(immer((draft) => {
              draft.files[id] = Object.assign({}, draft.files[id], args)
            }))
          })
        }

        return
      }

      if (beforeUpload) {
        beforeUpload(blob).then((args) => {
          if (args.status !== ERROR) files[id].xhr = this.uploadFile(id, blob, args.data)
          this.setState(immer((draft) => {
            draft.files[id] = Object.assign({}, draft.files[id], args)
          }))
        })
      } else {
        files[id].xhr = this.uploadFile(id, blob)
      }
    })

    this.setState({ files })
  }

  uploadFile(id, file, data) {
    const {
      onSuccess, name, htmlName, cors, params, withCredentials, headers, request, onProgress,
    } = this.props

    const req = request || defaultRequest
    let throttle = false

    const options = {
      url: this.getAction(file),
      name: htmlName || name,
      cors,
      params,
      withCredentials,
      file,
      headers,

      onProgress: (e, msg) => {
        const percent = typeof e.percent === 'number' ? e.percent : (e.loaded / e.total) * 100
        if (throttle) return
        throttle = true
        setTimeout(() => { throttle = false }, 16)

        if (this.state.files[id]) {
          this.setState(immer((draft) => {
            draft.files[id].process = percent
            if (msg) draft.files[id].message = msg
          }))
        }
      },

      onLoad: (xhr) => {
        if (!/^2|1223/.test(xhr.status)) {
          this.handleError(id, xhr)
          return
        }

        let value = xhr.responseText || xhr.response
        if (onSuccess) {
          value = onSuccess(value, file, data)
        }

        if (value instanceof Error) {
          this.setState(immer((draft) => {
            draft.files[id].status = ERROR
            draft.files[id].name = file.name
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
          this.props.onChange(values)
        }
      },

      onError: xhr => this.handleError(id, xhr),
    }

    if (onProgress === false || onProgress === null) {
      delete options.onProgress
    }

    return req(options)
  }

  handleError(id, xhr) {
    const { onError } = this.props

    let message = xhr.statusText
    if (onError) message = onError(xhr)

    this.setState(immer((draft) => {
      draft.files[id].status = ERROR
      draft.files[id].message = message
    }))
  }

  renderHandle() {
    const {
      limit, value, children, accept, multiple,
    } = this.props
    const count = value.length + Object.keys(this.state.files).length
    if (limit > 0 && limit <= count) return null

    return (
      <span className={uploadClass('handle')} onClick={this.handleAddClick}>
        {children}
        <FileInput
          accept={accept}
          ref={this.bindElement}
          multiple={multiple}
          onChange={this.addFile}
        />
      </span>
    )
  }

  render() {
    const {
      limit, value, renderResult, style, imageStyle, recoverAble,
    } = this.props
    const { files, recycle } = this.state
    const className = classnames(uploadClass('_'), this.props.className)
    const FileComponent = imageStyle ? ImageFile : File
    const ResultComponent = imageStyle ? ImageResult : Result

    return (
      <div className={className} style={style}>
        { !imageStyle && this.renderHandle() }

        {
          value.map((v, i) => (
            <ResultComponent
              key={i}
              value={v}
              index={i}
              style={imageStyle}
              renderResult={renderResult}
              onRemove={this.removeValue}
            />
          ))
        }

        {
          Object.keys(files).map(id => (
            <FileComponent
              {...files[id]}
              key={id}
              id={id}
              style={imageStyle}
              onRemove={this.removeFile}
            />
          ))
        }

        { imageStyle && this.renderHandle() }

        {
          recoverAble && recycle.map((v, i) => (
            <ResultComponent
              key={i}
              value={v}
              index={i}
              renderResult={renderResult}
              recoverAble={!!recoverAble}
              showRecover={recoverAble && limit > value.length}
              onRecover={this.recoverValue}
              style={imageStyle}
            />
          ))
        }
      </div>
    )
  }
}

Upload.propTypes = {
  accept: PropTypes.string,
  action: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  beforeUpload: PropTypes.func,
  children: PropTypes.any,
  className: PropTypes.string,
  cors: PropTypes.bool,
  imageStyle: PropTypes.object,
  headers: PropTypes.object,
  htmlName: PropTypes.string,
  limit: PropTypes.number,
  multiple: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onProgress: PropTypes.bool,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  params: PropTypes.object,
  recoverAble: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]),
  renderResult: PropTypes.func,
  request: PropTypes.func,
  validateHook: PropTypes.func,
  validator: PropTypes.object,
  value: PropTypes.array,
  style: PropTypes.object,
  withCredentials: PropTypes.bool,
}

Upload.defaultProps = {
  cors: false,
  limit: 100,
  recoverAble: false,
  validator: {},
  value: [],
  withCredentials: false,
}

export default Upload
