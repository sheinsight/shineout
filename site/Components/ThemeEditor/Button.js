import React from 'react'
import PropTypes from 'prop-types'
import { Input, Form } from 'shineout'
import { consumer } from './context'
import { button } from '../../../src/utils/expose'

const { Item } = Form
class ButtonEditor extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.getButtonConfig()
  }

  componentDidUpdate() {
    const { config } = this.props
    if (!config.button) this.reset()
  }

  getButtonConfig() {
    const { setConfig } = this.props
    this.conf = {
      borderRadius: button.borderRadius || 0,
      paddingBaseHorizontal: button.paddingBaseHorizontal || 0,
      paddingBaseVertical: button.paddingBaseVertical || 0,
      paddingLargeHorizontal: button.paddingLargeHorizontal || 0,
      paddingLargeVertical: button.paddingLargeVertical || 0,
      paddingSmallHorizontal: button.paddingSmallHorizontal || 0,
      paddingSmallVertical: button.paddingSmallVertical || 0,
    }
    setConfig('button', this.conf)
    this.defaultConf = { ...this.conf }
  }

  reset() {
    const { setConfig } = this.props
    setConfig('button', this.defaultConf)
    button.setButton(this.defaultConf)
  }

  handleChange(v) {
    const { setConfig } = this.props
    setConfig('button', v)
    button.setButton(v)
  }

  render() {
    const { button: buttonGetter = {} } = this.props.config
    const { open, title } = this.props
    return (
      <div>
        <h2 className="picker-title">{title}</h2>
        {open && (
          <Form labelWidth={200} value={buttonGetter} onChange={this.handleChange}>
            {Object.keys(this.conf).map(name => (
              <Item key={name} label={`${name}: `}>
                <Input.Number name={name} min={0} digits={0} />
              </Item>
            ))}
          </Form>
        )}
      </div>
    )
  }
}

ButtonEditor.propTypes = {
  config: PropTypes.object,
  setConfig: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string,
}

export default consumer(ButtonEditor)
