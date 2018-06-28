import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { uploadClass } from '../styles'
import icons from '../icons'

class Result extends PureComponent {
  constructor(props) {
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleResume = this.handleResume.bind(this)
  }

  handleRemove() {
    this.props.onRemove(this.props.index)
  }

  handleResume() {
    const { onResume, value, index } = this.props
    onResume(index, value)
  }

  render() {
    const { renderResult, value, resumeAble } = this.props
    const isResume = !!this.props.onResume
    const className = uploadClass('view-value', isResume && 'to-be-delete')

    return (
      <div className={className}>
        { renderResult(value) }

        {
          this.props.onRemove &&
          <a href="javascript:;" className={uploadClass('close')} onClick={this.handleRemove}>
            &times;
          </a>
        }

        {
          resumeAble &&
          <a href="javascript:;" className={uploadClass('close')} onClick={this.handleResume}>
            {icons.Recovery}
          </a>
        }
      </div>
    )
  }
}

Result.propTypes = {
  index: PropTypes.number,
  onRemove: PropTypes.func,
  onResume: PropTypes.func,
  renderResult: PropTypes.func,
  resumeAble: PropTypes.bool,
  value: PropTypes.any,
}

Result.defaultProps = {
  renderResult: a => a,
  resumeAble: false,
}

export default Result
