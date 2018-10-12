import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { uploadClass } from '../styles'
import icons from '../icons'

class Result extends PureComponent {
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
      renderResult, value, recoverAble, showRecover,
    } = this.props
    const className = uploadClass('view-value', recoverAble && 'to-be-delete')

    return (
      <div className={className}>
        <div className={uploadClass('text')}>{ renderResult(value) }</div>

        {
          this.props.onRemove &&
          <a href="javascript:;" className={uploadClass('delete')} onClick={this.handleRemove}>
            {icons.Close}
          </a>
        }

        {
          showRecover &&
          <a href="javascript:;" className={uploadClass('recover')} onClick={this.handleRecover}>
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
  onRecover: PropTypes.func,
  recoverAble: PropTypes.bool,
  renderResult: PropTypes.func,
  showRecover: PropTypes.bool,
  value: PropTypes.any,
}

Result.defaultProps = {
  renderResult: a => a,
  recoverAble: false,
}

export default Result
