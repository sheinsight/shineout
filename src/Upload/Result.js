import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { uploadClass } from '../styles'
import icons from '../icons'
import RemoveConfirm from './RemoveConfirm'

class Result extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      confirm: false,
    }
    this.handleRemove = this.handleRemove.bind(this)
    this.handleRecover = this.handleRecover.bind(this)
    this.handleConfirmChange = this.handleConfirmChange.bind(this)
  }

  handleRemove() {
    this.props.onRemove(this.props.index)
  }

  handleRecover() {
    const { onRecover, value, index } = this.props
    onRecover(index, value)
  }

  handleConfirmChange(confirm) {
    this.setState({ confirm })
  }

  render() {
    const { confirm } = this.state
    const { renderResult, value, recoverAble, showRecover, removeConfirm } = this.props
    const className = uploadClass('view-value', recoverAble && 'to-be-delete', confirm && 'view-active')

    return (
      <div className={className}>
        <div className={uploadClass('text')}>{renderResult(value)}</div>

        {this.props.onRemove && (
          <a className={uploadClass('delete')} onClick={removeConfirm ? undefined : this.handleRemove}>
            {icons.Close}
            <RemoveConfirm
              onVisibleChange={this.handleConfirmChange}
              confirm={removeConfirm}
              onRemove={this.handleRemove}
            />
          </a>
        )}

        {showRecover && (
          <a className={uploadClass('recover')} onClick={this.handleRecover}>
            {icons.Recovery}
          </a>
        )}
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
  removeConfirm: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

Result.defaultProps = {
  renderResult: a => a,
  recoverAble: false,
}

export default Result
