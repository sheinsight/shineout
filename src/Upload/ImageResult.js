import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import icons from '../icons'
import { uploadClass } from '../styles'

class ImageResult extends PureComponent {
  constructor(props) {
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleRecover = this.handleRecover.bind(this)
  }

  handleRemove() {
    this.props.onRemove(this.props.index)
  }

  handleRecover() {
    const { onRecover, value, index } = this.props
    onRecover(index, value)
  }

  render() {
    const {
      value, renderResult, recoverAble, style,
    } = this.props
    const className = uploadClass('image-item', 'image-result', recoverAble && 'to-be-delete')
    const url = renderResult(value)

    return (
      <div style={style} className={className}>
        {
          url &&
          <div className={uploadClass('image-bg')} style={{ backgroundImage: `url(${url})` }} />
        }

        <div className={uploadClass('message')}>
          {
            this.props.onRemove &&
            <a
              href="javascript:;"
              className={uploadClass('delete')}
              onClick={this.handleRemove}
            >
              {icons.Delete}
            </a>
          }

          {
            this.props.recoverAble &&
            <a
              href="javascript:;"
              className={uploadClass('recover')}
              onClick={this.handleRecover}
            >
              {icons.Recovery}
            </a>
          }
        </div>
      </div>
    )
  }
}

ImageResult.propTypes = {
  index: PropTypes.number,
  onRemove: PropTypes.func,
  onRecover: PropTypes.func,
  recoverAble: PropTypes.bool,
  renderResult: PropTypes.func,
  style: PropTypes.object,
  value: PropTypes.any,
}

ImageResult.defaultProps = {
  renderResult: a => a,
}

export default ImageResult
