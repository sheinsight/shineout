import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'shineout'
import { compose } from 'shineout/utils/func'
import moveable from 'shineout/hoc/moveable'
import resizable from 'shineout/hoc/resizable'
import { fabClass } from '../../styles'
import locate from '../../locate'
import { Provider } from './context'

class Panel extends React.Component {
  constructor(props) {
    super(props)
    this.handleBindReset = this.handleBind.bind(this, 'reset')
    this.handleBindDownload = this.handleBind.bind(this, 'download')
  }

  handleBind(type, action) {
    this[type] = action
  }

  render() {
    const { children, onClose, ...others } = this.props
    return (
      <Provider value={{ bindReset: this.handleBindReset, bindDownload: this.handleBindDownload }}>
        <div {...others}>
          <div className={fabClass('content')}>{children}</div>
          <div className={fabClass('extra')}>
            <div className={fabClass('handler')} />
            <div className={fabClass('extra-content')}>
              <Button onClick={() => this.reset()}>{locate('重置', 'reset')}</Button>
              <Button onClick={() => this.download()} type="primary">
                {locate('下载', 'download')}
              </Button>
            </div>
          </div>
          <div className={fabClass('close')} onClick={onClose}>
            <span />
          </div>
        </div>
      </Provider>
    )
  }
}

Panel.propTypes = {
  children: PropTypes.any,
  onClose: PropTypes.func,
}

const FuncPanel = compose(
  moveable(`.${fabClass('main')}`),
  resizable
)(Panel)

export default function Fab({ children, visible, onClose }) {
  return (
    <div className={fabClass('_', visible && 'show')}>
      <FuncPanel moveable resizable="y" className={fabClass('main')} onClose={onClose}>
        {children}
      </FuncPanel>
    </div>
  )
}

Fab.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.any,
}
