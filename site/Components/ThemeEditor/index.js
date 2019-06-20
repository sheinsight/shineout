import React from 'react'
import { Button, Modal } from 'shineout'
import immer from 'immer'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import history from '../../history'
import cssInject from '../../../src/utils/vars-inject'
import { headerClass } from '../../styles'
import EditorItem from './EditorItem'
import { consumer, context, Provider } from './context'
import { compose } from '../../../src/utils/func'
import configHOC from './config'
import accessors from '../../../src/utils/css-accessors'
import Icons from '../../../src/icons'

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

function Head({ active, title }) {
  return (
    <h2 className={classnames('picker-title', active && headerClass('active'))}>
      <span />
      {title}
    </h2>
  )
}
Head.propTypes = {
  active: PropTypes.bool,
  title: PropTypes.string,
}

export default class extends React.Component {
  static propTypes = {
    onClose: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.editors = Object.keys(cssInject).map(v => {
      const { name } = cssInject[v].info
      return {
        ...cssInject[v].info,
        component: compose(
          consumer,
          configHOC(name, accessors[name])
        )(EditorItem),
      }
    })
    this.state = {
      config: {},
      exportConf: false,
      open: this.editors[0].title,
    }

    this.resetConfig = this.resetConfig.bind(this)
    this.genConfig = this.genConfig.bind(this)
    this.setConfig = this.setConfig.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  setConfig(key, value) {
    this.setState(
      immer(draft => {
        draft.config[key] = value
      })
    )
  }

  handleClick(e) {
    const { target } = e
    if (!target.classList.contains('picker-title')) return

    const title = target.innerText
    this.setState(
      prev => ({
        open: title === prev.open ? '' : title,
      }),
      () => {
        const { path = undefined } = this.editors.find(v => v.title === title)
        if (path) history.push(path)
      }
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
    const { config, exportConf, open } = this.state
    const { onClose } = this.props
    const provideValue = {
      config,
      setConfig: this.setConfig,
      resetConfig: this.resetConfig,
      genConfig: this.genConfig,
    }
    return (
      <div className={headerClass('editor')}>
        <a className={headerClass('close')} onClick={onClose} href="javascript:;">
          {Icons.Close}
        </a>
        <Provider value={provideValue}>
          <div className={headerClass('editor-content')} onClick={this.handleClick}>
            {this.editors.map(editor => {
              const { title, className } = editor
              return (
                <editor.component
                  header={<Head title={title} active={title === open} />}
                  key={title}
                  open={open === title}
                  className={headerClass(className)}
                />
              )
            })}
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
