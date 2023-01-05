import React, { PureComponent } from 'react'
import icons from '../icons'
import Image from '../Image'
import RemoveConfirm from './RemoveConfirm'
import { uploadClass } from './styles'
import { UploadImageResultProps } from './Props'

interface UploadImageResultState {
  confirm: boolean
}
const DefaultProps = {
  renderResult: (a: any) => a,
}
class ImageResult extends PureComponent<UploadImageResultProps, UploadImageResultState> {
  static defaultProps = DefaultProps

  image: { preview: () => void }

  constructor(props: UploadImageResultProps) {
    super(props)
    this.state = {
      confirm: false,
    }
    this.handleRemove = this.handleRemove.bind(this)
    this.handleRecover = this.handleRecover.bind(this)
    this.bindImage = this.bindImage.bind(this)
    this.handlePreview = this.handlePreview.bind(this)
    this.handleConfirmChange = this.handleConfirmChange.bind(this)
    this.preview = this.preview.bind(this)
  }

  get showRemove() {
    const { onRemove, renderContent } = this.props
    return onRemove && renderContent
  }

  bindImage(image: any) {
    this.image = image
  }

  handleRemove() {
    if (this.props.onRemove) this.props.onRemove(this.props.index)
  }

  handleRecover() {
    const { onRecover, value, index } = this.props
    if (onRecover) {
      onRecover(index, value)
    }
  }

  handleConfirmChange(confirm: boolean) {
    this.setState({ confirm })
  }

  preview() {
    if (!this.image) return
    this.image.preview()
  }

  handlePreview() {
    const { onPreview, renderResult = DefaultProps.renderResult, value, index, values } = this.props
    if (onPreview) {
      const url = renderResult(value)
      onPreview(url, value, index, values, {
        preview: () => this.preview(),
      })
      return
    }
    this.preview()
  }

  renderOptions() {
    const { removeConfirm } = this.props
    const { confirm } = this.state
    return (
      <div className={uploadClass('image-options', confirm && 'image-active')}>
        {
          <a className={uploadClass('options-item')} onClick={this.handlePreview}>
            {icons.Preview}
          </a>
        }
        {this.props.onRemove && (
          <a
            className={uploadClass('options-item', 'options-remove')}
            onClick={removeConfirm ? undefined : this.handleRemove}
          >
            {icons.Delete}
            <RemoveConfirm
              onVisibleChange={this.handleConfirmChange}
              onRemove={this.handleRemove}
              confirm={removeConfirm}
            />
          </a>
        )}
      </div>
    )
  }

  render() {
    const {
      value,
      renderResult = DefaultProps.renderResult,
      recoverAble,
      renderContent,
      style,
      showRecover,
      index,
      values,
    } = this.props
    const className = uploadClass('image-item', 'image-result', recoverAble && 'to-be-delete')
    const url = renderResult(value)

    return (
      <div style={style} className={className}>
        {url &&
          (renderContent ? (
            renderContent(url, value, index, values)
          ) : (
            <Image
              ref={this.bindImage}
              src={url}
              href={url}
              fit="center"
              width="auto"
              height={0}
              className={uploadClass('image-bg')}
            />
          ))}

        {showRecover && (
          <a className={uploadClass('recover')} onClick={this.handleRecover}>
            {icons.Recovery}
          </a>
        )}
        {this.showRemove && <span className={uploadClass('delete')} onClick={this.handleRemove} />}
        {!renderContent && this.renderOptions()}
      </div>
    )
  }
}

export default ImageResult
