import React from 'react'
import { Button, Popover, Modal } from 'shineout'
import { SketchPicker } from 'react-color'
import PropTypes from 'prop-types'
import createReactContext from 'create-react-context'
import immer from 'immer'
import { headerClass } from '../styles'
import { color, types } from '../../src/utils/expose'

const context = createReactContext()

let primaryChangeTimer = null
function handlePrimaryChange(type, c) {
  if (primaryChangeTimer) clearTimeout(primaryChangeTimer)
  primaryChangeTimer = setTimeout(() => {
    color.setColor({ [type]: c })
  }, 300)
}

function getDefaultConfig() {
  const colorMap = {}
  // eslint-disable-next-line no-return-assign
  types.map(v => (colorMap[v] = color[v]))
  return { color: colorMap }
}

function Color({ title }) {
  const ctx = React.useContext(context)
  const { color: colorGetter } = ctx.config
  return (
    <div className={headerClass('color-item')}>
      <p>{title}</p>
      <span className={headerClass('color')}>
        <div className={headerClass('color-current')} style={{ background: colorGetter[title] }} />
        <Popover position="bottom-right" trigger="click">
          <SketchPicker
            color={colorGetter[title]}
            className={headerClass('color-picker')}
            onChange={v => {
              ctx.setColor(title, v.hex)
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
}

function ColorPicker() {
  return (
    <div>
      <h2>Color 颜色</h2>
      <div className={headerClass('color-picker')}>
        {types.map(type => (
          <Color title={type} key={type} />
        ))}
      </div>
    </div>
  )
}

function Foot() {
  const ctx = React.useContext(context)
  return (
    <div className={headerClass('editor-footer')}>
      <Button onClick={ctx.resetConfig}>恢复</Button>
      <Button type="primary" onClick={ctx.genConfig}>
        导出
      </Button>
    </div>
  )
}

export default class extends React.PureComponent {
  constructor(props) {
    super(props)
    this.defaultConfig = getDefaultConfig()

    this.state = {
      config: this.defaultConfig,
      exportConf: false,
    }

    this.resetConfig = this.resetConfig.bind(this)
    this.setColor = this.setColor.bind(this)
    this.genConfig = this.genConfig.bind(this)
  }

  setColor(type, value) {
    this.setState(
      immer(draft => {
        draft.config.color[type] = value
      })
    )
  }

  genConfig() {
    this.setState({ exportConf: true})
  }

  resetConfig() {
    this.setState(
      {
        config: this.defaultConfig,
      },
      () => {
        // reset color
        color.setColor(this.state.config.color)
      }
    )
  }

  render() {
    const { config, exportConf } = this.state
    const provideValue = {
      config,
      resetConfig: this.resetConfig,
      setColor: this.setColor,
      genConfig: this.genConfig,
    }
    return (
      <div className={headerClass('editor')}>
        <context.Provider value={provideValue}>
          <div className={headerClass('editor-content')}>
            <ColorPicker />
          </div>
          <Foot />
        </context.Provider>
        <Modal visible={exportConf} onClose={() => this.setState({ exportConf: false })}>
          <p style={{ whiteSpace: 'pre' }}>{JSON.stringify(config, null, 4)}</p>
        </Modal>
      </div>
    )
  }
}
