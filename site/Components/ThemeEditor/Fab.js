import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'shineout'
import { compose } from 'shineout/utils/func'
import moveable from 'shineout/hoc/moveable'
import resizable from 'shineout/hoc/resizable'
import { fabClass } from '../../styles'
import locate from '../../locate'

const Panel = ({ children, onClose, ...others }) => (
  <div {...others}>
    <div className={fabClass('content')}>{children}</div>
    <div className={fabClass('extra')}>
      <div className={fabClass('handler')} />
      <div className={fabClass('extra-content')}>
        <Button>{locate('重置', 'reset')}</Button>
        <Button type="primary">{locate('下载', 'download')}</Button>
      </div>
    </div>
    <div className={fabClass('close')} onClick={onClose}>
      <span />
    </div>
  </div>
)
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
