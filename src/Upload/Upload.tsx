import React from 'react'
import classnames from 'classnames'
import immer from 'immer'
import Gap from '../Gap'
import { PureComponent } from '../component'
import { getUidStr } from '../utils/uid'
import { FormError } from '../utils/errors'
import { uploadClass } from './styles'
import defaultRequest, { ERROR, UPLOADING } from './request'
import FileInput from './FileInput'
import FileContent from './File'
import ImageFile from './ImageFile'
import Result from './Result'
import ImageResult from './ImageResult'
import { Provider } from './context'
import Drop from './Drop'
import attrAccept from '../utils/accept'
import { isFunc } from '../utils/is'
import { getLocale } from '../locale'
import acceptHOC from './accept'
import getDataset from '../utils/dom/getDataset'
import { isRTL } from '../config'
import { FileRecord, UploadOptions, SimpleUploadProps, XhrType } from './Props'

const VALIDATORITEMS: { key: 'size' | 'ext' | 'customValidator'; param: (blob: File) => any }[] = [
  { key: 'size', param: (blob: File) => blob.size },
  {
    key: 'ext',
    param: (blob: File) => {
      const exts = blob.name.split('.')
      return exts[exts.length - 1]
    },
  },
  { key: 'customValidator', param: (blob: File) => blob },
]

const promised = (action: Function, ...args: any) => {
  const res = action(...args)
  if (res && typeof res.then === 'function') return res
  return new Promise((resolve, reject) => {
    if (res instanceof Error) reject(res)
    resolve(true)
  })
}

interface UploadState {
  files: {
    [id: string]: FileRecord
  }
  recycle: []
}

const DefaultProps = {
  cors: false,
  limit: 100,
  recoverAble: false,
  validator: {},
  value: [],
  withCredentials: false,
  showUploadList: true,
  validatorHandle: true,
  canDelete: true,
  GapProps: { column: 12, row: 12 },
}

class Upload<ValueItem> extends PureComponent<SimpleUploadProps<ValueItem>, UploadState> {
  static defaultProps = DefaultProps

  input: FileInput

  constructor(props: SimpleUploadProps<ValueItem>) {
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

  getCanDelete(item: ValueItem, index: number) {
    const { canDelete } = this.props
    if (isFunc(canDelete)) {
      return canDelete(item, index)
    }
    return canDelete
  }

  getAction(file: File) {
    const { action } = this.props
    if (typeof action === 'string') return action
    if (typeof action === 'function') return action(file)
    return ''
  }

  validatorHandle(error: Error, file: File) {
    const { validatorHandle: vth } = this.props

    if (typeof vth === 'function') return vth(error, file)

    return !!vth
  }

  bindElement(input: FileInput) {
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

  removeFile(id: string) {
    const { beforeCancel, onErrorRemove } = this.props
    const file = this.state.files[id]

    if (beforeCancel && isFunc(beforeCancel)) beforeCancel(file)

    if (file) {
      if (file.xhr && file.xhr.abort) file.xhr.abort()
      this.setState(
        immer(draft => {
          delete draft.files[id]
        }),
        () => {
          if (file.status === ERROR && onErrorRemove) {
            onErrorRemove(file.xhr!, file.blob, file)
          }
        }
      )
    }
  }

  removeValue(index: number) {
    const { recoverAble, disabled, beforeRemove } = this.props
    if (disabled) return
    const current = this.props.value[index]
    const startRemove = typeof beforeRemove === 'function' ? beforeRemove(current) : Promise.resolve()
    startRemove
      .then(() => {
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
      })
      .catch(() => {})
  }

  recoverValue(index: number, value: ValueItem) {
    const { disabled } = this.props
    if (disabled) return
    this.props.onChange(
      immer(this.props.value, (draft: ValueItem[]) => {
        draft.push(value)
      })
    )
    this.setState(
      immer(draft => {
        draft.recycle.splice(index, 1)
      })
    )
  }

  async useValidator(blob: File) {
    const { validator, accept, forceAccept, forceAcceptErrorMsg } = this.props
    const { files } = this.state
    let error = null
    let i = 0

    if (forceAccept) {
      const acceptRes = attrAccept(blob, accept)
      if (!acceptRes) return new Error(forceAcceptErrorMsg || getLocale('invalidAccept'))
    }

    while (VALIDATORITEMS[i]) {
      const item = VALIDATORITEMS[i]
      if (typeof validator![item.key] === 'function') {
        try {
          // eslint-disable-next-line no-await-in-loop
          await promised(validator![item.key]!, item.param(blob), files)
        } catch (err) {
          error = err instanceof Error ? err : new Error(err)
        }
        if (error instanceof Error) return error
      }
      i += 1
    }

    return null
  }

  async addFile(e: { target?: { files: File[] }; fromDragger?: boolean; files?: File[] }) {
    const { beforeUpload, value, limit = DefaultProps.limit, filesFilter } = this.props
    // eslint-disable-next-line
    const files = { ...this.state.files }
    let finishedCode = false
    let fileList = (e.fromDragger && e.files ? e.files : e.target && e.target.files) || []
    if (filesFilter) fileList = filesFilter(Array.from(fileList)) || []
    const addLength = limit - value.length - Object.keys(this.state.files).length
    if (addLength <= 0) return
    const list = Array.from({ length: Math.min(fileList.length, addLength) })
    for (let i = 0; i < list.length; i++) {
      const blob = fileList[i]
      const id = getUidStr()
      const file: FileRecord = {
        name: blob.name,
        process: -1,
        status: UPLOADING,
        blob,
      }

      files[id] = file
      // eslint-disable-next-line no-await-in-loop
      const error = await this.useValidator(blob)
      if (error instanceof Error) {
        if (!this.validatorHandle(error, file.blob)) {
          delete files[id]
          continue
        }

        file.message = error.message
        file.status = ERROR

        if (beforeUpload) {
          beforeUpload(blob, this.validatorHandle)
            // eslint-disable-next-line no-loop-func
            .then(args => {
              if (finishedCode) {
                this.setState(
                  immer(draft => {
                    draft.files[id] = Object.assign({}, draft.files[id], args)
                  })
                )
              } else {
                files[id] = Object.assign({}, files[id], args)
              }
            })
            .catch(() => true)
        }
        continue
      }

      if (beforeUpload) {
        beforeUpload(blob, this.validatorHandle)
          // eslint-disable-next-line no-loop-func
          .then(args => {
            if (args.status !== ERROR) files[id].xhr = this.uploadFile(id, blob, args.data)
            if (finishedCode) {
              this.setState(
                immer(draft => {
                  draft.files[id] = Object.assign({}, draft.files[id], args)
                })
              )
            } else {
              files[id] = Object.assign({}, files[id], args)
            }
          })
          // eslint-disable-next-line no-loop-func
          .catch(() => {
            if (finishedCode) {
              this.setState(
                immer(draft => {
                  delete draft.files[id]
                })
              )
            } else {
              delete files[id]
            }
          })
      } else {
        files[id].xhr = this.uploadFile(id, blob)
      }
    }
    finishedCode = true
    this.setState({ files })
  }

  uploadFile(id: string, file: File, data?: any) {
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
      responseType,
    } = this.props

    const req = request || defaultRequest
    let throttle = false

    const options: UploadOptions<ValueItem> = {
      url: this.getAction(file),
      name: (htmlName || name) as string,
      cors,
      params,
      withCredentials,
      file,
      headers,
      responseType,

      onStart,

      onProgress: (e: ProgressEvent<XMLHttpRequestEventTarget> & { percent?: number }, msg?: string) => {
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

      onLoad: (xhr: XMLHttpRequest) => {
        if (!/^2|1223/.test(`${xhr.status}`)) {
          this.handleError(id, xhr, file)
          return
        }

        let value: any
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

      onError: (xhr: XhrType) => this.handleError(id, xhr, file),
    }
    if (onProgress === false || onProgress === null) {
      options.onProgress = () => {}
    }

    return req(options)
  }

  handleFileDrop(files: File[]) {
    this.addFile({ files, fromDragger: true })
  }

  handleReplace(files: File[], index: number) {
    this.removeValue(index)
    setTimeout(() => {
      this.addFile({ files, fromDragger: true })
    })
  }

  handleError(id: string, xhr: XhrType, file: File) {
    const { onError, onHttpError } = this.props

    let message = xhr.statusText
    if (onError) message = onError(xhr, file)
    if (onHttpError) message = onHttpError(xhr, file) || message

    this.setState(
      immer(draft => {
        if (!draft.files[id]) return
        draft.files[id].status = ERROR
        draft.files[id].message = message
      })
    )
  }

  renderHandle() {
    const {
      limit = DefaultProps.limit,
      value,
      children,
      accept,
      multiple,
      disabled,
      webkitdirectory,
      drop,
    } = this.props
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
        multiple={!!multiple || limit > 1}
      >
        <span className={uploadClass('handle', disabled && 'disabled')} onClick={this.handleAddClick}>
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
      limit = DefaultProps.limit,
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
      removeConfirm,
      gapProps,
    } = this.props
    const { files, recycle } = this.state
    const fileDrop = drop && !imageStyle

    const className = classnames(
      uploadClass(
        '_',
        isRTL() && 'rtl',
        disabled && 'disabled',
        showUploadList === false && 'hide-list',
        fileDrop && 'file-drop'
      ),
      this.props.className
    )
    const FileComponent = imageStyle ? ImageFile : FileContent
    const ResultComponent = imageStyle ? ImageResult : Result

    if (CustomResult) {
      return (
        <div className={className} style={style}>
          {this.renderHandle()}
          <CustomResult value={value} files={files} onValueRemove={this.removeValue} onFileRemove={this.removeFile} />
        </div>
      )
    }

    const Wrapper = imageStyle ? Gap : React.Fragment

    return (
      <div className={className} style={style} {...getDataset(this.props)}>
        <Wrapper {...(imageStyle ? gapProps : null)}>
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
                  onRemove={this.getCanDelete(v, i) ? this.removeValue : undefined}
                  removeConfirm={removeConfirm}
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
        </Wrapper>
      </div>
    )
  }
}

export default acceptHOC(Upload)
