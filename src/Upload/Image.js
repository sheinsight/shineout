import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { uploadClass } from '../styles'
import Upload from './Upload'
import { ERROR } from './request'

const handleKeyDown = e => {
  if (e.keyCode === 13) e.target.click()
}
class Image extends PureComponent {
  constructor(props) {
    super(props)
    this.beforeUpload = this.beforeUpload.bind(this)
  }

  beforeUpload(blob, validatorHandle) {
    return new Promise((resolve, reject) => {
      const { imageSize } = this.props.validator
      const file = {}
      const reader = new FileReader()

      reader.onload = e => {
        const data = e.target.result
        file.data = data
        if (!imageSize) {
          resolve(file)
          return
        }

        const image = new window.Image()
        image.onload = () => {
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

  render() {
    const { children, width, height, ...others } = this.props

    const style = { width, height }
    const content = children || <div className={uploadClass('indicator')} />

    return (
      <Upload {...others} imageStyle={style} beforeUpload={this.beforeUpload}>
        <div
          tabIndex={this.props.disabled ? -1 : 0}
          style={style}
          onKeyDown={handleKeyDown}
          className={uploadClass('image-plus', 'image-item', others.disabled && 'disabled')}
        >
          {content}
        </div>
      </Upload>
    )
  }
}

Image.propTypes = {
  accept: PropTypes.string,
  children: PropTypes.any,
  height: PropTypes.number,
  recoverAble: PropTypes.bool,
  validator: PropTypes.shape({
    imageSize: PropTypes.func,
    size: PropTypes.func,
  }),
  width: PropTypes.number,
  disabled: PropTypes.bool,
}

Image.defaultProps = {
  accept: 'image/*',
  height: 80,
  validator: {},
  width: 80,
}

export default Image
