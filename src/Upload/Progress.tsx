import React, { isValidElement } from 'react'
import Spin from '../Spin'
import { PureComponent } from '../component'
import { uploadClass } from './styles'
import Button from '../Button'
import Upload from './Upload'
import { isRTL } from '../config'
import { UploadProgressProps, XhrType } from './Props'

const SPIN = (color?: string) => (
  <span className={uploadClass('bg-spin')}>
    <Spin size={10} name="ring" color={color} />
  </span>
)

const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.keyCode === 13) (e.target as HTMLElement).click()
}

const DefaultProps = {
  type: 'primary',
  size: 'default',
  outline: false,
}

interface UploadProgressState {
  progress: number
}
class Progress<ValueItem> extends PureComponent<UploadProgressProps<ValueItem>, UploadProgressState> {
  static defaultProps = DefaultProps as UploadProgressProps<any>

  handleStart: () => void

  handleOver: () => void

  constructor(props: UploadProgressProps<ValueItem>) {
    super(props)

    this.state = {
      progress: -1,
    }
    this.handleError = this.handleError.bind(this)
    this.handleSuccess = this.handleSuccess.bind(this)
    this.handleProgress = this.handleProgress.bind(this)
    this.handleStart = this.handleChange.bind(this, 0)
    this.handleOver = this.handleChange.bind(this, -1)
    this.handleUpload = this.handleUpload.bind(this)
  }

  handleChange(p: number) {
    this.setState({
      progress: p,
    })
  }

  handleProgress(file: { process: number }) {
    this.handleChange(file.process)
  }

  handleError(xhr: XhrType, file: File) {
    const { onError } = this.props
    let msg: any
    if (onError) msg = onError(xhr, file)
    this.handleOver()
    return msg
  }

  handleSuccess(value: any, ...args: any) {
    const { onSuccess } = this.props
    let result = value
    if (onSuccess) {
      // @ts-ignore
      result = onSuccess(value, ...args)
    }
    this.handleOver()
    return result
  }

  handleUpload(e: React.MouseEvent) {
    const uploading = this.state.progress >= 0
    if (uploading) e.stopPropagation()
  }

  renderLoadingView(color?: string) {
    const { placeholder, loading } = this.props
    return isValidElement(loading) ? (
      <span>{loading}</span>
    ) : (
      <span>
        {SPIN(color)}
        {typeof loading === 'string' ? loading : placeholder}
      </span>
    )
  }

  render() {
    const { placeholder, type, size, outline, ...others } = this.props
    const uploading = this.state.progress >= 0
    const style = {
      [isRTL() ? 'left' : 'right']: uploading ? `${100 - this.state.progress}%` : '100%',
    }
    return (
      <Upload
        {...others}
        limit={undefined}
        onProgress={this.handleProgress}
        onStart={this.handleStart}
        showUploadList={false}
        onError={this.handleError}
        onSuccess={this.handleSuccess}
      >
        <Button
          tabIndex={others.disabled ? -1 : 0}
          disabled={others.disabled}
          className={uploadClass('button', uploading && 'uploading')}
          type={type}
          size={size}
          outline={outline}
          onClick={this.handleUpload}
          onKeyDown={handleKeyDown}
        >
          {uploading && [
            <div key="cover" className={uploadClass('cover')} />,
            <div key="bg" style={style} className={uploadClass('bg')}>
              {this.renderLoadingView('#fff')}
            </div>,
          ]}
          <span>{uploading ? this.renderLoadingView() : placeholder}</span>
        </Button>
      </Upload>
    )
  }
}

export default Progress
