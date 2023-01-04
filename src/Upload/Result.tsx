import React, { PureComponent } from 'react'
import { uploadClass } from './styles'
import icons from '../icons'
import RemoveConfirm from './RemoveConfirm'
import { getDirectionClass } from '../utils/classname'
import { UploadResultProps } from './Props'

interface UploadResultState {
  confirm: boolean
}

const DefaultProps = {
  renderResult: (a: any) => a,
  recoverAble: false,
}
class Result extends PureComponent<UploadResultProps, UploadResultState> {
  static defaultProps = DefaultProps

  constructor(props: UploadResultProps) {
    super(props)
    this.state = {
      confirm: false,
    }
    this.handleRemove = this.handleRemove.bind(this)
    this.handleRecover = this.handleRecover.bind(this)
    this.handleConfirmChange = this.handleConfirmChange.bind(this)
  }

  handleRemove() {
    if (this.props.onRemove) this.props.onRemove(this.props.index)
  }

  handleRecover() {
    const { onRecover, value, index } = this.props
    if (onRecover) onRecover(index, value)
  }

  handleConfirmChange(confirm: boolean) {
    this.setState({ confirm })
  }

  render() {
    const { confirm } = this.state
    const { renderResult = DefaultProps.renderResult, value, recoverAble, showRecover, removeConfirm } = this.props
    const className = uploadClass('view-value', recoverAble && 'to-be-delete', confirm && 'view-active')

    return (
      <div className={className}>
        <div className={uploadClass(getDirectionClass('text'))}>{renderResult(value)}</div>

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

export default Result
