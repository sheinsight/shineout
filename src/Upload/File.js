import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { uploadClass } from '../styles'
import Progress from '../Progress'
import icons from '../icons'
import { ERROR } from './request'

class File extends PureComponent {
  constructor(props) {
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleRemove() {
    this.props.onRemove(this.props.id)
  }

  render() {
    const {
      message, name, status, process,
    } = this.props
    const className = uploadClass('view-file', status === ERROR && 'error')

    return (
      <div className={className}>
        <div className={uploadClass('text')}>{name} {message && <span>({message})</span>}</div>
        <a href="javascript:;" className={uploadClass('delete')} onClick={this.handleRemove}>
          {icons.Close}
        </a>
        {
          (status !== ERROR && process >= 0)
            ? <Progress className={uploadClass('progress')} value={process} strokeWidth={2} />
            : null
        }
      </div>
    )
  }
}

File.propTypes = {
  id: PropTypes.string,
  message: PropTypes.string,
  name: PropTypes.string,
  onRemove: PropTypes.func,
  process: PropTypes.number,
  status: PropTypes.number,
}

export default File
