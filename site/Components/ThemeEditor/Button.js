import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'shineout'
import { consumer } from './context'
import { button } from '../../../src/utils/expose'

class ButtonEditor extends React.Component {
  constructor(props) {
    super(props)
    this.borderRadiusChange = this.handleChange.bind(this, 'borderRadius')
  }

  componentDidMount() {
    this.getButtonConfig()
  }

  componentDidUpdate() {
    const { config } = this.props
    if (!config.button) this.reset()
  }

  getButtonConfig() {
    const { setConfig } = this.props
    this.conf = {
      borderRadius: button.borderRadius,
    }
    setConfig('button', this.conf)
    this.defaultConf = { ...this.conf }
  }

  reset() {
    const { setConfig } = this.props
    setConfig('button', this.defaultConf)
    button.setButton(this.defaultConf.borderRadius)
  }

  handleChange(name, v) {
    const { setConfig } = this.props
    this.conf[name] = v
    setConfig('button', this.conf)
    button[name] = v
  }

  render() {
    const { button: buttonGetter = {} } = this.props.config
    const borderRadius = buttonGetter.borderRadius || 0
    return (
      <div>
        <h2>Button 按钮</h2>
        <div>
          <span>border-radius: </span>
          <Input.Number
            value={parseInt(borderRadius, 10)}
            onChange={this.borderRadiusChange}
            size="small"
            style={{ marginLeft: 10 }}
            width={80}
            min={0}
            digits={0}
          />
        </div>
      </div>
    )
  }
}

ButtonEditor.propTypes = {
  config: PropTypes.object,
  setConfig: PropTypes.func,
}

export default consumer(ButtonEditor)
