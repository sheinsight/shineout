import React from 'react'
import { Button, Modal } from 'shineout'
import immer from 'immer'
import { headerClass } from '../../styles'
import ColorPicker from './Color'
import { context, Provider } from './context'

function Foot() {
  const ctx = React.useContext(context)
  return (
    <div className={headerClass('editor-footer')}>
      <Button onClick={ctx.resetConfig}>恢复</Button>
      <Button type="primary" onClick={ctx.genConfig}>
        导出配置
      </Button>
    </div>
  )
}

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      config: {},
      exportConf: false,
    }

    this.resetConfig = this.resetConfig.bind(this)
    this.genConfig = this.genConfig.bind(this)
    this.setConfig = this.setConfig.bind(this)
  }

  setConfig(key, value) {
    this.setState(
      immer(draft => {
        draft.config[key] = value
      })
    )
  }

  genConfig() {
    const { config } = this.state
    const str = JSON.stringify(config, null, 4)
    this.setState({ exportConf: str })
  }

  resetConfig() {
    this.setState({ config: {} })
  }

  render() {
    const { config, exportConf } = this.state
    const provideValue = {
      config,
      setConfig: this.setConfig,
      resetConfig: this.resetConfig,
      genConfig: this.genConfig,
    }
    return (
      <div className={headerClass('editor')}>
        <Provider value={provideValue}>
          <div className={headerClass('editor-content')}>
            <ColorPicker />
          </div>
          <Foot />
        </Provider>
        <Modal visible={exportConf} onClose={() => this.setState({ exportConf: false })}>
          <div className={headerClass('export-conf')}>{exportConf}</div>
        </Modal>
      </div>
    )
  }
}
