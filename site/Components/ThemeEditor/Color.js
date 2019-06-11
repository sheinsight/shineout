import React from 'react'
import { SketchPicker } from 'react-color'
import { Popover } from 'shineout'
import PropTypes from 'prop-types'
import { color, types } from '../../../src/utils/expose'
import { consumer, context } from './context'
import { headerClass } from '../../styles'

let primaryChangeTimer = null
function handlePrimaryChange(type, c) {
  if (primaryChangeTimer) clearTimeout(primaryChangeTimer)
  primaryChangeTimer = setTimeout(() => {
    color.setColor({ [type]: c })
  }, 300)
}

function Color({ title, onChange }) {
  const ctx = React.useContext(context)
  const { color: colorGetter = {} } = ctx.config
  const current = colorGetter[title] || '#fff'
  return (
    <div className={headerClass('color-item')}>
      <p>{title}</p>
      <span className={headerClass('color')}>
        <div className={headerClass('color-current')} style={{ background: current }} />
        <Popover position="bottom-right" trigger="click">
          <SketchPicker
            color={current}
            className={headerClass('color-picker')}
            onChange={v => {
              onChange(title, v.hex)
              handlePrimaryChange(title, v.hex)
            }}
          />
        </Popover>
      </span>
    </div>
  )
}

Color.propTypes = {
  title: PropTypes.string,
  onChange: PropTypes.func,
}

class ColorPicker extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.getColorConfig()
  }

  componentDidUpdate() {
    const { config } = this.props
    if (!config.color) this.reset()
  }

  getColorConfig() {
    const { setConfig } = this.props
    this.conf = {}
    // eslint-disable-next-line no-return-assign
    types.map(type => (this.conf[type] = color[type]))
    setConfig('color', this.conf)
    this.defaultConf = { ...this.conf }
  }

  reset() {
    const { setConfig } = this.props
    setConfig('color', this.defaultConf)
    color.setColor(this.defaultConf)
  }

  handleChange(type, c) {
    const { setConfig } = this.props
    this.conf[type] = c
    setConfig('color', this.conf)
  }

  render() {
    return (
      <div>
        <h2>Color 颜色</h2>
        <div className={headerClass('color-picker')}>
          {types.map(type => (
            <Color title={type} key={type} onChange={this.handleChange} />
          ))}
        </div>
      </div>
    )
  }
}

ColorPicker.propTypes = {
  config: PropTypes.object,
  setConfig: PropTypes.func,
}

export default consumer(ColorPicker)
