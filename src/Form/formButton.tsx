import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'
import { getParent, dispatchEvent } from '../utils/dom/element'
import { formConsumer } from './formContext'
import { FormButtonProps } from './Props'

export default (htmlType: 'submit' | 'button' | 'reset') =>
  formConsumer(
    ['disabled'],
    class FormButton extends PureComponent<FormButtonProps> {
      button: HTMLElement

      static propTypes = {
        children: PropTypes.any,
        disabled: PropTypes.bool,
        loading: PropTypes.bool,
        onClick: PropTypes.func,
        type: PropTypes.string,
      }

      constructor(props: FormButtonProps) {
        super(props)

        this.bindElement = this.bindElement.bind(this)
        this.handleClick = this.handleClick.bind(this)
      }

      bindElement(el: HTMLElement) {
        this.button = el
      }

      handleClick(e: React.MouseEvent) {
        if (htmlType === 'button') {
          const form = getParent(this.button, 'form') as HTMLFormElement
          dispatchEvent(form, 'submit', e.target)
        }

        if (this.props.onClick) this.props.onClick()
      }

      render() {
        const { children, onClick, ...other } = this.props
        const type = this.props.type || (htmlType === 'reset' ? 'default' : 'primary')

        return (
          <Button {...other} type={type} htmlType={htmlType} onRef={this.bindElement} onClick={this.handleClick}>
            {children}
          </Button>
        )
      }
    }
  )
