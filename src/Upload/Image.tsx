import React, { PureComponent } from 'react'
import immer from 'immer'
import classname from 'classnames'
import { uploadClass } from './styles'
import Upload from './Upload'
import { ERROR } from './request'
import { getLocale } from '../locale'
import { UploadImageHandlerProps, SimpleUploadImageProps } from './Props'

export const Handler: React.FC<UploadImageHandlerProps> = ({
  className,
  disabled,
  urlInvalid,
  children,
  style,
  width,
  height,
  onKeyDown,
  onMouseDown,
  ...otherProps
}) => {
  const mc = classname(
    uploadClass('image-plus', 'image-item', disabled && 'disabled', urlInvalid && 'url-invalid-border'),
    className
  )
  const ms = Object.assign({}, { width, height }, style)
  return (
    <div
      {...otherProps}
      onKeyDown={onKeyDown}
      onMouseDown={onMouseDown}
      style={ms}
      tabIndex={disabled ? -1 : 0}
      className={mc}
    >
      {children || <div className={uploadClass('indicator', urlInvalid && 'url-invalid-indicator')} />}
    </div>
  )
}

Handler.defaultProps = {
  width: 80,
  height: 80,
}

interface ImageState {
  urlInvalid: boolean
}

const ImageUploadDefaultProps = {
  accept: 'image/*',
  height: 80,
  validator: {},
  width: 80,
}
class Image<ValueItem> extends PureComponent<SimpleUploadImageProps<ValueItem>, ImageState> {
  timeout: NodeJS.Timeout

  static defaultProps = ImageUploadDefaultProps

  constructor(props: SimpleUploadImageProps<ValueItem>) {
    super(props)
    this.beforeUpload = this.beforeUpload.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.state = {
      urlInvalid: false,
    }
    this.timeout = null as any
  }

  beforeUpload(blob: File, validatorHandle: (error: Error, file: File) => boolean) {
    return new Promise((resolve, reject) => {
      const { imageSize } = this.props.validator || {}
      const file: { data?: any; status?: number; message?: string } = {}
      const reader = new FileReader()

      reader.onload = e => {
        const data = e.target!.result as string
        file.data = data

        const image = new window.Image()
        image.onerror = () => {
          this.setState(
            immer(draft => {
              draft.urlInvalid = true
            })
          )
          reject()
        }
        image.onload = () => {
          if (!imageSize) {
            resolve(file)
            return
          }
          const res = imageSize(image)
          if (res instanceof Error) {
            if (!validatorHandle(res, blob)) reject()
            file.status = ERROR
            file.message = res.message
          }
          resolve(file)
        }
        image.src = data
      }

      reader.readAsDataURL(blob)
    })
  }

  handleKeyDown(e: React.KeyboardEvent) {
    this.setState({ urlInvalid: false })
    if (e.keyCode === 13) (e.target as HTMLElement).click()
  }

  handleMouseDown() {
    this.setState({ urlInvalid: false })
  }

  render() {
    const { children, width, height, ignorePreview, ...others } = this.props
    const { urlInvalid } = this.state
    if (urlInvalid) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.setState({ urlInvalid: false })
      }, 3000)
    }

    const style = { width, height }

    return (
      <Upload {...others} imageStyle={style} beforeUpload={ignorePreview ? undefined : this.beforeUpload}>
        <Handler
          disabled={this.props.disabled}
          style={style}
          onKeyDown={this.handleKeyDown}
          onMouseDown={this.handleMouseDown}
          urlInvalid={urlInvalid}
        >
          {children}
        </Handler>
        {urlInvalid && (
          <div style={{ width: '100%', position: 'relative' }}>
            <div className={uploadClass('url-invalid-message')}>{getLocale('urlInvalidMsg')}</div>
          </div>
        )}
      </Upload>
    )
  }
}

export default Image
