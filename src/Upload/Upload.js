import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import immer from 'immer'
import { PureComponent } from '../component'
import { getUidStr } from '../utils/uid'
import { FormError } from '../utils/errors'
import { uploadClass } from '../styles'
import defaultRequest, { ERROR, UPLOADING } from './request'
import FileInput from './FileInput'
import File from './File'
import ImageFile from './ImageFile'
import Result from './Result'
import ImageResult from './ImageResult'
import { Provider } from './context'
import Drop from './Drop'
import attrAccept from '../utils/accept'
import { getLocale } from '../locale'
import acceptHOC from './accept'
import getDataset from '../utils/dom/getDataset'

const VALIDATORITEMS = [
  { key: 'size', param: blob => blob.size },
  {
    key: 'ext',
    param: blob => {
      const exts = blob.name.split('.')
      return exts[exts.length - 1]
    },
  },
  { key: 'customValidator', param: blob => blob },
]

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
    this.validatorHandle = this.validatorHandle.bind(this)
    this.useValidator = this.useValidator.bind(this)
    this.handleFileDrop = this.handleFileDrop.bind(this)
    this.handleReplace = this.handleReplace.bind(this)

    props.validateHook(this.validate.bind(this))
  }

  getAction(file) {
    const { action } = this.props
    if (typeof action === 'string') return action
    if (typeof action === 'function') return action(file)
    return ''
  }

  validatorHandle(error, file) {
    const { validatorHandle: vth } = this.props

    if (typeof vth === 'function') return vth(error, file)

    return vth
  }

  bindElement(input) {
    this.input = input
  }

  handleAddClick() {
    const { disabled } = this.props
    if (disabled) return
    this.input.click()
  }

  validate() {
    const { files } = this.state
    return new Promise((resolve, reject) => {
      if (Object.keys(files).length > 0) reject(new FormError(''))
      resolve(true)
    })
  }

  removeFile(id) {
    const { onErrorRemove } = this.props
    const file = this.state.files[id]

    if (file) {
      if (file.xhr && file.xhr.abort) file.xhr.abort()
      this.setState(
        immer(draft => {
          delete draft.files[id]
        }),
        () => {
          if (file.status === ERROR && onErrorRemove) {
            onErrorRemove(file.xhr, file.blob, file)
          }
        }
      )
    }
  }

  removeValue(index) {
    const { recoverAble, disabled } = this.props
    if (disabled) return
    this.setState(
      immer(draft => {
        draft.recycle.push(this.props.value[index])
        if (typeof recoverAble === 'number' && draft.recycle.length > recoverAble) {
          draft.recycle.shift()
        }
      })
    )
    const value = immer(this.props.value, draft => {
      draft.splice(index, 1)
    })
    this.props.onChange(value)
  }

  recoverValue(index, value) {
    const { disabled } = this.props
    if (disabled) return
    this.props.onChange(
      immer(this.props.value, draft => {
        draft.push(value)
      })
    )
    this.setState(
      immer(draft => {
        draft.recycle.splice(index, 1)
      })
    )
  }

  useValidator(blob) {
    const { validator, accept, forceAccept } = this.props
    const { files } = this.state
    let error = null
    let i = 0

    if (forceAccept) {
      const acceptRes = attrAccept(blob, accept)
      if (!acceptRes) return new Error(getLocale('invalidAccept'))
    }

    while (VALIDATORITEMS[i]) {
      const item = VALIDATORITEMS[i]
      if (typeof validator[item.key] === 'function') {
        error = validator[item.key](item.param(blob), files)
        if (error instanceof Error) return error
      }
      i += 1
    }

    return null
  }

  addFile(e) {
    const { beforeUpload, value, limit, filesFilter } = this.props
    // eslint-disable-next-line
    const files = { ...this.state.files }
    let fileList = e.fromDragger && e.files ? e.files : e.target.files
    if (filesFilter) fileList = filesFilter(Array.from(fileList))
    const addLength = limit - value.length - Object.keys(this.state.files).length
    if (addLength <= 0) return
    Array.from({ length: Math.min(fileList.length, addLength) }).forEach((_, i) => {
      const blob = fileList[i]
      const id = getUidStr()
      const file = {
        name: blob.name,
        process: -1,
        status: UPLOADING,
        blob,
      }

      files[id] = file
      const error = this.useValidator(blob)

      if (error instanceof Error) {
        if (!this.validatorHandle(error, file.blob)) {
          delete files[id]
          return
        }

        file.message = error.message
        file.status = ERROR

        if (beforeUpload) {
          beforeUpload(blob, this.validatorHandle)
            .then(args => {
              this.setState(
                immer(draft => {
                  draft.files[id] = Object.assign({}, draft.files[id], args)
                })
              )
            })
            .catch(() => true)
        }

        return
      }

      if (beforeUpload) {
        beforeUpload(blob, this.validatorHandle)
          .then(args => {
            if (args.status !== ERROR) files[id].xhr = this.uploadFile(id, blob, args.data)
            this.setState(
              immer(draft => {
                draft.files[id] = Object.assign({}, draft.files[id], args)
              })
            )
          })
          .catch(() => {
            this.setState(
              immer(draft => {
                delete draft.files[id]
              })
            )
          })
      } else {
        files[id].xhr = this.uploadFile(id, blob)
      }
    })

    this.setState({ files })
  }

  uploadFile(id, file, data) {
    const {
      onSuccess,
      name,
      htmlName,
      cors,
      params,
      withCredentials,
      headers,
      request,
      onProgress,
      onStart,
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

      onStart,

      onProgress: (e, msg) => {
        const percent = typeof e.percent === 'number' ? e.percent : (e.loaded / e.total) * 100
        if (throttle) return
        throttle = true
        setTimeout(() => {
          throttle = false
        }, 16)

        if (this.state.files[id]) {
          this.setState(
            immer(draft => {
              draft.files[id].process = percent
              if (msg) draft.files[id].message = msg
            }),
            // expose the file progress to Upload.Button
            () => {
              if (typeof onProgress === 'function') {
                onProgress(this.state.files[id])
              }
            }
          )
        }
      },

      onSuccess,

      onLoad: xhr => {
        if (!/^2|1223/.test(xhr.status)) {
          this.handleError(id, xhr, file)
          return
        }

        let value
        if (xhr.responseType === 'text' || !xhr.responseType) value = xhr.responseText
        if (!value) value = xhr.response

        if (onSuccess) {
          value = onSuccess(value, file, data, xhr)
        }

        if (value instanceof Error) {
          this.setState(
            immer(draft => {
              draft.files[id].status = ERROR
              draft.files[id].name = file.name
              draft.files[id].message = value.message
            })
          )
        } else {
          this.setState(
            immer(draft => {
              delete draft.files[id]
            })
          )
          // add value
          const values = immer(this.props.value, draft => {
            draft.push(value)
          })
          this.props.onChange(values)
        }
      },

      onError: xhr => this.handleError(id, xhr, file),
    }
    if (onProgress === false || onProgress === null) {
      delete options.onProgress
    }

    return req(options)
  }

  handleFileDrop(files) {
    this.addFile({ files, fromDragger: true })
  }

  handleReplace(files, index) {
    this.removeValue(index)
    setTimeout(() => {
      this.addFile({ files, fromDragger: true })
    })
  }

  handleError(id, xhr, file) {
    const { onError, onHttpError } = this.props

    let message = xhr.statusText
    if (onError) message = onError(xhr, file)
    if (onHttpError) message = onHttpError(xhr, file) || message

    this.setState(
      immer(draft => {
        draft.files[id].status = ERROR
        draft.files[id].message = message
      })
    )
  }

  renderHandle() {
    const { limit, value, children, accept, multiple, disabled, webkitdirectory, drop } = this.props
    const count = value.length + Object.keys(this.state.files).length
    if (limit > 0 && limit <= count) return null

    const dragProps = {
      multiple,
      addFile: this.addFile,
      accept,
      disabled,
      limit,
    }

    return (
      <Drop
        drop={drop}
        accept={accept}
        disabled={disabled}
        onDrop={this.handleFileDrop}
        multiple={multiple || limit > 1}
      >
        <span className={uploadClass('handle')} onClick={this.handleAddClick}>
          <Provider value={dragProps}>{children}</Provider>
          <FileInput
            webkitdirectory={webkitdirectory}
            accept={accept}
            ref={this.bindElement}
            multiple={multiple}
            onChange={this.addFile}
          />
        </span>
      </Drop>
    )
  }

  render() {
    const {
      limit,
      value,
      renderResult,
      style,
      imageStyle,
      recoverAble,
      showUploadList,
      customResult: CustomResult,
      disabled,
      renderContent,
      accept,
      drop,
      leftHandler,
      onPreview,
    } = this.props
    const { files, recycle } = this.state
    const className = classnames(
      uploadClass('_', disabled && 'disabled', showUploadList === false && 'hide-list'),
      this.props.className
    )
    const FileComponent = imageStyle ? ImageFile : File
    const ResultComponent = imageStyle ? ImageResult : Result

    if (CustomResult) {
      return (
        <div className={className} style={style}>
          {this.renderHandle()}
          <CustomResult value={value} files={files} onValueRemove={this.removeValue} onFileRemove={this.removeFile} />
        </div>
      )
    }

    return (
      <div className={className} style={style} {...getDataset(this.props)}>
        {!imageStyle && this.renderHandle()}
        {imageStyle && leftHandler && this.renderHandle()}
        {showUploadList &&
          value.map((v, i) => (
            <Drop
              drop={drop}
              multiple={false}
              key={i}
              accept={accept}
              dropData={i}
              disabled={disabled}
              onDrop={this.handleReplace}
            >
              <ResultComponent
                renderContent={renderContent}
                value={v}
                values={value}
                index={i}
                style={imageStyle}
                renderResult={renderResult}
                onRemove={this.removeValue}
                onPreview={onPreview}
              />
            </Drop>
          ))}

        {showUploadList &&
          Object.keys(files).map(id => (
            <FileComponent {...files[id]} key={id} id={id} style={imageStyle} onRemove={this.removeFile} />
          ))}

        {imageStyle && !leftHandler && this.renderHandle()}

        {recoverAble &&
          recycle.map((v, i) => (
            <ResultComponent
              renderContent={renderContent}
              key={i}
              value={v}
              values={recycle}
              index={i}
              renderResult={renderResult}
              recoverAble={!!recoverAble}
              showRecover={recoverAble && limit > value.length}
              onRecover={this.recoverValue}
              style={imageStyle}
            />
          ))}
      </div>
    )
  }
}

Upload.propTypes = {
  accept: PropTypes.string,
  action: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
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
  onProgress: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  onHttpError: PropTypes.func,
  params: PropTypes.object,
  recoverAble: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  renderResult: PropTypes.func,
  request: PropTypes.func,
  validateHook: PropTypes.func,
  validator: PropTypes.object,
  value: PropTypes.array,
  customResult: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  style: PropTypes.object,
  withCredentials: PropTypes.bool,
  onStart: PropTypes.func,
  showUploadList: PropTypes.bool,
  validatorHandle: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  disabled: PropTypes.bool,
  webkitdirectory: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  renderContent: PropTypes.func,
  drop: PropTypes.bool,
  filesFilter: PropTypes.func,
  onErrorRemove: PropTypes.func,
  forceAccept: PropTypes.bool,
  leftHandler: PropTypes.bool,
  onPreview: PropTypes.func,
}

Upload.defaultProps = {
  cors: false,
  limit: 100,
  recoverAble: false,
  validator: {},
  value: [],
  withCredentials: false,
  showUploadList: true,
  validatorHandle: true,
}

export default acceptHOC(Upload)
