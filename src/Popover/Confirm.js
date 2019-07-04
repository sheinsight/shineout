import React from 'react'
import PropTypes from 'prop-types'
import Popover from './index'
import Button from '../Button'
import Alert from '../Alert'
import { popoverClass } from '../styles'
import { getProps } from '../utils/proptypes'
import { getLocale } from '../locale'

export default function Confirm(props) {
  const { children, type, text, onOk, onCancel, ...other } = props
  return (
    <Popover {...other} trigger="click">
      {close => (
        <div className={popoverClass('confirm')}>
          <div className={popoverClass('mention')}>
            <Alert type={type} icon className={popoverClass('alert')}>
              {children}
            </Alert>
          </div>

          <div className={popoverClass('footer')} onClick={close}>
            <Button size="small" onClick={onCancel}>
              {getLocale('cancel', text)}
            </Button>
            <Button size="small" type="primary" onClick={onOk}>
              {getLocale('ok', text)}
            </Button>
          </div>
        </div>
      )}
    </Popover>
  )
}

Confirm.propTypes = {
  ...getProps(PropTypes, 'type'),
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  text: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
}
Confirm.defaultProps = {
  type: 'warning',
}
