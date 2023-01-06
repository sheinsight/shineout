import React, { PureComponent } from 'react'
import { uploadClass } from './styles'
import Progress from '../Progress'
import Spin from '../Spin'
import icons from '../icons'
import { ERROR, UPLOADING } from './request'
import { getDirectionClass } from '../utils/classname'
import { FileProps } from './Props'

const SPIN = (
  <span style={{ display: 'inline-block', marginRight: 8 }}>
    <Spin size={10} name="ring" />
  </span>
)

class File extends PureComponent<FileProps> {
  constructor(props: FileProps) {
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleRemove() {
    this.props.onRemove(this.props.id)
  }

  render() {
    const { message, name, status, process } = this.props
    const className = uploadClass('view-file', status === ERROR && 'error')

    return (
      <div className={className}>
        <div className={uploadClass(getDirectionClass('text'))}>
          {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
          {status === UPLOADING && SPIN} {name} {message && <span>({message}) </span>}
        </div>
        <a className={uploadClass('delete')} onClick={this.handleRemove}>
          {icons.Close}
        </a>
        {status !== ERROR && (
          <Progress
            className={uploadClass('progress')}
            background={process >= 0 ? '#e9ecef' : 'transparent'}
            value={process}
            strokeWidth={2}
          />
        )}
      </div>
    )
  }
}
export default File
