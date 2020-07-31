import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import icons from '../icons'
import Image from '../Image'
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
    const { value, renderResult, recoverAble, renderContent, style, showRecover, index, values } = this.props
    const className = uploadClass('image-item', 'image-result', recoverAble && 'to-be-delete')
    const url = renderResult(value)

    return (
      <div style={style} className={className}>
        {url &&
          (renderContent ? (
            renderContent(url, value, index, values)
          ) : (
            <Image src={url} href={url} fit="center" width="auto" height={0} className={uploadClass('image-bg')} />
          ))}

        {showRecover && (
          <a className={uploadClass('recover')} onClick={this.handleRecover}>
            {icons.Recovery}
          </a>
        )}

        {this.props.onRemove && <span className={uploadClass('delete')} onClick={this.handleRemove} />}
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
  showRecover: PropTypes.bool,
  style: PropTypes.object,
  value: PropTypes.any,
  renderContent: PropTypes.func,
  values: PropTypes.array,
}

ImageResult.defaultProps = {
  renderResult: a => a,
}

export default ImageResult
