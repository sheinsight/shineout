import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Progress from '../Progress'
import { uploadClass } from '../styles'
import icons from '../icons'
import { ERROR } from './ajax'

class ImageFile extends PureComponent {
  constructor(props) {
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleRemove() {
    this.props.onRemove(this.props.id)
  }

  render() {
    const {
      process, status, style, data, message,
    } = this.props
    const className = uploadClass('image-item', status === ERROR && 'error')

    return (
      <div style={style} className={className}>
        {
          data &&
          <div className={uploadClass('image-bg')} style={{ backgroundImage: `url(${data})` }} />
        }

        <div className={uploadClass('message')}>
          <span>{message}</span>
          <a className={uploadClass('delete')} onClick={this.handleRemove} href="javascript:;">
            {icons.Delete}
          </a>
        </div>

        <div className={uploadClass('progress')}>
          <Progress color="#f2f2f2" background="rgba(0,0,0,0.5)" value={process} strokeWidth={2} />
        </div>
      </div>
    )
  }
}

ImageFile.propTypes = {
  id: PropTypes.string,
  message: PropTypes.string,
  onRemove: PropTypes.func,
  process: PropTypes.number,
  status: PropTypes.number,
  style: PropTypes.object,
  data: PropTypes.string,
}

export default ImageFile
