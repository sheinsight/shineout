import React, { isValidElement } from 'react'
import PropTypes from 'prop-types'
import Spin from '../Spin'
import { PureComponent } from '../component'
import { uploadClass } from './styles'
import Button from '../Button'
import Upload from './Upload'
import { isRTL } from '../config'

const SPIN = color => (
  <span className={uploadClass('bg-spin')}>
    <Spin size={10} name="ring" color={color} />
  </span>
)

const handleKeyDown = e => {
  if (e.keyCode === 13) e.target.click()
}

class Progress extends PureComponent {
  constructor(props) {
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

  handleChange(p) {
    this.setState({
      progress: p,
    })
  }

  handleProgress(file) {
    this.handleChange(file.process)
  }

  handleError(error) {
    const { onError } = this.props
    if (onError) onError(error)
    this.handleOver()
  }

  handleSuccess(...args) {
    const { onSuccess } = this.props
    if (onSuccess) onSuccess(...args)
    this.handleOver()
  }

  handleUpload(e) {
    const uploading = this.state.progress >= 0
    if (uploading) e.stopPropagation()
  }

  renderLoadingView(color) {
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
    const { placeholder, type, ...others } = this.props
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

Progress.propTypes = {
  type: PropTypes.oneOf(['default','primary', 'success', 'link', 'warning', 'error', 'danger']),
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  loading: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
}

Progress.defaultProps = {
  type: 'primary',
}

export default Progress
